import React, { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "../../supabaseClient";
import { Line } from "react-chartjs-2";
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
import { Edit3, Trash } from "lucide-react";
import AARRRMetricsFeatures from "../AARRRMetricsFeatures";

// Register Chart.js components
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

const AAARRMetricsDashboard = () => {
  // User state
  const [, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);

  // AAARR Metrics records state
  const [metrics, setMetrics] = useState([]);

  // Form state for creating/updating a metric record
  const [formData, setFormData] = useState({
    id: null,
    metric_date: "",
    acquisition: "",
    activation: "",
    retention: "",
    revenue: "",
    referral: "",
  });
  const [isEditing, setIsEditing] = useState(false);

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

  // Wrap fetchMetrics in useCallback so it becomes a stable reference.
  const fetchMetrics = useCallback(async () => {
    const { data, error } = await supabase
      .from("aarr_metrics")
      .select("*")
      .eq("user_id", userId)
      .order("metric_date", { ascending: true });
    if (error) {
      console.error("Error fetching metrics:", error);
    } else {
      setMetrics(data);
    }
  }, [userId]);

  // Once userId is available, fetch the AAARR metrics for that user.
  useEffect(() => {
    if (userId) {
      fetchMetrics();
    }
  }, [userId, fetchMetrics]);

  // Handle changes in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Create or update a metric record
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { metric_date, acquisition, activation, retention, revenue, referral, id } = formData;
    if (
      !metric_date ||
      acquisition === "" ||
      activation === "" ||
      retention === "" ||
      revenue === "" ||
      referral === ""
    ) {
      alert("Please fill in all fields");
      return;
    }
    const recordData = {
      user_id: userId,
      metric_date,
      acquisition: Number(acquisition),
      activation: Number(activation),
      retention: Number(retention),
      revenue: Number(revenue),
      referral: Number(referral),
    };
    if (isEditing) {
      // Update existing record
      const { error } = await supabase
        .from("aarr_metrics")
        .update(recordData)
        .eq("id", id)
        .eq("user_id", userId);
      if (error) {
        console.error("Error updating metric:", error);
      } else {
        setIsEditing(false);
        setFormData({
          id: null,
          metric_date: "",
          acquisition: "",
          activation: "",
          retention: "",
          revenue: "",
          referral: "",
        });
        fetchMetrics();
      }
    } else {
      // Insert new record
      const { error } = await supabase
        .from("aarr_metrics")
        .insert([recordData]);
      if (error) {
        console.error("Error creating metric:", error);
      } else {
        setFormData({
          id: null,
          metric_date: "",
          acquisition: "",
          activation: "",
          retention: "",
          revenue: "",
          referral: "",
        });
        fetchMetrics();
      }
    }
  };

  // Pre-fill the form for editing a record
  const handleEdit = (id) => {
    const record = metrics.find((rec) => rec.id === id);
    if (record) {
      setFormData({
        id: record.id,
        metric_date: record.metric_date,
        acquisition: record.acquisition,
        activation: record.activation,
        retention: record.retention,
        revenue: record.revenue,
        referral: record.referral,
      });
      setIsEditing(true);
    }
  };

  // Delete an individual record
  const handleDelete = async (id) => {
    if (window.confirm("Delete this record?")) {
      const { error } = await supabase
        .from("aarr_metrics")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);
      if (error) {
        console.error("Error deleting metric:", error);
      } else {
        fetchMetrics();
      }
    }
  };

  // Delete all records for this user

  // Prepare chart data (sort records by date)
  const sortedMetrics = [...metrics].sort(
    (a, b) => new Date(a.metric_date) - new Date(b.metric_date)
  );
  const chartData = {
    labels: sortedMetrics.map((rec) => rec.metric_date),
    datasets: [
      {
        label: "Acquisition",
        data: sortedMetrics.map((rec) => rec.acquisition),
        fill: false,
        backgroundColor: "rgba(59,130,246,0.5)",
        borderColor: "rgba(59,130,246,1)",
        tension: 0.2,
      },
      {
        label: "Activation",
        data: sortedMetrics.map((rec) => rec.activation),
        fill: false,
        backgroundColor: "rgba(16,185,129,0.5)",
        borderColor: "rgba(16,185,129,1)",
        tension: 0.2,
      },
      {
        label: "Retention",
        data: sortedMetrics.map((rec) => rec.retention),
        fill: false,
        backgroundColor: "rgba(234,179,8,0.5)",
        borderColor: "rgba(234,179,8,1)",
        tension: 0.2,
      },
      {
        label: "Revenue",
        data: sortedMetrics.map((rec) => rec.revenue),
        fill: false,
        backgroundColor: "rgba(220,38,38,0.5)",
        borderColor: "rgba(220,38,38,1)",
        tension: 0.2,
      },
      {
        label: "Referral",
        data: sortedMetrics.map((rec) => rec.referral),
        fill: false,
        backgroundColor: "rgba(139,92,246,0.5)",
        borderColor: "rgba(139,92,246,1)",
        tension: 0.2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "AAARR Metrics Over Time" },
    },
    scales: {
      x: {
        type: "time",
        time: { unit: "day", tooltipFormat: "PP" },
        title: { display: true, text: "Date" },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Count / Value" },
      },
    },
  };

  // Analysis & Recommendations:
  // Compute average conversion rates and average revenue per retained user
  const analysisData = useMemo(() => {
    if (metrics.length === 0) return null;
    let totalActivationRate = 0,
      countActivation = 0;
    let totalRetentionRate = 0,
      countRetention = 0;
    let totalReferralRate = 0,
      countReferral = 0;
    let totalRevenuePerRetained = 0,
      countRevenue = 0;
    metrics.forEach((record) => {
      if (record.acquisition > 0) {
        totalActivationRate += (record.activation / record.acquisition) * 100;
        countActivation++;
      }
      if (record.activation > 0) {
        totalRetentionRate += (record.retention / record.activation) * 100;
        countRetention++;
      }
      if (record.retention > 0) {
        totalReferralRate += (record.referral / record.retention) * 100;
        totalRevenuePerRetained += record.revenue / record.retention;
        countReferral++;
        countRevenue++;
      }
    });
    return {
      avgActivationRate: countActivation ? (totalActivationRate / countActivation).toFixed(2) : "N/A",
      avgRetentionRate: countRetention ? (totalRetentionRate / countRetention).toFixed(2) : "N/A",
      avgReferralRate: countReferral ? (totalReferralRate / countReferral).toFixed(2) : "N/A",
      avgRevenuePerRetained: countRevenue ? (totalRevenuePerRetained / countRevenue).toFixed(2) : "N/A",
    };
  }, [metrics]);

  // Generate a recommendation based on the computed averages
  const recommendation = useMemo(() => {
    if (!analysisData) return "";
    let rec = "Based on your current AAARR metrics, ";
    if (analysisData.avgActivationRate !== "N/A" && parseFloat(analysisData.avgActivationRate) < 50) {
      rec += "your activation rate is low—consider improving your onboarding process. ";
    }
    if (analysisData.avgRetentionRate !== "N/A" && parseFloat(analysisData.avgRetentionRate) < 50) {
      rec += "Your retention rate is low—enhance user engagement strategies. ";
    }
    if (analysisData.avgReferralRate !== "N/A" && parseFloat(analysisData.avgReferralRate) < 20) {
      rec += "Referral rates are below average—think about incentivizing referrals. ";
    }
    if (analysisData.avgRevenuePerRetained !== "N/A" && parseFloat(analysisData.avgRevenuePerRetained) < 10) {
      rec += "Revenue per retained user is low—explore upselling or cross-selling opportunities. ";
    }
    if (rec === "Based on your current AAARR metrics, ") {
      rec += "your metrics are performing well. Keep up the good work!";
    }
    return rec;
  }, [analysisData]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">AAARR Metrics Dashboard</h2>
      <AARRRMetricsFeatures />

      {/* Data Entry Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-blue-900 shadow-lg rounded px-4 sm:px-8 pt-6 pb-8 mb-6 w-full"
      >
        <div className="mb-4">
          <label className="block text-white font-bold mb-2">Date</label>
          <input
            type="date"
            name="metric_date"
            value={formData.metric_date}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-bold mb-2">Acquisition</label>
            <input
              type="number"
              name="acquisition"
              value={formData.acquisition}
              onChange={handleChange}
              placeholder="e.g., 1000"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-white font-bold mb-2">Activation</label>
            <input
              type="number"
              name="activation"
              value={formData.activation}
              onChange={handleChange}
              placeholder="e.g., 600"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-white font-bold mb-2">Retention</label>
            <input
              type="number"
              name="retention"
              value={formData.retention}
              onChange={handleChange}
              placeholder="e.g., 400"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-white font-bold mb-2">Revenue</label>
            <input
              type="number"
              name="revenue"
              value={formData.revenue}
              onChange={handleChange}
              placeholder="e.g., 5000"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-white font-bold mb-2">Referral</label>
            <input
              type="number"
              name="referral"
              value={formData.referral}
              onChange={handleChange}
              placeholder="e.g., 150"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isEditing ? "Update Record" : "Add Record"}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full sm:w-auto bg-blue-500 text-white hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Print Data/Chart
          </button>
        </div>
      </form>

      {/* Data Table */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Acquisition</th>
              <th className="px-4 py-2 border">Activation</th>
              <th className="px-4 py-2 border">Retention</th>
              <th className="px-4 py-2 border">Revenue</th>
              <th className="px-4 py-2 border">Referral</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {metrics.length > 0 ? (
              metrics
                .slice()
                .reverse()
                .map((record) => (
                  <tr key={record.id} className="text-center hover:bg-gray-100">
                    <td className="px-4 py-2 border">{record.metric_date}</td>
                    <td className="px-4 py-2 border">{record.acquisition}</td>
                    <td className="px-4 py-2 border">{record.activation}</td>
                    <td className="px-4 py-2 border">{record.retention}</td>
                    <td className="px-4 py-2 border">${record.revenue.toFixed(2)}</td>
                    <td className="px-4 py-2 border">{record.referral}</td>
                    <td className="px-4 py-2 border space-x-2">
                      <button onClick={() => handleEdit(record.id)} className="text-blue-500 hover:text-blue-700" title="Edit">
                        <Edit3 size={18} />
                      </button>
                      <button onClick={() => handleDelete(record.id)} className="text-red-500 hover:text-red-700" title="Delete">
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center px-4 py-2">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Analysis & Recommendations Section */}
      {analysisData && (
        <div className="bg-indigo-50 p-4 rounded-lg shadow mb-6">
          <h3 className="text-xl font-bold mb-2">Analysis & Recommendations</h3>
          <p className="text-gray-700">
            Average Activation Rate: {analysisData.avgActivationRate}%<br />
            Average Retention Rate: {analysisData.avgRetentionRate}%<br />
            Average Referral Rate: {analysisData.avgReferralRate}%<br />
            Average Revenue per Retained User: ${analysisData.avgRevenuePerRetained}
          </p>
          <p className="mt-2 text-gray-700">{recommendation}</p>
        </div>
      )}

      {/* Chart Section (full width, responsive) */}
      <div className="bg-white shadow-lg rounded p-6 mb-6 max-w-3xl mx-auto" style={{ height: "500px" }}>
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Print Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => window.print()}
          className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Print Data/Chart
        </button>
      </div>
    </div>
  );
};

export default AAARRMetricsDashboard;













