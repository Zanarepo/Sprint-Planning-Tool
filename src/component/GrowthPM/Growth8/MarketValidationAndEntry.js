import React from 'react';
import { FaWrench, FaRocket } from 'react-icons/fa';

const MarketValidationAndEntry = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Phase 2: Validate Demand */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaWrench className="text-3xl text-blue-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Phase 2: Validate Demand</h1>
        </div>
        {/* A. Build a Minimum Viable Product (MVP) */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">A. Build a Minimum Viable Product (MVP)</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>Localize core features (e.g., language, payment methods).</li>
            <li><strong>Example:</strong> Spotify added regional music playlists for India.</li>
          </ul>
        </div>
        {/* B. Run Pilot Tests */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">B. Run Pilot Tests</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>Use landing pages or waitlists to gauge interest (e.g., “Notify me when available”).</li>
            <li><strong>Tools:</strong> Unbounce, Leadpages.</li>
          </ul>
        </div>
        {/* C. Collect Feedback */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">C. Collect Feedback</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>Conduct surveys (SurveyMonkey) or user interviews to understand pain points.</li>
            <li><strong>Example:</strong> Netflix tested pricing tiers in Southeast Asia before full launch.</li>
          </ul>
        </div>
      </section>

      {/* Phase 3: Develop Market Entry Strategy */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaRocket className="text-3xl text-green-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Phase 3: Develop Market Entry Strategy</h1>
        </div>
        {/* A. Localization */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">A. Localization</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>
              <strong>Product:</strong> Adapt UI/UX (e.g., right-to-left text for Arabic), pricing (local currency), and features.
            </li>
            <li>
              <strong>Marketing:</strong> Tailor messaging to cultural nuances (e.g., TikTok’s hyper-local content in Indonesia).
            </li>
          </ul>
        </div>
        {/* B. Partnerships */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">B. Partnerships</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>Collaborate with local influencers, distributors, or telecom providers.</li>
            <li>
              <strong>Example:</strong> Uber partnered with local payment gateways in Africa.
            </li>
          </ul>
        </div>
        {/* C. Go-to-Market (GTM) Plan */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">C. Go-to-Market (GTM) Plan</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>Define channels (e.g., social media, partnerships), budget, and KPIs.</li>
            <li>
              Use a RACI Matrix to assign roles (Responsible, Accountable, Consulted, Informed).
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default MarketValidationAndEntry;
