import React from 'react';

import { FaShareAlt, FaUsers, FaNetworkWired, FaGift, FaRegSmile } from 'react-icons/fa';

const ViralityNetworkEffects = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 flex justify-center items-center">
          <FaShareAlt className="mr-3 text-blue-500" /> Virality & Network Effects
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Design product features that incentivize users to invite others organically, creating self-sustaining growth loops while ensuring the product’s value scales with user adoption.
        </p>
      </header>

      {/* Key Concepts */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">1. Key Concepts</h2>

        {/* Virality */}
        <div className="mb-8">
          <div className="flex items-center mb-3">
            <FaShareAlt className="text-2xl text-blue-500 mr-2" />
            <h3 className="text-2xl font-semibold text-gray-800">A. Virality</h3>
          </div>
          <p className="text-gray-700 mb-4">
            <strong>Definition:</strong> Users naturally invite others to the product, creating exponential growth.
          </p>
          <div className="ml-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Types of Virality:</h4>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>
                <div className="flex items-center">
                  <FaGift className="text-xl text-green-500 mr-2" />
                  <span>
                    <strong>Incentivized Virality:</strong> Users get rewards for referrals (e.g., Dropbox’s free storage for inviting friends).
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <FaRegSmile className="text-xl text-purple-500 mr-2" />
                  <span>
                    <strong>Organic Virality:</strong> Users share because the product is inherently social or collaborative (e.g., WhatsApp group chats, Canva’s design collaboration).
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Network Effects */}
        <div>
          <div className="flex items-center mb-3">
            <FaNetworkWired className="text-2xl text-indigo-500 mr-2" />
            <h3 className="text-2xl font-semibold text-gray-800">B. Network Effects</h3>
          </div>
          <p className="text-gray-700 mb-4">
            <strong>Definition:</strong> The product becomes more valuable as more users join (e.g., Facebook, Uber, Airbnb).
          </p>
          <div className="ml-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Types of Network Effects:</h4>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>
                <div className="flex items-center">
                  <FaUsers className="text-xl text-green-500 mr-2" />
                  <span>
                    <strong>Direct Network Effects:</strong> More users → more value (e.g., messaging apps).
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <FaUsers className="text-xl text-yellow-500 mr-2" />
                  <span>
                    <strong>Indirect Network Effects:</strong> Complementary users/groups create value (e.g., Uber drivers ↔ riders).
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <FaUsers className="text-xl text-red-500 mr-2" />
                  <span>
                    <strong>Two-Sided Marketplace Effects:</strong> Buyers and sellers reinforce growth (e.g., eBay, Etsy).
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

        {/* Additional Resources */}
    </div>
  );
};

export default ViralityNetworkEffects;
