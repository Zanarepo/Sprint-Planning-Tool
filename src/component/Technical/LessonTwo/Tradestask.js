import React, { useState } from "react";

const featuresList = [
  { name: "User Authentication", cost: 5000, time: 3 },
  { name: "Payment Integration", cost: 10000, time: 3 },
  { name: "AI Recommendations", cost: 15000, time: 4 },
  { name: "Chat Functionality", cost: 8000, time: 3 },
  { name: "Push Notifications", cost: 5000, time: 2 },
  { name: "Advanced Analytics", cost: 12000, time: 4 },
  { name: "Basic Analytics", cost: 5000, time: 2 },
  { name: "Offline Mode", cost: 7000, time: 3 },
  { name: "Dark Mode", cost: 3000, time: 1 },
  { name: "Personlization", cost: 2000, time: 3 },
  { name: "Social Media Sharing", cost: 4000, time: 2 },
];

const tradeoffs = [
  { text: "Reduce development time to 8 weeks BUT lose one major feature.", effect: { time: -4, removeFeature: true } },
  { text: "Add a new feature to stand out, BUT increase costs by $5,000.", effect: { cost: 5000, addFeature: true } },
  { text: "Budget cut by 30%! You must remove features or find a cheaper alternative.", effect: { budget: -15000, removeFeature: true } },
  { text: "Increase app quality, BUT increase development time by 4 weeks.", effect: { time: 4 } },
];

export default function ProductConstraintsTask() {
  const [budget, setBudget] = useState(50000);
  const [time, setTime] = useState(12);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [tradeoff, setTradeoff] = useState(null);

  const handleFeatureSelect = (feature) => {
    if (selectedFeatures.includes(feature.name)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature.name));
      setBudget(budget + feature.cost);
      setTime(time + feature.time);
    } else if (selectedFeatures.length < 5) {
      setSelectedFeatures([...selectedFeatures, feature.name]);
      setBudget(budget - feature.cost);
      setTime(time - feature.time);
    }
  };

  const applyTradeoff = () => {
    if (tradeoff) {
      const effect = tradeoff.effect;
      setBudget((prev) => prev + (effect.cost || 0));
      setTime((prev) => prev + (effect.time || 0));
      if (effect.removeFeature && selectedFeatures.length > 0) {
        setSelectedFeatures(selectedFeatures.slice(0, -1));
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">🚀 Build a Product with Constraints</h1>
      <p>💰 Budget: ${budget} | ⏳ Time: {time} weeks</p>

      <h2 className="font-semibold">📝 Step 1: Choose a Product Concept</h2>
      <p>Select an app category (e.g., FinTech, Health & Fitness, E-commerce, Social Media).</p>

      <h2 className="font-semibold">📊 Step 2: Resource Allocation</h2>
      <p>Select up to 5 features:</p>
      <div className="grid grid-cols-2 gap-2">
        {featuresList.map((feature) => (
          <label key={feature.name} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedFeatures.includes(feature.name)}
              onChange={() => handleFeatureSelect(feature)}
            />
            <span>{feature.name} (${feature.cost}, {feature.time} weeks)</span>
          </label>
        ))}
      </div>

      <h2 className="font-semibold">⚖️ Step 3: Apply Trade-Offs</h2>
      <select onChange={(e) => setTradeoff(tradeoffs[e.target.value])} className="p-2 border rounded">
        <option value="">Select a trade-off</option>
        {tradeoffs.map((tradeoff, index) => (
          <option key={index} value={index}>{tradeoff.text}</option>
        ))}
      </select>
      <button onClick={applyTradeoff} className="mt-2 p-2 bg-blue-500 text-white rounded">Apply Trade-Off</button>

      <h2 className="font-semibold">🏆 Step 4: Pitch the Product</h2>
      <p>Prepare a pitch explaining your chosen features, budget management, and trade-offs.</p>
    </div>
  );
}
