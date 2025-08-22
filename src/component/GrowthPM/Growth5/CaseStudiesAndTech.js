import React from 'react';
import { FaSlack, FaAirbnb, FaServer, FaChartLine, FaAws, FaCogs, FaRobot, FaChartPie, FaBug, FaLightbulb } from 'react-icons/fa';

const CaseStudiesAndTech = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen space-y-12">
      {/* Section 3: Case Studies */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <FaChartLine className="mr-2 text-blue-500" /> Case Studies
        </h2>
        {/* Case 1 */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
            <FaSlack className="mr-2 text-purple-500" /> Case 1: Slack’s Scalability
          </h3>
          <p className="text-gray-700 mt-2"><strong>Challenge:</strong> Scaling real-time messaging for millions of users.</p>
          <p className="text-gray-700 mt-2"><strong>Solution:</strong></p>
          <ul className="list-disc ml-6 text-gray-700 mt-1 space-y-1">
            <li>Adopted Erlang programming language for concurrency.</li>
            <li>Automated server provisioning using Kubernetes.</li>
          </ul>
          <p className="text-gray-700 mt-2"><strong>Result:</strong> Handled 10x user growth without downtime.</p>
        </div>
        {/* Case 2 */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
            <FaAirbnb className="mr-2 text-red-500" /> Case 2: Airbnb’s Pricing Automation
          </h3>
          <p className="text-gray-700 mt-2"><strong>Challenge:</strong> Hosts struggled to set competitive prices.</p>
          <p className="text-gray-700 mt-2"><strong>Solution:</strong></p>
          <ul className="list-disc ml-6 text-gray-700 mt-1 space-y-1">
            <li>Built Smart Pricing, an algorithm adjusting prices based on demand, seasonality, and local events.</li>
          </ul>
          <p className="text-gray-700 mt-2"><strong>Result:</strong> Increased bookings by 13% and host revenue by 10%.</p>
        </div>
      </section>

      {/* Section 4: Tools & Technologies */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <FaServer className="mr-2 text-green-500" /> Tools & Technologies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Infrastructure Scaling */}
          <div className="p-4 border rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-800 flex items-center mb-2">
              <FaAws className="mr-2 text-orange-500" /> Infrastructure Scaling
            </h3>
            <ul className="list-disc ml-6 text-gray-700">
              <li>AWS Auto Scaling</li>
              <li>Kubernetes</li>
            </ul>
          </div>
          {/* Workflow Automation */}
          <div className="p-4 border rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-800 flex items-center mb-2">
              <FaCogs className="mr-2 text-indigo-500" /> Workflow Automation
            </h3>
            <ul className="list-disc ml-6 text-gray-700">
              <li>Zapier</li>
              <li>Airflow</li>
              <li>Retool</li>
            </ul>
          </div>
          {/* Monitoring */}
          <div className="p-4 border rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-800 flex items-center mb-2">
              <FaRobot className="mr-2 text-yellow-500" /> Monitoring
            </h3>
            <ul className="list-disc ml-6 text-gray-700">
              <li>Datadog</li>
              <li>New Relic</li>
              <li>Prometheus</li>
            </ul>
          </div>
          {/* A/B Testing */}
          <div className="p-4 border rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-800 flex items-center mb-2">
              <FaChartPie className="mr-2 text-teal-500" /> A/B Testing
            </h3>
            <ul className="list-disc ml-6 text-gray-700">
              <li>Optimizely</li>
              <li>Firebase</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 5: Common Pitfalls & Solutions */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <FaBug className="mr-2 text-red-500" /> Common Pitfalls & Solutions
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-gray-700">
            <thead className="border-b">
              <tr>
                <th className="py-2 px-4">Pitfall</th>
                <th className="py-2 px-4">Solution</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4">Over-engineering systems</td>
                <td className="py-2 px-4">Start simple; scale incrementally.</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4">Ignoring technical debt</td>
                <td className="py-2 px-4">Allocate 20% of sprint time for refactoring.</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Over-automating workflows</td>
                <td className="py-2 px-4">Use the Automation Matrix to prioritize tasks.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <p className="text-gray-700 flex items-center">
            <FaLightbulb className="mr-2 text-yellow-500" /> Remember: A balanced approach is key to success.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CaseStudiesAndTech;
