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
    { id: 'c1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Retention Drop', description: '90-day retention fell 35% → 20%.', type: 'research' } },
    { id: 'c2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'Business Impact', description: 'Lower LTV, worse UA ROI.', type: 'research' } },
    { id: 'c3', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Objective', description: 'Stop bleed, restore retention.', type: 'research' } },
  ],
  contextEdges: [
    { id: 'ce1-2', source: 'c1', target: 'c2', animated: true, label: 'Business Context', style: { stroke: '#6366f1' } },
    { id: 'ce2-3', source: 'c2', target: 'c3', animated: true, label: 'Retention Goal', style: { stroke: '#6366f1' } },
  ],
  goals: [
    { id: 'g1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Primary Goal', description: 'Restore 90-day retention to 30–35%.', type: 'research' } },
    { id: 'g2', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'Supporting Metrics', description: 'D1/D7, activation, DAU/MAU.', type: 'research' } },
  ],
  goalsEdges: [
    { id: 'ge1-2', source: 'g1', target: 'g2', animated: true, label: 'Metric Alignment', style: { stroke: '#6366f1' } },
  ],
  triage: [
    { id: 't1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Data Validation', description: 'Verify analytics integrity.', type: 'research' } },
    { id: 't2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'Cohort Segmentation', description: 'Slice by channel, version.', type: 'research' } },
    { id: 't3', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Infra & Support Checks', description: 'Crashes, tickets, reviews.', type: 'research' } },
  ],
  triageEdges: [
    { id: 'te1-2', source: 't1', target: 't2', animated: true, label: 'Validated Data', style: { stroke: '#6366f1' } },
    { id: 'te2-3', source: 't2', target: 't3', animated: true, label: 'Cohort Insights', style: { stroke: '#6366f1' } },
  ],
  diagnosis: [
    { id: 'd1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Cohort Analysis', description: 'Retention curves, funnels.', type: 'research' } },
    { id: 'd2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'Qualitative Research', description: 'Interviews, replays.', type: 'research' } },
    { id: 'd3', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Hypothesis Generation', description: 'Prioritize with RICE.', type: 'research' } },
  ],
  diagnosisEdges: [
    { id: 'de1-2', source: 'd1', target: 'd2', animated: true, label: 'Cohort Data', style: { stroke: '#6366f1' } },
    { id: 'de1-3', source: 'd1', target: 'd3', animated: true, label: 'Quantitative Insights', style: { stroke: '#6366f1' } },
    { id: 'de2-3', source: 'd2', target: 'd3', animated: true, label: 'Qualitative Insights', style: { stroke: '#6366f1' } },
  ],
  experiments: [
    { id: 'e1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Onboarding A/B Test', description: 'Simplify flow for activation.', type: 'implementation' } },
    { id: 'e2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'Crash Fixes', description: 'Patch top crashes.', type: 'implementation' } },
    { id: 'e3', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'Acquisition Adjustment', description: 'Pause low-quality channels.', type: 'implementation' } },
    { id: 'e4', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Re-engagement Campaign', description: 'Targeted push/email.', type: 'implementation' } },
  ],
  experimentsEdges: [
    { id: 'ee1-2', source: 'e1', target: 'e2', animated: true, label: 'Experiment Metrics', style: { stroke: '#6366f1' } },
    { id: 'ee2-3', source: 'e2', target: 'e3', animated: true, label: 'Fix Validation', style: { stroke: '#6366f1' } },
    { id: 'ee3-4', source: 'e3', target: 'e4', animated: true, label: 'Cohort Impact', style: { stroke: '#6366f1' } },
  ],
  results: [
    { id: 'r1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Quick Fixes', description: 'Crashes down 70%, activation up.', type: 'outcome' } },
    { id: 'r2', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'Experiment Wins', description: 'Onboarding, UA improved.', type: 'outcome' } },
    { id: 'r3', type: 'custom', position: { x: 650, y: 50 }, data: { label: 'Strategic Features', description: 'Habit loops, personalization.', type: 'outcome' } },
  ],
  resultsEdges: [
    { id: 're1-2', source: 'r1', target: 'r2', animated: true, label: 'Fix Metrics', style: { stroke: '#6366f1' } },
    { id: 're2-3', source: 'r2', target: 'r3', animated: true, label: 'Experiment Results', style: { stroke: '#6366f1' } },
  ],
};

