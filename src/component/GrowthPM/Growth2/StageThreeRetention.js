import React from 'react';
import { FaUserCheck, FaChartLine, FaExclamationCircle, FaRegLightbulb, FaPlayCircle } from 'react-icons/fa';

const StageThreeRetention = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center">
          <FaUserCheck className="mr-2 text-green-500" /> Stage 3: Retention
        </h1>
        <p className="text-lg text-gray-600 mt-2">Goal: Keep users coming back.</p>
      </header>

      {/* Key Metrics */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <FaChartLine className="mr-2 text-blue-500" /> Key Metrics
        </h2>
        <ul className="list-disc ml-8 mt-4 text-gray-700 space-y-1">
          <li><strong>Daily/Weekly Active Users (DAU/WAU):</strong> Measure the number of active users over a given period.</li>
          <li><strong>Churn Rate:</strong> The percentage of users who stop using the product.</li>
        </ul>
      </section>

      {/* Common Bottlenecks */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <FaExclamationCircle className="mr-2 text-red-500" /> Common Bottlenecks
        </h2>
        <ul className="list-disc ml-8 mt-4 text-gray-700 space-y-1">
          <li><strong>Lack of Ongoing Value:</strong> e.g., no new features.</li>
          <li><strong>Poor Engagement Loops:</strong> e.g., no notifications.</li>
          <li><strong>Unaddressed User Pain Points:</strong> Issues that aren't resolved.</li>
        </ul>
      </section>

      {/* Optimization Strategies */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <FaRegLightbulb className="mr-2 text-yellow-500" /> Optimization Strategies
        </h2>
        <ul className="list-disc ml-8 mt-4 text-gray-700 space-y-1">
          <li>
            <strong>Build Habit-Forming Features:</strong> e.g., Netflix’s "Next Episode" autoplay to encourage continuous viewing.
          </li>
          <li>
            <strong>Personalize Content:</strong> e.g., Spotify’s Discover Weekly to keep users engaged with tailored recommendations.
          </li>
          <li>
            <strong>Re-engage Users:</strong> via email/push notifications, similar to LinkedIn’s "Who’s Viewed Your Profile."
          </li>
        </ul>
      </section>

      {/* Exercise */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <FaPlayCircle className="mr-2 text-purple-500" /> Exercise
        </h2>
        <p className="text-gray-700 mt-4">
          Audit a food delivery app’s retention strategy and propose 2 improvements. Consider what features or enhancements could help the app keep users engaged and reduce churn.
        </p>
        <div className="mt-4">
          <label htmlFor="retentionExercise" className="block text-gray-700 font-medium mb-2">
            Your Proposed Improvements:
          </label>
          <textarea
            id="retentionExercise"
            rows="4"
            placeholder="Type your suggestions here..."
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
          <button className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Submit Answer
          </button>
        </div>
      </section>
    </div>
  );
};

export default StageThreeRetention;
