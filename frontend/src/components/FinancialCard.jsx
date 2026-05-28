import React from "react";

const FinancialCard = ({ icon, label, value, additionalContent, borderColor = "" }) => {
  return (
    <div className={`bg-white/60 dark:bg-neutral-900/45 backdrop-blur-md rounded-2xl p-6 border border-neutral-200/50 dark:border-white/10 flex items-center gap-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${borderColor}`}>
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400 font-bold">{label}</p>
        <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white mt-1.5 tracking-tight">{value}</h3>
        {additionalContent}
      </div>
    </div>
  );
};

export default FinancialCard;
