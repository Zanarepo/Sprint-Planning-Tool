
import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "../../supabaseClient";
import { Line } from "react-chartjs-2";
import { Edit3, Trash } from "lucide-react";
import PMExpenseTrackerFeature from "../PMExpenseTrackerFeature";

// Chart.js components registration
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const ExpenseManager = () => {
  // User state
  const [, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);

  // Expense records state
  const [expenses, setExpenses] = useState([]);
  // Form state for adding/updating an expense
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    cost: "",
    currency: "USD",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  // Receipt modal state and selected expense
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  // Retrieve user email from localStorage and fetch user id from Supabase
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
      console.debug("User email found in localStorage:", email);
      const fetchUserId = async () => {
        const { data, error } = await supabase
          .from("users")
          .select("id")
          .eq("email", email)
          .single();
        if (error) {
          console.error("Error fetching user id:", error);
        } else if (data) {
          setUserId(data.id);
        }
      };
      fetchUserId();
    } else {
      console.debug("No user email found in localStorage.");
    }
  }, []);

  // Fetch expenses for the user
  const fetchExpenses = useCallback(async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });
    if (error) {
      console.error("Error fetching expenses:", error);
    } else {
      setExpenses(data);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchExpenses();
    }
  }, [userId, fetchExpenses]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form (create/update expense)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, cost, currency, description, id } = formData;
    if (!name || cost === "") {
      alert("Please enter both an expense name and its cost.");
      return;
    }
    const recordData = {
      user_id: userId,
      name,
      cost: Number(cost),
      currency,
      description,
    };
    if (isEditing) {
      const { error } = await supabase
        .from("expenses")
        .update(recordData)
        .eq("id", id)
        .eq("user_id", userId);
      if (error) {
        console.error("Error updating expense:", error);
      } else {
        setIsEditing(false);
        setFormData({ id: null, name: "", cost: "", currency: "USD", description: "" });
        fetchExpenses();
      }
    } else {
      const { error } = await supabase.from("expenses").insert([recordData]);
      if (error) {
        console.error("Error creating expense:", error);
      } else {
        setFormData({ id: null, name: "", cost: "", currency: "USD", description: "" });
        fetchExpenses();
      }
    }
  };

  // Populate form for editing an expense
  const handleEdit = (id) => {
    const exp = expenses.find((exp) => exp.id === id);
    if (exp) {
      setFormData({
        id: exp.id,
        name: exp.name,
        cost: exp.cost,
        currency: exp.currency,
        description: exp.description,
      });
      setIsEditing(true);
    }
  };

  // Delete an expense record
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      const { error } = await supabase
        .from("expenses")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);
      if (error) {
        console.error("Error deleting expense:", error);
      } else {
        fetchExpenses();
      }
    }
  };

  // Delete all expenses for the user
  const handleDeleteAll = async () => {
    if (window.confirm("Are you sure you want to delete all expenses?")) {
      const { error } = await supabase
        .from("expenses")
        .delete()
        .eq("user_id", userId);
      if (error) {
        console.error("Error deleting all expenses:", error);
      } else {
        fetchExpenses();
      }
    }
  };

  // View receipt details: open a modal pop-up (not full-page) with Cancel button
  const handleView = (id) => {
    const exp = expenses.find((exp) => exp.id === id);
    if (exp) {
      setSelectedExpense(exp);
      setShowReceipt(true);
    }
  };

  // Determine currency for display: use currency from first expense or fallback to form default
  const currentCurrency = expenses.length > 0 ? expenses[0].currency : formData.currency;

  // Calculate total cost
  const totalCost = expenses.reduce((acc, exp) => acc + Number(exp.cost), 0);

  // Prepare chart data: expense cost over time
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
  const chartData = {
    labels: sortedExpenses.map((exp) => new Date(exp.created_at).toLocaleDateString()),
    datasets: [
      {
        label: `Expense Cost (${currentCurrency})`,
        data: sortedExpenses.map((exp) => Number(exp.cost)),
        fill: false,
        backgroundColor: "rgba(59,130,246,0.5)",
        borderColor: "rgba(59,130,246,1)",
        tension: 0.2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Expenses Over Time" },
    },
    scales: {
      x: {
        title: { display: true, text: "Date" },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Cost" },
      },
    },
  };

  return (
    <div className="container mx-auto p-4 mt-16">
      <PMExpenseTrackerFeature />
      <h2 className="text-3xl font-bold text-center mb-6">Expense Manager</h2>

      {/* Expense Entry Form (full width) */}
      <form onSubmit={handleSubmit} className="w-full bg-orange-500 p-6 rounded shadow mb-6">
        <div className="mb-4">
          <label className="block text-white  mb-2">Expense Item</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter expense item"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-white mb-2">Cost</label>
            <input
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              placeholder="Enter cost"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {/* Currency Dropdown */}
          <div>
            <label className="block text-white mb-2">Currency</label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="NGN">NGN - Nigerian Naira</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Expense description or justification"
            className="w-full px-3 py-2 border rounded"
            rows="3"
          ></textarea>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <button
            type="submit"
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            {isEditing ? "Update Expense" : "Add Expense"}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Print Data/Chart
          </button>
          <button
            type="button"
            onClick={handleDeleteAll}
            className="w-full sm:w-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete All Records
          </button>
        </div>
      </form>

      {/* Expense Table */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-orange-200">
            <tr>
              <th className="px-4 py-2 border">Item</th>
              <th className="px-4 py-2 border">Cost</th>
              <th className="px-4 py-2 border">Currency</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp.id} className="text-center hover:bg-gray-100">
                <td className="px-4 py-2 border">{exp.name}</td>
                <td className="px-4 py-2 border">
                  {Number(exp.cost).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="px-4 py-2 border">{exp.currency}</td>
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
                  <button
                    onClick={() => handleView(exp.id)}
                    title="View Receipt"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {expenses.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center">
                  No expenses recorded.
                </td>
              </tr>
            )}
          </tbody>
          <tfoot className="bg-orange-200">
            <tr>
              <td className="px-4 py-2 border font-bold" colSpan="4">
                Total Cost
              </td>
              <td className="px-4 py-2 border font-bold">
                {currentCurrency}{" "}
                {totalCost.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Chart Section (full width & responsive) */}
      <div className="bg-white shadow-lg rounded p-6 mb-6 w-full" style={{ height: "500px" }}>
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Receipt Modal (Pop-up with Cancel button) */}
      {showReceipt && selectedExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="text-2xl font-bold">Expense Receipt</h3>
              <button onClick={() => setShowReceipt(false)} className="text-red-500 font-bold text-2xl">
                X
              </button>
            </div>
            <div className="mb-4">
              <p>
                <strong>Item:</strong> {selectedExpense.name}
              </p>
              <p>
                <strong>Cost:</strong> {selectedExpense.currency}{" "}
                {Number(selectedExpense.cost).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p>
                <strong>Description:</strong> {selectedExpense.description}
              </p>
              <p>
                <strong>Date Recorded:</strong> {new Date(selectedExpense.created_at).toLocaleString()}
              </p>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowReceipt(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => window.print()}
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Print Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => window.print()}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
        >
          Print Data/Chart
        </button>
      </div>
    </div>
  );
};

export default ExpenseManager;
