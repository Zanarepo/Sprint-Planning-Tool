import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  User, 
  Brain, 
  BarChart, 
  LineChart, 
  Compass,  
  BarChart2, 
  ClipboardList, 
  BarChart3, 
  FileText, 
  Map, 
  Target, 
  ListChecks,  
  Bug, 
 
  PieChart, 
  DollarSign,  
  Wallet, 
  Rocket, 
  Users, 
  ClipboardCheck,
  Activity, 
  UserCheck, 
  TrendingUp, 
  Gauge 
} from "lucide-react";

const appList = [
  {
    name: "Sprint Simulator",
    route: "/sprints2",
    icon: <Rocket size={20} className="text-blue-600" />,
  },
  {
    name: "Feature Estimator",
    route: "/estimator2",
    icon: <LineChart size={20} className="text-green-600" />,
  },
  {
    name: "Brainstorm Hub",
    route: "/brainstorm2",
    icon: <Brain size={20} className="text-yellow-600" />,
  },
  {
    name: "Daily Standup",
    route: "/standup2",
    icon: <Users size={20} className="text-purple-600" />,
  },
  {
    name: "Burndown Chart",
    route: "/burndown2",
    icon: <Activity size={20} className="text-red-600" />,
  },
  {
    name: "Polling Hub",
    route: "/vote2",
    icon: <BarChart2 size={20} className="text-green-900" />,
  },
  {
    name: "Active Users Metrics",
    route: "/activeusers2",
    icon: <UserCheck size={20} className="text-red-900" />,
  },
  {
    name: "Product Metrics",
    route: "/prodmetrics2",
    icon: <TrendingUp size={20} className="text-yellow-400" />,
  },
  {
    name: "CX Metrics",
    route: "/metricsdb2",
    icon: <Gauge size={20} className="text-purple-900" />,
  },
  {
    name: "Revenue Metrics Tracker",
    route: "/revenuedb2",
    icon: <DollarSign size={20} className="text-green-600" />,
  },
  {
    name: "Expense Tracker",
    route: "/expense2",
    icon: <Wallet size={20} className="text-orange-900" />,
  },
  {
    name: "Cohort Analysis",
    route: "/cohort2",
    icon: <PieChart size={20} className="text-pink-600" />,
  },
  {
    name: "Pirate Metrics",
    route: "/activation2",
    icon: <BarChart3 size={20} className="text-pink-600" />,
  },
  {
    name: "Launch Checklist",
    route: "/checklist2",
    icon: <ClipboardCheck size={20} className="text-purple-700" />,
  },
  {
    name: "Bug Tracking",
    route: "/bug2",
    icon: <Bug size={20} className="text-red-700" />,
  },
  {
    name: "KPIs",
    route: "/kpi2",
    icon: <Target size={20} className="text-indigo-700" />,
  },
  {
    name: "Product Roadmap",
    route: "/roadmap2",
    icon: <Map size={20} className="text-blue-700" />,
  },
  {
    name: "Feature Matrix",
    route: "/compare2",
    icon: <User size={20} className="text-blue-500" />,
  },
  {
    name: "Product Strategy",
    route: "/strategy2",
    icon: <Compass size={20} className="text-blue-700" />,
  },
  {
    name: "PRD",
    route: "/prd2",
    icon: <FileText size={20} className="text-yellow-900" />,
  },
  {
    name: "Competitive Analysis",
    route: "/companalysis2",
    icon: <BarChart size={20} className="text-brown-700" />,
  },
  {
    name: "Epics & User Stories",
    route: "/epics2",
    icon: <ClipboardList size={20} className="text-green-900" />,
  },
  {
    name: "Market Research",
    route: "/marketresearch2",
    icon: <BarChart size={20} className="text-green-900" />,
  },
  {
    name: "Prioritization Techniques",
    route: "/prioritization2",
    icon: <ListChecks size={20} className="text-blue-900" />,
  },
  {
    name: "User Research",
    route: "/userresearch2",
    icon: <User size={20} className="text-blue-500" />,
  },

  {
    name: "User Acceptance Testing",
    route: "/uat",
    icon: <ClipboardCheck size={20} className="text-blue-500" />,
  },


  
];

const AppLauncher = () => {
  // State to track if an app has been selected (for detail view)
  const [selectedApp, setSelectedApp] = useState(null);

  // Handler to simulate "opening" an app
  const handleAppClick = (app) => {
    setSelectedApp(app);
  };

  // Handler to go back to the launcher homepage
  const handleBack = () => {
    setSelectedApp(null);
  };

  return (
    <div className="min-h-screen p-0 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
      {/* Centered Header */}
      <header className="flex justify-center items-center mb-6 p-4">
        <h1 className="text-3xl font-bold text-center text-yellow-700">Product Tools</h1>
      </header>

      {/* If an app is selected, display its detail view */}
      {selectedApp ? (
        <div className="p-4">
          <button
            onClick={handleBack}
            className="mb-4 px-4 py-2 border rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors"
          >
            Back
          </button>
          <div className="flex flex-col items-center justify-center">
            <div className="mb-4 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg">
              {selectedApp.icon}
            </div>
            <h2 className="text-2xl font-bold mb-2">{selectedApp.name}</h2>
            <p className="text-center">
              This is the {selectedApp.name} page. Click the button below to proceed.
            </p>
            <Link
              to={selectedApp.route}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Go to {selectedApp.name}
            </Link>
          </div>
        </div>
      ) : (
        // Launcher homepage: Grid of app links
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 p-4">
          {appList.map((app, index) => (
            <button
              key={index}
              onClick={() => handleAppClick(app)}
              className="flex flex-col items-center p-4 rounded transition-transform duration-200 transform hover:scale-105 hover:bg-gray-100 dark:hover:bg-yellow-700"
            >
              <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg">
                {app.icon}
              </div>
              <span className="mt-2 text-xs text-center">{app.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppLauncher;
