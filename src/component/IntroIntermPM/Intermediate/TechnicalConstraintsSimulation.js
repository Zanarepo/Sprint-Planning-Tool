import React, { useState } from 'react';
import { FaVideo, FaUsers, FaServer, FaCompress } from 'react-icons/fa';

const TechnicalConstraintsSimulation = () => {
  // Simulation state values
  const [concurrentUsers, setConcurrentUsers] = useState(100);
  const [videoResolution, setVideoResolution] = useState(720); // in vertical pixels (360, 480, 720, 1080)
  const [compressionEfficiency, setCompressionEfficiency] = useState(50); // percentage (0-100)

  // Server capacity: the max effective load the current server can handle
  const serverCapacity = 200;

  // Calculate effective load based on inputs:
  // For simplicity: effectiveLoad = concurrentUsers * (videoResolution / 1080) * (1 - compressionEfficiency/100)
  const effectiveLoad =
    concurrentUsers * (videoResolution / 1080) * (1 - compressionEfficiency / 100);

  // Determine status
  const isFeasible = effectiveLoad <= serverCapacity;

  // Generate recommendations based on the simulation outcome
  let recommendation;
  if (isFeasible) {
    recommendation = 'The current setup is feasible. Your server can handle the load. Consider optimizing further for growth.';
  } else {
    recommendation = 'The effective load exceeds server capacity. Consider lowering resolution, improving compression, or scaling your servers.';
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-8">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-3 text-indigo-700">
          <FaVideo className="text-red-500" /> Video Conferencing Simulation
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Understand technical constraints by simulating a video conferencing feature.
          Adjust the parameters to see how server capacity, video resolution, and compression efficiency affect system feasibility.
          Technical constraints such as hardware limits and integration challenges may require you to optimize or phase feature rollouts.
        </p>
      </header>

      {/* Simulation Controls */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <FaServer className="text-blue-500" /> Simulation Controls
        </h2>
        <div className="space-y-6">
          {/* Concurrent Users */}
          <div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700 flex items-center gap-1">
                <FaUsers /> Concurrent Users
              </span>
              <span className="font-bold text-gray-800">{concurrentUsers}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={concurrentUsers}
              onChange={(e) => setConcurrentUsers(Number(e.target.value))}
              className="w-full mt-1"
            />
          </div>

          {/* Video Resolution */}
          <div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700 flex items-center gap-1">
                <FaVideo /> Video Resolution
              </span>
              <span className="font-bold text-gray-800">{videoResolution}p</span>
            </div>
            <input
              type="range"
              min="360"
              max="1080"
              step="60"
              value={videoResolution}
              onChange={(e) => setVideoResolution(Number(e.target.value))}
              className="w-full mt-1"
            />
          </div>

          {/* Compression Efficiency */}
          <div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700 flex items-center gap-1">
                <FaCompress /> Compression Efficiency
              </span>
              <span className="font-bold text-gray-800">{compressionEfficiency}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={compressionEfficiency}
              onChange={(e) => setCompressionEfficiency(Number(e.target.value))}
              className="w-full mt-1"
            />
          </div>
        </div>
      </div>

      {/* Results & Recommendations */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaServer className="text-green-500" /> Simulation Outcome
        </h2>
        <div className={`p-4 rounded ${isFeasible ? 'bg-green-100' : 'bg-red-100'}`}>
          <p className="text-gray-800 font-semibold">
            Effective Load: {effectiveLoad.toFixed(1)} (Server Capacity: {serverCapacity})
          </p>
          <p className="mt-2 text-gray-700">{recommendation}</p>
        </div>
      </div>

      {/* Technical Constraint Explanation */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaServer className="text-purple-500" /> Understanding Technical Constraints
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            <strong>Feasibility:</strong> Not every idea can be built as envisioned due to limitations.
          </li>
          <li>
            <strong>Scalability:</strong> The solution must handle growth in users or data.
          </li>
          <li>
            <strong>Security & Compliance:</strong> Some features must meet strict regulatory standards.
          </li>
          <li>
            <strong>Real-World Example:</strong> If servers can’t support high-resolution streams for thousands of users, you might need to optimize video compression or phase the rollout.
          </li>
          <li>
            <strong>Use-Case Scenario:</strong> For a real-time chat feature, a non-optimized database might force you to adjust feature scope or plan a backend upgrade.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TechnicalConstraintsSimulation;
