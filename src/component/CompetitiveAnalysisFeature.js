import React from "react";
import { motion } from "framer-motion";
import { BarChart } from "lucide-react"; // Icon representing competitive analysis

const CompetitiveAnalysisFeature = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto mt-16">
      {/* Icon */}
      <BarChart size={40} className="text-red-900" />

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        Competitive Analysis Hub
      </h2>

      {/* Slug with Sliding Effect */}
      <motion.p
        className="text-red-900 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Document. Analyze. Outperform."
      </motion.p>

      {/* Description with Background */}
      <p className="bg-red-50 text-gray-700 mt-4 text-lg leading-relaxed p-4 rounded-lg shadow">
        Enhance your strategic positioning by thoroughly analyzing your competitors.
        This tool allows you to document detailed competitor profiles, perform SWOT analyses,
        benchmark key performance metrics, and ultimately gain insights to outpace the competition.
      </p>
    </div>
  );
};

export default CompetitiveAnalysisFeature;
