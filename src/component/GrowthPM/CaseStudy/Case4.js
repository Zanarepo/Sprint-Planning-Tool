import React, { useState, useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import { FaUniversity, FaChartLine, FaLightbulb, FaComments } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';

// Custom Node Component for React Flow with Unique Styling
const CustomNode = ({ data }) => (
  <div className={`border-2 rounded-lg p-4 shadow-md w-64 ${data.type === 'research' ? 'bg-blue-100 border-blue-500' : data.type === 'matrix' ? 'bg-green-100 border-green-500' : data.type === 'decision' ? 'bg-yellow-100 border-yellow-500' : 'bg-purple-100 border-purple-500'}`}>
    <div className={`font-semibold ${data.type === 'research' ? 'text-blue-600' : data.type === 'matrix' ? 'text-green-600' : data.type === 'decision' ? 'text-yellow-600' : 'text-purple-600'}`}>{data.label}</div>
    <div className="text-sm text-gray-600">{data.description}</div>
  </div>
);

// React Flow Nodes and Edges
const initialNodes = [
  { id: '1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'User Research', description: 'Surveys and interviews to understand user needs.', type: 'research' } },
  { id: '2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'Market Trends', description: 'Analyze market size and growth rates.', type: 'research' } },
  { id: '3', type: 'custom', position: { x: 50, y: 350 }, data: { label: 'Competitor Analysis', description: 'Benchmark against competitors.', type: 'research' } },
  { id: '4', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Impact-Effort Matrix', description: 'Evaluate verticals for prioritization.', type: 'matrix' } },
  { id: '5', type: 'custom', position: { x: 650, y: 200 }, data: { label: 'Decision: SME Lending', description: 'Select SME Lending as priority vertical.', type: 'decision' } },
  { id: '6', type: 'custom', position: { x: 950, y: 50 }, data: { label: 'Roadmap: Pilot (0-6 mo)', description: 'Launch pilot lending program.', type: 'roadmap' } },
  { id: '7', type: 'custom', position: { x: 950, y: 200 }, data: { label: 'Roadmap: Expansion (6-12 mo)', description: 'Expand to more SMEs, add credit scoring.', type: 'roadmap' } },
  { id: '8', type: 'custom', position: { x: 950, y: 350 }, data: { label: 'Roadmap: Proprietary Engine (12-18 mo)', description: 'Build proprietary lending engine.', type: 'roadmap' } },
];

const initialEdges = [
  { id: 'e1-4', source: '1', target: '4', animated: true, label: 'User Insights (Needs → Matrix)', style: { stroke: '#6366f1' } },
  { id: 'e2-4', source: '2', target: '4', animated: true, label: 'Market Data (Trends → Matrix)', style: { stroke: '#6366f1' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, label: 'Competitor Insights (Analysis → Matrix)', style: { stroke: '#6366f1' } },
  { id: 'e4-5', source: '4', target: '5', animated: true, label: 'Prioritization Data (Matrix → Decision)', style: { stroke: '#6366f1' } },
  { id: 'e5-6', source: '5', target: '6', animated: true, label: 'Decision Data (Decision → Pilot)', style: { stroke: '#6366f1' } },
  { id: 'e6-7', source: '6', target: '7', animated: true, label: 'Pilot Results (Pilot → Expansion)', style: { stroke: '#6366f1' } },
  { id: 'e7-8', source: '7', target: '8', animated: true, label: 'Expansion Data (Expansion → Engine)', style: { stroke: '#6366f1' } },
];

// Case Study Component
const FintechVerticalCaseStudy = () => {
  const [nodes] = useState(initialNodes);
  const [edges] = useState(initialEdges);
  const [selectedStep, setSelectedStep] = useState(null);

  const onNodeClick = useCallback((event, node) => {
    setSelectedStep(node.id);
  }, []);

  const stepDetails = {
    '1': {
      title: 'User Research',
      description: 'Conducted surveys and interviews to understand user needs for each vertical.',
      tools: ['Google Forms', 'Zoom', 'Looker'],
      thoughtProcess: 'Understanding user pain points was critical to align the vertical with demand. I hypothesized SMEs needed better access to capital, P2P users wanted low fees, and Wealth Management users sought simplicity.',
      challenges: 'Reaching diverse user segments; ensuring unbiased survey responses.',
      navigation: 'Surveyed 200 users (100 SMEs, 50 P2P users, 50 affluent users) via Google Forms. Conducted 20 in-depth Zoom interviews to validate findings. Used Looker to analyze response patterns.',
      userFeedback: '"Access to quick loans would help my business grow," said 85% of SMEs. "Low-fee transfers are key," said 70% of P2P users. "I want simple investment options," said 60% of affluent users.',
      details: 'Found SMEs prioritized fast, flexible loans; P2P users wanted low-cost transfers; affluent users valued ease of use. Insights fed into the Impact-Effort Matrix.',
      dataConnection: 'Sends user insights (e.g., SME loan needs, P2P fee sensitivity) to Impact-Effort Matrix to inform prioritization.'
    },
    '2': {
      title: 'Market Trends',
      description: 'Analyzed market size, growth rates, and trends for each vertical.',
      tools: ['Statista', 'CB Insights', 'Google BigQuery'],
      thoughtProcess: 'Market data would reveal growth potential. I expected SME Lending to be underserved, P2P to be saturated, and Wealth Management to be niche but high-value.',
      challenges: 'Accessing reliable, up-to-date market data; forecasting long-term trends.',
      navigation: 'Used Statista and CB Insights for TAM and growth rates. Analyzed trends in BigQuery to project 3-year growth. Validated with industry reports.',
      userFeedback: 'N/A (Market data-driven, not user-driven).',
      details: 'P2P Payments: $1T TAM, 5% CAGR, highly competitive. SME Lending: $500B TAM, 12% CAGR, underserved. Wealth Management: $200B TAM, 8% CAGR, niche but high-margin.',
      dataConnection: 'Sends market data (e.g., TAM, CAGR) to Impact-Effort Matrix to evaluate vertical potential.'
    },
    '3': {
      title: 'Competitor Analysis',
      description: 'Benchmarked against competitors to assess differentiation opportunities.',
      tools: ['Crunchbase', 'SimilarWeb', 'App Store Reviews'],
      thoughtProcess: 'Competitor strengths and gaps would highlight our differentiation. I expected P2P to have strong incumbents, SME Lending to have gaps, and Wealth Management to require expertise we lacked.',
      challenges: 'Gathering detailed competitor data; assessing indirect competitors.',
      navigation: 'Analyzed PayPal/Venmo (P2P), Kabbage/Fundbox (SME Lending), and Wealthfront/Robinhood (Wealth Management) via Crunchbase and SimilarWeb. Reviewed 500+ app store reviews for user sentiment.',
      userFeedback: 'N/A (Competitor data-driven).',
      details: 'P2P: PayPal/Venmo dominate with low fees, high adoption. SME Lending: Kabbage offers fast loans but high rates; gaps in personalized service. Wealth Management: Wealthfront excels in UX but requires investment expertise.',
      dataConnection: 'Sends competitor insights (e.g., gaps in SME Lending personalization) to Impact-Effort Matrix to inform prioritization.'
    },
    '4': {
      title: 'Impact-Effort Matrix',
      description: 'Evaluated verticals based on impact (revenue, growth) and effort (development, regulatory).',
      tools: ['Excel', 'Miro', 'Tableau'],
      thoughtProcess: 'A structured framework was needed to balance impact and feasibility. I customized the ICE framework to prioritize revenue, customer growth, and alignment with strengths.',
      challenges: 'Quantifying impact and effort accurately; aligning stakeholders on scores.',
      navigation: 'Built a matrix in Excel, scoring each vertical on Impact (revenue, growth), Confidence (alignment with strengths), and Ease (development, regulatory). Validated scores in Miro workshops with stakeholders. Visualized in Tableau.',
      userFeedback: 'N/A (Framework-driven).',
      details: 'P2P: Impact 7/10, Confidence 8/10, Ease 6/10 (competitive market). SME Lending: Impact 9/10, Confidence 9/10, Ease 7/10 (strong alignment, moderate regulatory hurdles). Wealth Management: Impact 6/10, Confidence 5/10, Ease 4/10 (expertise gap). SME Lending scored highest.',
      dataConnection: 'Receives user insights, market data, and competitor insights. Sends prioritization data (SME Lending selection) to Decision Point.'
    },
    '5': {
      title: 'Decision: SME Lending',
      description: 'Selected SME Lending as the priority vertical based on matrix outcomes.',
      tools: ['Jira', 'Slack', 'Google Docs'],
      thoughtProcess: 'SME Lending balanced high impact with company strengths (SME relationships, mobile app). It offered a fast-growing market with differentiation opportunities.',
      challenges: 'Convincing leadership to focus on one vertical; managing resource constraints.',
      navigation: 'Presented matrix results in Google Docs, highlighting SME Lending’s 9/10 impact and alignment. Secured leadership buy-in via Slack discussions and a Jira roadmap kickoff.',
      userFeedback: 'N/A (Decision-driven).',
      details: 'Chose SME Lending for its $500B TAM, 12% CAGR, underserved market, and alignment with existing SME relationships. Initiated roadmap planning.',
      dataConnection: 'Receives prioritization data from Impact-Effort Matrix. Sends decision data to Roadmap Phases for execution.'
    },
    '6': {
      title: 'Roadmap: Pilot (0-6 months)',
      description: 'Launch a pilot SME lending program with partner banks.',
      tools: ['Figma', 'Salesforce', 'Postman'],
      thoughtProcess: 'A pilot would validate demand and feasibility. Partnering with banks reduced initial risk while leveraging existing relationships.',
      challenges: 'Securing bank partnerships; designing a scalable pilot.',
      navigation: 'Negotiated with 3 banks via Salesforce, offering transaction fee shares. Designed pilot UX in Figma, tested with 10 SMEs. Used Postman to validate API integration.',
      userFeedback: '"A simple loan application process is critical," said 90% of pilot SMEs.',
      details: 'Launched pilot in 2 markets, targeting 1,000 SMEs. Integrated with bank APIs for loan processing. Goals: 500 loans disbursed, 80% user satisfaction.',
      dataConnection: 'Receives decision data from Decision Point. Sends pilot results (e.g., loan volume, user feedback) to Expansion Phase.'
    },
    '7': {
      title: 'Roadmap: Expansion (6-12 months)',
      description: 'Expand to more SMEs and add credit scoring feature.',
      tools: ['Node.js', 'GraphQL', 'Mixpanel'],
      thoughtProcess: 'Expansion would scale impact. Credit scoring would improve approval speed and personalization, driving retention.',
      challenges: 'Building accurate credit scoring; scaling to new markets.',
      navigation: 'Integrated third-party credit scoring API via GraphQL. Expanded to 5 markets, targeting 5,000 SMEs. Used Mixpanel to track application funnel metrics.',
      userFeedback: '"Faster approvals make a big difference," said an SME owner.',
      details: 'Scaled to 5,000 SMEs, added credit scoring. Goals: 2,000 loans disbursed, 15% increase in SME customer base, 10% cross-sell to payments/deposits.',
      dataConnection: 'Receives pilot results from Pilot Phase. Sends expansion data (e.g., loan metrics, cross-sell rates) to Proprietary Engine Phase.'
    },
    '8': {
      title: 'Roadmap: Proprietary Engine (12-18 months)',
      description: 'Build proprietary lending engine and explore cross-sell opportunities.',
      tools: ['Python', 'TensorFlow', 'Looker'],
      thoughtProcess: 'A proprietary engine would reduce costs and improve personalization. Cross-selling would maximize revenue from SMEs.',
      challenges: 'Developing a robust lending engine; ensuring regulatory compliance.',
      navigation: 'Built ML-based lending engine with TensorFlow, trained on pilot/expansion data. Used Looker to monitor cross-sell performance. Worked with legal for compliance.',
      userFeedback: '"I’d use more services if integrated well," said a returning SME.',
      details: 'Launched proprietary engine for 10,000 SMEs. Goals: 20% revenue growth, 30% SME customer base growth, 15% cross-sell rate.',
      dataConnection: 'Receives expansion data from Expansion Phase. Sends cross-sell offers and performance metrics back to User App via Analytics Engine.'
    },
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Problem Statement */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaLightbulb className="text-3xl text-yellow-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Problem Statement</h1>
        </div>
        <p className="text-gray-700 mb-4">
          You are a Product Manager at a fintech startup. The leadership team wants to expand into new product verticals to drive growth. You have three options: Peer-to-Peer Payments, SME Lending, Investment & Wealth Management. You are asked to decide which vertical to prioritize and build a roadmap. How would you approach this strategic decision?
        </p>
      </section>

      {/* Context Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaUniversity className="text-3xl text-indigo-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Case Study: Prioritizing SME Lending for Growth</h1>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Context / Background</h2>
          <p className="text-gray-700 mb-2"><strong>Company:</strong> Early-stage fintech with 500k users, focused on mobile banking.</p>
          <p className="text-gray-700 mb-2"><strong>Situation:</strong> Growth had plateaued; leadership wanted to expand into new verticals.</p>
          <p className="text-gray-700 mb-2"><strong>Challenge:</strong> Limited resources meant only one vertical could be prioritized first.</p>
          <p className="text-gray-700"><strong>My Role:</strong> As the PM, I led user research, market analysis, decision-making, and roadmap development, coordinating with cross-functional teams.</p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaLightbulb className="text-3xl text-yellow-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Problem / Challenge</h2>
        </div>
        <p className="text-gray-700 mb-2"><strong>Problem:</strong> Identify the highest-impact vertical balancing market demand, company strengths, and scalability.</p>
        <p className="text-gray-700 mb-2"><strong>Risk:</strong> Choosing the wrong vertical could waste resources and delay growth.</p>
        <p className="text-gray-700"><strong>Opportunity:</strong> Prioritize a vertical to drive revenue and customer growth.</p>
      </section>

      {/* Goal Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-3xl text-green-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Goal / Metrics</h2>
        </div>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Evaluate verticals using a data-driven decision framework.</li>
          <li>Prioritize one vertical to maximize market opportunity, alignment with strengths, and revenue growth.</li>
          <li>Define a 12–18 month roadmap with clear milestones and goals.</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Goals for Each Vertical</h3>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li><strong>P2P Payments:</strong> Achieve 10% user growth, 15% transaction volume increase, 5% revenue growth in 12 months.</li>
          <li><strong>SME Lending:</strong> Achieve 20% revenue growth, 30% SME customer base growth, 15% cross-sell rate in 12 months.</li>
          <li><strong>Wealth Management:</strong> Achieve 5% high-net-worth user growth, 10% revenue growth, 80% user satisfaction in 12 months.</li>
        </ul>
      </section>

      {/* Approach Section with React Flow */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-3xl text-green-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Approach / Action: Decision-Making & Roadmap</h2>
        </div>
        <div className="flex">
          {/* Left Column: React Flow Diagram */}
          <div className="w-2/3 pr-4">
            <div className="h-[500px]">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={{ custom: CustomNode }}
                onNodeClick={onNodeClick}
                fitView
              >
                <Background />
                <Controls />
                <MiniMap nodeColor={(node) => (node.data.type === 'research' ? '#3b82f6' : node.data.type === 'matrix' ? '#10b981' : node.data.type === 'decision' ? '#f59e0b' : '#8b5cf6')} />
              </ReactFlow>
            </div>
          </div>
          {/* Right Column: Explainer */}
          <div className="w-1/3 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Step Details</h3>
            {selectedStep ? (
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

      {/* Results Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-3xl text-blue-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Results / Outcome (Hypothetical)</h2>
        </div>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Expected 20% revenue growth within 12 months.</li>
          <li>Increased SME customer base by 30%.</li>
          <li>Achieved 15% cross-sell rate for payments/deposits.</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Deductions</h3>
        <p className="text-gray-700">
          Prioritizing SME Lending leveraged market demand and company strengths, driving significant growth. The structured decision-making process, backed by research and the ICE framework, ensured alignment with strategic goals. The roadmap’s phased approach balanced speed with scalability, setting a foundation for future verticals.
        </p>
      </section>

      {/* Learnings Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaLightbulb className="text-3xl text-yellow-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Learnings / Next Steps</h2>
        </div>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Data-driven frameworks like ICE ensure objective prioritization.</li>
          <li>User and market research are critical for aligning with demand.</li>
          <li>Partnerships reduce execution risk and accelerate timelines.</li>
          <li><strong>Next Step:</strong> Optimize proprietary lending engine and explore P2P Payments as the next vertical.</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Key Takeaways</h3>
        <p className="text-gray-700">
          As a PM, I drove strategic growth by grounding decisions in data, user insights, and company strengths. This rigorous, collaborative approach demonstrates leadership and scalability, critical for fintech expansion.
        </p>
      </section>

      {/* Simulation Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-3xl text-green-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Simulation: Impact-Effort Matrix Decision</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Adjust Impact and Effort variables for each vertical to see which is prioritized, simulating the decision-making process used in the case study.
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
            <h3 className="text-xl font-semibold text-gray-800">Q1: How did you structure the decision-making process?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I used a three-step process: user research (surveys, interviews), market trends (TAM, CAGR), and competitor analysis (benchmarks). These fed into a customized ICE matrix scoring Impact, Confidence, and Ease. SME Lending scored highest (9/10 Impact, 9/10 Confidence) due to market demand and alignment with our SME relationships.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q2: How did you validate SME Lending as the right choice?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> User research (200 users) showed 85% of SMEs needed fast loans. Market data indicated a $500B TAM with 12% CAGR, underserved compared to P2P’s saturated $1T market. Competitor gaps in personalized SME lending aligned with our strengths. The ICE matrix confirmed SME Lending’s high impact and feasibility.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q3: What challenges did you face in the roadmap?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> Regulatory compliance and bank partnerships were key hurdles. I worked with legal to navigate regulations and used Salesforce to secure bank agreements, offering transaction fee shares. Usability tests with SMEs refined the application UX, ensuring scalability in the pilot and expansion phases.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q4: How did you ensure cross-sell opportunities?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I integrated payments/deposits offers in the User App, targeting SMEs post-loan approval. Analytics showed a 15% cross-sell rate in the expansion phase. User feedback (75% liked relevant offers) guided personalized prompts, validated via A/B testing in Mixpanel.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q5: What would you do differently?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I’d conduct deeper user research earlier to quantify cross-sell potential. I’d also explore AI-driven credit scoring in the pilot to accelerate approvals. Finally, I’d engage more banks upfront to diversify funding and reduce reliance on a few partners.
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
          <li><strong>Strategic Decision-Making:</strong> Clear rationale for prioritizing a vertical.</li>
          <li><strong>Data-Driven Approach:</strong> Use of data to evaluate options and measure outcomes.</li>
          <li><strong>User-Centric Thinking:</strong> Incorporation of user feedback to guide decisions.</li>
          <li><strong>Collaboration & Leadership:</strong> Effective stakeholder and partnership management.</li>
          <li><strong>Impact & Scalability:</strong> Measurable results with scalable insights.</li>
          <li><strong>Reflection & Learning:</strong> Reflection on challenges and improvements.</li>
        </ul>
        <p className="text-gray-700 mt-4">
          This case study excels with a rigorous, data-driven decision process, user and market insights, and a scalable roadmap, making it compelling for interviews.
        </p>
      </section>
    </div>
  );
};

// Simulation Component
const Simulation = () => {
  const [p2pImpact, setP2pImpact] = useState(7);
  const [p2pEffort, setP2pEffort] = useState(6);
  const [smeImpact, setSmeImpact] = useState(9);
  const [smeEffort, setSmeEffort] = useState(7);
  const [wealthImpact, setWealthImpact] = useState(6);
  const [wealthEffort, setWealthEffort] = useState(4);
  const [prioritizedVertical, setPrioritizedVertical] = useState('SME Lending');

  const calculatePriority = useCallback(() => {
    const p2pScore = (p2pImpact * 0.5 + p2pEffort * 0.5) * (p2pImpact / p2pEffort);
    const smeScore = (smeImpact * 0.5 + smeEffort * 0.5) * (smeImpact / smeEffort);
    const wealthScore = (wealthImpact * 0.5 + wealthEffort * 0.5) * (wealthImpact / wealthEffort);

    if (smeScore >= p2pScore && smeScore >= wealthScore) {
      setPrioritizedVertical('SME Lending');
    } else if (p2pScore >= smeScore && p2pScore >= wealthScore) {
      setPrioritizedVertical('P2P Payments');
    } else {
      setPrioritizedVertical('Wealth Management');
    }
  }, [p2pImpact, p2pEffort, smeImpact, smeEffort, wealthImpact, wealthEffort]);

  React.useEffect(() => {
    calculatePriority();
  }, [p2pImpact, p2pEffort, smeImpact, smeEffort, wealthImpact, wealthEffort, calculatePriority]);

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-lg font-semibold text-gray-800">P2P Payments</h4>
        <label className="block text-gray-700 mb-2">Impact (Revenue, Growth): {p2pImpact}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={p2pImpact}
          onChange={(e) => setP2pImpact(Number(e.target.value))}
          className="w-full"
        />
        <label className="block text-gray-700 mb-2">Effort (Development, Regulatory): {p2pEffort}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={p2pEffort}
          onChange={(e) => setP2pEffort(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-800">SME Lending</h4>
        <label className="block text-gray-700 mb-2">Impact (Revenue, Growth): {smeImpact}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={smeImpact}
          onChange={(e) => setSmeImpact(Number(e.target.value))}
          className="w-full"
        />
        <label className="block text-gray-700 mb-2">Effort (Development, Regulatory): {smeEffort}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={smeEffort}
          onChange={(e) => setSmeEffort(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-800">Wealth Management</h4>
        <label className="block text-gray-700 mb-2">Impact (Revenue, Growth): {wealthImpact}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={wealthImpact}
          onChange={(e) => setWealthImpact(Number(e.target.value))}
          className="w-full"
        />
        <label className="block text-gray-700 mb-2">Effort (Development, Regulatory): {wealthEffort}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={wealthEffort}
          onChange={(e) => setWealthEffort(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="p-4 bg-indigo-100 rounded-lg">
        <p className="text-gray-800 font-semibold">Prioritized Vertical: {prioritizedVertical}</p>
        <p className="text-gray-700 mt-2">
          {prioritizedVertical === 'SME Lending'
            ? 'Success! SME Lending is prioritized due to high impact and alignment with company strengths.'
            : 'Adjust Impact and Effort to prioritize SME Lending for optimal growth and feasibility.'}
        </p>
      </div>
    </div>
  );
};

export default FintechVerticalCaseStudy;