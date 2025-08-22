import React, { useState, useEffect, useRef } from 'react';
import { FaChartBar, FaEye, FaEyeSlash, FaChevronDown, FaChevronUp, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Chart from 'chart.js/auto';
import UsersSizeCalculator from './UsersSizeCalculator';

const ABTestSimulation = () => {
  const [step, setStep] = useState(1);
  const [testConfig, setTestConfig] = useState({
    hypothesis: "If we add a gamified progress bar, then daily active users will increase by 15%, because it motivates users to complete more workouts.",
    sampleSize: 10000,
    duration: 14,
    baselineDAU: 0.3,
    expectedEffect: 0.15,
  });
  const [results, setResults] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [showExplanations, setShowExplanations] = useState({
    hypothesis: false,
    expectedEffect: false,
    sampleSize: false,
    duration: false,
    baselineDAU: false,
    lift: false,
    pValue: false,
    significance: false,
  });

  const runSimulation = () => {
    const { sampleSize, baselineDAU, expectedEffect } = testConfig;
    if (sampleSize < 1000) {
      alert("Sample size must be at least 1000.");
      return;
    }
    if (baselineDAU < 0 || baselineDAU > 1) {
      alert("Baseline DAU must be between 0% and 100%.");
      return;
    }
    if (expectedEffect < 0) {
      alert("Expected effect must be non-negative.");
      return;
    }
    if (testConfig.duration < 1) {
      alert("Test duration must be at least 1 day.");
      return;
    }
    const controlDAU = Array.from({ length: sampleSize }, () =>
      Math.random() < baselineDAU ? 1 : 0
    ).reduce((a, b) => a + b, 0) / sampleSize;
    const treatmentDAU = Array.from({ length: sampleSize }, () =>
      Math.random() < baselineDAU * (1 + expectedEffect) ? 1 : 0
    ).reduce((a, b) => a + b, 0) / sampleSize;
    const p1 = controlDAU;
    const p2 = treatmentDAU;
    const pPooled = (p1 * sampleSize + p2 * sampleSize) / (2 * sampleSize);
    const se = Math.sqrt(pPooled * (1 - pPooled) * (1 / sampleSize + 1 / sampleSize));
    const z = (p2 - p1) / se;
    const pValue = 2 * (1 - normalCDF(Math.abs(z)));
    setResults({
      controlDAU: (controlDAU * 100).toFixed(1),
      treatmentDAU: (treatmentDAU * 100).toFixed(1),
      lift: (((treatmentDAU - controlDAU) / controlDAU) * 100).toFixed(1),
      pValue: pValue.toFixed(4),
      isSignificant: pValue < 0.05,
    });
    setStep(3);
  };

  const normalCDF = (x) => {
    const t = 1 / (1 + 0.2316419 * x);
    const d = 0.3989423 * Math.exp(-(x * x) / 2);
    return 1 - d * (
      0.31938153 * t -
      0.356563782 * t * t +
      1.781477937 * t * t * t -
      1.821255978 * t * t * t * t +
      1.330274429 * t * t * t * t * t
    );
  };

  const toggleExplanation = (key) => {
    setShowExplanations({ ...showExplanations, [key]: !showExplanations[key] });
  };

  const TestSetup = () => (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg border border-yellow-600">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Step 1: Set Up A/B Test</h2>
      <p className="mb-4 text-gray-600 text-sm sm:text-lg">Test a gamified progress bar in a fitness app to see if it boosts daily active users!</p>
      
      {/* Explanations Section */}
      <div className="mb-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">Key Terms</h3>
        {[
          { key: 'hypothesis', title: 'Hypothesis', text: 'Your guess about what will happen. Like saying, "If I add sprinkles to cookies, more friends will eat them because they’re fun!"' },
          { key: 'expectedEffect', title: 'Expected Effect', text: 'How much better you think the new feature will be. If 3 out of 10 friends eat cookies now, you expect 4 with sprinkles (33% better).' },
          { key: 'sampleSize', title: 'Sample Size per Group', text: 'How many people you test. Asking 2 friends isn’t enough, but 100 gives a clearer picture.' },
          { key: 'duration', title: 'Test Duration', text: 'How long you run the test. A 1-day test might miss trends, but 14 days shows what people really like.' },
          { key: 'baselineDAU', title: 'Baseline DAU', text: 'The current percentage of daily active users. If 3 out of 10 friends use the app daily, that’s 30%.' },
          { key: 'lift', title: 'Lift', text: 'How much better the new feature performs. If 4 friends eat new cookies instead of 3, that’s a 33% lift.' },
          { key: 'pValue', title: 'P-Value', text: 'A number showing if your results are real or just luck. Below 0.05 means you’re confident the feature worked.' },
          { key: 'significance', title: 'Significant vs. Insignificant', text: 'If p-value < 0.05, it’s significant (the feature likely worked). If higher, it’s insignificant (maybe just luck).' },
        ].map(({ key, title, text }) => (
          <div key={key} className="mb-2">
            <button
              className="w-full flex justify-between items-center p-3 bg-blue-50 rounded-lg text-gray-800 hover:bg-blue-100"
              onClick={() => toggleExplanation(key)}
            >
              <span className="font-semibold text-sm sm:text-base">{title}</span>
              {showExplanations[key] ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {showExplanations[key] && (
              <p className="p-3 text-gray-600 text-sm sm:text-base">{text}</p>
            )}
          </div>
        ))}
      </div>
      <UsersSizeCalculator />

      {/* Tools Section */}
      <div className="mb-6 p-4 bg-green-50 rounded-lg">
        <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">Tools for A/B Testing</h3>
        <ul className="list-disc pl-5 text-gray-600 text-sm sm:text-base">
          <li><strong>Optimizely</strong>: Test app features easily, like trying two toy designs with friends.</li>
          <li><strong>Google Optimize</strong>: Free tool to test app versions, works with Google Analytics.</li>
          <li><strong>Amplitude</strong>: Tracks user actions with charts to see if your feature works.</li>
          <li><strong>VWO</strong>: Test changes without coding, great for quick experiments.</li>
          <li><strong>Mixpanel</strong>: Monitors user clicks to check if your feature makes the app more engaging.</li>
        </ul>
      </div>

      {/* Input Fields */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Hypothesis</label>
        <textarea
          className="w-full p-3 text-sm sm:text-base border rounded focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
          value={testConfig.hypothesis}
          onChange={(e) => setTestConfig({ ...testConfig, hypothesis: e.target.value })}
          placeholder="E.g., 'If we add a progress bar, more users will engage daily!'"
          rows="4"
          maxLength="200"
        />
        <p className="text-sm text-gray-500">{testConfig.hypothesis.length}/200 characters</p>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Sample Size per Group</label>
        <input
          type="number"
          className={`w-full p-3 text-sm sm:text-base border rounded focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 ${testConfig.sampleSize < 1000 ? 'border-red-500' : ''}`}
          value={testConfig.sampleSize}
          onChange={(e) => setTestConfig({ ...testConfig, sampleSize: Number(e.target.value) })}
          min="1000"
          placeholder="E.g., 10000"
        />
        {testConfig.sampleSize < 1000 && (
          <p className="text-sm text-red-500">Sample size must be at least 1000.</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Test Duration (days)</label>
        <input
          type="number"
          className={`w-full p-3 text-sm sm:text-base border rounded focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 ${testConfig.duration < 1 ? 'border-red-500' : ''}`}
          value={testConfig.duration}
          onChange={(e) => setTestConfig({ ...testConfig, duration: Number(e.target.value) })}
          min="1"
          placeholder="E.g., 14"
        />
        {testConfig.duration < 1 && (
          <p className="text-sm text-red-500">Duration must be at least 1 day.</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Baseline DAU (%)</label>
        <input
          type="number"
          className={`w-full p-3 text-sm sm:text-base border rounded focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 ${testConfig.baselineDAU < 0 || testConfig.baselineDAU > 1 ? 'border-red-500' : ''}`}
          value={testConfig.baselineDAU * 100}
          onChange={(e) => setTestConfig({ ...testConfig, baselineDAU: Number(e.target.value) / 100 })}
          min="0"
          max="100"
          step="0.1"
          placeholder="E.g., 30"
        />
        {(testConfig.baselineDAU < 0 || testConfig.baselineDAU > 1) && (
          <p className="text-sm text-red-500">Baseline DAU must be between 0% and 100%.</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Expected Effect (%)</label>
        <input
          type="number"
          className={`w-full p-3 text-sm sm:text-base border rounded focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 ${testConfig.expectedEffect < 0 ? 'border-red-500' : ''}`}
          value={testConfig.expectedEffect * 100}
          onChange={(e) => setTestConfig({ ...testConfig, expectedEffect: Number(e.target.value) / 100 })}
          min="0"
          step="0.1"
          placeholder="E.g., 15"
        />
        {testConfig.expectedEffect < 0 && (
          <p className="text-sm text-red-500">Expected effect must be non-negative.</p>
        )}
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition duration-300"
          onClick={() => setStep(2)}
        >
          Next: Run Simulation
        </button>
      </div>
    </div>
  );

  const SimulationRunner = () => (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg border border-yellow-600">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Step 2: Run Simulation</h2>
      <p className="mb-4 text-gray-600 text-sm sm:text-lg">
        Click "Start Simulation" to test your progress bar idea on virtual users.
      </p>
      <div className="flex space-x-4">
        <button
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition duration-300"
          onClick={runSimulation}
        >
          Start Simulation
        </button>
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
          onClick={() => setStep(1)}
        >
          Back
        </button>
      </div>
    </div>
  );

  const ResultsDashboard = () => {
    const chartRef = useRef(null);

    useEffect(() => {
      const ctx = document.getElementById("dauChart").getContext("2d");
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Control", "Treatment"],
          datasets: [
            {
              label: "Daily Active Users (%)",
              data: [results.controlDAU, results.treatmentDAU],
              backgroundColor: ["#3B82F6", "#10B981"],
            },
          ],
        },
        options: {
          scales: {
            y: { beginAtZero: true, title: { display: true, text: "DAU (%)" } },
          },
        },
      });
      return () => {
        if (chartRef.current) {
          chartRef.current.destroy();
          chartRef.current = null;
        }
      };
    }, []);

    return (
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg border border-yellow-600">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Step 3: Results</h2>
        <p className="mb-4 text-gray-600 text-sm sm:text-lg">Check the results of your A/B test simulation.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-blue-100 rounded-lg">
            <h3 className="font-semibold text-gray-800">Control DAU</h3>
            <p className="text-sm sm:text-base">{results.controlDAU}%</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg">
            <h3 className="font-semibold text-gray-800">Treatment DAU</h3>
            <p className="text-sm sm:text-base">{results.treatmentDAU}%</p>
          </div>
          <div className="p-4 bg-yellow-100 rounded-lg">
            <h3 className="font-semibold text-gray-800">Lift</h3>
            <p className="text-sm sm:text-base">{results.lift}%</p>
          </div>
          <div className="p-4 bg-purple-100 rounded-lg">
            <h3 className="font-semibold text-gray-800">P-Value</h3>
            <p className="text-sm sm:text-base flex items-center">
              {results.pValue} 
              {results.isSignificant ? (
                <FaCheckCircle className="ml-2 text-green-500" />
              ) : (
                <FaTimesCircle className="ml-2 text-red-500" />
              )}
              {results.isSignificant ? " (Significant)" : " (Not Significant)"}
            </p>
          </div>
        </div>
        <div className="mb-6">
          <canvas id="dauChart" className="w-full max-w-md mx-auto" height="200"></canvas>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold mb-2 text-gray-800">What This Means</h3>
          <p className="text-gray-600 text-sm sm:text-lg">
            {results.isSignificant
              ? "The progress bar significantly boosted DAU! Consider rolling it out to all users."
              : "The progress bar didn’t significantly increase DAU. Try tweaking it or testing a new idea."}
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-gray-800">Next Steps</h3>
          <ul className="list-disc pl-5 text-gray-600 text-sm sm:text-base">
            <li>Check lift and p-value to decide if the feature is worth pursuing.</li>
            <li>Segment users (e.g., by activity level) to uncover specific effects.</li>
            <li>Gather user feedback to understand why the feature worked or didn’t.</li>
            <li>Iterate with a new test or roll out the feature if successful.</li>
          </ul>
        </div>
        <button
          className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition duration-300"
          onClick={() => {
            setStep(1);
            setResults(null);
            setTestConfig({
              hypothesis: "If we add a gamified progress bar, then daily active users will increase by 15%, because it motivates users to complete more workouts.",
              sampleSize: 10000,
              duration: 14,
              baselineDAU: 0.3,
              expectedEffect: 0.15,
            });
          }}
        >
          Start New Test
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-white pt-16 sm:pt-24">
      {/* Header */}
      <header className="mb-8 text-center bg-white border-4 border-yellow-600 rounded-lg shadow-2xl py-4 sm:py-6 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 flex justify-center items-center">
          <FaChartBar className="mr-2 text-yellow-600 text-2xl sm:text-3xl" /> A/B Testing Simulation
        </h1>
        <p className="mt-2 text-sm sm:text-lg text-gray-600 max-w-xl sm:max-w-2xl mx-auto">
          Learn to validate product hypotheses with interactive A/B testing.
        </p>
        <button
          onClick={() => document.getElementById('introduction').scrollIntoView({ behavior: 'smooth' })}
          className="mt-4 bg-yellow-600 text-white py-2 px-4 sm:px-6 rounded-lg hover:bg-yellow-700 transition duration-300 transform hover:scale-105"
        >
          Explore Simulation
        </button>
      </header>

      {/* Progress Bar */}
      <div className="w-full max-w-4xl mx-auto mb-6 px-4 sm:px-6">
        <div className="flex justify-between items-center">
          {['Setup', 'Run', 'Results'].map((s, i) => (
            <div key={s} className="flex-1 text-center">
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center font-bold ${step === i + 1 ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                {i + 1}
              </div>
              <p className="text-sm sm:text-base mt-2 text-gray-800">{s}</p>
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full mt-4">
          <div className={`h-2 bg-yellow-600 rounded-full`} style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>
      </div>

      {/* Introduction Section */}
      <section id="introduction" className="mb-8 sm:mb-12 bg-white shadow-lg rounded-lg border border-yellow-600 max-w-4xl mx-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 bg-gray-50">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Introduction to A/B Testing Simulation</h2>
          <button
            onClick={() => setShowIntro(!showIntro)}
            className="flex items-center bg-yellow-600 text-white py-2 px-3 sm:px-4 rounded-lg hover:bg-yellow-700 transition duration-300"
          >
            {showIntro ? <FaEyeSlash className="mr-2" /> : <FaEye className="mr-2" />}
            {showIntro ? 'Hide' : 'Show'} Introduction
          </button>
        </div>
        {showIntro && (
          <div className="p-4 sm:p-6">
            <p className="text-gray-600 text-sm sm:text-lg leading-relaxed">
              This interactive simulation guides you through A/B testing to validate product ideas, like adding a gamified progress bar to a fitness app. Follow these steps:
            </p>
            <ul className="mt-4 space-y-2 sm:space-y-3 text-gray-600 text-sm sm:text-lg">
              <li><span className="font-semibold text-yellow-600">Step 1: Setup</span> — Define your hypothesis, sample size, test duration, and expected effect.</li>
              <li><span className="font-semibold text-yellow-600">Step 2: Run</span> — Simulate user data to mimic a real A/B test.</li>
              <li><span className="font-semibold text-yellow-600">Step 3: Results</span> — Analyze the outcomes to decide if the feature worked.</li>
            </ul>
            <p className="mt-4 text-gray-600 text-sm sm:text-lg">
              Use the inputs below to customize your test and see the results!
            </p>
          </div>
        )}
      </section>

      {step === 1 && <TestSetup />}
      {step === 2 && <SimulationRunner />}
      {step === 3 && <ResultsDashboard />}
    </div>
  );
};

export default ABTestSimulation;