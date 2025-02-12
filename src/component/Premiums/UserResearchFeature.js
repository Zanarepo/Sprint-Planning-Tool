import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react"; // Icon representing user persona

const UserPersonaFeature = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto mt-16">
      {/* Icon */}
      <User size={40} className="text-blue-900" />

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        User Persona Hub
      </h2>

      {/* Slug with Sliding Effect */}
      <motion.p
        className="text-blue-900 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Document. Understand. Empathize."
      </motion.p>

      {/* Description with Background */}
      <p className="bg-blue-50 text-gray-700 mt-4 text-lg leading-relaxed p-4 rounded-lg shadow">
        Create and manage detailed user personas to drive user-centric design decisions.
        This tool empowers you to capture comprehensive user profiles—including demographics,
        behaviors, goals, motivations, and pain points—ensuring your products truly resonate with your audience.
      </p>
    </div>
  );
};

export default UserPersonaFeature;
