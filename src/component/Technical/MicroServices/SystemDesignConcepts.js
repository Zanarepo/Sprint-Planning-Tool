// src/component/Technical/MicroServices/SystemDesignFlow.js
import React, { useState, useCallback } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import { FiCpu, FiServer, FiDatabase, FiCloud, FiLayers } from "react-icons/fi";

const nodeDefaults = {
  style: {
    borderRadius: 12,
    padding: 10,
    fontSize: "0.85rem",
    textAlign: "center",
    width: 220,
    color: "white",
  },
};

// ---------- Nodes ----------
const nodes = [
  { id: "load-balancing", position: { x: 50, y: 0 }, data: { label: "⚡ Load Balancing\n(Nginx, HAProxy, ALB/ELB)" }, style: { ...nodeDefaults.style, background: "#0d9488" } },
  { id: "caching", position: { x: 50, y: 150 }, data: { label: "🗄️ Caching\n(Redis, Memcached, CDN)" }, style: { ...nodeDefaults.style, background: "#2563eb" } },
  { id: "db-design", position: { x: 50, y: 300 }, data: { label: "💾 Database Design\nSQL, NoSQL, Sharding, Replication" }, style: { ...nodeDefaults.style, background: "#4f46e5" } },
  { id: "message-queues", position: { x: 50, y: 450 }, data: { label: "📨 Message Queues\n(Kafka, RabbitMQ, SQS)" }, style: { ...nodeDefaults.style, background: "#f59e0b" } },
  { id: "monolith-micro", position: { x: 350, y: 200 }, data: { label: "🖥️ Monolith vs Microservices\nMonolith: Single codebase\nMicroservices: Independent services" }, style: { ...nodeDefaults.style, background: "#db2777" } },
];

// ---------- Edges ----------
const edges = [
  { id: "lb-caching", source: "load-balancing", target: "caching" },
  { id: "caching-db", source: "caching", target: "db-design" },
  { id: "db-mq", source: "db-design", target: "message-queues" },
  { id: "lb-micro", source: "load-balancing", target: "monolith-micro" },
  { id: "mq-micro", source: "message-queues", target: "monolith-micro" },
];

// ---------- Flows ----------
const flows = {
  requestHandling: {
    label: "🌐 Request Handling Flow",
    description: "User requests hit Load Balancer, cached data is checked, databases handle storage, and message queues handle async tasks.",
    edges: ["load-balancing->caching", "caching->db-design", "db-design->message-queues", "load-balancing->monolith-micro", "message-queues->monolith-micro"],
  },
  microserviceArch: {
    label: "⚡ Microservices vs Monolith",
    description: "Demonstrates how traffic is routed in monolith vs microservices architectures.",
    edges: ["load-balancing->monolith-micro", "message-queues->monolith-micro"],
  },
};

const SystemDesignFlow = () => {
  const [highlighted, setHighlighted] = useState([]);
  const [currentFlow, setCurrentFlow] = useState(null);

  const handleSelectFlow = (flowName) => {
    setCurrentFlow(flowName);
    setHighlighted(flows[flowName].edges);
  };

  const dynamicEdges = edges.map((edge) => ({
    ...edge,
    animated: highlighted.includes(`${edge.source}->${edge.target}`),
    style: {
      stroke: highlighted.includes(`${edge.source}->${edge.target}`) ? "#f87171" : "#9ca3af",
      strokeWidth: highlighted.includes(`${edge.source}->${edge.target}`) ? 3 : 1,
    },
  }));

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 p-4">
      {/* Diagram */}
      <div className="flex-1 bg-white rounded-lg shadow-lg h-[500px] sm:h-[600px] p-4">
        <h1 className="text-2xl font-bold text-center text-yellow-800 mb-2">System Design Flow Visualizer</h1>
        <p className="text-gray-600 text-sm text-center mb-4">
          Visual representation of system design concepts: Load Balancing, Caching, Database Design, Message Queues, Monolith vs Microservices.
        </p>

        {/* Flow Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {Object.keys(flows).map((flow) => (
            <button
              key={flow}
              onClick={() => handleSelectFlow(flow)}
              className="px-4 py-2 rounded-lg font-semibold text-white shadow hover:opacity-90"
              style={{ background: flow === "requestHandling" ? "#3b82f6" : "#db2777" }}
            >
              {flows[flow].label}
            </button>
          ))}
        </div>

        <ReactFlow nodes={nodes} edges={dynamicEdges} fitView className="bg-gray-50">
          <Background gap={16} size={1} />
          <MiniMap nodeStrokeColor={(n) => n.style.background} nodeColor={(n) => n.style.background} />
          <Controls />
        </ReactFlow>
      </div>

      {/* RHS Explainer */}
      <div className="w-full lg:w-1/3 h-[500px] sm:h-[600px] overflow-y-auto p-4 bg-blue-50 border border-blue-200 rounded-lg shadow">
        {currentFlow ? (
          <>
            <h2 className="text-lg font-bold mb-2">{flows[currentFlow]?.label}</h2>
            <p className="text-gray-700 text-sm">{flows[currentFlow]?.description}</p>
          </>
        ) : (
          <p className="text-gray-600 text-sm">
            Click a flow button to highlight relationships and data flow across system design concepts.
          </p>
        )}
      </div>
    </div>
  );
};

export default SystemDesignFlow;
