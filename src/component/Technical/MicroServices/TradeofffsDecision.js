// src/components/Product/TradeOffSimulator.jsx
import React, { useState } from "react";
import { FaCloud, FaBolt, FaBalanceScale } from "react-icons/fa";

const tradeOffOptions = [
  {
    key: "serverless",
    label: "Serverless Functions",
    icon: <FaCloud />,
    explanation: {
      pros: [
        "Quick deployment and faster time-to-market",
        "Auto-scaling handles variable traffic",
        "Minimal infrastructure management"
      ],
      cons: [
        "Higher cost for sustained high traffic",
        "Potential cold-start latency",
        "Limited control over infrastructure"
      ],
      meaning:
        "Serverless is ideal when you want to launch quickly, scale automatically, and reduce ops effort. Best for event-driven bursts, but may cost more under constant high load."
    }
  },
  {
    key: "autoscale",
    label: "Auto-Scaling Servers",
    icon: <FaBolt />,
    explanation: {
      pros: [
        "Handles peak demand reliably",
        "Can be more cost-effective under consistent load",
        "Better control over server resources"
      ],
      cons: [
        "Setup complexity",
        "Requires monitoring and management",
        "Slower initial deployment compared to serverless"
      ],
      meaning:
        "Auto-scaling servers are ideal when you expect consistent or predictable traffic and want control over infrastructure, but require more setup and monitoring."
    }
  },
  {
    key: "fixedServers",
    label: "Fixed Servers",
    icon: <FaBalanceScale />,
    explanation: {
      pros: [
        "Simple to understand and set up",
        "Predictable cost",
        "Full control over environment"
      ],
      cons: [
        "Cannot handle traffic spikes automatically",
        "Manual scaling required",
        "May underperform during peak load"
      ],
      meaning:
        "Fixed servers work for predictable workloads where cost predictability matters, but they are risky if traffic spikes, as manual intervention is required."
    }
  }
];

export default function TradeOffSimulator() {
  const [selectedFactors, setSelectedFactors] = useState({
    businessImpact: 3,
    costSensitivity: 3,
    timeSensitivity: 3,
    technicalComplexity: 3
  });
  const [recommended, setRecommended] = useState(null);

  const handleFactorChange = (factor, value) => {
    setSelectedFactors((prev) => ({ ...prev, [factor]: Number(value) }));
  };

  const evaluateTradeOff = () => {
    // Simple scoring logic for demonstration:
    const { businessImpact, costSensitivity, timeSensitivity, technicalComplexity } = selectedFactors;

    // Serverless recommended if high business/time impact and moderate complexity
    if (businessImpact + timeSensitivity >= 7 && technicalComplexity <= 4) setRecommended("serverless");
    else if (costSensitivity >= 4 && technicalComplexity >= 4) setRecommended("autoscale");
    else setRecommended("fixedServers");
  };

  const currentRecommendation = tradeOffOptions.find(t => t.key === recommended);

  return (
    <div className="p-6 space-y-6 bg-gray-50 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">⚖️ Trade-Off Decision Simulator</h2>

      {/* Factor Sliders */}
      <div className="space-y-4">
        {Object.keys(selectedFactors).map((factor) => (
          <div key={factor}>
            <label className="block font-medium mb-1">
              {factor.replace(/([A-Z])/g, " $1")} ({selectedFactors[factor]})
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={selectedFactors[factor]}
              onChange={(e) => handleFactorChange(factor, e.target.value)}
              className="w-full"
            />
          </div>
        ))}
      </div>

      {/* Evaluate Button */}
      <button
        onClick={evaluateTradeOff}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Evaluate Trade-Off
      </button>

      {/* Recommendation Panel */}
      {currentRecommendation && (
        <div className="mt-6 p-4 border rounded bg-white shadow">
          <h3 className="text-xl font-semibold flex items-center space-x-2">
            {currentRecommendation.icon}
            <span>Recommended: {currentRecommendation.label}</span>
          </h3>
          <p className="mt-2 font-medium">Meaning:</p>
          <p className="ml-4">{currentRecommendation.explanation.meaning}</p>

          <div className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-green-700">✅ Pros:</p>
              <ul className="list-disc ml-4">
                {currentRecommendation.explanation.pros.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-red-700">⚠️ Cons:</p>
              <ul className="list-disc ml-4">
                {currentRecommendation.explanation.cons.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
