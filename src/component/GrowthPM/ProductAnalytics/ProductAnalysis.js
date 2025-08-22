import React from 'react';

import { FiPieChart, FiTrendingUp, FiBarChart2, FiActivity } from 'react-icons/fi';
import ProductMetricsSimulator from './ProductMetricsSimulator'
import DAUSimulator from './DAUSimulator'


const UnderstandingProductAnalysis = () => {
 
  return (
    <div className="container mx-auto p-6" id="product-analysis-content">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Understanding Product Analysis</h1>
        <p className="text-lg mt-2 text-gray-600">Analyzing your app’s performance through data and actionable insights.</p>
      </div>

    

      {/* Introduction */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800">Introduction</h2>
        <p className="text-lg mt-4 text-gray-600">
          Imagine you’re running an app where people can share photos with their friends. You want to know how many people are using your app, how often they’re sharing photos, and which filters they like the most. Product analysis helps you understand these behaviors by looking at the data.
        </p>
      </section>

      {/* Key Themes */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800">Key Themes</h2>
        <ul className="mt-6 space-y-4 text-lg text-gray-600">
          <li className="flex items-center">
            <FiPieChart className="mr-3 text-blue-600" />
            <strong>Behavioral Data:</strong> Understand the "who" and "what" of user activity through object and event data.
          </li>
          <li className="flex items-center">
            <FiTrendingUp className="mr-3 text-blue-600" />
            <strong>Why Metrics Matter:</strong> Metrics like Daily Active Users (DAU) and session counts help measure success.
          </li>
          <li className="flex items-center">
            <FiBarChart2 className="mr-3 text-blue-600" />
            <strong>Clear Communication:</strong> Present data in a way that’s easy to understand with dashboards and reports.
          </li>
        </ul>
      </section>

      {/* Use Cases and Examples */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800">Use Cases</h2>
        <div className="mt-4 bg-gray-100 p-6 rounded-md shadow-md">
          <h3 className="text-xl font-semibold text-blue-600">Photo-Sharing App</h3>
          <p className="mt-4 text-lg text-gray-600">
            For a photo-sharing app, product analysis can:
          </p>
          <ul className="list-disc pl-6 mt-4 text-gray-600">
            <li>Track which filters are most popular.</li>
            <li>Analyze peak times for photo uploads.</li>
            <li>Identify features that lead to higher user retention.</li>
          </ul>
        </div>

        <div className="mt-6 bg-gray-100 p-6 rounded-md shadow-md">
          <h3 className="text-xl font-semibold text-blue-600">E-commerce Platform</h3>
          <p className="mt-4 text-lg text-gray-600">
            For an e-commerce platform, product analysis can:
          </p>
          <ul className="list-disc pl-6 mt-4 text-gray-600">
            <li>Monitor conversion rates on product pages.</li>
            <li>Identify abandoned cart trends and reasons.</li>
            <li>Determine which promotional campaigns drive the most sales.</li>
          </ul>
        </div>

        <div className="mt-6 bg-gray-100 p-6 rounded-md shadow-md">
          <h3 className="text-xl font-semibold text-blue-600">Streaming Platform</h3>
          <p className="mt-4 text-lg text-gray-600">
            For a video streaming service, product analysis can:
          </p>
          <ul className="list-disc pl-6 mt-4 text-gray-600">
            <li>Track watch time and content preferences.</li>
            <li>Analyze subscription patterns and cancellations.</li>
            <li>Identify peak viewing times and optimize server loads.</li>
          </ul>
        </div>
      </section>

      {/* Tools for Analysis */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800">Tools for Analysis</h2>
        <ul className="mt-6 space-y-4 text-lg text-gray-600">
          <li className="flex items-center">
            <FiActivity className="mr-3 text-blue-600" />
            <strong>Mixpanel:</strong> Tracks object and event data with user-friendly dashboards.
          </li>
          <li className="flex items-center">
            <FiActivity className="mr-3 text-blue-600" />
            <strong>Google Analytics:</strong> Offers comprehensive website and app analytics.
          </li>
          <li className="flex items-center">
            <FiActivity className="mr-3 text-blue-600" />
            <strong>Amplitude:</strong> Focuses on product analytics and user behavior insights.
          </li>
          <li className="flex items-center">
            <FiActivity className="mr-3 text-blue-600" />
            <strong>Heap:</strong> Automatically tracks all user interactions without requiring custom event setup.
          </li>
          <li className="flex items-center">
            <FiActivity className="mr-3 text-blue-600" />
            <strong>Power BI/Tableau:</strong> Advanced tools for creating detailed visualizations and reports.
          </li>
        </ul>
      </section>

      {/* Visual Examples */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800">Visual Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img src="images/DAUPiechart.jpg" alt="Daily Active Users" className="rounded-md shadow-lg" />
          <img src="images/SessionByDistribtuin.jpg" alt="User Sessions" className="rounded-md shadow-lg" />
          <img src="images/EngagementMetrics.jpg" alt="Engagement Metrics" className="rounded-md shadow-lg" />
          <img src="images/Dashboard.jpg" alt="Dashboard Overview" className="rounded-md shadow-lg" />
        </div>
      </section>
<ProductMetricsSimulator/>

<DAUSimulator/>
      {/* Conclusion */}
      <section>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Conclusion</h2>
        <p className="text-lg text-gray-600">
          Product analysis is essential for understanding how users interact with your app, identifying what’s working, and improving what’s not. By leveraging tools like Mixpanel, Google Analytics, Amplitude, Heap, and advanced visualization platforms like Tableau and Power BI, you can make data-driven decisions that enhance user experience and align with business goals.
        </p>
      </section>
    </div>
  );
};

export default UnderstandingProductAnalysis;
