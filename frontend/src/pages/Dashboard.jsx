import React, { useState, useMemo, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { 
  Plus, ArrowUp, ArrowDown, IndianRupee, ShoppingCart, 
  BarChart2, PieChart as PieChartIcon, ChevronDown, ChevronUp, Wallet, TrendingUp 
} from "lucide-react";
import { 
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend 
} from "recharts";
import axios from "axios";
import GaugeCard from "../components/GaugeCard";
import FinancialCard from "../components/FinancialCard";
import AddTransactionModal from "../components/Add";
import { getTimeFrameRange, getPreviousTimeFrameRange, calculateData } from "../components/Helpers";
import { COLORS, INCOME_CATEGORY_ICONS, EXPENSE_CATEGORY_ICONS } from "../assets/color";
import { dashboardStyles as styles } from "../assets/dummyStyles";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const GAUGE_COLORS = {
  Income: { 
    gradientStart: '#0d9488',
    gradientEnd: '#0f766e',
    text: 'text-[#C87830] font-semibold',
    bg: 'bg-teal-100'
  },
  Spent: { 
    gradientStart: '#f97316',
    gradientEnd: '#ea580c',
    text: 'text-orange-600',
    bg: 'bg-orange-100'
  },
  Savings: { 
    gradientStart: '#0891b2',
    gradientEnd: '#0e7490',
    text: 'text-cyan-600',
    bg: 'bg-cyan-100'
  }
};

const Dashboard = () => {
  const { 
    allTransactions = [], 
    timeFrame = "monthly", 
    setTimeFrame = () => {},
    refreshTransactions,
    customPeriod,
    setCustomPeriod,
    pickerMonth,
    setPickerMonth,
    pickerYear,
    setPickerYear,
    pickerDate,
    setPickerDate
  } = useOutletContext();

  const [showModal, setShowModal] = useState(false);
  const [gaugeData, setGaugeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [overviewMeta, setOverviewMeta] = useState({});
  const [showAllIncome, setShowAllIncome] = useState(false);
  const [showAllExpense, setShowAllExpense] = useState(false);

  const [newTransaction, setNewTransaction] = useState({
    date: new Date().toISOString().split("T")[0],
    description: "",
    amount: "",
    type: "expense",
    category: "Food",
    account: "Cash",
  });

  const timeFrameRange = useMemo(() => getTimeFrameRange(timeFrame, customPeriod), [timeFrame, customPeriod]);
  const prevTimeFrameRange = useMemo(() => getPreviousTimeFrameRange(timeFrame), [timeFrame]);

  const isDateInRange = (date, start, end) => {
    const transactionDate = new Date(date);
    const startDate = new Date(start);
    const endDate = new Date(end);
    transactionDate.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);
    return transactionDate >= startDate && transactionDate <= endDate;
  };

  const filteredTransactions = useMemo(
    () => (allTransactions || []).filter((t) => 
      isDateInRange(t.date, timeFrameRange.start, timeFrameRange.end)
    ),
    [allTransactions, timeFrameRange]
  );

  const prevFilteredTransactions = useMemo(
    () => (allTransactions || []).filter((t) => 
      isDateInRange(t.date, prevTimeFrameRange.start, prevTimeFrameRange.end)
    ),
    [allTransactions, prevTimeFrameRange]
  );

  const currentTimeFrameData = useMemo(() => {
    const data = calculateData(filteredTransactions);
    data.savings = data.income - data.expenses;
    return data;
  }, [filteredTransactions]);

  const prevTimeFrameData = useMemo(() => {
    const data = calculateData(prevFilteredTransactions);
    data.savings = data.income - data.expenses;
    return data;
  }, [prevFilteredTransactions]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchOverview = async () => {
    try {
      const res = await axios.get(`${API_BASE}/dashboard/overview`, {
        headers: getAuthHeaders(),
        params: { range: timeFrame }
      });
      if (res.data?.success) {
        const data = res.data.data || {};
        const recent = (data.recentTransactions || []).map((item) => {
          const typeFromServer =
            item.type || (item.category ? "expense" : "income");
          const amountNum = Number(item.amount) || 0;

          const isoDate = item.date
            ? new Date(item.date).toISOString()
            : item.createdAt
            ? new Date(item.createdAt).toISOString()
            : new Date().toISOString();

          return {
            id: item._id || item.id || Date.now() + Math.random(),
            date: isoDate,
            description:
              item.description ||
              item.note ||
              item.title ||
              (typeFromServer === "income"
                ? item.source || "Income"
                : item.category || "Expense"),
            amount: amountNum,
            type: typeFromServer,
            category:
              item.category ||
              (typeFromServer === "income" ? "Salary" : "Other"),
            raw: item,
          };
        });

        setOverviewMeta((prev) => ({
          ...prev,
          monthlyIncome: Number(data.monthlyIncome || 0),
          monthlyExpense: Number(data.monthlyExpense || 0),
          savings:
            typeof data.savings !== "undefined"
              ? Number(data.savings)
              : Number(data.monthlyIncome || 0) - Number(data.monthlyExpense || 0),
          savingsRate:
            typeof data.savingsRate !== "undefined" ? data.savingsRate : null,
          spendByCategory: data.spendByCategory || {},
          expenseDistribution: data.expenseDistribution || [],
          recentTransactions: recent,
        }));

        const finalIncome = Number(data.monthlyIncome || 0);
        const finalExpense = Number(data.monthlyExpense || 0);
        const finalSavings = typeof data.savings !== "undefined" ? Number(data.savings) : finalIncome - finalExpense;

        const maxValues = {
          income: Math.max(finalIncome, 5000),
          expenses: Math.max(finalExpense, 3000),
          savings: Math.max(Math.abs(finalSavings), 2000),
        };

        setGaugeData([
          { name: "Income", value: finalIncome, max: maxValues.income },
          { name: "Spent", value: finalExpense, max: maxValues.expenses },
          { name: "Savings", value: finalSavings, max: maxValues.savings },
        ]);
      }
    } catch (err) {
      console.error("Failed to fetch dashboard overview:", err?.response || err.message || err);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, [timeFrame, allTransactions]);

  useEffect(() => {
    if ((!overviewMeta.monthlyIncome || customPeriod) && currentTimeFrameData) {
      const maxValues = {
        income: Math.max(currentTimeFrameData.income, 5000),
        expenses: Math.max(currentTimeFrameData.expenses, 3000),
        savings: Math.max(Math.abs(currentTimeFrameData.savings), 2000),
      };

      setGaugeData([
        { name: "Income", value: currentTimeFrameData.income, max: maxValues.income },
        { name: "Spent", value: currentTimeFrameData.expenses, max: maxValues.expenses },
        { name: "Savings", value: currentTimeFrameData.savings, max: maxValues.savings },
      ]);
    }
  }, [currentTimeFrameData, timeFrame, overviewMeta, customPeriod]);

  const displayIncome =
    timeFrame === "monthly" && typeof overviewMeta.monthlyIncome === "number" && !customPeriod
      ? overviewMeta.monthlyIncome
      : currentTimeFrameData.income;

  const displayExpenses =
    timeFrame === "monthly" && typeof overviewMeta.monthlyExpense === "number" && !customPeriod
      ? overviewMeta.monthlyExpense
      : currentTimeFrameData.expenses;

  const displaySavings =
    timeFrame === "monthly" && typeof overviewMeta.savings === "number" && !customPeriod
      ? overviewMeta.savings
      : currentTimeFrameData.savings;

  const expenseChange = useMemo(() => {
    const prev = prevTimeFrameData.expenses;
    const curr = displayExpenses;
    if (!prev) {
      if (!curr) return 0;
      return 100;
    }
    return Math.round(((curr - prev) / prev) * 100);
  }, [prevTimeFrameData, displayExpenses]);

  const financialOverviewData = useMemo(() => {
    if (
      timeFrame === "monthly" &&
      overviewMeta.expenseDistribution &&
      Array.isArray(overviewMeta.expenseDistribution) &&
      overviewMeta.expenseDistribution.length > 0 &&
      !customPeriod
    ) {
      return overviewMeta.expenseDistribution.map((d) => ({
        name: d.category,
        value: Math.round(Number(d.amount) || 0),
      }));
    }

    const categories = {};
    filteredTransactions.forEach((transaction) => {
      if (transaction.type === "expense") {
        categories[transaction.category] =
          (categories[transaction.category] || 0) + transaction.amount;
      }
    });

    return Object.keys(categories).map((category) => ({
      name: category,
      value: Math.round(categories[category]),
    }));
  }, [filteredTransactions, overviewMeta, timeFrame, customPeriod]);

  const serverRecent = overviewMeta.recentTransactions || [];
  const serverRecentIncome = serverRecent
    .filter((t) => t.type === "income")
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const serverRecentExpense = serverRecent
    .filter((t) => t.type === "expense")
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const incomeTransactions = useMemo(
    () => filteredTransactions
      .filter((t) => t.type === "income")
      .sort((a, b) => new Date(b.date) - new Date(a.date)),
    [filteredTransactions]
  );

  const expenseTransactions = useMemo(
    () => filteredTransactions
      .filter((t) => t.type === "expense")
      .sort((a, b) => new Date(b.date) - new Date(a.date)),
    [filteredTransactions]
  );

  const incomeListForDisplay = incomeTransactions;
  const expenseListForDisplay = expenseTransactions;

  const displayedIncome = showAllIncome 
    ? incomeListForDisplay 
    : incomeListForDisplay.slice(0, 3);

  const displayedExpense = showAllExpense 
    ? expenseListForDisplay 
    : expenseListForDisplay.slice(0, 3);

  const accountBalances = useMemo(() => {
    const balances = {
      "Bank Account": 0,
      "Cash": 0,
      "Credit Card": 0,
      "Investment": 0,
    };

    // 1. Calculate from all transactions
    (allTransactions || []).forEach((t) => {
      const amt = Number(t.amount) || 0;
      const acc = t.account || "Cash";
      if (t.type === "income") {
        if (acc in balances) {
          balances[acc] += amt;
        } else {
          balances[acc] = amt;
        }
      } else {
        if (acc in balances) {
          balances[acc] -= amt;
        } else {
          balances[acc] = -amt;
        }
      }
    });

    // 2. Apply simulated transfers
    const transfers = JSON.parse(localStorage.getItem("expensio_transfers") || "[]");
    transfers.forEach((tr) => {
      const amt = Number(tr.amount) || 0;
      if (tr.from && tr.from in balances) {
        balances[tr.from] -= amt;
      }
      if (tr.to && tr.to in balances) {
        balances[tr.to] += amt;
      }
    });

    return balances;
  }, [allTransactions]);

  const handleAddTransaction = async () => {
    if (!newTransaction.description || !newTransaction.amount) return;
    try {
      setLoading(true);
      const endpoint = newTransaction.type === "income" ? "/income/add" : "/expense/add";
      const payload = {
        description: newTransaction.description.trim(),
        amount: parseFloat(newTransaction.amount),
        category: newTransaction.category,
        date: new Date(newTransaction.date).toISOString()
      };
      const res = await axios.post(`${API_BASE}${endpoint}`, payload, {
        headers: { "Content-Type": "application/json", ...getAuthHeaders() }
      });
      
      // Save account to local storage
      const added = res.data?.data || res.data?.income || res.data?.expense || res.data;
      const id = added?._id || added?.id;
      if (id && newTransaction.account) {
        const txAccounts = JSON.parse(localStorage.getItem("expensio_tx_accounts") || "{}");
        txAccounts[id] = newTransaction.account;
        localStorage.setItem("expensio_tx_accounts", JSON.stringify(txAccounts));
      }
      
      await refreshTransactions();
      setShowModal(false);
      setNewTransaction({
        date: new Date().toISOString().split("T")[0],
        description: "",
        amount: "",
        type: "expense",
        category: "Food",
        account: "Cash",
      });
    } catch (err) {
      console.error("Failed to add transaction:", err?.response || err);
      alert(err.response?.data?.message || "Failed to add transaction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-transparent p-4 md:p-6 relative z-10">
      {/* Header */}
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.headerTitle}>Finance Dashboard</h1>
            <p className={styles.headerSubtitle}>Track your income and expenses</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className={styles.addButton}
          >
            <Plus size={20} /> Add Transaction
          </button>
        </div>
        <div className={styles.timeFrameContainer} style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "20px" }}>
          <div className={styles.timeFrameWrapper}>
            {["daily", "weekly", "monthly", "yearly"].map((frameOption) => (
              <button
                key={frameOption}
                onClick={() => {
                  setTimeFrame(frameOption);
                  setCustomPeriod(null);
                  setPickerMonth(new Date().getMonth());
                  setPickerYear(new Date().getFullYear());
                  setPickerDate(new Date().toISOString().split("T")[0]);
                }}
                className={styles.timeFrameButton(timeFrame === frameOption)}
              >
                {frameOption.charAt(0).toUpperCase() + frameOption.slice(1)}
              </button>
            ))}
          </div>

          {/* Custom date picker — shown for daily and weekly */}
          {(timeFrame === "daily" || timeFrame === "weekly") && (
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              marginTop: "0px", flexWrap: "wrap"
            }}>
              <input
                type="date"
                value={pickerDate}
                onChange={e => {
                  const val = e.target.value;
                  setPickerDate(val);
                  setCustomPeriod({ date: val });
                }}
                style={{
                  padding: "5px 10px", borderRadius: "8px",
                  border: "1.5px solid #0d9488", fontSize: "0.85rem",
                  background: "transparent", color: "inherit",
                  fontWeight: 500, outline: "none", cursor: "pointer"
                }}
              />
              {customPeriod && (
                <button
                  onClick={() => {
                     setCustomPeriod(null);
                     setPickerDate(new Date().toISOString().split("T")[0]);
                  }}
                  style={{
                    padding: "4px 10px", borderRadius: "8px",
                    background: "#0d9488", color: "#fff",
                    border: "none", fontSize: "0.8rem",
                    cursor: "pointer", fontWeight: 600,
                  }}
                >
                  Reset
                </button>
              )}
            </div>
          )}

          {/* Custom period picker — shown for monthly and yearly */}
          {(timeFrame === "monthly" || timeFrame === "yearly") && (
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              marginTop: "0px", flexWrap: "wrap"
            }}>
              {timeFrame === "monthly" && (
                <select
                  value={pickerMonth}
                  onChange={e => {
                    const m = Number(e.target.value);
                    setPickerMonth(m);
                    setCustomPeriod({ month: m, year: pickerYear });
                  }}
                  style={{
                    padding: "5px 10px", borderRadius: "8px",
                    border: "1.5px solid #0d9488", fontSize: "0.85rem",
                    background: "transparent", cursor: "pointer", fontWeight: 500,
                  }}
                >
                  {["January","February","March","April","May","June",
                    "July","August","September","October","November","December"]
                    .map((name, i) => (
                      <option key={i} value={i}>{name}</option>
                    ))}
                </select>
              )}
              <input
                type="number"
                value={pickerYear}
                onChange={e => {
                  const y = Number(e.target.value);
                  setPickerYear(y);
                  setCustomPeriod({ month: pickerMonth, year: y });
                }}
                min="2000"
                max="2100"
                style={{
                  padding: "5px 10px", borderRadius: "8px",
                  border: "1.5px solid #0d9488", fontSize: "0.85rem",
                  background: "transparent", color: "inherit", width: "80px",
                  textAlign: "center", fontWeight: 500, outline: "none",
                }}
              />
              {customPeriod && (
                <button
                  onClick={() => {
                    setCustomPeriod(null);
                    setPickerMonth(new Date().getMonth());
                    setPickerYear(new Date().getFullYear());
                  }}
                  style={{
                    padding: "4px 10px", borderRadius: "8px",
                    background: "#0d9488", color: "#fff",
                    border: "none", fontSize: "0.8rem",
                    cursor: "pointer", fontWeight: 600,
                  }}
                >
                  Reset
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className={styles.summaryGrid}>
        <FinancialCard
          icon={
            <div className={styles.walletIconContainer}>
              <Wallet className="w-5 h-5 text-[#C87830] font-semibold" />
            </div>
          }
          label="Total Balance"
          value={`₹${Math.round(displayIncome - displayExpenses).toLocaleString("en-IN")}`}
          additionalContent={
            <div className="flex items-center gap-2 mt-2 text-sm">
              <span className={styles.balanceBadge}>+₹{Math.round(displayIncome).toLocaleString("en-IN")}</span>
              <span className={styles.expenseBadge}>-₹{Math.round(displayExpenses).toLocaleString("en-IN")}</span>
            </div>
          }
        />

        <FinancialCard
          icon={
            <div className={styles.arrowDownIconContainer}>
              <ArrowDown className="w-5 h-5 text-orange-600" />
            </div>
          }
          label={`${timeFrameRange.label} Expenses`}
          value={`₹${Math.round(displayExpenses).toLocaleString("en-IN")}`}
          additionalContent={
            <div className={`mt-2 text-xs flex items-center gap-1 ${expenseChange >= 0 ? "text-orange-600" : "text-green-600"}`}>
              {expenseChange >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              <span>{Math.abs(expenseChange)}% {expenseChange >= 0 ? "increase" : "decrease"} from {prevTimeFrameRange.label}</span>
            </div>
          }
        />

        <FinancialCard
          icon={
            <div className={styles.piggyBankIconContainer}>
              <ArrowUp className="w-5 h-5 text-cyan-600" />
            </div>
          }
          label={`${timeFrameRange.label} Savings`}
          value={`₹${Math.round(displaySavings).toLocaleString("en-IN")}`}
          additionalContent={
            <div className="mt-2 text-xs text-cyan-600 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span>{displayIncome > 0 ? Math.round((displaySavings / displayIncome) * 100) : 0}% of income</span>
              </div>
            </div>
          }
        />

        {/* Savings Rate Card */}
        <FinancialCard
          icon={
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
          }
          label="Savings Rate"
          value={(() => {
            const rate = typeof overviewMeta.savingsRate === "number"
              ? overviewMeta.savingsRate
              : displayIncome > 0 ? Math.round((displaySavings / displayIncome) * 100) : 0;
            return `${rate}%`;
          })()}
          additionalContent={(() => {
            const rate = typeof overviewMeta.savingsRate === "number"
              ? overviewMeta.savingsRate
              : displayIncome > 0 ? Math.round((displaySavings / displayIncome) * 100) : 0;
            const label = rate >= 30 ? "Excellent" : rate >= 20 ? "Good" : rate >= 10 ? "Fair" : "Needs improvement";
            const color = rate >= 30 ? "text-green-600" : rate >= 20 ? "text-[#C87830] font-semibold" : rate >= 10 ? "text-amber-600" : "text-red-500";
            return (
              <div className={`mt-2 text-xs ${color} font-medium`}>{label}</div>
            );
          })()}
        />
      </div>

      {/* Gauge Cards */}
      <div className={styles.gaugeGrid}>
        {gaugeData.map((gaugeItem) => (
          <GaugeCard
            key={gaugeItem.name}
            gauge={gaugeItem}
            colorInfo={GAUGE_COLORS[gaugeItem.name === "Spent" ? "Spent" : gaugeItem.name]}
            timeFrameLabel={timeFrameRange.label}
            highlightNegative={gaugeItem.name === "Savings"}
          />
        ))}
      </div>

      {/* 💳 Assets & Accounts Deck (ezbookkeeping style) */}
      <div className="mt-8 mb-8">
        <h2 className="text-xl font-extrabold mb-5 flex items-center gap-2 text-slate-800 dark:text-zinc-100">
          <Wallet className="w-6 h-6 text-teal-500" />
          My Accounts & Assets
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Frosted Assets Deck */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Bank Card */}
            <div className="p-5 rounded-2xl bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-white/40 dark:border-zinc-800/40 shadow-xl hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-3xl rounded-full group-hover:bg-teal-500/10 transition-all duration-500"></div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center border border-teal-100 dark:border-teal-900/40">
                  <span className="text-xl">🏦</span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#C87830] font-semibold dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2 py-1 rounded-md">Liquid</span>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Bank Account</p>
                <h3 className="text-2xl font-black mt-1 text-slate-800 dark:text-zinc-100">
                  ₹{Math.round(accountBalances["Bank Account"]).toLocaleString("en-IN")}
                </h3>
              </div>
            </div>

            {/* Cash Wallet Card */}
            <div className="p-5 rounded-2xl bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-white/40 dark:border-zinc-800/40 shadow-xl hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full group-hover:bg-emerald-500/10 transition-all duration-500"></div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/40">
                  <span className="text-xl">💵</span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-1 rounded-md">Cash</span>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Cash Wallet</p>
                <h3 className="text-2xl font-black mt-1 text-slate-800 dark:text-zinc-100">
                  ₹{Math.round(accountBalances["Cash"]).toLocaleString("en-IN")}
                </h3>
              </div>
            </div>

            {/* Credit Card Card */}
            <div className="p-5 rounded-2xl bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-white/40 dark:border-zinc-800/40 shadow-xl hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full group-hover:bg-orange-500/10 transition-all duration-500"></div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 flex items-center justify-center border border-orange-100 dark:border-orange-900/40">
                  <span className="text-xl">💳</span>
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-wider bg-orange-50 dark:bg-orange-950/60 px-2 py-1 rounded-md ${accountBalances["Credit Card"] < 0 ? "text-red-500" : "text-orange-600 dark:text-orange-400"}`}>
                  {accountBalances["Credit Card"] < 0 ? "Outstanding Debt" : "Credit"}
                </span>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Credit Card</p>
                <h3 className={`text-2xl font-black mt-1 ${accountBalances["Credit Card"] < 0 ? "text-red-500 dark:text-red-400" : "text-slate-800 dark:text-zinc-100"}`}>
                  ₹{Math.round(accountBalances["Credit Card"]).toLocaleString("en-IN")}
                </h3>
              </div>
            </div>

            {/* Investment Card */}
            <div className="p-5 rounded-2xl bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-white/40 dark:border-zinc-800/40 shadow-xl hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full group-hover:bg-cyan-500/10 transition-all duration-500"></div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 flex items-center justify-center border border-cyan-100 dark:border-cyan-900/40">
                  <span className="text-xl">📈</span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 px-2 py-1 rounded-md">Investment</span>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Investments Portfolio</p>
                <h3 className="text-2xl font-black mt-1 text-slate-800 dark:text-zinc-100">
                  ₹{Math.round(accountBalances["Investment"]).toLocaleString("en-IN")}
                </h3>
              </div>
            </div>

          </div>

          {/* Quick Transfer & Summary Card */}
          <div className="p-6 rounded-2xl bg-white/30 dark:bg-zinc-900/30 backdrop-blur-md border border-white/30 dark:border-zinc-800/30 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-2">Simulate Balance Transfer</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mb-4">Simulate moving funds (e.g. ATM withdrawal from Bank Account to Cash Wallet).</p>
              
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-400 uppercase font-bold">From</label>
                    <select id="transferFrom" className="w-full mt-1 p-2 rounded-lg bg-white/50 dark:bg-zinc-850 border border-slate-200 dark:border-zinc-700/50 text-xs dark:text-zinc-100">
                      <option value="Bank Account">🏦 Bank Account</option>
                      <option value="Cash">💵 Cash Wallet</option>
                      <option value="Credit Card">💳 Credit Card</option>
                      <option value="Investment">📈 Investment</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-400 uppercase font-bold">To</label>
                    <select id="transferTo" className="w-full mt-1 p-2 rounded-lg bg-white/50 dark:bg-zinc-850 border border-slate-200 dark:border-zinc-700/50 text-xs dark:text-zinc-100" defaultValue="Cash">
                      <option value="Bank Account">🏦 Bank Account</option>
                      <option value="Cash">💵 Cash Wallet</option>
                      <option value="Credit Card">💳 Credit Card</option>
                      <option value="Investment">📈 Investment</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold">Amount (₹)</label>
                  <input type="number" id="transferAmount" placeholder="e.g. 5000" className="w-full mt-1 p-2 rounded-lg bg-white/50 dark:bg-zinc-850 border border-slate-200 dark:border-zinc-700/50 text-xs dark:text-zinc-100" />
                </div>

                <button 
                  type="button"
                  onClick={() => {
                    const fromVal = document.getElementById("transferFrom").value;
                    const toVal = document.getElementById("transferTo").value;
                    const amountVal = Number(document.getElementById("transferAmount").value);
                    if (fromVal === toVal) {
                      alert("Source and target accounts must be different.");
                      return;
                    }
                    if (!amountVal || amountVal <= 0) {
                      alert("Please enter a valid transfer amount.");
                      return;
                    }
                    
                    const transfers = JSON.parse(localStorage.getItem("expensio_transfers") || "[]");
                    transfers.push({
                      id: Math.random().toString(36).substring(2),
                      from: fromVal,
                      to: toVal,
                      amount: amountVal,
                      date: new Date().toISOString()
                    });
                    localStorage.setItem("expensio_transfers", JSON.stringify(transfers));
                    document.getElementById("transferAmount").value = "";
                    
                    refreshTransactions();
                  }}
                  className="w-full py-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
                >
                  Confirm Transfer
                </button>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200/50 dark:border-zinc-800/50">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-zinc-400 font-bold uppercase tracking-wider">Net Assets</span>
                <span className="text-lg font-black text-[#C87830] font-semibold dark:text-teal-400">
                  ₹{Math.round(
                    Object.values(accountBalances).reduce((a, b) => a + b, 0)
                  ).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* Expense Distribution Pie Chart */}
        <div className={styles.pieChartContainer} style={{ margin: 0 }}>
          <div className={styles.pieChartHeader}>
            <h3 className={styles.pieChartTitle}>
              <PieChartIcon className="w-6 h-6 text-teal-500" />
              Expense Distribution
              <span className={styles.pieChartSubtitle}> ({timeFrameRange.label})</span>
            </h3>
          </div>
          <div className={styles.pieChartHeight}>
            {financialOverviewData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <Pie
                    data={financialOverviewData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => {
                      const pct = Math.round(percent * 100);
                      return pct > 0 ? `${name}: ${pct}%` : "";
                    }}
                    labelLine={false}
                  >
                    {financialOverviewData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        stroke={document.documentElement.classList.contains("dark") ? "rgba(24, 24, 27, 0.95)" : "#fff"}
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`₹${Math.round(value).toLocaleString("en-IN")}`, "Amount"]}
                    contentStyle={styles.tooltipContent}
                    itemStyle={styles.tooltipItem}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    formatter={(v) => <span className={styles.legendText}>{v}</span>}
                    iconSize={10}
                    iconType="circle"
                    wrapperStyle={styles.legendWrapper}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "12px", color: "#94a3b8" }}>
                <div className={styles.emptyIconContainer("bg-teal-50")}>
                  <ShoppingCart className="w-8 h-8 text-teal-300" />
                </div>
                <p style={{ fontSize: "0.95rem", fontWeight: 500 }}>No expense data yet</p>
                <p style={{ fontSize: "0.8rem" }}>Add expenses to see the distribution chart</p>
              </div>
            )}
          </div>
        </div>

        {/* Account Assets Allocation Chart */}
        <div className={styles.pieChartContainer} style={{ margin: 0 }}>
          <div className={styles.pieChartHeader}>
            <h3 className={styles.pieChartTitle}>
              <BarChart2 className="w-6 h-6 text-teal-500" />
              Account Assets Allocation
              <span className={styles.pieChartSubtitle}> (Current Status)</span>
            </h3>
          </div>
          <div className={styles.pieChartHeight}>
            {Object.values(accountBalances).some(v => v !== 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <Pie
                    data={Object.keys(accountBalances)
                      .map(key => ({
                        name: key,
                        value: Math.max(0, accountBalances[key]),
                      }))
                      .filter(item => {
                        const total = Object.values(accountBalances).reduce((sum, v) => sum + Math.max(0, v), 0);
                        return total > 0 ? (item.value / total) >= 0.01 : false;
                      })}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => {
                      const pct = Math.round(percent * 100);
                      return pct > 0 ? `${name.split(" ")[0]}: ${pct}%` : "";
                    }}
                    labelLine={false}
                  >
                    {Object.keys(accountBalances)
                      .map(key => ({
                        name: key,
                        value: Math.max(0, accountBalances[key]),
                      }))
                      .filter(item => {
                        const total = Object.values(accountBalances).reduce((sum, v) => sum + Math.max(0, v), 0);
                        return total > 0 ? (item.value / total) >= 0.01 : false;
                      })
                      .map((entry, index) => {
                        const accountColors = {
                          "Bank Account": COLORS[3 % COLORS.length],
                          "Cash": COLORS[4 % COLORS.length],
                          "Credit Card": COLORS[5 % COLORS.length],
                          "Investment": COLORS[6 % COLORS.length]
                        };
                        return (
                          <Cell
                            key={`cell-${entry.name}`}
                            fill={accountColors[entry.name] || COLORS[index % COLORS.length]}
                            stroke={document.documentElement.classList.contains("dark") ? "rgba(24, 24, 27, 0.95)" : "#fff"}
                            strokeWidth={2}
                          />
                        );
                      })}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`₹${Math.round(value).toLocaleString("en-IN")}`, "Balance"]}
                    contentStyle={styles.tooltipContent}
                    itemStyle={styles.tooltipItem}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    formatter={(v) => <span className={styles.legendText}>{v}</span>}
                    iconSize={10}
                    iconType="circle"
                    wrapperStyle={styles.legendWrapper}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "12px", color: "#94a3b8" }}>
                <div className={styles.emptyIconContainer("bg-teal-50")}>
                  <Wallet className="w-8 h-8 text-teal-300" />
                </div>
                <p style={{ fontSize: "0.95rem", fontWeight: 500 }}>No assets recorded yet</p>
                <p style={{ fontSize: "0.8rem" }}>Add positive balances to view allocation chart</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Income and Expense Columns */}
      <div className={styles.listsGrid}>
        {/* Income Column */}
        <div className={styles.listContainer}>
          <div className={styles.listHeader}>
            <h3 className={styles.listTitle}>
              <ArrowUp className="w-6 h-6 text-green-500" /> Recent Income
              <span className={styles.listSubtitle}> ({timeFrameRange.label})</span>
            </h3>
            <span className={styles.incomeCountBadge}>
              {incomeListForDisplay.length} records
            </span>
          </div>

          <div className={styles.transactionList}>
            {displayedIncome.map((transaction) => {
              const IconComponent = INCOME_CATEGORY_ICONS[transaction.category] || INCOME_CATEGORY_ICONS.Other;
              return (
                <div key={transaction.id} className={styles.incomeTransactionItem}>
                  <div className={styles.transactionContent}>
                    <div className={styles.incomeIconContainer}>
                      {IconComponent}
                    </div>
                    <div>
                      <p className={styles.transactionDescription}>{transaction.description}</p>
                      <p className={styles.transactionCategory}>{transaction.category}</p>
                    </div>
                  </div>
                  <div className={styles.transactionAmount}>
                    <p className={styles.incomeAmount}>+₹{Math.abs(transaction.amount).toLocaleString("en-IN")}</p>
                    <p className={styles.transactionDate}>{new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                </div>
              );
            })}

            {incomeListForDisplay.length === 0 && (
              <div className={styles.emptyState}>
                <div className={styles.emptyIconContainer("bg-green-50")}>
                  <IndianRupee className="w-8 h-8 text-green-400" />
                </div>
                <p className={styles.emptyText}>No income transactions</p>
              </div>
            )}

            {incomeListForDisplay.length > 3 && (
              <div className={styles.viewAllContainer}>
                <button 
                  onClick={() => setShowAllIncome(!showAllIncome)}
                  className={styles.viewAllButton}
                >
                  {showAllIncome ? (
                    <>
                      <ChevronUp className="w-5 h-5" /> Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-5 h-5" /> View All Income ({incomeListForDisplay.length})
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Expense Column */}
        <div className={styles.listContainer}>
          <div className={styles.listHeader}>
            <h3 className={styles.listTitle}>
              <ArrowDown className="w-6 h-6 text-orange-500" /> Recent Expenses
              <span className={styles.listSubtitle}> ({timeFrameRange.label})</span>
            </h3>
            <span className={styles.expenseCountBadge}>
              {expenseListForDisplay.length} records
            </span>
          </div>

          <div className={styles.transactionList}>
            {displayedExpense.map((transaction) => {
              const IconComponent = EXPENSE_CATEGORY_ICONS[transaction.category] || EXPENSE_CATEGORY_ICONS.Other;
              return (
                <div key={transaction.id} className={styles.expenseTransactionItem}>
                  <div className={styles.transactionContent}>
                    <div className={styles.expenseIconContainer}>
                      {IconComponent}
                    </div>
                    <div>
                      <p className={styles.transactionDescription}>{transaction.description}</p>
                      <p className={styles.transactionCategory}>{transaction.category}</p>
                    </div>
                  </div>
                  <div className={styles.transactionAmount}>
                    <p className={styles.expenseAmount}>-₹{Math.abs(transaction.amount).toLocaleString("en-IN")}</p>
                    <p className={styles.transactionDate}>{new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                </div>
              );
            })}

            {expenseListForDisplay.length === 0 && (
              <div className={styles.emptyState}>
                <div className={styles.emptyIconContainer("bg-orange-50")}>
                  <ShoppingCart className="w-8 h-8 text-orange-400" />
                </div>
                <p className={styles.emptyText}>No expense transactions</p>
              </div>
            )}

            {expenseListForDisplay.length > 3 && (
              <div className={styles.viewAllContainer}>
                <button 
                  onClick={() => setShowAllExpense(!showAllExpense)}
                  className={styles.viewAllButton}
                >
                  {showAllExpense ? (
                    <>
                      <ChevronUp className="w-5 h-5" /> Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-5 h-5" /> View All Expenses ({expenseListForDisplay.length})
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      <AddTransactionModal
        showModal={showModal}
        setShowModal={setShowModal}
        newTransaction={newTransaction}
        setNewTransaction={setNewTransaction}
        handleAddTransaction={handleAddTransaction}
        loading={loading}
        type="expense"
        title="Add New Transaction"
        buttonText="Add Transaction"
        categories={[
          "Food",
          "Housing",
          "Transport",
          "Shopping",
          "Entertainment",
          "Utilities",
          "Healthcare",
          "Other",
          "Salary",
          "Freelance",
          "Investment",
          "Bonus"
        ]}
        color="teal"
      />
    </div>
  );
};

export default Dashboard;
