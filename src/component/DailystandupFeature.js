import React from "react";
import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";

const DailystandupFeature = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto mt-2">
      {/* Icon */}
      <CalendarClock size={40} className="text-blue-600" />

      {/* Slug - Sliding Effect */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        Daily Standup Sync
      </h2>
      <motion.p
        className="text-blue-600 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Align. Share. Move forward together."
      </motion.p>

      {/* Description with Background */}
      <p className="bg-blue-50 text-gray-700 mt-4 text-lg leading-relaxed p-4 rounded-lg shadow">
        Keep your team in sync with our Daily Standup feature! 
        Quickly share updates, blockers, and priorities to ensure smooth collaboration—perfect for Agile teams and remote workflows.
      </p>
    </div>
  );
};

export default DailystandupFeature;
