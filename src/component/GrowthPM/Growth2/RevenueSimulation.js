import React, { useState } from 'react';
import { FaDollarSign } from 'react-icons/fa';

const RevenueSimulation = () => {
  // State for simulation inputs
  const [freeUsers, setFreeUsers] = useState(1000);
  const [conversionRate, setConversionRate] = useState(5); // in percent
  const [arpu, setArpu] = useState(50); // in dollars

  // Calculate paid users and total revenue
  const paidUsers = Math.round(freeUsers * (conversionRate / 100));
  const totalRevenue = paidUsers * arpu;

  // For simplicity, assume LTV equals ARPU
  const ltv = arpu;

  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
        <FaDollarSign className="mr-2 text-green-500" /> Revenue Simulation
      </h2>
      <p className="text-gray-700 mb-4">
        In this simulation, you'll learn how adjusting key revenue metrics affects your overall income.
        Use the controls below to change the number of free users, the conversion rate, and the average revenue per user (ARPU).
      </p>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Number of Free Users:
          </label>
          <input
            type="number"
            value={freeUsers}
            onChange={(e) => setFreeUsers(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
            min="0"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Conversion Rate (%):
          </label>
          <input
            type="number"
            value={conversionRate}
            onChange={(e) => setConversionRate(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
            min="0"
            max="100"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Average Revenue Per User (ARPU) ($):
          </label>
          <input
            type="number"
            value={arpu}
            onChange={(e) => setArpu(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
            min="0"
          />
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow">
        <p className="text-gray-700">
          <strong>Paid Users:</strong> {paidUsers}
        </p>
        <p className="text-gray-700">
          <strong>Total Revenue:</strong> ${totalRevenue.toLocaleString()}
        </p>
        <p className="text-gray-700">
          <strong>LTV (assumed equal to ARPU):</strong> ${ltv}
        </p>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded">
        <p className="text-gray-700">
          Explanation: Imagine you have 1,000 free users. With a 5% conversion rate, you get about 50 paying users. If each paying user brings in $50, your total revenue becomes $2,500. Experiment by increasing the conversion rate or ARPU to see how the revenue grows.
        </p>
      </div>
    </div>
  );
};

export default RevenueSimulation;
