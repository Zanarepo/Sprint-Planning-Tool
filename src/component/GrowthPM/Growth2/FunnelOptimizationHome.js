import React, { useState } from 'react';
import {
  FaFunnelDollar,
  FaChartLine,
  FaUserCheck,
  FaRecycle,
  FaDollarSign,
  FaShareAlt,
} from 'react-icons/fa';

// Import your components (ensure these components exist and are correctly exported)
import FunnelOptimizationToolkits from './FunnelOptimizationToolkits';
import Stage2Activation from './Stage2Activation';
import StageThreeRetention from './StageThreeRetention';
import RetentionSimulation from './RetentionSimulation';
import StageRevenue from './StageRevenue';
import StageReferralAndFunnelAnalysis from './StageReferralAndFunnelAnalysis';

const dashboardItems = [
  {
    id: 'toolkits',
    title: 'Funnel Optimization Toolkits',
    icon: <FaFunnelDollar className="text-4xl text-indigo-500" />,
    component: <FunnelOptimizationToolkits />,
  },
  {
    id: 'activation',
    title: 'Stage 2: Activation',
    icon: <FaChartLine className="text-4xl text-blue-500" />,
    component: <Stage2Activation />,
  },
  {
    id: 'retention',
    title: 'Stage 3: Retention',
    icon: <FaUserCheck className="text-4xl text-green-500" />,
    component: <StageThreeRetention />,
  },
  {
    id: 'retSim',
    title: 'Retention Simulation',
    icon: <FaRecycle className="text-4xl text-orange-500" />,
    component: <RetentionSimulation />,
  },
  {
    id: 'revenue',
    title: 'Stage Revenue',
    icon: <FaDollarSign className="text-4xl text-yellow-500" />,
    component: <StageRevenue />,
  },
  {
    id: 'referral',
    title: 'Stage Referral & Funnel Analysis',
    icon: <FaShareAlt className="text-4xl text-teal-500" />,
    component: <StageReferralAndFunnelAnalysis />,
  },
];

const FunnelOptimizationDashboard = () => {
  const [activeItem, setActiveItem] = useState(null);

  const toggleItem = (id) => {
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Funnel Optimization Dashboard
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Click on a module below to view its content.
        </p>
      </header>

      <div className="space-y-4">
        {dashboardItems.map((item, index) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors focus:outline-none"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-4 font-bold">
                  {index + 1}
                </div>
                <span className="text-xl font-medium text-gray-800">
                  {item.title}
                </span>
              </div>
              <div className="text-xl text-gray-600">
                {activeItem === item.id ? '-' : '+'}
              </div>
            </button>
            {activeItem === item.id && (
              <div className="p-4 border-t border-gray-200">
                {item.component}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FunnelOptimizationDashboard;
