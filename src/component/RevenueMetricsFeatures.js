import React from "react";
import { DollarSign, TrendingUp, BarChart2, PieChart } from "lucide-react";
import { motion } from "framer-motion";

const RevenueMetricsFeatures = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto">
      {/* Icon */}
      <DollarSign size={40} className="text-green-600 mt-12" />

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        Revenue Metrics Dashboard
      </h2>

      {/* Slug with sliding animation */}
      <motion.p
        className="text-green-600 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Track. Optimize. Grow."
      </motion.p>

      {/* Description with background */}
      <div className="bg-green-50 shadow-md p-4 rounded-lg mt-4">
        <p className="text-gray-700 text-lg leading-relaxed">
          Monitor and enhance your revenue performance with real-time insights. 
          Understand key financial metrics and make data-driven decisions to 
          <span className="font-semibold text-green-700"> maximize profitability</span>.
        </p>
      </div>

      {/* Revenue Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
  {/* Your grid items here */}


        {/* MRR */}
        <div className="flex flex-col items-center bg-white p-4 shadow rounded-lg">
          <TrendingUp size={32} className="text-blue-600" />
          <h3 className="text-lg font-bold mt-2">Monthly Recurring Revenue (MRR)</h3>
          <p className="text-sm text-gray-600">Predictable monthly revenue from subscriptions.</p>
        </div>

        {/* ARR */}
        <div className="flex flex-col items-center bg-white p-4 shadow rounded-lg">
          <BarChart2 size={32} className="text-purple-600" />
          <h3 className="text-lg font-bold mt-2">Annual Recurring Revenue (ARR)</h3>
          <p className="text-sm text-gray-600">Total yearly subscription-based revenue.</p>
        </div>

        {/* ARPU */}
        <div className="flex flex-col items-center bg-white p-4 shadow rounded-lg">
          <PieChart size={32} className="text-orange-600" />
          <h3 className="text-lg font-bold mt-2">Average Revenue Per User (ARPU)</h3>
          <p className="text-sm text-gray-600">Revenue generated per active user.</p>
        </div>

        {/* CAC */}
        <div className="flex flex-col items-center bg-white p-4 shadow rounded-lg">
          <DollarSign size={32} className="text-red-600" />
          <h3 className="text-lg font-bold mt-2">Customer Acquisition Cost (CAC)</h3>
          <p className="text-sm text-gray-600">Cost to acquire a new customer.</p>
        </div>
      </div>
    </div>
  );
};

export default RevenueMetricsFeatures;
