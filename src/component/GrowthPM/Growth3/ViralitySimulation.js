import React, { useState } from 'react';
import { FaRocket, FaLightbulb, FaChartLine } from 'react-icons/fa';

const ViralitySimulation = () => {
  // Simulation state
  const [initialUsers, setInitialUsers] = useState(100);
  const [referralRate, setReferralRate] = useState(2);
  const [cycles, setCycles] = useState(5);
  const [totalUsers, setTotalUsers] = useState(null);
  const [insights, setInsights] = useState('');

  // Function to simulate viral growth
  const simulateVirality = () => {
    // Calculate total users using exponential growth:
    // total = initialUsers * (referralRate ^ cycles)
    const total = initialUsers * Math.pow(referralRate, cycles);
    setTotalUsers(total);

    // Provide insights based on the result
    let recommendation = '';
    if (total < initialUsers * 5) {
      recommendation = 'The growth is modest. Consider increasing the referral rate or incentivizing sharing more strongly.';
    } else if (total < initialUsers * 50) {
      recommendation = 'Good growth observed. You may experiment with slight improvements in user experience or referral incentives.';
    } else {
      recommendation = 'Excellent exponential growth! Ensure that your infrastructure and customer support can handle this scaling, and consider further optimization for long-term engagement.';
    }
    setInsights(recommendation);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center">
          <FaRocket className="mr-2 text-teal-500" /> Virality Simulation
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Experiment with the core components of a viral loop to see how exponential growth can occur.
        </p>
      </header>

      {/* Explanation of Core Concepts */}
      <section className="mb-8 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-gray-800 flex items-center mb-4">
          <FaLightbulb className="mr-2 text-yellow-500" /> Core Concepts Explained
        </h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>
            <strong>Initial Users:</strong> The starting number of users who begin the viral loop.
          </li>
          <li>
            <strong>Referral Rate:</strong> The average number of new users each existing user brings in.
          </li>
          <li>
            <strong>Cycles:</strong> The number of referral rounds or "generations" of new users.
          </li>
          <li>
            <strong>Exponential Growth:</strong> When users continuously invite others, the number of users grows rapidly.
          </li>
        </ul>
      </section>

      {/* Simulation Form */}
      <section className="mb-8 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-gray-800 flex items-center mb-4">
          <FaChartLine className="mr-2 text-purple-500" /> Run the Simulation
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Initial Users:</label>
            <input
              type="number"
              value={initialUsers}
              onChange={(e) => setInitialUsers(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter the number of starting users"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Referral Rate (New Users per User):</label>
            <input
              type="number"
              step="0.1"
              value={referralRate}
              onChange={(e) => setReferralRate(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g., 2 means each user invites 2 new users"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Number of Cycles:</label>
            <input
              type="number"
              value={cycles}
              onChange={(e) => setCycles(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter the number of referral rounds"
            />
          </div>
          <button
            onClick={simulateVirality}
            className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Simulate Growth
          </button>
        </div>
      </section>

      {/* Simulation Output */}
      {totalUsers !== null && (
        <section className="mb-8 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Simulation Results</h2>
          <p className="text-xl text-gray-700">
            <strong>Total Users Generated:</strong> {totalUsers.toLocaleString()}
          </p>
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Insights & Recommendations</h3>
            <p className="text-gray-700">{insights}</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default ViralitySimulation;
