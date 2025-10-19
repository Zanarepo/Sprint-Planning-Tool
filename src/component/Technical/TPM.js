import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import DatabaseSection from './DatabaseSection';
import DbJoins from './DbJoins';
import FrontendSection from './FrontendSection';
import BackendSection from './BackendSection';
import APISection from './APISection';
import QASection from './QASection';
import Porters from './Porters';
import SystemArchitectureSection from './SystemArchitectureSection';
import BrainstormingTechniques from './BrainstormingTechniques';
import Dashboard5 from './Dashboard5';
import TradeOffs from './LessonTwo/Tradeoffs';
import AgileMethodologyComponent from './LessonTwo/AgileMethodologyComponent';
import CostManagement from './LessonTwo/CostManagement';
import DatabaseComparison from './LessonTwo/DatabaseComparison';
import CustomerJourneyMapping from './LessonTwo/CustomerJourneyMapping';
import FeatureFeasibilityComponent from './LessonTwo/FeatureFeasibilityComponent';
import MonitoringMetrics from './LessonTwo/MonitoringMetrics';
import RiskManagementComponent from './LessonTwo/RiskManagementComponent';
import UserFlowsDesign from './LessonTwo/UserFlowsAndDesign';
import DatabaseNormalization from './LessonTwo/DatabaseNormalization';
import DatabaseIndexing from './LessonTwo/DatabaseIndexing';
import DatabaseOptimization from './LessonTwo/DatabaseOptimization';
import GithubSection from './Version Control/Github';
import MicroservicesSection from './Version Control/Microservices';
import MicroServices from './MicroServices/MicroServices'
import SecuritySection from './Version Control/Security';
import LoadBalancingComponent from './Version Control/LoadBalancingComponent';
import DataPipeline from './Version Control/DataPipeline';
import BEArchitecture from './Version Control/BEArchitecture';
import APIGateway2 from './MicroServices/APIGateway2'
import  AuthConcepts from './MicroServices/AuthConcepts'
import DataProtection from './MicroServices/DataProtection'
import Wikis from './MicroServices/Wikis'
import TechnicalDebts from './MicroServices/TechnicalDebts'
import TradeoffVersion2 from './MicroServices/TradeoffVersion2';
import PartneringWithTeams from './MicroServices/PartneringWithTeams'
import MVC from './MicroServices/MVC'
import  ProcessMappings from './MicroServices/ProcessMappings'
import Systemdesigns from './MicroServices/Systemdesigns'
import SoftwareTesting from './MicroServices/SoftwareTesting'
import CICD from './MicroServices/CICD';

import StrategyDashboard from './StrategyDashboard';
import TeamTask from './TeamTask';



