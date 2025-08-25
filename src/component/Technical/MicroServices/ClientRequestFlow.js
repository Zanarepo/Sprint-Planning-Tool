import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Interactive E‑commerce Microservices Flow Visualizer (React + Tailwind)
 * - Shows multiple clients -> API Gateway -> Load Balancers -> Service Discovery -> Service instances
 * - Click nodes for details; animated request path with play/pause
 * - Scenarios: Place Order, Browse Catalog, Login/Auth
 * - No React hook dependency warnings (refs handled correctly)
 */

// ---- Small helpers ----
const toneClasses = {
  slate: { dot: "bg-slate-300", border: "border-slate-200" },
  teal: { dot: "bg-teal-300", border: "border-teal-200" },
  violet: { dot: "bg-violet-300", border: "border-violet-200" },
  indigo: { dot: "bg-indigo-300", border: "border-indigo-200" },
  amber: { dot: "bg-amber-300", border: "border-amber-200" },
  rose: { dot: "bg-rose-300", border: "border-rose-200" },
  emerald: { dot: "bg-emerald-300", border: "border-emerald-200" },
  sky: { dot: "bg-sky-300", border: "border-sky-200" },
};

const Arrow = ({ from, to, label, active, dashed = false }) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const angle = Math.atan2(dy, dx);
  const length = Math.hypot(dx, dy);

  return (
    <g transform={`translate(${from.x}, ${from.y}) rotate(${(angle * 180) / Math.PI})`}>
      <line
        x1={0}
        y1={0}
        x2={length - 12}
        y2={0}
        className={`stroke-2 ${active ? "stroke-blue-500" : "stroke-gray-300"} ${dashed ? "[stroke-dasharray:6_6]" : ""}`}
        strokeLinecap="round"
      />
      <polygon
        points={`${length - 12},-5 ${length},0 ${length - 12},5`}
        className={active ? "fill-blue-500" : "fill-gray-300"}
      />
      {label && (
        <text x={length / 2} y={-8} className="fill-gray-500 text-[10px] select-none">
          {label}
        </text>
      )}
    </g>
  );
};

const Node = ({ id, title, subtitle, x, y, onClick, active, tone = "slate" }) => {
  const tc = toneClasses[tone] || toneClasses.slate;
  return (
    <foreignObject x={x - 92} y={y - 48} width={184} height={96}>
      <div
        onClick={() => onClick?.(id)}
        className={`group cursor-pointer rounded-2xl border ${tc.border} shadow-sm p-3 transition-all bg-white/90 backdrop-blur hover:shadow-md hover:-translate-y-[1px]`}
      >
        <div className="flex items-center gap-2">
          <div className={`h-2.5 w-2.5 rounded-full ${active ? "bg-blue-500" : tc.dot}`}></div>
          <div className="text-sm font-semibold text-slate-800">{title}</div>
        </div>
        <div className="text-xs text-slate-600 mt-1 leading-snug">{subtitle}</div>
      </div>
    </foreignObject>
  );
};

const Legend = () => (
  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
    <div className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-blue-500"/> Active path</div>
    <div className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-slate-400"/> Node</div>
    <div className="flex items-center gap-1"><span className="inline-block h-0.5 w-6 bg-blue-500"/> Request</div>
    <div className="flex items-center gap-1"><span className="inline-block h-0.5 w-6 bg-gray-300"/> Dashed: discovery/meta</div>
  </div>
);

// Resize observer without ESLint warning
const useSize = (ref) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const node = ref.current; // capture once
    if (!node) return;

    const obs = new ResizeObserver(([entry]) => {
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });

    obs.observe(node);
    return () => obs.disconnect();
  }, [ref]); // ref is stable; no dependency on ref.current
  return size;
};

