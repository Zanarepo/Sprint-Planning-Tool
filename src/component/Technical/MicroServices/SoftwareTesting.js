// src/components/TestingGuide/FintechTestingModule.jsx
import React, { useState, useCallback } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import 'reactflow/dist/style.css';

const sections = [
  {
    title: "Software Testing (Fintech App)",
    nodes: [
      {
        id: "unitLogin",
        label: "Unit Test: Login Function",
        type: "success",
        details: {
          tested: "Login function validates email/password",
          outcome: "Pass if correct credentials, fail otherwise",
          edgeCases: "Empty email, invalid email, long password",
          PRD: "PRD 2.1: User must log in using email/password",
          tools: "Jest, React Testing Library",
          sampleData: `{ email: "test@example.com", password: "password123" }`
        }
      },
      {
        id: "integrationPayment",
        label: "Integration Test: Payment Flow",
        type: "failure",
        details: {
          tested: "Payment module interacts with DB & API",
          outcome: "Pass if DB updated, fail if partial success",
          edgeCases: "API succeeds but DB fails",
          PRD: "PRD 3.4: Payment must persist in DB",
          tools: "Jest + Supertest, Cypress",
          sampleData: `{ amount: 100, userId: 12 }`
        }
      },
      {
        id: "e2eSignup",
        label: "E2E Test: Signup & Dashboard",
        type: "success",
        details: {
          tested: "Full flow: signup → verify → login → dashboard",
          outcome: "User lands on dashboard after verification",
          edgeCases: "Duplicate email, network offline",
          PRD: "PRD 2.2: User onboarding flow",
          tools: "Cypress",
          sampleData: `{ email: "newuser@example.com" }`
        }
      },
      {
        id: "uiPerformance",
        label: "UI/UX & Performance Test",
        type: "success",
        details: {
          tested: "Homepage responsiveness & button visibility",
          outcome: "Pass if loads under 2s, buttons clickable",
          edgeCases: "High concurrency, tiny screens",
          PRD: "PRD 2.3: Responsive dashboard",
          tools: "Lighthouse, Cypress, Browser DevTools",
          sampleData: `N/A`
        }
      }
    ]
  },
  {
    title: "Database Testing (Fintech App)",
    nodes: [
      {
        id: "dataIntegrity",
        label: "Data Integrity Test",
        type: "success",
        details: {
          tested: "User info stored correctly",
          outcome: "Pass if data matches input",
          edgeCases: "Special characters, long strings",
          PRD: "PRD 3.2: User profile persistence",
          tools: "Postman, SQL scripts, DB unit tests",
          sampleData: `{ name: "John O'Connor", email: "john@example.com" }`
        }
      },
      {
        id: "dataConsistency",
        label: "Data Consistency Test",
        type: "failure",
        details: {
          tested: "Related tables stay in sync",
          outcome: "Fail if email change not propagated",
          edgeCases: "Concurrent updates",
          PRD: "PRD 3.3: DB table consistency",
          tools: "SQL queries, DB monitoring tools",
          sampleData: `UPDATE users SET email = 'new@example.com' WHERE id=1;`
        }
      },
      {
        id: "dbPerformance",
        label: "Load/Performance Test",
        type: "success",
        details: {
          tested: "DB handles high volume",
          outcome: "Pass for 500+ concurrent logins",
          edgeCases: "Burst of 1000+ queries",
          PRD: "PRD 3.4: DB must scale",
          tools: "JMeter, Locust",
          sampleData: `Simulate 500 concurrent login requests`
        }
      }
    ]
  },
  {
    title: "API Testing (Fintech App)",
    nodes: [
      {
        id: "apiFunctional",
        label: "Functional Test: GET /users/:id",
        type: "success",
        details: {
          tested: "Returns correct user data",
          outcome: "Pass if 200 OK and correct payload",
          edgeCases: "Invalid ID returns 404",
          PRD: "PRD 4.1: API functional correctness",
          tools: "Postman, Jest + Supertest",
          sampleData: `GET /users/12`
        }
      },
      {
        id: "apiIntegration",
        label: "Integration Test: Payment API",
        type: "failure",
        details: {
          tested: "Payment API updates DB correctly",
          outcome: "Fail if API succeeds but DB fails",
          edgeCases: "Partial failures, network issues",
          PRD: "PRD 4.2: Payment processing",
          tools: "Postman, Cypress, Jest",
          sampleData: `POST /payments { userId:12, amount:100 }`
        }
      },
      {
        id: "apiSecurity",
        label: "Security Test: Authorization",
        type: "success",
        details: {
          tested: "Admin-only actions",
          outcome: "Pass if unauthorized access blocked",
          edgeCases: "JWT expired, no token",
          PRD: "PRD 4.5: API security compliance",
          tools: "OWASP ZAP, Postman, Manual pen-test",
          sampleData: `DELETE /users/12`
        }
      }
    ]
  }
];

