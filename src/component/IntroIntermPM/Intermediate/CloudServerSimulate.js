import React, { useState, useEffect } from "react";
import { FaNetworkWired, FaServer, FaDatabase, FaArrowRight, FaPrint } from "react-icons/fa";
import CloudComputingInfo from "./CloudComputingInfo";

/* Print Button Component */
const PrintButton = () => {
  return (
    <button
      onClick={() => window.print()}
      className="m-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg inline-flex items-center transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600"
      aria-label="Print this page"
    >
      <FaPrint className="mr-2 text-xl" />
      Print
    </button>
  );
};

/* Quiz Component */
const Quiz = ({ quizId, question, options, correctAnswer }) => {
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleOptionChange = (e) => {
    setSelected(e.target.value);
    setFeedback("");
  };

  const handleSubmit = () => {
    if (!selected) {
      setFeedback("Please select an answer.");
      return;
    }
    if (selected === correctAnswer) {
      setFeedback("Correct! 🎉");
    } else {
      setFeedback("Incorrect. Try again!");
    }
  };

  return (
    <div className="bg-yellow-50 p-4 sm:p-6 rounded-lg border border-yellow-300 mt-4 shadow-md">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">{question}</h3>
      {options.map((option, index) => (
        <label
          key={index}
          className="block mb-2 cursor-pointer text-gray-700 text-sm sm:text-base hover:bg-yellow-100 rounded p-1 transition duration-200"
        >
          <input
            type="radio"
            name={quizId}
            value={option.value}
            onChange={handleOptionChange}
            className="mr-2 accent-yellow-600 focus:ring-yellow-600"
          />
          {option.text}
        </label>
      ))}
      <button
        onClick={handleSubmit}
        className="mt-2 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
      >
        Submit Answer
      </button>
      {feedback && (
        <div
          className={`mt-2 font-bold text-sm sm:text-base animate-pulse ${
            feedback.startsWith("Correct") ? "text-green-600" : "text-red-600"
          }`}
        >
          {feedback}
        </div>
      )}
    </div>
  );
};

/* Explanation Component */
const Explanation = ({ title, icon, description, useCases }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 flex items-center">
        <span className="mr-2 text-xl sm:text-2xl">{icon}</span>
        {title}
      </h2>
      <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">{description}</p>
      <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-1">Use Cases:</h3>
      <ul className="list-disc ml-6 text-gray-700 text-sm sm:text-base">
        {useCases.map((useCase, idx) => (
          <li key={idx}>{useCase}</li>
        ))}
      </ul>
    </div>
  );
};

