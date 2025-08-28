// src/components/SystemAuthVisualizer.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DataProtection from "./DataProtection";


const WIDTH = 1100;
const HEIGHT = 520;

// Node definitions + positions (kept readable and spaced to avoid overlap)
const baseNodes = [
  // Clients
  { id: "mobile", label: "📱 Mobile\nClient", x: 80, y: 60, type: "client" },
  { id: "web", label: "💻 Web\nClient", x: 80, y: 160, type: "client" },

  // API gateway & discovery & LB
  { id: "gateway", label: "🛂 API Gateway", x: 320, y: 110, type: "gateway" },
  { id: "discovery", label: "🔎 Service\nDiscovery", x: 320, y: 260, type: "service" },
  { id: "lb", label: "⚖️ Load\nBalancer", x: 520, y: 110, type: "lb" },

  // services
  { id: "users", label: "👤 Users\nService\n(DB: PostgreSQL)", x: 760, y: 10, type: "service" },
  { id: "photos", label: "📸 Photos\nService\n(Storage: S3 + CDN)", x: 760, y: 130, type: "service" },
  { id: "feed", label: "📰 Feed\nService\n(Cache: Redis)", x: 760, y: 250, type: "service" },
  { id: "notifications", label: "🔔 Notifications\nService\n(Queue: Kafka)", x: 760, y: 370, type: "service" },

  // storage
  { id: "s3", label: "🗄️ S3 + CDN\nPhoto Storage", x: 980, y: 130, type: "cdn" },
  { id: "pg", label: "💾 PostgreSQL\n(Users)", x: 980, y: 10, type: "db" },
  { id: "redis", label: "⚡ Redis\nCache (Feed)", x: 980, y: 250, type: "cache" },
  { id: "kafka", label: "📩 Kafka\nQueue", x: 980, y: 370, type: "mq" },
];

// edges mapping (sourceId -> targetId), provide id string used in flows arrays below
const edgeList = [
  { id: "mobile->gateway", from: "mobile", to: "gateway", label: "HTTPS" },
  { id: "web->gateway", from: "web", to: "gateway", label: "HTTPS" },

  { id: "gateway->discovery", from: "gateway", to: "discovery", label: "query" },
  { id: "gateway->lb", from: "gateway", to: "lb", label: "route" },

  { id: "lb->users", from: "lb", to: "users", label: "HTTPS" },
  { id: "lb->photos", from: "lb", to: "photos", label: "HTTPS" },
  { id: "lb->feed", from: "lb", to: "feed", label: "HTTPS" },
  { id: "lb->notifications", from: "lb", to: "notifications", label: "HTTPS" },

  { id: "users->pg", from: "users", to: "pg", label: "SQL" },
  { id: "photos->s3", from: "photos", to: "s3", label: "PUT / GET" },
  { id: "photos->feed", from: "photos", to: "feed", label: "event" },

  { id: "feed->redis", from: "feed", to: "redis", label: "cache read/write" },
  { id: "feed->photos", from: "feed", to: "photos", label: "meta fetch" },
  { id: "feed->notifications", from: "feed", to: "notifications", label: "notify event" },

  { id: "notifications->kafka", from: "notifications", to: "kafka", label: "publish" },
];

// flows (ordered list of edge ids) — clicking a flow animates edges in order
const flows = {
  registerUser: {
    label: "📝 Register (User Signup)",
    edges: ["web->gateway", "gateway->discovery", "gateway->lb", "lb->users", "users->pg"],
    description:
      "Client sends sign-up request → API Gateway validates and consults discovery → Gateway routes to Load Balancer → Users Service stores profile in PostgreSQL. Optionally emits notification to Kafka.",
  },
  uploadPhoto: {
    label: "📸 Upload Photo",
    edges: [
      "mobile->gateway",
      "gateway->discovery",
      "gateway->lb",
      "lb->photos",
      "photos->s3",
      "photos->feed",
      "feed->redis",
      "feed->notifications",
      "notifications->kafka",
    ],
    description:
      "Client uploads photo via Gateway -> routed to Photos Service -> stores photo in S3 -> emits events to Feed Service -> Feed caches metadata and notifies via Notifications Service which publishes to Kafka.",
  },
  viewFeed: {
    label: "📰 View Feed",
    edges: ["mobile->gateway", "gateway->lb", "lb->feed", "feed->redis", "feed->photos"],
    description:
      "Client requests feed -> Gateway->LB->Feed Service -> Feed reads cache (Redis) and may fetch photo metadata from Photos Service, images served from CDN (S3+CDN).",
  },
  followUser: {
    label: "👤 Follow User",
    edges: ["web->gateway", "gateway->lb", "lb->users", "users->feed", "feed->notifications", "notifications->kafka"],
    description:
      "Follow action routed to Users Service which updates relationships and triggers Feed Service & Notifications (events -> Kafka).",
  },
  placeOrder: {
    label: "🛒 Place Order (e-commerce example)",
    edges: [
      "web->gateway",
      "gateway->lb",
      "lb->users",
      "users->pg",
      // imagine order service sits in place of users here if built
    ],
    description:
      "Client places order -> Gateway routes to Order Service (represented with Users Service here) -> DB persists. Real systems include order, payment, inventory microservices.",
  },
};

