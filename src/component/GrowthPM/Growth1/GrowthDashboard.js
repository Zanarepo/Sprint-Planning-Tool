import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import DataDrivenSimulation from './DataDrivenSimulation';
import CustomerAcquisitionRetention from './CustomerAcquisitionRetention';
import MarketUserInsights from './MarketUserInsights';
import MarketInsightsAndCollaboration from './MarketInsightsAndCollaboration';
import StrategicThinkingInnovation from './StrategicThinkingInnovation';
import StrategicThinkingInnovation2 from './StrategicThinkingInnovation2';
import OperationalExcel from './OperationalExcel';
import ExperimentationTesting from './ExperimentationTesting';
import RapidGrowthScaling from './RapidGrowthScaling';
import GPM2 from '../ProductAnalytics/GPM2';

const dashboardTiles = [
  {
    id: 'dataDriven',
    title: 'Data Driven Simulation',
    icon: '📈',
    iconColor: 'text-blue-500',
    description: 'Leverage data analytics to model and predict growth outcomes, enabling informed decision-making.',
    component: <DataDrivenSimulation />,
  },
  {
    id: 'customerAcquisition',
    title: 'Customer Acquisition & Retention',
    icon: '👥',
    iconColor: 'text-green-500',
    description: 'Master strategies to attract and retain customers for long-term success.',
    component: <CustomerAcquisitionRetention />,
  },
  {
    id: 'marketUserInsights',
    title: 'Market & User Insights',
    icon: '🔍',
    iconColor: 'text-purple-500',
    description: 'Understand user needs and market trends through in-depth research and analysis.',
    component: <MarketUserInsights />,
  },
  {
    id: 'marketCollaboration',
    title: 'Market Insights & Collaboration',
    icon: '🤝',
    iconColor: 'text-red-500',
    description: 'Foster cross-functional collaboration to align growth strategies with market opportunities.',
    component: <MarketInsightsAndCollaboration />,
  },
  {
    id: 'strategicInnovation',
    title: 'Strategic Thinking & Innovation',
    icon: '💡',
    iconColor: 'text-yellow-500',
    description: 'Develop creative solutions to solve complex growth challenges.',
    component: <StrategicThinkingInnovation />,
  },
  {
    id: 'strategicInnovation2',
    title: 'Strategic Thinking & Innovation 2',
    icon: '💡',
    iconColor: 'text-orange-500',
    description: 'Build on innovative strategies to sustain competitive advantage.',
    component: <StrategicThinkingInnovation2 />,
  },
  {
    id: 'operationalExcel',
    title: 'Operational Excellence',
    icon: '⚙️',
    iconColor: 'text-indigo-500',
    description: 'Optimize processes to ensure efficient and scalable growth operations.',
    component: <OperationalExcel />,
  },
  {
    id: 'experimentationTesting',
    title: 'Experimentation & Testing',
    icon: '🧪',
    iconColor: 'text-pink-500',
    description: 'Run controlled experiments to validate growth hypotheses and optimize performance.',
    component: <ExperimentationTesting />,
  },
  {
    id: 'rapidGrowth',
    title: 'Rapid Growth & Scaling',
    icon: '🚀',
    iconColor: 'text-teal-500',
    description: 'Implement strategies to accelerate growth and scale operations effectively.',
    component: <RapidGrowthScaling />,
  },
  {
    id: 'gpm2',
    title: 'Product Analytics Tools',
    icon: '📊',
    iconColor: 'text-yellow-600',
    description: 'Explore tools for analyzing product performance and user behavior.',
    component: <GPM2 />,
  },
];

const DashboardTiles = () => {
  const [openTile, setOpenTile] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    toast.info('Explore key PM concepts!', {
      toastId: 'welcome-dashboard',
      theme: 'light',
      style: { background: '#fef3c7', color: '#1f2937' },
    });
  }, []);

  const handleTileClick = (id) => {
    setOpenTile(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToOverview = () => {
    setOpenTile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleIntro = () => {
    setShowIntro(!showIntro);
  };

  const openTileData = dashboardTiles.find((tile) => tile.id === openTile);

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans flex flex-col mt-16">
      {openTile && (
        <button
          onClick={handleBackToOverview}
          className="fixed mt-6 left-4 z-50 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-3 py-1 rounded-lg transition duration-300 text-sm hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          aria-label="Back to dashboard"
        >
          ⬅️ Back
        </button>
      )}
      {/* Header and Overview */}
      {!openTile && (
        <header className="mb-8 border-b border-yellow-200 flex-1">
          <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
              <span className="mr-2 text-2xl">🌟</span>
              Growth Concepts & Strategies
            </h1>
            <button
              onClick={toggleIntro}
              className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base flex items-center"
              aria-expanded={showIntro}
              aria-controls="introduction-section"
            >
              {showIntro ? <FaEyeSlash className="mr-2" /> : <FaEye className="mr-2" />}
              {showIntro ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className={`transition-all duration-500 overflow-hidden ${showIntro ? 'max-h-max' : 'max-h-0'}`}>
            <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300 text-center">
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Master the art of growth product management with hands-on tools and strategies, including data-driven simulations, customer acquisition, market insights, and more.
              </p>
              <button
                onClick={() => document.getElementById('tiles-section').scrollIntoView({ behavior: 'smooth' })}
                className="mt-4 bg-yellow-600 text-white py-2 px-4 sm:px-6 rounded-lg hover:bg-yellow-700 transition duration-300 transform hover:scale-105"
              >
                Explore Concepts
              </button>
            </div>
            <div id="tiles-section" className="m-4 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {dashboardTiles.map((tile) => (
                  <div
                    key={tile.id}
                    className="p-4 sm:p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300 hover:scale-105 transition-transform duration-300"
                    title={tile.description}
                  >
                    <div className="flex items-center mb-4">
                      <span className={`text-3xl sm:text-4xl ${tile.iconColor} mr-3`}>{tile.icon}</span>
                      <h3 className="text-base sm:text-xl font-semibold text-gray-800">{tile.title}</h3>
                    </div>
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{tile.description}</p>
                    <button
                      onClick={() => handleTileClick(tile.id)}
                      className="mt-4 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                      aria-label={`Explore ${tile.title}`}
                    >
                      Explore Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Content Display */}
      {openTileData && (
        <section className="m-4 max-w-7xl mx-auto flex-1">
          <div className="bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-md border border-yellow-300">
            <div className="flex items-center mb-4">
              <span className={`text-3xl sm:text-4xl ${openTileData.iconColor} mr-3`}>{openTileData.icon}</span>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">{openTileData.title}</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">{openTileData.description}</p>
            {openTileData.component}
          </div>
        </section>
      )}
    </div>
  );
};

export default DashboardTiles;