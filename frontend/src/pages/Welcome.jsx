import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  Calendar, 
  Download, 
  ArrowRight, 
  ChevronDown, 
  Check, 
  Plus, 
  Trash2, 
  Lock, 
  FileSpreadsheet, 
  Menu, 
  X, 
  Sparkles,
  ChevronRight
} from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Showcase Tab 1 (Hero browser container)
  const [heroActiveTab, setHeroActiveTab] = useState("analytics");
  
  // Showcase Simulated States
  const [inflowValue, setInflowValue] = useState(75000);
  const [outflowValue, setOutflowValue] = useState(28500);
  const [simulatedTxList, setSimulatedTxList] = useState([
    { id: 1, desc: "Freelance Client Work", type: "income", category: "Salary", amount: 15000, date: "May 26, 2026" },
    { id: 2, desc: "Organic Food Groceries", type: "expense", category: "Food", amount: 3450, date: "May 25, 2026" },
    { id: 3, desc: "High-Speed Internet", type: "expense", category: "Utilities", amount: 999, date: "May 24, 2026" }
  ]);
  
  // Interactive addition in Hero showcase
  const handleAddTestPayment = () => {
    const freshIncomes = [
      { desc: "Website Consulting", amount: 12000, category: "Salary" },
      { desc: "Design Assets Sold", amount: 4500, category: "Freelance" },
      { desc: "Bonus Commission", amount: 8000, category: "Salary" }
    ];
    // Select one randomly
    const randomPay = freshIncomes[Math.floor(Math.random() * freshIncomes.length)];
    const newTx = {
      id: Date.now(),
      desc: randomPay.desc,
      type: "income",
      category: randomPay.category,
      amount: randomPay.amount,
      date: "May 26, 2026"
    };
    setSimulatedTxList([newTx, ...simulatedTxList.slice(0, 2)]);
    setInflowValue(prev => prev + randomPay.amount);
  };

  // Timeframe Isolation Simulated State
  const [selectedMonth, setSelectedMonth] = useState("May");
  const getMonthBalanceData = () => {
    switch (selectedMonth) {
      case "May":
        return { balance: inflowValue - outflowValue, inflow: inflowValue, outflow: outflowValue, percent: Math.round((outflowValue / inflowValue) * 100) };
      case "Jun":
        return { balance: 54000, inflow: 82000, outflow: 28000, percent: 34 };
      case "Jul":
        return { balance: 35200, inflow: 65000, outflow: 29800, percent: 45 };
      default:
        return { balance: 46500, inflow: 75000, outflow: 28500, percent: 38 };
    }
  };

  // Section 2: Real-time Form Insertion state (Capabilities Section)
  const [capFormName, setCapFormName] = useState("");
  const [capFormAmount, setCapFormAmount] = useState("");
  const [capFormCategory, setCapFormCategory] = useState("Food");
  const [capFormType, setCapFormType] = useState("expense");
  const [capLedgerList, setCapLedgerList] = useState([
    { id: 101, desc: "Movie tickets & Popcorn", type: "expense", category: "Entertainment", amount: 850 },
    { id: 102, desc: "MERN Dev Consulting", type: "income", category: "Salary", amount: 25000 },
    { id: 103, desc: "Office Workspace Rent", type: "expense", category: "Rent", amount: 8000 }
  ]);
  
  const handleInsertLedgerEntry = (e) => {
    e.preventDefault();
    if (!capFormName.trim() || !capFormAmount || parseFloat(capFormAmount) <= 0) return;
    
    const newEntry = {
      id: Date.now(),
      desc: capFormName,
      type: capFormType,
      category: capFormCategory,
      amount: parseFloat(capFormAmount)
    };
    
    setCapLedgerList([newEntry, ...capLedgerList]);
    setCapFormName("");
    setCapFormAmount("");
  };

  // Donut chart hover recommendation state
  const [hoveredCategory, setHoveredCategory] = useState("Food");
  const getCategoryRecommendation = () => {
    switch (hoveredCategory) {
      case "Food":
        return "You're spending 40% on Food. Try prep-meals to save roughly ₹3,500 monthly!";
      case "Rent":
        return "Rent sits at 30%. Excellent ratio for your budget safety brackets.";
      case "Utilities":
        return "Utilities at 20%. Consider mapping dynamic subscriptions.";
      case "Other":
        return "Other expenses at 10%. Perfect limit for minor disposable outlays.";
      default:
        return "Hover over categories to unlock automated optimization suggestions.";
    }
  };

  // Section 3: "More and more..." Accordion switcher state
  const [activeAccordion, setActiveAccordion] = useState("vault");
  
  // CSV Export simulation state
  const [exportingStatus, setExportingStatus] = useState("idle"); // idle, exporting, complete
  const handleSimulateCSVExport = () => {
    setExportingStatus("exporting");
    setTimeout(() => {
      setExportingStatus("complete");
      setTimeout(() => setExportingStatus("idle"), 3000);
    }, 1500);
  };

  // Expandable FAQ State
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans antialiased overflow-x-hidden relative">
      
      {/* 🌌 Large Glowing Ambient Background Blur Spheres (SleekDemo Style) */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-gradient-to-b from-orange-500/10 to-transparent blur-[160px] rounded-full"></div>
        <div className="absolute top-[30%] right-10 w-[500px] h-[500px] bg-amber-500/5 blur-[180px] rounded-full"></div>
        <div className="absolute top-[60%] left-10 w-[600px] h-[600px] bg-rose-500/5 blur-[160px] rounded-full"></div>
      </div>

      {/* 🧭 Fixed Floating Sleek Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 px-4 pt-4">
        <nav className="max-w-5xl mx-auto bg-black/60 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full flex items-center justify-between shadow-2xl shadow-black/50 transition-all duration-300">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-[9px] bg-[#C87830] flex items-center justify-center shadow-md shrink-0">
              <svg className="w-5 h-5 text-neutral-950" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2.5" />
                <path d="M12 4 C16.42 4 20 7.58 20 12 L12 12 Z" fill="currentColor" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight text-white select-none">
              expensio
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm">
            <a href="#features" className="text-zinc-400 hover:text-white transition-colors font-medium">Features</a>
            <a href="#faq" className="text-zinc-400 hover:text-white transition-colors font-medium">FAQ</a>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => navigate("/login")}
              className="text-zinc-400 hover:text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-white text-neutral-950 font-black px-5 py-2.5 rounded-full text-xs hover:bg-zinc-200 transition-all duration-300 transform active:scale-95 cursor-pointer shadow-lg"
            >
              Get Started Free
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-zinc-450 hover:text-white transition-colors z-50 cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-4 right-4 bg-neutral-900 border border-zinc-800 p-6 rounded-2xl shadow-2xl flex flex-col space-y-5 md:hidden z-40 backdrop-blur-xl"
            >
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-300 hover:text-white font-medium py-1"
              >
                Features
              </a>

              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-300 hover:text-white font-medium py-1"
              >
                FAQ
              </a>
              <div className="h-px bg-zinc-800/80 w-full my-1"></div>
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/login");
                  }}
                  className="w-full py-3 bg-neutral-900 border border-zinc-800 hover:bg-zinc-850 rounded-xl text-sm font-semibold transition-all cursor-pointer text-center text-white"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/signup");
                  }}
                  className="w-full py-3 bg-white text-neutral-950 hover:bg-zinc-200 rounded-xl text-sm font-bold transition-all transform active:scale-95 cursor-pointer text-center font-black"
                >
                  Get Started Free
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 🚀 Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-28 px-4 sm:px-6">
        
        {/* Sleek rotating layout background grids */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none opacity-[0.03]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4.5rem_4.5rem]"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center space-y-8">
          
          {/* Pill Badge Announcement (SleekDemo Style) */}
          <div className="flex justify-center">
            <a
              href="#features"
              className="bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 px-4 py-1.5 rounded-full text-xs font-semibold text-zinc-300 shadow-md transition-all duration-300 flex items-center gap-2 hover:border-zinc-700"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping"></span>
              Introducing expensio — Personal Budget Analytics
            </a>
          </div>

          {/* Elegant White-to-Zinc Header Title */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-[5.5rem] font-extrabold tracking-tighter leading-[1.05] select-none text-white">
              <span className="bg-gradient-to-b from-white via-white via-20% to-zinc-400/90 bg-clip-text text-transparent">
                Expense Tracking 
              </span>
              
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-zinc-450 max-w-2xl mx-auto leading-relaxed">
              Track your income, manage expenses, and separate budgets using detailed time selectors. This tool is ideal for students, professionals, and families.
            </p>
          </div>

          {/* Action CTAs inside package pill outlines */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="bg-white/5 rounded-xl border border-zinc-800 p-0.5 w-full sm:w-auto hover:border-zinc-700 transition-colors shadow-xl">
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="w-full sm:w-auto bg-white text-neutral-950 font-extrabold px-8 py-4 rounded-lg shadow-2xl hover:bg-zinc-200 transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-98 cursor-pointer"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 text-neutral-950 stroke-[2.5]" />
              </button>
            </div>
            
            <div className="bg-zinc-900/40 rounded-xl border border-zinc-850 p-0.5 w-full sm:w-auto hover:border-zinc-800 transition-colors">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-full sm:w-auto bg-neutral-900 hover:bg-zinc-850 border border-zinc-800 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center cursor-pointer"
              >
                Sign In to Account
              </button>
            </div>
          </div>

          {/* 💻 Hero Device Frame Showcase (Primary Video Placeholder Replacement) */}
          <div className="relative mt-16 md:mt-24 max-w-5xl mx-auto px-2">
            <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-orange-500 to-amber-500 opacity-20 blur-2xl"></div>
            
            {/* Device Container */}
            <div className="inset-shadow-2xs bg-neutral-950 relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-800 p-1 sm:p-3 md:p-4 shadow-2xl ring-1 ring-white/5">
              <div className="bg-neutral-950 rounded-xl overflow-hidden border border-zinc-900 shadow-inner">
                
                {/* Mock Browser Header */}
                <div className="flex items-center justify-between px-3 sm:px-4 py-3 bg-neutral-900/60 border-b border-zinc-800/80">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 shrink-0"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 shrink-0"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 shrink-0"></span>
                    <span className="text-[10px] sm:text-xs text-zinc-550 font-mono ml-3 select-none hidden sm:inline">
                      https://expensio.app/dashboard
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-zinc-500 font-mono tracking-widest bg-zinc-950/60 px-2 py-0.5 rounded border border-zinc-850 select-none">
                    MERN APP RUNNING
                  </span>
                </div>

                {/* Dashboard Panel Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6 text-left">
                  
                  {/* Left Column Controls */}
                  <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
                    <div className="space-y-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20">
                        <Sparkles className="w-3 h-3 fill-current" /> Live Interface Demo
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                        Interactive Dashboard Showcase
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        Say goodbye to complex ledgers. Expensio computes budget metrics automatically, showing your earnings, spendings, and overall savings rates in Indian Rupees.
                      </p>
                    </div>

                    {/* Show/Hide Tab selectors */}
                    <div className="flex flex-col gap-2.5">
                      <button
                        type="button"
                        onClick={() => setHeroActiveTab("analytics")}
                        className={`p-3.5 rounded-xl border text-left flex items-start gap-3.5 transition-all duration-300 cursor-pointer ${
                          heroActiveTab === "analytics"
                            ? "bg-zinc-900 border-orange-500/30 shadow-lg shadow-orange-500/5"
                            : "bg-transparent border-transparent hover:bg-zinc-900/30"
                        }`}
                      >
                        <div className="w-8.5 h-8.5 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0 mt-0.5">
                          <TrendingUp className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white">Visual Cash Velocity</h4>
                          <p className="text-[10px] text-zinc-500 mt-0.5">Real-time inflows, outflows, and live SVG progress charting.</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setHeroActiveTab("timeframe")}
                        className={`p-3.5 rounded-xl border text-left flex items-start gap-3.5 transition-all duration-300 cursor-pointer ${
                          heroActiveTab === "timeframe"
                            ? "bg-zinc-900 border-orange-500/30 shadow-lg shadow-orange-500/5"
                            : "bg-transparent border-transparent hover:bg-zinc-900/30"
                        }`}
                      >
                        <div className="w-8.5 h-8.5 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                          <Calendar className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white">Timeframe Isolation</h4>
                          <p className="text-[10px] text-zinc-500 mt-0.5">Isolate income-to-expense metrics across calendar views.</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Right Column Showcase Panel */}
                  <div className="lg:col-span-7 bg-zinc-900/40 border border-zinc-855 rounded-2xl p-4 sm:p-6 relative overflow-hidden flex flex-col justify-between min-h-[380px] shadow-2xl">
                    <AnimatePresence mode="wait">
                      {heroActiveTab === "analytics" && (
                        <motion.div
                          key="analytics"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6 flex-grow flex flex-col justify-between"
                        >
                          {/* Financial Metric Cards */}
                          <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <div className="bg-neutral-950 p-4 rounded-xl border border-zinc-900 relative group overflow-hidden">
                              <div className="absolute top-0 left-0 h-full w-1 bg-emerald-500"></div>
                              <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">Total Inflow</span>
                              <p className="text-lg sm:text-xl font-black text-emerald-400 mt-1">
                                ₹{inflowValue.toLocaleString("en-IN")}.00
                              </p>
                            </div>
                            
                            <div className="bg-neutral-950 p-4 rounded-xl border border-zinc-900 relative group overflow-hidden">
                              <div className="absolute top-0 left-0 h-full w-1 bg-rose-500"></div>
                              <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">Total Outflow</span>
                              <p className="text-lg sm:text-xl font-black text-rose-400 mt-1">
                                ₹{outflowValue.toLocaleString("en-IN")}.00
                              </p>
                            </div>
                          </div>

                          {/* Dynamic SVG Area Chart based on states */}
                          <div className="h-32 bg-neutral-950 rounded-xl border border-zinc-900 p-4 relative overflow-hidden flex items-end">
                            <svg className="w-full h-[85%] overflow-visible" viewBox="0 0 100 50" preserveAspectRatio="none">
                              <defs>
                                <linearGradient id="velocityGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.4"/>
                                  <stop offset="100%" stopColor="#f97316" stopOpacity="0.0"/>
                                </linearGradient>
                              </defs>
                              {/* Draw vector chart line reacting to state scale values */}
                              <path 
                                d={`M 0,40 Q 20,${45 - (inflowValue / 3000)} 40,${40 - (outflowValue / 2000)} T 80,18 T 100,5`} 
                                fill="none" 
                                stroke="#f97316" 
                                strokeWidth="2.5" 
                                strokeLinecap="round" 
                              />
                              <path 
                                d={`M 0,40 Q 20,${45 - (inflowValue / 3000)} 40,${40 - (outflowValue / 2000)} T 80,18 T 100,5 L 100,50 L 0,50 Z`} 
                                fill="url(#velocityGrad)" 
                              />
                            </svg>
                            
                            <div className="absolute top-2.5 left-3.5 flex items-center gap-1.5 bg-neutral-950 border border-zinc-900 px-2.5 py-1 rounded-md">
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                              <span className="text-[9px] text-orange-400 font-bold uppercase tracking-wider">Cash Velocity</span>
                            </div>
                            
                            <button
                              type="button"
                              onClick={handleAddTestPayment}
                              className="absolute top-2.5 right-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold text-[9px] px-2 py-1 rounded flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-md"
                            >
                              <Plus className="w-2.5 h-2.5 text-zinc-400" />
                              Add Payment
                            </button>
                          </div>

                          {/* Live Transaction Ledger feed */}
                          <div className="space-y-2">
                            <span className="text-[9px] text-zinc-550 font-bold uppercase tracking-wider block">Live Ledger Feed</span>
                            <div className="space-y-2">
                              {simulatedTxList.map(tx => (
                                <motion.div
                                  key={tx.id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className="flex items-center justify-between p-3 bg-neutral-950 rounded-xl border border-zinc-900 text-xs"
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs shrink-0 ${
                                      tx.type === "income" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                                    }`}>
                                      {tx.type === "income" ? "₹" : "−"}
                                    </div>
                                    <div className="min-w-0">
                                      <p className="font-semibold text-white truncate text-[11px] sm:text-xs">{tx.desc}</p>
                                      <p className="text-[9px] text-zinc-550 truncate font-mono">{tx.date} • {tx.category}</p>
                                    </div>
                                  </div>
                                  <span className={`font-extrabold shrink-0 text-[11px] sm:text-xs ${
                                    tx.type === "income" ? "text-emerald-400" : "text-rose-450"
                                  }`}>
                                    {tx.type === "income" ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN")}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {heroActiveTab === "timeframe" && (
                        <motion.div
                          key="timeframe"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6 flex-grow flex flex-col justify-between"
                        >
                          {/* Simulated Month Selector Button Group */}
                          <div className="flex items-center justify-between bg-neutral-950 p-1.5 rounded-xl border border-zinc-900">
                            {["May", "Jun", "Jul"].map(m => (
                              <button
                                key={m}
                                type="button"
                                onClick={() => setSelectedMonth(m)}
                                className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all duration-300 w-1/3 text-center ${
                                  selectedMonth === m
                                    ? "bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-md"
                                    : "text-zinc-550 hover:text-zinc-300 border border-transparent"
                                }`}
                              >
                                {m} 2026
                              </button>
                            ))}
                          </div>

                          {/* Isolated Ledger metrics display */}
                          <div className="bg-neutral-950 p-5 rounded-xl border border-zinc-900 space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-zinc-450 font-medium">Isolated Balance ({selectedMonth})</span>
                              <span className="text-[9px] font-bold text-orange-400 uppercase bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20 font-mono">
                                Active Filter
                              </span>
                            </div>
                            <p className="text-3xl font-black text-white">
                              ₹{getMonthBalanceData().balance.toLocaleString("en-IN")}.00
                            </p>
                            
                            {/* Animated progress bar */}
                            <div className="space-y-1.5">
                              <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                                <motion.div 
                                  className="bg-gradient-to-r from-orange-500 to-amber-500 h-full"
                                  initial={{ width: "0%" }}
                                  animate={{ width: `${getMonthBalanceData().percent}%` }}
                                  transition={{ duration: 0.5, ease: "easeOut" }}
                                />
                              </div>
                              <div className="flex items-center justify-between text-[10px] text-zinc-550 font-mono font-medium">
                                <span>Outflow speed: {getMonthBalanceData().percent}%</span>
                                <span>Total inflow: ₹{getMonthBalanceData().inflow.toLocaleString("en-IN")}</span>
                              </div>
                            </div>
                          </div>

                          {/* Timeframe isolate advice box */}
                          <div className="bg-orange-500/5 border border-orange-500/10 rounded-xl p-4 flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                            <div>
                              <h5 className="text-xs font-bold text-orange-400">Dynamic isolation in play</h5>
                              <p className="text-[10px] text-zinc-400 leading-relaxed mt-1">
                                Switching timeframe isolating months re-computes the entire ledger system on the fly. Try clicking different month filters above!
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
            {/* Elegant fading mirror under browser frame */}
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* 🛠️ Responsive Capabilities Grid Section (Secondary Video Placeholder Replacement) */}
      <section id="features" className="py-20 md:py-32 border-t border-dashed border-zinc-900 bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              📊 Ledger Controls
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white via-white via-20% to-zinc-400 bg-clip-text text-transparent leading-tight">
              Automated Ledger & Classifications
            </h2>
            <p className="text-sm sm:text-base text-zinc-450 max-w-xl mx-auto">
              Test the real-time double-entry engine directly below. Expensio automates financial breakdowns with ultimate mobile responsiveness.
            </p>
          </div>

          {/* Core Feature Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-5xl mx-auto">
            
            {/* Left Box: Interactive form addition */}
            <div className="relative overflow-hidden group">
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500"></div>
              <div className="inset-shadow-2xs bg-neutral-950 relative w-full h-full overflow-hidden rounded-3xl border border-zinc-900 p-2 sm:p-4 shadow-xl ring-1 ring-white/5 group-hover:border-zinc-800 transition-colors duration-300">
                <div className="bg-neutral-950 rounded-2xl p-5 sm:p-6 h-full flex flex-col justify-between border border-zinc-950 space-y-6">
                  
                  {/* Info Header */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-[#ffedd5] uppercase tracking-wider bg-[#C87830] px-2.5 py-1 rounded shadow-sm select-none">
                        Double-Entry Ledger Form
                      </span>
                      <span className="text-[9.5px] text-zinc-400 font-semibold">Simulate a log addition</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Interactive Log Additions</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Add dummy transactions to the sandbox below and watch them seamlessly merge into the live-calculating ledger!
                    </p>
                  </div>

                  {/* Sandbox Form */}
                  <form onSubmit={handleInsertLedgerEntry} className="space-y-3 bg-zinc-900/30 p-4 rounded-xl border border-zinc-900 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mb-1">Entry Name</label>
                        <input
                          type="text"
                          value={capFormName}
                          onChange={(e) => setCapFormName(e.target.value)}
                          placeholder="e.g. Starbucks Cafe"
                          className="w-full px-3 py-2 bg-neutral-950 rounded-lg border border-zinc-850 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mb-1">Amount (₹)</label>
                        <input
                          type="number"
                          value={capFormAmount}
                          onChange={(e) => setCapFormAmount(e.target.value)}
                          placeholder="Amount in Rupee"
                          className="w-full px-3 py-2 bg-neutral-950 rounded-lg border border-zinc-850 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mb-1">Category</label>
                        <select
                          value={capFormCategory}
                          onChange={(e) => setCapFormCategory(e.target.value)}
                          className="w-full px-2.5 py-2 bg-neutral-950 rounded-lg border border-zinc-850 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors"
                        >
                          <option value="Food">Food</option>
                          <option value="Rent">Rent</option>
                          <option value="Utilities">Utilities</option>
                          <option value="Salary">Salary</option>
                          <option value="Entertainment">Entertainment</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mb-1">Entry Type</label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setCapFormType("income")}
                            className={`w-1/2 py-2 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                              capFormType === "income"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                : "bg-neutral-950 text-zinc-400 border-zinc-850"
                            }`}
                          >
                            Income
                          </button>
                          <button
                            type="button"
                            onClick={() => setCapFormType("expense")}
                            className={`w-1/2 py-2 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                              capFormType === "expense"
                                ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                                : "bg-neutral-950 text-zinc-400 border-zinc-850"
                            }`}
                          >
                            Expense
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-white text-neutral-950 font-bold text-xs rounded-lg hover:bg-zinc-200 transition-all cursor-pointer flex justify-center items-center gap-1.5 shadow-lg active:scale-98"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Insert into Ledger
                    </button>
                  </form>

                  {/* Result List with Framer Motion slide animation */}
                  <div className="space-y-2">
                    <span className="text-[9px] text-zinc-550 font-bold uppercase tracking-wider block">Real-time Sandbox Logs</span>
                    <div className="space-y-2 max-h-36 overflow-y-auto custom-scrollbar pr-1">
                      <AnimatePresence initial={false}>
                        {capLedgerList.map(entry => (
                          <motion.div
                            key={entry.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center justify-between p-2.5 bg-neutral-950 rounded-xl border border-zinc-900 text-xs overflow-hidden"
                          >
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full shrink-0 ${
                                entry.type === "income" ? "bg-emerald-400" : "bg-rose-400"
                              }`}></span>
                              <div>
                                <p className="font-semibold text-white truncate max-w-[130px] sm:max-w-[200px] text-[11px] sm:text-xs">
                                  {entry.desc}
                                </p>
                                <p className="text-[9px] text-zinc-550 font-mono">{entry.category}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`font-extrabold ${
                                entry.type === "income" ? "text-emerald-400" : "text-rose-400"
                              }`}>
                                {entry.type === "income" ? "+" : "-"}₹{entry.amount.toLocaleString("en-IN")}
                              </span>
                              <button
                                type="button"
                                onClick={() => setCapLedgerList(capLedgerList.filter(item => item.id !== entry.id))}
                                className="text-zinc-650 hover:text-rose-450 transition-colors p-1"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Box: Dynamic category pie donut */}
            <div className="relative overflow-hidden group">
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500"></div>
              <div className="inset-shadow-2xs bg-neutral-950 relative w-full h-full overflow-hidden rounded-3xl border border-zinc-900 p-2 sm:p-4 shadow-xl ring-1 ring-white/5 group-hover:border-zinc-800 transition-colors duration-300">
                <div className="bg-neutral-950 rounded-2xl p-5 sm:p-6 h-full flex flex-col justify-between border border-zinc-950 space-y-6">
                  
                  {/* Info Header */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-[#ffedd5] uppercase tracking-wider bg-[#C87830] px-2.5 py-1 rounded shadow-sm select-none">
                        Category Classification
                      </span>
                      <span className="text-[9.5px] text-zinc-400 font-semibold">Interactive breakdown chart</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Automatic Spending Classifications</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Expenditures are mapped instantly into colorful ratios. Hover or tap categories to receive financial optimization suggestions.
                    </p>
                  </div>

                  {/* Donut Chart visual */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 bg-zinc-900/30 p-6 rounded-xl border border-zinc-900 my-auto">
                    
                    {/* SVG Donut */}
                    <div className="w-28 h-28 relative flex items-center justify-center shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
                        {/* Food Category: 40% */}
                        <circle 
                          r="16" cx="16" cy="16" 
                          fill="transparent" 
                          stroke="#f43f5e" 
                          strokeWidth="5" 
                          strokeDasharray="40 100" 
                          className="cursor-pointer transition-all duration-300 hover:stroke-[6]"
                          onMouseEnter={() => setHoveredCategory("Food")}
                        />
                        {/* Rent Category: 30% */}
                        <circle 
                          r="16" cx="16" cy="16" 
                          fill="transparent" 
                          stroke="#3b82f6" 
                          strokeWidth="5" 
                          strokeDasharray="30 100" 
                          strokeDashoffset="-40" 
                          className="cursor-pointer transition-all duration-300 hover:stroke-[6]"
                          onMouseEnter={() => setHoveredCategory("Rent")}
                        />
                        {/* Utilities Category: 20% */}
                        <circle 
                          r="16" cx="16" cy="16" 
                          fill="transparent" 
                          stroke="#eab308" 
                          strokeWidth="5" 
                          strokeDasharray="20 100" 
                          strokeDashoffset="-70" 
                          className="cursor-pointer transition-all duration-300 hover:stroke-[6]"
                          onMouseEnter={() => setHoveredCategory("Utilities")}
                        />
                        {/* Other Category: 10% */}
                        <circle 
                          r="16" cx="16" cy="16" 
                          fill="transparent" 
                          stroke="#10b981" 
                          strokeWidth="5" 
                          strokeDasharray="10 100" 
                          strokeDashoffset="-90" 
                          className="cursor-pointer transition-all duration-300 hover:stroke-[6]"
                          onMouseEnter={() => setHoveredCategory("Other")}
                        />
                      </svg>
                      
                      <div className="absolute inset-1.5 rounded-full bg-neutral-950 flex flex-col items-center justify-center text-center p-2">
                        <span className="text-[8px] text-zinc-550 font-bold uppercase select-none">Total spent</span>
                        <span className="text-[11px] font-black text-white select-none">₹28,500</span>
                      </div>
                    </div>

                    {/* Legend block with hovers */}
                    <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 text-xs w-full sm:w-auto">
                      {[
                        { cat: "Food", pct: "40%", col: "bg-rose-500", text: "Food" },
                        { cat: "Rent", pct: "30%", col: "bg-blue-500", text: "Rent" },
                        { cat: "Utilities", pct: "20%", col: "bg-yellow-500", text: "Utilities" },
                        { cat: "Other", pct: "10%", col: "bg-emerald-500", text: "Other" }
                      ].map(item => (
                        <div 
                          key={item.cat} 
                          onMouseEnter={() => setHoveredCategory(item.cat)}
                          className={`flex items-center gap-2 p-1.5 rounded-lg border transition-colors cursor-pointer ${
                            hoveredCategory === item.cat 
                              ? "bg-zinc-800 border-zinc-700 text-white" 
                              : "bg-transparent border-transparent text-zinc-400"
                          }`}
                        >
                          <span className={`w-2.5 h-2.5 rounded shrink-0 ${item.col}`} />
                          <span className="font-semibold text-[11px]">{item.text} ({item.pct})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendation Box */}
                  <div className="bg-[#C87830]/5 border border-[#C87830]/35 rounded-xl p-4 flex items-start gap-3 shadow-sm shadow-[#C87830]/5">
                    <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 animate-pulse" />
                    <div>
                      <h4 className="text-xs font-bold text-amber-400">Automated Optimizer Suggestion</h4>
                      <p className="text-[10px] text-zinc-450 leading-relaxed mt-1 min-h-[30px]">
                        {getCategoryRecommendation()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 💎 Responsive "More and More..." Accordion Swapper (SleekDemo UI Focus) */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-neutral-950 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
              🛠️ Feature Focus
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent leading-tight">
              More than simple tracking
            </h2>
            <p className="text-xs sm:text-sm text-zinc-450 max-w-lg mx-auto">
              Expensio packs state-of-the-art MERN architecture features, built specifically to prioritize performance, privacy, and visual excellence.
            </p>
          </div>

          {/* Desktop Layout: Side-by-side. Mobile Layout: Accordions stack, preview sits below. */}
          <div className="grid gap-10 items-stretch grid-cols-1 lg:grid-cols-12 max-w-5xl mx-auto">
            
            {/* Left Accordions Controls */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-3 h-full">
              {[
                { 
                  id: "vault", 
                  title: "Double-Entry Vault", 
                  desc: "Protected session access. Expensio shields accounts with JWT validation tokens and hashes credentials with bcryptjs.",
                  icon: <Lock className="w-5 h-5 text-rose-450" /> 
                },
                { 
                  id: "timeframe", 
                  title: "Granular Timeframe Isolation", 
                  desc: "Isolate ledgers by monthly ranges, yearly segments, or fully customizable dates in a single click.",
                  icon: <Calendar className="w-5 h-5 text-amber-400" /> 
                },
                { 
                  id: "excel", 
                  title: "Excel / CSV Data Pipelines", 
                  desc: "One-click downloading. Seamlessly compile dynamic financial ledgers into highly structured, clean spreadsheets.",
                  icon: <FileSpreadsheet className="w-5 h-5 text-emerald-400" /> 
                },
                { 
                  id: "analytics", 
                  title: "Visual Saving Curves", 
                  desc: "Beautiful automated Recharts curves analyzing cash flow velocity and income-to-expense ratios instantly.",
                  icon: <TrendingUp className="w-5 h-5 text-blue-400" /> 
                }
              ].map(item => (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all duration-300 ${
                    activeAccordion === item.id 
                      ? "bg-neutral-900 border-zinc-800 shadow-lg"
                      : "bg-transparent border-transparent"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveAccordion(item.id)}
                    className="flex items-center justify-between w-full text-left px-5 py-4 focus:outline-none cursor-pointer hover:text-zinc-200 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      {item.icon}
                      <span className="text-sm font-bold tracking-tight text-white">{item.title}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-zinc-550 transition-transform ${
                      activeAccordion === item.id ? "rotate-90 text-orange-400" : ""
                    }`} />
                  </button>

                  <AnimatePresence>
                    {activeAccordion === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs text-zinc-400 px-5 pb-5 leading-relaxed pl-12">{item.desc}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right Display Panel */}
            <div className="lg:col-span-7 inset-shadow-2xs bg-neutral-950 relative flex overflow-hidden rounded-3xl border border-zinc-900 p-2 sm:p-4 shadow-2xl ring-1 ring-white/5 aspect-[4/3] items-center justify-center min-h-[300px]">
              <div className="bg-neutral-950 relative w-full h-full rounded-2xl overflow-hidden border border-zinc-900 shadow-inner flex items-center justify-center p-6">
                
                <AnimatePresence mode="wait">
                  {/* Vault Show */}
                  {activeAccordion === "vault" && (
                    <motion.div
                      key="vault"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="space-y-4 text-center max-w-sm"
                    >
                      <div className="w-14 h-14 bg-rose-500/10 border border-rose-500/20 text-rose-450 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-rose-500/5 animate-bounce">
                        <Lock className="w-6 h-6 stroke-[2]" />
                      </div>
                      <h4 className="text-base font-bold text-white">Encryption Layer Active</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        Expensio never transmits credentials in plain text. Session tokens are signed using high-entropy HS256 JWT keys, isolating APIs securely.
                      </p>
                      <div className="bg-neutral-950 p-3.5 rounded-xl border border-zinc-900 font-mono text-[9px] text-zinc-550 text-left space-y-1.5 shadow-inner">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span>Bcrypt: $2a$10$tZ3a9F8zQ...</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span>Header: Authorization: Bearer eyJhbGci...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Calendar Isolate Show */}
                  {activeAccordion === "timeframe" && (
                    <motion.div
                      key="timeframe"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full max-w-sm space-y-4 text-center"
                    >
                      <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-bold text-white">Granular Isolation Filters</h4>
                      
                      {/* Micro Calendar Mock Widget */}
                      <div className="bg-neutral-950 p-4 rounded-xl border border-zinc-900 text-left space-y-3 shadow-inner">
                        <div className="flex items-center justify-between text-[10px] text-zinc-450 font-bold font-mono">
                          <span>SELECT TIME PERIOD</span>
                          <span className="text-orange-400">MAY 2026</span>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-[9px] font-bold text-center select-none text-zinc-500">
                          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(d => <span key={d}>{d}</span>)}
                          {/* Calendar grid numbers */}
                          {Array.from({ length: 14 }).map((_, idx) => {
                            const day = idx + 15;
                            const isSelect = day === 26;
                            return (
                              <span 
                                key={idx} 
                                className={`py-1 rounded cursor-pointer ${
                                  isSelect 
                                    ? "bg-orange-500 text-neutral-950 font-black shadow-md shadow-orange-500/20" 
                                    : "hover:bg-zinc-900 text-zinc-350"
                                }`}
                              >
                                {day}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Spreadsheet pipeline Show */}
                  {activeAccordion === "excel" && (
                    <motion.div
                      key="excel"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="space-y-5 text-center w-full max-w-xs"
                    >
                      <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/5">
                        <FileSpreadsheet className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-bold text-white">Spreadsheet Data Pipelines</h4>
                      
                      <div className="bg-neutral-950 p-4 rounded-xl border border-zinc-900 space-y-3 shadow-inner">
                        <div className="flex items-center justify-between text-[10px] text-zinc-550 font-mono">
                          <span>expensio_report_may.csv</span>
                          <span>34.2 KB</span>
                        </div>
                        
                        <button
                          type="button"
                          onClick={handleSimulateCSVExport}
                          className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-extrabold text-[10px] rounded-lg cursor-pointer transition-colors shadow-md flex justify-center items-center gap-1.5"
                          disabled={exportingStatus === "exporting"}
                        >
                          {exportingStatus === "idle" && (
                            <>
                              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                              Download Ledger CSV
                            </>
                          )}
                          {exportingStatus === "exporting" && (
                            <span className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin"></span>
                              Compiling Sheet...
                            </span>
                          )}
                          {exportingStatus === "complete" && (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              Downloaded successfully!
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Saving Analytics chart Show */}
                  {activeAccordion === "analytics" && (
                    <motion.div
                      key="analytics"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full max-w-sm space-y-4 text-center"
                    >
                      <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/5">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-bold text-white">Visual Savings Velocity</h4>
                      
                      {/* Interactive Comparison Bars */}
                      <div className="bg-neutral-950 p-4 rounded-xl border border-zinc-900 text-left space-y-3 shadow-inner">
                        <span className="text-[9px] text-zinc-550 font-bold uppercase tracking-wider block">Income vs Expense comparisons</span>
                        <div className="space-y-2">
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-zinc-400">
                              <span>Monthly Earnings</span>
                              <span className="font-extrabold text-emerald-400">₹75,000</span>
                            </div>
                            <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full w-[80%]"></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-zinc-400">
                              <span>Monthly Spendings</span>
                              <span className="font-extrabold text-rose-400">₹28,500</span>
                            </div>
                            <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                              <div className="bg-rose-500 h-full w-[38%]"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 💬 Help & FAQs Center Section */}
      <section id="faq" className="py-20 md:py-32 border-t border-dashed border-zinc-900 bg-neutral-950">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
              💬 Help Center
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-zinc-450 max-w-md mx-auto">
              Find answers to the most common questions about the expensio architecture.
            </p>
          </div>

          {/* Accordion Questions */}
          <div className="space-y-4">
            {[
              {
                q: "Is my personal financial data secure?",
                a: "Absolutely. expensio uses JSON Web Token (JWT) request headers to protect private sessions, and hashes passwords using bcryptjs, ensuring no plain credentials are ever readable."
              },
              {
                q: "Can I connect multiple devices to my account?",
                a: "Yes, because the database is hosted securely in the cloud via MongoDB Atlas, you can access your profile and track incomes or expenses concurrently on any smartphone, tablet, or desktop."
              },
              {
                q: "How does the Excel/CSV export work?",
                a: "Your ledger has a dedicated exporting client. Clicking download automatically maps your database logs, formats them into a clean spreadsheet structure, and saves them directly to your device."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-zinc-900/30 border border-zinc-850 rounded-xl overflow-hidden transition-all hover:border-zinc-800"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex items-center justify-between w-full text-left px-5 py-4 focus:outline-none cursor-pointer hover:bg-zinc-900/50 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-zinc-200">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-550 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180 text-orange-400" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-zinc-400 px-5 pb-5 leading-relaxed pl-5 border-t border-zinc-900/60 pt-3">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📝 Premium Footer */}
      <footer className="w-full border-t border-zinc-900 py-8 text-center text-xs text-zinc-550 bg-neutral-950">
        <p>© {new Date().getFullYear()} expensio. All rights reserved. Master your personal financial speed.</p>
      </footer>
    </div>
  );
};

export default Welcome;
