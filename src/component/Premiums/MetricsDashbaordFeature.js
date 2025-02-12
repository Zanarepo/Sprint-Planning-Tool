import React from "react";
import { motion } from "framer-motion";
import { Smile, ThumbsUp, TrendingDown, DollarSign } from "lucide-react";

const CustomerMetrics = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto mt-10">
      {/* Icon */}
      <Smile size={40} className="text-purple-600" />

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        Customer Experience Metrics
      </h2>
      
      {/* Slug - Sliding Effect */}
      <motion.p
        className="text-purple-600 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Measure. Improve. Retain."
      </motion.p>

      {/* Description with Background */}
      <p className="bg-purple-50 text-gray-700 mt-4 text-lg leading-relaxed p-4 rounded-lg shadow">
        Track and optimize your customer experience with key metrics:
      </p>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* NPS */}
        <div className="flex flex-col items-center bg-white p-4 shadow rounded-lg">
          <ThumbsUp size={32} className="text-green-600" />
          <h3 className="text-lg font-bold mt-2">Net Promoter Score (NPS)</h3>
          <p className="text-sm text-gray-600">Gauge customer loyalty & advocacy.</p>
        </div>

        {/* CSAT */}
        <div className="flex flex-col items-center bg-white p-4 shadow rounded-lg">
          <Smile size={32} className="text-yellow-600" />
          <h3 className="text-lg font-bold mt-2">Customer Satisfaction (CSAT)</h3>
          <p className="text-sm text-gray-600">Measure short-term customer happiness.</p>
        </div>

        {/* CES */}
        <div className="flex flex-col items-center bg-white p-4 shadow rounded-lg">
          <TrendingDown size={32} className="text-red-600" />
          <h3 className="text-lg font-bold mt-2">Customer Effort Score (CES)</h3>
          <p className="text-sm text-gray-600">Assess ease of customer interactions.</p>
        </div>

        {/* CAC */}
        <div className="flex flex-col items-center bg-white p-4 shadow rounded-lg">
          <DollarSign size={32} className="text-blue-600" />
          <h3 className="text-lg font-bold mt-2">Customer Acquisition Cost (CAC)</h3>
          <p className="text-sm text-gray-600">Track marketing efficiency.</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerMetrics;