// ---- Layout ----
const buildLayout = (w, h) => {
  const cx = w / 2;
  const top = 80;
  const row1 = top + 40; // clients
  const row2 = row1 + 110; // gateway
  const row3 = row2 + 110; // LBs + discovery
  const row4 = row3 + 120; // service instances
  const row5 = row4 + 110; // data stores

  const nodes = [
    { id: "client-web", title: "Web Client", subtitle: "Browser / SPA", x: cx - 180, y: row1, tone: "teal" },
    { id: "client-mobile", title: "Mobile App", subtitle: "iOS / Android", x: cx + 180, y: row1, tone: "teal" },

    { id: "gateway", title: "API Gateway", subtitle: "Routing • AuthZ • Throttling", x: cx, y: row2, tone: "violet" },

    { id: "lb-auth", title: "LB: Auth", subtitle: "Checks health & spreads load", x: cx - 360, y: row3, tone: "sky" },
    { id: "lb-order", title: "LB: Order", subtitle: "Spreads order traffic", x: cx - 120, y: row3, tone: "sky" },
    { id: "lb-product", title: "LB: Product", subtitle: "Spreads catalog traffic", x: cx + 120, y: row3, tone: "sky" },
    { id: "lb-payment", title: "LB: Payment", subtitle: "Spreads payment traffic", x: cx + 360, y: row3, tone: "sky" },

    { id: "discovery", title: "Service Discovery", subtitle: "Eureka / Consul / etcd", x: cx, y: row3 + 70, tone: "amber" },

    // service instances
    { id: "auth-1", title: "Auth v1", subtitle: "Instance A", x: cx - 420, y: row4, tone: "indigo" },
    { id: "auth-2", title: "Auth v1", subtitle: "Instance B", x: cx - 300, y: row4, tone: "indigo" },

    { id: "order-1", title: "Order v2", subtitle: "Instance A", x: cx - 180, y: row4, tone: "indigo" },
    { id: "order-2", title: "Order v2", subtitle: "Instance B", x: cx - 60, y: row4, tone: "indigo" },

    { id: "product-1", title: "Product v3", subtitle: "Instance A", x: cx + 60, y: row4, tone: "indigo" },
    { id: "product-2", title: "Product v3", subtitle: "Instance B", x: cx + 180, y: row4, tone: "indigo" },

    { id: "payment-1", title: "Payment v1", subtitle: "Instance A", x: cx + 300, y: row4, tone: "indigo" },
    { id: "payment-2", title: "Payment v1", subtitle: "Instance B", x: cx + 420, y: row4, tone: "indigo" },

    // databases (optional visual targets)
    { id: "db-auth", title: "Auth DB", subtitle: "users, sessions", x: cx - 360, y: row5, tone: "rose" },
    { id: "db-order", title: "Order DB", subtitle: "orders", x: cx - 120, y: row5, tone: "rose" },
    { id: "db-product", title: "Product DB", subtitle: "catalog, prices", x: cx + 120, y: row5, tone: "rose" },
    { id: "db-payment", title: "Payment DB", subtitle: "payments, txns", x: cx + 360, y: row5, tone: "rose" },
  ];

  const P = Object.fromEntries(nodes.map((n) => [n.id, { x: n.x, y: n.y }]));

  const edges = [
    // clients to gateway
    { id: "web->gw", from: P["client-web"], to: P.gateway, label: "HTTPS" },
    { id: "mob->gw", from: P["client-mobile"], to: P.gateway, label: "HTTPS" },

    // gateway to service LBs
    { id: "gw->lb-auth", from: P.gateway, to: P["lb-auth"], label: "/auth" },
    { id: "gw->lb-order", from: P.gateway, to: P["lb-order"], label: " /orders" },
    { id: "gw->lb-product", from: P.gateway, to: P["lb-product"], label: "/products" },
    { id: "gw->lb-payment", from: P.gateway, to: P["lb-payment"], label: "/payments" },

    // LBs consult discovery (dashed informational links)
    { id: "lb-auth->disc", from: P["lb-auth"], to: P.discovery, label: "query", dashed: true },
    { id: "lb-order->disc", from: P["lb-order"], to: P.discovery, label: "query", dashed: true },
    { id: "lb-product->disc", from: P["lb-product"], to: P.discovery, label: "query", dashed: true },
    { id: "lb-payment->disc", from: P["lb-payment"], to: P.discovery, label: "query", dashed: true },

    // discovery returns instances (dashed back)
    { id: "disc->auth-1", from: P.discovery, to: P["auth-1"], label: "instances", dashed: true },
    { id: "disc->order-1", from: P.discovery, to: P["order-1"], label: "instances", dashed: true },
    { id: "disc->product-1", from: P.discovery, to: P["product-1"], label: "instances", dashed: true },
    { id: "disc->payment-1", from: P.discovery, to: P["payment-1"], label: "instances", dashed: true },

    // LBs to chosen instances (actual request path candidates)
    { id: "lb-auth->auth-1", from: P["lb-auth"], to: P["auth-1"], label: "HTTPS" },
    { id: "lb-auth->auth-2", from: P["lb-auth"], to: P["auth-2"], label: "HTTPS" },

    { id: "lb-order->order-1", from: P["lb-order"], to: P["order-1"], label: "HTTPS" },
    { id: "lb-order->order-2", from: P["lb-order"], to: P["order-2"], label: "HTTPS" },

    { id: "lb-product->product-1", from: P["lb-product"], to: P["product-1"], label: "HTTPS" },
    { id: "lb-product->product-2", from: P["lb-product"], to: P["product-2"], label: "HTTPS" },

    { id: "lb-payment->payment-1", from: P["lb-payment"], to: P["payment-1"], label: "HTTPS" },
    { id: "lb-payment->payment-2", from: P["lb-payment"], to: P["payment-2"], label: "HTTPS" },

    // instances to DBs
    { id: "auth-1->db-auth", from: P["auth-1"], to: P["db-auth"], label: "SQL/NoSQL" },
    { id: "order-1->db-order", from: P["order-1"], to: P["db-order"], label: "SQL/NoSQL" },
    { id: "product-1->db-product", from: P["product-1"], to: P["db-product"], label: "SQL/NoSQL" },
    { id: "payment-1->db-payment", from: P["payment-1"], to: P["db-payment"], label: "SQL/NoSQL" },

    // service-to-service calls (e.g., order calls product & payment)
    { id: "order-1->product-1", from: P["order-1"], to: P["product-1"], label: "HTTP/gRPC" },
    { id: "order-1->payment-1", from: P["order-1"], to: P["payment-1"], label: "HTTP/gRPC" },
  ];

  // Scenarios (animated flow sequences)
  const scenarios = {
    "Place Order (Web)": [
      "web->gw",
      "gw->lb-auth", "lb-auth->auth-1", "auth-1->db-auth",
      "gw->lb-order", "lb-order->order-1", "order-1->db-order",
      "order-1->product-1", "product-1->db-product",
      "order-1->payment-1", "payment-1->db-payment",
    ],
    "Browse Catalog (Mobile)": [
      "mob->gw",
      "gw->lb-product", "lb-product->product-1", "product-1->db-product",
    ],
    "Login/Auth": [
      "web->gw",
      "gw->lb-auth", "lb-auth->auth-1", "auth-1->db-auth",
    ],
  };

  return { nodes, edges, scenarios };
};

