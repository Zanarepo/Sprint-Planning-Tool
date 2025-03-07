import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SprintSimulator from "./component/SprintSimulator";
import HomePage from "./component/HomePage";
import RegisteredHomePage from "./component/Premiums/RegisteredHomePage";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import SprintEstimator from "./component/SprintEstimator";
import Simulate from "./component/Simulate";
import AllinOne from './component/AllinOne';
import Standup from './component/Standup';
import BurnDownChart from './component/BurnDownChart';
import ActiveUsersComponent from './component/Version2/ActiveUsersComponent';
import ProductMetricsComponent from './component/Version2/ProductMetricsComponent';
import ProductMetricsDashboard from './component/ProductMetricsDashboard';
import RevenueMetricsDashboard from './component/RevenueMetricsDashboard';
import ExpenseManager from './component/ExpenseManager';
import CohortStickinessDashboard from './component/CohortStickinessDashboard';
import AAARRMetricsDashboard from './component/AAARRMetricsDashboard';
import ProductLaunchChecklist from './component/ProductLaunchChecklist';
import BugTrackingTool from './component/BugTrackingTool';
import ProductGoals from './component/ProductGoals';
import ProductRoadmap from './component/ProductRoadmap';
import ProductStrategy from './component/ProductStrategy';
import PrioritizationTechniques from './component/PrioritizationTechniques';
import PRD from './component/PRD';
import Epics from './component/Epics';
import Prioritizations from './component/Prioritizations';
import MarketResearch from './component/MarketResearch';
import CompetitorAnalysis from './component/CompetitorAnalysis';
import UserResearchDashboard from './component/UserResearchDashboard';

// Registered Users components
import Registration from './component/Auth/Registration';
import Login from './component/Auth/Login';
import RegisteredNavbar from './component/RegisteredNavbar';
import LandingPageFeatures2 from './component/Premiums/LandingPageFeatures2'
import StickyBoard from './component/Premiums/StickyBoard'

import AdminDasboard from './component/SprintDashboard/AdminDasboard'


import AdminNav from './component/SprintDashboard/AdminNav';
import AdminRegistration from './component/Auth/AdminRegistration';

import UsersNotifications from './component/NotificationBoard/UsersNotifications';
import Estimator from './component/Estimator'
import Votings from './component/Premiums/Votings'
import FeatureComparisonMatrix from './component/FeatureComparisonMatrix'
import UATForms from './component/Premiums/UATForms'
import RegisteredDashboards from './component/RegisteredDashboards'
import Tools from './component/Tools'

















