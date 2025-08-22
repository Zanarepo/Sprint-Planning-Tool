import React from 'react';
import { FaBrain, FaExclamationTriangle, FaTasks } from 'react-icons/fa';

const BehavioralPsychologyForGrowthPMs = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Overview */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 flex justify-center items-center">
          <FaBrain className="mr-2 text-indigo-500" /> Behavioral Psychology for Growth PMs
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
          Understand how your users make decisions and what influences them to take action—whether it’s signing up, sharing, or purchasing. Use these principles to design products that truly drive results.
        </p>
      </header>

      {/* Key Principles Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <FaExclamationTriangle className="mr-2 text-blue-500" /> Key Principles You Need to Know
        </h2>
        <div className="space-y-6">
          {/* Scarcity & Urgency */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">Scarcity & Urgency</h3>
            <ul className="list-disc ml-6 text-gray-700 mt-2 space-y-1">
              <li>
                <strong>Example:</strong> Use messages like "Only 3 seats left at this price!" to encourage quick decisions.
              </li>
              <li>
                <strong>How to Apply:</strong> Create limited-time discounts or add countdown timers during checkout.
              </li>
            </ul>
          </div>

          {/* Social Proof */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">Social Proof</h3>
            <ul className="list-disc ml-6 text-gray-700 mt-2 space-y-1">
              <li>
                <strong>Example:</strong> Show user reviews, testimonials, or indicate "X people bought this today."
              </li>
              <li>
                <strong>How to Apply:</strong> Highlight “Most Popular” plans or products to boost trust and drive action.
              </li>
            </ul>
          </div>

          {/* Loss Aversion */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">Loss Aversion</h3>
            <ul className="list-disc ml-6 text-gray-700 mt-2 space-y-1">
              <li>
                Remember, people strongly prefer avoiding losses over acquiring gains.
              </li>
              <li>
                <strong>Example:</strong> Send free trial reminders like "You’ll lose access to premium features in 2 days" to prompt users to act.
              </li>
            </ul>
          </div>

          {/* Anchoring */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">Anchoring</h3>
            <ul className="list-disc ml-6 text-gray-700 mt-2 space-y-1">
              <li>
                Present a high initial price so that the discounted price appears more attractive.
              </li>
              <li>
                <strong>Example:</strong> Use a pricing display like "~~$99~~ $49/month" to make the discount clear.
              </li>
            </ul>
          </div>

          {/* Endowed Progress Effect */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">Endowed Progress Effect</h3>
            <ul className="list-disc ml-6 text-gray-700 mt-2 space-y-1">
              <li>
                Show your users that they have already made progress, which motivates them to complete tasks.
              </li>
              <li>
                <strong>Example:</strong> Use progress bars during onboarding, e.g., "3/5 steps completed."
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Practical Application Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <FaTasks className="mr-2 text-green-500" /> How You Can Apply These Principles
        </h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>
            Design referral programs that leverage social proof—think Dropbox’s "Get extra storage for inviting friends."
          </li>
          <li>
            Simplify your sign-up flows by setting smart defaults (for example, pre-select annual billing for extra savings).
          </li>
          <li>
            Boost user engagement by using gamification elements like badges and streaks (just like Duolingo).
          </li>
        </ul>
      </section>
    </div>
  );
};

export default BehavioralPsychologyForGrowthPMs;
