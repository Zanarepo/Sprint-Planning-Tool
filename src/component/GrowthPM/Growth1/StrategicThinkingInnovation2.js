import React, { useState } from 'react';
import { FaLightbulb, FaSyncAlt, FaRocket, FaChartLine } from 'react-icons/fa';

const StrategicThinkingInnovation = () => {
  // State for simulation inputs and outputs
  const [seedUsers, setSeedUsers] = useState('');
  const [referralRate, setReferralRate] = useState('');
  const [cycles, setCycles] = useState('');
  const [totalUsers, setTotalUsers] = useState(null);

  // Function to calculate viral growth through a simple growth loop simulation.
  // For each cycle, new users are: current users * referralRate.
  const calculateGrowth = () => {
    let currentUsers = Number(seedUsers);
    let referrals = Number(referralRate);
    let cycleCount = Number(cycles);
    let total = currentUsers;

    for (let i = 0; i < cycleCount; i++) {
      const newUsers = currentUsers * referrals;
      total += newUsers;
      currentUsers = newUsers;
    }
    setTotalUsers(total);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        {/* Header Section */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Strategic Thinking & Innovation
          </h1>
          <p className="text-lg text-gray-600">
            Create and implement innovative strategies that drive scalable growth.
          </p>
        </header>

        {/* Explanation Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaLightbulb className="text-yellow-500 mr-3" />
            Key Concepts Explained
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <FaSyncAlt className="text-2xl text-blue-500 mr-3" />
              <div>
                <strong>Strategic Thinking:</strong> Involves long-term planning, resource allocation, and setting priorities that align with overall business goals.
              </div>
            </div>
            <div className="flex items-start">
              <FaRocket className="text-2xl text-red-500 mr-3" />
              <div>
                <strong>Innovation:</strong> The process of introducing new ideas, methods, or products that create value and provide a competitive edge.
              </div>
            </div>
            <div className="flex items-start">
              <FaChartLine className="text-2xl text-green-500 mr-3" />
              <div>
                <strong>Growth Loops:</strong> Self-reinforcing cycles where existing users drive the acquisition of new users (e.g., referrals), fueling viral growth.
              </div>
            </div>
          </div>
        </section>

        {/* Real-Time Use Case & Simulation */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaRocket className="text-teal-500 mr-3" />
            Real-Time Use Case: Growth Loops
          </h2>
          <p className="text-gray-600 mb-4">
            Imagine you launch a campaign where each user refers new users, creating a viral loop. This simulation helps you understand the potential reach.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg shadow mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Seed Users:</label>
              <input
                type="number"
                value={seedUsers}
                onChange={(e) => setSeedUsers(e.target.value)}
                placeholder="Enter initial number of users"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Referral Rate (New users per existing user):</label>
              <input
                type="number"
                value={referralRate}
                onChange={(e) => setReferralRate(e.target.value)}
                placeholder="Enter referral rate"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Number of Cycles:</label>
              <input
                type="number"
                value={cycles}
                onChange={(e) => setCycles(e.target.value)}
                placeholder="Enter number of cycles"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              onClick={calculateGrowth}
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Simulate Growth Loop
            </button>
          </div>
          {totalUsers !== null && (
            <div className="p-4 bg-green-100 rounded-lg text-green-800 font-semibold">
              Total Users After {cycles} Cycle{cycles > 1 ? 's' : ''}: {totalUsers}
            </div>
          )}
        </section>

        <footer className="mt-8 text-center">
          <p className="text-gray-500">
            By embracing Strategic Thinking & Innovation, you can develop growth loops that fuel viral acquisition and drive scalable success.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default StrategicThinkingInnovation;