// node details for RHS panel step-by-step information
const nodeDetails = {
  mobile: {
    title: "Mobile Client",
    short: "Origin of requests (app sends HTTPS requests).",
    details: [
      "Sends HTTPS request (Authorization: Bearer <JWT> or OAuth token).",
      "May upload media (multipart) or request JSON endpoints.",
      "Uses retries, exponential backoff on failures.",
    ],
  },
  web: {
    title: "Web Client",
    short: "Browser / SPA origin for requests.",
    details: [
      "Sends HTTPS requests, uses cookies or local storage for tokens.",
      "Often uses short-lived JWTs + refresh tokens for sessions.",
      "For real-time features, may also open websockets.",
    ],
  },
  gateway: {
    title: "API Gateway",
    short: "Single entry point: routing, auth, rate-limiting, caching.",
    details: [
      "Validates authentication tokens (OIDC / JWT / API key).",
      "Applies rate limiting and IP throttling.",
      "Performs edge caching and composition if needed.",
      "Queries Service Discovery to find healthy services.",
    ],
  },
  discovery: {
    title: "Service Discovery",
    short: "Registry of healthy service instances (Consul / Eureka / etcd).",
    details: [
      "Services register/unregister themselves on start/stop.",
      "Gateway or LB queries registry to locate instances.",
      "Enables dynamic scaling (instances can come & go).",
    ],
  },
  lb: {
    title: "Load Balancer",
    short: "Distributes traffic to service instances based on health and algorithm.",
    details: [
      "Performs health checks and routes to healthy instances.",
      "Implements algorithms (round-robin, least connections, geo).",
      "May terminate TLS and forward HTTP to instances.",
    ],
  },
  users: {
    title: "Users Service",
    short: "Manages user profiles and authentication data (Postgres).",
    details: [
      "Handles create/read/update of profile data.",
      "Persists to PostgreSQL; emits events for other services.",
      "May cache frequently read fields in Redis.",
    ],
  },
  photos: {
    title: "Photos Service",
    short: "Handles image uploads, metadata, and triggers feed updates.",
    details: [
      "Stores objects in S3; serves via CDN for low latency.",
      "Stores metadata (photo_id, user_id, caption) in NoSQL (or SQL).",
      "Sends events to the Feed Service to update timelines.",
    ],
  },
  feed: {
    title: "Feed Service",
    short: "Generates timelines and serves feed content (uses Redis).",
    details: [
      "Reads/writes feed entries to Redis for fast access.",
      "Computes or retrieves aggregated feed data (fan-out patterns).",
      "Calls Photos Service to get image metadata when needed.",
    ],
  },
  notifications: {
    title: "Notifications Service",
    short: "Handles notifications and publishes to message queue (Kafka).",
    details: [
      "Consumes events (e.g., new follower, new post) and dispatches notifications.",
      "Publishes durable messages to Kafka for downstream processing.",
    ],
  },
  s3: {
    title: "S3 + CDN",
    short: "Durable storage for images, served via CDN.",
    details: [
      "Stores large binary objects (photos & videos).",
      "CDN caches objects close to users to reduce latency.",
    ],
  },
  pg: {
    title: "PostgreSQL",
    short: "Relational DB for user/profile data and transactional needs.",
    details: [
      "Stores normalized user profiles, indexes on user_id.",
      "Support ACID transactions for critical operations.",
    ],
  },
  redis: {
    title: "Redis Cache",
    short: "Fast in-memory cache for hot feed data.",
    details: [
      "Stores precomputed feeds or recent posts for fast reads.",
      "Used to avoid frequent DB hits for feed requests.",
    ],
  },
  kafka: {
    title: "Kafka (Message Queue)",
    short: "Durable event streaming for async processing.",
    details: [
      "Buffers and distributes events (e.g., notifications, feed updates).",
      "Consumers process events independently (resilience & scaling).",
    ],
  },
};

