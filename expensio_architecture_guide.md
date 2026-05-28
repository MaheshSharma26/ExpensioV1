# Architecture & Deployment Guide: expensio

A comprehensive reference handbook detailing the design, architecture, security, connectivity, and cloud deployment of the **expensio** application.

---

## 1. The Technology Stack: What and Why?

The application is engineered using the **MERN Stack** (MongoDB, Express, React, Node.js). This choice represents the industry standard for modern, high-performance web applications due to its single-language unification and high throughput.

```text
┌────────────────────────────────────────────────────────┐
│                   FRONTEND (React)                     │  ← UI & Client State Management
└──────────────────────────┬─────────────────────────────┘
                           │ (Axios HTTP Requests via JSON)
┌──────────────────────────▼─────────────────────────────┐
│                   BACKEND (Node/Express)               │  ← REST API & Middleware
└──────────────────────────┬─────────────────────────────┘
                           │ (Mongoose TCP Connection)
┌──────────────────────────▼─────────────────────────────┐
│                   DATABASE (MongoDB Atlas)             │  ← Cloud Document Storage
└────────────────────────────────────────────────────────┘
```

### 🧠 Technology Breakdown
1. **MongoDB (Database)**: A document-based NoSQL database. 
   * *Why?* Financial logs (incomes/expenses) fit perfectly as independent JSON documents. Document schemas are highly flexible, allowing effortless future expansion without complex SQL schema migrations.
2. **Express.js (Backend Framework)**: A fast, minimalist web framework for Node.js.
   * *Why?* It provides highly optimized routing capabilities and supports lightweight middleware, allowing us to build secure, robust REST APIs with minimal latency.
3. **React.js (Frontend Library)**: A component-based declarative UI library.
   * *Why?* React utilizes a high-performance **Virtual DOM** to dynamically swap visual elements without reload cycles. This is crucial for keeping chart visualizations and transaction managers updating instantly as the user types.
4. **Node.js (Backend Runtime)**: A V8-based asynchronous, event-driven JavaScript runtime.
   * *Why?* It unifies the frontend and backend under a single programming language (JavaScript) and excels at handling asynchronous concurrent requests (like concurrent database reads and writes) via its non-blocking event loop.

---

## 2. File-by-File Blueprint
Here is a comprehensive directory breakdown explaining the exact purpose and functionality of every file in the project.

### 📁 BACKEND ARCHITECTURE (`/backend`)
* **`server.js`**: The central entrypoint of the backend server. It loads configurations from `.env`, initializes the Express app, configures CORS permissions, registers the API routes, establishes the Mongoose MongoDB connection, and starts the server listening on a port (default: 4000).
* **`.env`** *(Not pushed to GitHub!)*: Stores highly sensitive local environment variables (like your Mongo Database password, port, and security tokens).
* **`package.json`**: Tracks server dependencies (Mongoose, Express, JWT, bcryptjs, cors, dotenv) and defines scripts to launch the server (`npm start`).
* **`models/`** *(Mongoose Schemas defining database constraints)*:
  * **`userModel.js`**: Specifies that user records must contain `name`, `email` (unique), and a hashed `password` string.
  * **`incomeModel.js`**: Defines the data model for income entries (userId link, title, amount, category, date, and optional description).
  * **`expenseModel.js`**: Defines the data model for expense entries (userId link, title, amount, category, date, and optional description).
* **`controllers/`** *(The "brain" containing database CRUD and logic)*:
  * **`userController.js`**: Handles sign-up validation, password hashing, and user authentication, returning a signed JWT token on login.
  * **`incomeController.js`**: Executes MongoDB commands (`find`, `create`, `findByIdAndUpdate`, `findByIdAndDelete`) for user incomes.
  * **`expenseController.js`**: Executes MongoDB commands for user expenses.
  * **`dashboardController.js`**: Performs mathematical aggregation on incomes and expenses to compute total balance and ratio percentages.
