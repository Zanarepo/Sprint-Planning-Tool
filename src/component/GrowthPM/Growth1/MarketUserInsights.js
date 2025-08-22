import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const MarketUserInsights = () => {
  const [surveyResult, setSurveyResult] = useState(null);

  // Simulation function to generate random survey results for various metrics.
  const simulateSurvey = () => {
    const simulatedData = {
      "Ease of Use": Math.floor(Math.random() * 100),
      "Feature Richness": Math.floor(Math.random() * 100),
      "Performance": Math.floor(Math.random() * 100),
      "Design": Math.floor(Math.random() * 100),
      "Customer Support": Math.floor(Math.random() * 100)
    };

    setSurveyResult(simulatedData);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <header className="flex items-center mb-6">
          <FaSearch className="text-4xl text-blue-500 mr-4" />
          <h1 className="text-3xl font-bold text-gray-800">Market & User Insights</h1>
        </header>
        <p className="text-gray-600 mb-6">
          Market & User Insights involve conducting comprehensive user research and competitive analysis to identify market opportunities. By understanding customer needs, behaviors, and preferences through methods like surveys and heatmaps, teams can uncover areas for product enhancements and validate new features.
        </p>

        {/* Simulation Section */}
        <section className="bg-gray-50 p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Real-Time Use Case: Customer Surveys & Heatmaps
          </h2>
          <p className="text-gray-600 mb-4">
            Gather feedback via customer surveys and use heatmaps to visualize user interactions. These techniques help you pinpoint strengths and weaknesses in your product. For example, understanding which parts of a webpage attract the most attention can guide improvements.
          </p>
          <button 
            onClick={simulateSurvey}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Simulate Survey Results
          </button>
        </section>

        {surveyResult && (
          <div className="bg-gray-50 p-6 rounded-lg shadow mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Simulated Survey Results</h3>
            <ul className="list-disc ml-6">
              {Object.entries(surveyResult).map(([metric, value]) => (
                <li key={metric} className="text-gray-600">
                  <strong>{metric}:</strong> {value}%
                </li>
              ))}
            </ul>
          </div>
        )}

        <footer className="mt-8">
          <p className="text-gray-500 text-center">
            This simulation demonstrates how aggregated survey results can help identify product areas that need attention and drive informed improvements.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default MarketUserInsights;
