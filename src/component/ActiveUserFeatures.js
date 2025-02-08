import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

const ActiveUserFeatures = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto mt-0">
      {/* Icon */}
      <Users size={40} className="text-red-900" />

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        Active Users Insight
      </h2>

      {/* Sliding Tagline */}
      <motion.p
        className="text-red-600 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Engage. Retain. Grow."
      </motion.p>

      {/* Description with Background */}
      <p className="bg-red-50 text-gray-700 mt-4 text-lg leading-relaxed p-4 rounded-lg shadow">
        Gain real-time insights into your Daily, Weekly, and Monthly Active Users (DAU, WAU, MAU).  
        Track trends, identify user behavior, and optimize engagement strategies to foster continuous growth.
      </p>
    </div>
  );
};

export default ActiveUserFeatures;
