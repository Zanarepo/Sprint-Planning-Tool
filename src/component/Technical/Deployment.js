import { useState } from 'react';
import { FaRocket, FaCodeBranch, FaShieldAlt, FaUndo, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const deploymentComparison = [
  {
    useCase: 'Early MVP (2 devs, 1 prod server)',
    manual: '✅ OK',
    automated: 'Not critical'
  },
  {
    useCase: 'Growing app (weekly features)',
    manual: '❌ Risky',
    automated: '✅ Recommended'
  },
  {
    useCase: 'Large-scale SaaS (daily deploys)',
    manual: '❌ Impossible',
    automated: '✅ Required'
  },
  {
    useCase: 'App with sensitive data (health, finance)',
    manual: '❌ Too risky',
    automated: '✅ Essential with tests'
  }
];

const testTypes = [
  {
    type: 'Unit Tests',
    description: 'Each function works correctly'
  },
  {
    type: 'Integration',
    description: 'Systems work together as expected'
  },
  {
    type: 'End-to-End',
    description: 'The whole app flow works (e.g., login to checkout)'
  },
  {
    type: 'Security',
    description: 'Known vulnerabilities are not introduced'
  }
];


const tools = [
  {
    purpose: 'CI/CD Pipelines',
    examples: 'GitHub Actions, GitLab CI/CD, Jenkins, CircleCI'
  },
  {
    purpose: 'Testing',
    examples: 'Jest, Mocha, Pytest, Cypress, Selenium'
  },
  {
    purpose: 'Deployment Platforms',
    examples: 'Vercel, Netlify, Heroku, AWS CodeDeploy'
  },
  {
    purpose: 'Monitoring / Rollbacks',
    examples: 'Sentry, Datadog, LaunchDarkly'
  }
];

const DeploymentAndCICD = () => {
  // State for CI/CD simulation
  const [deploymentType, setDeploymentType] = useState('Manual');
  const [testAutomation, setTestAutomation] = useState(false);
  const [rollbackEnabled, setRollbackEnabled] = useState(false);
  const [releaseFrequency, setReleaseFrequency] = useState('Weekly');
  const [simulateDeploy, setSimulateDeploy] = useState(false);

  // Simulation logic
  const calculateSimulationResults = () => {
    let successRate = 80; // Base success rate (%)
    let deployTime = 30; // Base deploy time (minutes)
    let errorImpact = 'Moderate';
    let message = '';

    if (deploymentType === 'Automated') {
      successRate += 15;
      deployTime -= 20;
      errorImpact = 'Low';
      message = 'Automated deployment reduces errors and speeds up releases.';
    } else {
      message = 'Manual deployment is prone to human error and slower.';
    }

    if (testAutomation) {
      successRate += 5;
      deployTime += 5; // Tests add slight overhead
      errorImpact = errorImpact === 'Low' ? 'Minimal' : 'Low';
      message += ' Automated tests catch issues early, improving quality.';
    } else {
      message += ' Without tests, bugs may reach production.';
    }

    if (rollbackEnabled) {
      errorImpact = 'Minimal';
      message += ' Rollback ensures quick recovery from failures.';
    } else {
      message += ' No rollback increases downtime risk if deployment fails.';
    }

    if (releaseFrequency === 'Daily') {
      deployTime += 5;
      successRate -= 5;
      message += ' Daily releases increase complexity but speed up feedback.';
    } else if (releaseFrequency === 'Monthly') {
      deployTime += 10;
      successRate += 5;
      message += ' Monthly releases are safer but slower to deliver features.';
    }

    return {
      successRate: Math.min(successRate, 100),
      deployTime: Math.max(deployTime, 5),
      errorImpact,
      message
    };
  };

  const simulationResults = calculateSimulationResults();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-6">
          Deployment & CI/CD Pipelines In-Depth
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          As a Product Manager, understanding deployment and CI/CD pipelines helps you manage release schedules, ensure product quality, and mitigate risks during updates.
        </p>

        {/* Overview */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Are Deployment & CI/CD?</h2>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <FaRocket className="w-8 h-8 text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-900 ml-3">Deployment</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Deployment is pushing code (new features, fixes, or updates) to a live environment for users. It can be <strong>manual</strong> (engineers run commands) or <strong>automated</strong> (handled by pipelines).
          </p>
          <div className="flex items-center mb-4">
            <FaCodeBranch className="w-8 h-8 text-green-500" />
            <h3 className="text-xl font-semibold text-gray-900 ml-3">CI/CD</h3>
          </div>
          <p className="text-sm text-gray-600">
            <strong>Continuous Integration (CI):</strong> Automatically tests and integrates code changes on every commit.<br />
            <strong>Continuous Delivery (CD):</strong> Prepares code for release, requiring manual approval.<br />
            <strong>Continuous Deployment (CD):</strong> Automatically releases code to production after passing tests.<br />
            CI/CD ensures speed, safety, and automation in software delivery.
          </p>
        </div>

        {/* Key Questions */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Questions for PMs</h2>
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <FaRocket className="w-8 h-8 text-purple-500" />
              <h3 className="text-xl font-semibold text-gray-900 ml-3">Manual or Automated Deployments?</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2"><strong>Manual:</strong> Engineers deploy via scripts. Risky, slow, error-prone. Best for small MVPs.</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Automated:</strong> Tools like GitHub Actions or CircleCI deploy after tests/approvals. Fast, safe, scalable.</p>
            <p className="text-sm text-gray-600"><strong>Why PMs Care:</strong> Automation speeds up releases and reduces errors, critical for frequent updates.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <FaUndo className="w-8 h-8 text-red-500" />
              <h3 className="text-xl font-semibold text-gray-900 ml-3">How Do We Roll Back?</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2"><strong>Rollback:</strong> Reverts to the last working version if a deploy fails.</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Strategies:</strong> Blue/Green (run old/new versions), Canary (small % rollout).</p>
            <p className="text-sm text-gray-600"><strong>Example:</strong> A payment bug affects 5% of users. Canary rollback limits damage in 30 seconds.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <FaCheckCircle className="w-8 h-8 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900 ml-3">Are Tests Automated?</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">Automated tests catch bugs before production.</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Types:</strong> Unit, Integration, End-to-End, Security.</p>
            <p className="text-sm text-gray-600"><strong>Example:</strong> E2E tests catch a signup 500 error, preventing a bad release.</p>
          </div>
        </div>

        {/* Use Case Comparison */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Manual vs. Automated CI/CD</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm text-left text-gray-600 bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 font-medium">Use Case</th>
                <th className="px-4 py-2 font-medium">Manual Deploy</th>
                <th className="px-4 py-2 font-medium">Automated CI/CD</th>
              </tr>
            </thead>
            <tbody>
              {deploymentComparison.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{row.useCase}</td>
                  <td className="px-4 py-2">{row.manual}</td>
                  <td className="px-4 py-2">{row.automated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Test Types */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types of Automated Tests</h2>
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {testTypes.map((test, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <FaCheckCircle className="w-6 h-6 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-900 ml-3">{test.type}</h3>
              </div>
              <p className="text-sm text-gray-600">{test.description}</p>
            </div>
          ))}
        </div>

        {/* Tools */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Common CI/CD Tools</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm text-left text-gray-600 bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 font-medium">Purpose</th>
                <th className="px-4 py-2 font-medium">Tools</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{tool.purpose}</td>
                  <td className="px-4 py-2">{tool.examples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CI/CD Simulation */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Interactive CI/CD Pipeline Simulation</h2>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <FaShieldAlt className="w-8 h-8 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900 ml-3">Simulate a CI/CD Pipeline</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Experiment with deployment settings to see how they affect success rate, deploy time, and error impact. This simulation mimics a CI/CD pipeline.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Deployment Type</label>
              <select
                value={deploymentType}
                onChange={(e) => setDeploymentType(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option>Manual</option>
                <option>Automated</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Release Frequency</label>
              <select
                value={releaseFrequency}
                onChange={(e) => setReleaseFrequency(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={testAutomation}
                  onChange={(e) => setTestAutomation(e.target.checked)}
                  className="mr-2"
                />
                Enable Automated Testing
              </label>
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={rollbackEnabled}
                  onChange={(e) => setRollbackEnabled(e.target.checked)}
                  className="mr-2"
                />
                Enable Rollback
              </label>
            </div>
          </div>
          <button
            onClick={() => setSimulateDeploy(!simulateDeploy)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Run Simulation
          </button>
          {simulateDeploy && (
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h4 className="text-md font-medium text-gray-800 mb-2">Simulation Results</h4>
              <p className="text-sm text-gray-600"><strong>Deployment Type:</strong> {deploymentType}</p>
              <p className="text-sm text-gray-600"><strong>Release Frequency:</strong> {releaseFrequency}</p>
              <p className="text-sm text-gray-600"><strong>Test Automation:</strong> {testAutomation ? 'Enabled' : 'Disabled'}</p>
              <p className="text-sm text-gray-600"><strong>Rollback:</strong> {rollbackEnabled ? 'Enabled' : 'Disabled'}</p>
              <p className="text-sm text-gray-600"><strong>Success Rate:</strong> {simulationResults.successRate}%</p>
              <p className="text-sm text-gray-600"><strong>Deploy Time:</strong> {simulationResults.deployTime} minutes</p>
              <p className="text-sm text-gray-600"><strong>Error Impact:</strong> {simulationResults.errorImpact}</p>
              <p className="text-sm text-gray-600 mt-2">{simulationResults.message}</p>
              {simulationResults.successRate < 90 && (
                <p className="text-sm text-red-600 mt-2 flex items-center">
                  <FaExclamationTriangle className="w-4 h-4 mr-1" />
                  Warning: Low success rate may lead to production issues.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Final Guidance */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why PMs Should Understand CI/CD</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaRocket className="w-8 h-8 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900 ml-3">Final Guidance for PMs</h3>
          </div>
          <p className="text-sm text-gray-600">
            As a PM, understanding deployment and CI/CD pipelines enables you to:
            <ul className="list-disc pl-5 text-sm text-gray-600 mb-4">
              <li>Accelerate feature releases with automated pipelines.</li>
              <li>Ensure product quality through automated testing.</li>
              <li>Mitigate risks with rollback strategies.</li>
              <li>Coordinate with engineering for smoother launches.</li>
              <li>Communicate release status confidently to stakeholders.</li>
            </ul>
            By grasping these concepts, you’ll drive faster, safer, and more reliable product updates, earning trust from technical teams.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeploymentAndCICD;