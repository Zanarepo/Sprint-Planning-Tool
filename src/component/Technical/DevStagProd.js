import { useState } from 'react';
import { FaCode, FaCheckCircle, FaRocket, FaExclamationTriangle, FaDatabase, FaLock } from 'react-icons/fa';

const environments = [
  {
    name: 'Development (Dev)',
    purpose: 'Writing, testing, and debugging code.',
    whoUses: 'Developers',
    characteristics: [
      'Runs on developer machines or local containers',
      'Often uses sample/mock data',
      'Debugging tools enabled',
      'May auto-reload on file changes'
    ],
    questions: ['Does the feature work locally?', 'Are the unit tests passing?'],
    example: 'A developer builds a “Dark Mode” toggle in the dev environment using dummy user accounts to test preference saving.',
    icon: <FaCode className="w-8 h-8 text-blue-500" />
  },
  {
    name: 'Staging (QA/UAT)',
    purpose: 'Testing the full product in a “real-like” scenario before going live.',
    whoUses: 'QA, PMs, Stakeholders',
    characteristics: [
      'Closely mirrors production (same OS, database, configs)',
      'Uses near-real data (but sanitized)',
      'Used for User Acceptance Testing (UAT)'
    ],
    questions: ['Does this behave like it will in production?', 'Does the payment flow work from start to finish?'],
    example: 'Before launching a subscription plan, the PM tests the entire checkout flow in staging using a test Stripe account and mock credit cards.',
    icon: <FaCheckCircle className="w-8 h-8 text-green-500" />
  },
  {
    name: 'Production (Prod)',
    purpose: 'Running the actual live app for users.',
    whoUses: 'End users',
    characteristics: [
      'Live data',
      'Real users and traffic',
      'Must be secure, fast, and stable',
      'Errors are critical'
    ],
    questions: ['Is everything up and running?', 'How many users are affected by this bug?'],
    example: 'A user signs up for a premium plan, uploads their documents, and receives a confirmation email. All actions and data are real and sensitive.',
    icon: <FaRocket className="w-8 h-8 text-red-500" />
  }
];

const risks = [
  { misalignment: 'Dev vs Prod use different OS', issue: 'Feature works locally but fails in prod' },
  { misalignment: 'Staging uses prod credentials', issue: 'Real data gets altered or deleted' },
  { misalignment: 'QA tests on small fake data', issue: 'Misses bugs that happen on scale' },
  { misalignment: 'Dev uses newer API version', issue: 'Incompatible with prod environment' }
];

const pmTakeaways = [
  'Define a checklist for environment parity (OS, DB, APIs, data format).',
  'Ask DevOps to use infrastructure-as-code (e.g., Docker, Terraform) for consistency.',
  'Ensure staging has mocked but realistic data for real-world testing.',
  'Create environment-specific secrets/configs (e.g., .env files).'
];

