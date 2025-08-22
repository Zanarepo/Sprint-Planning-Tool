import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaChartLine, FaFire, FaCogs, FaUsers, 
  FaDollarSign, FaGlobe, FaBullhorn, FaShoppingCart,
  FaChartBar, FaLock, FaCheckCircle, FaTimesCircle
} from "react-icons/fa";

const PASSWORDS = {
  "/growth": "growth123",
  "/growthdashboard": "experiment456",
  "/viraldashboard": "viral789",
  "/automationdashboard": "auto101",
  "/Collabodashboard": "collab202",
  "/moneydashboard": "money303",
  "/localizationdashboard": "local404",
  "/marketingdashboard": "market505",
  "/marketdashboard": "digital606",
  "/sim": "sim707",
  "/seperate": "separate808"
};

const dashboards = [
  { route: "/growth", label: "Growth PM", icon: <FaChartLine />, color: "bg-yellow-600" },
  { route: "/growthdashboard", label: "Experimentation for Growth", icon: <FaChartLine />, color: "bg-yellow-600" },
  { route: "/viraldashboard", label: "Designing for Virality", icon: <FaFire />, color: "bg-yellow-600" },
  { route: "/automationdashboard", label: "Scalability & Automation", icon: <FaCogs />, color: "bg-yellow-600" },
  { route: "/Collabodashboard", label: "Cross-Functional Collaboration", icon: <FaUsers />, color: "bg-yellow-600" },
  { route: "/moneydashboard", label: "Monetization & Alignment", icon: <FaDollarSign />, color: "bg-yellow-600" },
  { route: "/localizationdashboard", label: "Localization & Expansion", icon: <FaGlobe />, color: "bg-yellow-600" },
  { route: "/marketingdashboard", label: "Marketing Exploration Process", icon: <FaBullhorn />, color: "bg-yellow-600" },
  { route: "/marketdashboard", label: "Digital Marketing for Growth", icon: <FaShoppingCart />, color: "bg-yellow-600" },
  { route: "/sim", label: "A/B Testing for Experimentation", icon: <FaChartLine />, color: "bg-yellow-600" },
  { route: "/seperate", label: "Users Experiment Segmentation", icon: <FaChartLine />, color: "bg-yellow-600" },
];

const GridDashboard = () => {
  const [unlockedTiles, setUnlockedTiles] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const storedUnlocks = JSON.parse(localStorage.getItem("unlockedDashboards")) || {};
    setUnlockedTiles(storedUnlocks);
  }, []);

  const handleUnlock = (route) => {
    setCurrentRoute(route);
    setModalOpen(true);
  };

  const submitPassword = () => {
    if (passwordInput === PASSWORDS[currentRoute]) {
      const updatedUnlocks = { ...unlockedTiles, [currentRoute]: true };
      setUnlockedTiles(updatedUnlocks);
      localStorage.setItem("unlockedDashboards", JSON.stringify(updatedUnlocks));
      setToast({ message: "Unlocked successfully!", icon: <FaCheckCircle className="text-yellow-600" /> });
      setModalOpen(false);
      setPasswordInput("");
    } else {
      setToast({ message: "Incorrect password!", icon: <FaTimesCircle className="text-red-500" /> });
    }
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-bfrom-yellow-100 to-white px-2 sm:px-4 py-8 sm:py-12 max-w-full">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg flex items-center animate-fade-in-out border border-yellow-600">
          {toast.icon}
          <span className="ml-2 text-sm sm:text-base">{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b-4 border-yellow-600 shadow-2xl py-4 sm:py-6 px-2 sm:px-4 text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 flex justify-center items-center">
          <FaChartBar className="mr-2 text-yellow-600 text-2xl sm:text-3xl" /> Growth Dashboards
        </h1>
        <p className="mt-2 text-sm sm:text-lg text-gray-600 max-w-full mx-auto">
          Unlock interactive dashboards to master growth strategies.
        </p>
        <button
          onClick={() => document.getElementById('dashboard-grid').scrollIntoView({ behavior: 'smooth' })}
          className="mt-4 bg-yellow-600 text-white py-2 px-4 sm:px-6 rounded-lg hover:bg-yellow-700 transition duration-300 transform hover:scale-105"
        >
          Explore Dashboards
        </button>
      </header>

      {/* Grid */}
      <div id="dashboard-grid" className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {dashboards.map((item, index) => (
            unlockedTiles[item.route] ? (
              <Link
                key={index}
                to={item.route}
                className={`${item.color} flex flex-col items-center justify-center rounded-lg shadow-lg p-4 sm:p-6 text-white text-center hover:scale-105 hover:shadow-yellow-200 transition-all duration-300`}
              >
                <div className="text-2xl sm:text-3xl mb-2">{item.icon}</div>
                <div className="text-sm sm:text-base font-semibold">{item.label}</div>
              </Link>
            ) : (
              <div
                key={index}
                onClick={() => handleUnlock(item.route)}
                className="bg-gray-500 flex flex-col items-center justify-center rounded-lg shadow-lg p-4 sm:p-6 text-white text-center cursor-pointer hover:scale-105 hover:shadow-yellow-200 transition-all duration-300 animate-pulse"
              >
                <FaLock className="text-2xl sm:text-3xl mb-2" />
                <h3 className="text-sm sm:text-base font-semibold">Locked</h3>
                <p className="text-xs sm:text-sm">(Click to Unlock)</p>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Unlock Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-sm w-full mx-2 sm:mx-4 border border-yellow-600">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Unlock {dashboards.find((d) => d.route === currentRoute)?.label}
            </h3>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter password"
              className="w-full p-3 text-sm sm:text-base border rounded focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 mb-4"
            />
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={submitPassword}
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition duration-300"
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setModalOpen(false);
                  setPasswordInput("");
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 
        Note for module developers:
        To add back navigation to each module (e.g., ABTestSimulation.js, ABTestProgressBar.js), include the following in the module's header or top section:
        
        import { Link } from 'react-router-dom';
        import { FaArrowLeft } from 'react-icons/fa';

        <Link
          to="/dashboard"
          className="flex items-center text-yellow-600 hover:text-yellow-700 transition duration-300 text-sm sm:text-base absolute top-4 left-4"
        >
          <FaArrowLeft className="mr-2" /> Back to Growth Dashboard
        </Link>
        
        Place this Link in the header section of each module, styled with yellow-600 to match the theme.
      */}
    </div>
  );
};

export default GridDashboard;