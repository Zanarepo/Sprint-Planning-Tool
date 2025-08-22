import { useState } from 'react';
import { FaShieldAlt, FaLock, FaGlobe, FaServer, FaCloud } from 'react-icons/fa';

const keyQuestions = [
  {
    question: 'What firewall rules are in place?',
    explanation: 'This refers to the configured list of permissions for each cloud resource, specifying allowed IP addresses/ranges, ports, and protocols. Rules differ by environment (e.g., staging vs production) and resource type (e.g., app server vs database).',
    example: 'Your web server allows inbound traffic on port 443 (HTTPS) from any IP, but denies all other ports. Your database allows only internal access from app servers, denying public IPs.',
    icon: <FaShieldAlt className="w-8 h-8 text-blue-500" />
  },
  {
    question: 'Are only required ports open (e.g., HTTP 80, HTTPS 443)?',
    explanation: 'Ports are entry points to your server. Only necessary ports should be open (e.g., 443 for HTTPS, 22 for SSH). Open unused ports risk attacks like brute-force attempts on databases.',
    example: 'Your frontend app needs only port 443 open. SSH (port 22) is restricted to your team’s IPs. Database ports (e.g., 3306 for MySQL) are closed to the public.',
    icon: <FaLock className="w-8 h-8 text-red-500" />
  },
  {
    question: 'Is our database or backend exposed to the public when it shouldn’t be?',
    explanation: 'Cloud databases should live in private networks, accessible only by internal servers. Public exposure risks data breaches.',
    example: 'Production API is public via HTTPS, but the database is private with no public IP. SSH is IP-restricted to your team. Exposing a database publicly invites attacks.',
    icon: <FaServer className="w-8 h-8 text-green-500" />
  }
];

const portTable = [
  { port: 22, protocol: 'SSH', use: 'Remote server access' },
  { port: 80, protocol: 'HTTP', use: 'Web (non-secure)' },
  { port: 443, protocol: 'HTTPS', use: 'Web (secure)' },
  { port: 3306, protocol: 'MySQL', use: 'MySQL database access' },
  { port: 5432, protocol: 'PostgreSQL', use: 'PostgreSQL database' }
];

const scenarios = [
  {
    title: 'Securing a Web App on AWS',
    description: 'Web server (EC2): Allow port 443 (HTTPS) from anywhere. SSH (port 22): Allow only from company’s VPN IP. Database (RDS): Allow only traffic from web server’s private subnet.',
    risk: 'Without these rules, an attacker could access your database directly via its IP.',
    icon: <FaGlobe className="w-6 h-6 text-blue-600" />
  },
  {
    title: 'Preventing a Data Leak',
    description: 'A staging database with a public IP and port 5432 open risks brute-force attacks or data theft. With a firewall, you block all external IPs and allow only internal servers.',
    risk: 'Test data could be stolen or altered without proper firewall rules.',
    icon: <FaLock className="w-6 h-6 text-red-600" />
  },
  {
    title: 'Testing a Payment Integration',
    description: 'You open your test API to external testers on port 443 but forget to limit access duration. With security group rules, you set temporary access with expiration and monitor traffic.',
    risk: 'A public API could be spammed or lead to test charges if not restricted.',
    icon: <FaServer className="w-6 h-6 text-purple-600" />
  }
];

const summaryTable = [
  { concept: 'Firewall Rules', whyMatters: 'Controls access to your app/resources', whatToCheck: 'Are they too open? Are they updated?' },
  { concept: 'Open Ports', whyMatters: 'Only needed services should be reachable', whatToCheck: 'Are extra ports open? Is SSH limited?' },
  { concept: 'Public Exposure', whyMatters: 'Private systems (like DBs) should not be public', whatToCheck: 'Are there public IPs or wide-open rules?' }
];

