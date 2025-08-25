import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Arrow = ({ from, to, label, active }) => {
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
        className={`stroke-2 ${active ? "stroke-blue-500" : "stroke-gray-300"}`}
        strokeLinecap="round"
      />
      <polygon
        points={`${length - 12},-5 ${length},0 ${length - 12},5`}
        className={active ? "fill-blue-500" : "fill-gray-300"}
      />
      {label && (
        <text
          x={length / 2}
          y={-8}
          className="fill-gray-500 text-[10px] select-none"
        >
          {label}
        </text>
      )}
    </g>
  );
};

const Node = ({ id, title, subtitle, x, y, onClick, active, tone = "slate" }) => {
  return (
    <foreignObject x={x - 90} y={y - 45} width={180} height={90}>
      <div
        onClick={() => onClick?.(id)}
        className={`group cursor-pointer rounded-2xl border shadow-sm p-3 transition-all bg-white/90 backdrop-blur
        hover:shadow-md hover:-translate-y-[1px] border-${tone}-200`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`h-2.5 w-2.5 rounded-full ${
              active ? "bg-blue-500" : `bg-${tone}-300`
            }`}
          ></div>
          <div className="text-sm font-semibold text-slate-800">{title}</div>
        </div>
        <div className="text-xs text-slate-500 mt-1 leading-snug">{subtitle}</div>
      </div>
    </foreignObject>
  );
};

const Legend = () => (
  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
    <div className="flex items-center gap-1">
      <span className="inline-block h-2 w-2 rounded-full bg-blue-500" /> Active
      path
    </div>
    <div className="flex items-center gap-1">
      <span className="inline-block h-2 w-2 rounded-full bg-slate-400" /> Node
    </div>
    <div className="flex items-center gap-1">
      <span className="inline-block h-0.5 w-6 bg-blue-500" /> Request
    </div>
  </div>
);

const useSize = (ref) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const node = ref.current; // capture once
    if (!node) return;

    const obs = new ResizeObserver(([entry]) => {
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    obs.observe(node);
    return () => obs.disconnect();
  }, [ref]); // ✅ empty deps, safe because ref is stable

  return size;
};


const LayoutMonolith = (w, h) => {
  const cx = w / 2;
  const cy = h / 2;
  const nodes = [
    {
      id: "client",
      title: "Client",
      subtitle: "Browser / Mobile",
      x: cx,
      y: cy - 180,
      tone: "teal",
    },
    {
      id: "app",
      title: "Monolith App",
      subtitle: "Routes + Controllers + Business Logic",
      x: cx,
      y: cy - 20,
      tone: "indigo",
    },
    {
      id: "db",
      title: "Single Database",
      subtitle: "users, orders, order_items",
      x: cx,
      y: cy + 150,
      tone: "amber",
    },
  ];
  const points = Object.fromEntries(nodes.map((n) => [n.id, { x: n.x, y: n.y }]));
  const edges = [
    { id: "c->app", from: points.client, to: points.app, label: "HTTP" },
    { id: "app->db", from: points.app, to: points.db, label: "SQL" },
  ];
  return { nodes, edges, pathOrder: ["c->app", "app->db", "app->db", "c->app"] };
};

const LayoutMicro = (w, h) => {
  const cx = w / 2;
  const top = 120;
  const mid = h / 2;
  const bottom = h - 120;

  const nodes = [
    { id: "client", title: "Client", subtitle: "Browser / Mobile", x: cx, y: top, tone: "teal" },
    { id: "gw", title: "API Gateway", subtitle: "Routing, auth, rate limit", x: cx, y: mid - 60, tone: "violet" },
    { id: "svc-profile", title: "Profile Service", subtitle: "Profiles + Auth logic", x: cx - 260, y: mid + 40, tone: "indigo" },
    { id: "svc-order", title: "Order Service", subtitle: "Order lifecycle", x: cx, y: mid + 40, tone: "indigo" },
    { id: "svc-item", title: "Order Item Service", subtitle: "Items & pricing", x: cx + 260, y: mid + 40, tone: "indigo" },
    { id: "db-profile", title: "Profile DB", subtitle: "users, sessions", x: cx - 260, y: bottom, tone: "amber" },
    { id: "db-order", title: "Order DB", subtitle: "orders", x: cx, y: bottom, tone: "amber" },
    { id: "db-item", title: "Item DB", subtitle: "order_items", x: cx + 260, y: bottom, tone: "amber" },
  ];
  const P = Object.fromEntries(nodes.map((n) => [n.id, { x: n.x, y: n.y }]));
  const edges = [
    { id: "client->gw", from: P.client, to: P.gw, label: "HTTP" },
    { id: "gw->order", from: P.gw, to: P["svc-order"], label: "HTTP" },
    { id: "order->item", from: P["svc-order"], to: P["svc-item"], label: "HTTP / MQ" },
    { id: "order->db", from: P["svc-order"], to: P["db-order"], label: "SQL/NoSQL" },
    { id: "item->db", from: P["svc-item"], to: P["db-item"], label: "SQL/NoSQL" },
    { id: "gw->profile", from: P.gw, to: P["svc-profile"], label: "HTTP" },
    { id: "profile->db", from: P["svc-profile"], to: P["db-profile"], label: "SQL/NoSQL" },
  ];
  const pathOrder = ["client->gw", "gw->order", "order->db", "order->item", "item->db"];
  return { nodes, edges, pathOrder };
};

