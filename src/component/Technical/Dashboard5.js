// Dashboard.js
import React, { useState } from 'react';
import { FaLightbulb, FaRoad, FaFileAlt } from 'react-icons/fa';

// Import your individual components.
// Replace these with your actual component imports.
import ProductStrategy from './ProductStrategy';
import ProductRoadmapDoc from './ProductRoadmapDoc';
import PRD from './PRD';

function Dashboard() {
  // This state tracks which component is currently active.
  const [activeComponent, setActiveComponent] = useState('strategy');

  // Render the active component based on the state.
  const renderComponent = () => {
    switch (activeComponent) {
      case 'strategy':
        return <ProductStrategy />;
      case 'roadmap':
        return <ProductRoadmapDoc />;
      case 'prd':
        return <PRD />;
      default:
        return <ProductStrategy />;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-blue-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveComponent('strategy')}
              className={`flex items-center w-full px-4 py-3 rounded transition-colors duration-200 ${
                activeComponent === 'strategy' ? 'bg-blue-800' : 'hover:bg-blue-700'
              }`}
            >
              <FaLightbulb className="mr-2" />
              Product Strategy
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent('roadmap')}
              className={`flex items-center w-full px-4 py-3 rounded transition-colors duration-200 ${
                activeComponent === 'roadmap' ? 'bg-blue-800' : 'hover:bg-blue-700'
              }`}
            >
              <FaRoad className="mr-2" />
              Product Roadmap
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent('prd')}
              className={`flex items-center w-full px-4 py-3 rounded transition-colors duration-200 ${
                activeComponent === 'prd' ? 'bg-blue-800' : 'hover:bg-blue-700'
              }`}
            >
              <FaFileAlt className="mr-2" />
              PRD
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 bg-gray-50">
        <div className="bg-white rounded-lg shadow p-6">
          {renderComponent()}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
