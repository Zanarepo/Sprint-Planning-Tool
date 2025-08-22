import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const ProductMetricsSimulator = () => {
  const [metrics, setMetrics] = useState({
    DAU: 1000,
    NPS: 50, // Score from -100 to 100
    engagementRate: 40, // Percentage of active users engaging
    churnRate: 5, // Percentage of users leaving
    retentionRate: 75, // Percentage of users staying
  });

  const [autoSimulating, setAutoSimulating] = useState(false);

  // Manual metric adjustments
  const adjustMetric = (key, amount) => {
    setMetrics((prev) => ({
      ...prev,
      [key]: Math.max(0, Math.min(100, prev[key] + amount)), // Keeping values within 0-100 where needed
    }));
  };

  // Automatic simulation (updates every 5 seconds)
  useEffect(() => {
    let interval;
    if (autoSimulating) {
      interval = setInterval(() => {
        setMetrics((prev) => ({
          DAU: prev.DAU + Math.floor(Math.random() * 200 - 100), // Random fluctuation
          NPS: Math.max(-100, Math.min(100, prev.NPS + (Math.random() * 10 - 5))), // Keeps within -100 to 100
          engagementRate: Math.max(0, Math.min(100, prev.engagementRate + (Math.random() * 5 - 2))),
          churnRate: Math.max(0, Math.min(100, prev.churnRate + (Math.random() * 2 - 1))),
          retentionRate: Math.max(0, Math.min(100, prev.retentionRate + (Math.random() * 3 - 1))),
        }));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoSimulating]);

  // Prepare data for the chart
  const data = [
    { name: "DAU", value: metrics.DAU },
    { name: "NPS", value: metrics.NPS },
    { name: "Engagement", value: metrics.engagementRate },
    { name: "Churn", value: metrics.churnRate },
    { name: "Retention", value: metrics.retentionRate },
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Product Metrics Simulator</h2>

      {/* Metric Controls */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {Object.keys(metrics).map((key) => (
          <div key={key} className="flex flex-col items-center bg-white p-4 rounded-lg shadow">
            <span className="text-lg font-semibold">{key.replace(/([A-Z])/g, " $1")}</span>
            <span className="text-2xl font-bold">{metrics[key].toLocaleString()}</span>
            <button
              onClick={() => adjustMetric(key, key === "DAU" ? 100 : 5)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Increase {key}
            </button>
          </div>
        ))}
      </div>

      {/* Toggle Auto Simulation */}
      <div className="text-center mb-6">
        <button
          onClick={() => setAutoSimulating(!autoSimulating)}
          className={`px-6 py-2 rounded-lg font-semibold ${
            autoSimulating ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          } text-white transition`}
        >
          {autoSimulating ? "Stop Auto Simulation" : "Start Auto Simulation"}
        </button>
      </div>

      {/* Line Chart Visualization */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Metrics Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductMetricsSimulator;
