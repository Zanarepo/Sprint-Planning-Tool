import React, { useState } from "react";
import LemonadeSimulation from "./LemonadeSimulation";
import CustomerMarketResearchSimulation from "./CustomerMarketResearchSimulation";
import UserPainPointsSimulation from "./UserPainPointsSimulation";
import CompetitiveAnalysisSimulation from "./CompetitiveAnalysisSimulation";
import UserInterviewSimulation from "./UserInterviewSimulation";

const PracticalsDashboard = () => {
  const [activeModule, setActiveModule] = useState(null);

  const modules = [
 
    { id: "market", label: "Customer Market Research", component: <CustomerMarketResearchSimulation /> },
       { id: "lemonade", label: "Lemonade Simulation", component: <LemonadeSimulation /> },
    { id: "painpoints", label: "User Pain Points", component: <UserPainPointsSimulation /> },
    { id: "analysis", label: "Competitive Analysis", component: <CompetitiveAnalysisSimulation /> },
    { id: "interview", label: "User Interview", component: <UserInterviewSimulation /> },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Practicals Dashboard</h1>

      {/* Buttons Section */}
      <div className="flex flex-wrap gap-4 mb-6">
        {modules.map((mod) => (
          <button
            key={mod.id}
            onClick={() => setActiveModule(mod.id)}
            className={`px-5 py-3 rounded-lg font-medium shadow-md transition-all 
              ${activeModule === mod.id
                ? "bg-yellow-600 text-white scale-105"
                : "bg-yellow-100 text-gray-800 hover:bg-yellow-200"}`}
          >
            {mod.label}
          </button>
        ))}
      </div>

      {/* Module Display */}
      <div className="bg-white p-6 rounded-xl shadow-lg border min-h-[300px]">
        {activeModule ? (
          modules.find((m) => m.id === activeModule)?.component
        ) : (
          <p className="text-gray-600 text-center">Select a module to begin.</p>
        )}
      </div>
    </div>
  );
};

export default PracticalsDashboard;
