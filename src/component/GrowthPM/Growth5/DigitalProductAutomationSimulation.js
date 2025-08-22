import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaSpinner, FaRegCircle, FaUserPlus, FaChartLine } from 'react-icons/fa';

const onboardingTasks = [
  {
    name: 'User Sign-Up',
    duration: 2000,
    description: 'User completes the registration form.',
  },
  {
    name: 'Email Verification',
    duration: 3000,
    description: 'System sends a verification email and user confirms.',
  },
  {
    name: 'Onboarding Tutorial',
    duration: 2500,
    description: 'User is guided through a product tour.',
  },
  {
    name: 'Account Setup',
    duration: 2000,
    description: 'User configures account settings and preferences.',
  },
  {
    name: 'Engagement Follow-Up',
    duration: 1500,
    description: 'System sends a welcome message and tips for engagement.',
  },
];

const DigitalProductAutomationSimulation = () => {
  const [currentTask, setCurrentTask] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [insights, setInsights] = useState('');

  // Start the simulation
  const startSimulation = () => {
    setCurrentTask(0);
    setIsRunning(true);
    setStartTime(Date.now());
    setEndTime(null);
    setInsights('');
  };

  useEffect(() => {
    let timer;
    if (isRunning && currentTask >= 0 && currentTask < onboardingTasks.length) {
      timer = setTimeout(() => {
        setCurrentTask((prev) => prev + 1);
      }, onboardingTasks[currentTask].duration);
    } else if (isRunning && currentTask === onboardingTasks.length) {
      setIsRunning(false);
      setEndTime(Date.now());
    }
    return () => clearTimeout(timer);
  }, [isRunning, currentTask]);

  useEffect(() => {
    if (endTime && startTime) {
      const totalTime = ((endTime - startTime) / 1000).toFixed(2);
      setInsights(
        `Automation complete! Total process time: ${totalTime} seconds. 
         Automating user onboarding reduces manual effort and ensures a consistent, engaging experience for every new user.`
      );
    }
  }, [endTime, startTime]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <FaUserPlus className="mr-2 text-blue-500" /> Digital Product Onboarding Automation
        </h2>
        <p className="text-gray-700 mb-6">
          In this simulation, we automate the user onboarding process. Click "Start Onboarding" to see how the system takes a new user through sign-up, verification, a product tour, account setup, and engagement follow-up.
        </p>
        {!isRunning && currentTask < onboardingTasks.length && (
          <div className="text-center mb-6">
            <button
              onClick={startSimulation}
              className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Start Onboarding
            </button>
          </div>
        )}
        <div className="space-y-4">
          {onboardingTasks.map((task, index) => (
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
              {/* Display a progress bar for the current task */}
              {index === currentTask && isRunning && (
                <div className="mt-2 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-green-500 rounded-full animate-pulse"
                    style={{ width: '100%' }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Display insights once the simulation completes */}
        {!isRunning && currentTask === onboardingTasks.length && insights && (
          <div className="mt-6 p-4 bg-blue-100 rounded-lg border border-blue-300">
            <p className="text-blue-800 text-lg flex items-center">
              <FaChartLine className="mr-2" />
              {insights}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalProductAutomationSimulation;
