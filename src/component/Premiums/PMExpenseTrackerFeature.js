import React from "react";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

const PMExpenseTracker = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto mt-2">
      {/* Icon */}
      <Wallet size={40} className="text-orange-600" />

      {/* Slug - Sliding Effect */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        Product Manager Expense Tracker
      </h2>
      <motion.p
        className="text-orange-600 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Track. Optimize. Scale efficiently."
      </motion.p>

      {/* Description with Background */}
      <p className="bg-orange-50 text-gray-700 mt-4 text-lg leading-relaxed p-4 rounded-lg shadow">
        Manage your product budget effortlessly! The PM Expense Tracker helps you keep an eye on costs, optimize spending, and make data-driven decisions to maximize ROI. Perfect for agile teams and lean product management.
      </p>
    </div>
  );
};

export default PMExpenseTracker;
