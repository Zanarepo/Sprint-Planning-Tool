import React, { useState } from "react";
import SprintPRD from "./SprintPRD";
import StrategyDoc from "./StrategyDoc";
import TeamTask from "./TeamTask";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("strategy");

  const tabs = [
     { id: "strategy", label: "🧠 Product Strategy" },
    { id: "prd", label: "📘 PRD" },
    { id: "teamtask", label: "👥 Team Task Mgmt" },
   
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="w-full bg-blue-600 text-white py-4 px-6 shadow-md flex flex-wrap justify-between items-center">
        <h1 className="text-lg sm:text-2xl font-semibold">Ride Hailing Product Strategy Documentation</h1>
      </header>

      {/* Tabs */}
      <div className="flex justify-center mt-4 flex-wrap gap-2 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-300
              ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 border"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <main className="flex-1 p-4 sm:p-8 overflow-auto">
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 w-full max-w-[1200px] mx-auto">
          {activeTab === "prd" && <SprintPRD />}
          {activeTab === "strategy" && <StrategyDoc />}
        {activeTab === "teamtask" && <TeamTask />}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-4 text-sm">
        © {new Date().getFullYear()} Sprintifyhq — All Rights Reserved.
      </footer>
    </div>
  );
}