const EnvironmentsExplained = () => {
  // State for simulation
  const [devConfig, setDevConfig] = useState({
    os: 'Ubuntu 20.04',
    pythonVersion: '3.10',
    dataSize: 'Small (Mock)',
    apiKey: 'Dev Key'
  });
  const [stagingConfig, setStagingConfig] = useState({
    os: 'Ubuntu 20.04',
    pythonVersion: '3.8',
    dataSize: 'Medium (Sanitized)',
    apiKey: 'Staging Key'
  });
  const [prodConfig] = useState({
    os: 'Ubuntu 22.04',
    pythonVersion: '3.8',
    dataSize: 'Large (Real)',
    apiKey: 'Prod Key'
  });

  // Check for misalignment issues
  const issues = [];
  if (devConfig.os !== prodConfig.os) {
    issues.push('Dev OS differs from Prod: Features may fail in production.');
  }
  if (stagingConfig.os !== prodConfig.os) {
    issues.push('Staging OS differs from Prod: QA may miss production bugs.');
  }
  if (devConfig.pythonVersion !== prodConfig.pythonVersion) {
    issues.push('Dev Python version differs from Prod: Code may break in production.');
  }
  if (stagingConfig.pythonVersion !== prodConfig.pythonVersion) {
    issues.push('Staging Python version differs from Prod: QA tests may not reflect production behavior.');
  }
  if (stagingConfig.dataSize !== 'Large (Real)') {
    issues.push('Staging data size is not realistic: May miss scale-related bugs.');
  }
  if (stagingConfig.apiKey === prodConfig.apiKey) {
    issues.push('Staging uses Prod API key: Risk of affecting real users or data.');
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-6">
          Dev, Staging, and Prod Environments for Product Managers
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Understanding Dev, Staging, and Production environments helps PMs ensure smooth development, testing, and deployment while avoiding costly production issues.
        </p>

        {/* Environments Overview */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Are Dev, Staging, and Prod Environments?</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {environments.map((env, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {env.icon}
                <h3 className="text-xl font-semibold text-gray-900 ml-3">{env.name}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2"><strong>Purpose:</strong> {env.purpose}</p>
              <p className="text-sm text-gray-600 mb-2"><strong>Who Uses It:</strong> {env.whoUses}</p>
              <h4 className="text-md font-medium text-gray-800">Characteristics:</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600 mb-2">
                {env.characteristics.map((char, i) => (
                  <li key={i}>{char}</li>
                ))}
              </ul>
              <h4 className="text-md font-medium text-gray-800">Typical Questions:</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600 mb-2">
                {env.questions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
              <p className="text-sm text-gray-600"><strong>Example:</strong> {env.example}</p>
            </div>
          ))}
        </div>

        {/* Why Align Environments */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Should Environments Be Aligned?</h2>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <FaDatabase className="w-8 h-8 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900 ml-3">Importance of Alignment</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Mismatched environments (e.g., different OS, software versions, or data) can cause crashes, data corruption, or unexpected behavior in production.
          </p>
          <p className="text-sm text-gray-600">
            <strong>Example:</strong> Your dev team uses Python 3.10 locally, but prod runs 3.8. A new syntax works locally but breaks production.
          </p>
        </div>

        {/* Risks of Misalignment */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Risks of Misalignment</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm text-left text-gray-600 bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 font-medium">Misalignment</th>
                <th className="px-4 py-2 font-medium">Potential Issue</th>
              </tr>
            </thead>
            <tbody>
              {risks.map((risk, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{risk.misalignment}</td>
                  <td className="px-4 py-2">{risk.issue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Environment Simulation */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Interactive Environment Simulation</h2>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <FaExclamationTriangle className="w-8 h-8 text-yellow-500" />
            <h3 className="text-xl font-semibold text-gray-900 ml-3">Simulate Environment Configurations</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Configure Dev and Staging environments and compare them to Prod to see how misalignment causes issues. Prod settings are fixed to simulate a real-world scenario.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Dev Config */}
            <div className="p-4 bg-gray-50 rounded-md">
              <h4 className="text-md font-medium text-gray-800 mb-2">Dev Environment</h4>
              <label className="block text-sm font-medium text-gray-700">OS</label>
              <select
                value={devConfig.os}
                onChange={(e) => setDevConfig({ ...devConfig, os: e.target.value })}
                className="w-full p-2 border rounded-md text-sm mb-2"
              >
                <option>Ubuntu 20.04</option>
                <option>Ubuntu 22.04</option>
                <option>Windows Server</option>
              </select>
              <label className="block text-sm font-medium text-gray-700">Python Version</label>
              <select
                value={devConfig.pythonVersion}
                onChange={(e) => setDevConfig({ ...devConfig, pythonVersion: e.target.value })}
                className="w-full p-2 border rounded-md text-sm mb-2"
              >
                <option>3.8</option>
                <option>3.10</option>
                <option>3.11</option>
              </select>
              <label className="block text-sm font-medium text-gray-700">Data Size</label>
              <select
                value={devConfig.dataSize}
                onChange={(e) => setDevConfig({ ...devConfig, dataSize: e.target.value })}
                className="w-full p-2 border rounded-md text-sm mb-2"
              >
                <option>Small (Mock)</option>
                <option>Medium (Sanitized)</option>
                <option>Large (Real)</option>
              </select>
              <label className="block text-sm font-medium text-gray-700">API Key</label>
              <select
                value={devConfig.apiKey}
                onChange={(e) => setDevConfig({ ...devConfig, apiKey: e.target.value })}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option>Dev Key</option>
                <option>Staging Key</option>
                <option>Prod Key</option>
              </select>
            </div>
            {/* Staging Config */}
            <div className="p-4 bg-gray-50 rounded-md">
              <h4 className="text-md font-medium text-gray-800 mb-2">Staging Environment</h4>
              <label className="block text-sm font-medium text-gray-700">OS</label>
              <select
                value={stagingConfig.os}
                onChange={(e) => setStagingConfig({ ...stagingConfig, os: e.target.value })}
                className="w-full p-2 border rounded-md text-sm mb-2"
              >
                <option>Ubuntu 20.04</option>
                <option>Ubuntu 22.04</option>
                <option>Windows Server</option>
              </select>
              <label className="block text-sm font-medium text-gray-700">Python Version</label>
              <select
                value={stagingConfig.pythonVersion}
                onChange={(e) => setStagingConfig({ ...stagingConfig, pythonVersion: e.target.value })}
                className="w-full p-2 border rounded-md text-sm mb-2"
              >
                <option>3.8</option>
                <option>3.10</option>
                <option>3.11</option>
              </select>
              <label className="block text-sm font-medium text-gray-700">Data Size</label>
              <select
                value={stagingConfig.dataSize}
                onChange={(e) => setStagingConfig({ ...stagingConfig, dataSize: e.target.value })}
                className="w-full p-2 border rounded-md text-sm mb-2"
              >
                <option>Small (Mock)</option>
                <option>Medium (Sanitized)</option>
                <option>Large (Real)</option>
              </select>
              <label className="block text-sm font-medium text-gray-700">API Key</label>
              <select
                value={stagingConfig.apiKey}
                onChange={(e) => setStagingConfig({ ...stagingConfig, apiKey: e.target.value })}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option>Dev Key</option>
                <option>Staging Key</option>
                <option>Prod Key</option>
              </select>
            </div>
            {/* Prod Config (Read-only) */}
            <div className="p-4 bg-gray-50 rounded-md">
              <h4 className="text-md font-medium text-gray-800 mb-2">Production Environment (Fixed)</h4>
              <label className="block text-sm font-medium text-gray-700">OS</label>
              <input
                type="text"
                value={prodConfig.os}
                readOnly
                className="w-full p-2 border rounded-md text-sm mb-2 bg-gray-200"
              />
              <label className="block text-sm font-medium text-gray-700">Python Version</label>
              <input
                type="text"
                value={prodConfig.pythonVersion}
                readOnly
                className="w-full p-2 border rounded-md text-sm mb-2 bg-gray-200"
              />
              <label className="block text-sm font-medium text-gray-700">Data Size</label>
              <input
                type="text"
                value={prodConfig.dataSize}
                readOnly
                className="w-full p-2 border rounded-md text-sm mb-2 bg-gray-200"
              />
              <label className="block text-sm font-medium text-gray-700">API Key</label>
              <input
                type="text"
                value={prodConfig.apiKey}
                readOnly
                className="w-full p-2 border rounded-md text-sm bg-gray-200"
              />
            </div>
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h4 className="text-md font-medium text-gray-800 mb-2">Simulation Results</h4>
            {issues.length === 0 ? (
              <p className="text-sm text-green-600">No misalignment detected! Environments are well-aligned with production.</p>
            ) : (
              <div>
                <p className="text-sm text-red-600 mb-2">Misalignment Issues Detected:</p>
                <ul className="list-disc pl-5 text-sm text-red-600">
                  {issues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* PM Takeaways */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">PM Takeaways: Key Actions</h2>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <FaLock className="w-8 h-8 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900 ml-3">Actions for PMs</h3>
          </div>
          <ul className="list-disc pl-5 text-sm text-gray-600 mb-4">
            {pmTakeaways.map((takeaway, index) => (
              <li key={index}>{takeaway}</li>
            ))}
          </ul>
          <p className="text-sm text-gray-600">
            <strong>Why PMs Care:</strong> Ensuring environment alignment prevents production failures, reduces debugging time, and builds trust with engineering teams.
          </p>
        </div>

        {/* Final Guidance */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Final Guidance for PMs</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaRocket className="w-8 h-8 text-red-500" />
            <h3 className="text-xl font-semibold text-gray-900 ml-3">Why PMs Should Understand Environments</h3>
          </div>
          <p className="text-sm text-gray-600">
            As a PM, understanding Dev, Staging, and Prod environments allows you to:
            <ul className="list-disc pl-5 text-sm text-gray-600 mb-4">
              <li>Prevent production bugs by ensuring environment parity.</li>
              <li>Protect real user data by avoiding credential leaks.</li>
              <li>Improve QA accuracy with realistic staging data.</li>
              <li>Collaborate with DevOps to streamline deployments.</li>
              <li>Make informed decisions about testing and release timelines.</li>
            </ul>
            By mastering these concepts, you’ll reduce risks, enhance product quality, and drive successful launches.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentsExplained;