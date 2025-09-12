import React, { useState, useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import { FaUsers, FaChartLine, FaLightbulb, FaComments } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';

// Custom Node Component for React Flow with Unique Styling
const CustomNode = ({ data }) => (
  <div className={`border-2 rounded-lg p-4 shadow-md w-64 ${data.type === 'research' ? 'bg-blue-100 border-blue-500' : data.type === 'implementation' ? 'bg-green-100 border-green-500' : data.type === 'outcome' ? 'bg-purple-100 border-purple-500' : 'bg-yellow-100 border-yellow-500'}`}>
    <div className={`font-semibold ${data.type === 'research' ? 'text-blue-600' : data.type === 'implementation' ? 'text-green-600' : data.type === 'outcome' ? 'text-purple-600' : 'text-yellow-600'}`}>{data.label}</div>
    <div className="text-sm text-gray-600">{data.description}</div>
  </div>
);

// React Flow Nodes and Edges for Each Section
const sectionNodes = {
  context: [
    { id: 'c1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Company Overview', description: 'SaaS with 2M users, monolith.', type: 'research' } },
    { id: 'c2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'Situation', description: 'Slow releases, onboarding issues.', type: 'research' } },
    { id: 'c3', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Challenge', description: 'Migrate to microservices safely.', type: 'research' } },
  ],
  contextEdges: [
    { id: 'ce1-2', source: 'c1', target: 'c2', animated: true, label: 'Business Context', style: { stroke: '#6366f1' } },
    { id: 'ce2-3', source: 'c2', target: 'c3', animated: true, label: 'Migration Needs', style: { stroke: '#6366f1' } },
  ],
  problem: [
    { id: 'p1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Developer Research', description: 'Identify monolith pain points.', type: 'research' } },
    { id: 'p2', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'Technical Risks', description: 'Outages, slow CI/CD.', type: 'research' } },
    { id: 'p3', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Business Risks', description: 'Feature delays, revenue loss.', type: 'research' } },
  ],
  problemEdges: [
    { id: 'pe1-2', source: 'p1', target: 'p2', animated: true, label: 'Developer Feedback', style: { stroke: '#6366f1' } },
    { id: 'pe1-3', source: 'p1', target: 'p3', animated: true, label: 'Pain Points', style: { stroke: '#6366f1' } },
  ],
  goal: [
    { id: 'g1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Business Goals', description: 'Velocity, scale, reliability.', type: 'research' } },
    { id: 'g2', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'Technical Metrics', description: 'Deploy frequency, MTTR.', type: 'research' } },
  ],
  goalEdges: [
    { id: 'ge1-2', source: 'g1', target: 'g2', animated: true, label: 'Metric Alignment', style: { stroke: '#6366f1' } },
  ],
  approach: [
    { id: 'a1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Stakeholder Alignment', description: 'Workshops, OKRs.', type: 'research' } },
    { id: 'a2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'Migration Strategy', description: 'Strangler Fig Pattern.', type: 'research' } },
    { id: 'a3', type: 'custom', position: { x: 50, y: 350 }, data: { label: 'Roadmap Planning', description: 'Phased migration: 0–18 months.', type: 'implementation' } },
    { id: 'a4', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Risk Mitigation', description: 'Dual running, CDC, monitoring.', type: 'implementation' } },
    { id: 'a5', type: 'custom', position: { x: 350, y: 350 }, data: { label: 'Tools & Governance', description: 'Kubernetes, Istio, Vault.', type: 'implementation' } },
  ],
  approachEdges: [
    { id: 'ae1-2', source: 'a1', target: 'a2', animated: true, label: 'Stakeholder Needs', style: { stroke: '#6366f1' } },
    { id: 'ae2-3', source: 'a2', target: 'a3', animated: true, label: 'Strategy Inputs', style: { stroke: '#6366f1' } },
    { id: 'ae3-4', source: 'a3', target: 'a4', animated: true, label: 'Risk Planning', style: { stroke: '#6366f1' } },
    { id: 'ae3-5', source: 'a3', target: 'a5', animated: true, label: 'Tooling Needs', style: { stroke: '#6366f1' } },
  ],
  results: [
    { id: 'r1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Phase 1: Low-risk', description: 'Notifications, reporting.', type: 'outcome' } },
    { id: 'r2', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'Phase 2: Core', description: 'Auth, payments migrated.', type: 'outcome' } },
    { id: 'r3', type: 'custom', position: { x: 650, y: 50 }, data: { label: 'Phase 3: Stabilization', description: '70% monolith retired.', type: 'outcome' } },
    { id: 'r4', type: 'custom', position: { x: 950, y: 50 }, data: { label: 'Business Impact', description: 'Velocity, onboarding gains.', type: 'outcome' } },
  ],
  resultsEdges: [
    { id: 're1-2', source: 'r1', target: 'r2', animated: true, label: 'Phase 1 Metrics', style: { stroke: '#6366f1' } },
    { id: 're2-3', source: 'r2', target: 'r3', animated: true, label: 'Phase 2 Metrics', style: { stroke: '#6366f1' } },
    { id: 're3-4', source: 'r3', target: 'r4', animated: true, label: 'Stabilization Metrics', style: { stroke: '#6366f1' } },
  ],
};

