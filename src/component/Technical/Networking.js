import { useState } from 'react';
import { FaNetworkWired, FaGlobe, FaShieldAlt, FaServer, FaCloud, FaDollarSign } from 'react-icons/fa';

const networkingQuestions = [
  {
    question: 'Are we using a Virtual Private Cloud (VPC)?',
    whatItMeans: 'A Virtual Private Cloud (VPC) is a logically isolated section of a cloud provider’s network where you can launch resources (e.g., VMs, databases) that only your team or app can access. You control IP address ranges, routing tables, firewalls/security rules, and subnets (private or public).',
    useCase: 'Your app handles sensitive customer data (e.g., financial info). You don’t want your database accessible over the public internet.',
    solution: 'Host your backend and database in a VPC with private subnets—only the app’s API can access it, not hackers on the open internet.',
    icon: <FaShieldAlt className="w-8 h-8 text-blue-500" />
  },
  {
    question: 'Are environments (dev, staging, prod) separated?',
    whatItMeans: 'Environment isolation ensures changes in development don’t affect production users, bugs don’t spread across environments, and teams can test safely. This is often done by creating different VPCs or subnets for dev, staging, and production.',
    useCase: 'Your staging database is mistakenly connected to the production backend, causing a tester to delete real user data.',
    solution: 'Network-level isolation—each environment in its own VPC or subnet, with firewall rules.',
    icon: <FaServer className="w-8 h-8 text-green-500" />
  },
  {
    question: 'Are we routing traffic efficiently across regions or zones?',
    whatItMeans: 'Cloud providers have data centers in multiple global regions (e.g., US-East, EU-West, Asia-South). You can deploy your app in multiple regions, use load balancers, and DNS routing to send users to the nearest region, reducing latency and improving UX.',
    useCase: 'Your Nigerian users are accessing a server in Germany, and the app feels sluggish.',
    solution: 'Deploy app in Africa-West (Lagos) region (if available) or South Africa region. Use GeoDNS or Cloudflare to route requests based on location.',
    icon: <FaGlobe className="w-8 h-8 text-purple-500" />
  },
  {
    question: 'Is latency affecting user experience in certain regions?',
    whatItMeans: 'Latency is the time it takes for a user’s request to reach your server and get a response. It’s affected by physical distance, network quality, and server performance. Slow performance in specific regions often indicates latency issues.',
    useCase: 'A global SaaS product with customers in India, the US, and Europe—US customers complain about slow dashboard loads.',
    solution: 'Deploy additional servers in India, use CDNs for static assets (like images, JS), and implement regional failover.',
    icon: <FaNetworkWired className="w-8 h-8 text-red-500" />
  },
  {
    question: 'Is it over/under-provisioned for our current usage?',
    whatItMeans: 'This checks if your network or compute resources are right-sized. Over-provisioned means paying for too much capacity (wasting money). Under-provisioned means servers or network can’t handle traffic (causing slow apps or errors).',
    useCase: 'You pay for 5 VMs to run your website, but traffic dropped—only 1 VM is used most of the day.',
    solution: 'Use autoscaling, reduce server count, or switch to smaller instance types.',
    icon: <FaDollarSign className="w-8 h-8 text-orange-500" />
  },
  {
    question: 'Can we switch to a more cost-efficient type (e.g., spot instances, autoscaling)?',
    whatItMeans: 'Options like spot instances (70–90% cheaper, interruptable), reserved instances (1–3 year commitment for discounts), autoscaling (add/remove instances based on demand), or serverless (pay-per-use) can optimize costs and performance.',
    useCase: 'You run a batch data job every night for 3 hours; the server sits idle otherwise.',
    solution: 'Use spot instances or serverless compute to reduce cost by 80–90%.',
    icon: <FaCloud className="w-8 h-8 text-blue-600" />
  }
];

