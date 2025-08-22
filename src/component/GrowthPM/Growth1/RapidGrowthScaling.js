import React, { useState } from 'react';
import { FaRocket, FaUsers } from 'react-icons/fa';

const RapidGrowthScaling = () => {
  // Simulation state
  const [initialUsers, setInitialUsers] = useState(100);
  const [referralMultiplier, setReferralMultiplier] = useState(2);
  const [cycles, setCycles] = useState(5);
  const [result, setResult] = useState(null);

  // Simulation function: exponential growth through viral loops.
  // For simplicity, total users = initialUsers * (referralMultiplier ^ cycles)
  const simulateGrowth = () => {
    const total = initialUsers * Math.pow(referralMultiplier, cycles);
    setResult(total);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <header className="mb-8 text-center">
          <FaRocket className="mx-auto text-5xl text-teal-500" />
          <h1 className="text-4xl font-bold text-gray-800 mt-4">
            Rapid Growth & Scaling
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Implement scalable strategies that ensure long-term success by leveraging viral loops and referral programs.
          </p>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Concept Overview
          </h2>
          <p className="text-gray-600 mb-4">
            Rapid Growth & Scaling is all about creating strategies that enable a product to grow quickly while maintaining the ability to serve an expanding user base. This involves:
          </p>
          <ul className="list-disc ml-6 text-gray-600">
            <li>
              Designing viral loops where existing users bring in new users through referrals.
            </li>
            <li>
              Implementing referral programs that reward users for inviting friends, thereby boosting user acquisition.
            </li>
            <li>
              Ensuring infrastructure and processes can scale seamlessly to support a growing user base.
            </li>
          </ul>
          <p className="text-gray-600 mt-4">
            <strong>Real-Time Use Case:</strong> Imagine launching a new app and encouraging users to invite friends with the promise of rewards. As users share the app, each successful referral exponentially increases your user base, propelling rapid growth.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Viral Loop & Referral Simulation
          </h2>
          <p className="text-gray-600 mb-4">
            Use the simulation below to see how small changes in referral behavior can lead to dramatic growth over time.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg shadow mb-6">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1" htmlFor="initialUsers">
                Initial Users:
              </label>
              <input
                id="initialUsers"
                type="number"
                value={initialUsers}
                onChange={(e) => setInitialUsers(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1" htmlFor="referralMultiplier">
                Referral Multiplier (New users per user):
              </label>
              <input
                id="referralMultiplier"
                type="number"
                step="0.1"
                value={referralMultiplier}
                onChange={(e) => setReferralMultiplier(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1" htmlFor="cycles">
                Number of Cycles (Referral rounds):
              </label>
              <input
                id="cycles"
                type="number"
                value={cycles}
                onChange={(e) => setCycles(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <button
              onClick={simulateGrowth}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Simulate Growth
            </button>

            {result !== null && (
              <div className="mt-4 flex items-center">
                <FaUsers className="text-2xl text-green-500 mr-2" />
                <span className="text-xl font-semibold text-gray-800">
                  Estimated Total Users: {result.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </section>

        <footer className="text-center">
          <p className="text-gray-500">
            By mastering viral loops and referral strategies, a Growth Product Manager can drive rapid expansion and ensure scalable success.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default RapidGrowthScaling;
