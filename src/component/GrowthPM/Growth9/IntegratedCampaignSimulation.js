import React, { useState } from 'react';
import { FaDollarSign,  FaUsers, FaThumbsUp, FaLightbulb } from 'react-icons/fa';

const IntegratedCampaignSimulation = () => {
  // Digital Marketing Inputs
  const [adSpend, setAdSpend] = useState(1000); // in dollars
  const [seoQuality, setSeoQuality] = useState(50); // out of 100, measures content relevance/optimization
  const [paidAdCTR, setPaidAdCTR] = useState(3); // in %, click-through rate for paid ads
  const [paidAdConversion, setPaidAdConversion] = useState(10); // in %, conversion from paid clicks

  // Behavioral Psychology Inputs (influence factors)
  const [socialProof, setSocialProof] = useState(50); // out of 100, effect of testimonials, reviews, etc.
  const [scarcityEffect, setScarcityEffect] = useState(50); // out of 100, impact of urgency messages
  const [lossAversion, setLossAversion] = useState(50); // out of 100, effect of free trial reminders etc.

  // Simulate organic traffic from SEO (influenced by SEO quality)
  const organicTraffic = seoQuality * 10; // simplistic: quality score * 10 visitors

  // Simulate paid traffic from ads (based on ad spend and a base cost per click)
  const baseCPC = 2; // $2 per click
  const paidClicks = adSpend / baseCPC;
  
  // Apply CTR to determine how many click the ads get (simplistic conversion: CTR% of impressions)
  const paidClickConversion = (paidClicks * (paidAdCTR / 100)) * (paidAdConversion / 100);
  
  // Combine organic and paid conversion influenced by behavioral factors:
  // For simplicity, assume behavioral factors (social proof, scarcity, loss aversion) boost overall conversion rate
  // Scale each behavioral factor from 0 to 1 and average them:
  const behavioralBoost = ((socialProof + scarcityEffect + lossAversion) / 300) + 1; // base multiplier 1 plus boost up to ~1.33

  // Estimated total conversions:
  const totalConversions = Math.round((organicTraffic + paidClickConversion) * behavioralBoost);
  
  // Insights based on thresholds:
  const insights = [];
  if (adSpend < 500) insights.push("Consider increasing your ad spend to drive more paid traffic.");
  if (seoQuality < 40) insights.push("Improve your SEO content to attract more organic traffic.");
  if (paidAdCTR < 2) insights.push("Experiment with ad creatives to boost your click-through rate.");
  if (socialProof < 40) insights.push("Enhance your social proof elements, like testimonials or user reviews.");
  if (scarcityEffect < 40) insights.push("Use urgency tactics such as countdown timers to boost conversions.");
  if (lossAversion < 40) insights.push("Incorporate loss aversion messaging, such as free trial reminders.");

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 flex justify-center items-center">
          <FaLightbulb className="mr-2 text-purple-500" /> Integrated Campaign Simulation
        </h1>
        <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
          Adjust the sliders below to simulate a campaign that integrates digital marketing and behavioral psychology. Watch how your changes impact overall conversions.
        </p>
      </header>
      
      {/* Digital Marketing Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <FaDollarSign className="mr-2 text-green-500" /> Digital Marketing Inputs
        </h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            Ad Spend: ${adSpend}
          </label>
          <input
            type="range"
            min="100"
            max="5000"
            step="100"
            value={adSpend}
            onChange={(e) => setAdSpend(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            SEO Quality: {seoQuality} / 100
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={seoQuality}
            onChange={(e) => setSeoQuality(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            Paid Ad CTR: {paidAdCTR}% 
          </label>
          <input
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={paidAdCTR}
            onChange={(e) => setPaidAdCTR(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            Paid Ad Conversion: {paidAdConversion}%
          </label>
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={paidAdConversion}
            onChange={(e) => setPaidAdConversion(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </section>

      {/* Behavioral Psychology Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <FaThumbsUp className="mr-2 text-blue-500" /> Behavioral Psychology Inputs
        </h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            Social Proof Impact: {socialProof} / 100
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={socialProof}
            onChange={(e) => setSocialProof(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            Scarcity Effect: {scarcityEffect} / 100
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={scarcityEffect}
            onChange={(e) => setScarcityEffect(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            Loss Aversion Impact: {lossAversion} / 100
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={lossAversion}
            onChange={(e) => setLossAversion(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </section>

      {/* Simulation Output Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <FaUsers className="mr-2 text-purple-500" /> Simulation Outputs & Insights
        </h2>
        <div className="text-gray-700 space-y-3">
          <p>
            <strong>Organic Traffic (from SEO):</strong> {organicTraffic} visitors
          </p>
          <p>
            <strong>Paid Click Conversions:</strong> {Math.round(paidClickConversion)} conversions
          </p>
          <p>
            <strong>Total Estimated Conversions:</strong> {totalConversions} conversions
          </p>
        </div>
      </section>

      {/* Insights Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <FaLightbulb className="mr-2 text-yellow-500" /> Remarks & Insights
        </h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          {insights.map((insight, idx) => (
            <li key={idx}>{insight}</li>
          ))}
          {insights.length === 0 && <li>Your campaign is well-balanced!</li>}
        </ul>
      </section>
    </div>
  );
};

export default IntegratedCampaignSimulation;
