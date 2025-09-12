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
    { id: 'c1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Company Overview', description: 'Tech company with 1,000 engineers.', type: 'research' } },
    { id: 'c2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'Situation', description: 'Need for IDP to boost productivity.', type: 'research' } },
    { id: 'c3', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Challenge', description: 'Balance reliability, tooling, cost.', type: 'research' } },
  ],
  contextEdges: [
    { id: 'ce1-2', source: 'c1', target: 'c2', animated: true, label: 'Business Context', style: { stroke: '#6366f1' } },
    { id: 'ce2-3', source: 'c2', target: 'c3', animated: true, label: 'IDP Needs', style: { stroke: '#6366f1' } },
  ],
  problem: [
    { id: 'p1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Developer Research', description: 'Gather pain points from engineers.', type: 'research' } },
    { id: 'p2', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'Technical Risks', description: 'Outages, slow pipelines.', type: 'research' } },
    { id: 'p3', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Business Risks', description: 'Churn, high costs.', type: 'research' } },
  ],
  problemEdges: [
    { id: 'pe1-2', source: 'p1', target: 'p2', animated: true, label: 'Developer Feedback', style: { stroke: '#6366f1' } },
    { id: 'pe1-3', source: 'p1', target: 'p3', animated: true, label: 'Pain Points', style: { stroke: '#6366f1' } },
  ],
  goal: [
    { id: 'g1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Business Goals', description: 'Velocity, uptime, cost savings.', type: 'research' } },
    { id: 'g2', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'Technical Metrics', description: 'DORA metrics, NPS.', type: 'research' } },
  ],
  goalEdges: [
    { id: 'ge1-2', source: 'g1', target: 'g2', animated: true, label: 'Metric Alignment', style: { stroke: '#6366f1' } },
  ],
  approach: [
    { id: 'a1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Stakeholder Alignment', description: 'Align on OKRs.', type: 'research' } },
    { id: 'a2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'Prioritization', description: 'RICE scoring for initiatives.', type: 'research' } },
    { id: 'a3', type: 'custom', position: { x: 50, y: 350 }, data: { label: 'Roadmap Design', description: 'Phased rollout: Q1-Q4.', type: 'implementation' } },
    { id: 'a4', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Execution & Feedback', description: 'Metrics, A/B tests, syncs.', type: 'implementation' } },
  ],
  approachEdges: [
    { id: 'ae1-2', source: 'a1', target: 'a2', animated: true, label: 'Stakeholder Needs', style: { stroke: '#6366f1' } },
    { id: 'ae2-3', source: 'a2', target: 'a3', animated: true, label: 'Prioritization Scores', style: { stroke: '#6366f1' } },
    { id: 'ae3-4', source: 'a3', target: 'a4', animated: true, label: 'Roadmap Metrics', style: { stroke: '#6366f1' } },
  ],
  results: [
    { id: 'r1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Q1: Reliability', description: 'Stabilized CI/CD, observability.', type: 'outcome' } },
    { id: 'r2', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'Q2: Tooling', description: 'Self-service, templates.', type: 'outcome' } },
    { id: 'r3', type: 'custom', position: { x: 650, y: 50 }, data: { label: 'Q3: Cost Efficiency', description: 'Auto-scaling, chargebacks.', type: 'outcome' } },
    { id: 'r4', type: 'custom', position: { x: 950, y: 50 }, data: { label: 'Q4: Impact', description: 'Velocity, NPS, savings.', type: 'outcome' } },
  ],
  resultsEdges: [
    { id: 're1-2', source: 'r1', target: 'r2', animated: true, label: 'Reliability Metrics', style: { stroke: '#6366f1' } },
    { id: 're2-3', source: 'r2', target: 'r3', animated: true, label: 'Tooling Metrics', style: { stroke: '#6366f1' } },
    { id: 're3-4', source: 'r3', target: 'r4', animated: true, label: 'Cost Metrics', style: { stroke: '#6366f1' } },
  ],
};