const TechnicalDashboard = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [openOverview, setOpenOverview] = useState(true);
  const [openSections, setOpenSections] = useState({
    coreTechnical: false,
    productManagement: false,
    systemScalability: false,
  });
  

  const cardData = [
    // Section 1: Core Technical Concepts
    {
      section: 'Core Technical Concepts',
      icon: '💻',
      iconColor: 'text-blue-600',
      title: 'Frontend (FE)',
      description: 'The frontend is what users see and interact with. Product managers need to understand UI/UX basics, user flows, and how frontend development impacts user experience.',
      outcome: 'Learn UI/UX principles and frontend development basics.',
      sectionName: 'Frontend',
    },
   
    {
      section: 'Core Technical Concepts',
      icon: '⚙️',
      iconColor: 'text-green-600',
      title: 'Backend (BE)',
      description: 'The backend handles business logic, data processing, and server-side operations. Understanding backend concepts helps product managers define product features realistically.',
      outcome: 'Understand backend logic and server-side operations.',
      sectionName: 'Backend',
    },
    {
      section: 'Core Technical Concepts',
      icon: '🔗',
      iconColor: 'text-purple-600',
      title: 'APIs',
      description: 'APIs enable communication between systems. Product managers should understand API endpoints, data formats, and how APIs influence integrations and third-party services.',
      outcome: 'Master API concepts and integration strategies.',
      sectionName: 'APIs',
    },
    {
      section: 'Core Technical Concepts',
      icon: '🗄️',
      iconColor: 'text-red-600',
      title: 'Database',
      description: 'Databases store and retrieve data. Knowing key database concepts helps product managers design data-driven features and work better with development teams.',
      outcome: 'Learn database structures and data-driven feature design.',
      sectionName: 'Database',
    },

    {
      section: 'Core Technical Concepts',
      icon: '🗄️',
      iconColor: 'text-red-600',
      title: 'SQL Joins',
      description: 'Understanding SQL Joins is crucial for product managers to effectively manage and analyze relational data, enabling informed decision-making and feature development.',
      outcome: 'Master SQL Joins for effective data management and analysis.',
      sectionName: 'DbJoins',
    },






    {
      section: 'Core Technical Concepts',
      icon: '📝',
      iconColor: 'text-red-600',
      title: 'Business Requirements Document (BRD)',
      description: 'Product strategy is the roadmap for product development. It includes market analysis, competitive landscape, and aligning product goals with business objectives.',
      outcome: 'Develop skills in crafting effective BRDs.',
      sectionName: 'Dashboard5',
    },
    {
      section: 'Core Technical Concepts',
      icon: '📊',
      iconColor: 'text-yellow-600',
      title: 'Porters 5 Forces Analysis for PMs',
      description: 'Porter’s Five Forces helps product managers analyze market competition, buyer power, supplier power, the threat of substitutes, and barriers to entry.',
      outcome: 'Apply Porter’s Five Forces for strategic PM decisions.',
      sectionName: 'Porters',
    },
 {
      section: 'TPM Concepts',
      icon: '📊',
      iconColor: 'text-yellow-600',
      title: 'Microservice & Monolith',
      description: ' Understand Microservices and Monolithic architectures for product decisions.',
      outcome: ' Understand Microservices and Monolithic architectures for product decisions.',
      sectionName: 'sysarchitect',
    },


    {
      section: 'TPM Concepts',
      icon: '🧪',
      iconColor: 'text-red-600',
      title: 'Software Testing',
      description: ' Explore various software testing methodologies, including unit testing, integration testing, system testing, and user acceptance testing (UAT). Understand how to link test cases to Product Requirement Documents (PRDs) to ensure comprehensive coverage of requirements.',
      outcome: 'Master software testing techniques linked to PRDs.',
      sectionName: 'swt',
    },
    {
      section: 'TPM Concepts',
      icon: '🔄',
      iconColor: 'text-blue-600',
      title: 'CI/CD',
      description: ' Learn Continuous Integration and Continuous Deployment (CI/CD) practices to streamline development and release processes.',
      outcome: 'Implement CI/CD for efficient product delivery.',
      sectionName: 'cicd',
    },
    

   {
      section: 'TPM Concepts',
      icon: '📐',
      iconColor: 'text-yellow-600',
      title: 'System Designs & Architceture',
      description: ' Learn System Designs for effective Product Deleivery',
      outcome: '',
      sectionName: 'systemdesigns',
    },


 {
      section: 'TPM Concepts',
      icon: '📊',
      iconColor: 'text-yellow-600',
      title: 'API Gateway',
      description: ' An API Gateway is a server that acts as an API front-end, receiving API requests, enforcing throttling and security policies, passing requests to the back-end service, and then passing the response back to the requester.',
      outcome: '',
      sectionName: 'apigateway2',
    },
   
     {
      section: 'TPM Concepts',
      icon: '🗺️',
      iconColor: 'text-purple-600',
      title: 'Process Mappings',
      description: 'Process mapping is a visual representation of the workflow within a system. It helps identify inefficiencies, redundancies, and areas for improvement.',
      outcome: 'Master process mapping for workflow optimization.',
      sectionName: 'processmappings',
    },

 {
      section: 'TPM Concepts',
      icon: '📊',
      iconColor: 'text-yellow-600',
      title: 'Security Concepts Software Devt',
      description: ' Learn Security Concepts for effective Product Deleivery',
     sectionName: 'securityconcepts',
    },


     {
      section: 'TPM Concepts',
      icon: '📊',
      iconColor: 'text-yellow-600',
      title: 'Data Protection',
      description: ' Learn Data Protection for effective Product Deleivery',
      outcome: '',
      sectionName: 'dataprotection',
    },



    {
      section: 'TPM Concepts',
      icon: '📄',
      iconColor: 'text-gray-600',
      title: 'Strategy Documentation',
      description: ' Learn how to create and maintain effective strategy documentation to enhance team collaboration and knowledge sharing.',
      outcome: '',
      sectionName: 'strategydashboard',
    },

    

    
    {
      section: 'Core Technical Concepts',
      icon: '🧠',
      iconColor: 'text-yellow-600',
      title: 'Brainstorming Techniques',
      description: 'Explore effective brainstorming techniques to generate innovative product ideas.',
      outcome: 'Master brainstorming techniques for innovative product ideas.',
      sectionName: 'Brainstorming',
    },




    // Section 2: Product Management Practices
    {
      section: 'Core Technical Concepts',
      icon: '⚖️',
      iconColor: 'text-blue-600',
      title: 'Trade-offs',
      description: 'Master trade-off analysis for balanced product decisions.',
      outcome: 'Master trade-off analysis for balanced product decisions.',
      sectionName: 'Tradeoffs',
    },
    {
      section: 'Product Management Practices',
      icon: '📊',
      iconColor: 'text-blue-600',
      title: 'Agile Methodology',
      description: 'Understand how Agile methodologies help manage development sprints and product delivery.',
      outcome: 'Learn Agile principles for effective product management.',
      sectionName: 'Agile',
    },
    {
      section: 'Product Management Practices',
      icon: '💰',
      iconColor: 'text-green-600',
      title: 'Cost Management',
      description: 'Learn how to manage the product budget, track costs, and allocate resources effectively.',
      outcome: 'Develop skills in budgeting and resource allocation.',
      sectionName: 'Cost',
    },
    {
      section: 'Product Management Practices',
      icon: '🗄️',
      iconColor: 'text-red-600',
      title: 'Database Comparison',
      description: 'Know the difference between SQL and NoSQL databases and their application in product development.',
      outcome: 'Understand SQL vs. NoSQL for product decisions.',
      sectionName: 'DatabaseComparison',
    },

    
    {
      section: 'Product Management Practices',
      icon: '🗺️',
      iconColor: 'text-purple-600',
      title: 'System Architecture',
      description: 'Learn how to design scalable and robust system architectures.',
      outcome: 'Design scalable system architectures.',
      sectionName: 'Journey',
    },
    {
      section: 'Product Management Practices',
      icon: '⚠️',
      iconColor: 'text-yellow-600',
      title: 'Feature Feasibility',
      description: 'Evaluate and validate feature feasibility, technical constraints, and customer impact.',
      outcome: 'Assess feature feasibility effectively.',
      sectionName: 'Feature',
    },
    {
      section: 'Product Management Practices',
      icon: '💡',
      iconColor: 'text-orange-600',
      title: 'Monitoring Metrics',
      description: 'Learn about monitoring key product metrics to ensure performance and scalability.',
      outcome: 'Track metrics for product performance.',
      sectionName: 'Monitoring',
    },
    {
      section: 'Product Management Practices',
      icon: '🤝',
      iconColor: 'text-teal-600',
      title: 'Risk Management',
      description: 'Identify and mitigate risks to ensure smooth product delivery and operations.',
      outcome: 'Mitigate risks in product development.',
      sectionName: 'Risk',
    },
    {
      section: 'Product Management Practices',
      icon: '🛤️',
      iconColor: 'text-indigo-600',
      title: 'User Flows & Design',
      description: 'Understand how to design user flows and map the customer journey effectively.',
      outcome: 'Create effective user flows and journeys.',
      sectionName: 'UserFlows',
    },
    {
      section: 'Product Management Practices',
      icon: '🔄',
      iconColor: 'text-blue-600',
      title: 'Database Normalization',
      description: 'Understanding Database Normalization helps curate efficient products to reduce redundancy and improve data integrity.',
      outcome: 'Learn normalization for efficient databases.',
      sectionName: 'DatabaseNormalization',
    },


    {
      section: 'TPM Concepts',
      icon: '🔄',
      iconColor: 'text-blue-600',
      title: 'Technical Debts',
      description: ' Learn Technical Debts for effective Product Deleivery',
      outcome: 'Learn Techincal Debt for effective Product Deleivery',
      sectionName: 'TechnicalDebts',
    },
  {
    section: 'TPM Concepts',
    icon: '⚙️',
    iconColor: 'text-green-600',
    title: 'MVC',
    description: 'Understanding MVC helps PMs bridge business needs and technical execution. It shows how user actions map to backend processes and data, clarifying dependencies and risks.',
    outcome: 'Understand MVC for effective product management.',
    sectionName: 'mvc',
  },

 {
      section: 'TPM Concepts',
      icon: '🖥️',
      iconColor: 'text-gray-600',
      title: 'Prouct Dev Wikis',
      description: ' Learn how to create and maintain effective product development wikis to enhance team collaboration and knowledge sharing.',
      outcome: '',
      sectionName: 'wikis',
    },

      {
      section: 'TPM Concepts',
      icon: '⚡',
      iconColor: 'text-blue-600',
      title: 'Trade-offs ',
      description: 'Master trade-off analysis for balanced product decisions.',
      outcome: '',
      sectionName: 'tradeoffs2',
    },

 {
      section: 'TPM Concepts',
      icon: '⚡',
      iconColor: 'text-blue-600',
      title: 'Cross-functional Teams ',
      description: ' Learn best practices for partnering with cross-functional teams including engineering, design, marketing, and sales to drive product success.',
      outcome: '',
      sectionName: 'partner',
    },

    
    {
      section: 'Product Management Practices',
      icon: '🔍',
      iconColor: 'text-blue-600',
      title: 'Database Indexing',
      description: 'Learn how database indexing enhances query performance by enabling faster data retrieval while balancing storage overhead.',
      outcome: 'Optimize queries with indexing.',
      sectionName: 'DatabaseIndexing',
    },



    
  

      
    // Section 3: System Scalability & Collaboration
    {
      section: 'System Scalability & Collaboration',
      icon: '🐙',
      iconColor: 'text-blue-600',
      title: 'Github',
      description: 'Understanding version control with Github is essential for collaboration.',
      outcome: 'Learn Github for effective version control.',
      sectionName: 'github',
    },
    {
      section: 'System Scalability & Collaboration',
      icon: '⚙️',
      iconColor: 'text-green-600',
      title: 'Microservices',
      description: 'Microservices architecture is key for scaling applications effectively.',
      outcome: 'Understand microservices for scalable systems.',
      sectionName: 'microservices',
    },
    {
      section: 'System Scalability & Collaboration',
      icon: '🛡️',
      iconColor: 'text-yellow-600',
      title: 'Security',
      description: 'Security is crucial for protecting data and ensuring system integrity.',
      outcome: 'Master security practices for product safety.',
      sectionName: 'security',
    },
    {
      section: 'System Scalability & Collaboration',
      icon: '🌐',
      iconColor: 'text-purple-600',
      title: 'Load Balancing',
      description: 'Load balancing optimizes the distribution of traffic to ensure smooth operation.',
      outcome: 'Optimize traffic with load balancing.',
      sectionName: 'loadbalancing',
    },
    {
      section: 'System Scalability & Collaboration',
      icon: '📊',
      iconColor: 'text-red-600',
      title: 'Data Pipeline',
      description: 'Data pipelines enable the smooth flow and transformation of data.',
      outcome: 'Build efficient data pipelines.',
      sectionName: 'datapipeline',
    },
    {
      section: 'System Scalability & Collaboration',
      icon: '🖥️',
      iconColor: 'text-gray-600',
      title: 'Backend Architecture',
      description: 'Backend architecture is the foundation for robust, scalable systems.',
      outcome: 'Design robust backend architectures.',
      sectionName: 'bearchitecture',
    },

// section for Team & Task Management
    {
      section: 'Team & Task Management',
      icon: '👥', 
      iconColor: 'text-green-600',
      title: 'Team & Task Management',
      description: 'Explore effective team and task management strategies to enhance productivity and collaboration within product teams.',
      outcome: 'Enhance team productivity and collaboration.',
      sectionName: 'TeamTask',
    },

  ];

  useEffect(() => {
    toast.info('Explore key PM concepts!', {
      toastId: 'welcome-dashboard',
      theme: 'light',
      style: { background: '#fef3c7', color: '#1f2937' },
    });
  }, []);

  const toggleOverview = () => {
    setOpenOverview((prev) => !prev);
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSectionToggle = (sectionName) => {
    setActiveSection(sectionName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToOverview = () => {
    setActiveSection(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

 
  const sections = [

    {
      id: 'CoreConcepts',
      title: 'TPM Concepts',
      description: 'Understand scalable system architectures and collaborative tools like Github, microservices, and load balancing.',
    },

    {
      id: 'coreTechnical',
      title: 'Core Technical Concepts',
      description: 'Master essential technical concepts for product management, including frontend, backend, APIs, databases, and strategic frameworks.',
    },
    {
      id: 'productManagement',
      title: 'Product Management Practices',
      description: 'Learn key practices for effective product management, including Agile, cost management, feature feasibility, and database optimization.',
    },
    {
      id: 'systemScalability',
      title: 'System Scalability & Collaboration',
      description: 'Understand scalable system architectures and collaborative tools like Github, microservices, and load balancing.',
    },

{
      id: 'TeamTask',

      title: 'Team & Task Management',
      description: 'Explore effective team and task management strategies to enhance productivity and collaboration within product teams.',
    },
     
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans flex flex-col mt-16">

      {activeSection && (
        <button
          onClick={handleBackToOverview}
          className="fixed mt-6 left-4 z-50 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-3 py-1 rounded-lg transition duration-300 text-sm hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          aria-label="Back to dashboard"
        >
          ⬅️ Back
        </button>
      )}
      {/* Header and Overview */}
      {!activeSection && (
        <header className="mb-8 border-b border-yellow-200 flex-1">
          <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
              <span className="mr-2 text-2xl">🌟</span>
              Technical Product Management Masterclass
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleOverview}
                className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
                aria-expanded={openOverview}
                aria-controls="overview-section"
              >
                {openOverview ? 'Hide' : 'Show'}
              </button>
              
            </div>
          </div>
          <div className={`transition-all duration-500 overflow-hidden ${openOverview ? 'max-h-max' : 'max-h-0'}`}>
            <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300 text-center">
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Explore key technical product management concepts, including frontend, backend, APIs, databases, Agile practices, and scalable system architectures to enhance your PM skills.
              </p>
            </div>
            <div className="m-4 max-w-7xl mx-auto">
              {sections.map((section) => (
                <div key={section.id} className="mb-8">
                  <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">{section.title}</h2>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
                      aria-expanded={openSections[section.id]}
                      aria-controls={`${section.id}-section`}
                    >
                      {openSections[section.id] ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <div className={`transition-all duration-500 overflow-hidden ${openSections[section.id] ? 'max-h-max' : 'max-h-0'}`}>
                    <div className="mt-4 p-4 sm:p-6 bg-yellow-50 rounded-lg shadow-lg border border-yellow-300">
                      <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">{section.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cardData
                          .filter((card) => card.section === section.title)
                          .map((card) => (
                            <div
                              key={card.sectionName}
                              className="p-4 sm:p-6 bg-white rounded-lg shadow-md border border-yellow-300 hover:scale-105 transition-transform duration-300"
                              title={card.outcome}
                            >
                              <div className="flex items-center mb-4">
                                <span className={`text-4xl ${card.iconColor} mr-3`}>{card.icon}</span>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{card.title}</h3>
                              </div>
                              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{card.description}</p>
                              <button
                                onClick={() => handleSectionToggle(card.sectionName)}
                                className="mt-4 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                                aria-label={`Explore ${card.title}`}
                              >
                                Explore Now
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-6">
               
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Content Display */}
      {activeSection && (
        <section className="m-4 max-w-7xl mx-auto flex-1">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-yellow-300">
            <div className="flex items-center mb-4">
              <span className={`text-4xl ${cardData.find((c) => c.sectionName === activeSection).iconColor} mr-3`}>
                {cardData.find((c) => c.sectionName === activeSection).icon}
              </span>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
                {cardData.find((c) => c.sectionName === activeSection).title}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
              {cardData.find((c) => c.sectionName === activeSection).description}
            </p>
            {activeSection === 'Frontend' && <FrontendSection />}
            {activeSection === 'Backend' && <BackendSection />}
            {activeSection === 'APIs' && <APISection />}
            {activeSection === 'Database' && <DatabaseSection />}
            {activeSection === 'Dashboard5' && <Dashboard5 />}
            {activeSection === 'Porters' && <Porters />}
            {activeSection === 'Brainstorming' && <BrainstormingTechniques />}
            {activeSection === 'Tradeoffs' && <TradeOffs />}
            {activeSection === 'Agile' && <AgileMethodologyComponent />}
            {activeSection === 'Cost' && <CostManagement />}
            {activeSection === 'DatabaseComparison' && <DatabaseComparison />}
             {activeSection === 'SystemArchitecture' && <SystemArchitectureSection />}
            {activeSection === 'Journey' && <CustomerJourneyMapping />}
            {activeSection === 'Feature' && <FeatureFeasibilityComponent />}
            {activeSection === 'Monitoring' && <MonitoringMetrics />}
            {activeSection === 'Risk' && <RiskManagementComponent />}
            {activeSection === 'UserFlows' && <UserFlowsDesign />}
            {activeSection === 'DatabaseNormalization' && <DatabaseNormalization />}
            {activeSection === 'DatabaseIndexing' && <DatabaseIndexing />}
            {activeSection === 'DatabaseOptimization' && <DatabaseOptimization />}
            {activeSection === 'github' && <GithubSection />}
            {activeSection === 'microservices' && <MicroservicesSection/>}
            {activeSection === 'security' && <SecuritySection />}
            {activeSection === 'loadbalancing' && <LoadBalancingComponent />}
            {activeSection === 'datapipeline' && <DataPipeline />}
            {activeSection === 'bearchitecture' && <BEArchitecture/>}
            {activeSection === 'sysarchitect' && <MicroServices/>}
            {activeSection === 'apigateway2' && <APIGateway2/>}
            {activeSection === 'securityconcepts' && <AuthConcepts/>}
            {activeSection === 'dataprotection' && <DataProtection/>}
            {activeSection === 'wikis' && <Wikis/>}
            {activeSection === 'tradeoffs2' && <TradeoffVersion2/>}
            {activeSection === 'TechnicalDebts' && <TechnicalDebts/>}
            {activeSection === 'partner' && < PartneringWithTeams/>}
            {activeSection === 'mvc' && < MVC/>}
            {activeSection === 'processmappings' && <ProcessMappings/>}
            {activeSection === 'systemdesigns' && <Systemdesigns/>}
             {activeSection === 'swt' && <SoftwareTesting/>}
             {activeSection === 'TeamTask' && <TeamTask/>}
          

            {activeSection === 'cicd' && <CICD/>}
            {activeSection === 'DbJoins' && <DbJoins/>}
            {activeSection === 'strategydashboard' && <StrategyDashboard/>}

            {/* Add more sections as needed */}
           
            
            {activeSection === 'QA' && <QASection />}
             
            <div className="mt-6">
           
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default TechnicalDashboard;