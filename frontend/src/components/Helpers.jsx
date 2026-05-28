const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

/**
 * @param timeFrame  "daily" | "weekly" | "monthly" | "yearly"
 * @param customPeriod  { month: 0–11, year: number } | null
 */
export const getTimeFrameRange = (timeFrame, customPeriod = null) => {
  const now = new Date();

  // --- DAILY with custom date ---
  if (timeFrame === "daily" && customPeriod && customPeriod.date) {
    const start = new Date(customPeriod.date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(customPeriod.date);
    end.setHours(23, 59, 59, 999);
    const label = start.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
    return { start, end, label };
  }

  // --- WEEKLY with custom date (week of selected date) ---
  if (timeFrame === "weekly" && customPeriod && customPeriod.date) {
    const targetDate = new Date(customPeriod.date);
    const start = new Date(targetDate);
    start.setDate(targetDate.getDate() - targetDate.getDay());
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    const label = `Week of ${start.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}`;
    return { start, end, label };
  }

  // --- MONTHLY with custom month/year ---
  if (timeFrame === "monthly" && customPeriod) {
    const { month, year } = customPeriod;
    const start = new Date(year, month, 1, 0, 0, 0, 0);
    const end   = new Date(year, month + 1, 0, 23, 59, 59, 999);
    const label = `${MONTH_NAMES[month]} ${year}`;
    return { start, end, label };
  }

  // --- YEARLY with custom year ---
  if (timeFrame === "yearly" && customPeriod) {
    const { year } = customPeriod;
    const start = new Date(year, 0, 1, 0, 0, 0, 0);
    const end   = new Date(year, 11, 31, 23, 59, 59, 999);
    return { start, end, label: `${year}` };
  }

  // --- standard ranges ---
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  if (timeFrame === "daily") {
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);
    return { start, end, label: "Today" };
  }

  if (timeFrame === "weekly") {
    const startOfWeek = new Date(start);
    startOfWeek.setDate(start.getDate() - start.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    return { start: startOfWeek, end: endOfWeek, label: "This Week" };
  }

  if (timeFrame === "monthly") {
    const startOfMonth = new Date(start.getFullYear(), start.getMonth(), 1);
    startOfMonth.setHours(0, 0, 0, 0);
    const endOfMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);
    return { start: startOfMonth, end: endOfMonth, label: "This Month" };
  }

  if (timeFrame === "yearly") {
    const startOfYear = new Date(start.getFullYear(), 0, 1);
    startOfYear.setHours(0, 0, 0, 0);
    const endOfYear = new Date(start.getFullYear(), 11, 31);
    endOfYear.setHours(23, 59, 59, 999);
    return { start: startOfYear, end: endOfYear, label: "This Year" };
  }

  // default → monthly
  const startOfMonth = new Date(start.getFullYear(), start.getMonth(), 1);
  const endOfMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0);
  endOfMonth.setHours(23, 59, 59, 999);
  return { start: startOfMonth, end: endOfMonth, label: "This Month" };
};

export const getPreviousTimeFrameRange = (timeFrame) => {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  if (timeFrame === "daily") {
    const yesterday = new Date(start);
    yesterday.setDate(start.getDate() - 1);
    const end = new Date(
      yesterday.getFullYear(),
      yesterday.getMonth(),
      yesterday.getDate(),
      23, 59, 59, 999
    );
    return { start: yesterday, end, label: "Yesterday" };
  }

  if (timeFrame === "weekly") {
    const startOfLastWeek = new Date(start);
    startOfLastWeek.setDate(start.getDate() - start.getDay() - 7);
    startOfLastWeek.setHours(0, 0, 0, 0);
    const endOfLastWeek = new Date(startOfLastWeek);
    endOfLastWeek.setDate(startOfLastWeek.getDate() + 6);
    endOfLastWeek.setHours(23, 59, 59, 999);
    return { start: startOfLastWeek, end: endOfLastWeek, label: "Last Week" };
  }

  if (timeFrame === "monthly") {
    const startOfLastMonth = new Date(start.getFullYear(), start.getMonth() - 1, 1);
    startOfLastMonth.setHours(0, 0, 0, 0);
    const endOfLastMonth = new Date(start.getFullYear(), start.getMonth(), 0);
    endOfLastMonth.setHours(23, 59, 59, 999);
    return { start: startOfLastMonth, end: endOfLastMonth, label: "Last Month" };
  }

  if (timeFrame === "yearly") {
    const startOfLastYear = new Date(start.getFullYear() - 1, 0, 1);
    startOfLastYear.setHours(0, 0, 0, 0);
    const endOfLastYear = new Date(start.getFullYear() - 1, 11, 31, 23, 59, 59, 999);
    return { start: startOfLastYear, end: endOfLastYear, label: "Last Year" };
  }

  const startOfLastMonth = new Date(start.getFullYear(), start.getMonth() - 1, 1);
  startOfLastMonth.setHours(0, 0, 0, 0);
  const endOfLastMonth = new Date(start.getFullYear(), start.getMonth(), 0);
  endOfLastMonth.setHours(23, 59, 59, 999);
  return { start: startOfLastMonth, end: endOfLastMonth, label: "Last Month" };
};

