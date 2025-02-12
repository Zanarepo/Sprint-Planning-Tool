import React, { useState } from "react";
import { motion } from "framer-motion";
import PrioritizationScore from "./PrioritizationScore";
import PrioritizationTechniques from "./PrioritizationTechniques";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("score");

  return (
    <div className="w-full mt-24">
      {/* Tabs */}
      <div className="flex border-b border-gray-300">
        <button
          onClick={() => setActiveTab("score")}
          className={`flex-1 py-3 text-center font-semibold ${
            activeTab === "score"
              ? "border-b-4 border-green-600 text-indigo-600"
              : "text-gray-600"
          }`}
        >
          Prioritization Score
        </button>
        <button
          onClick={() => setActiveTab("techniques")}
          className={`flex-1 py-3 text-center font-semibold ${
            activeTab === "techniques"
              ? "border-b-4 border-blue-600 text-indigo-600"
              : "text-gray-600"
          }`}
        >
          Prioritization Techniques
        </button>
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        {activeTab === "score" ? <PrioritizationScore /> : <PrioritizationTechniques />}
      </motion.div>
    </div>
  );
};

export default Tabs;
