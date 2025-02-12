import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppWindow, User, Brain, BarChart, LineChart, ClipboardList, BarChart3 , FileText, Map, Target, ListChecks,  Bug, ClipboardCheck , PieChart, DollarSign,  Wallet, Rocket, Users, Activity, UserCheck , TrendingUp , Gauge } from "lucide-react";

const AppLauncher = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 right-10 z-50 mt-16 flex flex-col items-center">
      {/* Launcher button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-center text-blue-600"
      >
        <AppWindow size={28} />
        <span className="text-sm font-medium">Sprint Tools</span>
      </button>

      {/* Dropdown menu displayed as a grid with 4 columns */}
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-3 w-64 mt-8">
          <div className="grid grid-cols-4 gap-2">
            <Link
              to="/sprints"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Rocket size={20} className="text-blue-600" />
              <span className="text-xs">Simulator</span>
            </Link>

            <Link
              to="/estimator"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <LineChart size={20} className="text-green-600" />
              <span className="text-xs">Estimator</span>
            </Link>

            <Link
              to="/brainstorm"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Brain size={20} className="text-yellow-600" />
              <span className="text-xs">Brainstorm</span>
            </Link>

            <Link
              to="/standup"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Users size={20} className="text-purple-600" />
              <span className="text-xs">Standup</span>
            </Link>

            <Link
              to="/burndown"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Activity size={20} className="text-red-600" />
              <span className="text-xs">Burndown</span>
            </Link>

            <Link
              to="/activeusers"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <UserCheck size={20} className="text-red-900" />
              <span className="text-xs">Active</span>
            </Link>

            <Link
              to="/prodmetrics"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <TrendingUp  size={20} className="text-yellow-400" />
              <span className="text-xs">ProdMetrics</span>
            </Link>

            <Link
              to="/metricsdb"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Gauge  size={20} className="text-purple-900" />
              <span className="text-xs">Metrics</span>
            </Link>


            <Link
              to="/revenuedb"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <DollarSign  size={20} className="text-green-600" />
              <span className="text-xs">Revenue</span>
            </Link>

          
            <Link
              to="/expense2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Wallet  size={20} className="text-orange-900" />
              <span className="text-xs">ExpenseTrk</span>
            </Link>

            <Link
              to="/cohort2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <PieChart  size={20} className="text-pink-600" />
              <span className="text-xs">Cohort</span>
            </Link>



            <Link
              to="/activation2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <BarChart3  size={20} className="text-pink-600" />
              <span className="text-xs">AARRR</span>
            </Link>

            <Link
              to="/checklist2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <ClipboardCheck  size={20} className="text-purple-700" />
              <span className="text-xs">LaunchList</span>
            </Link>

            <Link
              to="/bug2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Bug  size={20} className="text-red-700" />
              <span className="text-xs">BugTrack.</span>
            </Link>



            <Link
              to="/kpi2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Target  size={20} className="text-indigo-700" />
              <span className="text-xs">KPIs</span>
            </Link>
            

            
            <Link
              to="/roadmap2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Map  size={20} className="text-blue-700" />
              <span className="text-xs">Roadmap</span>
            </Link>

            
            <Link
              to="/strategy2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Map  size={20} className="text-blue-700" />
              <span className="text-xs">Strategy</span>
            </Link>

                      
            <Link
              to="/prioritization2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <ListChecks  size={20} className="text-blue-900" />
              <span className="text-xs">priority</span>
            </Link>


            <Link
              to="/prd2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <FileText  size={20} className="text-yellow-900" />
              <span className="text-xs">PRD</span>
            </Link>

            <Link
              to="/companalysis2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <BarChart  size={20} className="text-brown-700" />
              <span className="text-xs">CompAnalysis</span>
            </Link>

            <Link
              to="/epics2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <ClipboardList  size={20} className="text-green-900" />
              <span className="text-xs">Epics</span>
            </Link>

            
            <Link
              to="/marketresearch2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <BarChart  size={20} className="text-green-900" />
              <span className="text-xs">MrktResrch</span>
            </Link>
            
            <Link
              to="/userresearch2"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <User  size={20} className="text-blue-500" />
              <span className="text-xs">UserResrch</span>
            </Link>


            




          </div>
        </div>
      )}
    </div>
  );
};

export default AppLauncher;