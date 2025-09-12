import React, { useState, useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import { FaUsers, FaChartLine, FaLightbulb, FaComments } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';

// Custom Node Component for React Flow with Unique Styling
const CustomNode = ({ data }) => (
  <div className={`border-2 rounded-lg p-4 shadow-md w-64 ${data.type === 'research' ? 'bg-blue-100 border-blue-500' : data.type === 'optimization' ? 'bg-green-100 border-green-500' : data.type === 'outcome' ? 'bg-purple-100 border-purple-500' : 'bg-yellow-100 border-yellow-500'}`}>
    <div className={`font-semibold ${data.type === 'research' ? 'text-blue-600' : data.type === 'optimization' ? 'text-green-600' : data.type === 'outcome' ? 'text-purple-600' : 'text-yellow-600'}`}>{data.label}</div>
    <div className="text-sm text-gray-600">{data.description}</div>
  </div>
);

// React Flow Nodes and Edges
const initialNodes = [
  { id: '1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'User Research', description: 'Gather user feedback on latency issues.', type: 'research' } },
  { id: '2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'Diagnosis', description: 'Trace and profile to identify bottlenecks.', type: 'research' } },
  { id: '3', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'Short-Term Fixes', description: 'Implement caching and DB optimizations.', type: 'optimization' } },
  { id: '4', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Medium-Term Solutions', description: 'Decompose services, add async processing.', type: 'optimization' } },
  { id: '5', type: 'custom', position: { x: 350, y: 350 }, data: { label: 'Long-Term Evolution', description: 'Adopt CDN, event-driven architecture.', type: 'optimization' } },
  { id: '6', type: 'custom', position: { x: 650, y: 200 }, data: { label: 'Outcome Metrics', description: 'Measure latency, error rate, engagement.', type: 'outcome' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, label: 'User Feedback (Research → Diagnosis)', style: { stroke: '#6366f1' } },
  { id: 'e2-3', source: '2', target: '3', animated: true, label: 'Bottleneck Data (Diagnosis → Short-Term)', style: { stroke: '#6366f1' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, label: 'Initial Metrics (Short-Term → Medium-Term)', style: { stroke: '#6366f1' } },
  { id: 'e4-5', source: '4', target: '5', animated: true, label: 'Scalability Metrics (Medium-Term → Long-Term)', style: { stroke: '#6366f1' } },
  { id: 'e5-6', source: '5', target: '6', animated: true, label: 'Optimization Metrics (Long-Term → Outcome)', style: { stroke: '#6366f1' } },
  { id: 'e2-6', source: '2', target: '6', animated: true, label: 'Baseline Metrics (Diagnosis → Outcome)', style: { stroke: '#6366f1' } },
];

// Case Study Component
const SocialPlatformPerformanceCaseStudy = () => {
  const [nodes] = useState(initialNodes);
  const [edges] = useState(initialEdges);
  const [selectedStep, setSelectedStep] = useState(null);

  const onNodeClick = useCallback((event, node) => {
    setSelectedStep(node.id);
  }, []);

  const stepDetails = {
    '1': {
      title: 'User Research',
      description: 'Conducted surveys and interviews to understand latency’s impact on UX.',
      tools: ['Google Forms', 'Hotjar', 'Mixpanel'],
      thoughtProcess: 'User feedback was critical to quantify latency’s impact on engagement. I hypothesized that slow feeds and messages were driving bounces.',
      challenges: 'Reaching diverse user segments; isolating latency-related complaints.',
      navigation: 'Surveyed 500 users via Google Forms, conducted 15 Zoom interviews. Used Hotjar heatmaps to identify drop-off points and Mixpanel to track engagement metrics.',
      userFeedback: '"Slow feeds make me leave the app," said 70% of surveyed users. "Messages taking too long hurt chats," noted a 25-year-old user.',
      details: 'Found 65% of users bounced when feed load exceeded 800ms. Message delays reduced chat engagement by 20%. Insights informed diagnostic focus.',
      dataConnection: 'Sends user feedback (e.g., bounce rates, engagement drops) to Diagnosis to guide bottleneck identification.'
    },
    '2': {
      title: 'Diagnosis',
      description: 'Traced API requests and profiled DB queries to identify bottlenecks.',
      tools: ['Datadog', 'Jaeger', 'New Relic', 'Locust'],
      thoughtProcess: 'End-to-end tracing was needed to pinpoint latency sources. I hypothesized DB read latency and poor caching were key issues.',
      challenges: 'Isolating bottlenecks across microservices; handling peak load data.',
      navigation: 'Used Jaeger for distributed tracing, identifying DB read latency (400ms avg). Profiled queries with New Relic, finding N+1 issues. Stress-tested with Locust, confirming cache misses.',
      userFeedback: 'N/A (Technical diagnosis-driven).',
      details: 'Identified 60% of latency from DB reads (unindexed queries) and 30% from cache misses. Service-to-service calls added 10%. Informed short-term fixes.',
      dataConnection: 'Receives user feedback from User Research. Sends bottleneck data (e.g., DB latency, cache misses) to Short-Term Fixes and baseline metrics to Outcome Metrics.'
    },
    '3': {
      title: 'Short-Term Fixes',
      description: 'Implemented caching and database optimizations to stabilize latency.',
      tools: ['Redis', 'PostgreSQL', 'Cloudflare', 'Postman'],
      thoughtProcess: 'Quick wins were needed to stabilize UX. Caching and DB optimizations were low-effort, high-impact fixes.',
      challenges: 'Avoiding cache invalidation issues; ensuring index compatibility.',
      navigation: 'Added Redis for feed/user profile caching, reducing DB reads by 50%. Created indexes and read replicas in PostgreSQL. Enabled Cloudflare HTTP caching for assets. Tested APIs with Postman.',
      userFeedback: '"The app feels faster now," reported 80% of pilot users.',
      details: 'Reduced p95 latency from 1s to 400ms in 3 weeks. Cached 70% of feed requests, added indexes to 5 tables, deployed 2 read replicas. Goals: 400ms latency, <1% error rate.',
      dataConnection: 'Receives bottleneck data from Diagnosis. Sends initial metrics (e.g., latency reduction) to Medium-Term Solutions.'
    },
    '4': {
      title: 'Medium-Term Solutions',
      description: 'Decomposed services and added async processing for scalability.',
      tools: ['Kubernetes', 'Kafka', 'Node.js'],
      thoughtProcess: 'Scalability required service isolation and async processing to handle 10x load. I prioritized separating read/write services and offloading tasks.',
      challenges: 'Refactoring monolithic services; ensuring queue reliability.',
      navigation: 'Split feed service into read/write microservices using Node.js. Offloaded analytics and notifications to Kafka. Configured Kubernetes HPA to auto-scale pods based on CPU/memory.',
      userFeedback: '"The app stays fast even during peak times," said a returning user.',
      details: 'Reduced feed service latency to 300ms under 5x load. Kafka processed 1M events/day. HPA scaled pods from 10 to 50 during peaks. Goals: <300ms latency, 5x scalability.',
      dataConnection: 'Receives initial metrics from Short-Term Fixes. Sends scalability metrics to Long-Term Evolution.'
    },
    '5': {
      title: 'Long-Term Evolution',
      description: 'Integrated CDN, adopted event-driven architecture, and sharded DB.',
      tools: ['AWS CloudFront', 'EventBridge', 'DynamoDB', 'Sentry'],
      thoughtProcess: 'Long-term scalability required global asset delivery and non-blocking architecture. Embedding SLOs ensured performance as a product feature.',
      challenges: 'Managing CDN costs; ensuring event-driven reliability.',
      navigation: 'Integrated CloudFront for media/feed assets, reducing global latency by 30%. Moved to EventBridge for event-driven pipelines. Sharded DynamoDB for posts/interactions. Defined SLOs (300ms latency, 0.5% error rate) in Sentry.',
      userFeedback: '"The app is seamless even internationally," said a global user.',
      details: 'Achieved 280ms p95 latency, 0.8% error rate under 10x load. Sharded 2 tables, served 80% of assets via CDN. Goals: 10x scalability, <300ms latency.',
      dataConnection: 'Receives scalability metrics from Medium-Term Solutions. Sends optimization metrics (e.g., latency, error rate) to Outcome Metrics.'
    },
    '6': {
      title: 'Outcome Metrics',
      description: 'Measured latency, error rate, and engagement to validate impact.',
      tools: ['Mixpanel', 'Tableau', 'Google BigQuery'],
      thoughtProcess: 'Metrics were critical to validate optimizations. I focused on p95 latency, error rate, and DAU/WAU to quantify UX and business impact.',
      challenges: 'Isolating optimization impact; real-time metric collection.',
      navigation: 'Used Mixpanel for engagement tracking, Tableau for latency dashboards, and BigQuery for error rate analysis. Conducted A/B tests to isolate optimization effects.',
      userFeedback: '"The app is much smoother," said 85% of surveyed users post-optimization.',
      details: 'Achieved 280ms p95 latency, 0.8% error rate, +12% DAU/WAU ratio. Churn dropped 10%. Created performance playbook for future scalability.',
      dataConnection: 'Receives baseline metrics from Diagnosis and optimization metrics from Long-Term Evolution. Outputs final performance and engagement metrics.'
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
          You are a Product Manager at a mid-stage social platform with 20M DAUs, built on a microservices architecture. User traffic grew 5x in 12 months due to viral growth and partnerships. API response times increased from 200ms → 1s, hurting engagement (users bounce when posts, feeds, or messages take too long). Leadership flagged this as a critical blocker for growth. How would you approach solving this performance challenge, and what would success look like?
        </p>
      </section>

      {/* Context Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaUsers className="text-3xl text-indigo-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Case Study: Optimizing Social Platform Performance</h1>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Context / Background</h2>
          <p className="text-gray-700 mb-2"><strong>Company:</strong> Mid-stage social platform with 20M daily active users, built on microservices.</p>
          <p className="text-gray-700 mb-2"><strong>Situation:</strong> 5x traffic growth in 12 months due to viral growth and partnerships.</p>
          <p className="text-gray-700 mb-2"><strong>Challenge:</strong> API response times increased from 200ms to 1s, hurting engagement.</p>
          <p className="text-gray-700"><strong>My Role:</strong> As the PM, I led diagnosis, optimization, and scalability efforts, coordinating with engineering and UX teams.</p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaLightbulb className="text-3xl text-yellow-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Problem / Challenge</h2>
        </div>
        <p className="text-gray-700 mb-2"><strong>Problem:</strong> Performance bottlenecks in backend services as traffic scales.</p>
        <p className="text-gray-700 mb-2"><strong>Impact:</strong> Latency hurts retention, engagement, and monetization (lower ad CTR, reduced trust).</p>
        <p className="text-gray-700"><strong>Risk:</strong> Quick fixes may not scale long-term, risking future growth.</p>
      </section>

      {/* Goal Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-3xl text-green-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Goal / Metrics</h2>
        </div>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Target p95 API latency: &lt;300ms to ensure seamless UX.</li>
          <li>Maintain &lt;1% error rate under peak traffic.</li>
          <li>Ensure system scalability for 10x current load.</li>
          <li>Improve engagement: +10% DAU/WAU ratio, reduce churn.</li>
        </ul>
      </section>

      {/* Approach Section with React Flow */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-3xl text-green-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Approach / Action: Performance Optimization Flow</h2>
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
                <MiniMap nodeColor={(node) => (node.data.type === 'research' ? '#3b82f6' : node.data.type === 'optimization' ? '#10b981' : node.data.type === 'outcome' ? '#8b5cf6' : '#f59e0b')} />
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
          <li>Reduced p95 API latency from 1s to 280ms in 3 months.</li>
          <li>Achieved 0.8% error rate under peak load.</li>
          <li>Increased DAU/WAU ratio by 12%.</li>
          <li>API infrastructure scales to 10x load without refactoring.</li>
          <li>Created performance playbook for standardized scalability reviews.</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Deductions</h3>
        <p className="text-gray-700">
          The layered approach (diagnosis, short-term fixes, long-term evolution) addressed immediate UX issues while ensuring scalability. User feedback and metrics validated the impact on engagement and retention, providing a scalable framework for future growth.
        </p>
      </section>

      {/* Learnings Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaLightbulb className="text-3xl text-yellow-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Learnings / Next Steps</h2>
        </div>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Performance is a first-class product feature, not just an infra issue.</li>
          <li>Layered optimization (stabilize, then scale) ensures quick wins and long-term success.</li>
          <li>User feedback is critical to prioritize fixes impacting UX.</li>
          <li><strong>Next Step:</strong> Expand observability with real-user monitoring and explore ML-driven auto-scaling for load prediction.</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Key Takeaways</h3>
        <p className="text-gray-700">
          As a PM, I drove impact by combining user insights, technical diagnosis, and phased optimizations. This data-driven, collaborative approach demonstrates leadership and scalability, critical for high-growth platforms.
        </p>
      </section>

      {/* Simulation Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-3xl text-green-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Simulation: Performance Optimization Impact</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Adjust optimization variables to see their impact on latency, error rate, and engagement, simulating the optimization process used in the case study.
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
            <h3 className="text-xl font-semibold text-gray-800">Q1: How did you identify the root cause of latency?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I used Jaeger for end-to-end tracing, pinpointing 60% of latency from DB reads and 30% from cache misses. New Relic identified N+1 query issues, and Locust stress tests confirmed cache bottlenecks. User feedback (70% cited slow feeds) guided focus on feed service.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q2: How did you prioritize short-term vs. long-term fixes?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I used an Impact-Effort framework. Short-term fixes (caching, DB indexes) were high-impact, low-effort, reducing latency to 400ms in 3 weeks. Medium/long-term solutions (service decomposition, CDN) were high-impact but required more effort, ensuring 10x scalability.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q3: How did you collaborate with engineering?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> Engineering raised concerns about cache invalidation and refactoring complexity. I facilitated workshops to align on Redis caching and service decomposition. Regular Jira updates and Slack syncs ensured progress. Pilot tests with 10% of traffic validated fixes.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q4: How did you measure success beyond latency?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> Beyond 280ms p95 latency, I tracked 0.8% error rate, +12% DAU/WAU ratio, and 10% churn reduction via Mixpanel and Tableau. User surveys (85% reported smoother UX) and A/B tests confirmed engagement gains, validating broader impact.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q5: What would you do differently?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I’d implement real-user monitoring earlier to capture geographic latency variations. I’d also explore ML-driven load prediction in the medium term to anticipate spikes. Finally, I’d define SLOs upfront to align teams from the start.
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
          <li><strong>Technical Acumen:</strong> Ability to diagnose and address technical bottlenecks.</li>
          <li><strong>Data-Driven Approach:</strong> Use of metrics to guide and validate solutions.</li>
          <li><strong>User-Centric Thinking:</strong> Incorporation of user feedback to prioritize fixes.</li>
          <li><strong>Collaboration & Leadership:</strong> Effective cross-functional teamwork.</li>
          <li><strong>Impact & Scalability:</strong> Measurable results with scalable solutions.</li>
          <li><strong>Reflection & Learning:</strong> Reflection on challenges and improvements.</li>
        </ul>
        <p className="text-gray-700 mt-4">
          This case study excels with a structured, data-driven approach, user feedback integration, and scalable solutions, making it compelling for interviews.
        </p>
      </section>
    </div>
  );
};

// Simulation Component
const Simulation = () => {
  const [cachingEnabled, setCachingEnabled] = useState(false);
  const [readReplicas, setReadReplicas] = useState(0);
  const [asyncProcessing, setAsyncProcessing] = useState(false);
  const [latency, setLatency] = useState(1000);
  const [errorRate, setErrorRate] = useState(2);
  const [dauWauRatio, setDauWauRatio] = useState(0);

  const calculateImpact = useCallback(() => {
    let newLatency = 1000;
    let newErrorRate = 2;
    let newDauWauRatio = 0;

    if (cachingEnabled) {
      newLatency -= 400;
      newErrorRate -= 0.5;
      newDauWauRatio += 5;
    }
    if (readReplicas >= 2) {
      newLatency -= 100 * readReplicas;
      newErrorRate -= 0.3 * readReplicas;
      newDauWauRatio += 2 * readReplicas;
    }
    if (asyncProcessing) {
      newLatency -= 100;
      newErrorRate -= 0.4;
      newDauWauRatio += 3;
    }

    setLatency(newLatency);
    setErrorRate(newErrorRate.toFixed(1));
    setDauWauRatio(newDauWauRatio);
  }, [cachingEnabled, readReplicas, asyncProcessing]);

  React.useEffect(() => {
    calculateImpact();
  }, [cachingEnabled, readReplicas, asyncProcessing, calculateImpact]);

  return (
    <div className="space-y-4">
      <div>
        <label className="flex items-center text-gray-700 mb-2">
          <input
            type="checkbox"
            checked={cachingEnabled}
            onChange={(e) => setCachingEnabled(e.target.checked)}
            className="mr-2"
          />
          Enable Caching (Redis, HTTP)
        </label>
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Read Replicas: {readReplicas}</label>
        <input
          type="range"
          min="0"
          max="4"
          value={readReplicas}
          onChange={(e) => setReadReplicas(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="flex items-center text-gray-700 mb-2">
          <input
            type="checkbox"
            checked={asyncProcessing}
            onChange={(e) => setAsyncProcessing(e.target.checked)}
            className="mr-2"
          />
          Enable Async Processing (Kafka)
        </label>
      </div>
      <div className="p-4 bg-indigo-100 rounded-lg">
        <p className="text-gray-800 font-semibold">Simulated Outcomes:</p>
        <p className="text-gray-700">p95 Latency: {latency}ms</p>
        <p className="text-gray-700">Error Rate: {errorRate}%</p>
        <p className="text-gray-700">DAU/WAU Ratio Increase: {dauWauRatio}%</p>
        <p className="text-gray-700 mt-2">
          {latency <= 300 && errorRate <= 1
            ? 'Success! Optimizations meet latency and error rate goals, improving engagement.'
            : 'Enable more optimizations to reach <300ms latency and <1% error rate.'}
        </p>
      </div>
    </div>
  );
};

export default SocialPlatformPerformanceCaseStudy;