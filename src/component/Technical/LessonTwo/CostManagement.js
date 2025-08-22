import React from "react";

import CostSimulation from './CostSimulation'
import { FiDollarSign, FiBarChart2, FiServer, FiClipboard } from "react-icons/fi";





const CostManagement = () => {
  
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div id="cost-management-content" className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Cost Management & Budgeting: Why It Matters for a TPM</h1>
          <p className="text-lg text-gray-700">
            As a Technical Product Manager (TPM), managing costs effectively is a crucial part of your role. It’s not
            just about delivering features and meeting deadlines but also ensuring the product operates efficiently and sustainably.
          </p>
        </header>

        <section className="mb-12">
          <div className="flex items-center mb-4">
            <FiServer className="text-3xl text-blue-500 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Infrastructure Costs: Technical Decisions Have Financial Implications</h2>
          </div>
          <p className="text-gray-700 mb-6">
            Every technical choice you make—whether it’s about cloud providers, databases, or scaling strategies—has a direct impact on the costs of running your product. Let’s break it down:
          </p>

          <div className="overflow-x-auto bg-gray-100 rounded-lg shadow-sm">
            <table className="min-w-full table-auto text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-3 px-4 text-gray-800">Area</th>
                  <th className="py-3 px-4 text-gray-800">Example</th>
                  <th className="py-3 px-4 text-gray-800">Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b">
                  <td className="py-3 px-4 text-gray-700">Cloud Services</td>
                  <td className="py-3 px-4 text-gray-700">Real-time features increase server instances</td>
                  <td className="py-3 px-4 text-gray-700">Higher monthly bills during high usage</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="py-3 px-4 text-gray-700">Third-party Tools</td>
                  <td className="py-3 px-4 text-gray-700">Managed database services like AWS RDS</td>
                  <td className="py-3 px-4 text-gray-700">Ongoing recurring costs</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 mt-4">
            Understanding these costs helps you evaluate trade-offs. For instance, can you justify the added expense of real-time updates by the value it brings to users? If a cheaper option exists, does it align with your product’s long-term goals?
          </p>
        </section>

        <section className="mb-12">
          <div className="flex items-center mb-4">
            <FiDollarSign className="text-3xl text-green-500 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Optimization: Balancing Costs and Performance</h2>
          </div>
          <p className="text-gray-700 mb-6">
            A key skill as a TPM is finding ways to optimize resources, ensuring the product performs well without incurring unnecessary expenses.
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>Use auto-scaling to minimize wasted resources during off-peak hours.</li>
            <li>Store less frequently used data in cheaper storage options like Amazon S3 Glacier.</li>
            <li>Regularly review third-party tool usage and ensure you're on the most cost-effective plan.</li>
          </ul>

          <p className="text-gray-700">
            Effective optimization helps reinvest saved resources into new features and improvements, boosting product value.
          </p>
        </section>

        <section className="mb-12">
          <div className="flex items-center mb-4">
            <FiBarChart2 className="text-3xl text-yellow-500 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Aligning Costs with Business Goals</h2>
          </div>
          <p className="text-gray-700 mb-6">
            As a TPM, you bridge the gap between technical teams and business stakeholders. Cost management plays a big role here:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>Provide stakeholders with clear budget forecasts for new features.</li>
            <li>Evaluate ROI for high-cost features, and ensure alignment with overall business goals.</li>
          </ul>

          <p className="text-gray-700">
            A clear understanding of costs helps you make data-driven decisions, ensuring that the product remains profitable.
          </p>
        </section>

        <section>
          <div className="flex items-center mb-4">
            <FiClipboard className="text-3xl text-purple-500 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Why It’s Important for You as a TPM</h2>
          </div>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>Establish trust with stakeholders by clearly explaining the financial impact of decisions.</li>
            <li>Make better decisions by understanding what’s feasible within budget constraints.</li>
            <li>Prevent unpleasant surprises by actively managing budgets and maintaining profitability.</li>
            <li>Align technical decisions with company financial goals by collaborating with finance teams.</li>
          </ul>
          <CostSimulation/>
        </section>

      </div>
    </div>
  );
};

export default CostManagement;