const Details = ({ id }) => {
  const info = {
    "client-web": { t: "Web Client", b: "Browser/SPA sending HTTPS requests." },
    "client-mobile": { t: "Mobile App", b: "Native app calling HTTPS APIs." },
    gateway: { t: "API Gateway", b: "Single entry point: routing, authN/Z, rate limiting, observability." },
    discovery: { t: "Service Discovery", b: "Registry of healthy instances (Eureka/Consul/etcd)." },
    "lb-auth": { t: "Load Balancer (Auth)", b: "Balances traffic and checks health for Auth instances." },
    "lb-order": { t: "Load Balancer (Order)", b: "Distributes /orders traffic to Order instances." },
    "lb-product": { t: "Load Balancer (Product)", b: "Distributes /products requests." },
    "lb-payment": { t: "Load Balancer (Payment)", b: "Distributes payment traffic and performs health checks." },
    "auth-1": { t: "Auth Service", b: "Validates credentials, issues tokens; owns user/session data." },
    "auth-2": { t: "Auth Service", b: "Redundant instance for HA/scale." },
    "order-1": { t: "Order Service", b: "Creates & manages orders; calls Product/Payment." },
    "order-2": { t: "Order Service", b: "Redundant instance for HA/scale." },
    "product-1": { t: "Product Service", b: "Catalog, pricing, availability." },
    "product-2": { t: "Product Service", b: "Redundant instance for HA/scale." },
    "payment-1": { t: "Payment Service", b: "Charges customer, stores payment txns." },
    "payment-2": { t: "Payment Service", b: "Redundant instance for HA/scale." },
    "db-auth": { t: "Auth DB", b: "Users & sessions (private to Auth)." },
    "db-order": { t: "Order DB", b: "Orders (private to Order)." },
    "db-product": { t: "Product DB", b: "Catalog data (private to Product)." },
    "db-payment": { t: "Payment DB", b: "Payment transactions (private to Payment)." },
  };
  const d = info[id];
  if (!d) return <div className="text-sm text-slate-600">Click a node to see details.</div>;
  return (
    <div>
      <div className="text-sm font-semibold text-slate-800">{d.t}</div>
      <div className="text-sm text-slate-600 mt-1">{d.b}</div>
    </div>
  );
};