// Define node colors based on type
const nodeColors = {
  success: "#4ade80",
  failure: "#f87171",
  info: "#60a5fa",
};

const createNodes = (nodes) =>
  nodes.map((node, i) => ({
    id: node.id,
    data: { label: node.label, details: node.details },
    position: { x: 50 + i * 220, y: 50 },
    style: {
      padding: 10,
      borderRadius: 5,
      border: "1px solid #333",
      background: nodeColors[node.type] || "#fff",
      color: "#000",
      cursor: "pointer",
      minWidth: 150,
      textAlign: "center"
    },
  }));

const createEdges = (nodes) =>
  nodes.slice(0, nodes.length - 1).map((node, i) => ({
    id: `${node.id}-${nodes[i + 1].id}`,
    source: node.id,
    target: nodes[i + 1].id,
    animated: true,
    style: { stroke: "#999", strokeWidth: 2 }
  }));

export const FintechTestingModule = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node.data.details);
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: "0 auto" }}>
      <h1 className="text-3xl font-bold mb-6">
        Fintech App: Comprehensive Testing Guide Linked to PRDs
      </h1>

      {/* Explanation of Edge Cases */}
      <div style={{ marginBottom: 40, padding: 15, background: "#f3f4f6", borderRadius: 8 }}>
        <h2 className="text-2xl font-semibold mb-2">What is an Edge Case?</h2>
        <p>
          Edge cases are scenarios that test **boundary conditions or unexpected inputs**. 
          They help ensure the system is robust and handles unusual or extreme situations.
        </p>
        <p>
          <strong>Example:</strong> Logging in with an empty email field or using an expired JWT token.
        </p>
        <p>
          Categories: Input Validation, Concurrent Actions, Network/Server Issues, Security/Permissions.
        </p>
      </div>

      {sections.map((section) => {
        const nodes = createNodes(section.nodes);
        const edges = createEdges(section.nodes);
        return (
          <div key={section.title} style={{ marginBottom: 60 }}>
            <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
            <p className="mb-4">
              Click a node to see what is tested, expected outcome, edge cases,
              PRD linkage, and tools used.
            </p>
            <div style={{ width: "100%", height: 280, border: "1px solid #ccc", borderRadius: 10 }}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodeClick={onNodeClick}
                fitView
                nodesDraggable={false}
                nodesConnectable={false}
                zoomOnScroll
                panOnScroll
              >
                <Background />
                <Controls />
                <MiniMap nodeStrokeColor={(n) => nodeColors[n.type]} nodeColor={(n) => nodeColors[n.type]} />
              </ReactFlow>
            </div>

            {selectedNode && (
              <div style={{
                marginTop: 20,
                padding: 15,
                border: "1px solid #333",
                borderRadius: 8,
                backgroundColor: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
              }}>
                <h3 className="text-xl font-bold mb-2">{selectedNode.tested}</h3>
                <p><strong>Expected Outcome:</strong> {selectedNode.outcome}</p>
                <p><strong>Edge Cases:</strong> {selectedNode.edgeCases}</p>
                <p><strong>PRD Linkage:</strong> {selectedNode.PRD}</p>
                <p><strong>Testing Tools:</strong> {selectedNode.tools}</p>
                <p><strong>Sample Data:</strong> <code>{selectedNode.sampleData}</code></p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FintechTestingModule;
