import React from "react";
import { motion } from "framer-motion";
import { ClipboardList } from "lucide-react"; // Icon for documentation

const EpicsUserStoriesFeature = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto mt-16">
      {/* Icon */}
      <ClipboardList size={40} className="text-green-900" />

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        Epics & User Stories Hub
      </h2>

      {/* Slug with Sliding Effect */}
      <motion.p
        className="text-green-900 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Define. Document. Deliver."
      </motion.p>

      {/* Description with Background */}
      <p className="bg-green-50 text-gray-700 mt-4 text-lg leading-relaxed p-4 rounded-lg shadow">
        Streamline your product development by creating and managing Epics,
        writing detailed User Stories, and setting clear Acceptance Criteria.
        This feature helps you capture the requirements, prioritize work, 
        and ensure every piece of functionality is well defined for a successful delivery.
      </p>
    </div>
  );
};

export default EpicsUserStoriesFeature;