const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Primary navbar for all users */}

        
        <Navbar />
        <div className="flex-grow">
       
        
      


          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sprints" element={<SprintSimulator />} />
            <Route path="/estimator" element={<SprintEstimator />} />
            <Route path="/estimators" element={<Estimator />} />
            <Route path="/vote" element={<Votings />} />
            <Route path="/compare" element={<FeatureComparisonMatrix />} />
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
            <Route path="/kpi" element={<ProductGoals />} />
            <Route path="/roadmap" element={<ProductRoadmap />} />
            <Route path="/strategy" element={<ProductStrategy />} />
            <Route path="/prioritization" element={<PrioritizationTechniques />} />
            <Route path="/prd" element={<PRD />} />
            <Route path="/epics" element={<Epics />} />
            <Route path="/Prioritizations" element={<Prioritizations />} />
            <Route path="/marketresearch" element={<MarketResearch />} />
            <Route path="/companalysis" element={<CompetitorAnalysis />} />
            <Route path="/userresearch" element={<UserResearchDashboard />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register2" element={<Registration />} />
            <Route path="/homepage" element={<RegisteredHomePage />} />
            <Route path="/compare2" element={<FeatureComparisonMatrix />} />
            <Route path="/usernotify" element={<UsersNotifications />} /> 
            <Route path="/votings" element={<votings/>} />
            


            {/* premium routes duplicates */}
            <Route path="/Standup2" element={<Standup />} />
            <Route path="/estimator2" element={<SprintEstimator />} />
            <Route path="/userresearch2" element={<UserResearchDashboard />} />
            <Route path="/brainstorm2" element={<Simulate />} />
            <Route path="/allapps2" element={<AllinOne />} />
            <Route path="/sprints2" element={<SprintSimulator />} />
            <Route path="/sprints2" element={<SprintSimulator />} />
          

            <Route path="/burndown2" element={<BurnDownChart />} />
            <Route path="/activeusers2" element={<ActiveUsersComponent />} />
            <Route path="/prodmetrics2" element={<ProductMetricsComponent />} />
            <Route path="/metricsdb2" element={<ProductMetricsDashboard />} />
            <Route path="/revenuedb2" element={<RevenueMetricsDashboard />} />
            <Route path="/expense2" element={<ExpenseManager />} />
            <Route path="/cohort2" element={<CohortStickinessDashboard />} />
            <Route path="/activation2" element={<AAARRMetricsDashboard />} />

            <Route path="/checklist2" element={<ProductLaunchChecklist />} />
            <Route path="/bug2" element={<BugTrackingTool />} />
            <Route path="/kpi2" element={<ProductGoals />} />
            <Route path="/roadmap2" element={<ProductRoadmap />} />
            <Route path="/strategy2" element={<ProductStrategy />} />
            <Route path="/prioritization2" element={<PrioritizationTechniques />} />
            <Route path="/prd2" element={<PRD />} />
            <Route path="/epics2" element={<Epics />} />
            <Route path="/Prioritizations2" element={<Prioritizations />} />
            <Route path="/marketresearch2" element={<MarketResearch />} />
            <Route path="/companalysis2" element={<CompetitorAnalysis />} />
            <Route path="/dashboard" element={<RegisteredHomePage />} />
            <Route path="/sticky" element={<StickyBoard />} />
            <Route path="/admindashboard" element={<AdminDasboard/>} />
            <Route path="/adminregister" element={<AdminRegistration/>} />
            <Route path="/vote2" element={<Votings />} />
            <Route path="/compare2" element={<FeatureComparisonMatrix />} />
            
          {/* Dashboard*/}


          </Routes>
         
          <Routes>
          <Route element={<AdminNav />}>
          <Route path="/admindashboard" element={<AdminDasboard/>} />
          <Route path="/adminregister" element={<AdminRegistration/>} /> </Route>
          <Route path="/uat" element={<UATForms />} />
          <Route path="/regdashboard" element={<RegisteredDashboards />} />
          <Route element={<RegisteredDashboards />}>
            <Route path="/tools" element={<Tools />} />
            
            </Route>
          </Routes>



          {/* Dashbaord*/}

          <Routes>
            {/* Routes using the RegisteredNavbar layout */}
            <Route element={<RegisteredNavbar />}>
            <Route element={<RegisteredDashboards />}>
            <Route path="/tools" element={<Tools />} />
            </Route>
              <Route path="/dashboard" element={<RegisteredHomePage />} />
              <Route path="/estimator2" element={<SprintEstimator />} />

              <Route path="/sprints2" element={<SprintSimulator />} />

              <Route path="/userresearch2" element={<UserResearchDashboard />} />
              <Route path="/brainstorm2" element={<Simulate />} />
              <Route path="/allapps2" element={<AllinOne />} />
              <Route path="/Standup2" element={<Standup />} />
              <Route path="/vote2" element={<Votings />} />

              <Route path="/burndown2" element={<BurnDownChart />} />
              <Route path="/activeusers2" element={<ActiveUsersComponent />} />
              <Route path="/prodmetrics2" element={<ProductMetricsComponent />} />
              <Route path="/metricsdb2" element={<ProductMetricsDashboard />} />
              <Route path="/revenuedb2" element={<RevenueMetricsDashboard />} />
              <Route path="/expense2" element={<ExpenseManager />} />
              <Route path="/cohort2" element={<CohortStickinessDashboard />} />
              <Route path="/activation2" element={<AAARRMetricsDashboard />} />
              <Route path="/features" element={<LandingPageFeatures2 />} />
              <Route path="/regdashboard" element={<RegisteredDashboards />} />
              <Route path="/tools" element={<Tools />} />
              


              <Route path="/checklist2" element={<ProductLaunchChecklist />} />
              <Route path="/bug2" element={<BugTrackingTool />} />
              <Route path="/kpi2" element={<ProductGoals />} />
              <Route path="/roadmap2" element={<ProductRoadmap />} />
              <Route path="/strategy2" element={<ProductStrategy />} />
              <Route path="/prioritization2" element={<PrioritizationTechniques />} />
              <Route path="/prd2" element={<PRD />} />
              <Route path="/epics2" element={<Epics />} />
              <Route path="/Prioritizations2" element={<Prioritizations />} />
              <Route path="/marketresearch2" element={<MarketResearch />} />
              <Route path="/companalysis2" element={<CompetitorAnalysis />} />
              <Route path="/sticky" element={<StickyBoard />} />
              <Route path="/usernotify" element={<UsersNotifications />} />
              <Route path="/compare2" element={<FeatureComparisonMatrix />} />
              <Route path="/uat" element={<UATForms />} />
              

            </Route>
          </Routes>

























        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
