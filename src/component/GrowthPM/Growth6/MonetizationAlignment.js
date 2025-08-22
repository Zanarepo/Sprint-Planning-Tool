import React from 'react';
import {
  FaDollarSign,
  FaChartBar,
  FaHandshake,
  FaLayerGroup,
  FaGlobe,
  FaMapMarkedAlt,
  FaFlask,
  FaUserFriends,
  FaSearchDollar,
} from 'react-icons/fa';

const MonetizationAlignment = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 flex justify-center items-center">
            <FaDollarSign className="inline mr-2" /> Monetization Alignment
          </h1>
        </header>

        {/* Section 2: Key Components */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            2. Key Components of Monetization Alignment
          </h2>

          {/* (A) Pricing Strategy & Value Metrics */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-700 flex items-center mb-2">
              <FaChartBar className="mr-2 text-blue-500" /> (A) Pricing Strategy & Value Metrics
            </h3>
            <p className="text-gray-700">
              <strong>Value Metrics:</strong> You should charge users based on the core value they receive. For example, Slack charges per active user and AWS charges per compute hour.
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Pricing Models:</strong>
            </p>
            <ul className="list-disc ml-6 text-gray-700">
              <li><strong>Freemium:</strong> e.g., Spotify, Dropbox.</li>
              <li><strong>Subscription:</strong> e.g., Netflix.</li>
              <li><strong>Pay-as-you-go:</strong> e.g., Uber.</li>
              <li><strong>Tiered Pricing:</strong> e.g., many SaaS products.</li>
            </ul>
          </div>

          {/* (B) Behavioral Economics in Monetization */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-700 flex items-center mb-2">
              <FaHandshake className="mr-2 text-green-500" /> (B) Behavioral Economics in Monetization
            </h3>
            <ul className="list-disc ml-6 text-gray-700">
              <li>
                <strong>Anchoring:</strong> Set a reference price. For example, display <span className="line-through">99/month</span> next to <span className="font-bold">49/month</span>.
              </li>
              <li>
                <strong>Loss Aversion:</strong> Highlight what users lose without upgrading. For instance, "Free trial ends in 3 days".
              </li>
              <li>
                <strong>Social Proof:</strong> Show popular paid plans. For example, "10,000 teams use this plan".
              </li>
            </ul>
          </div>

          {/* (C) Monetization Loops */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-700 flex items-center mb-2">
              <FaLayerGroup className="mr-2 text-purple-500" /> (C) Monetization Loops
            </h3>
            <p className="text-gray-700">
              Design systems where revenue grows automatically as users engage. For example:
              <br /><br />
              <strong>Example 1:</strong> LinkedIn Premium upsells users with "See who viewed your profile."
              <br />
              <strong>Example 2:</strong> Duolingo’s gamified "Streak Repair" for paid users.
            </p>
          </div>

          {/* (D) Localized Monetization */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-700 flex items-center mb-2">
              <FaGlobe className="mr-2 text-red-500" /> (D) Localized Monetization
            </h3>
            <p className="text-gray-700">
              Adapt pricing to regional purchasing power. For example, Netflix adjusts subscription prices by country and mobile games use dynamic pricing based on user geography.
            </p>
          </div>
        </section>

        {/* Section 3: Steps to Achieve Monetization Alignment */}
        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            3. Steps to Achieve Monetization Alignment
          </h2>

          {/* Step 1 */}
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-700 flex items-center mb-2">
              <FaMapMarkedAlt className="mr-2 text-yellow-500" /> Step 1: Map User Journey to Revenue Opportunities
            </h3>
            <p className="text-gray-700">
              Identify "Aha! Moments" where users perceive value (for example, the first successful project in Figma). Place monetization triggers after users experience that value (like Calendly’s paywall after 3 free meetings).
            </p>
          </div>

          {/* Step 2 */}
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-700 flex items-center mb-2">
              <FaUserFriends className="mr-2 text-indigo-500" /> Step 2: Analyze User Segments
            </h3>
            <p className="text-gray-700">
              Use cohort analysis to identify high-LTV (Lifetime Value) users. For example, a gaming app might discover that users who play 5+ levels in 3 days are 10x more likely to pay.
            </p>
          </div>

          {/* Step 3 */}
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-700 flex items-center mb-2">
              <FaFlask className="mr-2 text-pink-500" /> Step 3: Test & Optimize
            </h3>
            <p className="text-gray-700">
              Run A/B tests on pricing tiers, trial lengths, or payment triggers (for example, "Pay annually and save 20%"). Avoid overloading users with upsells too early.
            </p>
          </div>

          {/* Step 4 */}
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-700 flex items-center mb-2">
              <FaSearchDollar className="mr-2 text-teal-500" /> Step 4: Align with Growth Channels
            </h3>
            <p className="text-gray-700">
              If you find that paid ads are driving low-LTV users, refine your targeting or adjust your pricing strategy to improve ROI.
            </p>
          </div>

          {/* Step 5 */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-700 flex items-center mb-2">
              <FaChartBar className="mr-2 text-green-500" /> Step 5: Monitor Trade-offs
            </h3>
            <p className="text-gray-700">
              Track important metrics such as churn rate, ARPU (Average Revenue Per User), and NPS (Net Promoter Score) to ensure your monetization strategy doesn’t negatively affect user retention.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MonetizationAlignment;
