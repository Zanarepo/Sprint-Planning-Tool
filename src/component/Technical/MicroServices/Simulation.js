import React, { useState, useCallback } from 'react';
import { UserIcon, ShoppingCartIcon, CreditCardIcon, ArrowRightIcon, CheckCircleIcon, ExclamationTriangleIcon, ServerIcon } from '@heroicons/react/24/outline';

const EcommerceMicroservicesSimulation = () => {
  const [isSingleInstanceMode, setIsSingleInstanceMode] = useState(true);
  const [services, setServices] = useState([
    {
      name: 'User Service',
      instances: [{ id: 1, status: 'Running', load: 0, responseTime: 0 }],
      registered: true,
      loadPercentage: 0,
    },
    {
      name: 'Cart Service',
      instances: [{ id: 1, status: 'Running', load: 0, responseTime: 0 }],
      registered: true,
      loadPercentage: 0,
    },
    {
      name: 'Payment Service',
      instances: [{ id: 1, status: 'Running', load: 0, responseTime: 0 }],
      registered: true,
      loadPercentage: 0,
    },
  ]);
  const [traffic, setTraffic] = useState(100); // Total requests per second
  const [flow, setFlow] = useState([]);
  const [logs, setLogs] = useState([]);
  const [currentStep, setCurrentStep] = useState(null);
  const [loading, setLoading] = useState(false);

  // Memoized traffic distribution function
  const distributeTraffic = useCallback(() => {
    const totalRunningServices = services.filter(s => s.registered && s.instances.some(i => i.status === 'Running')).length;
    if (totalRunningServices === 0) return;

    const loadPerService = Math.floor(traffic / totalRunningServices);
    const newServices = services.map(service => {
      if (!service.registered || !service.instances.some(i => i.status === 'Running')) {
        return { ...service, loadPercentage: 0, instances: service.instances.map(i => ({ ...i, load: 0 })) };
      }
      const runningInstances = service.instances.filter(i => i.status === 'Running');
      const loadPerInstance = Math.floor(loadPerService / runningInstances.length);
      return {
        ...service,
        loadPercentage: loadPerService,
        instances: service.instances.map(instance => ({
          ...instance,
          load: instance.status === 'Running' ? loadPerInstance : 0,
        })),
      };
    });
    setServices(newServices);
  }, [services, traffic]);

  // Toggle between single and multiple instances
  const toggleInstanceMode = () => {
    const newMode = !isSingleInstanceMode;
    setIsSingleInstanceMode(newMode);
    const newServices = services.map(service => ({
      ...service,
      instances: newMode
        ? [{ id: 1, status: 'Running', load: 0, responseTime: 0 }]
        : [
            { id: 1, status: 'Running', load: 0, responseTime: 0 },
            { id: 2, status: 'Running', load: 0, responseTime: 0 },
          ],
      loadPercentage: 0,
    }));
    setServices(newServices);
    setLogs([...logs, `Switched to ${newMode ? 'Single' : 'Multiple'} Instance Mode`]);
    setFlow([...flow, `System: Switched to ${newMode ? 'Single' : 'Multiple'} Instance Mode`]);
    distributeTraffic();
  };

  // Simulate a user action with API call
  const simulateUserAction = (action, serviceIndex, apiEndpoint) => {
    if (loading) return;
    setLoading(true);
    setCurrentStep(action);
    setFlow([`Client: ${action} request sent (API: ${apiEndpoint})`]);

    const newServices = [...services];
    const service = newServices[serviceIndex];

    // Step 1: Service Discovery
    if (!service.registered) {
      setLogs([...logs, `${service.name}: Not registered with service discovery`]);
      setFlow([...flow, `Service discovery: ${service.name} not found`, 'Request failed']);
      setLoading(false);
      setCurrentStep(null);
      return;
    }
    setFlow([...flow, `Service discovery: Located ${service.name}`]);

    // Step 2: Load Balancer
    const runningInstances = service.instances.filter(i => i.status === 'Running');
    if (runningInstances.length === 0) {
      setLogs([...logs, `${service.name}: No running instances available`]);
      setFlow([...flow, `Load balancer: No running instances for ${service.name}`, 'Request failed']);
      setLoading(false);
      setCurrentStep(null);
      return;
    }
    const instance = runningInstances[Math.floor(Math.random() * runningInstances.length)];
    setFlow([...flow, `Load balancer: Routed to ${service.name} (Instance ${instance.id})`]);

    // Step 3: Process Request
    setTimeout(() => {
      const isFailure = Math.random() < 0.1; // 10% failure chance
      if (isFailure) {
        instance.status = 'Failed';
        instance.load = 0;
        setLogs([...logs, `${action} failed at ${service.name} (Instance ${instance.id})`]);
        if (isSingleInstanceMode) {
          setFlow([...flow, `${service.name} (Instance ${instance.id}): Failed`, 'Client: Service unavailable (single point of failure)']);
        } else {
          setFlow([...flow, `${service.name} (Instance ${instance.id}): Failed`, 'Load balancer: Rerouted to another instance']);
          // Spawn a new instance in multiple instance mode
          const newInstance = {
            id: service.instances.length + 1,
            status: 'Running',
            load: 0,
            responseTime: 0,
          };
          newServices[serviceIndex].instances.push(newInstance);
          setLogs([...logs, `${service.name}: Spawned new instance ${newInstance.id}`]);
          setFlow([...flow, `Service discovery: Spawned new instance ${newInstance.id} for ${service.name}`]);
        }
        setServices(newServices);
        distributeTraffic();

        // Simulate recovery for failed instance after 3 seconds
        setTimeout(() => {
          const recoveredServices = [...services];
          const recoveredInstance = recoveredServices[serviceIndex].instances.find(i => i.id === instance.id);
          if (recoveredInstance) {
            recoveredInstance.status = 'Running';
            setServices(recoveredServices);
            setLogs([...logs, `${service.name} (Instance ${instance.id}) recovered`]);
            setFlow([...flow, `${service.name} (Instance ${instance.id}): Recovered`]);
            distributeTraffic();
          }
        }, 3000);
      } else {
        const responseTime = Math.floor(Math.random() * 300) + 100;
        instance.responseTime = responseTime;
        setLogs([...logs, `${action} succeeded at ${service.name} (Instance ${instance.id}) in ${responseTime}ms`]);
        setFlow([...flow, `${service.name} (Instance ${instance.id}): Processed ${apiEndpoint}`, `Client: Received response in ${responseTime}ms`]);
        setServices(newServices);
      }
      setLoading(false);
      setCurrentStep(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 w-full">
      <div className="mx-auto bg-white shadow-lg rounded-lg p-6 w-full">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center">
          <ServerIcon className="w-8 h-8 mr-2 text-blue-500" />
          E-commerce Microservices Simulation
        </h2>
        <p className="text-gray-700 mb-6 text-center max-w-2xl mx-auto">
          Simulate a user registering, adding to cart, and paying. Toggle between single instance (failure halts service) and multiple instances (reroutes and spawns new instance) modes to see system behavior.
        </p>

        {/* Mode Toggle */}
        <div className="mb-6 text-center">
          <button
            className={`px-4 py-2 rounded text-white ${isSingleInstanceMode ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
            onClick={toggleInstanceMode}
            disabled={loading}
          >
            Switch to {isSingleInstanceMode ? 'Multiple Instances' : 'Single Instance'} Mode
          </button>
          <p className="text-gray-600 mt-2">Current Mode: {isSingleInstanceMode ? 'Single Instance' : 'Multiple Instances'}</p>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">How It Works</h3>
          <p className="text-gray-700">
            1. <strong>Toggle Mode:</strong> Switch between single (1 instance per service) and multiple (2+ instances) modes.<br />
            2. <strong>Actions:</strong> Click "Register User," "Add to Cart," or "Make Payment" to send API requests (e.g., POST /register).<br />
            3. <strong>Service Discovery:</strong> Finds available service instances.<br />
            4. <strong>Load Balancer:</strong> Routes to a running instance.<br />
            5. <strong>Failures:</strong> Single mode: Failure halts service. Multiple mode: Reroutes and spawns new instance.<br />
            6. <strong>Traffic Slider:</strong> Adjust requests to see load distribution.<br />
            7. <strong>Flow:</strong> Arrows show the request path (Client → Discovery → Balancer → Service → Client).<br />
            8. <strong>Load Bars:</strong> Show traffic distribution across services.
          </p>
        </div>

        {/* User Actions */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-center">User Actions</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className={`flex items-center justify-center px-4 py-2 rounded text-white ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }`}
              onClick={() => simulateUserAction('Register User', 0, 'POST /register')}
              disabled={loading}
            >
              <UserIcon className="w-5 h-5 mr-2" />
              Step 1: Register User
            </button>
            <button
              className={`flex items-center justify-center px-4 py-2 rounded text-white ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
              }`}
              onClick={() => simulateUserAction('Add to Cart', 1, 'POST /cart/add')}
              disabled={loading}
            >
              <ShoppingCartIcon className="w-5 h-5 mr-2" />
              Step 2: Add to Cart
            </button>
            <button
              className={`flex items-center justify-center px-4 py-2 rounded text-white ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-500 hover:bg-purple-600'
              }`}
              onClick={() => simulateUserAction('Make Payment', 2, 'POST /payment')}
              disabled={loading}
            >
              <CreditCardIcon className="w-5 h-5 mr-2" />
              Step 3: Make Payment
            </button>
          </div>
          {currentStep && (
            <p className="text-center mt-2 text-gray-600">Current Action: {currentStep}</p>
          )}
        </div>

        {/* Traffic Control */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-center">Traffic Load (requests/second)</h3>
          <input
            type="range"
            min="0"
            max="1000"
            value={traffic}
            onChange={(e) => { setTraffic(Number(e.target.value)); distributeTraffic(); }}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-gray-600 mt-2 text-center">Total Traffic: {traffic} req/s</p>
        </div>

        {/* Load Distribution */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-center">Load Distribution Across Services</h3>
          <div className="space-y-2">
            {services.map((service, index) => (
              <div key={index} className="flex items-center">
                <span className="w-32 text-sm">{service.name}</span>
                <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${Math.min(service.loadPercentage, 100)}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm">{service.loadPercentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Backend Services */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-center">Backend Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {services.map((service, serviceIndex) => (
              <div key={serviceIndex} className="bg-gray-50 p-4 rounded-md shadow">
                <h4 className="font-medium text-gray-800">{service.name}</h4>
                <p>
                  Status: <span className={service.registered ? 'text-green-500' : 'text-red-500'}>
                    {service.registered ? 'Registered' : 'Not Registered'}
                  </span>
                </p>
                <div className="mt-4">
                  <h5 className="font-medium">Instances</h5>
                  {service.instances.length === 0 ? (
                    <p className="text-gray-500">No instances running.</p>
                  ) : (
                    service.instances.map((instance) => (
                      <div
                        key={instance.id}
                        className="flex items-center justify-between p-2 border-b border-gray-200"
                      >
                        <div>
                          <p>
                            Instance {instance.id}: <span
                              className={instance.status === 'Running' ? 'text-green-500' : 'text-red-500'}
                            >
                              {instance.status}
                            </span>
                          </p>
                          <p>Load: {instance.load}%</p>
                          <p>Response: {instance.responseTime ? `${instance.responseTime}ms` : 'N/A'}</p>
                        </div>
                        <button
                          className={`px-3 py-1 rounded text-white ${
                            instance.status === 'Failed' || loading
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-red-500 hover:bg-red-600'
                          }`}
                          onClick={() => {
                            const newServices = [...services];
                            const targetInstance = newServices[serviceIndex].instances.find(i => i.id === instance.id);
                            targetInstance.status = 'Failed';
                            targetInstance.load = 0;
                            setServices(newServices);
                            setLogs([...logs, `${service.name} (Instance ${instance.id}) failed`]);
                            if (isSingleInstanceMode) {
                              setFlow([...flow, `${service.name} (Instance ${instance.id}): Failed`, 'Client: Service unavailable (single point of failure)']);
                            } else {
                              setFlow([...flow, `${service.name} (Instance ${instance.id}): Failed`, 'Load balancer: Rerouted to another instance']);
                              // Spawn a new instance
                              const newInstance = {
                                id: newServices[serviceIndex].instances.length + 1,
                                status: 'Running',
                                load: 0,
                                responseTime: 0,
                              };
                              newServices[serviceIndex].instances.push(newInstance);
                              setServices(newServices);
                              setLogs([...logs, `${service.name}: Spawned new instance ${newInstance.id}`]);
                              setFlow([...flow, `Service discovery: Spawned new instance ${newInstance.id} for ${service.name}`]);
                            }
                            distributeTraffic();
                          }}
                          disabled={instance.status === 'Failed' || loading}
                        >
                          Fail
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Request Flow Visualization */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-center">Request Flow</h3>
          <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
            {flow.length === 0 ? (
              <p className="text-gray-500 text-center">Click a user action to see the request flow.</p>
            ) : (
              <div className="space-y-2">
                {flow.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <ArrowRightIcon className="w-5 h-5 mr-2 text-blue-500" />
                    <p className={step.includes('failed') ? 'text-red-500' : 'text-gray-700'}>{step}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Interaction Log */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-center">Interaction Log</h3>
          <div className="max-h-64 overflow-y-auto border border-gray-200 rounded p-2">
            {logs.length === 0 ? (
              <p className="text-gray-500 text-center">No actions taken yet.</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="flex items-center p-2 border-b border-gray-200">
                  {log.includes('succeeded') ? (
                    <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500" />
                  ) : log.includes('failed') || log.includes('Failed') ? (
                    <ExclamationTriangleIcon className="w-5 h-5 mr-2 text-red-500" />
                  ) : (
                    <ServerIcon className="w-5 h-5 mr-2 text-blue-500" />
                  )}
                  <p>{log}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceMicroservicesSimulation;