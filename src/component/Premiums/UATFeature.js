import React from "react";
import { ClipboardCheck } from "lucide-react"; // UAT icon
import { motion } from "framer-motion";

const UserAcceptanceTestingFeature = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto mt-8">
      {/* Icon */}
      <ClipboardCheck size={40} className="text-blue-600 mt-8" />

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        User Acceptance Testing (UAT)
      </h2>

      {/* Tagline with sliding animation */}
      <motion.p
        className="text-blue-600 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Test. Validate. Approve."
      </motion.p>

      {/* Description with background */}
      <div className="bg-green-50 shadow-md p-4 rounded-lg mt-4">
        <p className="text-gray-700 text-lg leading-relaxed">
          User Acceptance Testing (UAT) is the final validation process that ensures
          your solution meets the business requirements. In UAT, end-users test the
          product in a real-world environment to confirm its readiness for production.
        </p>
      </div>
    </div>
  );
};

export default UserAcceptanceTestingFeature;
