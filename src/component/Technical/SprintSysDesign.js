import React, { useState, useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

const nodeBase = {
  border: "1px solid #ccc",
  borderRadius: 8,
  padding: 10,
  background: "#ffffff",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

const initialNodes = [
  { id: "1", position: { x: 50, y: 0 }, data: { label: "Frontend (React)" }, style: { ...nodeBase, background: "#cce5ff" } },
  { id: "2", position: { x: 300, y: 0 }, data: { label: "Backend (Node.js / Supabase Functions)" }, style: { ...nodeBase, background: "#d4edda" } },
  { id: "3", position: { x: 600, y: 0 }, data: { label: "Database (PostgreSQL)" }, style: { ...nodeBase, background: "#fff3cd" } },
  { id: "4", position: { x: 300, y: 150 }, data: { label: "Payments (Flutterwave / Paystack)" }, style: { ...nodeBase, background: "#f8d7da" } },
  { id: "5", position: { x: 300, y: 300 }, data: { label: "Notifications (Firebase Cloud Messaging)" }, style: { ...nodeBase, background: "#e2e3e5" } },
  { id: "6", position: { x: 50, y: 150 }, data: { label: "Maps & Location (Mapbox / OSM API)" }, style: { ...nodeBase, background: "#d1ecf1" } },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true, label: "API Calls / WebSocket", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e2-3", source: "2", target: "3", animated: true, label: "DB Query / Mutation", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e2-4", source: "2", target: "4", animated: true, label: "Payment Request", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e2-5", source: "2", target: "5", animated: true, label: "Push Notification Trigger", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e1-6", source: "1", target: "6", animated: true, label: "Map API Calls", markerEnd: { type: MarkerType.ArrowClosed } },
];

const nodeExplanations = {
  "1": `🖥️ The Frontend is built with React (and React Native for mobile). It handles user interfaces, ride booking, live tracking, and interacts with backend APIs.`,
  "2": `⚙️ The Backend (Node.js or Supabase Edge Functions) processes ride requests, matches drivers, manages authentication, handles business logic, and communicates with the database.`,
  "3": `🗄️ The Database (Supabase PostgreSQL) stores persistent data — users, drivers, rides, payments, and system logs. It provides relational integrity and real-time updates.`,
  "4": `💳 Payment Gateway (Flutterwave or Paystack) securely handles transactions between riders and drivers, processes refunds, and manages payment verifications.`,
  "5": `🔔 Firebase Cloud Messaging (FCM) sends real-time notifications such as ride accepted, driver arrived, and payment success.`,
  "6": `📍 Map & Location Services (Mapbox or OpenStreetMap) provide geolocation, route optimization, and real-time tracking between rider and driver.`,
};

export default function SystemDesign() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  const onNodeClick = useCallback((_, node) => {
    setSelectedNode({
      id: node.id,
      title: node.data.label,
      description: nodeExplanations[node.id],
    });
  }, []);

  const closeModal = () => setSelectedNode(null);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#f7f9fb",
        overflow: "hidden",
      }}
    >
      {/* ReactFlow Diagram */}
      <div
        style={{
          width: "100%",
          height: "70vh",
          maxWidth: "1200px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>

      {/* Data Flow Overview - Responsive & Bottom-Aligned */}
      <div
        style={{
          marginTop: "1.5rem",
          width: "100%",
          background: "#f9fafb",
          borderTop: "1px solid #e0e0e0",
          borderRadius: "0 0 10px 10px",
          padding: "1rem",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            color: "#222",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            fontWeight: 600,
            marginBottom: "0.75rem",
            textAlign: "center",
          }}
        >
          🔁 Data Flow Overview
        </h3>

        <ul
          style={{
            listStyleType: "disc",
            paddingLeft: "1.4rem",
            fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
            lineHeight: 1.6,
            color: "#444",
            margin: 0,
            width: "100%",
            maxWidth: "700px",
            textAlign: "left",
          }}
        >
          <li><strong>Frontend → Backend:</strong> Sends API requests for rides, authentication, and payments.</li>
          <li><strong>Backend → Database:</strong> Stores and retrieves ride, driver, and user data via Supabase APIs.</li>
          <li><strong>Backend → Payment Gateway:</strong> Handles secure payment verification and transaction processing.</li>
          <li><strong>Backend → Notifications:</strong> Sends real-time ride updates to riders and drivers.</li>
          <li><strong>Frontend → Maps API:</strong> Fetches live map data, distances, and ETA calculations.</li>
        </ul>
      </div>

      {/* Modal Popup */}
      {selectedNode && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "1rem",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "10px",
              maxWidth: "500px",
              width: "100%",
              boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
              position: "relative",
              textAlign: "center",
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "10px",
                right: "15px",
                background: "transparent",
                border: "none",
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
            >
              ✖
            </button>

            <h2 style={{ color: "#007bff", marginBottom: "1rem" }}>{selectedNode.title}</h2>
            <p style={{ color: "#333", fontSize: "1rem", lineHeight: "1.6" }}>
              {selectedNode.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
