import React from "react";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

const FeatureEstimator = () => {
  return (
    <div className="flex flex-col items-center text-center px-0 p-6 max-w-3xl mx-auto mt-10">
      <BarChart3 size={40} className="text-green-600" />

      {/* Slug - Sliding Effect */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        Real-Time Estimating Hub
      </h2>
      <motion.p
         className="text-green-600 font-semibold text-lg italic mt-2"
         initial={{ x: "-100%" }}
         animate={{ x: "0%" }}
         transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Estimate. Prioritize. Build with confidence."
      </motion.p>

      {/* Description with Background */}
      <p className="bg-green-50 text-gray-700 mt-4 text-lg leading-relaxed p-4 rounded-lg shadow">
        Plan smarter with our Feature Estimator!  
        Quickly assess feature complexity, effort, and impact to make data-driven decisions—ideal for Agile teams, product managers, and developers.
      </p>
    </div>
  );
};

export default FeatureEstimator;
