import React, { useState } from 'react';
import { FaUsers, FaChevronDown, FaChevronUp, FaEye, FaEyeSlash } from 'react-icons/fa';
import CrossFunctionalCollaboration from './CrossFunctionalCollaboration';
import KeyTeamsRoles from './KeyTeamsRoles';
import CollaborationStrategies from './CollaborationStrategies';
import ToolsFrameworks from './ToolsFrameworks';
import ChallengesKeyTakeaways from './ChallengesKeyTakeaways';
import CrossfunctionalCollaborationQuiz from './CrossfunctionalCollaborationQuiz';
import CrossfunctionalCollaborationSimulation from './CrossfunctionalCollaborationSimulation';

const dashboardItems = [
  { id: 'collaboration', title: 'Cross-Functional Collaboration', component: <CrossFunctionalCollaboration /> },
  { id: 'teamsRoles', title: 'Key Teams & Roles', component: <KeyTeamsRoles /> },
  { id: 'collabStrategies', title: 'Collaboration Strategies', component: <CollaborationStrategies /> },
  { id: 'toolsFrameworks', title: 'Tools & Frameworks', component: <ToolsFrameworks /> },
  { id: 'challengesTakeaways', title: 'Challenges & Key Takeaways', component: <ChallengesKeyTakeaways /> },
  { id: 'collabQuiz', title: 'Crossfunctional Collaboration Quiz', component: <CrossfunctionalCollaborationQuiz /> },
  { id: 'collabSimulation', title: 'Collaboration Simulation', component: <CrossfunctionalCollaborationSimulation /> },
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
          <FaUsers className="mr-2 text-yellow-600 text-2xl sm:text-3xl" /> Cross-Functional Collaboration Dashboard
        </h1>
        <p className="mt-2 text-sm sm:text-lg text-gray-600 max-w-xl sm:max-w-2xl mx-auto">
          Master cross-functional collaboration with interactive modules for growth product management.
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
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Introduction to Collaboration Modules</h2>
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
              Unlock the power of cross-functional collaboration with these seven modules designed to help Growth PMs work effectively across teams to drive product success:
            </p>
            <ul className="mt-4 space-y-2 sm:space-y-3 text-gray-600 text-sm sm:text-lg">
              <li>
                <span className="font-semibold text-yellow-600">Cross-Functional Collaboration:</span> Learn the fundamentals of collaborating across teams to execute growth strategies.
              </li>
              <li>
                <span className="font-semibold text-yellow-600">Key Teams & Roles:</span> Understand the roles of marketing, engineering, design, and data teams in growth initiatives.
              </li>
              <li>
                <span className="font-semibold text-yellow-600">Collaboration Strategies:</span> Explore strategies to foster alignment and communication across departments.
              </li>
              <li>
                <span className="font-semibold text-yellow-600">Tools & Frameworks:</span> Discover tools and frameworks that streamline cross-functional workflows.
              </li>
              <li>
                <span className="font-semibold text-yellow-600">Challenges & Key Takeaways:</span> Address common collaboration challenges and learn key insights for success.
              </li>
              <li>
                <span className="font-semibold text-yellow-600">Crossfunctional Collaboration Quiz:</span> Test your knowledge with interactive quizzes on collaboration concepts.
              </li>
              <li>
                <span className="font-semibold text-yellow-600">Collaboration Simulation:</span> Practice collaboration through simulations that mimic real-world team dynamics.
              </li>
            </ul>
            <p className="mt-4 text-gray-600 text-sm sm:text-lg">
              Click the modules below to explore interactive tools and simulations for mastering cross-functional collaboration.
            </p>
          </div>
        )}
      </section>

      {/* Module List */}
      <div className="space-y-4">
        {dashboardItems.map((item, index) => (
          <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-yellow-600">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-4 sm:p-6 hover:bg-gray-50 transition-colors focus:outline-none"
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
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

export default Dashboard;