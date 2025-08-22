import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const AAARRSimulator = () => {
  const [metrics, setMetrics] = useState({
    impressions: 50000,
    clicks: 2000,
    signups: 1500,
    activatedUsers: 1200,
    retainedUsers: 800,
    revenue: 8000, // Revenue in dollars
  });

  const [autoSimulating, setAutoSimulating] = useState(false);

  // Function to manually increase metrics
  const increaseMetric = (key, amount) => {
    setMetrics((prev) => ({
      ...prev,
      [key]: prev[key] + amount,
    }));
  };

  // Automated simulation (increments every 5 seconds)
  useEffect(() => {
    let interval;
    if (autoSimulating) {
      interval = setInterval(() => {
        setMetrics((prev) => ({
          ...prev,
          impressions: prev.impressions + 1000,
          clicks: prev.clicks + 200,
          signups: prev.signups + 150,
          activatedUsers: prev.activatedUsers + 120,
          retainedUsers: prev.retainedUsers + 80,
          revenue: prev.revenue + 1000,
        }));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoSimulating]);

  // Chart data
  const data = [
    { name: "Awareness", value: metrics.impressions },
    { name: "Acquisition", value: metrics.clicks },
    { name: "Sign-ups", value: metrics.signups },
    { name: "Activation", value: metrics.activatedUsers },
    { name: "Retention", value: metrics.retainedUsers },
    { name: "Revenue ($)", value: metrics.revenue },
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">AAARR Metrics Simulator</h2>

      {/* Buttons to manually increase metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {Object.keys(metrics).map((key) => (
          <div key={key} className="flex flex-col items-center bg-white p-4 rounded-lg shadow">
            <span className="text-lg font-semibold">{key.replace(/([A-Z])/g, " $1")}</span>
            <span className="text-2xl font-bold">{metrics[key].toLocaleString()}</span>
            <button
              onClick={() => increaseMetric(key, key === "revenue" ? 1000 : 500)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              + Increase {key}
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

      {/* Chart Visualization */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Metrics Visualization</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AAARRSimulator;
