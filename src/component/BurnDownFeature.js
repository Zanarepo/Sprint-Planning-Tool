import React from "react";
import { motion } from "framer-motion";
import { Activity  } from "lucide-react";

const BurnDownFeature = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto mt-10">
      {/* Icon */}
      <Activity  size={40} className="text-red-600" />

      {/* Slug - Sliding Effect */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        Burndown Chart Tracker
      </h2>
      <motion.p
        className="text-red-600 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Visualize progress. Stay on track. Deliver efficiently."
      </motion.p>

      {/* Description with Background */}
      <p className="bg-red-50 text-gray-700 mt-4 text-lg leading-relaxed p-4 rounded-lg shadow">
        Track sprint progress with our Burndown Chart! 
        Monitor remaining work, predict completion, and optimize team efficiency—essential for Agile teams and project managers.
      </p>
    </div>
  );
};

export default BurnDownFeature;
