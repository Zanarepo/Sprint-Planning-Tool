import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppWindow, Brain, LineChart, BarChart3 ,  Bug, ClipboardCheck , PieChart, DollarSign,  Wallet, Rocket, Users, Activity, UserCheck , TrendingUp , Gauge } from "lucide-react";

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
          <div className="grid grid-cols-3 gap-2">
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
              <span className="text-xs">ActiveUsers</span>
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
              <span className="text-xs">MetricsBoard</span>
            </Link>


            <Link
              to="/revenuedb"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <DollarSign  size={20} className="text-green-600" />
              <span className="text-xs">RevenueBoard</span>
            </Link>

          
            <Link
              to="/expense"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Wallet  size={20} className="text-orange-900" />
              <span className="text-xs">ExpenseTracker</span>
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
              <span className="text-xs">LaunchChecklist</span>
            </Link>

            <Link
              to="/bug"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Bug  size={20} className="text-red-700" />
              <span className="text-xs">BugTracking</span>
            </Link>



            <Link
              to="/kpi"
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800"
            >
              <Bug  size={20} className="text-red-700" />
              <span className="text-xs">KPIs</span>
            </Link>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default AppLauncher;