import React, { useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { FiDollarSign } from "react-icons/fi";

// Role-specific workflows
const roleWorkflows = {
  "Product Manager": {
    nodes: [
      { id: "pm1", data: { label: "Ideation & Vision Definition" }, position: { x: 0, y: 0 }, icon: <FiDollarSign /> },
      { id: "pm2", data: { label: "Market Research & User Needs" }, position: { x: 250, y: 0 } },
      { id: "pm3", data: { label: "PRD Creation" }, position: { x: 500, y: 0 } },
      { id: "pm4", data: { label: "Prioritization & Roadmap" }, position: { x: 750, y: 0 } },
      { id: "pm5", data: { label: "Development Oversight" }, position: { x: 1000, y: 0 } },
      { id: "pm6", data: { label: "Launch Planning" }, position: { x: 1250, y: 0 } },
      { id: "pm7", data: { label: "Post-Launch Iteration" }, position: { x: 1500, y: 0 } },
    ],
    edges: [
      { id: "pme1-2", source: "pm1", target: "pm2", animated: true },
      { id: "pme2-3", source: "pm2", target: "pm3", animated: true },
      { id: "pme3-4", source: "pm3", target: "pm4", animated: true },
      { id: "pme4-5", source: "pm4", target: "pm5", animated: true },
      { id: "pme5-6", source: "pm5", target: "pm6", animated: true },
      { id: "pme6-7", source: "pm6", target: "pm7", animated: true },
      { id: "pme7-1", source: "pm7", target: "pm1", animated: true, label: "Iteration Loop" },
    ],
    stepsInfo: {
      "Ideation & Vision Definition": {
        description: "PM defines the product vision, identifies business goals, and aligns with company strategy for the budget app.",
        artifacts: ["Vision Document", "Business Case"],
        examples: (
          <div className="mt-2">
            <b>Example Vision:</b>
            <p>"Empower users to manage finances seamlessly with real-time budgeting insights."</p>
          </div>
        ),
      },
      "Market Research & User Needs": {
        description: "Conduct user interviews, surveys, and competitor analysis to understand needs like expense tracking and goal setting.",
        artifacts: ["User Personas", "Competitor Analysis Report"],
        examples: (
          <div className="mt-2">
            <b>User Persona Example:</b>
            <p> "Sarah, 28, millennial freelancer struggling with irregular income."</p>
          </div>
        ),
      },
      "PRD Creation": {
        description: "Draft Product Requirements Document (PRD) outlining features, metrics, and scope.",
        artifacts: ["PRD"],
        examples: (
          <div className="mt-2">
            <b>PRD Snippet:</b>
            <pre className="bg-gray-100 p-2 rounded text-sm">
{`Feature: Expense Tracking
Metrics: 95% accuracy in categorization`}
            </pre>
          </div>
        ),
      },
      "Prioritization & Roadmap": {
        description: "Prioritize features using RICE or MoSCoW, create roadmap with timelines and budget.",
        artifacts: ["Roadmap", "Prioritization Matrix"],
        examples: (
          <div className="mt-2">
            <b>Roadmap Example:</b>
            <p> "Q1: MVP with basic tracking; Q2: Advanced analytics."</p>
          </div>
        ),
      },
      "Development Oversight": {
        description: "Oversee sprints, facilitate cross-team communication, manage risks and changes.",
        artifacts: ["Sprint Reports", "Risk Log"],
        examples: (
          <div className="mt-2">
            <b>Risk Log Example:</b>
            <p> "Risk: Budget overrun; Mitigation: Weekly reviews."</p>
          </div>
        ),
      },
      "Launch Planning": {
        description: "Plan beta testing, marketing, and rollout strategy.",
        artifacts: ["Launch Plan", "Marketing Brief"],
        examples: (
          <div className="mt-2">
            <b>Launch Plan:</b>
            <p> "Soft launch to 1,000 users, full rollout in 2 weeks."</p>
          </div>
        ),
      },
      "Post-Launch Iteration": {
        description: "Analyze metrics, gather feedback, plan updates and iterations.",
        artifacts: ["Post-Launch Review", "Feature Backlog"],
        examples: (
          <div className="mt-2">
            <b>Feedback Example:</b>
            <p> "Users request currency conversion; Prioritize for v1.1."</p>
          </div>
        ),
      },
    },
  },
  "Business Analyst": {
    nodes: [
      { id: "ba1", data: { label: "Requirements Elicitation" }, position: { x: 0, y: 0 } },
      { id: "ba2", data: { label: "Analysis & Modeling" }, position: { x: 250, y: 0 } },
      { id: "ba3", data: { label: "Documentation" }, position: { x: 500, y: 0 } },
      { id: "ba4", data: { label: "Validation & Verification" }, position: { x: 750, y: 0 } },
      { id: "ba5", data: { label: "Support Development" }, position: { x: 1000, y: 0 } },
      { id: "ba6", data: { label: "Iteration Support" }, position: { x: 1250, y: 0 } },
    ],
    edges: [
      { id: "bae1-2", source: "ba1", target: "ba2", animated: true },
      { id: "bae2-3", source: "ba2", target: "ba3", animated: true },
      { id: "bae3-4", source: "ba3", target: "ba4", animated: true },
      { id: "bae4-5", source: "ba4", target: "ba5", animated: true },
      { id: "bae5-6", source: "ba5", target: "ba6", animated: true },
      { id: "bae6-1", source: "ba6", target: "ba1", animated: true, label: "Iteration Loop" },
    ],
    stepsInfo: {
      "Requirements Elicitation": {
        description: "Gather requirements from stakeholders through interviews and workshops for features like expense categorization.",
        artifacts: ["Requirements List"],
        examples: (
          <div className="mt-2">
            <b>Example:</b>
            <p>"Stakeholder interview: Need multi-currency support."</p>
          </div>
        ),
      },
      "Analysis & Modeling": {
        description: "Analyze requirements, model data flows and processes.",
        artifacts: ["Use Case Diagrams", "Data Models"],
        examples: (
          <div className="mt-2">
            <b>Use Case Example:</b>
            <p>"Actor: User; Use Case: Set Monthly Budget."</p>
          </div>
        ),
      },
      "Documentation": {
        description: "Document requirements in SRS or user stories.",
        artifacts: ["SRS", "User Stories"],
        examples: (
          <div className="mt-2">
            <b>User Story:</b>
            <p>"As a user, I want to track expenses so I can stay within budget."</p>
          </div>
        ),
      },
      "Validation & Verification": {
        description: "Validate requirements with stakeholders, verify feasibility.",
        artifacts: ["Validation Report"],
        examples: (
          <div className="mt-2">
            <b>Report Example:</b>
            <p>"All requirements approved by finance team."</p>
          </div>
        ),
      },
      "Support Development": {
        description: "Assist dev team with clarifications during implementation.",
        artifacts: ["Meeting Notes"],
        examples: (
          <div className="mt-2">
            <b>Note Example:</b>
            <p>"Clarified budget rollover logic."</p>
          </div>
        ),
      },
      "Iteration Support": {
        description: "Gather feedback for requirement updates in iterations.",
        artifacts: ["Updated SRS"],
        examples: (
          <div className="mt-2">
            <b>Update Example:</b>
            <p>"Added AI spending insights based on feedback."</p>
          </div>
        ),
      },
    },
  },
  "Designer": {
    nodes: [
      { id: "des1", data: { label: "User Research" }, position: { x: 0, y: 0 } },
      { id: "des2", data: { label: "Wireframing" }, position: { x: 250, y: 0 } },
      { id: "des3", data: { label: "Prototyping" }, position: { x: 500, y: 0 } },
      { id: "des4", data: { label: "UI Design" }, position: { x: 750, y: 0 } },
      { id: "des5", data: { label: "Usability Testing" }, position: { x: 1000, y: 0 } },
      { id: "des6", data: { label: "Iteration" }, position: { x: 1250, y: 0 } },
    ],
    edges: [
      { id: "dese1-2", source: "des1", target: "des2", animated: true },
      { id: "dese2-3", source: "des2", target: "des3", animated: true },
      { id: "dese3-4", source: "des3", target: "des4", animated: true },
      { id: "dese4-5", source: "des4", target: "des5", animated: true },
      { id: "dese5-6", source: "des5", target: "des6", animated: true },
      { id: "dese6-1", source: "des6", target: "des1", animated: true, label: "Iteration Loop" },
    ],
    stepsInfo: {
      "User Research": {
        description: "Conduct interviews and surveys to understand user pain points in budgeting.",
        artifacts: ["User Personas", "Journey Maps"],
        examples: (
          <div className="mt-2">
            <b>Journey Map Example:</b>
            <p>"User frustration with manual entry; prefer auto-categorization."</p>
          </div>
        ),
      },
      "Wireframing": {
        description: "Create low-fidelity wireframes for app screens like dashboard and expense add.",
        artifacts: ["Wireframes"],
        examples: (
          <div className="mt-2">
            <b>Wireframe Example:</b>
            <p>"Dashboard: Pie chart for categories, list of recent expenses."</p>
          </div>
        ),
      },
      "Prototyping": {
        description: "Build interactive prototypes for user flow testing.",
        artifacts: ["Prototypes"],
        examples: (
          <div className="mt-2">
            <b>Prototype Tool:</b>
            <p>"Figma prototype with clickable budget setup flow."</p>
          </div>
        ),
      },
      "UI Design": {
        description: "Design high-fidelity UI with colors, typography, icons.",
        artifacts: ["UI Designs", "Design System"],
        examples: (
          <div className="mt-2">
            <b>UI Example:</b>
            <p>"Green for savings, red for overspending alerts."</p>
          </div>
        ),
      },
      "Usability Testing": {
        description: "Test designs with users for ease of use.",
        artifacts: ["Test Reports"],
        examples: (
          <div className="mt-2">
            <b>Report Example:</b>
            <p>"90% users found expense add intuitive."</p>
          </div>
        ),
      },
      "Iteration": {
        description: "Refine designs based on feedback.",
        artifacts: ["Updated Designs"],
        examples: (
          <div className="mt-2">
            <b>Update Example:</b>
            <p>"Simplified navigation based on test results."</p>
          </div>
        ),
      },
    },
  },
  "Technical Lead/Architect": {
    nodes: [
      { id: "tl1", data: { label: "Architecture Design" }, position: { x: 0, y: 0 } },
      { id: "tl2", data: { label: "Tech Stack Selection" }, position: { x: 250, y: 0 } },
      { id: "tl3", data: { label: "Design Reviews" }, position: { x: 500, y: 0 } },
      { id: "tl4", data: { label: "Integration Planning" }, position: { x: 750, y: 0 } },
      { id: "tl5", data: { label: "Deployment Strategy" }, position: { x: 1000, y: 0 } },
      { id: "tl6", data: { label: "Iteration Support" }, position: { x: 1250, y: 0 } },
    ],
    edges: [
      { id: "tle1-2", source: "tl1", target: "tl2", animated: true },
      { id: "tle2-3", source: "tl2", target: "tl3", animated: true },
      { id: "tle3-4", source: "tl3", target: "tl4", animated: true },
      { id: "tle4-5", source: "tl4", target: "tl5", animated: true },
      { id: "tle5-6", source: "tl5", target: "tl6", animated: true },
      { id: "tle6-1", source: "tl6", target: "tl1", animated: true, label: "Iteration Loop" },
    ],
    stepsInfo: {
      "Architecture Design": {
        description: "Design high-level architecture: frontend (React), backend (Node.js), database (PostgreSQL).",
        artifacts: ["Architecture Diagram"],
        examples: (
          <div className="mt-2">
            <b>Diagram Example:</b>
            <pre className="bg-gray-100 p-2 rounded text-sm">
{`React App -> API Gateway -> Microservices -> Database`}
            </pre>
          </div>
        ),
      },
      "Tech Stack Selection": {
        description: "Select technologies considering scalability and security for financial data.",
        artifacts: ["Tech Stack Document"],
        examples: (
          <div className="mt-2">
            <b>Stack Example:</b>
            <p>"Frontend: React; Backend: Express; DB: MongoDB."</p>
          </div>
        ),
      },
      "Design Reviews": {
        description: "Review designs with team for feasibility.",
        artifacts: ["Review Notes"],
        examples: (
          <div className="mt-2">
            <b>Note Example:</b>
            <p>"Approve secure API endpoints."</p>
          </div>
        ),
      },
      "Integration Planning": {
        description: "Plan integrations like payment gateways or banks.",
        artifacts: ["Integration Plan"],
        examples: (
          <div className="mt-2">
            <b>Plan Example:</b>
            <p>"Integrate with Plaid for bank linking."</p>
          </div>
        ),
      },
      "Deployment Strategy": {
        description: "Plan CI/CD, cloud deployment (AWS/Azure).",
        artifacts: ["Deployment Guide"],
        examples: (
          <div className="mt-2">
            <b>Guide Example:</b>
            <p>"Use Docker for containerization."</p>
          </div>
        ),
      },
      "Iteration Support": {
        description: "Update architecture based on feedback.",
        artifacts: ["Updated Diagram"],
        examples: (
          <div className="mt-2">
            <b>Update Example:</b>
            <p>"Add caching layer for performance."</p>
          </div>
        ),
      },
    },
  },
  "Developer Team": {
    nodes: [
      { id: "dev1", data: { label: "Setup Environment" }, position: { x: 0, y: 0 } },
      { id: "dev2", data: { label: "Coding" }, position: { x: 250, y: 0 } },
      { id: "dev3", data: { label: "Unit Testing" }, position: { x: 500, y: 0 } },
      { id: "dev4", data: { label: "Code Review" }, position: { x: 750, y: 0 } },
      { id: "dev5", data: { label: "Integration" }, position: { x: 1000, y: 0 } },
      { id: "dev6", data: { label: "Deployment" }, position: { x: 1250, y: 0 } },
      { id: "dev7", data: { label: "Iteration Fixes" }, position: { x: 1500, y: 0 } },
    ],
    edges: [
      { id: "deve1-2", source: "dev1", target: "dev2", animated: true },
      { id: "deve2-3", source: "dev2", target: "dev3", animated: true },
      { id: "deve3-4", source: "dev3", target: "dev4", animated: true },
      { id: "deve4-5", source: "dev4", target: "dev5", animated: true },
      { id: "deve5-6", source: "dev5", target: "dev6", animated: true },
      { id: "deve6-7", source: "dev6", target: "dev7", animated: true },
      { id: "deve7-2", source: "dev7", target: "dev2", animated: true, label: "Iteration Loop" },
    ],
    stepsInfo: {
      "Setup Environment": {
        description: "Set up dev environment with tools like VS Code, Git.",
        artifacts: ["Repo Setup"],
        examples: (
          <div className="mt-2">
            <b>Setup Example:</b>
            <p>"npm init; git init."</p>
          </div>
        ),
      },
      "Coding": {
        description: "Implement features like expense addition and budget calculation.",
        artifacts: ["Source Code"],
        examples: (
          <div className="mt-2">
            <b>Code Example:</b>
            <pre className="bg-gray-100 p-2 rounded text-sm">
{`function addExpense(amount, category) {
  // logic
}`}
            </pre>
          </div>
        ),
      },
      "Unit Testing": {
        description: "Write unit tests for functions.",
        artifacts: ["Test Scripts"],
        examples: (
          <div className="mt-2">
            <b>Test Example:</b>
            <p>"Jest test for budget calculation."</p>
          </div>
        ),
      },
      "Code Review": {
        description: "Review code in pull requests.",
        artifacts: ["PR Comments"],
        examples: (
          <div className="mt-2">
            <b>Comment Example:</b>
            <p>"Optimize query for performance."</p>
          </div>
        ),
      },
      "Integration": {
        description: "Integrate frontend and backend.",
        artifacts: ["Integrated Build"],
        examples: (
          <div className="mt-2">
            <b>Integration Example:</b>
            <p>"API call from React to Node.js."</p>
          </div>
        ),
      },
      "Deployment": {
        description: "Deploy to staging/production.",
        artifacts: ["Deployment Logs"],
        examples: (
          <div className="mt-2">
            <b>Log Example:</b>
            <p>"Deployed to Heroku."</p>
          </div>
        ),
      },
      "Iteration Fixes": {
        description: "Fix bugs and add features based on feedback.",
        artifacts: ["Bug Fixes"],
        examples: (
          <div className="mt-2">
            <b>Fix Example:</b>
            <p>"Resolved overflow in budget display."</p>
          </div>
        ),
      },
    },
  },
  "QA": {
    nodes: [
      { id: "qa1", data: { label: "Test Planning" }, position: { x: 0, y: 0 } },
      { id: "qa2", data: { label: "Test Case Design" }, position: { x: 250, y: 0 } },
      { id: "qa3", data: { label: "Execution" }, position: { x: 500, y: 0 } },
      { id: "qa4", data: { label: "Defect Reporting" }, position: { x: 750, y: 0 } },
      { id: "qa5", data: { label: "Regression Testing" }, position: { x: 1000, y: 0 } },
      { id: "qa6", data: { label: "Iteration Testing" }, position: { x: 1250, y: 0 } },
    ],
    edges: [
      { id: "qae1-2", source: "qa1", target: "qa2", animated: true },
      { id: "qae2-3", source: "qa2", target: "qa3", animated: true },
      { id: "qae3-4", source: "qa3", target: "qa4", animated: true },
      { id: "qae4-5", source: "qa4", target: "qa5", animated: true },
      { id: "qae5-6", source: "qa5", target: "qa6", animated: true },
      { id: "qae6-3", source: "qa6", target: "qa3", animated: true, label: "Iteration Loop" },
    ],
    stepsInfo: {
      "Test Planning": {
        description: "Plan test strategy, scope, and resources.",
        artifacts: ["Test Plan"],
        examples: (
          <div className="mt-2">
            <b>Plan Example:</b>
            <p>"Test on Android/iOS, focus on security."</p>
          </div>
        ),
      },
      "Test Case Design": {
        description: "Create test cases for features like expense add.",
        artifacts: ["Test Cases"],
        examples: (
          <div className="mt-2">
            <b>Case Example:</b>
            <p>"Input negative amount; Expect error."</p>
          </div>
        ),
      },
      "Execution": {
        description: "Run tests on builds.",
        artifacts: ["Test Logs"],
        examples: (
          <div className="mt-2">
            <b>Log Example:</b>
            <p>"Passed: Budget calculation accurate."</p>
          </div>
        ),
      },
      "Defect Reporting": {
        description: "Report bugs with steps to reproduce.",
        artifacts: ["Bug Reports"],
        examples: (
          <div className="mt-2">
            <b>Report Example:</b>
            <p>"Jira ticket: Overflow in large expenses."</p>
          </div>
        ),
      },
      "Regression Testing": {
        description: "Retest after fixes.",
        artifacts: ["Regression Results"],
        examples: (
          <div className="mt-2">
            <b>Result Example:</b>
            <p>"All previous tests pass."</p>
          </div>
        ),
      },
      "Iteration Testing": {
        description: "Test new features in iterations.",
        artifacts: ["Iteration Test Report"],
        examples: (
          <div className="mt-2">
            <b>Report Example:</b>
            <p>"New AI feature tested for accuracy."</p>
          </div>
        ),
      },
    },
  },
  "DevOps": {
    nodes: [
      { id: "do1", data: { label: "CI/CD Setup" }, position: { x: 0, y: 0 } },
      { id: "do2", data: { label: "Environment Provisioning" }, position: { x: 250, y: 0 } },
      { id: "do3", data: { label: "Deployment" }, position: { x: 500, y: 0 } },
      { id: "do4", data: { label: "Monitoring" }, position: { x: 750, y: 0 } },
      { id: "do5", data: { label: "Scaling" }, position: { x: 1000, y: 0 } },
      { id: "do6", data: { label: "Iteration Deployment" }, position: { x: 1250, y: 0 } },
    ],
    edges: [
      { id: "doe1-2", source: "do1", target: "do2", animated: true },
      { id: "doe2-3", source: "do2", target: "do3", animated: true },
      { id: "doe3-4", source: "do3", target: "do4", animated: true },
      { id: "doe4-5", source: "do4", target: "do5", animated: true },
      { id: "doe5-6", source: "do5", target: "do6", animated: true },
      { id: "doe6-3", source: "do6", target: "do3", animated: true, label: "Iteration Loop" },
    ],
    stepsInfo: {
      "CI/CD Setup": {
        description: "Set up continuous integration and deployment pipelines.",
        artifacts: ["Pipeline Config"],
        examples: (
          <div className="mt-2">
            <b>Config Example:</b>
            <pre className="bg-gray-100 p-2 rounded text-sm">
{`name: Deploy
on: push
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy
        run: aws deploy`}
            </pre>
          </div>
        ),
      },
      "Environment Provisioning": {
        description: "Provision dev, staging, prod environments.",
        artifacts: ["Infra Code"],
        examples: (
          <div className="mt-2">
            <b>Code Example:</b>
            <p>"Terraform for AWS setup."</p>
          </div>
        ),
      },
      "Deployment": {
        description: "Deploy builds to environments.",
        artifacts: ["Deployment Logs"],
        examples: (
          <div className="mt-2">
            <b>Log Example:</b>
            <p>"App deployed to prod."</p>
          </div>
        ),
      },
      "Monitoring": {
        description: "Set up monitoring for app performance.",
        artifacts: ["Dashboards"],
        examples: (
          <div className="mt-2">
            <b>Dashboard Example:</b>
            <p>"Grafana for metrics."</p>
          </div>
        ),
      },
      "Scaling": {
        description: "Scale infrastructure based on load.",
        artifacts: ["Scaling Rules"],
        examples: (
          <div className="mt-2">
            <b>Rule Example:</b>
            <p>"Auto-scale on CPU {'>'}70%."</p>
          </div>
        ),
      },
      "Iteration Deployment": {
        description: "Deploy updates in iterations.",
        artifacts: ["Release Notes"],
        examples: (
          <div className="mt-2">
            <b>Note Example:</b>
            <p>"v1.1 deployed with new features."</p>
          </div>
        ),
      },
    },
  },
  "Support Team": {
    nodes: [
      { id: "sup1", data: { label: "Feedback Collection" }, position: { x: 0, y: 0 } },
      { id: "sup2", data: { label: "Issue Triage" }, position: { x: 250, y: 0 } },
      { id: "sup3", data: { label: "Bug Reporting" }, position: { x: 500, y: 0 } },
      { id: "sup4", data: { label: "User Assistance" }, position: { x: 750, y: 0 } },
      { id: "sup5", data: { label: "Iteration Input" }, position: { x: 1000, y: 0 } },
    ],
    edges: [
      { id: "supe1-2", source: "sup1", target: "sup2", animated: true },
      { id: "supe2-3", source: "sup2", target: "sup3", animated: true },
      { id: "supe3-4", source: "sup3", target: "sup4", animated: true },
      { id: "supe4-5", source: "sup4", target: "sup5", animated: true },
      { id: "supe5-1", source: "sup5", target: "sup1", animated: true, label: "Iteration Loop" },
    ],
    stepsInfo: {
      "Feedback Collection": {
        description: "Collect user feedback via app ratings, surveys.",
        artifacts: ["Feedback Logs"],
        examples: (
          <div className="mt-2">
            <b>Log Example:</b>
            <p>"User: App crashes on export."</p>
          </div>
        ),
      },
      "Issue Triage": {
        description: "Categorize issues by severity and type.",
        artifacts: ["Triage Report"],
        examples: (
          <div className="mt-2">
            <b>Report Example:</b>
            <p>"High priority: Data loss bug."</p>
          </div>
        ),
      },
      "Bug Reporting": {
        description: "Report bugs to dev team.",
        artifacts: ["Bug Tickets"],
        examples: (
          <div className="mt-2">
            <b>Ticket Example:</b>
            <p>"Jira: EXP-123 - Export failure."</p>
          </div>
        ),
      },
      "User Assistance": {
        description: "Provide support via chat/email.",
        artifacts: ["Support Tickets"],
        examples: (
          <div className="mt-2">
            <b>Ticket Example:</b>
            <p>"Resolved: Guided user on setup."</p>
          </div>
        ),
      },
      "Iteration Input": {
        description: "Provide feedback for product iterations.",
        artifacts: ["Feedback Summary"],
        examples: (
          <div className="mt-2">
            <b>Summary Example:</b>
            <p>"Top request: Dark mode."</p>
          </div>
        ),
      },
    },
  },
};

// Main Component
export default function BudgetAppWorkflow() {
  const [selectedRole, setSelectedRole] = useState("Product Manager");
  const [selectedStep, setSelectedStep] = useState(null);

  const { nodes, edges } = roleWorkflows[selectedRole];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-indigo-700">Budget App Product Development Workflows</h1>

      {/* Role Selector */}
      <select
        className="p-2 border rounded w-full max-w-xs"
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
      >
        {Object.keys(roleWorkflows).map((role) => (
          <option key={role} value={role}>{role}</option>
        ))}
      </select>

      <div className="flex gap-4 h-[600px]">
        {/* Left: Flow Diagram */}
        <div className="flex-1 border rounded-lg">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            onNodeClick={(_, node) => setSelectedStep(node.data.label)}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>

        {/* Right: Info Panel */}
        <div className="w-[400px] overflow-auto">
          <InfoPanel role={selectedRole} step={selectedStep} />
        </div>
      </div>
    </div>
  );
}

// InfoPanel component
function InfoPanel({ role, step }) {
  if (!step) return <div className="p-4 text-gray-500">Click a node to see details</div>;
  const info = roleWorkflows[role].stepsInfo[step] || {};

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h2 className="text-lg font-bold text-indigo-700">{step}</h2>
      <p className="text-sm text-gray-700 mt-2">{info.description || "No description available."}</p>
      {info.artifacts && (
        <p className="text-sm text-gray-600 mt-1"><b>Artifacts:</b> {info.artifacts.join(", ")}</p>
      )}
      {info.examples}
    </div>
  );
}