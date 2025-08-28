import React, { useState } from "react";
import ReactFlow, { Background, MiniMap, Controls, useNodesState, useEdgesState } from "reactflow";
import "reactflow/dist/style.css";
import { AnimatePresence, motion } from "framer-motion";
import { FaBook, FaCode, FaBug, FaTasks, FaCloud, FaBalanceScale, FaDollarSign, FaLightbulb, FaUsers } from "react-icons/fa";
import TradeofffsDecision from './TradeofffsDecision'

/* -------------------------- styling helpers --------------------------- */
const card = "bg-white rounded-2xl border shadow-sm";
const p = "text-sm md:text-[0.95rem] text-gray-700 leading-relaxed";

/* ------------------------- ReactFlow helpers ------------------------- */
const nodeBase = (w = 160) => ({
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
const makeNode = (id, label, pos, color = "#f8fafc", w = 160) => {
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
  style: { stroke: highlighted ? "#f97316" : "#9ca3af", strokeWidth: highlighted ? 2.5 : 1.5 },
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
    <div className={`w-full ${height} ${card} overflow-hidden mt-4`}>
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
const ModuleSection = ({ id, title, icon: Icon, initialOpen = false, children }) => {
  const [open, setOpen] = useState(initialOpen);
  return (
    <section className={`${card} p-0`} id={id}>
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex items-center justify-between w-full px-5 py-3 text-left font-semibold text-yellow-800 hover:bg-yellow-50 rounded-2xl"
        aria-expanded={open}
        aria-controls={`${id}-content`}
      >
        <span className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-yellow-800" />
          <span className="text-lg">{title}</span>
        </span>
        <span className="text-gray-600" aria-hidden>
          {open ? "▲" : "▼"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-content`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="px-5 pb-5"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* -------------------------- Diagram data ------------------------------ */
const triangleNodes = [
  makeNode("n_scope", "Scope\n(features)", { x: 0, y: 60 }, "#dbeafe"),
  makeNode("n_time", "Time\n(speed to market)", { x: 220, y: -10 }, "#fef3c7"),
  makeNode("n_quality", "Quality\n(reliability, polish)", { x: 220, y: 130 }, "#dcfce7"),
  makeNode("n_outcome", "Outcome\n(product result)", { x: 440, y: 60 }, "#fce7f3"),
];
const triangleEdges = [
  makeEdge("et1", "n_scope", "n_outcome", "adds features", true),
  makeEdge("et2", "n_time", "n_outcome", "faster release"),
  makeEdge("et3", "n_quality", "n_outcome", "fewer bugs"),
];

const costBenefitNodes = [
  makeNode("cb_cost", "Cost\n(engineer-weeks, infra)", { x: 0, y: 60 }, "#fee2e2"),
  makeNode("cb_benefit", "Benefit\n(revenue, retention)", { x: 300, y: 60 }, "#d1fae5"),
  makeNode("cb_dec", "Decision\n(build vs buy)", { x: 600, y: 60 }, "#e0f2fe"),
];
const costBenefitEdges = [
  makeEdge("cb1", "cb_cost", "cb_dec", "costs"),
  makeEdge("cb2", "cb_benefit", "cb_dec", "value"),
];

const shortLongNodes = [
  makeNode("st_short", "Short-term\n(quick fixes)", { x: 0, y: 40 }, "#fef3c7"),
  makeNode("st_long", "Long-term\n(scalability)", { x: 0, y: 140 }, "#dbeafe"),
  makeNode("st_td", "Tech Debt\n(interest)", { x: 320, y: 90 }, "#fee2e2"),
  makeNode("st_out", "Business Impact\n(cost/time)", { x: 560, y: 90 }, "#dcfce7"),
];
const shortLongEdges = [
  makeEdge("sl1", "st_short", "st_td", "creates"),
  makeEdge("sl2", "st_long", "st_td", "reduces"),
  makeEdge("sl3", "st_td", "st_out", "increases cost"),
];

const uxNodes = [
  makeNode("ux_exp", "User Experience\n(intuitive)", { x: 0, y: 40 }, "#fef3c7"),
  makeNode("ux_comp", "Technical Complexity\n(engineering effort)", { x: 300, y: 40 }, "#fee2e2"),
  makeNode("ux_trade", "Trade Decision\n(accept complexity?)", { x: 600, y: 40 }, "#e0f2fe"),
];
const uxEdges = [
  makeEdge("ux1", "ux_exp", "ux_trade", "value to users"),
  makeEdge("ux2", "ux_comp", "ux_trade", "cost to implement"),
];

const riskNodes = [
  makeNode("rk_innov", "Innovation\n(new tech/AI)", { x: 0, y: 40 }, "#f0f9ff"),
  makeNode("rk_risk", "Risk\n(unknowns)", { x: 300, y: 40 }, "#fee2e2"),
  makeNode("rk_decide", "Decision\n(pilot vs full)", { x: 600, y: 40 }, "#e9d5ff"),
];
const riskEdges = [
  makeEdge("rk1", "rk_innov", "rk_decide", "potential upside"),
  makeEdge("rk2", "rk_risk", "rk_decide", "failure risk"),
];

const lifecycleNodes = [
  makeNode("lc_ideation", "Ideation & Planning", { x: 0, y: 40 }, "#fff7ed", 180),
  makeNode("lc_dev", "Development & Implementation", { x: 240, y: 40 }, "#f0f9ff", 220),
  makeNode("lc_test", "Testing & Validation", { x: 480, y: 40 }, "#ecfccb", 180),
  makeNode("lc_launch", "Launch & Iteration", { x: 720, y: 40 }, "#fde68a", 180),
  makeNode("lc_maint", "Maintenance & Scaling", { x: 960, y: 40 }, "#e6fffa", 200),
];
const lifecycleEdges = [
  makeEdge("lc1", "lc_ideation", "lc_dev", "prioritize features"),
  makeEdge("lc2", "lc_dev", "lc_test", "coverage vs speed"),
  makeEdge("lc3", "lc_test", "lc_launch", "quality gates"),
  makeEdge("lc4", "lc_launch", "lc_maint", "scale/feedback"),
];

/* -------------------------- Memo generator --------------------------- */
function generateOnePager({ title, decision, tradeoffs, businessImpact, timeline }) {
  return `ONE-PAGER: ${title}\n\nDECISION:\n${decision}\n\nTRADE-OFFS CONSIDERED:\n${tradeoffs}\n\nBUSINESS IMPACT:\n${businessImpact}\n\nTIMELINE:\n${timeline}\n\nRECOMMENDATION:\nRecommend proceeding with the selected approach and tracking outcome metrics (adoption, error-rate, MTTI).`;
}

/* ------------------------- Main Module ------------------------------- */
export default function TradeOffsModule() {
  const [memoInput, setMemoInput] = useState({
    title: "Dashboard: Basic vs Real-time",
    decision: "Ship basic dashboard (precomputed metrics)",
    tradeoffs: "Scope vs Time vs Quality; Cost vs Benefit; Innovation vs Risk",
    businessImpact: "Estimated $150K Q1 revenue, faster time-to-market",
    timeline: "4 weeks for basic, 12 weeks for real-time",
  });
  const [memoText, setMemoText] = useState("");

  return (
    <div className="w-full mx-auto px-4 md:px-6 py-6 space-y-6 bg-gray-50 mt-6 max-w-4xl">
      {/* Header */}
      <div className={`${card} p-5`}>
        <h1 className="text-2xl md:text-3xl font-bold text-yellow-800 mb-2">Trade-Offs: Concepts & Application — Complete Module</h1>
        <p className={p}>
          Trade-offs are the heart of product decisions. This module explains key concepts, shows when they apply across the product lifecycle, and gives examples, exercises, and a 1-pager memo generator you can use when teaching or pitching.
        </p>
      </div>

      {/* Each concept is now a full-width stacked section (no side-by-side) */}

      <ModuleSection id="what" title="🔹 What are Trade-Offs in Product Development?" icon={FaBook} initialOpen={true}>
        <p className={p}>
          Trade-offs occur when choosing one option implies sacrificing another (time, scope, cost, quality). They arise from limited resources and shape the product trajectory.
        </p>
      </ModuleSection>

      <ModuleSection title="Scope vs. Quality vs. Time (The Iron Triangle)" icon={FaBalanceScale} initialOpen={true}>
        <div className="space-y-4">
          <p>
            You can rarely optimize for all three at once. Improving one often compromises another.
          </p>
          <ul className="list-disc pl-5">
            <li><strong>Definition:</strong> The Iron Triangle: optimize for scope, quality, or time — usually only two at once.</li>
            <li><strong>Example:</strong> Adding more features (scope) may delay launch (time) or reduce testing (quality).</li>
            <li><strong>Implication:</strong> PMs must prioritize strategically, e.g., ship MVP fast vs polish for retention.</li>
          </ul>
          <FlowPanel nodes={triangleNodes} edges={triangleEdges} height="h-64" />
        </div>
      </ModuleSection>

      <ModuleSection id="cost" title="Cost vs. Benefit" icon={FaDollarSign}>
        <p className={p}><strong>Definition:</strong> Every feature has costs and expected benefits. Decisions require comparing them quantitatively.</p>
        <ul className="list-disc ml-5 text-gray-700 text-sm space-y-1">
          <li><strong>Example:</strong> Build custom auth (10 engineer-weeks) vs. third-party (faster, vendor risk).</li>
          <li><strong>Implication:</strong> PMs should quantify benefit (revenue, retention) and cost (effort, infra).</li>
        </ul>
        <FlowPanel nodes={costBenefitNodes} edges={costBenefitEdges} height="h-56" />
      </ModuleSection>

      <ModuleSection id="shortlong" title="Short-Term Wins vs. Long-Term Sustainability" icon={FaCode}>
        <p className={p}><strong>Definition:</strong> Quick solutions accelerate delivery but create technical debt; long-term investments improve maintainability but take longer.</p>
        <ul className="list-disc ml-5 text-gray-700 text-sm space-y-1">
          <li><strong>Example:</strong> Hardcoding a value to meet a deadline vs. building a reusable API for future integrations.</li>
          <li><strong>Implication:</strong> Balance urgency with planned refactor windows and measure debt impact.</li>
        </ul>
        <FlowPanel nodes={shortLongNodes} edges={shortLongEdges} height="h-56" />
      </ModuleSection>

      <ModuleSection id="ux" title="User Experience vs. Technical Complexity" icon={FaBug}>
        <p className={p}><strong>Definition:</strong> Better UX often requires more complex architecture; PMs must assess user value vs. engineering cost.</p>
        <ul className="list-disc ml-5 text-gray-700 text-sm space-y-1">
          <li><strong>Example:</strong> Real-time dashboard improves engagement but needs event-driven systems.</li>
          <li><strong>Implication:</strong> Use prototypes and analytics to validate UX investment before committing large engineering effort.</li>
        </ul>
        <FlowPanel nodes={uxNodes} edges={uxEdges} height="h-56" />
      </ModuleSection>

      <ModuleSection id="risk" title="Risk vs. Innovation" icon={FaLightbulb}>
        <p className={p}><strong>Definition:</strong> Innovative features differentiate products but add uncertainty — pilot first where risk is high.</p>
        <ul className="list-disc ml-5 text-gray-700 text-sm space-y-1">
          <li><strong>Example:</strong> Integrate AI recommendations vs. deterministic rules.</li>
          <li><strong>Implication:</strong> Prefer experiments/pilots; stage rollout and guardrails to limit blast radius.</li>
        </ul>
        <FlowPanel nodes={riskNodes} edges={riskEdges} height="h-56" />
      </ModuleSection>

      <ModuleSection id="lifecycle" title="Application Across Product Lifecycle" icon={FaTasks}>
        <p className={p}><strong>Trade-offs occur at every phase. Below are practical examples and when to apply each trade-off lens.</strong></p>
        <ul className="list-disc ml-5 text-gray-700 text-sm space-y-2">
          <li><strong>Ideation & Planning:</strong> Scope selection — use RICE to prioritize features for MVP.</li>
          <li><strong>Development & Implementation:</strong> Speed vs. quality — prototype with refactor plan.</li>
          <li><strong>Testing & Validation:</strong> Coverage vs time — use canaries & feature flags.</li>
          <li><strong>Launch & Iteration:</strong> MVP vs polished — measure and iterate.</li>
          <li><strong>Maintenance & Scaling:</strong> Allocate sprint capacity for debt reduction.</li>
        </ul>
        <FlowPanel nodes={lifecycleNodes} edges={lifecycleEdges} height="h-56" />
      </ModuleSection>

      <ModuleSection id="pm_skills" title="How PMs Use Trade-Off Skills" icon={FaUsers}>
        <div className="space-y-2">
          <p className={p}><strong>Frame Decisions in Business Terms</strong> — translate technical choices to revenue, risk, and time impact.</p>
          <p className={p}><strong>Prioritize with Data and Frameworks</strong> — RICE, MoSCoW, Opportunity Scoring.</p>
          <p className={p}><strong>Communicate Trade-Offs Clearly</strong> — write PRDs and decision docs with assumptions & rollback plans.</p>
          <p className={p}><strong>Partner with Engineering</strong> — involve engineers in estimates and trade-off analysis.</p>
          <p className={p}><strong>Measure & Iterate</strong> — pick 2–3 metrics (adoption, error rate, lead-time) to judge decisions.</p>
        </div>
      </ModuleSection>

      <ModuleSection id="example" title="Practical Example: Real-time Analytics Dashboard" icon={FaCloud}>
        <p className={p}><strong>Scenario:</strong> Build a dashboard for a SaaS product.</p>
        <ul className="list-disc ml-5 text-gray-700 text-sm space-y-1">
          <li><strong>Trade-offs:</strong> Scope vs Time; Quality vs Cost; Innovation vs Risk.</li>
          <li><strong>PM approach:</strong> Use RICE to prioritize basic dashboard (4w) and plan real-time in Q2 if metrics support.</li>
        </ul>
        <FlowPanel
          nodes={[
            makeNode("ex_basic", "Basic (precomputed)\n4 weeks", { x: 0, y: 40 }, "#dbeafe", 160),
            makeNode("ex_real", "Real-time\n12 weeks", { x: 260, y: 40 }, "#fde68a", 160),
            makeNode("ex_cost", "Cost & Risk\n(Infra, complexity)", { x: 520, y: 40 }, "#fee2e2", 180),
            makeNode("ex_biz", "Revenue upside\n($150K vs +$50K)", { x: 780, y: 40 }, "#dcfce7", 160),
          ]}
          edges={[
            makeEdge("ex1", "ex_basic", "ex_biz", "fast to market", true),
            makeEdge("ex2", "ex_real", "ex_biz", "higher premium"),
            makeEdge("ex3", "ex_real", "ex_cost", "higher cost"),
            makeEdge("ex4", "ex_basic", "ex_cost", "lower cost"),
          ]}
          height="h-56"
        />
        <p className="mt-3 text-sm text-gray-700">Outcome example: ship basic dashboard, track adoption (70%), error rate &lt; 1%, revenue $150K; use data to justify real-time later.</p>
      </ModuleSection>

      <ModuleSection id="resources" title="Resources & Exercises" icon={FaBook}>
        <div className="space-y-2">
          <p className={p}><strong>Books:</strong> "Inspired" (Marty Cagan), "The Art of Scalability", "Lean Analytics".</p>
          <p className={p}><strong>Courses:</strong> Coursera: Digital Product Management; Pluralsight: Product Management - Prioritization.</p>
          <div className="mt-3">
            <h4 className="font-semibold">Exercises (class-ready)</h4>
            <ol className="list-decimal ml-5 text-sm space-y-2">
              <li>Trade-off analysis: pick 3 trade-offs and write a 300-word memo.</li>
              <li>Prioritization: create a RICE-scored backlog of 5 features.</li>
              <li>Stakeholder pitch: 5-min presentation on MVP vs full feature.</li>
              <li>Metrics plan: define 3 metrics to judge a trade-off and sketch a dashboard.</li>
            </ol>
          </div>
        </div>
      </ModuleSection>

      <ModuleSection id="memo" title="1-Pager Memo Generator (for stakeholders)" icon={FaTasks}>
        <p className={p}>Fill fields and click <strong>Generate</strong> to create a one-page summary you can paste into an email or PRD.</p>

        <div className="grid grid-cols-1 gap-2 mt-3">
          <input className="p-2 border rounded" value={memoInput.title} onChange={(e) => setMemoInput((s) => ({ ...s, title: e.target.value }))} />
          <textarea className="p-2 border rounded h-20" value={memoInput.decision} onChange={(e) => setMemoInput((s) => ({ ...s, decision: e.target.value }))} />
          <textarea className="p-2 border rounded h-20" value={memoInput.tradeoffs} onChange={(e) => setMemoInput((s) => ({ ...s, tradeoffs: e.target.value }))} />
          <input className="p-2 border rounded" value={memoInput.businessImpact} onChange={(e) => setMemoInput((s) => ({ ...s, businessImpact: e.target.value }))} />
          <input className="p-2 border rounded" value={memoInput.timeline} onChange={(e) => setMemoInput((s) => ({ ...s, timeline: e.target.value }))} />

          <div className="flex gap-2">
            <button className="px-4 py-2 bg-yellow-700 text-white rounded" onClick={() => setMemoText(generateOnePager(memoInput))}>Generate</button>
            <button className="px-4 py-2 border rounded" onClick={() => { setMemoInput({ title: "", decision: "", tradeoffs: "", businessImpact: "", timeline: "" }); setMemoText(""); }}>Clear</button>
          </div>

          {memoText && (
            <div>
              <h4 className="font-semibold mt-2">Generated One-Pager</h4>
              <textarea readOnly className="w-full p-2 border rounded h-40" value={memoText} />
            </div>
          )}
        </div>
      </ModuleSection>
      <TradeofffsDecision/>
     
    </div>
  );
}