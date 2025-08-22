import React from 'react';
import { FaGlobe, FaSearch} from 'react-icons/fa';


const MarketExplorationProcess = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Overview Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaGlobe className="text-3xl text-indigo-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Overview: Why Explore New Markets?</h1>
        </div>
        <p className="text-gray-700 mb-4">
          <strong>Objective:</strong> Expand the product’s reach to drive sustainable growth by entering untapped user segments or geographic regions.
        </p>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Key Drivers:</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>
              <strong>Market Saturation:</strong> Existing markets may have limited growth potential.
            </li>
            <li>
              <strong>Diversification:</strong> Reduce dependency on a single market/segment.
            </li>
            <li>
              <strong>Competitive Advantage:</strong> Capture first-mover advantage in emerging markets.
            </li>
            <li>
              <strong>Revenue Growth:</strong> Unlock new monetization opportunities.
            </li>
          </ul>
        </div>
      </section>

      {/* Step-by-Step Process Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaSearch className="text-3xl text-green-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Step-by-Step Process for Exploring New Markets</h1>
        </div>

        {/* Phase 1: Market Research & Opportunity Identification */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Phase 1: Market Research & Opportunity Identification</h2>

          {/* A. Identify Potential Markets */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">A. Identify Potential Markets</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              <li>
                <strong>Geographic Expansion:</strong> Target countries/regions with growing demand (e.g., emerging economies like India, Brazil).
              </li>
              <li>
                <strong>Demographic Segments:</strong> Focus on underserved age groups, income levels, or niches (e.g., Gen Z, small businesses).
              </li>
              <li>
                <strong>Behavioral Segments:</strong> Users with unmet needs (e.g., non-English speakers, rural populations).
              </li>
            </ul>
          </div>

          {/* B. Analyze Market Viability */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">B. Analyze Market Viability</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              <li>
                <strong>Market Size:</strong> Use tools like Statista, Google Trends, or Euromonitor to estimate Total Addressable Market (TAM).
              </li>
              <li>
                <strong>Competition:</strong> Map competitors using SEMrush or SimilarWeb (e.g., Are incumbents dominant or fragmented?).
              </li>
              <li>
                <strong>Regulatory Environment:</strong> Research local laws (e.g., GDPR in Europe, data privacy laws in India).
              </li>
              <li>
                <strong>Cultural Fit:</strong> Assess alignment with local values (e.g., payment preferences, language, social norms).
              </li>
            </ul>
          </div>

          {/* C. Prioritize Markets */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">C. Prioritize Markets</h3>
            <p className="text-gray-700 ml-6">
              Use frameworks like PESTEL (Political, Economic, Social, Technological, Environmental, Legal) or ICE Scoring (Impact, Confidence, Ease) to rank opportunities.
            </p>
            <p className="text-gray-700 ml-6 mt-2">
              <strong>Example:</strong> A fintech app targeting Brazil might prioritize markets with high smartphone penetration, low banking access, and supportive regulations.
            </p>
          </div>
        </div>
      </section>
     
  
   

    </div>
  );
};

export default MarketExplorationProcess;
