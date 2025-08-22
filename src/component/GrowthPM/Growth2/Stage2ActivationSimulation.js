import React, { useState } from 'react';
import { FaRocket,  FaToggleOn, FaToggleOff } from 'react-icons/fa';

const Stage2ActivationSimulation = () => {
  // Simulation state
  const [initialUsers, setInitialUsers] = useState(1000);
  const [complexity, setComplexity] = useState(5); // scale 1 (easy) - 10 (complex)
  const [simplifiedOnboarding, setSimplifiedOnboarding] = useState(false);
  const [gamification, setGamification] = useState(false);
  
  // Computed outputs
  const computeActivationRate = () => {
    // Start with a base activation rate of 50%
    let rate = 50;

    // Penalize if sign-up process is complex: 
    // For each point above 5, reduce 5%; for each point below 5, increase 2%
    if (complexity > 5) {
      rate -= (complexity - 5) * 5;
    } else if (complexity < 5) {
      rate += (5 - complexity) * 2;
    }
    
    // Bonuses for simplified onboarding and gamification
    if (simplifiedOnboarding) rate += 10;
    if (gamification) rate += 5;
    
    // Clamp the rate between 0 and 100
    return Math.max(0, Math.min(100, rate));
  };

  const computeTimeToFirstValue = () => {
    // Base time-to-first-value in minutes
    let time = 2;
    
    // Increase time if complexity is high: for each point above 5 add 0.5 minutes; below 5 subtract 0.2 minutes
    if (complexity > 5) {
      time += (complexity - 5) * 0.5;
    } else if (complexity < 5) {
      time -= (5 - complexity) * 0.2;
    }
    
    // Reduce time if simplified onboarding is enabled and if gamification is used
    if (simplifiedOnboarding) time -= 1;
    if (gamification) time -= 0.5;
    
    // Clamp minimum time to 0.5 minute
    return Math.max(0.5, time).toFixed(1);
  };

  const activationRate = computeActivationRate();
  const activatedUsers = Math.round(initialUsers * (activationRate / 100));
  const timeToFirstValue = computeTimeToFirstValue();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Explanation of Key Concepts */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 flex justify-center items-center">
          <FaRocket className="mr-2 text-blue-500" /> Stage 2: Activation Simulation
        </h1>
        <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
          In this stage, your goal is to turn new users into engaged users. That means helping them perform a key action—like completing a sign-up or onboarding process—as quickly and efficiently as possible.
          <br /><br />
          <strong>Key Metrics:</strong> <br />
          • <strong>Time-to-first-value:</strong> How long it takes users to complete the first meaningful action. <br />
          • <strong>Activation rate:</strong> The percentage of users who complete that action.
          <br /><br />
          <strong>Common Bottlenecks:</strong> Complicated sign-up, unclear onboarding guidance, or overwhelming design can slow you down.
          <br /><br />
          <strong>Optimization Strategies:</strong> Simplify onboarding (like a step-by-step guide), ask for minimal info first (progressive profiling), and gamify early actions (think of streaks or rewards).
        </p>
      </header>

      {/* Simulation Inputs */}
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Adjust the Simulation Settings</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Initial Number of New Users:
          </label>
          <input
            type="number"
            value={initialUsers}
            onChange={(e) => setInitialUsers(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Sign-Up Complexity (1 = very easy, 10 = very complex):
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={complexity}
            onChange={(e) => setComplexity(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-gray-600">Current Complexity: {complexity}</p>
        </div>
        
        <div className="mb-4 flex items-center">
          <label className="block text-gray-700 font-medium mr-4">
            Simplified Onboarding:
          </label>
          <button
            onClick={() => setSimplifiedOnboarding(!simplifiedOnboarding)}
            className="flex items-center justify-center w-12 h-8 rounded-full border border-gray-300 transition-colors"
          >
            {simplifiedOnboarding ? <FaToggleOn className="text-green-500 text-2xl" /> : <FaToggleOff className="text-gray-500 text-2xl" />}
          </button>
        </div>
        
        <div className="mb-4 flex items-center">
          <label className="block text-gray-700 font-medium mr-4">
            Gamification:
          </label>
          <button
            onClick={() => setGamification(!gamification)}
            className="flex items-center justify-center w-12 h-8 rounded-full border border-gray-300 transition-colors"
          >
            {gamification ? <FaToggleOn className="text-green-500 text-2xl" /> : <FaToggleOff className="text-gray-500 text-2xl" />}
          </button>
        </div>
      </div>

      {/* Simulation Results */}
      <div className="mt-8 bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Simulation Results</h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>
            <strong>Activation Rate:</strong> {activationRate}% 
          </li>
          <li>
            <strong>Number of Activated Users:</strong> {activatedUsers} out of {initialUsers}
          </li>
          <li>
            <strong>Average Time-to-First-Value:</strong> {timeToFirstValue} minutes
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Stage2ActivationSimulation;
