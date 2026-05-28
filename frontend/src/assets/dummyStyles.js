export const dashboardStyles = {
  // Layout styles
  container: "min-h-screen p-4 md:p-6 relative z-10",
  
  // Header styles
  headerContainer: "bg-white dark:bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-200 dark:border-zinc-800 relative z-10 shadow-sm",
  headerContent: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4",
  headerTitle: "text-2xl font-extrabold tracking-tight text-slate-800 dark:text-zinc-100",
  headerSubtitle: "text-zinc-500 dark:text-zinc-400 font-medium mt-1 text-xs md:text-sm",
  
  // Button styles
  addButton: "flex items-center gap-2 bg-[#C87830] hover:bg-[#B06020] text-white px-4 py-2 rounded-lg transition-colors shadow-sm font-bold cursor-pointer text-xs md:text-sm",
  
  // Time frame selector styles
  timeFrameContainer: "flex justify-end mt-4",
  timeFrameWrapper: "flex gap-0.5 bg-zinc-100 dark:bg-zinc-950 p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-none",
  timeFrameButton: (isActive) => 
    `px-3 py-1.5 text-xs font-bold rounded transition-all cursor-pointer ${
      isActive 
        ? "bg-[#C87830] text-white shadow-none" 
        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
    }`,
  
  // Summary cards grid
  summaryGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6",
  
  // Financial card styles
  balanceBadge: "bg-orange-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase",
  expenseBadge: "bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-400 border border-red-200/50 dark:border-red-900/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase",
  
  // Gauge container styles
  gaugeGrid: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6",
  
  // Pie chart container styles
  pieChartContainer: "bg-white dark:bg-zinc-900 rounded-xl p-5 shadow-sm border border-zinc-200 dark:border-zinc-800 relative overflow-hidden mb-6",
  pieChartHeader: "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2",
  pieChartTitle: "text-base font-extrabold text-slate-800 dark:text-zinc-100 mb-1 flex items-center gap-2",
  pieChartSubtitle: "text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider pl-1",
  pieChartHeight: "h-72",
  
  // Pie chart tooltip styles
  tooltipContent: {
    backgroundColor: "#1e1e1e",
    border: "1px solid #27272a",
    borderRadius: "6px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    padding: "8px",
    color: "#ffffff",
  },
  tooltipItem: { color: "#ffffff", fontWeight: 600, fontSize: "12px" },
  
  // Legend styles
  legendWrapper: { paddingTop: 4 },
  legendText: "text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider",
  
  // Income/Expense lists grid
  listsGrid: "grid grid-cols-1 md:grid-cols-2 gap-6",
  
  // List container styles
  listContainer: "bg-white dark:bg-zinc-900 rounded-xl p-5 shadow-sm border border-zinc-200 dark:border-zinc-800",
  listHeader: "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2",
  listTitle: "text-base font-extrabold text-slate-800 dark:text-zinc-100 flex items-center gap-2",
  listSubtitle: "text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-normal pl-1",
  
  // Record count badges
  incomeCountBadge: "text-[10px] font-bold bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded border border-green-500/20",
  expenseCountBadge: "text-[10px] font-bold bg-orange-500/10 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded border border-orange-500/20",
  
  // Transaction item styles
  transactionList: "space-y-2",
  incomeTransactionItem: "flex items-center px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-200 dark:border-zinc-850 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/40 transition-colors mb-2.5",
  expenseTransactionItem: "flex items-center justify-between px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-200 dark:border-zinc-850 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/40 transition-colors mb-2.5",
  
  // Transaction icon container
  incomeIconContainer: "p-2 bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg border border-green-500/15 flex items-center justify-center",
  expenseIconContainer: "p-2 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-lg border border-orange-500/15 flex items-center justify-center",
  
  // Transaction content
  transactionContent: "flex items-center gap-2",
  transactionDescription: "font-semibold text-xs text-slate-800 dark:text-zinc-200 transaction-desc",
  transactionCategory: "text-[10px] text-zinc-400 dark:text-zinc-500 font-bold tracking-wider uppercase mt-0.5 transaction-meta",
  transactionAmount: "text-right",
  incomeAmount: "font-black text-sm text-green-600 dark:text-green-400 tracking-tight",
  expenseAmount: "font-black text-sm text-orange-600 dark:text-orange-400 tracking-tight",
  transactionDate: "text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider text-right mt-0.5 transaction-meta",
  
  // Empty state styles
  emptyState: "text-center py-8 flex flex-col items-center justify-center gap-2",
  emptyIconContainer: (color) => `w-12 h-12 mx-auto rounded-lg flex items-center justify-center border ${
    color === 'bg-green-50' 
      ? 'bg-green-500/5 border-green-500/10 text-green-500' 
      : color === 'bg-orange-50' 
      ? 'bg-orange-500/5 border-orange-500/10 text-orange-500' 
      : 'bg-[#C87830]/5 border-[#C87830]/10 text-[#C87830]'
  }`,
  emptyText: "text-zinc-500 dark:text-zinc-400 font-semibold text-xs",
  
  // View all button styles
  viewAllContainer: "pt-3 mt-2 border-t border-zinc-200 dark:border-zinc-800",
  viewAllButton: "w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-[#C87830] dark:text-[#D08038] hover:bg-orange-500/10 rounded-lg transition-colors cursor-pointer",
  
  // Icon container styles
  iconContainer: (color) => `p-2 ${color} rounded-lg`,
  
  // Specific icon colors
  walletIconContainer: "p-2 bg-[#C87830]/10 text-[#C87830] dark:text-[#D08038] rounded-lg border border-[#C87830]/15 flex items-center justify-center",
  arrowDownIconContainer: "p-2 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-lg border border-orange-500/15 flex items-center justify-center",
  piggyBankIconContainer: "p-2 bg-cyan-500/10 text-cyan-600 dark:text-[#4dd0e1] rounded-lg border border-cyan-500/15 flex items-center justify-center",
};

