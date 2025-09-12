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
    { id: 'c1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Company Overview', description: 'SaaS analytics platform for SMBs/enterprises.', type: 'research' } },
    { id: 'c2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'Situation', description: 'Need for public API access.', type: 'research' } },
    { id: 'c3', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Challenge', description: 'Balance DX, security, reliability.', type: 'research' } },
  ],
  contextEdges: [
    { id: 'ce1-2', source: 'c1', target: 'c2', animated: true, label: 'Business Context', style: { stroke: '#6366f1' } },
    { id: 'ce2-3', source: 'c2', target: 'c3', animated: true, label: 'API Needs', style: { stroke: '#6366f1' } },
  ],
  problem: [
    { id: 'p1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Partner Research', description: 'Gather partner DX needs.', type: 'research' } },
    { id: 'p2', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'Technical Risks', description: 'Security, scalability issues.', type: 'research' } },
    { id: 'p3', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Business Risks', description: 'Low adoption, support load.', type: 'research' } },
  ],
  problemEdges: [
    { id: 'pe1-2', source: 'p1', target: 'p2', animated: true, label: 'Partner Feedback', style: { stroke: '#6366f1' } },
    { id: 'pe1-3', source: 'p1', target: 'p3', animated: true, label: 'DX Pain Points', style: { stroke: '#6366f1' } },
  ],
  goal: [
    { id: 'g1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Business Goals', description: 'Launch MVP, onboard partners.', type: 'research' } },
    { id: 'g2', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'DX & Technical Goals', description: 'Low TTFC, high reliability.', type: 'research' } },
  ],
  goalEdges: [
    { id: 'ge1-2', source: 'g1', target: 'g2', animated: true, label: 'Metric Alignment', style: { stroke: '#6366f1' } },
  ],
  approach: [
    { id: 'a1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'MVP Scope', description: 'Define read-only endpoints.', type: 'research' } },
    { id: 'a2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'API Design', description: 'RESTful, versioned endpoints.', type: 'implementation' } },
    { id: 'a3', type: 'custom', position: { x: 50, y: 350 }, data: { label: 'Security', description: 'OAuth, API keys, TLS.', type: 'implementation' } },
    { id: 'a4', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'Developer Experience', description: 'Portal, SDKs, docs.', type: 'implementation' } },
    { id: 'a5', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Monitoring', description: 'Dashboards, alerts, analytics.', type: 'implementation' } },
    { id: 'a6', type: 'custom', position: { x: 350, y: 350 }, data: { label: 'Rollout Plan', description: 'Internal, beta, public phases.', type: 'implementation' } },
  ],
  approachEdges: [
    { id: 'ae1-2', source: 'a1', target: 'a2', animated: true, label: 'Scope Definition', style: { stroke: '#6366f1' } },
    { id: 'ae2-3', source: 'a2', target: 'a3', animated: true, label: 'Security Needs', style: { stroke: '#6366f1' } },
    { id: 'ae2-4', source: 'a2', target: 'a4', animated: true, label: 'DX Requirements', style: { stroke: '#6366f1' } },
    { id: 'ae2-5', source: 'a2', target: 'a5', animated: true, label: 'Monitoring Needs', style: { stroke: '#6366f1' } },
    { id: 'ae4-6', source: 'a4', target: 'a6', animated: true, label: 'DX Feedback', style: { stroke: '#6366f1' } },
    { id: 'ae5-6', source: 'a5', target: 'a6', animated: true, label: 'Usage Metrics', style: { stroke: '#6366f1' } },
  ],
  results: [
    { id: 'r1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'MVP Launch', description: 'Launched in 3 months.', type: 'outcome' } },
    { id: 'r2', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'Beta Feedback', description: 'Refined DX, docs.', type: 'outcome' } },
    { id: 'r3', type: 'custom', position: { x: 650, y: 50 }, data: { label: 'Public Launch', description: 'Portal, SDKs, tiers.', type: 'outcome' } },
    { id: 'r4', type: 'custom', position: { x: 950, y: 50 }, data: { label: 'Business Impact', description: 'Retention, revenue.', type: 'outcome' } },
  ],
  resultsEdges: [
    { id: 're1-2', source: 'r1', target: 'r2', animated: true, label: 'MVP Metrics', style: { stroke: '#6366f1' } },
    { id: 're2-3', source: 'r2', target: 'r3', animated: true, label: 'Beta Feedback', style: { stroke: '#6366f1' } },
    { id: 're3-4', source: 'r3', target: 'r4', animated: true, label: 'Adoption Metrics', style: { stroke: '#6366f1' } },
  ],
};

// Step Details for Each Node
const stepDetails = {
  // Context Nodes
  c1: {
    title: 'Company Overview',
    description: 'SaaS analytics platform serving SMBs and enterprises.',
    tools: ['Mixpanel', 'Google Analytics'],
    thoughtProcess: 'Understanding the user base and platform capabilities shaped the API scope. I hypothesized partners needed analytics integration.',
    challenges: 'Aligning SMB and enterprise needs; scoping API for diverse use cases.',
    navigation: 'Analyzed Mixpanel data for user workflows and Google Analytics for partner segments. Conducted stakeholder interviews to confirm API demand.',
    userFeedback: 'N/A (Business-driven).',
    details: 'Serves 10K SMBs and 500 enterprises. 60% of partners requested API access for analytics integration.',
    dataConnection: 'Sends business context (e.g., user base, partner needs) to Situation node.'
  },
  c2: {
    title: 'Situation',
    description: 'Partners and customers demand programmatic API access.',
    tools: ['Jira', 'Confluence'],
    thoughtProcess: 'An API would enhance partner workflows. I expected DX and security to be critical for adoption.',
    challenges: 'Balancing speed with robustness; securing leadership buy-in.',
    navigation: 'Documented requirements in Confluence, tracked in Jira. Presented use cases (e.g., report fetching) to leadership for approval.',
    userFeedback: 'N/A (Leadership-driven).',
    details: 'Partners want to pull reports and event data into CRMs and dashboards. API must be secure and easy to adopt.',
    dataConnection: 'Sends API needs to Challenge node.'
  },
  c3: {
    title: 'Challenge',
    description: 'Design a secure, scalable API with great DX.',
    tools: ['Google Docs', 'Miro'],
    thoughtProcess: 'Balancing DX, security, and scalability was key. I prioritized a RESTful design to simplify adoption.',
    challenges: 'Avoiding poor design; preventing security risks.',
    navigation: 'Mapped use cases in Google Docs (e.g., report fetching, event data). Brainstormed design principles in Miro workshops.',
    userFeedback: 'N/A (Technical-driven).',
    details: 'Risks: low adoption due to complex DX, data leaks from weak security, support overload from errors.',
    dataConnection: 'Informs Partner Research and Technical Risks nodes.'
  },
  // Problem Nodes
  p1: {
    title: 'Partner Research',
    description: 'Gathered partner feedback on API use cases and DX needs.',
    tools: ['Google Forms', 'Zoom', 'Hotjar'],
    thoughtProcess: 'Partner feedback would validate use cases and DX priorities. I hypothesized report fetching was the top need.',
    challenges: 'Reaching diverse partners; quantifying DX pain points.',
    navigation: 'Surveyed 100 partners via Google Forms, conducted 8 Zoom interviews. Used Hotjar to analyze integration workflows.',
    userFeedback: '"We need easy report APIs," said 80% of partners. "Complex auth is a hassle," noted an enterprise developer.',
    details: '70% prioritized report fetching, 20% event data, 10% user info. 65% cited complex auth as a barrier.',
    dataConnection: 'Sends partner feedback to Technical Risks and Business Risks nodes.'
  },
  p2: {
    title: 'Technical Risks',
    description: 'Address security, scalability, and monitoring challenges.',
    tools: ['Postman', 'Swagger'],
    thoughtProcess: 'Security and scalability were critical to avoid failures. I expected OAuth and rate limiting to mitigate risks.',
    challenges: 'Ensuring secure auth; scaling for high request volumes.',
    navigation: 'Tested auth flows in Postman, defined API spec in Swagger. Scoped TLS and rate limiting to handle 10K requests/min.',
    userFeedback: 'N/A (Technical-driven).',
    details: 'Risks: data leaks from weak auth, downtime from unscaled APIs, blind spots without monitoring.',
    dataConnection: 'Receives partner feedback. Sends technical requirements to API Design node.'
  },
  p3: {
    title: 'Business Risks',
    description: 'Mitigate low adoption and support overload.',
    tools: ['Excel', 'Tableau'],
    thoughtProcess: 'Poor DX could drive churn, and errors could spike support costs. I prioritized a low TTFC to boost adoption.',
    challenges: 'Quantifying adoption impact; estimating support load.',
    navigation: 'Modeled adoption in Excel (10% churn risk per 5min TTFC increase). Visualized error rates in Tableau to justify monitoring.',
    userFeedback: 'N/A (Data-driven).',
    details: '5min TTFC increase risks 10% partner churn ($1M ARR loss). Poor monitoring could double support costs.',
    dataConnection: 'Receives partner feedback. Sends risk data to MVP Scope node.'
  },
  // Goal Nodes
  g1: {
    title: 'Business Goals',
    description: 'Launch MVP, onboard partners, increase retention.',
    tools: ['Mixpanel', 'Google Sheets'],
    thoughtProcess: 'Business goals drove prioritization. I expected API integration to boost partner stickiness.',
    challenges: 'Setting realistic timelines; aligning with partner needs.',
    navigation: 'Defined goals in Google Sheets (3-month MVP, 10 partners). Validated retention impact with Mixpanel data.',
    userFeedback: 'N/A (Business-driven).',
    details: 'Launch MVP in 3 months, onboard 10 pilot partners, achieve 15% retention increase.',
    dataConnection: 'Sends business goals to DX & Technical Goals node.'
  },
  g2: {
    title: 'DX & Technical Goals',
    description: 'Ensure low TTFC, high docs CSAT, low error rate.',
    tools: ['Prometheus', 'Grafana'],
    thoughtProcess: 'DX metrics ensured adoption, technical metrics ensured reliability. I targeted <10min TTFC to match industry standards.',
    challenges: 'Defining achievable DX metrics; ensuring low errors.',
    navigation: 'Set metrics in Prometheus (<1% error rate, 300ms latency). Built Grafana dashboards for TTFC and CSAT tracking.',
    userFeedback: 'N/A (Technical-driven).',
    details: '<10min TTFC, 90% docs CSAT, <1% error rate, clear usage monitoring.',
    dataConnection: 'Receives business goals. Sends metrics to Monitoring node.'
  },
  // Approach Nodes
  a1: {
    title: 'MVP Scope',
    description: 'Defined read-only endpoints for reports, events, user info.',
    tools: ['Confluence', 'Miro'],
    thoughtProcess: 'A narrow scope ensured fast delivery. I prioritized read-only to minimize complexity.',
    challenges: 'Balancing partner needs with speed; avoiding scope creep.',
    navigation: 'Defined endpoints in Confluence (/v1/reports, /v1/events). Validated scope in Miro workshops with partners.',
    userFeedback: '"Report APIs are our top need," said 70% of surveyed partners.',
    details: 'Endpoints: /v1/reports, /v1/events, /v1/accounts/:id. Excluded write APIs to simplify MVP.',
    dataConnection: 'Receives risk data. Sends scope to API Design node.'
  },
  a2: {
    title: 'API Design',
    description: 'Designed RESTful, versioned, paginated endpoints.',
    tools: ['Swagger', 'Node.js'],
    thoughtProcess: 'A consistent, scalable design was key for DX. I chose REST for simplicity, with versioning for future-proofing.',
    challenges: 'Ensuring predictable paths; planning for GraphQL.',
    navigation: 'Defined REST spec in Swagger (/v1/reports, cursor pagination). Implemented in Node.js with HTTP standards.',
    userFeedback: 'N/A (Technical-driven).',
    details: 'RESTful paths, /v1/ versioning, ISO 8601 timestamps, cursor-based pagination. Idempotency planned for writes.',
    dataConnection: 'Receives scope. Sends design to Security, DX, and Monitoring nodes.'
  },
  a3: {
    title: 'Security',
    description: 'Implemented OAuth 2.0, API keys, TLS, and audit logging.',
    tools: ['Auth0', 'AWS Secrets Manager'],
    thoughtProcess: 'Security was critical to prevent leaks. I prioritized OAuth for partners and API keys for services.',
    challenges: 'Balancing secure auth with DX; ensuring compliance.',
    navigation: 'Integrated Auth0 for OAuth 2.0, stored keys in AWS Secrets Manager. Enabled TLS 1.2+ and audit logging for all requests.',
    userFeedback: 'N/A (Technical-driven).',
    details: 'OAuth for apps, scoped API keys (1000 req/min), encrypted tokens, audit logs for compliance.',
    dataConnection: 'Receives API design. Sends security requirements to Rollout Plan node.'
  },
  a4: {
    title: 'Developer Experience',
    description: 'Built portal, SDKs, docs, and support channels.',
    tools: ['Swagger', 'Postman', 'React'],
    thoughtProcess: 'Great DX drives adoption. I prioritized a self-service portal and quickstart docs to hit <10min TTFC.',
    challenges: 'Simplifying onboarding; reducing support load.',
    navigation: 'Developed React-based portal with Swagger explorer. Published JS/Python SDKs and Postman collections. Created quickstart docs.',
    userFeedback: '"Docs are clear and easy," said 85% of beta partners.',
    details: 'Portal enables self-service key generation. Docs achieve 92% CSAT. Slack support for pilot partners.',
    dataConnection: 'Receives API design. Sends DX feedback to Rollout Plan node.'
  },
  a5: {
    title: 'Monitoring',
    description: 'Implemented dashboards, alerts, and usage analytics.',
    tools: ['Prometheus', 'Grafana', 'Datadog'],
    thoughtProcess: 'Observability ensured reliability and adoption tracking. I targeted <300ms latency and <1% errors.',
    challenges: 'Tracking TTFC; detecting abuse patterns.',
    navigation: 'Built Prometheus/Grafana dashboards for latency/errors. Set Datadog alerts for 4xx/5xx spikes. Tracked TTFC in Mixpanel.',
    userFeedback: 'N/A (Technical-driven).',
    details: 'Dashboards show request volume, errors, latency. Alerts for >1% errors. Analytics track endpoint adoption.',
    dataConnection: 'Receives API design. Sends usage metrics to Rollout Plan node.'
  },
  a6: {
    title: 'Rollout Plan',
    description: 'Phased rollout: internal, beta, public, expansion.',
    tools: ['Jira', 'Figma', 'Postman'],
    thoughtProcess: 'A phased approach balanced speed and stability. I prioritized internal dogfooding to catch issues early.',
    challenges: 'Managing partner feedback; scaling for public launch.',
    navigation: 'Planned phases in Jira: internal (6 weeks), beta (12 weeks), public (18 weeks). Designed portal UX in Figma, tested APIs in Postman.',
    userFeedback: '"Beta APIs are intuitive," said a pilot partner.',
    details: 'Phase 1: Internal dogfooding. Phase 2: 10 beta partners, 92% CSAT. Phase 3: Public launch with free/premium tiers.',
    dataConnection: 'Receives DX feedback and usage metrics. Sends rollout metrics to Results nodes.'
  },
  // Results Nodes
  r1: {
    title: 'MVP Launch',
    description: 'Launched read-only API in 3 months.',
    tools: ['Node.js', 'Mixpanel', 'Figma'],
    thoughtProcess: 'A lean MVP ensured fast delivery. I prioritized read-only endpoints to meet partner needs.',
    challenges: 'Ensuring DX; testing edge cases.',
    navigation: 'Implemented REST API in Node.js, designed UX in Figma. Tested with internal teams, tracked TTFC in Mixpanel.',
    userFeedback: '"APIs are easy to use," said 80% of internal users.',
    details: 'Launched /v1/reports, /v1/events. Achieved 8min TTFC, 0.8% error rate.',
    dataConnection: 'Sends MVP metrics to Beta Feedback node.'
  },
  r2: {
    title: 'Beta Feedback',
    description: 'Refined DX and docs based on 10 partner beta.',
    tools: ['Slack', 'Google Forms', 'Swagger'],
    thoughtProcess: 'Beta feedback was critical to improve DX. I expected docs and auth to need refinement.',
    challenges: 'Addressing diverse partner needs; updating docs quickly.',
    navigation: 'Collected feedback via Slack and Google Forms. Updated Swagger docs and portal based on 90% of comments.',
    userFeedback: '"Quickstart got us live in 7 minutes," said a beta partner.',
    details: '80% of partners achieved <8min TTFC. Docs CSAT reached 92%. Error rate dropped to 0.7%.',
    dataConnection: 'Receives MVP metrics. Sends beta feedback to Public Launch node.'
  },
  r3: {
    title: 'Public Launch',
    description: 'Launched public API with portal, SDKs, tiers.',
    tools: ['React', 'Postman', 'Mixpanel'],
    thoughtProcess: 'A polished public launch drove adoption. I prioritized SDKs and tiered rate limits for scalability.',
    challenges: 'Scaling for public usage; managing support.',
    navigation: 'Launched React portal with Postman collections and JS/Python SDKs. Introduced free (500 req/min) and premium (2000 req/min) tiers.',
    userFeedback: '"SDKs saved us time," said 75% of public users.',
    details: 'Onboarded 15 partners in 3 months. 90% CSAT, 0.6% error rate, +10% adoption rate.',
    dataConnection: 'Receives beta feedback. Sends adoption metrics to Business Impact node.'
  },
  r4: {
    title: 'Business Impact',
    description: 'Increased retention, generated new revenue.',
    tools: ['Mixpanel', 'Tableau', 'Google BigQuery'],
    thoughtProcess: 'Metrics validated the API’s impact. I focused on retention and revenue to quantify success.',
    challenges: 'Isolating API impact; projecting revenue.',
    navigation: 'Tracked retention in Mixpanel, visualized in Tableau. Used BigQuery for adoption analysis. Conducted A/B tests.',
    userFeedback: '"API integration keeps us engaged," said 85% of partners.',
    details: '+12% retention, $500K ARR from premium tier, 40% support reduction.',
    dataConnection: 'Receives adoption metrics. Outputs final impact metrics.'
  },
};

// Case Study Component
const SaaSAPICaseStudy = () => {
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
          You are a Product Manager at a mid-stage SaaS company offering a data analytics platform to SMBs and enterprises. Partners and customers are asking for programmatic access to pull insights into their own systems and workflows. Leadership wants to launch a public API that external developers can easily adopt, without creating new security risks or a flood of support tickets.
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
          <li>DX is critical for adoption; great docs and SDKs reduce support load.</li>
          <li>Security-first design (OAuth, scoped keys) prevents risks.</li>
          <li>Phased rollout balances speed and stability.</li>
          <li><strong>Next Step:</strong> Launch write APIs, introduce GraphQL, and build a partner marketplace.</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Key Takeaways</h3>
        <p className="text-gray-700">
          As a PM, I drove impact by prioritizing DX, security, and iterative rollouts. This data-driven, partner-focused approach demonstrates leadership and scalability, critical for SaaS platforms.
        </p>
      </section>

      {/* Simulation Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-3xl text-green-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Simulation: API Feature Impact</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Adjust API feature variables to see their impact on TTFC, error rate, and partner adoption, simulating the DX and reliability trade-offs.
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
            <h3 className="text-xl font-semibold text-gray-800">Q1: How did you scope the MVP?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I prioritized read-only endpoints (/v1/reports, /v1/events) based on partner feedback (70% prioritized reports). Excluded write APIs to ship in 3 months, validated via Confluence and Miro workshops. This balanced speed and partner needs.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q2: How did you ensure great DX?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I built a React-based portal with Swagger explorer, JS/Python SDKs, and Postman collections. Quickstart docs achieved &lt;8min TTFC for 80% of beta partners, with 92% CSAT. Slack support resolved issues fast.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q3: How did you address security risks?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I implemented OAuth 2.0 via Auth0, scoped API keys (1000 req/min), TLS 1.2+, and audit logging. Keys were stored in AWS Secrets Manager. Beta tests confirmed no leaks, with 0.7% error rate.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q4: How did you measure success?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> Success was measured by 3-month MVP launch, &lt;8min TTFC (80% of partners), 92% docs CSAT, 0.6% error rate, and +12% retention. Mixpanel and Tableau tracked metrics, with A/B tests isolating API impact.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q5: What would you do differently?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I’d conduct deeper partner research upfront to validate write API demand. I’d introduce a sandbox environment earlier for testing. Finally, I’d explore GraphQL in the beta to support complex queries.
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
          Interviewers at companies like Meta or X assess PM case studies based on:
        </p>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li><strong>Technical Acumen:</strong> Designing scalable, secure APIs.</li>
          <li><strong>Data-Driven Approach:</strong> Using metrics and feedback to prioritize and validate.</li>
          <li><strong>User-Centric Thinking:</strong> Addressing partner DX needs.</li>
          <li><strong>Collaboration & Leadership:</strong> Aligning teams and partners.</li>
          <li><strong>Impact & Scalability:</strong> Delivering measurable results with scalability.</li>
          <li><strong>Reflection & Learning:</strong> Reflecting on challenges and improvements.</li>
        </ul>
        <p className="text-gray-700 mt-4">
          This case study excels with a structured, partner-driven, and technically robust approach, making it compelling for interviews.
        </p>
      </section>
    </div>
  );
};

// Simulation Component
const Simulation = () => {
  const [endpointComplexity, setEndpointComplexity] = useState(3);
  const [securityLevel, setSecurityLevel] = useState(7);
  const [ttfc, setTtfc] = useState(15);
  const [errorRate, setErrorRate] = useState(2);
  const [adoptionRate, setAdoptionRate] = useState(50);

  const calculateImpact = useCallback(() => {
    let newTtfc = 15;
    let newErrorRate = 2;
    let newAdoptionRate = 50;

    // Lower complexity reduces TTFC and errors
    newTtfc -= endpointComplexity * 2;
    newErrorRate -= (10 - endpointComplexity) * 0.2;
    newAdoptionRate += (10 - endpointComplexity) * 5;

    // Higher security increases TTFC slightly but reduces errors
    newTtfc += securityLevel * 0.5;
    newErrorRate -= securityLevel * 0.2;
    newAdoptionRate += securityLevel * 3;

    setTtfc(Math.max(5, newTtfc.toFixed(1)));
    setErrorRate(Math.max(0, newErrorRate.toFixed(1)));
    setAdoptionRate(Math.min(100, newAdoptionRate));
  }, [endpointComplexity, securityLevel]);

  React.useEffect(() => {
    calculateImpact();
  }, [endpointComplexity, securityLevel, calculateImpact]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-2">Endpoint Complexity: {endpointComplexity}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={endpointComplexity}
          onChange={(e) => setEndpointComplexity(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Security Level: {securityLevel}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={securityLevel}
          onChange={(e) => setSecurityLevel(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="p-4 bg-indigo-100 rounded-lg">
        <p className="text-gray-800 font-semibold">Simulated Outcomes:</p>
        <p className="text-gray-700">Time-to-First-Call: {ttfc} minutes</p>
        <p className="text-gray-700">Error Rate: {errorRate}%</p>
        <p className="text-gray-700">Partner Adoption Rate: {adoptionRate}%</p>
        <p className="text-gray-700 mt-2">
          {ttfc <= 10 && errorRate <= 1
            ? 'Success! API achieves <10min TTFC and <1% error rate, driving high adoption.'
            : 'Adjust complexity and security to achieve <10min TTFC and <1% error rate.'}
        </p>
      </div>
    </div>
  );
};

export default SaaSAPICaseStudy;