const Details = ({ mode, activeNode }) => {
  const map = {
    monolith: {
      client: { title: "Client", body: "Sends HTTP requests to the monolith (same host/app)." },
      app: { title: "Monolith App", body: "Single deployable unit with routes, controllers, business logic, and integrations." },
      db: { title: "Single Database", body: "One schema for all domains (users, orders, order_items). Simpler joins, tighter coupling." },
    },
    micro: {
      client: { title: "Client", body: "Sends HTTP requests via gateway (optionally direct)." },
      gw: { title: "API Gateway", body: "Routing, authentication, throttling, and observability." },
      "svc-profile": { title: "Profile Service", body: "Owns user profile domain and its data." },
      "svc-order": { title: "Order Service", body: "Handles order lifecycle. Emits events (e.g., OrderCreated)." },
      "svc-item": { title: "Order Item Service", body: "Manages items/prices; can be called sync or via async queue." },
      "db-profile": { title: "Profile DB", body: "Data private to profile service." },
      "db-order": { title: "Order DB", body: "Data private to order service." },
      "db-item": { title: "Item DB", body: "Data private to item service." },
    },
  };

  const d = map[mode]?.[activeNode];
  if (!d)
    return <div className="text-sm text-slate-600">Hover or click a node to see details.</div>;

  return (
    <div>
      <div className="text-sm font-semibold text-slate-800">{d.title}</div>
      <div className="text-sm text-slate-600 mt-1">{d.body}</div>
    </div>
  );
};

export default function SystemDesignVisualizer() {
  const [mode, setMode] = useState("monolith");
  const [activeNode, setActiveNode] = useState(null);
  const [step, setStep] = useState(0);
  const svgRef = useRef(null);
  const wrapRef = useRef(null);
  const { width, height } = useSize(wrapRef);

  const layout = useMemo(() => {
    if (!width || !height) return { nodes: [], edges: [], pathOrder: [] };
    return mode === "monolith"
      ? LayoutMonolith(width, height)
      : LayoutMicro(width, height);
  }, [mode, width, height]);

  const stepEdgeId = layout.pathOrder[step % Math.max(layout.pathOrder.length || 1, 1)];
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing || layout.pathOrder.length === 0) return;
    const t = setInterval(() => setStep((s) => s + 1), 1200);
    return () => clearInterval(t);
  }, [playing, layout.pathOrder.length]);

  const currentEdgesActive = new Set([stepEdgeId]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            System Design Visualizer
          </h1>
          <p className="text-slate-600 text-sm">
            Monolith vs Microservices — architecture, data ownership, and request
            flow
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-2xl p-1 bg-slate-100">
            <button
              className={`px-3 py-1.5 text-sm rounded-2xl ${
                mode === "monolith" ? "bg-white shadow" : "opacity-70"
              }`}
              onClick={() => setMode("monolith")}
            >
              Monolith
            </button>
            <button
              className={`px-3 py-1.5 text-sm rounded-2xl ${
                mode === "micro" ? "bg-white shadow" : "opacity-70"
              }`}
              onClick={() => setMode("micro")}
            >
              Microservices
            </button>
          </div>
          <button
            className="px-3 py-1.5 text-sm rounded-2xl bg-slate-900 text-white"
            onClick={() => setPlaying((p) => !p)}
            title="Play/pause request flow"
          >
            {playing ? "Pause Flow" : "Play Flow"}
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={wrapRef}
        className="relative w-full h-[560px] rounded-3xl border bg-gradient-to-b from-slate-50 to-white overflow-hidden"
      >
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path
                d="M 24 0 L 0 0 0 24"
                className="stroke-slate-100"
                strokeWidth="1"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Edges */}
          {layout.edges.map((e) => (
            <Arrow
              key={e.id}
              from={e.from}
              to={e.to}
              label={e.label}
              active={currentEdgesActive.has(e.id)}
            />
          ))}

          {/* Animated request dot */}
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
                    animate={{
                      cx: e.to.x,
                      cy: e.to.y,
                      opacity: 1,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: Math.min(Math.max(len / 300, 0.6), 1.8),
                      ease: "easeInOut",
                    }}
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
        <div className="absolute right-4 top-4 w-[260px] max-w-[42%] rounded-2xl border bg-white/90 backdrop-blur p-3 shadow">
          <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">
            Details
          </div>
          <Details
            mode={mode === "monolith" ? "monolith" : "micro"}
            activeNode={activeNode}
          />
          <div className="mt-3 border-t pt-3">
            <Legend />
          </div>
          <div className="mt-3 text-[11px] text-slate-500 leading-relaxed">
            Tip: Click different nodes to see ownership boundaries and read domain notes.
          </div>
        </div>

        {/* Footer caption */}
        <div className="absolute left-4 bottom-4 text-xs text-slate-500">
          <span className="font-medium">NFRs:</span> Monolith → simpler ops;
          Microservices → independent scaling, but distributed complexity.
        </div>
      </div>

      {/* Callouts */}
      <div className="grid sm:grid-cols-3 gap-3 mt-4">
        <div className="rounded-2xl border p-3">
          <div className="text-sm font-semibold text-slate-800">
            Data Ownership
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Monolith shares a single schema; microservices keep private databases
            per service.
          </p>
        </div>
        <div className="rounded-2xl border p-3">
          <div className="text-sm font-semibold text-slate-800">
            Communication
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Monolith calls are in-process; microservices use HTTP/gRPC or async
            queues.
          </p>
        </div>
        <div className="rounded-2xl border p-3">
          <div className="text-sm font-semibold text-slate-800">
            Deployability
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Monolith deploys as one unit; microservices deploy independently with
            versioning.
          </p>
        </div>
      </div>
    </div>
  );
}
