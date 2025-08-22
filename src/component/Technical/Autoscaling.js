import { useState } from 'react';
import { FaMicrochip, FaMemory, FaGlobe, FaTasks, FaShieldAlt, FaCloud } from 'react-icons/fa';

const autoscalingTriggers = [
  {
    title: 'CPU Usage (Compute Trigger)',
    description: 'When CPU usage on a server exceeds a threshold (e.g., 70%) over a certain time, autoscaling is triggered.',
    useCases: [
      'Web applications running backend-heavy processes like video encoding, PDF generation, or data compression.',
      'APIs with unpredictable workloads (e.g., chatbots or analytics endpoints).'
    ],
    whyUse: [
      'Great for apps with intensive computation per request.',
      'Keeps response times low as more users hit the server.'
    ],
    example: 'A SaaS tool exporting reports as PDFs—spikes in demand cause CPU to spike → autoscaling kicks in.',
    icon: <FaMicrochip className="w-8 h-8 text-blue-500" />
  },
  {
    title: 'Memory Usage (RAM Trigger)',
    description: 'If memory usage exceeds a threshold (e.g., 80%), autoscaling adds instances.',
    useCases: [
      'Apps that cache data in memory (e.g., e-commerce platforms, chat apps).',
      'Real-time collaboration tools like whiteboards, CRMs, or editors.'
    ],
    whyUse: [
      'Memory overflow can crash your app.',
      'Ideal for in-memory processing apps like Redis, machine learning inference, or game engines.'
    ],
    example: 'A collaborative design tool like Figma: each user adds memory load → server adds nodes as usage grows.',
    icon: <FaMemory className="w-8 h-8 text-green-500" />
  },
  {
    title: 'Request Volume (Traffic/Load Trigger)',
    description: 'If the number of incoming HTTP requests per second (RPS) hits a defined threshold, autoscaling kicks in.',
    useCases: [
      'News sites, e-commerce, or event registration pages during launches or live events.',
      'Apps with spiky, user-driven traffic.'
    ],
    whyUse: [
      'More directly tied to user activity than CPU/memory.',
      'Best for frontend-heavy or static + API-based systems.'
    ],
    example: 'A ticketing website during a concert drop suddenly gets 10,000 requests/second → autoscaling launches 10 more instances.',
    icon: <FaGlobe className="w-8 h-8 text-purple-500" />
  },
  {
    title: 'Custom Triggers (Queue Length, Latency, etc.)',
    description: 'Triggers based on business metrics like message queue depth, API latency, or user-defined metrics (e.g., number of orders per minute).',
    useCases: [
      'Background task queues (e.g., email processing).',
      'Apps with async workloads or business-specific metrics.'
    ],
    whyUse: [
      'Tailored to your app’s unique needs.',
      'Ensures resources scale based on real business impact.'
    ],
    example: 'A background task queue (like email processing) gets too long → scale up worker nodes.',
    icon: <FaTasks className="w-8 h-8 text-red-500" />
  }
];

const keyQuestions = [
  {
    question: 'Do we use autoscaling for handling traffic spikes?',
    context: 'If not, you may experience downtime or slow performance during peak usage. If yes, confirm which resources are autoscaling—API servers, workers, database replicas?'
  },
  {
    question: 'What triggers autoscaling (CPU, memory, request volume)?',
    context: 'Ask engineers what thresholds are set and why. Some systems need CPU-based scaling, others may better suit request-based or custom metrics.'
  },
  {
    question: 'Are we paying for idle servers during low usage?',
    context: 'Without autoscaling: yes—you pay for always-on infrastructure. With autoscaling: the system scales down to zero or minimum when not needed, saving money.'
  }
];

const summaryTable = [
  { triggerType: 'CPU Usage', bestFor: 'Heavy computation workloads', exampleProducts: 'Video encoding, APIs, ML inference' },
  { triggerType: 'Memory Usage', bestFor: 'In-memory/caching-heavy apps', exampleProducts: 'Chat apps, whiteboards, game servers' },
  { triggerType: 'Request Volume', bestFor: 'Public-facing, traffic-driven apps', exampleProducts: 'E-commerce, news sites, blogs' },
  { triggerType: 'Custom Metrics', bestFor: 'Business logic, async workloads', exampleProducts: 'Queues, batch jobs, media pipelines' }
];

