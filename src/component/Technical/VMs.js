import { useState } from 'react';
import { FaServer, FaMicrochip, FaMemory, FaHdd, FaCloud, FaDollarSign } from 'react-icons/fa';

const vmTypes = [
  {
    type: 'General Purpose',
    description: 'Balanced CPU, RAM',
    useCases: 'Web apps, APIs, small DBs',
    cloudExamples: 'AWS t3, Azure B-series, GCP e2',
    costFactor: 1,
    performanceFactor: 1
  },
  {
    type: 'Compute Optimized',
    description: 'High CPU-to-RAM ratio',
    useCases: 'Batch processing, media transcoding',
    cloudExamples: 'AWS c7, GCP c2',
    costFactor: 1.5,
    performanceFactor: 1.8
  },
  {
    type: 'Memory Optimized',
    description: 'High RAM-to-CPU ratio',
    useCases: 'In-memory DBs, ML models',
    cloudExamples: 'AWS r7, Azure E-series',
    costFactor: 1.7,
    performanceFactor: 1.5
  },
  {
    type: 'GPU VMs',
    description: 'Equipped with graphics cards',
    useCases: 'AI/ML, video rendering',
    cloudExamples: 'AWS p5, GCP a2',
    costFactor: 3,
    performanceFactor: 2.5
  },
  {
    type: 'Storage Optimized',
    description: 'Fast local storage',
    useCases: 'Big data, high I/O apps',
    cloudExamples: 'AWS i4, Azure Lsv2',
    costFactor: 2,
    performanceFactor: 1.6
  },
  {
    type: 'Spot Instances',
    description: '90% cheaper, not guaranteed uptime',
    useCases: 'Background jobs, dev testing',
    cloudExamples: 'AWS Spot, GCP Preemptible',
    costFactor: 0.3,
    performanceFactor: 0.9
  },
  {
    type: 'Serverless/Autoscaling',
    description: 'Managed services, no VM config',
    useCases: 'Modern web APIs, microservices',
    cloudExamples: 'AWS Lambda, GCP Cloud Run',
    costFactor: 1.2,
    performanceFactor: 1.4
  }
];

const whenToUse = [
  { scenario: 'MVP or early-stage product', strategy: 'General purpose small VM (cost-efficient)' },
  { scenario: 'Image or video processing backend', strategy: 'Compute-optimized or GPU VM' },
  { scenario: 'ML model training', strategy: 'GPU VM (NVIDIA preferred)' },
  { scenario: 'Low-traffic internal dashboard', strategy: 'Small instance or spot instance' },
  { scenario: 'Large-scale analytics DB', strategy: 'Memory-optimized or storage-optimized' },
  { scenario: 'Cost control for dev/test', strategy: 'Spot instances or smaller VMs' },
  { scenario: 'Apps with unpredictable traffic', strategy: 'Autoscaling setup or serverless' }
];

