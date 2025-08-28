import React, { useState } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import SystemDesign from "./SystemDesign";


const archNodes = [
  { id: "arch_client", data: { label: "Client Apps" }, position: { x: 0, y: 100 }, style: { background: "#f3f4f6" } },
  { id: "arch_api", data: { label: "API Gateway / Edge" }, position: { x: 300, y: 50 }, style: { background: "#bfdbfe" } },
  { id: "arch_services", data: { label: "Microservices (Location, Order)" }, position: { x: 600, y: 50 }, style: { background: "#bbf7d0" } },
  { id: "arch_events", data: { label: "Event Bus / Queue (Kafka)" }, position: { x: 300, y: 220 }, style: { background: "#fde68a" } },
  { id: "arch_data", data: { label: "Datastores (OLTP / NoSQL)" }, position: { x: 600, y: 220 }, style: { background: "#fbcfe8" } },
  { id: "arch_infra", data: { label: "Infra (Regions, Load Balance)" }, position: { x: 900, y: 140 }, style: { background: "#e9d5ff" } },
];

const archEdges = [
  { id: "a1", source: "arch_client", target: "arch_api", label: "Client ↔ Edge/API", animated: true },
  { id: "a2", source: "arch_api", target: "arch_services", label: "API → Services", animated: true },
  { id: "a3", source: "arch_services", target: "arch_events", label: "Emit events", animated: true },
  { id: "a4", source: "arch_events", target: "arch_data", label: "Event → Datastore", animated: true },
  { id: "a5", source: "arch_services", target: "arch_data", label: "Service → Datastore", animated: false },
  { id: "a6", source: "arch_services", target: "arch_infra", label: "Scale / Regions", animated: false },
];

// --- Design flow (implementation details + process nodes) ---
const designNodes = [
  { id: "d_client_search", data: { label: "User: Search & Browse" }, position: { x: 0, y: 20 }, style: { background: "#f3f4f6" } },
  { id: "d_view", data: { label: "View: React UI (map, feed)" }, position: { x: 300, y: 20 }, style: { background: "#bfdbfe" } },
  { id: "d_controller", data: { label: "Controller/API: Express + Auth" }, position: { x: 300, y: 150 }, style: { background: "#bbf7d0" } },
  { id: "d_ingest", data: { label: "Ingest: Fleet SDK → PubSub" }, position: { x: 600, y: 150 }, style: { background: "#fde68a" } },
  { id: "d_store", data: { label: "Model: Realtime DB + Cache" }, position: { x: 900, y: 150 }, style: { background: "#fbcfe8" } },
  { id: "d_notify", data: { label: "Notify: WebSocket / Push" }, position: { x: 600, y: 300 }, style: { background: "#fef08a" } },
  { id: "d_monitor", data: { label: "Observability & Ops" }, position: { x: 300, y: 300 }, style: { background: "#e9d5ff" } },
  { id: "d_client_receive", data: { label: "User: Receives Real-time Updates" }, position: { x: 0, y: 300 }, style: { background: "#f3f4f6" } },
];

const designEdges = [
  { id: "d1", source: "d_client_search", target: "d_view", label: "user interacts", animated: true },
  { id: "d2", source: "d_view", target: "d_controller", label: "API request (place order)", animated: true },
  { id: "d3", source: "d_controller", target: "d_ingest", label: "validate & publish", animated: true },
  { id: "d4", source: "d_ingest", target: "d_store", label: "write realtime loc/status", animated: true },
  { id: "d5", source: "d_store", target: "d_notify", label: "emit update events", animated: true },
  { id: "d6", source: "d_notify", target: "d_client_receive", label: "push to client", animated: true },
  { id: "d7", source: "d_controller", target: "d_monitor", label: "metrics & logs", animated: false },
  { id: "d8", source: "d_ingest", target: "d_monitor", label: "monitor pipeline", animated: false },
];

