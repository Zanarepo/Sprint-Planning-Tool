// src/components/TechnicalDebtExplorer.js
import React, { useCallback, useMemo, useState } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";




const baseNodeStyle = {
  borderRadius: 8,
  padding: 8,
  color: "#111827",
  textAlign: "center",
  border: "2px solid rgba(0,0,0,0.08)",
  fontSize: 12,
  width: 170,
};

const scenarios = {
  legacyMonolith: {
    id: "legacyMonolith",
    label: "Legacy Monolith",
    summary:
      "A large, tightly-coupled application with no modular boundaries, limited tests, and outdated dependencies. Slow to change and risky to modify.",
    businessImpact:
      "High lead-time for features, increased bug risk, developer churn. Example: 6-week feature delays costing ~$200k in lost market opportunities.",
    exampleArtifacts: {
      PRD: "PRD: 'Modularize checkout to reduce time-to-market for new payment methods.'",
      ADR: "ADR: 'Choose modular monolith → phased extraction vs. full microservice rewrite.'",
    },
    nodes: [
      { id: "dev", label: "Developers\n(rapid hacks)", pos: { x: 0, y: 0 }, type: "actor" },
      { id: "repo", label: "Monolith Repo\n(no modular boundaries)", pos: { x: 220, y: 0 }, type: "code" },
      { id: "ci", label: "CI (manual / flaky)", pos: { x: 440, y: 0 }, type: "process" },
      { id: "prod", label: "Prod\n(tightly coupled)", pos: { x: 660, y: 0 }, type: "infra" },
      { id: "monitor", label: "Monitoring\n& Logs (limited)", pos: { x: 440, y: 120 }, type: "infra" },
      { id: "stake", label: "Stakeholders\n(Product / Biz)", pos: { x: 0, y: 120 }, type: "actor" },
    ],
    edges: [
      { id: "e1", source: "dev", target: "repo" },
      { id: "e2", source: "repo", target: "ci" },
      { id: "e3", source: "ci", target: "prod" },
      { id: "e4", source: "prod", target: "monitor" },
      { id: "e5", source: "stake", target: "dev", label: "feature requests" },
    ],
  },

  inconsistentAPIs: {
    id: "inconsistentAPIs",
    label: "Inconsistent APIs",
    summary:
      "Multiple services expose APIs with different naming, auth, error codes and no versioning — integrations are fragile.",
    businessImpact:
      "Breaks partner integrations, increases support costs, and prevents new integrations which block revenue.",
    exampleArtifacts: {
      PRD: "PRD: 'Standardize API contract, add semantic versioning and test harness.'",
      ADR: "ADR: 'Adopt API-first design with OpenAPI specs and contract tests.'",
    },
    nodes: [
      { id: "client", label: "3rd-party Clients\n(partners / apps)", pos: { x: 0, y: 0 }, type: "actor" },
      { id: "gateway", label: "API Gateway\n(no composition)", pos: { x: 220, y: 0 }, type: "infra" },
      { id: "svcA", label: "Service A (users)", pos: { x: 440, y: -60 }, type: "service" },
      { id: "svcB", label: "Service B (orders)", pos: { x: 440, y: 60 }, type: "service" },
      { id: "docs", label: "Poor Docs\n(no OpenAPI)", pos: { x: 220, y: 120 }, type: "process" },
      { id: "ops", label: "Integrations Team\n(tickets backlog)", pos: { x: 0, y: 120 }, type: "actor" },
    ],
    edges: [
      { id: "e1", source: "client", target: "gateway" },
      { id: "e2", source: "gateway", target: "svcA" },
      { id: "e3", source: "gateway", target: "svcB" },
      { id: "e4", source: "svcA", target: "docs" },
      { id: "e5", source: "svcB", target: "docs" },
      { id: "e6", source: "ops", target: "gateway", label: "support tickets" },
    ],
  },

  manualCICD: {
    id: "manualCICD",
    label: "Manual CI/CD",
    summary:
      "Deployments are manual with long lead times, no automated testing or rollback strategies, and human error risk.",
    businessImpact:
      "Slow security patches, high error rates during releases, compliance/regulatory risk in industries like fintech.",
    exampleArtifacts: {
      PRD: "PRD: 'Automate CI/CD with pipeline, tests, and rollback policies.'",
      ADR: "ADR: 'Adopt GitOps + blue/green or canary deployments.'",
    },
    nodes: [
      { id: "dev", label: "Developers\n(commit PRs)", pos: { x: 0, y: 0 }, type: "actor" },
      { id: "repo", label: "Repo\n(PRs, manual merges)", pos: { x: 220, y: 0 }, type: "code" },
      { id: "pipeline", label: "Manual Deploy Process", pos: { x: 440, y: 0 }, type: "process" },
      { id: "qa", label: "QA (manual)", pos: { x: 440, y: 120 }, type: "process" },
      { id: "prod", label: "Production\n(risky)", pos: { x: 660, y: 0 }, type: "infra" },
    ],
    edges: [
      { id: "e1", source: "dev", target: "repo" },
      { id: "e2", source: "repo", target: "pipeline" },
      { id: "e3", source: "pipeline", target: "prod" },
      { id: "e4", source: "qa", target: "pipeline" },
    ],
  },

  eventLedger: {
    id: "eventLedger",
    label: "Event-Ledger Instability",
    summary:
      "Event-driven architecture where message queues drop or duplicate messages under load, causing data loss or inconsistency.",
    businessImpact:
      "Data loss, contract breaches, fines, and user churn — especially critical in logistics/fintech.",
    exampleArtifacts: {
      PRD: "PRD: 'Harden event-ledger: retries, idempotency, monitoring, and dead-letter queues.'",
      ADR: "ADR: 'Use guaranteed delivery model, exactly-once semantics when possible.'",
    },
    nodes: [
      { id: "producer", label: "Producer\n(order service)", pos: { x: 0, y: 0 }, type: "service" },
      { id: "kafka", label: "Message Queue\n(Kafka/SQS)", pos: { x: 220, y: 0 }, type: "mq" },
      { id: "consumer", label: "Consumer\n(invoice / notifications)", pos: { x: 440, y: 0 }, type: "service" },
      { id: "dlq", label: "DLQ / Retry\n(dead-letter queue)", pos: { x: 220, y: 120 }, type: "infra" },
      { id: "monitor", label: "Monitoring & Alerts", pos: { x: 440, y: 120 }, type: "infra" },
      { id: "biz", label: "Business Impact\n(contracts, SLAs)", pos: { x: 0, y: 120 }, type: "actor" },
    ],
    edges: [
      { id: "e1", source: "producer", target: "kafka" },
      { id: "e2", source: "kafka", target: "consumer" },
      { id: "e3", source: "kafka", target: "dlq", label: "on failure" },
      { id: "e4", source: "monitor", target: "kafka", label: "alerts" },
      { id: "e5", source: "biz", target: "monitor" },
    ],
  },
};

