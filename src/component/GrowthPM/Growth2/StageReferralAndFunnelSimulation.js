import React, { useState } from 'react';
import { FaShareAlt, FaFunnelDollar } from 'react-icons/fa';

const StageReferralAndFunnelSimulation = () => {
  // Referral Simulation State
  const [refInitial, setRefInitial] = useState(100);
  const [viralCoefficient, setViralCoefficient] = useState(1.5);
  const [refConversion, setRefConversion] = useState(0.1); // 10% conversion rate
  const [refCycles, setRefCycles] = useState(3);
  const [refTotal, setRefTotal] = useState(null);

  // Funnel Simulation State
  const [visitors, setVisitors] = useState(1000);
  const [signupRate, setSignupRate] = useState(0.5); // 50%
  const [onboardRate, setOnboardRate] = useState(0.3); // 30%
  const [purchaseRate, setPurchaseRate] = useState(0.1); // 10%
  const [funnelResults, setFunnelResults] = useState(null);

  // Referral simulation: each cycle, new users = currentUsers * (viralCoefficient * refConversion)
  const runReferralSimulation = () => {
    let total = refInitial;
    let current = refInitial;
    for (let i = 0; i < refCycles; i++) {
      const newUsers = current * viralCoefficient * refConversion;
      total += newUsers;
      current = newUsers;
    }
    setRefTotal(total);
  };

  // Funnel simulation: calculate numbers at each stage
  const runFunnelSimulation = () => {
    const signups = visitors * signupRate;
    const onboarded = signups * onboardRate;
    const purchasers = onboarded * purchaseRate;
    setFunnelResults({ signups, onboarded, purchasers });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen space-y-12">
      {/* Referral Simulation Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaShareAlt className="text-3xl text-teal-500 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-800">Referral Simulation</h2>
        </div>
        <p className="text-gray-700 mb-4">
          <strong>Goal:</strong> Turn users into advocates. Adjust the parameters below and run the simulation to see how many total users you can generate through referrals.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Initial Users:</label>
            <input
              type="number"
              value={refInitial}
              onChange={(e) => setRefInitial(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Viral Coefficient (users invited per user):</label>
            <input
              type="number"
              step="0.1"
              value={viralCoefficient}
              onChange={(e) => setViralCoefficient(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Referral Conversion Rate (0 to 1):</label>
            <input
              type="number"
              step="0.01"
              value={refConversion}
              onChange={(e) => setRefConversion(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Number of Referral Cycles:</label>
            <input
              type="number"
              value={refCycles}
              onChange={(e) => setRefCycles(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        <button
          onClick={runReferralSimulation}
          className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
        >
          Run Referral Simulation
        </button>
        {refTotal !== null && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded">
            <p className="text-gray-800 font-medium">
              Estimated Total Users from Referrals: <span className="font-bold">{Math.round(refTotal)}</span>
            </p>
            <div className="mt-2">
              <p className="text-gray-600">
                <strong>Insights:</strong> If your conversion rate is low or users are not referring enough people, your total user growth will be limited.
              </p>
              <p className="text-gray-600">
                <strong>Recommendations:</strong> Increase incentives for referrals, simplify the sharing process, and provide social proof to encourage more participation.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Funnel Analysis Simulation Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaFunnelDollar className="text-3xl text-indigo-500 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-800">Funnel Analysis Simulation</h2>
        </div>
        <p className="text-gray-700 mb-4">
          <strong>Goal:</strong> Understand how users progress through your funnel. Adjust the funnel conversion rates to see where drop-offs occur.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Initial Visitors:</label>
            <input
              type="number"
              value={visitors}
              onChange={(e) => setVisitors(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Sign-Up Conversion Rate (0 to 1):</label>
            <input
              type="number"
              step="0.01"
              value={signupRate}
              onChange={(e) => setSignupRate(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Onboarding Conversion Rate (0 to 1):</label>
            <input
              type="number"
              step="0.01"
              value={onboardRate}
              onChange={(e) => setOnboardRate(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Purchase Conversion Rate (0 to 1):</label>
            <input
              type="number"
              step="0.01"
              value={purchaseRate}
              onChange={(e) => setPurchaseRate(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        <button
          onClick={runFunnelSimulation}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          Run Funnel Simulation
        </button>
        {funnelResults && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded">
            <p className="text-gray-800 font-medium">
              Sign-Ups: <span className="font-bold">{Math.round(funnelResults.signups)}</span>
            </p>
            <p className="text-gray-800 font-medium">
              Onboarded: <span className="font-bold">{Math.round(funnelResults.onboarded)}</span>
            </p>
            <p className="text-gray-800 font-medium">
              Purchasers: <span className="font-bold">{Math.round(funnelResults.purchasers)}</span>
            </p>
            <div className="mt-2">
              <p className="text-gray-600">
                <strong>Insights:</strong> Identify the stage with the highest drop-off to target improvements.
              </p>
              <p className="text-gray-600">
                <strong>Recommendations:</strong> If sign-ups are high but onboarding is low, consider simplifying your onboarding process or adding tooltips. If purchases are low, focus on increasing trust and offering incentives.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default StageReferralAndFunnelSimulation;
