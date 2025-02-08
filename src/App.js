import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SprintSimulator from "./component/SprintSimulator";
import HomePage from "./component/HomePage";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import SprintEstimator from "./component/SprintEstimator";
import Simulate from "./component/Simulate";
import AllinOne from './component/AllinOne'
import Standup from './component/Standup'
import BurnDownChart from './component/BurnDownChart'
import ActiveUsersComponent from './component/ActiveUsersComponent'
import ProductMetricsComponent from './component/ProductMetricsComponent'
import ProductMetricsDashboard from './component/ProductMetricsDashboard'
import RevenueMetricsDashboard from './component/RevenueMetricsDashboard'
import ExpenseManager from './component/ExpenseManager'
import CohortStickinessDashboard from './component/CohortStickinessDashboard'
import AAARRMetricsDashboard from './component/AAARRMetricsDashboard'
import ProductLaunchChecklist from './component/ProductLaunchChecklist'
import BugTrackingTool from './component/BugTrackingTool'
import ProductGoals from './component/ProductGoals'















const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sprints" element={<SprintSimulator />} />
            <Route path="/estimator" element={<SprintEstimator />} />
            <Route path="/brainstorm" element={<Simulate />} />
            <Route path="/allapps" element={<AllinOne />} />
            <Route path="/Standup" element={<Standup />} />
            <Route path="/burndown" element={<BurnDownChart />} />
            <Route path="/activeusers" element={<ActiveUsersComponent />} />
            <Route path="/prodmetrics" element={<ProductMetricsComponent />} />
            <Route path="/metricsdb" element={<ProductMetricsDashboard />} />
            <Route path="/revenuedb" element={<RevenueMetricsDashboard />} />
            <Route path="/expense" element={<ExpenseManager />} />
            <Route path="/cohort" element={<CohortStickinessDashboard />} />
            <Route path="/activation" element={<AAARRMetricsDashboard />} />
            <Route path="/checklist" element={<ProductLaunchChecklist />} />
            <Route path="/bug" element={<BugTrackingTool />} />
            <Route path="/kpi" element={<ProductGoals/>} />
            
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;