export default function EcommerceMicroservicesFlow() {
  const [scenario, setScenario] = useState("Place Order (Web)");
  const [activeNode, setActiveNode] = useState(null);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);

  const wrapRef = useRef(null);
  const { width, height } = useSize(wrapRef);

  const layout = useMemo(() => {
    if (!width || !height) return { nodes: [], edges: [], scenarios: {} };
    return buildLayout(width, height);
  }, [width, height]);

  // determine active edge for current step
  const path = layout.scenarios[scenario] || [];
  const activeEdgeId = path.length ? path[step % path.length] : null;

  useEffect(() => {
    if (!playing || path.length === 0) return;
    const t = setInterval(() => setStep((s) => s + 1), 1100);
    return () => clearInterval(t);
  }, [playing, path.length]);

  const currentEdgesActive = new Set(activeEdgeId ? [activeEdgeId] : []);

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-yellow-800 text-slate-900">E‑commerce Microservices Flow</h1>
          <p className="text-slate-600 text-sm">Clients → API Gateway → Load Balancers → Service Discovery → Service Instances → DBs</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            className="text-sm rounded-2xl border px-3 py-1.5 bg-white shadow-sm"
            value={scenario}
            onChange={(e) => { setScenario(e.target.value); setStep(0); }}
          >
            {Object.keys(layout.scenarios).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button
            className="px-3 py-1.5 text-sm rounded-2xl bg-slate-900 text-white"
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? "Pause Flow" : "Play Flow"}
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div ref={wrapRef} className="relative w-full h-[680px] rounded-3xl border bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Grid background */}
          <defs>
            <pattern id="grid-ms" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" className="stroke-slate-100" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-ms)" />

          {/* Edges */}
          {layout.edges.map((e) => (
            <Arrow key={e.id} from={e.from} to={e.to} label={e.label} active={currentEdgesActive.has(e.id)} dashed={e.dashed} />
          ))}

          {/* Animated request dot along active edge */}
          <AnimatePresence>
            {layout.edges
              .filter((e) => currentEdgesActive.has(e.id))
              .map((e) => {
                const dx = e.to.x - e.from.x;
                const dy = e.to.y - e.from.y;
                const len = Math.hypot(dx, dy);
                return (
                  <motion.circle
                    key={`dot-${e.id}-${step}`}
                    r={5}
                    initial={{ cx: e.from.x, cy: e.from.y, opacity: 0 }}
                    animate={{ cx: e.to.x, cy: e.to.y, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: Math.min(Math.max(len / 300, 0.6), 1.6), ease: "easeInOut" }}
                    className="fill-blue-500"
                  />
                );
              })}
          </AnimatePresence>

          {/* Nodes */}
          {layout.nodes.map((n) => (
            <Node
              key={n.id}
              id={n.id}
              title={n.title}
              subtitle={n.subtitle}
              x={n.x}
              y={n.y}
              tone={n.tone}
              active={activeNode === n.id}
              onClick={(id) => setActiveNode(id)}
            />
          ))}
        </svg>

        {/* Side panel */}
        <div className="absolute right-4 top-4 w-[280px] max-w-[44%] rounded-2xl border bg-white/90 backdrop-blur p-3 shadow">
          <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">Details</div>
          <Details id={activeNode} />
          <div className="mt-3 border-t pt-3">
            <Legend />
          </div>
          <div className="mt-3 text-[11px] text-slate-500 leading-relaxed">
            Tip: Use the scenario dropdown and click nodes to learn what each layer does.
          </div>
        </div>

        {/* Footer caption */}
        <div className="absolute left-4 bottom-4 text-xs text-slate-500">
          <span className="font-medium">Flow notes:</span> LBs consult discovery for healthy instances; gateway routes by path; services own their data.
        </div>
      </div>

      {/* Callouts */}
      <div className="grid sm:grid-cols-3 gap-3 mt-4">
        <div className="rounded-2xl border p-3">
          <div className="text-sm font-semibold text-slate-800">API Gateway</div>
          <p className="text-sm text-slate-600 mt-1">Entry point; enforces auth, rate limits, and routes traffic to the right load balancer.</p>
        </div>
        <div className="rounded-2xl border p-3">
          <div className="text-sm font-semibold text-slate-800">Load Balancers</div>
          <p className="text-sm text-slate-600 mt-1">Spread traffic across instances; perform health checks; integrate with discovery.</p>
        </div>
        <div className="rounded-2xl border p-3">
          <div className="text-sm font-semibold text-slate-800">Service Discovery</div>
          <p className="text-sm text-slate-600 mt-1">Keeps registry of live instances so LBs (or clients) can route reliably.</p>
        </div>
      </div>
    </div>
  );
}
