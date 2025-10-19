import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import SprintSysDesign from "./SprintSysDesign";


const tableSchemas = {
  USERS: `user_id UUID PRIMARY KEY
full_name TEXT NOT NULL
email TEXT UNIQUE NOT NULL
phone_number TEXT
role TEXT -- 'rider' | 'driver'
date_registered TIMESTAMP DEFAULT NOW()`,

  DRIVERS: `driver_id UUID PRIMARY KEY
user_id UUID REFERENCES USERS(user_id) -- FK to USERS
full_name TEXT NOT NULL
email TEXT UNIQUE NOT NULL
phone_number TEXT
vehicle_number TEXT
license_number TEXT
verified BOOLEAN DEFAULT false
rating NUMERIC DEFAULT 0`,

  RIDES: `ride_id UUID PRIMARY KEY
rider_id UUID REFERENCES USERS(user_id) -- FK to USERS
driver_id UUID REFERENCES DRIVERS(driver_id) -- FK to DRIVERS
pickup_location TEXT
dropoff_location TEXT
fare_estimate NUMERIC
fare_actual NUMERIC
status TEXT -- 'requested'|'accepted'|'ongoing'|'completed'|'cancelled'
start_time TIMESTAMP
end_time TIMESTAMP
created_at TIMESTAMP DEFAULT NOW()`,

  PAYMENTS: `payment_id UUID PRIMARY KEY
ride_id UUID REFERENCES RIDES(ride_id) -- FK to RIDES
rider_id UUID REFERENCES USERS(user_id)
amount NUMERIC
method TEXT -- 'cash'|'wallet'|'card'
status TEXT -- 'pending'|'success'|'failed'
processed_at TIMESTAMP DEFAULT NOW()`,
};

/* ---------------------------
   React Flow node style
   --------------------------- */
const nodeStyle = {
  border: "2px solid #2563eb",
  borderRadius: 8,
  padding: 12,
  background: "#ffffff",
  minWidth: 130,
  textAlign: "center",
  fontWeight: 700,
  cursor: "pointer",
};

/* ---------------------------
   ERD: initial nodes & edges
   --------------------------- */
const initialERDNodes = [
  { id: "USERS", position: { x: 0, y: 0 }, data: { label: "USERS" }, style: nodeStyle },
  { id: "DRIVERS", position: { x: 260, y: 0 }, data: { label: "DRIVERS" }, style: nodeStyle },
  { id: "RIDES", position: { x: 520, y: 0 }, data: { label: "RIDES" }, style: nodeStyle },
  { id: "PAYMENTS", position: { x: 780, y: 0 }, data: { label: "PAYMENTS" }, style: nodeStyle },
];

const initialERDEdges = [
  {
    id: "e_users_rides",
    source: "USERS",
    target: "RIDES",
    label: "rider_id → rides",
    animated: false,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e_drivers_rides",
    source: "DRIVERS",
    target: "RIDES",
    label: "driver_id → rides",
    animated: false,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e_rides_payments",
    source: "RIDES",
    target: "PAYMENTS",
    label: "ride_id → payments",
    animated: false,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

/* ---------------------------
   System architecture initial nodes & edges
   --------------------------- */
const initialSystemNodes = [
  { id: "MOBILE", position: { x: 0, y: 0 }, data: { label: "Mobile App (Web / RN)" }, style: nodeStyle },
  { id: "API", position: { x: 320, y: 0 }, data: { label: "Backend API (Node/Express)" }, style: nodeStyle },
  { id: "DB", position: { x: 640, y: 0 }, data: { label: "Database (Supabase Postgres)" }, style: nodeStyle },
  { id: "PAY", position: { x: 320, y: 180 }, data: { label: "Payment Gateway (Flutterwave/Paystack)" }, style: nodeStyle },
  { id: "NOTIFY", position: { x: 640, y: 180 }, data: { label: "Notifications (FCM / Supabase Realtime)" }, style: nodeStyle },
];

const initialSystemEdges = [
  {
    id: "e_mobile_api",
    source: "MOBILE",
    target: "API",
    label: "API Requests (auth, book, track)",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: "#0891b2", strokeWidth: 2 },
  },
  {
    id: "e_api_db",
    source: "API",
    target: "DB",
    label: "CRUD (users, rides, payments)",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: "#0ea5a5", strokeWidth: 2 },
  },
  {
    id: "e_api_pay",
    source: "API",
    target: "PAY",
    label: "Payment requests & webhooks",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: "#f97316", strokeWidth: 2 },
  },
  {
    id: "e_api_notify",
    source: "API",
    target: "NOTIFY",
    label: "Push & event triggers",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: "#7c3aed", strokeWidth: 2 },
  },
  {
    id: "e_db_notify",
    source: "DB",
    target: "NOTIFY",
    label: "Realtime events (location updates)",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: "#06b6d4", strokeWidth: 2 },
  },
];

