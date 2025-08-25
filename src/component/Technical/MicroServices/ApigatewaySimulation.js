import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

// Tile component for content sections
const Tile = ({ title, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full">
      <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center">
          {icon}
          <h2 className="text-xl font-bold ml-3 text-gray-800">{title}</h2>
        </div>
        {isOpen ? <ChevronUpIcon className="w-6 h-6 text-gray-500" /> : <ChevronDownIcon className="w-6 h-6 text-gray-500" />}
      </div>
      {isOpen && (
        <div className="text-gray-700">
          {children}
        </div>
      )}
    </div>
  );
};

// Simulated service instance
const ServiceInstance = ({ name, status, zone }) => (
  <div className={`p-2 m-1 rounded ${status === 'active' ? 'bg-green-100' : 'bg-red-100'}`}>
    {name} ({zone}) - {status}
  </div>
);

const ApiGatewaySimulation = () => {
  const [requests, setRequests] = useState([]);
  const [services, setServices] = useState({
    product: [{ id: 1, status: 'active', zone: 'Zone A' }, { id: 2, status: 'active', zone: 'Zone B' }],
    review: [{ id: 1, status: 'active', zone: 'Zone A' }],
    payment: [{ id: 1, status: 'active', zone: 'Zone B' }],
  });
  const [rateLimit] = useState(5);
  const [requestCount, setRequestCount] = useState(0);
  const [authStatus, setAuthStatus] = useState('unauthenticated');

  // Simulate sending a request
  const sendRequest = () => {
    if (requestCount >= rateLimit) {
      setRequests([...requests, { id: Date.now(), status: 'Rate Limited', service: 'N/A' }]);
      return;
    }

    // Simulate authentication
    const isAuthenticated = Math.random() > 0.3; // 70% chance of passing auth
    setAuthStatus(isAuthenticated ? 'authenticated' : 'unauthenticated');

    if (!isAuthenticated) {
      setRequests([...requests, { id: Date.now(), status: 'Auth Failed', service: 'N/A' }]);
      return;
    }

    // Simulate service discovery and routing
    const serviceNames = Object.keys(services);
    const selectedService = serviceNames[Math.floor(Math.random() * serviceNames.length)];
    const availableInstances = services[selectedService].filter(s => s.status === 'active');
    const instance = availableInstances[Math.floor(Math.random() * availableInstances.length)];

    if (instance) {
      setRequests([...requests, { id: Date.now(), status: 'Processed', service: `${selectedService} (${instance.zone})` }]);
      setRequestCount(requestCount + 1);
    } else {
      setRequests([...requests, { id: Date.now(), status: 'No Instance Available', service: selectedService }]);
    }
  };

  // Simulate scaling by adding/removing service instances
  const scaleService = (serviceName, action) => {
    setServices(prev => {
      const newServices = { ...prev };
      if (action === 'add') {
        newServices[serviceName].push({
          id: newServices[serviceName].length + 1,
          status: 'active',
          zone: `Zone ${String.fromCharCode(65 + Math.floor(Math.random() * 2))}`, // Zone A or B
        });
      } else if (action === 'remove' && newServices[serviceName].length > 0) {
        newServices[serviceName].pop();
      }
      return newServices;
    });
  };

  // Reset rate limit every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRequestCount(0);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8 w-full">
      <div className="mx-auto w-full">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800 flex items-center justify-center">
          <svg className="w-8 h-8 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
          API Gateway Simulation
        </h1>

        {/* Simulation Controls */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Control Panel</h2>
          <button
            onClick={sendRequest}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
          >
            Send Request
          </button>
          <button
            onClick={() => scaleService('product', 'add')}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
          >
            Scale Up Product
          </button>
          <button
            onClick={() => scaleService('product', 'remove')}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
          >
            Scale Down Product
          </button>
          <p className="mt-2">Requests in last 10s: {requestCount}/{rateLimit}</p>
          <p>Authentication Status: {authStatus}</p>
        </div>

        {/* API Gateway */}
        <Tile
          title="API Gateway"
          icon={<svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" /></svg>}
        >
          <p>Receives client requests, authenticates, and routes to services.</p>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold">Request Log:</h3>
            {requests.map(req => (
              <p key={req.id}>{req.status} - {req.service}</p>
            ))}
          </div>
        </Tile>

        {/* Service Discovery */}
        <Tile
          title="Service Discovery"
          icon={<svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" /></svg>}
        >
          <p>Dynamically routes requests to available service instances.</p>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold">Active Services:</h3>
            {Object.keys(services).map(service => (
              <div key={service}>
                <h4 className="font-semibold">{service}</h4>
                {services[service].map(instance => (
                  <ServiceInstance key={instance.id} name={service} status={instance.status} zone={instance.zone} />
                ))}
              </div>
            ))}
          </div>
        </Tile>

        {/* API Composition */}
        <Tile
          title="API Composition"
          icon={<svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        >
          <p>Aggregates data from multiple services (e.g., Product + Review).</p>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p>Simulated Response: {requests.length > 0 && requests[requests.length - 1].status === 'Processed' ? 'Combined Product & Review Data' : 'No Data'}</p>
          </div>
        </Tile>

        {/* API Authentication */}
        <Tile
          title="API Authentication"
          icon={<svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>}
        >
          <p>Validates requests (70% pass rate in simulation).</p>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p>Current Auth Status: {authStatus}</p>
          </div>
        </Tile>

        {/* Rate Limiting */}
        <Tile
          title="Rate Limiting"
          icon={<svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>}
        >
          <p>Limits to {rateLimit} requests per 10 seconds.</p>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p>Request Count: {requestCount}/{rateLimit}</p>
          </div>
        </Tile>

        {/* Availability Zones and Scaling */}
        <Tile
          title="Availability Zones and Scaling"
          icon={<svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2-5l-4 7m0 0l4 7m-4-11h12m-4 0H9" /></svg>}
        >
          <p>Services run in Zone A or B, with scaling controls.</p>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p>Scale services using buttons in the control panel.</p>
          </div>
        </Tile>
      </div>
    </div>
  );
};

export default ApiGatewaySimulation;