const expenseModel = require("../models/expenseModel");
const getDateRange = require("../utils/dateFilter");

const addExpense = async (req, res) => {
  try {
    const { description, amount, category, date } = req.body;
    const userId = req.user.id;

    if (!description || !amount || !category || !date) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newExpense = new expenseModel({
      description,
      amount: Number(amount),
      category,
      date: new Date(date),
      userId,
    });

    await newExpense.save();
    return res.status(201).json({ success: true, message: "Expense added successfully", data: newExpense });
  } catch (err) {
    console.error("Add expense error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await expenseModel.find({ userId }).sort({ date: -1 });
    return res.status(200).json({ success: true, data: expenses });
  } catch (err) {
    console.error("Get expenses error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, category, date } = req.body;
    const userId = req.user.id;

    const updatedExpense = await expenseModel.findOneAndUpdate(
      { _id: id, userId },
      {
        description,
        amount: Number(amount),
        category,
        date: new Date(date),
      },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ success: false, message: "Expense not found or unauthorized" });
    }

    return res.status(200).json({ success: true, message: "Expense updated successfully", data: updatedExpense });
  } catch (err) {
    console.error("Update expense error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deletedExpense = await expenseModel.findOneAndDelete({ _id: id, userId });
    if (!deletedExpense) {
      return res.status(404).json({ success: false, message: "Expense not found or unauthorized" });
    }

    return res.status(200).json({ success: true, message: "Expense deleted successfully" });
  } catch (err) {
    console.error("Delete expense error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getOverview = async (req, res) => {
  try {
    const userId = req.user.id;
    const range = req.query.range || "monthly";
    const { start, end } = getDateRange(range);

    const expense = await expenseModel.find({
      userId,
      date: { $gte: start, $lte: end },
    }).sort({ date: -1 });

    const totalExpense = expense.reduce((acc, cur) => acc + cur.amount, 0);
    const averageExpense =
      expense.length > 0 ? totalExpense / expense.length : 0;
    const numberOfTransactions = expense.length;

    return res.status(200).json({
      success: true,
      data: {
        totalExpense,
        averageExpense,
        numberOfTransactions,
        recentTransactions: expense.slice(0, 10),
        range,
      },
    });
  } catch (err) {
    console.error("Expense overview error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getOverview,
};