// Step Details for Each Node
const stepDetails = {
  // Context Nodes
  c1: {
    title: 'Company Overview',
    description: 'Tech company with ~1,000 engineers across product teams.',
    tools: ['Jira', 'Confluence'],
    thoughtProcess: 'Understanding team scale and structure shaped the IDP scope. I hypothesized fragmented infra slowed productivity.',
    challenges: 'Aligning diverse team needs; scoping IDP for scale.',
    navigation: 'Analyzed Jira for project bottlenecks, mapped team structures in Confluence. Interviewed leads to confirm infra issues.',
    userFeedback: 'N/A (Business-driven).',
    details: '1,000 engineers, 10 product teams, 20% productivity loss due to infra fragmentation.',
    dataConnection: 'Sends business context to Situation node.'
  },
  c2: {
    title: 'Situation',
    description: 'Fragmented infra and tooling slow productivity.',
    tools: ['Slack', 'Google Docs'],
    thoughtProcess: 'An IDP could unify tooling and boost efficiency. I expected reliability to be a prerequisite for DX gains.',
    challenges: 'Securing leadership buy-in; defining IDP scope.',
    navigation: 'Documented pain points in Google Docs, aligned via Slack. Presented IDP benefits to leadership (velocity, cost savings).',
    userFeedback: 'N/A (Leadership-driven).',
    details: 'Slow CI/CD, inconsistent tooling, rising cloud costs ($10M/year). IDP to streamline developer workflows.',
    dataConnection: 'Sends IDP needs to Challenge node.'
  },
  c3: {
    title: 'Challenge',
    description: 'Balance reliability, tooling, and cost with limited capacity.',
    tools: ['Miro', 'Excel'],
    thoughtProcess: 'Competing priorities required a clear framework. I prioritized reliability to avoid outages impacting customers.',
    challenges: 'Managing stakeholder conflicts; avoiding over-indexing.',
    navigation: 'Mapped priorities in Miro, modeled trade-offs in Excel. Facilitated workshops to align on balanced roadmap.',
    userFeedback: 'N/A (Stakeholder-driven).',
    details: 'Risks: outages (reliability), slow onboarding (tooling), budget overruns (cost). Team capacity: 2–3 initiatives/quarter.',
    dataConnection: 'Informs Developer Research and Technical Risks nodes.'
  },
  // Problem Nodes
  p1: {
    title: 'Developer Research',
    description: 'Gathered pain points from engineers via surveys and interviews.',
    tools: ['Google Forms', 'Zoom', 'DORA Metrics'],
    thoughtProcess: 'Developer feedback would prioritize initiatives. I hypothesized CI/CD failures and slow onboarding were key issues.',
    challenges: 'Reaching all teams; quantifying pain points.',
    navigation: 'Surveyed 200 engineers via Google Forms, conducted 15 Zoom interviews. Analyzed DORA metrics for baseline performance.',
    userFeedback: '"CI/CD failures waste hours," said 70% of engineers. "Onboarding takes too long," noted 60%.',
    details: '20% CI/CD failure rate, 2-week onboarding time, 30% time lost to infra issues.',
    dataConnection: 'Sends developer feedback to Technical Risks and Business Risks nodes.'
  },
  p2: {
    title: 'Technical Risks',
    description: 'Address outages, slow pipelines, and infra fragmentation.',
    tools: ['Prometheus', 'Grafana'],
    thoughtProcess: 'Reliability was critical to avoid customer impact. I expected observability to reduce MTTR.',
    challenges: 'Stabilizing CI/CD; scaling observability.',
    navigation: 'Analyzed pipeline failures in Prometheus, visualized in Grafana. Planned observability upgrades to cut MTTR.',
    userFeedback: 'N/A (Technical-driven).',
    details: 'Risks: 5% outage rate ($1M/revenue loss), P95 pipeline duration 15min, no unified observability.',
    dataConnection: 'Receives developer feedback. Sends risks to Prioritization node.'
  },
  p3: {
    title: 'Business Risks',
    description: 'Mitigate developer churn and budget overruns.',
    tools: ['Excel', 'Tableau'],
    thoughtProcess: 'Slow velocity risked churn, high costs strained budgets. I prioritized DX to retain engineers.',
    challenges: 'Quantifying churn impact; balancing cost vs. performance.',
    navigation: 'Modeled churn in Excel (10% risk per 5min pipeline delay). Visualized costs in Tableau ($10M/year cloud spend).',
    userFeedback: 'N/A (Data-driven).',
    details: '10% churn risk costs $5M/year. Cloud overspend risks $2M over budget.',
    dataConnection: 'Receives developer feedback. Sends risks to Prioritization node.'
  },
  // Goal Nodes
  g1: {
    title: 'Business Goals',
    description: 'Increase velocity, maintain uptime, reduce costs.',
    tools: ['Google Sheets', 'Mixpanel'],
    thoughtProcess: 'Business goals drove prioritization. I expected reliability to enable DX and cost savings.',
    challenges: 'Balancing competing goals; setting realistic targets.',
    navigation: 'Defined goals in Google Sheets (+20% velocity, 15% cost savings). Validated via Mixpanel productivity data.',
    userFeedback: 'N/A (Business-driven).',
    details: '+20% velocity, 99.95% uptime, 15% cost reduction over 12 months.',
    dataConnection: 'Sends goals to Technical Metrics node.'
  },
  g2: {
    title: 'Technical Metrics',
    description: 'Improve DORA metrics, achieve high NPS.',
    tools: ['Prometheus', 'Grafana'],
    thoughtProcess: 'DORA metrics ensured measurable progress. I targeted <10min CI/CD for industry standards.',
    challenges: 'Defining achievable metrics; aligning with goals.',
    navigation: 'Set metrics in Prometheus (+25% deployment frequency, <30min MTTR). Built Grafana dashboards for tracking.',
    userFeedback: 'N/A (Technical-driven).',
    details: '+25% deployment frequency, <30min MTTR, <10min P95 CI/CD, 85% NPS, optimized cost/developer.',
    dataConnection: 'Receives goals. Sends metrics to Execution node.'
  },
  // Approach Nodes
  a1: {
    title: 'Stakeholder Alignment',
    description: 'Aligned engineering, SREs, finance via interviews and OKRs.',
    tools: ['Zoom', 'Confluence'],
    thoughtProcess: 'Alignment ensured shared priorities. I expected reliability to be the top concern for SREs.',
    challenges: 'Managing conflicting priorities; building consensus.',
    navigation: 'Conducted 20 Zoom interviews, documented OKRs in Confluence. Facilitated workshops to align on trade-offs.',
    userFeedback: '"Reliability is critical," said SRE lead. "Tooling saves time," noted a product dev.',
    details: 'Mapped pain points: SREs (outages), devs (tooling), finance (costs). OKRs unified priorities.',
    dataConnection: 'Sends needs to Prioritization node.'
  },
  a2: {
    title: 'Prioritization',
    description: 'Used RICE to rank reliability, tooling, cost initiatives.',
    tools: ['Excel', 'Miro'],
    thoughtProcess: 'A data-driven framework avoided bias. I prioritized reliability to prevent revenue loss.',
    challenges: 'Balancing stakeholder inputs; quantifying impact.',
    navigation: 'Built RICE model in Excel (Impact × Confidence × Effort × Risk). Validated rankings in Miro workshops.',
    userFeedback: '"Fix CI/CD first," said 75% of engineers.',
    details: 'Reliability: 8/10 (high risk reduction). Tooling: 7/10 (leverage). Cost: 6/10 (financial impact).',
    dataConnection: 'Receives stakeholder needs. Sends scores to Roadmap Design node.'
  },
  a3: {
    title: 'Roadmap Design',
    description: 'Phased rollout: reliability (Q1), tooling (Q2), cost (Q3), growth (Q4).',
    tools: ['Jira', 'Figma'],
    thoughtProcess: 'A phased approach balanced urgency and impact. I prioritized reliability to build trust.',
    challenges: 'Managing scope; aligning cross-functional teams.',
    navigation: 'Planned roadmap in Jira: Q1 (CI/CD, observability), Q2 (self-service, templates), Q3 (auto-scaling). Designed UX in Figma.',
    userFeedback: '"Self-service envs are a game-changer," said a dev.',
    details: 'Q1: 50% CI/CD failure reduction. Q2: Onboarding time to 2 days. Q3: 15% cost savings.',
    dataConnection: 'Receives scores. Sends roadmap to Execution node.'
  },
  a4: {
    title: 'Execution & Feedback',
    description: 'Measured metrics, ran A/B tests, held syncs.',
    tools: ['Prometheus', 'Grafana', 'Slack'],
    thoughtProcess: 'Continuous feedback ensured alignment. I expected A/B tests to validate tooling impact.',
    challenges: 'Tracking diverse metrics; managing feedback loops.',
    navigation: 'Tracked DORA metrics in Prometheus/Grafana, ran A/B tests on tooling for 3 teams. Held monthly Slack syncs.',
    userFeedback: '"New templates cut setup time," said 80% of pilot devs.',
    details: 'Monthly syncs refined roadmap. A/B tests showed +30% deployment frequency with templates.',
    dataConnection: 'Receives roadmap. Sends metrics to Results nodes.'
  },
  // Results Nodes
  r1: {
    title: 'Q1: Reliability',
    description: 'Stabilized CI/CD, added observability, cost dashboards.',
    tools: ['Jenkins', 'Prometheus', 'Grafana'],
    thoughtProcess: 'Reliability was critical to avoid outages. I prioritized CI/CD to build trust.',
    challenges: 'Reducing pipeline failures; scaling observability.',
    navigation: 'Upgraded Jenkins pipelines, added Prometheus tracing. Built Grafana cost dashboards. Tested with 5 teams.',
    userFeedback: '"Fewer pipeline failures," said 85% of SREs.',
    details: '40% outage reduction, 98% CI/CD success rate, 25min MTTR.',
    dataConnection: 'Sends reliability metrics to Q2 Tooling node.'
  },
  r2: {
    title: 'Q2: Tooling',
    description: 'Launched self-service envs, standardized templates.',
    tools: ['Terraform', 'Figma', 'Mixpanel'],
    thoughtProcess: 'Tooling boosted velocity. I prioritized self-service to cut onboarding time.',
    challenges: 'Simplifying env setup; ensuring template adoption.',
    navigation: 'Implemented Terraform for envs, designed templates in Figma. Tracked adoption in Mixpanel.',
    userFeedback: '"Envs in hours, not days," said 90% of pilot devs.',
    details: 'Onboarding time to 2 days, +30% deployment frequency, 8min P95 CI/CD.',
    dataConnection: 'Receives reliability metrics. Sends tooling metrics to Q3 Cost node.'
  },
  r3: {
    title: 'Q3: Cost Efficiency',
    description: 'Implemented auto-scaling, chargeback model.',
    tools: ['AWS', 'Tableau', 'Kubernetes'],
    thoughtProcess: 'Cost savings required accountability. I prioritized auto-scaling to cut idle costs.',
    challenges: 'Balancing cost vs. performance; driving chargeback adoption.',
    navigation: 'Set AWS auto-scaling policies, built Tableau chargeback dashboards. Deployed on Kubernetes for efficiency.',
    userFeedback: '"Chargebacks clarify usage," said finance lead.',
    details: '18% cost savings ($2M/year), no performance impact, 85% team adoption.',
    dataConnection: 'Receives tooling metrics. Sends cost metrics to Q4 Impact node.'
  },
  r4: {
    title: 'Q4: Impact',
    description: 'Achieved velocity, NPS, and cost savings.',
    tools: ['Mixpanel', 'Tableau', 'Google Forms'],
    thoughtProcess: 'Metrics validated IDP impact. I focused on velocity and NPS to quantify developer gains.',
    challenges: 'Isolating IDP impact; ensuring scalability.',
    navigation: 'Tracked velocity in Mixpanel, visualized savings in Tableau. Surveyed NPS via Google Forms.',
    userFeedback: '"IDP makes dev life easier," said 88% of engineers.',
    details: '+20% velocity, 99.95% uptime, 18% cost savings, 82 NPS.',
    dataConnection: 'Receives cost metrics. Outputs final impact metrics.'
  },
};

