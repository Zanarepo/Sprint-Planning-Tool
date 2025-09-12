import React, { useState, useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import { FaShoppingCart, FaChartLine, FaLightbulb, FaComments } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';

// Custom Node Component for React Flow
const CustomNode = ({ data }) => (
  <div className="bg-white border-2 border-indigo-500 rounded-lg p-4 shadow-md w-64">
    <div className="font-semibold text-indigo-600">{data.label}</div>
    <div className="text-sm text-gray-600">{data.description}</div>
  </div>
);

// React Flow Nodes and Edges (Spaced to Avoid Overlap)
const initialNodes = [
  { id: '1', type: 'custom', position: { x: 50, y: 100 }, data: { label: 'Analyze Funnel', description: 'Identify drop-off points using analytics tools.' } },
  { id: '2', type: 'custom', position: { x: 350, y: 100 }, data: { label: 'User Research', description: 'Conduct interviews and surveys to understand user pain points.' } },
  { id: '3', type: 'custom', position: { x: 650, y: 100 }, data: { label: 'Ideate & Design', description: 'Simplify onboarding and checkout with social logins and fewer steps.' } },
  { id: '4', type: 'custom', position: { x: 950, y: 100 }, data: { label: 'Test & Measure', description: 'Run A/B tests to compare original vs. new flow.' } },
  { id: '5', type: 'custom', position: { x: 1250, y: 100 }, data: { label: 'Results & Insights', description: 'Evaluate impact and plan next steps.' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#6366f1' } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#6366f1' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#6366f1' } },
  { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#6366f1' } },
];

// Case Study Component
const CaseStudyOnboarding = () => {
  const [nodes] = useState(initialNodes);
  const [edges] = useState(initialEdges);
  const [selectedStep, setSelectedStep] = useState(null);

  const onNodeClick = useCallback((event, node) => {
    setSelectedStep(node.id);
  }, []);

  const stepDetails = {
    '1': {
      title: 'Analyze Funnel',
      description: 'Used analytics tools to identify where users dropped off.',
      tools: ['Google Analytics', 'Mixpanel', 'Amplitude'],
      thoughtProcess: 'The goal was to pinpoint friction points in the onboarding funnel. I hypothesized that drop-offs were due to complexity in signup or checkout.',
      challenges: 'Incomplete data tracking for some funnel steps; limited granularity in analytics.',
      navigation: 'Collaborated with the data analyst to implement event tracking for all onboarding steps, ensuring comprehensive data capture.',
      userFeedback: '"The app asked for too much information upfront," reported 60% of surveyed users.',
      details: 'Found 40% drop-off at account creation and 35% at checkout.',
    },
    '2': {
      title: 'User Research',
      description: 'Conducted 10 user interviews and surveyed 200 users.',
      tools: ['Typeform', 'Zoom', 'Google Forms'],
      thoughtProcess: 'Qualitative insights were needed to understand user frustrations. I prioritized open-ended interviews to capture nuanced feedback.',
      challenges: 'Recruiting diverse users and synthesizing qualitative data into actionable insights.',
      navigation: 'Used purposive sampling to include varied demographics (e.g., age, tech-savviness). Coded responses using thematic analysis to identify patterns.',
      userFeedback: '"The checkout process felt overwhelming with too many steps," said a 28-year-old user.',
      details: 'Learned users found signup too long and checkout confusing.',
    },
    '3': {
      title: 'Ideate & Design Solutions',
      description: 'Simplified onboarding and checkout processes.',
      tools: ['Figma', 'Sketch', 'Adobe XD'],
      thoughtProcess: 'Focused on reducing friction by minimizing steps and leveraging familiar authentication methods.',
      challenges: 'Balancing simplicity with security; ensuring cross-platform compatibility for social logins.',
      navigation: 'Prototyped multiple designs in Figma, conducted usability tests with 5 users, and iterated based on feedback. Ensured social login APIs were compatible with iOS and Android.',
      userFeedback: '"I prefer signing in with Google; it’s faster," noted 70% of testers.',
      details: 'Introduced social login options (Google, Apple ID), reduced checkout steps from 5 to 2, and added progress indicators and micro-copy.',
    },
    '4': {
      title: 'Test & Measure',
      description: 'Implemented A/B test to compare flows.',
      tools: ['Optimizely', 'VWO', 'Firebase A/B Testing'],
      thoughtProcess: 'A/B testing was critical to validate hypotheses before full rollout. I aimed to measure both quantitative (activation rate) and qualitative (user satisfaction) metrics.',
      challenges: 'Limited sample size for statistically significant results; risk of user disruption.',
      navigation: 'Ran a 50/50 A/B test for 2 weeks with 5,000 users per group. Monitored real-time analytics to ensure no negative impact on user experience.',
      userFeedback: '"The new checkout was quick and clear," reported 85% of A/B test participants.',
      details: 'Measured first-purchase completion rate and time to purchase.',
    },
    '5': {
      title: 'Results & Insights',
      description: 'Quantified impact and planned next steps.',
      tools: ['Tableau', 'Looker', 'Google Data Studio'],
      thoughtProcess: 'Focused on presenting clear, data-driven results to stakeholders and identifying scalable insights.',
      challenges: 'Translating raw data into compelling narratives for non-technical stakeholders.',
      navigation: 'Created visualizations in Tableau to highlight key metrics. Presented findings to leadership, emphasizing ROI and user satisfaction gains.',
      userFeedback: '"The app feels much easier to use now," said a returning user.',
      details: 'First-purchase completion rate increased from 30% to 50%, time to purchase reduced by 40%, user satisfaction improved from 3.2 to 4.1/5.',
    },
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Reframed Problem Statement */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaLightbulb className="text-3xl text-yellow-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Problem Statement</h1>
        </div>
        <p className="text-gray-700 mb-4">
          <strong>Our grocery delivery app has a large number of users signing up, but many of them drop off before completing their first purchase.</strong> 
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Task:</strong> As the Product Manager, outline how you would analyze and improve the onboarding process to increase the first-purchase completion rate</p>
       
      </section>

      {/* Context Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaShoppingCart className="text-3xl text-indigo-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Case Study: Improving User Onboarding to Boost App Activation</h1>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Context / Background</h2>
          <p className="text-gray-700 mb-2"><strong>Product:</strong> E-commerce mobile app for local grocery delivery.</p>
          <p className="text-gray-700 mb-2"><strong>Team:</strong> 1 PM (you), 1 UX designer, 1 engineer, 1 data analyst.</p>
          <p className="text-gray-700 mb-2"><strong>Situation:</strong> The app had 20,000 monthly downloads, but only 30% of users completed their first purchase, indicating a weak onboarding flow.</p>
          <p className="text-gray-700"><strong>My Role:</strong> As the PM, I led the end-to-end process, from problem identification to solution implementation, coordinating cross-functional efforts and driving data-informed decisions.</p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaLightbulb className="text-3xl text-yellow-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Problem / Challenge</h2>
        </div>
        <p className="text-gray-700 mb-2"><strong>Problem:</strong> Users were dropping off before completing their first purchase.</p>
        <p className="text-gray-700 mb-2"><strong>Impact:</strong> Low activation (30% first-purchase completion) limited revenue growth and reduced retention.</p>
        <p className="text-gray-700"><strong>Goal:</strong> Increase first-purchase completion rate from 30% to 45% within 3 months.</p>
      </section>

      {/* Approach Section with React Flow */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-3xl text-green-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Approach / Action: Step-by-Step Breakdown</h2>
        </div>
        <div className="h-[400px] mb-4">
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
        {selectedStep && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{stepDetails[selectedStep].title}</h3>
            <p className="text-gray-700 mb-2"><strong>Description:</strong> {stepDetails[selectedStep].description}</p>
            <p className="text-gray-700 mb-2"><strong>Tools Used:</strong> {stepDetails[selectedStep].tools.join(', ')}</p>
            <p className="text-gray-700 mb-2"><strong>Thought Process:</strong> {stepDetails[selectedStep].thoughtProcess}</p>
            <p className="text-gray-700 mb-2"><strong>Challenges:</strong> {stepDetails[selectedStep].challenges}</p>
            <p className="text-gray-700 mb-2"><strong>Navigation:</strong> {stepDetails[selectedStep].navigation}</p>
            <p className="text-gray-700 mb-2"><strong>User Feedback:</strong> {stepDetails[selectedStep].userFeedback}</p>
            <p className="text-gray-700"><strong>Details:</strong> {stepDetails[selectedStep].details}</p>
          </div>
        )}
      </section>

      {/* Results Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-3xl text-blue-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Results / Outcome</h2>
        </div>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>First-purchase completion rate increased from 30% to 50% (exceeding goal of 45%).</li>
          <li>Average time to purchase reduced by 40%.</li>
          <li>User satisfaction (survey score) improved from 3.2 to 4.1/5.</li>
          <li>Insights enabled planning for personalized product suggestions to further enhance onboarding.</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Deductions</h3>
        <p className="text-gray-700">
          The 20% uplift in activation rate highlights the power of simplifying user flows. Data-driven A/B testing validated the solution’s effectiveness, while user feedback confirmed improved experience. The results suggest that addressing friction points early in the user journey can drive both immediate activation and long-term engagement, providing a scalable framework for future optimizations.
        </p>
      </section>

      {/* Learnings Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaLightbulb className="text-3xl text-yellow-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Learnings / Next Steps</h2>
        </div>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Simplifying onboarding directly impacted activation and revenue.</li>
          <li>Data-driven experimentation (A/B tests) is critical for validating changes.</li>
          <li>User feedback is essential for identifying unintuitive design elements.</li>
          <li><strong>Next Step:</strong> Optimize post-onboarding engagement (e.g., personalized recommendations) to boost retention beyond 30 days.</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Key Takeaways</h3>
        <p className="text-gray-700">
          As a PM, I drove impact by identifying bottlenecks, collaborating cross-functionally, and leveraging data to validate solutions. This structured, user-centric approach demonstrates strategic thinking, ownership, and a focus on measurable outcomes, critical for scaling product growth.
        </p>
      </section>

      {/* Simulation Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-3xl text-green-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Simulation: Data-Driven Decision-Making</h2>
        </div>
        <p className="text-gray-700 mb-4">
          This interactive simulation lets you adjust onboarding variables to see their impact on activation rates, mimicking the data-driven decision-making process used in the case study.
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
            <h3 className="text-xl font-semibold text-gray-800">Q1: How did you identify the problem in the onboarding flow?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I started with data analysis using Mixpanel and Google Analytics to map the user funnel, identifying a 40% drop-off at account creation and 35% at checkout. To understand why, I conducted 10 user interviews and a 200-user survey, revealing that the signup process was too long and checkout was confusing. This dual approach ensured both quantitative and qualitative insights informed the problem definition.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q2: How did you prioritize which solutions to implement?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I used the ICE framework (Impact, Confidence, Ease) to prioritize solutions. Social logins scored high for impact (based on user feedback preferring familiar authentication) and ease (leveraging existing APIs). Reducing checkout steps was high-impact but required more engineering effort, so we prototyped in Figma and validated with usability tests to ensure feasibility before implementation.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q3: What would you do differently if you could redo this project?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I’d incorporate earlier stakeholder alignment to streamline decision-making. Additionally, I’d explore multivariate testing to isolate the impact of individual changes (e.g., social login vs. checkout steps). Finally, I’d invest in longitudinal user studies to track retention impacts beyond the initial 3 months, ensuring long-term success.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q4: How did you handle team dynamics or conflicts?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> The engineer raised concerns about social login security. I facilitated a meeting with the team to review API documentation and consulted with a security expert to ensure compliance with best practices. By fostering open communication and data-driven discussions, we aligned on a solution that balanced user experience and security.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q5: How did you measure success beyond the primary metric?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> Beyond the 50% first-purchase completion rate, I tracked time to purchase (reduced by 40%) and user satisfaction (improved from 3.2 to 4.1/5 via surveys). These secondary metrics confirmed the solution improved both efficiency and user experience, laying the foundation for retention-focused initiatives like personalized recommendations.
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
          Interviewers at companies like Meta or X assess PM case studies based on the following key context:
        </p>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li><strong>Problem-Solving Clarity:</strong> Did you clearly define the problem and articulate its impact on business goals?</li>
          <li><strong>Data-Driven Approach:</strong> Did you leverage data to identify issues, prioritize solutions, and measure outcomes?</li>
          <li><strong>User-Centric Thinking:</strong> Did you incorporate user feedback to inform decisions and validate solutions?</li>
          <li><strong>Ownership & Leadership:</strong> Did you demonstrate leadership in driving the project and collaborating with the team?</li>
          <li><strong>Impact & Scalability:</strong> Did the solution achieve measurable results, and do the insights offer scalable value?</li>
          <li><strong>Reflection & Learning:</strong> Did you reflect on challenges, learnings, and potential improvements?</li>
        </ul>
        <p className="text-gray-700 mt-4">
          This case study addresses these by showcasing a structured approach, data-driven decisions, user feedback integration, and clear ownership, making it a compelling narrative for interviews.
        </p>
      </section>
    </div>
  );
};

// Simulation Component
const Simulation = () => {
  const [checkoutSteps, setCheckoutSteps] = useState(5);
  const [socialLogin, setSocialLogin] = useState(false);
  const [progressIndicators, setProgressIndicators] = useState(false);
  const [activationRate, setActivationRate] = useState(30);
  const [timeToPurchase, setTimeToPurchase] = useState(100);
  const [satisfactionScore, setSatisfactionScore] = useState(3.2);

  const calculateImpact = useCallback(() => {
    let newRate = 30;
    let newTime = 100;
    let newSatisfaction = 3.2;

    if (checkoutSteps <= 2) {
      newRate += 15;
      newTime -= 30;
      newSatisfaction += 0.6;
    }
    if (socialLogin) {
      newRate += 5;
      newTime -= 10;
      newSatisfaction += 0.2;
    }
    if (progressIndicators) {
      newRate += 3;
      newTime -= 5;
      newSatisfaction += 0.1;
    }

    setActivationRate(newRate);
    setTimeToPurchase(newTime);
    setSatisfactionScore(newSatisfaction.toFixed(1));
  }, [checkoutSteps, socialLogin, progressIndicators]);

  React.useEffect(() => {
    calculateImpact();
  }, [checkoutSteps, socialLogin, progressIndicators, calculateImpact]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-2">Number of Checkout Steps: {checkoutSteps}</label>
        <input
          type="range"
          min="1"
          max="5"
          value={checkoutSteps}
          onChange={(e) => setCheckoutSteps(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="flex items-center text-gray-700 mb-2">
          <input
            type="checkbox"
            checked={socialLogin}
            onChange={(e) => setSocialLogin(e.target.checked)}
            className="mr-2"
          />
          Enable Social Login (Google, Apple ID)
        </label>
      </div>
      <div>
        <label className="flex items-center text-gray-700 mb-2">
          <input
            type="checkbox"
            checked={progressIndicators}
            onChange={(e) => setProgressIndicators(e.target.checked)}
            className="mr-2"
          />
          Add Progress Indicators
        </label>
      </div>
      <div className="p-4 bg-indigo-100 rounded-lg">
        <p className="text-gray-800 font-semibold">Simulated Outcomes:</p>
        <p className="text-gray-700">Activation Rate: {activationRate}%</p>
        <p className="text-gray-700">Time to Purchase: {timeToPurchase}% of original</p>
        <p className="text-gray-700">User Satisfaction Score: {satisfactionScore}/5</p>
        <p className="text-gray-700 mt-2">
          {activationRate >= 45
            ? 'Success! The optimized flow exceeds the 45% activation goal, with improved efficiency and user satisfaction.'
            : 'Adjust checkout steps, social login, or progress indicators to reach the 45% activation goal.'}
        </p>
      </div>
    </div>
  );
};

export default CaseStudyOnboarding;