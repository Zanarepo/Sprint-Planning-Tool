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
    { id: 'c1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Company Overview', description: 'SaaS with 1M MAUs, high engagement.', type: 'research' } },
    { id: 'c2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'Situation', description: 'Weak monetization.', type: 'research' } },
    { id: 'c3', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Challenge', description: 'Monetize without churn.', type: 'research' } },
  ],
  contextEdges: [
    { id: 'ce1-2', source: 'c1', target: 'c2', animated: true, label: 'Business Context', style: { stroke: '#6366f1' } },
    { id: 'ce2-3', source: 'c2', target: 'c3', animated: true, label: 'Monetization Needs', style: { stroke: '#6366f1' } },
  ],
  goals: [
    { id: 'g1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Primary Goal', description: 'Monetize with minimal churn.', type: 'research' } },
    { id: 'g2', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'Success Metrics', description: 'Conversion, ARPU, churn.', type: 'research' } },
  ],
  goalsEdges: [
    { id: 'ge1-2', source: 'g1', target: 'g2', animated: true, label: 'Metric Alignment', style: { stroke: '#6366f1' } },
  ],
  approach: [
    { id: 'a1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'User Value Discovery', description: 'Surveys, usage analysis.', type: 'research' } },
    { id: 'a2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'Model Exploration', description: 'Freemium, usage-based, ads.', type: 'research' } },
    { id: 'a3', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Model Selection', description: 'Freemium + subscription.', type: 'research' } },
  ],
  approachEdges: [
    { id: 'ae1-2', source: 'a1', target: 'a2', animated: true, label: 'User Insights', style: { stroke: '#6366f1' } },
    { id: 'ae2-3', source: 'a2', target: 'a3', animated: true, label: 'Model Options', style: { stroke: '#6366f1' } },
  ],
  experiment: [
    { id: 'e1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'MVP Design', description: 'Free vs. Pro tiers.', type: 'implementation' } },
    { id: 'e2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'A/B Testing', description: 'Test paywall, pricing.', type: 'implementation' } },
    { id: 'e3', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Scale Winning Variant', description: 'Roll out best tier.', type: 'implementation' } },
  ],
  experimentEdges: [
    { id: 'ee1-2', source: 'e1', target: 'e2', animated: true, label: 'Experiment Setup', style: { stroke: '#6366f1' } },
    { id: 'ee2-3', source: 'e2', target: 'e3', animated: true, label: 'A/B Metrics', style: { stroke: '#6366f1' } },
  ],
  results: [
    { id: 'r1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Conversion', description: '3.5% free-to-paid.', type: 'outcome' } },
    { id: 'r2', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'Revenue Impact', description: '$0.35 ARPU.', type: 'outcome' } },
    { id: 'r3', type: 'custom', position: { x: 650, y: 50 }, data: { label: 'Retention', description: 'Paid users stickier.', type: 'outcome' } },
  ],
  resultsEdges: [
    { id: 're1-2', source: 'r1', target: 'r2', animated: true, label: 'Conversion Metrics', style: { stroke: '#6366f1' } },
    { id: 're2-3', source: 'r2', target: 'r3', animated: true, label: 'Revenue Impact', style: { stroke: '#6366f1' } },
  ],
};

// Step Details for Each Node
const stepDetails = {
  // Context Nodes
  c1: {
    title: 'Company Overview',
    description: 'Consumer SaaS with 1M MAUs, 30% DAU/MAU, +50 NPS.',
    tools: ['Mixpanel', 'Confluence'],
    thoughtProcess: 'High engagement signals monetization potential. I hypothesized premium features could convert.',
    challenges: 'Identifying value drivers; avoiding churn.',
    navigation: 'Analyzed engagement in Mixpanel, documented in Confluence.',
    userFeedback: 'N/A (Business-driven).',
    details: '1M MAUs, 30% DAU/MAU, $0.05 ARPU, +50 NPS.',
    dataConnection: 'Sends context to Situation node.'
  },
  c2: {
    title: 'Situation',
    description: 'Weak monetization from free/ads model.',
    tools: ['Looker', 'Slack'],
    thoughtProcess: 'Revenue is critical for runway. I expected subscriptions to scale.',
    challenges: 'Balancing revenue vs trust; stakeholder alignment.',
    navigation: 'Modeled revenue gaps in Looker, aligned via Slack.',
    userFeedback: 'N/A (Leadership-driven).',
    details: '$50K MRR, 12-month runway at risk without new revenue.',
    dataConnection: 'Sends situation to Challenge node.'
  },
  c3: {
    title: 'Challenge',
    description: 'Monetize without breaking trust or engagement.',
    tools: ['Miro', 'Google Forms'],
    thoughtProcess: 'Wrong strategy risks churn. I prioritized user-aligned models.',
    challenges: 'Testing constraints; predicting user reaction.',
    navigation: 'Mapped models in Miro, surveyed users via Google Forms.',
    userFeedback: '"I’d pay for analytics," said 60% of users.',
    details: 'Risk: 5% churn increase, 10% engagement drop.',
    dataConnection: 'Informs User Value Discovery node.'
  },
  // Goals Nodes
  g1: {
    title: 'Primary Goal',
    description: 'Monetize with minimal churn, aligned with value.',
    tools: ['Google Sheets', 'Amplitude'],
    thoughtProcess: 'Value-driven pricing retains users. I expected 3–5% conversion.',
    challenges: 'Setting realistic targets; measuring churn.',
    navigation: 'Defined goals in Google Sheets, tracked in Amplitude.',
    userFeedback: 'N/A (Business-driven).',
    details: '3–5% conversion, $0.30+ ARPU, <5% churn.',
    dataConnection: 'Sends goal to Success Metrics node.'
  },
  g2: {
    title: 'Success Metrics',
    description: 'Track conversion, ARPU, churn, retention.',
    tools: ['Amplitude', 'Mixpanel'],
    thoughtProcess: 'Metrics validate strategy. I prioritized conversion and churn.',
    challenges: 'Isolating paid user impact; data accuracy.',
    navigation: 'Set conversion/churn in Amplitude, retention in Mixpanel.',
    userFeedback: 'N/A (Technical-driven).',
    details: '3–5% conversion, $0.30+ ARPU, <5% churn, +5% paid retention.',
    dataConnection: 'Receives goal. Sends metrics to User Value Discovery node.'
  },
  // Approach Nodes
  a1: {
    title: 'User Value Discovery',
    description: 'Surveys, interviews, usage analysis.',
    tools: ['Google Forms', 'Zoom', 'Mixpanel'],
    thoughtProcess: 'Understanding value drives pricing. I expected power users to pay.',
    challenges: 'Recruiting users; synthesizing data.',
    navigation: 'Surveyed 200 users via Google Forms, interviewed 15 via Zoom, analyzed Mixpanel.',
    userFeedback: '"Analytics are must-have," said 60% of users.',
    details: '80% value core, 20% power users drive 50% usage.',
    dataConnection: 'Sends insights to Model Exploration node.'
  },
  a2: {
    title: 'Model Exploration',
    description: 'Evaluate freemium, usage-based, ads.',
    tools: ['Miro', 'Looker'],
    thoughtProcess: 'Freemium aligns with engagement. I benchmarked Slack, Notion.',
    challenges: 'Predicting adoption; balancing complexity.',
    navigation: 'Mapped models in Miro, benchmarked in Looker (Slack: 5% conversion).',
    userFeedback: 'N/A (Competitive-driven).',
    details: 'Freemium: predictable MRR; Usage-based: complex; Ads: low ARPU.',
    dataConnection: 'Sends options to Model Selection node.'
  },
  a3: {
    title: 'Model Selection',
    description: 'Choose freemium + subscription for scalability.',
    tools: ['Excel', 'Jira'],
    thoughtProcess: 'Freemium leverages NPS. I expected subscriptions to scale.',
    challenges: 'Justifying model; stakeholder buy-in.',
    navigation: 'Scored models in Excel, planned in Jira.',
    userFeedback: 'N/A (Strategy-driven).',
    details: 'Freemium: Free (capped), Pro ($9.99/month, unlimited + premium).',
    dataConnection: 'Sends selection to MVP Design node.'
  },
  // Experiment Nodes
  e1: {
    title: 'MVP Design',
    description: 'Free tier (capped) vs. Pro ($9.99/month).',
    tools: ['Figma', 'Stripe'],
    thoughtProcess: 'Simple tiers drive adoption. I expected usage caps to trigger upgrades.',
    challenges: 'Designing paywalls; ensuring value.',
    navigation: 'Designed tiers in Figma, integrated Stripe for subscriptions.',
    userFeedback: '"Pro features are worth it," said 70% of testers.',
    details: 'Free: core, capped; Pro: unlimited, analytics, integrations.',
    dataConnection: 'Sends design to A/B Testing node.'
  },
  e2: {
    title: 'A/B Testing',
    description: 'Test paywall placement, pricing, messaging.',
    tools: ['Optimizely', 'Amplitude'],
    thoughtProcess: 'Tests optimize conversion. I expected $9.99 to balance value.',
    challenges: 'Avoiding churn; isolating variables.',
    navigation: 'Tested paywall (usage vs. feature), pricing ($7.99–$12.99) via Optimizely, tracked in Amplitude.',
    userFeedback: '"Clear upgrade value," said 80% of testers.',
    details: '$9.99 + usage cap: 3.5% conversion, <5% churn.',
    dataConnection: 'Sends metrics to Scale Winning Variant node.'
  },
  e3: {
    title: 'Scale Winning Variant',
    description: 'Roll out $9.99 Pro tier with usage cap.',
    tools: ['LaunchDarkly', 'Mixpanel'],
    thoughtProcess: 'Scaling drives revenue. I expected stable churn.',
    challenges: 'Avoiding regressions; broad adoption.',
    navigation: 'Rolled out via LaunchDarkly, monitored in Mixpanel.',
    userFeedback: 'N/A (Data-driven).',
    details: '3.5% conversion, $0.35 ARPU, <5% churn.',
    dataConnection: 'Sends metrics to Conversion node.'
  },
  // Results Nodes
  r1: {
    title: 'Conversion',
    description: '3.5% free-to-paid conversion.',
    tools: ['Amplitude', 'Stripe'],
    thoughtProcess: 'Conversion validates strategy. I expected 3–5% uptake.',
    challenges: 'Sustaining conversion; optimizing funnels.',
    navigation: 'Tracked conversion in Amplitude, validated payments in Stripe.',
    userFeedback: '"Pro saves time," said 85% of paid users.',
    details: '3.5% conversion, 20K paid users, $200K MRR.',
    dataConnection: 'Sends metrics to Revenue Impact node.'
  },
  r2: {
    title: 'Revenue Impact',
    description: '$0.35 ARPU, extended runway.',
    tools: ['Tableau', 'Mixpanel'],
    thoughtProcess: 'Revenue ensures sustainability. I expected ARPU to scale.',
    challenges: 'Quantifying LTV; isolating paid impact.',
    navigation: 'Modeled revenue in Tableau, validated in Mixpanel.',
    userFeedback: 'N/A (Data-driven).',
    details: '$0.35 ARPU, $350K MRR, 12–18 month runway extension.',
    dataConnection: 'Sends impact to Retention node.'
  },
  r3: {
    title: 'Retention',
    description: 'Paid users show higher retention.',
    tools: ['Mixpanel', 'Looker'],
    thoughtProcess: 'Paid users are stickier. I expected investment to drive loyalty.',
    challenges: 'Isolating paid retention; long-term tracking.',
    navigation: 'Compared cohorts in Mixpanel, visualized in Looker.',
    userFeedback: 'N/A (Data-driven).',
    details: '<5% churn, +7% retention for paid users.',
    dataConnection: 'Receives impact. Outputs final outcomes.'
  },
};

// Case Study Component
const MonetizationCaseStudy = () => {
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
          A consumer SaaS app with 1M MAUs, high engagement (30% DAU/MAU, +50 NPS), but weak monetization needs a pricing strategy that balances user value, revenue scalability, and minimal churn without breaking trust.
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

      {/* Approach Section */}
      {renderSection(
        'Approach / Action',
        sectionNodes.approach,
        sectionNodes.approachEdges,
        <FaLightbulb className="text-3xl text-yellow-500 mr-3" />
      )}

      {/* Experiment Section */}
      {renderSection(
        'MVP Monetization Experiment',
        sectionNodes.experiment,
        sectionNodes.experimentEdges,
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
          <h2 className="text-2xl font-semibold text-gray-800">Learings / Next Steps</h2>
        </div>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Align monetization with usage triggers (e.g., usage caps) to drive conversions.</li>
          <li>High NPS enables premium tiers without alienating users.</li>
          <li>Continuous A/B testing optimizes pricing and paywall placement.</li>
          <li><strong>Next Step:</strong> Launch enterprise tier ($49.99/month) and regional pricing for emerging markets.</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Key Takeaways</h3>
        <p className="text-gray-700">
          As a PM, I drove impact by aligning monetization with user value, using data-driven experiments, and minimizing churn risks. This structured, user-centric approach demonstrates product thinking and execution, ideal for SaaS PM interviews.
        </p>
      </section>

      {/* Simulation Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-3xl text-green-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Simulation: Monetization Trade-offs</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Adjust paywall strictness and pricing to see impacts on conversion rate, ARPU, and churn, simulating trade-offs.
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
            <h3 className="text-xl font-semibold text-gray-800">Q1: Why choose freemium + subscription?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> Freemium aligns with high engagement (30% DAU/MAU) and NPS (+50), leveraging user value (80% love core, 60% want analytics). Subscriptions offer predictable MRR vs. usage-based (complex) or ads (low ARPU), validated by Slack’s 5% conversion benchmark.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q2: How did you identify user value?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I surveyed 200 users (80% value core features), interviewed 15 (60% want analytics), and analyzed Mixpanel (20% power users drive 50% usage). This confirmed premium features like analytics would drive conversions.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q3: How did you measure success?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> Success was measured by 3.5% conversion, $0.35 ARPU, less than 5% churn, and +7% retention for paid users. Amplitude tracked funnels, Mixpanel validated retention, and Tableau quantified $350K MRR.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q4: How did you mitigate churn risks?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I used soft paywalls (usage caps), grandfathered free users, and tested clear value messaging (“Save 10 hours/month”). Optimizely A/B tests ensured less than 5% churn, with Stripe ensuring smooth billing.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q5: What would you do differently?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I’d test usage-based pricing for prosumer segments and explore enterprise tiers earlier. I’d also increase survey sample (500 vs. 200) to capture edge cases and reduce reliance on A/B iterations.
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
          <li><strong>User-Centric Approach:</strong> Aligning monetization with user value.</li>
          <li><strong>Data-Driven Decisions:</strong> Using surveys, analytics, and A/B tests.</li>
          <li><strong>Risk Management:</strong> Minimizing churn with soft paywalls.</li>
          <li><strong>Business Impact:</strong> Delivering scalable revenue ($350K MRR).</li>
          <li><strong>Scalability & Iteration:</strong> Planning enterprise and regional pricing.</li>
          <li><strong>Analytical Rigor:</strong> Benchmarking and validating with data.</li>
        </ul>
        <p className="text-gray-700 mt-4">
          This case study excels with a user-driven, data-backed monetization strategy, robust experimentation, and clear risk mitigation, making it compelling for PM interviews.
        </p>
      </section>
    </div>
  );
};

// Simulation Component
const Simulation = () => {
  const [paywallStrictness, setPaywallStrictness] = useState(5);
  const [pricing, setPricing] = useState(9.99);
  const [conversion, setConversion] = useState(3.5);
  const [arpu, setArpu] = useState(0.35);
  const [churn, setChurn] = useState(5);

  const calculateImpact = useCallback(() => {
    let newConversion = 3.5;
    let newArpu = 0.35;
    let newChurn = 5;

    // Stricter paywall increases conversion but risks churn
    newConversion += paywallStrictness * 0.3;
    newArpu += paywallStrictness * 0.05;
    newChurn += paywallStrictness * 0.2;

    // Higher pricing increases ARPU but reduces conversion
    newArpu += pricing * 0.02;
    newConversion -= pricing * 0.1;
    newChurn += pricing * 0.05;

    setConversion(Math.max(0, Math.min(5, newConversion.toFixed(1))));
    setArpu(Math.max(0, newArpu.toFixed(2)));
    setChurn(Math.max(0, newChurn.toFixed(1)));
  }, [paywallStrictness, pricing]);

  React.useEffect(() => {
    calculateImpact();
  }, [paywallStrictness, pricing, calculateImpact]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-2">Paywall Strictness: {paywallStrictness}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={paywallStrictness}
          onChange={(e) => setPaywallStrictness(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Pro Tier Pricing ($): {pricing}</label>
        <input
          type="range"
          min="5.99"
          max="14.99"
          step="1"
          value={pricing}
          onChange={(e) => setPricing(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="p-4 bg-indigo-100 rounded-lg">
        <p className="text-gray-800 font-semibold">Simulated Outcomes:</p>
        <p className="text-gray-700">Free-to-Paid Conversion: {conversion}%</p>
        <p className="text-gray-700">ARPU: ${arpu}</p>
        <p className="text-gray-700">Churn Rate: {churn}%</p>
        <p className="text-gray-700 mt-2">
          {conversion >= 3 && arpu >= 0.3 && churn <= 5
            ? 'Success! Achieves 3%+ conversion, $0.30+ ARPU, and ≤5% churn.'
            : 'Adjust paywall and pricing to achieve 3%+ conversion, $0.30+ ARPU, and ≤5% churn.'}
        </p>
      </div>
    </div>
  );
};

export default MonetizationCaseStudy;