/* ---------------------------
   System descriptions
   --------------------------- */
const systemDescriptions = {
  "Mobile App (Web / RN)":
    "Frontend application for Riders & Drivers. Handles login (OTP), ride requests, live map display, driver acceptance prompts, and local caching. Sends API calls to Backend API and receives push notifications. Initiates payments via API.",
  "Backend API (Node/Express)":
    "Core business logic: authentication, ride matching, driver selection, fare calculation, job queues for notifications, and orchestration of payments. Validates inputs and communicates with Supabase and Payment Gateway. Emits events for analytics.",
  "Database (Supabase Postgres)":
    "Stores normalized data: users, drivers, rides, payments, logs. Provides Realtime (pub/sub) for location & status updates, and Auth for token management.",
  "Payment Gateway (Flutterwave/Paystack)":
    "Processes card and wallet transactions, returns webhooks to Backend API for confirmation, supports refunds and payout flows.",
  "Notifications (FCM / Supabase Realtime)":
    "Push notification channel for driver/rider alerts and a realtime stream for location updates and small broadcast messages.",
};

/* ---------------------------
   ToggleSection component (Tailwind classes)
   --------------------------- */
const ToggleSection = ({ title, color = "bg-sky-600", children }) => {
  const [open, setOpen] = useState(false);
  return (
    <section className="w-full">
      <button
        onClick={() => setOpen(!open)}
        className={`${color} w-full flex justify-between items-center px-4 py-3 rounded-md text-white font-semibold`}
      >
        <span>{open ? "▼ " : "▶ "} {title}</span>
        <span className="text-xs opacity-80">{open ? "Collapse" : "Open"}</span>
      </button>

      {open && (
        <div className="mt-3 p-4 bg-white rounded-md shadow-sm text-sm md:text-base">
          {children}
        </div>
      )}
    </section>
  );
};



  // utility: show system node explanation

/* --------------------
   Main component
   -------------------- */
