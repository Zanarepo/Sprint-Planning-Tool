import React, { useState } from "react";
import ReactFlow, {
  Background,
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  FaBook,
  FaCode,
  FaTasks,
  FaCloud,
  FaBalanceScale,
  FaRocket,
  FaCheck,
  FaFileAlt,
  FaCogs,
} from "react-icons/fa";

/* -------------------------- styling helpers --------------------------- */
const card = "bg-white rounded-2xl border shadow-sm";
const p = "text-sm md:text-[0.95rem] text-gray-700 leading-relaxed";

/* ------------------------- ReactFlow helpers ------------------------- */
const nodeBase = (w = 180) => ({
  style: {
    borderRadius: 10,
    padding: 8,
    fontSize: 12,
    textAlign: "center",
    width: w,
    border: "1.2px solid #e5e7eb",
    background: "#fff",
  },
});
const makeNode = (id, label, pos = { x: 0, y: 0 }, color = "#f8fafc", w = 180) => {
  const position = pos && typeof pos.x === 'number' && typeof pos.y === 'number' ? pos : { x: 0, y: 0 };
  const node = {
    id,
    data: { label },
    position,
    ...nodeBase(w),
    style: { ...nodeBase(w).style, background: color },
  };
  console.log(`makeNode created node ${id}:`, node);
  return node;
};
const makeEdge = (id, src, tgt, label = "", highlighted = false) => ({
  id,
  source: src,
  target: tgt,
  animated: highlighted,
  label,
  style: {
    stroke: highlighted ? "#f97316" : "#9ca3af",
    strokeWidth: highlighted ? 2.5 : 1.5,
  },
});

/* --------------------------- FlowPanel -------------------------------- */
const FlowPanel = ({ nodes, edges, height = "h-64" }) => {
  const validNodes = nodes.map((node) => ({
    ...node,
    position: node.position && typeof node.position.x === 'number' && typeof node.position.y === 'number'
      ? node.position
      : { x: 0, y: 0 },
  }));
  const validEdges = edges.filter((edge) => edge.source && edge.target);
  const [ns, , onNodesChange] = useNodesState(validNodes);
  const [es, , onEdgesChange] = useEdgesState(validEdges);

  console.log(`FlowPanel nodes:`, validNodes);
  console.log(`FlowPanel edges:`, validEdges);

  return (
    <div className={`w-full ${height} ${card} overflow-hidden`}>
      <ReactFlow
        nodes={ns}
        edges={es}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
        className="bg-gray-50"
        style={{ width: "100%", height: "100%" }}
      >
        <Background gap={16} size={1} />
        <MiniMap pannable zoomable />
        <Controls />
      </ReactFlow>
    </div>
  );
};

/* ------------------------- ModuleSection ------------------------------ */
const ModuleSection = ({ id, title, icon: Icon, children }) => {
  return (
    <section className={`${card} p-5`} id={id}>
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-5 h-5 text-yellow-800" />
        <h2 className="text-lg font-semibold text-yellow-800">{title}</h2>
      </div>
      <div id={`${id}-content`} className="px-0 pb-0">
        {children}
      </div>
    </section>
  );
};

/* -------------------------- Diagrams: PRD ----------------------------- */
const prdNodes = [
  makeNode("p_problem", "Problem\n(10s checkout → 20% abandonment)", { x: 0, y: 0 }, "#fee2e2", 220),
  makeNode("p_goals", "Goals\n(+15% completion, +$500K/mo)", { x: 240, y: 0 }, "#dcfce7", 200),
  makeNode("p_reqs", "Requirements\n(1-click, <2s, mobile+desktop)", { x: 480, y: 0 }, "#dbeafe", 220),
  makeNode("p_metrics", "Success Metrics\n(3s → 95% conv, latency p95 <2s)", { x: 720, y: 0 }, "#fef3c7", 240),
  makeNode("p_usecases", "Use Cases\n(quick buy on phone)", { x: 240, y: 100 }, "#e0f2fe", 200),
  makeNode("p_constraints", "Constraints\n(existing payments, 99% uptime)", { x: 480, y: 100 }, "#f3e8ff", 220),
  makeNode("p_out", "Aligned Delivery\n(clarity for Eng/QA/Stakeholders)", { x: 720, y: 100 }, "#fce7f3", 240),
];
const prdEdges = [
  makeEdge("pe1", "p_problem", "p_goals", "why", true),
  makeEdge("pe2", "p_goals", "p_reqs", "what"),
  makeEdge("pe3", "p_reqs", "p_metrics", "how we’ll measure"),
  makeEdge("pe4", "p_goals", "p_usecases", "who/how"),
  makeEdge("pe5", "p_reqs", "p_constraints", "must consider"),
  makeEdge("pe6", "p_metrics", "p_out", "verify outcome", true),
];

