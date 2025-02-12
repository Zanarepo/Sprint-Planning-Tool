import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const ProductMetrics = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto mt-0">
      {/* Icon */}
      <TrendingUp size={40} className="text-blue-900" />

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        Product Metrics Dashboard
      </h2>

      {/* Sliding Tagline */}
      <motion.p
        className="text-yellow-600 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Measure. Analyze. Improve."
      </motion.p>

      {/* Description with Background */}
      <p className="bg-yellow-50 text-gray-700 mt-4 text-lg leading-relaxed p-4 rounded-lg shadow">
        Track key product metrics like Retention, Churn, DAU, MAU, and Engagement.  
        Gain actionable insights to enhance user experience, optimize features, and drive product growth.
      </p>
    </div>
  );
};

export default ProductMetrics;
