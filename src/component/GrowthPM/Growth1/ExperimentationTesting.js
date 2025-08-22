import React, { useState } from 'react';
import { FaFlask, FaChartBar } from 'react-icons/fa';

const ExperimentationTesting = () => {
  const [visitors, setVisitors] = useState(100);
  const [conversionA, setConversionA] = useState(5);
  const [conversionB, setConversionB] = useState(7);
  const [result, setResult] = useState(null);

  const runSimulation = () => {
    // Calculate conversions for variant A and variant B.
    const conversionsA = Math.round((visitors * conversionA) / 100);
    const conversionsB = Math.round((visitors * conversionB) / 100);
    setResult({ conversionsA, conversionsB });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <header className="mb-8 flex items-center">
          <FaFlask className="text-4xl text-pink-500 mr-4" />
          <h1 className="text-3xl font-bold text-gray-800">
            Experimentation & Testing
          </h1>
        </header>
        <p className="text-gray-600 mb-6">
          Use rigorous testing protocols to validate hypotheses and iterate rapidly. Experimentation is key for uncovering which changes drive real improvements.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Real-Time Use Case: A/B Testing New Feature Ideas
          </h2>
          <p className="text-gray-600 mb-4">
            In this simulation, you can run an A/B test to compare two variants of a new feature idea. By setting different conversion rates for each variant, you can observe which variant performs better under simulated conditions.
          </p>
        </section>

        {/* Simulation Form */}
        <div className="bg-gray-50 p-6 rounded-lg shadow mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaChartBar className="text-2xl text-blue-500 mr-2" /> A/B Test Simulation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Total Visitors</label>
              <input
                type="number"
                value={visitors}
                onChange={(e) => setVisitors(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Conversion Rate Variant A (%)</label>
              <input
                type="number"
                value={conversionA}
                onChange={(e) => setConversionA(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Conversion Rate Variant B (%)</label>
              <input
                type="number"
                value={conversionB}
                onChange={(e) => setConversionB(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <button
            onClick={runSimulation}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Run Simulation
          </button>
        </div>

        {result && (
          <div className="bg-green-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Simulation Results</h3>
            <p className="text-gray-700">
              <strong>Variant A:</strong> {result.conversionsA} conversions out of {visitors} visitors.
            </p>
            <p className="text-gray-700">
              <strong>Variant B:</strong> {result.conversionsB} conversions out of {visitors} visitors.
            </p>
            <p className="text-gray-700 mt-2">
              {result.conversionsA > result.conversionsB
                ? 'Variant A performs better based on the current conversion rate.'
                : result.conversionsA < result.conversionsB
                ? 'Variant B performs better based on the current conversion rate.'
                : 'Both variants perform equally well.'}
            </p>
          </div>
        )}

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Key Takeaways</h2>
          <ul className="list-disc ml-6 text-gray-600">
            <li>Experimentation allows you to validate assumptions and optimize features based on real data.</li>
            <li>A/B testing is a powerful tool to compare variations and select the best performing option.</li>
            <li>Rapid iteration based on testing results can significantly improve product performance and user satisfaction.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ExperimentationTesting;
