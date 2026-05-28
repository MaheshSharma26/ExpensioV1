# Expensio — Complete User Guide

## What Is Expensio?

**Expensio** is a personal finance tracker web app that helps you record, track, and analyse your money — both what comes in (income) and what goes out (expenses). All amounts are shown in **Indian Rupees (₹)**. Data is stored securely in your account on a backend server.

---

## Navigation

The app has a **collapsible sidebar** on the left with four pages:

| Sidebar Item | What It Opens |
|---|---|
| 🏠 Dashboard | Financial overview with charts and summaries |
| ↑ Income | Manage and analyse your income sources |
| ↓ Expenses | Manage and analyse your spending |
| 👤 Profile | Edit your account details and password |

**Sidebar toggle:** Click the **☰ (three-line hamburger)** button at the top of the sidebar to collapse it to icons-only or expand it to full width.

**Dark/Light Mode:** Click the 🌙 Moon / ☀️ Sun button in the top-right of the navbar to toggle between dark and light mode. Your preference is saved automatically.

---

---

## 1. Dashboard

**Path:** `/` (Home)

The Dashboard is your **financial command centre** — an at-a-glance summary of everything happening with your money.

---

### Time Frame Selector

At the top of the dashboard there are **4 time frame buttons**:

| Button | What It Shows |
|---|---|
| **Daily** | Today's income and expenses (hour-by-hour) |
| **Weekly** | This week's transactions |
| **Monthly** | This month's transactions (default) |
| **Yearly** | This year's transactions |

> Clicking any of these instantly updates **all cards, gauges, charts, and lists** on the page.

---

### Summary Cards (3 cards at the top)

| Card | What It Shows |
|---|---|
| **Total Balance** | Income minus Expenses for the selected time frame. Shows a green badge (+income) and red badge (-expenses) below |
| **Expenses (period)** | Total money spent in the selected period. Shows % change compared to the previous period (e.g. "12% increase from last month") |
| **Savings (period)** | Income minus expenses = your savings. Shows what percentage of your income you saved |

---

### Gauge Cards (3 visual meters)

Three circular gauge/arc charts showing:

| Gauge | Colour | Meaning |
|---|---|---|
| **Income** | Teal/Green | How much you earned vs. your maximum recorded income |
| **Spent** | Orange | How much you spent vs. your maximum spending |
| **Savings** | Cyan/Blue | How much you saved. Goes red if savings are negative |

Each gauge shows the **exact ₹ amount** in the centre and a label.

---

### Expense Distribution Pie Chart

A **donut/ring pie chart** that breaks down your spending by category.

- Each slice = one expense category (Food, Housing, Transport, etc.)
- Hover over a slice → tooltip shows exact ₹ amount
- Labels on slices show the **category name and percentage**
- A legend at the bottom lists all categories with colour dots
- Only appears if you have expense transactions

---

### Recent Income List

Shows your **latest income transactions** for the selected time frame:
- Category icon + description + category name
- ₹ amount in green (e.g. `+₹50,000`)
- Date

If there are more than 3 entries → a **"View All Income (n)"** button appears. Click it to expand the full list. Click **"Show Less"** to collapse it back.

---

### Recent Expenses List

Same layout as income but for expenses:
- Category icon + description + category name
- ₹ amount in orange/red (e.g. `-₹2,000`)
- Date

Same **"View All Expenses (n)"** expand/collapse button.

---

### Add Transaction Button

The **"+ Add Transaction"** button (top-right of Dashboard) opens a modal where you can add **either income or expense** in one place.

**Fields in the modal:**
| Field | Options |
|---|---|
| Type | Income / Expense (dropdown) |
| Date | Date picker (defaults to today) |
| Description | Free text (e.g. "Monthly Salary", "Grocery shopping") |
| Amount (₹) | Number field |
| Category | Food, Housing, Transport, Shopping, Entertainment, Utilities, Healthcare, Other, Salary, Freelance, Investment, Bonus |

Click **"Add Transaction"** to save. The page refreshes automatically and all cards/charts update.

---

---

## 2. Income Page

**Path:** `/income`

A dedicated page to **record, view, edit, delete, and export** all your income transactions.

---

### Time Frame Selector

Same **Daily / Weekly / Monthly / Yearly** buttons as the Dashboard. Filters all data on this page to the selected period.

---

### Summary Cards (3 cards)

| Card | What It Shows |
|---|---|
| **Total Income** | Sum of all income in the selected period (₹) |
| **Average Income** | Average income per transaction in the period (₹) |
| **Transactions** | Total count of income records in the period |

---

### Income Trend Bar Chart

A **bar chart** showing income over time:
- **Daily view** → bars per hour (0–23h)
- **Weekly/Monthly view** → bars per day
- **Yearly view** → bars per month

A **green dashed reference line** marks the current period (today/this week/this month).

Hover over any bar → tooltip shows the exact ₹ income for that time slot.

---

### Income Transactions List

A list of all income records for the selected period with:
- Category icon (colour-coded)
- Description
- Category label
- ₹ amount (green)
- Date

**Shows 8 entries by default.** If there are more, a **"👁 View All N Transactions"** button appears.

---

### Filter Dropdown

A dropdown to narrow the transaction list:

| Filter Option | What It Shows |
|---|---|
| All Transactions | Everything in the selected time frame |
| This Month | Only this calendar month |
| This Year | Only this calendar year |
| Salary | Only salary entries |
| Freelance | Only freelance entries |
| Investment | Only investment entries |
| Bonus | Only bonus entries |
| Other | Only "Other" category entries |

---

### Export Button

The **"Export"** button downloads all your income transactions as an **Excel (.xlsx) file** named `income_details.xlsx`. It includes Date, Description, Category, Amount, and Type columns.

---

### Add Income Button

The **"+ Add Income"** button opens a modal:

**Fields:**
| Field | Options |
|---|---|
| Date | Date picker |
| Description | Free text |
| Amount (₹) | Number |
| Category | Salary, Freelance, Investment, Bonus, Other |

Click **"Add Income"** to save.

---

### Edit an Income Entry

On any transaction row, click the **✏️ Edit (pencil) icon**. The row transforms into an **inline edit form** with:
- Description field
- Amount field
- Category dropdown
- Date picker
- **Save** button — saves changes to the server
- **Cancel** button — discards changes

---

### Delete an Income Entry

Click the **🗑️ Delete (trash) icon** on any transaction row. A browser **confirmation dialog** appears: *"Are you sure you want to delete this income?"*. Click OK to permanently delete it.

---

---

## 3. Expenses Page

**Path:** `/expense`

A dedicated page to **record, view, edit, delete, and export** all your expense transactions.

---

### Time Frame Selector

Same **Daily / Weekly / Monthly / Yearly** buttons. Filters all data on the page.

---

### Summary Cards (3 cards)

| Card | What It Shows |
|---|---|
| **Total Expenses** | Sum of all spending in the selected period (₹) |
| **Average Expense** | Average cost per transaction (₹) |
| **Transactions** | Number of expense records in the period |

---

### Expense Trend Area Chart

An **area chart** (filled line chart) showing spending over time:
- **Daily** → per hour
- **Weekly/Monthly** → per day
- **Yearly** → per month

The orange gradient fill makes it easy to see spending spikes.

Hover over any point → tooltip shows exact ₹ expense for that time slot.

An **"Export Data"** button is also available directly in the chart header.

---

### Expense Transactions List

A list of all expense records for the period:
- Category icon (colour-coded)
- Description
- Category label
- ₹ amount (orange/red)
- Date

**Shows 8 entries by default.** A **"👁 View All N Transactions"** button appears if there are more.

---

### Filter Dropdown

| Filter Option | What It Shows |
|---|---|
| All Transactions | Everything in the time frame |
| This Month | Only this calendar month |
| This Year | Only this calendar year |
| Food | Only food/dining entries |
| Housing | Only rent/housing entries |
| Transport | Only transport entries |
| Shopping | Only shopping entries |
| Entertainment | Only entertainment entries |
| Utilities | Only utility bills |
| Healthcare | Only medical/health entries |
| Other | Only "Other" category |

---

### Export Button

Downloads all filtered expense transactions as **`expense_details.xlsx`**. Includes Date, Description, Category, Amount, and Type.

---

### Add Expense Button

The **"+ Add Expense"** button opens a modal:

**Fields:**
| Field | Options |
|---|---|
| Date | Date picker |
| Description | Free text |
| Amount (₹) | Number |
| Category | Food, Housing, Transport, Shopping, Entertainment, Utilities, Healthcare, Other |

Click **"Add Expense"** to save.

---

### Edit an Expense Entry

Click the **✏️ Edit icon** on any row. Inline edit form appears with:
- Description, Amount, Category, Date fields
- **Save** — updates the server record
- **Cancel** — discards changes

---

### Delete an Expense Entry

Click the **🗑️ Delete icon**. Confirmation dialog: *"Are you sure you want to delete this expense?"*. Click OK to delete permanently.

---

---

## 4. Profile Page

**Path:** `/profile`

Manage your personal account details and security settings.

---

### Personal Information Card

Shows your current:
- **Full Name**
- **Email Address**

#### How to Edit Your Profile

1. Click the **"Edit"** button (top-right of the card)
2. The fields become editable inputs
3. Update your **Name** and/or **Email**
4. Click **"Save Changes"** — updates your account on the server. A green success toast notification appears at the top-right.
5. Click **"Cancel"** to discard changes without saving

---

### Account Security Card

Shows your password status.

#### How to Change Your Password

1. Click the **"Change"** button next to Password
2. A **popup modal** opens with 3 fields:
   - **Current Password** — your existing password
   - **New Password** — must be at least 6 characters
   - **Confirm New Password** — must match the new password exactly
3. Each field has a **👁 show/hide password toggle** button
4. Click **"Update Password"**
   - If validation fails → red error messages appear under the relevant field
   - If successful → green toast notification appears and the modal closes
5. Click **"Cancel"** or the **✕** button to close without changing

---

### Logout Button

The **"Logout"** button in the Account Security card:
- Clears your login token from browser storage
- Redirects you to the Login page
- You will need to log in again to access the app

---

---

## General Notes

| Feature | Detail |
|---|---|
| **Currency** | All amounts in Indian Rupees (₹) with Indian number formatting (e.g. ₹1,00,000) |
| **Data persistence** | All transactions are saved to the server database — they persist across sessions |
| **Real-time updates** | After adding/editing/deleting, all charts and cards refresh automatically |
| **Dark mode** | Fully supported across all pages — saved in browser storage |
| **Authentication** | Login required — all data is private to your account |
