import React, { useState } from 'react';
import { FaLightbulb, FaRocket } from 'react-icons/fa';

const StrategicThinkingInnovation = () => {
  const [initialUsers, setInitialUsers] = useState(100);
  const [viralCoefficient, setViralCoefficient] = useState(1.2);
  const [conversionRate, setConversionRate] = useState(0.1);
  const [iterations, setIterations] = useState(5);
  const [growthData, setGrowthData] = useState([]);

  // Function to simulate growth loops
  const simulateGrowth = () => {
    let data = [];
    let currentUsers = Number(initialUsers);
    for (let i = 1; i <= iterations; i++) {
      let newUsers = currentUsers * viralCoefficient * conversionRate;
      data.push({ iteration: i, currentUsers, newUsers, total: currentUsers + newUsers });
      currentUsers += newUsers;
    }
    setGrowthData(data);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <header className="mb-8 text-center">
          <FaLightbulb className="text-5xl text-yellow-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Strategic Thinking & Innovation
          </h1>
          <p className="text-lg text-gray-600">
            Create and implement innovative strategies that drive scalable growth.
          </p>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            What is Strategic Thinking & Innovation?
          </h2>
          <p className="text-gray-600 mb-4">
            <strong>Strategic Thinking</strong> involves developing a long-term vision
            and comprehensive plan that leverages market insights, resources, and trends
            to steer product success. It’s about anticipating challenges and opportunities,
            and aligning all teams towards a common growth objective.
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Innovation</strong> in this role means creating unique, creative solutions
            that open new avenues for growth. For example, designing growth loops—self-sustaining
            cycles where each new user contributes to further user acquisition through referrals
            or network effects.
          </p>
          <p className="text-gray-600">
            <strong>Real-Time Use Case:</strong> Developing growth loops that fuel viral acquisition.
            Imagine a product that rewards users for referring friends; these new users, in turn, are
            incentivized to refer even more people, creating a cycle of exponential growth.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Growth Loop Simulation</h2>
          <p className="text-gray-600 mb-4">
            Use the simulation below to understand how a viral growth loop can exponentially increase your user base.
            Adjust the parameters below and click <strong>Simulate Growth</strong> to see the impact over several iterations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-1">Initial Users</label>
              <input
                type="number"
                value={initialUsers}
                onChange={(e) => setInitialUsers(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Viral Coefficient</label>
              <input
                type="number"
                step="0.1"
                value={viralCoefficient}
                onChange={(e) => setViralCoefficient(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Conversion Rate</label>
              <input
                type="number"
                step="0.01"
                value={conversionRate}
                onChange={(e) => setConversionRate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Iterations</label>
              <input
                type="number"
                value={iterations}
                onChange={(e) => setIterations(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <button
            onClick={simulateGrowth}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Simulate Growth
          </button>
        </section>

        {growthData.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Simulation Results</h2>
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">Iteration</th>
                  <th className="py-2 px-4 border">Current Users</th>
                  <th className="py-2 px-4 border">New Users</th>
                  <th className="py-2 px-4 border">Total Users</th>
                </tr>
              </thead>
              <tbody>
                {growthData.map((data) => (
                  <tr key={data.iteration} className="text-center">
                    <td className="py-2 px-4 border">{data.iteration}</td>
                    <td className="py-2 px-4 border">{data.currentUsers.toFixed(0)}</td>
                    <td className="py-2 px-4 border">{data.newUsers.toFixed(0)}</td>
                    <td className="py-2 px-4 border">{data.total.toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        <footer className="text-center">
          <FaRocket className="text-4xl text-teal-500 mx-auto mb-2" />
          <p className="text-gray-500">
            By harnessing strategic thinking and innovation, you can create scalable growth loops that drive viral acquisition and propel your product's success.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default StrategicThinkingInnovation;
