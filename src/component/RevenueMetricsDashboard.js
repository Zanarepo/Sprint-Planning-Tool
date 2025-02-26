import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import RevenueMetricsFeatures from './RevenueMetricsFeatures'
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
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RevenueMetricsDashboard = () => {
  // Define the metric tabs
  const metricTabs = ["MRR", "ARR", "ARPU", "RevenueChurn", "GrossMargin"];
  const [selectedMetric, setSelectedMetric] = useState("MRR");

  // Initial form state (all possible fields)
  const initialFormState = {
    date: "",
    // MRR: Monthly Recurring Revenue
    monthlyRevenue: "",
    // ARR: Annual Recurring Revenue
    annualRevenue: "",
    // ARPU: Average Revenue Per User
    totalRevenue: "",
    activeUsers: "",
    // Revenue Churn: (Lost Revenue / Starting Revenue)*100
    lostRevenue: "",
    startingRevenue: "",
    // Gross Margin: ((Revenue - Cost) / Revenue)*100
    revenue: "",
    cost: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [editingEntryId, setEditingEntryId] = useState(null);
  const [metricsData, setMetricsData] = useState({
    MRR: [],
    ARR: [],
    ARPU: [],
    RevenueChurn: [],
    GrossMargin: [],
  });

  // Update form state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Compute the metric value based on the selected metric and its inputs
  const computeMetricValue = () => {
    if (selectedMetric === "MRR") {
      // MRR is the monthly revenue (in currency units)
      return Number(formData.monthlyRevenue) || 0;
    } else if (selectedMetric === "ARR") {
      // ARR is the annual revenue (in currency units)
      return Number(formData.annualRevenue) || 0;
    } else if (selectedMetric === "ARPU") {
      // ARPU = Total Revenue / Active Users
      const totalRev = Number(formData.totalRevenue);
      const active = Number(formData.activeUsers);
      return active > 0 ? totalRev / active : 0;
    } else if (selectedMetric === "RevenueChurn") {
      // Revenue Churn (%) = (Lost Revenue / Starting Revenue) * 100
      const lost = Number(formData.lostRevenue);
      const starting = Number(formData.startingRevenue);
      return starting > 0 ? (lost / starting) * 100 : 0;
    } else if (selectedMetric === "GrossMargin") {
      // Gross Margin (%) = ((Revenue - Cost) / Revenue) * 100
      const rev = Number(formData.revenue);
      const cost = Number(formData.cost);
      return rev > 0 ? ((rev - cost) / rev) * 100 : 0;
    }
    return 0;
  };


  
  // Handle form submission (create/update)
  const handleSubmit = (e) => {
    e.preventDefault();
    const metricValue = computeMetricValue();
    const entry = {
      id: editingEntryId ? editingEntryId : Date.now(),
      date: formData.date,
      value: metricValue,
      data: { ...formData },
    };

    setMetricsData((prev) => {
      const list = prev[selectedMetric];
      if (editingEntryId) {
        // Update existing entry
        return {
          ...prev,
          [selectedMetric]: list.map((item) =>
            item.id === editingEntryId ? entry : item
          ),
        };
      } else {
        // Add new entry
        return {
          ...prev,
          [selectedMetric]: [...list, entry],
        };
      }
    });

    // Reset form and editing state
    setFormData(initialFormState);
    setEditingEntryId(null);
  };

  // Populate the form for editing
  const handleEdit = (entry) => {
    setFormData({
      date: entry.date,
      monthlyRevenue: entry.data.monthlyRevenue || "",
      annualRevenue: entry.data.annualRevenue || "",
      totalRevenue: entry.data.totalRevenue || "",
      activeUsers: entry.data.activeUsers || "",
      lostRevenue: entry.data.lostRevenue || "",
      startingRevenue: entry.data.startingRevenue || "",
      revenue: entry.data.revenue || "",
      cost: entry.data.cost || "",
    });
    setEditingEntryId(entry.id);
  };

  // Delete an entry
  const handleDelete = (id) => {
    setMetricsData((prev) => {
      const list = prev[selectedMetric];
      return {
        ...prev,
        [selectedMetric]: list.filter((item) => item.id !== id),
      };
    });
  };

  // Prepare chart data by sorting entries by date
  const sortedData = [...metricsData[selectedMetric]].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const chartData = {
    labels: sortedData.map((item) => item.date),
    datasets: [
      {
        label: `${selectedMetric} Trend`,
        data: sortedData.map((item) => item.value),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  // For analysis: get the latest entry and (if available) the previous one to compute change
  const latestEntry = sortedData[sortedData.length - 1];
  const previousEntry =
    sortedData.length > 1 ? sortedData[sortedData.length - 2] : null;
  let percentageChange = null;
  if (previousEntry && previousEntry.value !== 0) {
    percentageChange =
      ((latestEntry.value - previousEntry.value) / previousEntry.value) * 100;
  }

  // Function to return a review, recommendation, and change percentage based on the metric
  const getMetricReview = (metric, latestVal, change) => {
    if (metric === "MRR") {
      if (change !== null) {
        if (change > 0)
          return {
            review: "Positive: MRR is increasing.",
            recommendation:
              "Keep up your retention and upselling strategies.",
            change: change.toFixed(2) + "%",
          };
        else if (change < 0)
          return {
            review: "Negative: MRR is declining.",
            recommendation:
              "Investigate customer churn and adjust pricing strategies.",
            change: change.toFixed(2) + "%",
          };
        else
          return {
            review: "Breakeven: MRR is stable.",
            recommendation:
              "Maintain current efforts and look for incremental growth opportunities.",
            change: "0%",
          };
      } else {
        return {
          review: "No previous data for comparison.",
          recommendation: "Monitor MRR trends over time.",
          change: "N/A",
        };
      }
    } else if (metric === "ARR") {
      if (change !== null) {
        if (change > 0)
          return {
            review: "Positive: ARR is increasing.",
            recommendation:
              "Your subscription growth is healthy. Consider expanding marketing efforts.",
            change: change.toFixed(2) + "%",
          };
        else if (change < 0)
          return {
            review: "Negative: ARR is declining.",
            recommendation:
              "Investigate churn and customer satisfaction issues.",
            change: change.toFixed(2) + "%",
          };
        else
          return {
            review: "Breakeven: ARR is stable.",
            recommendation: "Keep an eye on annual revenue growth.",
            change: "0%",
          };
      } else {
        return {
          review: "No previous data for comparison.",
          recommendation: "Monitor ARR trends over time.",
          change: "N/A",
        };
      }
    } else if (metric === "ARPU") {
      if (change !== null) {
        if (change > 0)
          return {
            review: "Positive: ARPU is increasing.",
            recommendation:
              "Upselling and cross-selling strategies are effective.",
            change: change.toFixed(2) + "%",
          };
        else if (change < 0)
          return {
            review: "Negative: ARPU is decreasing.",
            recommendation:
              "Review pricing strategies and product value propositions.",
            change: change.toFixed(2) + "%",
          };
        else
          return {
            review: "Breakeven: ARPU is stable.",
            recommendation:
              "Monitor for potential opportunities to increase revenue per user.",
            change: "0%",
          };
      } else {
        return {
          review: "No previous data for comparison.",
          recommendation: "Monitor ARPU trends over time.",
          change: "N/A",
        };
      }
    } else if (metric === "RevenueChurn") {
      // For churn, lower percentages are preferable.
      if (change !== null) {
        if (latestVal < 5)
          return {
            review: "Positive: Revenue churn is minimal.",
            recommendation:
              "Continue strong customer retention efforts.",
            change: change.toFixed(2) + "%",
          };
        else if (latestVal >= 5 && latestVal <= 10)
          return {
            review: "Neutral: Revenue churn is moderate.",
            recommendation:
              "Enhance customer engagement and support.",
            change: change.toFixed(2) + "%",
          };
        else
          return {
            review: "Negative: Revenue churn is high.",
            recommendation:
              "Address churn causes and improve customer satisfaction.",
            change: change.toFixed(2) + "%",
          };
      } else {
        if (latestVal < 5)
          return {
            review: "Positive: Revenue churn is minimal.",
            recommendation: "Keep up the retention strategies.",
            change: "N/A",
          };
        else if (latestVal >= 5 && latestVal <= 10)
          return {
            review: "Neutral: Revenue churn is moderate.",
            recommendation: "Investigate improvements in customer support.",
            change: "N/A",
          };
        else
          return {
            review: "Negative: Revenue churn is high.",
            recommendation: "Take immediate action to reduce churn.",
            change: "N/A",
          };
      }
    } else if (metric === "GrossMargin") {
      if (change !== null) {
        if (latestVal >= 50)
          return {
            review: "Positive: Gross margin is strong.",
            recommendation:
              "Your cost management is effective. Consider reinvesting in growth.",
            change: change.toFixed(2) + "%",
          };
        else if (latestVal >= 20 && latestVal < 50)
          return {
            review: "Neutral: Gross margin is moderate.",
            recommendation:
              "Examine operational efficiency for potential improvements.",
            change: change.toFixed(2) + "%",
          };
        else
          return {
            review: "Negative: Gross margin is low.",
            recommendation:
              "Reassess pricing or reduce costs to improve profitability.",
            change: change.toFixed(2) + "%",
          };
      } else {
        if (latestVal >= 50)
          return {
            review: "Positive: Gross margin is strong.",
            recommendation: "Maintain current strategies.",
            change: "N/A",
          };
        else if (latestVal >= 20 && latestVal < 50)
          return {
            review: "Neutral: Gross margin is moderate.",
            recommendation: "Look into cost optimization opportunities.",
            change: "N/A",
          };
        else
          return {
            review: "Negative: Gross margin is low.",
            recommendation:
              "Immediate review of cost structure is needed.",
            change: "N/A",
          };
      }
    }
    return { review: "", recommendation: "", change: "" };
  };

  const metricReview = latestEntry
    ? getMetricReview(selectedMetric, latestEntry.value, percentageChange)
    : { review: "", recommendation: "", change: "" };

  // Explanations for each metric
  const getMetricExplanation = (metric) => {
    if (metric === "MRR") {
      return "Monthly Recurring Revenue (MRR) represents the predictable revenue generated from subscriptions each month. It is calculated as the sum of all recurring monthly subscription revenue.";
    } else if (metric === "ARR") {
      return "Annual Recurring Revenue (ARR) is the yearly subscription revenue, typically calculated as MRR x 12. It represents the long-term revenue potential of your subscription base.";
    } else if (metric === "ARPU") {
      return "Average Revenue Per User (ARPU) is the revenue generated per active user, calculated as total revenue divided by the number of active users.";
    } else if (metric === "RevenueChurn") {
      return "Revenue Churn measures the percentage of revenue lost due to customer churn. It is calculated as (lost revenue / starting revenue) x 100.";
    } else if (metric === "GrossMargin") {
      return "Gross Margin represents profitability after deducting costs. It is calculated as ((revenue - cost) / revenue) x 100.";
    }
    return "";
  };

  const metricExplanation = getMetricExplanation(selectedMetric);

  return (
    <div className="container mx-auto p-4">
        <RevenueMetricsFeatures/>
      

      {/* Metric Tabs */}
      <div className="grid grid-cols-3 grid-rows-2 gap-4 mb-4 text-center mt-8">
  {metricTabs.map((metric) => (
    <button
      key={metric}
      className={`px-0 py-3 rounded ${
        selectedMetric === metric
          ? "bg-green-600 text-white"
          : "bg-gray-200 text-gray-800"
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


      {/* Form for Adding/Updating an Entry */}
      <form
        onSubmit={handleSubmit}
        className="mb-4 p-4 border rounded shadow"
      >
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
        {selectedMetric === "MRR" && (
          <div className="mb-2">
            <label className="block">Monthly Revenue</label>
            <input
              type="number"
              name="monthlyRevenue"
              value={formData.monthlyRevenue}
              onChange={handleChange}
              className="border p-1 w-full"
              required
            />
          </div>
        )}
        {selectedMetric === "ARR" && (
          <div className="mb-2">
            <label className="block">Annual Revenue</label>
            <input
              type="number"
              name="annualRevenue"
              value={formData.annualRevenue}
              onChange={handleChange}
              className="border p-1 w-full"
              required
            />
          </div>
        )}
        {selectedMetric === "ARPU" && (
          <>
            <div className="mb-2">
              <label className="block">Total Revenue</label>
              <input
                type="number"
                name="totalRevenue"
                value={formData.totalRevenue}
                onChange={handleChange}
                className="border p-1 w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block">Active Users</label>
              <input
                type="number"
                name="activeUsers"
                value={formData.activeUsers}
                onChange={handleChange}
                className="border p-1 w-full"
                required
              />
            </div>
          </>
        )}
        {selectedMetric === "RevenueChurn" && (
          <>
            <div className="mb-2">
              <label className="block">Lost Revenue</label>
              <input
                type="number"
                name="lostRevenue"
                value={formData.lostRevenue}
                onChange={handleChange}
                className="border p-1 w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block">Starting Revenue</label>
              <input
                type="number"
                name="startingRevenue"
                value={formData.startingRevenue}
                onChange={handleChange}
                className="border p-1 w-full"
                required
              />
            </div>
          </>
        )}
        {selectedMetric === "GrossMargin" && (
          <>
            <div className="mb-2">
              <label className="block">Revenue</label>
              <input
                type="number"
                name="revenue"
                value={formData.revenue}
                onChange={handleChange}
                className="border p-1 w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block">Cost</label>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                className="border p-1 w-full"
                required
              />
            </div>
          </>
        )}
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          {editingEntryId ? "Update Entry" : "Add Entry"}
        </button>
      </form>

      {/* Table of Entries */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">
          {selectedMetric} Entries
        </h2>
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
                  <td className="border p-2 text-center">
                    {entry.value.toFixed(2)}
                  </td>
                  <td className="border p-2 text-center">
                    {getMetricReview(selectedMetric, entry.value, null).review}
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

      {/* Trend Chart */}
      <div className="mb-4 p-4 border rounded shadow">
        <h2 className="text-xl font-semibold mb-2">
          {selectedMetric} Trend Chart
        </h2>
        {sortedData.length > 0 ? (
          <div style={{ height: "400px" }}>
            <Line
              data={chartData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        ) : (
          <p>No data to display in chart.</p>
        )}
      </div>

      {/* Analysis & Explanation Section */}
      <div className="mb-4 p-4 border rounded shadow">
        <h2 className="text-xl font-semibold mb-2">
          Analysis & Explanation
        </h2>
        {latestEntry ? (
          <>
            <p>
              <strong>Latest Value:</strong> {latestEntry.value.toFixed(2)}
            </p>
            {percentageChange !== null && (
              <p>
                <strong>Change from previous:</strong>{" "}
                {percentageChange.toFixed(2)}%
              </p>
            )}
            <p>
              <strong>Review:</strong> {metricReview.review}
            </p>
            <p>
              <strong>Recommendation:</strong> {metricReview.recommendation}
            </p>
          </>
        ) : (
          <p>No data available for analysis.</p>
        )}
        <p className="mt-2">
          <strong>Metric Explanation:</strong> {metricExplanation}
        </p>
      </div>
    </div>
  );
};

export default RevenueMetricsDashboard;
