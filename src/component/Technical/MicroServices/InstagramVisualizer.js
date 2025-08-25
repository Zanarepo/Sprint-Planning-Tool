// src/component/Technical/MicroServices/InstagramSystemExplorer.js
import React, { useState, useCallback } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

const nodeDefaults = {
  style: {
    borderRadius: 12,
    padding: 10,
    fontSize: "0.8rem",
    textAlign: "center",
    width: 200,
    color: "white",
  },
};

// ---------- Nodes (Clients + Services + Storage) ----------
const nodes = [
  // Clients
  { id: "mobile", position: { x: 50, y: -50 }, data: { label: "📱 Mobile Client" }, style: { ...nodeDefaults.style, background: "#1e40af" } },
  { id: "web", position: { x: 50, y: 100 }, data: { label: "💻 Web Client" }, style: { ...nodeDefaults.style, background: "#1d4ed8" } },

  // API Gateway & Load Balancer
  { id: "gateway", position: { x: 300, y: 20 }, data: { label: "🛂 API Gateway" }, style: { ...nodeDefaults.style, background: "#0369a1" } },
  { id: "lb", position: { x: 500, y: 20 }, data: { label: "⚖️ Load Balancer" }, style: { ...nodeDefaults.style, background: "#0d9488" } },

  // Services + Data storage
  { id: "users", position: { x: 750, y: -100 }, data: { label: "👤 Users Service\nDB: PostgreSQL" }, style: { ...nodeDefaults.style, background: "#4f46e5" } },
  { id: "photos", position: { x: 750, y: 20 }, data: { label: "📸 Photos Service\nStorage: S3 + CDN\nDB: DynamoDB" }, style: { ...nodeDefaults.style, background: "#db2777" } },
  { id: "feed", position: { x: 750, y: 150 }, data: { label: "📰 Feed Service\nCache: Redis\nDB: NoSQL" }, style: { ...nodeDefaults.style, background: "#16a34a" } },
  { id: "notifications", position: { x: 750, y: 280 }, data: { label: "🔔 Notifications Service\nQueue: Kafka" }, style: { ...nodeDefaults.style, background: "#f59e0b" } },

  // Storage/Cache/Queue
  { id: "s3", position: { x: 1000, y: 20 }, data: { label: "🗄️ S3 + CDN\nPhoto Storage" }, style: { ...nodeDefaults.style, background: "#be123c" } },
  { id: "redis", position: { x: 1000, y: 150 }, data: { label: "⚡ Redis Cache\nFeed Cache" }, style: { ...nodeDefaults.style, background: "#2563eb" } },
  { id: "kafka", position: { x: 1000, y: 280 }, data: { label: "📩 Kafka Queue\nNotifications" }, style: { ...nodeDefaults.style, background: "#b45309" } },
];

// ---------- Base edges ----------
const baseEdges = [
  { id: "mobile-gateway", source: "mobile", target: "gateway" },
  { id: "web-gateway", source: "web", target: "gateway" },
  { id: "gateway-lb", source: "gateway", target: "lb" },
  { id: "lb-photos", source: "lb", target: "photos" },
  { id: "lb-feed", source: "lb", target: "feed" },
  { id: "lb-users", source: "lb", target: "users" },
  { id: "photos-s3", source: "photos", target: "s3" },
  { id: "photos-feed", source: "photos", target: "feed" },
  { id: "feed-redis", source: "feed", target: "redis" },
  { id: "feed-photos", source: "feed", target: "photos" },
  { id: "feed-notifications", source: "feed", target: "notifications" },
  { id: "users-feed", source: "users", target: "feed" },
  { id: "users-notifications", source: "users", target: "notifications" },
  { id: "notifications-kafka", source: "notifications", target: "kafka" },
];

