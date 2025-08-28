import React, { useState } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiChevronDown,
  FiChevronUp,
  FiShield,
  FiTrendingUp,
  FiActivity,
  FiLayers,
  FiGlobe,
  FiRepeat,
  FiGitBranch,
  FiServer,
  FiCpu,
} from "react-icons/fi";

/* -------------------------- helpers & styling -------------------------- */

const card = "bg-white rounded-2xl border shadow-sm";
const p = "text-sm md:text-[0.95rem] text-gray-700 leading-relaxed";

const nodeBase = {
  style: {
    borderRadius: 12,
    padding: 8,
    fontSize: 12,
    textAlign: "center",
    width: 160,
    border: "1.5px solid #d1d5db",
    background: "#fff",
  },
};

const cls = {
  client: "bg-blue-50 border-blue-400",
  gateway: "bg-purple-50 border-purple-400",
  registry: "bg-emerald-50 border-emerald-400",
  lb: "bg-amber-50 border-amber-400",
  svc: "bg-cyan-50 border-cyan-400",
  db: "bg-rose-50 border-rose-400",
  cache: "bg-pink-50 border-pink-400",
  edge: "#9ca3af",
  edgeHL: "#f43f5e",
};

const makeNode = (id, label, pos, type) => ({
  id,
  data: { label },
  position: pos,
  ...nodeBase,
  className: cls[type] || "",
});

const makeEdge = (id, source, target, highlighted = true) => ({
  id,
  source,
  target,
  animated: highlighted,
  style: {
    stroke: highlighted ? cls.edgeHL : cls.edge,
    strokeWidth: highlighted ? 2.5 : 1.5,
  },
});

