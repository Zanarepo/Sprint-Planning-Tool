import { FaServer, FaNetworkWired, FaShieldAlt, FaCogs, FaCloud } from 'react-icons/fa';

const infrastructureConcepts = [
  {
    title: 'Virtual Machines (VMs)',
    whatTheyAre: 'A virtual machine is a software-based emulation of a physical computer. It runs an operating system (Linux, Windows, etc.) and applications just like a real computer, but it’s hosted in the cloud.',
    whyTheyMatter: [
      'Allow isolated environments for different apps, teams, or clients.',
      'Used to host websites, APIs, databases, or development environments.',
      'You pay only for the time and power you use.'
    ],
    whyPMsCare: 'Understanding VM specs (CPU, RAM, OS) helps in estimating costs, performance, and deployment timelines. If your product needs high-performance computing (e.g., video processing), you may need to request a specific type of VM.',
    example: 'As a PM at a video platform startup, knowing that your transcoding service needs a GPU-enabled VM helps you work with DevOps on proper cloud resource selection.',
    icon: <FaServer className="w-8 h-8 text-blue-500" />
  },
  {
    title: 'Networks',
    whatTheyAre: 'A network in cloud computing connects your virtual machines and services to each other and the internet. Includes subnets, IP addresses, gateways, DNS, and private/internal routes. You define whether services talk to each other privately or publicly.',
    whyTheyMatter: [
      'Networking impacts performance, security, and availability.',
      'You might separate environments (e.g., dev, staging, production) via VPCs (Virtual Private Clouds).'
    ],
    whyPMsCare: 'Helps you understand how data flows through your app. Informs compliance and privacy decisions (e.g., “Should data stay within a region?”). You’ll collaborate better with engineers when talking about external APIs, internal services, or latency issues.',
    example: 'If your app is slow, a PM who understands networks can help ask the right questions—“Is this traffic going across regions?” or “Are we routing data efficiently?”',
    icon: <FaNetworkWired className="w-8 h-8 text-green-500" />
  },
  {
    title: 'Firewalls',
    whatTheyAre: 'A firewall is a set of rules that determines what network traffic is allowed to enter or exit a system. Can allow/block IP ranges, ports, protocols, and services. In the cloud, firewalls are often software-defined (e.g., AWS Security Groups).',
    whyTheyMatter: [
      'Critical for security and compliance.',
      'Helps prevent unauthorized access, DDoS attacks, and data breaches.'
    ],
    whyPMsCare: 'As the product owner, you’re responsible for user data protection and uptime. You should know when to ask: “Should this database be public?” or “Is this port exposed unnecessarily?”',
    example: 'You’re launching a payment feature. As PM, you ensure that the DevOps team applies firewall rules to block external access to internal services.',
    icon: <FaShieldAlt className="w-8 h-8 text-red-500" />
  },
  {
    title: 'Custom Environments',
    whatTheyAre: 'A custom environment refers to a specific configuration of infrastructure, tools, software versions, and settings used to run your app or services. Examples include a Node.js API using Redis, running on Ubuntu with Docker, or a Python ML model hosted in a container with GPU acceleration.',
    whyTheyMatter: [
      'Developers need different environments for development, testing, staging, and production.',
      'You may need custom setups for performance, compatibility, or client-specific deployments.'
    ],
    whyPMsCare: 'Helps in scoping features and timelines (“Does this work in all environments?”). Assists in prioritizing tech debt (“Should we upgrade the staging environment to match production?”).',
    example: 'You’re launching a new API version. Knowing that it runs differently in staging than production can save you from a release-night fire drill.',
    icon: <FaCogs className="w-8 h-8 text-purple-500" />
  }
];

const summaryTable = [
  { concept: 'Virtual Machines', whyItMatters: 'Helps plan resources, cost, and performance goals' },
  { concept: 'Networks', whyItMatters: 'Supports security, compliance, and integration planning' },
  { concept: 'Firewalls', whyItMatters: 'Keeps product secure, avoids breaches' },
  { concept: 'Custom Environments', whyItMatters: 'Improves quality assurance and rollout planning' }
];

const CloudInfrastructureConcepts = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-6">
          Cloud Infrastructure Concepts for Product Managers
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          As a Product Manager, understanding cloud infrastructure components like virtual machines, networks, firewalls, and custom environments empowers you to make informed decisions, collaborate with engineering teams, and prevent product failures.
        </p>

        {/* Infrastructure Concepts Section */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Infrastructure Components</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mb-8">
          {infrastructureConcepts.map((concept, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {concept.icon}
                <h3 className="text-xl font-semibold text-gray-900 ml-3">{concept.title}</h3>
              </div>
              <h4 className="text-md font-medium text-gray-800">What They Are:</h4>
              <p className="text-sm text-gray-600 mb-2">{concept.whatTheyAre}</p>
              <h4 className="text-md font-medium text-gray-800">Why They Matter:</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600 mb-2">
                {concept.whyTheyMatter.map((reason, i) => (
                  <li key={i}>{reason}</li>
                ))}
              </ul>
              <h4 className="text-md font-medium text-gray-800">Why PMs Should Care:</h4>
              <p className="text-sm text-gray-600 mb-2">{concept.whyPMsCare}</p>
              <p className="text-sm text-gray-600"><strong>Example:</strong> {concept.example}</p>
            </div>
          ))}
        </div>

        {/* Summary Table */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why These Concepts Matter for PMs</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm text-left text-gray-600 bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 font-medium">Concept</th>
                <th className="px-4 py-2 font-medium">Why It Matters for PMs</th>
              </tr>
            </thead>
            <tbody>
              {summaryTable.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{row.concept}</td>
                  <td className="px-4 py-2">{row.whyItMatters}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Final Guidance */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Final Guidance for PMs</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaCloud className="w-8 h-8 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900 ml-3">Why PMs Should Understand Infrastructure</h3>
          </div>
          <p className="text-sm text-gray-600">
            As a PM, you don’t configure VMs or firewalls, but understanding these concepts allows you to:
            <ul className="list-disc pl-5 text-sm text-gray-600 mb-4">
              <li>Estimate costs and performance needs accurately.</li>
              <li>Ensure compliance and security for user data.</li>
              <li>Collaborate effectively with DevOps and engineering teams.</li>
              <li>Avoid deployment issues by aligning environments.</li>
              <li>Make strategic decisions that balance speed, scale, and stability.</li>
            </ul>
            By grasping these basics, you’ll earn trust from technical teams, ask smarter questions, and steer your product toward success.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CloudInfrastructureConcepts;