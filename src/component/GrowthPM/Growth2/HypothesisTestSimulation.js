import React, { useState } from 'react';
import { FaCalculator, FaFlask, FaInfoCircle } from 'react-icons/fa';

const HypothesisTestSimulation = () => {
  // State variables for inputs (defaults in percentages)
  const [baseline, setBaseline] = useState(10); // baseline conversion rate in %
  const [mde, setMde] = useState(15); // Minimum Detectable Effect in %
  const [alpha, setAlpha] = useState(5); // Significance level in %
  const [power, setPower] = useState(80); // Statistical power in %
  const [contamination, setContamination] = useState(0); // Contamination in %
  const [sampleSize, setSampleSize] = useState(null);
  const [comment, setComment] = useState('');

  // Helper: Returns Z-score for a given alpha level (two-tailed)
  // For common significance levels:
  // 5% -> 1.96, 1% -> 2.576, else default to 1.96.
  const getZAlpha = (alphaVal) => {
    if (alphaVal === 5) return 1.96;
    if (alphaVal === 1) return 2.576;
    return 1.96;
  };

  // Helper: Returns Z-score for given power (1 - beta)
  // Common values: 80% -> 0.84, 90% -> 1.28.
  const getZBeta = (powerVal) => {
    if (powerVal === 80) return 0.84;
    if (powerVal === 90) return 1.28;
    return 0.84;
  };

  const calculateSampleSize = () => {
    // Convert percentages to decimals.
    const p = baseline / 100;
    const mdeDecimal = mde / 100; // Percentage increase relative to baseline.
    const d = p * mdeDecimal; // Absolute difference we want to detect.
    
    // Get z-scores for alpha and power.
    const zAlpha = getZAlpha(alpha);
    const zBeta = getZBeta(power);

    // Simplified formula for sample size per group in an A/B test:
    const numerator = Math.pow(zAlpha * Math.sqrt(2 * p * (1 - p)) + zBeta * Math.sqrt(p * (1 - p) + (p + d) * (1 - (p + d))), 2);
    const denominator = Math.pow(d, 2);
    let n = numerator / denominator;

    // Adjust for contamination: Increase sample size to account for data that might be invalid.
    const effectiveFactor = 1 - contamination / 100;
    if (effectiveFactor > 0) {
      n = n / effectiveFactor;
    }

    const result = Math.ceil(n);
    setSampleSize(result);

    // Provide comments on the output.
    let commentText = `Based on the parameters:
- A baseline conversion rate of ${baseline}% means that out of 100 visitors, ${baseline} are expected to convert.
- An MDE of ${mde}% indicates you want to detect at least a ${mde}% relative change.
- A significance level (α) of ${alpha}% means there is a ${alpha}% chance of a false positive.
- A statistical power of ${power}% means you have an ${power}% chance of detecting a true effect.
- Contamination of ${contamination}% implies that this portion of your data might be noisy or invalid. 

A required sample size of ${result} per group is considered good if it is feasible for your traffic volume. Lower numbers are generally better (less traffic needed) but must balance with realistic expectations of effect size and data quality. High contamination or overly strict significance/power levels will increase the sample size, which might be challenging if your traffic is low.`;
    setComment(commentText);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <header className="mb-6 flex items-center">
          <FaFlask className="text-4xl text-purple-500 mr-4" />
          <h1 className="text-3xl font-bold text-gray-800">Hypothesis Test Simulation</h1>
        </header>
        <p className="text-gray-700 mb-6">
          This tool simulates an A/B test for your hypothesis. Adjust the parameters below to ensure statistical significance and to account for data contamination (e.g., bots or repeat users).
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Baseline Conversion Rate (%)</label>
            <input
              type="number"
              value={baseline}
              onChange={(e) => setBaseline(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g., 10"
            />
            <p className="text-xs text-gray-500">
              This is the current conversion rate. For example, 10% means 10 out of every 100 users convert.
            </p>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Minimum Detectable Effect (%)</label>
            <input
              type="number"
              value={mde}
              onChange={(e) => setMde(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g., 15"
            />
            <p className="text-xs text-gray-500">
              This is the smallest improvement you want to detect. For example, 15% means you want to see a 15% relative improvement from the baseline.
            </p>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Significance Level (α, %)</label>
            <input
              type="number"
              value={alpha}
              onChange={(e) => setAlpha(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g., 5"
            />
            <p className="text-xs text-gray-500">
              This is the probability of a false positive (detecting an effect that isn't real). Lower values mean stricter tests.
            </p>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Statistical Power (%)</label>
            <input
              type="number"
              value={power}
              onChange={(e) => setPower(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g., 80"
            />
            <p className="text-xs text-gray-500">
              This is the probability of correctly detecting a real effect. A power of 80% or higher is generally desired.
            </p>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Contamination (%)</label>
            <input
              type="number"
              value={contamination}
              onChange={(e) => setContamination(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g., 0"
            />
            <p className="text-xs text-gray-500">
              This estimates the percentage of your data that might be invalid (such as from bots or duplicate entries). Lower is better.
            </p>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            onClick={calculateSampleSize}
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors"
          >
            <FaCalculator className="mr-2" /> Calculate Sample Size
          </button>
        </div>

        {sampleSize !== null && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded">
            <div className="flex items-center">
              <FaInfoCircle className="text-2xl text-green-500 mr-2" />
              <p className="text-gray-700 font-medium">
                Required Sample Size per Group: <span className="font-bold">{sampleSize.toLocaleString()}</span>
              </p>
            </div>
            <div className="mt-4 text-gray-600 text-sm">
              {comment}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HypothesisTestSimulation;
