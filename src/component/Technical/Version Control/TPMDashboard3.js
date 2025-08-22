import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import GithubSection from './Github';
import MicroservicesSection from './Microservices';
import SecuritySection from './Security';
import LoadBalancingComponent from './LoadBalancingComponent';
import DataPipeline from './DataPipeline';
import BEArchitecture from './BEArchitecture';
import Timer from './Timer';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [openOverview, setOpenOverview] = useState(true);
  const [timerActive, setTimerActive] = useState(false);

  const cardData = [
    {
      icon: '🐙',
      iconColor: 'text-blue-600',
      title: 'Github',
      description: 'Understanding version control with Github is essential for collaboration.',
      outcome: 'Learn Github for effective version control.',
      sectionName: 'github',
    },
    {
      icon: '⚙️',
      iconColor: 'text-green-600',
      title: 'Microservices',
      description: 'Microservices architecture is key for scaling applications effectively.',
      outcome: 'Understand microservices for scalable systems.',
      sectionName: 'microservices',
    },
    {
      icon: '🛡️',
      iconColor: 'text-yellow-600',
      title: 'Security',
      description: 'Security is crucial for protecting data and ensuring system integrity.',
      outcome: 'Master security practices for product safety.',
      sectionName: 'security',
    },
    {
      icon: '🌐',
      iconColor: 'text-purple-600',
      title: 'Load Balancing',
      description: 'Load balancing optimizes the distribution of traffic to ensure smooth operation.',
      outcome: 'Optimize traffic with load balancing.',
      sectionName: 'loadbalancing',
    },
    {
      icon: '📊',
      iconColor: 'text-red-600',
      title: 'Data Pipeline',
      description: 'Data pipelines enable the smooth flow and transformation of data.',
      outcome: 'Build efficient data pipelines.',
      sectionName: 'datapipeline',
    },
    {
      icon: '🖥️',
      iconColor: 'text-gray-600',
      title: 'Backend Architecture',
      description: 'Backend architecture is the foundation for robust, scalable systems.',
      outcome: 'Design robust backend architectures.',
      sectionName: 'bearchitecture',
    },
  ];

  useEffect(() => {
    toast.info('Explore key PM concepts!', {
      toastId: 'welcome-dashboard',
      theme: 'light',
      style: { background: '#fef3c7', color: '#1f2937' },
    });
  }, []);

  const toggleOverview = () => {
    setOpenOverview((prev) => !prev);
  };

  const handleSectionToggle = (sectionName) => {
    setActiveSection(sectionName);
    setTimerActive(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToOverview = () => {
    setActiveSection(null);
    setTimerActive(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStopTimer = () => {
    setTimerActive(false);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans flex flex-col mt-16">
      {activeSection && (
        <button
          onClick={handleBackToOverview}
          className="fixed  left-4 z-50 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-3 py-1 rounded-lg transition duration-300 text-sm hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          aria-label="Back to dashboard"
        >
          ⬅️ Back
        </button>
      )}
      {/* Header and Overview */}
      {!activeSection && (
        <header className="mb-8 border-b border-yellow-200 flex-1">
          <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
              <span className="mr-2 text-2xl">🌟</span>
              Masterclass: Technical Product Management
            </h1>
            <button
              onClick={toggleOverview}
              className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
              aria-expanded={openOverview}
              aria-controls="overview-section"
            >
              {openOverview ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className={`transition-all duration-500 overflow-hidden ${openOverview ? 'max-h-max' : 'max-h-0'}`}>
            <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300 text-center">
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Learn key technical concepts for product managers, including Github, Microservices, Security, Load Balancing, Data Pipelines, and Backend Architecture to enhance your PM skills.
              </p>
            </div>
            <div className="m-4 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cardData.map((card) => (
                  <div
                    key={card.sectionName}
                    className="p-4 sm:p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300 hover:scale-105 transition-transform duration-300"
                    title={card.outcome}
                  >
                    <div className="flex items-center mb-4">
                      <span className={`text-4xl ${card.iconColor} mr-3`}>{card.icon}</span>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{card.title}</h3>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{card.description}</p>
                    <button
                      onClick={() => handleSectionToggle(card.sectionName)}
                      className="mt-4 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                      aria-label={`Explore ${card.title}`}
                    >
                      Explore Now
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Timer isActive={timerActive} onStop={handleStopTimer} />
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Content Display */}
      {activeSection && (
        <section className="m-4 max-w-7xl mx-auto flex-1">
          <div className="bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-md border border-yellow-300">
            <div className="flex items-center mb-4">
              <span className={`text-4xl ${cardData.find((c) => c.sectionName === activeSection).iconColor} mr-3`}>
                {cardData.find((c) => c.sectionName === activeSection).icon}
              </span>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
                {cardData.find((c) => c.sectionName === activeSection).title}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
              {cardData.find((c) => c.sectionName === activeSection).description}
            </p>
            {activeSection === 'github' && <GithubSection onStop={handleStopTimer} />}
            {activeSection === 'microservices' && <MicroservicesSection onStop={handleStopTimer} />}
            {activeSection === 'security' && <SecuritySection onStop={handleStopTimer} />}
            {activeSection === 'loadbalancing' && <LoadBalancingComponent onStop={handleStopTimer} />}
            {activeSection === 'datapipeline' && <DataPipeline onStop={handleStopTimer} />}
            {activeSection === 'bearchitecture' && <BEArchitecture onStop={handleStopTimer} />}
            <div className="mt-6">
              <Timer isActive={timerActive} onStop={handleStopTimer} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;