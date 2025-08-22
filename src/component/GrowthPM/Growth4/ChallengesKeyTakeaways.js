import React from 'react';
import { FaExclamationTriangle, FaLightbulb, FaCheckCircle, FaHandsHelping } from 'react-icons/fa';

const ChallengesKeyTakeaways = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Common Challenges & Solutions Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-4">
          <FaExclamationTriangle className="text-red-500 mr-2" /> Common Challenges & Solutions
        </h2>
        <div className="space-y-6">
          {/* Challenge 1 */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 flex items-center mb-2">
              <FaExclamationTriangle className="mr-2" /> Challenge: Engineering prioritizes tech debt over experiments.
            </h3>
            <p className="text-gray-600 flex items-center">
              <FaLightbulb className="text-yellow-500 mr-2" /> 
              <span>
                Solution: Frame growth experiments as opportunities to reduce debt (e.g., refactor code while testing a feature).
              </span>
            </p>
          </div>
          {/* Challenge 2 */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 flex items-center mb-2">
              <FaExclamationTriangle className="mr-2" /> Challenge: Design disagrees with PM on UI changes.
            </h3>
            <p className="text-gray-600 flex items-center">
              <FaLightbulb className="text-yellow-500 mr-2" /> 
              <span>
                Solution: A/B test both versions and let data decide.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Key Takeaways Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-4">
          <FaCheckCircle className="text-green-500 mr-2" /> Key Takeaways
        </h2>
        <div className="space-y-4">
          <p className="text-gray-700 flex items-center">
            <FaHandsHelping className="text-blue-500 mr-2" /> 
            <span>
              Growth PMs are connectors—they translate data into action, align teams, and resolve conflicts.
            </span>
          </p>
          <p className="text-gray-700 flex items-center">
            <FaHandsHelping className="text-blue-500 mr-2" /> 
            <span>
              Success requires empathy (understand team constraints) and clarity (define goals/metrics upfront).
            </span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default ChallengesKeyTakeaways;