* **`utils/authMiddleware.js`**: Intercepts private API requests, extracts the JWT bearer token from the header, decodes the signature, and appends the user's ID to the request object (`req.user`) if authentic.

### 📁 FRONTEND ARCHITECTURE (`/frontend`)
* **`index.html`**: The entrypoint page served to the browser. Contains a single target container (`<div id="root"></div>`) where React injects the entire virtual DOM.
* **`package.json`**: Tracks React dependencies (axios, recharts, framer-motion, lucide-react) and compiler scripts (`dev`, `build`).
* **`vite.config.js`**: Configures Vite's high-speed hot-reload engine and build options.
* **`src/`** *(React client-side codebase)*:
  * **`App.jsx`**: The core controller component. Handles global application state (user profile and authentication tokens) and configures the central routing routes (`/welcome`, `/login`, `/signup`, and protected layouts).
  * **`main.jsx`**: Ties React's virtual engine to the physical HTML root container.
  * **`index.css`**: Configures Tailwind variables and handles base visual tokens.
  * **`assets/dummyStyles.js`**: Central design system token stylesheet containing premium CSS classes (glassmorphism layouts, gradients) to maintain dynamic premium visuals.
  * **`components/`** *(Reusable presentation elements)*:
    * **`Layout.jsx`**: The central visual frame. Restricts view access, renders the Sidebar and Navbar, dynamically fetches transactions from the database via Axios, filters them, and shares them with child components using React's context engine.
    * **`Navbar.jsx` & `Sidebar.jsx`**: Renders sidebar navigation and profile details.
    * **`Login.jsx` & `Signup.jsx`**: Standard forms built with validations and transition frames to communicate with the backend.
  * **`pages/`** *(Visual landing pages injected into the Layout context)*:
    * **`Welcome.jsx`**: The new landing home screen. Introduces the tracker, visualizes analytics features, and provides direct gateway buttons to log in/sign up.
    * **`Dashboard.jsx`**: Renders analytical widgets, AreaCharts of financial progression, and PieCharts of category distributions.
    * **`Income.jsx` & `Expense.jsx`**: Renders detailed lists of financial logs, handles CRUD overlays, and features automated excel export tools.
    * **`Profile.jsx`**: Standard configuration panel to change profile names and passwords securely.

---

## 3. How Everything Connects (Frontend, Backend, and Database)

The entire application relies on a secure **three-tier lifecycle**:

```text
┌──────────────┐         1. Axios POST /api/user/login         ┌──────────────┐
│  Vite React  ├──────────────────────────────────────────────>│   Express    │
│  (Frontend)  │<──────────────────────────────────────────────┤   Backend    │
└──────────────┘           4. Returns JWT Token + User         └──────┬───────┘
                                                                      │ 2. Queries User
                                                                      │    by Email
                                                                      ▼
                                                               ┌──────────────┐
                                                               │   MongoDB    │
                                                               │   (Cloud)    │
                                                               └──────────────┘
```

1. **User Sign In / Signup (The Gatekeeper)**:
   * The user enters their credentials in the frontend React UI and clicks submit.
   * React uses **Axios** to send a secure JSON payload (POST request) over the web to the backend Express server endpoint (`/api/user/login`).
2. **Server Processing & Security Checks (The Brain)**:
   * The Express server receives the request.
   * It uses **Mongoose** to query the MongoDB database and find if the user exists.
   * If found, it uses **Bcrypt** to compare the incoming password with the securely hashed string stored in the database.
   * If matching, the backend signs a **JSON Web Token (JWT)** (using your `JWT_SECRET` key) which packages user credentials into an encrypted string, returning it back to the client.
3. **Session Persistence**:
   * The React frontend receives the JWT token and saves it in `localStorage` or `sessionStorage`.
   * For every subsequent private request (like fetching your expense list or dashboard details), Axios automatically attaches this JWT token inside the **HTTP Authorization Header** (`Bearer <Token>`).
   * The backend's `authMiddleware` intercepts the request, decodes the JWT, and verifies the identity before returning the private data.

---

