import React, { useState, useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import { FaUtensils, FaChartLine, FaLightbulb, FaComments } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';

// Custom Node Component for React Flow
const CustomNode = ({ data }) => (
  <div className="bg-white border-2 border-indigo-500 rounded-lg p-4 shadow-md w-64">
    <div className="font-semibold text-indigo-600">{data.label}</div>
    <div className="text-sm text-gray-600">{data.description}</div>
  </div>
);

// React Flow Nodes and Edges
const initialNodes = [
  { id: '1', type: 'custom', position: { x: 50, y: 100 }, data: { label: 'User App', description: 'Captures order data and displays loyalty points.' } },
  { id: '2', type: 'custom', position: { x: 350, y: 100 }, data: { label: 'Points System', description: 'Tracks and allocates Foodie Points.' } },
  { id: '3', type: 'custom', position: { x: 650, y: 100 }, data: { label: 'Restaurant Partnerships', description: 'Co-funds discounts and validates rewards.' } },
  { id: '4', type: 'custom', position: { x: 950, y: 100 }, data: { label: 'Analytics Engine', description: 'Measures retention and order frequency.' } },
  { id: '5', type: 'custom', position: { x: 1250, y: 100 }, data: { label: 'Rewards Redemption', description: 'Processes user redemptions.' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, label: 'Order Data (User orders → Points allocation)', style: { stroke: '#6366f1' } },
  { id: 'e2-3', source: '2', target: '3', animated: true, label: 'Discount Funding (Points → Co-funded rewards)', style: { stroke: '#6366f1' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, label: 'Validation Data (Rewards → Metrics)', style: { stroke: '#6366f1' } },
  { id: 'e4-5', source: '4', target: '5', animated: true, label: 'Metrics Feedback (Analytics → Redemption)', style: { stroke: '#6366f1' } },
  { id: 'e5-1', source: '5', target: '1', animated: true, label: 'Rewards Applied (Discounts → User App)', style: { stroke: '#6366f1' } },
];

// Case Study Component
const LoyaltyProgramCaseStudy = () => {
  const [nodes] = useState(initialNodes);
  const [edges] = useState(initialEdges);
  const [selectedStep, setSelectedStep] = useState(null);

  const onNodeClick = useCallback((event, node) => {
    setSelectedStep(node.id);
  }, []);

  const stepDetails = {
    '1': {
      title: 'User App',
      description: 'Captures user order data and displays loyalty points balance, progress bar, and tier status.',
      tools: ['React Native', 'Firebase', 'Segment'],
      thoughtProcess: 'The app is the primary user interface. Real-time points updates and gamified visuals (progress bars, tiers) were prioritized to drive engagement.',
      challenges: 'Ensuring low-latency points display; supporting diverse devices (iOS, Android).',
      navigation: 'Optimized API calls with Firebase for real-time updates. Conducted device compatibility tests to ensure consistent UX.',
      userFeedback: '"I want to see my points right after ordering," said 75% of surveyed users.',
      details: 'Integrated a points tracker and progress bar showing Silver, Gold, Platinum tiers. Receives order data and sends to Points System; displays rewards from Rewards Redemption.',
      dataConnection: 'Sends order data (e.g., order value, user ID) to Points System for points allocation. Receives and displays applied rewards (e.g., discounts, free delivery) from Rewards Redemption.'
    },
    '2': {
      title: 'Points System',
      description: 'Tracks and allocates Foodie Points (10 points per $ spent) based on order data.',
      tools: ['Node.js', 'PostgreSQL', 'Redis'],
      thoughtProcess: 'A scalable backend was needed to handle points for 100k users. Instant crediting was hypothesized to build trust.',
      challenges: 'Database scalability under high transaction volume; preventing points fraud.',
      navigation: 'Used Redis for caching to reduce database load. Implemented fraud detection to flag suspicious activity.',
      userFeedback: '"Points should be added instantly," noted a 32-year-old user.',
      details: 'Credits points in real-time post-order confirmation. Sends points data to Restaurant Partnerships for discount funding.',
      dataConnection: 'Receives order data from User App to calculate points. Sends points balance and redemption requests to Restaurant Partnerships for co-funded rewards.'
    },
    '3': {
      title: 'Restaurant Partnerships',
      description: 'Collaborates with restaurants to co-fund discounts and validate rewards.',
      tools: ['Salesforce', 'DocuSign', 'Slack'],
      thoughtProcess: 'Partnerships were critical for financial viability. Aligning incentives ensured restaurants saw value in co-funding.',
      challenges: 'Convincing restaurants to co-fund; integrating with their POS systems.',
      navigation: 'Negotiated 50/50 cost-sharing via Salesforce. Built APIs for seamless discount validation with restaurant systems.',
      userFeedback: '"Discounts from my favorite restaurants keep me coming back," said 80% of pilot users.',
      details: 'Secured 200+ restaurant partners in NYC and Chicago. Validates discounts and sends data to Analytics Engine.',
      dataConnection: 'Receives points data from Points System to fund discounts. Sends validation data (e.g., approved discounts) to Analytics Engine for tracking.'
    },
    '4': {
      title: 'Analytics Engine',
      description: 'Measures retention metrics (repeat order rate, order frequency, CLV).',
      tools: ['Mixpanel', 'Tableau', 'Google BigQuery'],
      thoughtProcess: 'Robust analytics were needed to validate impact. Tracking multiple metrics ensured a holistic view of success.',
      challenges: 'Isolating program impact from external factors; real-time data processing.',
      navigation: 'Used A/B testing to isolate effects. Built Tableau dashboards for real-time KPI monitoring.',
      userFeedback: '"Rewards make me order more often," reported 70% of A/B test participants.',
      details: 'Tracks repeat order rate, order frequency, and CLV, segmented by user cohorts. Sends metrics to Rewards Redemption for optimization.',
      dataConnection: 'Receives validation data from Restaurant Partnerships to measure impact. Sends metrics feedback to Rewards Redemption to refine redemption processes.'
    },
    '5': {
      title: 'Rewards Redemption',
      description: 'Processes user redemptions for free delivery or discounts.',
      tools: ['Stripe', 'GraphQL', 'Looker'],
      thoughtProcess: 'A frictionless redemption process was key to user satisfaction. One-tap redemption was prioritized for ease.',
      challenges: 'Handling redemption errors; ensuring real-time updates.',
      navigation: 'Used GraphQL for efficient data fetching. Implemented error-handling to notify users of issues.',
      userFeedback: '"Redeeming points was so easy," said a returning user.',
      details: 'Enables one-tap redemption for discounts/free delivery, integrated with Stripe. Sends applied rewards back to User App.',
      dataConnection: 'Receives metrics feedback from Analytics Engine to optimize redemption. Sends applied rewards (e.g., discount codes) to User App for display.'
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
          You are the Product Manager for a food delivery platform. Data shows that 60% of customers only order once and don’t return. Your leadership team asks you to design and launch a new feature that increases customer retention. How would you approach this, and what would success look like?
        </p>
      </section>

      {/* Context Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaUtensils className="text-3xl text-indigo-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Case Study: Loyalty & Rewards Program to Boost Retention</h1>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Context / Background</h2>
          <p className="text-gray-700 mb-2"><strong>Product:</strong> Food delivery platform with 100k monthly active users.</p>
          <p className="text-gray-700 mb-2"><strong>Problem:</strong> High churn — only 40% of customers place more than one order.</p>
          <p className="text-gray-700 mb-2"><strong>Opportunity:</strong> Increase retention by launching a “Loyalty & Rewards Program.”</p>
          <p className="text-gray-700"><strong>My Role:</strong> As the PM, I led the end-to-end process, from research to launch, coordinating cross-functional teams and driving data-informed decisions.</p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaLightbulb className="text-3xl text-yellow-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Problem / Challenge</h2>
        </div>
        <p className="text-gray-700 mb-2"><strong>Problem:</strong> Customers had no incentive to order again.</p>
        <p className="text-gray-700 mb-2"><strong>Competitive Context:</strong> Competitors offered loyalty points, discounts, and free delivery after X orders.</p>
        <p className="text-gray-700"><strong>Leadership Goal:</strong> Launch a retention-driving feature to increase order frequency.</p>
      </section>

      {/* Goal Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-3xl text-green-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Goal / Metrics</h2>
        </div>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Increase repeat order rate from 40% to 55% within 6 months.</li>
          <li>Boost monthly order frequency per user by 15%.</li>
          <li>Measure impact on customer lifetime value (CLV).</li>
        </ul>
      </section>

      {/* Approach Section with React Flow */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-3xl text-green-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Approach / Action: Data Flow & System Interaction</h2>
        </div>
        <div className="flex">
          {/* Left Column: React Flow Diagram */}
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
                <MiniMap nodeColor={() => '#6366f1'} />
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
          <h2 className="text-2xl font-semibold text-gray-800">Results / Outcome</h2>
        </div>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Repeat order rate increased from 40% to 58% (exceeding goal of 55%).</li>
          <li>Order frequency per user grew by 20% (exceeding goal of 15%).</li>
          <li>Participating users had 30% higher CLV than non-participants.</li>
          <li>Restaurants reported higher customer retention due to co-funded discounts.</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Deductions</h3>
        <p className="text-gray-700">
          The loyalty program’s success underscores the effectiveness of gamification and partnerships. A/B testing validated the impact, while user feedback confirmed engagement. The results provide a scalable framework for increasing retention and order frequency across markets.
        </p>
      </section>

      {/* Learnings Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaLightbulb className="text-3xl text-yellow-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Learnings / Next Steps</h2>
        </div>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Gamification (tiers, progress bars) drove engagement and stickiness.</li>
          <li>Restaurant partnerships reduced discount costs, enhancing scalability.</li>
          <li>User feedback was critical for refining reward structures.</li>
          <li><strong>Next Step:</strong> Expand nationally, add “surprise rewards” to sustain engagement.</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Key Takeaways</h3>
        <p className="text-gray-700">
          As a PM, I drove impact through data-driven decisions, user insights, and strategic partnerships. This structured approach demonstrates leadership, user focus, and measurable outcomes, critical for scaling product growth.
        </p>
      </section>

      {/* Simulation Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-3xl text-green-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Simulation: Data-Driven Decision-Making</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Adjust loyalty program variables to see their impact on retention metrics, simulating the data-driven decision-making process used in the case study.
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
            <h3 className="text-xl font-semibold text-gray-800">Q1: How did you decide on a loyalty program?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I benchmarked competitors (DoorDash, UberEats) and found loyalty programs drove retention. User interviews (30 users) identified discounts and free delivery as key motivators. Using the RICE framework, the loyalty program scored high for impact and reach, given our 100k user base.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q2: How did you manage restaurant partnerships?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> Convincing restaurants to co-fund was tough. I negotiated 50/50 cost-sharing, emphasizing increased customer retention. Salesforce streamlined contracts, and APIs enabled seamless POS integration. Regular Slack updates ensured alignment.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q3: What challenges arose during the pilot?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> Scalability issues with the points system and user confusion about redemption were key challenges. We optimized with Redis caching and refined the in-app progress tracker via usability tests. A/B testing in NYC and Chicago isolated the program’s impact.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q4: How did you measure success beyond repeat order rate?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> Beyond the 58% repeat order rate, I tracked order frequency (up 20%) and CLV (30% higher for participants). User surveys showed 85% valued the program, and restaurants reported improved retention, confirming broader impact.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q5: What would you do differently?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I’d engage restaurants earlier for co-designing rewards. I’d also use multivariate testing to isolate points vs. tiers’ impact. Finally, I’d explore personalized rewards based on user preferences to boost engagement further.
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
          <li><strong>Problem-Solving Clarity:</strong> Clear problem definition and business impact.</li>
          <li><strong>Data-Driven Approach:</strong> Use of data to identify issues, prioritize, and measure outcomes.</li>
          <li><strong>User-Centric Thinking:</strong> Incorporation of user feedback to inform decisions.</li>
          <li><strong>Collaboration & Leadership:</strong> Effective cross-functional teamwork.</li>
          <li><strong>Impact & Scalability:</strong> Measurable results with scalable insights.</li>
          <li><strong>Reflection & Learning:</strong> Reflection on challenges and improvements.</li>
        </ul>
        <p className="text-gray-700 mt-4">
          This case study excels with a structured approach, data-driven decisions, user feedback, and partnerships, making it compelling for interviews.
        </p>
      </section>
    </div>
  );
};

// Simulation Component
const Simulation = () => {
  const [pointsPerDollar, setPointsPerDollar] = useState(10);
  const [discountValue, setDiscountValue] = useState(5);
  const [tieredRewards, setTieredRewards] = useState(false);
  const [repeatOrderRate, setRepeatOrderRate] = useState(40);
  const [orderFrequency, setOrderFrequency] = useState(1.0);
  const [clv, setClv] = useState(100);

  const calculateImpact = useCallback(() => {
    let newRepeatRate = 40;
    let newOrderFrequency = 1.0;
    let newClv = 100;

    if (pointsPerDollar >= 10) {
      newRepeatRate += 10;
      newOrderFrequency += 0.15;
      newClv += 20;
    }
    if (discountValue >= 5) {
      newRepeatRate += 5;
      newOrderFrequency += 0.05;
      newClv += 10;
    }
    if (tieredRewards) {
      newRepeatRate += 3;
      newOrderFrequency += 0.03;
      newClv += 5;
    }

    setRepeatOrderRate(newRepeatRate);
    setOrderFrequency(newOrderFrequency.toFixed(2));
    setClv(newClv);
  }, [pointsPerDollar, discountValue, tieredRewards]);

  React.useEffect(() => {
    calculateImpact();
  }, [pointsPerDollar, discountValue, tieredRewards, calculateImpact]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-2">Points per Dollar: {pointsPerDollar}</label>
        <input
          type="range"
          min="5"
          max="15"
          value={pointsPerDollar}
          onChange={(e) => setPointsPerDollar(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Discount Value ($): {discountValue}</label>
        <input
          type="range"
          min="2"
          max="10"
          value={discountValue}
          onChange={(e) => setDiscountValue(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="flex items-center text-gray-700 mb-2">
          <input
            type="checkbox"
            checked={tieredRewards}
            onChange={(e) => setTieredRewards(e.target.checked)}
            className="mr-2"
          />
          Enable Tiered Rewards (Silver, Gold, Platinum)
        </label>
      </div>
      <div className="p-4 bg-indigo-100 rounded-lg">
        <p className="text-gray-800 font-semibold">Simulated Outcomes:</p>
        <p className="text-gray-700">Repeat Order Rate: {repeatOrderRate}%</p>
        <p className="text-gray-700">Monthly Order Frequency: {orderFrequency} orders/user</p>
        <p className="text-gray-700">Customer Lifetime Value: ${clv}</p>
        <p className="text-gray-700 mt-2">
          {repeatOrderRate >= 55
            ? 'Success! The loyalty program exceeds the 55% retention goal.'
            : 'Adjust points, discount value, or tiers to reach the 55% goal.'}
        </p>
      </div>
    </div>
  );
};

export default LoyaltyProgramCaseStudy;