// src/components/AuthConceptsModule.jsx
import React, { useState } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";
import AuthConcepts2 from './AuthConcepts2'
import {
  FiChevronDown,
  FiChevronUp,
  FiShield,
  FiKey,
  FiLock,
  FiUserCheck,
  FiRefreshCw,
  FiServer,
} from "react-icons/fi";

/*
  Authentication Concepts Module
  - Sections: JWT, OAuth2, RBAC, OIDC, Authentication Process, Securing APIs
  - Each section: explanation + interactive flow (ReactFlow)
  - Responsive: single column on small screens, two columns on md/lg
*/

/* ---------- utility & styles ---------- */
const card = "bg-white rounded-2xl border shadow-sm";
const titleClass = "text-2xl font-bold text-yellow-800";
const p = "text-sm text-gray-700 leading-relaxed";
const nodeBase = {
  style: {
    borderRadius: 10,
    padding: 8,
    fontSize: 12,
    textAlign: "center",
    width: 150,
    border: "1.5px solid #e5e7eb",
    background: "#fff",
  },
};

const makeNode = (id, label, pos, className = "") => ({
  id,
  data: { label },
  position: pos,
  ...nodeBase,
  className,
});

const makeEdge = (id, src, tgt, animated = true, color = "#9CA3AF") => ({
  id,
  source: src,
  target: tgt,
  animated,
  style: { stroke: animated ? "#f97316" : color, strokeWidth: animated ? 2.5 : 1.5 },
});

