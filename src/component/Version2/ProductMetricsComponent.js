import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "../../supabaseClient";
import { Line } from "react-chartjs-2";
import MetricsDashbaordFeature from "../MetricsDashbaordFeature";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProductMetricsDashboard = () => {
  // Selected metric type (tab)
  const [selectedMetric, setSelectedMetric] = useState("NPS");
  // Array of metric entries from the database
  const [metrics, setMetrics] = useState([]);
  // Form state for creating/updating an entry
  const initialFormState = {
    entry_date: "",
    value: "",
    // NPS fields
    promoters: "",
    detractors: "",
    respondents: "",
    // CAC fields
    cost: "",
    newCustomers: "",
    // CSAT fields
    totalScore: "",
    responses: "",
    // CES field
    totalEffort: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  // When editing, store the entry id
  const [editingEntryId, setEditingEntryId] = useState(null);
  // User ID from Supabase
  const [userId, setUserId] = useState(null);

  // Chart data will be computed from metrics.
  const [, setChartData] = useState({ labels: [], datasets: [] });

  // Fetch the current user id from Supabase using email stored in localStorage.
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
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
    }
  }, []);

  // Fetch metric entries for the selected metric type for the current user.
  const fetchMetrics = useCallback(async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("product_metrics")
      .select("*")
      .eq("user_id", userId)
      .eq("metric_type", selectedMetric)
      .order("entry_date", { ascending: true });
    if (error) {
      console.error("Error fetching metrics:", error);
    } else {
      setMetrics(data);
    }
  }, [userId, selectedMetric]);

  useEffect(() => {
    if (userId) fetchMetrics();
  }, [userId, selectedMetric, fetchMetrics]);

  // Update chart data based on the sorted metrics
  useEffect(() => {
    const sorted = [...metrics].sort(
      (a, b) => new Date(a.entry_date) - new Date(b.entry_date)
    );
    setChartData({
      labels: sorted.map((entry) => entry.entry_date),
      datasets: [
        {
          label: `${selectedMetric} Trend`,
          data: sorted.map((entry) => Number(entry.value)),
          borderColor: "rgba(75,192,192,1)",
          fill: false,
        },
      ],
    });
  }, [metrics, selectedMetric]);

  // Handle form changes.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Compute the metric value based on form data.
  const computeMetricValue = () => {
    const data = formData;
    if (selectedMetric === "NPS") {
      const promoters = Number(data.promoters);
      const detractors = Number(data.detractors);
      const respondents = Number(data.respondents);
      if (respondents > 0) {
        // Typical NPS = % Promoters - % Detractors.
        return ((promoters - detractors) / respondents) * 100;
      }
      return 0;
    } else if (selectedMetric === "CAC") {
      const cost = Number(data.cost);
      const newCustomers = Number(data.newCustomers);
      if (newCustomers > 0) return cost / newCustomers;
      return 0;
    } else if (selectedMetric === "CSAT") {
      const totalScore = Number(data.totalScore);
      const responses = Number(data.responses);
      if (responses > 0) return totalScore / responses;
      return 0;
    } else if (selectedMetric === "CES") {
      const totalEffort = Number(data.totalEffort);
      const responses = Number(data.responses);
      if (responses > 0) return totalEffort / responses;
      return 0;
    }
    return 0;
  };

  // Handle form submission for creating/updating an entry.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const metricValue = computeMetricValue();
    if (editingEntryId) {
      // Update existing record.
      const { error } = await supabase
        .from("product_metrics")
        .update({
          entry_date: formData.entry_date,
          value: metricValue,
          promoters: formData.promoters ? parseInt(formData.promoters) : null,
          detractors: formData.detractors ? parseInt(formData.detractors) : null,
          respondents: formData.respondents ? parseInt(formData.respondents) : null,
          cost: formData.cost ? parseFloat(formData.cost) : null,
          new_customers: formData.newCustomers ? parseInt(formData.newCustomers) : null,
          total_score: formData.totalScore ? parseFloat(formData.totalScore) : null,
          responses: formData.responses ? parseInt(formData.responses) : null,
          total_effort: formData.totalEffort ? parseFloat(formData.totalEffort) : null,
        })
        .eq("id", editingEntryId)
        .eq("user_id", userId);
      if (error) {
        console.error("Error updating metric:", error);
      } else {
        fetchMetrics();
        setEditingEntryId(null);
        setFormData(initialFormState);
      }
    } else {
      // Insert new record.
      const payload = {
        user_id: userId,
        metric_type: selectedMetric,
        entry_date: formData.entry_date,
        value: metricValue,
        promoters: formData.promoters ? parseInt(formData.promoters) : null,
        detractors: formData.detractors ? parseInt(formData.detractors) : null,
        respondents: formData.respondents ? parseInt(formData.respondents) : null,
        cost: formData.cost ? parseFloat(formData.cost) : null,
        new_customers: formData.newCustomers ? parseInt(formData.newCustomers) : null,
        total_score: formData.totalScore ? parseFloat(formData.totalScore) : null,
        responses: formData.responses ? parseInt(formData.responses) : null,
        total_effort: formData.totalEffort ? parseFloat(formData.totalEffort) : null,
      };
      const { error } = await supabase
        .from("product_metrics")
        .insert([payload])
        .single();
      if (error) {
        console.error("Error inserting metric:", error);
      } else {
        fetchMetrics();
        setFormData(initialFormState);
      }
    }
  };

  // Load an entry for editing.
  const handleEdit = (entry) => {
    setFormData({
      entry_date: entry.entry_date,
      promoters: entry.promoters !== null ? entry.promoters.toString() : "",
      detractors: entry.detractors !== null ? entry.detractors.toString() : "",
      respondents: entry.respondents !== null ? entry.respondents.toString() : "",
      cost: entry.cost !== null ? entry.cost.toString() : "",
      newCustomers: entry.new_customers !== null ? entry.new_customers.toString() : "",
      totalScore: entry.total_score !== null ? entry.total_score.toString() : "",
      responses: entry.responses !== null ? entry.responses.toString() : "",
      totalEffort: entry.total_effort !== null ? entry.total_effort.toString() : "",
    });
    setEditingEntryId(entry.id);
  };

  // Delete an entry.
  const handleDelete = async (id) => {
    const { error } = await supabase
      .from("product_metrics")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);
    if (error) {
      console.error("Error deleting metric:", error);
    } else {
      fetchMetrics();
    }
  };

  // Returns a short review based on the metric value.
  const getMetricReview = (metric, value) => {
    if (metric === "NPS") {
      if (value >= 50) return "Excellent - High loyalty";
      else if (value >= 0) return "Good - Generally satisfied";
      else return "Negative - Improvement needed";
    } else if (metric === "CAC") {
      if (value < 100) return "Efficient - Low acquisition cost";
      else if (value < 200) return "Moderate - Could be improved";
      else return "High - Acquisition cost is too high";
    } else if (metric === "CSAT") {
      if (value >= 4) return "Positive - High satisfaction";
      else if (value >= 3) return "Neutral - Average satisfaction";
      else return "Negative - Low satisfaction";
    } else if (metric === "CES") {
      if (value <= 2) return "Positive - Minimal effort";
      else if (value <= 3) return "Neutral - Moderate effort";
      else return "Negative - Too much effort required";
    }
    return "";
  };

  // Returns an explanation for the metric.
  const getMetricExplanation = (metric) => {
    if (metric === "NPS") {
      return "Net Promoter Score (NPS) measures customer loyalty by asking how likely customers are to recommend your product. It is calculated by subtracting the percentage of detractors from the percentage of promoters.";
    } else if (metric === "CAC") {
      return "Customer Acquisition Cost (CAC) is the total cost of acquiring a new customer, divided by the number of new customers acquired.";
    } else if (metric === "CSAT") {
      return "Customer Satisfaction Score (CSAT) is an average rating of customer satisfaction on a scale from 1 to 5.";
    } else if (metric === "CES") {
      return "Customer Effort Score (CES) measures how easy it is for customers to interact with your product. Lower scores indicate less effort required.";
    }
    return "";
  };

  // Prepare chart data.
  const sortedData = [...metrics].sort(
    (a, b) => new Date(a.entry_date) - new Date(b.entry_date)
  );
  const chartDataConfig = {
    labels: sortedData.map((entry) => entry.entry_date),
    datasets: [
      {
        label: `${selectedMetric} Trend`,
        data: sortedData.map((entry) => Number(entry.value)),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  return (
    <div className="container mx-auto p-6 mt-10">
      <MetricsDashbaordFeature />
      {/* Tabs for selecting the metric */}
      <div className="flex justify-center items-center space-x-4 mb-4 text-center mt-8">
        {["NPS", "CAC", "CSAT", "CES"].map((metric) => (
          <button
            key={metric}
            className={`px-4 py-2 rounded ${
              selectedMetric === metric ? "bg-purple-900 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => {
              setSelectedMetric(metric);
              setFormData(initialFormState);
              setEditingEntryId(null);
            }}
          >
            {metric}
          </button>
        ))}
      </div>

      {/* Form for adding/updating an entry */}
      <form onSubmit={handleSubmit} className="mb-4 p-6 md:p-8 border rounded shadow w-full mx-auto">
  {/* Form content */}


  <h2 className="text-xl font-semibold mb-2">
    {editingEntryId ? "Edit" : "Add"} {selectedMetric} Entry
  </h2>
  <div className="mb-2 w-full">
  <label className="block mb-1">Date</label>
  <input
    type="date"
    name="entry_date"  // Changed from "date" to "entry_date"
    value={formData.entry_date}
    onChange={handleChange}
    className="block border p-1 w-full"
    required
  />
</div>

  {/* ...other form fields... */}


        {selectedMetric === "NPS" && (
          <>
            <div className="mb-2">
              <label className="block">Promoters</label>
              <input
                type="number"
                name="promoters"
                value={formData.promoters}
                onChange={handleChange}
                className="border p-1 w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block">Detractors</label>
              <input
                type="number"
                name="detractors"
                value={formData.detractors}
                onChange={handleChange}
                className="border p-1 w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block">Respondents</label>
              <input
                type="number"
                name="respondents"
                value={formData.respondents}
                onChange={handleChange}
                className="border p-1 w-full"
                required
              />
            </div>
          </>
        )}
        {selectedMetric === "CAC" && (
          <>
            <div className="mb-2">
              <label className="block">Total Acquisition Cost</label>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                className="border p-1 w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block">New Customers Acquired</label>
              <input
                type="number"
                name="newCustomers"
                value={formData.newCustomers}
                onChange={handleChange}
                className="border p-1 w-full"
                required
              />
            </div>
          </>
        )}
        {selectedMetric === "CSAT" && (
          <>
            <div className="mb-2">
              <label className="block">Total Score</label>
              <input
                type="number"
                name="totalScore"
                value={formData.totalScore}
                onChange={handleChange}
                className="border p-1 w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block">Number of Responses</label>
              <input
                type="number"
                name="responses"
                value={formData.responses}
                onChange={handleChange}
                className="border p-1 w-full"
                required
              />
            </div>
          </>
        )}
        {selectedMetric === "CES" && (
          <>
            <div className="mb-2">
              <label className="block">Total Effort Score</label>
              <input
                type="number"
                name="totalEffort"
                value={formData.totalEffort}
                onChange={handleChange}
                className="border p-1 w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block">Number of Responses</label>
              <input
                type="number"
                name="responses"
                value={formData.responses}
                onChange={handleChange}
                className="border p-1 w-full"
                required
              />
            </div>
          </>
        )}
        <button type="submit" className="bg-purple-800 text-white px-4 py-2 rounded w-full">
          {editingEntryId ? "Update Entry" : "Add Entry"}
        </button>
      </form>

      {/* Table of entries */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">{selectedMetric} Entries</h2>
        {metrics.length > 0 ? (
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Value</th>
                <th className="border p-2">Review</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((entry) => (
                <tr key={entry.id}>
                  <td className="border p-2 text-center">{entry.entry_date}</td>
                  <td className="border p-2 text-center">{Number(entry.value).toFixed(2)}</td>
                  <td className="border p-2 text-center">{getMetricReview(selectedMetric, entry.value)}</td>
                  <td className="border p-2 text-center">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
                      <button
                        onClick={() => handleEdit(entry)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded w-full sm:w-auto text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded w-full sm:w-auto text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No entries available for {selectedMetric}.</p>
        )}
      </div>

      {/* Chart displaying the trend */}
      <div className="mb-4 p-4 border rounded shadow w-full max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-2 text-center">{selectedMetric} Trend Chart</h2>
        {sortedData.length > 0 ? (
          <div style={{ height: "400px" }}>
            <Line data={chartDataConfig} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        ) : (
          <p className="text-center">No data to display in chart.</p>
        )}
      </div>

      {/* Analysis & Explanation Section */}
      <div className="mb-4 p-4 border rounded shadow w-full max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-2">Analysis & Explanation</h2>
        <p>
          <strong>Metric Explanation:</strong> {getMetricExplanation(selectedMetric)}
        </p>
        {sortedData.length > 0 ? (
          <p>
            <strong>Latest Entry Analysis:</strong> {getMetricReview(selectedMetric, sortedData[sortedData.length - 1].value)}
          </p>
        ) : (
          <p>No data available for analysis.</p>
        )}
      </div>
    </div>
  );
};

export default ProductMetricsDashboard;
