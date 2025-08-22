import React, { useState } from 'react';
import { FaRegLightbulb, FaChalkboardTeacher, FaUsers, FaTools, FaHandshake } from 'react-icons/fa';

const WorkshopSimulation = () => {
  // Define the simulation steps
  const steps = [
    {
      title: "Customer Feedback",
      description: "Users want an easier way to check their account balances on a mobile banking app. As a PM, you start by understanding this critical customer need.",
      icon: <FaRegLightbulb className="text-yellow-500" size={32} />
    },
    {
      title: "Translate Requirements",
      description: "Translate the customer feedback into clear, actionable requirements. Explain what the customers need and how it aligns with the business goals.",
      icon: <FaChalkboardTeacher className="text-blue-500" size={32} />
    },
    {
      title: "Facilitate Communication",
      description: "Set up a workshop where designers present layout ideas and engineers share technical constraints. Ensure everyone understands the customer needs.",
      icon: <FaUsers className="text-green-500" size={32} />
    },
    {
      title: "Prioritize Tasks",
      description: "With both teams on board, work together to prioritize which features to build first. Focus on quick wins that provide immediate value while planning for major projects.",
      icon: <FaTools className="text-red-500" size={32} />
    },
    {
      title: "Consensus & Outcome",
      description: "After thorough discussion, the teams reach a consensus on a solution that balances user-friendliness and technical feasibility. You have successfully bridged the gap!",
      icon: <FaHandshake className="text-purple-500" size={32} />
    }
  ];

  const [stepIndex, setStepIndex] = useState(0);

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center space-y-8">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold text-indigo-600">Workshop Simulation</h1>
        <p className="mt-2 text-gray-700 max-w-2xl">
          Simulate the process of working with Engineering and Design teams. Experience your role as the PM bridging business goals and technical execution.
        </p>
      </header>

      {/* Simulation Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full">
        <div className="flex items-center gap-4 mb-4">
          {steps[stepIndex].icon}
          <h2 className="text-2xl font-semibold text-gray-800">{steps[stepIndex].title}</h2>
        </div>
        <p className="text-gray-700 mb-6">{steps[stepIndex].description}</p>
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={stepIndex === 0}
            className={`px-4 py-2 rounded ${
              stepIndex === 0 ? "bg-gray-300" : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={stepIndex === steps.length - 1}
            className={`px-4 py-2 rounded ${
              stepIndex === steps.length - 1 ? "bg-gray-300" : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {stepIndex === steps.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkshopSimulation;
