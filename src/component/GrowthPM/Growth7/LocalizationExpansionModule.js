import React from 'react';
import MetricsAndPitfalls from './MetricsAndPitfalls';
import LocalizationExpansionTasks from './LocalizationExpansionTasks';
import CaseStudiesAndTakeaways      from './CaseStudiesAndTakeaways';
import LocalizationSimulation from './LocalizationSimulation';





import {
  FaGlobe,
 
  FaSearch,
 
  FaCogs,
  FaHandshake,
  FaBook,
  FaLaptop,
} from 'react-icons/fa';

const LocalizationExpansionModule = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen space-y-8">
      {/* Module Header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 flex justify-center items-center">
          <FaGlobe className="mr-3 text-blue-500" /> Localization & Expansion: Teaching Module
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Objective: Equip you with strategies to adapt products for new markets and scale globally while maintaining product-market fit.
        </p>
      </header>

      {/* Section 1: Core Concepts */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4 flex items-center">
          <FaBook className="text-3xl text-indigo-500 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-800">1. Core Concepts</h2>
        </div>
        <div className="mb-4">
          <h3 className="text-2xl font-semibold text-gray-700">a. Definitions:</h3>
          <ul className="list-disc ml-6 text-gray-700 mt-2 space-y-1">
            <li>
              <strong>Localization:</strong> Adapting a product to meet the language, cultural, and functional needs of a specific market (e.g., translating UI, adjusting payment methods).
            </li>
            <li>
              <strong>Expansion:</strong> Entering new markets (geographic or demographic) to grow the user base and revenue.
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-gray-700">b. Why It Matters:</h3>
          <ul className="list-disc ml-6 text-gray-700 mt-2 space-y-1">
            <li>
              <strong>Global Growth:</strong> Tapping into underserved markets (e.g., Uber in India adding auto-rickshaws).
            </li>
            <li>
              <strong>Cultural Relevance:</strong> Avoiding "one-size-fits-all" pitfalls (e.g., McDonald’s offering vegetarian menus in India).
            </li>
            <li>
              <strong>Competitive Edge:</strong> Outpacing rivals by entering markets first (e.g., Spotify’s rapid global rollout).
            </li>
          </ul>
        </div>
      </section>

      {/* Section 2: Key Components of Localization */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4 flex items-center">
          <FaLaptop className="text-3xl text-green-500 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-800">2. Key Components of Localization</h2>
        </div>
        {/* a. Market Research & Analysis */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-700 flex items-center">
            <FaSearch className="mr-2 text-blue-500" /> a. Market Research & Analysis
          </h3>
          <p className="text-gray-700 mt-2">
            Follow these steps:
          </p>
          <ul className="list-disc ml-6 text-gray-700 mt-2 space-y-1">
            <li>
              <strong>Identify Target Markets:</strong> Use tools like Market Opportunity Scores (population, GDP, digital penetration).
            </li>
            <li>
              <strong>Cultural Deep Dive:</strong> Study local customs, values, and taboos (e.g., colors, symbols, holidays).
            </li>
            <li>
              <strong>Competitive Landscape:</strong> Analyze local competitors (e.g., Didi vs. Uber in China).
            </li>
            <li>
              <strong>Legal & Regulatory Compliance:</strong> Understand local regulations (e.g., GDPR in Europe, data privacy laws, content restrictions).
            </li>
          </ul>
          <p className="text-gray-700 mt-4">
            <strong>Activity:</strong> You will be assigned a country (e.g., Brazil, Japan). Prepare and present a SWOT analysis for launching a streaming service in that market.
          </p>
        </div>
        {/* b. Product Adaptation */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-700 flex items-center">
            <FaCogs className="mr-2 text-purple-500" /> b. Product Adaptation
          </h3>
          <p className="text-gray-700 mt-2">
            Elements you need to localize include:
          </p>
          <ul className="list-disc ml-6 text-gray-700 mt-2 space-y-1">
            <li>
              <strong>Language & UX:</strong> Translate the UI, adapt date/time formats, support right-to-left text (e.g., Arabic).
            </li>
            <li>
              <strong>Features:</strong> Add or remove functionalities (e.g., WhatsApp enabling low-data mode in emerging markets).
            </li>
            <li>
              <strong>Pricing:</strong> Adjust based on local purchasing power (e.g., Netflix tiered pricing in India).
            </li>
            <li>
              <strong>Payment Methods:</strong> Incorporate local payment options (e.g., Alipay in China, UPI in India).
            </li>
          </ul>
          <p className="text-gray-700 mt-4">
            <strong>Case Study:</strong> Consider Netflix in Japan – they added anime content, partnered with local studios, and optimized mobile viewing.
          </p>
        </div>
        {/* c. Go-to-Market (GTM) Strategy */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 flex items-center">
            <FaHandshake className="mr-2 text-red-500" /> c. Go-to-Market (GTM) Strategy
          </h3>
          <ul className="list-disc ml-6 text-gray-700 mt-2 space-y-1">
            <li>
              <strong>Localized Marketing:</strong> Tailor your messaging to reflect cultural values (e.g., Nike’s "Nothing Beats a Londoner" campaign).
            </li>
            <li>
              <strong>Local Influencers & Channels:</strong> Use popular local media channels (e.g., TikTok for Gen Z in Southeast Asia).
            </li>
            <li>
              <strong>Partnerships:</strong> Collaborate with local brands or distributors (e.g., Starbucks partnering with Alibaba in China).
            </li>
          </ul>
        </div>
      </section>
          
        {/* Section 3: Metrics and Pitfalls */}

        <MetricsAndPitfalls />
        <LocalizationExpansionTasks />
        <CaseStudiesAndTakeaways />
        <LocalizationSimulation />
        <localizationquiz/>
      
    </div>
  );
};

export default LocalizationExpansionModule;