export default function RideHailingPRD() {
  // PRD selections
  const [selectedTable, setSelectedTable] = useState(null); // USERS, DRIVERS, etc
  const [selectedSystemNode, setSelectedSystemNode] = useState(null); // MOBILE, API, etc

  // ERD nodes & edges
  const [erdNodes,  onErdNodesChange] = useNodesState(initialERDNodes);
  const [erdEdges, onErdEdgesChange] = useEdgesState(initialERDEdges);

  // System nodes & edges
  const [sysNodes,  onSysNodesChange] = useNodesState(initialSystemNodes);
  const [sysEdges, setSysEdges, onSysEdgesChange] = useEdgesState(initialSystemEdges);

  // animate system edges periodically (simulate live data flow)
  useEffect(() => {
    const interval = setInterval(() => {
      setSysEdges((prev) =>
        prev.map((e) => ({
          ...e,
          // randomly animate some edges each tick
          animated: Math.random() > 0.4,
          style: {
            stroke: e.animated ? (e.style?.stroke || "#0891b2") : "#94a3b8",
            strokeWidth: e.animated ? 3 : 1.5,
          },
        }))
      );
    }, 900);
    return () => clearInterval(interval);
  }, [setSysEdges]);

  // ERD node click -> show schema
  const onErdNodeClick = useCallback((event, node) => {
    const key = node.data.label?.toUpperCase();
    if (!key) return;
    setSelectedTable((prev) => (prev === key ? null : key));
  }, []);

  // System node click -> highlight related edges and show description
  const onSysNodeClick = useCallback(
    (event, node) => {
      const id = node.id;
      setSelectedSystemNode((prev) => (prev === node.data.label ? null : node.data.label));

      // highlight edges connected to this node
      setSysEdges((prev) =>
        prev.map((edge) => {
          if (edge.source === id || edge.target === id) {
            return {
              ...edge,
              animated: true,
              style: { stroke: "#06b6d4", strokeWidth: 3 },
            };
          }
          return { ...edge, animated: false, style: { stroke: "#94a3b8", strokeWidth: 1.5 } };
        })
      );
    },
    [setSysEdges]
  );

  // utility: show schema panel content (safe lookup)
  const renderSchema = (key) => {
    if (!key) return null;
    const schema = tableSchemas[key];
    if (!schema) return <div className="text-sm text-red-600">Schema not found for {key}</div>;
    return (
      <div className="mt-3 bg-blue-50 p-3 rounded-md border">
        <h4 className="font-semibold">{key} — Table Schema</h4>
        <pre className="text-xs md:text-sm whitespace-pre-wrap mt-2 bg-white p-2 rounded border">{schema}</pre>
      </div>
    );
  };

  // utility: show system node explanation
  const renderSystemExplanation = (label) => {
    if (!label) return null;
    const desc = systemDescriptions[label] || "No description available.";
    return (
      <div className="mt-3 bg-cyan-50 p-3 rounded-md border">
        <h4 className="font-semibold">{label}</h4>
        <p className="text-sm mt-1">{desc}</p>
        <div className="mt-2 text-xs text-slate-500">Highlighted edges show data movement to/from this component.</div>
      </div>
    );
  };

  /* --------------------
     Full PRD content (verbatim) as requested
     -------------------- */
  const fullPRD = {
    title: "🧩 PRODUCT REQUIREMENTS DOCUMENT (PRD)",
    subtitle: "📱 Product: JustRide — Ride-Hailing Platform (MVP)",
    sections: [
      {
        id: "exec",
        title: "🧾 1️⃣ Executive Summary / Vision",
        color: "bg-indigo-600",
        content: (
          <>
            <p><strong>Vision:</strong></p>
            <p>“To make urban mobility seamless, safe, and affordable for everyone.”</p>

            <p><strong>MVP Goal:</strong></p>
            <p>
              To design, develop, and launch a functional ride-hailing MVP connecting verified drivers and riders
              in one pilot city (starting with Lagos). The MVP will validate:
            </p>
            <ul className="list-disc ml-6">
              <li>User acquisition and trust</li>
              <li>Ride booking, GPS tracking, and payments</li>
              <li>Technical scalability for multi-city rollout</li>
            </ul>

            <p><strong>Product Overview:</strong></p>
            <p>
              JustRide is a digital platform that allows users to request rides instantly, view real-time driver locations,
              and pay securely via in-app wallet or cash. It provides verified drivers with consistent trip opportunities and reliable earnings.
            </p>
          </>
        ),
      },

      {
        id: "problem",
        title: "🚩 2️⃣ Problem Statement",
        color: "bg-sky-600",
        content: (
          <>
            <p><strong>Commuters face multiple pain points:</strong></p>
            <ul className="list-disc ml-6">
              <li>🚗 Long waiting times and lack of reliable transport.</li>
              <li>⚠️ Safety risks due to unverified or untraceable drivers.</li>
              <li>💸 Inconsistent and opaque fare pricing.</li>
              <li>📱 Fragmented experience across transport, payments, and tracking apps.</li>
            </ul>

            <p><strong>Drivers also struggle with:</strong></p>
            <ul className="list-disc ml-6">
              <li>Low, unpredictable income.</li>
              <li>Poor app experiences and delayed payouts.</li>
            </ul>

            <p><strong>Opportunity:</strong></p>
            <p>
              A unified, localized solution ensuring safe, affordable, and reliable rides tailored to local markets.
            </p>
          </>
        ),
      },

      {
        id: "scope",
        title: "🎯 3️⃣ MVP Scope",
        color: "bg-emerald-600",
        content: (
          <>
            <h4 className="font-semibold">✅ In-Scope (Core MVP Features)</h4>
            <ul className="list-disc ml-6">
              <li>User Authentication (Rider & Driver) — Register/login securely.</li>
              <li>Driver Verification — Upload ID, vehicle info, and driver’s license.</li>
              <li>Ride Booking — Riders input pickup & destination.</li>
              <li>Ride Matching System — Nearest driver assigned automatically.</li>
              <li>Real-Time GPS Tracking — Live driver location and ETA.</li>
              <li>Ride Status Updates — Requested → Accepted → Ongoing → Completed.</li>
              <li>Fare Estimation & Payments — Cash or digital wallet via Paystack/Flutterwave.</li>
              <li>Notifications — Booking confirmation, driver arrival, ride updates.</li>
              <li>Ride History & Profile — Users can view past trips and payments.</li>
            </ul>

            <h4 className="font-semibold mt-3">🚫 Out-of-Scope (Future Versions)</h4>
            <ul className="list-disc ml-6">
              <li>Chat feature (Rider ↔ Driver).</li>
              <li>Driver earnings analytics.</li>
              <li>Corporate ride management.</li>
              <li>Multi-city or cross-border rides.</li>
              <li>Loyalty & referral program.</li>
            </ul>
          </>
        ),
      },

      {
        id: "goals",
        title: "📈 4️⃣ Goals / Success Metrics",
        color: "bg-cyan-600",
        content: (
          <>
            <table className="w-full text-sm md:text-base border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">Metric</th>
                  <th className="border px-2 py-1">Target (3 Months)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border px-2 py-1">Registered Riders</td><td className="border px-2 py-1">1,000+</td></tr>
                <tr><td className="border px-2 py-1">Verified Drivers</td><td className="border px-2 py-1">200+</td></tr>
                <tr><td className="border px-2 py-1">Completed Rides</td><td className="border px-2 py-1">2,000</td></tr>
                <tr><td className="border px-2 py-1">App Uptime</td><td className="border px-2 py-1">≥ 98%</td></tr>
                <tr><td className="border px-2 py-1">Avg. Ride Rating</td><td className="border px-2 py-1">≥ 4.3 / 5</td></tr>
              </tbody>
            </table>
          </>
        ),
      },

      {
        id: "users",
        title: "👤 5️⃣ Target Users / Personas",
        color: "bg-violet-600",
        content: (
          <>
            <h4 className="font-semibold">Persona 1 – Ada (Rider)</h4>
            <ul className="list-disc ml-6">
              <li>Age: 22</li>
              <li>Occupation: University student</li>
              <li>Needs: Safe, affordable rides; prefers digital payment.</li>
              <li>Pain Points: Distrusts unregistered taxis; long wait times.</li>
              <li>Motivation: Save time, ensure personal safety.</li>
            </ul>

            <h4 className="font-semibold mt-3">Persona 2 – Tunde (Driver)</h4>
            <ul className="list-disc ml-6">
              <li>Age: 32</li>
              <li>Occupation: Independent driver</li>
              <li>Needs: Reliable source of income; fair commissions.</li>
              <li>Pain Points: App crashes, inconsistent payouts.</li>
              <li>Motivation: Earn efficiently and maintain high ratings.</li>
            </ul>
          </>
        ),
      },

      {
        id: "jtbd",
        title: "🧩 6️⃣ Jobs-To-Be-Done (JTBD)",
        color: "bg-amber-600",
        content: (
          <>
            <ul className="list-disc ml-6">
              <li>“When I need to move across town, I want to quickly find a reliable ride so I can arrive safely and on time.”</li>
              <li>“When I’m idle, I want to get ride requests near me so I can earn efficiently.”</li>
              <li>“When I finish a ride, I want instant payment updates so I can track my earnings.”</li>
            </ul>
          </>
        ),
      },

      {
        id: "features",
        title: "⚙️ 7️⃣ Features / Functional Requirements (MVP)",
        color: "bg-emerald-700",
        content: (
          <>
            <table className="w-full border text-sm md:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Feature</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">User Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">User Authentication</td>
                  <td className="border p-2">Sign up / login via email or phone</td>
                  <td className="border p-2">Rider & Driver</td>
                </tr>
                <tr>
                  <td className="border p-2">Driver Onboarding</td>
                  <td className="border p-2">Upload documents for verification</td>
                  <td className="border p-2">Driver</td>
                </tr>
                <tr>
                  <td className="border p-2">Ride Booking</td>
                  <td className="border p-2">Choose pickup & destination</td>
                  <td className="border p-2">Rider</td>
                </tr>
                <tr>
                  <td className="border p-2">Ride Matching</td>
                  <td className="border p-2">Auto-match nearest driver</td>
                  <td className="border p-2">System</td>
                </tr>
                <tr>
                  <td className="border p-2">GPS Tracking</td>
                  <td className="border p-2">Show driver’s location in real time</td>
                  <td className="border p-2">Rider</td>
                </tr>
                <tr>
                  <td className="border p-2">Ride Status</td>
                  <td className="border p-2">Track stages of the ride</td>
                  <td className="border p-2">Rider & Driver</td>
                </tr>
                <tr>
                  <td className="border p-2">Fare Calculation</td>
                  <td className="border p-2">Estimate based on distance/time</td>
                  <td className="border p-2">System</td>
                </tr>
                <tr>
                  <td className="border p-2">Payment</td>
                  <td className="border p-2">Pay via wallet or cash</td>
                  <td className="border p-2">Rider</td>
                </tr>
                <tr>
                  <td className="border p-2">Ride History</td>
                  <td className="border p-2">View completed rides</td>
                  <td className="border p-2">Rider & Driver</td>
                </tr>
                <tr>
                  <td className="border p-2">Notifications</td>
                  <td className="border p-2">Push alerts for booking & arrival</td>
                  <td className="border p-2">Both</td>
                </tr>
              </tbody>
            </table>
          </>
        ),
      },

      {
        id: "nonfunctional",
        title: "🔧 8️⃣ Non-Functional Requirements",
        color: "bg-sky-700",
        content: (
          <>
            <table className="w-full border text-sm md:text-base">
              <tbody>
                <tr><td className="border p-2">Performance</td><td className="border p-2">App loads in &lt;2s</td></tr>
                <tr><td className="border p-2">Reliability</td><td className="border p-2">≥98% uptime</td></tr>
                <tr><td className="border p-2">Security</td><td className="border p-2">Encrypted APIs, role-based access</td></tr>
                <tr><td className="border p-2">Scalability</td><td className="border p-2">Support 5,000 concurrent users</td></tr>
                <tr><td className="border p-2">UX</td><td className="border p-2">Mobile-first responsive design</td></tr>
                <tr><td className="border p-2">Compliance</td><td className="border p-2">NDPR/GDPR-ready data protection</td></tr>
              </tbody>
            </table>
          </>
        ),
      },

      {
        id: "tech",
        title: "💻 9️⃣ Technical Requirements",
        color: "bg-indigo-700",
        content: (
          <>
            <table className="w-full border text-sm md:text-base">
              <tbody>
                <tr><td className="border p-2">Frontend</td><td className="border p-2">React (Web), React Native (Mobile)</td></tr>
                <tr><td className="border p-2">Backend</td><td className="border p-2">Node.js / Express</td></tr>
                <tr><td className="border p-2">Database</td><td className="border p-2">Supabase (PostgreSQL)</td></tr>
                <tr><td className="border p-2">Authentication</td><td className="border p-2">Supabase Auth (JWT tokens)</td></tr>
                <tr><td className="border p-2">Hosting</td><td className="border p-2">Vercel (Frontend), Supabase (Backend)</td></tr>
                <tr><td className="border p-2">Maps</td><td className="border p-2">Mapbox / Leaflet / OpenStreetMap</td></tr>
                <tr><td className="border p-2">Payments</td><td className="border p-2">Flutterwave / Paystack API</td></tr>
                <tr><td className="border p-2">Notifications</td><td className="border p-2">Firebase Cloud Messaging</td></tr>
                <tr><td className="border p-2">Version Control</td><td className="border p-2">GitHub</td></tr>
                <tr><td className="border p-2">Analytics</td><td className="border p-2">Google Firebase / Amplitude</td></tr>
              </tbody>
            </table>
          </>
        ),
      },

      {
        id: "userstories",
        title: "🧑‍💻 10️⃣ User Stories / Workflows",
        color: "bg-emerald-600",
        content: (
          <>
            <h4 className="font-semibold">Rider Workflows</h4>
            <ul className="list-disc ml-6">
              <li>Sign Up/Login → Enter phone or email → Verify OTP → Access dashboard.</li>
              <li>Request Ride → Set pickup & destination → View fare → Confirm request.</li>
              <li>During Ride → View live map → Rate driver post-trip → Payment processed.</li>
            </ul>

            <h4 className="font-semibold mt-3">Driver Workflows</h4>
            <ul className="list-disc ml-6">
              <li>Register → Submit ID, license, and vehicle documents.</li>
              <li>Get Ride Requests → Accept/Reject request → Navigate to rider.</li>
              <li>Update Status → “Arrived” → “Started Ride” → “Completed.”</li>
            </ul>

            <h4 className="font-semibold mt-3">System Workflow</h4>
            <pre className="bg-gray-900 text-green-400 p-3 rounded-md overflow-auto text-xs md:text-sm">
{`[ Rider ] → [ Request Ride ]
                ↓
         [ Matching Algorithm ]
                ↓
         [ Driver Accepts Ride ]
                ↓
          [ Real-time Tracking ]
                ↓
         [ Ride Completion + Payment ]
                ↓
          [ Feedback & History ]`}
            </pre>
          </>
        ),
      },

      {
        id: "erd",
        title: "🧱 11️⃣ ERD — Entity Relationship Diagram (MVP)",
        color: "bg-sky-600",
        content: (
          <>
            <p>Interactive ERD: click any table node to show the exact schema (PKs, FKs, types).</p>
            {/* ERD panel will be rendered inside the UI mapping below */}
          </>
        ),
      },

      {
        id: "sysdesign",
        title: "🛠️ System Architecture Design",
        color: "bg-indigo-600",
        content: (
          <>
            <SprintSysDesign
                sysNodes={sysNodes}
                sysEdges={sysEdges}
                onSysNodesChange={onSysNodesChange}
                onSysEdgesChange={onSysEdgesChange}
                onSysNodeClick={onSysNodeClick}
                selectedSystemNode={selectedSystemNode}
                renderSystemExplanation={renderSystemExplanation}
            />
          </>
        ),
      },
      {
        id: "timeline",
        title: "🗓️ 11️⃣ Timeline / Roadmap",
        color: "bg-violet-600",
        content: (
          <>
            <table className="w-full border text-sm md:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Phase</th>
                  <th className="border p-2">Duration</th>
                  <th className="border p-2">Key Deliverables</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-2">Phase 1: Planning & Design</td><td className="border p-2">Week 1–2</td><td className="border p-2">Wireframes, ERD, API specs</td></tr>
                <tr><td className="border p-2">Phase 2: Core Development</td><td className="border p-2">Week 3–6</td><td className="border p-2">Auth, booking, driver onboarding</td></tr>
                <tr><td className="border p-2">Phase 3: Testing & QA</td><td className="border p-2">Week 7–8</td><td className="border p-2">Map integration, payments</td></tr>
                <tr><td className="border p-2">Phase 4: Beta Launch</td><td className="border p-2">Week 9–10</td><td className="border p-2">Limited rollout (Lagos)</td></tr>
                <tr><td className="border p-2">Phase 5: Feedback & Optimization</td><td className="border p-2">Week 11–12</td><td className="border p-2">Bug fixes, analytics setup</td></tr>
              </tbody>
            </table>
          </>
        ),
      },

      {
        id: "kpis",
        title: "✅ 12️⃣ Success Criteria / KPIs",
        color: "bg-emerald-700",
        content: (
          <>
            <table className="w-full border text-sm md:text-base">
              <tbody>
                <tr><td className="border p-2">Daily Active Users (DAU)</td><td className="border p-2">200+</td></tr>
                <tr><td className="border p-2">Booking Success Rate</td><td className="border p-2">≥ 90%</td></tr>
                <tr><td className="border p-2">Driver Acceptance Rate</td><td className="border p-2">≥ 75%</td></tr>
                <tr><td className="border p-2">Average App Rating</td><td className="border p-2">≥ 4.3</td></tr>
                <tr><td className="border p-2">Crash-Free Sessions</td><td className="border p-2">≥ 98%</td></tr>
              </tbody>
            </table>
          </>
        ),
      },

      {
        id: "risks",
        title: "⚠️ 13️⃣ Risks & Mitigations",
        color: "bg-red-600",
        content: (
          <>
            <table className="w-full border text-sm md:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Risk</th>
                  <th className="border p-2">Likelihood</th>
                  <th className="border p-2">Mitigation Strategy</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-2">Driver shortage</td><td className="border p-2">High</td><td className="border p-2">Sign-up bonuses, flexible commissions</td></tr>
                <tr><td className="border p-2">API outage</td><td className="border p-2">Medium</td><td className="border p-2">Use fallback APIs (Mapbox → OSM)</td></tr>
                <tr><td className="border p-2">Payment delays</td><td className="border p-2">Medium</td><td className="border p-2">Integrate multiple gateways</td></tr>
                <tr><td className="border p-2">Security breaches</td><td className="border p-2">Low</td><td className="border p-2">Implement SSL, role-based access</td></tr>
                <tr><td className="border p-2">Regulatory pushback</td><td className="border p-2">Medium</td><td className="border p-2">Engage transport authorities early</td></tr>
              </tbody>
            </table>
          </>
        ),
      },

      {
        id: "gtm",
        title: "🚀 14️⃣ Go-To-Market (GTM) Strategy",
        color: "bg-indigo-600",
        content: (
          <>
            <p><strong>Pilot City:</strong> Lagos, Nigeria</p>
            <p><strong>Channels:</strong> Instagram, TikTok, Twitter campaigns</p>
            <p><strong>Programs:</strong> Student ambassador program; Fintech & fuel station partnerships</p>
            <p><strong>Incentives:</strong> ₦500 off first 3 rides; ₦5,000 bonus for drivers completing 10 rides; Referral bonuses for early adopters</p>
            <p><strong>Campaign:</strong> 🎯 “#RideSmartWithJustRide — Your City, Your Ride”</p>
          </>
        ),
      },

      {
        id: "deps",
        title: "🔗 15️⃣ Dependencies",
        color: "bg-sky-700",
        content: (
          <>
            <table className="w-full border text-sm md:text-base">
              <tbody>
                <tr><td className="border p-2">Supabase</td><td className="border p-2">Database + Auth</td></tr>
                <tr><td className="border p-2">Mapbox / OSM API</td><td className="border p-2">Location tracking</td></tr>
                <tr><td className="border p-2">Flutterwave / Paystack</td><td className="border p-2">Payments</td></tr>
                <tr><td className="border p-2">Firebase</td><td className="border p-2">Notifications</td></tr>
                <tr><td className="border p-2">Google Cloud / Vercel</td><td className="border p-2">Hosting</td></tr>
                <tr><td className="border p-2">GitHub</td><td className="border p-2">Code repository & CI/CD</td></tr>
              </tbody>
            </table>
          </>
        ),
      },

      {
        id: "future",
        title: "🧭 16️⃣ Future Enhancements (Post-MVP)",
        color: "bg-emerald-600",
        content: (
          <>
            <ul className="list-disc ml-6">
              <li>In-app chat (Rider ↔ Driver)</li>
              <li>Loyalty & reward programs</li>
              <li>EV integration for green transport</li>
              <li>AI-driven demand prediction</li>
              <li>Multi-city expansion</li>
            </ul>
          </>
        ),
      },

      {
        id: "scalability",
        title: "🌱 17️⃣ Scalability & Long-Term Vision",
        color: "bg-lime-600",
        content: (
          <>
            <p>JustRide’s modular design allows seamless expansion to new cities with localized driver databases, subscription plans for corporate users, and integration with EV charging networks.</p>
            <p><strong>Long-Term Vision:</strong> Expand into micro-mobility (e-bikes, scooters) and delivery services using the same platform infrastructure.</p>
          </>
        ),
      },
    ],
  };

  /* --------------------
     Render component
     -------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-4 md:p-8">
      <div className="max-w-full mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 text-center">🚗 Ride-Hailing Platform — Product Requirements Document (PRD)</h1>
          <p className="text-center text-sm text-slate-500 mt-2">{fullPRD.subtitle}</p>
        </header>

        <main className="space-y-6">
          {fullPRD.sections.map((sec) => (
            <ToggleSection key={sec.id} title={sec.title} color={sec.color}>
              {sec.content}

              {/* Insert the interactive ERD inside the ERD section */}
              {sec.id === "erd" && (
                <>
                  <div className="mt-4">
                    <div className="w-full h-80 md:h-96 bg-white rounded-md border">
                      <ReactFlow
                        nodes={erdNodes}
                        edges={erdEdges}
                        onNodesChange={onErdNodesChange}
                        onEdgesChange={onErdEdgesChange}
                        onNodeClick={onErdNodeClick}
                        fitView
                      >
                        <MiniMap nodeColor={(n) => "#2563eb"} zoomable pannable />
                        <Controls />
                        <Background gap={12} />
                      </ReactFlow>
                    </div>

                    {selectedTable && (
                      <div className="mt-3">
                        {renderSchema(selectedTable)}
                      </div>
                    )}

                    <div className="mt-2 text-xs text-slate-500">Tip: drag nodes to rearrange. Click a table node to toggle its schema view.</div>
                  </div>
                </>
              )}

              {/* Insert the interactive System Architecture inside the timeline section (user asked to include both) */}
              {sec.id === "timeline" && (
                <>
                  <div className="mt-4">
                    <div className="w-full h-80 md:h-96 bg-white rounded-md border">
                      <ReactFlow
                        nodes={sysNodes}
                        edges={sysEdges}
                        onNodesChange={onSysNodesChange}
                        onEdgesChange={onSysEdgesChange}
                        onNodeClick={onSysNodeClick}
                        fitView
                      >
                        <MiniMap nodeColor={(n) => "#0891b2"} zoomable pannable />
                        <Controls />
                        <Background gap={12} />
                      </ReactFlow>
                    </div>

                    {selectedSystemNode && (
                      <div className="mt-3">
                        {renderSystemExplanation(selectedSystemNode)}
                      </div>
                    )}

                    <div className="mt-2 text-xs text-slate-500">Tip: click a system node to inspect it and highlight related data flows.</div>
                  </div>
                </>
              )}
            </ToggleSection>
          ))}
        </main>
      </div>
    </div>
  );
}
