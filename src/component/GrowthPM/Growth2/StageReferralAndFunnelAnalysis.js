import React from 'react';
import StageReferralAndFunnelSimulation from './StageReferralAndFunnelSimulation'; // Assuming this is a component you have
import {
  FaChartLine,
  FaExclamationTriangle,
  FaRegSmile,
  FaShareAlt,
  FaTools,
  FaFunnelDollar,
  FaLightbulb,
  FaClipboardCheck,
} from 'react-icons/fa';

const StageReferralAndFunnelAnalysis = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen space-y-12">
      {/* Stage 5: Referral */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaShareAlt className="text-3xl text-teal-500 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-800">Stage 5: Referral</h2>
        </div>
        <p className="text-gray-700 mb-4">
          <strong>Goal:</strong> Turn users into advocates.
        </p>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
            <FaChartLine className="mr-2 text-blue-500" /> Key Metrics:
          </h3>
          <ul className="list-disc ml-8 mt-2 text-gray-700">
            <li>
              Viral Coefficient (users invited per existing user)
            </li>
            <li>
              Referral conversion rate
            </li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
            <FaExclamationTriangle className="mr-2 text-red-500" /> Common Bottlenecks:
          </h3>
          <ul className="list-disc ml-8 mt-2 text-gray-700">
            <li>Low incentive to share</li>
            <li>Complicated referral process</li>
            <li>Lack of social proof</li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
            <FaLightbulb className="mr-2 text-yellow-500" /> Optimization Strategies:
          </h3>
          <ul className="list-disc ml-8 mt-2 text-gray-700">
            <li>
              Incentivize referrals (e.g., Uber’s "Give 20, Get 20, Get 20")
            </li>
            <li>
              Embed sharing prompts in high-engagement moments (e.g., after a successful transaction)
            </li>
            <li>
              Highlight user-generated content (e.g., Airbnb’s guest reviews)
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
            <FaClipboardCheck className="mr-2 text-green-500" /> Exercise:
          </h3>
          <p className="text-gray-700 ml-8">
            Create a referral program for a meditation app with a $0 marketing budget.
          </p>
        </div>
      </section>

      {/* Tools & Techniques for Funnel Analysis */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaTools className="text-3xl text-indigo-500 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-800">Tools & Techniques for Funnel Analysis</h2>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
            <FaFunnelDollar className="mr-2 text-purple-500" /> Tools:
          </h3>
          <ul className="list-disc ml-8 mt-2 text-gray-700">
            <li><strong>Analytics:</strong> Google Analytics, Mixpanel, Amplitude.</li>
            <li><strong>A/B Testing:</strong> Optimizely, VWO.</li>
            <li><strong>Heatmaps:</strong> Hotjar, Crazy Egg.</li>
            <li><strong>Surveys:</strong> Typeform, SurveyMonkey.</li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
            <FaRegSmile className="mr-2 text-green-500" /> Process:
          </h3>
          <ol className="list-decimal ml-8 mt-2 text-gray-700 space-y-1">
            <li>
              <strong>Map the Funnel:</strong> Visualize user flow (e.g., signup → onboarding → purchase).
            </li>
            <li>
              <strong>Identify Drop-Off Points:</strong> Use cohort analysis to find where users leave.
            </li>
            <li>
              <strong>Hypothesize Solutions:</strong> Brainstorm fixes (e.g., simplify forms, add tooltips).
            </li>
            <li>
              <strong>Test & Iterate:</strong> Run A/B tests and measure impact.
            </li>
          </ol>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
            <FaClipboardCheck className="mr-2 text-green-500" /> Example:
          </h3>
          <p className="text-gray-700 ml-8 mt-2">
            Dropbox increased signups by 10% by reducing form fields from 8 to 3.
          </p>
        </div>
      </section> <br/>
      <StageReferralAndFunnelSimulation/>
    </div>
  );
};

export default StageReferralAndFunnelAnalysis;
