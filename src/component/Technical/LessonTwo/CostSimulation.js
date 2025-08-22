import React, { useState, useEffect } from "react";

import { FiDollarSign, FiBarChart2, FiServer } from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const generateCostData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    month: `Month ${i + 1}`,
    cost: Math.floor(Math.random() * 1000) + 500,
  }));
};

const CostManagement = () => {
  const [costData, setCostData] = useState(generateCostData());
  const [autoSimulation, setAutoSimulation] = useState(false);

  useEffect(() => {
    let interval;
    if (autoSimulation) {
      interval = setInterval(() => {
        setCostData(generateCostData());
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [autoSimulation]);


  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div id="cost-management-content" className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Cost Management & Budgeting: Simplified</h1>
          <p className="text-lg text-gray-700">
            Understanding cost management helps you make informed business decisions. Let's explore how different factors influence costs and how we can optimize them.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
            <FiServer className="text-3xl text-blue-500 mr-3" /> Infrastructure Costs Over Time
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cost" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-gray-700 mt-4">This graph shows cost fluctuations over a year. By monitoring trends, we can identify opportunities to optimize expenses.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
            <FiDollarSign className="text-3xl text-green-500 mr-3" /> Cost Optimization Strategies
          </h2>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>Auto-scale resources to prevent overuse.</li>
            <li>Use cost-effective cloud storage solutions.</li>
            <li>Regularly audit third-party tools to eliminate unnecessary expenses.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
            <FiBarChart2 className="text-3xl text-yellow-500 mr-3" /> Business Cost Alignment
          </h2>
          <p className="text-gray-700">By aligning costs with business objectives, we ensure sustainability and profitability. Regular budget analysis prevents financial risks.</p>
        </section>

        <button
          onClick={() => setAutoSimulation(!autoSimulation)}
          className="mr-4 py-2 px-6 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {autoSimulation ? "Stop Auto Simulation" : "Start Auto Simulation"}
        </button>

      
      </div>
    </div>
  );
};

export default CostManagement;