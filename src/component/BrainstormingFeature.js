import React from "react";
import { BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

const BrainstormingFeature = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto mt-8">
    {/* Your content goes here */}
  
  
      {/* Icon */}
      <BrainCircuit size={40} className="text-yellow-600 mt-8" />

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        Brainstorming Hub
      </h2>

      {/* Slug with sliding animation */}
      <motion.p
        className="text-yellow-600 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Think. Create. Innovate."
      </motion.p>

      {/* Description with background */}
      <div className="bg-yellow-50 shadow-md p-4 rounded-lg mt-4">
        <p className="text-gray-700 text-lg leading-relaxed">
          Unlock creativity with our Brainstorming Hub. Collaborate, generate 
          innovative ideas, and refine concepts in an 
          <span className="font-semibold text-yellow-700"> interactive, real-time space</span>—perfect for teams and individuals.
        </p>
      </div>
    </div>
  );
};

export default BrainstormingFeature;
