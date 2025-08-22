import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaSpinner, FaRegCircle, FaInfoCircle } from 'react-icons/fa';

const tasks = [
  { name: 'Data Ingestion', duration: 2000, description: 'Collecting raw data from various sources.' },
  { name: 'Data Processing', duration: 3000, description: 'Cleaning and transforming data into usable formats.' },
  { name: 'Data Analysis', duration: 2500, description: 'Running analytics to extract insights.' },
  { name: 'Report Generation', duration: 2000, description: 'Compiling analysis into a report.' },
  { name: 'Notification Dispatch', duration: 1500, description: 'Sending notifications with the report.' },
];

const RobustAutomationSimulation = () => {
  const [currentTask, setCurrentTask] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [insights, setInsights] = useState('');

  // Start simulation: reset states and start from first task
  const startSimulation = () => {
    setCurrentTask(0);
    setIsRunning(true);
    setStartTime(Date.now());
    setEndTime(null);
    setInsights('');
  };

  useEffect(() => {
    let timer;
    if (isRunning && currentTask >= 0 && currentTask < tasks.length) {
      // Wait for the current task's duration before moving to the next task
      timer = setTimeout(() => {
        setCurrentTask((prev) => prev + 1);
      }, tasks[currentTask].duration);
    } else if (isRunning && currentTask === tasks.length) {
      // When all tasks are complete, stop the simulation and generate insights
      setIsRunning(false);
      setEndTime(Date.now());
    }
    return () => clearTimeout(timer);
  }, [isRunning, currentTask]);

  useEffect(() => {
    if (endTime && startTime) {
      const totalDuration = ((endTime - startTime) / 1000).toFixed(2);
      // Generate insights (in a real-world scenario these could be dynamic based on metrics)
      setInsights(
        `Automation complete! Total time taken: ${totalDuration} seconds. 
        Automation saves hours of manual work by streamlining repetitive tasks.`
      );
    }
  }, [endTime, startTime]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <FaInfoCircle className="mr-2 text-blue-500" /> Robust Automation Simulation
        </h2>
        <p className="text-gray-700 mb-6">
          This simulation demonstrates a workflow automation process step-by-step. Click the button below to start the automation.
        </p>
        {!isRunning && currentTask < tasks.length && (
          <div className="text-center mb-6">
            <button
              onClick={startSimulation}
              className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Start Automation
            </button>
          </div>
        )}
        {/* Display the list of tasks with their statuses */}
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {index < currentTask ? (
                    <FaCheckCircle className="text-green-500 text-2xl" />
                  ) : index === currentTask && isRunning ? (
                    <FaSpinner className="text-blue-500 text-2xl animate-spin" />
                  ) : (
                    <FaRegCircle className="text-gray-400 text-2xl" />
                  )}
                  <span className="text-xl font-medium text-gray-800">{task.name}</span>
                </div>
                <span className="text-sm text-gray-600">{task.description}</span>
              </div>
              {/* Progress bar for current task */}
              {index === currentTask && isRunning && (
                <div className="mt-2 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-500 rounded-full animate-pulse"
                    style={{ width: '100%' }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Insights after automation completes */}
        {!isRunning && currentTask === tasks.length && insights && (
          <div className="mt-6 p-4 bg-green-100 rounded-lg border border-green-300">
            <p className="text-green-800 text-lg">{insights}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RobustAutomationSimulation;