// Step Details for Each Node
const stepDetails = {
  // Context Nodes
  c1: {
    title: 'Retention Drop',
    description: '90-day retention fell from 35% to 20% over two quarters.',
    tools: ['Amplitude', 'Mixpanel'],
    thoughtProcess: 'The drop signals a critical issue. I hypothesized technical or UX regressions as likely causes.',
    challenges: 'Confirming data accuracy; identifying root cause quickly.',
    navigation: 'Checked Amplitude for event accuracy, Mixpanel for cohort trends. Planned 48-hour triage.',
    userFeedback: 'N/A (Data-driven).',
    details: '15% drop impacts LTV ($500K/month loss), detected over 6 months.',
    dataConnection: 'Sends retention data to Business Impact node.'
  },
  c2: {
    title: 'Business Impact',
    description: 'Lower LTV, worse ROI on user acquisition.',
    tools: ['Looker', 'Excel'],
    thoughtProcess: 'Retention drop hurts monetization. I expected acquisition or product changes as contributors.',
    challenges: 'Quantifying LTV impact; aligning stakeholders.',
    navigation: 'Modeled LTV loss in Excel ($500K/month). Built Looker dashboard for stakeholder alignment.',
    userFeedback: 'N/A (Business-driven).',
    details: '5% churn increase risks $2M ARR loss. UA ROI down 20%.',
    dataConnection: 'Sends impact to Objective node.'
  },
  c3: {
    title: 'Objective',
    description: 'Stop retention bleed, restore to 30–35%.',
    tools: ['Confluence', 'Slack'],
    thoughtProcess: 'Quick triage and experiments were critical. I prioritized data validation to avoid false positives.',
    challenges: 'Balancing speed vs. accuracy; setting realistic targets.',
    navigation: 'Defined OKRs in Confluence (30–35% retention). Aligned via Slack with growth and eng teams.',
    userFeedback: 'N/A (Leadership-driven).',
    details: 'Target: 30% in 3 months, 35% in 6 months. Focus on triage and experiments.',
    dataConnection: 'Informs Data Validation and Cohort Segmentation nodes.'
  },
  // Goals Nodes
  g1: {
    title: 'Primary Goal',
    description: 'Restore 90-day retention to 30–35% in 3–6 months.',
    tools: ['Google Sheets', 'Mixpanel'],
    thoughtProcess: 'Restoring retention required quick wins and long-term fixes. I expected activation to drive retention.',
    challenges: 'Setting achievable targets; aligning metrics.',
    navigation: 'Defined 30–35% goal in Google Sheets. Validated via Mixpanel retention curves.',
    userFeedback: 'N/A (Business-driven).',
    details: '30% in 3 months, 35% in 6 months to recover $1.5M ARR.',
    dataConnection: 'Sends goal to Supporting Metrics node.'
  },
  g2: {
    title: 'Supporting Metrics',
    description: 'Track D1/D7 retention, activation, DAU/MAU, crashes.',
    tools: ['Prometheus', 'Amplitude'],
    thoughtProcess: 'Leading metrics would pinpoint issues. I targeted activation and D7 retention for early signals.',
    challenges: 'Defining relevant metrics; ensuring data coverage.',
    navigation: 'Set D1/D7 metrics in Amplitude, crash SLOs in Prometheus. Built dashboards for tracking.',
    userFeedback: 'N/A (Technical-driven).',
    details: 'D1: +10%, D7: +15%, activation: +20%, crash rate: <1%, DAU/MAU: +5%.',
    dataConnection: 'Receives goal. Sends metrics to Triage nodes.'
  },
  // Triage Nodes
  t1: {
    title: 'Data Validation',
    description: 'Verify analytics integrity in Amplitude/Mixpanel.',
    tools: ['Amplitude', 'Mixpanel', 'BigQuery'],
    thoughtProcess: 'Instrumentation errors could mislead. I prioritized raw event checks to rule out analytics bugs.',
    challenges: 'Ensuring event schema accuracy; debugging pipelines.',
    navigation: 'Queried raw events in BigQuery, validated schemas in Amplitude. Checked SDK updates in Mixpanel.',
    userFeedback: 'N/A (Data-driven).',
    details: 'Confirmed drop is real, not an analytics bug. No schema or pipeline issues.',
    dataConnection: 'Sends validated data to Cohort Segmentation node.'
  },
  t2: {
    title: 'Cohort Segmentation',
    description: 'Slice by channel, version, OS, geography.',
    tools: ['Looker', 'BigQuery'],
    thoughtProcess: 'Segmentation would reveal patterns. I hypothesized a specific channel or version caused the drop.',
    challenges: 'Handling large datasets; isolating variables.',
    navigation: 'Built Looker dashboards for cohorts (install date, channel). Queried BigQuery for version/OS splits.',
    userFeedback: 'N/A (Data-driven).',
    details: 'Found drop in paid UA cohorts (15% retention) and app version 2.3 (18% retention).',
    dataConnection: 'Sends cohort insights to Infra & Support Checks node.'
  },
  t3: {
    title: 'Infra & Support Checks',
    description: 'Check crashes, latencies, support tickets.',
    tools: ['Crashlytics', 'Datadog', 'Zendesk'],
    thoughtProcess: 'Infra issues could drive churn. I expected crashes or latency spikes as contributors.',
    challenges: 'Correlating infra to retention; parsing support data.',
    navigation: 'Analyzed Crashlytics for crash spikes, Datadog for latency, Zendesk for complaints (30% surge in login issues).',
    userFeedback: '"App crashes on startup," said 25% of reviews.',
    details: 'Crash rate up 2% on version 2.3, login latency +100ms, 30% ticket surge.',
    dataConnection: 'Sends insights to Cohort Analysis and Qualitative Research nodes.'
  },
  // Diagnosis Nodes
  d1: {
    title: 'Cohort Analysis',
    description: 'Analyze retention curves, funnels by cohort.',
    tools: ['Amplitude', 'Looker'],
    thoughtProcess: 'Retention curves would pinpoint drop timing. I expected activation funnel issues.',
    challenges: 'Isolating drop-off points; handling noisy data.',
    navigation: 'Built retention curves in Amplitude, funnel heatmaps in Looker. Found 20% drop in activation.',
    userFeedback: 'N/A (Data-driven).',
    details: 'Drop began 3 months ago, tied to version 2.3. Activation fell from 60% to 40%.',
    dataConnection: 'Sends quantitative insights to Hypothesis Generation node.'
  },
  d2: {
    title: 'Qualitative Research',
    description: 'Conduct interviews, session replays, ticket analysis.',
    tools: ['Zoom', 'FullStory', 'Zendesk'],
    thoughtProcess: 'Qualitative data would clarify user pain. I expected onboarding or crashes as key issues.',
    challenges: 'Recruiting churned users; synthesizing feedback.',
    navigation: 'Interviewed 20 churned users via Zoom, analyzed FullStory replays, tagged Zendesk tickets (40% login issues).',
    userFeedback: '"Onboarding was confusing," said 60% of users. "App crashed," noted 30%.',
    details: 'Onboarding friction (complex forms), crashes on low-end devices, login failures.',
    dataConnection: 'Sends qualitative insights to Hypothesis Generation node.'
  },
  d3: {
    title: 'Hypothesis Generation',
    description: 'Generate and prioritize hypotheses with RICE.',
    tools: ['Excel', 'Miro'],
    thoughtProcess: 'Hypotheses would guide experiments. I prioritized onboarding and crashes for high impact.',
    challenges: 'Balancing stakeholder inputs; scoring accuracy.',
    navigation: 'Created hypotheses in Excel, scored with RICE in Miro. Top picks: onboarding friction, crash regression.',
    userFeedback: 'N/A (Data-driven).',
    details: 'H1: Onboarding (8/10), H2: Crashes (7/10), H3: UA quality (6/10), H4: Re-engagement (6/10).',
    dataConnection: 'Receives quant/qual insights. Sends hypotheses to Experiment nodes.'
  },
  // Experiments Nodes
  e1: {
    title: 'Onboarding A/B Test',
    description: 'Simplify onboarding to boost activation.',
    tools: ['Firebase', 'Amplitude'],
    thoughtProcess: 'Simplified onboarding would drive retention. I expected 15% activation lift.',
    challenges: 'Designing low-friction flow; ensuring metrics capture.',
    navigation: 'A/B tested simplified flow (social login, fewer fields) via Firebase. Tracked in Amplitude.',
    userFeedback: '"New onboarding is faster," said 80% of test users.',
    details: '15% activation lift, +10% D7 retention in 4-week test.',
    dataConnection: 'Sends metrics to Quick Fixes node.'
  },
  e2: {
    title: 'Crash Fixes',
    description: 'Patch top crashes on version 2.3.',
    tools: ['Crashlytics', 'Sentry'],
    thoughtProcess: 'Crashes drove churn on low-end devices. I prioritized hotfixes for quick impact.',
    challenges: 'Identifying crash causes; deploying fixes fast.',
    navigation: 'Patched top 3 crashes in Crashlytics, monitored in Sentry. Released hotfix in 1 week.',
    userFeedback: 'N/A (Technical-driven).',
    details: 'Crash rate down 70%, affected users’ retention up 12%.',
    dataConnection: 'Sends fix validation to Acquisition Adjustment node.'
  },
  e3: {
    title: 'Acquisition Adjustment',
    description: 'Pause low-quality paid UA channels.',
    tools: ['AppsFlyer', 'Looker'],
    thoughtProcess: 'Low-quality UA hurt retention. I expected reallocation to boost cohort quality.',
    challenges: 'Identifying worst channels; reallocating budget.',
    navigation: 'Paused 2 lowest-retention channels in AppsFlyer, tracked in Looker. Shifted to organic/high-LTV sources.',
    userFeedback: 'N/A (Data-driven).',
    details: 'Paid cohort retention up 8% after reallocation.',
    dataConnection: 'Sends cohort impact to Re-engagement Campaign node.'
  },
  e4: {
    title: 'Re-engagement Campaign',
    description: 'Targeted push/email to reactivate users.',
    tools: ['Braze', 'Mixpanel'],
    thoughtProcess: 'Re-engagement could recover dormant users. I prioritized value-focused messaging.',
    challenges: 'Crafting effective messages; avoiding spam.',
    navigation: 'Launched Braze campaigns with value reminders, tracked in Mixpanel. Tested 3 variants.',
    userFeedback: '"Push reminded me of value," said 50% of reactivated users.',
    details: '10% reactivation rate, +5% D30 retention in 4-week test.',
    dataConnection: 'Sends metrics to Experiment Wins node.'
  },
  // Results Nodes
  r1: {
    title: 'Quick Fixes',
    description: 'Reduced crashes by 70%, activation up 15%.',
    tools: ['Crashlytics', 'Amplitude'],
    thoughtProcess: 'Quick fixes built trust. I prioritized crashes for immediate impact.',
    challenges: 'Ensuring fixes didn’t regress; scaling to all users.',
    navigation: 'Rolled out crash hotfixes via Crashlytics, monitored activation in Amplitude.',
    userFeedback: '"App feels stable," said 75% of affected users.',
    details: 'Crash rate <1%, activation from 40% to 55%, D7 retention +10%.',
    dataConnection: 'Sends fix metrics to Experiment Wins node.'
  },
  r2: {
    title: 'Experiment Wins',
    description: 'Onboarding and UA adjustments lifted retention.',
    tools: ['Firebase', 'Looker'],
    thoughtProcess: 'Experiments validated hypotheses. I scaled onboarding and UA wins for broader impact.',
    challenges: 'Rolling out variants; measuring long-term retention.',
    navigation: 'Scaled simplified onboarding via Firebase, adjusted UA in Looker. Tracked 90-day retention.',
    userFeedback: '"Onboarding is intuitive," said 85% of new users.',
    details: '90-day retention to 30%, D1 +12%, D7 +15%.',
    dataConnection: 'Sends experiment results to Strategic Features node.'
  },
  r3: {
    title: 'Strategic Features',
    description: 'Habit loops, personalization boosted retention.',
    tools: ['Mixpanel', 'Tableau'],
    thoughtProcess: 'Long-term features drove habit formation. I prioritized personalization for engagement.',
    challenges: 'Building scalable features; isolating impact.',
    navigation: 'Launched habit loops and recommendations in Mixpanel, visualized LTV in Tableau.',
    userFeedback: '"Daily tasks keep me engaged," said 80% of users.',
    details: '90-day retention to 33%, DAU/MAU +7%, LTV +$100/user.',
    dataConnection: 'Receives experiment results. Outputs final outcomes.'
  },
};

