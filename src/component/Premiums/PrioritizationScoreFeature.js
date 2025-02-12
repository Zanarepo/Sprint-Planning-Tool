import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const PrioritizationScore = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto">
      {/* Icon */}
      <Star size={40} className="text-green-600 mt-8" />

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        Prioritization Score
      </h2>

      {/* Slug with sliding animation */}
      <motion.p
        className="text-green-600 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Rank. Decide. Execute."
      </motion.p>

      {/* Description with background */}
      <div className="bg-green-50 shadow-md p-4 rounded-lg mt-4">
        <p className="text-gray-700 text-lg leading-relaxed">
          Use a structured <span className="font-semibold text-green-700">Prioritization Score</span> 
          to assess features and initiatives based on impact, effort, and urgency. Ensure data-driven 
          decisions for efficient roadmap execution.
        </p>
      </div>
    </div>
  );
};

export default PrioritizationScore;