// Additional styles for financial trends
export const trendStyles = {
  positive: "text-orange-600",
  negative: "text-green-600",
  positiveRate: "bg-[#C87830]/10 text-[#C87830]",
  negativeRate: "bg-red-100 text-red-700",
};

// Chart specific styles
export const chartStyles = {
  pieChart: "lg:-px-5 lg:text-xs xl:text-xl",
};

// Income page specific styles
export const incomeStyles = {
  // Layout
  wrapper: "space-y-4 w-full relative z-10",
  headerContainer: "bg-white dark:bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-200 dark:border-zinc-800 relative overflow-hidden shadow-sm",
  header: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4",
  headerTitle: "text-2xl font-extrabold tracking-tight text-slate-800 dark:text-zinc-100",
  headerSubtitle: "text-zinc-500 dark:text-zinc-400 font-medium text-xs mt-1",
  addButton: "flex items-center gap-2 bg-[#C87830] hover:bg-[#B06020] text-white px-4 py-2 rounded-lg transition-colors font-bold cursor-pointer text-xs shadow-sm",
  
  // Summary Cards
  summaryGrid: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6",
  
  // Chart
  chartContainer: "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm mb-6",
  chartTitle: "text-base font-extrabold text-slate-800 dark:text-zinc-100 flex items-center gap-2",
  
  // Transaction List
  listContainer: "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm relative overflow-hidden",
  sectionTitle: "text-base font-extrabold text-slate-800 dark:text-zinc-100 flex items-center gap-2",
  
  // Filter Section
  filterContainer: "flex flex-col sm:flex-row gap-2 w-full sm:w-auto",
  filterSelect: "appearance-none bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-lg pl-3 pr-8 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#C87830] focus:border-[#C87830] w-full font-semibold cursor-pointer text-slate-800 dark:text-zinc-200",
  exportButton: "flex items-center justify-center gap-2 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-850 text-zinc-700 dark:text-zinc-200 px-3 py-2 rounded-lg transition-colors text-xs font-semibold hover:shadow-none w-full sm:w-auto cursor-pointer",
  
  // Transaction Items
  transactionList: "space-y-2",
  viewAllButton: "mt-3 w-full text-center py-2 text-xs font-bold text-[#C87830] dark:text-[#D08038] hover:bg-orange-500/10 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer",
  
  // Empty State
  emptyStateContainer: "text-center py-8 flex flex-col items-center justify-center gap-2",
  emptyStateIcon: "w-12 h-12 mx-auto mb-2 rounded-lg bg-green-500/5 border border-green-500/10 flex items-center justify-center text-green-500 shadow-sm",
  emptyStateText: "text-zinc-500 dark:text-zinc-400 font-semibold text-xs",
  emptyStateSubtext: "text-[10px] text-zinc-450 dark:text-zinc-550 mt-0.5 font-medium",
  emptyStateButton: "mt-3 flex items-center gap-2 bg-[#C87830] hover:bg-[#B06020] text-white px-3 py-2 rounded-lg transition-all font-bold mx-auto text-xs cursor-pointer",
  
  // Time Frame Selector Container
  timeFrameContainer: "flex justify-center lg:justify-end mt-4 items-center flex-wrap gap-4",

   // Chart header container 
  chartHeaderContainer: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4",
  
  // Chart height 
  chartHeight: "h-64",
  
  // Chart tooltip styles 
  tooltipContent: {
    backgroundColor: "#1e1e1e",
    border: "1px solid #27272a",
    borderRadius: "6px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    padding: "8px",
    color: "#f4f4f5",
  },
  
  // Icon container styles for summary cards 
  iconGreen: "p-2 bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg border border-green-500/15 flex items-center justify-center",
  iconBlue: "p-2 bg-orange-500/10 text-blue-600 dark:text-blue-400 rounded-lg border border-blue-500/15 flex items-center justify-center",
  iconPurple: "p-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg border border-purple-500/15 flex items-center justify-center",
  
  // Icon text colors 
  textGreen: "text-green-600 dark:text-green-400",
  textBlue: "text-blue-600 dark:text-blue-400",
  textPurple: "text-purple-600 dark:text-purple-400",
  
  // Filter icon positioning 
  filterIcon: "absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 dark:text-zinc-500 pointer-events-none",
  
  // FinancialCard border colors
  borderGreen: "border-l-4 border-green-500",
  borderBlue: "border-l-4 border-[#C87830]",
  borderPurple: "border-l-4 border-purple-500",
};

