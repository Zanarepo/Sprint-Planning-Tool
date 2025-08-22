import React from 'react';
import { FaSyncAlt, FaShareAlt, FaTools, FaFileUpload,  FaChevronRight } from 'react-icons/fa';

const DesigningForVirality = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center">
          <FaShareAlt className="mr-3 text-blue-500" /> Designing for Virality
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Learn how to create products that encourage users to share and drive exponential growth.
        </p>
      </header>

      {/* Section A: Viral Loop Framework */}
      <section className="mb-12 bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaSyncAlt className="text-3xl text-purple-500 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-800">A. Viral Loop Framework</h2>
        </div>
        <p className="text-gray-700 mb-4">
          A viral loop is a cycle where users invite others, who then invite more users:
        </p>
        <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-4">
          <li>
            <strong>User Action:</strong> A user takes an action (e.g., creates content, completes a purchase).
          </li>
          <li>
            <strong>Invitation Trigger:</strong> The product prompts sharing (e.g., “Invite friends to unlock benefits”).
          </li>
          <li>
            <strong>New User Onboarding:</strong> The invited user signs up and repeats the loop.
          </li>
        </ul>
        <div className="border p-4 rounded-md bg-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-2">
            <FaChevronRight className="mr-2" /> Example: Dropbox
          </h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>
              <strong>User Action:</strong> Uploads a file. <FaFileUpload className="inline-block ml-1 text-gray-500" />
            </li>
            <li>
              <strong>Trigger:</strong> “Get 500MB free storage per friend invited.”
            </li>
            <li>
              <strong>Onboarding:</strong> Friend signs up, gets storage, and repeats.
            </li>
          </ul>
        </div>
      </section>

      {/* Section B: Tactics to Encourage Sharing */}
      <section className="mb-12 bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaShareAlt className="text-3xl text-green-500 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-800">B. Tactics to Encourage Sharing</h2>
        </div>
        <div className="mb-4">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Embed Sharing Triggers</h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>Post-purchase: “Share your purchase for a discount.”</li>
            <li>After achievement: “Share your high score.”</li>
            <li>Collaborative features: “Invite teammates to edit this doc.”</li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Reduce Friction</h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>Pre-populated referral links.</li>
            <li>One-click sharing to social media.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Align Incentives</h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>Reward both referrer and referee (e.g., Cash App’s $5 referral bonus).</li>
            <li>Tiered rewards (e.g., invite 5 friends → unlock premium feature).</li>
          </ul>
        </div>
      </section>

      {/* Section C: Tools for Virality */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaTools className="text-3xl text-red-500 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-800">C. Tools for Virality</h2>
        </div>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>
            <strong>Referral Program Dashboards:</strong> Tools like Viral Loops, ReferralCandy.
          </li>
          <li>
            <strong>Social API Integrations:</strong> e.g., “Share to WhatsApp/Instagram.”
          </li>
          <li>
            <strong>Gamification:</strong> Use progress bars, badges for sharing.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default DesigningForVirality;
