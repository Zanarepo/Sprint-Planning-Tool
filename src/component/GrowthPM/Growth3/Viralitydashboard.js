import React, { useState } from 'react';
import { FaLightbulb, FaSitemap, FaQuestionCircle, FaCogs, FaChalkboardTeacher, FaChevronDown, FaChevronUp, FaTachometerAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import DesigningForVirality from './DesigningForVirality';
import NetworkEffectsModule from './NetworkEffectsModule';
import ViralityQuiz from './ViralityQuiz';
import ViralitySimulation from './ViralitySimulation';
import ExercisesForStudents from './ExercisesForStudents';

const dashboardItems = [
  {
    id: 'designForVirality',
    title: 'Designing for Virality',
    icon: <FaLightbulb className="text-3xl sm:text-4xl text-yellow-500" />,
    component: <DesigningForVirality />,
  },
  {
    id: 'networkEffects',
    title: 'Network Effects Module',
    icon: <FaSitemap className="text-3xl sm:text-4xl text-green-500" />,
    component: <NetworkEffectsModule />,
  },
  {
    id: 'viralityQuiz',
    title: 'Virality Quiz',
    icon: <FaQuestionCircle className="text-3xl sm:text-4xl text-blue-500" />,
    component: <ViralityQuiz />,
  },
  {
    id: 'viralitySimulation',
    title: 'Virality Simulation',
    icon: <FaCogs className="text-3xl sm:text-4xl text-red-500" />,
    component: <ViralitySimulation />,
  },
  {
    id: 'exercisesForStudents',
    title: 'Exercise',
    icon: <FaChalkboardTeacher className="text-3xl sm:text-4xl text-purple-500" />,
    component: <ExercisesForStudents />,
  },
];

const Dashboard = () => {
  const [activeTile, setActiveTile] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  const toggleTile = (id) => {
    setActiveTile(activeTile === id ? null : id);
  };

  const toggleIntro = () => {
    setShowIntro(!showIntro);
  };

  return (
    <div className="p-4 sm:p-8 bg-gradient-to-b from-yellow-100 to-white min-h-screen mt-16 sm:mt-24">
      {/* Header */}
      <header className="mb-8 text-center bg-white border-4 border-yellow-600 rounded-lg shadow-2xl py-4 sm:py-6 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 flex justify-center items-center">
          <FaTachometerAlt className="mr-2 text-yellow-600 text-2xl sm:text-3xl" /> Virality Learning Dashboard
        </h1>
        <p className="mt-2 text-sm sm:text-lg text-gray-600 max-w-xl sm:max-w-2xl mx-auto">
          Master virality with interactive tools and modules to drive product growth.
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
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Introduction to Virality Modules</h2>
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
              Unlock the secrets of virality with these five essential modules designed to enhance your product’s growth potential:
            </p>
            <ul className="mt-4 space-y-2 sm:space-y-3 text-gray-600 text-sm sm:text-lg">
              <li>
                <span className="font-semibold text-yellow-500">Designing for Virality:</span> Learn strategies to create products that naturally encourage sharing and adoption.
              </li>
              <li>
                <span className="font-semibold text-green-500">Network Effects Module:</span> Understand how to leverage network effects to amplify product growth and user engagement.
              </li>
              <li>
                <span className="font-semibold text-blue-500">Virality Quiz:</span> Test your knowledge of virality concepts through interactive quizzes.
              </li>
              <li>
                <span className="font-semibold text-red-500">Virality Simulation:</span> Experiment with simulations to model and optimize viral growth strategies.
              </li>
              <li>
                <span className="font-semibold text-purple-500">Exercise:</span> Apply virality concepts through hands-on exercises tailored for real-world scenarios.
              </li>
            </ul>
            <p className="mt-4 text-gray-600 text-sm sm:text-lg">
              Click the modules below to explore interactive tools and simulations for mastering virality.
            </p>
          </div>
        )}
      </section>

      {/* Module List */}
      <div className="space-y-4">
        {dashboardItems.map((item) => (
          <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-yellow-600">
            <button
              onClick={() => toggleTile(item.id)}
              className="w-full flex items-center justify-between p-4 sm:p-6 hover:bg-gray-50 transition-colors focus:outline-none"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  {dashboardItems.indexOf(item) + 1}
                </div>
                <div className="flex items-center">
                  {item.icon}
                  <span className="ml-2 text-lg sm:text-xl font-medium text-gray-800">{item.title}</span>
                </div>
              </div>
              <div className="text-lg sm:text-xl text-gray-600">
                {activeTile === item.id ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </button>
            {activeTile === item.id && (
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