export const calculateData = (transactions) => {
  const totals = transactions.reduce(
    (data, t) => {
      const amt = Number(t.amount) || 0;
      if (t.type === "income") {
        data.income += amt;
      } else {
        data.expenses += amt;
      }
      return data;
    },
    { income: 0, expenses: 0 }
  );
  return { ...totals, savings: totals.income - totals.expenses };
};

/**
 * @param timeFrame     "daily" | "weekly" | "monthly" | "yearly"
 * @param customPeriod  { month: 0–11, year: number } | null
 */
export const generateChartPoints = (timeFrame, customPeriod = null) => {
  const now = new Date();
  const points = [];

  if (timeFrame === "daily") {
    const baseDate = (customPeriod && customPeriod.date) ? new Date(customPeriod.date) : now;
    const isToday = baseDate.toDateString() === now.toDateString();
    for (let i = 0; i < 24; i++) {
      const hour = new Date(baseDate);
      hour.setHours(i, 0, 0, 0);
      points.push({
        date: hour,
        label: hour.toLocaleTimeString([], { hour: "2-digit" }),
        hour: i,
        isCurrent: isToday && i === now.getHours(),
      });
    }
    return points;
  }

  if (timeFrame === "weekly") {
    const baseDate = (customPeriod && customPeriod.date) ? new Date(customPeriod.date) : now;
    const start = new Date(baseDate);
    start.setDate(baseDate.getDate() - baseDate.getDay());
    start.setHours(0, 0, 0, 0);
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      points.push({
        date: day,
        label: day.toLocaleDateString("en-US", { weekday: "short" }),
        isCurrent: day.getDate() === now.getDate() && day.getMonth() === now.getMonth() && day.getFullYear() === now.getFullYear(),
      });
    }
    return points;
  }

  if (timeFrame === "monthly") {
    const targetMonth = customPeriod ? customPeriod.month : now.getMonth();
    const targetYear  = customPeriod ? customPeriod.year  : now.getFullYear();
    const daysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(targetYear, targetMonth, i);
      points.push({
        date: day,
        label: day.toLocaleDateString("en-US", { day: "numeric" }),
        isCurrent:
          i === now.getDate() &&
          targetMonth === now.getMonth() &&
          targetYear === now.getFullYear(),
      });
    }
    return points;
  }

  if (timeFrame === "yearly") {
    const targetYear = customPeriod ? customPeriod.year : now.getFullYear();
    for (let i = 0; i < 12; i++) {
      const month = new Date(targetYear, i, 1);
      points.push({
        date: month,
        label: month.toLocaleDateString("en-US", { month: "short" }),
        isCurrent: i === now.getMonth() && targetYear === now.getFullYear(),
      });
    }
    return points;
  }

  // fallback → monthly current
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  for (let i = 1; i <= daysInMonth; i++) {
    const day = new Date(now.getFullYear(), now.getMonth(), i);
    points.push({
      date: day,
      label: day.toLocaleDateString("en-US", { day: "numeric" }),
      isCurrent: i === now.getDate(),
    });
  }
  return points;
};