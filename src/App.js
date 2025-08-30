import React, { useEffect } from 'react';
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
import GTM from "./component/Premiums/GTM";

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
import ForgotPassword from './component/ForgotPassword'

import ResetPassword from './component/ResetPassword'
//import Syllabus from './component/Syllabus'
import Sprintifyhome from './component/Sprintifyhome'
import SprintNavbar from './component/SprintNavbar'
import Certificate from "./component/Certificate";
import CertificateViews from "./component/CertificateViews";



//Growth Product Manager

import GrowthDashboard from './component/GrowthPM/Growth1/GrowthDashboard'
import Alldashboard from './component/GrowthPM/Alldashboard'
import GrowthHome from './component/GrowthPM/Growth2/GrowthHome';
import Viralitydashboard from './component/GrowthPM/Growth3/Viralitydashboard'
import AutomationDashbaord from './component/GrowthPM/Growth5/AutomationDashbaord';
import CollaboDb from './component/GrowthPM/Growth4/CollaboDb';
import Monitizationdashboard from './component/GrowthPM/Growth6/Monitizationdashboard';
import LocalizationDashboard from './component/GrowthPM/Growth7/LocalizationDashboard';
import MarketingDashboard from './component/GrowthPM/Growth9/MarketingDashboard';
import Marketdashboard from './component/GrowthPM/Growth8/Marketdashboard';
import Simulation from './component/GrowthPM/Growth10/Simulation';
import SeperationofUsers from './component/GrowthPM/Growth11/SeperationofUsers';


//Intermediate
import IntermediateDashboard from './component/IntroIntermPM/Intermediate/IntermediateDashboard';
import IntroDashboard from './component/IntroIntermPM/Intro/IntroDashboard';
import SimulationModule from './component/IntroIntermPM/Intro/SimulationModule';



//TPM
import TPMHome from './component/Technical/TPMHome';
import TPM from './component/Technical/TPM';
import TPMdashboard2 from './component/Technical/LessonTwo/TPMdashboard2';
import TPMDashboard3 from './component/Technical/Version Control/TPMDashboard3';
import CoursesDashboard from "./component/CoursesDashboard";
import MicroServices from "./component/Technical/MicroServices/MicroServices";
import APIGateway2 from './component/Technical/MicroServices/APIGateway2'
import AuthConcepts from './component/Technical/MicroServices/AuthConcepts'
import APIContracts from './component/Technical/MicroServices/APIContracts'
import ProcessMappings from './component/Technical/MicroServices/ProcessMappings'
import { GrowthBookProvider } from "@growthbook/growthbook-react";
import {growthbook} from "./Growthbook";
import MyComponent from "./MyComponent"; 


















const App = () => {
 useEffect(() => {
    growthbook.init({ streaming: true });
  }, []);



  return (
    <Router>
       <GrowthBookProvider growthbook={growthbook}>
      <MyComponent />
 
  
      <div className="flex flex-col min-h-screen">
        {/* Primary navbar for all users */}

        
        <Navbar />
        <div className="flex-grow">
       
        
      


          <Routes>
            <Route path="/sprintify" element={<HomePage/>} />
            
            
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
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
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
       
        <Route path="/growth" element={<GrowthDashboard />} />
        <Route path="/growthdashboard" element={<GrowthHome/>} />
        <Route path="/alldashboard" element={<Alldashboard />} />
        <Route path="/viraldashboard" element={<Viralitydashboard/>} />
        <Route path="/automationdashboard" element={<AutomationDashbaord/>} />  
        <Route path="/moneydashboard" element={<Monitizationdashboard/>} />  
        <Route path="/localizationdashboard" element={<LocalizationDashboard/>} />
        <Route path="/marketdashboard" element={<Marketdashboard/>} />
  
        <Route path="/marketingdashboard" element={<MarketingDashboard/>} />
        <Route path="/Collabodashboard" element={<CollaboDb/>} /> 
        <Route path="/sim" element={<Simulation/>} />
       <Route path="/seperate" element={<SeperationofUsers/>} />
        <Route path="/pmdashboard" element={<CoursesDashboard/>} />  --- New line added for
        
 <Route path="/apicontracts" element={<APIContracts/>} />
 <Route path="/process" element={<ProcessMappings/>} />

       


          { /* Intermediate*/}

 <Route path="/intermediate" element={< IntermediateDashboard/>} />
  <Route path="/introduction" element={<IntroDashboard />} />
  <Route path="/introsimulations" element={<SimulationModule />} />

{ /*TPM*/}
<Route path="/tpmdashboard" element={<TPMHome />} />
  <Route path="/technical" element={<TPM />} />
   <Route path="/tpm2" element={<TPMdashboard2 />} />
   <Route path="/tpm3" element={<TPMDashboard3 />} />
    <Route path="/microservices" element={<MicroServices />} />
      <Route path="/apigate" element={<APIGateway2 />} />
      <Route path="/auths" element={<AuthConcepts/>} />
         

   



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
            <Route path="/gtm" element={<GTM />} />
             <Route path="/" element={<Sprintifyhome/>} />
          <Route path="/certificate" element={<Certificate/>} />
          <Route path="/certificate/:id" element={<CertificateViews />} />
          </Routes>
            <Routes>
         
            
            
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
              <Route path="/gtm" element={<GTM />} />
            
                <Route path="/tpmdashboard" element={<TPMHome />} />
        <Route path="/growthdashboard" element={<GrowthHome/>} />
        <Route path="/alldashboard" element={<Alldashboard />} />
        <Route path="/viraldashboard" element={<Viralitydashboard/>} />
        <Route path="/automationdashboard" element={<AutomationDashbaord/>} />  
        <Route path="/moneydashboard" element={<Monitizationdashboard/>} />  
        <Route path="/localizationdashboard" element={<LocalizationDashboard/>} />
        <Route path="/marketdashboard" element={<Marketdashboard/>} />
  
        <Route path="/marketingdashboard" element={<MarketingDashboard/>} />
        <Route path="/Collabodashboard" element={<CollaboDb/>} /> 
        <Route path="/sim" element={<Simulation/>} />
       <Route path="/seperate" element={<SeperationofUsers/>} />
       




{ /* Intermediate & Intro*/}

              { /*TPM*/}
     <Route path="/introsimulations" element={<SimulationModule />} />        
 <Route path="/intermediate" element={< IntermediateDashboard/>} />
  <Route path="/introduction" element={<IntroDashboard />} />
 <Route path="/technical" element={<TPM />} /> 
  <Route path="/auths" element={<AuthConcepts/>} />
 <Route path="/growth" element={<GrowthDashboard />} /> 
        <Route path="/apicontracts" element={<APIContracts/>} />
        <Route path="/process" element={<ProcessMappings/>} />

 <Route path="/pmdashboard" element={<CoursesDashboard/>} />  --- New line added for

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
              <Route path="/" element={<Sprintifyhome/>} />


              {/*GrwothPM*/}
             



            </Route>
          </Routes>


        <Routes>
          <Route element={<SprintNavbar/>}>
          <Route path="/" element={<Sprintifyhome/>} />
         
            </Route>
          </Routes>























        </div>
        <Footer />
      </div>
        </GrowthBookProvider>
    </Router>
  );
};

export default App;
