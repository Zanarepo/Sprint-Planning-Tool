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
    { id: 'c1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Company Overview', description: 'Fintech with strong traction.', type: 'research' } },
    { id: 'c2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'Situation', description: 'Expand to SEA.', type: 'research' } },
    { id: 'c3', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Challenge', description: 'Choose market, design GTM.', type: 'research' } },
  ],
  contextEdges: [
    { id: 'ce1-2', source: 'c1', target: 'c2', animated: true, label: 'Business Context', style: { stroke: '#6366f1' } },
    { id: 'ce2-3', source: 'c2', target: 'c3', animated: true, label: 'Expansion Needs', style: { stroke: '#6366f1' } },
  ],
  goals: [
    { id: 'g1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Primary Goal', description: 'High-potential market entry.', type: 'research' } },
    { id: 'g2', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'Success Metrics', description: '100k users, unit economics.', type: 'research' } },
  ],
  goalsEdges: [
    { id: 'ge1-2', source: 'g1', target: 'g2', animated: true, label: 'Metric Alignment', style: { stroke: '#6366f1' } },
  ],
  evaluation: [
    { id: 'e1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Market Evaluation', description: 'Assess regulation, TAM, competition.', type: 'research' } },
    { id: 'e2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'Country Prioritization', description: 'Choose Philippines.', type: 'research' } },
    { id: 'e3', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'GTM Strategy', description: '12–18 month plan.', type: 'research' } },
  ],
  evaluationEdges: [
    { id: 'ee1-2', source: 'e1', target: 'e2', animated: true, label: 'Market Data', style: { stroke: '#6366f1' } },
    { id: 'ee2-3', source: 'e2', target: 'e3', animated: true, label: 'Prioritization', style: { stroke: '#6366f1' } },
  ],
  gtm: [
    { id: 'gtm1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Validation & Setup', description: 'Licensing, partnerships.', type: 'implementation' } },
    { id: 'gtm2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'Beta Launch', description: 'P2P, bill payments.', type: 'implementation' } },
    { id: 'gtm3', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Expansion & Scale', description: 'QR codes, SME services.', type: 'implementation' } },
  ],
  gtmEdges: [
    { id: 'ge1-2', source: 'gtm1', target: 'gtm2', animated: true, label: 'Setup Complete', style: { stroke: '#6366f1' } },
    { id: 'ge2-3', source: 'gtm2', target: 'gtm3', animated: true, label: 'Beta Metrics', style: { stroke: '#6366f1' } },
  ],
  results: [
    { id: 'r1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'User Adoption', description: '100k+ users in 6 months.', type: 'outcome' } },
    { id: 'r2', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'Revenue', description: 'Positive unit economics.', type: 'outcome' } },
    { id: 'r3', type: 'custom', position: { x: 650, y: 50 }, data: { label: 'Regional Credibility', description: 'Enables Indonesia entry.', type: 'outcome' } },
  ],
  resultsEdges: [
    { id: 're1-2', source: 'r1', target: 'r2', animated: true, label: 'Adoption Metrics', style: { stroke: '#6366f1' } },
    { id: 're2-3', source: 'r2', target: 'r3', animated: true, label: 'Revenue Impact', style: { stroke: '#6366f1' } },
  ],
};