/* ---------- FlowPanel: bounded visual area ---------- */
const FlowPanel = ({ nodes, edges, height = "h-72" }) => {
  return (
    <div className={`w-full ${height} ${card} overflow-hidden`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <Background gap={16} />
        <MiniMap nodeStrokeColor={(n) => (n.style?.background ? n.style.background : "#ddd")} nodeColor={(n) => (n.style?.background ? n.style.background : "#fff")} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

/* ---------- Collapsible ---------- */
const Collapsible = ({ id, title, icon, open, onToggle, children }) => {
  return (
    <div className={card}>
      <button
        onClick={() => onToggle(id)}
        className="flex items-center justify-between w-full px-5 py-3 text-left font-semibold text-yellow-800 hover:bg-yellow-50 rounded-2xl"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-lg">{title}</span>
        </div>
        {open ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="px-5 pb-5">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ---------- Flow definitions ---------- */

/* 1. JWT lifecycle */
const jwtNodes = [
  makeNode("client_jwt", "Client\n(Authorization: Bearer <JWT>)", { x: 0, y: 60 }, "bg-blue-50"),
  makeNode("gw_jwt", "API Gateway\n(verify signature, exp)", { x: 240, y: 40 }, "bg-purple-50"),
  makeNode("svc_jwt", "Resource Service\n(uses claims e.g., roles)", { x: 480, y: 40 }, "bg-cyan-50"),
  makeNode("db_jwt", "User DB\n(only for login / user data)", { x: 720, y: 40 }, "bg-rose-50"),
];
const jwtEdges = [
  makeEdge("e1_j", "client_jwt", "gw_jwt"),
  makeEdge("e2_j", "gw_jwt", "svc_jwt"),
  makeEdge("e3_j", "svc_jwt", "db_jwt", false),
];

/* 2. OAuth2 Authorization Code (simplified) */
const oauthNodes = [
  makeNode("client_o", "Client App\n(redirect URI)", { x: 0, y: 20 }, "bg-blue-50"),
  makeNode("auth_o", "Authorization Server\n(Consent → code)", { x: 240, y: -20 }, "bg-emerald-50"),
  makeNode("gw_o", "API Gateway\n(receives token)", { x: 240, y: 80 }, "bg-purple-50"),
  makeNode("token_o", "Token Exchange\n(code → access token)", { x: 480, y: 20 }, "bg-yellow-50"),
  makeNode("rs_o", "Resource Server\n(APIs)", { x: 720, y: 20 }, "bg-cyan-50"),
];
const oauthEdges = [
  makeEdge("o1", "client_o", "auth_o"),
  makeEdge("o2", "auth_o", "token_o"),
  makeEdge("o3", "token_o", "gw_o"),
  makeEdge("o4", "gw_o", "rs_o"),
];

/* 3. RBAC (role baked in JWT, enforced in middleware) */
const rbacNodes = [
  makeNode("client_r", "Client\n(with JWT)", { x: 0, y: 40 }, "bg-blue-50"),
  makeNode("gw_r", "API Gateway\n(JWT validation)", { x: 240, y: 40 }, "bg-purple-50"),
  makeNode("authz_r", "Authorization Middleware\n(check role claim)", { x: 480, y: 40 }, "bg-amber-50"),
  makeNode("svc_r", "Service\n(protected endpoint)", { x: 720, y: 40 }, "bg-cyan-50"),
];
const rbacEdges = [
  makeEdge("r1", "client_r", "gw_r"),
  makeEdge("r2", "gw_r", "authz_r"),
  makeEdge("r3", "authz_r", "svc_r"),
];

/* 4. OIDC (OIDC issues ID token + OAuth access token) */
const oidcNodes = [
  makeNode("client_oic", "Client App", { x: 0, y: 40 }, "bg-blue-50"),
  makeNode("oidc_as", "OIDC Provider\n(Auth server + ID token)", { x: 240, y: -20 }, "bg-emerald-50"),
  makeNode("token_oic", "ID Token (JWT)\n→ user claims", { x: 240, y: 80 }, "bg-pink-50"),
  makeNode("rs_oic", "Resource Server\n(consumes access token)", { x: 520, y: 40 }, "bg-cyan-50"),
];
const oidcEdges = [
  makeEdge("oi1", "client_oic", "oidc_as"),
  makeEdge("oi2", "oidc_as", "token_oic"),
  makeEdge("oi3", "token_oic", "rs_oic"),
];

/* 5. Authentication Process (login -> token/session creation) */
const authProcNodes = [
  makeNode("client_a", "Client\n(login form)", { x: 0, y: 40 }, "bg-blue-50"),
  makeNode("gw_a", "Auth Endpoint\n(POST /login)", { x: 240, y: 40 }, "bg-purple-50"),
  makeNode("userdb_a", "User DB\n(store hash, salt)", { x: 480, y: 0 }, "bg-rose-50"),
  makeNode("session_a", "Issue Token / Session\n(JWT or cookie)", { x: 480, y: 80 }, "bg-pink-50"),
  makeNode("client_a2", "Client\n(receives token)", { x: 720, y: 40 }, "bg-blue-50"),
];
const authProcEdges = [
  makeEdge("ap1", "client_a", "gw_a"),
  makeEdge("ap2", "gw_a", "userdb_a"),
  makeEdge("ap3", "gw_a", "session_a"),
  makeEdge("ap4", "session_a", "client_a2"),
];

/* 6. Securing API Endpoints (middleware, HTTPS, short exp + refresh) */
const secureNodes = [
  makeNode("client_s", "Client\n(uses access token)", { x: 0, y: 40 }, "bg-blue-50"),
  makeNode("gw_s", "API Gateway\n(HTTPS, validate JWT)", { x: 240, y: 40 }, "bg-purple-50"),
  makeNode("mw_s", "Middleware\n(validate, RBAC, caching)", { x: 480, y: 40 }, "bg-amber-50"),
  makeNode("svc_s", "Service\n(min privilege)", { x: 720, y: 40 }, "bg-cyan-50"),
  makeNode("refresh_s", "Refresh Token\n(endpoint, secure)", { x: 480, y: 120 }, "bg-pink-50"),
];
const secureEdges = [
  makeEdge("s1", "client_s", "gw_s"),
  makeEdge("s2", "gw_s", "mw_s"),
  makeEdge("s3", "mw_s", "svc_s"),
  makeEdge("s4", "client_s", "refresh_s", false),
];

/* ---------- Component ---------- */
export default function AuthConceptsModule() {
  const [open, setOpen] = useState({
    jwt: true,
    oauth: false,
    rbac: false,
    oidc: false,
    authproc: false,
    secure: false,
  });
  const toggle = (k) => setOpen((s) => ({ ...s, [k]: !s[k] }));

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className={`${card} p-5`}>
        <h1 className={titleClass}>Authentication Concepts — Deep Dive for PMs & Engineers</h1>
        <p className="mt-2 text-sm text-gray-700">
          This module explains JWT, OAuth 2.0, RBAC, OpenID Connect, the authentication flow and how to secure APIs.
          Each concept includes a short teachable summary and an interactive flow chart that shows where data/tokens move.
         
        </p>
      </div>

      {/* JWT */}
      <Collapsible id="jwt" title="1️⃣ JSON Web Tokens (JWT)" icon={<FiKey className="w-5 h-5 text-yellow-800" />} open={open.jwt} onToggle={toggle}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-yellow-800">Summary</h3>
            <p className={p}>
              A <b>JWT</b> is a compact token (Header.Payload.Signature). It carries claims (user id, roles, exp). The signature proves integrity so servers can verify tokens without storing session state.
            </p>

            <h4 className="mt-3 font-semibold">Teaching points</h4>
            <ul className="list-disc ml-5 text-sm text-gray-700">
              <li>Structure: Header, Payload, Signature (Base64URL encoded).</li>
              <li>Signatures prevent tampering; check expiration (exp).</li>
              <li>Stateless: server verifies token; no session store required.</li>
            </ul>

            <h4 className="mt-3 font-semibold">Importance for PMs</h4>
            <p className={p}>
              PMs should understand expirations vs UX trade-offs, token revocation strategies, and whether stateless tokens fit product scale & compliance needs.
            </p>
          </div>

          <FlowPanel nodes={jwtNodes} edges={jwtEdges} />
        </div>
      </Collapsible>

      {/* OAuth2 */}
      <Collapsible id="oauth" title="2️⃣ OAuth 2.0 (Authorization)" icon={<FiShield className="w-5 h-5 text-yellow-800" />} open={open.oauth} onToggle={toggle}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-yellow-800">Summary</h3>
            <p className={p}>
              OAuth 2.0 lets apps access user resources without sharing passwords. The Authorization Code Grant is common for server-side apps: the user consents, the authorization server issues a code, which is exchanged for an access token (and optionally a refresh token).
            </p>

            <h4 className="mt-3 font-semibold">Teaching points</h4>
            <ul className="list-disc ml-5 text-sm text-gray-700">
              <li>Roles: Client, Authorization Server, Resource Server.</li>
              <li>Access vs Refresh tokens: short-lived access token, longer-lived refresh token to obtain new access tokens.</li>
              <li>Scopes limit what tokens can access.</li>
            </ul>

            <h4 className="mt-3 font-semibold">Importance for PMs</h4>
            <p className={p}>
              PMs must choose flows (Auth code vs implicit vs client credentials), define minimal scopes, and balance convenience with privacy.
            </p>
          </div>

          <FlowPanel nodes={oauthNodes} edges={oauthEdges} />
        </div>
      </Collapsible>

      {/* RBAC */}
      <Collapsible id="rbac" title="3️⃣ Role-Based Access Control (RBAC)" icon={<FiUserCheck className="w-5 h-5 text-yellow-800" />} open={open.rbac} onToggle={toggle}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-yellow-800">Summary</h3>
            <p className={p}>
              RBAC assigns permissions to roles (admin, editor, user). Roles are commonly embedded as claims in JWTs and enforced by middleware or API gateway.
            </p>

            <h4 className="mt-3 font-semibold">Teaching points</h4>
            <ul className="list-disc ml-5 text-sm text-gray-700">
              <li>Design simple, business-aligned roles.</li>
              <li>Use middleware to enforce role checks before action execution.</li>
              <li>Complement with audit logging and least privilege principle.</li>
            </ul>

            <h4 className="mt-3 font-semibold">Importance for PMs</h4>
            <p className={p}>
              PMs define roles matching the product workflows (e.g., support agent, team admin), and must consider edge cases (role escalation, cross-team access).
            </p>
          </div>

          <FlowPanel nodes={rbacNodes} edges={rbacEdges} />
        </div>
      </Collapsible>

      {/* OIDC */}
      <Collapsible id="oidc" title="4️⃣ OpenID Connect (OIDC)" icon={<FiLock className="w-5 h-5 text-yellow-800" />} open={open.oidc} onToggle={toggle}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-yellow-800">Summary</h3>
            <p className={p}>
              OIDC sits on top of OAuth 2.0 to provide identity (who the user is). It issues an ID token (a JWT) containing user claims. Use OIDC for SSO and trusted identity providers.
            </p>

            <h4 className="mt-3 font-semibold">Teaching points</h4>
            <ul className="list-disc ml-5 text-sm text-gray-700">
              <li>ID token vs Access token: ID token proves identity; access token grants API access.</li>
              <li>Providers: Google, Microsoft, Okta.</li>
              <li>Combine OIDC for login (authentication) and OAuth scopes for resource access (authorization).</li>
            </ul>

            <h4 className="mt-3 font-semibold">Importance for PMs</h4>
            <p className={p}>
              PMs can leverage OIDC for secure SSO and enterprise onboarding, often reducing engineering and compliance burden.
            </p>
          </div>

          <FlowPanel nodes={oidcNodes} edges={oidcEdges} />
        </div>
      </Collapsible>

      {/* Authentication Process */}
      <Collapsible id="authproc" title="5️⃣ Authentication Process (Login → Token/Session)" icon={<FiServer className="w-5 h-5 text-yellow-800" />} open={open.authproc} onToggle={toggle}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-yellow-800">Summary</h3>
            <p className={p}>
              Typical steps: user submits credentials → server verifies password hash → issue session cookie or JWT → client stores token (cookie/localStorage) → subsequent requests carry token.
            </p>

            <h4 className="mt-3 font-semibold">Teaching points</h4>
            <ul className="list-disc ml-5 text-sm text-gray-700">
              <li>Password hashing (bcrypt/argon2) and never storing plain passwords.</li>
              <li>Short-lived tokens + refresh tokens for improved security.</li>
              <li>Cookie flags (Secure, HttpOnly, SameSite) for session cookies.</li>
            </ul>

            <h4 className="mt-3 font-semibold">Importance for PMs</h4>
            <p className={p}>
              PMs decide between session or token strategies, persistent login UX, and 2FA requirements — all affecting security and user experience.
            </p>
          </div>

          <FlowPanel nodes={authProcNodes} edges={authProcEdges} />
        </div>
      </Collapsible>

      {/* Securing API Endpoints */}
      <Collapsible id="secure" title="6️⃣ Securing API Endpoints (Best Practices)" icon={<FiRefreshCw className="w-5 h-5 text-yellow-800" />} open={open.secure} onToggle={toggle}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-yellow-800">Summary</h3>
            <p className={p}>
              Secure endpoints by validating JWT signature & exp, enforcing RBAC, using HTTPS, storing keys securely, short access tokens with refresh tokens, and caching validated tokens for performance.
            </p>

            <h4 className="mt-3 font-semibold">Checklist / Best Practices</h4>
            <ul className="list-disc ml-5 text-sm text-gray-700">
              <li>Use HTTPS everywhere.</li>
              <li>Store secret keys in env / vault (no source control).</li>
              <li>Short access token lifetime (15m) + refresh token rotation.</li>
              <li>Use middleware/gateway to centralize validation and logging.</li>
              <li>Audit logs for sensitive operations.</li>
            </ul>

            <h4 className="mt-3 font-semibold">Importance for PMs</h4>
            <p className={p}>
              PMs must ensure compliance, prioritize security features (2FA, rotation) and set acceptable trade-offs (convenience vs security).
            </p>
          </div>

          <FlowPanel nodes={secureNodes} edges={secureEdges} />
        </div>
      </Collapsible>

      {/* Footer / Exercises */}
      <div className={`${card} p-5`}>
        <h3 className="font-semibold text-yellow-800">Exercises & Next Steps</h3>
        <ol className="list-decimal ml-5 text-sm text-gray-700 mt-2 space-y-1">
          <li>Decode sample JWTs and tamper with payload to observe signature verification failures.</li>
          <li>Implement a small OAuth2 Authorization Code flow using a sandbox provider (e.g., Google OAuth playground).</li>
          <li>Build a mock API with JWT middleware and RBAC checks; write tests for invalid/expired tokens.</li>
          <li>Design a rollout plan for SSO (OIDC) in your product: identify scopes, provider, and migration strategy.</li>
        </ol>
      </div>

      <AuthConcepts2/>
    </div>
  );
}
