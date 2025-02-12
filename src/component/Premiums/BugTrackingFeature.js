import React from "react";
import { motion } from "framer-motion";
import { Bug } from "lucide-react";

const BugTracking = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto mt-0">
      {/* Icon */}
      <Bug size={40} className="text-red-700" />

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        Bug Tracking System
      </h2>

      {/* Sliding Tagline */}
      <motion.p
        className="text-red-600 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Identify Issues. Track Progress. Ensure Quality."
      </motion.p>

      {/* Description with Background */}
      <p className="bg-red-50 text-gray-700 mt-4 text-lg leading-relaxed p-4 rounded-lg shadow">
        A streamlined bug tracking system to document, manage, and resolve 
        software issues efficiently. Track reported bugs, assign responsibilities, 
        and ensure quality control throughout your product's lifecycle.
      </p>
    </div>
  );
};

export default BugTracking;
