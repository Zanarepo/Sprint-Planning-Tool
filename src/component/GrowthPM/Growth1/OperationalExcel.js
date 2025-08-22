import React, { useState } from 'react';
import { FaCogs, FaRobot } from 'react-icons/fa';

const OperationalExcellence = () => {
  const [totalTasks, setTotalTasks] = useState('');
  const [automationRate, setAutomationRate] = useState(50); // default 50%
  const [automatedTasks, setAutomatedTasks] = useState(null);

  // Calculate the number of tasks automated based on the input and automation rate
  const calculateAutomation = () => {
    const total = Number(totalTasks);
    const automated = Math.round((automationRate / 100) * total);
    setAutomatedTasks(automated);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center mb-6">
          <FaCogs className="text-4xl text-indigo-500 mr-4" />
          <h1 className="text-3xl font-bold text-gray-800">Operational Excellence</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Operational Excellence is about optimizing internal processes to ensure efficient product iterations and scalability.
          It involves streamlining workflows, reducing waste, and continuously improving operations.
        </p>

        {/* Real-Time Use Case */}
        <div className="bg-gray-50 p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Real-Time Use Case: Streamlining Workflows with Automation Tools
          </h2>
          <p className="text-gray-600 mb-4">
            Imagine a development team that manually handles a large volume of repetitive tasks.
            By integrating automation tools, these tasks can be handled efficiently, freeing up time for higher-value work.
          </p>

          {/* Simulation: Automation Impact on Workflow */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Enter total number of manual tasks per week:
            </label>
            <input
              type="number"
              value={totalTasks}
              onChange={(e) => setTotalTasks(e.target.value)}
              placeholder="e.g., 100"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Automation Effectiveness (%):
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={automationRate}
              onChange={(e) => setAutomationRate(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-gray-700">{automationRate}%</span>
          </div>

          <button
            onClick={calculateAutomation}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Calculate Automated Tasks
          </button>

          {automatedTasks !== null && (
            <div className="mt-4 p-4 bg-white border-l-4 border-blue-500 rounded">
              <p className="text-xl font-semibold text-gray-800 flex items-center">
                <FaRobot className="mr-2 text-blue-500" />
                {automatedTasks} out of {totalTasks} tasks can be automated!
              </p>
              <p className="text-gray-600">
                This simulation demonstrates how increasing automation effectiveness can significantly reduce manual workload,
                thus streamlining workflows and boosting overall efficiency.
              </p>
            </div>
          )}
        </div>

        {/* Additional Explanation */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Benefits of Operational Excellence
          </h2>
          <ul className="list-disc ml-6 text-gray-600">
            <li>
              <strong>Efficiency:</strong> Automating repetitive tasks saves time and reduces errors.
            </li>
            <li>
              <strong>Scalability:</strong> Streamlined processes allow teams to scale operations without linear increases in resources.
            </li>
            <li>
              <strong>Cost Reduction:</strong> Reduced manual labor and improved workflows decrease operational costs.
            </li>
            <li>
              <strong>Innovation:</strong> Teams have more time to focus on strategic, creative, and high-impact initiatives.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OperationalExcellence;
