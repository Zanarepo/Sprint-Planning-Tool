import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppWindow, Brain, LineChart, Rocket } from "lucide-react";

const AppLauncher = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 right-10 z-50 mt-16 flex flex-col items-center">
      {/* Icon and label (without background) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-center text-blue-600"
      >
        <AppWindow size={28} /> {/* Icon in blue */}
        <span className="text-sm font-medium">Sprint Tools</span> {/* Label in blue */}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-3 w-40 mt-8">
          <Link 
            to="/sprints" 
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded text-gray-800"
          >
            <Rocket size={20} className="text-blue-600" />
            <span className="text-gray-900">Simulator</span>
          </Link>
          <Link 
            to="/estimator" 
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded text-gray-800"
          >
            <LineChart size={20} className="text-green-600" />
            <span className="text-gray-900">Estimator</span>
          </Link>
          <Link 
            to="/brainstorm" 
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded text-gray-800"
          >
            <Brain size={20} className="text-yellow-600" />
            <span className="text-gray-900">Brainstorm</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AppLauncher;
