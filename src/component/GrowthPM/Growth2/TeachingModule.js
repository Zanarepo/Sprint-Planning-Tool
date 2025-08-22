import React from 'react';
import { FaTools, FaChartBar, FaExclamationTriangle, FaLightbulb } from 'react-icons/fa';

const TeachingModule = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Module Title */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 flex justify-center items-center">
          <FaTools className="mr-2" /> Tools, Techniques & Best Practices
        </h1>
        <p className="text-lg text-gray-600">
          Welcome! In this module, you will learn practical tools, avoid common pitfalls, and explore a real-world case study to improve your sign-up conversion.
        </p>
      </header>

      {/* Section 1: Tools & Techniques */}
      <section className="mb-12 bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaChartBar className="text-3xl text-blue-500 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-800">Tools & Techniques</h2>
        </div>
        <p className="text-gray-700 mb-4">
          <strong>Your objective:</strong> Get hands-on experience with practical tools and skills.
        </p>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Tools You Will Use:</h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>
              <strong>A/B Testing:</strong> Try out tools like Optimizely, VWO, or Google Optimize.
            </li>
            <li>
              <strong>Analytics:</strong> Learn how to use Amplitude, Mixpanel, or Google Analytics to monitor your metrics.
            </li>
            <li>
              <strong>Data Querying:</strong> Use SQL to pull custom metrics and analyze your data.
            </li>
            <li>
              <strong>Behavioral Insights:</strong> Explore Hotjar for heatmaps and session recordings.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Skill-Building Exercises:</h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>
              <strong>SQL Crash Course:</strong> Practice basic queries to analyze experiment data (e.g., calculate conversion rates by cohort).
            </li>
            <li>
              <strong>A/B Test Simulation:</strong> Run a mock test on a landing page using Google Optimize.
            </li>
          </ul>
        </div>
      </section>

      {/* Section 2: Common Pitfalls & How to Avoid Them */}
      <section className="mb-12 bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaExclamationTriangle className="text-3xl text-red-500 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-800">Common Pitfalls & How to Avoid Them</h2>
        </div>
        <p className="text-gray-700 mb-4">
          <strong>Your objective:</strong> Learn how to troubleshoot experiments and avoid common mistakes.
        </p>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Pitfalls to Watch Out For:</h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>
              <strong>Peeking at Results Early:</strong> Avoid stopping a test too soon as it increases the risk of false positives.
            </li>
            <li>
              <strong>Ignoring Segmentation:</strong> Remember that results can differ among user groups (e.g., new vs. returning users).
            </li>
            <li>
              <strong>Overlooking External Factors:</strong> Be aware that seasonality or marketing campaigns can affect your data.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Exercise:</h3>
          <p className="text-gray-700">
            Analyze an experiment that ran during Black Friday and identify where it went wrong. Think about how external factors and premature peeking might have skewed the results.
          </p>
        </div>
      </section>

      {/* Section 3: Case Study: Improving Sign-Up Conversion */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaLightbulb className="text-3xl text-yellow-500 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-800">Case Study: Improving Sign-Up Conversion</h2>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Scenario:</h3>
          <p className="text-gray-700">
            Imagine you are working on a SaaS product with a 30% drop-off rate during sign-up.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Steps to Follow:</h3>
          <ol className="list-decimal ml-6 text-gray-700 space-y-1">
            <li>
              <strong>Hypothesis:</strong> Propose that "Adding social login options (Google/Facebook) will reduce the drop-off rate by 10%."
            </li>
            <li>
              <strong>Experiment:</strong> Run an A/B test comparing social login vs. email-only sign-up.
            </li>
            <li>
              <strong>Result:</strong> Suppose your test shows that the variant increased conversion by 12%, and the results are statistically significant.
            </li>
            <li>
              <strong>Action:</strong> Based on the data, you decide to roll out social login globally.
            </li>
          </ol>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Discussion:</h3>
          <p className="text-gray-700">
            Now, think about how you would measure the long-term retention of users who signed up using social login versus those who used email-only. What metrics would you track?
          </p>
        </div>
      </section>
    </div>
  );
};

export default TeachingModule;
