import React from "react";
import { motion } from "framer-motion";
import { ClipboardCheck } from "lucide-react";

const LaunchChecklist = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto mt-16">
      {/* Icon */}
      <ClipboardCheck size={40} className="text-purple-700" />

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        Product Launch Checklist
      </h2>

      {/* Sliding Tagline */}
      <motion.p
        className="text-purple-600 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Ensure Readiness. Execute with Confidence."
      </motion.p>

      {/* Description with Background */}
      <p className="bg-purple-50 text-gray-700 mt-4 text-lg leading-relaxed p-4 rounded-lg shadow">
        A structured checklist to ensure every aspect of your product launch is 
        covered. Assign tasks, track dependencies, and document every critical 
        step before going live. 
      </p>
    </div>
  );
};

export default LaunchChecklist;