// Step Details for Each Node
const stepDetails = {
  // Context Nodes
  c1: {
    title: 'Company Overview',
    description: 'SaaS with 2M users, legacy monolith architecture.',
    tools: ['Jira', 'Confluence'],
    thoughtProcess: 'The monolith slowed scaling. I hypothesized microservices would boost autonomy and velocity.',
    challenges: 'Aligning teams on migration; assessing monolith complexity.',
    navigation: 'Analyzed Jira for release delays, mapped monolith in Confluence. Interviewed leads to confirm bottlenecks.',
    userFeedback: 'N/A (Business-driven).',
    details: '2M users, 6-year-old monolith, 3-week release cycles, 20% bug rate.',
    dataConnection: 'Sends business context to Situation node.'
  },
  c2: {
    title: 'Situation',
    description: 'Slow releases, high bugs, and onboarding issues.',
    tools: ['Slack', 'Google Docs'],
    thoughtProcess: 'Microservices could decouple teams. I expected incremental migration to minimize risk.',
    challenges: 'Balancing velocity with stability; securing buy-in.',
    navigation: 'Documented issues in Google Docs (merge conflicts, outages). Aligned via Slack on migration need.',
    userFeedback: 'N/A (Leadership-driven).',
    details: 'Weekly releases, 30% time on merge conflicts, 2-week onboarding, outages impact all features.',
    dataConnection: 'Sends migration needs to Challenge node.'
  },
  c3: {
    title: 'Challenge',
    description: 'Migrate to microservices without outages or feature freeze.',
    tools: ['Miro', 'Excel'],
    thoughtProcess: 'A safe migration required incremental steps. I prioritized low-risk domains to build trust.',
    challenges: 'Avoiding big-bang risks; managing stakeholder tensions.',
    navigation: 'Mapped domains in Miro (auth, payments), modeled risks in Excel (outage costs $500K/day). Held workshops.',
    userFeedback: 'N/A (Stakeholder-driven).',
    details: 'Risks: outages cascade, feature delays cost $1M/month, onboarding slows hiring.',
    dataConnection: 'Informs Developer Research and Technical Risks nodes.'
  },
  // Problem Nodes
  p1: {
    title: 'Developer Research',
    description: 'Gathered monolith pain points via surveys and interviews.',
    tools: ['Google Forms', 'Zoom', 'DORA Metrics'],
    thoughtProcess: 'Developer feedback would prioritize domains. I hypothesized auth and payments were high-pain areas.',
    challenges: 'Reaching all teams; quantifying issues.',
    navigation: 'Surveyed 150 engineers via Google Forms, conducted 10 Zoom interviews. Analyzed DORA metrics for velocity.',
    userFeedback: '"Merge conflicts eat hours," said 80% of devs. "Deployments are slow," noted 65%.',
    details: '30% time on conflicts, 3-week releases, 25min MTTR, auth/payments top pain points.',
    dataConnection: 'Sends feedback to Technical Risks and Business Risks nodes.'
  },
  p2: {
    title: 'Technical Risks',
    description: 'Address outages, slow CI/CD, and monolith coupling.',
    tools: ['Prometheus', 'Grafana'],
    thoughtProcess: 'Cascading outages were critical. I expected observability and decoupling to reduce MTTR.',
    challenges: 'Isolating services; ensuring observability.',
    navigation: 'Analyzed outages in Prometheus, visualized in Grafana. Planned API gateway and async messaging.',
    userFeedback: 'N/A (Technical-driven).',
    details: 'Risks: 3% outage rate ($500K/day), 15min CI/CD, tight coupling causes cascading failures.',
    dataConnection: 'Receives feedback. Sends risks to Migration Strategy node.'
  },
  p3: {
    title: 'Business Risks',
    description: 'Mitigate feature delays and revenue loss.',
    tools: ['Excel', 'Tableau'],
    thoughtProcess: 'Delays risked customer churn. I prioritized velocity to maintain revenue.',
    challenges: 'Quantifying delay impact; balancing migration vs. features.',
    navigation: 'Modeled churn in Excel ($1M/month risk per delay). Visualized outage costs in Tableau.',
    userFeedback: 'N/A (Data-driven).',
    details: '3-week delays risk 5% churn ($2M ARR loss). Outages cost $500K/day.',
    dataConnection: 'Receives feedback. Sends risks to Migration Strategy node.'
  },
  // Goal Nodes
  g1: {
    title: 'Business Goals',
    description: 'Double velocity, scale to 5M users, reduce outages.',
    tools: ['Google Sheets', 'Mixpanel'],
    thoughtProcess: 'Business goals drove prioritization. I expected microservices to enable scaling.',
    challenges: 'Balancing velocity and stability; setting realistic targets.',
    navigation: 'Defined goals in Google Sheets (2x velocity, 5M users). Validated via Mixpanel data.',
    userFeedback: 'N/A (Business-driven).',
    details: '2x velocity in 12 months, <0.01% downtime, scale to 5M users in 2 years.',
    dataConnection: 'Sends goals to Technical Metrics node.'
  },
  g2: {
    title: 'Technical Metrics',
    description: 'Improve deploy frequency, MTTR, migration progress.',
    tools: ['Prometheus', 'Grafana'],
    thoughtProcess: 'DORA metrics ensured progress. I targeted daily deploys per service.',
    challenges: 'Achieving low MTTR; tracking migration.',
    navigation: 'Set metrics in Prometheus (1 deploy/day, <30min MTTR). Built Grafana dashboards for tracking.',
    userFeedback: 'N/A (Technical-driven).',
    details: '1 deploy/day, <30min MTTR, 60% codebase migrated, <0.01% downtime.',
    dataConnection: 'Receives goals. Sends metrics to Risk Mitigation node.'
  },
  // Approach Nodes
  a1: {
    title: 'Stakeholder Alignment',
    description: 'Aligned teams on incremental migration, zero disruption.',
    tools: ['Zoom', 'Confluence'],
    thoughtProcess: 'Alignment reduced resistance. I expected infra to prioritize reliability, product to push velocity.',
    challenges: 'Managing tensions; defining OKRs.',
    navigation: 'Held 15 Zoom workshops, documented OKRs in Confluence. Unified on incremental approach.',
    userFeedback: '"No outages," said infra lead. "Faster features," noted product manager.',
    details: 'OKRs: velocity (2x), downtime (<0.01%), migration (60%). Aligned 10 teams.',
    dataConnection: 'Sends needs to Migration Strategy node.'
  },
  a2: {
    title: 'Migration Strategy',
    description: 'Adopted Strangler Fig Pattern for incremental migration.',
    tools: ['Miro', 'Swagger'],
    thoughtProcess: 'Incremental migration minimized risk. I prioritized auth and payments for high impact.',
    challenges: 'Choosing domains; defining interfaces.',
    navigation: 'Mapped domains in Miro (auth, payments, notifications). Defined REST/gRPC contracts in Swagger.',
    userFeedback: '"Decoupling auth helps," said 75% of devs.',
    details: 'Prioritized auth, payments, notifications. Used REST/gRPC, planned Kafka for async.',
    dataConnection: 'Receives needs. Sends strategy to Roadmap Planning node.'
  },
  a3: {
    title: 'Roadmap Planning',
    description: 'Phased migration: foundation (0–2m), low-risk (2–6m), core (6–12m), stabilization (12–18m).',
    tools: ['Jira', 'Figma'],
    thoughtProcess: 'Phased rollout ensured stability. I prioritized low-risk domains to build trust.',
    challenges: 'Scoping phases; coordinating teams.',
    navigation: 'Planned in Jira: Phase 0 (Kubernetes), Phase 1 (notifications), Phase 2 (auth). Designed UX in Figma.',
    userFeedback: '"Notifications service is smooth," said pilot team.',
    details: 'Phase 0: Kubernetes, CI/CD. Phase 1: 3 services. Phase 2: Core domains. Phase 3: 70% migration.',
    dataConnection: 'Receives strategy. Sends roadmap to Risk Mitigation and Tools nodes.'
  },
  a4: {
    title: 'Risk Mitigation',
    description: 'Used dual running, CDC, observability, blue/green deploys.',
    tools: ['Kafka', 'Datadog', 'LaunchDarkly'],
    thoughtProcess: 'Risk mitigation ensured zero downtime. I prioritized feature flags for safe cutovers.',
    challenges: 'Syncing data; maintaining compatibility.',
    navigation: 'Implemented CDC with Kafka, monitored with Datadog, used LaunchDarkly flags. Tested blue/green deploys.',
    userFeedback: 'N/A (Technical-driven).',
    details: 'Dual running for 3 months/service, CDC synced data, <0.01% downtime, 25min MTTR.',
    dataConnection: 'Receives roadmap. Sends mitigation to Results nodes.'
  },
  a5: {
    title: 'Tools & Governance',
    description: 'Implemented Kubernetes, Istio, Vault, service catalog.',
    tools: ['Kubernetes', 'Istio', 'Vault'],
    thoughtProcess: 'Tooling enabled autonomy. I prioritized Kubernetes for scaling, Istio for routing.',
    challenges: 'Standardizing tools; ensuring adoption.',
    navigation: 'Deployed Kubernetes/Istio, centralized secrets in Vault. Built catalog for ownership tracking.',
    userFeedback: '"Service catalog clarifies ownership," said 80% of leads.',
    details: 'Kubernetes for orchestration, Istio for routing, Vault for RBAC, catalog for governance.',
    dataConnection: 'Receives roadmap. Sends tools to Results nodes.'
  },
  // Results Nodes
  r1: {
    title: 'Phase 1: Low-risk',
    description: 'Decoupled notifications, file uploads, reporting.',
    tools: ['Kubernetes', 'Datadog', 'Figma'],
    thoughtProcess: 'Low-risk services built confidence. I prioritized clear boundaries for quick wins.',
    challenges: 'Ensuring no downtime; validating patterns.',
    navigation: 'Deployed services on Kubernetes, monitored with Datadog. Designed APIs in Figma.',
    userFeedback: '"Notifications are reliable," said 85% of users.',
    details: '3 services migrated, 0% downtime, daily deploys, 25min MTTR.',
    dataConnection: 'Sends Phase 1 metrics to Phase 2 node.'
  },
  r2: {
    title: 'Phase 2: Core',
    description: 'Migrated auth, payments, accounts.',
    tools: ['Kafka', 'Prometheus', 'LaunchDarkly'],
    thoughtProcess: 'Core domains reduced blast radius. I prioritized async messaging for resilience.',
    challenges: 'Maintaining compatibility; syncing data.',
    navigation: 'Used Kafka for async, Prometheus for monitoring, LaunchDarkly for flags. A/B tested cutovers.',
    userFeedback: '"Auth service is fast," said 80% of pilot devs.',
    details: '40% outage radius reduction, 60% codebase migrated, daily deploys.',
    dataConnection: 'Receives Phase 1 metrics. Sends Phase 2 metrics to Phase 3 node.'
  },
  r3: {
    title: 'Phase 3: Stabilization',
    description: 'Retired 70% of monolith, optimized CI/CD.',
    tools: ['Kubernetes', 'Grafana', 'Chaos Monkey'],
    thoughtProcess: 'Stabilization ensured scalability. I prioritized chaos testing for resilience.',
    challenges: 'Deprecating monolith; ensuring performance.',
    navigation: 'Deprecated modules on Kubernetes, optimized CI/CD in Grafana. Ran Chaos Monkey tests.',
    userFeedback: '"Microservices scale better," said infra lead.',
    details: '70% monolith retired, 10% cost increase, 8min CI/CD, 40% faster onboarding.',
    dataConnection: 'Receives Phase 2 metrics. Sends stabilization metrics to Business Impact node.'
  },
  r4: {
    title: 'Business Impact',
    description: 'Doubled velocity, reduced outages, faster onboarding.',
    tools: ['Mixpanel', 'Tableau', 'Google Forms'],
    thoughtProcess: 'Metrics validated impact. I focused on velocity and onboarding to quantify success.',
    challenges: 'Isolating migration impact; projecting ROI.',
    navigation: 'Tracked velocity in Mixpanel, visualized costs in Tableau. Surveyed onboarding via Google Forms.',
    userFeedback: '"Microservices simplify work," said 90% of new hires.',
    details: '2x velocity, <0.01% downtime, 25% productivity gain, 40% faster onboarding.',
    dataConnection: 'Receives stabilization metrics. Outputs final impact metrics.'
  },
};

