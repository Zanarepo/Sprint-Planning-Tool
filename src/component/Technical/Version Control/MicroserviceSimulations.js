import React, { useState } from 'react';
import { FaUsers, FaServer, FaDatabase, FaNetworkWired, FaCogs } from 'react-icons/fa';

const ArchitectureComparisonSimulation = () => {
  const [load, setLoad] = useState(0);

  // Monolithic Architecture: always one server.
  const monolithColor = load > 70 ? 'text-red-500' : 'text-blue-500';

  // Microservices Architecture: number of services scales with load.
  // 0-40% load: 3 services; 41-70%: 4 services; 71-100%: 5 services.
  let microServicesCount = 3;
  if (load > 70) {
    microServicesCount = 5;
  } else if (load > 40) {
    microServicesCount = 4;
  }
  // Calculate per-service load for microservices
  const microServiceLoad = load / microServicesCount;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Architecture Comparison Simulation
      </h1>
      <p className="text-center mb-4">
        Adjust the load slider to simulate system load for both monolithic and microservices architectures.
      </p>

      {/* Load Slider */}
      <div className="w-full max-w-md mx-auto mb-8">
        <label htmlFor="loadSlider" className="block text-center mb-2 font-semibold">
          Simulated System Load: {load}%
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Monolithic Architecture Simulation */}
        <div className="p-4 bg-white border rounded shadow">
          <h2 className="text-2xl font-semibold mb-4 text-center">Monolithic Architecture</h2>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <FaUsers className="text-4xl text-blue-500" />
              <span className="font-semibold">Clients</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaServer className={`text-6xl ${monolithColor}`} />
              <span className="font-semibold">Monolithic Server</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaDatabase className="text-6xl text-purple-500" />
              <span className="font-semibold">Database</span>
            </div>
          </div>
          <div className="mt-4 p-2 bg-gray-50 rounded border">
            <p className="text-center text-sm">
              In a monolithic architecture, all requests are handled by a single server. As load increases, this server may become a bottleneck, leading to potential performance issues.
            </p>
          </div>
        </div>

        {/* Microservices Architecture Simulation */}
        <div className="p-4 bg-white border rounded shadow">
          <h2 className="text-2xl font-semibold mb-4 text-center">Microservices Architecture</h2>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <FaUsers className="text-4xl text-blue-500" />
              <span className="font-semibold">Clients</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaNetworkWired className="text-6xl text-green-500" />
              <span className="font-semibold">Load Balancer</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {Array.from({ length: microServicesCount }).map((_, i) => (
                <div key={i} className="flex flex-col items-center p-2 bg-gray-50 border rounded shadow w-32">
                  <FaCogs
                    className={`text-4xl ${microServiceLoad > 50 ? 'text-red-500' : 'text-green-500'}`}
                  />
                  <span className="mt-2">Service {i + 1}</span>
                  <p className="text-sm text-center">Load: {microServiceLoad.toFixed(0)}%</p>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <FaDatabase className="text-6xl text-purple-500" />
              <span className="font-semibold">Database</span>
            </div>
          </div>
          <div className="mt-4 p-2 bg-gray-50 rounded border">
            <p className="text-center text-sm">
              In a microservices architecture, requests are distributed among multiple independent services. This approach allows for better load distribution, improved fault isolation, and greater scalability.
            </p>
          </div>
        </div>
      </div>

      <footer className="text-center mt-8 text-sm text-gray-600">
        <p>
          The simulation illustrates that while a monolithic system might struggle under high load, a microservices architecture can distribute that load across several services—each handling a portion of the work.
        </p>
      </footer>
    </div>
  );
};

export default ArchitectureComparisonSimulation;