const FirewallSimulation = () => {
  const [rules, setRules] = useState([
    { ip: '192.168.1.0/24', port: '80', protocol: 'TCP', action: 'Allow' },
    { ip: '0.0.0.0/0', port: '22', protocol: 'TCP', action: 'Deny' }
  ]);
  const [newIp, setNewIp] = useState('');
  const [newPort, setNewPort] = useState('');
  const [newProtocol, setNewProtocol] = useState('TCP');
  const [newAction, setNewAction] = useState('Allow');
  const [testIp, setTestIp] = useState('');
  const [testPort, setTestPort] = useState('');
  const [testProtocol, setTestProtocol] = useState('TCP');
  const [testResult, setTestResult] = useState('');

  const addRule = () => {
    if (newIp && newPort) {
      setRules([...rules, { ip: newIp, port: newPort, protocol: newProtocol, action: newAction }]);
      setNewIp('');
      setNewPort('');
      setNewProtocol('TCP');
      setNewAction('Allow');
    }
  };

  const testTraffic = () => {
    let result = 'Denied';
    for (const rule of rules) {
      // Simplified IP matching: check if testIp starts with rule's IP prefix (ignoring CIDR for simplicity)
      if (
        testIp.startsWith(rule.ip.split('/')[0].slice(0, -1)) &&
        testPort === rule.port &&
        testProtocol === rule.protocol &&
        rule.action === 'Allow'
      ) {
        result = 'Allowed';
        break;
      }
    }
    setTestResult(`Traffic from ${testIp}:${testPort} (${testProtocol}) is ${result}.`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center mb-4">
        <FaShieldAlt className="w-8 h-8 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-900 ml-3">Firewall Simulation</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Experiment with firewall rules to see how they allow or block network traffic. Add rules, then test traffic to understand how firewalls protect your app.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h4 className="text-md font-medium text-gray-800 mb-2">Add Firewall Rule</h4>
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">IP Range (e.g., 192.168.1.0/24)</label>
              <input
                type="text"
                value={newIp}
                onChange={(e) => setNewIp(e.target.value)}
                placeholder="192.168.1.0/24"
                className="w-full p-2 border rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Port (e.g., 80)</label>
              <input
                type="text"
                value={newPort}
                onChange={(e) => setNewPort(e.target.value)}
                placeholder="80"
                className="w-full p-2 border rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Protocol</label>
              <select
                value={newProtocol}
                onChange={(e) => setNewProtocol(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option>TCP</option>
                <option>UDP</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Action</label>
              <select
                value={newAction}
                onChange={(e) => setNewAction(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option>Allow</option>
                <option>Deny</option>
              </select>
            </div>
            <button
              onClick={addRule}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
            >
              Add Rule
            </button>
          </div>
          <h4 className="text-md font-medium text-gray-800 mt-4 mb-2">Current Rules</h4>
          <ul className="list-disc pl-5 text-sm text-gray-600">
            {rules.map((rule, index) => (
              <li key={index}>
                {rule.action} {rule.protocol} traffic from {rule.ip} on port {rule.port}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-md font-medium text-gray-800 mb-2">Test Traffic</h4>
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Source IP (e.g., 192.168.1.10)</label>
              <input
                type="text"
                value={testIp}
                onChange={(e) => setTestIp(e.target.value)}
                placeholder="192.168.1.10"
                className="w-full p-2 border rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Port (e.g., 80)</label>
              <input
                type="text"
                value={testPort}
                onChange={(e) => setTestPort(e.target.value)}
                placeholder="80"
                className="w-full p-2 border rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Protocol</label>
              <select
                value={testProtocol}
                onChange={(e) => setTestProtocol(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option>TCP</option>
                <option>UDP</option>
              </select>
            </div>
            <button
              onClick={testTraffic}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
            >
              Test Traffic
            </button>
          </div>
          {testResult && (
            <p className="mt-4 text-sm text-gray-600 p-2 bg-gray-50 rounded-md">
              <strong>Result:</strong> {testResult}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const AutoscalingTriggers = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-6">
          Autoscaling Triggers for Product Managers
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Autoscaling ensures your app handles traffic spikes without downtime. As a PM, understanding what triggers autoscaling helps you optimize performance, control costs, and align infrastructure with business needs.
        </p>

        {/* Autoscaling Triggers Section */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Triggers Autoscaling?</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mb-8">
          {autoscalingTriggers.map((trigger, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {trigger.icon}
                <h3 className="text-xl font-semibold text-gray-900 ml-3">{trigger.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">{trigger.description}</p>
              <h4 className="text-md font-medium text-gray-800">Use Cases:</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600 mb-2">
                {trigger.useCases.map((useCase, i) => (
                  <li key={i}>{useCase}</li>
                ))}
              </ul>
              <h4 className="text-md font-medium text-gray-800">Why Use This Trigger:</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600 mb-2">
                {trigger.whyUse.map((reason, i) => (
                  <li key={i}>{reason}</li>
                ))}
              </ul>
              <p className="text-sm text-gray-600"><strong>Example:</strong> {trigger.example}</p>
            </div>
          ))}
        </div>

        {/* Key Questions Section */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Questions to Ask About Autoscaling</h2>
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {keyQuestions.map((question, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <FaCloud className="w-8 h-8 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900 ml-3">{question.question}</h3>
              </div>
              <p className="text-sm text-gray-600">{question.context}</p>
            </div>
          ))}
        </div>

        {/* Summary Table */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Summary of Autoscaling Triggers</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm text-left text-gray-600 bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 font-medium">Trigger Type</th>
                <th className="px-4 py-2 font-medium">Best For</th>
                <th className="px-4 py-2 font-medium">Example Products</th>
              </tr>
            </thead>
            <tbody>
              {summaryTable.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{row.triggerType}</td>
                  <td className="px-4 py-2">{row.bestFor}</td>
                  <td className="px-4 py-2">{row.exampleProducts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Firewall Simulation */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Interactive Firewall Simulation</h2>
        <FirewallSimulation />

        {/* Final Guidance */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Final Guidance for PMs</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaCloud className="w-8 h-8 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900 ml-3">Why PMs Should Understand Autoscaling and Firewalls</h3>
          </div>
          <p className="text-sm text-gray-600">
            As a PM, understanding autoscaling triggers and firewall configurations helps you:
            <ul className="list-disc pl-5 text-sm text-gray-600 mb-4">
              <li>Ensure your app scales seamlessly during traffic spikes, avoiding downtime.</li>
              <li>Optimize costs by scaling down during low usage periods.</li>
              <li>Protect your app with secure firewall rules to prevent unauthorized access.</li>
              <li>Collaborate with engineers to set appropriate thresholds (CPU, memory, requests).</li>
              <li>Make data-driven decisions about infrastructure to align with business goals.</li>
            </ul>
            By grasping these concepts, you’ll drive better product outcomes, earn trust from technical teams, and keep your app secure and scalable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AutoscalingTriggers;