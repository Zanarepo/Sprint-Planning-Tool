import React from 'react';

import {
  FaRocket,
  FaServer,
  FaCogs,
 
  FaTools,
  FaLightbulb,
} from 'react-icons/fa';

const ScalabilityAutomation = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Title and Learning Objectives */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center">
          <FaRocket className="mr-2 text-teal-500" />
          Scalability & Automation for Growth Product Managers
        </h1>
        <p className="text-lg text-gray-600 mt-4 text-center">
          In this module, you'll learn why scalability and automation are critical for sustainable growth, explore frameworks for designing scalable systems and automating processes, and discover tools and strategies to balance rapid growth with technical stability.
        </p>
      </header>

      {/* Core Concepts */}
      <section className="mb-12 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-gray-800 flex items-center mb-4">
          <FaTools className="mr-3 text-blue-500" /> Core Concepts
        </h2>

        {/* Scalability */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
            <FaServer className="mr-2 text-green-500" /> Scalability
          </h3>
          <p className="text-gray-700 mt-2">
            <strong>Definition:</strong> The ability of a product, system, or process to handle increased demand without compromising performance.
          </p>
          <div className="mt-4">
            <h4 className="text-xl font-semibold text-gray-800">Why It Matters:</h4>
            <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
              <li>
                Prevents bottlenecks (e.g., server crashes during user spikes).
              </li>
              <li>
                Reduces costs through efficient resource allocation (e.g., cloud auto-scaling).
              </li>
              <li>
                Enables seamless expansion into new markets or user segments.
              </li>
            </ul>
          </div>
        </div>

        {/* Automation */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
            <FaCogs className="mr-2 text-orange-500" /> Automation
          </h3>
          <p className="text-gray-700 mt-2">
            <strong>Definition:</strong> Using technology to perform repetitive tasks with minimal human intervention.
          </p>
          <div className="mt-4">
            <h4 className="text-xl font-semibold text-gray-800">Why It Matters:</h4>
            <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
              <li>
                Accelerates growth by eliminating manual processes (e.g., automated user onboarding emails).
              </li>
              <li>
                Reduces human error and operational costs.
              </li>
              <li>
                Frees teams to focus on high-impact, strategic work.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Frameworks for Scalability & Automation */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-gray-800 flex items-center mb-4">
          <FaLightbulb className="mr-3 text-purple-500" /> Frameworks for Scalability & Automation
        </h2>

        {/* 4-Step Scalability Framework */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">A. The 4-Step Scalability Framework</h3>
          <ol className="list-decimal ml-6 text-gray-700 space-y-2">
            <li>
              <strong>Anticipate Demand:</strong> Analyze historical data to predict growth (e.g., holiday traffic spikes). Use tools like Google Trends or AWS Forecast for predictive modeling.
            </li>
            <li>
              <strong>Design Modular Systems:</strong> Break systems into independent components (e.g., microservices architecture). For example, consider how Netflix transitioned from a monolithic system to microservices to handle global streaming.
            </li>
            <li>
              <strong>Automate Repetitive Workflows:</strong> Identify tasks that can be automated (e.g., billing, user notifications) using tools like Zapier, Airflow, or custom scripts.
            </li>
            <li>
              <strong>Monitor & Iterate:</strong> Track performance metrics (e.g., latency, error rates) with tools such as Datadog or New Relic, and continuously refine systems based on feedback.
            </li>
          </ol>
        </div>

        {/* The Automation Matrix */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">B. The Automation Matrix</h3>
          <p className="text-gray-700">
            Prioritize automation efforts using this grid:
          </p>
          <div className="mt-4">
            <table className="w-full border border-gray-300 text-gray-700">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">High Impact</th>
                  <th className="border border-gray-300 p-2">Low Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">Low Effort: Focus first on high-impact, low-effort tasks (e.g., automated customer support chatbots).</td>
                  <td className="border border-gray-300 p-2">Low Effort: Identify tasks that are easy to automate even if their impact is small.</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">High Effort: Consider tasks that are impactful but require significant work to automate.</td>
                  <td className="border border-gray-300 p-2">High Effort: Be cautious with tasks that have low impact yet are resource-intensive to automate.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section> <br/>
        
        {/* Key Takeaways */}
     
      {/* Case Studies and Tools */}
    </div>
  );
};

export default ScalabilityAutomation;