export const expensePageStyles = {
  // Main container
  container: "space-y-4 w-full relative z-10",
  
  // Header card
  headerCard: "bg-white dark:bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-200 dark:border-zinc-800 relative overflow-hidden shadow-sm",
  headerContainer: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4",
  headerTitle: "text-2xl font-extrabold tracking-tight text-slate-800 dark:text-zinc-100",
  headerSubtitle: "text-zinc-500 dark:text-zinc-400 font-medium text-xs mt-1",
  addButton: "flex items-center gap-2 bg-[#C87830] hover:bg-[#B06020] text-white px-4 py-2 rounded-lg transition-colors font-bold cursor-pointer text-xs shadow-sm",
  
  // Financial cards grid
  cardsGrid: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6",
  
  // Chart container
  chartContainer: "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm mb-6",
  chartHeader: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4",
  chartTitle: "text-base font-extrabold text-slate-800 dark:text-zinc-100 flex items-center gap-2",
  exportButton: "flex items-center justify-center gap-2 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-850 text-zinc-700 dark:text-zinc-200 px-3 py-2 rounded-lg transition-colors text-xs font-semibold w-full sm:w-auto cursor-pointer",
  chart: "h-72",
  
  // Transactions container
  transactionsContainer: "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm relative overflow-hidden",
  transactionsHeader: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4",
  transactionsTitle: "text-base font-extrabold text-slate-800 dark:text-zinc-100 flex items-center gap-2",
  filterSelect: "appearance-none bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-lg pl-3 pr-8 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#C87830] focus:border-[#C87830] w-full font-semibold cursor-pointer text-slate-800 dark:text-zinc-200",
  
  // Transaction items
  transactionsList: "space-y-2",
  viewAllButton: "mt-3 w-full text-center py-2 text-xs font-bold text-orange-600 dark:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer",
  emptyState: "text-center py-8 flex flex-col items-center justify-center gap-2",
  emptyStateIcon: "w-12 h-12 mx-auto mb-2 rounded-lg bg-orange-500/5 border border-orange-500/10 flex items-center justify-center text-orange-500 shadow-sm",
  emptyStateText: "text-zinc-500 dark:text-zinc-400 font-semibold text-xs",
  emptyStateSubtext: "text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5 font-medium",
  
  // Icons
  iconOrange: "p-2 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-lg border border-orange-500/15 flex items-center justify-center",
  iconAmber: "p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg border border-amber-500/15 flex items-center justify-center",
  iconYellow: "p-2 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded-lg border border-yellow-500/15 flex items-center justify-center",
  textOrange: "text-orange-600 dark:text-orange-400",
  textAmber: "text-amber-600 dark:text-amber-400",
  textYellow: "text-yellow-600 dark:text-yellow-400",
  
  // Borders
  borderOrange: "border-l-4 border-orange-500",
  borderAmber: "border-l-4 border-amber-500",
  borderYellow: "border-l-4 border-yellow-500",
  
  // Chart tooltip styles 
  tooltipContent: {
    backgroundColor: "#1e1e1e",
    border: "1px solid #27272a",
    borderRadius: "6px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    padding: "8px",
    color: "#f4f4f5",
  },
  
  // Chart height style 
  chartHeight: "h-72",
  
  // Export button for chart header
  chartExportButton: "flex items-center justify-center gap-2 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-850 text-zinc-700 dark:text-zinc-200 px-3 py-2 rounded-lg transition-colors text-xs font-semibold w-full sm:w-auto cursor-pointer",
  
  // Additional empty state style 
  emptyStateSubtext: "text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5 font-medium",
  
  // Timeframe positioning 
  timeframePositioning: "flex justify-center lg:justify-end mt-4 items-center flex-wrap gap-4",
  
  // Transaction item specific styles 
  transactionItemContainer: "flex items-center justify-between p-3 hover:bg-zinc-100 dark:hover:bg-zinc-850 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-850 cursor-pointer mb-2 group text-xs",
  transactionAmount: "font-bold",
  transactionIcon: "p-2 rounded-lg bg-orange-500/10 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center",
};