// Helper: find node by id
const findNode = (id) => baseNodes.find((n) => n.id === id);

// compute an SVG path (straight line) between two nodes
const pathFor = (fromId, toId) => {
  const a = findNode(fromId);
  const b = findNode(toId);
  if (!a || !b) return "";
  const x1 = a.x + 70; // box center offset (node width ~140)
  const y1 = a.y + 25;
  const x2 = b.x - 10; // approach target
  const y2 = b.y + 25;
  return `M ${x1} ${y1} L ${x2} ${y2}`;
};

// small utility to compute intermediate positions for animation
const coordsBetween = (fromId, toId) => {
  const a = findNode(fromId);
  const b = findNode(toId);
  const x1 = a.x + 70;
  const y1 = a.y + 25;
  const x2 = b.x - 10;
  const y2 = b.y + 25;
  return { x1, y1, x2, y2 };
};

// OAuth scope table rows
const oauthRows = [
  { scope: "read:user", description: "Basic profile info (name, email)", example: "Sign in with Google" },
  { scope: "write:photos", description: "Upload photos on behalf of user", example: "Photo apps" },
  { scope: "read:transactions", description: "View past transactions", example: "Finance aggregators" },
  { scope: "write:inventory", description: "Modify inventory (supplier integration)", example: "Supplier systems (rare)" },
  { scope: "admin:all", description: "Full account access - internal only", example: "Admin dashboards" },
];

