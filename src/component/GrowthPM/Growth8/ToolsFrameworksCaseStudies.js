import React from 'react';
import { FaChartBar, FaTools, FaRegNewspaper} from 'react-icons/fa';

const ToolsFrameworksCaseStudies = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center">
          <FaTools className="mr-2 text-indigo-500" /> Tools & Frameworks and Case Studies
        </h1>
      </header>

      {/* Tools & Frameworks Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <FaChartBar className="mr-2 text-blue-500" /> Tools & Frameworks
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-gray-800 font-semibold">Tool/Framework</th>
                <th className="py-2 px-4 text-gray-800 font-semibold">Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">PESTEL Analysis</td>
                <td className="py-2 px-4">Assess macro-environmental factors.</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">SWOT Analysis</td>
                <td className="py-2 px-4">Identify strengths/weaknesses vs. local competitors.</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">TAM-SAM-SOM</td>
                <td className="py-2 px-4">Quantify market potential.</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">Google Trends</td>
                <td className="py-2 px-4">Identify rising demand trends.</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-2 px-4">Hotjar</td>
                <td className="py-2 px-4">Analyze user behavior on localized landing pages.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <FaRegNewspaper className="mr-2 text-green-500" /> Case Studies
        </h2>
        <div className="space-y-6">
          {/* Spotify in India */}
          <div>
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
        </div>
      </section>
    </div>
  );
};

export default ToolsFrameworksCaseStudies;
