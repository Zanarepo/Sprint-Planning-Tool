import React from 'react';
import { FaSitemap, FaCogs, FaBalanceScale } from 'react-icons/fa';

const KeyTakeaways = () => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Key Takeaways</h2>
      <div className="space-y-6">
        {/* Takeaway 1 */}
        <div className="flex items-start">
          <FaSitemap className="text-4xl text-blue-500 mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-gray-700">
              Scalability is Proactive, Not Reactive
            </h3>
            <p className="text-gray-600">
              Build systems that grow with demand.
            </p>
          </div>
        </div>
        {/* Takeaway 2 */}
        <div className="flex items-start">
          <FaCogs className="text-4xl text-green-500 mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-gray-700">
              Automation is a Force Multiplier
            </h3>
            <p className="text-gray-600">
              Focus on high-leverage tasks.
            </p>
          </div>
        </div>
        {/* Takeaway 3 */}
        <div className="flex items-start">
          <FaBalanceScale className="text-4xl text-purple-500 mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-gray-700">
              Balance Speed and Stability
            </h3>
            <p className="text-gray-600">
              Use metrics to guide decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyTakeaways;
