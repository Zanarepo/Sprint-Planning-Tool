import React from "react";
import { motion } from "framer-motion";
import { BarChart } from "lucide-react"; // Icon representing market research

const MarketResearchFeature = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto mt-16">
      {/* Icon */}
      <BarChart size={40} className="text-blue-900" />

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        Market Research Hub
      </h2>

      {/* Slug with Sliding Effect */}
      <motion.p
        className="text-blue-900 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Analyze. Discover. Strategize."
      </motion.p>

      {/* Description with Background */}
      <p className="bg-blue-50 text-gray-700 mt-4 text-lg leading-relaxed p-4 rounded-lg shadow">
        Empower your business decisions with comprehensive market research.
        This tool enables you to gather insights, analyze trends, perform gap analyses,
        conduct SWOT and competitor assessments, and ultimately make data-driven decisions
        for strategic growth.
      </p>
    </div>
  );
};

export default MarketResearchFeature;