/* App Component */
function App() {
  const [networkRequests, setNetworkRequests] = useState([]);
  const [serverQueue, setServerQueue] = useState([]);
  const [storageOperations, setStorageOperations] = useState([]);
  const [openSections, setOpenSections] = useState({
    introduction: true,
    explanations: true,
    simulation: true,
    infrastructureInfo: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newRequest = {
        id: Date.now(),
        type: Math.random() > 0.5 ? "Read" : "Write",
        timestamp: new Date().toLocaleTimeString(),
      };
      setNetworkRequests((prev) => [...prev, newRequest].slice(-10)); // Limit to 10 items
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkRequests((prevRequests) => {
        if (prevRequests.length === 0) return prevRequests;
        const [requestToProcess, ...remainingRequests] = prevRequests;
        setServerQueue((prevQueue) => [...prevQueue, requestToProcess].slice(-10));
        return remainingRequests;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setServerQueue((prevQueue) => {
        if (prevQueue.length === 0) return prevQueue;
        const [processedRequest, ...remainingQueue] = prevQueue;
        setStorageOperations((prevStorage) => [...prevStorage, processedRequest].slice(-10));
        return remainingQueue;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const explanations = [
    {
      title: "Networking",
      icon: <FaNetworkWired />,
      description: "Handles incoming requests and routes them to servers, acting as the entry point for all data traffic in the cloud.",
      useCases: [
        "Routing user requests to the nearest data center for low latency.",
        "Load balancing traffic across multiple servers to prevent overload.",
        "Securing data transmission with protocols like HTTPS.",
      ],
    },
    {
      title: "Servers",
      icon: <FaServer />,
      description: "Processes requests like a busy factory, executing computations and preparing data for storage or response.",
      useCases: [
        "Running application logic for web and mobile apps.",
        "Processing real-time data for analytics dashboards.",
        "Handling API requests for microservices architectures.",
      ],
    },
    {
      title: "Storage",
      icon: <FaDatabase />,
      description: "Saves processed data for future use, ensuring data persistence and availability for retrieval.",
      useCases: [
        "Storing user data for applications like social media platforms.",
        "Archiving logs for compliance and auditing purposes.",
        "Caching frequently accessed data for faster retrieval.",
      ],
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans">
      <PrintButton />

      {/* Introduction Section */}
      <section className="mb-8 border-b border-blue-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">☁️</span>
            Cloud Infrastructure Simulator
          </h1>
          <button
            onClick={() => toggleSection("introduction")}
            className="text-blue-600 hover:text-blue-700 text-sm sm:text-base"
            aria-expanded={openSections.introduction}
            aria-controls="introduction-section"
          >
            {openSections.introduction ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.introduction ? "max-h-max" : "max-h-0"}`}>
          <div className="m-4 bg-blue-50 p-4 sm:p-6 rounded-lg shadow-lg border border-blue-300">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              This interactive simulator demonstrates how three core components in cloud computing—Networking, Servers, and Storage—work together to process data. Watch requests flow through each layer and explore their roles.
            </p>
            <Quiz
              quizId="introQuiz"
              question="What is the primary role of the Networking layer in cloud computing?"
              options={[
                { value: "A", text: "Storing processed data." },
                { value: "B", text: "Processing computations." },
                { value: "C", text: "Routing incoming requests to servers." },
                { value: "D", text: "Executing application logic." },
              ]}
              correctAnswer="C"
            />
          </div>
        </div>
      </section>

      {/* Explanations Section */}
      <section className="mb-8 border-b border-blue-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">💡</span>
            Core Components
          </h1>
          <button
            onClick={() => toggleSection("explanations")}
            className="text-blue-600 hover:text-blue-700 text-sm sm:text-base"
            aria-expanded={openSections.explanations}
            aria-controls="explanations-section"
          >
            {openSections.explanations ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.explanations ? "max-h-max" : "max-h-0"}`}>
          <div className="m-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {explanations.map((exp) => (
              <Explanation
                key={exp.title}
                title={exp.title}
                icon={exp.icon}
                description={exp.description}
                useCases={exp.useCases}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Simulation Section */}
      <section className="mb-8 border-b border-blue-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">🔄</span>
            Simulation
          </h1>
          <button
            onClick={() => toggleSection("simulation")}
            className="text-blue-600 hover:text-blue-700 text-sm sm:text-base"
            aria-expanded={openSections.simulation}
            aria-controls="simulation-section"
          >
            {openSections.simulation ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.simulation ? "max-h-max" : "max-h-0"}`}>
          <div className="m-4 bg-blue-50 p-4 sm:p-6 rounded-lg shadow-lg border border-blue-300">
            <div className="flex flex-col sm:flex-row items-center justify-around space-y-4 sm:space-y-0">
              <div className="panel networking w-full sm:w-1/4 bg-blue-100 border-blue-500 animate-pulse">
                <h2 className="text-base sm:text-lg font-semibold flex items-center justify-center border-b border-blue-500 pb-2 mb-2">
                  <FaNetworkWired className="mr-2 text-xl" /> Networking
                </h2>
                <ul className="text-sm sm:text-base">
                  {networkRequests.map((req) => (
                    <li key={req.id} className="mb-2 p-2 bg-white border border-blue-200 rounded animate-slide-in">
                      {req.timestamp}: Request {req.id} - {req.type}
                    </li>
                  ))}
                </ul>
              </div>
              <FaArrowRight className="text-blue-600 mx-2 sm:mx-4 text-2xl sm:text-3xl" />
              <div className="panel servers w-full sm:w-1/4 bg-green-100 border-green-500 animate-pulse">
                <h2 className="text-base sm:text-lg font-semibold flex items-center justify-center border-b border-green-500 pb-2 mb-2">
                  <FaServer className="mr-2 text-xl" /> Servers
                </h2>
                <ul className="text-sm sm:text-base">
                  {serverQueue.map((req) => (
                    <li key={req.id} className="mb-2 p-2 bg-white border border-green-200 rounded animate-slide-in">
                      {req.timestamp}: Processing Request {req.id} - {req.type}
                    </li>
                  ))}
                </ul>
              </div>
              <FaArrowRight className="text-blue-600 mx-2 sm:mx-4 text-2xl sm:text-3xl" />
              <div className="panel storage w-full sm:w-1/4 bg-purple-100 border-purple-500 animate-pulse">
                <h2 className="text-base sm:text-lg font-semibold flex items-center justify-center border-b border-purple-500 pb-2 mb-2">
                  <FaDatabase className="mr-2 text-xl" /> Storage
                </h2>
                <ul className="text-sm sm:text-base">
                  {storageOperations.map((req) => (
                    <li key={req.id} className="mb-2 p-2 bg-white border border-purple-200 rounded animate-slide-in">
                      {req.timestamp}: Completed {req.type} for Request {req.id}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Quiz
              quizId="simulationQuiz"
              question="What happens to a request after it is processed by the Servers layer?"
              options={[
                { value: "A", text: "It is sent back to the Networking layer." },
                { value: "B", text: "It is stored in the Storage layer." },
                { value: "C", text: "It is discarded." },
                { value: "D", text: "It is reprocessed by the Servers." },
              ]}
              correctAnswer="B"
            />
          </div>
        </div>
      </section>

      {/* Cloud Computing Info Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">☁️</span>
            Cloud Computing Info
          </h1>
          <button
            onClick={() => toggleSection("infrastructureInfo")}
            className="text-blue-600 hover:text-blue-700 text-sm sm:text-base"
            aria-expanded={openSections.infrastructureInfo}
            aria-controls="infrastructure-info-section"
          >
            {openSections.infrastructureInfo ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.infrastructureInfo ? "max-h-max" : "max-h-0"}`}>
          <div className="m-4 bg-blue-50 p-4 sm:p-6 rounded-lg shadow-lg border border-blue-300">
            <CloudComputingInfo />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;