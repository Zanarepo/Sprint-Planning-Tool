import React, { useState, useEffect } from 'react';
import { FaDatabase, FaCode, FaLaptopCode, FaNetworkWired } from 'react-icons/fa';
import { toast } from 'react-toastify';  // Import the toast function
import DatabaseSection from './DatabaseSection';
import FrontendSection from './FrontendSection';
import BackendSection from './BackendSection';
import APISection from './APISection';
import QASection from './QASection';
import Porters from './Porters';
import SystemArchitectureSection from './SystemArchitectureSection';
import BrainstormingTechniques from './BrainstormingTechniques'

const Dashboard = () => {
  // State for toggling sections
  const [activeSection, setActiveSection] = useState('Frontend');

  // Card data
  const cardData = [
    {
      icon: <FaLaptopCode className="text-4xl text-blue-600" />,
      title: 'Frontend (FE)',
      description:
        'The frontend is what users see and interact with. Product managers need to understand UI/UX basics, user flows, and how frontend development impacts user experience.',
      sectionName: 'Frontend'
    },

    {
      icon: <FaCode className="text-4xl text-green-600" />,
      title: 'Backend (BE)',
      description:
        'The backend handles business logic, data processing, and server-side operations. Understanding backend concepts helps product managers define product features realistically.',
      sectionName: 'Backend'
    },
    {
      icon: <FaNetworkWired className="text-4xl text-purple-600" />,
      title: 'APIs',
      description:
        'APIs enable communication between systems. Product managers should understand API endpoints, data formats, and how APIs influence integrations and third-party services.',
      sectionName: 'APIs'
    },
    {
      icon: <FaDatabase className="text-4xl text-red-600" />,
      title: 'Database',
      description:
        'Databases store and retrieve data. Knowing key database concepts helps product managers design data-driven features and work better with development teams.',
      sectionName: 'Database'
    },
    {
      icon: <FaLaptopCode className="text-4xl text-yellow-500" />,
      title: 'Porters 5 Forces Analysis for PMs',
      description:
        'Porter’s Five Forces helps product managers analyze market competition, buyer power, supplier power, the threat of substitutes, and barriers to entry. Understanding these forces aids in strategic decision-making.',
      sectionName: 'Porters'
    },


    {
      icon: <FaLaptopCode className="text-4xl text-yellow-500" />,
      title: 'Brainstorming Techniques',
      description:
        'Importance of Brainstorming Techniques',
      sectionName: 'Brainstorming'
    },
  ];

  // UseEffect to show a toast notification when the component is mounted
  useEffect(() => {
    toast.info('Welcome to the Dashboard! Here are some key concepts to explore.');
  }, []);

  // Toggle Section Handler
  const toggleSection = (sectionName) => {
    setActiveSection(sectionName);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold bg-blue-100 items-center mb-2">
        Masterclass: Understanding Databases, Frontend, Backend, and APIs as a Product Manager
      </h1>

      {/* Toggle Buttons */}
      <div className="mb-6">
        {cardData.map((card, index) => (
          <button
            key={index}
            onClick={() => toggleSection(card.sectionName)}
            className={`mr-4 mb-4 px-6 py-2 rounded-full ${
              activeSection === card.sectionName
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300'
            }`}
          >
            {card.title}
          </button>
        ))}
      </div>

      {/* Card Content */}
      <div>
        {activeSection === 'Frontend' && <FrontendSection />}
        {activeSection === 'Backend' && <BackendSection />}
        {activeSection === 'APIs' && <APISection />}
        {activeSection === 'Database' && <DatabaseSection />}
        {activeSection === 'Porters' && <Porters />}
        {activeSection === 'SystemArchitecture' && <SystemArchitectureSection />}
        {activeSection === 'Brainstorming' && <BrainstormingTechniques />}
        {activeSection === 'QA' && <QASection />}
        {activeSection === 'QA' && <QASection />}
      </div>
    </div>
  );
};

export default Dashboard;
