import React from 'react';
import { FaServer, FaDatabase, FaNetworkWired } from 'react-icons/fa';

const CloudInfrastructureInfo = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-8">Cloud Infrastructure</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Servers Section */}
        <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
          <FaServer className="text-5xl text-blue-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Servers</h2>
          <p className="text-gray-700 text-center">
            Servers are computers (physical or virtual) that run apps and process data.
          </p>
          <ul className="mt-4 list-disc list-inside text-gray-600 text-sm">
            <li>Provide CPU, memory, and power</li>
            <li>Can be quickly scaled</li>
            <li>Examples: AWS EC2, Google Compute Engine, Azure VMs</li>
          </ul>
        </div>

        {/* Storage Section */}
        <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
          <FaDatabase className="text-5xl text-purple-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Storage</h2>
          <p className="text-gray-700 text-center">
            Storage is where your data is kept. In the cloud, it scales and is always available.
          </p>
          <ul className="mt-4 list-disc list-inside text-gray-600 text-sm">
            <li><strong>Block:</strong> Like a hard drive for fast access.</li>
            <li><strong>File:</strong> Organizes files in folders.</li>
            <li><strong>Object:</strong> Stores data like images and videos.</li>
          </ul>
        </div>

        {/* Networking Section */}
        <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
          <FaNetworkWired className="text-5xl text-green-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Networking</h2>
          <p className="text-gray-700 text-center">
            Networking connects servers and storage, letting them talk to each other and users.
          </p>
          <ul className="mt-4 list-disc list-inside text-gray-600 text-sm">
            <li>Virtual networks (VPCs)</li>
            <li>Load balancers share traffic</li>
            <li>Firewalls secure data</li>
            <li>CDNs speed up delivery</li>
          </ul>
        </div>
      </div>

      <p className="mt-8 text-center text-gray-500">
        Understanding these basics helps you design, deploy, and manage reliable, scalable, and secure cloud solutions.
      </p>
    </div>
  );
};

export default CloudInfrastructureInfo;
