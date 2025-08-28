// src/components/Product/TechnicalFoundationsModule.jsx
import React, { useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { FaBolt, FaServer, FaCogs, FaChartLine, FaUsers } from "react-icons/fa";


// Tabs
const tabs = [
  { key: "context", label: "Overview & Objectives", icon: <FaBolt /> },
  { key: "event", label: "Event-Driven Architecture", icon: <FaCogs /> },
  { key: "cicd", label: "CI/CD Pipelines", icon: <FaChartLine /> },
  { key: "cloud", label: "Cloud Scalability", icon: <FaServer /> },
  { key: "example", label: "Practical Example", icon: <FaUsers /> },

];

  tabs.push({ key: "tradeoff", label: "Decision & Trade-offs", icon: <FaBolt /> })


// Sample interactive metrics
const initialMetrics = {
  eventProcessing: 80,
  ciCdSpeed: 60,
  scalabilityConfidence: 50,
  costEfficiency: 40,
};

// Metric Card
const MetricCard = ({ label, value, max, color, onChange }) => (
  <div className="p-2 border rounded bg-white shadow">
    <h5 className="font-medium">{label}</h5>
    <progress
      value={value}
      max={max}
      className={`w-full h-4 rounded ${color}`}
      onClick={onChange}
    />
    <p className="text-sm text-gray-500">{value}/{max}</p>
  </div>
);

export default function TechnicalFoundationsModule() {
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
        <h3 className="font-semibold text-lg mb-2">Technical Foundations Overview</h3>
        <p>
          Build confidence discussing event-driven architectures, CI/CD pipelines, and cloud scalability trade-offs.
          This helps PMs make informed decisions and align technical choices with business goals like reducing rider wait times.
        </p>
        <ul className="list-disc ml-6 space-y-2 mt-2">
          <li>Collaborate effectively with engineers.</li>
          <li>Prioritize technical feasibility and business impact.</li>
          <li>Ensure scalable, reliable features.</li>
        </ul>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <MetricCard
            label="Event Processing Efficiency (%)"
            value={metrics.eventProcessing}
            max={100}
            color="bg-blue-200"
            onChange={() => simulateMetricChange("eventProcessing", 5)}
          />
          <MetricCard
            label="CI/CD Pipeline Speed (%)"
            value={metrics.ciCdSpeed}
            max={100}
            color="bg-green-200"
            onChange={() => simulateMetricChange("ciCdSpeed", 5)}
          />
        </div>
      </div>
    ),
    event: (
      <div>
        <h3 className="font-semibold text-lg mb-2">Event-Driven Architecture</h3>
        <p>
          Event-driven systems process real-time events (e.g., driver location updates) to ensure responsive features.
        </p>
        <ul className="list-disc ml-6 space-y-2 mt-2">
          <li>Events: Actions triggering system reactions (driver moved, rider opened map).</li>
          <li>Message Queues: Ensure events are processed reliably and in order.</li>
          <li>Event Sourcing: Store events to reconstruct state and analyze trends.</li>
          <li>Scalability: Handle thousands of events/sec during peak hours.</li>
          <li>Trade-offs: Speed vs complexity vs cost.</li>
        </ul>

        {/* Event Architecture Flow */}
        <div className="h-[350px] border rounded shadow mt-4">
          <ReactFlow
            nodes={[
              { id: "1", position: { x: 0, y: 50 }, data: { label: "Driver Location Update Event" }, style: { background: "#fef3c7" } },
              { id: "2", position: { x: 250, y: 50 }, data: { label: "Message Queue" }, style: { background: "#d1fae5" } },
              { id: "3", position: { x: 500, y: 50 }, data: { label: "Event Processor / Microservice" }, style: { background: "#e0f2fe" } },
              { id: "4", position: { x: 750, y: 50 }, data: { label: "Update Rider Map" }, style: { background: "#f3e8ff" } },
            ]}
            edges={[
              { id: "e1-2", source: "1", target: "2" },
              { id: "e2-3", source: "2", target: "3" },
              { id: "e3-4", source: "3", target: "4" },
            ]}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    ),
    cicd: (
      <div>
        <h3 className="font-semibold text-lg mb-2">CI/CD Pipelines</h3>
        <p>
          Automate build, test, and deploy cycles to deliver features quickly and reliably.
        </p>
        <ul className="list-disc ml-6 space-y-2 mt-2">
          <li>Continuous Integration: Merge code frequently with automated tests.</li>
          <li>Continuous Deployment: Deploy changes automatically to production.</li>
          <li>Pipeline Stages: Build → Test → Deploy.</li>
          <li>Trade-offs: Speed vs coverage vs reliability.</li>
          <li>Optimization: Reduce pipeline duration without compromising critical checks.</li>
        </ul>

        {/* CI/CD Flow */}
        <div className="h-[350px] border rounded shadow mt-4">
          <ReactFlow
            nodes={[
              { id: "1", position: { x: 0, y: 50 }, data: { label: "Code Commit" }, style: { background: "#fef3c7" } },
              { id: "2", position: { x: 200, y: 50 }, data: { label: "Automated Tests" }, style: { background: "#d1fae5" } },
              { id: "3", position: { x: 400, y: 50 }, data: { label: "Build Stage" }, style: { background: "#e0f2fe" } },
              { id: "4", position: { x: 600, y: 50 }, data: { label: "Deployment" }, style: { background: "#f3e8ff" } },
              { id: "5", position: { x: 800, y: 50 }, data: { label: "Production" }, style: { background: "#fce7f3" } },
            ]}
            edges={[
              { id: "e1-2", source: "1", target: "2" },
              { id: "e2-3", source: "2", target: "3" },
              { id: "e3-4", source: "3", target: "4" },
              { id: "e4-5", source: "4", target: "5" },
            ]}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    ),
    cloud: (
      <div>
        <h3 className="font-semibold text-lg mb-2">Cloud Scalability Trade-offs</h3>
        <p>
          Make decisions on architecture that balance cost, performance, and complexity while handling growth.
        </p>
        <ul className="list-disc ml-6 space-y-2 mt-2">
          <li>Auto-scaling: Dynamic resource allocation during peak demand.</li>
          <li>Serverless: Flexible execution, pay-per-use, possible latency trade-offs.</li>
          <li>Cost vs Performance: Faster deployments or cheaper infrastructure?</li>
          <li>Complexity vs Simplicity: More advanced architectures increase setup time.</li>
        </ul>

        {/* Cloud Trade-off Flow */}
        <div className="h-[350px] border rounded shadow mt-4">
          <ReactFlow
            nodes={[
              { id: "1", position: { x: 0, y: 50 }, data: { label: "Traffic Spike Detected" }, style: { background: "#fef3c7" } },
              { id: "2", position: { x: 250, y: 0 }, data: { label: "Auto-Scaling" }, style: { background: "#d1fae5" } },
              { id: "3", position: { x: 250, y: 100 }, data: { label: "Serverless Function" }, style: { background: "#e0f2fe" } },
              { id: "4", position: { x: 500, y: 50 }, data: { label: "Map Updates Delivered" }, style: { background: "#f3e8ff" } },
            ]}
            edges={[
              { id: "e1-2", source: "1", target: "2" },
              { id: "e1-3", source: "1", target: "3" },
              { id: "e2-4", source: "2", target: "4" },
              { id: "e3-4", source: "3", target: "4" },
            ]}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <MetricCard
            label="Scalability Confidence (%)"
            value={metrics.scalabilityConfidence}
            max={100}
            color="bg-purple-200"
            onChange={() => simulateMetricChange("scalabilityConfidence", 5)}
          />
          <MetricCard
            label="Cost Efficiency (%)"
            value={metrics.costEfficiency}
            max={100}
            color="bg-yellow-200"
            onChange={() => simulateMetricChange("costEfficiency", 5)}
          />
        </div>
      </div>
    ),
    example: (
      <div>
        <h3 className="font-semibold text-lg mb-2">Practical Example: Driver Availability</h3>
        <ul className="list-disc ml-6 space-y-2 mt-2">
          <li>Event-driven: Driver updates trigger queue → map updated &lt;1s.</li>
          <li>CI/CD: Daily automated build and deployment for map updates.</li>
          <li>Cloud trade-offs: Auto-scaling servers handle 10M daily requests at minimal cost.</li>
          <li>Outcome: Wait times reduced to 4 mins, bookings ↑ $300K/Q4, high reliability.</li>
        </ul>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {Object.entries(metrics).map(([key, value]) => (
            <MetricCard
              key={key}
              label={key.replace(/([A-Z])/g, " $1")}
              value={value}
              max={100}
              color="bg-blue-200"
              onChange={() => simulateMetricChange(key, 3)}
            />
          ))}
        </div>
      </div>
    ),
  };
  tabContent.tradeoff = (
  <div>
    <h3 className="font-semibold text-lg mb-2">Decision-Making & Trade-off Guide</h3>
    <p>
      PMs often face decisions with competing priorities: cost vs speed vs reliability. This guide helps evaluate trade-offs, prioritize actions, and make informed decisions.
    </p>

    <h4 className="font-medium mt-4 mb-2">Step 1: Define Decision Criteria</h4>
    <ul className="list-disc ml-6 space-y-2">
      <li>Business Impact: Revenue, adoption, or user satisfaction.</li>
      <li>Technical Feasibility: Complexity, dependencies, and risk.</li>
      <li>Time Sensitivity: Deadlines and seasonal priorities.</li>
      <li>Cost: Engineering resources, cloud costs, operational overhead.</li>
    </ul>

    <h4 className="font-medium mt-4 mb-2">Step 2: Evaluate Options</h4>
    <p>List potential solutions and score them against your criteria. Example options for “Driver Availability” feature:</p>
    <ul className="list-disc ml-6 space-y-2">
      <li>Option A: Auto-scaling servers (Lower cost, more setup time)</li>
      <li>Option B: Serverless functions (Faster deployment, higher cost)</li>
      <li>Option C: Hybrid (Mix of both, medium cost & complexity)</li>
    </ul>

    <h4 className="font-medium mt-4 mb-2">Step 3: Visualize Trade-offs</h4>
    <p>Use an interactive simulation to see the effect of choices on key metrics:</p>

    <div className="grid grid-cols-2 gap-4 mt-2">
      {["Business Impact", "Technical Feasibility", "Cost", "Time Sensitivity"].map((metric, idx) => (
        <div key={idx} className="p-2 border rounded bg-white shadow">
          <h5 className="font-medium">{metric}</h5>
          <input
            type="range"
            min="0"
            max="100"
            value={metrics[metric.replace(/\s/g, "").toLowerCase()] || 50}
            onChange={(e) =>
              setMetrics(prev => ({
                ...prev,
                [metric.replace(/\s/g, "").toLowerCase()]: parseInt(e.target.value),
              }))
            }
            className="w-full mt-2"
          />
          <p className="text-sm text-gray-500">
            {metrics[metric.replace(/\s/g, "").toLowerCase()] || 50}/100
          </p>
        </div>
      ))}
    </div>

    <h4 className="font-medium mt-4 mb-2">Step 4: Make Informed Decision</h4>
    <p>
      After scoring options against criteria, choose the one that balances the highest business impact with acceptable cost, technical feasibility, and time constraints.
    </p>

    {/* Interactive Decision Flow */}
    <div className="h-[350px] border rounded shadow mt-4">
      <ReactFlow
        nodes={[
          { id: "1", position: { x: 0, y: 50 }, data: { label: "Identify Decision Points" }, style: { background: "#fef3c7" } },
          { id: "2", position: { x: 250, y: 0 }, data: { label: "Evaluate Options" }, style: { background: "#d1fae5" } },
          { id: "3", position: { x: 250, y: 100 }, data: { label: "Score Options by Criteria" }, style: { background: "#e0f2fe" } },
          { id: "4", position: { x: 500, y: 50 }, data: { label: "Simulate Trade-offs" }, style: { background: "#f3e8ff" } },
          { id: "5", position: { x: 750, y: 50 }, data: { label: "Choose Optimal Option" }, style: { background: "#fce7f3" } },
        ]}
        edges={[
          { id: "e1-2", source: "1", target: "2" },
          { id: "e1-3", source: "1", target: "3" },
          { id: "e2-4", source: "2", target: "4" },
          { id: "e3-4", source: "3", target: "4" },
          { id: "e4-5", source: "4", target: "5", animated: true, label: "Decision Outcome" },
        ]}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>

    <p className="mt-4 text-gray-600">
      Experiment by adjusting metrics and see how different trade-offs shift the final decision. This helps PMs understand **prioritization, feasibility, and impact** in practice.
    </p>
  </div>
);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">🛠 Technical Foundations for Platform Engineering</h2>

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

    </div>
  );
}
