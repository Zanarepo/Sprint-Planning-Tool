import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabaseClient";
import { Line } from "react-chartjs-2";
import ProductMetricsFeatures from './ProductMetricsFeatures'

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
import { FaArrowUp, FaArrowDown, FaArrowRight, FaEdit, FaTrash } from "react-icons/fa";

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

const ProductMetricsComponent = () => {
  // State for user and metrics records.
  const [, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    id: null,
    period_date: "",
    new_users: "",
    retained_users: "",
    churned_users: "",
    total_users_at_start: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Retrieve user email from localStorage and fetch user id from Supabase.
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

  // Define fetchRecords using useCallback to avoid missing dependency warnings.
  const fetchRecords = useCallback(async () => {
    if (userId) {
      const { data, error } = await supabase
        .from("users_metrics")
        .select("*")
        .eq("user_id", userId)
        .order("period_date", { ascending: true });
      if (error) {
        console.error("Error fetching records:", error);
      } else {
        setRecords(data);
      }
    }
  }, [userId]);

  // Fetch records when userId or fetchRecords changes.
  useEffect(() => {
    if (userId) {
      fetchRecords();
    }
  }, [userId, fetchRecords]);

  // Handle input changes for the form.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit handler to insert or update a record.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { period_date, new_users, retained_users, churned_users, total_users_at_start } = form;
    if (
      !period_date ||
      new_users === "" ||
      retained_users === "" ||
      churned_users === "" ||
      total_users_at_start === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }
    const payload = {
      user_id: userId,
      period_date,
      new_users: Number(new_users),
      retained_users: Number(retained_users),
      churned_users: Number(churned_users),
      total_users_at_start: Number(total_users_at_start),
    };

    if (isEditing) {
      const { error } = await supabase.from("users_metrics").update(payload).eq("id", form.id);
      if (error) {
        console.error("Error updating record:", error);
      } else {
        fetchRecords();
      }
      setIsEditing(false);
    } else {
      const { error } = await supabase.from("users_metrics").insert([payload]);
      if (error) {
        console.error("Error inserting record:", error);
      } else {
        fetchRecords();
      }
    }
    setForm({
      id: null,
      period_date: "",
      new_users: "",
      retained_users: "",
      churned_users: "",
      total_users_at_start: "",
    });
  };

  // Prepare a record for editing.
  const handleEdit = (record) => {
    setForm(record);
    setIsEditing(true);
  };

  // Delete a single record.
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      const { error } = await supabase.from("users_metrics").delete().eq("id", id);
      if (error) {
        console.error("Error deleting record:", error);
      } else {
        fetchRecords();
      }
    }
  };

  // Delete all records for the current user.
  const handleDeleteAll = async () => {
    if (window.confirm("Are you sure you want to delete all records?")) {
      const { error } = await supabase.from("users_metrics").delete().eq("user_id", userId);
      if (error) {
        console.error("Error deleting all records:", error);
      } else {
        fetchRecords();
      }
    }
  };

  // Helper function to provide a recommendation for each record.
  const getRecommendation = (record, growthRate) => {
    if (growthRate === null) {
      return "Insufficient data to provide a recommendation.";
    }
    const retentionRate =
      record.total_users_at_start > 0
        ? (record.retained_users / record.total_users_at_start) * 100
        : 0;
    const churnRate =
      record.total_users_at_start > 0
        ? (record.churned_users / record.total_users_at_start) * 100
        : 0;

    if (growthRate < 0) {
      return "Negative growth detected. Consider reviewing your acquisition strategy.";
    }
    if (churnRate > 30) {
      return "High churn rate detected. Investigate retention strategies.";
    }
    if (retentionRate < 40) {
      return "Low retention. Focus on engagement and retention improvements.";
    }
    return "Performance looks stable. Keep up the good work!";
  };

  // Compute chart data from the fetched records.
  const sortedRecords = [...records].sort(
    (a, b) => new Date(a.period_date) - new Date(b.period_date)
  );
  const chartLabels = sortedRecords.map((r) => r.period_date);
  const growthRatesData = sortedRecords.map((record, index) => {
    if (index === 0 || sortedRecords[index - 1].new_users === 0) return 0;
    return Number(
      (
        ((record.new_users - sortedRecords[index - 1].new_users) /
          sortedRecords[index - 1].new_users) *
        100
      ).toFixed(2)
    );
  });
  const retentionRatesData = sortedRecords.map((r) =>
    r.total_users_at_start > 0
      ? Number(((r.retained_users / r.total_users_at_start) * 100).toFixed(2))
      : 0
  );
  const churnRatesData = sortedRecords.map((r) =>
    r.total_users_at_start > 0
      ? Number(((r.churned_users / r.total_users_at_start) * 100).toFixed(2))
      : 0
  );

  // Chart options with a time‑scaled x‑axis.
  const chartOptions = (title, yLabel) => ({
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: title },
    },
    scales: {
      x: {
        type: "time",
        time: { unit: "day", tooltipFormat: "PP" },
        title: { display: true, text: "Date" },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: yLabel },
      },
    },
  });

  return (
    <div className="container mx-auto p-4">
      <ProductMetricsFeatures/>
      {/* Header & Print Button */}
      <div className="flex flex-col items-center mb-4">
       
      
      </div>

      {/* Form Section at the Top (Full Width) */}
      <div className="bg-white shadow-lg rounded px-4 sm:px-8 pt-6 pb-8 mb-6 w-full">
        <h3 className="text-2xl font-bold mb-4 text-center">
          {isEditing ? "Edit Record" : "Add Record"}
        </h3>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="period_date" className="block text-gray-700 text-sm font-bold mb-2">
              Date
            </label>
            <input
              type="date"
              id="period_date"
              name="period_date"
              value={form.period_date}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
            />
          </div>
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="new_users" className="block text-gray-700 text-sm font-bold mb-2">
                New Users
              </label>
              <input
                type="number"
                id="new_users"
                name="new_users"
                value={form.new_users}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                placeholder="e.g. 50"
              />
            </div>
            <div>
              <label htmlFor="retained_users" className="block text-gray-700 text-sm font-bold mb-2">
                Retained Users
              </label>
              <input
                type="number"
                id="retained_users"
                name="retained_users"
                value={form.retained_users}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                placeholder="e.g. 30"
              />
            </div>
          </div>
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="churned_users" className="block text-gray-700 text-sm font-bold mb-2">
                Churned Users
              </label>
              <input
                type="number"
                id="churned_users"
                name="churned_users"
                value={form.churned_users}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                placeholder="e.g. 5"
              />
            </div>
            <div>
              <label htmlFor="total_users_at_start" className="block text-gray-700 text-sm font-bold mb-2">
                Total Users at Start
              </label>
              <input
                type="number"
                id="total_users_at_start"
                name="total_users_at_start"
                value={form.total_users_at_start}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                placeholder="e.g. 200"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none"
            >
              {isEditing ? "Update Record" : "Add Record"} 
            </button> <br></br> <br></br>
          </div>

          
       
        </form>
        <div className="flex items-center justify-center">
        <button
          onClick={() => window.print()}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Print Page
        </button>
        </div>
      </div>

      {/* Data Table Section at the Top */}
      <div className="bg-white shadow-lg rounded px-4 sm:px-8 pt-6 pb-8 mb-6 max-w-5xl mx-auto overflow-x-auto">
        <h3 className="text-2xl font-bold mb-4 text-center">Records</h3>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border-b">Date</th>
              <th className="px-4 py-2 border-b">New Users</th>
              <th className="px-4 py-2 border-b">Growth Rate</th>
              <th className="px-4 py-2 border-b">Retained Users</th>
              <th className="px-4 py-2 border-b">Retention Rate</th>
              <th className="px-4 py-2 border-b">Churned Users</th>
              <th className="px-4 py-2 border-b">Churn Rate</th>
              <th className="px-4 py-2 border-b">Recommendation</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedRecords.slice().reverse().map((record) => {
              const recIndex = sortedRecords.findIndex((r) => r.id === record.id);
              const growthRate =
                recIndex === 0 || sortedRecords[recIndex - 1].new_users === 0
                  ? null
                  : ((record.new_users - sortedRecords[recIndex - 1].new_users) /
                      sortedRecords[recIndex - 1].new_users) *
                    100;
              const recommendation = getRecommendation(record, growthRate);
              return (
                <tr key={record.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{record.period_date}</td>
                  <td className="px-4 py-2 border-b">{record.new_users}</td>
                  <td className="px-4 py-2 border-b">
                    {growthRate === null ? (
                      "N/A"
                    ) : (
                      <span
                        className={
                          growthRate > 0
                            ? "text-green-500"
                            : growthRate < 0
                            ? "text-red-500"
                            : "text-gray-500"
                        }
                      >
                        {growthRate.toFixed(2)}%{" "}
                        {growthRate > 0 ? (
                          <FaArrowUp className="inline" />
                        ) : growthRate < 0 ? (
                          <FaArrowDown className="inline" />
                        ) : (
                          <FaArrowRight className="inline" />
                        )}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">{record.retained_users}</td>
                  <td className="px-4 py-2 border-b">
                    <span className="text-green-500">
                      {record.total_users_at_start > 0
                        ? ((record.retained_users / record.total_users_at_start) * 100).toFixed(2)
                        : "0.00"}
                      %
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b">{record.churned_users}</td>
                  <td className="px-4 py-2 border-b">
                    <span className="text-red-500">
                      {record.total_users_at_start > 0
                        ? ((record.churned_users / record.total_users_at_start) * 100).toFixed(2)
                        : "0.00"}
                      %
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b">{recommendation}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => handleEdit(record)}
                      title="Edit"
                      className="text-blue-500 hover:text-blue-700 mr-4"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(record.id)}
                      title="Delete"
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
            {sortedRecords.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center px-4 py-2">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleDeleteAll}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete All Records
          </button>
        </div>
      </div>

      {/* Charts Section (Full Width & Responsive) */}
      <div className="w-full mb-6">
        <div className="bg-white shadow-lg rounded p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">User Growth Rate (%)</h3>
          <Line
            data={{
              labels: chartLabels,
              datasets: [
                {
                  label: "Growth Rate (%)",
                  data: growthRatesData,
                  fill: false,
                  backgroundColor: "rgba(59,130,246,0.4)",
                  borderColor: "rgba(59,130,246,1)",
                  tension: 0.2,
                },
              ],
            }}
            options={chartOptions("User Growth Rate Over Time", "Growth Rate (%)")}
          />
        </div>
        <div className="bg-white shadow-lg rounded p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">User Retention Rate (%)</h3>
          <Line
            data={{
              labels: chartLabels,
              datasets: [
                {
                  label: "Retention Rate (%)",
                  data: retentionRatesData,
                  fill: false,
                  backgroundColor: "rgba(16,185,129,0.4)",
                  borderColor: "rgba(16,185,129,1)",
                  tension: 0.2,
                },
              ],
            }}
            options={chartOptions("User Retention Rate Over Time", "Retention Rate (%)")}
          />
        </div>
        <div className="bg-white shadow-lg rounded p-6">
          <h3 className="text-xl font-bold mb-4">User Churn Rate (%)</h3>
          <Line
            data={{
              labels: chartLabels,
              datasets: [
                {
                  label: "Churn Rate (%)",
                  data: churnRatesData,
                  fill: false,
                  backgroundColor: "rgba(220,38,38,0.4)",
                  borderColor: "rgba(220,38,38,1)",
                  tension: 0.2,
                },
              ],
            }}
            options={chartOptions("User Churn Rate Over Time", "Churn Rate (%)")}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductMetricsComponent;



























