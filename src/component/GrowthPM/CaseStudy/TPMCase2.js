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
    { id: 'c1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Company Overview', description: 'Commerce platform with 2M MAUs.', type: 'research' } },
    { id: 'c2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'Situation', description: 'Need for unified payments layer.', type: 'research' } },
    { id: 'c3', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Challenge', description: 'Integrate multiple gateways.', type: 'research' } },
  ],
  contextEdges: [
    { id: 'ce1-2', source: 'c1', target: 'c2', animated: true, label: 'Business Context', style: { stroke: '#6366f1' } },
    { id: 'ce2-3', source: 'c2', target: 'c3', animated: true, label: 'Integration Needs', style: { stroke: '#6366f1' } },
  ],
  problem: [
    { id: 'p1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'User Research', description: 'Gather merchant/user pain points.', type: 'research' } },
    { id: 'p2', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'Technical Challenges', description: 'API differences, compliance.', type: 'research' } },
    { id: 'p3', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Business Risks', description: 'Conversion loss, rework.', type: 'research' } },
  ],
  problemEdges: [
    { id: 'pe1-2', source: 'p1', target: 'p2', animated: true, label: 'Merchant Feedback', style: { stroke: '#6366f1' } },
    { id: 'pe1-3', source: 'p1', target: 'p3', animated: true, label: 'Pain Points', style: { stroke: '#6366f1' } },
  ],
  goal: [
    { id: 'g1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Business Goals', description: 'Increase conversion, new markets.', type: 'research' } },
    { id: 'g2', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'Technical Goals', description: 'Success rate, latency.', type: 'research' } },
  ],
  goalEdges: [
    { id: 'ge1-2', source: 'g1', target: 'g2', animated: true, label: 'Metric Alignment', style: { stroke: '#6366f1' } },
  ],
  approach: [
    { id: 'a1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'API Contract', description: 'Define canonical payment model.', type: 'research' } },
    { id: 'a2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'Architecture', description: 'Facade, adapters, orchestration.', type: 'implementation' } },
    { id: 'a3', type: 'custom', position: { x: 50, y: 350 }, data: { label: 'Security & Compliance', description: 'PCI-DSS, KYC/AML.', type: 'implementation' } },
    { id: 'a4', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'Reliability & Fallbacks', description: 'Idempotency, circuit breakers.', type: 'implementation' } },
    { id: 'a5', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Prioritization', description: 'Rank providers by impact.', type: 'research' } },
    { id: 'a6', type: 'custom', position: { x: 350, y: 350 }, data: { label: 'Roadmap', description: 'Phased implementation.', type: 'implementation' } },
    { id: 'a7', type: 'custom', position: { x: 650, y: 200 }, data: { label: 'Testing & Monitoring', description: 'Unit tests, observability.', type: 'implementation' } },
    { id: 'a8', type: 'custom', position: { x: 950, y: 200 }, data: { label: 'Reconciliation', description: 'Batch jobs, audit logs.', type: 'implementation' } },
  ],
  approachEdges: [
    { id: 'ae1-2', source: 'a1', target: 'a2', animated: true, label: 'API Design', style: { stroke: '#6366f1' } },
    { id: 'ae2-3', source: 'a2', target: 'a3', animated: true, label: 'Security Needs', style: { stroke: '#6366f1' } },
    { id: 'ae2-4', source: 'a2', target: 'a4', animated: true, label: 'Reliability Needs', style: { stroke: '#6366f1' } },
    { id: 'ae2-5', source: 'a2', target: 'a5', animated: true, label: 'Provider Selection', style: { stroke: '#6366f1' } },
    { id: 'ae5-6', source: 'a5', target: 'a6', animated: true, label: 'Prioritization Data', style: { stroke: '#6366f1' } },
    { id: 'ae6-7', source: 'a6', target: 'a7', animated: true, label: 'Implementation Metrics', style: { stroke: '#6366f1' } },
    { id: 'ae6-8', source: 'a6', target: 'a8', animated: true, label: 'Reconciliation Needs', style: { stroke: '#6366f1' } },
  ],
  results: [
    { id: 'r1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'MVP Launch', description: 'Stripe integration.', type: 'outcome' } },
    { id: 'r2', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'PayPal & Wallets', description: 'Wallet-first flows.', type: 'outcome' } },
    { id: 'r3', type: 'custom', position: { x: 650, y: 50 }, data: { label: 'Local Gateways', description: 'Market expansion.', type: 'outcome' } },
    { id: 'r4', type: 'custom', position: { x: 950, y: 50 }, data: { label: 'Overall Impact', description: 'Conversion, GMV lift.', type: 'outcome' } },
  ],
  resultsEdges: [
    { id: 're1-2', source: 'r1', target: 'r2', animated: true, label: 'MVP Metrics', style: { stroke: '#6366f1' } },
    { id: 're2-3', source: 'r2', target: 'r3', animated: true, label: 'Wallet Metrics', style: { stroke: '#6366f1' } },
    { id: 're3-4', source: 'r3', target: 'r4', animated: true, label: 'Market Metrics', style: { stroke: '#6366f1' } },
  ],
};

// Step Details for Each Node
const stepDetails = {
  // Context Nodes
  c1: {
    title: 'Company Overview',
    description: 'Commerce platform with 2M MAUs, focused on marketplace and direct sellers.',
    tools: ['Mixpanel', 'Google Analytics'],
    thoughtProcess: 'Understanding the platform’s scale and user base was key to scoping the payments solution. I hypothesized global expansion required flexible payment options.',
    challenges: 'Assessing diverse merchant needs; aligning with global expansion plans.',
    navigation: 'Analyzed Mixpanel data for user behavior and Google Analytics for market spread. Conducted stakeholder interviews to confirm expansion goals.',
    userFeedback: 'N/A (Business-driven).',
    details: '2M MAUs, 60% marketplace sellers, 40% direct sellers. Expansion plans target 3 new markets (East Africa, LATAM, SEA).',
    dataConnection: 'Sends business context (e.g., user base, expansion goals) to Situation node.'
  },
  c2: {
    title: 'Situation',
    description: 'Leadership wants a unified payments layer to support multiple gateways.',
    tools: ['Jira', 'Confluence'],
    thoughtProcess: 'A single API would simplify integration for product teams. I expected diverse gateway APIs to complicate development.',
    challenges: 'Balancing speed with flexibility; securing leadership buy-in.',
    navigation: 'Documented requirements in Confluence and aligned via Jira. Presented use cases (e.g., Stripe, M-Pesa) to leadership for approval.',
    userFeedback: 'N/A (Leadership-driven).',
    details: 'Need for Stripe, PayPal, and local PSPs to increase conversion and enter new markets. Solution must be reliable and auditable.',
    dataConnection: 'Sends integration needs to Challenge node.'
  },
  c3: {
    title: 'Challenge',
    description: 'Integrate multiple gateways with differing APIs, compliance, and behaviors.',
    tools: ['Google Docs', 'Miro'],
    thoughtProcess: 'Diverse APIs and compliance requirements posed technical and operational risks. I prioritized a flexible architecture to avoid rework.',
    challenges: 'Mapping diverse APIs to a single model; ensuring compliance.',
    navigation: 'Mapped gateway differences (e.g., auth models, currencies) in Google Docs. Brainstormed architecture options in Miro workshops.',
    userFeedback: 'N/A (Technical-driven).',
    details: 'Stripe uses REST, PayPal has wallet flows, M-Pesa requires mobile integration. Compliance includes PCI-DSS, KYC/AML.',
    dataConnection: 'Informs User Research and Technical Challenges nodes.'
  },
  // Problem Nodes
  p1: {
    title: 'User Research',
    description: 'Gathered merchant and user feedback on payment pain points.',
    tools: ['Google Forms', 'Hotjar', 'Zoom'],
    thoughtProcess: 'Merchant and user feedback would prioritize features. I hypothesized checkout friction and payment failures were key issues.',
    challenges: 'Reaching diverse merchants; quantifying failure impact.',
    navigation: 'Surveyed 200 merchants/users via Google Forms, conducted 10 Zoom interviews. Used Hotjar to analyze checkout drop-offs.',
    userFeedback: '"Slow checkouts lose sales," said 75% of merchants. "I want local payment options," said 60% of users.',
    details: 'Found 10% checkout abandonment due to slow processing, 15% due to unavailable local methods. Feedback prioritized Stripe and M-Pesa.',
    dataConnection: 'Sends merchant feedback to Technical Challenges and Business Risks nodes.'
  },
  p2: {
    title: 'Technical Challenges',
    description: 'Address API differences, compliance, and reliability.',
    tools: ['Postman', 'Swagger'],
    thoughtProcess: 'API diversity and compliance were technical hurdles. I expected a facade pattern to simplify integration.',
    challenges: 'Normalizing APIs; ensuring PCI-DSS compliance.',
    navigation: 'Analyzed APIs with Postman, defined canonical model in Swagger. Scoped PCI-DSS to provider-hosted tokenization.',
    userFeedback: 'N/A (Technical-driven).',
    details: 'Stripe uses OAuth, PayPal has custom flows, M-Pesa needs mobile SDK. Compliance requires secure tokenization and KYC.',
    dataConnection: 'Receives merchant feedback. Sends technical requirements to API Contract node.'
  },
  p3: {
    title: 'Business Risks',
    description: 'Mitigate conversion loss and costly rework.',
    tools: ['Excel', 'Tableau'],
    thoughtProcess: 'Conversion loss and rework were key risks. I prioritized providers with high ROI to minimize impact.',
    challenges: 'Quantifying conversion impact; avoiding over-engineered solutions.',
    navigation: 'Modeled conversion loss in Excel (10% drop per 500ms latency). Visualized failure rates in Tableau to justify prioritization.',
    userFeedback: 'N/A (Data-driven).',
    details: '10% checkout abandonment costs $2M/year GMV. Rework could delay market entry by 3 months.',
    dataConnection: 'Receives merchant feedback. Sends risk data to Prioritization node.'
  },
  // Goal Nodes
  g1: {
    title: 'Business Goals',
    description: 'Increase conversion, reduce failures, launch new markets.',
    tools: ['Mixpanel', 'Google Sheets'],
    thoughtProcess: 'Business goals drove prioritization. I expected local gateways to unlock new markets and reduce friction.',
    challenges: 'Balancing global vs. local priorities; setting realistic targets.',
    navigation: 'Defined goals in Google Sheets (+6% conversion, 3 markets). Validated with Mixpanel data on checkout funnels.',
    userFeedback: 'N/A (Business-driven).',
    details: '+6% checkout conversion, 30% failure reduction, launch in East Africa, LATAM, SEA in 6 months.',
    dataConnection: 'Sends business goals to Technical Goals node.'
  },
  g2: {
    title: 'Technical Goals',
    description: 'Ensure high success rate, low latency, accurate reconciliation.',
    tools: ['Prometheus', 'Grafana'],
    thoughtProcess: 'Technical metrics ensured reliability. I targeted 500ms P95 latency to match industry standards.',
    challenges: 'Defining achievable metrics; aligning with business goals.',
    navigation: 'Set metrics in Prometheus (99% success, 500ms latency). Built Grafana dashboards to track progress.',
    userFeedback: 'N/A (Technical-driven).',
    details: '99% transaction success, 500ms P95 latency, 100% reconciliation accuracy, <1% chargeback rate.',
    dataConnection: 'Receives business goals. Sends metrics to Testing & Monitoring node.'
  },
  // Approach Nodes
  a1: {
    title: 'API Contract',
    description: 'Defined canonical payment model for internal API.',
    tools: ['Swagger', 'Confluence'],
    thoughtProcess: 'A unified API contract would simplify integration. I prioritized a flexible model to handle diverse gateways.',
    challenges: 'Balancing flexibility with simplicity; aligning teams.',
    navigation: 'Designed model in Swagger (intent, authorize, capture, refund). Documented in Confluence, validated with engineering.',
    userFeedback: 'N/A (Technical-driven).',
    details: 'Fields: currency, payment_method_type, payment_token, customer_id, 3DS, locale. Supports cards, wallets, mobile payments.',
    dataConnection: 'Sends API design to Architecture node.'
  },
  a2: {
    title: 'Architecture',
    description: 'Built facade, adapters, orchestration, and token vault.',
    tools: ['Node.js', 'Kafka', 'AWS'],
    thoughtProcess: 'A facade pattern would abstract gateway differences. Async processing and tokenization were critical for scalability and compliance.',
    challenges: 'Integrating diverse APIs; ensuring scalability.',
    navigation: 'Implemented Payment Facade and adapters in Node.js. Used Kafka for async jobs (retries, settlement). Deployed token vault on AWS.',
    userFeedback: 'N/A (Technical-driven).',
    details: 'Facade maps canonical model to Stripe/PayPal APIs. Orchestration handles multi-step flows. Kafka processes 10K jobs/day.',
    dataConnection: 'Receives API design. Sends requirements to Security, Reliability, and Prioritization nodes.'
  },
  a3: {
    title: 'Security & Compliance',
    description: 'Minimized PCI-DSS scope, secured secrets, validated webhooks.',
    tools: ['HashiCorp Vault', 'AWS Secrets Manager'],
    thoughtProcess: 'Compliance was non-negotiable. I prioritized provider-hosted tokenization to reduce PCI scope.',
    challenges: 'Balancing security with speed; handling local KYC.',
    navigation: 'Used Stripe’s hosted checkout and AWS PCI proxy. Stored secrets in HashiCorp Vault, implemented mTLS. Integrated KYC via third-party API.',
    userFeedback: 'N/A (Technical-driven).',
    details: 'PCI-DSS scope limited to vault. Webhooks use HMAC signatures. KYC checks for M-Pesa comply with local AML.',
    dataConnection: 'Receives architecture requirements. Sends compliance data to Roadmap node.'
  },
  a4: {
    title: 'Reliability & Fallbacks',
    description: 'Ensured idempotency, circuit breakers, and provider fallbacks.',
    tools: ['resilience4j', 'Redis'],
    thoughtProcess: 'Reliability was critical for trust. I prioritized idempotency and fallbacks to handle gateway failures.',
    challenges: 'Preventing double-charges; managing failover logic.',
    navigation: 'Added idempotency keys in Redis. Implemented circuit breakers with resilience4j. Configured failover routing (Stripe → PayPal).',
    userFeedback: 'N/A (Technical-driven).',
    details: '99% success rate via retries. Fallback reduced failures by 20%. Circuit breakers handle 5% of requests.',
    dataConnection: 'Receives architecture requirements. Sends reliability data to Roadmap node.'
  },
  a5: {
    title: 'Prioritization',
    description: 'Ranked providers by revenue, coverage, effort, compliance.',
    tools: ['Excel', 'Miro', 'Tableau'],
    thoughtProcess: 'A weighted framework ensured data-driven prioritization. I expected Stripe to offer high ROI, M-Pesa to unlock markets.',
    challenges: 'Balancing global vs. local providers; quantifying impact.',
    navigation: 'Built weighted score in Excel (40% revenue, 25% coverage). Validated in Miro workshops. Visualized ROI in Tableau.',
    userFeedback: '"Local payments are critical," said 80% of East African merchants.',
    details: 'Stripe: 8/10 (low effort, global). PayPal: 7/10 (wallet adoption). M-Pesa: 6/10 (high impact, complex).',
    dataConnection: 'Receives merchant feedback and risk data. Sends prioritization to Roadmap node.'
  },
  a6: {
    title: 'Roadmap',
    description: 'Phased implementation: MVP, PayPal, local gateways, robustness.',
    tools: ['Jira', 'Figma', 'Postman'],
    thoughtProcess: 'A phased approach balanced speed and scalability. I prioritized Stripe for quick wins, M-Pesa for market expansion.',
    challenges: 'Managing scope creep; aligning cross-functional teams.',
    navigation: 'Planned phases in Jira: MVP (Stripe, 6 weeks), PayPal (12 weeks), M-Pesa (6 months). Designed UX in Figma, tested APIs in Postman.',
    userFeedback: '"Faster checkouts are key," said a marketplace seller.',
    details: 'Phase 1: Stripe MVP (+3% conversion). Phase 3: M-Pesa (+20% GMV in East Africa). Phase 4: Failover, SLOs.',
    dataConnection: 'Receives prioritization, security, reliability data. Sends implementation metrics to Testing and Reconciliation nodes.'
  },
  a7: {
    title: 'Testing & Monitoring',
    description: 'Conducted unit, contract, chaos tests; monitored metrics.',
    tools: ['Jest', 'Prometheus', 'Grafana'],
    thoughtProcess: 'Rigorous testing ensured reliability. Observability was critical to track success and failures.',
    challenges: 'Simulating provider failures; defining SLOs.',
    navigation: 'Wrote Jest unit/contract tests for adapters. Ran chaos tests with Gremlin. Monitored latency/success in Prometheus/Grafana.',
    userFeedback: 'N/A (Technical-driven).',
    details: '99% test coverage for adapters. Alerts for >1% failure rate, >500ms latency. Dashboards track reconciliation diffs.',
    dataConnection: 'Receives implementation metrics. Sends monitoring data to Reconciliation and Outcome nodes.'
  },
  a8: {
    title: 'Reconciliation',
    description: 'Implemented batch jobs, audit logs, merchant statements.',
    tools: ['Kafka', 'PostgreSQL', 'Looker'],
    thoughtProcess: 'Accurate reconciliation was critical for trust and compliance. I prioritized daily batch jobs and auditability.',
    challenges: 'Handling settlement mismatches; scaling batch jobs.',
    navigation: 'Built Kafka-based reconciliation jobs, stored logs in PostgreSQL. Created Looker dashboards for ops and merchant exports.',
    userFeedback: '"Clear statements help us track payments," said a merchant.',
    details: '100% reconciliation accuracy, 10K daily jobs. CSV exports for merchants. Audit logs for compliance.',
    dataConnection: 'Receives implementation metrics. Sends reconciliation data to Outcome nodes.'
  },
  // Results Nodes
  r1: {
    title: 'MVP Launch',
    description: 'Launched Stripe integration in 6 weeks.',
    tools: ['Stripe API', 'Figma', 'Mixpanel'],
    thoughtProcess: 'Stripe’s developer-friendly API enabled quick wins. I prioritized hosted checkout for speed and compliance.',
    challenges: 'Ensuring seamless UX; testing edge cases.',
    navigation: 'Integrated Stripe via REST API, designed UX in Figma. Tested with 100 merchants, tracked conversion in Mixpanel.',
    userFeedback: '"Checkout is much smoother," said 80% of pilot merchants.',
    details: '+3% conversion lift, 99.5% success rate, 400ms P95 latency.',
    dataConnection: 'Sends MVP metrics to PayPal & Wallets node.'
  },
  r2: {
    title: 'PayPal & Wallets',
    description: 'Integrated PayPal and wallet-first flows by week 12.',
    tools: ['PayPal API', 'GraphQL', 'Mixpanel'],
    thoughtProcess: 'PayPal’s wallet user base was key for conversion. I prioritized wallet flows for high-adoption markets.',
    challenges: 'Handling PayPal’s custom flows; optimizing wallet UX.',
    navigation: 'Integrated PayPal REST API via GraphQL. Tested wallet UX with 50 merchants. Monitored uptake in Mixpanel.',
    userFeedback: '"PayPal is convenient," said 70% of users in target markets.',
    details: '+4% conversion in PayPal-heavy markets, 99% success rate.',
    dataConnection: 'Receives MVP metrics. Sends wallet metrics to Local Gateways node.'
  },
  r3: {
    title: 'Local Gateways',
    description: 'Rolled out M-Pesa and other PSPs by month 6.',
    tools: ['M-Pesa SDK', 'Postman', 'Looker'],
    thoughtProcess: 'Local gateways unlocked new markets. I prioritized M-Pesa for East Africa due to high demand.',
    challenges: 'Integrating mobile SDKs; handling local compliance.',
    navigation: 'Integrated M-Pesa via SDK, tested with Postman. Added KYC/AML via third-party API. Monitored GMV in Looker.',
    userFeedback: '"M-Pesa makes payments easy," said 85% of East African users.',
    details: '+20% GMV in new markets, 98.5% success rate, 100% reconciliation.',
    dataConnection: 'Receives wallet metrics. Sends market metrics to Overall Impact node.'
  },
  r4: {
    title: 'Overall Impact',
    description: 'Achieved conversion lift, GMV growth, and operational reliability.',
    tools: ['Mixpanel', 'Tableau', 'Google BigQuery'],
    thoughtProcess: 'Metrics validated the solution’s impact. I focused on conversion, GMV, and operational metrics to quantify success.',
    challenges: 'Isolating payment impact; ensuring long-term scalability.',
    navigation: 'Tracked conversion/GMV in Mixpanel, visualized in Tableau. Used BigQuery for failure analysis. Conducted A/B tests.',
    userFeedback: '"Payments are faster and more reliable," said 90% of surveyed merchants.',
    details: '+6% conversion, 30% failure reduction, +20% GMV in new markets, 99% success rate, 1% error rate.',
    dataConnection: 'Receives market metrics. Outputs final impact metrics.'
  },
};

// Case Study Component
const PaymentsIntegrationCaseStudy = () => {
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
          You are a Product Manager at a growing commerce platform with 2M monthly active users and global expansion plans. Leadership wants a single payments integration layer that supports Stripe, PayPal, and multiple local gateways to increase conversion, lower fees, and enable new markets. Different providers have different APIs, auth models, currencies, settlement behavior, fees, and compliance obligations. The product must be reliable, auditable, and easy for internal teams and partners to use.
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
          <li>A unified API simplifies integration while supporting diverse gateways.</li>
          <li>Prioritization frameworks balance revenue and market expansion.</li>
          <li>Compliance and reliability are critical for trust and scalability.</li>
          <li><strong>Next Step:</strong> Implement dynamic fee routing and split-pay for marketplace sellers.</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Key Takeaways</h3>
        <p className="text-gray-700">
          As a PM, I drove impact by combining user insights, technical rigor, and phased execution. This structured, data-driven approach demonstrates leadership and scalability, critical for global commerce platforms.
        </p>
      </section>

      {/* Simulation Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-3xl text-green-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Simulation: Provider Prioritization</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Adjust prioritization variables to see which provider is prioritized, simulating the decision-making process used in the case study.
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
            <h3 className="text-xl font-semibold text-gray-800">Q1: How did you prioritize providers?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I used a weighted framework (40% revenue, 25% coverage, 20% effort, 10% compliance, 5% partnerships). Stripe scored 8/10 for low effort and global reach, PayPal 7/10 for wallet adoption, and M-Pesa 6/10 for regional impact. Merchant feedback (80% wanted local options) and ROI modeling in Excel validated Stripe and M-Pesa.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q2: How did you ensure compliance?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I minimized PCI-DSS scope with provider-hosted tokenization (Stripe) and AWS PCI proxy. Secrets were stored in HashiCorp Vault, and mTLS secured service calls. KYC/AML for M-Pesa was integrated via a third-party API, validated with legal to meet local regulations.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q3: How did you handle reliability?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I used idempotency keys in Redis to prevent double-charges, resilience4j for circuit breakers, and failover routing (Stripe → PayPal). Chaos tests with Gremlin simulated failures, achieving 99% success rate and 20% failure reduction via fallbacks.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q4: How did you measure success?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> Success was measured by +6% conversion, 30% failure reduction, and +20% GMV in new markets. Technical metrics included 99% success rate, 400ms P95 latency, and 100% reconciliation accuracy, tracked via Mixpanel and Grafana. Merchant feedback (90% reported smoother payments) validated UX impact.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q5: What would you do differently?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I’d conduct deeper user research upfront to quantify local gateway demand. I’d explore dynamic fee routing earlier to optimize costs. Finally, I’d implement multi-currency pricing in the MVP to accelerate market entry.
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
          <li><strong>Technical Acumen:</strong> Designing scalable, compliant payment systems.</li>
          <li><strong>Data-Driven Approach:</strong> Using metrics and user feedback to prioritize and validate.</li>
          <li><strong>User-Centric Thinking:</strong> Addressing merchant and user pain points.</li>
          <li><strong>Collaboration & Leadership:</strong> Aligning cross-functional teams and partners.</li>
          <li><strong>Impact & Scalability:</strong> Delivering measurable results with global scalability.</li>
          <li><strong>Reflection & Learning:</strong> Reflecting on challenges and improvements.</li>
        </ul>
        <p className="text-gray-700 mt-4">
          This case study excels with a structured, user-driven, and technically robust approach, making it compelling for interviews.
        </p>
      </section>
    </div>
  );
};

// Simulation Component
const Simulation = () => {
  const [stripeRevenue, setStripeRevenue] = useState(8);
  const [stripeEffort, setStripeEffort] = useState(3);
  const [paypalRevenue, setPaypalRevenue] = useState(7);
  const [paypalEffort, setPaypalEffort] = useState(5);
  const [mpesaRevenue, setMpesaRevenue] = useState(6);
  const [mpesaEffort, setMpesaEffort] = useState(7);
  const [prioritizedProvider, setPrioritizedProvider] = useState('Stripe');

  const calculatePriority = useCallback(() => {
    const stripeScore = (stripeRevenue * 0.4 + (10 - stripeEffort) * 0.2 + 8 * 0.25 + 5 * 0.1 + 5 * 0.05);
    const paypalScore = (paypalRevenue * 0.4 + (10 - paypalEffort) * 0.2 + 7 * 0.25 + 6 * 0.1 + 6 * 0.05);
    const mpesaScore = (mpesaRevenue * 0.4 + (10 - mpesaEffort) * 0.2 + 6 * 0.25 + 4 * 0.1 + 4 * 0.05);

    if (stripeScore >= paypalScore && stripeScore >= mpesaScore) {
      setPrioritizedProvider('Stripe');
    } else if (paypalScore >= stripeScore && paypalScore >= mpesaScore) {
      setPrioritizedProvider('PayPal');
    } else {
      setPrioritizedProvider('M-Pesa');
    }
  }, [stripeRevenue, stripeEffort, paypalRevenue, paypalEffort, mpesaRevenue, mpesaEffort]);

  React.useEffect(() => {
    calculatePriority();
  }, [stripeRevenue, stripeEffort, paypalRevenue, paypalEffort, mpesaRevenue, mpesaEffort, calculatePriority]);

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-lg font-semibold text-gray-800">Stripe</h4>
        <label className="block text-gray-700 mb-2">Revenue Impact: {stripeRevenue}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={stripeRevenue}
          onChange={(e) => setStripeRevenue(Number(e.target.value))}
          className="w-full"
        />
        <label className="block text-gray-700 mb-2">Integration Effort: {stripeEffort}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={stripeEffort}
          onChange={(e) => setStripeEffort(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-800">PayPal</h4>
        <label className="block text-gray-700 mb-2">Revenue Impact: {paypalRevenue}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={paypalRevenue}
          onChange={(e) => setPaypalRevenue(Number(e.target.value))}
          className="w-full"
        />
        <label className="block text-gray-700 mb-2">Integration Effort: {paypalEffort}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={paypalEffort}
          onChange={(e) => setPaypalEffort(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-800">M-Pesa</h4>
        <label className="block text-gray-700 mb-2">Revenue Impact: {mpesaRevenue}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={mpesaRevenue}
          onChange={(e) => setMpesaRevenue(Number(e.target.value))}
          className="w-full"
        />
        <label className="block text-gray-700 mb-2">Integration Effort: {mpesaEffort}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={mpesaEffort}
          onChange={(e) => setMpesaEffort(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="p-4 bg-indigo-100 rounded-lg">
        <p className="text-gray-800 font-semibold">Prioritized Provider: {prioritizedProvider}</p>
        <p className="text-gray-700 mt-2">
          {prioritizedProvider === 'Stripe'
            ? 'Success! Stripe is prioritized due to high revenue impact and low integration effort.'
            : 'Adjust Revenue Impact and Effort to prioritize Stripe for optimal ROI and speed.'}
        </p>
      </div>
    </div>
  );
};

export default PaymentsIntegrationCaseStudy;