// Explanation payloads for both flows
const archExplain = {
  arch_client: {
    title: "Client Apps",
    text: "Consumer-facing apps (mobile, web) that initiate requests and render responses. In architecture, clients are external boundaries and UX constraints drive architectural decisions.",
    tools: "iOS/Android apps, Web browsers",
    pm: "PMs use this to reason about UX expectations and regional distribution of users (latency, device capabilities).",
    when: "Use Architecture thinking when you decide where clients connect (Edge, CDN, API Gateway) and capacity/SLAs"
  },
  arch_api: {
    title: "API Gateway / Edge",
    text: "Central ingress that handles routing, auth, rate-limiting, and can perform edge composition. Architecturally, it protects and shields internal services from clients.",
    tools: "CDN, API Gateway (CloudFront, Cloudflare, Kong)",
    pm: "PMs should know why an edge layer improves performance and security for many clients.",
    when: "Architecture: deciding single-entry vs multiple endpoints, bilateral SLAs, and edge caching strategies"
  },
  arch_services: {
    title: "Microservices (Location, Order)",
    text: "Logical bounded-context services that implement business capabilities such as location tracking, order management or ETA services. Architecture decides service boundaries and autonomy.",
    tools: "Containers, Kubernetes, Serverless Functions",
    pm: "Helps PMs map features to teams and understand ownership, deployment cadence, and integration costs.",
    when: "Architecture-level decisions about decomposition (microservices vs monolith) and long-term maintainability"
  },
  arch_events: {
    title: "Event Bus / Queue (Kafka)",
    text: "Supports asynchronous communication between services for scalability and loose coupling. Key for real-time updates and decoupled processing.",
    tools: "Kafka, Pub/Sub, Kinesis",
    pm: "PMs should know why events enable real-time features and how they affect eventual consistency trade-offs.",
    when: "Architecture: choosing event-driven vs direct sync between services"
  },
  arch_data: {
    title: "Datastores (OLTP / NoSQL)",
    text: "High-level datastore choices: relational for transactions, NoSQL for scale/low-latency lookups. Architecture sets the pattern and constraints for data ownership and replication.",
    tools: "Postgres, DynamoDB, Cassandra",
    pm: "Understanding datastore role helps PMs make decisions about analytics, compliance, and latency budgets.",
    when: "Architecture: defining cross-region replication, retention, and transaction guarantees"
  },
  arch_infra: {
    title: "Infrastructure (Regions, LB, DNS)",
    text: "Compute, network, and availability zones shape resilience and latency. Architecture sets deployment topology (multi-region, anycast, geo-DNS).",
    tools: "AWS/GCP/Azure, Route53, Load Balancers",
    pm: "PMs use infra knowledge to set SLAs, estimate costs, and plan regional launches.",
    when: "Architecture: choosing multi-region vs single-region. Planning for disaster recovery and compliance"
  }
};

const designExplain = {
  d_client_search: {
    title: "User: Search & Browse",
    text: "Concrete user action: customer searches restaurants and filters results. Design considers query performance, pagination, and UX responsiveness.",
    tools: "Elasticsearch, Algolia, client-side caching",
    pm: "Know how search UX and latency affect conversion and how design choices (indexing, caching) influence performance.",
    when: "Design: optimizing search queries, UI work, caching and fallback behavior"
  },
  d_view: {
    title: "View: React UI (map, feed)",
    text: "Actual UI components rendering maps and status. Design specifies client-side state management, rendering frequency, and graceful degradation.",
    tools: "React, React-Query, Mapbox/Google Maps, Service Workers",
    pm: "PMs should weigh trade-offs between rich interactive UI and battery/network usage on mobile.",
    when: "Design: deciding polling vs websocket, how much computation to do client-side"
  },
  d_controller: {
    title: "Controller: API (Express + Auth)",
    text: "Concrete API endpoints and middleware that validate requests, enforce rate limits, and orchestrate calls to services/databases.",
    tools: "Express/Koa, API Gateway, OAuth/JWT",
    pm: "PMs use this knowledge to write API contracts, set quotas and understand error modes exposed to users.",
    when: "Design: defining REST vs GraphQL endpoints, idempotency, and error handling"
  },
  d_ingest: {
    title: "Ingest: Fleet SDK → PubSub",
    text: "Drivers publish GPS via lightweight SDKs to an ingest pipeline which validates and publishes events to a queue for downstream processing.",
    tools: "gRPC/HTTP SDKs, Kafka, Protocol Buffers",
    pm: "Understand how telemetry frequency, sampling and SDK overhead trade off battery & network cost vs accuracy.",
    when: "Design: selecting telemetry frequency, batching, compression strategies"
  },
  d_store: {
    title: "Model: Realtime DB + Cache",
    text: "Design decisions for storing current driver positions and order states—fast lookups (cache) vs reliable writes (DB). Includes TTLs, partitioning, and indexing.",
    tools: "Redis, DynamoDB, Postgres, TimescaleDB",
    pm: "PMs must specify consistency needs (strong vs eventual), storage costs and retention policies.",
    when: "Design: schema design, cache invalidation, retention and GDPR concerns"
  },
  d_notify: {
    title: "Notify: WebSocket / Push",
    text: "Mechanism to push updates to clients: WebSocket streams, server-sent events, or push notifications depending on platform and UX requirements.",
    tools: "Socket.IO, Pub/Sub, FCM/APNs",
    pm: "PMs decide on channels (in-app vs push), delivery guarantees, and throttling strategies.",
    when: "Design: choosing persistent streams vs polling based on scale and device constraints"
  },
  d_monitor: {
    title: "Observability & Ops",
    text: "Detailed design for metrics, alerts, tracing, and runbooks. Ensures reliability and fast incident response.",
    tools: "Prometheus, Grafana, Honeycomb, Sentry",
    pm: "PMs should define SLOs/SLAs, understand alert fatigue risk, and prioritise monitoring for critical flows.",
    when: "Design: selecting error budgets, alert thresholds and recovery procedures"
  },
  d_client_receive: {
    title: "User: Receives Real-time Updates",
    text: "End-user experience when they receive driver ETA changes and map movement. Design optimizes update frequency, UX affordances, and fallback flows.",
    tools: "Push notifications, in-app WebSocket handlers",
    pm: "PMs should measure perceived latency and user trust; decide when to show approximations vs exact positions.",
    when: "Design: UX heuristics for real-time updates and error states"
  }
};

