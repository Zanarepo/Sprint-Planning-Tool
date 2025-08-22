import React from 'react';
import { FaExclamationTriangle,  FaChartLine, FaCheck } from 'react-icons/fa';

const CommonPitfalls = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaExclamationTriangle className="mr-2 text-red-500" /> Common Pitfalls & How to Avoid Them
          </h1>
        </header>

        {/* Pitfall 1 */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
            <FaExclamationTriangle className="mr-2 text-red-500" /> Pitfall 1: Optimizing for short-term revenue
          </h2>
          <p className="text-gray-700 ml-8 mt-2">
            <strong>Example:</strong> Using intrusive ads that harm user experience.
          </p>
          <p className="text-gray-700 ml-8 mt-2 flex items-center">
            <FaCheck className="mr-2 text-green-500" />
            <strong>Fix:</strong> Balance ads with user experience by rewarding users for watching ads.
          </p>
        </section>

        {/* Pitfall 2 */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
            <FaExclamationTriangle className="mr-2 text-red-500" /> Pitfall 2: Ignoring regional affordability
          </h2>
          <p className="text-gray-700 ml-8 mt-2">
            Failing to adjust pricing based on local economic conditions.
          </p>
          <p className="text-gray-700 ml-8 mt-2 flex items-center">
            <FaCheck className="mr-2 text-green-500" />
            <strong>Fix:</strong>  Use dynamic pricing tools, such as CleverTap, to adjust pricing regionally.
          </p>
        </section>

        {/* Pitfall 3 */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
            <FaExclamationTriangle className="mr-2 text-red-500" /> Pitfall 3: Overcomplicating pricing tiers
          </h2>
          <p className="text-gray-700 ml-8 mt-2">
            Offering too many options can overwhelm customers.
          </p>
          <p className="text-gray-700 ml-8 mt-2 flex items-center">
            <FaCheck className="mr-2 text-green-500" />
            <strong>Fix:</strong> Limit the number of pricing options to 3-4 plans to leverage the psychology of choice.
          </p>
        </section>

        {/* Key Metrics */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
            <FaChartLine className="mr-2 text-blue-500" /> Key Metrics to Track
          </h2>
          <ul className="list-disc ml-8 text-gray-700 mt-2 space-y-1">
            <li>
              <strong>Monetization Efficiency:</strong> Revenue / Active Users.
            </li>
            <li>
              <strong>LTV:CAC Ratio:</strong> Lifetime Value vs. Customer Acquisition Cost (aim for 3:1).
            </li>
            <li>
              <strong>Upgrade Rate:</strong> Percentage of free users converting to paid.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default CommonPitfalls;