export default function SystemAuthVisualizer() {
  const [selectedFlow, setSelectedFlow] = useState(null); // key from flows
  const [highlightedEdges, setHighlightedEdges] = useState([]); // edge ids currently highlighted
  const [clickedNode, setClickedNode] = useState(null); // node id
  const [tick, setTick] = useState(0); // used for moving dot retrigger
  const containerRef = useRef(null);

  // Highlight edges when flow changes
  useEffect(() => {
    if (!selectedFlow) {
      setHighlightedEdges([]);
      return;
    }
    const edges = flows[selectedFlow].edges || [];
    setHighlightedEdges(edges);
    // restart animation tick
    setTick((t) => t + 1);
  }, [selectedFlow]);

  // Clicking on a node opens RHS panel with node details
  const onClickNode = (id) => {
    setClickedNode(id);
  };

  // Compute animated dots for a given flow — create one dot per edge in that flow
  const AnimatedDots = ({ flowKey }) => {
    if (!flowKey) return null;
    const edgeIds = flows[flowKey].edges;
    // Show up to 6 dots simultaneously (adjust timing per edge index)
    return (
      <>
        {edgeIds.map((edgeId, idx) => {
          const edgeDef = edgeList.find((e) => e.id === edgeId);
          if (!edgeDef) return null;
          const { x1, y1, x2, y2 } = coordsBetween(edgeDef.from, edgeDef.to);
          const distance = Math.hypot(x2 - x1, y2 - y1);
          const duration = Math.min(Math.max(distance / 120, 0.6), 2.2); // seconds
          // Slight stagger so dots move in sequence
          const delay = idx * 0.35;
          const key = `${edgeId}-${tick}`;
          return (
            <motion.circle
              key={key}
              r={6}
              fill="#f97316"
              initial={{ cx: x1, cy: y1, opacity: 0 }}
              animate={{ cx: x2, cy: y2, opacity: 1 }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration,
                ease: "linear",
                delay,
              }}
            />
          );
        })}
      </>
    );
  };

  // Render edges: grey by default, highlighted edges colored and thicker
  const renderEdges = () =>
    edgeList.map((e) => {
      const active = highlightedEdges.includes(e.id);
      const pathD = pathFor(e.from, e.to);
      return (
        <g key={e.id} className="edge" opacity={active ? 1 : 0.8}>
          <path
            d={pathD}
            fill="none"
            stroke={active ? "#ff7a18" : "#9ca3af"}
            strokeWidth={active ? 3.2 : 1.6}
            strokeLinecap="round"
            markerEnd="url(#arrow)"
          />
          {/* label */}
          {(() => {
            // compute midpoint to place label
            const a = findNode(e.from);
            const b = findNode(e.to);
            const mx = (a.x + b.x) / 2 + 30;
            const my = (a.y + b.y) / 2 + 20;
            return (
              <text key={`${e.id}-lbl`} x={mx} y={my} fontSize="11" fill="#4b5563">
                {e.label}
              </text>
            );
          })()}
        </g>
      );
    });

  // Render nodes as rounded rects with text; clickable
  const renderNodes = () =>
    baseNodes.map((n) => {
      const bg =
        n.type === "client"
          ? "#bfdbfe"
          : n.type === "gateway"
          ? "#c7d2fe"
          : n.type === "lb"
          ? "#fef3c7"
          : n.type === "db"
          ? "#fee2e2"
          : n.type === "cache"
          ? "#fce7f3"
          : n.type === "mq"
          ? "#fff7ed"
          : n.type === "cdn"
          ? "#e5e7eb"
          : "#dcfce7";
      const stroke =
        n.type === "client"
          ? "#1e40af"
          : n.type === "gateway"
          ? "#0369a1"
          : n.type === "lb"
          ? "#f59e0b"
          : n.type === "db"
          ? "#b91c1c"
          : n.type === "cache"
          ? "#be185d"
          : n.type === "mq"
          ? "#c2410c"
          : n.type === "cdn"
          ? "#6b7280"
          : "#15803d";
      return (
        <g
          key={n.id}
          className="node-group"
          onClick={() => onClickNode(n.id)}
          style={{ cursor: "pointer" }}
        >
          <rect
            x={n.x}
            y={n.y}
            rx={12}
            ry={12}
            width={160}
            height={50}
            fill={bg}
            stroke={stroke}
            strokeWidth={2}
            filter="drop-shadow(0 1px 2px rgba(0,0,0,0.08))"
          />
          <foreignObject x={n.x + 10} y={n.y + 6} width={140} height={40}>
            <div className="text-xs leading-tight" style={{ whiteSpace: "pre-wrap", color: "#111827" }}>
              {n.label}
            </div>
          </foreignObject>
        </g>
      );
    });

  return (
    <div className="w-full min-h-screen p-4 bg-gray-50">
      {/* Header */}
      <div className="max-w-[1200px] mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-yellow-800 text-center">System & Auth Flow Studio</h1>
          <p className="text-center text-sm text-gray-600 mt-2">
            Interactive visual module showing API Gateway, Service Discovery, Load Balancers, Microservices, Databases, Caches, Queues and OAuth flows.
          </p>
        </header>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap gap-2">
            {Object.keys(flows).map((k) => (
              <button
                key={k}
                onClick={() => setSelectedFlow(k === selectedFlow ? null : k)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold shadow ${
                  k === selectedFlow ? "bg-yellow-800 text-white" : "bg-white text-yellow-800"
                }`}
              >
                {flows[k].label}
              </button>
            ))}
          </div>

          <div className="mt-2 sm:mt-0">
            <small className="text-gray-500">Tip: tap nodes to view step-by-step details; choose a flow to animate data movement.</small>
          </div>
        </div>

        {/* Main content: visualizer + RHS panel */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Visualizer panel */}
          <div
            ref={containerRef}
            className="flex-1 bg-white rounded-xl shadow p-3 overflow-hidden"
            style={{ minHeight: 420 }}
          >
            <div className="w-full h-full overflow-hidden">
              <svg
                viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                preserveAspectRatio="xMidYMid meet"
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 z" fill="#374151" />
                  </marker>
                </defs>

                {/* grid background subtle */}
                <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="url(#bg)" />
                <g>{renderEdges()}</g>

                {/* animated dots for selected flow */}
                <g>{selectedFlow && <AnimatedDots flowKey={selectedFlow} />}</g>

                {/* nodes */}
                <g>{renderNodes()}</g>
              </svg>
            </div>

            {/* Flow description below visualizer (desktop & mobile) */}
            <div className="mt-3">
              <AnimatePresence>
                {selectedFlow && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="bg-yellow-50 p-3 rounded-md border border-yellow-100 text-sm text-gray-700"
                  >
                    <div className="font-semibold">{flows[selectedFlow].label}</div>
                    <div className="text-xs mt-1">{flows[selectedFlow].description}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RHS panel: details + OAuth table + decision guide */}
          <aside className="w-full lg:w-96 bg-white rounded-xl shadow p-4 overflow-auto" style={{ maxHeight: 620 }}>
            {/* Node details */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Inspector</h3>
              {!clickedNode && (
                <div className="text-sm text-gray-600 mt-2">
                  Click a node to view step-by-step request/response details. Or select a flow to animate the path.
                </div>
              )}
              {clickedNode && (
                <div className="mt-2 text-sm text-gray-700">
                  <div className="font-semibold text-yellow-800">{nodeDetails[clickedNode].title}</div>
                  <div className="text-xs text-gray-600 mb-2">{nodeDetails[clickedNode].short}</div>
                  <ol className="list-decimal list-inside space-y-1">
                    {nodeDetails[clickedNode].details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ol>

                  <button
                    onClick={() => setClickedNode(null)}
                    className="mt-3 text-xs text-yellow-800 underline"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

            {/* OAuth2 Data Access Table */}
            <div className="mb-4">
              <h3 className="text-md font-semibold text-gray-800">OAuth2 Data Access (Scopes)</h3>
              <div className="text-xs text-gray-600 mb-2">What you can grant to third-party apps</div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left text-xs py-1 px-2 text-gray-700">Scope</th>
                      <th className="text-left text-xs py-1 px-2 text-gray-700">Access</th>
                      <th className="text-left text-xs py-1 px-2 text-gray-700">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    {oauthRows.map((r) => (
                      <tr key={r.scope} className="odd:bg-gray-50">
                        <td className="py-2 px-2 text-xs font-mono text-gray-800">{r.scope}</td>
                        <td className="py-2 px-2 text-xs text-gray-700">{r.description}</td>
                        <td className="py-2 px-2 text-xs text-gray-700">{r.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Decision guide */}
            <div>
              <h3 className="text-md font-semibold text-gray-800">Auth Decision Guide</h3>
              <div className="text-xs text-gray-600 mb-2">When to use third-party vs build your own</div>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li><strong>Use 3rd-party (Auth0, Google, AWS Cognito)</strong> — fast integration, social logins, compliance offload.</li>
                <li><strong>Build your own</strong> — when strict compliance (HIPAA, PCI), custom policies, or owning credentials is required.</li>
                <li><strong>Hybrid</strong> — use third-party for consumer logins, internal systems use private auth + RBAC.</li>
              </ul>

              <div className="mt-3 text-sm">
                <div className="font-semibold">Quick tips</div>
                <ul className="list-disc list-inside text-xs text-gray-600 mt-1">
                  <li>Prefer OIDC + OAuth2 for SSO / social login.</li>
                  <li>Use short-lived JWTs with refresh tokens for mobile apps.</li>
                  <li>Store keys/secrets in environment variables and KMS.</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {/* Authentication Concepts Section (detailed write-ups) */}
        <section className="mt-6 bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">Authentication Concepts — Quick Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold">JWT (JSON Web Token)</h4>
              <p className="text-xs">Structure: Header.Payload.Signature (Base64 URL). Tokens are stateless — server verifies signature and expiry; no session store required.</p>
              <p className="text-xs mt-1"><strong>Use when:</strong> You want scalable stateless auth for APIs and mobile apps.</p>
            </div>
            <div>
              <h4 className="font-semibold">OAuth 2.0 & OpenID Connect (OIDC)</h4>
              <p className="text-xs">OAuth: authorization; OIDC: authentication layer on top (ID tokens). Use Authorization Code flow for server-side apps, PKCE for mobile.</p>
            </div>

            <div>
              <h4 className="font-semibold">RBAC</h4>
              <p className="text-xs">Role-Based Access Control: encode role claims in JWT and enforce at API gateway/microservice level.</p>
            </div>
            <div>
              <h4 className="font-semibold">Securing Endpoints</h4>
              <p className="text-xs">Validate JWT signature, check expiry and role claims. Use HTTPS and short token lifetimes plus refresh tokens.</p>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <strong>Why PMs should care:</strong> understanding these concepts helps in product decisions (SSO, compliance, UX vs security tradeoffs) and in communicating requirements with engineering teams.
          </div>
        </section>

        {/* Footer small summary */}
        <footer className="mt-6 text-center text-xs text-gray-500">
          Visualizer: API Gateway + Service Discovery + LB + Services + Storage. Click a flow to watch data move, click nodes for details.
        </footer>
      </div>
      <DataProtection/>
    </div>
  );
}