// Case Study Component
const MicroservicesCaseStudy = () => {
  const [selectedStep, setSelectedStep] = useState(null);

  const onNodeClick = useCallback((event, node) => {
    setSelectedStep(node.id);
  }, []);

  const renderSection = (title, nodes, edges, icon) => (
    <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <div className="flex items-center mb-4">
        {icon}
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="flex">
        <div className="w-2/3 pr-4">
          <div className="h-[400px]">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={{ custom: CustomNode }}
              onNodeClick={onNodeClick}
              fitView
            >
              <Background />
              <Controls />
              <MiniMap nodeColor={(node) => (node.data.type === 'research' ? '#3b82f6' : node.data.type === 'implementation' ? '#10b981' : node.data.type === 'outcome' ? '#8b5cf6' : '#f59e0b')} />
            </ReactFlow>
          </div>
        </div>
        <div className="w-1/3 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Step Details</h3>
          {selectedStep && stepDetails[selectedStep] ? (
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">{stepDetails[selectedStep].title}</h4>
              <p className="text-gray-700 mb-2"><strong>Description:</strong> {stepDetails[selectedStep].description}</p>
              <p className="text-gray-700 mb-2"><strong>Tools Used:</strong> {stepDetails[selectedStep].tools.join(', ')}</p>
              <p className="text-gray-700 mb-2"><strong>Thought Process:</strong> {stepDetails[selectedStep].thoughtProcess}</p>
              <p className="text-gray-700 mb-2"><strong>Challenges:</strong> {stepDetails[selectedStep].challenges}</p>
              <p className="text-gray-700 mb-2"><strong>Navigation:</strong> {stepDetails[selectedStep].navigation}</p>
              <p className="text-gray-700 mb-2"><strong>User Feedback:</strong> {stepDetails[selectedStep].userFeedback}</p>
              <p className="text-gray-700 mb-2"><strong>Details:</strong> {stepDetails[selectedStep].details}</p>
              <p className="text-gray-700"><strong>Data Connection:</strong> {stepDetails[selectedStep].dataConnection}</p>
            </div>
          ) : (
            <p className="text-gray-700">Click a node to view details.</p>
          )}
        </div>
      </div>
    </section>
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Problem Statement */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaLightbulb className="text-3xl text-yellow-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Problem Statement</h1>
        </div>
        <p className="text-gray-700 mb-4">
          You are a Technical Program Manager at a mid-stage SaaS company with ~2M active users. The core product runs on a legacy monolithic architecture, slowing releases, increasing bugs, and complicating onboarding. Leadership wants to transition to microservices to improve scalability and autonomy without outages or halting features.
        </p>
      </section>

      {/* Context Section */}
      {renderSection(
        'Context / Background',
        sectionNodes.context,
        sectionNodes.contextEdges,
        <FaUsers className="text-3xl text-indigo-500 mr-3" />
      )}

      {/* Problem Section */}
      {renderSection(
        'Problem / Challenge',
        sectionNodes.problem,
        sectionNodes.problemEdges,
        <FaLightbulb className="text-3xl text-yellow-500 mr-3" />
      )}

      {/* Goal Section */}
      {renderSection(
        'Goal / Metrics',
        sectionNodes.goal,
        sectionNodes.goalEdges,
        <FaChartLine className="text-3xl text-green-500 mr-3" />
      )}

      {/* Approach Section */}
      {renderSection(
        'Approach / Action',
        sectionNodes.approach,
        sectionNodes.approachEdges,
        <FaChartLine className="text-3xl text-green-500 mr-3" />
      )}

      {/* Results Section */}
      {renderSection(
        'Results / Outcome (Hypothetical)',
        sectionNodes.results,
        sectionNodes.resultsEdges,
        <FaChartLine className="text-3xl text-blue-500 mr-3" />
      )}

      {/* Learnings Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaLightbulb className="text-3xl text-yellow-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Learnings / Next Steps</h2>
        </div>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Incremental migration builds trust and reduces resistance.</li>
          <li>Hybrid monolith-microservices coexistence is viable with strong governance.</li>
          <li>Developer enablement (tooling, training) prevents complexity creep.</li>
          <li><strong>Next Step:</strong> Evolve into a platform with golden paths, policy-as-code, and automated cost monitoring.</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Key Takeaways</h3>
        <p className="text-gray-700">
          As a TPM, I drove impact by aligning stakeholders, prioritizing incremental migration, and delivering developer-centric tools. This structured, risk-mitigated approach demonstrates leadership and scalability, ideal for SaaS transformations.
        </p>
      </section>

      {/* Simulation Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-3xl text-green-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Simulation: Migration Trade-offs</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Adjust service complexity and dual-running duration to see impacts on release velocity, downtime, and migration progress, simulating trade-offs.
        </p>
        <Simulation />
      </section>

      {/* Interview Questions Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaComments className="text-3xl text-purple-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Likely Interview Questions & Answers</h2>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q1: How did you prioritize services for migration?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I used the Strangler Fig Pattern, prioritizing high-change domains (auth, payments, 80% of dev pain) with clear boundaries (notifications). Developer feedback (65% cited slow deploys) and Miro workshops validated the choice.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q2: How did you ensure zero downtime?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I implemented dual running with feature flags (LaunchDarkly), CDC via Kafka for data sync, and blue/green deploys. Datadog monitoring ensured {'<'}0.01% downtime, with 25min MTTR in Phase 1.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q3: How did you measure success?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> Success was measured by 2x velocity (daily deploys), {'<'}0.01% downtime, 70% codebase migrated, and 40% faster onboarding. Prometheus/Grafana tracked metrics, with Mixpanel validating productivity gains.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q4: How did you align stakeholders?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I held 15 Zoom workshops, documented OKRs in Confluence (velocity, downtime, migration). Miro mapped domains, resolving tensions by prioritizing reliability (infra) and velocity (product).
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q5: What would you do differently?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I’d invest in earlier chaos testing to validate resilience. I’d accelerate training on microservices to boost adoption. Finally, I’d explore multi-cloud for cost optimization in Phase 3.
            </p>
          </div>
        </div>
      </section>

      {/* Evaluation Context Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaLightbulb className="text-3xl text-yellow-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">How Interviewers Evaluate This Case Study</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Interviewers at companies like Meta or X assess TPM case studies based on:
        </p>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li><strong>Technical Acumen:</strong> Designing scalable microservices architectures.</li>
          <li><strong>Data-Driven Approach:</strong> Using metrics and feedback to prioritize.</li>
          <li><strong>Developer-Centric Thinking:</strong> Addressing engineer pain points.</li>
          <li><strong>Collaboration & Leadership:</strong> Aligning diverse stakeholders.</li>
          <li><strong>Impact & Scalability:</strong> Delivering measurable results.</li>
          <li><strong>Reflection & Learning:</strong> Reflecting on trade-offs and improvements.</li>
        </ul>
        <p className="text-gray-700 mt-4">
          This case study excels with a structured, incremental, and developer-driven approach, making it compelling for TPM interviews.
        </p>
      </section>
    </div>
  );
};

// Simulation Component
const Simulation = () => {
  const [serviceComplexity, setServiceComplexity] = useState(5);
  const [dualRunningDuration, setDualRunningDuration] = useState(3);
  const [velocity, setVelocity] = useState(1);
  const [downtime, setDowntime] = useState(0.05);
  const [migrationProgress, setMigrationProgress] = useState(30);

  const calculateImpact = useCallback(() => {
    let newVelocity = 1;
    let newDowntime = 0.05;
    let newMigrationProgress = 30;

    // Higher complexity reduces velocity and progress, increases downtime
    newVelocity -= serviceComplexity * 0.1;
    newDowntime += serviceComplexity * 0.005;
    newMigrationProgress -= serviceComplexity * 2;

    // Longer dual running increases stability but slows progress
    newDowntime -= dualRunningDuration * 0.01;
    newVelocity += dualRunningDuration * 0.2;
    newMigrationProgress -= dualRunningDuration * 5;

    setVelocity(Math.max(1, newVelocity.toFixed(1)));
    setDowntime(Math.max(0, newDowntime.toFixed(3)));
    setMigrationProgress(Math.min(100, newMigrationProgress.toFixed(1)));
  }, [serviceComplexity, dualRunningDuration]);

  React.useEffect(() => {
    calculateImpact();
  }, [serviceComplexity, dualRunningDuration, calculateImpact]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-2">Service Complexity: {serviceComplexity}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={serviceComplexity}
          onChange={(e) => setServiceComplexity(Number(e.target.value))}
          className="w-full"
        />
      </div>
          
      <div>
        <label className="block text-gray-700 mb-2">Dual-Running Duration (months): {dualRunningDuration}</label>
        <input
          type="range"
          min="1"
          max="6"
          value={dualRunningDuration}
          onChange={(e) => setDualRunningDuration(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="p-4 bg-indigo-100 rounded-lg">
        <p className="text-gray-800 font-semibold">Simulated Outcomes:</p>
        <p className="text-gray-700">Release Velocity: {velocity}x</p>
        <p className="text-gray-700">Downtime: {downtime}%</p>
        <p className="text-gray-700">Migration Progress: {migrationProgress}%</p>
        <p className="text-gray-700 mt-2">
          {velocity >= 2 && downtime <= 0.01 && migrationProgress >= 60
            ? 'Success! Migration achieves 2x velocity, <0.01% downtime, and 60% progress.'
            : 'Adjust complexity and dual-running to achieve 2x velocity, <0.01% downtime, and 60% progress.'}
        </p>
      </div>
    </div>
  );
};

export default MicroservicesCaseStudy;