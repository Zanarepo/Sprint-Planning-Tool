import React, { useState } from 'react';
import { FaChartBar,  FaHandshake } from 'react-icons/fa';

const MarketInsightsAndCollaboration = () => {
  // Simulation state for Market & User Insights: simple survey feedback
  const [feedbackScores, setFeedbackScores] = useState([]);
  const [newScore, setNewScore] = useState('');
  
  const addFeedback = () => {
    const score = Number(newScore);
    if (score >= 1 && score <= 5) {
      setFeedbackScores([...feedbackScores, score]);
      setNewScore('');
    }
  };

  const averageScore =
    feedbackScores.length > 0
      ? (feedbackScores.reduce((acc, cur) => acc + cur, 0) / feedbackScores.length).toFixed(2)
      : 'N/A';

  // Simulation state for Cross-Functional Collaboration: feature enhancement suggestions
  const [suggestions, setSuggestions] = useState([]);
  const [newSuggestion, setNewSuggestion] = useState('');
  const [featureEngagement, setFeatureEngagement] = useState(50); // starting engagement score out of 100

  const addSuggestion = () => {
    if (newSuggestion.trim() !== '') {
      setSuggestions([...suggestions, newSuggestion.trim()]);
      setNewSuggestion('');
      // Simulate improvement: each suggestion adds a random 1-5 points to engagement
      setFeatureEngagement(prev => Math.min(100, prev + Math.floor(Math.random() * 5) + 1));
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Market & User Insights Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaChartBar className="text-4xl text-blue-500 mr-4" />
          <h1 className="text-3xl font-bold text-gray-800">Market & User Insights</h1>
        </div>
        <p className="text-gray-600 mb-4">
          Market and user insights involve gathering data from surveys, user behavior analysis, and competitive research to understand your target audience’s needs, preferences, and pain points.
        </p>
        <div className="bg-gray-50 p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Simulation: User Feedback Survey</h2>
          <p className="text-gray-600 mb-2">
            In this simulation, interns can input a feedback score (1-5) from a survey. The average score represents overall user satisfaction.
          </p>
          <div className="flex items-center mb-4">
            <input
              type="number"
              value={newScore}
              onChange={(e) => setNewScore(e.target.value)}
              placeholder="Enter score (1-5)"
              className="w-full p-2 border border-gray-300 rounded mr-4"
              min="1"
              max="5"
            />
            <button
              onClick={addFeedback}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit Score
            </button>
          </div>
          <div>
            <p className="text-gray-800 font-medium">
              Average User Feedback: {averageScore}
            </p>
            {feedbackScores.length > 0 && (
              <p className="text-gray-600 mt-2">
                Scores: {feedbackScores.join(', ')}
              </p>
            )}
          </div>
        </div>
        <p className="text-gray-600">
          <strong>Use Case:</strong> By collecting user feedback through surveys and analyzing usage data, product managers can identify trends, prioritize feature enhancements, and tailor marketing strategies to better meet user needs.
        </p>
      </div>

      {/* Cross-Functional Collaboration Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaHandshake className="text-4xl text-green-500 mr-4" />
          <h1 className="text-3xl font-bold text-gray-800">Cross-Functional Collaboration</h1>
        </div>
        <p className="text-gray-600 mb-4">
          Cross-functional collaboration involves working closely with engineering, marketing, design, and sales teams to align on strategies and drive product enhancements. The product manager acts as the bridge, ensuring that all perspectives are considered.
        </p>
        <div className="bg-gray-50 p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Simulation: Feature Enhancement Suggestion</h2>
          <p className="text-gray-600 mb-2">
            In this simulation, you can add suggestions from different teams. Each suggestion simulates an improvement that increases the feature engagement score.
          </p>
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={newSuggestion}
              onChange={(e) => setNewSuggestion(e.target.value)}
              placeholder="Enter suggestion from a team"
              className="w-full p-2 border border-gray-300 rounded mr-4"
            />
            <button
              onClick={addSuggestion}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Suggestion
            </button>
          </div>
          <div>
            <p className="text-gray-800 font-medium">
              Feature Engagement Score: {featureEngagement} / 100
            </p>
            {suggestions.length > 0 && (
              <div className="mt-2">
                <h3 className="font-semibold text-gray-700">Team Suggestions:</h3>
                <ul className="list-disc ml-6 text-gray-600">
                  {suggestions.map((sug, index) => (
                    <li key={index}>{sug}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <p className="text-gray-600">
          <strong>Real-Time Use Case:</strong> Coordinating with design teams to refine and enhance a feature. For instance, if the design team suggests an improved user interface that boosts engagement, the product manager works with engineering to implement the change, then tracks the increased engagement.
        </p>
        <p className="text-gray-600 mt-4">
          <strong>Collaboration Context:</strong>
          <br />
          - <strong>Engineering:</strong> Implements technical changes based on collaborative input.
          <br />
          - <strong>Marketing:</strong> Provides insights into user behavior and communicates value propositions.
          <br />
          - <strong>Design:</strong> Crafts intuitive interfaces and visual improvements.
          <br />
          - <strong>Sales:</strong> Shares customer feedback and market trends from the field.
        </p>
      </div>
    </div>
  );
};

export default MarketInsightsAndCollaboration;
