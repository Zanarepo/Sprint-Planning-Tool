import React, { useState } from 'react';
import { FaChartBar, FaChevronDown, FaChevronUp, FaEye, FaEyeSlash } from 'react-icons/fa';
import ScalabilityAutomation from './ScalabilityAutomation';
import CaseStudiesAndTech from './CaseStudiesAndTech';
import AutomationSimulation from './AutomationSimulation';
import RobustAutomationSimulation from './RobustAutomationSimulation';
import DigitalProductAutomationSimulation from './DigitalProductAutomationSimulation';
import KeyTakeaways from './KeyTakeaways';
import AutomationQuiz from './AutomationQuiz';

const dashboardItems = [
  {
    id: 'scalabilityAutomation',
    number: 1,
    title: 'Scalability & Automation',
    component: <ScalabilityAutomation />,
  },
  {
    id: 'caseStudiesAndTech',
    number: 2,
    title: 'Case Studies & Tech',
    component: <CaseStudiesAndTech />,
  },
  {
    id: 'automationSimulation',
    number: 3,
    title: 'Automation Simulation',
    component: <AutomationSimulation />,
  },
  {
    id: 'robustAutomationSimulation',
    number: 4,
    title: 'Robust Automation Simulation',
    component: <RobustAutomationSimulation />,
  },
  {
    id: 'digitalProductAutomationSimulation',
    number: 5,
    title: 'Digital Product Automation Simulation',
    component: <DigitalProductAutomationSimulation />,
  },
  {
    id: 'keyTakeaways',
    number: 6,
    title: 'Key Takeaways',
    component: <KeyTakeaways />,
  },
  {
    id: 'automationQuiz',
    number: 7,
    title: 'Automation Quiz',
    component: <AutomationQuiz />,
  },
];

const AutomationDashboard = () => {
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
          <FaChartBar className="mr-2 text-yellow-600 text-2xl sm:text-3xl" /> Automation Dashboard
        </h1>
        <p className="mt-2 text-sm sm:text-lg text-gray-600 max-w-xl sm:max-w-2xl mx-auto">
          Master automation with interactive tools and simulations for scalable product growth.
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
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Introduction to Automation Modules</h2>
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
              Master automation with these seven essential modules designed to enhance scalability and efficiency in product development:
            </p>
            <ul className="mt-4 space-y-2 sm:space-y-3 text-gray-600 text-sm sm:text-lg">
              <li>
                <span className="font-semibold text-yellow-600">Scalability & Automation:</span> Learn strategies to build scalable systems with automated processes for growth.
              </li>
              <li>
                <span className="font-semibold text-yellow-600">Case Studies & Tech:</span> Explore real-world case studies and technologies driving automation in products.
              </li>
              <li>
                <span className="font-semibold text-yellow-600">Automation Simulation:</span> Practice automation techniques through interactive simulations.
              </li>
              <li>
                <span className="font-semibold text-yellow-600">Robust Automation Simulation:</span> Dive into advanced simulations for building resilient automation systems.
              </li>
              <li>
                <span className="font-semibold text-yellow-600">Digital Product Automation Simulation:</span> Simulate automation for digital products to optimize user experiences.
              </li>
              <li>
                <span className="font-semibold text-yellow-600">Key Takeaways:</span> Summarize critical insights and best practices for effective automation.
              </li>
              <li>
                <span className="font-semibold text-yellow-600">Automation Quiz:</span> Test your knowledge of automation concepts through interactive quizzes.
              </li>
            </ul>
            <p className="mt-4 text-gray-600 text-sm sm:text-lg">
              Click the modules below to explore interactive tools and simulations for mastering automation.
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
                <span className="text-lg sm:text-xl font-medium text-gray-800">{item.title}</span>
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

export default AutomationDashboard;