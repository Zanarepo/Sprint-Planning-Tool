import React from 'react';
import { FaMusic,  FaLightbulb } from 'react-icons/fa';

const CaseStudiesAndTakeaways = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Case Studies Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-4">
          <FaMusic className="mr-2 text-green-500" />
          Case Studies for Discussion
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">
              Spotify’s Expansion to the Middle East
            </h3>
            <p className="text-gray-700 ml-6 mt-2">
              - Added Arabic playlists, partnered with telecom providers, and priced for affordability.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">
              Duolingo in Southeast Asia
            </h3>
            <p className="text-gray-700 ml-6 mt-2">
              - Introduced courses in local dialects (e.g., Vietnamese) and gamified learning for mobile-first users.
            </p>
          </div>
        </div>
      </section>

      {/* Takeaways Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-4">
          <FaLightbulb className="mr-2 text-yellow-500" />
          Takeaways for Students
        </h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>
            <strong>Think Globally, Act Locally:</strong> Balance scalability with cultural nuance.
          </li>
          <li>
            <strong>Test Early:</strong> Pilot in smaller markets before full rollout.
          </li>
          <li>
            <strong>Build Feedback Loops:</strong> Continuously gather local user insights.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default CaseStudiesAndTakeaways;