const VirtualMachinesInDepth = () => {
  // State for VM simulation
  const [cpuCores, setCpuCores] = useState(2);
  const [ramGB, setRamGB] = useState(4);
  const [os, setOs] = useState('Ubuntu');
  const [vmType, setVmType] = useState('General Purpose');
  const [workload, setWorkload] = useState('Web App');

  // Calculate cost and performance based on simulation inputs
  const selectedVm = vmTypes.find((type) => type.type === vmType);
  const baseCost = 0.05; // Base cost per CPU core per hour
  const basePerformance = 10; // Base performance units
  const cost = (cpuCores * baseCost * (ramGB / 4) * selectedVm.costFactor).toFixed(2);
  const performance = (cpuCores * (ramGB / 4) * selectedVm.performanceFactor * basePerformance).toFixed(0);
  const isOverProvisioned = ramGB > 16 || cpuCores > 8;
  const isUnderProvisioned = ramGB < 2 || cpuCores < 1;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-6">
          Virtual Machines (VMs) In-Depth for Product Managers
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Virtual Machines are the backbone of cloud computing. As a PM, understanding VMs helps you optimize costs, performance, and scalability while collaborating with engineering teams.
        </p>

        {/* VM Overview */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Are Virtual Machines?</h2>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <FaServer className="w-8 h-8 text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-900 ml-3">Virtual Machines (VMs)</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            A Virtual Machine is a software-based emulation of a physical computer running in the cloud. It has its own CPU, memory (RAM), storage, and operating system, but runs on a shared physical host in a data center.
          </p>
          <p className="text-sm text-gray-600">
            <strong>Why PMs Care:</strong> VMs impact your product’s performance, cost, and scalability. Knowing their specs helps you make informed decisions about resource allocation and deployment strategies.
          </p>
        </div>

        {/* Key Questions */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Questions to Ask About VMs</h2>
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <FaMicrochip className="w-8 h-8 text-green-500" />
              <h3 className="text-xl font-semibold text-gray-900 ml-3">What Kind of VM Are We Using?</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Understand the resources your app consumes:
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-600 mb-2">
              <li><strong>CPU:</strong> Determines processing speed (e.g., video rendering, AI).</li>
              <li><strong>RAM:</strong> Handles data volume (e.g., caching, datasets).</li>
              <li><strong>OS:</strong> Ensures compatibility (e.g., .NET on Windows, Node.js on Linux).</li>
            </ul>
            <p className="text-sm text-gray-600">
              <strong>Example:</strong> A fintech analytics tool might use an 8-core CPU, 32GB RAM, and Ubuntu for a Python + PostgreSQL stack.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <FaMemory className="w-8 h-8 text-purple-500" />
              <h3 className="text-xl font-semibold text-gray-900 ml-3">Is It Over- or Under-Provisioned?</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Provisioning determines resource allocation:
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-600 mb-2">
              <li><strong>Over-provisioned:</strong> Wastes money (e.g., 32GB RAM but using 3GB).</li>
              <li><strong>Under-provisioned:</strong> Causes crashes or slowdowns (e.g., maxed CPU during peak traffic).</li>
            </ul>
            <p className="text-sm text-gray-600">
              <strong>Example:</strong> A staging server with 32GB RAM using only 3GB is over-provisioned, while a production server maxing out CPU is under-provisioned.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <FaDollarSign className="w-8 h-8 text-red-500" />
              <h3 className="text-xl font-semibold text-gray-900 ml-3">Can We Switch to a More Cost-Efficient Type?</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Different VM types are optimized for specific workloads, saving money and boosting performance.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Why PMs Care:</strong> Choosing the right VM type aligns costs with product needs, avoiding overspending or performance bottlenecks.
            </p>
          </div>
        </div>

        {/* VM Types Table */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types of VMs and When to Use Them</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm text-left text-gray-600 bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 font-medium">VM Type</th>
                <th className="px-4 py-2 font-medium">Description</th>
                <th className="px-4 py-2 font-medium">Use Cases</th>
                <th className="px-4 py-2 font-medium">Cloud Examples</th>
              </tr>
            </thead>
            <tbody>
              {vmTypes.map((vm, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{vm.type}</td>
                  <td className="px-4 py-2">{vm.description}</td>
                  <td className="px-4 py-2">{vm.useCases}</td>
                  <td className="px-4 py-2">{vm.cloudExamples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* When to Use Table */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">When to Use Each VM Type</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm text-left text-gray-600 bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 font-medium">Scenario</th>
                <th className="px-4 py-2 font-medium">VM Type or Strategy</th>
              </tr>
            </thead>
            <tbody>
              {whenToUse.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{row.scenario}</td>
                  <td className="px-4 py-2">{row.strategy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* VM Simulation */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Interactive VM Simulation</h2>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <FaHdd className="w-8 h-8 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900 ml-3">Simulate a VM Configuration</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Experiment with CPU, RAM, OS, VM type, and workload to see how they affect cost and performance. This simulation shows how VMs work in the cloud.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">CPU Cores</label>
              <input
                type="range"
                min="1"
                max="16"
                value={cpuCores}
                onChange={(e) => setCpuCores(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-sm text-gray-600">{cpuCores} cores</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">RAM (GB)</label>
              <input
                type="range"
                min="2"
                max="64"
                step="2"
                value={ramGB}
                onChange={(e) => setRamGB(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-sm text-gray-600">{ramGB} GB</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Operating System</label>
              <select
                value={os}
                onChange={(e) => setOs(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option>Ubuntu</option>
                <option>Windows</option>
                <option>CentOS</option>
                <option>Debian</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">VM Type</label>
              <select
                value={vmType}
                onChange={(e) => setVmType(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                {vmTypes.map((vm) => (
                  <option key={vm.type}>{vm.type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Workload</label>
              <select
                value={workload}
                onChange={(e) => setWorkload(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option>Web App</option>
                <option>API</option>
                <option>Database</option>
                <option>Video Processing</option>
                <option>ML Model</option>
              </select>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h4 className="text-md font-medium text-gray-800 mb-2">Simulation Results</h4>
            <p className="text-sm text-gray-600"><strong>VM Configuration:</strong> {cpuCores} CPU cores, {ramGB} GB RAM, {os}, {vmType}</p>
            <p className="text-sm text-gray-600"><strong>Workload:</strong> {workload}</p>
            <p className="text-sm text-gray-600"><strong>Estimated Cost:</strong> ${cost}/hour</p>
            <p className="text-sm text-gray-600"><strong>Performance Score:</strong> {performance} units</p>
            {isOverProvisioned && (
              <p className="text-sm text-red-600 mt-2">Warning: Over-provisioned! You're using more resources than needed, wasting money.</p>
            )}
            {isUnderProvisioned && (
              <p className="text-sm text-red-600 mt-2">Warning: Under-provisioned! Insufficient resources may cause crashes or slowdowns.</p>
            )}
          </div>
        </div>

        {/* Final Guidance */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why PMs Should Understand VMs</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaCloud className="w-8 h-8 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900 ml-3">Final Guidance for PMs</h3>
          </div>
          <p className="text-sm text-gray-600">
            As a PM, understanding VMs empowers you to:
            <ul className="list-disc pl-5 text-sm text-gray-600 mb-4">
              <li>Optimize costs by selecting the right VM type and size.</li>
              <li>Ensure performance by avoiding under-provisioning.</li>
              <li>Plan scalability for peak traffic or growth.</li>
              <li>Collaborate with DevOps to align infrastructure with product needs.</li>
              <li>Ask smart questions like: “Is this VM cost-efficient?” or “Can we use spot instances for testing?”</li>
            </ul>
            By grasping VM basics, you’ll make data-driven decisions, earn engineering trust, and drive your product’s success.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VirtualMachinesInDepth;