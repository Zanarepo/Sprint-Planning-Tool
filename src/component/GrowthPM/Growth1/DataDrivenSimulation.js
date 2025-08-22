import React, { useState } from 'react';

const DataDrivenSimulation = () => {
  // Simulation probabilities: 
  // Variant A: 15% conversion rate
  // Variant B: 25% conversion rate
  const conversionProbabilityA = 0.15;
  const conversionProbabilityB = 0.25;

  const [visitorsA, setVisitorsA] = useState(0);
  const [conversionsA, setConversionsA] = useState(0);
  const [visitorsB, setVisitorsB] = useState(0);
  const [conversionsB, setConversionsB] = useState(0);

  const simulateVisitor = (variant) => {
    if (variant === 'A') {
      setVisitorsA(visitorsA + 1);
      // Determine conversion based on probability for Variant A
      if (Math.random() < conversionProbabilityA) {
        setConversionsA(conversionsA + 1);
      }
    } else if (variant === 'B') {
      setVisitorsB(visitorsB + 1);
      // Determine conversion based on probability for Variant B
      if (Math.random() < conversionProbabilityB) {
        setConversionsB(conversionsB + 1);
      }
    }
  };

  const resetSimulation = () => {
    setVisitorsA(0);
    setConversionsA(0);
    setVisitorsB(0);
    setConversionsB(0);
  };

  // Calculate conversion rates
  const conversionRateA = visitorsA ? ((conversionsA / visitorsA) * 100).toFixed(1) : 0;
  const conversionRateB = visitorsB ? ((conversionsB / visitorsB) * 100).toFixed(1) : 0;

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Data-Driven Decision Making Simulation
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
        In this simulation, we use A/B testing to optimize user onboarding flows. Click on the buttons below to simulate visitors for each variant and observe the conversion rates in real-time.
      </p>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Variant A Panel */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Variant A</h2>
          <p className="mb-2">
            <strong>Conversion Probability:</strong> 15%
          </p>
          <p className="mb-2">
            <strong>Visitors:</strong> {visitorsA}
          </p>
          <p className="mb-2">
            <strong>Conversions:</strong> {conversionsA}
          </p>
          <p className="mb-4">
            <strong>Conversion Rate:</strong> {conversionRateA}%
          </p>
          <button
            onClick={() => simulateVisitor('A')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Simulate Visitor for A
          </button>
        </div>

        {/* Variant B Panel */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Variant B</h2>
          <p className="mb-2">
            <strong>Conversion Probability:</strong> 25%
          </p>
          <p className="mb-2">
            <strong>Visitors:</strong> {visitorsB}
          </p>
          <p className="mb-2">
            <strong>Conversions:</strong> {conversionsB}
          </p>
          <p className="mb-4">
            <strong>Conversion Rate:</strong> {conversionRateB}%
          </p>
          <button
            onClick={() => simulateVisitor('B')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Simulate Visitor for B
          </button>
        </div>
      </div>
      <button
        onClick={resetSimulation}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Reset Simulation
      </button>
      <div className="mt-8 max-w-2xl text-gray-700 text-center">
        <p className="mb-2">
          <strong>Key Concept:</strong> Leverage analytics, KPIs, and A/B testing to drive informed decisions.
        </p>
        <p>
          <strong>Real-Time Use Case:</strong> Running experiments to optimize user onboarding flows.
        </p>
      </div>
    </div>
  );
};

export default DataDrivenSimulation;
