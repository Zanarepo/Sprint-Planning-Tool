import React, { useState } from 'react';
import { FaUsers, FaServer, FaDatabase, FaNetworkWired } from 'react-icons/fa';


const BackendArchitectureSimulation = () => {
  // Simulate system load (0-100%)
  const [load, setLoad] = useState(0);

  // Determine number of active servers based on the current load:
  // 0-30%: 2 servers; 31-70%: 3 servers; 71-100%: 4 servers.
  let numServers = 2;
  if (load > 70) {
    numServers = 4;
  } else if (load > 30) {
    numServers = 3;
  }

  // Simulate operational cost (an arbitrary multiplier for demonstration)
  const cost = load * 10;

  // Determine system risk level based on load.
  const risk =
    load > 80 ? 'High Risk' : load > 50 ? 'Moderate Risk' : 'Low Risk';

  // Handler to download the simulation as a PDF
  

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800" id="simulation">
      <header className="bg-blue-600 text-white py-6 text-center">
        <h1 className="text-3xl font-bold">
          Backend Architecture Simulation for TPMs
        </h1>
        <p className="mt-2">Simulate system load and observe scaling, cost, and risk!</p>
      </header>

      <main className="p-6">
        {/* Simulation of Architecture Flow */}
        <section className="mb-8">
          {/* Clients */}
          <div className="flex justify-center items-center mb-6">
            <FaUsers className="text-6xl text-blue-500" />
            <span className="mx-4 text-xl font-semibold">Clients</span>
          </div>

          {/* Load Balancer */}
          <div className="flex justify-center items-center mb-6">
            <FaNetworkWired className="text-6xl text-green-500" />
            <span className="mx-4 text-xl font-semibold">Load Balancer</span>
          </div>

          {/* Servers */}
          <div className="flex justify-center items-center mb-6 space-x-4">
            {Array.from({ length: numServers }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center p-4 bg-white border rounded shadow"
              >
                <FaServer
                  className={`text-4xl ${
                    load > 80 ? 'text-red-500' : 'text-blue-500'
                  }`}
                />
                <span className="mt-2">Server {i + 1}</span>
              </div>
            ))}
          </div>

          {/* Database */}
          <div className="flex justify-center items-center mb-6">
            <FaDatabase className="text-6xl text-purple-500" />
            <span className="mx-4 text-xl font-semibold">Database</span>
          </div>

          {/* Load Control */}
          <div className="w-full max-w-md mx-auto">
            <label
              htmlFor="loadSlider"
              className="block text-center mb-2 font-semibold"
            >
              Simulated Load: {load}%
            </label>
            <input
              id="loadSlider"
              type="range"
              min="0"
              max="100"
              value={load}
              onChange={(e) => setLoad(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </section>

        {/* Additional Metrics */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Additional Metrics</h2>
          <div className="mb-4">
            <p className="font-semibold">Operational Cost:</p>
            <p>${cost.toFixed(2)} per unit time (simulated)</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">System Risk Level:</p>
            <p>{risk}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Scaling Observation:</p>
            <p>{numServers} servers active based on current load.</p>
          </div>
        </section>

        {/* Download PDF Button */}
        
      </main>

      <footer className="text-center text-sm text-gray-600 mt-10">
        <p>
          This simulation demonstrates how backend architecture scales under load,
          the associated costs, and risk dynamics.
        </p>
      </footer>
    </div>
  );
};

export default BackendArchitectureSimulation;
