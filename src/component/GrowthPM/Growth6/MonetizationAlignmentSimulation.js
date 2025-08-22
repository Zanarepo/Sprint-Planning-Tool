import React, { useState } from 'react';
import { FaDollarSign,  FaBalanceScale, FaChartLine, FaPercent } from 'react-icons/fa';

const MonetizationAlignmentSimulation = () => {
  // State for simulation inputs
  const [revenue, setRevenue] = useState(10000); // in dollars
  const [activeUsers, setActiveUsers] = useState(500); // number of active users
  const [lifetimeValue, setLifetimeValue] = useState(150); // in dollars
  const [cac, setCac] = useState(50); // in dollars
  const [freeUsers, setFreeUsers] = useState(400); // number of free users
  const [upgradedUsers, setUpgradedUsers] = useState(100); // number of users upgrading to paid

  // Calculate metrics
  const monetizationEfficiency = activeUsers ? (revenue / activeUsers).toFixed(2) : 0;
  const ltvCacRatio = cac ? (lifetimeValue / cac).toFixed(2) : 0;
  const upgradeRate = freeUsers ? ((upgradedUsers / freeUsers) * 100).toFixed(2) : 0;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
            <FaDollarSign className="mr-2 text-green-500" /> Monetization Alignment Simulation
          </h1>
          <p className="text-gray-600 mt-2">
            Adjust the inputs below to see how your monetization metrics align.
          </p>
        </header>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-gray-700 font-medium">Revenue ($)</label>
            <input
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              Total revenue generated.
            </p>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Active Users</label>
            <input
              type="number"
              value={activeUsers}
              onChange={(e) => setActiveUsers(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              Number of users actively engaging with the product.
            </p>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Lifetime Value (LTV) ($)</label>
            <input
              type="number"
              value={lifetimeValue}
              onChange={(e) => setLifetimeValue(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              Average revenue generated per customer over their lifetime.
            </p>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Customer Acquisition Cost (CAC) ($)</label>
            <input
              type="number"
              value={cac}
              onChange={(e) => setCac(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              Average cost to acquire a new customer.
            </p>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Free Users</label>
            <input
              type="number"
              value={freeUsers}
              onChange={(e) => setFreeUsers(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              Number of users on the free tier.
            </p>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Upgraded Users</label>
            <input
              type="number"
              value={upgradedUsers}
              onChange={(e) => setUpgradedUsers(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              Number of free users converting to paid plans.
            </p>
          </div>
        </div>

        {/* Metrics Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg shadow">
            <h2 className="text-xl font-bold text-blue-700 flex items-center">
              <FaChartLine className="mr-2" /> Monetization Efficiency
            </h2>
            <p className="text-gray-700 mt-2">
              Your revenue per active user is <span className="font-semibold">{monetizationEfficiency}</span>. This metric helps you understand how effectively your active user base generates revenue.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg shadow">
            <h2 className="text-xl font-bold text-green-700 flex items-center">
              <FaBalanceScale className="mr-2" /> LTV:CAC Ratio
            </h2>
            <p className="text-gray-700 mt-2">
              Your LTV to CAC ratio is <span className="font-semibold">{ltvCacRatio}:1</span>. A healthy ratio is typically around 3:1 or higher, indicating that customers generate significantly more value than their acquisition cost.
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg shadow">
            <h2 className="text-xl font-bold text-yellow-700 flex items-center">
              <FaPercent className="mr-2" /> Upgrade Rate
            </h2>
            <p className="text-gray-700 mt-2">
              Your upgrade rate is <span className="font-semibold">{upgradeRate}%</span>. This measures the percentage of free users who convert to paid, reflecting the effectiveness of your conversion strategy.
            </p>
          </div>
        </div>

        {/* Insights */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow border">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Insights & Key Terms Explained</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>
              <strong>Monetization Efficiency:</strong> This is calculated by dividing total revenue by active users. It indicates how much revenue each active user generates.
            </li>
            <li>
              <strong>LTV:CAC Ratio:</strong> Lifetime Value (LTV) represents the total revenue a customer is expected to generate over their lifetime, while Customer Acquisition Cost (CAC) is the cost to acquire that customer. A ratio of 3:1 or higher is generally considered healthy.
            </li>
            <li>
              <strong>Upgrade Rate:</strong> This is the percentage of free users who become paying customers. A higher upgrade rate means that your conversion strategy is effectively turning free users into revenue-generating customers.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MonetizationAlignmentSimulation;
