import React from 'react';
import { FaRegNewspaper, FaBalanceScale } from 'react-icons/fa';

const CaseStudiesAndChallenges = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Case Studies Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-4">
          <FaRegNewspaper className="mr-2 text-green-500" /> Case Studies
        </h2>
        {/* Spotify in India */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Spotify in India</h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-1 mt-2">
            <li>
              <strong>Challenge:</strong> Compete with free music apps.
            </li>
            <li>
              <strong>Strategy:</strong> Added Bollywood playlists, sachet pricing (daily plans), and regional languages.
            </li>
            <li>
              <strong>Result:</strong> 2 million users in 1 week.
            </li>
          </ul>
        </div>
        {/* Netflix’s Global Expansion */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800">Netflix’s Global Expansion</h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-1 mt-2">
            <li>
              <strong>Tactic:</strong> Partnered with local studios for original content (e.g., Sacred Games in India).
            </li>
            <li>
              <strong>Outcome:</strong> 70% of new subscribers from outside the U.S.
            </li>
          </ul>
        </div>
      </section>

      {/* Common Challenges & Solutions Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-4">
          <FaBalanceScale className="mr-2 text-red-500" /> Common Challenges & Solutions
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-gray-800 font-semibold">Challenge</th>
                <th className="py-2 px-4 text-gray-800 font-semibold">Solution</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">Cultural Misalignment</td>
                <td className="py-2 px-4">Hire local experts or conduct ethnographic research.</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">Regulatory Hurdles</td>
                <td className="py-2 px-4">Partner with legal consultants or local incumbents.</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-2 px-4">Resource Constraints</td>
                <td className="py-2 px-4">Start with low-cost pilots (e.g., digital-only entry).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CaseStudiesAndChallenges;
