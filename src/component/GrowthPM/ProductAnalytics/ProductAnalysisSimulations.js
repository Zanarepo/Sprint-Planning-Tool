import { useState } from "react";

export default function ProductAnalysisSimulations() {
  const [simulationResult, setSimulationResult] = useState(null);

  const handleSimulation = (scenario) => {
    let result = "";
    switch (scenario) {
      case "business-goals":
        result = "Deploying additional servers improves performance and user experience.";
        break;
      case "risk-mitigation":
        result = "Investing in redundancy reduces downtime and improves reliability.";
        break;
      case "feature-prioritization":
        result = "Optimizing the database ensures smooth performance for new features.";
        break;
      default:
        result = "No simulation selected.";
    }
    setSimulationResult(result);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Simulation Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Product Analysis Simulations</h1>
        <p className="text-lg mt-2 text-gray-600">
          Interactive scenarios to understand backend-business alignment, risk mitigation, and feature prioritization.
        </p>
      </div>

      {/* Simulation Sections */}
      <section className="mb-12 bg-gray-100 p-6 rounded-md shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800">Aligning Technical and Business Goals</h2>
        <p className="text-lg mt-4 text-gray-600">
          Your company is expanding to new regions. Should you deploy additional servers closer to users to improve performance?
        </p>
        <button 
          onClick={() => handleSimulation("business-goals")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Simulate Decision
        </button>
      </section>

      <section className="mb-12 bg-gray-100 p-6 rounded-md shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800">Risk Mitigation and Trade-offs</h2>
        <p className="text-lg mt-4 text-gray-600">
          Your backend experiences occasional server crashes. Should you invest in redundancy to improve reliability?
        </p>
        <button 
          onClick={() => handleSimulation("risk-mitigation")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Simulate Decision
        </button>
      </section>

      <section className="mb-12 bg-gray-100 p-6 rounded-md shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800">Prioritizing Features Based on Backend Capabilities</h2>
        <p className="text-lg mt-4 text-gray-600">
          A new feature requires extensive database queries. Should you optimize your database before launching it?
        </p>
        <button 
          onClick={() => handleSimulation("feature-prioritization")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Simulate Decision
        </button>
      </section>

      {/* Simulation Result Modal */}
      {simulationResult && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Simulation Result</h3>
            <p className="text-gray-600 mb-4">{simulationResult}</p>
            <button 
              onClick={() => setSimulationResult(null)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