export const profileStyles = {
  // Container styles
  container: "max-w-3xl mx-auto py-6 px-4 relative z-10",
  mainContainer: "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden",
  
  // Header styles
  header: "bg-zinc-50 dark:bg-zinc-950/40 border-b border-zinc-200 dark:border-zinc-800 p-6 text-center",
  avatar: "w-20 h-20 mx-auto rounded-lg bg-gradient-to-tr from-blue-600 to-[#C87830] text-white flex items-center justify-center mb-3 shadow-md border-2 border-white dark:border-zinc-900 font-black text-2xl",
  userName: "text-xl font-extrabold text-slate-800 dark:text-zinc-100",
  userEmail: "text-zinc-500 dark:text-zinc-400 mt-1 text-xs font-medium",
  
  // Content styles
  content: "p-6",
  grid: "grid grid-cols-1 md:grid-cols-2 gap-6",
  
  // Card styles
  card: "bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5",
  cardTitle: "text-sm font-bold text-slate-800 dark:text-zinc-100 flex items-center mb-3",
  icon: "w-4 h-4 mr-2 text-[#C87830] dark:text-[#D08038]",
  
  // Form styles
  label: "text-[10px] font-bold uppercase tracking-wider text-zinc-450 dark:text-zinc-500 block mb-1",
  input: "w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-1 focus:ring-[#C87830] focus:border-[#C87830] transition-all text-xs",
  inputWithError: "w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-red-550 dark:border-red-800 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all text-xs",
  
  // Button styles
  buttonPrimary: "w-full bg-[#C87830] hover:bg-[#B06020] text-white py-2.5 rounded-lg font-bold transition-all text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm",
  buttonSecondary: "w-full py-2.5 border border-zinc-200 dark:border-zinc-800 text-zinc-750 dark:text-zinc-300 rounded-lg font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all text-xs flex items-center justify-center cursor-pointer",
  editButton: "text-[#C87830] dark:text-[#D08038] hover:text-blue-700 dark:hover:text-blue-300 font-bold text-xs cursor-pointer hover:underline",
  changeButton: "text-[#C87830] dark:text-[#D08038] hover:text-blue-700 dark:hover:text-blue-300 font-bold text-xs cursor-pointer hover:underline",
  
  // Security item
  securityItem: "flex items-center justify-between p-3.5 bg-white dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800",
  securityText: "font-semibold text-xs text-slate-800 dark:text-zinc-200",
  
  // Modal styles
  modalContent: "bg-white dark:bg-zinc-900 rounded-xl p-5 w-full max-w-sm shadow-xl border border-zinc-200 dark:border-zinc-800 relative",
  modalHeader: "flex justify-between items-center mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-3",
  modalTitle: "text-sm font-bold text-slate-800 dark:text-zinc-100",
  
  // Password input
  passwordLabel: "block text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1",
  passwordContainer: "relative",
  passwordToggle: "absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-[#C87830] dark:hover:text-[#D08038] cursor-pointer",
  
  // Error text
  errorText: "mt-1 text-xs text-rose-600 dark:text-rose-450 font-medium"
};

// Add to existing dummyStyles.js
export const modalStyles = {
  // Modal container
  overlay: "fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50",
  modalContainer: "bg-white dark:bg-zinc-900 rounded-xl p-5 max-w-sm w-full shadow-lg border border-zinc-200 dark:border-zinc-800",
  
  // Header
  modalHeader: "flex justify-between items-center mb-3",
  modalTitle: "text-base font-bold text-zinc-800 dark:text-zinc-100",
  closeButton: "text-zinc-450 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 cursor-pointer",
  
  // Form elements
  form: "space-y-3",
  label: "block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1",
  input: (ringColor) => `w-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 ${ringColor} dark:text-zinc-200`,
  
  // Type buttons
  typeButtonContainer: "flex gap-3",
  typeButton: (isSelected, color) => 
    `flex-1 py-1.5 rounded-lg text-xs font-bold ${
      isSelected 
        ? `${color} text-white shadow-none` 
        : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
    }`,
  
  // Submit button
  submitButton: (color) => `w-full text-white py-2 rounded-lg font-bold mt-3 shadow-none transition-all text-xs cursor-pointer ${color}`,
  
  // Color classes
  colorClasses: {
    teal: {
      button: "bg-[#C87830] hover:bg-[#B06020]",
      ring: "focus:ring-[#C87830]",
      typeButtonSelected: "bg-[#C87830]",
    },
    orange: {
      button: "bg-[#C87830] hover:bg-[#B06020]",
      ring: "focus:ring-[#C87830]",
      typeButtonSelected: "bg-[#C87830]",
    },
  },
};