// Step Details for Each Node
const stepDetails = {
  // Context Nodes
  c1: {
    title: 'Company Overview',
    description: 'Mid-stage fintech with strong home market traction.',
    tools: ['Mixpanel', 'Confluence'],
    thoughtProcess: 'Traction signals SEA potential. I hypothesized unbanked markets as key.',
    challenges: 'Identifying best market; regulatory complexity.',
    navigation: 'Analyzed traction in Mixpanel, documented in Confluence.',
    userFeedback: 'N/A (Business-driven).',
    details: '500k MAUs, 30% DAU/MAU, $1M ARR in home market.',
    dataConnection: 'Sends context to Situation node.'
  },
  c2: {
    title: 'Situation',
    description: 'Leadership wants SEA expansion.',
    tools: ['Slack', 'Jira'],
    thoughtProcess: 'SEA offers high TAM. I expected Philippines or Vietnam to lead.',
    challenges: 'Prioritizing market; balancing speed vs compliance.',
    navigation: 'Aligned via Slack, planned in Jira.',
    userFeedback: 'N/A (Leadership-driven).',
    details: 'Target: 100k users, $500K ARR in first SEA market.',
    dataConnection: 'Sends situation to Challenge node.'
  },
  c3: {
    title: 'Challenge',
    description: 'Choose market, design GTM to avoid waste.',
    tools: ['Miro', 'Google Sheets'],
    thoughtProcess: 'Wrong market risks resources. I prioritized data-driven selection.',
    challenges: 'Regulatory hurdles; competitive saturation.',
    navigation: 'Mapped markets in Miro, scored in Google Sheets.',
    userFeedback: 'N/A (Strategy-driven).',
    details: 'Risk: $1M sunk cost, 6-month delay if wrong market.',
    dataConnection: 'Informs Market Evaluation node.'
  },
  // Goals Nodes
  g1: {
    title: 'Primary Goal',
    description: 'Enter high-potential SEA market.',
    tools: ['Google Sheets', 'Amplitude'],
    thoughtProcess: 'Market fit drives success. I expected Philippines to balance TAM and feasibility.',
    challenges: 'Balancing TAM vs regulation; setting targets.',
    navigation: 'Defined goals in Google Sheets, tracked in Amplitude.',
    userFeedback: 'N/A (Business-driven).',
    details: '100k users in 6 months, positive unit economics in 18 months.',
    dataConnection: 'Sends goal to Success Metrics node.'
  },
  g2: {
    title: 'Success Metrics',
    description: 'Track adoption, revenue, compliance.',
    tools: ['Amplitude', 'Looker'],
    thoughtProcess: 'Metrics ensure viability. I prioritized adoption and economics.',
    challenges: 'Measuring unit economics; ensuring compliance.',
    navigation: 'Set adoption in Amplitude, economics in Looker.',
    userFeedback: 'N/A (Technical-driven).',
    details: '100k users, 25%+ DAU/MAU, positive margins, regulatory approval.',
    dataConnection: 'Receives goal. Sends metrics to Market Evaluation node.'
  },
  // Evaluation Nodes
  e1: {
    title: 'Market Evaluation',
    description: 'Assess regulation, TAM, competition, feasibility.',
    tools: ['Google Forms', 'Looker'],
    thoughtProcess: 'Data drives selection. I expected unbanked markets to lead.',
    challenges: 'Sourcing reliable data; regulatory complexity.',
    navigation: 'Surveyed users via Google Forms, analyzed markets in Looker.',
    userFeedback: '"Need P2P and QR codes," said 70% of users.',
    details: 'Philippines: 60% unbanked, Vietnam: easier regulation.',
    dataConnection: 'Sends data to Country Prioritization node.'
  },
  e2: {
    title: 'Country Prioritization',
    description: 'Choose Philippines for high TAM, feasibility.',
    tools: ['Excel', 'Miro'],
    thoughtProcess: 'Philippines balances TAM and competition. I scored markets objectively.',
    challenges: 'Justifying choice; stakeholder alignment.',
    navigation: 'Scored markets in Excel, visualized in Miro.',
    userFeedback: 'N/A (Data-driven).',
    details: 'Philippines: 8/10; Indonesia: 6/10; Vietnam: 7/10; Singapore: 4/10.',
    dataConnection: 'Sends prioritization to GTM Strategy node.'
  },
  e3: {
    title: 'GTM Strategy',
    description: '12–18 month plan for Philippines entry.',
    tools: ['Jira', 'Figma'],
    thoughtProcess: 'Phased GTM ensures compliance and adoption. I prioritized trust.',
    challenges: 'Balancing speed vs regulation; localizing UX.',
    navigation: 'Planned phases in Jira, designed UX in Figma.',
    userFeedback: '"Trust is key," said 60% of users.',
    details: 'Phases: validation (0–3m), beta (3–6m), expansion (6–12m), scale (12–18m).',
    dataConnection: 'Sends strategy to Validation & Setup node.'
  },
  // GTM Nodes
  gtm1: {
    title: 'Validation & Setup',
    description: 'Secure licensing, partnerships, hire team.',
    tools: ['Confluence', 'Slack'],
    thoughtProcess: 'Compliance is critical. I expected partnerships to accelerate launch.',
    challenges: 'Navigating regulation; finding partners.',
    navigation: 'Documented licensing in Confluence, aligned partners via Slack.',
    userFeedback: 'N/A (Operational-driven).',
    details: 'Secured bank/telco partners, hired country lead.',
    dataConnection: 'Sends setup to Beta Launch node.'
  },
  gtm2: {
    title: 'Beta Launch',
    description: 'Soft launch P2P, bill payments with incentives.',
    tools: ['Amplitude', 'Braze'],
    thoughtProcess: 'Beta tests adoption. I expected incentives to drive uptake.',
    challenges: 'Ensuring UX; managing fraud.',
    navigation: 'Launched via Amplitude, marketed via Braze.',
    userFeedback: '"Free transfers are great," said 80% of beta users.',
    details: '50k users, 20% DAU/MAU, <0.1% fraud rate.',
    dataConnection: 'Sends metrics to Expansion & Scale node.'
  },
  gtm3: {
    title: 'Expansion & Scale',
    description: 'Add QR codes, SME services, remittances.',
    tools: ['Mixpanel', 'Figma'],
    thoughtProcess: 'Scaling meets demand. I expected QR codes to boost adoption.',
    challenges: 'Optimizing KYC; competing with GCash.',
    navigation: 'Added features via Mixpanel, designed UX in Figma.',
    userFeedback: '"QR codes are convenient," said 75% of users.',
    details: '100k+ users, 25%+ DAU/MAU, $0.50 ARPU.',
    dataConnection: 'Sends metrics to User Adoption node.'
  },
  // Results Nodes
  r1: {
    title: 'User Adoption',
    description: '100k+ users in 6 months.',
    tools: ['Amplitude', 'Mixpanel'],
    thoughtProcess: 'Adoption validates market fit. I expected incentives to drive growth.',
    challenges: 'Sustaining growth; onboarding friction.',
    navigation: 'Tracked adoption in Amplitude, validated in Mixpanel.',
    userFeedback: '"App is easy to use," said 85% of users.',
    details: '100k users, 25%+ DAU/MAU, 70% NPS.',
    dataConnection: 'Sends metrics to Revenue node.'
  },
  r2: {
    title: 'Revenue',
    description: 'Positive unit economics by 18 months.',
    tools: ['Tableau', 'Looker'],
    thoughtProcess: 'Revenue ensures viability. I expected transaction fees to scale.',
    challenges: 'Achieving margins; local pricing.',
    navigation: 'Modeled economics in Tableau, validated in Looker.',
    userFeedback: 'N/A (Data-driven).',
    details: '$0.50 ARPU, $50K MRR, positive margins.',
    dataConnection: 'Sends impact to Regional Credibility node.'
  },
  r3: {
    title: 'Regional Credibility',
    description: 'Established brand for Indonesia entry.',
    tools: ['Confluence', 'Google Forms'],
    thoughtProcess: 'Credibility enables expansion. I expected Philippines to build trust.',
    challenges: 'Maintaining NPS; regulatory scaling.',
    navigation: 'Documented playbook in Confluence, surveyed trust via Google Forms.',
    userFeedback: '"Brand feels reliable," said 80% of users.',
    details: '70% NPS, regulatory approval, Indonesia roadmap ready.',
    dataConnection: 'Receives impact. Outputs final outcomes.'
  },
};

