import React from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

export default function HLDLLDCanvas() {
  const nodes = [
    // HLD
    { id: "client", position: { x: 50, y: 20 }, data: { label: "Client" }, style: { border: "2px solid #2563eb", padding: 6, borderRadius: 8 } },
    { id: "gateway", position: { x: 220, y: 20 }, data: { label: "API Gateway" }, style: { border: "2px solid #9333ea", padding: 6, borderRadius: 8 } },
    { id: "lb", position: { x: 390, y: 20 }, data: { label: "Load Balancer" }, style: { border: "2px solid #eab308", padding: 6, borderRadius: 8 } },
    { id: "service", position: { x: 560, y: 0 }, data: { label: "User Service" }, style: { border: "2px solid #16a34a", padding: 6, borderRadius: 8 } },
    { id: "db", position: { x: 750, y: 20 }, data: { label: "Database" }, style: { border: "2px solid #dc2626", padding: 6, borderRadius: 8 } },

    // LLD
    { id: "schema", position: { x: 250, y: 200 }, data: { label: "DB Schema (users, orders)" }, style: { border: "2px dashed #dc2626", padding: 6, borderRadius: 8 } },
    { id: "class", position: { x: 500, y: 200 }, data: { label: "Class: User {id, name}" }, style: { border: "2px dashed #2563eb", padding: 6, borderRadius: 8 } },
    { id: "api", position: { x: 750, y: 200 }, data: { label: "API: POST /login" }, style: { border: "2px dashed #16a34a", padding: 6, borderRadius: 8 } },
  ];

  const edges = [
    { id: "e1", source: "client", target: "gateway", animated: true },
    { id: "e2", source: "gateway", target: "lb", animated: true },
    { id: "e3", source: "lb", target: "service", animated: true },
    { id: "e4", source: "service", target: "db", animated: true },

    { id: "e5", source: "db", target: "schema", animated: true },
    { id: "e6", source: "service", target: "class", animated: true },
    { id: "e7", source: "gateway", target: "api", animated: true },
  ];

  return (
    <div className="w-full h-[500px] border rounded-xl shadow bg-white">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}