const costOptions = [
  { type: 'Spot Instances', description: 'Unused cloud capacity at 70–90% discount. Can be terminated anytime.', cost: 'Low', costFactor: 0.3 },
  { type: 'Reserved Instances', description: 'Commit to a VM for 1–3 years; big discount.', cost: 'Medium', costFactor: 0.7 },
  { type: 'Autoscaling', description: 'Add/remove instances automatically based on demand.', cost: 'Medium', costFactor: 1 },
  { type: 'Serverless', description: 'No server management, pay-per-use functions.', cost: 'Low-Medium', costFactor: 0.8 }
];

const summaryTable = [
  { question: 'Are we using a VPC?', whatYoureAsking: 'Is our infra secure and isolated?', whenToAsk: 'Early infra design, security reviews' },
  { question: 'Are dev/staging/prod separated?', whatYoureAsking: 'Can we test safely without risking real users?', whenToAsk: 'During release planning' },
  { question: 'Are we routing traffic efficiently?', whatYoureAsking: 'Is UX slow for global users?', whenToAsk: 'When launching in new regions' },
  { question: 'Is latency affecting UX?', whatYoureAsking: 'Should we use a CDN or local region?', whenToAsk: 'If performance is poor for some users' },
  { question: 'Are we over/under-provisioned?', whatYoureAsking: 'Are we wasting cloud spend or underperforming?', whenToAsk: 'During budget reviews or app crashes' },
  { question: 'Can we use autoscaling or spot instances?', whatYoureAsking: 'Can we optimize performance and cost?', whenToAsk: 'Always! Especially for variable workloads' }
];

