import React, { useState } from 'react';
import { FaComments, FaDatabase, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

const RealTimeChatSimulation = () => {
  // State variables for simulation parameters
  const [messagesPerSecond, setMessagesPerSecond] = useState(50);
  const [dbCapacity, setDbCapacity] = useState(60);

  // Determine if the system is overloaded
  const overload = messagesPerSecond > dbCapacity;
  const performanceStatus = overload ? "Overloaded" : "Optimal";
  const recommendation = overload 
    ? "Reduce the message load or increase the database capacity (e.g., optimize queries, add resources) to handle higher traffic."
    : "The system is operating within capacity. Keep monitoring usage as the load grows.";

  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-8">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-3 text-indigo-700">
          <FaComments className="text-blue-500" /> Real-Time Chat Simulation
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          This simulation helps you understand how technical constraints affect a real-time chat feature. 
          Adjust the incoming message rate and the database write capacity to see how they impact system performance.
        </p>
      </header>

      {/* Simulation Controls Tile */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <FaDatabase className="text-green-500" /> Simulation Controls
        </h2>
        <div className="space-y-6">
          {/* Messages per Second Control */}
          <div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Messages per Second</span>
              <span className="font-bold text-gray-800">{messagesPerSecond}</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              step="5"
              value={messagesPerSecond}
              onChange={(e) => setMessagesPerSecond(Number(e.target.value))}
              className="w-full mt-1"
            />
          </div>
          {/* Database Capacity Control */}
          <div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Database Write Capacity (msg/s)</span>
              <span className="font-bold text-gray-800">{dbCapacity}</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              step="5"
              value={dbCapacity}
              onChange={(e) => setDbCapacity(Number(e.target.value))}
              className="w-full mt-1"
            />
          </div>
        </div>
      </div>

      {/* Simulation Outcome Tile */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          {overload ? <FaExclamationCircle className="text-red-500" /> : <FaCheckCircle className="text-green-500" />} Chat Performance Status
        </h2>
        <div className={`p-4 rounded ${overload ? 'bg-red-100' : 'bg-green-100'}`}>
          <p className="text-gray-800 font-semibold">
            Status: {performanceStatus}
          </p>
          <p className="mt-2 text-gray-700">
            Incoming load: {messagesPerSecond} msg/s vs. Database capacity: {dbCapacity} msg/s.
          </p>
          <p className="mt-2 text-gray-700">
            Recommendation: {recommendation}
          </p>
        </div>
      </div>

      {/* Explanation Tile */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaDatabase className="text-purple-500" /> Understanding Technical Constraints in Chat Systems
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            <strong>What It Means:</strong> Technical constraints limit the ability to process incoming data. For a chat system, this is often the database's write speed.
          </li>
          <li>
            <strong>Feasibility:</strong> Not every surge in messages can be handled; systems need to be optimized or scaled accordingly.
          </li>
          <li>
            <strong>Scalability:</strong> As the user base grows, the system must be upgraded to handle increased traffic.
          </li>
          <li>
            <strong>Real-World Example:</strong> If too many messages are sent and the database can’t keep up, users might experience delays or message loss.
          </li>
          <li>
            <strong>Use-Case Scenario:</strong> During peak usage hours, if the incoming message rate exceeds capacity, engineers may need to optimize the database or upgrade the hardware.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RealTimeChatSimulation;
