import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const safeArrayFromResponse = (res) => {
  const body = res?.data;
  if (!body) return [];
  if (Array.isArray(body)) return body;
  if (Array.isArray(body.data)) return body.data;
  if (Array.isArray(body.incomes)) return body.incomes;
  if (Array.isArray(body.expenses)) return body.expenses;
  return [];
};

const filterTransactions = (transactions, frame) => {
  const now = new Date();
  const todayStart = new Date(now).setHours(0, 0, 0, 0);
  const todayEnd = new Date(now).setHours(23, 59, 59, 999);

  switch (frame) {
    case "daily":
      // Show all transactions for today (past, present and future times today)
      return transactions.filter((t) => {
        const d = new Date(t.date);
        return d >= new Date(todayStart) && d <= new Date(todayEnd);
      });
    case "weekly": {
      // Show the full current week (Sun–Sat), including future days in the week
      const startOfWeek = new Date(todayStart);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      return transactions.filter((t) => {
        const d = new Date(t.date);
        return d >= startOfWeek && d <= endOfWeek;
      });
    }
    case "monthly":
      // Show the full current calendar month (including future dates this month)
      return transactions.filter((t) => {
        const d = new Date(t.date);
        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      });
    case "yearly":
      // Show all transactions in the current year (including future months)
      return transactions.filter(
        (t) => new Date(t.date).getFullYear() === now.getFullYear()
      );
    default:
      return transactions;
  }
};

const Layout = ({ user, onLogout }) => {
  const [transactions, setTransactions] = useState([]);
  const [timeFrame, setTimeFrame] = useState("monthly");
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const navigate = useNavigate();

  // Globally shared custom period and date selection
  const now = new Date();
  const todayString = new Date().toISOString().split("T")[0];

  const [customPeriod, setCustomPeriod] = useState(null);
  const [pickerMonth, setPickerMonth] = useState(now.getMonth());
  const [pickerYear, setPickerYear] = useState(now.getFullYear());
  const [pickerDate, setPickerDate] = useState(todayString);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const [incomeRes, expenseRes] = await Promise.all([
        axios.get(`${API_BASE}/income/get`, { headers }),
        axios.get(`${API_BASE}/expense/get`, { headers }),
      ]);

      const incomes = safeArrayFromResponse(incomeRes).map((i) => ({
        ...i,
        type: "income",
      }));
      const expenses = safeArrayFromResponse(expenseRes).map((e) => ({
        ...e,
        type: "expense",
      }));

      const txAccounts = JSON.parse(localStorage.getItem("expensio_tx_accounts") || "{}");
      const allTransactions = [...incomes, ...expenses]
        .map((t) => {
          const id = t._id || t.id || t.id_str || Math.random().toString(36).slice(2);
          let account = txAccounts[id];
          if (!account) {
            // Deterministic default based on category and type
            const category = (t.category || t.type || "Other").toLowerCase();
            if (t.type === "income") {
              if (
                category.includes("salary") ||
                category.includes("freelance") ||
                category.includes("investment") ||
                category.includes("dividend") ||
                category.includes("bonus")
              ) {
                account = "Bank Account";
              } else {
                account = "Cash";
              }
            } else {
              // expense
              if (
                category.includes("grocery") ||
                category.includes("food") ||
                category.includes("shop") ||
                category.includes("entertain") ||
                category.includes("utility") ||
                category.includes("bill") ||
                category.includes("housing") ||
                category.includes("transport")
              ) {
                account = "Credit Card";
              } else if (
                category.includes("investment") ||
                category.includes("stock") ||
                category.includes("mutual")
              ) {
                account = "Investment";
              } else {
                account = "Cash";
              }
            }
          }
          return {
            id,
            description: t.description || t.title || t.note || "",
            amount: t.amount != null ? Number(t.amount) : Number(t.value) || 0,
            date: t.date || t.createdAt || new Date().toISOString(),
            category: t.category || t.type || "Other",
            type: t.type,
            account,
            raw: t,
          };
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      setTransactions(allTransactions);
      setLastUpdated(new Date());
    } catch (err) {
      console.error(
        "Failed to fetch transactions",
        err?.response || err.message || err
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const addTransaction = async (transaction) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const endpoint =
        transaction.type === "income" ? "income/add" : "expense/add";
      
      const { account, ...payload } = transaction;
      const res = await axios.post(`${API_BASE}/${endpoint}`, payload, { headers });
      
      const added = res.data?.data || res.data?.income || res.data?.expense || res.data;
      const id = added?._id || added?.id;
      if (id && account) {
        const txAccounts = JSON.parse(localStorage.getItem("expensio_tx_accounts") || "{}");
        txAccounts[id] = account;
        localStorage.setItem("expensio_tx_accounts", JSON.stringify(txAccounts));
      }
      
      await fetchTransactions();
      return true;
    } catch (err) {
      console.error(
        "Failed to add transaction",
        err?.response || err.message || err
      );
      throw err;
    }
  };

  const editTransaction = async (id, transaction) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const endpoint =
        transaction.type === "income" ? "income/update" : "expense/update";
      
      const { account, ...payload } = transaction;
      await axios.put(`${API_BASE}/${endpoint}/${id}`, payload, {
        headers,
      });
      
      if (account) {
        const txAccounts = JSON.parse(localStorage.getItem("expensio_tx_accounts") || "{}");
        txAccounts[id] = account;
        localStorage.setItem("expensio_tx_accounts", JSON.stringify(txAccounts));
      }
      
      await fetchTransactions();
      return true;
    } catch (err) {
      console.error(
        "Failed to edit transaction",
        err?.response || err.message || err
      );
      throw err;
    }
  };

  const deleteTransaction = async (id, type) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const endpoint = type === "income" ? "income/delete" : "expense/delete";
      await axios.delete(`${API_BASE}/${endpoint}/${id}`, { headers });
      
      const txAccounts = JSON.parse(localStorage.getItem("expensio_tx_accounts") || "{}");
      if (txAccounts[id]) {
        delete txAccounts[id];
        localStorage.setItem("expensio_tx_accounts", JSON.stringify(txAccounts));
      }
      
      await fetchTransactions();
      return true;
    } catch (err) {
      console.error(
        "Failed to delete transaction",
        err?.response || err.message || err
      );
      throw err;
    }
  };

  const updateTransactionAccount = useCallback((id, accountName) => {
    const txAccounts = JSON.parse(localStorage.getItem("expensio_tx_accounts") || "{}");
    txAccounts[id] = accountName;
    localStorage.setItem("expensio_tx_accounts", JSON.stringify(txAccounts));
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const filteredTransactions = useMemo(
    () => filterTransactions(transactions, timeFrame),
    [transactions, timeFrame]
  );

  const outletContext = {
    transactions: filteredTransactions,
    allTransactions: transactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    refreshTransactions: fetchTransactions,
    updateTransactionAccount,
    timeFrame,
    setTimeFrame,
    customPeriod,
    setCustomPeriod,
    pickerMonth,
    setPickerMonth,
    pickerYear,
    setPickerYear,
    pickerDate,
    setPickerDate,
    lastUpdated,
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#121212] text-slate-800 dark:text-zinc-100 transition-colors duration-300 relative flex flex-col">
      <Navbar user={user} onLogout={onLogout} />
      <main className="w-full max-w-none px-4 sm:px-6 lg:px-10 py-8 relative z-10 flex-1">
        <Outlet context={outletContext} />
      </main>
    </div>
  );
};

export default Layout;