/* ---------------------- Diagrams: API Contract ------------------------ */
const apiNodes = [
  makeNode("a_endpoints", "Endpoints\nPOST /v1/checkout", { x: 0, y: 0 }, "#dbeafe"),
  makeNode("a_schema", "Schemas\nreq: order_id, payment_method\nres: status, id", { x: 240, y: 0 }, "#dcfce7", 220),
  makeNode("a_errors", "Errors\n402 Payment Failed\n422 Invalid Input", { x: 480, y: 0 }, "#fee2e2", 220),
  makeNode("a_perf", "Performance\n5K rps, p95 <50ms", { x: 720, y: 0 }, "#fef3c7", 180),
  makeNode("a_auth", "Auth\nAPI key (merchant, app)", { x: 0, y: 100 }, "#fff7ed", 200),
  makeNode("a_version", "Versioning\n/v1, deprecations", { x: 240, y: 100 }, "#e0f2fe", 180),
  makeNode("a_examples", "Examples\ncurl + SDK snippets", { x: 480, y: 100 }, "#f3e8ff", 200),
  makeNode("a_out", "Reliable Integrations\n(less back-and-forth, faster dev)", { x: 720, y: 100 }, "#fce7f3", 240),
];
const apiEdges = [
  makeEdge("ae1", "a_endpoints", "a_schema", "shape"),
  makeEdge("ae2", "a_schema", "a_errors", "validation"),
  makeEdge("ae3", "a_errors", "a_perf", "guardrails"),
  makeEdge("ae4", "a_endpoints", "a_auth", "secure"),
  makeEdge("ae5", "a_auth", "a_version", "compatibility"),
  makeEdge("ae6", "a_version", "a_examples", "dev UX"),
  makeEdge("ae7", "a_examples", "a_out", "adoption", true),
];

/* ---------------------- Diagrams: ADR / Decision Doc ------------------ */
const adrNodes = [
  makeNode("d_context", "Context\nChoose payment processor", { x: 0, y: 0 }, "#fff7ed", 200),
  makeNode("d_options", "Options\nStripe (fast, pricier)\nPayPal (cheaper, slower)", { x: 240, y: 0 }, "#e0f2fe", 220),
  makeNode("d_decision", "Decision\nPick Stripe for 1-week setup", { x: 480, y: 0 }, "#dcfce7", 220),
  makeNode("d_implications", "Implications\n+Speed to market\n+Hit holiday window\n-2% higher fees", { x: 720, y: 0 }, "#fee2e2", 230),
  makeNode("d_stake", "Stakeholders\nEng, Finance, Legal", { x: 240, y: 100 }, "#f3e8ff", 200),
  makeNode("d_status", "Status/Date\nFinal: Aug 2025", { x: 480, y: 100 }, "#fce7f3", 180),
  makeNode("d_out", "Knowledge Base\nAvoids re-litigating decisions", { x: 720, y: 100 }, "#dbeafe", 230),
];
const adrEdges = [
  makeEdge("de1", "d_context", "d_options", "consider"),
  makeEdge("de2", "d_options", "d_decision", "choose", true),
  makeEdge("de3", "d_decision", "d_implications", "trade-offs"),
  makeEdge("de4", "d_options", "d_stake", "review"),
  makeEdge("de5", "d_stake", "d_status", "sign-off"),
  makeEdge("de6", "d_status", "d_out", "record"),
];