// Case Study Component
const RetentionCaseStudy = () => {
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
          90-day retention dropped from 35% to 20% over two quarters, impacting LTV and UA ROI. The goal is to diagnose the root cause, stop the decline, and restore retention to 30–35% within 3–6 months.
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

      {/* Triage Section */}
      {renderSection(
        '48-Hour Triage',
        sectionNodes.triage,
        sectionNodes.triageEdges,
        <FaLightbulb className="text-3xl text-yellow-500 mr-3" />
      )}

      {/* Diagnosis Section */}
      {renderSection(
        'Deep Diagnosis',
        sectionNodes.diagnosis,
        sectionNodes.diagnosisEdges,
        <FaLightbulb className="text-3xl text-yellow-500 mr-3" />
      )}

      {/* Experiments Section */}
      {renderSection(
        'Experiments & Fixes',
        sectionNodes.experiments,
        sectionNodes.experimentsEdges,
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
          <li>Quick triage prevents chasing false positives.</li>
          <li>Activation drives long-term retention; onboarding is critical.</li>
          <li>Qualitative feedback uncovers UX issues quant data misses.</li>
          <li><strong>Next Step:</strong> Scale personalization, habit loops, and retention dashboards for sustained gains.</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Key Takeaways</h3>
        <p className="text-gray-700">
          As a PM, I drove impact by combining rapid triage, data-driven experiments, and user-centric fixes. This structured, iterative approach demonstrates analytical rigor and leadership, ideal for retention challenges.
        </p>
      </section>

      {/* Simulation Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-3xl text-green-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Simulation: Retention Experiment Trade-offs</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Adjust focus on onboarding, crashes, and re-engagement to see impacts on 90-day retention, activation rate, and LTV, simulating trade-offs.
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
            <h3 className="text-xl font-semibold text-gray-800">Q1: How did you diagnose the retention drop?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I triaged in 48 hours using Amplitude to validate data, segmented cohorts in Looker (found version 2.3 and paid UA issues), and checked Crashlytics/Zendesk (crash spike, login complaints). Deep diagnosis used retention curves and 20 user interviews, identifying onboarding friction and crashes.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q2: How did you prioritize experiments?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I used RICE scoring in Excel, prioritizing onboarding (8/10, 15% activation lift) and crash fixes (7/10, 70% crash reduction) for high impact and low effort. User feedback (60% cited onboarding issues) and cohort data validated the choice.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q3: How did you measure success?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> Success was measured by 90-day retention (20% to 33%), activation (+15%), D7 retention (+15%), and crash rate (less than 1%). Amplitude dashboards tracked metrics, with Mixpanel validating LTV gains ($100/user).
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q4: How did you ensure quick impact?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I prioritized crash hotfixes (1-week rollout, 70% crash reduction) and A/B tested onboarding simplification (15% activation lift in 4 weeks) via Firebase. Triage in 48 hours ensured no analytics errors misled efforts.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q5: What would you do differently?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I’d conduct broader user interviews (50 vs 20) to capture edge cases. I’d test personalization earlier to boost habit formation. I’d also set stricter guardrails on UA spend to avoid low-quality channels upfront.
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
          <li><strong>Analytical Rigor:</strong> Diagnosing issues with data and user insights.</li>
          <li><strong>Data-Driven Approach:</strong> Using metrics to prioritize and measure impact.</li>
          <li><strong>User-Centric Thinking:</strong> Addressing user pain points effectively.</li>
          <li><strong>Collaboration & Leadership:</strong> Driving cross-functional alignment.</li>
          <li><strong>Impact & Scalability:</strong> Delivering measurable retention gains.</li>
          <li><strong>Reflection & Learning:</strong> Iterating based on experiment outcomes.</li>
        </ul>
        <p className="text-gray-700 mt-4">
          This case study excels with a structured, data-driven, and user-centric approach, making it compelling for PM interviews.
        </p>
      </section>
    </div>
  );
};

// Simulation Component
const Simulation = () => {
  const [onboardingFocus, setOnboardingFocus] = useState(5);
  const [crashFocus, setCrashFocus] = useState(5);
  const [reengagementFocus, setReengagementFocus] = useState(5);
  const [retention, setRetention] = useState(20);
  const [activation, setActivation] = useState(40);
  const [ltv, setLtv] = useState(100);

  const calculateImpact = useCallback(() => {
    let newRetention = 20;
    let newActivation = 40;
    let newLtv = 100;

    // Onboarding drives activation and retention
    newActivation += onboardingFocus * 3;
    newRetention += onboardingFocus * 2;
    newLtv += onboardingFocus * 10;

    // Crash fixes drive retention
    newRetention += crashFocus * 1.5;
    newActivation += crashFocus * 1;
    newLtv += crashFocus * 5;

    // Re-engagement drives retention and LTV
    newRetention += reengagementFocus * 1;
    newLtv += reengagementFocus * 15;

    setRetention(Math.min(35, newRetention.toFixed(1)));
    setActivation(Math.min(80, newActivation.toFixed(1)));
    setLtv(Math.min(200, newLtv.toFixed(1)));
  }, [onboardingFocus, crashFocus, reengagementFocus]);

  React.useEffect(() => {
    calculateImpact();
  }, [onboardingFocus, crashFocus, reengagementFocus, calculateImpact]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-2">Onboarding Focus: {onboardingFocus}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={onboardingFocus}
          onChange={(e) => setOnboardingFocus(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Crash Fix Focus: {crashFocus}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={crashFocus}
          onChange={(e) => setCrashFocus(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Re-engagement Focus: {reengagementFocus}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={reengagementFocus}
          onChange={(e) => setReengagementFocus(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="p-4 bg-indigo-100 rounded-lg">
        <p className="text-gray-800 font-semibold">Simulated Outcomes:</p>
        <p className="text-gray-700">90-Day Retention: {retention}%</p>
        <p className="text-gray-700">Activation Rate: {activation}%</p>
        <p className="text-gray-700">LTV: ${ltv}/user</p>
        <p className="text-gray-700 mt-2">
          {retention >= 30 && activation >= 55 && ltv >= 150
            ? 'Success! Achieves 30%+ retention, 55%+ activation, and $150+ LTV.'
            : 'Adjust focus to achieve 30%+ retention, 55%+ activation, and $150+ LTV.'}
        </p>
      </div>
    </div>
  );
};

export default RetentionCaseStudy;