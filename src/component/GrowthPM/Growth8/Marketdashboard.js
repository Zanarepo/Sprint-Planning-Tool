import React, { useState } from 'react';
import { 
  FaGlobe, 
  FaRocket, 
  FaTools, 
  FaBalanceScale, 
  FaChartLine, 
  FaCogs, 
  FaQuestionCircle, 
  FaChevronDown, 
  FaChevronUp, 
  FaEye, 
  FaEyeSlash 
} from 'react-icons/fa';
import MarketExplorationProcess from './MarketExplorationProcess';
import MarketValidationAndEntry from './MarketValidationAndEntry';
import ToolsFrameworksCaseStudies from './ToolsFrameworksCaseStudies';
import CaseStudiesAndChallenges from './CaseStudiesAndChallenges';
import MetricsEthicsActionPlan from './MetricsEthicsActionPlan';
import MetricsSimulation from './MetricsSimulation';
import MarketQuiz from './MarketQuiz';

const dashboardModules = [
  {
    id: 'marketExploration',
    number: 1,
    title: 'Market Exploration Process',
    icon: <FaGlobe className="text-3xl sm:text-4xl text-indigo-500" />,
    component: <MarketExplorationProcess />,
  },
  {
    id: 'marketValidation',
    number: 2,
    title: 'Market Validation & Entry',
    icon: <FaRocket className="text-3xl sm:text-4xl text-green-500" />,
    component: <MarketValidationAndEntry />,
  },
  {
    id: 'toolsFrameworks',
    number: 3,
    title: 'Tools & Frameworks / Case Studies',
    icon: <FaTools className="text-3xl sm:text-4xl text-blue-500" />,
    component: <ToolsFrameworksCaseStudies />,
  },
  {
    id: 'caseStudiesChallenges',
    number: 4,
    title: 'Case Studies & Challenges',
    icon: <FaBalanceScale className="text-3xl sm:text-4xl text-red-500" />,
    component: <CaseStudiesAndChallenges />,
  },
  {
    id: 'metricsEthics',
    number: 5,
    title: 'Metrics, Ethics & Action Plan',
    icon: <FaChartLine className="text-3xl sm:text-4xl text-purple-500" />,
    component: <MetricsEthicsActionPlan />,
  },
  {
    id: 'metricsSimulation',
    number: 6,
    title: 'Metrics Simulation',
    icon: <FaCogs className="text-3xl sm:text-4xl text-orange-500" />,
    component: <MetricsSimulation />,
  },
  {
    id: 'marketQuiz',
    number: 7,
    title: 'Market Quiz',
    icon: <FaQuestionCircle className="text-3xl sm:text-4xl text-teal-500" />,
    component: <MarketQuiz />,
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
          <FaGlobe className="mr-2 text-yellow-600 text-2xl sm:text-3xl" /> Product Expansion & Localization Dashboard
        </h1>
        <p className="mt-2 text-sm sm:text-lg text-gray-600 max-w-xl sm:max-w-2xl mx-auto">
          Master product expansion and localization with interactive tools and modules for global success.
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
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Introduction to Expansion & Localization Modules</h2>
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
              Expand your product’s global reach with these seven essential modules designed to guide you through market exploration, validation, and localization strategies:
            </p>
            <ul className="mt-4 space-y-2 sm:space-y-3 text-gray-600 text-sm sm:text-lg">
              <li>
                <span className="font-semibold text-indigo-500">Market Exploration Process:</span> Learn the steps to identify and evaluate new markets for product expansion.
              </li>
              <li>
                <span className="font-semibold text-green-500">Market Validation & Entry:</span> Discover strategies to validate markets and plan effective entry approaches.
              </li>
              <li>
                <span className="font-semibold text-blue-500">Tools & Frameworks / Case Studies:</span> Explore tools, frameworks, and case studies for successful market expansion.
              </li>
              <li>
                <span className="font-semibold text-red-500">Case Studies & Challenges:</span> Analyze real-world case studies and common challenges in localization.
              </li>
              <li>
                <span className="font-semibold text-purple-500">Metrics, Ethics & Action Plan:</span> Understand key metrics, ethical considerations, and actionable plans for expansion.
              </li>
              <li>
                <span className="font-semibold text-orange-500">Metrics Simulation:</span> Practice expansion strategies through interactive simulations.
              </li>
              <li>
                <span className="font-semibold text-teal-500">Market Quiz:</span> Test your knowledge of expansion and localization concepts with interactive quizzes.
              </li>
            </ul>
            <p className="mt-4 text-gray-600 text-sm sm:text-lg">
              Click the modules below to explore interactive tools and simulations for mastering product expansion and localization.
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