## 4. Understanding MongoDB Database Creation & Structure

MongoDB is a **NoSQL Document Database**. Unlike relational databases (SQL) which store data in strict, pre-defined tables made of columns and rows, MongoDB stores data as highly readable **Documents in collections** (which are essentially JSON objects).

* **How it was created**: You did not need to run manual table creation scripts. MongoDB creates collections (like `users`, `incomes`, `expenses`) **implicitly/automatically** the very first time Mongoose attempts to save a document!
* **How it is structured**: MongoDB links document nodes together using **Object IDs**. 
  For example, each expense document contains a `userId` field:
  ```json
  {
    "_id": "60d5ec4b8f3b1b2c4c8b4567",
    "userId": "60d5ec128f3b1b2c4c8b1234",
    "title": "Office Laptop purchase",
    "amount": 45000,
    "category": "Electronics",
    "date": "2026-05-24T00:00:00.000Z"
  }
  ```
  The Mongoose query `expenseModel.find({ userId: req.user.id })` runs an indexed query to instantly return only the expenses that belong to the active logged-in user.

---

## 5. Hosting & Environment Variables Security

We hosted the frontend on **Vercel** (specialized in ultra-fast static React CDNs) and the backend on **Render** (designed for running web servers and microservices).

```text
                GITHUB REPO (Clean codebase, NO secrets!)
                       │                       │
         ┌─────────────┴─────────────┐   ┌─────┴─────────────────────┐
         │     Vercel Frontend       │   │      Render Backend       │
         │ (Stores: VITE_API_URL)    │   │ (Stores: MONGO_URI, etc.) │
         └───────────────────────────┘   └───────────────────────────┘
```

### 🔒 Why We CANNOT Put `.env` Files Directly in a GitHub Repository
The `.env` file contains your **MongoDB Connection URI**, which includes your database username and password in plaintext.
* **The Danger**: If you commit and push your `.env` file to a public or private GitHub repository, scanning bots will instantly scrape your database username/password and delete, hijack, or leak your sensitive user data in seconds.
* **The Solution**: We created a `.gitignore` file which explicitly tells Git to **completely ignore the `.env` file**. The `.env` file stays strictly on your local computer and is never pushed to the internet.

---

### 🌐 How Vercel & Render Get Their Configuration Safely
Since GitHub does not contain the `.env` file, the hosted web platforms need a secure way to read these secrets.
1. **Render (Backend)**:
   * In your Render Dashboard, you navigate to your service settings and open the **Environment** tab.
   * You manually enter the variables: `MONGO_URI`, `JWT_SECRET`, and `PORT`.
   * Render securely injects these values directly into the server runtime memory where `process.env` can access them safely, without ever storing them in a code repository!
2. **Vercel (Frontend)**:
   * In your Vercel Dashboard, you go to your project **Settings** -> **Environment Variables**.
   * You enter `VITE_API_URL` pointing to your hosted Render backend (e.g. `https://expensio-backend.onrender.com/api`).
   * Vercel injects these during compilation so React knows exactly where to send API requests!

---

### 🧩 Understanding the Env Variables: `VITE_API_URL` vs. `MONGO_URI`

1. **`VITE_API_URL` (Frontend Connection Point)**:
   * *What it does*: Tells React's Axios client exactly where to send HTTP requests.
   * *Why we need it*: When running locally, Vite talks to `http://localhost:4000/api`. But once live, Vite must talk to your live Render backend `https://<your-service>.onrender.com/api`. 
   * *Vite Prefix*: In Vite, static variables **must** be prefixed with `VITE_` (like `VITE_API_URL`) for Vite's compiler to expose them securely to the frontend browser bundle via `import.meta.env.VITE_API_URL`.

2. **`MONGO_URI` (Backend Connection Point)**:
   * *What it does*: Tells the Node/Express backend how to log into your cloud MongoDB database cluster.
   * *Why we need it*: It includes the credentials, host address, and target database name, allowing Mongoose to open an encrypted secure socket connection to save and read user records.