// Step flow (process to fix debt)
const remediationSteps = [
  { id: "identify", label: "1. Identify" },
  { id: "translate", label: "2. Translate to Business Value" },
  { id: "prioritize", label: "3. Prioritize (RICE, Impact)" },
  { id: "execute", label: "4. Execute (PRD, ADR, Implementation)" },
  { id: "measure", label: "5. Measure (metrics & dashboards)" },
  { id: "evangelize", label: "6. Evangelize (share wins)" },
];

export default function TechnicalDebtExplorer() {
  const [activeScenarioId, setActiveScenarioId] = useState("legacyMonolith");
  const [highlightedEdges, setHighlightedEdges] = useState([]); // edges to animate
  const [selectedNodeInfo, setSelectedNodeInfo] = useState(null);
  const [activeStep, setActiveStep] = useState(null);

  const scenario = scenarios[activeScenarioId];

  // Build nodes/edges for ReactFlow for current scenario
  const rfNodes = useMemo(() => {
    return scenario.nodes.map((n) => {
      // map type -> style
      const typeStyle = {
        actor: { background: "#EFF6FF", border: "2px solid #60A5FA" },
        code: { background: "#ECFCCB", border: "2px solid #86EFAC" },
        process: { background: "#FEF3C7", border: "2px solid #F59E0B" },
        infra: { background: "#FCE7F3", border: "2px solid #FB7185" },
        service: { background: "#E6FFFA", border: "2px solid #34D399" },
        mq: { background: "#F0F9FF", border: "2px solid #60A5FA" },
      }[n.type] || { background: "#FFF", border: "2px solid rgba(0,0,0,0.08)" };

      return {
        id: n.id,
        data: { label: n.label },
        position: n.pos,
        style: { ...baseNodeStyle, ...typeStyle, width: 180, minHeight: 50 },
      };
    });
  }, [scenario]);

  const rfEdges = useMemo(() => {
    return scenario.edges.map((e) => {
      const key = `${e.source}->${e.target}`;
      const isHighlighted = highlightedEdges.includes(key);
      return {
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.label,
        animated: isHighlighted,
        style: {
          stroke: isHighlighted ? "#ef4444" : "#9ca3af",
          strokeWidth: isHighlighted ? 3 : 1,
        },
        markerEnd: {
          type: "arrowclosed",
        },
      };
    });
  }, [scenario, highlightedEdges]);

  // Toggle highlighting for remediation steps (map steps -> edges)
  const stepToEdges = useMemo(() => {
    // For educational mapping, we map each remediation step to a list of scenario-specific edges
    // (these are logical mappings rather than exhaustive)
    const map = {};
    remediationSteps.forEach((step) => {
      // Default: the entire scenario path
      map[step.id] = scenario.edges.map((e) => `${e.source}->${e.target}`);
    });
    // tune a bit per step
    map["identify"] = scenario.edges.slice(0, 2).map((e) => `${e.source}->${e.target}`);
    map["translate"] = scenario.edges.slice(1, 3).map((e) => `${e.source}->${e.target}`);
    map["prioritize"] = scenario.edges.slice(2, 4).map((e) => `${e.source}->${e.target}`);
    map["execute"] = scenario.edges.map((e) => `${e.source}->${e.target}`);
    map["measure"] = scenario.edges.filter((e) => e.label || e.target === "monitor" || e.target === "monitoring").map((e) => `${e.source}->${e.target}`) || map["execute"];
    map["evangelize"] = scenario.edges.slice(0, 1).map((e) => `${e.source}->${e.target}`);
    return map;
  }, [scenario]);

  const onSelectStep = useCallback(
    (stepId) => {
      setActiveStep(stepId);
      setHighlightedEdges(stepToEdges[stepId] || []);
    },
    [stepToEdges]
  );

  const onNodeClick = useCallback((evt, node) => {
    // show detailed RHS card depending on node.id and scenario
    const nodeId = node.id;
    // Construct a contextual explanation
    const explanation = {
      title: node.data.label.split("\n")[0],
      details: node.data.label,
      technical: "",
      businessTranslation: "",
      artifacts: scenario.exampleArtifacts,
    };

    // Simple technical and business translations by node type heuristics
    if (nodeId === "repo" || nodeId === "repo") {
      explanation.technical = "Codebase: tightly-coupled code makes changes high-risk. No automated tests means regressions slip into production.";
      explanation.businessTranslation = "Every small change requires long QA cycles; feature delivery slows and revenue is delayed.";
    } else if (nodeId === "ci" || nodeId === "pipeline") {
      explanation.technical = "CI/CD process is manual or missing automated gates (unit, integration tests, smoke tests).";
      explanation.businessTranslation = "Manual deploys increase chance of human error and delay security patches.";
    } else if (nodeId === "gateway" || nodeId === "svcA" || nodeId === "svcB") {
      explanation.technical = "APIs lack a contract (OpenAPI) and versioning; error handling is inconsistent.";
      explanation.businessTranslation = "Partners' integrations break unpredictably, causing lost deals and support load.";
    } else if (nodeId === "kafka" || nodeId === "dlq") {
      explanation.technical = "Message queue lacks DLQ/retry or idempotency; spikes cause message loss.";
      explanation.businessTranslation = "Lost order events means customers not notified and SLAs breached — revenue & fines at risk.";
    } else {
      explanation.technical = "System node that plays a role in the end-to-end flow.";
      explanation.businessTranslation = "Impacts lead time, reliability, or cost depending on its failure mode.";
    }

    setSelectedNodeInfo(explanation);
  }, [scenario]);

  // Change scenario handler
  const onChangeScenario = (id) => {
    setActiveScenarioId(id);
    setHighlightedEdges([]); // reset highlights
    setActiveStep(null);
    setSelectedNodeInfo(null);
  };

  // Visual palette for scenario buttons
  const scenarioButtonClass = (id) =>
    `px-3 py-2 rounded-md font-semibold text-sm shadow ${id === activeScenarioId ? "bg-indigo-600 text-white" : "bg-white text-gray-800 border"}`;

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-yellow-800">Technical Debt Explorer</h1>
          <p className="text-sm text-gray-600 max-w-2xl">
            Interactive module: explore real debt scenarios, remediation steps, artifacts and business translations.
            Click nodes to see technical details and how to explain impact to stakeholders.
          </p>
        </div>

        {/* Scenario selector */}
        <div className="flex gap-2 flex-wrap">
          {Object.keys(scenarios).map((sid) => (
            <button key={sid} onClick={() => onChangeScenario(sid)} className={scenarioButtonClass(sid)}>
              {scenarios[sid].label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Flow + steps */}
        <div className="lg:col-span-2 space-y-4 bg-white rounded-lg p-4 shadow">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-semibold text-lg">{scenario.label}</h2>
              <p className="text-sm text-gray-700">{scenario.summary}</p>
            </div>

            <div className="text-sm text-gray-600 text-right">
              <div><span className="font-semibold">Business impact:</span> {scenario.businessImpact}</div>
              <div className="mt-2 text-xs">{scenario.exampleArtifacts.PRD}</div>
            </div>
          </div>

          {/* Remediation steps (click to highlight) */}
          <div className="flex gap-2 flex-wrap mb-2">
            {remediationSteps.map((s) => (
              <button
                key={s.id}
                onClick={() => onSelectStep(s.id)}
                className={`px-3 py-1 rounded-md text-sm ${activeStep === s.id ? "bg-rose-500 text-white" : "bg-gray-100 text-gray-800"} shadow-sm`}
              >
                {s.label}
              </button>
            ))}
            <button
              onClick={() => { setHighlightedEdges(scenario.edges.map(e => `${e.source}->${e.target}`)); setActiveStep("execute"); }}
              className="px-3 py-1 rounded-md text-sm bg-green-600 text-white shadow-sm"
            >
              Highlight Full Flow
            </button>
            <button
              onClick={() => { setHighlightedEdges([]); setActiveStep(null); }}
              className="px-3 py-1 rounded-md text-sm bg-gray-200 text-gray-700 shadow-sm"
            >
              Clear Highlights
            </button>
          </div>

          {/* React Flow container */}
          <div className="h-72 md:h-96 border rounded-lg">
            <ReactFlow nodes={rfNodes} edges={rfEdges} fitView onNodeClick={onNodeClick} nodesDraggable={false} nodesConnectable={false}>
              <Background gap={16} size={1} />
              <MiniMap nodeStrokeColor={(n) => n.style.border} nodeColor={(n) => n.style.background} zoomable pannable />
              <Controls />
            </ReactFlow>
          </div>

          {/* Example artifact snippet and suggested PRD / ADR content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
            <div className="p-3 border rounded">
              <h3 className="font-semibold text-sm">Suggested PRD (snippet)</h3>
              <p className="text-xs text-gray-700 mt-2">
                Title: {scenario.exampleArtifacts.PRD}
              </p>
              <p className="text-xs text-gray-500 mt-2">Include: Goal, success metrics, constraints, high-level approach, rollout plan.</p>
            </div>
            <div className="p-3 border rounded">
              <h3 className="font-semibold text-sm">Suggested ADR (snippet)</h3>
              <p className="text-xs text-gray-700 mt-2">{scenario.exampleArtifacts.ADR}</p>
              <p className="text-xs text-gray-500 mt-2">Include: options considered, chosen option, trade-offs, migration plan.</p>
            </div>
            <div className="p-3 border rounded">
              <h3 className="font-semibold text-sm">Priority & Metrics</h3>
              <ul className="text-xs text-gray-700 mt-2 list-disc ml-5">
                <li>Suggested metric: Deployment frequency / Lead time</li>
                <li>Success target: reduce lead time by 30%</li>
                <li>Measure: error rate, customer complaints, revenue unblockers</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Node details + playbook */}
        <aside className="space-y-4">
          <div className="bg-white p-3 rounded-lg shadow">
            <h3 className="font-semibold">Selected Node</h3>
            {selectedNodeInfo ? (
              <>
                <div className="mt-2">
                  <div className="font-semibold">{selectedNodeInfo.title}</div>
                  <div className="text-xs text-gray-700 whitespace-pre-line mt-1">{selectedNodeInfo.details}</div>
                </div>
                <div className="mt-3 text-sm">
                  <div className="font-semibold">Technical Notes</div>
                  <div className="text-xs text-gray-600 mt-1">{selectedNodeInfo.technical}</div>
                </div>
                <div className="mt-3 text-sm">
                  <div className="font-semibold">Business Translation</div>
                  <div className="text-xs text-gray-600 mt-1">{selectedNodeInfo.businessTranslation}</div>
                </div>
                <div className="mt-3">
                  <div className="font-semibold text-sm">Artifacts</div>
                  <div className="text-xs text-gray-600 mt-1">{selectedNodeInfo.artifacts.PRD}</div>
                  <div className="text-xs text-gray-600 mt-1">{selectedNodeInfo.artifacts.ADR}</div>
                </div>
              </>
            ) : (
              <div className="text-xs text-gray-600 mt-2">Click any node in the diagram to see technical + business notes and recommended artifacts (PRD, ADR).</div>
            )}
          </div>

          <div className="bg-white p-3 rounded-lg shadow text-sm">
            <h3 className="font-semibold mb-2">Playbook: From Debt → Business Value</h3>
            <ol className="list-decimal ml-5 text-xs text-gray-700 space-y-1">
              <li>Audit & tag debt items (technical owner, impact, effort).</li>
              <li>Translate each item to business outcomes (revenue, lead-time, risk).</li>
              <li>Score & prioritize (RICE / risk-based).</li>
              <li>Create minimal PRD & ADR for high-impact items.</li>
              <li>Schedule work (10-20% sprint capacity) + measure results.</li>
              <li>Share wins: demos, dashboards, and stakeholder summaries.</li>
            </ol>
          </div>

          <div className="bg-white p-3 rounded-lg shadow text-sm">
            <h3 className="font-semibold mb-2">Why PMs Must Care</h3>
            <ul className="list-disc ml-5 text-xs text-gray-700 space-y-1">
              <li>Translate technical cost into business language to secure investment.</li>
              <li>Prioritize debt that unlocks revenue or reduces regulatory risk.</li>
              <li>Balance short-term time-to-market with long-term platform health.</li>
              <li>Use metrics to measure ROI of remediation work.</li>
            </ul>
          </div>

          <div className="bg-white p-3 rounded-lg shadow text-sm">
            <h3 className="font-semibold mb-2">Quick Examples / Use Cases</h3>
            <ul className="text-xs text-gray-700 space-y-1">
              <li><b>Legacy Monolith:</b> Break out checkout module to reduce time-to-market for new payment types.</li>
              <li><b>Inconsistent APIs:</b> Standardize contracts + provide SDKs to partners.</li>
              <li><b>Manual CI/CD:</b> Implement pipeline + canary deploys to reduce risk and release time.</li>
              <li><b>Event-Ledger:</b> Add retry + DLQ + idempotent consumers to prevent data loss.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
