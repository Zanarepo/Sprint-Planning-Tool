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
    { id: 'c1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Company Overview', description: 'Fintech with 1M users.', type: 'research' } },
    { id: 'c2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'Initiative', description: 'Add P2P payments.', type: 'research' } },
    { id: 'c3', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Challenge', description: 'Scope MVP, avoid creep.', type: 'research' } },
  ],
  contextEdges: [
    { id: 'ce1-2', source: 'c1', target: 'c2', animated: true, label: 'Business Context', style: { stroke: '#6366f1' } },
    { id: 'ce2-3', source: 'c2', target: 'c3', animated: true, label: 'MVP Needs', style: { stroke: '#6366f1' } },
  ],
  goals: [
    { id: 'g1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Primary Goal', description: 'Validate P2P engagement.', type: 'research' } },
    { id: 'g2', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'Success Metrics', description: 'Adoption, retention, reliability.', type: 'research' } },
  ],
  goalsEdges: [
    { id: 'ge1-2', source: 'g1', target: 'g2', animated: true, label: 'Metric Alignment', style: { stroke: '#6366f1' } },
  ],
  scope: [
    { id: 's1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Discovery', description: 'Validate demand, compliance.', type: 'research' } },
    { id: 's2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'MVP Features', description: 'Core P2P, notifications.', type: 'implementation' } },
    { id: 's3', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Excluded Features', description: 'Bank transfers, social.', type: 'implementation' } },
  ],
  scopeEdges: [
    { id: 'se1-2', source: 's1', target: 's2', animated: true, label: 'User Demand', style: { stroke: '#6366f1' } },
    { id: 'se1-3', source: 's1', target: 's3', animated: true, label: 'Scope Boundaries', style: { stroke: '#6366f1' } },
  ],
  approach: [
    { id: 'a1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'User Journeys', description: 'Sender/receiver flows.', type: 'implementation' } },
    { id: 'a2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'Technical Design', description: 'Reuse wallet, API.', type: 'implementation' } },
    { id: 'a3', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Risk Mitigation', description: 'Fraud limits, monitoring.', type: 'implementation' } },
  ],
  approachEdges: [
    { id: 'ae1-2', source: 'a1', target: 'a2', animated: true, label: 'Journey Inputs', style: { stroke: '#6366f1' } },
    { id: 'ae2-3', source: 'a2', target: 'a3', animated: true, label: 'Technical Needs', style: { stroke: '#6366f1' } },
  ],
  launch: [
    { id: 'l1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Alpha (0–2m)', description: 'Internal dogfood.', type: 'implementation' } },
    { id: 'l2', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'Beta (2–4m)', description: '5–10% users.', type: 'implementation' } },
    { id: 'l3', type: 'custom', position: { x: 650, y: 50 }, data: { label: 'Full Launch (4–6m)', description: 'Rollout, incentives.', type: 'implementation' } },
  ],
  launchEdges: [
    { id: 'le1-2', source: 'l1', target: 'l2', animated: true, label: 'Alpha Feedback', style: { stroke: '#6366f1' } },
    { id: 'le2-3', source: 'l2', target: 'l3', animated: true, label: 'Beta Metrics', style: { stroke: '#6366f1' } },
  ],
  results: [
    { id: 'r1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Adoption', description: '12% DAU use P2P.', type: 'outcome' } },
    { id: 'r2', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'Retention Lift', description: '+8% DAU/MAU.', type: 'outcome' } },
    { id: 'r3', type: 'custom', position: { x: 650, y: 50 }, data: { label: 'Business Impact', description: 'Virality, LTV gains.', type: 'outcome' } },
  ],
  resultsEdges: [
    { id: 're1-2', source: 'r1', target: 'r2', animated: true, label: 'Adoption Metrics', style: { stroke: '#6366f1' } },
    { id: 're2-3', source: 'r2', target: 'r3', animated: true, label: 'Retention Impact', style: { stroke: '#6366f1' } },
  ],
};

