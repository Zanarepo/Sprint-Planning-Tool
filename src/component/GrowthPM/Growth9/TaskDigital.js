import React, { useState } from 'react';

const KnowledgeTask = () => {
  const [market, setMarket] = useState('');
  const [strategy, setStrategy] = useState('');
  const [behavior, setBehavior] = useState('');
  const [kpi, setKpi] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Knowledge Task: Create Your Growth Plan
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
          Apply what you've learned by creating a mini-growth plan. In this task, you will:
        </p>
        <ul className="list-disc text-gray-700 max-w-3xl mx-auto mt-4 text-left">
          <li>
            Identify one new market you would like to explore.
          </li>
          <li>
            Outline your digital marketing strategy, including a paid ads and SEO approach.
          </li>
          <li>
            Specify which behavioral psychology tactics you'll use to boost conversions.
          </li>
          <li>
            Define at least one key metric (e.g., CAC, conversion rate) you will track.
          </li>
        </ul>
      </header>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">
            1. Which new market will you explore?
          </label>
          <input
            type="text"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            placeholder="e.g., India, Brazil, Southeast Asia"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">
            2. Outline your digital marketing strategy.
          </label>
          <textarea
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            placeholder="Describe your SEO and paid ads approach..."
            rows="4"
            className="w-full p-2 border border-gray-300 rounded"
            required
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">
            3. Which behavioral psychology tactics will you use?
          </label>
          <textarea
            value={behavior}
            onChange={(e) => setBehavior(e.target.value)}
            placeholder="Mention tactics such as scarcity, social proof, etc."
            rows="4"
            className="w-full p-2 border border-gray-300 rounded"
            required
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">
            4. What key metric will you track and why?
          </label>
          <input
            type="text"
            value={kpi}
            onChange={(e) => setKpi(e.target.value)}
            placeholder="e.g., CAC, Conversion Rate"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Submit Your Plan
        </button>
      </form>

      {submitted && (
        <div className="max-w-3xl mx-auto bg-green-50 border border-green-300 rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Growth Plan Summary</h2>
          <p className="text-gray-700 mb-2">
            <strong>New Market:</strong> {market}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Digital Marketing Strategy:</strong> {strategy}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Behavioral Psychology Tactics:</strong> {behavior}
          </p>
          <p className="text-gray-700">
            <strong>Key Metric:</strong> {kpi}
          </p>
          <p className="mt-4 text-gray-800 font-semibold">
            Review your plan and consider how you will execute it to drive growth.
          </p>
        </div>
      )}
    </div>
  );
};

export default KnowledgeTask;
