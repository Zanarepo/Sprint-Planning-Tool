import React from 'react';



import { FaLightbulb, FaChartLine, FaFlask, FaRocket, FaCheckCircle } from 'react-icons/fa';

const ExperimentationGuide = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center">
          <FaRocket className="mr-2 text-teal-500" /> Experimentation for Growth
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          A practical guide to applying experimentation for rapid product growth.
        </p>
      </header>

      {/* Section 1: Core Principles */}
      <section className="mb-12">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FaLightbulb className="text-4xl text-yellow-500 mr-4" />
            <h2 className="text-3xl font-semibold text-gray-800">Core Principles</h2>
          </div>
          <p className="text-gray-700 mb-4">
            <strong>Objective:</strong> Understand why experimentation is critical for growth and how to apply it systematically.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>Hypothesis-Driven:</strong> Start with a clear problem statement and a testable hypothesis.
              <br /><em>Example:</em> "Adding a progress bar to the onboarding flow will increase completion rates by 15%."
            </li>
            <li>
              <strong>Metrics Alignment:</strong> Define success metrics upfront (e.g., conversion rate, retention, revenue) that align with business goals.
            </li>
            <li>
              <strong>Statistical Rigor:</strong> Use confidence intervals (95%+) and sample size calculators to validate results.
            </li>
            <li>
              <strong>Rapid Iteration:</strong> Prioritize speed over perfection—launch small, iterative tests to learn quickly.
            </li>
            <li>
              <strong>Fail Fast:</strong> Embrace "negative" results as learning opportunities to avoid sunk-cost bias.
            </li>
          </ul>
          <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-200">
            <div className="flex items-center">
              <FaChartLine className="text-2xl text-blue-500 mr-2" />
              <p className="text-gray-700">
                <strong>Real-World Use Case:</strong> Netflix constantly tests variations of thumbnails, UI layouts, and recommendation algorithms to optimize user engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Step-by-Step Experimentation Process */}
      <section className="mb-12">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FaFlask className="text-4xl text-purple-500 mr-4" />
            <h2 className="text-3xl font-semibold text-gray-800">Step-by-Step Experimentation Process</h2>
          </div>
          <p className="text-gray-700 mb-4">
            <strong>Objective:</strong> Learn a repeatable framework for running experiments.
          </p>
          <ol className="list-decimal list-inside text-gray-700 space-y-4">
            <li>
              <strong>Formulate a Hypothesis:</strong>
              <br />
              Use the ICE Framework to prioritize ideas:
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li><strong>Impact:</strong> How much will this move the metric?</li>
                <li><strong>Confidence:</strong> How sure are you this will work?</li>
                <li><strong>Ease:</strong> How easy is this to test?</li>
              </ul>
              <br />
              <em>Example Hypothesis:</em> "Simplifying the checkout form from 5 fields to 3 will reduce cart abandonment by 20%."
            </li>
            <li>
              <strong>Design the Experiment:</strong>
              <br />
              Decide between A/B Testing (control vs. variant) or Multivariate Testing (multiple variables, e.g., button color + copy).
              <br />
              <span className="italic text-sm text-gray-600">Tools:</span> Google Optimize, Optimizely, VWO.
            </li>
            <li>
              <strong>Run the Test:</strong>
              <br />
              Ensure statistical significance using tools like Evan Miller’s Sample Size Calculator and avoid contamination (e.g., exclude bots or repeat users).
            </li>
            <li>
              <strong>Analyze Results:</strong>
              <br />
              Focus on primary metrics (conversion rate) and guardrail metrics (site performance). Ask: Did the variant outperform the control? Is the result statistically significant?
            </li>
            <li>
              <strong>Iterate or Scale:</strong>
              <br />
              If successful: Roll out the change and monitor long-term impact. If unsuccessful: Document learnings and pivot to the next hypothesis.
            </li>
          </ol>
          <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-200">
            <div className="flex items-center">
              <FaCheckCircle className="text-2xl text-green-500 mr-2" />
              <p className="text-gray-700">
                <strong>Case Study:</strong> Spotify tested a "Discover Weekly" playlist with a subset of users. The experiment showed increased engagement, leading to a global rollout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center mt-8">
        <p className="text-gray-500">
          By understanding these core principles and following a structured experimentation process, you can make data-driven decisions that fuel continuous growth.
        </p>
      </footer>

    </div>
  );
};

export default ExperimentationGuide;
