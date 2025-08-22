import React, { useState } from 'react';
import { 
  FaSearch, 
  FaDollarSign, 
  FaBrain, 
  FaTools, 
  FaCogs, 
  FaQuestionCircle, 
  FaClipboardList, 
  FaChartBar, 
  FaChevronDown, 
  FaChevronUp, 
  FaEye, 
  FaEyeSlash 
} from 'react-icons/fa';
import DigitalMarketingForGrowthPMs from './DigitalMarketingForGrowthPMs';
import PaidAdsForGrowthPMs from './PaidAdsForGrowthPMs';
import BehavioralPsychologyForGrowthPMs from './BehavioralPsychologyForGrowthPMs';
import IntegratingDigitalMarketingBehavioralPsychology from './IntegratingDigitalMarketingBehavioralPsychology';
import IntegratedCampaignSimulation from './IntegratedCampaignSimulation';
import Marketingquizzes from './Marketingquizzes';
import TaskDigital from './TaskDigital';

const dashboardItems = [
  {
    id: 'digitalMarketing',
    number: 1,
    title: 'Digital Marketing for Growth PMs',
    icon: <FaSearch className="text-3xl sm:text-4xl text-indigo-500" />,
    component: <DigitalMarketingForGrowthPMs />,
  },
  {
    id: 'paidAds',
    number: 2,
    title: 'Paid Ads for Growth PMs',
    icon: <FaDollarSign className="text-3xl sm:text-4xl text-green-500" />,
    component: <PaidAdsForGrowthPMs />,
  },
  {
    id: 'behavioralPsychology',
    number: 3,
    title: 'Behavioral Psychology for Growth PMs',
    icon: <FaBrain className="text-3xl sm:text-4xl text-blue-500" />,
    component: <BehavioralPsychologyForGrowthPMs />,
  },
  {
    id: 'integratingDigitalMarketing',
    number: 4,
    title: 'Integrating Digital Marketing & Behavioral Psychology',
    icon: <FaTools className="text-3xl sm:text-4xl text-purple-500" />,
    component: <IntegratingDigitalMarketingBehavioralPsychology />,
  },
  {
    id: 'integratedCampaign',
    number: 5,
    title: 'Integrated Campaign Simulation',
    icon: <FaCogs className="text-3xl sm:text-4xl text-orange-500" />,
    component: <IntegratedCampaignSimulation />,
  },
  {
    id: 'marketingQuizzes',
    number: 6,
    title: 'Marketing Quizzes',
    icon: <FaQuestionCircle className="text-3xl sm:text-4xl text-teal-500" />,
    component: <Marketingquizzes />,
  },
  {
    id: 'taskDigital',
    number: 7,
    title: 'Digital Marketing Task',
    icon: <FaClipboardList className="text-3xl sm:text-4xl text-red-500" />,
    component: <TaskDigital />,
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
          <FaChartBar className="mr-2 text-yellow-600 text-2xl sm:text-3xl" /> Growth PM Dashboard
        </h1>
        <p className="mt-2 text-sm sm:text-lg text-gray-600 max-w-xl sm:max-w-2xl mx-auto">
          Master digital marketing and behavioral psychology for growth with interactive modules.
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
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Introduction to Growth PM Modules</h2>
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
              Unlock the power of digital marketing and behavioral psychology with these seven essential modules designed for Growth Product Managers:
            </p>
            <ul className="mt-4 space-y-2 sm:space-y-3 text-gray-600 text-sm sm:text-lg">
              <li>
                <span className="font-semibold text-indigo-500">Digital Marketing for Growth PMs:</span> Learn key digital marketing strategies to drive product growth.
              </li>
              <li>
                <span className="font-semibold text-green-500">Paid Ads for Growth PMs:</span> Master paid advertising techniques to boost user acquisition.
              </li>
              <li>
                <span className="font-semibold text-blue-500">Behavioral Psychology for Growth PMs:</span> Understand user behavior to optimize product engagement.
              </li>
              <li>
                <span className="font-semibold text-purple-500">Integrating Digital Marketing & Behavioral Psychology:</span> Combine marketing and psychology for impactful growth strategies.
              </li>
              <li>
                <span className="font-semibold text-orange-500">Integrated Campaign Simulation:</span> Practice running integrated marketing campaigns through simulations.
              </li>
              <li>
                <span className="font-semibold text-teal-500">Marketing Quizzes:</span> Test your knowledge with interactive marketing quizzes.
              </li>
              <li>
                <span className="font-semibold text-red-500">Digital Marketing Task:</span> Apply your skills with practical digital marketing tasks.
              </li>
            </ul>
            <p className="mt-4 text-gray-600 text-sm sm:text-lg">
              Click the modules below to explore interactive tools and simulations for mastering growth strategies.
            </p>
          </div>
        )}
      </section>

      {/* Module List */}
      <div className="space-y-4">
        {dashboardItems.map((item) => (
          <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-yellow-600">
            <button
              onClick={() => toggleModule(item.id)}
              className="w-full flex items-center justify-between p-4 sm:p-6 hover:bg-gray-50 transition-colors focus:outline-none"
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">
                  {item.number}
                </div>
                <div className="flex items-center">
                  {item.icon}
                  <span className="ml-2 text-lg sm:text-xl font-medium text-gray-800">{item.title}</span>
                </div>
              </div>
              <div className="text-lg sm:text-xl text-gray-600">
                {activeModule === item.id ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </button>
            {activeModule === item.id && (
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