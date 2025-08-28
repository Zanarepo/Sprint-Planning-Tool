import React, { useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

// Simple Collapsible Component
const Collapsible = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded-lg shadow-sm mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 text-left"
      >
        <span className="font-semibold">{title}</span>
        <span>{open ? "−" : "+"}</span>
      </button>
      {open && <div className="p-4 text-sm text-gray-700">{children}</div>}
    </div>
  );
};

export default function DataProtectionModule() {
  const [selectedNode, setSelectedNode] = useState(null);

  // Flow nodes
  const nodes = [
    { id: "client", data: { label: "📱 Clients (Devices)" }, position: { x: 0, y: 50 } },
    { id: "api", data: { label: "🌐 API Gateway" }, position: { x: 250, y: 50 } },
    { id: "lb", data: { label: "⚖️ Load Balancer" }, position: { x: 500, y: 50 } },
    { id: "service", data: { label: "🛠️ Backend Services" }, position: { x: 750, y: 50 } },
    { id: "db", data: { label: "🗄️ Encrypted Database" }, position: { x: 750, y: 200 } },
    { id: "vpn", data: { label: "🔒 TLS / VPN" }, position: { x: 250, y: 200 } },
    { id: "fw", data: { label: "🛡️ Firewall + IDS" }, position: { x: 500, y: 200 } },
  ];

  // Flow edges
  const edges = [
    { id: "1", source: "client", target: "api", animated: true, label: "Request" },
    { id: "2", source: "api", target: "lb", animated: true },
    { id: "3", source: "lb", target: "service", animated: true },
    { id: "4", source: "service", target: "db", animated: true, label: "Data at Rest" },
    { id: "5", source: "api", target: "vpn", animated: true, label: "Encrypted Channel" },
    { id: "6", source: "vpn", target: "fw", animated: true },
    { id: "7", source: "fw", target: "service", animated: true },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <header className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-blue-800">🔐 Data Protection Module</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A full overview of how data flows across systems, how it’s secured (in transit & at rest),
          encryption methods, common threats, and why understanding them is critical for product managers.
        </p>
      </header>

      {/* Flow Diagram */}
      <div className="h-[400px] border rounded-lg">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          onNodeClick={(_, node) => setSelectedNode(node.data.label)}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      {/* RHS Panel (Explanation of clicked node) */}
      {selectedNode && (
        <div className="p-4 border rounded-lg bg-gray-50">
          <h2 className="font-bold text-lg text-indigo-700">{selectedNode}</h2>
          <p className="text-sm text-gray-600 mt-2">
            {selectedNode === "📱 Clients (Devices)" &&
              "Users initiate requests from phones, browsers, or IoT devices. This is the first point of interaction, making authentication and input validation essential."}
            {selectedNode === "🌐 API Gateway" &&
              "The API gateway validates authentication tokens (OAuth2, JWT), applies rate limiting, and ensures requests are routed securely."}
            {selectedNode === "⚖️ Load Balancer" &&
              "Distributes traffic evenly across multiple servers, preventing overload and improving availability."}
            {selectedNode === "🛠️ Backend Services" &&
              "Handles business logic. Each service must sanitize input to prevent SQL injection or data corruption."}
            {selectedNode === "🗄️ Encrypted Database" &&
              "Data is encrypted at rest using AES-256. Example: a password 'mypassword' might be stored as 'U2FsdGVkX1+J2k93ghr6...'. Key access is managed via KMS (Key Management System)."}
            {selectedNode === "🔒 TLS / VPN" &&
              "Secures data in transit. TLS 1.3 ensures messages like 'user=John' become encrypted gibberish (e.g., 'ajx89Qks...'). VPNs add another layer for internal systems."}
            {selectedNode === "🛡️ Firewall + IDS" &&
              "Protects against unauthorized access and monitors malicious traffic such as DDoS attempts, SQL injection, or brute force attacks."}
          </p>
        </div>
      )}

      {/* Collapsible Sections */}
      <Collapsible title="CIA Triad (Core Principles)">
        <ul className="list-disc pl-5 space-y-2">
          <li><b>Confidentiality:</b> Prevents unauthorized access. Techniques: AES encryption, RBAC, OAuth2.0.</li>
          <li><b>Integrity:</b> Ensures data is not altered. Techniques: Hashing (SHA-256), digital signatures, checksums.</li>
          <li><b>Availability:</b> Ensures systems remain accessible. Techniques: load balancing, failover clusters, DDoS protection.</li>
        </ul>
      </Collapsible>

      <Collapsible title="Encryption Explained (with Examples)">
        <p className="mb-2">Encryption scrambles human-readable data into unreadable ciphertext.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <b>AES (Advanced Encryption Standard):</b> A <u>symmetric</u> algorithm using the same key for encryption and decryption. 
            <br /> Example: <code>"Hello123"</code> → <code>"U2FsdGVkX1+3lks9Fj3..."</code>
          </li>
          <li>
            <b>RSA (Rivest–Shamir–Adleman):</b> An <u>asymmetric</u> algorithm using a public key (to encrypt) and private key (to decrypt). Used in TLS handshakes.
          </li>
          <li>
            <b>TLS (Transport Layer Security):</b> Ensures encrypted channels between client & server. Without TLS, passwords would travel as plain text.
          </li>
        </ul>
      </Collapsible>

      <Collapsible title="Types of Data Breaches & Threats">
        <ul className="list-disc pl-5 space-y-2">
          <li><b>Phishing:</b> Tricking users into revealing credentials.</li>
          <li><b>SQL Injection:</b> Attackers manipulate database queries.</li>
          <li><b>DDoS (Distributed Denial of Service):</b> Flooding servers with traffic until they crash. Example: sending millions of requests to Amazon during Black Friday.</li>
          <li><b>Ransomware:</b> Encrypting company data and demanding payment.</li>
          <li><b>Insider Threats:</b> Employees misusing or leaking data.</li>
        </ul>
      </Collapsible>

      <Collapsible title="Data Protection Best Practices">
        <ul className="list-disc pl-5 space-y-2">
          <li>Use strong encryption (AES-256, TLS 1.3).</li>
          <li>Implement Role-Based Access Control (RBAC).</li>
          <li>Apply rate limiting & DDoS protection.</li>
          <li>Run regular penetration tests.</li>
          <li>Use logging & monitoring for anomaly detection.</li>
          <li>Encrypt backups and store them separately.</li>
        </ul>
      </Collapsible>

      <Collapsible title="Why Product Managers Should Understand This">
        <p>
          Product Managers don’t need to configure firewalls, but they <b>must understand security basics</b> because:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>Influences <b>product design decisions</b> (e.g., choosing OAuth2 vs custom auth).</li>
          <li>Impacts <b>user trust</b> (e.g., a breach damages brand reputation).</li>
          <li>Helps with <b>compliance</b> (GDPR, HIPAA, PCI-DSS).</li>
          <li>Enables <b>prioritization</b> of engineering tasks (e.g., encryption over new features).</li>
          <li>Essential for <b>incident response</b> and communicating with stakeholders during security events.</li>
        </ul>
      </Collapsible>
    </div>
  );
}
