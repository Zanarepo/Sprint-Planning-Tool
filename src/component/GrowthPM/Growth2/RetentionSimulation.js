import React, { useState } from 'react';
import { FaUserCheck, FaChartLine } from 'react-icons/fa';

const RetentionSimulation = () => {
  // Base churn rate in percentage (e.g., 25%)
  const baseChurn = 25;
  
  // State for sliders: value between 0 and 100
  const [habit, setHabit] = useState(50); // Habit-forming features
  const [personalization, setPersonalization] = useState(50); // Personalization score
  const [reengagement, setReengagement] = useState(50); // Re-engagement actions

  // Calculate reduction factors:
  // Habit-forming features can reduce churn by up to 10%
  // Personalization can reduce churn by up to 5%
  // Re-engagement can reduce churn by up to 5%
  const habitImpact = (habit / 100) * 10;
  const personalizationImpact = (personalization / 100) * 5;
  const reengagementImpact = (reengagement / 100) * 5;

  let predictedChurn = baseChurn - habitImpact - personalizationImpact - reengagementImpact;
  // Ensure churn doesn't go below 5%
  predictedChurn = Math.max(predictedChurn, 5);
  
  // Compute a simple predicted DAU increase relative to churn reduction
  // This is a simplification for simulation purposes.
  const predictedRetentionGain = ((baseChurn - predictedChurn) / baseChurn) * 100;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
            <FaUserCheck className="mr-2 text-green-500" /> Retention Strategy Simulator
          </h1>
          <p className="text-gray-600 mt-2">
            Adjust the sliders to simulate the impact of various retention strategies.
          </p>
        </header>

        {/* Simulation Parameters */}
        <div className="space-y-6">
          <div>
            <label className="block text-gray-800 font-medium">
              Habit-Forming Features ({habit}%)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={habit}
              onChange={(e) => setHabit(Number(e.target.value))}
              className="w-full mt-1"
            />
            <p className="text-gray-600 text-sm">
              Increase features like autoplay or content queues to build user habits.
            </p>
          </div>

          <div>
            <label className="block text-gray-800 font-medium">
              Personalization ({personalization}%)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={personalization}
              onChange={(e) => setPersonalization(Number(e.target.value))}
              className="w-full mt-1"
            />
            <p className="text-gray-600 text-sm">
              Tailor content and recommendations to each user's interests.
            </p>
          </div>

          <div>
            <label className="block text-gray-800 font-medium">
              Re-engagement Efforts ({reengagement}%)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={reengagement}
              onChange={(e) => setReengagement(Number(e.target.value))}
              className="w-full mt-1"
            />
            <p className="text-gray-600 text-sm">
              Use email or push notifications to re-engage users.
            </p>
          </div>
        </div>

        {/* Simulation Results */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
            <FaChartLine className="mr-2 text-blue-500" /> Simulation Results
          </h2>
          <p className="text-gray-700 mt-2">
            <strong>Base Churn Rate:</strong> {baseChurn}%
          </p>
          <p className="text-gray-700 mt-1">
            <strong>Predicted Churn Rate:</strong> {predictedChurn.toFixed(1)}%
          </p>
          <p className="text-gray-700 mt-1">
            <strong>Predicted Retention Gain:</strong> {predictedRetentionGain.toFixed(1)}% improvement
          </p>
          <p className="text-gray-600 mt-4">
            As you increase these retention strategies, your predicted churn rate decreases, indicating improved retention. This simulation shows how habit-forming features, personalization, and re-engagement efforts can work together to keep users active.
          </p>
        </div>

        {/* Call-to-Action */}
        <div className="mt-6 text-center">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Save Simulation Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default RetentionSimulation;
