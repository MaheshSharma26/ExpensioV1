const expenseModel = require("../models/expenseModel");
const incomeModel = require("../models/incomeModel");

const getOverview = async (req, res) => {
  try {
    const userId = req.user.id;
    const range = req.query.range || "monthly";

    const incomes = await incomeModel.find({ userId });
    const expenses = await expenseModel.find({ userId });

    const monthlyIncome = incomes.reduce((acc, cur) => acc + Number(cur.amount || 0), 0);
    const monthlyExpense = expenses.reduce((acc, cur) => acc + Number(cur.amount || 0), 0);
    const savings = monthlyIncome - monthlyExpense;
    const savingsRate = monthlyIncome === 0 ? 0 : Math.round((savings / monthlyIncome) * 100);

    const recentTransactions = [
      ...incomes.map((i) => ({ ...i.toObject(), type: "income" })),
      ...expenses.map((e) => ({ ...e.toObject(), type: "expense" })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const spendByCategory = {};
    for (const exp of expenses) {
      const cat = exp.category || "Other";
      spendByCategory[cat] = (spendByCategory[cat] || 0) + Number(exp.amount || 0);
    }

    const expenseDistribution = Object.entries(spendByCategory).map(([category, amount]) => ({
      category,
      amount,
      percent: monthlyExpense === 0 ? 0 : Math.round((amount / monthlyExpense) * 100),
    }));

    return res.status(200).json({
      success: true,
      data: {
        monthlyIncome,
        monthlyExpense,
        savings,
        savingsRate,
        expenseDistribution,
        recentTransactions: recentTransactions.slice(0, 10),
      },
    });
  } catch (err) {
    console.error("Dashboard overview error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { getOverview };