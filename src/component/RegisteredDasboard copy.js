import React, { useState, useEffect } from 'react';
import { 
  FaUsers, 
  FaUserShield, 
  FaCreditCard, 
  FaCog, 
  FaBell, 
  FaEnvelope, 
  FaStar, 
  FaBars, 
  FaTimes 
} from 'react-icons/fa';
import Dasboard from './Dashboards';
import Reviews from './SprintDashboard/Reviews';
import Admins from './SprintDashboard/Admins';
import Tools from './Tools';

const Dashboard = () => {
  // Set default active tab to "RegisteredHomePage2" to match the switch-case below.
  const [activeTab, setActiveTab] = useState('RegisteredHomePage2');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle dark mode by adding or removing the "dark" class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Render main content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'RegisteredHomePage2':
        return (
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow">
            <RegisteredHomePage2 />
          </div>
        );
      case 'reviews':
        return (
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow">
            <Reviews />
          </div>
        );
      case 'Tools':
        return (
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow">
            <Tools />
          </div>
        );
      case 'admins':
        return (
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow">
            <Admins />
          </div>
        );
      case 'subscriptions':
        return (
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow">
            {/* Subscriptions content */}
          </div>
        );
      case 'settings':
        return (
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow">
            {/* Settings content */}
          </div>
        );
      case 'notifications':
        return (
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow">
            Notifications Section Content
          </div>
        );
      default:
        return (
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow">
            Dashboard Content
          </div>
        );
    }
  };

  // Handle navigation click: update active tab and close sidebar on mobile
  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 mt-24">
      {/* Sidebar */}
      <aside 
        className={`transition-all duration-300 bg-white dark:bg-gray-800 ${sidebarOpen ? "w-64" : "w-0"} md:w-64 flex-shrink-0`}
      >
        <div className={`${sidebarOpen ? "block" : "hidden"} md:block`}>
          <div className="p-6">
            {/* Mobile Header inside sidebar */}
            <div className="flex md:hidden items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Menu</h2>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-800 dark:text-white">
                <FaTimes size={24} />
              </button>
            </div>
            <nav className="mt-4">
              <ul className="space-y-2">
                <li 
                  onClick={() => handleNavClick('RegisteredHomePage2')}
                  className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-yellow-800 transition ${activeTab === 'RegisteredHomePage2' ? 'bg-gray-300 dark:bg-yellow-800' : ''}`}
                >
                  <FaUsers className="text-yellow-800 dark:text-gray-300 mr-3" />
                  <span className="text-yellow-800 dark:text-gray-300">Dashboard</span>
                </li>

                {/* Tools (Apps) tab using consistent active tab value "Tools" */}
                <li 
                  onClick={() => handleNavClick('Tools')}
                  className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-yellow-800 transition ${activeTab === 'Tools' ? 'bg-gray-300 dark:bg-yellow-800' : ''}`}
                >
                  <FaEnvelope className="text-yellow-800 dark:text-gray-300 mr-3" />
                  <span className="text-yellow-800 dark:text-gray-300">Apps</span>
                </li>
              
                <li 
                  onClick={() => handleNavClick('admins')}
                  className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-yellow-700 transition ${activeTab === 'admins' ? 'bg-gray-300 dark:bg-yellow-800' : ''}`}
                >
                  <FaUserShield className="text-yellow-800 dark:text-gray-300 mr-3" />
                  <span className="text-yellow-800 dark:text-gray-300">Admins</span>
                </li> 
                
                <li 
                  onClick={() => handleNavClick('reviews')}
                  className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-yellow-800 transition ${activeTab === 'reviews' ? 'bg-gray-300 dark:bg-yellow-800' : ''}`}
                >
                  <FaStar className="text-yellow-800 dark:text-gray-300 mr-3" />
                  <span className="text-yellow-800 dark:text-gray-300">Reviews</span>
                </li>

                <li 
                  onClick={() => handleNavClick('subscriptions')}
                  className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-yellow-800 transition ${activeTab === 'subscriptions' ? 'bg-gray-300 dark:bg-yellow-800' : ''}`}
                >
                  <FaCreditCard className="text-yellow-800 dark:text-gray-300 mr-3" />
                  <span className="text-yellow-800 dark:text-gray-300">Subscriptions</span>
                </li>
              
                <li 
                  onClick={() => handleNavClick('notifications')}
                  className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-yellow-800 transition ${activeTab === 'notifications' ? 'bg-gray-300 dark:bg-yellow-800' : ''}`}
                >
                  <FaBell className="text-yellow-800 dark:text-gray-300 mr-3" />
                  <span className="text-yellow-800 dark:text-gray-300">Notifications</span>
                </li>

                <li 
                  onClick={() => handleNavClick('settings')}
                  className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-yellow-800 transition ${activeTab === 'settings' ? 'bg-gray-300 dark:bg-yellow-800' : ''}`}
                >
                  <FaCog className="text-yellow-800 dark:text-gray-300 mr-3" />
                  <span className="text-yellow-800 dark:text-gray-300">Settings</span>
                </li>
              </ul>
            </nav>
          </div>
          {/* Dark/Light Mode Toggle */}
          <div className="p-6 mt-auto flex items-center justify-between">
            <span className="text-yellow-800 dark:text-gray-300">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox"
                className="sr-only"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <div className="w-11 h-6 bg-yellow-800 dark:bg-gray-600 rounded-full transition-colors duration-300">
                <span 
                  className={`absolute left-1 top-1 bg-white dark:bg-yellow-700 w-4 h-4 rounded-full transition-transform duration-300 ${darkMode ? 'translate-x-5' : ''}`}
                ></span>
              </div>
            </label>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        {/* Mobile Header */}
        <header className="flex md:hidden items-center justify-between p-4 bg-white dark:bg-gray-800">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-800 dark:text-white">
            <FaBars size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
          <div style={{ width: 24 }}></div>
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
