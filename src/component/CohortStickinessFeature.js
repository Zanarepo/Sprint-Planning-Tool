import React from "react";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

const CohortStickinessAnalysis = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto mt-0">
      {/* Icon */}
      <BarChart3 size={40} className="text-green-700" />

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        Cohort & Stickiness Analysis
      </h2>

      {/* Sliding Tagline */}
      <motion.p
        className="text-green-600 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Measure Retention. Drive Engagement."
      </motion.p>

      {/* Description with Background */}
      <p className="bg-green-50 text-gray-700 mt-4 text-lg leading-relaxed p-4 rounded-lg shadow">
        Understand user behavior over time with Cohort Analysis and Stickiness Metrics.  
        Track retention rates, measure engagement, and optimize product experiences  
        to increase user loyalty and reduce churn.
      </p>
    </div>
  );
};

export default CohortStickinessAnalysis;
