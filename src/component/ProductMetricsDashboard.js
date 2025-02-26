import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import MetricsDashbaordFeature  from './MetricsDashbaordFeature'

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
  // State for the currently selected metric
  const [selectedMetric, setSelectedMetric] = useState("NPS");

  // State for storing entries for each metric type
  const [metricsData, setMetricsData] = useState({
    NPS: [],
    CAC: [],
    CSAT: [],
    CES: [],
  });

  // Initial form state – each metric uses only its relevant fields.
  const initialFormState = {
    date: "",
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
    // CES fields
    totalEffort: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [editingEntryId, setEditingEntryId] = useState(null);

  // Update form values on change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Returns a short review based on the metric and its value.
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

  // Returns an explanation of what the metric means and how it’s calculated.
  const getMetricExplanation = (metric) => {
    if (metric === "NPS") {
      return "Net Promoter Score (NPS) measures customer loyalty by asking how likely customers are to recommend your product. It is calculated by subtracting the percentage of detractors from the percentage of promoters.";
    } else if (metric === "CAC") {
      return "Customer Acquisition Cost (CAC) is the total cost of acquiring a new customer, calculated by dividing the total acquisition cost by the number of new customers acquired.";
    } else if (metric === "CSAT") {
      return "Customer Satisfaction Score (CSAT) is an average rating of customer satisfaction, typically on a scale from 1 to 5.";
    } else if (metric === "CES") {
      return "Customer Effort Score (CES) measures how easy it is for customers to interact with your product. Lower scores indicate less effort required.";
    }
    return "";
  };

  // Compute the metric value based on the selected metric and form data.
  const computeMetricValue = () => {
    const data = formData;
    if (selectedMetric === "NPS") {
      const promoters = Number(data.promoters);
      const detractors = Number(data.detractors);
      const respondents = Number(data.respondents);
      if (respondents > 0) {
        return (promoters / respondents) * 100 - (detractors / respondents) * 100;
      }
      return 0;
    } else if (selectedMetric === "CAC") {
      const cost = Number(data.cost);
      const newCustomers = Number(data.newCustomers);
      if (newCustomers > 0) {
        return cost / newCustomers;
      }
      return 0;
    } else if (selectedMetric === "CSAT") {
      const totalScore = Number(data.totalScore);
      const responses = Number(data.responses);
      if (responses > 0) {
        return totalScore / responses;
      }
      return 0;
    } else if (selectedMetric === "CES") {
      const totalEffort = Number(data.totalEffort);
      const responses = Number(data.responses);
      if (responses > 0) {
        return totalEffort / responses;
      }
      return 0;
    }
    return 0;
  };

  // Handle form submission for creating or updating an entry.
  const handleSubmit = (e) => {
    e.preventDefault();
    const metricValue = computeMetricValue();
    const entry = {
      id: editingEntryId ? editingEntryId : Date.now(),
      date: formData.date,
      value: metricValue,
      // Save all form data in case it is needed later.
      data: { ...formData },
    };

    setMetricsData((prev) => {
      const list = prev[selectedMetric];
      if (editingEntryId) {
        // Update the existing entry.
        return {
          ...prev,
          [selectedMetric]: list.map((item) => (item.id === editingEntryId ? entry : item)),
        };
      } else {
        // Add a new entry.
        return {
          ...prev,
          [selectedMetric]: [...list, entry],
        };
      }
    });

    // Reset the form after submission.
    setFormData(initialFormState);
    setEditingEntryId(null);
  };

  // Populate the form with an entry for editing.
  const handleEdit = (entry) => {
    setFormData({
      date: entry.date,
      promoters: entry.data.promoters || "",
      detractors: entry.data.detractors || "",
      respondents: entry.data.respondents || "",
      cost: entry.data.cost || "",
      newCustomers: entry.data.newCustomers || "",
      totalScore: entry.data.totalScore || "",
      responses: entry.data.responses || "",
      totalEffort: entry.data.totalEffort || "",
    });
    setEditingEntryId(entry.id);
  };

  // Delete an entry.
  const handleDelete = (id) => {
    setMetricsData((prev) => {
      const list = prev[selectedMetric];
      return {
        ...prev,
        [selectedMetric]: list.filter((item) => item.id !== id),
      };
    });
  };

  // Prepare the data for the chart, sorted by date.
  const sortedData = [...metricsData[selectedMetric]].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const chartData = {
    labels: sortedData.map((item) => item.date),
    datasets: [
      {
        label: selectedMetric + " Trend",
        data: sortedData.map((item) => item.value),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4 mt-10">
     
<MetricsDashbaordFeature/>
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

      {/* Form for adding/updating an entry for the selected metric */}
      <form onSubmit={handleSubmit} className="mb-4 p-6 md:p-8 border rounded shadow">

        <h2 className="text-xl font-semibold mb-2">
          {editingEntryId ? "Edit" : "Add"} {selectedMetric} Entry
        </h2>
        <div className="mb-2">
          <label className="block">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-1 w-full"
            required
          />
        </div>
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
        <button type="submit" className="bg-purple-800 text-white px-4 py-2 rounded">
          {editingEntryId ? "Update Entry" : "Add Entry"}
        </button>
      </form>

      {/* Table of entries for the selected metric */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">{selectedMetric} Entries</h2>
        {metricsData[selectedMetric].length > 0 ? (
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
              {metricsData[selectedMetric].map((entry) => (
                <tr key={entry.id}>
                  <td className="border p-2 text-center">{entry.date}</td>
                  <td className="border p-2 text-center">{entry.value.toFixed(2)}</td>
                  <td className="border p-2 text-center">
                    {getMetricReview(selectedMetric, entry.value)}
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleEdit(entry)}
                      className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No entries available for {selectedMetric}.</p>
        )}
      </div>

      {/* Chart displaying the trend for the selected metric */}
      <div className="mb-4 p-4 border rounded shadow">
        <h2 className="text-xl font-semibold mb-2">{selectedMetric} Trend Chart</h2>
        {sortedData.length > 0 ? (
          <div style={{ height: "400px" }}>
            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        ) : (
          <p>No data to display in chart.</p>
        )}
      </div>

      {/* Analysis & Explanation Section */}
      <div className="mb-4 p-4 border rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Analysis & Explanation</h2>
        <p>
          <strong>Metric Explanation:</strong> {getMetricExplanation(selectedMetric)}
        </p>
        {sortedData.length > 0 ? (
          <p>
            <strong>Latest Entry Analysis:</strong>{" "}
            {getMetricReview(selectedMetric, sortedData[sortedData.length - 1].value)}
          </p>
        ) : (
          <p>No data available for analysis.</p>
        )}
      
      </div>
    </div>
  );
};

export default ProductMetricsDashboard;