// Case Study Component
const FintechExpansionCaseStudy = () => {
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
          A mid-stage fintech app with strong traction in its home market must choose a Southeast Asian country for expansion and design a 12–18 month go-to-market plan to drive 100k users and positive unit economics while navigating regulatory, competitive, and localization challenges.
        </p>
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

      {/* Evaluation Section */}
      {renderSection(
        'Market Evaluation & Prioritization',
        sectionNodes.evaluation,
        sectionNodes.evaluationEdges,
        <FaLightbulb className="text-3xl text-yellow-500 mr-3" />
      )}

      {/* GTM Plan Section */}
      {renderSection(
        'Go-To-Market Plan',
        sectionNodes.gtm,
        sectionNodes.gtmEdges,
        <FaChartLine className="text-3xl text-green-500 mr-3" />
      )}

      {/* Results Section */}
      {renderSection(
        'Results / Outcomes (Hypothetical)',
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
          <li>Market entry succeeds with early regulatory alignment and local partnerships.</li>
          <li>User trust (70% demand P2P, 60% prioritize trust) drives adoption in unbanked markets.</li>
          <li>Localized UX (QR codes, simple KYC) boosts engagement.</li>
          <li><strong>Next Step:</strong> Scale to Indonesia using Philippines playbook, build regional compliance team.</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Key Takeaways</h3>
        <p className="text-gray-700">
          As a PM, I drove impact by prioritizing a high-TAM, feasible market (Philippines), designing a phased GTM plan, and leveraging data-driven insights to balance compliance and adoption. This structured approach demonstrates strategic and execution skills, ideal for fintech PM interviews.
        </p>
      </section>

      {/* Simulation Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-3xl text-green-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Simulation: GTM Trade-offs</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Adjust focus on regulatory effort and marketing spend to see impacts on user adoption, revenue, and launch timeline, simulating trade-offs.
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
            <h3 className="text-xl font-semibold text-gray-800">Q1: Why choose the Philippines over other SEA markets?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> Philippines scored highest (8/10) for high TAM (60%+ unbanked), fragmented competition (GCash strong but gaps exist), and high feasibility (bank partnerships). Indonesia’s regulation was complex (6/10), Vietnam slightly smaller (7/10), and Singapore saturated (4/10).
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q2: How did you assess market fit?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I evaluated TAM (unbanked population), regulation (licensing needs), competition (GCash gaps), and localization (QR code demand) via Google Forms surveys (70% want P2P) and Looker analysis (60% unbanked in Philippines).
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q3: How did you measure success?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> Success was measured by 100k+ users, 25%+ DAU/MAU, $50K MRR, and positive unit economics in 18 months. Amplitude tracked adoption, Looker modeled economics, and Mixpanel validated retention.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q4: How did you mitigate regulatory risks?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I engaged compliance early (0–3 months), secured licensing, and partnered with local banks/telcos. Soft launch with limited features (P2P, bill pay) ensured regulatory alignment while testing adoption.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q5: What would you do differently?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I’d explore Vietnam in parallel for faster multi-market entry and conduct broader user testing (50 vs. 20 interviews) to refine localization. I’d also invest in automated KYC earlier to reduce onboarding friction.
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
          <li><strong>Market Analysis:</strong> Objective evaluation of TAM, regulation, and competition.</li>
          <li><strong>User-Centric Approach:</strong> Incorporating user feedback (70% want P2P).</li>
          <li><strong>Strategic Planning:</strong> Phased GTM balancing speed and compliance.</li>
          <li><strong>Risk Management:</strong> Mitigating regulatory and adoption risks.</li>
          <li><strong>Impact & Scalability:</strong> Achieving 100k users, $50K MRR.</li>
          <li><strong>Reflection & Learning:</strong> Planning multi-market expansion.</li>
        </ul>
        <p className="text-gray-700 mt-4">
          This case study excels with a data-driven market selection, user-focused GTM plan, and robust risk mitigation, making it compelling for PM interviews.
        </p>
      </section>
    </div>
  );
};

// Simulation Component
const Simulation = () => {
  const [regulatoryEffort, setRegulatoryEffort] = useState(5);
  const [marketingSpend, setMarketingSpend] = useState(5);
  const [adoption, setAdoption] = useState(100);
  const [revenue, setRevenue] = useState(50);
  const [launchTimeline, setLaunchTimeline] = useState(6);

  const calculateImpact = useCallback(() => {
    let newAdoption = 100;
    let newRevenue = 50;
    let newLaunchTimeline = 6;

    // Higher regulatory effort reduces risks but delays launch
    newAdoption += regulatoryEffort * 5;
    newRevenue += regulatoryEffort * 2;
    newLaunchTimeline += regulatoryEffort * 0.5;

    // Higher marketing spend boosts adoption and revenue
    newAdoption += marketingSpend * 10;
    newRevenue += marketingSpend * 5;
    newLaunchTimeline -= marketingSpend * 0.2;

    setAdoption(Math.max(50, Math.min(150, newAdoption.toFixed(0))));
    setRevenue(Math.max(20, Math.min(100, newRevenue.toFixed(0))));
    setLaunchTimeline(Math.max(3, Math.min(9, newLaunchTimeline.toFixed(1))));
  }, [regulatoryEffort, marketingSpend]);

  React.useEffect(() => {
    calculateImpact();
  }, [regulatoryEffort, marketingSpend, calculateImpact]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-2">Regulatory Effort: {regulatoryEffort}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={regulatoryEffort}
          onChange={(e) => setRegulatoryEffort(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Marketing Spend: {marketingSpend}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={marketingSpend}
          onChange={(e) => setMarketingSpend(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="p-4 bg-indigo-100 rounded-lg">
        <p className="text-gray-800 font-semibold">Simulated Outcomes:</p>
        <p className="text-gray-700">User Adoption: {adoption}k users</p>
        <p className="text-gray-700">Revenue: ${revenue}K MRR</p>
        <p className="text-gray-700">Launch Timeline: {launchTimeline} months</p>
        <p className="text-gray-700 mt-2">
          {adoption >= 100 && revenue >= 50 && launchTimeline <= 6
            ? 'Success! Achieves 100k+ users, $50K+ MRR, in ≤6 months.'
            : 'Adjust regulatory effort and marketing spend to achieve 100k+ users, $50K+ MRR, in ≤6 months.'}
        </p>
      </div>
    </div>
  );
};

export default FintechExpansionCaseStudy;