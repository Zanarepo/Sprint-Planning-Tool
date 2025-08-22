import React from 'react';
import { FaBullseye, FaAd, FaChartLine, FaVideo } from 'react-icons/fa';

const PaidAdsForGrowthPMs = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Overview */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 flex justify-center items-center">
          <FaAd className="mr-2 text-indigo-500" /> Paid Ads (PPC & Social Ads)
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Use paid ads to quickly test your messaging, target the right audiences, and scale your customer acquisition. They let you experiment rapidly so you can see what works best.
        </p>
      </header>

      {/* Key Concepts */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-4">
          <FaBullseye className="mr-2 text-blue-500" /> Key Concepts to Master
        </h2>

        {/* Platforms & Targeting */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Platforms & Targeting</h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>
              <strong>Google Ads:</strong> Run search ads (text-based), display ads (visual), and YouTube ads.
            </li>
            <li>
              <strong>Social Ads:</strong> Use Facebook/Instagram for demographic and interest-based targeting, LinkedIn for B2B, and TikTok for younger audiences.
            </li>
            <li>
              <strong>Retargeting:</strong> Re-engage users who visited your product but did not convert.
            </li>
          </ul>
        </div>

        {/* Ad Creative Best Practices */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Ad Creative Best Practices</h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>
              <strong>Copywriting:</strong> Emphasize benefits over features. For example, say "Save 5 hours/week" instead of "Task management app."
            </li>
            <li>
              <strong>Visuals:</strong> Use high-quality images or videos with clear calls-to-action like "Start Free Trial."
            </li>
            <li>
              <strong>A/B Testing:</strong> Test different headlines, CTAs, and audience segments to see what drives the best results.
            </li>
          </ul>
        </div>

        {/* Budget Allocation & ROAS */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Budget Allocation & ROAS</h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>
              <strong>Calculate ROAS:</strong> Divide the revenue generated from ads by the ad spend.
            </li>
            <li>
              <strong>Tools:</strong> Use Google Analytics or Facebook Ads Manager to track conversions.
            </li>
          </ul>
        </div>
      </section>

      {/* Practical Application */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-4">
          <FaChartLine className="mr-2 text-green-500" /> How You Can Apply These Concepts
        </h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>
            Run low-budget experiments to test your ad messaging before scaling.
          </li>
          <li>
            Work closely with your marketing team to align ad campaigns with new product features or launches.
          </li>
          <li>
            Optimize your landing pages to deliver on the promises made in your ads. This will help reduce bounce rates.
          </li>
        </ul>
      </section>

      {/* Case Study */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-4">
          <FaVideo className="mr-2 text-purple-500" /> Case Study: Dollar Shave Club
        </h2>
        <p className="text-gray-700 mb-2">
          Dollar Shave Club created a viral YouTube ad that was humorous, clearly communicated their value, and included a direct call-to-action. This campaign drove massive sign-ups and boosted their brand recognition.
        </p>
      </section>
    </div>
  );
};

export default PaidAdsForGrowthPMs;
