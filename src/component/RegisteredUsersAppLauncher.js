import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppWindow, User, Brain, BarChart, LineChart , Compass  , BarChart2, ClipboardList, BarChart3 , FileText, Map, Target, ListChecks,  Bug, ClipboardCheck , PieChart, DollarSign,  Wallet, Rocket, Users, Activity, UserCheck , TrendingUp , Gauge } from "lucide-react";

const AppLauncher = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 right-10 z-50 mt-16 flex flex-col items-center">
  {/* Launcher button - Always fixed */}
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="flex flex-col items-center text-yellow-800"
  >
    <AppWindow size={28} />
    <span className="text-sm font-medium"></span>
  </button>

      {/* Dropdown menu displayed as a grid with 4 columns */}
      {isOpen && (
        <div className="mt-2 w-[300px] h-[400px] overflow-y-auto bg-white shadow-lg rounded-lg p-4">
    
          <div className="grid grid-cols-4 gap-2">
            <Link
              to="/sprints2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Rocket size={20} className="text-blue-600" />
              <span className="text-xs text-center">Simulator</span>
            </Link>

            <Link
              to="/estimator2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <LineChart size={20} className="text-green-600" />
              <span className="text-xs text-center"> Feature Estimator</span>
            </Link>

            <Link
              to="/brainstorm2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Brain size={20} className="text-yellow-600" />
              <span className="text-xs text-center">Brainstorm</span>
            </Link>

            <Link
              to="/standup2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Users size={20} className="text-purple-600" />
              <span className="text-xs text-center">Standup</span>
            </Link>

            <Link
              to="/burndown2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Activity size={20} className="text-red-600" />
              <span className="text-xs text-center">Burndown Chart</span>
            </Link>

            <Link
              to="/vote2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <BarChart2  size={20} className="text-green-900" />
              <span className="text-xs text-center">Poll</span>
            </Link>
            



            <Link
              to="/activeusers2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <UserCheck size={20} className="text-red-900" />
              <span className="text-xs text-center">Active</span>
            </Link>

            <Link
              to="/prodmetrics2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <TrendingUp  size={20} className="text-yellow-400" />
              <span className="text-xs text-center">Product Metrics</span>
            </Link>

            <Link
              to="/metricsdb2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Gauge  size={20} className="text-purple-900" />
              <span className="text-xs text-center">Users Metrics</span>
            </Link>


            <Link
              to="/revenuedb2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <DollarSign  size={20} className="text-green-600" />
              <span className="text-xs text-center">Revenue</span>
            </Link>

          
            <Link
              to="/expense2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Wallet  size={20} className="text-orange-900" />
              <span className="text-xs text-center">Expense Tracker</span>
            </Link>

            <Link
              to="/cohort2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <PieChart  size={20} className="text-pink-600" />
              <span className="text-xs text-center">Cohort Analysis</span>
            </Link>



            <Link
              to="/activation2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <BarChart3  size={20} className="text-pink-600" />
              <span className="text-xs text-center">AARRR Metrics</span>
            </Link>

            <Link
              to="/checklist2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <ClipboardCheck  size={20} className="text-purple-700" />
              <span className="text-xs text-center">Launch List</span>
            </Link>

            <Link
              to="/bug2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Bug  size={20} className="text-red-700" />
              <span className="text-xs text-center">Bug Track.</span>
            </Link>



            <Link
              to="/kpi2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Target  size={20} className="text-indigo-700" />
              <span className="text-xs text-center">KPIs</span>
            </Link>
            
          

            
            <Link
              to="/roadmap2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Map  size={20} className="text-blue-700" />
              <span className="text-xs text-center">Product Roadmap</span>
            </Link>

            <Link
              to="/compare2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <User  size={20} className="text-blue-500" />
              <span className="text-xs text-center">Feature Matrix</span>
            </Link>
            
            <Link
              to="/strategy2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Compass     size={20} className="text-blue-700" />
              <span className="text-xs text-center"> Product Strategy</span>
            </Link>

           

            <Link
              to="/prd2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <FileText  size={20} className="text-yellow-900" />
              <span className="text-xs text-center">PRD</span>
            </Link>

            <Link
              to="/companalysis2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <BarChart  size={20} className="text-brown-700" />
              <span className="text-xs text-center">Competitive Analysis</span>
            </Link>

            <Link
              to="/epics2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <ClipboardList  size={20} className="text-green-900" />
              <span className="text-xs text-center">Epics</span>
            </Link>

            
            <Link
              to="/marketresearch2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <BarChart  size={20} className="text-green-900" />
              <span className="text-xs text-center">Market Research</span>
            </Link>
            

                       
            <Link
              to="/prioritization2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <ListChecks  size={20} className="text-blue-900" />
              <span className="text-xs text-center">priority</span>
            </Link>

            <Link
              to="/userresearch2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <User  size={20} className="text-blue-500" />
              <span className="text-xs text-center">User Research</span>
            </Link>


            




          </div>
        </div>
      )}
    </div>
  );
};

export default AppLauncher;