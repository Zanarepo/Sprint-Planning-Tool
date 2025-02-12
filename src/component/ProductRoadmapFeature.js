import React from "react";
import { Map } from "lucide-react";
import { motion } from "framer-motion";

const ProductRoadmapFeature = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto">
      {/* Icon */}
      <Map size={40} className="text-blue-600 mt-8" />

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        Product Roadmap
      </h2>

      {/* Slug with sliding animation */}
      <motion.p
        className="text-blue-600 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Plan. Build. Deliver."
      </motion.p>

      {/* Description with background */}
      <div className="bg-blue-50 shadow-md p-4 rounded-lg mt-4">
        <p className="text-gray-700 text-lg leading-relaxed">
          Visualize your <span className="font-semibold text-blue-700">Product Roadmap</span> <br></br>
           with clear milestones, feature releases, and strategic priorities.
          Align your team and stakeholders with a structured plan to 
          execute and deliver impactful results.
        </p>
      </div>
    </div>
  );
};

export default ProductRoadmapFeature;
