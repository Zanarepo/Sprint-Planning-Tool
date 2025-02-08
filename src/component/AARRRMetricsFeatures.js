import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const AARRRMetrics = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto mt-0">
      {/* Icon */}
      <TrendingUp size={40} className="text-blue-700" />

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        AARRR Metrics Framework
      </h2>

      {/* Sliding Tagline */}
      <motion.p
        className="text-blue-600 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Optimize the Growth Funnel. Scale Your Business."
      </motion.p>

      {/* Description with Background */}
      <p className="bg-blue-50 text-gray-700 mt-4 text-lg leading-relaxed p-4 rounded-lg shadow">
        Track and optimize the five key pirate metrics: Acquisition, Activation, Retention, Referral, and Revenue. 
        Analyze where users drop off, improve conversions, and maximize lifetime value to drive business growth.
      </p>
    </div>
  );
};

export default AARRRMetrics;
