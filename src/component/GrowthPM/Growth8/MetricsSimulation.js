import React, { useState } from 'react';
import { FaDollarSign,  FaChartLine, FaExclamationTriangle, FaLightbulb } from 'react-icons/fa';

const MetricsSimulation = () => {
  // Input state variables (using sensible ranges)
  const [cac, setCac] = useState(20); // Customer Acquisition Cost ($)
  const [signUpRate, setSignUpRate] = useState(10); // Sign-Up Rate (%)
  const [retentionRate, setRetentionRate] = useState(50); // DAU/MAU (%)
  const [churnRate, setChurnRate] = useState(10); // Churn Rate (%)
  const [arpu, setArpu] = useState(30); // Average Revenue Per User ($)
  const [conversionRate, setConversionRate] = useState(20); // Conversion to Paid (%)

  // Derived calculations
  // Convert percentages to decimals where needed
  const churnDecimal = churnRate / 100;
  const lifetimeValue = churnDecimal > 0 ? (arpu / churnDecimal).toFixed(2) : "N/A";
  const acquisitionEfficiency = cac > 0 ? (lifetimeValue / cac).toFixed(2) : "N/A";

  // Example Business Health Score: A higher score indicates better performance.
  // (This is a simple formula for demonstration; real formulas can be more complex.)
  const healthScore =
    ((conversionRate / 100) * (signUpRate / 100) * (retentionRate / 100) * lifetimeValue) / cac;
  
  // Remarks / Insights based on inputs
  const remarks = [];
  if (cac > arpu) {
    remarks.push("Acquisition cost is high relative to ARPU. Consider optimizing your marketing channels or increasing ARPU.");
  } else {
    remarks.push("CAC is well managed relative to ARPU.");
  }
  if (churnRate > 20) {
    remarks.push("Churn rate is high. Focus on improving retention strategies and customer engagement.");
  } else {
    remarks.push("Churn rate is within a reasonable range.");
  }
  if (conversionRate < 15) {
    remarks.push("Conversion to paid is low. Test different pricing models or incentives to boost conversions.");
  } else {
    remarks.push("Conversion rate is satisfactory.");
  }
  if (retentionRate < 40) {
    remarks.push("Retention is below expectations. Consider features or loyalty programs to increase user stickiness.");
  } else {
    remarks.push("Retention rate is healthy.");
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 flex justify-center items-center">
          <FaChartLine className="mr-2 text-blue-500" /> Metrics & Action Plan Simulation
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Adjust the sliders below to see how key metrics impact your business health and review ethical & strategic insights.
        </p>
      </header>
      
      {/* Metrics Input Section */}
      <div className="space-y-6">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <label className="block text-gray-700 font-medium">
            Customer Acquisition Cost (CAC): ${cac}
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={cac}
            onChange={(e) => setCac(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-4">
          <label className="block text-gray-700 font-medium">
            Sign-Up Rate: {signUpRate}%
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={signUpRate}
            onChange={(e) => setSignUpRate(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-4">
          <label className="block text-gray-700 font-medium">
            Retention (DAU/MAU): {retentionRate}%
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={retentionRate}
            onChange={(e) => setRetentionRate(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-4">
          <label className="block text-gray-700 font-medium">
            Churn Rate: {churnRate}%
          </label>
          <input
            type="range"
            min="1"
            max="50"
            value={churnRate}
            onChange={(e) => setChurnRate(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-4">
          <label className="block text-gray-700 font-medium">
            Average Revenue Per User (ARPU): ${arpu}
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={arpu}
            onChange={(e) => setArpu(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-4">
          <label className="block text-gray-700 font-medium">
            Conversion to Paid: {conversionRate}%
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={conversionRate}
            onChange={(e) => setConversionRate(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Output / Insights Section */}
      <div className="mt-10 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-4">
          <FaDollarSign className="mr-2 text-green-500" /> Simulation Outputs & Insights
        </h2>
        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Customer Lifetime Value (LTV):</strong> ${lifetimeValue}
          </p>
          <p>
            <strong>Acquisition Efficiency (LTV/CAC):</strong> {acquisitionEfficiency}
          </p>
          <p>
            <strong>Business Health Score:</strong>{" "}
            {isNaN(healthScore) ? "N/A" : healthScore.toFixed(2)}
          </p>
        </div>
        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center mb-2">
            <FaExclamationTriangle className="mr-2 text-red-500" /> Remarks & Insights
          </h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            {remarks.map((remark, index) => (
              <li key={index}>{remark}</li>
            ))}
          </ul>
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <FaLightbulb className="mr-2 text-yellow-500" /> Ethical & Strategic Takeaways
            </h3>
            <p className="text-gray-700">
              Remember to balance aggressive growth strategies with ethical considerations. Avoid exploitative pricing, respect local customs, and ensure data privacy compliance. Use these metrics to adjust your action plan: research new markets using frameworks (e.g., PESTEL), validate with MVP tests, localize core features, and run pilots to refine retention.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsSimulation;
