import React from 'react';
import { FaDollarSign, FaFlask, FaWrench, FaDropbox, FaFilm, FaGamepad } from 'react-icons/fa';

const FrameworksAndCaseStudies = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen space-y-12">
      {/* Section 4: Frameworks & Tools */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center mb-6">
          <span className="mr-2">
            <FaWrench className="text-blue-500" />
          </span>
          4. Frameworks & Tools
        </h1>

        {/* (A) Monetization Funnel */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
            <span className="mr-2">
              <FaDollarSign className="text-green-500" />
            </span>
            (A) Monetization Funnel
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left font-medium text-gray-700 border">Stage</th>
                  <th className="p-3 text-left font-medium text-gray-700 border">Goal</th>
                  <th className="p-3 text-left font-medium text-gray-700 border">Tactics</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 border">Acquisition</td>
                  <td className="p-3 border">Attract users likely to pay</td>
                  <td className="p-3 border">Target high-intent audiences via ads.</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 border">Activation</td>
                  <td className="p-3 border">Deliver immediate value</td>
                  <td className="p-3 border">Offer free trials with clear benefits.</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 border">Retention</td>
                  <td className="p-3 border">Keep users engaged</td>
                  <td className="p-3 border">Use email nudges (e.g., "Your trial ends soon").</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 border">Revenue</td>
                  <td className="p-3 border">Convert to paid</td>
                  <td className="p-3 border">Highlight limited-time discounts.</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 border">Referral</td>
                  <td className="p-3 border">Turn users into advocates</td>
                  <td className="p-3 border">Reward referrals with credits (e.g., Uber).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* (B) ICE Framework for Prioritization */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
            <span className="mr-2">
              <FaFlask className="text-purple-500" />
            </span>
            (B) ICE Framework for Prioritization
          </h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>
              <strong>Impact:</strong> How much revenue will this experiment generate?
            </li>
            <li>
              <strong>Confidence:</strong> How sure are we about the outcome?
            </li>
            <li>
              <strong>Ease:</strong> How quickly can we test this?
            </li>
          </ul>
          <p className="mt-4 text-gray-700">
            <strong>Example:</strong> Testing a new pricing tier scores high on ICE if data shows strong demand.
          </p>
        </div>

        {/* (C) Tools */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
            <span className="mr-2">
              <FaWrench className="text-indigo-500" />
            </span>
            (C) Tools
          </h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>
              <strong>Analytics:</strong> Mixpanel, Amplitude (track ARPU, conversion rates).
            </li>
            <li>
              <strong>A/B Testing:</strong> Optimizely, Google Optimize.
            </li>
            <li>
              <strong>Pricing Optimization:</strong> ProfitWell, Baremetrics.
            </li>
          </ul>
        </div>
      </section>

      {/* Section 5: Case Studies */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center mb-6">
          <span className="mr-2">
            <FaWrench className="text-red-500" />
          </span>
          5. Case Studies
        </h1>

        {/* Case 1: Dropbox */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-2">
            <span className="mr-2">
              <FaDropbox className="text-blue-600" />
            </span>
            Case 1: Dropbox
          </h2>
          <p className="text-gray-700 mb-2">
            <strong>Challenge:</strong> Convert free users to paid.
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Tactic:</strong> Offered extra storage for referrals (growth + monetization alignment).
          </p>
          <p className="text-gray-700">
            <strong>Result:</strong> 3900% user growth in 15 months.
          </p>
        </div>

        {/* Case 2: Netflix */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-2">
            <span className="mr-2">
              <FaFilm className="text-red-600" />
            </span>
            Case 2: Netflix
          </h2>
          <p className="text-gray-700 mb-2">
            <strong>Challenge:</strong> Retain users after price hikes.
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Tactic:</strong> Localized pricing + tiered plans (Basic, Standard, Premium).
          </p>
          <p className="text-gray-700">
            <strong>Result:</strong> Reduced churn despite higher prices.
          </p>
        </div>

        {/* Case 3: Supercell (Mobile Games) */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-2">
            <span className="mr-2">
              <FaGamepad className="text-green-600" />
            </span>
            Case 3: Supercell (Mobile Games)
          </h2>
          <p className="text-gray-700 mb-2">
            <strong>Tactic:</strong> Monetize "whales" (5% of users driving 70% of revenue) with in-app purchases.
          </p>
          <p className="text-gray-700">
            <strong>Ethics:</strong> Avoided predatory tactics by capping daily spend limits.
          </p>
        </div>
      </section>
    </div>
  );
};

export default FrameworksAndCaseStudies;
