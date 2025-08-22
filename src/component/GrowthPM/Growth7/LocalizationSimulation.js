import React, { useState } from 'react';
import { FaMusic, FaBookOpen } from 'react-icons/fa';

const LocalizationSimulation = () => {
  const [simulationType, setSimulationType] = useState('spotify'); // 'spotify' or 'duolingo'

  // Spotify simulation parameters (0 - 100)
  const [localizationQuality, setLocalizationQuality] = useState(50);
  const [partnershipStrength, setPartnershipStrength] = useState(50);
  const [pricingAffordability, setPricingAffordability] = useState(50);

  // Duolingo simulation parameters (0 - 100)
  const [courseLocalization, setCourseLocalization] = useState(50);
  const [gamification, setGamification] = useState(50);

  // Compute estimated adoption rate for Spotify simulation
  // Formula: baseline (10%) + 0.3 * localizationQuality + 0.3 * partnershipStrength + 0.2 * pricingAffordability
  const spotifyAdoptionRate = Math.min(
    100,
    10 + 0.3 * localizationQuality + 0.3 * partnershipStrength + 0.2 * pricingAffordability
  ).toFixed(1);

  // Compute estimated adoption rate for Duolingo simulation
  // Formula: baseline (15%) + 0.4 * courseLocalization + 0.3 * gamification
  const duolingoAdoptionRate = Math.min(
    100,
    15 + 0.4 * courseLocalization + 0.3 * gamification
  ).toFixed(1);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Localization Simulation
        </h1>
        <p className="text-lg text-gray-600">
          Adjust the parameters to see how localization factors impact adoption rates.
        </p>
      </header>

      {/* Simulation Type Selector */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setSimulationType('spotify')}
          className={`px-4 py-2 rounded ${
            simulationType === 'spotify'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-blue-500 border border-blue-500'
          }`}
        >
          <FaMusic className="inline mr-2" />
          Spotify - Middle East
        </button>
        <button
          onClick={() => setSimulationType('duolingo')}
          className={`px-4 py-2 rounded ${
            simulationType === 'duolingo'
              ? 'bg-green-500 text-white'
              : 'bg-white text-green-500 border border-green-500'
          }`}
        >
          <FaBookOpen className="inline mr-2" />
          Duolingo - Southeast Asia
        </button>
      </div>

      {simulationType === 'spotify' && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Spotify’s Localization Simulation
          </h2>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">
              Localization Quality ({localizationQuality})
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={localizationQuality}
              onChange={(e) => setLocalizationQuality(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">
              Local Partnerships Strength ({partnershipStrength})
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={partnershipStrength}
              onChange={(e) => setPartnershipStrength(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">
              Pricing Affordability ({pricingAffordability})
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={pricingAffordability}
              onChange={(e) => setPricingAffordability(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="text-center mt-4">
            <p className="text-2xl font-bold text-gray-800">
              Estimated Adoption Rate: {spotifyAdoptionRate}%
            </p>
            <p className="text-gray-600">
              Increase localization quality, partnerships, and pricing affordability to boost user adoption.
            </p>
          </div>
        </div>
      )}

      {simulationType === 'duolingo' && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Duolingo’s Localization Simulation
          </h2>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">
              Course Localization Quality ({courseLocalization})
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={courseLocalization}
              onChange={(e) => setCourseLocalization(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">
              Gamification Factor ({gamification})
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={gamification}
              onChange={(e) => setGamification(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="text-center mt-4">
            <p className="text-2xl font-bold text-gray-800">
              Estimated Adoption Rate: {duolingoAdoptionRate}%
            </p>
            <p className="text-gray-600">
              Improve course localization and increase gamification elements to boost engagement.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalizationSimulation;