const FirewallsAndSecurityGroups = () => {
  // State for firewall simulation
  const [ipRange, setIpRange] = useState('0.0.0.0/0'); // Default: allow all IPs
  const [port, setPort] = useState('443');
  const [protocol, setProtocol] = useState('HTTPS');
  const [resourceType, setResourceType] = useState('Web Server');
  const [accessResult, setAccessResult] = useState('');

  // Simulate firewall rule application
  const simulateFirewall = () => {
    const isPublicIp = ipRange === '0.0.0.0/0';
    const isRestrictedIp = ipRange === '192.168.1.0/24' || ipRange === '10.0.0.0/16';
    const isDatabase = resourceType === 'Database';
    const isSecurePort = port === '443' || port === '80';
    const isDatabasePort = port === '3306' || port === '5432';

    if (isDatabase && isPublicIp) {
      setAccessResult('⚠️ Security Risk: Database exposed to public IPs! This could allow unauthorized access.');
    } else if (isDatabase && isDatabasePort && isRestrictedIp) {
      setAccessResult('✅ Secure: Database access restricted to internal IPs only.');
    } else if (resourceType === 'Web Server' && isSecurePort && isPublicIp) {
      setAccessResult('✅ Allowed: Web server accessible on public port (HTTPS/HTTP).');
    } else if (resourceType === 'Web Server' && port === '22' && isRestrictedIp) {
      setAccessResult('✅ Secure: SSH access restricted to internal IPs.');
    } else if (port === '22' && isPublicIp) {
      setAccessResult('⚠️ Security Risk: SSH port open to all IPs! This could allow brute-force attacks.');
    } else {
      setAccessResult('🛡️ Configuration applied. Check if this matches your app’s needs.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-6">
          Firewalls and Security Groups for Product Managers
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Firewalls and security groups control who can access your cloud resources. As a PM, understanding them helps ensure your product is secure, compliant, and reliable.
        </p>

        {/* Firewall Overview */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Are Firewalls and Security Groups?</h2>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <FaShieldAlt className="w-8 h-8 text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-900 ml-3">Firewalls and Security Groups</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            In the cloud, firewalls (often called security groups in AWS) are rules that control incoming and outgoing traffic to servers, databases, or services. They determine who can connect, from where, and to which ports/services—like guards at a gate.
          </p>
          <p className="text-sm text-gray-600">
            <strong>Why PMs Care:</strong> Firewalls protect user data, ensure compliance, and prevent downtime from attacks. Knowing key questions to ask helps you collaborate with DevOps to secure your product.
          </p>
        </div>

        {/* Key Questions */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Questions to Ask About Firewalls</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {keyQuestions.map((question, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {question.icon}
                <h3 className="text-xl font-semibold text-gray-900 ml-3">{question.question}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">{question.explanation}</p>
              <p className="text-sm text-gray-600"><strong>Example:</strong> {question.example}</p>
            </div>
          ))}
        </div>

        {/* Common Ports Table */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Common Ports and Their Uses</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm text-left text-gray-600 bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 font-medium">Port</th>
                <th className="px-4 py-2 font-medium">Protocol</th>
                <th className="px-4 py-2 font-medium">Common Use</th>
              </tr>
            </thead>
            <tbody>
              {portTable.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{row.port}</td>
                  <td className="px-4 py-2">{row.protocol}</td>
                  <td className="px-4 py-2">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Real-World Scenarios */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Real-World Scenarios</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {scenarios.map((scenario, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {scenario.icon}
                <h3 className="text-xl font-semibold text-gray-900 ml-3">{scenario.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">{scenario.description}</p>
              <p className="text-sm text-gray-600"><strong>Risk Without Firewall:</strong> {scenario.risk}</p>
            </div>
          ))}
        </div>

        {/* Firewall Simulation */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Interactive Firewall Simulation</h2>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <FaLock className="w-8 h-8 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900 ml-3">Simulate Firewall Rules</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Experiment with IP ranges, ports, protocols, and resource types to see how firewall rules control access. This simulation shows the security implications of your choices.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">IP Range</label>
              <select
                value={ipRange}
                onChange={(e) => setIpRange(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option value="0.0.0.0/0">Any IP (Public)</option>
                <option value="192.168.1.0/24">Internal IPs (192.168.1.0/24)</option>
                <option value="10.0.0.0/16">Private Subnet (10.0.0.0/16)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Port</label>
              <select
                value={port}
                onChange={(e) => setPort(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option value="22">22 (SSH)</option>
                <option value="80">80 (HTTP)</option>
                <option value="443">443 (HTTPS)</option>
                <option value="3306">3306 (MySQL)</option>
                <option value="5432">5432 (PostgreSQL)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Protocol</label>
              <select
                value={protocol}
                onChange={(e) => setProtocol(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option>HTTPS</option>
                <option>HTTP</option>
                <option>SSH</option>
                <option>MySQL</option>
                <option>PostgreSQL</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Resource Type</label>
              <select
                value={resourceType}
                onChange={(e) => setResourceType(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option>Web Server</option>
                <option>Database</option>
                <option>API</option>
              </select>
            </div>
          </div>
          <button
            onClick={simulateFirewall}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Apply Firewall Rule
          </button>
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h4 className="text-md font-medium text-gray-800 mb-2">Simulation Result</h4>
            <p className="text-sm text-gray-600">
              <strong>Configuration:</strong> Allow {protocol} on port {port} from {ipRange} for {resourceType}.
            </p>
            <p className="text-sm text-gray-600 mt-2">{accessResult}</p>
          </div>
        </div>

        {/* Summary Table */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Summary: Why Firewalls Matter for PMs</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm text-left text-gray-600 bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 font-medium">Concept</th>
                <th className="px-4 py-2 font-medium">Why It Matters</th>
                <th className="px-4 py-2 font-medium">What to Check</th>
              </tr>
            </thead>
            <tbody>
              {summaryTable.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{row.concept}</td>
                  <td className="px-4 py-2">{row.whyMatters}</td>
                  <td className="px-4 py-2">{row.whatToCheck}</td>
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
            <h3 className="text-xl font-semibold text-gray-900 ml-3">Why PMs Should Understand Firewalls</h3>
          </div>
          <p className="text-sm text-gray-600">
            As a PM, understanding firewalls and security groups helps you:
            <ul className="list-disc pl-5 text-sm text-gray-600 mb-4">
              <li>Protect user data by ensuring only necessary access is allowed.</li>
              <li>Ensure compliance with regulations (e.g., GDPR, HIPAA).</li>
              <li>Prevent downtime from attacks like DDoS or brute-force attempts.</li>
              <li>Collaborate with DevOps to ask: “Are our databases private?” or “Are unused ports closed?”</li>
              <li>Avoid costly security breaches or data leaks.</li>
            </ul>
            By grasping firewall basics, you’ll safeguard your product, build trust with technical teams, and make informed security decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FirewallsAndSecurityGroups;