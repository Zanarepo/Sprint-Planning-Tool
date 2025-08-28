// src/components/Product/EvangelizeLearningModule.jsx
import React, { useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { FaLightbulb, FaChalkboardTeacher, FaUsers, FaBullhorn, FaBug } from "react-icons/fa";

const tabs = [
  { key: "context", label: "Context & Objective", icon: <FaLightbulb /> },
  { key: "education", label: "Education Strategies", icon: <FaChalkboardTeacher /> },
  { key: "value", label: "Customer Value Communication", icon: <FaBullhorn /> },
  { key: "feedback", label: "Feedback Loops", icon: <FaUsers /> },
  { key: "example", label: "Practical Example", icon: <FaBug /> },
];

// Sample interactive metrics for adoption tracking
const initialMetrics = {
  adoptionRate: 60,
  supportConfidence: 70,
  customerSatisfaction: 80,
  errorReports: 10,
};

// Interactive Metric Card
const MetricCard = ({ label, value, max, color, onChange }) => (
  <div className="p-2 border rounded bg-white shadow">
    <h5 className="font-medium">{label}</h5>
    <progress
      value={value}
      max={max}
      className={`w-full h-4 rounded ${color}`}
      onClick={onChange}
    ></progress>
    <p className="text-sm text-gray-500">{value}/{max}</p>
  </div>
);

export default function EvangelizeLearningModule() {
  const [activeTab, setActiveTab] = useState("context");
  const [metrics, setMetrics] = useState(initialMetrics);

  const simulateMetricChange = (key, delta) => {
    setMetrics(prev => ({
      ...prev,
      [key]: Math.min(Math.max(0, prev[key] + delta), 100),
    }));
  };

  const tabContent = {
    context: (
      <div>
        <h3 className="font-semibold text-lg mb-2">What is Evangelizing Platform Capabilities?</h3>
        <p>
          Evangelizing is educating internal teams (support, product, configuration) about platform features so they adopt, advocate, and maximize customer value.
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Drive Adoption:</strong> Teams understand and use the feature correctly.</li>
          <li><strong>Boost Confidence:</strong> Teams see tangible customer value.</li>
          <li><strong>Improve Collaboration:</strong> Align goals across functions.</li>
          <li><strong>Enhance Customer Experience:</strong> Support delivers clear, helpful guidance.</li>
        </ul>

        {/* Dashboard: Adoption Progress */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <MetricCard
            label="Adoption Rate (%)"
            value={metrics.adoptionRate}
            max={100}
            color="bg-blue-200"
            onChange={() => simulateMetricChange("adoptionRate", 5)}
          />
          <MetricCard
            label="Support Confidence (%)"
            value={metrics.supportConfidence}
            max={100}
            color="bg-green-200"
            onChange={() => simulateMetricChange("supportConfidence", 5)}
          />
        </div>
      </div>
    ),
    education: (
      <div>
        <h3 className="font-semibold text-lg mb-2">Platform Education Strategies</h3>
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Onboarding Guides:</strong> Step-by-step tutorials for configuration teams (e.g., map API setup).</li>
          <li><strong>Demos:</strong> Live or recorded showcases for product teams (e.g., bookings increase by 10%).</li>
          <li><strong>Workshops:</strong> Interactive sessions for support teams (e.g., handling rider questions).</li>
          <li><strong>Tailoring:</strong> Customize content by audience.</li>
        </ul>

        {/* Interactive Flow */}
        <p className="mt-2 font-semibold">Workflow: Education Flow</p>
        <ul className="ml-6 list-decimal space-y-1">
          <li>Create guide → Run demo → Host workshop → Measure adoption → Gather feedback → Iterate</li>
        </ul>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <MetricCard
            label="Customer Satisfaction (%)"
            value={metrics.customerSatisfaction}
            max={100}
            color="bg-yellow-200"
            onChange={() => simulateMetricChange("customerSatisfaction", 2)}
          />
          <MetricCard
            label="Error Reports (%)"
            value={metrics.errorReports}
            max={100}
            color="bg-red-200"
            onChange={() => simulateMetricChange("errorReports", -1)}
          />
        </div>
      </div>
    ),
    value: (
      <div>
        <h3 className="font-semibold text-lg mb-2">Customer Value Communication</h3>
        <p>Communicate how platform features benefit users and business outcomes.</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>User Benefits: Faster bookings, reduced wait times.</li>
          <li>Business Impact: Increased bookings, revenue growth.</li>
          <li>Simple Language: Avoid jargon; highlight outcomes.</li>
          <li>Storytelling: Show relatable scenarios (e.g., a rider quickly books a ride in 30s).</li>
        </ul>

        {/* Mini Dashboard */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <MetricCard
            label="Bookings Increase (%)"
            value={10}
            max={100}
            color="bg-purple-200"
            onChange={() => simulateMetricChange("adoptionRate", 1)}
          />
          <MetricCard
            label="Revenue Impact ($K)"
            value={200}
            max={500}
            color="bg-blue-200"
            onChange={() => simulateMetricChange("customerSatisfaction", 1)}
          />
        </div>
      </div>
    ),
    feedback: (
      <div>
        <h3 className="font-semibold text-lg mb-2">Feedback Loops</h3>
        <p>
          Collect input from teams to refine the feature and improve adoption.
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Feedback Collection: Surveys, interviews, meetings.</li>
          <li>Analysis: Identify common pain points (e.g., 10% of riders see inaccurate driver locations).</li>
          <li>Actionable Insights: Fix GPS errors, improve documentation.</li>
          <li>Communication: Share updates with teams to close the loop.</li>
        </ul>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <MetricCard
            label="Error Reports (%)"
            value={metrics.errorReports}
            max={100}
            color="bg-red-200"
            onChange={() => simulateMetricChange("errorReports", -2)}
          />
          <MetricCard
            label="Support Confidence (%)"
            value={metrics.supportConfidence}
            max={100}
            color="bg-green-200"
            onChange={() => simulateMetricChange("supportConfidence", 3)}
          />
        </div>
      </div>
    ),
    example: (
      <div>
        <h3 className="font-semibold text-lg mb-2">Practical Example: Driver Availability</h3>
        <p>Steps a PM takes to evangelize the feature:</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Create a guide for configuration teams on API setup.</li>
          <li>Demo for product teams showing 10% increase in bookings.</li>
          <li>Workshop for support teams on explaining driver locations to riders.</li>
          <li>Communicate benefits: “Cut wait times to 5 mins → $200K revenue increase.”</li>
          <li>Collect feedback and iterate → GPS accuracy improves, adoption rises, support queries drop.</li>
        </ul>

        {/* Dashboard */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {Object.entries(metrics).map(([key, value]) => (
            <MetricCard
              key={key}
              label={key.replace(/([A-Z])/g, " $1")}
              value={value}
              max={100}
              color="bg-blue-200"
              onChange={() => simulateMetricChange(key, 2)}
            />
          ))}
        </div>
      </div>
    ),
  };

  // Workflow nodes
  const nodes = [
    { id: "1", position: { x: 0, y: 50 }, data: { label: "Education Guides" }, style: { background: "#fef3c7" } },
    { id: "2", position: { x: 250, y: 50 }, data: { label: "Demos & Workshops" }, style: { background: "#d1fae5" } },
    { id: "3", position: { x: 500, y: 50 }, data: { label: "Communicate Value" }, style: { background: "#e0f2fe" } },
    { id: "4", position: { x: 750, y: 50 }, data: { label: "Collect Feedback" }, style: { background: "#f3e8ff" } },
    { id: "5", position: { x: 1000, y: 50 }, data: { label: "Iterate & Improve" }, style: { background: "#fce7f3" } },
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
      <h2 className="text-2xl font-bold mb-4">📣 Evangelizing Platform Capabilities Module</h2>

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