// ---------- Flows ----------
const flows = {
  registerUser: {
    label: "📝 User Registration Flow",
    description: "New user registration: data flows from client → API Gateway → Load Balancer → Users Service → PostgreSQL DB. Notifications can be triggered to Kafka.",
    edges: ["mobile->gateway", "web->gateway", "gateway->lb", "lb->users"],
  },
  uploadPhoto: {
    label: "📸 Upload Photo Flow",
    description: "Photo upload: client → API Gateway → LB → Photos Service → S3 + Feed Service → Redis + Notifications → Kafka",
    edges: ["mobile->gateway","web->gateway","gateway->lb","lb->photos","photos->s3","photos->feed","feed->redis","feed->notifications","notifications->kafka"],
  },
  viewFeed: {
    label: "📰 View Feed Flow",
    description: "Viewing feed: client → API Gateway → LB → Feed Service → Redis (cache) + Photos Service → S3",
    edges: ["mobile->gateway","web->gateway","gateway->lb","lb->feed","feed->redis","feed->photos"],
  },
  followUser: {
    label: "👤 Follow User Flow",
    description: "Follow user: client → API Gateway → LB → Users Service → Feed Service + Notifications → Kafka",
    edges: ["mobile->gateway","web->gateway","gateway->lb","lb->users","users->feed","users->notifications","notifications->kafka"],
  },
};

// ---------- Service flows (click node to highlight) ----------
const serviceFlows = {
  photos: ["photos->s3", "photos->feed"],
  feed: ["feed->redis", "feed->photos", "feed->notifications"],
  users: ["users->feed", "users->notifications"],
  notifications: ["notifications->kafka"],
};

// ---------- Component ----------
const InstagramSystemExplorer = () => {
  const [highlighted, setHighlighted] = useState([]);
  const [currentFlow, setCurrentFlow] = useState(null);

  const handleSelectFlow = (flowName) => {
    setCurrentFlow(flowName);
    setHighlighted(flows[flowName].edges);
  };

  const handleClickService = useCallback((event, node) => {
    if (serviceFlows[node.id]) {
      setCurrentFlow(`Service: ${node.data.label}`);
      setHighlighted(serviceFlows[node.id]);
    }
  }, []);

  // Highlight edges dynamically
  const edges = baseEdges.map((edge) => ({
    ...edge,
    animated: highlighted.includes(`${edge.source}->${edge.target}`),
    style: {
      stroke: highlighted.includes(`${edge.source}->${edge.target}`) ? "#f87171" : "#9ca3af",
      strokeWidth: highlighted.includes(`${edge.source}->${edge.target}`) ? 3 : 1,
    },
  }));

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 p-8">
      {/* Diagram */}
      <div className="flex-1 bg-white rounded-lg shadow-lg h-[500px] sm:h-[600px] relative overflow-auto">
  <div className="p-4">
    <h1 className="text-2xl font-bold text-center text-yellow-800 mb-2">
      Instagram System Visualizer
    </h1>
    <p className="text-gray-600 text-sm text-center mb-4">
      Interactive view of Instagram-like actions showing data flows from clients → services → storage/queues.
    </p>

    {/* Flow Buttons */}
    <div className="flex flex-wrap justify-center gap-3 mb-4">
      {Object.keys(flows).map((flow) => (
        <button
          key={flow}
          onClick={() => handleSelectFlow(flow)}
          className="px-4 py-2 rounded-lg font-semibold text-white shadow hover:opacity-90"
          style={{
            background:
              flow === "registerUser"
                ? "#3b82f6"
                : flow === "uploadPhoto"
                ? "#db2777"
                : flow === "viewFeed"
                ? "#16a34a"
                : "#8b5cf6",
          }}
        >
          {flows[flow].label}
        </button>
      ))}
    </div>
  </div>

  <div className="w-full h-[400px] sm:h-[500px]">
    <ReactFlow
      nodes={nodes}
      edges={edges}
      fitView
      onNodeClick={handleClickService}
      className="bg-gray-50"
      minZoom={0.5}
      maxZoom={1.5}
    >
      <Background gap={16} size={1} />
      <MiniMap
        nodeStrokeColor={(n) => n.style.background}
        nodeColor={(n) => n.style.background}
      />
      <Controls />
    </ReactFlow>
  </div>
</div>
      {/* RHS Explainer */}
      <div className="w-full lg:w-1/3 h-[500px] sm:h-[600px] overflow-y-auto p-4 bg-blue-50 border border-blue-200 rounded-lg shadow">
        {currentFlow ? (
          <>
            <h2 className="text-lg font-bold mb-2">{flows[currentFlow]?.label || currentFlow}</h2>
            <p className="text-gray-700 text-sm">{flows[currentFlow]?.description || "Highlighted connections for the selected service."}</p>
          </>
        ) : (
          <p className="text-gray-600 text-sm">
            Click a flow button or service node to highlight relationships and data flow in this Instagram-like system.
          </p>
        )}
      </div>
    </div>
  );
}

export default InstagramSystemExplorer;
