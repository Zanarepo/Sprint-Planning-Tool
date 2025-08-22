import React, { useState } from 'react';
import { FaGlobe, FaChartLine, FaTasks, FaBookOpen, FaCogs, FaChevronDown, FaChevronUp, FaEye, FaEyeSlash } from 'react-icons/fa';
import LocalizationExpansionModule from './LocalizationExpansionModule';
import MetricsAndPitfalls from './MetricsAndPitfalls';
import LocalizationExpansionTasks from './LocalizationExpansionTasks';
import CaseStudiesAndTakeaways from './CaseStudiesAndTakeaways';
import LocalizationSimulation from './LocalizationSimulation';

const dashboardModules = [
  {
    id: 'localizationExpansionModule',
    number: 1,
    title: 'Localization & Expansion Module',
    icon: <FaGlobe className="text-3xl sm:text-4xl text-indigo-500" />,
    component: <LocalizationExpansionModule />,
  },
  {
    id: 'metricsAndPitfalls',
    number: 2,
    title: 'Metrics & Pitfalls',
    icon: <FaChartLine className="text-3xl sm:text-4xl text-green-500" />,
    component: <MetricsAndPitfalls />,
  },
  {
    id: 'localizationExpansionTasks',
    number: 3,
    title: 'Localization & Expansion Tasks',
    icon: <FaTasks className="text-3xl sm:text-4xl text-blue-500" />,
    component: <LocalizationExpansionTasks />,
  },
  {
    id: 'caseStudiesAndTakeaways',
    number: 4,
    title: 'Case Studies & Takeaways',
    icon: <FaBookOpen className="text-3xl sm:text-4xl text-purple-500" />,
    component: <CaseStudiesAndTakeaways />,
  },
  {
    id: 'localizationSimulation',
    number: 5,
    title: 'Localization Simulation',
    icon: <FaCogs className="text-3xl sm:text-4xl text-orange-500" />,
    component: <LocalizationSimulation />,
  },
];

const Dashboard = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  const toggleModule = (id) => {
    setActiveModule(activeModule === id ? null : id);
  };

  const toggleIntro = () => {
    setShowIntro(!showIntro);
  };

  return (
    <div className="p-4 sm:p-8 bg-gradient-to-b from-yellow-100 to-white min-h-screen mt-16 sm:mt-24">
      {/* Header */}
      <header className="mb-8 text-center bg-white border-4 border-yellow-600 rounded-lg shadow-2xl py-4 sm:py-6 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 flex justify-center items-center">
          <FaGlobe className="mr-2 text-yellow-600 text-2xl sm:text-3xl" /> Product Localization & Expansion Dashboard
        </h1>
        <p className="mt-2 text-sm sm:text-lg text-gray-600 max-w-xl sm:max-w-2xl mx-auto">
          Master localization and expansion with interactive tools and modules for global product success.
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
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Introduction to Localization & Expansion Modules</h2>
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
              Expand your product’s global reach with these five essential modules designed to guide you through localization and expansion strategies:
            </p>
            <ul className="mt-4 space-y-2 sm:space-y-3 text-gray-600 text-sm sm:text-lg">
              <li>
                <span className="font-semibold text-indigo-500">Localization & Expansion Module:</span> Learn the fundamentals of adapting products for global markets.
              </li>
              <li>
                <span className="font-semibold text-green-500">Metrics & Pitfalls:</span> Understand key metrics to track and common pitfalls to avoid in localization efforts.
              </li>
              <li>
                <span className="font-semibold text-blue-500">Localization & Expansion Tasks:</span> Explore practical tasks to implement effective localization strategies.
              </li>
              <li>
                <span className="font-semibold text-purple-500">Case Studies & Takeaways:</span> Study real-world case studies and key takeaways for successful global expansion.
              </li>
              <li>
                <span className="font-semibold text-orange-500">Localization Simulation:</span> Practice localization strategies through interactive simulations.
              </li>
            </ul>
            <p className="mt-4 text-gray-600 text-sm sm:text-lg">
              Click the modules below to explore interactive tools and simulations for mastering localization and expansion.
            </p>
          </div>
        )}
      </section>

      {/* Module List */}
      <div className="space-y-4">
        {dashboardModules.map((module) => (
          <div key={module.id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-yellow-600">
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full flex items-center justify-between p-4 sm:p-6 hover:bg-gray-50 transition-colors focus:outline-none"
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">
                  {module.number}
                </div>
                <div className="flex items-center">
                  {module.icon}
                  <span className="ml-2 text-lg sm:text-xl font-medium text-gray-800">{module.title}</span>
                </div>
              </div>
              <div className="text-lg sm:text-xl text-gray-600">
                {activeModule === module.id ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </button>
            {activeModule === module.id && (
              <div className="p-4 sm:p-6 border-t border-gray-200">
                {module.component}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;