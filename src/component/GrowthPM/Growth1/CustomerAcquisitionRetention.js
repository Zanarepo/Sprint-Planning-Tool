import React, { useState } from 'react';
import { FaUsers, FaStar } from 'react-icons/fa';

const CustomerAcquisitionRetention = () => {
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [loyaltyPoints, setLoyaltyPoints] = useState(null);

  // Example: 1 point earned per $1 spent
  const calculatePoints = () => {
    const points = Number(purchaseAmount);
    setLoyaltyPoints(points);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center mb-4">
          <FaUsers className="text-4xl text-green-500 mr-4" />
          <h1 className="text-3xl font-bold text-gray-800">
            Customer Acquisition & Retention
          </h1>
        </div>
        <p className="text-gray-600 mb-6">
          Develop strategies to attract new users while keeping current customers engaged.
        </p>

        {/* Loyalty Program Simulation */}
        <div className="bg-gray-50 p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Loyalty Program Simulation
          </h2>
          <p className="text-gray-600 mb-4">
            In this simulation, each dollar spent earns 1 loyalty point. Loyalty programs can boost customer lifetime value by rewarding repeat purchases.
          </p>
          <div className="flex items-center mb-4">
            <input
              type="number"
              value={purchaseAmount}
              onChange={(e) => setPurchaseAmount(e.target.value)}
              placeholder="Enter purchase amount ($)"
              className="w-full p-2 border border-gray-300 rounded mr-4"
            />
            <button
              onClick={calculatePoints}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Calculate Points
            </button>
          </div>
          {loyaltyPoints !== null && (
            <div className="text-xl font-medium text-gray-800 flex items-center">
              <FaStar className="text-yellow-500 mr-2" /> Loyalty Points Earned: <span className="font-bold ml-1">{loyaltyPoints}</span>
            </div>
          )}
        </div>

        {/* Detailed Explanation */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Real-Time Use Case: Loyalty Programs
          </h2>
          <p className="text-gray-600">
            <strong>Scenario:</strong> Imagine a customer makes a $50 purchase and earns 50 loyalty points.
          </p>
          <p className="text-gray-600 mt-2">
            <strong>Strategy:</strong> Enhance customer retention by offering bonus points on special occasions, tier-based rewards, and exclusive offers. For example, after accumulating a set number of points, customers could receive discounts, free shipping, or access to special promotions. This not only incentivizes repeat business but also increases overall customer lifetime value.
          </p>
          <p className="text-gray-600 mt-2">
            <strong>Impact:</strong> Effective loyalty programs help convert one-time buyers into long-term customers, driving steady revenue growth while reducing the cost of acquiring new users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerAcquisitionRetention;
