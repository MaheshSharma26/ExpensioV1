import React from "react";
import { X } from "lucide-react";
import { modalStyles } from "../assets/dummyStyles";

const AddTransactionModal = ({
  showModal,
  setShowModal,
  newTransaction,
  setNewTransaction,
  handleAddTransaction,
  loading = false,
  type = "both",
  title = "Add New Transaction",
  buttonText = "Add Transaction",
  categories = [
    "Food",
    "Housing",
    "Transport",
    "Shopping",
    "Entertainment",
    "Utilities",
    "Healthcare",
    "Salary",
    "Freelance",
    "Investment",
    "Bonus",
    "Other",
  ],
  color = "teal",
}) => {
  if (!showModal) return null;

  const colorClass = modalStyles.colorClasses[color] || modalStyles.colorClasses.teal;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTransaction.description || !newTransaction.amount) return;
    handleAddTransaction();
  };

  return (
    <div className={modalStyles.overlay} onClick={() => setShowModal(false)}>
      <div 
        className={modalStyles.modalContainer} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={modalStyles.modalHeader}>
          <h2 className={modalStyles.modalTitle}>{title}</h2>
          <button 
            type="button" 
            onClick={() => setShowModal(false)}
            className={modalStyles.closeButton}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={modalStyles.form}>
          {/* Transaction Type (shown only when type is 'both') */}
          {type === "both" && (
            <div>
              <label className={modalStyles.label}>Transaction Type</label>
              <div className={modalStyles.typeButtonContainer}>
                <button
                  type="button"
                  className={modalStyles.typeButton(
                    newTransaction.type === "income",
                    modalStyles.colorClasses.teal.typeButtonSelected
                  )}
                  onClick={() =>
                    setNewTransaction((prev) => ({ ...prev, type: "income", category: "Salary" }))
                  }
                >
                  Income
                </button>
                <button
                  type="button"
                  className={modalStyles.typeButton(
                    newTransaction.type === "expense",
                    modalStyles.colorClasses.orange.typeButtonSelected
                  )}
                  onClick={() =>
                    setNewTransaction((prev) => ({ ...prev, type: "expense", category: "Food" }))
                  }
                >
                  Expense
                </button>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <label htmlFor="description" className={modalStyles.label}>Description</label>
            <input
              type="text"
              id="description"
              required
              placeholder="e.g. Weekly Groceries"
              value={newTransaction.description}
              onChange={(e) =>
                setNewTransaction((prev) => ({ ...prev, description: e.target.value }))
              }
              className={modalStyles.input(colorClass.ring)}
            />
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className={modalStyles.label}>Amount (₹)</label>
            <input
              type="number"
              id="amount"
              required
              min="0.01"
              step="any"
              placeholder="0.00"
              value={newTransaction.amount}
              onChange={(e) =>
                setNewTransaction((prev) => ({ ...prev, amount: e.target.value }))
              }
              className={modalStyles.input(colorClass.ring)}
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className={modalStyles.label}>Category</label>
            <select
              id="category"
              value={newTransaction.category}
              onChange={(e) =>
                setNewTransaction((prev) => ({ ...prev, category: e.target.value }))
              }
              className={modalStyles.input(colorClass.ring)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Account */}
          <div>
            <label htmlFor="account" className={modalStyles.label}>Account</label>
            <select
              id="account"
              value={newTransaction.account || "Cash"}
              onChange={(e) =>
                setNewTransaction((prev) => ({ ...prev, account: e.target.value }))
              }
              className={modalStyles.input(colorClass.ring)}
            >
              <option value="Bank Account">🏦 Bank Account</option>
              <option value="Cash">💵 Cash Wallet</option>
              <option value="Credit Card">💳 Credit Card</option>
              <option value="Investment">📈 Investment</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className={modalStyles.label}>Date</label>
            <input
              type="date"
              id="date"
              required
              value={newTransaction.date}
              onChange={(e) =>
                setNewTransaction((prev) => ({ ...prev, date: e.target.value }))
              }
              className={modalStyles.input(colorClass.ring)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`${modalStyles.submitButton(colorClass.button)} ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Adding..." : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
