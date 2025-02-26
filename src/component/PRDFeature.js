import React from "react";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";

const PRDFeature = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto mt-8">
      {/* Icon */}
      <FileText size={40} className="text-blue-600 mt-8" />

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        Product Requirements Document (PRD)
      </h2>

      {/* Slug with sliding animation */}
      <motion.p
        className="text-blue-600 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Define. Align. Deliver."
      </motion.p>

      {/* Description with background */}
      <div className="bg-blue-50 shadow-md p-4 rounded-lg mt-4">
        <p className="text-gray-700 text-lg leading-relaxed">
          Create a structured <span className="font-semibold text-blue-700">PRD</span> 
          that aligns stakeholders, sets clear expectations, and ensures seamless 
          product development. Capture requirements, outline features, and track progress 
          effectively.
        </p>
      </div>
    </div>
  );
};

export default PRDFeature;