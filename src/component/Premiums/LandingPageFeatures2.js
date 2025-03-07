import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Rocket,
  LineChart,
  Brain,
  Users,
  BarChart,
  BarChart2,
  UserCheck,
  TrendingUp,
  Gauge,
  DollarSign,
  Wallet,
  PieChart,
  BarChart3,
  ClipboardCheck,
  Bug,
  Target,
  Map,
  LayoutGrid,
  Compass,
  FileText,
  Activity,
  ClipboardList,
  Aperture,
  List,
  User,
  Clipboard,
} from "lucide-react";

// Feature list with assigned roles.
const appList = [
  {
    name: "Sprint Simulator",
    route: "/sprints2",
    icon: <Rocket size={20} className="text-blue-600" />,
    description: "Simulate agile sprints and plan effectively.",
    roles: ["Product Manager", "Developer"],
  },
  {
    name: "Feature Estimator",
    route: "/estimator2",
    icon: <LineChart size={20} className="text-green-600" />,
    description: "Estimate feature complexity and effort.",
    roles: ["Product Manager"],
  },
  {
    name: "Brainstorm Hub",
    route: "/brainstorm2",
    icon: <Brain size={20} className="text-yellow-600" />,
    description: "Collaborate and generate innovative ideas.",
    roles: ["Product Manager", "Tutor"],
  },
  {
    name: "Daily Standup",
    route: "/standup2",
    icon: <Users size={20} className="text-purple-600" />,
    description: "Keep your team aligned with daily updates.",
    roles: ["Product Manager", "Developer"],
  },
  {
    name: "Burndown Chart",
    route: "/burndown2",
    icon: <BarChart size={20} className="text-red-600" />,
    description: "Track sprint progress and work remaining.",
    roles: ["Product Manager", "Developer"],
  },
  {
    name: "Polling Hub",
    route: "/vote2",
    icon: <BarChart2 size={20} className="text-green-900" />,
    description: "Gather team feedback through polls.",
    roles: ["Product Manager", "Tutor"],
  },
  {
    name: "Active Users Metrics",
    route: "/activeusers2",
    icon: <UserCheck size={20} className="text-red-900" />,
    description: "Monitor user engagement metrics.",
    roles: ["Product Manager"],
  },
  {
    name: "Product Metrics",
    route: "/prodmetrics2",
    icon: <TrendingUp size={20} className="text-yellow-400" />,
    description: "Measure overall product performance.",
    roles: ["Product Manager"],
  },
  {
    name: "CX Metrics",
    route: "/metricsdb2",
    icon: <Gauge size={20} className="text-purple-900" />,
    description: "Evaluate customer experience and satisfaction.",
    roles: ["Product Manager", "Tutor"],
  },
  {
    name: "Revenue Metrics Tracker",
    route: "/revenuedb2",
    icon: <DollarSign size={20} className="text-green-600" />,
    description: "Track revenue generation trends.",
    roles: ["Product Manager"],
  },
  {
    name: "Expense Tracker",
    route: "/expense2",
    icon: <Wallet size={20} className="text-orange-900" />,
    description: "Monitor expenses and manage budgets.",
    roles: ["Product Manager"],
  },
  {
    name: "Cohort Analysis",
    route: "/cohort2",
    icon: <PieChart size={20} className="text-pink-600" />,
    description: "Analyze user behavior over time.",
    roles: ["Product Manager"],
  },
  {
    name: "Pirate Metrics",
    route: "/activation2",
    icon: <BarChart3 size={20} className="text-pink-600" />,
    description:
      "Track Acquisition, Activation, Retention, Revenue & Referral.",
    roles: ["Product Manager"],
  },
  {
    name: "Launch Checklist",
    route: "/checklist2",
    icon: <ClipboardCheck size={20} className="text-purple-700" />,
    description: "Ensure all launch tasks are completed.",
    roles: ["Product Manager"],
  },
  {
    name: "Bug Tracking",
    route: "/bug2",
    icon: <Bug size={20} className="text-red-700" />,
    description: "Log and manage software bugs.",
    roles: ["Developer"],
  },
  {
    name: "KPIs",
    route: "/kpi2",
    icon: <Target size={20} className="text-indigo-700" />,
    description: "Monitor key performance indicators.",
    roles: ["Product Manager", "Developer"],
  },
  {
    name: "Product Roadmap",
    route: "/roadmap2",
    icon: <Map size={20} className="text-blue-700" />,
    description: "Visualize the long-term product plan.",
    roles: ["Product Manager"],
  },
  {
    name: "Feature Matrix",
    route: "/compare2",
    icon: <LayoutGrid size={20} className="text-blue-500" />,
    description: "Compare features side-by-side.",
    roles: ["Product Manager"],
  },
  {
    name: "Product Strategy",
    route: "/strategy2",
    icon: <Compass size={20} className="text-blue-700" />,
    description: "Define and align your product vision.",
    roles: ["Product Manager"],
  },
  {
    name: "PRD",
    route: "/prd2",
    icon: <FileText size={20} className="text-yellow-900" />,
    description: "Document product requirements.",
    roles: ["Product Manager"],
  },
  {
    name: "Competitive Analysis",
    route: "/companalysis2",
    icon: <Activity size={20} className="text-brown-700" />,
    description: "Analyze your market and competitors.",
    roles: ["Product Manager"],
  },
  {
    name: "Epics & User Stories",
    route: "/epics2",
    icon: <ClipboardList size={20} className="text-green-900" />,
    description: "Organize work into epics and user stories.",
    roles: ["Product Manager", "Developer"],
  },
  {
    name: "Market Research",
    route: "/marketresearch2",
    icon: <Aperture size={20} className="text-green-900" />,
    description: "Gather insights on market trends.",
    roles: ["Product Manager", "Tutor"],
  },
  {
    name: "Prioritization Techniques",
    route: "/prioritization2",
    icon: <List size={20} className="text-blue-900" />,
    description: "Determine what to focus on first.",
    roles: ["Product Manager"],
  },
  {
    name: "User Research",
    route: "/userresearch2",
    icon: <User size={20} className="text-blue-500" />,
    description: "Understand user needs and behaviors.",
    roles: ["Product Manager", "Tutor"],
  },
  {
    name: "User Acceptance Testing",
    route: "/uat",
    icon: <Clipboard size={20} className="text-blue-500" />,
    description: "Validate the product with end users.",
    roles: ["Product Manager", "Developer"],
  },
];

