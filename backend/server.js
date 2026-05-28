require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userController = require("./controllers/userController");
const incomeController = require("./controllers/incomeController");
const expenseController = require("./controllers/expenseController");
const dashboardController = require("./controllers/dashboardController");
const authMiddleware = require("./utils/authMiddleware");

const app = express();

app.use(cors({ origin: "*" })); // Allow all origins for local testing
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

// User Authentication & Profile Routes
app.post("/api/user/register", userController.register);
app.post("/api/user/login", userController.login);
app.get("/api/user/me", authMiddleware, userController.me);
app.put("/api/user/updateprofile", authMiddleware, userController.updateProfile);
app.put("/api/user/changepassword", authMiddleware, userController.changePassword);

// Income CRUD Routes
app.post("/api/income/add", authMiddleware, incomeController.addIncome);
app.get("/api/income/get", authMiddleware, incomeController.getIncomes);
app.put("/api/income/update/:id", authMiddleware, incomeController.updateIncome);
app.delete("/api/income/delete/:id", authMiddleware, incomeController.deleteIncome);
app.get("/api/income/overview", authMiddleware, incomeController.getOverview);

// Expense CRUD Routes
app.post("/api/expense/add", authMiddleware, expenseController.addExpense);
app.get("/api/expense/get", authMiddleware, expenseController.getExpenses);
app.put("/api/expense/update/:id", authMiddleware, expenseController.updateExpense);
app.delete("/api/expense/delete/:id", authMiddleware, expenseController.deleteExpense);
app.get("/api/expense/overview", authMiddleware, expenseController.getOverview);

// Central Dashboard Routes
app.get("/api/dashboard/overview", authMiddleware, dashboardController.getOverview);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/expensetracker";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    app.listen(PORT, () => {
      console.log(`Express server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
