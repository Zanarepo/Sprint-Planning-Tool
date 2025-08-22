import React from 'react';
import { FaSearch, FaDollarSign,  FaClipboardList, FaTools } from 'react-icons/fa';

const IntegratingDigitalMarketingBehavioralPsychology = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Module Title */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center">
          <FaTools className="mr-2 text-indigo-500" /> Integrating Digital Marketing & Behavioral Psychology
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
          Learn how you can combine digital marketing with behavioral psychology to drive user action and boost conversions.
        </p>
      </header>

      {/* Combining Digital Marketing & Behavioral Psychology */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <FaSearch className="mr-2 text-blue-500" /> How to Combine Both
        </h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-3">
          <li>
            Use paid ads to test messaging that taps into psychological triggers. For example, use a message like 
            <strong> "Join 1M+ users"</strong> to trigger social proof.
          </li>
          <li>
            Optimize your SEO content to match user intent and tap into emotional triggers. For instance, create content titled 
            <strong> "How to avoid costly tax mistakes"</strong> to leverage loss aversion.
          </li>
        </ul>

        {/* Example Framework */}
        <div className="mt-6 p-4 border-l-4 border-blue-500 bg-blue-50">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Example Framework
          </h3>
          <p className="text-gray-700">
            <strong>Hypothesis:</strong> Adding customer testimonials (social proof) to your pricing page will increase conversions.
          </p>
          <p className="text-gray-700 mt-2">
            <strong>Experiment:</strong> A/B test two versions of your page—one with testimonials and one without.
          </p>
          <p className="text-gray-700 mt-2">
            <strong>Result:</strong> If the variant with testimonials wins, scale it and apply the learnings to other pages.
          </p>
        </div>
      </section>

      {/* Capstone Project Idea */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <FaClipboardList className="mr-2 text-green-500" /> Capstone Project Idea
        </h2>
        <p className="text-gray-700 mb-4">
          Create a comprehensive growth plan for a product by doing the following:
        </p>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>
            Develop an SEO keyword strategy and content outline.
          </li>
          <li>
            Plan and set up a paid ad campaign targeting a specific user persona.
          </li>
          <li>
            Incorporate behavioral psychology tactics to improve onboarding and retention.
          </li>
        </ul>
      </section>

      {/* Tools to Teach */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <FaDollarSign className="mr-2 text-purple-500" /> Tools to Teach
        </h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>
            <strong>SEO:</strong> Learn and use tools like Ahrefs, Moz, and Google Search Console.
          </li>
          <li>
            <strong>Paid Ads:</strong> Get hands-on with Google Ads, Facebook Ads Manager, and UTM tracking.
          </li>
          <li>
            <strong>Behavioral Analysis:</strong> Use Hotjar for heatmaps and Amplitude for tracking user journeys.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default IntegratingDigitalMarketingBehavioralPsychology;