const CloudNetworkingInDepth = () => {
  // State for networking simulation
  const [useVPC, setUseVPC] = useState(true);
  const [environment, setEnvironment] = useState('Production');
  const [region, setRegion] = useState('US-East');
  const [useCDN, setUseCDN] = useState(false);
  const [costOption, setCostOption] = useState('Autoscaling');
  const [trafficLevel, setTrafficLevel] = useState(50);

  // Calculate simulation results
  const selectedCostOption = costOptions.find((option) => option.type === costOption);
  const baseLatency = 100; // Base latency in ms
  const baseCost = 0.1; // Base cost per hour
  const latency = (
    baseLatency * 
    (region === 'US-East' ? 1 : 1.5) * // Increase latency for non-US regions
    (useCDN ? 0.5 : 1) // CDN halves latency
  ).toFixed(0);
  const cost = (
    baseCost * 
    (trafficLevel / 50) * 
    selectedCostOption.costFactor * 
    (useVPC ? 1.2 : 1) // VPC increases cost slightly
  ).toFixed(2);
  const securityLevel = useVPC ? 'High' : 'Low';
  const isOverProvisioned = trafficLevel < 20 && costOption !== 'Serverless';
  const isUnderProvisioned = trafficLevel > 80 && costOption === 'Spot Instances';

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-6">
          Networking in Cloud Platforms for Product Managers
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Understanding cloud networking—VPCs, environment separation, traffic routing, and cost optimization—helps PMs ensure secure, scalable, and cost-efficient products while collaborating effectively with engineering teams.
        </p>

        {/* Key Questions Section */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Networking Questions for PMs</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {networkingQuestions.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {item.icon}
                <h3 className="text-xl font-semibold text-gray-900 ml-3">{item.question}</h3>
              </div>
              <h4 className="text-md font-medium text-gray-800">What It Means:</h4>
              <p className="text-sm text-gray-600 mb-2">{item.whatItMeans}</p>
              <h4 className="text-md font-medium text-gray-800">Use Case:</h4>
              <p className="text-sm text-gray-600 mb-2">{item.useCase}</p>
              <h4 className="text-md font-medium text-gray-800">Solution:</h4>
              <p className="text-sm text-gray-600">{item.solution}</p>
            </div>
          ))}
        </div>

        {/* Cost Options Table */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cost-Efficient Networking Options</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm text-left text-gray-600 bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 font-medium">Type</th>
                <th className="px-4 py-2 font-medium">Description</th>
                <th className="px-4 py-2 font-medium">Cost</th>
              </tr>
            </thead>
            <tbody>
              {costOptions.map((option, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{option.type}</td>
                  <td className="px-4 py-2">{option.description}</td>
                  <td className="px-4 py-2">{option.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Table */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Summary for PMs</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm text-left text-gray-600 bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 font-medium">PM Question</th>
                <th className="px-4 py-2 font-medium">What You're Really Asking</th>
                <th className="px-4 py-2 font-medium">When to Ask</th>
              </tr>
            </thead>
            <tbody>
              {summaryTable.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{row.question}</td>
                  <td className="px-4 py-2">{row.whatYoureAsking}</td>
                  <td className="px-4 py-2">{row.whenToAsk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Networking Simulation */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Interactive Networking Simulation</h2>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <FaNetworkWired className="w-8 h-8 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900 ml-3">Simulate Cloud Networking</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Adjust networking settings to see how they affect latency, cost, and security. This simulation shows how VPCs, regions, CDNs, and scaling options impact your app.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Use VPC?</label>
              <select
                value={useVPC ? 'Yes' : 'No'}
                onChange={(e) => setUseVPC(e.target.value === 'Yes')}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Environment</label>
              <select
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option>Production</option>
                <option>Staging</option>
                <option>Development</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Region</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option>US-East</option>
                <option>EU-West</option>
                <option>Asia-South</option>
                <option>Africa-South</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Use CDN?</label>
              <select
                value={useCDN ? 'Yes' : 'No'}
                onChange={(e) => setUseCDN(e.target.value === 'Yes')}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cost Option</label>
              <select
                value={costOption}
                onChange={(e) => setCostOption(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                {costOptions.map((option) => (
                  <option key={option.type}>{option.type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Traffic Level (%)</label>
              <input
                type="range"
                min="0"
                max="100"
                value={trafficLevel}
                onChange={(e) => setTrafficLevel(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-sm text-gray-600">{trafficLevel}%</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h4 className="text-md font-medium text-gray-800 mb-2">Simulation Results</h4>
            <p className="text-sm text-gray-600"><strong>Configuration:</strong> {useVPC ? 'Using VPC' : 'No VPC'}, {environment}, {region}, {useCDN ? 'With CDN' : 'No CDN'}, {costOption}</p>
            <p className="text-sm text-gray-600"><strong>Traffic Level:</strong> {trafficLevel}%</p>
            <p className="text-sm text-gray-600"><strong>Estimated Latency:</strong> {latency} ms</p>
            <p className="text-sm text-gray-600"><strong>Estimated Cost:</strong> ${cost}/hour</p>
            <p className="text-sm text-gray-600"><strong>Security Level:</strong> {securityLevel}</p>
            {isOverProvisioned && (
              <p className="text-sm text-red-600 mt-2">Warning: Over-provisioned! You're paying for more capacity than needed.</p>
            )}
            {isUnderProvisioned && (
              <p className="text-sm text-red-600 mt-2">Warning: Under-provisioned! High traffic with spot instances may cause interruptions.</p>
            )}
          </div>
        </div>

        {/* Final Guidance */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why PMs Should Understand Cloud Networking</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaCloud className="w-8 h-8 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900 ml-3">Final Guidance for PMs</h3>
          </div>
          <p className="text-sm text-gray-600">
            As a PM, understanding cloud networking helps you:
            <ul className="list-disc pl-5 text-sm text-gray-600 mb-4">
              <li>Ensure security by using VPCs and environment isolation.</li>
              <li>Improve user experience by optimizing latency and routing.</li>
              <li>Control costs with autoscaling, spot instances, or serverless options.</li>
              <li>Plan for global scalability with multi-region deployments and CDNs.</li>
              <li>Collaborate with DevOps to align infrastructure with product goals.</li>
            </ul>
            By asking the right networking questions, you’ll drive better performance, security, and cost-efficiency for your product.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CloudNetworkingInDepth;