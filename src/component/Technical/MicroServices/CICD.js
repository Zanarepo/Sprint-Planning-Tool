import React, { useState, useCallback } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

// Node explanations
const nodeDetails = {
  // CI/CD pipeline
  code: { title: "Code Commit", description: "Developers push code to version control (GitHub/GitLab).\n\n🔴 Manual Pain Points: Lack of traceability.\n✅ CI/CD: Triggers automated pipelines.\n⭐ PM: Tracks PRD features." },
  build: { title: "Build", description: "Code packaged into artifacts (Docker images, binaries).\n\n🔴 Manual Pain Points: Environment drift.\n✅ CI/CD: Reproducible builds.\n⭐ PM: Build matches PRDs." },
  test: { title: "Automated Tests", description: "Unit, integration, security tests run automatically.\n\n🔴 Manual: Slow and error-prone.\n✅ CI/CD: Instant feedback.\n⭐ PM: Validates PRD criteria." },
  artifact: { title: "Artifact Storage", description: "Builds stored in artifact registries.\n\n🔴 Manual: Lost/duplicate builds.\n✅ CI/CD: Central versioning.\n⭐ PM: Traceable delivery artifacts." },
  staging: { title: "Staging", description: "Deploy for QA and demos.\n\n🔴 Manual: Inconsistent setup.\n✅ CI/CD: Production-like staging.\n⭐ PM: Validate workflows." },
  approval: { title: "Approval Gate", description: "PM/QA approve production deployment.\n\n🔴 Manual: Delays, unclear accountability.\n✅ CI/CD: Automated gates.\n⭐ PM: Control feature go-live." },
  production: { title: "Production", description: "Final deployment to users.\n\n🔴 Manual: Downtime, missed steps.\n✅ CI/CD: Reliable deployment with rollback.\n⭐ PM: Features reach users smoothly." },

  // Canary Deployment
  lb: { title: "Load Balancer", description: "Distributes user traffic between the old stable version and the new release." },
  oldVersion: { title: "Old Version", description: "Current stable version serving the majority of users." },
  newVersion: { title: "New Version (Canary)", description: "New release exposed to a small subset of users. Traffic is gradually increased if no errors occur." },
  monitor: { title: "Monitoring & Metrics", description: "Track errors, performance, and KPIs before a full rollout." },
  fullRollout: { title: "Full Rollout", description: "Once stability is confirmed, the new version serves all users." },
  rollback: { title: "Rollback", description: "If issues are detected, traffic is reverted to the old version." },
  canaryConcept: {
    title: "Canary Deployment Concept",
    description: `Canary Deployment is a strategy to release software to a small subset of users first.
✅ Purpose: Reduce risk of impacting all users if new changes fail.
🔹 Flow:
1. Deploy new version alongside old version.
2. Use load balancer to direct a small portion of traffic to new version.
3. Monitor performance and errors.
4. Gradually increase traffic if stable, otherwise rollback.
⭐ PM Value: Minimizes release risk, provides early feedback, ensures safe rollout.`
  },

  // Blue-Green Deployment
  bg_blue: { title: "Blue Environment", description: "Current live version serving all traffic." },
  bg_green: { title: "Green Environment", description: "New version ready to replace Blue without affecting users initially." },
  bg_switch: { title: "Switch Traffic", description: "Redirect all users to Green environment for zero-downtime deployment." },
  bg_monitor: { title: "Monitor & Rollback", description: "Observe metrics post-switch; revert to Blue if errors occur." },
  blueGreenConcept: {
    title: "Blue-Green Deployment Concept",
    description: `Blue-Green Deployment is a strategy to run two identical production environments.
✅ Purpose: Enable zero-downtime deployment and instant rollback.
🔹 Flow:
1. Blue is live; Green is idle with new release.
2. Deploy new release to Green.
3. Switch traffic from Blue to Green when ready.
4. Monitor metrics; rollback instantly to Blue if needed.
⭐ PM Value: Ensures safe release, eliminates downtime, and allows immediate recovery.`
  },
};

// CI/CD Nodes and Edges
const ciNodes = [
  { id: "code", position: { x: 0, y: 50 }, data: { label: "Code Commit" }, style: { background: "#60a5fa", color: "white", padding: 10, borderRadius: 8 } },
  { id: "build", position: { x: 200, y: 50 }, data: { label: "Build" }, style: { background: "#f97316", color: "white", padding: 10, borderRadius: 8 } },
  { id: "test", position: { x: 400, y: 50 }, data: { label: "Automated Tests" }, style: { background: "#22c55e", color: "white", padding: 10, borderRadius: 8 } },
  { id: "artifact", position: { x: 600, y: 50 }, data: { label: "Artifact Storage" }, style: { background: "#8b5cf6", color: "white", padding: 10, borderRadius: 8 } },
  { id: "staging", position: { x: 800, y: 50 }, data: { label: "Staging" }, style: { background: "#eab308", color: "black", padding: 10, borderRadius: 8 } },
  { id: "approval", position: { x: 1000, y: 50 }, data: { label: "Approval Gate" }, style: { background: "#f43f5e", color: "white", padding: 10, borderRadius: 8 } },
  { id: "production", position: { x: 1200, y: 50 }, data: { label: "Production" }, style: { background: "#10b981", color: "white", padding: 10, borderRadius: 8 } },
];