/** Reusable bounded flow panel to prevent overflow */
const FlowPanel = ({ nodes, edges, height = "h-80" }) => (
  <div className={`w-full ${height} ${card} overflow-hidden`}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
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

/** Simple Collapsible */
const Collapsible = ({ id, title, icon, open, onToggle, children }) => {
  return (
    <div className={`${card}`}>
      <button
        onClick={() => onToggle(id)}
        className="flex items-center justify-between w-full px-5 py-3 text-left font-semibold text-yellow-800 hover:bg-yellow-50 rounded-2xl"
      >
        <span className="flex items-center gap-3">{icon}<span className="text-lg">{title}</span></span>
        {open ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-5 pb-5"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ---------------------------- flows per topic --------------------------- */
/** 1) Overview: Gateway as single entry + core responsibilities */
const useOverviewFlow = () => {
  const nodes = [
    makeNode("ov_client", "Clients\n(App / Browser)", { x: 0, y: 70 }, "client"),
    makeNode("ov_gw", "API Gateway\n(Auth, Rate Limit,\nLogging, Caching,\nAPI Composition)", { x: 220, y: 40 }, "gateway"),
    makeNode("ov_lb", "Load Balancer", { x: 440, y: 40 }, "lb"),
    makeNode("ov_user", "User Svc", { x: 640, y: 0 }, "svc"),
    makeNode("ov_order", "Order Svc", { x: 640, y: 80 }, "svc"),
    makeNode("ov_inv", "Inventory Svc", { x: 640, y: 160 }, "svc"),
    makeNode("ov_db", "DBs\n(Postgres/DynamoDB)", { x: 820, y: 80 }, "db"),
  ];
  const edges = [
    makeEdge("e1", "ov_client", "ov_gw"),
    makeEdge("e2", "ov_gw", "ov_lb"),
    makeEdge("e3", "ov_lb", "ov_user"),
    makeEdge("e4", "ov_lb", "ov_order"),
    makeEdge("e5", "ov_lb", "ov_inv"),
    makeEdge("e6", "ov_user", "ov_db", false),
    makeEdge("e7", "ov_order", "ov_db", false),
    makeEdge("e8", "ov_inv", "ov_db", false),
  ];
  return { nodes, edges };
};

/** 2) Routing + Composition (device/bandwidth aware) */
const useRoutingCompositionFlow = () => {
  const nodes = [
    makeNode("rc_phone", "Mobile Client\n(Low BW)", { x: 0, y: 0 }, "client"),
    makeNode("rc_web", "Web Client\n(High BW)", { x: 0, y: 140 }, "client"),
    makeNode("rc_gw", "API Gateway\nDevice/BW aware", { x: 220, y: 70 }, "gateway"),
    makeNode("rc_comp", "Composer\n(Aggregation)", { x: 420, y: 70 }, "gateway"),
    makeNode("rc_s1", "User Svc", { x: 620, y: 0 }, "svc"),
    makeNode("rc_s2", "Order Svc", { x: 620, y: 140 }, "svc"),
  ];
  const edges = [
    makeEdge("e1", "rc_phone", "rc_gw"),
    makeEdge("e2", "rc_web", "rc_gw"),
    makeEdge("e3", "rc_gw", "rc_comp"),
    makeEdge("e4", "rc_comp", "rc_s1"),
    makeEdge("e5", "rc_comp", "rc_s2"),
  ];
  return { nodes, edges };
};

/** 3) Authentication & Authorization centralized */
const useAuthFlow = () => {
  const nodes = [
    makeNode("au_client", "Client", { x: 0, y: 70 }, "client"),
    makeNode("au_gw", "API Gateway", { x: 200, y: 40 }, "gateway"),
    makeNode("au_auth", "Auth Provider\n(OAuth2/JWT)", { x: 400, y: 0 }, "gateway"),
    makeNode("au_pol", "Policy Engine\n(RBAC/ABAC)", { x: 400, y: 120 }, "gateway"),
    makeNode("au_lb", "Load Balancer", { x: 600, y: 40 }, "lb"),
    makeNode("au_svc", "Any Service", { x: 800, y: 40 }, "svc"),
  ];
  const edges = [
    makeEdge("e1", "au_client", "au_gw"),
    makeEdge("e2", "au_gw", "au_auth"),
    makeEdge("e3", "au_gw", "au_pol"),
    makeEdge("e4", "au_gw", "au_lb"),
    makeEdge("e5", "au_lb", "au_svc"),
  ];
  return { nodes, edges };
};

/** 4) Rate Limiting & Throttling */
const useRateLimitFlow = () => {
  const nodes = [
    makeNode("rl_client", "Client", { x: 0, y: 70 }, "client"),
    makeNode("rl_gw", "API Gateway\n(Token Bucket,\nLeaky Bucket)", { x: 200, y: 40 }, "gateway"),
    makeNode("rl_cache", "Counter Store\n(Redis)", { x: 420, y: 0 }, "cache"),
    makeNode("rl_block", "Limit Reached?\n429/Throttle", { x: 420, y: 120 }, "gateway"),
    makeNode("rl_lb", "Load Balancer", { x: 620, y: 40 }, "lb"),
    makeNode("rl_svc", "Service", { x: 820, y: 40 }, "svc"),
  ];
  const edges = [
    makeEdge("e1", "rl_client", "rl_gw"),
    makeEdge("e2", "rl_gw", "rl_cache"),
    makeEdge("e3", "rl_gw", "rl_block", false),
    makeEdge("e4", "rl_gw", "rl_lb"),
    makeEdge("e5", "rl_lb", "rl_svc"),
  ];
  return { nodes, edges };
};

/** 5) Caching (gateway & CDN hint) */
const useCachingFlow = () => {
  const nodes = [
    makeNode("ca_client", "Client", { x: 0, y: 70 }, "client"),
    makeNode("ca_gw", "API Gateway\n(Response Cache)", { x: 200, y: 40 }, "gateway"),
    makeNode("ca_svc", "Service", { x: 420, y: 40 }, "svc"),
    makeNode("ca_db", "DB", { x: 620, y: 40 }, "db"),
  ];
  const edges = [
    makeEdge("e1", "ca_client", "ca_gw"),
    makeEdge("e2", "ca_gw", "ca_svc"),
    makeEdge("e3", "ca_svc", "ca_db", false),
  ];
  return { nodes, edges };
};

/** 6) Difference vs Load Balancer */
const useVsLBFlow = () => {
  const nodes = [
    makeNode("vl_client", "Client", { x: 0, y: 70 }, "client"),
    makeNode("vl_gw", "API Gateway\n(Routing + Policies)", { x: 200, y: 40 }, "gateway"),
    makeNode("vl_lb", "Load Balancer\n(Instance spreading)", { x: 420, y: 40 }, "lb"),
    makeNode("vl_svc_a", "Service A\n(inst1, inst2)", { x: 640, y: 0 }, "svc"),
    makeNode("vl_svc_b", "Service B\n(inst1, inst2)", { x: 640, y: 120 }, "svc"),
  ];
  const edges = [
    makeEdge("e1", "vl_client", "vl_gw"),
    makeEdge("e2", "vl_gw", "vl_lb"),
    makeEdge("e3", "vl_lb", "vl_svc_a"),
    makeEdge("e4", "vl_lb", "vl_svc_b"),
  ];
  return { nodes, edges };
};

/** 7) Service Discovery (client- & server-side) */
const useDiscoveryFlow = () => {
  const nodes = [
    makeNode("sd_client", "Client", { x: 0, y: 0 }, "client"),
    makeNode("sd_gw", "API Gateway", { x: 220, y: 0 }, "gateway"),
    makeNode("sd_reg", "Service Registry\n(Consul/Eureka/etcd)", { x: 440, y: 0 }, "registry"),
    makeNode("sd_lb", "Load Balancer", { x: 660, y: 0 }, "lb"),
    makeNode("sd_svc", "Target Service\n(dynamic instances)", { x: 880, y: 0 }, "svc"),

    makeNode("sd_client2", "Client-side Discovery", { x: 0, y: 140 }, "client"),
    makeNode("sd_reg2", "Registry", { x: 220, y: 140 }, "registry"),
    makeNode("sd_svc2", "Service (direct call)", { x: 440, y: 140 }, "svc"),
  ];
  const edges = [
    // server-side
    makeEdge("e1", "sd_client", "sd_gw"),
    makeEdge("e2", "sd_gw", "sd_reg"),
    makeEdge("e3", "sd_gw", "sd_lb"),
    makeEdge("e4", "sd_lb", "sd_svc"),
    // client-side
    makeEdge("e5", "sd_client2", "sd_reg2"),
    makeEdge("e6", "sd_reg2", "sd_svc2"),
  ];
  return { nodes, edges };
};

/** 8) E-commerce request flow */
const useEcomFlow = () => {
  const nodes = [
    makeNode("ec_client", "Client\n/placeOrder", { x: 0, y: 70 }, "client"),
    makeNode("ec_gw", "API Gateway", { x: 200, y: 40 }, "gateway"),
    makeNode("ec_reg", "Service Registry", { x: 420, y: 0 }, "registry"),
    makeNode("ec_lb", "LB → Order Svc", { x: 420, y: 120 }, "lb"),
    makeNode("ec_order", "Order Svc", { x: 620, y: 120 }, "svc"),
    makeNode("ec_inv", "Inventory Svc", { x: 820, y: 120 }, "svc"),
    makeNode("ec_db", "DB", { x: 1020, y: 120 }, "db"),
  ];
  const edges = [
    makeEdge("e1", "ec_client", "ec_gw"),
    makeEdge("e2", "ec_gw", "ec_reg"),
    makeEdge("e3", "ec_gw", "ec_lb"),
    makeEdge("e4", "ec_lb", "ec_order"),
    makeEdge("e5", "ec_order", "ec_inv"),
    makeEdge("e6", "ec_order", "ec_db", false),
  ];
  return { nodes, edges };
};

/** 9) Benefits */
const useBenefitsFlow = () => {
  const nodes = [
    makeNode("bf_gw", "Gateway\n(Central control)", { x: 0, y: 70 }, "gateway"),
    makeNode("bf_sec", "Security\n(Auth/Rate limit)", { x: 220, y: 0 }, "gateway"),
    makeNode("bf_obs", "Observability\n(Logs/Metrics)", { x: 220, y: 120 }, "gateway"),
    makeNode("bf_reg", "Registry\n(Scalable)", { x: 440, y: 70 }, "registry"),
    makeNode("bf_lb", "LB\n(Resilient)", { x: 660, y: 70 }, "lb"),
  ];
  const edges = [
    makeEdge("e1", "bf_gw", "bf_sec"),
    makeEdge("e2", "bf_gw", "bf_obs"),
    makeEdge("e3", "bf_gw", "bf_reg"),
    makeEdge("e4", "bf_reg", "bf_lb"),
  ];
  return { nodes, edges };
};

/** 10) Global Multi-Region & AZ Routing */
const useGlobalFlow = () => {
  const nodes = [
    makeNode("gl_client", "Client", { x: 0, y: 70 }, "client"),
    makeNode("gl_dns", "Geo-DNS / Anycast", { x: 200, y: 70 }, "gateway"),
    makeNode("gl_gw1", "API GW (us-east)", { x: 420, y: 0 }, "gateway"),
    makeNode("gl_gw2", "API GW (eu-west)", { x: 420, y: 140 }, "gateway"),
    makeNode("gl_lb1", "LB + AZs (us-east-1[a/b])", { x: 640, y: 0 }, "lb"),
    makeNode("gl_lb2", "LB + AZs (eu-west-1[a/b])", { x: 640, y: 140 }, "lb"),
    makeNode("gl_svc1", "Services (us-east)", { x: 860, y: 0 }, "svc"),
    makeNode("gl_svc2", "Services (eu-west)", { x: 860, y: 140 }, "svc"),
  ];
  const edges = [
    makeEdge("e1", "gl_client", "gl_dns"),
    makeEdge("e2", "gl_dns", "gl_gw1"),
    makeEdge("e3", "gl_dns", "gl_gw2"),
    makeEdge("e4", "gl_gw1", "gl_lb1"),
    makeEdge("e5", "gl_gw2", "gl_lb2"),
    makeEdge("e6", "gl_lb1", "gl_svc1"),
    makeEdge("e7", "gl_lb2", "gl_svc2"),
  ];
  return { nodes, edges };
};

/* --------------------------------- view -------------------------------- */

export default function ApiGatewayDiscoveryModule() {
  const [open, setOpen] = useState({
    def: true,
    routing: false,
    auth: false,
    ratelimit: false,
    cache: false,
    vslb: false,
    discovery: false,
    ecom: false,
    benefits: false,
    global: false,
  });
  const toggle = (k) => setOpen((s) => ({ ...s, [k]: !s[k] }));

  const { nodes: ovN, edges: ovE } = useOverviewFlow();
  const { nodes: rcN, edges: rcE } = useRoutingCompositionFlow();
  const { nodes: auN, edges: auE } = useAuthFlow();
  const { nodes: rlN, edges: rlE } = useRateLimitFlow();
  const { nodes: caN, edges: caE } = useCachingFlow();
  const { nodes: vlN, edges: vlE } = useVsLBFlow();
  const { nodes: sdN, edges: sdE } = useDiscoveryFlow();
  const { nodes: ecN, edges: ecE } = useEcomFlow();
  const { nodes: bfN, edges: bfE } = useBenefitsFlow();
  const { nodes: glN, edges: glE } = useGlobalFlow();

  return (
    <div className="w-full mx-auto px-4 md:px-6 py-6 space-y-6 bg-gray-50 mt-16">
      {/* Header */}
      <div className={`${card} p-5`}>
        <h1 className="text-2xl md:text-3xl font-bold text-yellow-800 mb-2">
          API Gateway & Service Discovery — Complete Module
        </h1>
        <p className={p}>
          <strong>System Design (definition):</strong> the discipline of defining a system’s
          components, interfaces, data, and interactions to meet goals like <em>scalability</em>,
          <em> reliability</em>, <em>performance</em>, <em>maintainability</em>, and <em>security</em>.
          This module shows how an <b>API Gateway</b> and <b>Service Discovery</b> work together, how
          they differ from a <b>Load Balancer</b>, and how they support global, resilient deployments.
        </p>
      </div>

      {/* Overview */}
      <Collapsible
        id="def"
        title="🔹 What is an API Gateway? (Overview + Core Responsibilities)"
        icon={<FiLayers className="w-5 h-5 text-yellow-800" />}
        open={open.def}
        onToggle={toggle}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <p className={p}>
              An <b>API Gateway</b> is the single entry point for clients (apps, browsers) and sits
              in front of backend services (microservices, serverless, databases). It handles:
            </p>
            <ul className="list-disc ml-5 text-gray-700 text-sm md:text-[0.95rem] space-y-1">
              <li><b>Routing</b> to the right service</li>
              <li><b>Authentication & Authorization</b> (OAuth2, JWT, API keys)</li>
              <li><b>Rate Limiting & Throttling</b> to prevent abuse</li>
              <li><b>Caching</b> to reduce latency and cost</li>
              <li><b>Load Balancing</b> integration to spread traffic</li>
              <li><b>Monitoring & Logging</b> for visibility</li>
              <li><b>API Composition</b> to aggregate multiple services, and tailor payloads by device/bandwidth</li>
            </ul>
          </div>
          <FlowPanel nodes={ovN} edges={ovE} height="h-80 md:h-96" />
        </div>
      </Collapsible>

      {/* Routing + Composition */}
      <Collapsible
        id="routing"
        title="🧭 Smart Routing & API Composition (Device/Bandwidth Aware)"
        icon={<FiGitBranch className="w-5 h-5 text-yellow-800" />}
        open={open.routing}
        onToggle={toggle}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <p className={p}>
              The gateway can inspect <b>device type</b> and <b>network conditions</b> (e.g., mobile on 3G vs desktop on fiber) to
              send <b>lean</b> or <b>rich</b> payloads. With <b>API Composition</b>, it aggregates data from multiple services
              into a single response, reducing client chatter and improving UX.
            </p>
            <ul className="list-disc ml-5 text-sm md:text-[0.95rem] space-y-1">
              <li>Mobile → minimal fields & compressed images</li>
              <li>Desktop → detailed fields & high-res assets</li>
              <li>Composer orchestrates calls to User/Order/etc.</li>
            </ul>
          </div>
          <FlowPanel nodes={rcN} edges={rcE} />
        </div>
      </Collapsible>

      {/* Auth */}
      <Collapsible
        id="auth"
        title="🔐 Centralized Authentication & Authorization"
        icon={<FiShield className="w-5 h-5 text-yellow-800" />}
        open={open.auth}
        onToggle={toggle}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <p className={p}>
              Instead of each microservice validating tokens, the <b>gateway centralizes auth</b>:
              it validates OAuth2/JWT/API keys and enforces <b>RBAC/ABAC</b> policies, forwarding only valid,
              scoped requests to services.
            </p>
            <ul className="list-disc ml-5 text-sm md:text-[0.95rem] space-y-1">
              <li>Lower duplication, consistent security</li>
              <li>Easier key rotation & token introspection</li>
              <li>Clear audit trail</li>
            </ul>
          </div>
          <FlowPanel nodes={auN} edges={auE} />
        </div>
      </Collapsible>

      {/* Rate Limiting */}
      <Collapsible
        id="ratelimit"
        title="⏱️ Rate Limiting & Throttling"
        icon={<FiActivity className="w-5 h-5 text-yellow-800" />}
        open={open.ratelimit}
        onToggle={toggle}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <p className={p}>
              <b>Token bucket</b> or <b>leaky bucket</b> algorithms, backed by Redis counters, protect your backends from bursts
              and abuse. The gateway can <b>throttle</b> or return <b>429</b> when limits are exceeded, per user/app/IP.
            </p>
            <ul className="list-disc ml-5 text-sm md:text-[0.95rem] space-y-1">
              <li>Global & per-route limits</li>
              <li>Fair-use & abuse protection</li>
              <li>SLA tiers via different buckets</li>
            </ul>
          </div>
          <FlowPanel nodes={rlN} edges={rlE} />
        </div>
      </Collapsible>

      {/* Caching */}
      <Collapsible
        id="cache"
        title="🗄️ Caching at the Gateway (and CDN fronting)"
        icon={<FiServer className="w-5 h-5 text-yellow-800" />}
        open={open.cache}
        onToggle={toggle}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <p className={p}>
              The gateway can cache common responses (with correct <b>cache-control</b> headers) to reduce latency and cost.
              With a CDN in front, edge caching further accelerates global users.
            </p>
            <ul className="list-disc ml-5 text-sm md:text-[0.95rem] space-y-1">
              <li>Private vs public cache</li>
              <li>Invalidate on writes or via events</li>
              <li>Great for read-heavy endpoints</li>
            </ul>
          </div>
          <FlowPanel nodes={caN} edges={caE} />
        </div>
      </Collapsible>

      {/* Difference vs LB */}
      <Collapsible
        id="vslb"
        title="⚖️ API Gateway vs Load Balancer"
        icon={<FiCpu className="w-5 h-5 text-yellow-800" />}
        open={open.vslb}
        onToggle={toggle}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <p className={p}>
              A <b>Load Balancer</b> spreads traffic across instances of the <i>same</i> service based on health and load.
              A <b>Gateway</b> routes across <i>different</i> services and applies <b>policies</b> (auth, rate limit, composition).
              They often work together: Client → Gateway → LB → Service.
            </p>
          </div>
          <FlowPanel nodes={vlN} edges={vlE} />
        </div>
      </Collapsible>

      {/* Service Discovery */}
      <Collapsible
        id="discovery"
        title="🧭 Service Discovery (Client-side & Server-side)"
        icon={<FiRepeat className="w-5 h-5 text-yellow-800" />}
        open={open.discovery}
        onToggle={toggle}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <p className={p}>
              Services scale dynamically and IPs change. A <b>Service Registry</b> (Consul, Eureka, etcd) tracks
              healthy instances:
            </p>
            <ul className="list-disc ml-5 text-sm md:text-[0.95rem] space-y-1">
              <li><b>Client-side discovery:</b> client looks up registry, calls service directly.</li>
              <li><b>Server-side discovery:</b> client calls the gateway/LB, which queries the registry and routes.</li>
            </ul>
            <p className={p}>
              The gateway hides topology from clients and adapts to scaling & failures.
            </p>
          </div>
          <FlowPanel nodes={sdN} edges={sdE} />
        </div>
      </Collapsible>

      {/* E-commerce example */}
      <Collapsible
        id="ecom"
        title="🛒 Example Flow: E-commerce Place Order"
        icon={<FiTrendingUp className="w-5 h-5 text-yellow-800" />}
        open={open.ecom}
        onToggle={toggle}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <ol className="list-decimal ml-5 text-sm md:text-[0.95rem] space-y-1 text-gray-700">
              <li>Client calls <code>/order/create</code> on the gateway.</li>
              <li>Gateway checks registry, sends to LB for Order Service.</li>
              <li>Order Service reserves inventory (calls Inventory Service), then writes to DB.</li>
              <li>Response returns via gateway; metrics & logs captured centrally.</li>
            </ol>
          </div>
          <FlowPanel nodes={ecN} edges={ecE} />
        </div>
      </Collapsible>

      {/* Benefits */}
      <Collapsible
        id="benefits"
        title="✅ Benefits: Scalability, Resilience, Simplified Clients, Central Control"
        icon={<FiTrendingUp className="w-5 h-5 text-yellow-800" />}
        open={open.benefits}
        onToggle={toggle}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <ul className="list-disc ml-5 text-sm md:text-[0.95rem] space-y-1 text-gray-700">
              <li><b>Scalability:</b> new instances register and are routed instantly.</li>
              <li><b>Resilience:</b> route only to healthy instances, graceful failover.</li>
              <li><b>Simplified clients:</b> clients talk to one endpoint.</li>
              <li><b>Centralized control:</b> auth, rate-limits, monitoring at the gateway.</li>
            </ul>
          </div>
          <FlowPanel nodes={bfN} edges={bfE} />
        </div>
      </Collapsible>

      {/* Global multi-region/AZ */}
      <Collapsible
        id="global"
        title="🌍 Global Routing: Regions & Availability Zones (No Single Point of Failure)"
        icon={<FiGlobe className="w-5 h-5 text-yellow-800" />}
        open={open.global}
        onToggle={toggle}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <p className={p}>
              Requests are routed to the <b>closest region</b> via Geo-DNS/Anycast. Each region runs the
              <b> gateway</b>, which forwards to an LB across multiple <b>AZs</b>. If a zone fails, traffic
              shifts to healthy zones/regions automatically—<b>no single point of failure</b>.
            </p>
          </div>
          
          <FlowPanel nodes={glN} edges={glE} height="h-96" />
           
        </div>
      
      </Collapsible>
    </div>
  );
}
