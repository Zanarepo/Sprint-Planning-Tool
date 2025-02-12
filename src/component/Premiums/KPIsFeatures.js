import React from "react";
import { Target } from "lucide-react";
import { motion } from "framer-motion";

const ProductGoalsFeature = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto">
      {/* Icon */}
      <Target size={40} className="text-indigo-600 mt-8" />

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        Product Goals & KPI Tracker
      </h2>

      {/* Slug with sliding animation */}
      <motion.p
        className="text-indigo-600 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Set. Measure. Succeed."
      </motion.p>

      {/* Description with background */}
      <div className="bg-indigo-50 shadow-md p-4 rounded-lg mt-4">
        <p className="text-gray-700 text-lg leading-relaxed">
          Track your <span className="font-semibold text-indigo-700">Product Goals</span> and 
          <span className="font-semibold text-indigo-700"> Feature KPIs</span> in real-time. 
          Set clear objectives, measure progress with actionable insights, and stay aligned 
          towards achieving key milestones.
        </p>
      </div>
    </div>
  );
};

export default ProductGoalsFeature;