// --- Component ---
export default function SystemDesignArchModule() {
  const [selectedArchNode, setSelectedArchNode] = useState(null);
  const [selectedDesignNode, setSelectedDesignNode] = useState(null);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border rounded-2xl p-6 shadow">
        <h1 className="text-2xl font-bold text-yellow-800">System Architecture vs System Design — Module for PMs</h1>
        <p className="mt-3 text-gray-700">This interactive module explains the difference between <strong>system architecture</strong> (the high-level blueprint) and <strong>system design</strong> (the tactical implementation). Use the flows to explore real DoorDash-style use cases for a Real-Time Order Tracking feature.</p>
      </div>

      {/* Definitions & When to Use */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border rounded-2xl p-4 shadow">
          <h2 className="font-semibold text-lg">What is System Architecture?</h2>
          <p className="mt-2 text-gray-700">A high-level blueprint describing the system's structure, principles, and long-term goals. Architecture answers <em>what</em> and <em>why</em> (example: choose microservices & event-driven to scale real-time updates).</p>
          <p className="mt-2 text-sm text-gray-600"><strong>When to use:</strong> Strategic decisions—team structure, multi-region, compliance, long-term extensibility.</p>
          <p className="mt-2 text-sm text-gray-600"><strong>Value for PMs:</strong> Aligns product roadmap with technical constraints and long-term costs.</p>
        </div>

        <div className="bg-white border rounded-2xl p-4 shadow">
          <h2 className="font-semibold text-lg">What is System Design?</h2>
          <p className="mt-2 text-gray-700">The implementation-focused process that answers <em>how</em> to meet architecture goals: APIs, databases, pipelines—concrete choices to build features like real-time tracking.</p>
          <p className="mt-2 text-sm text-gray-600"><strong>When to use:</strong> Tactical sprint planning, API design, schema decisions, scalability testing.</p>
          <p className="mt-2 text-sm text-gray-600"><strong>Value for PMs:</strong> Enables precise requirements, better trade-offs, and measurable KPIs (latency, error rates).</p>
        </div>
      </div>

      {/* Architecture Flow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 h-[420px] border rounded-2xl shadow-md bg-white">
          <div className="p-3 border-b">
            <h3 className="font-semibold">Architecture Flow (High-level)</h3>
            <p className="text-sm text-gray-600">Explore architectural building blocks and their roles.</p>
          </div>
          <ReactFlow nodes={archNodes} edges={archEdges} fitView style={{ height: '330px' }} onNodeClick={(_, node) => setSelectedArchNode(node.id)}>
            <Background />
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>

        <div className="border rounded-2xl shadow-md p-4 bg-gray-50">
          {selectedArchNode ? (
            <div>
              <h4 className="font-bold">{archExplain[selectedArchNode].title}</h4>
              <p className="mt-2 text-gray-700">{archExplain[selectedArchNode].text}</p>
              <p className="mt-3 text-sm text-gray-700"><strong>Typical tools:</strong> {archExplain[selectedArchNode].tools}</p>
              <p className="mt-2 text-sm text-gray-700"><strong>PM relevance:</strong> {archExplain[selectedArchNode].pm}</p>
              <p className="mt-2 text-sm text-gray-500"><strong>When to use:</strong> {archExplain[selectedArchNode].when}</p>
            </div>
          ) : (
            <div>
              <h4 className="font-semibold">Click an architecture node</h4>
              <p className="text-sm text-gray-600 mt-2">See role, tools, PM relevance and when to apply architecture-level thinking.</p>
            </div>
          )}
        </div>
      </div>

      {/* Design Flow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 h-[520px] border rounded-2xl shadow-md bg-white">
          <div className="p-3 border-b">
            <h3 className="font-semibold">Design Flow (Implementation)</h3>
            <p className="text-sm text-gray-600">Inspect detailed components and processes that implement the architecture—see exact tools and decisions.</p>
          </div>
          <ReactFlow nodes={designNodes} edges={designEdges} fitView style={{ height: '430px' }} onNodeClick={(_, node) => setSelectedDesignNode(node.id)}>
            <Background />
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>

        <div className="border rounded-2xl shadow-md p-4 bg-gray-50">
          {selectedDesignNode ? (
            <div>
              <h4 className="font-bold">{designExplain[selectedDesignNode].title}</h4>
              <p className="mt-2 text-gray-700">{designExplain[selectedDesignNode].text}</p>
              <p className="mt-3 text-sm text-gray-700"><strong>Typical tools:</strong> {designExplain[selectedDesignNode].tools}</p>
              <p className="mt-2 text-sm text-gray-700"><strong>PM relevance:</strong> {designExplain[selectedDesignNode].pm}</p>
              <p className="mt-2 text-sm text-gray-500"><strong>When to use:</strong> {designExplain[selectedDesignNode].when}</p>
            </div>
          ) : (
            <div>
              <h4 className="font-semibold">Click a design node</h4>
              <p className="text-sm text-gray-600 mt-2">See process-level decisions, trade-offs, and how each piece maps to user outcomes.</p>
            </div>
          )}
        </div>
      </div>

      {/* Comparison & Key Takeaways */}
      <div className="bg-white border rounded-2xl p-6 shadow">
        <h3 className="font-semibold text-lg">System Architecture vs System Design — Quick Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="p-3 border rounded-lg">
            <h4 className="font-semibold">Scope</h4>
            <p className="text-sm text-gray-700 mt-1">Architecture: high-level (what & why). Design: mid/low-level (how).</p>
          </div>
          <div className="p-3 border rounded-lg">
            <h4 className="font-semibold">Focus</h4>
            <p className="text-sm text-gray-700 mt-1">Architecture: principles, topology. Design: APIs, schemas, pipelines.</p>
          </div>
          <div className="p-3 border rounded-lg">
            <h4 className="font-semibold">PM impact</h4>
            <p className="text-sm text-gray-700 mt-1">Architecture guides roadmap; design informs specs, KPIs and sprint work.</p>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold">Key Takeaways for PMs</h4>
          <ol className="list-decimal ml-6 mt-2 text-gray-700">
            <li>Use architecture thinking early — choose patterns that support product vision and growth.</li>
            <li>Use design work to define clear APIs/SLAs, performance budgets, and measurable metrics.</li>
            <li>Balance trade-offs deliberately: cost vs latency, consistency vs availability.</li>
            <li>Write PRDs that call out architecture constraints and design requirements separately.</li>
            <li>Measure impact with SLOs: latency, error rate, throughput, and user-perceived latency.</li>
          </ol>
        </div>
      </div>

      {/* PM Checklist */}
      <div className="bg-white border rounded-2xl p-6 shadow">
        <h3 className="font-semibold text-lg">PM Checklist — Before you ship Real-Time Tracking</h3>
        <ul className="list-disc ml-6 mt-3 text-gray-700">
          <li>Define architecture pattern (event-driven, microservices) and rationale.</li>
          <li>Set non-functional requirements: latency, throughput, uptime.</li>
          <li>Specify API contracts and error modes for controllers.</li>
          <li>Agree on data retention, privacy, and replication strategy for model/data stores.</li>
          <li>Plan observability, SLOs and runbooks for critical flows.</li>
          <li>Estimate costs for infra and caching; model trade-offs.</li>
        </ul>
      </div>
<div className="w-full bg-white flex flex-col lg:flex-row gap-4 p-6">
    <SystemDesign />
  </div>
    </div>
  );
}
