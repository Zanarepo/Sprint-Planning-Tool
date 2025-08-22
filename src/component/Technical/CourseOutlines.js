import React, { useState } from 'react';

function App() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    header: true,
    overview: true,
    modules: true,
  });

  const modules = [
    {
      id: 1,
      title: 'Module 1: API Testing with Postman',
      icon: '🌐',
      outcome: 'Learn to test APIs using Postman with GET, POST, UPDATE, and DELETE requests.',
      content: (
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">API Operations</h3>
          <ul className="list-disc pl-5 text-gray-700 text-sm sm:text-base">
            <li>GET: Retrieve data from an API</li>
            <li>POST: Create new data via an API</li>
            <li>UPDATE: Modify existing data using PUT/PATCH</li>
            <li>DELETE: Remove data via an API</li>
          </ul>
          <h3 className="mt-4 font-semibold text-gray-800">Task</h3>
          <ul className="list-disc pl-5 text-gray-700 text-sm sm:text-base">
            <li>Use Postman to test a sample API by performing GET, POST, UPDATE, and DELETE requests.</li>
            <li>Document your requests and responses.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 2,
      title: 'Module 2: Databases',
      icon: '🗄️',
      outcome: 'Understand database types and design a relational table structure.',
      content: (
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Database Basics</h3>
          <ul className="list-disc pl-5 text-gray-700 text-sm sm:text-base">
            <li>What are Databases?</li>
            <li>Types of Databases (Relational vs. NoSQL)</li>
            <li>How Databases Store and Retrieve Data</li>
            <li>Basics of SQL Queries (SELECT, INSERT, UPDATE, DELETE)</li>
          </ul>
          <h3 className="mt-4 font-semibold text-gray-800">Homework</h3>
          <p className="text-gray-700 text-sm sm:text-base">
            Design a user table for an online store and link it to the product table using a foreign key.
          </p>
        </div>
      ),
    },
    {
      id: 3,
      title: 'Module 3: Introduction to Frontend (FE)',
      icon: '🎨',
      outcome: 'Learn frontend basics and deploy a simple webpage.',
      content: (
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">FE Basics & Terminologies</h3>
          <ul className="list-disc pl-5 text-gray-700 text-sm sm:text-base">
            <li>What is Frontend Development?</li>
            <li>Client vs. Server</li>
            <li>Understanding HTML, CSS, and JavaScript</li>
          </ul>
          <h3 className="mt-4 font-semibold text-gray-800">Tools & Environment Setup</h3>
          <ul className="list-disc pl-5 text-gray-700 text-sm sm:text-base">
            <li>Installing VSCode and extensions</li>
            <li>GitHub Basics (Repositories, Commits, Branches)</li>
            <li>Setting up GitHub account and linking with VSCode</li>
            <li>Introduction to Netlify for deployment</li>
          </ul>
          <h3 className="mt-4 font-semibold text-gray-800">Homework</h3>
          <ul className="list-disc pl-5 text-gray-700 text-sm sm:text-base">
            <li>Create a simple HTML page with CSS styling.</li>
            <li>Push code to GitHub and deploy using Netlify.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 4,
      title: 'Module 4: Building a Simple Landing Page',
      icon: '📄',
      outcome: 'Build and deploy a personal portfolio webpage.',
      content: (
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Web Development Basics</h3>
          <ul className="list-disc pl-5 text-gray-700 text-sm sm:text-base">
            <li>Structure of a Web Page (HTML Elements & Layout)</li>
            <li>Styling with CSS (Selectors, Flexbox, Grid)</li>
            <li>JavaScript Basics</li>
            <li>Deploying the Page on Netlify</li>
          </ul>
          <h3 className="mt-4 font-semibold text-gray-800">Portfolio Task</h3>
          <ul className="list-disc pl-5 text-gray-700 text-sm sm:text-base">
            <li>Create a personal portfolio page with sections like About Me, Skills, Projects.</li>
            <li>Deploy and share the Netlify link.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 5,
      title: 'Module 5: Agile & Product Development',
      icon: '🔄',
      outcome: 'Master agile methodologies and feature prioritization.',
      content: (
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Agile Fundamentals</h3>
          <ul className="list-disc pl-5 text-gray-700 text-sm sm:text-base">
            <li>What is Agile? (Scrum vs. Kanban)</li>
            <li>Trade-offs in Product Development</li>
            <li>Feature Feasibility Assessment</li>
            <li>Risk Management in Product Development</li>
          </ul>
          <h3 className="mt-4 font-semibold text-gray-800">Homework</h3>
          <p className="text-gray-700 text-sm sm:text-base">
            Write a 1-page Agile case study: How would you prioritize a feature with tech debt concerns?
          </p>
        </div>
      ),
    },
    {
      id: 6,
      title: 'Module 6: System Architecture & Backend (BE) Fundamentals',
      icon: '🏗️',
      outcome: 'Understand system architecture and backend concepts.',
      content: (
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Architecture Basics</h3>
          <ul className="list-disc pl-5 text-gray-700 text-sm sm:text-base">
            <li>What is System Architecture?</li>
            <li>Monolith vs. Microservices</li>
            <li>Load Balancing (Why it’s needed & how it works)</li>
            <li>Security Considerations in Product Development</li>
          </ul>
          <h3 className="mt-4 font-semibold text-gray-800">Task</h3>
          <p className="text-gray-700 text-sm sm:text-base">
            Research and create a diagram of a simple system architecture (Frontend + Backend + Database).
          </p>
        </div>
      ),
    },
    {
      id: 7,
      title: 'Module 7: Data & Analytics for TPMs',
      icon: '📊',
      outcome: 'Learn to monitor and analyze product metrics.',
      content: (
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Data & Analytics Basics</h3>
          <ul className="list-disc pl-5 text-gray-700 text-sm sm:text-base">
            <li>What is a Data Pipeline?</li>
            <li>Monitoring & Metrics (KPIs, Logs, Alerts)</li>
            <li>Cost Management in Cloud & Infrastructure</li>
            <li>Basics of Product Analytics</li>
          </ul>
          <h3 className="mt-4 font-semibold text-gray-800">Homework</h3>
          <p className="text-gray-700 text-sm sm:text-base">
            Identify 3 key metrics to monitor for a FinTech or SaaS product.
          </p>
        </div>
      ),
    },
  ];

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const markAsCompleted = (id) => {
    if (!completedModules.includes(id)) {
      setCompletedModules((prev) => [...prev, id]);
    }
  };

  const selectNextModule = () => {
    const currentIndex = modules.findIndex((m) => m.id === selectedModule);
    const nextIndex = currentIndex < modules.length - 1 ? currentIndex + 1 : 0;
    setSelectedModule(modules[nextIndex].id);
    setIsSidebarOpen(false);
  };

  const selectPreviousModule = () => {
    const currentIndex = modules.findIndex((m) => m.id === selectedModule);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : modules.length - 1;
    setSelectedModule(modules[prevIndex].id);
    setIsSidebarOpen(false);
  };

  const resetProgress = () => {
    setCompletedModules([]);
    setSelectedModule(null);
    setIsSidebarOpen(false);
  };

  const getRecommendedModule = () => {
    return modules.find((m) => !completedModules.includes(m.id)) || modules[0];
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">📚</span>
            Course Modules
          </h1>
          <button
            onClick={() => toggleSection('header')}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.header}
            aria-controls="header-section"
          >
            {openSections.header ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.header ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300 text-center">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Welcome to the Technical Product Management Course! Explore 7 modules covering APIs, databases, frontend, backend, agile, and analytics to build your PM skills.
            </p>
          </div>
        </div>
      </header>

      {/* Course Overview */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">🌟</span>
            Course Overview
          </h2>
          <button
            onClick={() => toggleSection('overview')}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.overview}
            aria-controls="overview-section"
          >
            {openSections.overview ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.overview ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Learning Objectives</h3>
            <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base space-y-2">
              <li>Master API testing with Postman for robust integrations.</li>
              <li>Understand database types and design relational structures.</li>
              <li>Learn frontend development basics and deploy webpages.</li>
              <li>Build and style a professional landing page.</li>
              <li>Explore agile methodologies for effective product development.</li>
              <li>Understand system architecture and backend fundamentals.</li>
              <li>Leverage data pipelines and analytics for data-driven PM decisions.</li>
            </ul>
            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  setSelectedModule(1);
                  setIsSidebarOpen(false);
                }}
                className="inline-block bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-6 py-3 rounded-lg transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                aria-label="Start the first module"
              >
                🚀 Start Module 1
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="mb-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">📖</span>
            Modules
          </h2>
          <button
            onClick={() => toggleSection('modules')}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.modules}
            aria-controls="modules-section"
          >
            {openSections.modules ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.modules ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 flex flex-col sm:flex-row gap-4">
            {/* Sidebar for Module List */}
            <nav
              className={`${
                isSidebarOpen ? 'block' : 'hidden'
              } sm:block fixed sm:static top-0 left-0 w-full sm:w-64 h-full sm:h-auto bg-yellow-50 p-4 rounded-lg shadow-md border border-yellow-300 z-50 overflow-y-auto max-h-[calc(100vh-12rem)] sm:sticky sm:top-4`}
            >
              <button
                className="sm:hidden bg-yellow-600 text-white px-4 py-2 rounded-lg mb-4 w-full"
                onClick={toggleSidebar}
                aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              >
                {isSidebarOpen ? 'Close ☰' : 'Modules ☰'}
              </button>
              <div className="mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                  Progress: {completedModules.length}/{modules.length}
                </h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-yellow-600 h-2.5 rounded-full"
                    style={{ width: `${(completedModules.length / modules.length) * 100}%` }}
                  ></div>
                </div>
                <button
                  onClick={resetProgress}
                  className="mt-2 w-full bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-lg text-sm transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  aria-label="Reset progress"
                >
                  🔄 Reset Progress
                </button>
              </div>
              {modules.map((module, index) => (
                <div key={module.id} className="mb-2">
                  <button
                    onClick={() => {
                      setSelectedModule(module.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`block w-full text-left py-3 px-3 rounded-lg transition duration-300 ${
                      selectedModule === module.id
                        ? 'bg-yellow-200'
                        : 'bg-yellow-50 hover:bg-yellow-100'
                    } text-sm sm:text-base text-gray-800`}
                    aria-label={`Select ${module.title}`}
                    title={module.outcome}
                  >
                    <span className="mr-2 text-xl">{module.icon}</span>
                    {module.title} ({index + 1}/{modules.length})
                    {completedModules.includes(module.id) && <span className="ml-2 text-green-600">✅</span>}
                  </button>
                  <button
                    onClick={() => {
                      markAsCompleted(module.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`mt-1 w-full text-center bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-3 py-1 rounded-lg text-sm transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600 ${
                      completedModules.includes(module.id) ? 'opacity-50 cursor-not-allowed' : 'animate-pulse'
                    }`}
                    disabled={completedModules.includes(module.id)}
                    aria-label={`Mark ${module.title} as completed`}
                  >
                    {completedModules.includes(module.id) ? '✅ Completed' : 'Mark as Completed'}
                  </button>
                </div>
              ))}
            </nav>
            {/* Content Display Area */}
            <div className="flex-1 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-md border border-yellow-300 max-h-[calc(100vh-16rem)] overflow-y-auto">
              {isSidebarOpen && (
                <div className="sm:hidden fixed inset-0 bg-black/50 z-40" onClick={toggleSidebar}></div>
              )}
              {selectedModule ? (
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2 text-2xl">{modules.find((m) => m.id === selectedModule).icon}</span>
                    {modules.find((m) => m.id === selectedModule).title}
                    {completedModules.includes(selectedModule) && (
                      <span className="ml-2 text-green-600">🎉 Completed!</span>
                    )}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-700 mb-4">{modules.find((m) => m.id === selectedModule).outcome}</p>
                  {modules.find((m) => m.id === selectedModule).content}
                  <div className="mt-4 flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={selectPreviousModule}
                      className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                      aria-label="Go to previous module"
                    >
                      ⬅️ Previous Module
                    </button>
                    <button
                      onClick={selectNextModule}
                      className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                      aria-label="Go to next module"
                    >
                      Next Module ➡️
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-700 text-sm sm:text-base mb-4">
                    Please select a module to view its content.
                  </p>
                  <p className="text-gray-700 text-sm sm:text-base mb-4">
                    <strong>Recommended Next Step:</strong> Start with{' '}
                    <button
                      onClick={() => {
                        setSelectedModule(getRecommendedModule().id);
                        setIsSidebarOpen(false);
                      }}
                      className="text-yellow-600 hover:text-yellow-700 underline"
                      aria-label={`Start ${getRecommendedModule().title}`}
                    >
                      {getRecommendedModule().title}
                    </button>
                  </p>
                  <button
                    onClick={() => toggleSection('overview')}
                    className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    aria-label="Return to course overview"
                  >
                    📚 Return to Course Overview
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;