/* ---------------------- Diagrams: Release Notes ----------------------- */
const rnNodes = [
  makeNode("r_summary", "Summary\nv1.2: One-click 'Buy Now'", { x: 0, y: 0 }, "#dcfce7", 200),
  makeNode("r_changes", "Changes\n10s → 3s checkout\nFewer payment errors", { x: 240, y: 0 }, "#dbeafe", 220),
  makeNode("r_impact", "Impact\nShop faster; +CSAT; +sales", { x: 480, y: 0 }, "#fef3c7", 200),
  makeNode("r_action", "Action Required\nUpdate to v1.2", { x: 720, y: 0 }, "#fff7ed", 160),
  makeNode("r_known", "Known Issues\nSome methods activate in 24h", { x: 240, y: 100 }, "#fee2e2", 230),
  makeNode("r_out", "Adoption & Support Readiness", { x: 480, y: 100 }, "#f3e8ff", 220),
];
const rnEdges = [
  makeEdge("re1", "r_summary", "r_changes", "what"),
  makeEdge("re2", "r_changes", "r_impact", "why", true),
  makeEdge("re3", "r_impact", "r_action", "how to get it"),
  makeEdge("re4", "r_changes", "r_known", "transparency"),
  makeEdge("re5", "r_known", "r_out", "set expectations"),
];

/* --------------- Diagrams: Integrated Example (Amazon) --------------- */
const exNodes = [
  makeNode("x_prd", "PRD\nProblem, Goals, Reqs, Metrics", { x: 0, y: 0 }, "#dbeafe", 220),
  makeNode("x_api", "API Contract\n/v1/checkout, errors, perf", { x: 240, y: 0 }, "#dcfce7", 220),
  makeNode("x_adr", "ADR\nStripe chosen for speed", { x: 480, y: 0 }, "#f3e8ff", 200),
  makeNode("x_rn", "Release Notes\nOne-click, 3s checkout", { x: 720, y: 0 }, "#fef3c7", 200),
  makeNode("x_out", "Outcome\n+$400K Q4, -15% abandonment, -10% support tickets", { x: 960, y: 0 }, "#fce7f3", 260),
];
const exEdges = [
  makeEdge("xe1", "x_prd", "x_api", "specs"),
  makeEdge("xe2", "x_api", "x_adr", "context"),
  makeEdge("xe3", "x_adr", "x_rn", "story"),
  makeEdge("xe4", "x_rn", "x_out", "adoption", true),
];

/* -------------------------- Generators -------------------------------- */
const genPRD = ({ title, problem, goals, requirements, metrics, useCases, constraints }) =>
  `PRD: ${title}

Problem
- ${problem}

Goals (Business & User)
- ${goals}

Requirements (Must/Should/Won’t)
- ${requirements}

Success Metrics
- ${metrics}

Use Cases
- ${useCases}

Constraints & Assumptions
- ${constraints}

Out of Scope
- (List to prevent scope creep)

Risks & Mitigations
- (Top 3)

Rollout & Experiment Plan
- (Flags/canary, checkpoints)`;

const genAPI = ({ name, endpoint, method, auth, reqSchema, resSchema, errors, perf, versioning, examples }) =>
  `API Contract: ${name}

Endpoint
- ${method} ${endpoint}

Auth
- ${auth}

Request Schema (JSON)
${reqSchema}

Response Schema (JSON)
${resSchema}

Errors
${errors}

Performance & SLOs
- ${perf}

Versioning & Deprecation
- ${versioning}

Examples
${examples}`;

const genADR = ({ title, context, options, decision, implications, stakeholders, date }) =>
  `ADR: ${title}

Context
- ${context}

Options Considered
- ${options}

Decision
- ${decision}

Implications (Trade-offs)
- ${implications}

Stakeholders
- ${stakeholders}

Status/Date
- Final — ${date}`;

const genRN = ({ version, summary, changes, impact, action, known }) =>
  `Release Notes — ${version}

Summary
- ${summary}

What Changed
${changes}

Why It Matters
- ${impact}

Action Required
- ${action}

Known Issues
- ${known}`;

