import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AgileMethodologyComponent from './AgileMethodologyComponent';
import CostManagement from './CostManagement';
import DatabaseComparison from './DatabaseComparison';
import CustomerJourneyMapping from './CustomerJourneyMapping';
import FeatureFeasibilityComponent from './FeatureFeasibilityComponent';
import MonitoringMetrics from './MonitoringMetrics';
import RiskManagementComponent from './RiskManagementComponent';
import UserFlowsDesign from './UserFlowsAndDesign';
import DatabaseNormalization from './DatabaseNormalization';
import DatabaseIndexing from './DatabaseIndexing';
import DatabaseOptimization from './DatabaseOptimization';
import TradeOffs from './Tradeoffs';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [openOverview, setOpenOverview] = useState(true);

  const cardData = [
    {
      icon: '📊',
      iconColor: 'text-blue-600',
      title: 'Agile Methodology',
      description: 'Understand how Agile methodologies help manage development sprints and product delivery.',
      outcome: 'Learn Agile principles for effective product management.',
      sectionName: 'Agile',
    },
    {
      icon: '⚖️',
      iconColor: 'text-blue-600',
      title: 'Trade-offs',
      description: 'Understanding trade-offs as a PM to balance scope, time, and resources effectively.',
      outcome: 'Master decision-making with trade-offs.',
      sectionName: 'Tradeoffs',
    },
    {
      icon: '💰',
      iconColor: 'text-green-600',
      title: 'Cost Management',
      description: 'Learn how to manage the product budget, track costs, and allocate resources effectively.',
      outcome: 'Develop skills in budgeting and resource allocation.',
      sectionName: 'Cost',
    },
    {
      icon: '🗄️',
      iconColor: 'text-red-600',
      title: 'Database Comparison',
      description: 'Know the difference between SQL and NoSQL databases and their application in product development.',
      outcome: 'Understand SQL vs. NoSQL for product decisions.',
      sectionName: 'Database',
    },
    {
      icon: '🗺️',
      iconColor: 'text-purple-600',
      title: 'System Architecture',
      description: 'Learn how to design scalable and robust system architectures.',
      outcome: 'Design scalable system architectures.',
      sectionName: 'Journey',
    },
    {
      icon: '⚠️',
      iconColor: 'text-yellow-600',
      title: 'Feature Feasibility',
      description: 'Evaluate and validate feature feasibility, technical constraints, and customer impact.',
      outcome: 'Assess feature feasibility effectively.',
      sectionName: 'Feature',
    },
    {
      icon: '💡',
      iconColor: 'text-orange-600',
      title: 'Monitoring Metrics',
      description: 'Learn about monitoring key product metrics to ensure performance and scalability.',
      outcome: 'Track metrics for product performance.',
      sectionName: 'Monitoring',
    },
    {
      icon: '🤝',
      iconColor: 'text-teal-600',
      title: 'Risk Management',
      description: 'Identify and mitigate risks to ensure smooth product delivery and operations.',
      outcome: 'Mitigate risks in product development.',
      sectionName: 'Risk',
    },
    {
      icon: '🛤️',
      iconColor: 'text-indigo-600',
      title: 'User Flows & Design',
      description: 'Understand how to design user flows and map the customer journey effectively.',
      outcome: 'Create effective user flows and journeys.',
      sectionName: 'UserFlows',
    },
    {
      icon: '🔄',
      iconColor: 'text-blue-600',
      title: 'Database Normalization',
      description: 'Understanding Database Normalization helps curate efficient products to reduce redundancy and improve data integrity.',
      outcome: 'Learn normalization for efficient databases.',
      sectionName: 'DatabaseNormalization',
    },
    {
      icon: '🔍',
      iconColor: 'text-blue-600',
      title: 'Database Indexing',
      description: 'Learn how database indexing enhances query performance by enabling faster data retrieval while balancing storage overhead.',
      outcome: 'Optimize queries with indexing.',
      sectionName: 'DatabaseIndexing',
    },
    {
      icon: '⚡',
      iconColor: 'text-blue-600',
      title: 'Database Optimization',
      description: 'Discover strategies to improve database performance, including query tuning, schema design, and resource management for efficient operations.',
      outcome: 'Enhance database performance.',
      sectionName: 'DatabaseOptimization',
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToOverview = () => {
    setActiveSection(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans flex flex-col mt-16">
      {activeSection && (
        <button
          onClick={handleBackToOverview}
          className="fixed mt-6 left-4 z-50 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-3 py-1 rounded-lg transition duration-300 text-sm hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
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
                Learn key technical concepts for product managers, including Agile, Cost Management, Databases, System Architecture, and more to enhance your PM skills.
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
            {activeSection === 'Agile' && <AgileMethodologyComponent />}
            {activeSection === 'Cost' && <CostManagement />}
            {activeSection === 'Database' && <DatabaseComparison />}
            {activeSection === 'Journey' && <CustomerJourneyMapping />}
            {activeSection === 'Feature' && <FeatureFeasibilityComponent />}
            {activeSection === 'Monitoring' && <MonitoringMetrics />}
            {activeSection === 'Risk' && <RiskManagementComponent />}
            {activeSection === 'UserFlows' && <UserFlowsDesign />}
            {activeSection === 'DatabaseNormalization' && <DatabaseNormalization />}
            {activeSection === 'DatabaseIndexing' && <DatabaseIndexing />}
            {activeSection === 'DatabaseOptimization' && <DatabaseOptimization />}
            {activeSection === 'Tradeoffs' && <TradeOffs />}
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;