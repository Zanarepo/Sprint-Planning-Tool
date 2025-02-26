import React from "react";
import { motion } from "framer-motion";
import { Trophy  } from "lucide-react"; // Icon for competitive analysis

const CompetitiveMatrixFeature = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto mt-16">
      {/* Icon */}
      <Trophy  size={40} className="text-blue-900" />

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        Competitive Matrix Hub
      </h2>

      {/* Tagline with Sliding Effect */}
      <motion.p
        className="text-blue-900 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Compare. Benchmark. Optimize."
      </motion.p>

      {/* Description with Background */}
      <p className="bg-blue-50 text-gray-700 mt-4 text-lg leading-relaxed p-4 rounded-lg shadow">
        Empower your product decisions by comparing your features against the competition.
        Analyze pricing, usability, and customer feedback to identify market gaps and set strategic benchmarks.
        Use our competitive matrix to drive data-driven improvements and optimize your product's performance.
      </p>
    </div>
  );
};

export default CompetitiveMatrixFeature;