// Step Details for Each Node
const stepDetails = {
  // Context Nodes
  c1: {
    title: 'Company Overview',
    description: 'Mobile-first fintech with 1M monthly users, savings + debit card.',
    tools: ['Mixpanel', 'Confluence'],
    thoughtProcess: 'P2P could boost stickiness. I hypothesized users want in-app transfers.',
    challenges: 'Understanding user needs; competing with Venmo.',
    navigation: 'Analyzed Mixpanel for engagement, documented context in Confluence.',
    userFeedback: 'N/A (Business-driven).',
    details: '1M users, 60% DAU/MAU, $50 avg wallet balance.',
    dataConnection: 'Sends context to Initiative node.'
  },
  c2: {
    title: 'Initiative',
    description: 'Add P2P payments to increase engagement.',
    tools: ['Google Forms', 'Slack'],
    thoughtProcess: 'P2P drives virality. I expected simple transfers to meet user needs.',
    challenges: 'Defining MVP scope; ensuring compliance.',
    navigation: 'Surveyed users via Google Forms (80% want P2P). Aligned via Slack.',
    userFeedback: '"I’d use it if it’s simple," said 80% of users.',
    details: 'P2P to replace Venmo/Cash App, focus on in-app wallet transfers.',
    dataConnection: 'Sends initiative to Challenge node.'
  },
  c3: {
    title: 'Challenge',
    description: 'Scope MVP for fast, safe delivery without creep.',
    tools: ['Miro', 'Jira'],
    thoughtProcess: 'A lean MVP avoids delays. I prioritized core flows to compete.',
    challenges: 'Balancing features vs speed; avoiding bugs.',
    navigation: 'Mapped scope in Miro, planned in Jira. Aligned on minimal features.',
    userFeedback: 'N/A (Leadership-driven).',
    details: 'Risks: buggy launch loses 5% users, scope creep delays 3 months.',
    dataConnection: 'Informs Discovery and MVP Features nodes.'
  },
  // Goals Nodes
  g1: {
    title: 'Primary Goal',
    description: 'Validate P2P increases engagement in 90 days.',
    tools: ['Google Sheets', 'Mixpanel'],
    thoughtProcess: 'Engagement drives retention. I expected P2P to boost DAU/MAU.',
    challenges: 'Setting realistic targets; measuring impact.',
    navigation: 'Defined goals in Google Sheets (10–15% adoption). Validated via Mixpanel.',
    userFeedback: 'N/A (Business-driven).',
    details: '10–15% DAU adoption, +5–7% retention lift in 90 days.',
    dataConnection: 'Sends goal to Success Metrics node.'
  },
  g2: {
    title: 'Success Metrics',
    description: 'Track adoption, retention, reliability.',
    tools: ['Amplitude', 'Datadog'],
    thoughtProcess: 'Metrics ensure validation. I targeted adoption and reliability for early signals.',
    challenges: 'Defining clear metrics; ensuring data capture.',
    navigation: 'Set adoption/retention in Amplitude, latency/failures in Datadog.',
    userFeedback: 'N/A (Technical-driven).',
    details: '10–15% DAU adoption, +8% DAU/MAU, <0.1% failures, <500ms latency.',
    dataConnection: 'Receives goal. Sends metrics to Discovery node.'
  },
  // Scope Nodes
  s1: {
    title: 'Discovery',
    description: 'Validate user demand, align on compliance.',
    tools: ['Google Forms', 'Zoom'],
    thoughtProcess: 'User demand drives scope. I expected simplicity to win over Venmo.',
    challenges: 'Quantifying demand; navigating KYC/AML.',
    navigation: 'Surveyed 200 users via Google Forms, interviewed 15 via Zoom. Met compliance team.',
    userFeedback: '"Keep it simple like Venmo," said 60% of users.',
    details: '80% want P2P, 60% prioritize speed, KYC reuse approved.',
    dataConnection: 'Sends demand to MVP Features and Excluded Features nodes.'
  },
  s2: {
    title: 'MVP Features',
    description: 'Core P2P, notifications, PIN/biometric.',
    tools: ['Figma', 'Swagger'],
    thoughtProcess: 'Core flows meet user needs. I prioritized wallet-to-wallet for simplicity.',
    challenges: 'Avoiding scope creep; ensuring reliability.',
    navigation: 'Designed flows in Figma, defined API in Swagger. Focused on core txns.',
    userFeedback: '"Just need to send money fast," said 70% of users.',
    details: 'Send/receive, KYC reuse, history, notifications, PIN/biometric.',
    dataConnection: 'Receives demand. Sends features to User Journeys node.'
  },
  s3: {
    title: 'Excluded Features',
    description: 'Bank transfers, bill splitting, social.',
    tools: ['Miro', 'Jira'],
    thoughtProcess: 'Exclusions keep MVP lean. I deferred complex features to roadmap.',
    challenges: 'Justifying exclusions; managing stakeholder expectations.',
    navigation: 'Mapped exclusions in Miro, tracked roadmap in Jira. Aligned with leadership.',
    userFeedback: 'N/A (Leadership-driven).',
    details: 'Deferred: ACH, bill splitting, social feed, cross-border.',
    dataConnection: 'Receives demand. Sends boundaries to Technical Design node.'
  },
  // Approach Nodes
  a1: {
    title: 'User Journeys',
    description: 'Define sender/receiver flows for P2P.',
    tools: ['Figma', 'FullStory'],
    thoughtProcess: 'Simple journeys drive adoption. I expected contact selection to be key.',
    challenges: 'Minimizing friction; ensuring clarity.',
    navigation: 'Designed sender/receiver flows in Figma, validated with FullStory replays.',
    userFeedback: '"Contact picker is intuitive," said 85% of testers.',
    details: 'Sender: select contact, amount, confirm. Receiver: notification, funds in wallet.',
    dataConnection: 'Sends journeys to Technical Design node.'
  },
  a2: {
    title: 'Technical Design',
    description: 'Reuse wallet, real-time API, feature flags.',
    tools: ['Swagger', 'LaunchDarkly'],
    thoughtProcess: 'Reuse reduces risk. I prioritized idempotency for reliability.',
    challenges: 'Ensuring scalability; preventing duplicates.',
    navigation: 'Defined API in Swagger, used LaunchDarkly flags, reused wallet ledger.',
    userFeedback: 'N/A (Technical-driven).',
    details: 'Idempotent API, $500/day limit, feature flags for cohort rollout.',
    dataConnection: 'Receives journeys. Sends design to Risk Mitigation node.'
  },
  a3: {
    title: 'Risk Mitigation',
    description: 'Fraud limits, monitoring, compliance.',
    tools: ['Datadog', 'Zendesk'],
    thoughtProcess: 'Fraud and performance are critical. I prioritized low limits and monitoring.',
    challenges: 'Balancing security vs UX; regulatory alignment.',
    navigation: 'Set $500/day limits, monitored via Datadog, tracked tickets in Zendesk.',
    userFeedback: 'N/A (Technical-driven).',
    details: 'Manual fraud reviews, <500ms latency, compliance for closed-loop transfers.',
    dataConnection: 'Receives design. Sends mitigations to Alpha node.'
  },
  // Launch Nodes
  l1: {
    title: 'Alpha (0–2 months)',
    description: 'Internal dogfood to catch bugs.',
    tools: ['LaunchDarkly', 'Sentry'],
    thoughtProcess: 'Alpha ensures stability. I expected UX issues to surface early.',
    challenges: 'Catching edge cases; scaling feedback.',
    navigation: 'Rolled out to employees via LaunchDarkly, monitored bugs in Sentry.',
    userFeedback: '"Sending is smooth," said 90% of employees.',
    details: '0.05% failure rate, fixed 10 UX bugs, 100% employee adoption.',
    dataConnection: 'Sends feedback to Beta node.'
  },
  l2: {
    title: 'Beta (2–4 months)',
    description: 'Rollout to 5–10% users, iterate.',
    tools: ['Amplitude', 'FullStory'],
    thoughtProcess: 'Beta validates adoption. I expected 10% DAU uptake.',
    challenges: 'Managing scale; iterating fast.',
    navigation: 'Launched to 10% users via Amplitude, analyzed friction in FullStory.',
    userFeedback: '"Notifications are clear," said 80% of beta users.',
    details: '10% DAU adoption, +5% DAU/MAU, fixed 5 UI issues.',
    dataConnection: 'Sends metrics to Full Launch node.'
  },
  l3: {
    title: 'Full Launch (4–6 months)',
    description: 'Broad rollout with $5 referral bonus.',
    tools: ['Braze', 'Mixpanel'],
    thoughtProcess: 'Incentives drive adoption. I expected referrals to boost virality.',
    challenges: 'Scaling infra; managing fraud.',
    navigation: 'Launched with Braze campaigns, tracked in Mixpanel. Added $5 bonus.',
    userFeedback: '"Referral bonus is great," said 70% of users.',
    details: '12% DAU adoption, +8% DAU/MAU, 25% referral signups.',
    dataConnection: 'Sends metrics to Adoption and Retention Lift nodes.'
  },
  // Results Nodes
  r1: {
    title: 'Adoption',
    description: '12% of DAU use P2P within 90 days.',
    tools: ['Amplitude', 'Mixpanel'],
    thoughtProcess: 'Adoption validates demand. I expected 10–15% uptake.',
    challenges: 'Driving initial usage; measuring accurately.',
    navigation: 'Tracked adoption in Amplitude, validated in Mixpanel.',
    userFeedback: '"P2P is easy to use," said 85% of users.',
    details: '12% DAU adoption, 2 txns/user/month, <0.1% failures.',
    dataConnection: 'Sends adoption metrics to Retention Lift node.'
  },
  r2: {
    title: 'Retention Lift',
    description: 'P2P users show +8% DAU/MAU.',
    tools: ['Mixpanel', 'Looker'],
    thoughtProcess: 'P2P drives stickiness. I expected retention lift vs non-users.',
    challenges: 'Isolating P2P impact; long-term tracking.',
    navigation: 'Compared P2P vs non-P2P cohorts in Mixpanel, visualized in Looker.',
    userFeedback: 'N/A (Data-driven).',
    details: '+8% DAU/MAU, +5% 90-day retention for P2P users.',
    dataConnection: 'Sends retention impact to Business Impact node.'
  },
  r3: {
    title: 'Business Impact',
    description: 'Virality and LTV gains from P2P.',
    tools: ['Tableau', 'Google Forms'],
    thoughtProcess: 'P2P drives growth. I expected referrals to boost signups.',
    challenges: 'Quantifying LTV; sustaining momentum.',
    navigation: 'Tracked LTV in Tableau, surveyed referrals via Google Forms.',
    userFeedback: '"Joined via friend’s invite," said 60% of new users.',
    details: '25% referral signups, +$20/user LTV, +7% retention.',
    dataConnection: 'Receives retention impact. Outputs final outcomes.'
  },
};