const ciEdges = [
  { id: "e1", source: "code", target: "build", animated: true },
  { id: "e2", source: "build", target: "test", animated: true },
  { id: "e3", source: "test", target: "artifact", animated: true },
  { id: "e4", source: "artifact", target: "staging", animated: true },
  { id: "e5", source: "staging", target: "approval", animated: true },
  { id: "e6", source: "approval", target: "production", animated: true },
];

// Canary Deployment
const canaryNodes = [
  { id: "lb", position: { x: 0, y: 50 }, data: { label: "Load Balancer" }, style: { background: "#f59e0b", color: "white", padding: 10, borderRadius: 8 } },
  { id: "oldVersion", position: { x: 200, y: 0 }, data: { label: "Old Version" }, style: { background: "#60a5fa", color: "white", padding: 10, borderRadius: 8 } },
  { id: "newVersion", position: { x: 200, y: 100 }, data: { label: "New Version (Canary)" }, style: { background: "#22c55e", color: "white", padding: 10, borderRadius: 8 } },
  { id: "monitor", position: { x: 400, y: 50 }, data: { label: "Monitoring & Metrics" }, style: { background: "#8b5cf6", color: "white", padding: 10, borderRadius: 8 } },
  { id: "fullRollout", position: { x: 600, y: 50 }, data: { label: "Full Rollout" }, style: { background: "#10b981", color: "white", padding: 10, borderRadius: 8 } },
  { id: "rollback", position: { x: 600, y: 150 }, data: { label: "Rollback" }, style: { background: "#f43f5e", color: "white", padding: 10, borderRadius: 8 } },
  { id: "canaryConcept", position: { x: 300, y: -120 }, data: { label: "Canary Concept" }, style: { background: "#fbbf24", color: "black", padding: 10, borderRadius: 8 } },
];

const canaryEdges = [
  { id: "c1", source: "lb", target: "oldVersion", animated: true },
  { id: "c2", source: "lb", target: "newVersion", animated: true },
  { id: "c3", source: "oldVersion", target: "monitor", animated: true },
  { id: "c4", source: "newVersion", target: "monitor", animated: true },
  { id: "c5", source: "monitor", target: "fullRollout", animated: true, label: "No errors" },
  { id: "c6", source: "monitor", target: "rollback", animated: true, label: "Errors detected" },
  { id: "c7", source: "canaryConcept", target: "lb", animated: false, style: { strokeWidth: 1, stroke: '#999' } },
];

// Blue-Green Deployment
const bgNodes = [
  { id: "bg_blue", position: { x: 0, y: 50 }, data: { label: "Blue Environment" }, style: { background: "#60a5fa", color: "white", padding: 10, borderRadius: 8 } },
  { id: "bg_green", position: { x: 200, y: 50 }, data: { label: "Green Environment" }, style: { background: "#22c55e", color: "white", padding: 10, borderRadius: 8 } },
  { id: "bg_switch", position: { x: 400, y: 50 }, data: { label: "Switch Traffic" }, style: { background: "#f59e0b", color: "white", padding: 10, borderRadius: 8 } },
  { id: "bg_monitor", position: { x: 600, y: 50 }, data: { label: "Monitor & Rollback" }, style: { background: "#8b5cf6", color: "white", padding: 10, borderRadius: 8 } },
  { id: "blueGreenConcept", position: { x: 300, y: -120 }, data: { label: "Blue-Green Concept" }, style: { background: "#fbbf24", color: "black", padding: 10, borderRadius: 8 } },
];

const bgEdges = [
  { id: "b1", source: "bg_blue", target: "bg_switch", animated: true },
  { id: "b2", source: "bg_green", target: "bg_switch", animated: true },
  { id: "b3", source: "bg_switch", target: "bg_monitor", animated: true },
  { id: "b4", source: "blueGreenConcept", target: "bg_blue", animated: false, style: { strokeWidth: 1, stroke: '#999' } },
];

// Single Flow Component
const FlowSection = ({ title, nodes, edges, onNodeClick, height }) => (
  <div className="mb-12">
    <h1 className="text-2xl font-bold text-center mb-2">{title}</h1>
    <p className="text-center mb-4 max-w-3xl mx-auto">
      {title === "Canary Deployment" ? "Canary Deployment gradually rolls out a new release to a subset of users to reduce risk." : ""}
      {title === "Blue-Green Deployment" ? "Blue-Green Deployment runs two identical environments to enable zero-downtime releases and instant rollback." : ""}
    </p>
    <div className="border rounded-lg relative" style={{ height }}>
      <ReactFlow nodes={nodes} edges={edges} onNodeClick={onNodeClick} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  </div>
);

export default function CICDFlow() {
  const [selectedNode, setSelectedNode] = useState(null);
  const onNodeClick = useCallback((_, node) => setSelectedNode(nodeDetails[node.id]), []);

  return (
    <div className="w-full h-screen p-4 overflow-auto">
      <FlowSection title="CI/CD Pipeline" nodes={ciNodes} edges={ciEdges} onNodeClick={onNodeClick} height="600px" />
      <FlowSection title="Canary Deployment" nodes={canaryNodes} edges={canaryEdges} onNodeClick={onNodeClick} height="550px" />
      <FlowSection title="Blue-Green Deployment" nodes={bgNodes} edges={bgEdges} onNodeClick={onNodeClick} height="550px" />

      {selectedNode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 overflow-y-auto max-h-[80vh]">
            <h2 className="text-xl font-bold mb-2">{selectedNode.title}</h2>
            <p className="whitespace-pre-line mb-4">{selectedNode.description}</p>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={() => setSelectedNode(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
