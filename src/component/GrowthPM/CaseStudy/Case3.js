import React, { useState, useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import { FaVideo, FaChartLine, FaLightbulb, FaComments } from 'react-icons/fa';
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
  { id: '1', type: 'custom', position: { x: 50, y: 100 }, data: { label: 'User App', description: 'Handles user interactions and content display.' } },
  { id: '2', type: 'custom', position: { x: 350, y: 100 }, data: { label: 'Backend Server', description: 'Processes content requests and serves assets.' } },
  { id: '3', type: 'custom', position: { x: 650, y: 100 }, data: { label: 'Content Delivery Network', description: 'Delivers optimized video and image assets.' } },
  { id: '4', type: 'custom', position: { x: 950, y: 100 }, data: { label: 'Analytics Engine', description: 'Tracks performance metrics (load time, buffering).' } },
  { id: '5', type: 'custom', position: { x: 1250, y: 100 }, data: { label: 'UX Enhancements', description: 'Implements skeleton screens and adaptive streaming.' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, label: 'Content Requests (User → Server)', style: { stroke: '#6366f1' } },
  { id: 'e2-3', source: '2', target: '3', animated: true, label: 'Asset Requests (Server → CDN)', style: { stroke: '#6366f1' } },
  { id: 'e3-1', source: '3', target: '1', animated: true, label: 'Optimized Assets (CDN → User)', style: { stroke: '#6366f1' } },
  { id: 'e1-4', source: '1', target: '4', animated: true, label: 'Performance Data (User → Analytics)', style: { stroke: '#6366f1' } },
  { id: 'e4-5', source: '4', target: '5', animated: true, label: 'Metrics Feedback (Analytics → UX)', style: { stroke: '#6366f1' } },
  { id: 'e5-1', source: '5', target: '1', animated: true, label: 'Enhanced UX (UX → User)', style: { stroke: '#6366f1' } },
];

// Case Study Component
const StreamingPlatformCaseStudy = () => {
  const [nodes] = useState(initialNodes);
  const [edges] = useState(initialEdges);
  const [selectedStep, setSelectedStep] = useState(null);

  const onNodeClick = useCallback((event, node) => {
    setSelectedStep(node.id);
  }, []);

  const stepDetails = {
    '1': {
      title: 'User App',
      description: 'Handles user interactions, displays video content, and shows loading states.',
      tools: ['React', 'TypeScript', 'Web Vitals'],
      thoughtProcess: 'The app is the user’s entry point. I prioritized reducing perceived load times with skeleton screens and ensuring smooth playback.',
      challenges: 'High JavaScript bundle sizes; inconsistent performance across devices.',
      navigation: 'Implemented lazy loading and split bundles using Webpack. Tested on low-end devices to ensure compatibility.',
      userFeedback: '"The app feels laggy when loading videos," said 65% of surveyed users.',
      details: 'Added skeleton screens and optimized rendering for faster perceived load times. Sends content requests to Backend Server and receives optimized assets from CDN.',
      dataConnection: 'Sends content requests (e.g., video streams, thumbnails) to Backend Server. Receives optimized assets from CDN and performance data to Analytics Engine.'
    },
    '2': {
      title: 'Backend Server',
      description: 'Processes content requests and serves video/image assets.',
      tools: ['Node.js', 'Express', 'Redis'],
      thoughtProcess: 'The server needed to handle high request volumes efficiently. Caching was hypothesized to reduce load times.',
      challenges: 'High server latency under peak load; unoptimized asset delivery.',
      navigation: 'Implemented Redis caching for frequently accessed content. Optimized API endpoints to reduce response times.',
      userFeedback: '"Videos take too long to start," noted a 30-year-old user.',
      details: 'Serves content requests and caches assets for faster delivery. Sends asset requests to CDN.',
      dataConnection: 'Receives content requests from User App. Sends asset requests to CDN for optimized delivery.'
    },
    '3': {
      title: 'Content Delivery Network (CDN)',
      description: 'Delivers optimized video and image assets to users.',
      tools: ['Cloudflare', 'Akamai', 'AWS CloudFront'],
      thoughtProcess: 'A CDN was critical for reducing latency by serving content closer to users. Adaptive bitrate streaming was prioritized for buffering issues.',
      challenges: 'Cost of CDN implementation; ensuring global coverage.',
      navigation: 'Negotiated cost-effective CDN contracts. Configured adaptive bitrate streaming to adjust video quality dynamically.',
      userFeedback: '"Buffering ruins the experience," said 70% of pilot users.',
      details: 'Delivers optimized assets (e.g., compressed images, adaptive video streams) to User App.',
      dataConnection: 'Receives asset requests from Backend Server. Sends optimized assets (videos, images) to User App.'
    },
    '4': {
      title: 'Analytics Engine',
      description: 'Tracks performance metrics (page load time, buffering incidents, session time).',
      tools: ['Mixpanel', 'Google Analytics', 'Tableau'],
      thoughtProcess: 'Robust analytics were needed to quantify performance improvements. I focused on Core Web Vitals and user engagement metrics.',
      challenges: 'Isolating performance issues; real-time data processing.',
      navigation: 'Used A/B testing to measure improvements. Built Tableau dashboards for real-time monitoring.',
      userFeedback: '"The app feels faster now," reported 80% of A/B test participants.',
      details: 'Tracks metrics like LCP, FID, and CLS from Core Web Vitals, plus buffering and session time. Sends feedback to UX Enhancements.',
      dataConnection: 'Receives performance data from User App. Sends metrics feedback to UX Enhancements for optimization.'
    },
    '5': {
      title: 'UX Enhancements',
      description: 'Implements skeleton screens and adaptive bitrate streaming for better UX.',
      tools: ['Figma', 'React', 'HLS.js'],
      thoughtProcess: 'UX improvements like skeleton screens and adaptive streaming were prioritized to reduce perceived delays and buffering.',
      challenges: 'Balancing UX improvements with performance overhead; ensuring cross-browser compatibility.',
      navigation: 'Prototyped skeleton screens in Figma and tested with users. Integrated HLS.js for adaptive streaming with minimal overhead.',
      userFeedback: '"The loading screens make waiting less frustrating," said a returning user.',
      details: 'Implements skeleton screens and adaptive streaming. Enhances User App experience based on analytics feedback.',
      dataConnection: 'Receives metrics feedback from Analytics Engine. Sends enhanced UX features (e.g., skeleton screens, adaptive streams) to User App.'
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
          You are the Product Manager for a video streaming platform. Users are complaining about slow page load times and video buffering, which has caused engagement and retention to drop. How would you approach solving this UX/technical challenge, and what would success look like?
        </p>
      </section>

      {/* Context Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaVideo className="text-3xl text-indigo-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Case Study: Improving Streaming Performance</h1>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Context / Background</h2>
          <p className="text-gray-700 mb-2"><strong>Product:</strong> Video streaming platform with 5M monthly active users.</p>
          <p className="text-gray-700 mb-2"><strong>Situation:</strong> Complaints about slow page load times and frequent buffering.</p>
          <p className="text-gray-700 mb-2"><strong>Impact:</strong> Engagement dropped — average session time decreased 25% in 3 months.</p>
          <p className="text-gray-700"><strong>My Role:</strong> As the PM, I led the end-to-end process, coordinating with engineering and UX teams to diagnose and fix performance issues.</p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaLightbulb className="text-3xl text-yellow-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Problem / Challenge</h2>
        </div>
        <p className="text-gray-700 mb-2"><strong>Problem:</strong> Users expected fast, smooth playback, but the platform had slow load times and frequent buffering.</p>
        <p className="text-gray-700 mb-2"><strong>Core Issue:</strong> Technical performance directly affected UX.</p>
        <p className="text-gray-700"><strong>Risk:</strong> Losing users to faster competitors like Netflix and YouTube.</p>
      </section>

      {/* Goal Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-3xl text-green-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Goal / Metrics</h2>
        </div>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Reduce average page load time from 5s to under 2s.</li>
          <li>Decrease video buffering incidents by 40%.</li>
          <li>Improve average session time by 15% within 6 months.</li>
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
          <li>Average page load time reduced from 5s to 1.8s (goal: under 2s).</li>
          <li>Buffering incidents decreased by 50% (goal: 40%).</li>
          <li>Average session time increased by 20% (goal: 15%).</li>
          <li>Churn rate dropped by 12% in the following quarter.</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Deductions</h3>
        <p className="text-gray-700">
          Performance optimization significantly improved UX, driving engagement and retention. A/B testing validated the impact of technical and UX changes. The results highlight that even small delays critically affect user satisfaction, providing a scalable framework for future optimizations.
        </p>
      </section>

      {/* Learnings Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaLightbulb className="text-3xl text-yellow-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Learnings / Next Steps</h2>
        </div>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Performance is a core component of UX; small delays drive drop-off.</li>
          <li>Collaboration between PM, UX, and engineering is critical for technical solutions.</li>
          <li>User feedback validated the impact of skeleton screens and adaptive streaming.</li>
          <li><strong>Next Step:</strong> Implement real-time performance monitoring dashboards to catch issues early.</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Key Takeaways</h3>
        <p className="text-gray-700">
          As a PM, I drove impact by diagnosing technical issues, prioritizing fixes, and validating with data and user feedback. This collaborative, data-driven approach demonstrates leadership and technical acumen, essential for scaling platform performance.
        </p>
      </section>

      {/* Simulation Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-3xl text-green-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Simulation: Data-Driven Decision-Making</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Adjust optimization variables to see their impact on performance metrics, simulating the data-driven decision-making process used in the case study.
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
            <h3 className="text-xl font-semibold text-gray-800">Q1: How did you identify the root causes of slow performance?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I partnered with engineering to conduct performance audits using Core Web Vitals and video logs, identifying heavy JavaScript bundles and unoptimized images. User surveys (200 users) confirmed slow load times and buffering as key pain points, guiding our focus on quick wins and long-term fixes.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q2: How did you prioritize which optimizations to implement?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I used the ICE framework (Impact, Confidence, Ease). Lazy loading and image compression were quick wins with high impact and ease. CDN implementation was high-impact but required more effort, so we validated its ROI through pilot tests. User feedback prioritized skeleton screens for perceived speed.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q3: How did you handle collaboration with engineering and UX teams?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> Engineering raised concerns about CDN costs. I facilitated cost-benefit analyses and negotiated vendor contracts. For UX, we prototyped skeleton screens in Figma and tested with users to ensure alignment. Weekly syncs kept teams aligned on priorities and timelines.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q4: How did you measure success beyond primary metrics?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> Beyond load time (1.8s) and buffering reduction (50%), I tracked session time (up 20%) and churn rate (down 12%). User surveys showed 80% satisfaction with the improved experience, and analytics confirmed reduced drop-off, validating broader impact.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Q5: What would you do differently?</h3>
            <p className="text-gray-700">
              <strong>Answer:</strong> I’d implement real-time monitoring earlier to catch issues proactively. I’d also explore multivariate testing to isolate the impact of each optimization (e.g., lazy loading vs. CDN). Finally, I’d conduct longitudinal studies to assess long-term retention effects.
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
          <li><strong>Data-Driven Approach:</strong> Use of data to diagnose, prioritize, and measure outcomes.</li>
          <li><strong>User-Centric Thinking:</strong> Incorporation of user feedback to guide solutions.</li>
          <li><strong>Collaboration & Leadership:</strong> Effective cross-functional teamwork.</li>
          <li><strong>Impact & Scalability:</strong> Measurable results with scalable insights.</li>
          <li><strong>Reflection & Learning:</strong> Reflection on challenges and improvements.</li>
        </ul>
        <p className="text-gray-700 mt-4">
          This case study excels with a structured, data-driven approach, user feedback integration, and strong collaboration, making it compelling for interviews.
        </p>
      </section>
    </div>
  );
};

// Simulation Component
const Simulation = () => {
  const [imageCompression, setImageCompression] = useState(false);
  const [lazyLoading, setLazyLoading] = useState(false);
  const [cdnUsage, setCdnUsage] = useState(false);
  const [pageLoadTime, setPageLoadTime] = useState(5.0);
  const [bufferingIncidents, setBufferingIncidents] = useState(100);
  const [sessionTime, setSessionTime] = useState(10.0);

  const calculateImpact = useCallback(() => {
    let newLoadTime = 5.0;
    let newBuffering = 100;
    let newSessionTime = 10.0;

    if (imageCompression) {
      newLoadTime -= 1.5;
      newBuffering -= 10;
      newSessionTime += 2.0;
    }
    if (lazyLoading) {
      newLoadTime -= 1.0;
      newBuffering -= 5;
      newSessionTime += 1.5;
    }
    if (cdnUsage) {
      newLoadTime -= 1.7;
      newBuffering -= 35;
      newSessionTime += 2.5;
    }

    setPageLoadTime(newLoadTime.toFixed(1));
    setBufferingIncidents(newBuffering);
    setSessionTime(newSessionTime.toFixed(1));
  }, [imageCompression, lazyLoading, cdnUsage]);

  React.useEffect(() => {
    calculateImpact();
  }, [imageCompression, lazyLoading, cdnUsage, calculateImpact]);

  return (
    <div className="space-y-4">
      <div>
        <label className="flex items-center text-gray-700 mb-2">
          <input
            type="checkbox"
            checked={imageCompression}
            onChange={(e) => setImageCompression(e.target.checked)}
            className="mr-2"
          />
          Enable Image Compression
        </label>
      </div>
      <div>
        <label className="flex items-center text-gray-700 mb-2">
          <input
            type="checkbox"
            checked={lazyLoading}
            onChange={(e) => setLazyLoading(e.target.checked)}
            className="mr-2"
          />
          Enable Lazy Loading
        </label>
      </div>
      <div>
        <label className="flex items-center text-gray-700 mb-2">
          <input
            type="checkbox"
            checked={cdnUsage}
            onChange={(e) => setCdnUsage(e.target.checked)}
            className="mr-2"
          />
          Enable CDN Usage
        </label>
      </div>
      <div className="p-4 bg-indigo-100 rounded-lg">
        <p className="text-gray-800 font-semibold">Simulated Outcomes:</p>
        <p className="text-gray-700">Page Load Time: {pageLoadTime}s</p>
        <p className="text-gray-700">Buffering Incidents: {bufferingIncidents}% of original</p>
        <p className="text-gray-700">Average Session Time: {sessionTime} minutes</p>
        <p className="text-gray-700 mt-2">
          {pageLoadTime <= 2 && bufferingIncidents <= 60
            ? 'Success! The optimizations meet the performance goals, improving engagement.'
            : 'Enable more optimizations to reach a page load time under 2s and reduce buffering by 40%.'}
        </p>
      </div>
    </div>
  );
};

export default StreamingPlatformCaseStudy;