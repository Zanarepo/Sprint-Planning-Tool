import React from "react";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";


const AgileSprintSimulation = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto mt-8">
      {/* Icon */}
      <Rocket size={40} className="text-blue-600" />
      

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        Sprint Simulation Hub
      </h2>
      {/* Slug - Sliding Effect */}
      <motion.p
        className="text-blue-600 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Simulate. Iterate. Deliver."
      </motion.p>

      {/* Description with Background */}
      <p className="bg-blue-50 text-gray-700 mt-4 text-lg leading-relaxed p-4 rounded-lg shadow">
        Take your Agile sprints to the next level!  
        Whether you're a remote Agile team or a student, this interactive sprint simulation helps you collaborate, iterate, and deliver seamlessly—just like in a real Agile environment.
      </p>
    </div>
  );
};

export default AgileSprintSimulation;
