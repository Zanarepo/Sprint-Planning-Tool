import React, { useState } from 'react';
import { FaShoppingCart, FaServer, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

const OrderProcessingSimulation = () => {
  // State variables for simulation parameters
  const [ordersPerMinute, setOrdersPerMinute] = useState(100);
  const [processingCapacity, setProcessingCapacity] = useState(120);

  // Determine if the system is overloaded
  const isOverloaded = ordersPerMinute > processingCapacity;
  const systemStatus = isOverloaded ? "Overloaded" : "Optimal";
  const recommendation = isOverloaded 
    ? "The incoming order load exceeds the server capacity. Consider scaling up your processing power, optimizing code, or using load balancers."
    : "The system is operating within capacity. Continue monitoring and optimize as necessary to handle future load increases.";

  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-8">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-3 text-indigo-700">
          <FaShoppingCart className="text-green-500" /> Order Processing Simulation
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          This simulation demonstrates how technical constraints impact an e-commerce order processing system.
          Adjust the sliders for incoming orders and server processing capacity to see how they affect system performance.
        </p>
      </header>

      {/* Simulation Controls */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <FaServer className="text-blue-500" /> Simulation Controls
        </h2>
        <div className="space-y-6">
          {/* Orders per Minute */}
          <div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Orders per Minute</span>
              <span className="font-bold text-gray-800">{ordersPerMinute}</span>
            </div>
            <input
              type="range"
              min="0"
              max="300"
              step="5"
              value={ordersPerMinute}
              onChange={(e) => setOrdersPerMinute(Number(e.target.value))}
              className="w-full mt-1"
            />
          </div>

          {/* Server Processing Capacity */}
          <div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Processing Capacity (Orders/min)</span>
              <span className="font-bold text-gray-800">{processingCapacity}</span>
            </div>
            <input
              type="range"
              min="0"
              max="300"
              step="5"
              value={processingCapacity}
              onChange={(e) => setProcessingCapacity(Number(e.target.value))}
              className="w-full mt-1"
            />
          </div>
        </div>
      </div>

      {/* Outcome & Recommendation */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          {isOverloaded ? (
            <FaExclamationTriangle className="text-red-500" />
          ) : (
            <FaCheckCircle className="text-green-500" />
          )}{" "}
          System Status
        </h2>
        <div className={`p-4 rounded ${isOverloaded ? 'bg-red-100' : 'bg-green-100'}`}>
          <p className="text-gray-800 font-semibold">
            Status: {systemStatus}
          </p>
          <p className="mt-2 text-gray-700">
            Incoming Orders: {ordersPerMinute} orders/min vs. Processing Capacity: {processingCapacity} orders/min.
          </p>
          <p className="mt-2 text-gray-700">
            Recommendation: {recommendation}
          </p>
        </div>
      </div>

      {/* Explanation Tile */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaServer className="text-purple-500" /> Understanding Technical Constraints in Order Processing
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            <strong>Incoming Orders:</strong> Represents the load from customers placing orders on the site.
          </li>
          <li>
            <strong>Processing Capacity:</strong> The maximum number of orders the system can process per minute.
          </li>
          <li>
            <strong>System Overload:</strong> When orders per minute exceed processing capacity, orders may queue up or get delayed.
          </li>
          <li>
            <strong>Real-World Implication:</strong> An overloaded system can lead to poor customer experience, lost sales, and increased support queries.
          </li>
          <li>
            <strong>Use-Case Scenario:</strong> During high-traffic events like Black Friday, ensuring that the processing capacity meets the surge in orders is critical.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OrderProcessingSimulation;
