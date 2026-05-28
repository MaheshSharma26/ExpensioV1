import React, { useState } from "react";
import { Save, X, Edit, Trash2 } from "lucide-react";
import { transactionItemStyles } from "../assets/dummyStyles";
import { colorClasses } from "../assets/color";

const TransactionItem = ({
  transaction,
  isEditing,
  editForm,
  setEditForm,
  onSave,
  onCancel,
  onDelete,
  type = "expense",
  categoryIcons,
  setEditingId,
  amountClass = "font-bold truncate block text-right",
  iconClass = "p-3 rounded-xl flex-shrink-0",
}) => {
  const [errors, setErrors] = useState({ description: "", amount: "" });

  const classes = colorClasses[type];
  const sign = type === "income" ? "+" : "-";

  const validate = () => {
    const nextErrors = { description: "", amount: "" };
    const desc = String(editForm.description ?? "").trim();
    const amtRaw = editForm.amount;
    const amt = amtRaw === "" || amtRaw === null || amtRaw === undefined ? "" : String(amtRaw).trim();

    if (!desc) {
      nextErrors.description = "Description is required.";
    }

    if (amt === "") {
      nextErrors.amount = "Amount is required.";
    } else if (Number(amt) <= 0) {
      nextErrors.amount = "Amount must be greater than 0.";
    }

    setErrors(nextErrors);
    return !nextErrors.description && !nextErrors.amount;
  };

  const handleSaveClick = () => {
    if (validate()) {
      setErrors({ description: "", amount: "" });
      onSave();
    }
  };

  const icon = categoryIcons[transaction.category] || categoryIcons.Other;

  return (
    <div className={transactionItemStyles.container(isEditing, classes)}>
      <div className={transactionItemStyles.mainContainer}>
        <div className={transactionItemStyles.iconContainer(iconClass, classes)}>
          {icon}
        </div>
        <div className={transactionItemStyles.contentContainer}>
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, description: e.target.value }))
                }
                className={transactionItemStyles.input(!!errors.description, classes)}
                placeholder="Description"
              />
              {errors.description && (
                <p className={transactionItemStyles.errorText}>{errors.description}</p>
              )}
              <select
                value={editForm.category}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, category: e.target.value }))
                }
                className={transactionItemStyles.input(false, classes)}
              >
                {type === "income" ? (
                  <>
                    <option value="Salary">Salary</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Investment">Investment</option>
                    <option value="Bonus">Bonus</option>
                    <option value="Other">Other</option>
                  </>
                ) : (
                  <>
                    <option value="Food">Food</option>
                    <option value="Housing">Housing</option>
                    <option value="Transport">Transport</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Other">Other</option>
                  </>
                )}
              </select>
              <select
                value={editForm.account || "Cash"}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, account: e.target.value }))
                }
                className={transactionItemStyles.input(false, classes)}
              >
                <option value="Bank Account">🏦 Bank Account</option>
                <option value="Cash">💵 Cash Wallet</option>
                <option value="Credit Card">💳 Credit Card</option>
                <option value="Investment">📈 Investment</option>
              </select>
            </div>
          ) : (
            <>
              <p className={transactionItemStyles.description}>
                {transaction.description}
                <span className={`ml-2 px-2 py-0.5 text-[10px] md:text-xs font-semibold rounded-full inline-flex items-center gap-1 leading-none align-middle
                  ${transaction.account === "Bank Account" ? "bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400 border border-teal-200/30 dark:border-teal-900/40" : 
                    transaction.account === "Credit Card" ? "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400 border border-orange-200/30 dark:border-orange-900/40" :
                    transaction.account === "Investment" ? "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-400 border border-cyan-200/30 dark:border-cyan-900/40" :
                    "bg-zinc-100 text-zinc-700 dark:bg-zinc-800/40 dark:text-zinc-400 border border-zinc-200/30 dark:border-zinc-700/40"
                  }`}
                >
                  {transaction.account === "Bank Account" && "🏦"}
                  {transaction.account === "Credit Card" && "💳"}
                  {transaction.account === "Investment" && "📈"}
                  {transaction.account === "Cash" && "💵"}
                  {" "}{transaction.account || "Cash"}
                </span>
              </p>
              <p className={transactionItemStyles.details}>
                {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
              </p>
            </>
          )}
        </div>
      </div>

      <div className={transactionItemStyles.actionsContainer}>
        <div className={transactionItemStyles.amountContainer}>
          {isEditing ? (
            <div className="flex flex-col items-end">
              <input
                type="number"
                value={editForm.amount}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, amount: e.target.value }))
                }
                className={transactionItemStyles.amountInput(
                  !!errors.amount,
                  classes,
                )}
              />
              {errors.amount && (
                <p
                  id={`amt-error-${transaction.id}`}
                  className={transactionItemStyles.errorText}
                >
                  {errors.amount}
                </p>
              )}
            </div>
          ) : (
            <span
              className={transactionItemStyles.amountText(amountClass, classes)}
            >
              {sign}₹
              {Number(transaction.amount).toLocaleString("en-IN", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}
            </span>
          )}
        </div>

        <div className={transactionItemStyles.buttonsContainer}>
          {isEditing ? (
            <>
              <button
                onClick={handleSaveClick}
                className={transactionItemStyles.saveButton(classes)}
                title="Save"
              >
                <Save size={16} />
              </button>

              <button
                onClick={() => {
                  setErrors({ description: "", amount: "" });
                  onCancel();
                }}
                className={transactionItemStyles.cancelButton}
                title="Cancel"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setEditForm({
                    description: transaction.description ?? "",
                    amount: transaction.amount ?? "",
                    category: transaction.category ?? "",
                    date: transaction.date ?? "",
                    type: transaction.type ?? "expense",
                    account: transaction.account ?? "Cash",
                  });
                  setErrors({ description: "", amount: "" });
                  setEditingId(transaction.id);
                }}
                className={transactionItemStyles.editButton(classes)}
                title="Edit"
              >
                <Edit size={16} />
              </button>

              <button
                onClick={() => onDelete(transaction.id)}
                className={transactionItemStyles.deleteButton(classes)}
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