/* ------------------------- Main Module ------------------------------- */
export default function DocumentationModule() {
  /* generator state */
  const [prd, setPrd] = useState({
    title: "Buy Now — One-Click Checkout",
    problem: "10s median checkout; ~20% cart abandonment on mobile.",
    goals: "Increase completion by 15% and monthly sales by $500K.",
    requirements: "One-click button; <2s processing; mobile+desktop; retries; idempotency.",
    metrics: "Conv rate to 95%; p95 latency <2s; auth failure <0.5%.",
    useCases: "Returning user with saved card buys in 1 tap.",
    constraints: "Use existing payment gateway; 99% uptime; PCI handled by provider.",
  });

  const [api, setApi] = useState({
    name: "Checkout API",
    endpoint: "/v1/checkout",
    method: "POST",
    auth: "Merchant API key + app key (header).",
    reqSchema: `{
  "order_id": "string",
  "payment_method": "token",
  "amount": 3499,
  "currency": "USD"
}`,
    resSchema: `{
  "status": "success|failure",
  "transaction_id": "string",
  "message": "string"
}`,
    errors: `- 402 PAYMENT_FAILED — insufficient_funds
- 422 INVALID_REQUEST — missing order_id
- 429 RATE_LIMIT — retry after`,
    perf: "5,000 rps; p95 <50ms; uptime 99.9%.",
    versioning: "Prefix /v1; 90-day deprecation notice for breaking changes.",
    examples: `curl -X POST https://api.example.com/v1/checkout \\
  -H "Authorization: Bearer <API_KEY>" \\
  -H "Content-Type: application/json" \\
  -d '{ "order_id":"abc123", "payment_method":"tok_789", "amount":3499, "currency":"USD" }'`,
  });

  const [adr, setAdr] = useState({
    title: "Payment Processor Choice for Buy Now",
    context: "Need a processor enabling 1-week integration for holiday launch.",
    options: "Stripe (fast, higher fees), PayPal (cheaper, slower integration).",
    decision: "Choose Stripe to hit seasonal window; accept ~2% higher fees.",
    implications: "+Fast time-to-market; +Reduced impl risk; -Higher variable cost.",
    stakeholders: "PM, Eng Lead, Finance, Legal.",
    date: "Aug 2025",
  });

  const [rn, setRn] = useState({
    version: "v1.2",
    summary: "One-click 'Buy Now' checkout for faster purchases.",
    changes: "- Reduced median checkout 10s → 3s\n- Improved payment retries and error messages",
    impact: "Shop faster; fewer failures; increased conversion.",
    action: "Update to app v1.2 or refresh web to enable.",
    known: "Some payment methods activate within 24 hours after first use.",
  });

  const [outPRD, setOutPRD] = useState("");
  const [outAPI, setOutAPI] = useState("");
  const [outADR, setOutADR] = useState("");
  const [outRN, setOutRN] = useState("");

  return (
    <div className="w-full mx-auto px-4 md:px-6 py-6 space-y-6 bg-gray-50 mt-16">
      {/* Header */}
      <div className={`${card} p-5`}>
        <h1 className="text-2xl md:text-3xl font-bold text-yellow-800 mb-2">
          Writing Clear & Effective Documentation — Complete Module
        </h1>
        <p className={p}>
          Master PRDs, API contracts, decision records (ADRs), and release notes. Each section
          stands alone for clean reading and teaching, with diagrams, examples, and quick generators.
        </p>
      </div>

      {/* Why it matters */}
      <ModuleSection id="why" title="Why Documentation Matters" icon={FaBook}>
        <ul className="list-disc ml-5 text-gray-700 text-sm space-y-2">
          <li><strong>Team Alignment:</strong> Put engineers, designers, and stakeholders on the same page.</li>
          <li><strong>Faster Work:</strong> Reduce ambiguity and rework with crisp requirements.</li>
          <li><strong>User Focus:</strong> Empathetic docs improve UX and support outcomes.</li>
          <li><strong>Future-Proofing:</strong> Decisions are searchable and durable for new team members.</li>
        </ul>
        <FlowPanel
          nodes={[makeNode("why_node", "Clear Docs\n→ Alignment, Speed, UX", { x: 0, y: 0 }, "#dbeafe")]}
          edges={[]}
          height="h-56"
        />
      </ModuleSection>

      {/* PRDs */}
      <ModuleSection id="prds" title="Product Requirement Documents (PRDs)" icon={FaTasks}>
        <div className="space-y-3">
          <p className={p}>
            A PRD is the blueprint: it states the problem, goals, functional requirements, and how
            we’ll measure success. It aligns execution without dictating implementation details.
          </p>
          <ul className="list-disc ml-5 text-gray-700 text-sm space-y-1">
            <li><strong>Problem:</strong> e.g., “10s checkout causes 20% abandonment.”</li>
            <li><strong>Goals:</strong> “+15% completion, +$500K/month.”</li>
            <li><strong>Requirements:</strong> “One-click, &lt;2s, mobile & desktop, retries, idempotency.”</li>
            <li><strong>Success Metrics:</strong> “p95 &lt; 2s, 95% conversion.”</li>
            <li><strong>Use Cases & Constraints:</strong> Who benefits, what must be true.</li>
          </ul>
          <FlowPanel nodes={prdNodes} edges={prdEdges} height="h-64" />

          <div className={`${card} p-4 mt-4 space-y-2`}>
            <h4 className="font-semibold flex items-center gap-2"><FaFileAlt /> PRD Quick Generator</h4>
            <div className="grid grid-cols-1 gap-2">
              <input className="p-2 border rounded" value={prd.title} onChange={(e) => setPrd((s) => ({ ...s, title: e.target.value }))} placeholder="Title" />
              <textarea className="p-2 border rounded h-20" value={prd.problem} onChange={(e) => setPrd((s) => ({ ...s, problem: e.target.value }))} placeholder="Problem" />
              <textarea className="p-2 border rounded h-20" value={prd.goals} onChange={(e) => setPrd((s) => ({ ...s, goals: e.target.value }))} placeholder="Goals" />
              <textarea className="p-2 border rounded h-24" value={prd.requirements} onChange={(e) => setPrd((s) => ({ ...s, requirements: e.target.value }))} placeholder="Requirements" />
              <textarea className="p-2 border rounded h-20" value={prd.metrics} onChange={(e) => setPrd((s) => ({ ...s, metrics: e.target.value }))} placeholder="Success Metrics" />
              <textarea className="p-2 border rounded h-20" value={prd.useCases} onChange={(e) => setPrd((s) => ({ ...s, useCases: e.target.value }))} placeholder="Use Cases" />
              <textarea className="p-2 border rounded h-20" value={prd.constraints} onChange={(e) => setPrd((s) => ({ ...s, constraints: e.target.value }))} placeholder="Constraints" />
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-yellow-700 text-white rounded" onClick={() => setOutPRD(genPRD(prd))}>Generate PRD</button>
                <button className="px-4 py-2 border rounded" onClick={() => { setPrd({ title: "", problem: "", goals: "", requirements: "", metrics: "", useCases: "", constraints: "" }); setOutPRD(""); }}>Clear</button>
              </div>
              {outPRD && <textarea readOnly className="w-full p-2 border rounded h-56" value={outPRD} />}
            </div>
          </div>
        </div>
      </ModuleSection>

      {/* API Contracts */}
      <ModuleSection id="api" title="API Contracts" icon={FaCode}>
        <div className="space-y-3">
          <p className={p}>
            API contracts specify how systems talk: endpoints, schemas, errors, auth, performance,
            versioning, and examples. Good contracts shrink integration time and reduce failures.
          </p>
          <FlowPanel nodes={apiNodes} edges={apiEdges} height="h-64" />

          <div className={`${card} p-4 mt-4 space-y-2`}>
            <h4 className="font-semibold flex items-center gap-2"><FaCogs /> API Contract Quick Generator</h4>
            <div className="grid grid-cols-1 gap-2">
              <input className="p-2 border rounded" value={api.name} onChange={(e) => setApi((s) => ({ ...s, name: e.target.value }))} placeholder="API Name" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input className="p-2 border rounded" value={api.method} onChange={(e) => setApi((s) => ({ ...s, method: e.target.value }))} placeholder="Method (e.g., POST)" />
                <input className="p-2 border rounded" value={api.endpoint} onChange={(e) => setApi((s) => ({ ...s, endpoint: e.target.value }))} placeholder="Endpoint (e.g., /v1/checkout)" />
              </div>
              <input className="p-2 border rounded" value={api.auth} onChange={(e) => setApi((s) => ({ ...s, auth: e.target.value }))} placeholder="Auth" />
              <textarea className="p-2 border rounded h-24" value={api.reqSchema} onChange={(e) => setApi((s) => ({ ...s, reqSchema: e.target.value }))} placeholder="Request Schema (JSON)" />
              <textarea className="p-2 border rounded h-24" value={api.resSchema} onChange={(e) => setApi((s) => ({ ...s, resSchema: e.target.value }))} placeholder="Response Schema (JSON)" />
              <textarea className="p-2 border rounded h-24" value={api.errors} onChange={(e) => setApi((s) => ({ ...s, errors: e.target.value }))} placeholder="Errors" />
              <input className="p-2 border rounded" value={api.perf} onChange={(e) => setApi((s) => ({ ...s, perf: e.target.value }))} placeholder="Performance & SLOs" />
              <input className="p-2 border rounded" value={api.versioning} onChange={(e) => setApi((s) => ({ ...s, versioning: e.target.value }))} placeholder="Versioning & Deprecation" />
              <textarea className="p-2 border rounded h-28" value={api.examples} onChange={(e) => setApi((s) => ({ ...s, examples: e.target.value }))} placeholder="Examples (curl, SDK)" />
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-yellow-700 text-white rounded" onClick={() => setOutAPI(genAPI(api))}>Generate API Contract</button>
                <button className="px-4 py-2 border rounded" onClick={() => { setApi({ name: "", endpoint: "", method: "", auth: "", reqSchema: "", resSchema: "", errors: "", perf: "", versioning: "", examples: "" }); setOutAPI(""); }}>Clear</button>
              </div>
              {outAPI && <textarea readOnly className="w-full p-2 border rounded h-56" value={outAPI} />}
            </div>
          </div>
        </div>
      </ModuleSection>

      {/* ADRs */}
      <ModuleSection id="adr" title="Decision Records (ADRs)" icon={FaBalanceScale}>
        <div className="space-y-3">
          <p className={p}>
            ADRs capture the why behind major choices. They prevent rehashing debates, make trade-offs
            explicit, and speed up onboarding.
          </p>
          <FlowPanel nodes={adrNodes} edges={adrEdges} height="h-56" />

          <div className={`${card} p-4 mt-4 space-y-2`}>
            <h4 className="font-semibold flex items-center gap-2"><FaFileAlt /> ADR Quick Generator</h4>
            <div className="grid grid-cols-1 gap-2">
              <input className="p-2 border rounded" value={adr.title} onChange={(e) => setAdr((s) => ({ ...s, title: e.target.value }))} placeholder="ADR Title" />
              <textarea className="p-2 border rounded h-20" value={adr.context} onChange={(e) => setAdr((s) => ({ ...s, context: e.target.value }))} placeholder="Context" />
              <textarea className="p-2 border rounded h-20" value={adr.options} onChange={(e) => setAdr((s) => ({ ...s, options: e.target.value }))} placeholder="Options Considered" />
              <textarea className="p-2 border rounded h-20" value={adr.decision} onChange={(e) => setAdr((s) => ({ ...s, decision: e.target.value }))} placeholder="Decision" />
              <textarea className="p-2 border rounded h-20" value={adr.implications} onChange={(e) => setAdr((s) => ({ ...s, implications: e.target.value }))} placeholder="Implications (Trade-offs)" />
              <input className="p-2 border rounded" value={adr.stakeholders} onChange={(e) => setAdr((s) => ({ ...s, stakeholders: e.target.value }))} placeholder="Stakeholders" />
              <input className="p-2 border rounded" value={adr.date} onChange={(e) => setAdr((s) => ({ ...s, date: e.target.value }))} placeholder="Date" />
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-yellow-700 text-white rounded" onClick={() => setOutADR(genADR(adr))}>Generate ADR</button>
                <button className="px-4 py-2 border rounded" onClick={() => { setAdr({ title: "", context: "", options: "", decision: "", implications: "", stakeholders: "", date: "" }); setOutADR(""); }}>Clear</button>
              </div>
              {outADR && <textarea readOnly className="w-full p-2 border rounded h-48" value={outADR} />}
            </div>
          </div>
        </div>
      </ModuleSection>

      {/* Release Notes */}
      <ModuleSection id="releasenotes" title="Release Notes" icon={FaCloud}>
        <div className="space-y-3">
          <p className={p}>
            Release notes translate technical changes into user-visible value and operational guidance.
            Be clear, honest, and action-oriented.
          </p>
          <FlowPanel nodes={rnNodes} edges={rnEdges} height="h-56" />

          <div className={`${card} p-4 mt-4 space-y-2`}>
            <h4 className="font-semibold flex items-center gap-2"><FaRocket /> Release Notes Quick Generator</h4>
            <div className="grid grid-cols-1 gap-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input className="p-2 border rounded" value={rn.version} onChange={(e) => setRn((s) => ({ ...s, version: e.target.value }))} placeholder="Version" />
                <input className="p-2 border rounded" value={rn.summary} onChange={(e) => setRn((s) => ({ ...s, summary: e.target.value }))} placeholder="Summary" />
              </div>
              <textarea className="p-2 border rounded h-24" value={rn.changes} onChange={(e) => setRn((s) => ({ ...s, changes: e.target.value }))} placeholder="What Changed (bullets)" />
              <input className="p-2 border rounded" value={rn.impact} onChange={(e) => setRn((s) => ({ ...s, impact: e.target.value }))} placeholder="Why It Matters" />
              <input className="p-2 border rounded" value={rn.action} onChange={(e) => setRn((s) => ({ ...s, action: e.target.value }))} placeholder="Action Required" />
              <input className="p-2 border rounded" value={rn.known} onChange={(e) => setRn((s) => ({ ...s, known: e.target.value }))} placeholder="Known Issues" />
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-yellow-700 text-white rounded" onClick={() => setOutRN(genRN(rn))}>Generate Release Notes</button>
                <button className="px-4 py-2 border rounded" onClick={() => { setRn({ version: "", summary: "", changes: "", impact: "", action: "", known: "" }); setOutRN(""); }}>Clear</button>
              </div>
              {outRN && <textarea readOnly className="w-full p-2 border rounded h-48" value={outRN} />}
            </div>
          </div>
        </div>
      </ModuleSection>

      {/* Example */}
      <ModuleSection id="example" title="Practical Example: Amazon 'Buy Now' Checkout" icon={FaCheck}>
        <p className={p}>
          See how all four documents fit to launch a performant, low-risk feature that customers love.
        </p>
        <ul className="list-disc ml-5 text-gray-700 text-sm space-y-1">
          <li><strong>PRD:</strong> Fast purchase button to reduce abandonment; success at p95 &lt;2s, 95% conversion.</li>
          <li><strong>API Contract:</strong> POST /v1/checkout; clear schemas, errors, auth, and SLOs for partners and internal teams.</li>
          <li><strong>ADR:</strong> Choose Stripe for 1-week integration to hit holiday window despite higher fees.</li>
          <li><strong>Release Notes:</strong> “One-click ‘Buy Now’ cuts checkout time to 3s. Update to v1.2.”</li>
        </ul>
        <div className="mt-3">
          <FlowPanel nodes={exNodes} edges={exEdges} height="h-48" />
        </div>
        <div className={`${card} p-4 mt-4`}>
          <h4 className="font-semibold">Teaching prompts</h4>
          <ol className="list-decimal ml-5 text-sm space-y-2">
            <li>Have students draft a 1-page PRD for “Buy Now” with metrics and constraints.</li>
            <li>Ask them to produce an API snippet and 3 error codes with remediation tips.</li>
            <li>Run an ADR debate: Stripe vs PayPal; grade on clarity of implications.</li>
            <li>Write release notes for users and separate internal notes for Support/CS.</li>
          </ol>
        </div>
      </ModuleSection>

      <div className={`${card} p-4`}>
        <h3 className="font-bold text-yellow-800">Execution tips</h3>
        <ul className="list-disc ml-5 text-gray-700 mt-2 text-sm">
          <li>Keep docs living: link PRDs → tickets; update as decisions evolve.</li>
          <li>Own the narrative: lead with the “why” and quantify outcomes.</li>
          <li>Empathy check: read your doc as an engineer, a user, and Support.</li>
          <li>Measure: define 2–3 metrics per doc and review post-launch.</li>
        </ul>
      </div>
    </div>
  );
}