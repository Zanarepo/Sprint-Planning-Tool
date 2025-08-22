import React, { useState } from 'react';
import { FaChartBar, FaChevronDown, FaChevronUp, FaEye, FaEyeSlash } from 'react-icons/fa';
import TeachingModule from './TeachingModule';
import HypothesisTestSimulation from './HypothesisTestSimulation';
import ExperimentationGuide from './ExperimentationGuide';
import ClassroomExercises from './ClassroomExercises';

const dashboardItems = [
  {
    id: 'teachingModule',
    number: 1,
    title: 'Experimentation for Growth',
    component: <ExperimentationGuide />,
  },
  {
    id: 'hypothesisTestSimulation',
    number: 2,
    title: 'Hypothesis Test Simulation',
    component: <HypothesisTestSimulation />,
  },
  {
    id: 'experimentationGuide',
    number: 3,
    title: 'Tools & Techniques',
    component: <TeachingModule />,
  },
  {
    id: 'classroomExercises',
    number: 4,
    title: 'Classroom Exercises',
    component: <ClassroomExercises />,
  },
];

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  const toggleItem = (id) => {
    setActiveItem(activeItem === id ? null : id);
  };

  const toggleIntro = () => {
    setShowIntro(!showIntro);
  };

  return (
    <div className="p-4 sm:p-8 bg-gradient-to-b from-yellow-100 to-white min-h-screen mt-16 sm:mt-24">
      {/* Header */}
      <header className="mb-8 text-center bg-white border-4 border-yellow-600 rounded-lg shadow-2xl py-4 sm:py-6 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 flex justify-center items-center">
          <FaChartBar className="mr-2 text-yellow-600 text-2xl sm:text-3xl" /> Product Experimentation Dashboard
        </h1>
        <p className="mt-2 text-sm sm:text-lg text-gray-600 max-w-xl sm:max-w-2xl mx-auto">
          Master product experimentation with interactive tools and practical modules.
        </p>
        <button
          onClick={() => document.getElementById('introduction').scrollIntoView({ behavior: 'smooth' })}
          className="mt-4 bg-yellow-600 text-white py-2 px-4 sm:px-6 rounded-lg hover:bg-yellow-700 transition duration-300 transform hover:scale-105"
        >
          Explore Modules
        </button>
      </header>

      {/* Introduction Section */}
      <section id="introduction" className="mb-8 sm:mb-12 bg-white shadow-lg rounded-lg border border-yellow-600 max-w-full mx-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 bg-gray-50">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Introduction to Experimentation Modules</h2>
          <button
            onClick={toggleIntro}
            className="flex items-center bg-yellow-600 text-white py-2 px-3 sm:px-4 rounded-lg hover:bg-yellow-700 transition duration-300"
          >
            {showIntro ? <FaEyeSlash className="mr-2" /> : <FaEye className="mr-2" />}
            {showIntro ? 'Hide' : 'Show'} Introduction
          </button>
        </div>
        {showIntro && (
          <div className="p-4 sm:p-6">
            <p className="text-gray-600 text-sm sm:text-lg leading-relaxed">
              Build expertise in product experimentation with these four essential modules designed to enhance your growth strategies:
            </p>
            <ul className="mt-4 space-y-2 sm:space-y-3 text-gray-600 text-sm sm:text-lg">
              <li>
                <span className="font-semibold text-yellow-600">Experimentation for Growth:</span> Learn how to design and implement experiments to drive product growth and optimize outcomes.
              </li>
              <li>
                <span className="font-semibold text-yellow-600">Hypothesis Test Simulation:</span> Practice creating and testing hypotheses with interactive simulations to validate ideas.
              </li>
              <li>
                <span className="font-semibold text-yellow-600">Tools & Techniques:</span> Explore practical tools and methodologies for effective experimentation in product management.
              </li>
              <li>
                <span className="font-semibold text-yellow-600">Classroom Exercises:</span> Engage in hands-on exercises to apply experimentation concepts in real-world scenarios.
              </li>
            </ul>
            <p className="mt-4 text-gray-600 text-sm sm:text-lg">
              Click the modules below to explore interactive tools and simulations for product experimentation.
            </p>
          </div>
        )}
      </section>

      {/* Module List */}
      <div className="space-y-4">
        {dashboardItems.map((item) => (
          <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-yellow-600">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-4 sm:p-6 hover:bg-gray-50 transition-colors focus:outline-none"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  {item.number}
                </div>
                <span className="text-lg sm:text-xl font-medium text-gray-800">
                  {item.title}
                </span>
              </div>
              <div className="text-lg sm:text-xl text-gray-600">
                {activeItem === item.id ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </button>
            {activeItem === item.id && (
              <div className="p-4 sm:p-6 border-t border-gray-200">
                {item.component}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;