const PersonalizedDashboard = () => {
  // Load the selected role from localStorage, if available.
  const [selectedRole, setSelectedRole] = useState(
    localStorage.getItem("userRole") || ""
  );
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [removedFeatures, setRemovedFeatures] = useState(() => {
    const storedRemoved = localStorage.getItem("removedFeatures");
    return storedRemoved ? JSON.parse(storedRemoved) : [];
  });

  // Persist changes to localStorage.
  useEffect(() => {
    if (selectedRole) {
      localStorage.setItem("userRole", selectedRole);
    }
  }, [selectedRole]);

  useEffect(() => {
    localStorage.setItem("removedFeatures", JSON.stringify(removedFeatures));
  }, [removedFeatures]);

  // Handler to remove a feature from the dashboard.
  const handleRemoveFeature = (featureName) => {
    setRemovedFeatures((prev) => [...prev, featureName]);
  };

  // Handler to reset removed features.
  const handleResetFeatures = () => {
    setRemovedFeatures([]);
  };

  // If no role is selected, show the role selection screen.
  if (!selectedRole) {
    return (
      <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-700 px-4 py-10 w-full mt-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center w-full">
        Select Your Role
      </h2>
    
      {/* Buttons Section - Responsive Full Width on Mobile */}
      <div className="flex flex-wrap justify-center gap-4 w-full">
        <button
          onClick={() => setSelectedRole("Product Manager")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition w-full sm:w-auto"
        >
          Product Manager
        </button>
        
        <button
          onClick={() => setSelectedRole("Developer")}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition w-full sm:w-auto"
        >
          Developer
        </button>
    
        <button
          onClick={() => setSelectedRole("Tutor")}
          className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition w-full sm:w-auto"
        >
          Tutor
        </button>
      </div>
    </div>
    

    );
  }

  // Filter features based on the selected role and removed features.
  const filteredFeatures = (showAllFeatures
    ? appList
    : appList.filter((app) => app.roles.includes(selectedRole))
  ).filter((app) => !removedFeatures.includes(app.name));

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 dark:bg-gray-800 min-h-screen mt-10">
  {/* Role Header */}
  <h2 className="text-3xl font-bold text-yellow-800 dark:text-gray-100 text-center">
    {selectedRole} Dashboard
  </h2>

  {/* Buttons Section - Responsive */}
  <div className="flex flex-wrap justify-center gap-4 mt-4">
    <button
      onClick={() => setShowAllFeatures((prev) => !prev)}
      className="px-4 py-2 bg-yellow-800 text-white rounded hover:bg-yellow-700 transition w-auto"
    >
      {showAllFeatures ? "Show My Role Only" : "Show All"}
    </button>

    <button
      onClick={() => setSelectedRole("")}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition w-auto"
    >
      Edit Role
    </button>
  </div>


      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredFeatures.map((app, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-700 rounded shadow p-4 flex flex-col"
          >
            <div className="flex items-center mb-4">
              <div className="mr-4">{app.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  {app.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {app.description}
                </p>
              </div>
            </div>
            <div className="mt-auto flex justify-between">
              <Link
                to={app.route}
                className="px-4 py-2 bg-yellow-900 text-white rounded hover:bg-yellow-700 transition"
              >
                Go
              </Link>
              <button
                onClick={() => handleRemoveFeature(app.name)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      {removedFeatures.length > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={handleResetFeatures}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
          >
            Reset Dashboard Features
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalizedDashboard;
