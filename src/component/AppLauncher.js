import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppWindow, User, Brain, BarChart, LineChart , BarChart2, FileText, Map, Target, ListChecks,  Rocket, Users,  } from "lucide-react";
//ClipboardList,BarChart3  Bug, ClipboardCheck , PieChart, DollarSign,  Wallet, Activity, UserCheck , TrendingUp , Gauge
const AppLauncher = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-50 mt-14 flex flex-col items-center mt-20">
      {/* Launcher button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-center text-yellow-800"
      >
        <AppWindow size={28} />
        <span className="text-sm font-medium"></span>
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
            <span className="text-xs text-center">Sprint Simulator</span>
          </Link>

            <Link
              to="/estimators"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <LineChart size={20} className="text-green-600" />
              <span className="text-xs text-center">Feature Estimator</span>
            </Link>

            <Link
              to="/brainstorm"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Brain size={20} className="text-yellow-600" />
              <span className="text-xs text-center">Brainstorm Hub</span>
            </Link>

            <Link
              to="/standup"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Users size={20} className="text-purple-600" />
              <span className="text-xs text-center">Daily Standup</span>
            </Link>


            <Link
              to="/kpi"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Target  size={20} className="text-indigo-700" />
              <span className="text-xs text-center">KPIs</span>
            </Link>
            

            
            <Link
              to="/roadmap"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Map  size={20} className="text-blue-700" />
              <span className="text-xs text-center">Product Roadmap</span>
            </Link>

             {/* Dropdown menu displayed as a grid with 4 columns */}
            <Link
              to="/strategy"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Map  size={20} className="text-blue-700" />
              <span className="text-xs text-center">Product Strategy</span>
            </Link>
 {/* Dropdown menu displayed as a grid with 4 columns */}
                      
            <Link
              to="/prioritization"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <ListChecks  size={20} className="text-blue-900" />
              <span className="text-xs text-center">priority</span>
            </Link>

 {/* Dropdown menu displayed as a grid with 4 columns */}

 <Link
              to="/userresearch"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <User  size={20} className="text-blue-500" />
              <span className="text-xs text-center">User Research</span>
            </Link>

            
            <Link
              to="/prd"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <FileText  size={20} className="text-yellow-900" />
              <span className="text-xs text-center">PRD</span>
            </Link>





            <Link
              to="/marketresearch"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <BarChart  size={20} className="text-green-900" />
              <span className="text-xs text-center">Market Research</span>
            </Link>
            
         
            <Link
              to="/vote"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <BarChart2  size={20} className="text-green-900" />
              <span className="text-xs text-center">Poll</span>
            </Link>
            







 {/* Dropdown menu displayed as a grid with 4 columns 
            <Link
              to="/companalysis"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <BarChart  size={20} className="text-brown-700" />
              <span className="text-xs">CompAnalysis</span>
            </Link>

            <Link
              to="/epics"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <ClipboardList  size={20} className="text-green-900" />
              <span className="text-xs">Epics</span>
            </Link>*/}

             {/* Dropdown menu displayed as a grid with 4 columns */}

             

 {/* Dropdown menu displayed as a grid with 4 columns 
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
              to="/expense"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Wallet  size={20} className="text-orange-900" />
              <span className="text-xs">ExpenseTrk</span>
            </Link>

            <Link
              to="/cohort"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <PieChart  size={20} className="text-pink-600" />
              <span className="text-xs">Cohort</span>
            </Link>



            <Link
              to="/activation"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <BarChart3  size={20} className="text-pink-600" />
              <span className="text-xs">AARRR</span>
            </Link>

            <Link
              to="/checklist"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <ClipboardCheck  size={20} className="text-purple-700" />
              <span className="text-xs">LaunchList</span>
            </Link>

            <Link
              to="/bug"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Bug  size={20} className="text-red-700" />
              <span className="text-xs">BugTrack.</span>
            </Link>

*/}


            




          </div>
        </div>
      )}
    </div>
  );
};

export default AppLauncher;