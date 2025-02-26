import React from "react";
import { Compass  } from "lucide-react"; // Strategy icon
import { motion } from "framer-motion";

const ProductStrategyFeature = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto">
      {/* Icon */}
      <Compass  size={40} className="text-indigo-600 mt-8" />

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        Product Strategy Framework
      </h2>

      {/* Slug with sliding animation */}
      <motion.p
        className="text-indigo-600 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Vision. Plan. Execute."
      </motion.p>

      {/* Description with background */}
      <div className="bg-indigo-50 shadow-md p-4 rounded-lg mt-4">
        <p className="text-gray-700 text-lg leading-relaxed">
          A strong <span className="font-semibold text-indigo-700">Product Strategy</span> <br></br>
          aligns your vision with market needs, ensuring sustainable growth. 
          Define your roadmap, prioritize initiatives, and drive innovation.
        </p>
      </div>
    </div>
  );
};

export default ProductStrategyFeature;
