import React from "react";
import { motion } from "framer-motion";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import {
  FaUsers,
  FaCogs,
  FaShieldAlt,
  FaHandshake,
  FaShoppingCart,
} from "react-icons/fa";

/* ---------- Shared Layout Components ---------- */
const FlowPanel = ({ nodes, edges }) => (
  <div className="h-64 w-full border rounded-lg bg-white shadow">
    <ReactFlow nodes={nodes} edges={edges} fitView>
      <Background />
      <Controls />
    </ReactFlow>
  </div>
);

const ModuleSection = ({ title, icon: Icon, children }) => (
  <motion.section
    className="p-6 rounded-2xl shadow bg-white space-y-4"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <div className="flex items-center space-x-3">
      <Icon className="text-blue-600 text-2xl" />
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
    {children}
  </motion.section>
);

/* ---------- ReactFlow Node/Edge Definitions ---------- */
// 1. Collaboration Models
const collabNodes = [
  { id: "1", position: { x: 0, y: 50 }, data: { label: "Shared Problem" }, type: "input" },
  { id: "2", position: { x: 200, y: 50 }, data: { label: "Open Dialogue" } },
  { id: "3", position: { x: 400, y: 50 }, data: { label: "Joint Solutions" } },
  { id: "4", position: { x: 600, y: 50 }, data: { label: "Shared Ownership" }, type: "output" },
];
const collabEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
];

// 2. Engineering Workflows
const workflowNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "Requirements" }, type: "input" },
  { id: "2", position: { x: 150, y: 0 }, data: { label: "Coding" } },
  { id: "3", position: { x: 300, y: 0 }, data: { label: "Code Review" } },
  { id: "4", position: { x: 450, y: 0 }, data: { label: "Testing" } },
  { id: "5", position: { x: 600, y: 0 }, data: { label: "Deployment" }, type: "output" },
];
const workflowEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e4-5", source: "4", target: "5" },
];

// 3. Security & QA
const securityNodes = [
  { id: "1", position: { x: 0, y: 60 }, data: { label: "Requirements" }, type: "input" },
  { id: "2", position: { x: 200, y: 0 }, data: { label: "Security Review" } },
  { id: "3", position: { x: 200, y: 120 }, data: { label: "QA Testing" } },
  { id: "4", position: { x: 400, y: 60 }, data: { label: "Feedback & Launch" }, type: "output" },
];
const securityEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e2-4", source: "2", target: "4" },
  { id: "e3-4", source: "3", target: "4" },
];

// 4. Benefits (Collaboration → Value)
const benefitsNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "Collaboration" }, type: "input" },
  { id: "2", position: { x: 150, y: 0 }, data: { label: "Alignment" } },
  { id: "3", position: { x: 300, y: 0 }, data: { label: "Execution" } },
  { id: "4", position: { x: 450, y: 0 }, data: { label: "Quality" } },
  { id: "5", position: { x: 600, y: 0 }, data: { label: "Customer Value" }, type: "output" },
];
const benefitsEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e4-5", source: "4", target: "5" },
];

/* ---------- Main Component ---------- */
export default function CollaborationModule() {
  return (
    <div className="space-y-6">
      {/* Intro */}
      <ModuleSection title="Why Partnering Matters" icon={FaHandshake}>
        <p>
          Partnering with engineering, QA, and security ensures unity, speed, and trust.
          When PMs collaborate deeply, they align business goals with technical realities,
          leading to better products and faster delivery.
        </p>
      </ModuleSection>

      {/* Collaboration Models */}
      <ModuleSection title="Collaboration Models" icon={FaUsers}>
        <p>
          Collaboration models define how PMs and engineers co-create solutions without
          hierarchy. They help distribute ownership and surface the best ideas early.
        </p>
        <ul className="list-disc pl-5">
          <li><strong>Pair Programming:</strong> PMs and engineers align on details while coding.</li>
          <li><strong>Mob Programming:</strong> The whole team solves a challenge together.</li>
          <li><strong>Workshops:</strong> Cross-functional alignment on risks, priorities, and scope.</li>
          <li><strong>Facilitation:</strong> PMs guide discussions and ensure shared ownership.</li>
        </ul>
        <FlowPanel nodes={collabNodes} edges={collabEdges} />
      </ModuleSection>

      {/* Understanding Engineering Workflows */}
      <ModuleSection title="Understanding Engineering Workflows" icon={FaCogs}>
        <p>
          PMs who understand the engineering lifecycle can set realistic expectations and
          improve planning. From requirements to deployment, each step impacts delivery
          timelines and quality.
        </p>
        <FlowPanel nodes={workflowNodes} edges={workflowEdges} />
      </ModuleSection>

      {/* Security & QA Collaboration */}
      <ModuleSection title="Security & QA Collaboration" icon={FaShieldAlt}>
        <p>
          Security and QA safeguard product reliability and trust. PMs must work with these
          teams to balance speed with robustness.
        </p>
        <ul className="list-disc pl-5">
          <li><strong>Security:</strong> Reviews for compliance, data protection, and resilience.</li>
          <li><strong>QA:</strong> Functional, performance, and usability testing.</li>
        </ul>
        <FlowPanel nodes={securityNodes} edges={securityEdges} />
      </ModuleSection>

      {/* Benefits */}
      <ModuleSection title="How Collaboration Builds Amazing Products" icon={FaUsers}>
        <p>
          Deep collaboration accelerates delivery, reduces risks, and creates trust across
          teams. The outcome is a product that balances quality, speed, and value.
        </p>
        <FlowPanel nodes={benefitsNodes} edges={benefitsEdges} />
      </ModuleSection>

      {/* Amazon Checkout Example */}
      <ModuleSection title="Case Study: Amazon 'Buy Now' Checkout" icon={FaShoppingCart}>
        <p>
          At Amazon, PMs, engineers, QA, and security worked together to deliver the
          “Buy Now” button:
        </p>
        <ul className="list-disc pl-5">
          <li><strong>Workshops:</strong> Clarified scope and edge cases with engineers.</li>
          <li><strong>API Contracts:</strong> Defined clear endpoints with engineering.</li>
          <li><strong>Security:</strong> Ensured OAuth and encryption standards were met.</li>
          <li><strong>QA:</strong> Tested performance under massive traffic.</li>
        </ul>
        <p>
          The result: a fast, secure, reliable checkout that scaled globally and drove sales
          growth.
        </p>
      </ModuleSection>
    </div>
  );
}
