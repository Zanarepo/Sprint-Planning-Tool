import React, { useState, useCallback } from 'react';
import { ChevronDownIcon, ChevronUpIcon, CheckCircleIcon, XCircleIcon, UserIcon, ShoppingCartIcon, CreditCardIcon, ArrowRightIcon, ServerIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import APIgateways from './APIgateways';
import MSandMono from './MSandMono'
import ClientRequestFlow from './ClientRequestFlow'
import InstagramVisualizer from './InstagramVisualizer';
//import LeadTime from './LeadTime'


// Tile component for content sections
const Tile = ({ title, icon, children, useCase, tools, example }) => {
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
          <div className="mt-4 pt-2 border-t border-gray-200">
            <p className="text-sm text-gray-600"><strong>Use Case: </strong>{useCase}</p>
            {tools && (
              <p className="text-sm text-gray-600"><strong>Tools: </strong>{tools.join(', ')}</p>
            )}
            {example && (
              <p className="text-sm text-gray-600"><strong>Example: </strong>{example}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Quiz component
const Quiz = ({ question, options, correctAnswer, onAnswer }) => {
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswer = (option) => {
    setSelected(option);
    const correct = option === correctAnswer;
    setIsCorrect(correct);
    onAnswer(correct);
  };

  return (
    <div className="bg-blue-50 p-6 rounded-lg mb-6 w-full">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{question}</h3>
      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            className={`w-full text-left p-3 rounded-md border ${selected === option ? (isCorrect ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-100') : 'border-gray-300 hover:bg-gray-100'}`}
            onClick={() => handleAnswer(option)}
            disabled={selected !== null}
          >
            {option}
          </button>
        ))}
      </div>
      {selected && (
        <div className="mt-4 flex items-center">
          {isCorrect ? (
            <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
          ) : (
            <XCircleIcon className="w-6 h-6 text-red-500 mr-2" />
          )}
          <p className="text-sm">{isCorrect ? 'Correct!' : `Incorrect. The correct answer is: ${correctAnswer}`}</p>
        </div>
      )}
    </div>
  );
};

// Microservices Simulation Component
const MicroservicesSimulation = () => {
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
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center">
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
      <div className="bg-blue-50 p-4 rounded-lg mb-6 w-full">
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
            <div key={serviceIndex} className="bg-gray-50 p-4 rounded-md shadow w-full">
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
        <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto w-full">
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
        <div className="max-h-64 overflow-y-auto border border-gray-200 rounded p-2 w-full">
          {logs.length === 0 ? (
            <p className="text-gray-500 text-center">No actions taken yet.</p>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="flex items-center p-2 border-b border-gray-200">
                {log.includes('succeeded') ? (
                  <CheckCircleIcon className="w-5 h-6 mr-2 text-green-500" />
                ) : log.includes('failed') || log.includes('Failed') ? (
                  <ExclamationTriangleIcon className="w-5 h-6 mr-2 text-red-500" />
                ) : (
                  <ServerIcon className="w-5 h-6 mr-2 text-blue-500" />
                )}
                <p>{log}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Main Component
const MicroservicesApp = () => {
  const [, setQuizScores] = useState({});

  const handleQuizAnswer = (quizId, isCorrect) => {
    setQuizScores((prev) => ({ ...prev, [quizId]: isCorrect }));
  };

  const quizzes = [
    {
      id: 1,
      question: "What is a key benefit of microservices architecture?",
      options: [
        "All services must use the same programming language",
        "Services can be scaled independently",
        "It requires a single database for all services",
        "It prevents teams from working independently"
      ],
      correctAnswer: "Services can be scaled independently"
    },
    {
      id: 2,
      question: "What does the Strangler pattern help achieve?",
      options: [
        "Building a monolith from scratch",
        "Gradual refactoring of a monolith to microservices",
        "Scaling a single service to handle all traffic",
        "Eliminating the need for APIs"
      ],
      correctAnswer: "Gradual refactoring of a monolith to microservices"
    },
    {
      id: 3,
      question: "What is the role of service discovery in microservices?",
      options: [
        "Manages database transactions",
        "Enables services to locate each other dynamically",
        "Handles front-end rendering",
        "Centralizes all logs"
      ],
      correctAnswer: "Enables services to locate each other dynamically"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 w-full">
      <div className="mx-auto w-full">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800 flex items-center justify-center">
          <svg className="w-8 h-8 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
          Microservices Architecture
        </h1>

        {/* Overview */}
        <Tile
          title="What is Microservices Architecture?"
          icon={<svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" /></svg>}
          useCase="Builds scalable, maintainable apps with independent services."
          tools={['Docker', 'Kubernetes', 'Kong', 'RabbitMQ', 'Kafka']}
          example="Netflix uses microservices for user authentication, recommendations, and streaming."
        >
          Microservices break an application into small, independent services. Each service handles a specific task, uses its own tech stack (like databases), and talks to others via APIs (e.g., REST, event streaming). Teams can choose the best programming language for each service, making development flexible and innovative.
        </Tile>

        {/* Benefits */}
        <Tile
          title="Why Use Microservices?"
          icon={<svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
          useCase="Enables precise scaling, reduces risks, and improves reliability."
          tools={['Jenkins', 'Prometheus', 'Grafana', 'Jaeger', 'Zipkin']}
          example="Amazon uses microservices for product catalogs, payments, and order fulfillment."
        >
          <ul className="list-disc pl-5">
            <li><strong>Independent Work:</strong> Update one service without affecting others.</li>
            <li><strong>Tech Freedom:</strong> Use different tools (e.g., Python, Node.js) for each service.</li>
            <li><strong>Scalability:</strong> Add more instances of a service to handle demand.</li>
            <li><strong>Resilience:</strong> One service failing doesn’t crash the whole app.</li>
            <li><strong>Fast Updates:</strong> Quickly add new features.</li>
          </ul>
        </Tile>

        {/* Key Patterns */}
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Key Patterns in Microservices</h2>

        <Tile
          title="Single Page Application (SPA) Integration"
          icon={<svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          useCase="Creates fast, dynamic user interfaces with scalable backends."
          tools={['React', 'Vue.js', 'Angular', 'Axios', 'Tailwind CSS']}
          example="Spotify’s web player uses SPAs to manage playlists and streaming."
        >
          SPAs use HTML, CSS, and JavaScript to create interfaces that update without reloading. They connect to microservices via REST APIs, making the front-end simple but requiring robust backend services.
        </Tile>

        <Tile
          title="Strangler Pattern"
          icon={<svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>}
          useCase="Gradually migrates monoliths to microservices."
          tools={['AWS', 'Azure', 'NGINX', 'LaunchDarkly']}
          example="Etsy refactored its marketplace using the Strangler pattern."
        >
          <ol className="list-decimal pl-5">
            <li><strong>Transform:</strong> Build new microservices alongside the monolith.</li>
            <li><strong>Coexist:</strong> Run both systems, redirecting users to new features.</li>
            <li><strong>Eliminate:</strong> Shut down the monolith after full migration.</li>
          </ol>
        </Tile>

        <Tile
          title="Service Discovery"
          icon={<svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>}
          useCase="Ensures reliable communication in dynamic environments."
          tools={['Consul', 'Eureka', 'Envoy', 'Istio', 'AWS ELB']}
          example="Uber uses service discovery for ride matching and payments."
        >
          Service discovery helps services find each other dynamically, supporting load balancing and failure recovery as services scale or fail.
        </Tile>

        {/* Challenges */}
        <Tile
          title="Challenges to Understand"
          icon={<svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01m-6.364-9.364a9 9 0 1112.728 0 9 9 0 01-12.728 0z" /></svg>}
          useCase="Informs decisions by highlighting trade-offs."
          tools={['Apache Camel', 'ELK Stack', 'Pact']}
          example="Airbnb uses Kafka to manage distributed data challenges."
        >
          <ul className="list-disc pl-5">
            <li><strong>Complexity:</strong> Managing communication and data consistency.</li>
            <li><strong>Overhead:</strong> Need for monitoring and orchestration.</li>
            <li><strong>Testing:</strong> Coordinating tests across services.</li>
            <li><strong>Data Management:</strong> Each service’s database can complicate transactions.</li>
          </ul>
        </Tile>

        {/* Simulation */}
        <MicroservicesSimulation />

        {/* Quizzes */}
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Test Your Knowledge</h2>
        {quizzes.map((quiz) => (
          <Quiz
            key={quiz.id}
            question={quiz.question}
            options={quiz.options}
            correctAnswer={quiz.correctAnswer}
            onAnswer={(isCorrect) => handleQuizAnswer(quiz.id, isCorrect)}
          />
        ))}

       <div className="flex flex-col items-center w-full px-4 py-6 space-y-6">
  {/* Conclusion */}
  <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
    <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center justify-center">
      <svg className="w-8 h-8 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      Conclusion
    </h2>
    <p className="text-gray-700">
      Microservices make apps scalable and resilient by using independent services. Patterns like SPA, Strangler, and service discovery, with tools like Docker and Kubernetes, solve key challenges. Companies like Netflix, Amazon, and Uber show how powerful microservices can be!
    </p>
  </div>

  {/* Next Steps */}
  <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
    <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center justify-center">
      <svg className="w-8 h-8 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      Next Steps
    </h2>
    <ul className="list-disc pl-5 mx-auto text-left max-w-md">
      <li>Start with a small microservice for a new feature.</li>
      <li>Use monitoring tools like Prometheus and Jaeger.</li>
      <li>Plan monolith refactoring with the Strangler pattern.</li>
      <li>Train teams on microservices tools and patterns.</li>
    </ul>
  </div>

  {/* Other Sections */}
    <div className="w-full  bg-white flex flex-col lg:flex-row gap-4 p-6">
    <APIgateways />
  </div>

  <div className="w-full bg-white flex flex-col lg:flex-row gap-4 p-6">
    <MSandMono />
  </div>

  <div className="w-full bg-white flex flex-col lg:flex-row gap-4 p-6">
    <ClientRequestFlow />
  </div>

  

  <div className="w-full bg-white flex flex-col lg:flex-row gap-4 p-6">
    <InstagramVisualizer />
  
  </div>
    
</div>
      </div>
    </div>
  );  
};

export default MicroservicesApp;