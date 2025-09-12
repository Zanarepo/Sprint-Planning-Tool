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
    { id: 'c1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Company Overview', description: 'E-commerce with growth, limited resources.', type: 'research' } },
    { id: 'c2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'Situation', description: 'High-impact decisions needed.', type: 'research' } },
    { id: 'c3', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Challenge', description: 'Prioritize one initiative.', type: 'research' } },
  ],
  contextEdges: [
    { id: 'ce1-2', source: 'c1', target: 'c2', animated: true, label: 'Business Context', style: { stroke: '#6366f1' } },
    { id: 'ce2-3', source: 'c2', target: 'c3', animated: true, label: 'Prioritization Needs', style: { stroke: '#6366f1' } },
  ],
  goals: [
    { id: 'g1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Primary Goal', description: 'Maximize business impact.', type: 'research' } },
    { id: 'g2', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'Success Metrics', description: 'Revenue, acquisition, efficiency.', type: 'research' } },
  ],
  goalsEdges: [
    { id: 'ge1-2', source: 'g1', target: 'g2', animated: true, label: 'Metric Alignment', style: { stroke: '#6366f1' } },
  ],
  framework: [
    { id: 'f1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'ICE Framework', description: 'Score Impact, Confidence, Ease.', type: 'research' } },
    { id: 'f2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'Option Evaluation', description: 'Checkout, referral, dashboard.', type: 'research' } },
    { id: 'f3', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Decision', description: 'Prioritize checkout conversion.', type: 'research' } },
  ],
  frameworkEdges: [
    { id: 'fe1-2', source: 'f1', target: 'f2', animated: true, label: 'Framework Application', style: { stroke: '#6366f1' } },
    { id: 'fe2-3', source: 'f2', target: 'f3', animated: true, label: 'Evaluation Scores', style: { stroke: '#6366f1' } },
  ],
  execution: [
    { id: 'e1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Diagnosis', description: 'Analyze funnel drop-offs.', type: 'implementation' } },
    { id: 'e2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'Experiments', description: 'A/B test checkout fixes.', type: 'implementation' } },
    { id: 'e3', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Monitor', description: 'Track conversion, GMV.', type: 'implementation' } },
  ],
  executionEdges: [
    { id: 'ee1-2', source: 'e1', target: 'e2', animated: true, label: 'Funnel Insights', style: { stroke: '#6366f1' } },
    { id: 'ee2-3', source: 'e2', target: 'e3', animated: true, label: 'Experiment Metrics', style: { stroke: '#6366f1' } },
  ],
  results: [
    { id: 'r1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Conversion Lift', description: '40% → 50% conversion.', type: 'outcome' } },
    { id: 'r2', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'Revenue Impact', description: '~20% revenue increase.', type: 'outcome' } },
    { id: 'r3', type: 'custom', position: { x: 650, y: 50 }, data: { label: 'Roadmap Update', description: 'Referral next quarter.', type: 'outcome' } },
  ],
  resultsEdges: [
    { id: 're1-2', source: 'r1', target: 'r2', animated: true, label: 'Conversion Metrics', style: { stroke: '#6366f1' } },
    { id: 're2-3', source: 'r2', target: 'r3', animated: true, label: 'Business Impact', style: { stroke: '#6366f1' } },
  ],
};

// Step Details for Each Node
const stepDetails = {
  // Context Nodes
  c1: {
    title: 'Company Overview',
    description: 'Mid-stage e-commerce with strong growth, limited resources.',
    tools: ['Mixpanel', 'Confluence'],
    thoughtProcess: 'Resource constraints demand focus. I hypothesized revenue as the key driver.',
    challenges: 'Balancing growth vs revenue; aligning teams.',
    navigation: 'Analyzed Mixpanel for growth (30% YoY), documented in Confluence.',
    userFeedback: 'N/A (Business-driven).',
    details: '1M MAU, 50% GMV growth, 4 engineers available.',
    dataConnection: 'Sends context to Situation node.'
  },
  c2: {
    title: 'Situation',
    description: 'High-impact decisions needed with limited bandwidth.',
    tools: ['Slack', 'Jira'],
    thoughtProcess: 'One initiative must deliver now. I expected checkout to align with OKRs.',
    challenges: 'Avoiding sunk costs; stakeholder alignment.',
    navigation: 'Aligned via Slack, prioritized in Jira. Focused on revenue OKR.',
    userFeedback: 'N/A (Leadership-driven).',
    details: 'One initiative for Q1, $2M GMV at risk if misprioritized.',
    dataConnection: 'Sends situation to Challenge node.'
  },
  c3: {
    title: 'Challenge',
    description: 'Prioritize one initiative to avoid delays.',
    tools: ['Miro', 'Google Sheets'],
    thoughtProcess: 'Wrong choice risks growth. I prioritized data-driven decisions.',
    challenges: 'Quantifying impact; managing trade-offs.',
    navigation: 'Mapped options in Miro, scored in Google Sheets.',
    userFeedback: 'N/A (Strategy-driven).',
    details: 'Risk: 10% GMV loss ($200K) or 5% user churn.',
    dataConnection: 'Informs ICE Framework node.'
  },
  // Goals Nodes
  g1: {
    title: 'Primary Goal',
    description: 'Maximize business impact in one quarter.',
    tools: ['Google Sheets', 'Amplitude'],
    thoughtProcess: 'Revenue drives sustainability. I expected checkout to yield quick wins.',
    challenges: 'Balancing short vs long-term; setting targets.',
    navigation: 'Defined 20% revenue lift goal in Google Sheets, tracked in Amplitude.',
    userFeedback: 'N/A (Business-driven).',
    details: 'Target: 20% revenue lift, 10% conversion improvement.',
    dataConnection: 'Sends goal to Success Metrics node.'
  },
  g2: {
    title: 'Success Metrics',
    description: 'Track revenue, acquisition, efficiency.',
    tools: ['Amplitude', 'Looker'],
    thoughtProcess: 'Metrics ensure alignment. I prioritized conversion for revenue impact.',
    challenges: 'Defining clear metrics; ensuring data capture.',
    navigation: 'Set conversion/GMV in Amplitude, efficiency in Looker dashboards.',
    userFeedback: 'N/A (Technical-driven).',
    details: '10% conversion lift, 20% revenue lift, 10% faster decisions.',
    dataConnection: 'Receives goal. Sends metrics to ICE Framework node.'
  },
  // Framework Nodes
  f1: {
    title: 'ICE Framework',
    description: 'Score initiatives on Impact, Confidence, Ease.',
    tools: ['Excel', 'Miro'],
    thoughtProcess: 'ICE ensures objectivity. I expected checkout to score highest.',
    challenges: 'Scoring accuracy; stakeholder buy-in.',
    navigation: 'Built ICE model in Excel, visualized trade-offs in Miro.',
    userFeedback: 'N/A (Data-driven).',
    details: 'Impact: revenue/growth; Confidence: data evidence; Ease: resource fit.',
    dataConnection: 'Sends framework to Option Evaluation node.'
  },
  f2: {
    title: 'Option Evaluation',
    description: 'Evaluate checkout, referral, dashboard.',
    tools: ['Amplitude', 'Google Forms'],
    thoughtProcess: 'Checkout aligns with revenue. I expected funnel data to confirm.',
    challenges: 'Quantifying delayed benefits; avoiding bias.',
    navigation: 'Analyzed funnel in Amplitude, surveyed users via Google Forms (70% cite checkout friction).',
    userFeedback: '"Checkout is slow," said 70% of users.',
    details: 'Checkout: 8/10; Referral: 6/10; Dashboard: 5/10.',
    dataConnection: 'Sends scores to Decision node.'
  },
  f3: {
    title: 'Decision',
    description: 'Prioritize checkout conversion for revenue.',
    tools: ['Jira', 'Slack'],
    thoughtProcess: 'Checkout maximizes impact. I confirmed with data and stakeholders.',
    challenges: 'Justifying deferrals; aligning teams.',
    navigation: 'Finalized in Jira, communicated via Slack. Deferred referral/dashboard.',
    userFeedback: 'N/A (Leadership-driven).',
    details: 'Checkout: high impact, high confidence, moderate ease.',
    dataConnection: 'Sends decision to Diagnosis node.'
  },
  // Execution Nodes
  e1: {
    title: 'Diagnosis',
    description: 'Analyze funnel to identify friction.',
    tools: ['Amplitude', 'FullStory'],
    thoughtProcess: 'Funnel data pinpoints issues. I expected UX friction as key.',
    challenges: 'Isolating drop-offs; data noise.',
    navigation: 'Built funnel heatmaps in Amplitude, analyzed replays in FullStory.',
    userFeedback: '"Forms are confusing," said 60% of users.',
    details: '60% cart-to-checkout drop-off, slow load (2s), mandatory signup.',
    dataConnection: 'Sends insights to Experiments node.'
  },
  e2: {
    title: 'Experiments',
    description: 'A/B test guest checkout, one-click payments.',
    tools: ['Firebase', 'Amplitude'],
    thoughtProcess: 'Quick fixes drive lift. I expected guest checkout to reduce friction.',
    challenges: 'Designing tests; avoiding regressions.',
    navigation: 'A/B tested guest checkout and simplified forms via Firebase, tracked in Amplitude.',
    userFeedback: '"Guest checkout is faster," said 80% of testers.',
    details: 'Guest checkout: +8% conversion; one-click: +5% in 4 weeks.',
    dataConnection: 'Sends metrics to Monitor node.'
  },
  e3: {
    title: 'Monitor',
    description: 'Track conversion rate, GMV lift.',
    tools: ['Looker', 'Mixpanel'],
    thoughtProcess: 'Monitoring ensures impact. I expected 20% revenue lift.',
    challenges: 'Long-term tracking; isolating variables.',
    navigation: 'Built GMV dashboards in Looker, validated in Mixpanel.',
    userFeedback: 'N/A (Data-driven).',
    details: 'Conversion: 40% → 50%, GMV +20%, $400K revenue lift.',
    dataConnection: 'Sends metrics to Conversion Lift node.'
  },
  // Results Nodes
  r1: {
    title: 'Conversion Lift',
    description: 'Checkout conversion from 40% → 50%.',
    tools: ['Amplitude', 'Looker'],
    thoughtProcess: 'Conversion drives revenue. I expected quick fixes to deliver.',
    challenges: 'Sustaining lift; avoiding regressions.',
    navigation: 'Tracked conversion in Amplitude, visualized in Looker.',
    userFeedback: '"Checkout is seamless," said 85% of users.',
    details: '10% conversion lift, 80% user satisfaction in surveys.',
    dataConnection: 'Sends metrics to Revenue Impact node.'
  },
  r2: {
    title: 'Revenue Impact',
    description: '~20% revenue increase in one quarter.',
    tools: ['Tableau', 'Mixpanel'],
    thoughtProcess: 'Revenue validates prioritization. I expected GMV to reflect conversion.',
    challenges: 'Quantifying LTV; ensuring scalability.',
    navigation: 'Modeled revenue in Tableau, validated cohorts in Mixpanel.',
    userFeedback: 'N/A (Data-driven).',
    details: '$400K revenue lift, +15% LTV, faster profitability.',
    dataConnection: 'Sends impact to Roadmap Update node.'
  },
  r3: {
    title: 'Roadmap Update',
    description: 'Referral program next quarter.',
    tools: ['Jira', 'Confluence'],
    thoughtProcess: 'Revenue funds growth. I planned referrals for Q2.',
    challenges: 'Balancing new priorities; resource allocation.',
    navigation: 'Updated roadmap in Jira, documented in Confluence.',
    userFeedback: 'N/A (Strategy-driven).',
    details: 'Referral Q2, dashboard Q3, funded by $400K lift.',
    dataConnection: 'Receives impact. Outputs final outcomes.'
  },
};

// Case Study Component
const PrioritizationCaseStudy = () => {
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
         You are the Product Manager at a mid-stage e-commerce platform experiencing strong user growth but with limited engineering capacity. The company’s primary OKR for the next quarter is revenue growth. You can only prioritize one of the following initiatives: improving checkout conversion, launching a referral program, or building an analytics dashboard. 
         Which initiative would you choose, why, and how would you define success?    </p>
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

      {/* Framework Section */}
      {renderSection(
        'Decision Framework',
        sectionNodes.framework,
        sectionNodes.frameworkEdges,
        <FaLightbulb className="text-3xl text-yellow-500 mr-3" />
      )}

      {/* Execution Section */}
      {renderSection(
        'Execution Plan',
        sectionNodes.execution,
        sectionNodes.executionEdges,
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
          <li>Prioritize immediate revenue impact when resources are constrained.</li>
          <li>Data-driven frameworks like ICE ensure objectivity.</li>
          <li>User feedback (70% cite checkout friction) validates hypotheses.</li>
          <li><strong>Next Step:</strong> Launch referral program in Q2, dashboard in Q3, funded by revenue lift.</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Key Takeaways</h3>
        <p className="text-gray-700">
          As a PM, I drove impact by using a structured ICE framework, prioritizing revenue-aligned checkout improvements, and validating with user and funnel data. This approach demonstrates analytical rigor and strategic prioritization, ideal for PM interviews.
        </p>
      </section>

      {/* Simulation Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-3xl text-green-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Simulation: Prioritization Trade-offs</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Adjust focus on checkout UX and backend optimization to see impacts on conversion rate, revenue, and implementation time, simulating trade-offs.
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
            <h3 className="text-xl font-semibold text-gray-800">Q1: Why prioritize checkout conversion over other options?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> Checkout scored highest in ICE (8/10) for high revenue impact, high confidence (60% drop-off in Amplitude), and moderate ease (4 engineers). Referral had delayed impact (6/10), and dashboard was indirect (5/10), misaligning with revenue OKR.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q2: How did you identify checkout friction?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I analyzed Amplitude funnels (60% cart-to-checkout drop-off) and FullStory replays (slow load, complex forms). Surveys showed 70% of users cited friction, confirming UX and signup issues.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q3: How did you measure success?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> Success was measured by 40% → 50% conversion, 20% revenue lift ($400K), and 15% LTV increase. Amplitude tracked conversion, Looker visualized GMV, and Mixpanel validated cohorts.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q4: How did you manage limited resources?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I used ICE to focus on checkout (moderate ease, 4 engineers). A/B tests (guest checkout, one-click) were rolled out incrementally via Firebase, minimizing scope creep and technical debt.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q5: What would you do differently?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I’d conduct broader user testing (50 vs 20 users) for edge cases and explore lightweight referral incentives in parallel to balance growth. I’d also invest in automated funnel alerts earlier.
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
          <li><strong>Analytical Rigor:</strong> Using frameworks like ICE for objective decisions.</li>
          <li><strong>Data-Driven Approach:</strong> Leveraging funnel data and user feedback.</li>
          <li><strong>Strategic Prioritization:</strong> Aligning with revenue OKR under constraints.</li>
          <li><strong>User-Centric Thinking:</strong> Addressing user pain points (checkout friction).</li>
          <li><strong>Impact & Scalability:</strong> Delivering measurable revenue gains.</li>
          <li><strong>Reflection & Learning:</strong> Planning future iterations (referral, dashboard).</li>
        </ul>
        <p className="text-gray-700 mt-4">
          This case study excels with a structured, data-driven prioritization process, user-centric fixes, and clear alignment with business goals, making it compelling for PM interviews.
        </p>
      </section>
    </div>
  );
};

// Simulation Component
const Simulation = () => {
  const [uxFocus, setUxFocus] = useState(5);
  const [backendFocus, setBackendFocus] = useState(5);
  const [conversion, setConversion] = useState(40);
  const [revenue, setRevenue] = useState(100);
  const [implementationTime, setImplementationTime] = useState(6);

  const calculateImpact = useCallback(() => {
    let newConversion = 40;
    let newRevenue = 100;
    let newImplementationTime = 6;

    // UX focus improves conversion but increases implementation time
    newConversion += uxFocus * 2;
    newRevenue += uxFocus * 4;
    newImplementationTime += uxFocus * 0.5;

    // Backend focus improves conversion and reduces implementation time
    newConversion += backendFocus * 1;
    newRevenue += backendFocus * 2;
    newImplementationTime -= backendFocus * 0.3;

    setConversion(Math.min(50, newConversion.toFixed(1)));
    setRevenue(Math.min(120, newRevenue.toFixed(1)));
    setImplementationTime(Math.max(4, newImplementationTime.toFixed(1)));
  }, [uxFocus, backendFocus]);

  React.useEffect(() => {
    calculateImpact();
  }, [uxFocus, backendFocus, calculateImpact]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-2">Checkout UX Focus: {uxFocus}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={uxFocus}
          onChange={(e) => setUxFocus(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Backend Optimization Focus: {backendFocus}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={backendFocus}
          onChange={(e) => setBackendFocus(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="p-4 bg-indigo-100 rounded-lg">
        <p className="text-gray-800 font-semibold">Simulated Outcomes:</p>
        <p className="text-gray-700">Conversion Rate: {conversion}%</p>
        <p className="text-gray-700">Revenue Lift: {revenue}%</p>
        <p className="text-gray-700">Implementation Time: {implementationTime} weeks</p>
        <p className="text-gray-700 mt-2">
          {conversion >= 50 && revenue >= 120 && implementationTime <= 6
            ? 'Success! Achieves 50%+ conversion, 20%+ revenue lift, in ≤6 weeks.'
            : 'Adjust UX and backend focus to achieve 50%+ conversion, 20%+ revenue lift, in ≤6 weeks.'}
        </p>
      </div>
    </div>
  );
};

export default PrioritizationCaseStudy;