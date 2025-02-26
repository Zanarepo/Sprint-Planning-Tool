import React from "react";
import { ListChecks } from "lucide-react"; // Prioritization icon
import { motion } from "framer-motion";

const PrioritizationTechniques = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto mt-8">
      {/* Icon */}
      <ListChecks size={40} className="text-blue-600 mt-8" />

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        Feature Prioritization Framework
      </h2>

      {/* Slug with sliding animation */}
      <motion.p
        className="text-blue-600 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Decide. Rank. Deliver."
      </motion.p>

      {/* Description with background */}
      <div className="bg-blue-50 shadow-md p-4 rounded-lg mt-4">
        <p className="text-gray-700 text-lg leading-relaxed">
          Effective <span className="font-semibold text-blue-700">Prioritization Techniques</span> <br></br>
          help teams focus on high-value features, align development with business goals, 
          and optimize resources for maximum impact.
        </p>
      </div>
    </div>
  );
};

export default PrioritizationTechniques;
