import React from 'react';
import { FaChartLine, FaBalanceScale, FaClipboardList } from 'react-icons/fa';

const MetricsEthicsActionPlan = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Metrics to Track Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-4">
          <FaChartLine className="mr-2 text-blue-500" /> Metrics to Track
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-semibold text-gray-700">Acquisition</h3>
            <ul className="list-disc ml-6 text-gray-700">
              <li><strong>CAC (Customer Acquisition Cost)</strong></li>
              <li><strong>Sign-Up Rate</strong></li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-700">Retention</h3>
            <ul className="list-disc ml-6 text-gray-700">
              <li><strong>DAU/MAU (Daily/Monthly Active Users)</strong></li>
              <li><strong>Churn Rate</strong></li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-700">Monetization</h3>
            <ul className="list-disc ml-6 text-gray-700">
              <li><strong>ARPU (Average Revenue Per User)</strong></li>
              <li><strong>Conversion to Paid</strong></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Ethical Considerations Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-4">
          <FaBalanceScale className="mr-2 text-red-500" /> Ethical Considerations
        </h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Avoid exploitative pricing in low-income markets.</li>
          <li>Respect local customs (e.g., religious holidays, content restrictions).</li>
          <li>Ensure data privacy compliance (e.g., GDPR, CCPA).</li>
        </ul>
      </section>

      {/* Action Plan Template for Students Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-4">
          <FaClipboardList className="mr-2 text-green-500" /> Action Plan Template
        </h2>
        <ol className="list-decimal ml-6 text-gray-700 space-y-3">
          <li>
            <strong>Research:</strong> Use PESTEL to evaluate 3 potential markets.
          </li>
          <li>
            <strong>Validate:</strong> Design a landing page MVP for your top market.
          </li>
          <li>
            <strong>Localize:</strong> Adapt one core feature for cultural fit.
          </li>
          <li>
            <strong>Test:</strong> Run a 2-week pilot and analyze retention.
          </li>
        </ol>
      </section>
    </div>
  );
};

export default MetricsEthicsActionPlan;
