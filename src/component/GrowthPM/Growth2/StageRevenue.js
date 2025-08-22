import React from 'react';
import RevenueSimulation from './RevenueSimulation'; // Assuming this is a component you have
import { FaDollarSign, FaChartLine, FaExclamationTriangle, FaLightbulb, FaBriefcase, FaPencilAlt } from 'react-icons/fa';

const StageRevenue = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Title and Goal */}
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center">
            <FaDollarSign className="mr-3 text-green-500" /> Stage 4: Revenue
          </h1>
          <p className="mt-2 text-xl text-gray-700">
            Goal: Convert users into paying customers.
          </p>
        </header>

        {/* Key Metrics Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-2">
            <FaChartLine className="mr-2 text-blue-500" /> Key Metrics
          </h2>
          <ul className="list-disc ml-8 text-gray-700 space-y-1">
            <li><strong>Conversion Rate:</strong> Free to paid conversion.</li>
            <li><strong>Average Revenue Per User (ARPU):</strong> The average income per user.</li>
            <li><strong>Lifetime Value (LTV):</strong> Total revenue generated per customer.</li>
          </ul>
        </section>

        {/* Common Bottlenecks Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-2">
            <FaExclamationTriangle className="mr-2 text-red-500" /> Common Bottlenecks
          </h2>
          <ul className="list-disc ml-8 text-gray-700 space-y-1">
            <li><strong>Pricing Mismatch:</strong> Prices may be too high or too low.</li>
            <li><strong>Poorly Timed Upsell Prompts:</strong> Upsell offers not aligned with user behavior.</li>
            <li><strong>Lack of Payment Options:</strong> Limited choices can hinder conversions.</li>
          </ul>
        </section>

        {/* Optimization Strategies Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-2">
            <FaLightbulb className="mr-2 text-yellow-500" /> Optimization Strategies
          </h2>
          <ul className="list-disc ml-8 text-gray-700 space-y-1">
            <li><strong>Test Pricing Tiers:</strong> Consider models like freemium vs. subscription.</li>
            <li><strong>Offer Limited-Time Discounts:</strong> For example, Calm’s annual plan promotions.</li>
            <li><strong>Reduce Checkout Friction:</strong> Streamline processes (e.g., Amazon’s 1-Click Buy).</li>
          </ul>
        </section>

        {/* Case Study Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-2">
            <FaBriefcase className="mr-2 text-indigo-500" /> Case Study
          </h2>
          <p className="text-gray-700">
            Zoom increased revenue by offering tiered plans with clear feature differentiation.
          </p>
        </section>

        {/* Exercise Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-2">
            <FaPencilAlt className="mr-2 text-purple-500" /> Exercise
          </h2>
          <p className="text-gray-700">
            Design a pricing page for a SaaS tool and justify your choices. Think about how you would structure the pricing tiers, which features are included in each, and how to address potential bottlenecks.
          </p>
        </section>
      </div> <br/>
<RevenueSimulation />
    </div>
  );
};

export default StageRevenue;