// Case Study Component
const IDPCaseStudy = () => {
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
          You are a Technical Program Manager at a mid-to-large tech company with ~1,000 engineers. Engineering productivity is slowing due to fragmented infra, increasing cloud costs, and inconsistent tooling. Leadership invests in an IDP team to improve developer experience and efficiency, but the backlog includes competing priorities.
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
          <li>Reliability is foundational; it enables tooling impact.</li>
          <li>Developer-first tooling drives velocity more than cost cuts.</li>
          <li>Cost optimization gains traction after DX wins.</li>
          <li><strong>Next Step:</strong> Evolve IDP with golden paths, security, and self-service scaling.</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Key Takeaways</h3>
        <p className="text-gray-700">
          As a TPM, I drove impact by aligning stakeholders, prioritizing reliability, and delivering developer-centric tools. This data-driven, balanced approach demonstrates leadership and scalability, critical for tech organizations.
        </p>
      </section>

      {/* Simulation Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-3xl text-green-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Simulation: Roadmap Prioritization</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Adjust prioritization weights for reliability, tooling, and cost to see impacts on developer velocity, uptime, and cost savings, simulating roadmap trade-offs.
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
            <h3 className="text-xl font-semibold text-gray-800">Q1: How did you prioritize initiatives?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I used RICE scoring (Impact × Confidence × Effort × Risk), prioritizing reliability (8/10) for outage reduction, tooling (7/10) for velocity, and cost (6/10) for savings. Developer feedback (70% cited CI/CD issues) and Excel modeling validated reliability-first.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q2: How did you align stakeholders?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I conducted 20 Zoom interviews with SREs, devs, and finance, mapping pain points in Confluence. OKRs unified priorities, and Miro workshops resolved trade-offs, ensuring reliability-first with tooling next.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q3: How did you measure success?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> Success was measured by +20% velocity, 99.95% uptime, 18% cost savings ($2M), and 82 NPS. Prometheus/Grafana tracked DORA metrics (+30% deployment frequency, 8min CI/CD), with surveys validating DX gains.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q4: How did you ensure reliability?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I stabilized CI/CD with Jenkins upgrades, reducing failures by 50%. Prometheus tracing and Grafana alerts cut MTTR to 25min. A/B tests on 5 teams validated a 98% success rate.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q5: What would you do differently?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I’d conduct broader developer surveys upfront to quantify tooling needs. I’d pilot auto-scaling earlier to balance cost and performance. Finally, I’d explore multi-cloud options in Q3 for cost flexibility.
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
          <li><strong>Technical Acumen:</strong> Designing reliable, scalable platforms.</li>
          <li><strong>Data-Driven Approach:</strong> Using metrics and feedback to prioritize.</li>
          <li><strong>Developer-Centric Thinking:</strong> Addressing engineer pain points.</li>
          <li><strong>Collaboration & Leadership:</strong> Aligning diverse stakeholders.</li>
          <li><strong>Impact & Scalability:</strong> Delivering measurable results.</li>
          <li><strong>Reflection & Learning:</strong> Reflecting on trade-offs and improvements.</li>
        </ul>
        <p className="text-gray-700 mt-4">
          This case study excels with a structured, developer-driven, and data-centric approach, making it compelling for TPM interviews.
        </p>
      </section>
    </div>
  );
};

// Simulation Component
const Simulation = () => {
  const [reliabilityWeight, setReliabilityWeight] = useState(8);
  const [toolingWeight, setToolingWeight] = useState(7);
  const [costWeight, setCostWeight] = useState(6);
  const [velocity, setVelocity] = useState(10);
  const [uptime, setUptime] = useState(99.9);
  const [savings, setSavings] = useState(10);

  const calculateImpact = useCallback(() => {
    let newVelocity = 10;
    let newUptime = 99.9;
    let newSavings = 10;

    // Reliability drives uptime and velocity
    newUptime += reliabilityWeight * 0.006;
    newVelocity += reliabilityWeight * 1.5;
    newSavings += reliabilityWeight * 0.5;

    // Tooling drives velocity
    newVelocity += toolingWeight * 2;
    newUptime += toolingWeight * 0.002;
    newSavings += toolingWeight * 0.3;

    // Cost drives savings
    newSavings += costWeight * 1.5;
    newVelocity += costWeight * 0.5;
    newUptime -= costWeight * 0.001;

    setVelocity(Math.min(30, newVelocity.toFixed(1)));
    setUptime(Math.min(99.95, newUptime.toFixed(2)));
    setSavings(Math.min(20, newSavings.toFixed(1)));
  }, [reliabilityWeight, toolingWeight, costWeight]);

  React.useEffect(() => {
    calculateImpact();
  }, [reliabilityWeight, toolingWeight, costWeight, calculateImpact]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-2">Reliability Weight: {reliabilityWeight}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={reliabilityWeight}
          onChange={(e) => setReliabilityWeight(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Tooling Weight: {toolingWeight}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={toolingWeight}
          onChange={(e) => setToolingWeight(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Cost Weight: {costWeight}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={costWeight}
          onChange={(e) => setCostWeight(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="p-4 bg-indigo-100 rounded-lg">
        <p className="text-gray-800 font-semibold">Simulated Outcomes:</p>
        <p className="text-gray-700">Developer Velocity: +{velocity}%</p>
        <p className="text-gray-700">Infra Uptime: {uptime}%</p>
        <p className="text-gray-700">Cost Savings: {savings}%</p>
        <p className="text-gray-700 mt-2">
          {velocity >= 20 && uptime >= 99.95 && savings >= 15
            ? 'Success! Roadmap achieves +20% velocity, 99.95% uptime, and 15% savings.'
            : 'Adjust weights to achieve +20% velocity, 99.95% uptime, and 15% savings.'}
        </p>
      </div>
    </div>
  );
};

export default IDPCaseStudy;