// Case Study Component
const P2PPaymentsMVP = () => {
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
         You are the Product Manager at a mobile-first fintech company with 1M monthly active users. Leadership wants to launch a peer-to-peer (P2P) payments MVP to increase engagement and user stickiness. 
         Given limited resources and competition from players like Venmo, how would you scope the MVP to deliver fast, safe value while avoiding scope creep? What would you prioritize, and how would you measure success    </p>
      </section>

      {/* Context Section */}
      {renderSection(
        'Context / Background',
        sectionNodes.context,
        sectionNodes.contextEdges,
        <FaUsers className="text-3xl text-indigo-500 mr-3" />
      )}

      {/* Goals Section */}
      {renderSection(
        'Goals / Success Metrics',
        sectionNodes.goals,
        sectionNodes.goalsEdges,
        <FaChartLine className="text-3xl text-green-500 mr-3" />
      )}

      {/* Scope Section */}
      {renderSection(
        'MVP Scope',
        sectionNodes.scope,
        sectionNodes.scopeEdges,
        <FaLightbulb className="text-3xl text-yellow-500 mr-3" />
      )}

      {/* Approach Section */}
      {renderSection(
        'Development Approach',
        sectionNodes.approach,
        sectionNodes.approachEdges,
        <FaChartLine className="text-3xl text-green-500 mr-3" />
      )}

      {/* Launch Section */}
      {renderSection(
        'Launch Plan',
        sectionNodes.launch,
        sectionNodes.launchEdges,
        <FaChartLine className="text-3xl text-green-500 mr-3" />
      )}

      {/* Results Section */}
      {renderSection(
        'Results / Outcomes (Hypothetical)',
        sectionNodes.results,
        sectionNodes.resultsEdges,
        <FaChartLine className="text-3xl text-blue-500 mr-3" />
      )}

      {/* Roadmap Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaLightbulb className="text-3xl text-yellow-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Post-MVP Roadmap</h2>
        </div>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Phase 2: Add bank transfers (ACH, debit card).</li>
          <li>Phase 3: Enable bill splitting and group payments.</li>
          <li>Phase 4: Support cross-border P2P with FX.</li>
          <li>Phase 5: Optional social features (feeds, emojis).</li>
        </ul>
      </section>

      {/* Learnings Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaLightbulb className="text-3xl text-yellow-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Learnings / Next Steps</h2>
        </div>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Lean MVP drives speed and user trust.</li>
          <li>User feedback prioritizes simplicity over social features.</li>
          <li>Compliance alignment prevents launch delays.</li>
          <li><strong>Next Step:</strong> Scale P2P with bank integrations and habit-forming features.</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Key Takeaways</h3>
        <p className="text-gray-700">
          As a PM, I drove impact by scoping a lean, user-centric MVP, leveraging existing systems, and mitigating risks early. This structured approach demonstrates product thinking and execution, ideal for fintech PM interviews.
        </p>
      </section>

      {/* Simulation Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-3xl text-green-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Simulation: MVP Scope Trade-offs</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Adjust transaction limits and notification types to see impacts on adoption, retention, and fraud rate, simulating trade-offs.
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
            <h3 className="text-xl font-semibold text-gray-800">Q1: How did you decide what to include in the MVP?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I prioritized core P2P flows (wallet-to-wallet, notifications) based on user surveys (80% want simplicity) and interviews (60% prioritize speed). Excluded bank transfers and social features to avoid creep, validated via Miro workshops.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q2: How did you mitigate fraud risks?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I set $500/day limits, reused KYC, and implemented manual reviews for suspicious accounts. Idempotent APIs and Datadog monitoring ensured less than 0.1% failures, with compliance alignment for closed-loop transfers.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q3: How did you measure success?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> Success was measured by 12% DAU adoption, +8% DAU/MAU, +5% retention, and less than 0.1% failures in 90 days. Amplitude tracked adoption, Mixpanel validated retention, and Tableau quantified $20/user LTV lift.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q4: How did you ensure a fast launch?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I reused the wallet ledger, used feature flags for cohort rollouts, and ran an alpha with employees (0–2 months). Figma designs and Swagger APIs streamlined development, achieving beta in 4 months.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q5: What would you do differently?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I’d conduct broader user testing (50 vs 15 interviews) for edge cases. I’d explore lightweight social features earlier (e.g., emojis) and invest in automated fraud detection for beta to reduce manual reviews.
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
          Interviewers at companies like Meta or Stripe assess PM case studies based on:
        </p>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li><strong>Product Thinking:</strong> Scoping a lean, user-centric MVP.</li>
          <li><strong>User-Centric Approach:</strong> Validating demand with research.</li>
          <li><strong>Technical Acumen:</strong> Leveraging existing systems for speed.</li>
          <li><strong>Risk Management:</strong> Addressing fraud and compliance early.</li>
          <li><strong>Impact & Scalability:</strong> Delivering measurable engagement gains.</li>
          <li><strong>Reflection & Learning:</strong> Iterating based on feedback.</li>
        </ul>
        <p className="text-gray-700 mt-4">
          This case study excels with a lean, user-driven MVP, robust risk mitigation, and clear metrics, making it compelling for PM interviews.
        </p>
      </section>
    </div>
  );
};

// Simulation Component
const Simulation = () => {
  const [transactionLimit, setTransactionLimit] = useState(500);
  const [notificationTypes, setNotificationTypes] = useState(2);
  const [adoption, setAdoption] = useState(10);
  const [retentionLift, setRetentionLift] = useState(5);
  const [fraudRate, setFraudRate] = useState(0.1);

  const calculateImpact = useCallback(() => {
    let newAdoption = 10;
    let newRetentionLift = 5;
    let newFraudRate = 0.1;

    // Higher transaction limits increase adoption but risk fraud
    newAdoption += transactionLimit / 100;
    newFraudRate += transactionLimit / 10000;
    newRetentionLift += transactionLimit / 200;

    // More notification types boost adoption and retention
    newAdoption += notificationTypes * 1.5;
    newRetentionLift += notificationTypes * 1;
    newFraudRate -= notificationTypes * 0.01; // Notifications reduce fraud via user awareness

    setAdoption(Math.min(15, newAdoption.toFixed(1)));
    setRetentionLift(Math.min(10, newRetentionLift.toFixed(1)));
    setFraudRate(Math.max(0, newFraudRate.toFixed(2)));
  }, [transactionLimit, notificationTypes]);

  React.useEffect(() => {
    calculateImpact();
  }, [transactionLimit, notificationTypes, calculateImpact]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-2">Daily Transaction Limit ($): {transactionLimit}</label>
        <input
          type="range"
          min="100"
          max="1000"
          value={transactionLimit}
          onChange={(e) => setTransactionLimit(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Notification Types: {notificationTypes}</label>
        <input
          type="range"
          min="1"
          max="5"
          value={notificationTypes}
          onChange={(e) => setNotificationTypes(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="p-4 bg-indigo-100 rounded-lg">
        <p className="text-gray-800 font-semibold">Simulated Outcomes:</p>
        <p className="text-gray-700">DAU Adoption: {adoption}%</p>
        <p className="text-gray-700">Retention Lift: +{retentionLift}%</p>
        <p className="text-gray-700">Fraud Rate: {fraudRate}%</p>
        <p className="text-gray-700 mt-2">
          {adoption >= 10 && retentionLift >= 5 && fraudRate <= 0.1
            ? 'Success! Achieves 10%+ adoption, 5%+ retention lift, and ≤0.1% fraud.'
            : 'Adjust limits and notifications to achieve 10%+ adoption, 5%+ retention lift, and ≤0.1% fraud.'}
        </p>
      </div>
    </div>
  );
};

export default P2PPaymentsMVP;