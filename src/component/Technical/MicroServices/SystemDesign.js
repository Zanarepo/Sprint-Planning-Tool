// SystemDesignFullPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import {
  FiChevronDown,
  FiChevronUp,
  FiSettings,

  FiLayers,
  
  FiCpu,
 
} from "react-icons/fi";

/*
Requirements satisfied:
- All content sections included (definition, core goals, HLD/LLD, concepts, monolith vs microservices)
- Visual flow diagrams for each core goal & concepts (SVG, responsive)
- Interactive Monolith vs Microservices visualizer with placeholders
- Mobile friendly, no horizontal overflow
- Tailwind styling, framer-motion for collapse
*/


// small helper: collapsible wrapper
function Collapsible({ id, title, icon, open, onToggle, children }) {
  return (
    <div className="border rounded-xl bg-white shadow-sm w-full overflow-hidden">
      <button
        onClick={() => onToggle(id)}
        className="flex items-center justify-between w-full px-5 py-3 text-left text-yellow-800 font-semibold hover:bg-yellow-50"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-lg">{title}</span>
        </div>
        <div>{open ? <FiChevronUp /> : <FiChevronDown />}</div>
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.28 }}
        className="px-5 py-4"
        style={{ overflow: "hidden" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* --- FlowCanvas: small responsive SVG flow with optional animated dot --- */
function FlowCanvas({ nodes = [], edges = [], highlight = [], height = 220 }) {
  // nodes: [{id, x,y, label, color}]
  // edges: [{from, to, label}]
  // highlight: array of edge ids to animate
  const viewW = 1200;
  const viewH = Math.max(240, height);
  // compute path coords by mapping ids to nodes
  const pos = Object.fromEntries(nodes.map((n) => [n.id, { x: n.x, y: n.y }]));

  return (
    <div className="w-full overflow-hidden rounded-lg border bg-white">
      <svg
        viewBox={`0 0 ${viewW} ${viewH}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="6" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#f59e0b" />
          </marker>
          <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* edges */}
        {edges.map((e, idx) => {
          const a = pos[e.from];
          const b = pos[e.to];
          if (!a || !b) return null;
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;
          const isHighlighted = highlight.includes(e.id);
          return (
            <g key={e.id || idx}>
              <line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={isHighlighted ? "#f59e0b" : "#d1d5db"}
                strokeWidth={isHighlighted ? 3.2 : 1.6}
                strokeDasharray={e.dashed ? "6 6" : undefined}
                markerEnd="url(#arrowhead)"
                strokeLinecap="round"
              />
              {e.label && (
                <text x={mx} y={my - 8} fontSize="10" textAnchor="middle" fill="#6b7280">
                  {e.label}
                </text>
              )}

              {/* animated dot for highlighted */}
              {isHighlighted && (
                <motion.circle
                  r={5}
                  fill="#f59e0b"
                  initial={{ cx: a.x, cy: a.y, opacity: 0 }}
                  animate={{ cx: b.x - (b.x - a.x) * 0.02, cy: b.y - (b.y - a.y) * 0.02, opacity: 1 }}
                  transition={{ duration: 0.9, repeat: Infinity, repeatType: "loop", repeatDelay: 0.25 }}
                />
              )}
            </g>
          );
        })}

        {/* nodes rectangles */}
        {nodes.map((n) => (
          <g key={n.id}>
            <rect
              x={n.x - 80}
              y={n.y - 28}
              rx="10"
              ry="10"
              width="160"
              height="56"
              fill={n.color || "#fde68a"}
              stroke="#d1d5db"
              strokeWidth="1"
              filter="url(#softShadow)"
            />
            <text x={n.x} y={n.y - 2} fontSize="12" fontWeight="600" textAnchor="middle" fill="#111827">
              {n.label}
            </text>
            {n.subtitle && (
              <text x={n.x} y={n.y + 12} fontSize="10" textAnchor="middle" fill="#374151">
                {n.subtitle}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

/* --- Monolith vs Microservices visualizer (interactive) --- */
function MonolithMicroVisualizer({ onExplain }) {
  const [selected, setSelected] = useState(null);

  const monolithNodes = [
    { id: "m-app", label: "Monolith App", x: 220, y: 120, color: "#fde68a", subtitle: "All modules in one codebase" },
    { id: "m-db", label: "Single DB", x: 220, y: 240, color: "#fecaca", subtitle: "profiles, orders, order_items" },
  ];
  const microNodes = [
    { id: "ms-gw", label: "API Gateway", x: 820, y: 60, color: "#fbcfe8" },
    { id: "ms-auth", label: "Auth Service", x: 700, y: 140, color: "#c7f9cc", subtitle: "Postgres (users)" },
    { id: "ms-order", label: "Order Service", x: 820, y: 140, color: "#c7f9cc", subtitle: "Order DB" },
    { id: "ms-item", label: "OrderItem Service", x: 940, y: 140, color: "#c7f9cc", subtitle: "Item DB" },
    { id: "ms-s3", label: "S3 / CDN", x: 820, y: 260, color: "#fde68a" },
  ];

  const monolithEdges = [
    { id: "m-client-app", from: { x: 90, y: 60 }, to: { x: 220, y: 120 }, label: "HTTP" },
    { id: "m-app-db", from: { x: 220, y: 160 }, to: { x: 220, y: 240 }, label: "SQL" },
  ];

  const microEdges = [
    { id: "c->gw", from: { x: 740, y: 20 }, to: { x: 820, y: 60 }, label: "HTTPS" },
    { id: "gw->auth", from: { x: 820, y: 80 }, to: { x: 700, y: 140 }, label: "/auth" },
    { id: "gw->order", from: { x: 820, y: 80 }, to: { x: 820, y: 140 }, label: "/orders" },
    { id: "gw->item", from: { x: 820, y: 80 }, to: { x: 940, y: 140 }, label: "/items" },
  ];

  return (
    <div className="w-full md:flex gap-6">
      <div className="flex-1 border rounded-lg bg-white p-4">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Monolith vs Microservices (Codebase)</h3>
        <p className="text-sm text-gray-600 mb-3">Click a card to see where its data is stored and what it owns.</p>

        <div className="w-full overflow-hidden rounded-lg border">
          <svg viewBox="0 0 1100 380" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <defs>
              <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 z" fill="#f59e0b" />
              </marker>
            </defs>

            {/* Monolith side */}
            <text x="120" y="32" fontSize="14" fontWeight="700" fill="#92400e">Monolith</text>
            <rect x="40" y="40" width="360" height="300" rx="8" fill="#fff7ed" stroke="#f59e0b" />
            {/* clients */}
            <rect x="60" y="60" width="120" height="40" rx="8" fill="#bfdbfe" stroke="#60a5fa" />
            <text x="120" y="86" fontSize="12" textAnchor="middle">Clients</text>

            {monolithNodes.map((n) => (
              <g key={n.id} onClick={() => { setSelected(n.id); onExplain?.(n.id); }}>
                <rect x={n.x - 90} y={n.y - 28} rx="8" width="180" height="56" fill={n.color} stroke="#d1d5db" />
                <text x={n.x} y={n.y - 2} fontSize="13" fontWeight="600" textAnchor="middle">{n.label}</text>
                {n.subtitle && <text x={n.x} y={n.y + 14} fontSize="10" textAnchor="middle" fill="#374151">{n.subtitle}</text>}
              </g>
            ))}

            {monolithEdges.map((e) => (
              <line
                key={e.id}
                x1={e.from.x}
                y1={e.from.y}
                x2={e.to.x}
                y2={e.to.y}
                stroke="#9ca3af"
                strokeWidth="2"
                markerEnd="url(#arr)"
              />
            ))}

            {/* Microservices side */}
            <text x="700" y="32" fontSize="14" fontWeight="700" fill="#075985">Microservices</text>
            <rect x="560" y="40" width="480" height="300" rx="8" fill="#f0fdf4" stroke="#86efac" />

            {microNodes.map((n) => (
              <g key={n.id} onClick={() => { setSelected(n.id); onExplain?.(n.id); }}>
                <rect x={n.x - 90} y={n.y - 28} rx="8" width="180" height="56" fill={n.color} stroke="#d1d5db" />
                <text x={n.x} y={n.y - 2} fontSize="13" fontWeight="600" textAnchor="middle">{n.label}</text>
                {n.subtitle && <text x={n.x} y={n.y + 14} fontSize="10" textAnchor="middle" fill="#374151">{n.subtitle}</text>}
              </g>
            ))}

            {microEdges.map((e) => (
              <line
                key={e.id}
                x1={e.from.x}
                y1={e.from.y}
                x2={e.to.x}
                y2={e.to.y}
                stroke="#9ca3af"
                strokeWidth="2"
                markerEnd="url(#arr)"
              />
            ))}

            {/* highlight box */}
            {selected && (
              <rect
                x="20"
                y="345"
                width="1060"
                height="28"
                rx="6"
                fill="#fffbeb"
                stroke="#f59e0b"
              />
            )}
            {selected && (
              <text x="40" y="365" fontSize="12" fill="#92400e">
                Selected: {selected} — click other cards to explore data ownership
              </text>
            )}
          </svg>
        </div>
      </div>

      <div className="w-full md:w-96 bg-white border rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">Details</h4>
        {!selected && <p className="text-sm text-gray-600">Click a card on the diagram to see details about ownership and storage.</p>}
        {selected === "m-app" && (
          <div className="text-sm text-gray-700">
            <p className="font-semibold">Monolith App</p>
            <p>Single deployable that contains routes for profiles, orders, and order_items. Uses single DB for all data.</p>
          </div>
        )}
        {selected === "m-db" && (
          <div className="text-sm text-gray-700">
            <p className="font-semibold">Single Database</p>
            <p>All tables (profiles, orders, order_items) reside here — easier joins, stronger coupling.</p>
          </div>
        )}
        {selected === "ms-gw" && (
          <div className="text-sm text-gray-700">
            <p className="font-semibold">API Gateway</p>
            <p>Routes external requests to appropriate microservices, enforces auth and rate limits.</p>
          </div>
        )}
        {selected === "ms-auth" && (
          <div className="text-sm text-gray-700">
            <p className="font-semibold">Auth Service</p>
            <p>Owns user data in Postgres, issues tokens. Scales independently.</p>
          </div>
        )}
        {selected === "ms-order" && (
          <div className="text-sm text-gray-700">
            <p className="font-semibold">Order Service</p>
            <p>Owns orders table (order DB). Emits events to message queue for downstream processing.</p>
          </div>
        )}
        {selected === "ms-item" && (
          <div className="text-sm text-gray-700">
            <p className="font-semibold">Order Item Service</p>
            <p>Owns order_items table and pricing logic; separate DB storage.</p>
          </div>
        )}
        {selected === "ms-s3" && (
          <div className="text-sm text-gray-700">
            <p className="font-semibold">S3 / CDN</p>
            <p>Stores binary assets (images) and serves them via CDN for performance.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* --- Data structures for flows of core goals & concepts --- */
const coreGoalsData = [
  {
    id: "scalability",
    title: "📈 Scalability",
    explainer:
      "Scalability is about handling more users or data. Techniques: horizontal scaling (add servers), load balancing, sharding, caching. Example: shard orders by customer_id.",
    nodes: [
      { id: "client", x: 120, y: 80, label: "Clients\n(Users)", color: "#bfdbfe" },
      { id: "gateway", x: 360, y: 80, label: "API Gateway", color: "#fce7f3" },
      { id: "lb", x: 600, y: 80, label: "Load Balancer", color: "#fef3c7" },
      { id: "svc-a", x: 840, y: 40, label: "Service A", color: "#d1fae5" },
      { id: "svc-b", x: 840, y: 120, label: "Service B", color: "#d1fae5" },
      { id: "db", x: 1080, y: 80, label: "Sharded DBs", color: "#fecaca" },
    ],
    edges: [
      { id: "e1", from: "client", to: "gateway", label: "HTTPS" },
      { id: "e2", from: "gateway", to: "lb", label: "route" },
      { id: "e3", from: "lb", to: "svc-a", label: "balanced" },
      { id: "e4", from: "lb", to: "svc-b", label: "balanced" },
      { id: "e5", from: "svc-a", to: "db", label: "writes -> shard1" },
      { id: "e6", from: "svc-b", to: "db", label: "writes -> shard2" },
    ],
  },
  {
    id: "reliability",
    title: "✅ Reliability & Availability",
    explainer:
      "Reliability means the system continues to work correctly; availability means it stays up. Use redundancy, replication, failover, monitoring.",
    nodes: [
      { id: "client", x: 120, y: 100, label: "Clients", color: "#bfdbfe" },
      { id: "gateway", x: 360, y: 100, label: "API Gateway", color: "#fce7f3" },
      { id: "lb", x: 600, y: 100, label: "Load Balancer", color: "#fef3c7" },
      { id: "svc1", x: 840, y: 60, label: "Service Instance A", color: "#d1fae5" },
      { id: "svc2", x: 840, y: 140, label: "Service Instance B", color: "#d1fae5" },
      { id: "replica", x: 1080, y: 100, label: "DB Replica", color: "#fecaca" },
    ],
    edges: [
      { id: "r1", from: "client", to: "gateway", label: "HTTPS" },
      { id: "r2", from: "gateway", to: "lb", label: "route" },
      { id: "r3", from: "lb", to: "svc1", label: "to healthy" },
      { id: "r4", from: "lb", to: "svc2", label: "to healthy" },
      { id: "r5", from: "svc1", to: "replica", label: "sync -> primary" },
      { id: "r6", from: "svc2", to: "replica", label: "sync -> primary" },
    ],
  },
  {
    id: "performance",
    title: "⚡ Performance & Efficiency",
    explainer:
      "Performance optimizes latency and resource usage. Use indexing, caching, denormalization, CDNs and tune queries.",
    nodes: [
      { id: "client", x: 120, y: 80, label: "Client", color: "#bfdbfe" },
      { id: "cdn", x: 360, y: 60, label: "CDN", color: "#e6f6ff" },
      { id: "gateway", x: 360, y: 120, label: "API Gateway", color: "#fce7f3" },
      { id: "service", x: 660, y: 100, label: "Service", color: "#d1fae5" },
      { id: "cache", x: 900, y: 60, label: "Redis Cache", color: "#fbcfe8" },
      { id: "db", x: 900, y: 140, label: "DB (Indexed)", color: "#fecaca" },
    ],
    edges: [
      { id: "p1", from: "client", to: "cdn", label: "static" },
      { id: "p2", from: "client", to: "gateway", label: "api" },
      { id: "p3", from: "gateway", to: "service", label: "call" },
      { id: "p4", from: "service", to: "cache", label: "read cache" },
      { id: "p5", from: "service", to: "db", label: "fallback read" },
    ],
  },
  {
    id: "maintainability",
    title: "🛠 Maintainability",
    explainer:
      "Maintainability keeps code easy to change. Use modular design, API contracts, documentation, CI/CD and tests.",
    nodes: [
      { id: "dev", x: 120, y: 100, label: "Developer", color: "#bfdbfe" },
      { id: "repo", x: 360, y: 100, label: "Repo / CI", color: "#eef2ff" },
      { id: "svc1", x: 660, y: 60, label: "Service A (v1)", color: "#d1fae5" },
      { id: "svc2", x: 660, y: 140, label: "Service B (v2)", color: "#d1fae5" },
      { id: "infra", x: 900, y: 100, label: "Infra (K8s)", color: "#fef3c7" },
    ],
    edges: [
      { id: "m1", from: "dev", to: "repo", label: "push/PR" },
      { id: "m2", from: "repo", to: "infra", label: "deploy" },
      { id: "m3", from: "repo", to: "svc1", label: "release" },
      { id: "m4", from: "repo", to: "svc2", label: "release" },
    ],
  },
  {
    id: "security",
    title: "🔒 Security",
    explainer:
      "Security protects data. Use authentication, authorization, encryption, validation, and rate limiting.",
    nodes: [
      { id: "client", x: 120, y: 100, label: "Client", color: "#bfdbfe" },
      { id: "gw", x: 360, y: 100, label: "API Gateway (Auth)", color: "#fce7f3" },
      { id: "auth", x: 600, y: 100, label: "Auth Service (JWT)", color: "#d1fae5" },
      { id: "db", x: 840, y: 100, label: "Encrypted DB", color: "#fecaca" },
    ],
    edges: [
      { id: "s1", from: "client", to: "gw", label: "HTTPS" },
      { id: "s2", from: "gw", to: "auth", label: "validate" },
      { id: "s3", from: "auth", to: "db", label: "store encrypted" },
    ],
  },
];

/* --- Common concepts flows (compact) --- */
const conceptsData = [
  {
    id: "load-balancing",
    title: "⚡ Load Balancing",
    explainer: "Distributes traffic to multiple instances and performs health checks; algorithms: round-robin, least-connections, IP hash.",
    nodes: [
      { id: "client", x: 120, y: 100, label: "Client", color: "#bfdbfe" },
      { id: "lb", x: 360, y: 100, label: "Load Balancer", color: "#fef3c7" },
      { id: "svc1", x: 600, y: 60, label: "Instance A", color: "#d1fae5" },
      { id: "svc2", x: 600, y: 140, label: "Instance B", color: "#d1fae5" },
    ],
    edges: [
      { id: "lb1", from: "client", to: "lb", label: "https" },
      { id: "lb2", from: "lb", to: "svc1", label: "forward" },
      { id: "lb3", from: "lb", to: "svc2", label: "forward" },
    ],
  },
  {
    id: "caching",
    title: "🗄️ Caching",
    explainer: "Cache stores frequent reads in memory to avoid DB hits. Strategies: cache-aside, write-through, write-back.",
    nodes: [
      { id: "svc", x: 420, y: 100, label: "Service", color: "#d1fae5" },
      { id: "cache", x: 660, y: 80, label: "Redis (cache)", color: "#fbcfe8" },
      { id: "db", x: 660, y: 140, label: "DB", color: "#fecaca" },
      { id: "client", x: 180, y: 100, label: "Client", color: "#bfdbfe" },
    ],
    edges: [
      { id: "c1", from: "client", to: "svc", label: "API" },
      { id: "c2", from: "svc", to: "cache", label: "read cache" },
      { id: "c3", from: "svc", to: "db", label: "read DB if miss" },
    ],
  },
  {
    id: "database-design",
    title: "💾 Database Design",
    explainer: "Choose SQL for relations/transactions, NoSQL for flexible schema and high write throughput. Use indexing, sharding and replication.",
    nodes: [
      { id: "svc", x: 200, y: 120, label: "Service", color: "#d1fae5" },
      { id: "sql", x: 520, y: 60, label: "Postgres (profiles, orders)", color: "#fecaca" },
      { id: "nosql", x: 520, y: 180, label: "DynamoDB (photos)", color: "#fecaca" },
    ],
    edges: [
      { id: "d1", from: "svc", to: "sql", label: "relational writes" },
      { id: "d2", from: "svc", to: "nosql", label: "media metadata write" },
    ],
  },
  {
    id: "message-queues",
    title: "📨 Message Queues",
    explainer: "Queues like Kafka decouple producers and consumers, enabling asynchronous processing and smoothing spikes.",
    nodes: [
      { id: "producer", x: 160, y: 100, label: "Producer (Order svc)", color: "#d1fae5" },
      { id: "mq", x: 460, y: 100, label: "Kafka Queue", color: "#ffd7a3" },
      { id: "consumer", x: 760, y: 100, label: "Consumer (Notification)", color: "#fce7f3" },
    ],
    edges: [
      { id: "q1", from: "producer", to: "mq", label: "push event" },
      { id: "q2", from: "mq", to: "consumer", label: "consume" },
    ],
  },
  {
    id: "micro-vs-mono",
    title: "🖥️ Monolith vs Microservices",
    explainer: "Monolith: one codebase/database. Microservices: many small services, independent DBs, more operational complexity.",
    nodes: [
      { id: "monolith", x: 200, y: 120, label: "Monolith\n(single app)", color: "#fde68a" },
      { id: "micro", x: 620, y: 120, label: "Microservices\n(many small apps)", color: "#c7f9cc" },
    ],
    edges: [{ id: "mm1", from: "monolith", to: "micro", label: "evolution (strangler pattern)" }],
  },
];

/* --- Main component --- */
export default function SystemDesignFullPage() {
  const [open, setOpen] = useState({
    definition: true,
    coreGoals: true,
    hldlld: false,
    concepts: true,
    monolithMicro: true,
    conclusion: false,
  });

  const toggle = (id) => setOpen((s) => ({ ...s, [id]: !s[id] }));

  // convenience: map coreGoalsData by id

  return (
    <div className="w-full min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-800">System Design Complete Guide</h1>
          <p className="mt-2 text-gray-600 max-w-3xl mx-auto">
            System design transforms business requirements into a scalable, reliable, maintainable technical architecture.
            Below you will find definitions, goals, HLD/LLD, core concepts and interactive visuals for teaching.
          </p>
        </header>

        {/* Definition */}
        <Collapsible
          id="definition"
          title="📘 What is System Design?"
          icon={<FiLayers className="w-5 h-5 text-yellow-800" />}
          open={open.definition}
          onToggle={toggle}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-sm text-gray-700">
              <p>
                <strong>System design</strong> is the process of converting requirements into a high-level and low-level architecture
                that is scalable, reliable, maintainable and secure. It defines components, data stores, integration points and non-functional
                requirements (latency, throughput, availability).
              </p>
              <ul className="list-disc ml-5 mt-3 text-gray-700">
                <li>HLD: Components, service boundaries, data flows (who talks to who).</li>
                <li>LLD: Data schemas, algorithms, class and API definitions.</li>
              </ul>
            </div>
            <div>
              <FlowCanvas
                nodes={[
                  { id: "u", x: 140, y: 100, label: "User", color: "#bfdbfe" },
                  { id: "gw", x: 420, y: 100, label: "API Gateway", color: "#fce7f3" },
                  { id: "svc", x: 700, y: 100, label: "Service", color: "#d1fae5" },
                  { id: "db", x: 980, y: 100, label: "DB", color: "#fecaca" },
                ]}
                edges={[
                  { id: "d1", from: "u", to: "gw", label: "HTTPS" },
                  { id: "d2", from: "gw", to: "svc", label: "API call" },
                  { id: "d3", from: "svc", to: "db", label: "SQL" },
                ]}
                highlight={["d1"]}
                height={160}
              />
            </div>
          </div>
        </Collapsible>

        {/* Core goals */}
        <Collapsible
          id="coreGoals"
          title="🔑 Core Goals of System Design"
          icon={<FiSettings className="w-5 h-5 text-yellow-800" />}
          open={open.coreGoals}
          onToggle={toggle}
        >
          <div className="grid grid-cols-1 gap-6">
            {coreGoalsData.map((g) => (
              <div key={g.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border rounded-lg p-4">
                <div className="md:col-span-2 space-y-2">
                  <h3 className="font-semibold text-yellow-800">{g.title}</h3>
                  <p className="text-sm text-gray-700">{g.explainer}</p>
                  <ul className="list-disc ml-5 text-sm text-gray-700">
                    {/* some tailored quick bullets */}
                    {g.id === "scalability" && (
                      <>
                        <li>Use load balancers to distribute traffic.</li>
                        <li>Shard heavy tables (e.g., orders) to multiple DBs.</li>
                      </>
                    )}
                    {g.id === "reliability" && (
                      <>
                        <li>Replicate DBs to read replicas and set up failover.</li>
                        <li>Use health checks on instances for automatic routing.</li>
                      </>
                    )}
                    {g.id === "performance" && (
                      <>
                        <li>Cache frequently read objects (profiles) in Redis.</li>
                        <li>Serve photos via CDN instead of hitting the origin.</li>
                      </>
                    )}
                    {g.id === "maintainability" && (
                      <>
                        <li>Prefer small services with clear API contracts.</li>
                        <li>Automate testing and deployment (CI/CD).</li>
                      </>
                    )}
                    {g.id === "security" && (
                      <>
                        <li>Use TLS everywhere and JWT/OAuth for auth.</li>
                        <li>Encrypt sensitive columns and rotate keys.</li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="w-full">
                  <FlowCanvas nodes={g.nodes} edges={g.edges} highlight={g.edges.map((e) => e.id)} height={200} />
                </div>
              </div>
            ))}
          </div>
        </Collapsible>

    {/* HLD & LLD */}
<Collapsible
  id="hldlld"
  title="🧩 HLD & LLD (High/Low Level Design)"
  icon={<FiLayers className="w-5 h-5 text-yellow-800" />}
  open={open.hldlld}
  onToggle={toggle}
>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Left: Text */}
    <div className="space-y-3">
      <h3 className="font-semibold text-yellow-800">High-Level Design</h3>
      <p className="text-sm text-gray-700">
        HLD shows components and interactions (API Gateway, Load Balancer, Services, Databases, Queue). 
        It answers <em>"what talks to what"</em>.
      </p>

      <h3 className="font-semibold text-yellow-800">Low-Level Design</h3>
      <p className="text-sm text-gray-700">
        LLD shows implementation details: DB schemas, classes, API signatures, 
        and sequence diagrams — it answers <em>"how it's built"</em>.
      </p>
    </div>

    {/* Right: Flow Diagram */}
    <div className="h-96 border rounded-lg">
      <ReactFlow
        nodes={[
          // HLD (Top Layer)
          { id: "client", position: { x: 50, y: 20 }, data: { label: "Client" }, style: { border: "2px solid #2563eb", padding: 6, borderRadius: 8 } },
          { id: "gateway", position: { x: 220, y: 20 }, data: { label: "API Gateway" }, style: { border: "2px solid #9333ea", padding: 6, borderRadius: 8 } },
          { id: "lb", position: { x: 390, y: 20 }, data: { label: "Load Balancer" }, style: { border: "2px solid #eab308", padding: 6, borderRadius: 8 } },
          { id: "service", position: { x: 560, y: 0 }, data: { label: "User Service" }, style: { border: "2px solid #16a34a", padding: 6, borderRadius: 8 } },
          { id: "db", position: { x: 750, y: 20 }, data: { label: "Database" }, style: { border: "2px solid #dc2626", padding: 6, borderRadius: 8 } },

          // LLD (Bottom Layer)
          { id: "schema", position: { x: 250, y: 200 }, data: { label: "DB Schema (users, orders)" }, style: { border: "2px dashed #dc2626", padding: 6, borderRadius: 8 } },
          { id: "class", position: { x: 500, y: 200 }, data: { label: "Class: User {id, name}" }, style: { border: "2px dashed #2563eb", padding: 6, borderRadius: 8 } },
          { id: "api", position: { x: 750, y: 200 }, data: { label: "API: POST /login" }, style: { border: "2px dashed #16a34a", padding: 6, borderRadius: 8 } },
        ]}
        edges={[
          // HLD
          { id: "e1", source: "client", target: "gateway", animated: true },
          { id: "e2", source: "gateway", target: "lb", animated: true },
          { id: "e3", source: "lb", target: "service", animated: true },
          { id: "e4", source: "service", target: "db", animated: true },

          // LLD
          { id: "e5", source: "db", target: "schema", animated: true },
          { id: "e6", source: "service", target: "class", animated: true },
          { id: "e7", source: "gateway", target: "api", animated: true },
        ]}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  </div>
</Collapsible>

        {/* Common concepts */}
        <Collapsible
          id="concepts"
          title="⚙️ Common System Design Concepts"
          icon={<FiCpu className="w-5 h-5 text-yellow-800" />}
          open={open.concepts}
          onToggle={toggle}
        >
          <div className="grid grid-cols-1 gap-5">
            {conceptsData.map((c) => (
              <div key={c.id} className="border rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="md:col-span-2">
                  <h4 className="font-semibold text-yellow-800">{c.title}</h4>
                  <p className="text-sm text-gray-700">{c.explainer}</p>
                </div>
                <div className="w-full">
                  <FlowCanvas nodes={c.nodes} edges={c.edges} highlight={c.edges.map((e) => e.id)} height={160} />
                </div>
              </div>
            ))}
          </div>
        </Collapsible>

        {/* Monolith vs Microservices visualizer */}
        <Collapsible
          id="monolithMicro"
          title="🖥️ Monolith vs Microservices (Codebase + Data Ownership)"
          icon={<FiLayers className="w-5 h-5 text-yellow-800" />}
          open={open.monolithMicro}
          onToggle={toggle}
        >
          <MonolithMicroVisualizer
            onExplain={() => {
              // no-op — MonolithMicroVisualizer shows its own details
            }}
          />
          <div className="mt-4 text-sm text-gray-700">
            <p>
              <strong>Tip:</strong> Monolith has easier local development; microservices give independent scaling and ownership but add operational overhead (service discovery, monitoring).
            </p>
            <ul className="list-disc ml-5 mt-2">
              <li>Monolith: single DB (easier joins, but harder to scale).</li>
              <li>Microservices: each service owns its DB, more boundaries and eventual consistency patterns.</li>
            </ul>
          </div>
        </Collapsible>

        {/* Conclusion & Next steps */}
        <Collapsible
          id="conclusion"
          title="✅ Conclusion & Next Steps"
          icon={<FiSettings className="w-5 h-5 text-yellow-800" />}
          open={open.conclusion}
          onToggle={toggle}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-yellow-800">Conclusion</h4>
              <p className="text-sm text-gray-700">Microservices empower scale and team independence; HLD and LLD keep design structured. Choose pragmatically.</p>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800">Next Steps</h4>
              <ul className="list-disc ml-5 text-sm text-gray-700">
                <li>Start small: one service at a time (Strangler pattern).</li>
                <li>Add monitoring, tracing, and automated tests early.</li>
                <li>Practice designing HLD, then LLD for real features.</li>
              </ul>
            </div>
          </div>
        </Collapsible>

        {/* footer */}
       
      </div>
    </div>
  );
}
