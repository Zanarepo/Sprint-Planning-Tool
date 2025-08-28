// src/components/Technical/WikiArtifacts.jsx
import React, { useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { FaBook, FaCode, FaBug, FaTasks, FaCloud } from "react-icons/fa";
import APIContracts from './APIContracts'
import MetricsIterate from './MetricsIterate'
import PlatformEvangelist from './PlatformEvangelist'
import CloudPlatform from './CloudPlatform'


const artifactTabs = [
  { key: "requirements", label: "Requirements & Design", icon: <FaBook /> },
  { key: "development", label: "Development", icon: <FaCode /> },
  { key: "testing", label: "Testing & Quality", icon: <FaBug /> },
  { key: "management", label: "Project Mgmt", icon: <FaTasks /> },
  { key: "deployment", label: "Deployment & Maintenance", icon: <FaCloud /> },
];

const artifactExamples = {
  requirements: (
    <div>
      <h3 className="font-semibold text-lg mb-2">Examples:</h3>
      <ul className="list-disc ml-6 space-y-2">
        <li>
          <strong>PRD (Product Requirement Doc)</strong> → Problem statement,
          goals, metrics, features.  
          <br />
          <em>Ex: “Checkout Revamp” with success metric = +15% conversion.</em>
        </li>
        <li>
          <strong>Wireframes</strong> → Low-fidelity screens in Figma/Sketch.  
          <em>Ex: Cart → Checkout → Payment → Confirmation flow.</em>
        </li>
        <li>
          <strong>Architecture Diagrams</strong> → System components & data
          flow.
        </li>
      </ul>
    </div>
  ),
  development: (
    <div>
      <h3 className="font-semibold text-lg mb-2">Examples:</h3>
      <ul className="list-disc ml-6 space-y-2">
        <li>
          <strong>Source Code</strong> → GitHub repo (`checkout.js`,
          `paymentService.py`).
        </li>
        <li>
          <strong>API Specs</strong> → OpenAPI/Swagger for request/response
          payloads.
        </li>
        <li>
          <strong>Database Schema</strong> → ERD showing `Users → Orders →
          Payments`.
        </li>
      </ul>
    </div>
  ),
  testing: (
    <div>
      <h3 className="font-semibold text-lg mb-2">Examples:</h3>
      <ul className="list-disc ml-6 space-y-2">
        <li>
          <strong>Test Plans</strong> → Scope, environment, test strategy.
        </li>
        <li>
          <strong>Test Case</strong>:  
          <pre className="bg-gray-100 p-2 rounded">
{`Test Case: Add to Cart
Steps: 
1. Go to product page
2. Click "Add to Cart"
Expected: Item appears in cart with correct price`}
          </pre>
        </li>
        <li>
          <strong>Bug Report</strong> (Jira):  
          <em>“Checkout button not clickable on mobile”</em>
        </li>
      </ul>
    </div>
  ),
  management: (
    <div>
      <h3 className="font-semibold text-lg mb-2">Examples:</h3>
      <ul className="list-disc ml-6 space-y-2">
        <li>
          <strong>Backlog</strong> → Jira/Trello tickets like “Implement API”,
          “Write test cases”.
        </li>
        <li>
          <strong>Burndown Charts</strong> → Progress vs time for a sprint.
        </li>
        <li>
          <strong>Roadmap</strong> → Quarterly feature timeline.
        </li>
      </ul>
    </div>
  ),
  deployment: (
    <div>
      <h3 className="font-semibold text-lg mb-2">Examples:</h3>
      <ul className="list-disc ml-6 space-y-2">
        <li>
          <strong>Release Notes</strong>  
          <pre className="bg-gray-100 p-2 rounded">
{`v2.0 - New Features:
- Added PayPal support
- Improved error handling`}
          </pre>
        </li>
        <li>
          <strong>Build Files</strong> → Docker image, APK, JAR.
        </li>
        <li>
          <strong>Monitoring Dashboards</strong> → Grafana/Datadog (CPU,
          latency).
        </li>
      </ul>
    </div>
  ),
};

const nodes = [
  { id: "1", position: { x: 0, y: 50 }, data: { label: "Requirements & PRD" }, style: { background: "#fef3c7" } },
  { id: "2", position: { x: 250, y: 50 }, data: { label: "Design Docs & Wireframes" }, style: { background: "#fef9c3" } },
  { id: "3", position: { x: 500, y: 50 }, data: { label: "Development: Code & APIs" }, style: { background: "#d1fae5" } },
  { id: "4", position: { x: 750, y: 50 }, data: { label: "Testing: QA & Reports" }, style: { background: "#e0f2fe" } },
  { id: "5", position: { x: 1000, y: 50 }, data: { label: "Project Management" }, style: { background: "#f3e8ff" } },
  { id: "6", position: { x: 1250, y: 50 }, data: { label: "Deployment & Monitoring" }, style: { background: "#fce7f3" } },
];
const edges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e4-5", source: "4", target: "5" },
  { id: "e5-6", source: "5", target: "6" },
  { id: "e6-1", source: "6", target: "1", animated: true, label: "Feedback Loop" },
];

export default function WikiArtifacts() {
  const [activeTab, setActiveTab] = useState("requirements");

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">📘 Software Artifacts Learning Module</h2>

      {/* Tabs */}
      <div className="flex space-x-4 border-b pb-2">
        {artifactTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-t-lg ${
              activeTab === tab.key ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white p-4 rounded shadow">{artifactExamples[activeTab]}</div>

      {/* React Flow lifecycle diagram */}
      <div className="h-[400px] border rounded shadow">
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      {/* Why Artifacts Matter */}
      <div className="bg-yellow-50 p-4 rounded shadow">
        <h3 className="font-semibold text-lg mb-2">✅ Why Artifacts Matter</h3>
        <ul className="list-disc ml-6 space-y-1">
          <li><strong>Traceability</strong> → What was built, why, and how.</li>
          <li><strong>Collaboration</strong> → Keeps PMs, designers, devs, QA aligned.</li>
          <li><strong>Compliance</strong> → Required in finance/healthcare audits.</li>
          <li><strong>Reusability</strong> → Future projects can reuse artifacts.</li>
        </ul>
      </div>

      <APIContracts/>
      <MetricsIterate/>
      <PlatformEvangelist/>
      <CloudPlatform/>
   
    </div>
  );
}
