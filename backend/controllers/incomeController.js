const incomeModel = require("../models/incomeModel");
const getDateRange = require("../utils/dateFilter");

const addIncome = async (req, res) => {
  try {
    const { description, amount, category, date } = req.body;
    const userId = req.user.id;

    if (!description || !amount || !category || !date) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newIncome = new incomeModel({
      description,
      amount: Number(amount),
      category,
      date: new Date(date),
      userId,
    });

    await newIncome.save();
    return res.status(201).json({ success: true, message: "Income added successfully", data: newIncome });
  } catch (err) {
    console.error("Add income error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getIncomes = async (req, res) => {
  try {
    const userId = req.user.id;
    const incomes = await incomeModel.find({ userId }).sort({ date: -1 });
    return res.status(200).json({ success: true, data: incomes });
  } catch (err) {
    console.error("Get incomes error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, category, date } = req.body;
    const userId = req.user.id;

    const updatedIncome = await incomeModel.findOneAndUpdate(
      { _id: id, userId },
      {
        description,
        amount: Number(amount),
        category,
        date: new Date(date),
      },
      { new: true }
    );

    if (!updatedIncome) {
      return res.status(404).json({ success: false, message: "Income not found or unauthorized" });
    }

    return res.status(200).json({ success: true, message: "Income updated successfully", data: updatedIncome });
  } catch (err) {
    console.error("Update income error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deletedIncome = await incomeModel.findOneAndDelete({ _id: id, userId });
    if (!deletedIncome) {
      return res.status(404).json({ success: false, message: "Income not found or unauthorized" });
    }

    return res.status(200).json({ success: true, message: "Income deleted successfully" });
  } catch (err) {
    console.error("Delete income error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getOverview = async (req, res) => {
  try {
    const userId = req.user.id;
    const range = req.query.range || "monthly";
    const { start, end } = getDateRange(range);

    const income = await incomeModel.find({
      userId,
      date: { $gte: start, $lte: end },
    }).sort({ date: -1 });

    const totalIncome = income.reduce((acc, cur) => acc + cur.amount, 0);
    const averageIncome =
      income.length > 0 ? totalIncome / income.length : 0;
    const numberOfTransactions = income.length;

    return res.status(200).json({
      success: true,
      data: {
        totalIncome,
        averageIncome,
        numberOfTransactions,
        recentTransactions: income.slice(0, 10),
        range,
      },
    });
  } catch (err) {
    console.error("Income overview error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  addIncome,
  getIncomes,
  updateIncome,
  deleteIncome,
  getOverview,
};