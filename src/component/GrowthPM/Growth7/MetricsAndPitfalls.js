import React from 'react';
import {  FaBullseye, FaExclamationTriangle } from 'react-icons/fa';

const MetricsAndPitfalls = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Section 1: Metrics & Tools for Success */}
      <section className="mb-12 bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaBullseye className="text-3xl text-blue-500 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-800">Metrics & Tools for Success</h2>
        </div>

        {/* KPIs to Track */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">a. KPIs to Track:</h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>
              <strong>Adoption Rate:</strong> Time-to-adoption in new markets.
            </li>
            <li>
              <strong>Localized Conversion Rate:</strong> Sign-ups, purchases, or engagement post-localization.
            </li>
            <li>
              <strong>CAC (Customer Acquisition Cost):</strong> Compare costs across regions.
            </li>
            <li>
              <strong>Market Share:</strong> % of users captured vs. competitors.
            </li>
          </ul>
        </div>

        {/* Tools */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">b. Tools:</h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>
              <strong>Analytics:</strong> Google Analytics, Mixpanel (filter by region).
            </li>
            <li>
              <strong>Localization Platforms:</strong> Lokalise, Transifex (translation management).
            </li>
            <li>
              <strong>Competitive Intel:</strong> SimilarWeb, SEMrush (track local competitors).
            </li>
          </ul>
        </div>
      </section>

      {/* Section 2: Common Pitfalls & Solutions */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaExclamationTriangle className="text-3xl text-red-500 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-800">Common Pitfalls & Solutions</h2>
        </div>

        {/* Pitfalls */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">a. Pitfalls:</h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>
              <strong>Assumptions:</strong> Assuming preferences from one market apply elsewhere (e.g., Facebook’s initial failure in China).
            </li>
            <li>
              <strong>Over-Localization:</strong> Losing core product identity (e.g., Airbnb balancing local stays with global standards).
            </li>
            <li>
              <strong>Ignoring Logistics:</strong> Local taxes, shipping, or infrastructure (e.g., Amazon adapting delivery networks in India).
            </li>
          </ul>
        </div>

        {/* Solutions */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">b. Solutions:</h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>
              <strong>Hire Local Experts:</strong> Employ regional teams or consultants.
            </li>
            <li>
              <strong>Iterate Quickly:</strong> Use A/B testing to refine localized features.
            </li>
            <li>
              <strong>Leverage Modular Design:</strong> Build products that allow easy customization (e.g., Shopify’s multi-currency support).
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default MetricsAndPitfalls;
