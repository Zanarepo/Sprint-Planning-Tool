import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';

const tasks = [
  'Data Collection',
  'Data Processing',
  'Data Analysis',
  'Report Generation',
  'Email Notification',
];

const AutomationSimulation = () => {
  const [currentTask, setCurrentTask] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && currentTask < tasks.length) {
      // simulate each task completion after 1.5 seconds
      timer = setTimeout(() => {
        setCurrentTask((prev) => prev + 1);
      }, 1500);
    } else if (currentTask === tasks.length) {
      setIsRunning(false);
    }
    return () => clearTimeout(timer);
  }, [isRunning, currentTask]);

  const startAutomation = () => {
    setCurrentTask(0);
    setIsRunning(true);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Workflow Automation Simulation</h2>
      <p className="text-gray-700 mb-6">
        Click "Start Automation" to simulate a workflow automation process. Each task will be automatically completed one after the other.
      </p>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div key={index} className="flex items-center space-x-4">
            {index < currentTask ? (
              <FaCheckCircle className="text-green-500 text-2xl" />
            ) : index === currentTask && isRunning ? (
              <FaSpinner className="text-blue-500 text-2xl animate-spin" />
            ) : (
              <div className="w-8 h-8 border border-gray-300 rounded-full" />
            )}
            <span className={`text-lg ${index < currentTask ? 'text-gray-800' : 'text-gray-500'}`}>
              {task}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={startAutomation}
          disabled={isRunning}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition"
        >
          Start Automation
        </button>
      </div>
    </div>
  );
};

export default AutomationSimulation;