// In src/assets/dummyStyles.js - add these styles
export const loginStyles = {
  // Page container
  pageContainer: "min-h-screen w-full flex items-center justify-center p-4 bg-zinc-50 dark:bg-[#121212] text-slate-800 dark:text-zinc-100 transition-colors duration-200 relative overflow-hidden",
  
  // Card container
  cardContainer: "w-full max-w-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg rounded-xl overflow-hidden relative z-10",
  
  // Header styles
  header: "p-6 pb-2 text-center relative z-10",
  avatar: "w-16 h-16 mx-auto rounded-lg bg-[#C87830] text-white flex items-center justify-center mb-3 shadow font-black text-xl",
  headerTitle: "text-2xl font-extrabold tracking-tight text-[#C87830] dark:text-[#d08038]",
  headerSubtitle: "text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium",
  
  // Form container
  formContainer: "p-6 pt-2 relative z-10",
  
  // Error message
  errorContainer: "mb-4 p-3 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-red-100 dark:border-red-900/30 rounded-lg flex items-center gap-2.5 text-xs",
  errorIcon: "flex-shrink-0 w-7 h-7 rounded bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-600 dark:text-red-400",
  errorText: "font-semibold break-words flex-1",
  
  // Form elements
  label: "block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5",
  inputContainer: "relative group",
  inputIcon: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-[#C87830] dark:group-focus-within:text-[#D08038] transition-colors duration-200",
  input: "w-full pl-9 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C87830] focus:border-[#C87830] transition-all text-xs",
  passwordInput: "w-full pl-9 pr-9 py-2.5 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C87830] focus:border-[#C87830] transition-all text-xs",
  passwordToggle: "absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-[#C87830] dark:hover:text-[#D08038] cursor-pointer",
  
  // Checkbox
  checkboxContainer: "mb-4 flex items-center gap-2 cursor-pointer",
  checkbox: "w-4 h-4 text-[#C87830] border-zinc-300 dark:border-zinc-800 rounded focus:ring-[#C87830] dark:bg-zinc-950 cursor-pointer",
  checkboxLabel: "text-xs text-zinc-650 dark:text-zinc-300 font-medium select-none cursor-pointer",
  
  // Button
  button: "w-full bg-[#C87830] hover:bg-[#B06020] text-white py-2.5 rounded-lg font-bold shadow transition-all flex items-center justify-center text-xs cursor-pointer active:scale-95",
  buttonDisabled: "opacity-70 cursor-not-allowed shadow-none",
  
  // Sign up link
  signUpContainer: "mt-6 text-center border-t border-zinc-200 dark:border-zinc-800 pt-4",
  signUpText: "text-xs text-zinc-500 dark:text-zinc-400 font-medium",
  signUpLink: "font-bold text-[#C87830] dark:text-[#D08038] hover:underline ml-1",
  
  // Spinner for loading state
  spinner: "animate-spin -ml-1 mr-2 h-4 w-4 text-white"
};

// Styles for Navbar component
export const navbarStyles = {
  header: "sticky top-0 z-50 bg-zinc-100/70 dark:bg-[#121212]/75 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm text-slate-800 dark:text-zinc-100 transition-all duration-[80ms]",
  container: "flex items-center justify-between px-4 py-2.5 md:px-8 w-full max-w-full",
  logoContainer: "flex items-center gap-2 cursor-pointer select-none",
  logoImage: "flex items-center justify-center text-slate-800 dark:text-zinc-100",
  logoText: "text-xl md:text-2xl text-slate-800 dark:text-zinc-100 font-extrabold tracking-tight",
  userContainer: "relative",
  userButton: "flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-zinc-150/40 dark:hover:bg-zinc-800/40 transition-all cursor-pointer border border-transparent",
  userAvatar: "w-8 h-8 flex items-center justify-center rounded bg-white/20 dark:bg-zinc-850 text-slate-800 dark:text-zinc-100 font-bold text-md border border-zinc-200/50 dark:border-zinc-700",
  statusIndicator: "absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white dark:border-zinc-900",
  userTextContainer: "text-left hidden lg:block",
  userName: "text-xs font-bold text-zinc-700 dark:text-zinc-200 truncate max-w-[120px]",
  userEmail: "text-[10px] text-zinc-450 dark:text-zinc-500 truncate max-w-[120px]",
  chevronIcon: (isOpen) => `w-4 h-4 text-zinc-400 dark:text-zinc-500 transition-transform ${isOpen ? "rotate-180" : ""}`,
  dropdownMenu: "absolute top-12 right-0 w-56 bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-800 p-1 z-50 text-slate-800 dark:text-zinc-100 animate-in fade-in slide-in-from-top-2 duration-100",
  dropdownHeader: "px-3 py-2.5 border-b border-zinc-100 dark:border-zinc-800 mb-1",
  dropdownAvatar: "w-9 h-9 rounded bg-[#C87830] dark:bg-zinc-850 flex items-center justify-center text-white font-bold text-md",
  dropdownName: "text-xs font-bold text-zinc-800 dark:text-zinc-200",
  dropdownEmail: "text-[10px] text-zinc-400 dark:text-zinc-500",
  menuItemContainer: "p-0.5",
  menuItem: "w-full px-3 py-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-xs font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2 rounded transition-all cursor-pointer",
  menuItemBorder: "p-0.5 border-t border-zinc-100 dark:border-zinc-800 mt-1",
  logoutButton: "flex w-full items-center gap-2 px-3 py-2 text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-600 dark:text-rose-400 rounded transition-all cursor-pointer"
};

// In src/assets/dummyStyles.js - add these styles
export const signupStyles = {
  // Page container
  pageContainer: "min-h-screen w-full flex items-center justify-center p-4 bg-zinc-50 dark:bg-[#121212] text-slate-800 dark:text-zinc-100 transition-colors duration-200 relative overflow-hidden",
  
  // Card container
  cardContainer: "w-full max-w-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg rounded-xl overflow-hidden relative z-10",
  
  // Header styles
  header: "p-6 pb-2 text-center relative z-10",
  avatar: "w-16 h-16 mx-auto rounded-lg bg-[#C87830] text-white flex items-center justify-center mb-3 shadow font-black text-xl",
  headerTitle: "text-2xl font-extrabold tracking-tight text-[#C87830] dark:text-[#d08038]",
  headerSubtitle: "text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium",
  backButton: "absolute top-4 left-4 p-2 text-zinc-400 dark:text-zinc-400 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-white transition-all duration-200 cursor-pointer border border-transparent",
  
  // Form container
  formContainer: "p-6 pt-2 relative z-10",
  
  // Error messages
  apiError: "mb-3 text-center text-xs text-red-655 dark:text-red-400 font-semibold bg-rose-50 dark:bg-rose-950/20 p-2.5 rounded-lg border border-rose-100 dark:border-rose-900/30",
  fieldError: "mt-1 text-xs text-red-655 dark:text-red-400 font-medium",
  
  // Form elements
  label: "block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5",
  inputContainer: "relative group",
  inputIcon: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-[#C87830] dark:group-focus-within:text-[#D08038] transition-colors duration-200",
  input: "w-full pl-9 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C87830] focus:border-[#C87830] transition-all text-xs",
  passwordInput: "w-full pl-9 pr-9 py-2.5 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C87830] focus:border-[#C87830] transition-all text-xs",
  passwordToggle: "absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-[#C87830] dark:hover:text-[#D08038] cursor-pointer",
  
  // Checkbox
  checkboxContainer: "mb-4 flex items-center gap-2 cursor-pointer",
  checkbox: "w-4.5 h-4.5 text-[#C87830] border-zinc-300 dark:border-zinc-800 rounded focus:ring-[#C87830] dark:bg-zinc-950 cursor-pointer",
  checkboxLabel: "text-xs text-zinc-600 dark:text-zinc-300 font-medium select-none cursor-pointer",
  
  // Button
  button: "w-full bg-[#C87830] hover:bg-[#B06020] text-white py-2.5 rounded-lg font-bold shadow transition-all flex items-center justify-center text-xs cursor-pointer active:scale-95",
  buttonDisabled: "opacity-70 cursor-not-allowed shadow-none",
  
  // Sign in link
  signInContainer: "mt-6 text-center border-t border-zinc-200 dark:border-zinc-800 pt-4",
  signInText: "text-xs text-zinc-500 dark:text-zinc-400 font-medium",
  signInLink: "font-bold text-[#C87830] dark:text-[#D08038] hover:underline ml-1",
  
  // Spinner for loading state
  spinner: "animate-spin -ml-1 mr-2 h-4 w-4 text-white"
};

export const transactionItemStyles = {
  // Container styles
  container: (isEditing, classes) => 
    `flex flex-col md:flex-row items-stretch justify-between gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-850 mb-2.5 last:mb-0 ${isEditing ? "bg-zinc-50 dark:bg-zinc-850" : "hover:bg-zinc-50 dark:hover:bg-zinc-850/40"}`,
  
  // Layout styles
  mainContainer: "flex items-center gap-2.5 flex-1 min-w-0",
  actionsContainer: "flex items-center justify-between gap-3 mt-1.5 md:mt-0",
  amountContainer: "min-w-[80px] flex-shrink-0 flex justify-end",
  buttonsContainer: "flex gap-1 flex-shrink-0",
  
  // Icon styles
  iconContainer: (iconClass, classes) => `${iconClass} ${classes.iconBg}`,
  
  // Content styles
  contentContainer: "min-w-0 flex-1",
  description: "font-semibold text-xs text-zinc-800 dark:text-zinc-200 truncate",
  details: "text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5 truncate",
  
  // Input styles
  input: (hasError, classes) => 
    `w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C87830] focus:border-[#C87830] dark:text-zinc-200`,
  amountInput: (hasError, classes) => 
    `w-full max-w-[100px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C87830] focus:border-[#C87830] dark:text-zinc-200`,
  
  // Error styles
  errorText: "text-[10px] text-red-600 dark:text-red-400 mt-0.5",
  
  // Amount display
  amountText: (amountClass, classes) => `${amountClass} ${classes.text} text-xs font-bold`,
  
  // Button styles
  saveButton: (classes) => `p-1.5 bg-[#C87830] text-white hover:bg-[#B06020] rounded-lg transition-colors cursor-pointer`,
  cancelButton: "p-1.5 bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 cursor-pointer",
  editButton: (classes) => `p-1.5 text-zinc-500 hover:text-[#C87830] dark:hover:text-[#D08038] rounded-lg transition-colors cursor-pointer`,
  deleteButton: (classes) => `p-1.5 text-zinc-500 hover:text-rose-600 rounded-lg transition-colors cursor-pointer`
};

// Centralized styles for the application
export const sidebarStyles = {
  // Layout and container styles
  sidebarContainer: {
    base: "hidden lg:flex flex-col pt-0 fixed top-14 bottom-0 z-30 bg-transparent transition-all duration-[50ms]"
  },
  sidebarInner: {
    base: "bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 h-full flex flex-col shadow-sm transition-all duration-[50ms]"
  },
  // User profile section
  userProfileContainer: {
    base: "p-4 border-b border-zinc-200 dark:border-zinc-800 hidden",
    collapsed: "px-3",
    expanded: "px-6"
  },
  userInitials: {
    base: "w-10 h-10 rounded bg-[#C87830] text-white flex items-center justify-center font-bold text-lg"
  },
  menuList: {
    base: "space-y-0.5 px-2 py-4"
  },
  menuItem: {
    base: "relative flex items-center gap-3 py-2.5 rounded-lg font-medium transition-all duration-[50ms] cursor-pointer text-xs",
    active: "text-[#C87830] dark:text-[#D08038] bg-orange-50 dark:bg-orange-950/20 font-bold border-l-4 border-[#C87830] rounded-l-none pl-3",
    inactive: "text-zinc-600 dark:text-zinc-400 hover:text-[#C87830] dark:hover:text-[#D08038] hover:bg-zinc-100 dark:hover:bg-zinc-800/40 pl-4",
    collapsed: "justify-center px-0 mx-1 pl-0 active:pl-0 inactive:pl-0",
    expanded: ""
  },
  menuIcon: {
    active: "text-[#C87830] dark:text-[#D08038]",
    inactive: "text-zinc-400 dark:text-zinc-500"
  },
  activeIndicator: "hidden",
  toggleButton: {
    base: "absolute -right-3 top-6 z-20 w-6 h-6 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-full flex items-center justify-center text-zinc-500 hover:text-[#C87830] transition-all cursor-pointer"
  },
  footerContainer: {
    base: "border-t border-zinc-200 dark:border-zinc-800 p-4",
    collapsed: "px-3",
    expanded: "px-6"
  },
  footerLink: {
    base: "flex items-center gap-3 py-2 rounded-lg font-medium text-xs text-zinc-500 dark:text-zinc-400 hover:text-[#C87830] dark:hover:text-[#D08038] hover:bg-zinc-100 dark:hover:bg-zinc-800/40 cursor-pointer pl-4 transition-all duration-[50ms]",
    collapsed: "justify-center pl-0"
  },
  logoutButton: {
    base: "flex items-center gap-3 py-2 rounded-lg font-medium text-xs text-zinc-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 w-full mt-1 cursor-pointer pl-4 transition-all duration-[50ms]",
    collapsed: "justify-center pl-0"
  },
  mobileOverlay: "fixed inset-0 z-40 lg:hidden",
  mobileBackdrop: "absolute inset-0 bg-black/40",
  mobileSidebar: {
    base: "absolute left-0 top-0 bottom-0 w-4/5 max-w-xs bg-white dark:bg-zinc-900 shadow-xl overflow-hidden border-r border-zinc-200 dark:border-zinc-800 flex flex-col"
  },
  mobileHeader: "p-4 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800",
  mobileUserContainer: "flex items-center gap-3 pt-4",
  mobileCloseButton: "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-850 transition-colors cursor-pointer",
  mobileMenuList: "space-y-0.5 py-4",
  mobileMenuItem: {
    base: "flex items-center gap-4 px-6 py-3 font-medium text-sm transition-colors cursor-pointer",
    active: "text-[#C87830] dark:text-[#D08038] bg-orange-50 dark:bg-orange-950/20 font-bold border-l-4 border-[#C87830] pl-5",
    inactive: "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-850"
  },
  mobileFooter: "border-t border-zinc-200 dark:border-zinc-800 p-6",
  mobileFooterLink: "flex items-center gap-4 py-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-[#C87830]",
  mobileLogoutButton: "flex items-center gap-4 py-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-rose-600 w-full cursor-pointer",
  mobileMenuButton: "lg:hidden fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#C87830] hover:bg-[#B06020] text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer"
};

// Helper function to combine class names
export const cn = (...classes) => classes.filter(Boolean).join(" ");

// Centralized layout styles emulating ezbookkeeping UI
export const styles = {
  layout: {
    root: "min-h-screen bg-zinc-50 dark:bg-[#121212]",
    mainContainer: (sidebarCollapsed) => 
      `p-4 pt-6 transition-all duration-[50ms] ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`,
  },
  header: {
    container: "flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-3",
    title: "text-xl font-bold text-zinc-850 dark:text-zinc-100",
    subtitle: "text-xs text-zinc-500 dark:text-zinc-400",
  },
  statCards: {
    grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6",
    card: "bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800",
    cardHeader: "flex justify-between items-start",
    cardTitle: "text-xs text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider",
    cardValue: "text-xl font-black text-zinc-800 dark:text-zinc-100 mt-0.5",
    iconContainer: (color) => `bg-${color}-500/10 p-2 rounded-lg`,
    icon: (color) => `w-4 h-4 text-${color}-600 dark:text-${color}-400`,
    cardFooter: "text-[10px] text-zinc-400 dark:text-zinc-500 mt-2 font-semibold",
  },
  grid: {
    main: "grid grid-cols-1 lg:grid-cols-3 gap-6",
    leftColumn: "lg:col-span-2 space-y-6",
    rightColumn: "lg:col-span-1 space-y-6",
  },
  cards: {
    base: "bg-white dark:bg-zinc-900 rounded-xl p-5 shadow-sm border border-zinc-200 dark:border-zinc-800",
    header: "flex justify-between items-center mb-4",
    title: "text-sm font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2",
    titleIcon: "w-4 h-4 text-[#C87830]",
  },
  transactions: {
    cardHeader: "flex justify-between items-center mb-3",
    cardTitle: "text-sm font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2",
    refreshButton: "p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-850 transition-colors",
    refreshIcon: (loading) => `w-4 h-4 text-zinc-500 ${loading ? 'animate-spin' : ''}`,
    dataStackingInfo: "flex items-center gap-1.5 text-[10px] text-blue-700 dark:text-blue-400 mb-3 bg-orange-50 dark:bg-blue-900/10 p-2 rounded-lg border border-blue-200/50 dark:border-blue-900/30",
    dataStackingIcon: "w-3.5 h-3.5 text-[#C87830] dark:text-[#D08038]",
    listContainer: "space-y-2 max-h-[450px] overflow-y-auto pr-1 custom-scrollbar",
    transactionItem: "flex items-center justify-between p-3 hover:bg-zinc-50 dark:hover:bg-zinc-850/40 rounded-xl transition-colors border border-zinc-200 dark:border-zinc-850",
    iconWrapper: (type) => type === 'income' ? 'bg-green-500/10 text-green-600' : 'bg-orange-500/10 text-orange-600',
    icon: "w-3.5 h-3.5",
    details: "min-w-0 flex-1 ml-2.5",
    description: "font-semibold text-xs text-zinc-800 dark:text-zinc-200 truncate max-w-[150px]",
    meta: "text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5",
    amount: (type) => `font-bold text-xs ${type === 'income' ? 'text-green-600' : 'text-orange-600'}`,
    emptyState: "text-center py-6",
    emptyIconContainer: "w-12 h-12 mx-auto mb-2 rounded-lg bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center",
    emptyIcon: "w-6 h-6 text-zinc-400",
    emptyText: "text-zinc-500 dark:text-zinc-400 font-medium text-xs",
    viewAllContainer: "pt-3 border-t border-zinc-200 dark:border-zinc-800",
    viewAllButton: "w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-[#C87830] dark:text-[#D08038] hover:bg-orange-500/10 rounded-lg transition-colors",
  },
  categories: {
    title: "text-sm font-bold text-zinc-800 dark:text-zinc-100 mb-4 flex items-center gap-2",
    titleIcon: "w-4 h-4 text-cyan-500",
    list: "space-y-3",
    categoryItem: "flex items-center justify-between text-xs",
    categoryIconContainer: "bg-zinc-100 dark:bg-zinc-950/60 p-2 rounded-lg",
    categoryIcon: "w-3.5 h-3.5 text-zinc-650 dark:text-zinc-400",
    categoryName: "font-semibold text-zinc-700 dark:text-zinc-300",
    categoryAmount: "font-bold text-zinc-800 dark:text-zinc-100",
    summaryContainer: "mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800",
    summaryGrid: "grid grid-cols-2 gap-3",
    summaryIncomeCard: "bg-green-50 dark:bg-green-950/20 rounded-lg p-3 border border-green-200/30 dark:border-green-900/20",
    summaryExpenseCard: "bg-orange-50 dark:bg-orange-950/20 rounded-lg p-3 border border-orange-200/30 dark:border-orange-900/20",
    summaryTitle: "text-[10px] text-zinc-500 dark:text-zinc-450 uppercase font-bold",
    summaryValue: "text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-0.5",
  },
  colors: {
    transaction: {
      text: (type) => type === 'income' ? 'text-green-600' : 'text-orange-600',
      bg: (type) => type === 'income' ? 'bg-green-500/10 text-green-600' : 'bg-orange-500/10 text-orange-600',
    },
    expenseChange: (change) => change > 0 ? 'text-orange-600' : 'text-green-600',
  },
};