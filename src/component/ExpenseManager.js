import React, { useState } from "react";
import { Edit3, Trash } from "lucide-react";
import PMExpenseTrackerFeature from './PMExpenseTrackerFeature'

const ExpenseManager = () => {
  // State for managing the list of expenses
  const [expenses, setExpenses] = useState([]);
  // State for form inputs (expense name, cost, description)
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    cost: "",
    description: "",
  });
  // State to check if we are editing an existing expense
  const [isEditing, setIsEditing] = useState(false);
  // State to toggle the receipt modal
  const [showReceipt, setShowReceipt] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit the form to add or update an expense
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.cost) {
      alert("Please enter both an expense name and its cost.");
      return;
    }
    if (isEditing) {
      setExpenses(
        expenses.map((exp) =>
          exp.id === formData.id ? { ...formData, cost: Number(formData.cost) } : exp
        )
      );
      setIsEditing(false);
    } else {
      const newExpense = {
        ...formData,
        id: Date.now(),
        cost: Number(formData.cost),
      };
      setExpenses([...expenses, newExpense]);
    }
    setFormData({ id: null, name: "", cost: "", description: "" });
  };

  // Populate the form for editing a record
  const handleEdit = (id) => {
    const expense = expenses.find((exp) => exp.id === id);
    if (expense) {
      setFormData(expense);
      setIsEditing(true);
    }
  };

  // Delete an expense record
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      setExpenses(expenses.filter((exp) => exp.id !== id));
    }
  };

  // Calculate the total cost dynamically
  const totalCost = expenses.reduce((acc, exp) => acc + exp.cost, 0);

  return (
    <div className="container mx-auto p-6 mt-10">
        <PMExpenseTrackerFeature/>
      <h2 className="text-3xl font-bold text-center mb-6">Let's Track It</h2>

      {/* Expense Entry Form */}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Expense Item</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter expense item"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Cost</label>
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            placeholder="Enter cost"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Expense description or justification"
            className="w-full px-3 py-2 border rounded"
            rows="3"
          ></textarea>
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            {isEditing ? "Update Expense" : "Add Expense"}
          </button>
          <button
            type="button"
            onClick={() => setShowReceipt(true)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Generate Receipt
          </button>
        </div>
      </form>

      {/* Expense Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-orange-200">
            <tr>
              <th className="px-4 py-2 border">Item</th>
              <th className="px-4 py-2 border">Cost</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp.id} className="text-center">
                <td className="px-4 py-2 border">{exp.name}</td>
                <td className="px-4 py-2 border">${exp.cost.toFixed(2)}</td>
                <td className="px-4 py-2 border">{exp.description}</td>
                <td className="px-4 py-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(exp.id)}
                    title="Edit"
                    className="text-orange-500 hover:text-orange-700"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    title="Delete"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {expenses.length === 0 && (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center">
                  No expenses recorded.
                </td>
              </tr>
            )}
          </tbody>
          <tfoot className="bg-orange-200">
            <tr>
              <td className="px-4 py-2 border font-bold" colSpan="3">
                Total Cost
              </td>
              <td className="px-4 py-2 border font-bold">${totalCost.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Receipt Modal */}
      {showReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-xl w-full">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="text-2xl font-bold">Expense Receipt</h3>
              <button
                onClick={() => setShowReceipt(false)}
                className="text-red-500 font-bold"
              >
                X
              </button>
            </div>
            <div className="mb-4">
              {expenses.length > 0 ? (
                <table className="min-w-full mb-4">
                  <thead>
                    <tr className="bg-orange-200">
                      <th className="px-4 py-2 border">Item</th>
                      <th className="px-4 py-2 border">Cost</th>
                      <th className="px-4 py-2 border">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((exp) => (
                      <tr key={exp.id} className="text-center">
                        <td className="px-4 py-2 border">{exp.name}</td>
                        <td className="px-4 py-2 border">${exp.cost.toFixed(2)}</td>
                        <td className="px-4 py-2 border">{exp.description}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-orange-200">
                      <td className="px-4 py-2 border font-bold" colSpan="2">
                        Total
                      </td>
                      <td className="px-4 py-2 border font-bold">
                        ${totalCost.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              ) : (
                <p>No expenses recorded.</p>
              )}
            </div>
            <button
              onClick={() => window.print()}
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            >
              Print Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseManager;
