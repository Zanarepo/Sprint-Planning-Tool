// src/components/Product/MetricLearningModuleInteractive.jsx
import React, { useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { FaLightbulb, FaChartLine, FaCogs, FaUsers, FaBug } from "react-icons/fa";

// Tabs
const tabs = [
  { key: "context", label: "Context & Objective", icon: <FaLightbulb /> },
  { key: "define", label: "Defining Metrics", icon: <FaChartLine /> },
  { key: "instrument", label: "Instrumenting Platforms", icon: <FaCogs /> },
  { key: "iterate", label: "Iterating with Data", icon: <FaUsers /> },
  { key: "example", label: "Practical Example", icon: <FaBug /> },
];

// Sample Prometheus metrics (stateful for interactivity)
const initialMetrics = {
  bookingRate: 95,
  driverAccuracy: 98,
  mapLatency: 80,
  waitTime: 4,
  locationErrors: 2,
};

// Helper component for interactive metric
const MetricCard = ({ label, value, max, color, onChange }) => (
  <div className="p-2 border rounded bg-white">
    <h5>{label}</h5>
    <progress
      value={value}
      max={max}
      className={`w-full h-4 rounded ${color}`}
      onClick={onChange}
    ></progress>
    <p className="text-sm">{value}/{max}</p>
  </div>
);

export default function MetricLearningModuleInteractive() {
  const [activeTab, setActiveTab] = useState("context");
  const [metrics, setMetrics] = useState(initialMetrics);

  // Function to simulate metric change (for teaching iteration)
  const simulateMetricChange = (key, delta) => {
    setMetrics(prev => ({
      ...prev,
      [key]: Math.max(0, Math.min(100, prev[key] + delta)),
    }));
  };

  // Content per tab including dashboards
  const tabContent = {
    context: (
      <div>
        <h3 className="font-semibold text-lg mb-2">What Are Metrics and Why They Matter</h3>
        <p>Metrics are measurable indicators that tell you if a feature delivers value to users and business goals.</p>
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Business Impact:</strong> Show revenue, bookings, retention.</li>
          <li><strong>User Experience:</strong> Highlight problems like long wait times.</li>
          <li><strong>Decision Making:</strong> Guide PMs on what to prioritize.</li>
        </ul>

        {/* Example dashboard */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          <MetricCard
            label="Booking Rate (%)"
            value={metrics.bookingRate}
            max={100}
            color="bg-blue-200"
            onChange={() => simulateMetricChange("bookingRate", 1)}
          />
          <MetricCard
            label="Driver Accuracy (%)"
            value={metrics.driverAccuracy}
            max={100}
            color="bg-green-200"
            onChange={() => simulateMetricChange("driverAccuracy", -1)}
          />
          <MetricCard
            label="Wait Time (min)"
            value={metrics.waitTime}
            max={10}
            color="bg-yellow-200"
            onChange={() => simulateMetricChange("waitTime", 1)}
          />
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Click bars to simulate metric changes and see how PMs would respond.
        </p>
      </div>
    ),
    define: (
      <div>
        <h3 className="font-semibold text-lg mb-2">Defining Platform Metrics</h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Business Metrics: Booking success, revenue.</li>
          <li>User Metrics: Wait time, map load, errors.</li>
          <li>Technical Metrics: API latency, GPS accuracy.</li>
        </ul>

        {/* Dashboard Flow */}
        <p className="mt-2 font-semibold">Metric Flow:</p>
        <ul className="ml-6 list-decimal space-y-1">
          <li>Define metric target → 95% booking rate</li>
          <li>Identify measurement method → API logs, rider actions</li>
          <li>Link to user experience → faster pickups</li>
        </ul>

        {/* Mini dashboard */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <MetricCard
            label="Map Load Time (s)"
            value={metrics.mapLatency / 20}
            max={10}
            color="bg-purple-200"
            onChange={() => simulateMetricChange("mapLatency", 5)}
          />
          <MetricCard
            label="Location Errors (%)"
            value={metrics.locationErrors}
            max={10}
            color="bg-red-200"
            onChange={() => simulateMetricChange("locationErrors", 1)}
          />
        </div>
      </div>
    ),
    instrument: (
      <div>
        <h3 className="font-semibold text-lg mb-2">Instrumenting Platforms</h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Use Prometheus exporters to log driver location, API calls, clicks.</li>
          <li>Visualize in Grafana with time-series graphs, heatmaps.</li>
          <li>Set alerts: e.g., notify when driver accuracy &lt; 90%.</li>
        </ul>

        {/* Interactive dashboard */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          {["bookingRate", "driverAccuracy", "waitTime"].map(key => (
            <MetricCard
              key={key}
              label={key.replace(/([A-Z])/g, " $1")}
              value={metrics[key]}
              max={key === "waitTime" ? 10 : 100}
              color="bg-blue-200"
              onChange={() => simulateMetricChange(key, 2)}
            />
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-600">Simulate real-time data feed like Prometheus + Grafana.</p>
      </div>
    ),
    iterate: (
      <div>
        <h3 className="font-semibold text-lg mb-2">Iterating with Data</h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Analyze trends → high wait times on mobile.</li>
          <li>Identify problems → GPS errors causing mislocated drivers.</li>
          <li>Prioritize fixes → GPS accuracy before minor UI tweaks.</li>
          <li>Update roadmap → schedule optimization sprint.</li>
          <li>Test changes → confirm wait times drop.</li>
        </ul>

        <p className="mt-2 font-semibold">Iteration Dashboard:</p>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <MetricCard
            label="Wait Time (min)"
            value={metrics.waitTime}
            max={10}
            color="bg-yellow-200"
            onChange={() => simulateMetricChange("waitTime", -1)}
          />
          <MetricCard
            label="Location Errors (%)"
            value={metrics.locationErrors}
            max={10}
            color="bg-red-200"
            onChange={() => simulateMetricChange("locationErrors", -1)}
          />
        </div>
      </div>
    ),
    example: (
      <div>
        <h3 className="font-semibold text-lg mb-2">Practical Example: Driver Availability</h3>
        <p>Metrics define impact, instrument dashboards, iterate to improve:</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Booking success 95%, Location accuracy 98%, Map load ≤2s</li>
          <li>Prometheus + Grafana dashboard shows live data</li>
          <li>Fix GPS, optimize API → wait time drops 4 mins, bookings ↑ $300K/Q4</li>
        </ul>

        <div className="mt-4 grid grid-cols-2 gap-4">
          {Object.entries(metrics).map(([key, value]) => (
            <MetricCard
              key={key}
              label={key.replace(/([A-Z])/g, " $1")}
              value={value}
              max={key.includes("wait") || key.includes("Latency") ? 10 : 100}
              color="bg-blue-200"
              onChange={() => simulateMetricChange(key, 1)}
            />
          ))}
        </div>
      </div>
    ),
  };

  // Workflow diagram
  const nodes = [
    { id: "1", position: { x: 0, y: 50 }, data: { label: "Define Metrics" }, style: { background: "#fef3c7" } },
    { id: "2", position: { x: 250, y: 50 }, data: { label: "Instrument Platform" }, style: { background: "#d1fae5" } },
    { id: "3", position: { x: 500, y: 50 }, data: { label: "Collect Data" }, style: { background: "#e0f2fe" } },
    { id: "4", position: { x: 750, y: 50 }, data: { label: "Analyze Metrics" }, style: { background: "#f3e8ff" } },
    { id: "5", position: { x: 1000, y: 50 }, data: { label: "Iterate & Optimize" }, style: { background: "#fce7f3" } },
  ];

  const edges = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
    { id: "e3-4", source: "3", target: "4" },
    { id: "e4-5", source: "4", target: "5" },
    { id: "e5-1", source: "5", target: "1", animated: true, label: "Feedback Loop" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">📊 Metrics & Iteration Interactive Module</h2>

      {/* Tabs */}
      <div className="flex space-x-4 border-b pb-2">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-t-lg ${
              activeTab === tab.key ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            {tab.icon}<span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white p-4 rounded shadow">{tabContent[activeTab]}</div>

      {/* Workflow Diagram */}
      <div className="h-[400px] border rounded shadow mt-4">
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
