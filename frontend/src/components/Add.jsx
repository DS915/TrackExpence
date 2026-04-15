import React from 'react'
import { modalStyles } from '../assets/dummyStyles'
import { X } from 'lucide-react';

// ✅ ADD THESE CATEGORY LISTS
const incomeCategories = [
  "Salary",
  "Freelance",
  "Investment",
  "Bonus",
  "Other",
];

const expenseCategories = [
  "Food",
  "Housing",
  "Transport",
  "Shopping",
  "Entertainment",
  "Utilities",
  "Healthcare",
  "Other",
];

const AddTransactionModal = ({
  showModal,
  setShowModal,
  newTransaction,
  setNewTransaction,
  handleAddTransaction,
  type = "both",
  title = "Add New Transaction",
  buttonText = "Add Transaction",
  categories = [], // ❌ no longer used directly
  color = "teal"
}) => {
  if (!showModal) return null;

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentDate = today.toISOString().split('T')[0];
  const minDate = `${currentYear}-01-01`;

  const colorClass = modalStyles.colorClasses[color];

  // ✅ MAIN FIX: dynamic categories
  const dynamicCategories =
    newTransaction.type === "income"
      ? incomeCategories
      : expenseCategories;

  return (
    <div className={modalStyles.overlay}>
      <div className={modalStyles.modalContainer}>
        <div className={modalStyles.modalHeader}>
          <h3 className={modalStyles.modalTitle}>{title}</h3>
          <button onClick={() => setShowModal(false)} className={modalStyles.closeButton}>
            <X size={24}/>
          </button>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          handleAddTransaction();
        }}>
          <div className={modalStyles.form}>

            <div>
              <label className={modalStyles.label}>Description</label>
              <input
                type="text"
                value={newTransaction.description}
                onChange={(e) =>
                  setNewTransaction((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className={modalStyles.input(colorClass.ring)}
                placeholder={type === "both" ? "Salary, Funds, etc." : "Groceries, Rent, etc."}
                required
              />
            </div>

            <div>
              <label className={modalStyles.label}>Amount</label>
              <input
                type="number"
                value={newTransaction.amount}
                onChange={(e) =>
                  setNewTransaction((prev) => ({
                    ...prev,
                    amount: e.target.value,
                  }))
                }
                className={modalStyles.input(colorClass.ring)}
                placeholder='0.00'
                required
              />
            </div>

            {type === "both" && (
              <div>
                <label className={modalStyles.label}>Type</label>
                <div className={modalStyles.typeButtonContainer}>
                  <button
                    type="button"
                    className={modalStyles.typeButton(
                      newTransaction.type === 'income',
                      modalStyles.colorClasses.teal.typeButtonSelected
                    )}
                    onClick={() =>
                      setNewTransaction(prev => ({
                        ...prev,
                        type: 'income',
                        category: incomeCategories[0] // ✅ auto reset
                      }))
                    }
                  >
                    Income
                  </button>

                  <button
                    type="button"
                    className={modalStyles.typeButton(
                      newTransaction.type === 'expense',
                      modalStyles.colorClasses.orange.typeButtonSelected
                    )}
                    onClick={() =>
                      setNewTransaction(prev => ({
                        ...prev,
                        type: 'expense',
                        category: expenseCategories[0] // ✅ auto reset
                      }))
                    }
                  >
                    Expense
                  </button>
                </div>
              </div>
            )}

            {/* ✅ FIXED CATEGORY */}
            <div>
              <label className={modalStyles.label}>Category</label>
              <select
                value={newTransaction.category}
                onChange={(e) =>
                  setNewTransaction((prev) => ({
                    ...prev,
                    category: e.target.value
                  }))
                }
                className={modalStyles.input(colorClass.ring)}
              >
                {dynamicCategories.map((cat) => (
                  <option value={cat} key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* DATE */}
            <div>
              <label className={modalStyles.label}>Date</label>
              <input
                type='date'
                value={newTransaction.date}
                onChange={(e) =>
                  setNewTransaction((prev) => ({
                    ...prev,
                    date: e.target.value,
                  }))
                }
                className={modalStyles.input(colorClass.ring)}
                min={minDate}
                max={currentDate}
                required
              />
            </div>

            <button type='submit' className={modalStyles.submitButton(colorClass.button)}>
              {buttonText}
            </button>

          </div>
        </form>
      </div>
    </div>
  )
};

export default AddTransactionModal;