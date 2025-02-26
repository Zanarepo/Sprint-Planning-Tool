import React from "react";
import { BarChart2 } from "lucide-react";
import { motion } from "framer-motion";

const PollingVotingFeature = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto mt-8">
      {/* Icon */}
      <BarChart2 size={40} className="text-blue-600 mt-8" />

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        Voting Hub
      </h2>

      {/* Tagline with sliding animation */}
      <motion.p
        className="text-blue-600 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Cast. Decide. Empower."
      </motion.p>

      {/* Description with background */}
      <div className="bg-blue-50 shadow-md p-4 rounded-lg mt-4">
  <p className="text-gray-700 text-lg leading-relaxed">
    Empower your team to make informed decisions. Our voting tool lets you collaboratively decide which features to build next, ensuring every development is driven by real insights and collective priorities.
  </p>
</div>

    </div>
  );
};

export default PollingVotingFeature;
