
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const GTMStrategyIntro = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto mt-10">
      {/* Icon */}
      <Briefcase size={40} className="text-blue-600" />

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        Go-to-Market Strategy Hub
      </h2>

      {/* Slogan with Sliding Effect */}
      <motion.p
        className="text-blue-600 font-semibold text-lg italic mt-2"
        initial={{ x: '-100%' }}
        animate={{ x: '0%' }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        "Plan. Launch. Succeed with precision."
      </motion.p>

      {/* Description with Background */}
      <p className="bg-blue-50 text-gray-700 mt-4 text-lg leading-relaxed p-4 rounded-lg shadow">
        Craft winning go-to-market strategies with our GTM Strategy!  
        Seamlessly define target markets, pricing, marketing plans, and more—perfect for product managers, startups, and marketing teams.
      </p>
    </div>
  );
};

export default GTMStrategyIntro;
