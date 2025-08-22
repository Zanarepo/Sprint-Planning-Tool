import React, { useState } from "react";

import {
 FaRocket, FaTasks, FaPencilAlt, FaClipboardCheck,
  FaQuoteRight, FaArrowLeft, FaCheckCircle, 
} from "react-icons/fa";
import ExecutionStrategy from "./ExecutionStrategy";
import Agile from "./Agile";
import WireframePrototypeUsability from "./WireframePrototypeUsability";
import PMWorkflow from "./PMWorkflow";
import ImpactEffortMatrix from "./ImpactEffortMatrix";
import VisionBoard from "./VisionBoard";
import CloudServerSimulate from "./CloudServerSimulate";
import ASF from "./ASF";
import APITypesInfo from "./APITypesInfo";
import Northstar from "./Northstar";

const lessons = [
  {
    id: 1,
    title: "Execution Strategy",
    component: ExecutionStrategy,
    icon: <FaRocket className="text-yellow-600" />,
  },
  {
    id: 2,
    title: "Agile",
    component: Agile,
    icon: <FaTasks className="text-yellow-600" />,
  },
  {
    id: 3,
    title: "Wireframe Prototype & Usability",
    component: WireframePrototypeUsability,
    icon: <FaPencilAlt className="text-yellow-600" />,
  },
  {
    id: 4,
    title: "PM Workflow",
    component: PMWorkflow,
    icon: <FaClipboardCheck className="text-yellow-600" />,
  },
  {
    id: 5,
    title: "Vision Board",
    component: VisionBoard,
    icon: <FaQuoteRight className="text-yellow-600" />,
  },
  {
    id: 6,
    title: "Impact Effort Matrix",
    component: ImpactEffortMatrix,
    icon: <FaClipboardCheck className="text-yellow-600" />,
  },
 
  {
    id: 8,
    title: "Cloud-Server-Storage",
    component: CloudServerSimulate,
    icon: <FaClipboardCheck className="text-yellow-600" />,
  },
  {
    id: 9,
    title: "ASF",
    component: ASF,
    icon: <FaClipboardCheck className="text-yellow-600" />,
  },
  {
    id: 10,
    title: "API Types",
    component: APITypesInfo,
    icon: <FaClipboardCheck className="text-yellow-600" />,
  },
  {
    id: 11,
    title: "North Star Metrics",
    component: Northstar,
    icon: <FaClipboardCheck className="text-yellow-600" />,
  },
];

const IntermediateProductManagement = () => {
  const [activeLesson, setActiveLesson] = useState(null);
  const [toast, setToast] = useState(null);

  const handleLessonClick = (lesson) => {
    setActiveLesson(lesson);
    setToast({ message: `Selected ${lesson.title}!`, icon: <FaCheckCircle className="text-yellow-600" /> });
    setTimeout(() => setToast(null), 2000);
  };

  const handleBack = () => {
    setActiveLesson(null);
  };

  return (
    <div className="min-h-screen  to-white px-2 sm:px-4 py-8 sm:py-12 max-w-full">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg flex items-center animate-fade-in-out border border-yellow-600">
          {toast.icon}
          <span className="ml-2 text-sm sm:text-base">{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b-4 border-yellow-600 shadow-2xl py-4 sm:py-6 px-2 sm:px-4 flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8">
        <div className="flex items-center">
          
        </div>
       
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {activeLesson === null ? (
          // Dashboard Home: Display a grid of lesson cards
          <>
            <div id="lessons-grid" className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Welcome to Intermediate Product Management
              </h2>
              <p className="text-sm sm:text-lg text-gray-600 mt-2">
                Select a lesson below to explore product management skills.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  onClick={() => handleLessonClick(lesson)}
                  className="cursor-pointer border border-yellow-600 rounded-lg shadow-lg p-4 sm:p-6 bg-white hover:shadow-yellow-200 hover:scale-105 transition-all duration-300 flex items-center animate-pulse"
                >
                  <div className="mr-4 text-2xl sm:text-3xl">{lesson.icon}</div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-700">
                      Lesson {lesson.id}: {lesson.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          // Lesson View: Render the selected lesson component
          <>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
              
              <button
                onClick={handleBack}
                className="flex items-center text-yellow-600 hover:bg-yellow-400 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                <FaArrowLeft className="mr-2" /> Back
              </button>
            </div>
            <div className="border border-yellow-600 rounded-lg shadow-lg p-4 sm:p-6 bg-white">
              <activeLesson.component />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default IntermediateProductManagement;