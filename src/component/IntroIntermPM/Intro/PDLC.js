import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const ProductDevelopmentLifecycle = () => {
  const tabs = [
    { id: 1, title: 'Idea Generation & Market Research', emoji: '💡' },
    { id: 2, title: 'Product Discovery & Validation', emoji: '🔍' },
    { id: 3, title: 'Building an MVP', emoji: '💻' },
    { id: 4, title: 'Product Launch & GTM Strategy', emoji: '🚀' },
  ];

  const [activeTab, setActiveTab] = useState(1);
  const [openSections, setOpenSections] = useState({
    overview: true,
    tabContent: true,
  });

  // Tab 1: Idea Generation
  const [ideaInput, setIdeaInput] = useState('');
  const [ideaCategory, setIdeaCategory] = useState('');
  const [ideas, setIdeas] = useState([]);

  // Tab 2: Landing Page Test
  const [email, setEmail] = useState('');
  const [submissionCount, setSubmissionCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Tab 3: MVP Builder
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [mvpBuilt, setMvpBuilt] = useState(false);

  // Tab 4: Product Launch
  const [launched, setLaunched] = useState(false);
  const [acquisitionRate, setAcquisitionRate] = useState(0);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleReset = () => {
    setIdeaInput('');
    setIdeaCategory('');
    setIdeas([]);
    setEmail('');
    setSubmissionCount(0);
    setSubmitted(false);
    setSelectedFeatures([]);
    setMvpBuilt(false);
    setLaunched(false);
    setAcquisitionRate(0);
    setActiveTab(1);
    setOpenSections({ overview: true, tabContent: true });
  };

  // Tab 1: Handle Idea Submission
  const handleIdeaSubmit = (e) => {
    e.preventDefault();
    if (ideaInput.trim() !== '' && ideaCategory) {
      setIdeas([...ideas, { text: ideaInput, category: ideaCategory }]);
      setIdeaInput('');
      setIdeaCategory('');
    }
  };

  // Tab 2: Handle Email Submission
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setSubmissionCount((prev) => prev + 1);
      setSubmitted(true);
      setEmail('');
    }
  };

  // Tab 3: Handle Feature Toggle
  const handleFeatureToggle = (feature) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((item) => item !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const buildMVP = () => {
    if (selectedFeatures.length > 0) {
      setMvpBuilt(true);
    }
  };

  // Tab 4: Handle Product Launch
  const launchProduct = () => {
    setLaunched(true);
    setAcquisitionRate(Math.floor(Math.random() * 50) + 50); // Mock acquisition rate
  };

  // Generate Insights
  const generateInsights = () => {
    if (activeTab === 1) {
      const categories = ideas.map((idea) => idea.category);
      if (categories.includes('Pain Point')) {
        return 'Prioritize ideas addressing user pain points to solve critical problems. 🔧';
      } else if (categories.includes('Competitor Gap')) {
        return 'Focus on ideas that fill gaps in competitor offerings to gain a market edge. 📈';
      } else if (categories.includes('Trend')) {
        return 'Leverage trending ideas to align with market demands and attract users. 🌟';
      } else {
        return 'Explore a mix of ideas to identify the most promising opportunities. 💡';
      }
    } else if (activeTab === 2) {
      const conversionRate = (submissionCount / 100) * 5; // Mock conversion rate
      return `Landing page shows a ${conversionRate.toFixed(1)}% conversion rate. ${
        conversionRate > 3 ? 'Strong interest! Proceed with development.' : 'Consider refining your pitch to boost interest.'
      } 📊`;
    } else if (activeTab === 3) {
      const priorityScores = {
        'Task Addition': 3,
        'Deadline Reminders': 2,
        'Notifications': 1,
      };
      const totalScore = selectedFeatures.reduce((sum, feature) => sum + (priorityScores[feature] || 1), 0);
      return totalScore > 4
        ? 'Your MVP includes high-priority features! Test with users to validate impact. 🧪'
        : 'Consider adding high-priority features like Task Addition to strengthen your MVP. 💻';
    } else {
      return acquisitionRate > 75
        ? 'Strong launch! Optimize marketing to maintain high user acquisition. 🚀'
        : 'Launch successful, but acquisition is moderate. Boost marketing efforts to attract more users. 📢';
    }
  };

  // Calculate Idea Category Distribution (Tab 1)
  const ideaCategoryCounts = ideas.reduce((acc, idea) => {
    acc[idea.category] = (acc[idea.category] || 0) + 1;
    return acc;
  }, {});
  const ideaCategories = ['Pain Point', 'Competitor Gap', 'Trend', 'Other'];
  const maxIdeaCount = Math.max(...Object.values(ideaCategoryCounts), 1);
  const ideaCategoryScores = ideaCategories.map((cat) => ((ideaCategoryCounts[cat] || 0) / maxIdeaCount) * 100);

  // Calculate Feature Priority Distribution (Tab 3)
  const featurePriorityScores = {
    'Task Addition': 3,
    'Deadline Reminders': 2,
    'Notifications': 1,
  };
  const featureCategories = ['Task Addition', 'Deadline Reminders', 'Notifications'];
  const maxFeatureScore = Math.max(...featureCategories.map((cat) => featurePriorityScores[cat] || 1), 1);
  const featureScores = featureCategories.map((cat) =>
    selectedFeatures.includes(cat) ? (featurePriorityScores[cat] / maxFeatureScore) * 100 : 0
  );

  useEffect(() => {
    toast.info('Explore the product development lifecycle!', {
      toastId: 'welcome-lifecycle',
      theme: 'light',
      style: { background: '#fef3c7', color: '#1f2937' },
    });
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans flex flex-col">
      <header className="mb-8 border-b border-yellow-200 flex-1">
        <div className="flex justify-between items-center mx-4 sm:mx-6 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">💡</span>
            Product Development Lifecycle
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => toggleSection('overview')}
              className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
              aria-expanded={openSections.overview}
              aria-controls="overview-section"
            >
              {openSections.overview ? 'Hide' : 'Show'}
            </button>
           
          </div>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.overview ? 'max-h-max' : 'max-h-0'}`}>
          <div className="mx-4 sm:mx-6 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300 text-center">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              Simulate the product development lifecycle from ideation to launch. Generate ideas, validate them, build an MVP, and launch your product with actionable insights! 🚀
            </p>
          </div>
        </div>
      </header>

      <section className="mx-4 sm:mx-6 flex-1">
        <nav className="flex flex-wrap gap-2 sm:gap-4 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center p-2 sm:p-3 border border-yellow-300 rounded-lg transition-all duration-300 hover:scale-105 ${
                activeTab === tab.id ? 'bg-yellow-200 font-bold text-yellow-800' : 'bg-yellow-50 hover:bg-yellow-100 text-gray-700'
              }`}
              aria-label={`Switch to ${tab.title}`}
            >
              <span className="mr-2 text-yellow-600">{tab.emoji}</span>
              <span className="text-sm sm:text-base">{tab.title}</span>
            </button>
          ))}
        </nav>

        <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
            {tabs[activeTab - 1].emoji} {tabs[activeTab - 1].title}
          </h2>
          <button
            onClick={() => toggleSection('tabContent')}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.tabContent}
            aria-controls="tab-content-section"
          >
            {openSections.tabContent ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.tabContent ? 'max-h-max' : 'max-h-0'}`}>
          <div className="mt-4 p-4 sm:p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300 flex flex-col gap-4 sm:gap-6">
            {/* Tab 1: Idea Generation & Market Research */}
            {activeTab === 1 && (
              <div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Generate new ideas by identifying customer pain points, analyzing competitor gaps, and spotting industry trends.
                </p>
                <ul className="list-none text-sm sm:text-base text-gray-700 mt-2">
                  <li className="flex items-center gap-2"><span className="text-blue-600">😤</span> Customer Pain Points: What problems are users facing?</li>
                  <li className="flex items-center gap-2"><span className="text-blue-600">📊</span> Competitor Gaps: What is missing in current solutions?</li>
                  <li className="flex items-center gap-2"><span className="text-blue-600">🌟</span> Industry Trends: What’s the new trend?</li>
                </ul>
                <div className="border border-dashed border-yellow-300 p-4 bg-gray-50 rounded-lg mt-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Idea Generation Simulator</h3>
                  <form onSubmit={handleIdeaSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium text-sm sm:text-base mb-2">
                        Select an idea category:
                      </label>
                      <select
                        value={ideaCategory}
                        onChange={(e) => setIdeaCategory(e.target.value)}
                        className="w-full border border-yellow-300 rounded-lg px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        required
                      >
                        <option value="" disabled>Select category</option>
                        <option value="Pain Point">Pain Point</option>
                        <option value="Competitor Gap">Competitor Gap</option>
                        <option value="Trend">Trend</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                      <input
                        type="text"
                        placeholder="Enter your product idea..."
                        value={ideaInput}
                        onChange={(e) => setIdeaInput(e.target.value)}
                        className="w-full border border-yellow-300 rounded-lg px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        aria-label="Product idea input"
                      />
                      <button
                        type="submit"
                        className="w-full sm:w-auto bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        aria-label="Submit idea"
                      >
                        Submit Idea
                      </button>
                    </div>
                  </form>
                  {ideas.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Submitted Ideas:</h4>
                      <ul className="list-none text-sm sm:text-base text-gray-700">
                        {ideas.map((idea, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="text-blue-600">{`${index + 1}️⃣`}</span>
                            {idea.text} <span className="text-gray-500">({idea.category})</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4">
                        <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Idea Categories:</h4>
                        <div className="flex flex-col sm:flex-row gap-2">
                          {ideaCategories.map((cat, index) => (
                            <div key={index} className="flex-1">
                              <div className="text-xs sm:text-sm text-gray-700 text-center">{cat}</div>
                              <div
                                className="bg-yellow-200 rounded"
                                style={{ height: `${ideaCategoryScores[index]}px`, minHeight: '20px' }}
                              ></div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-blue-50 rounded-md">
                        <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
                          <span className="text-green-600">💡</span> Insights
                        </h4>
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{generateInsights()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Product Discovery & Validation */}
            {activeTab === 2 && (
              <div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Understand the problem deeply and validate your idea through user interviews, surveys, prototypes, and landing page tests.
                </p>
                <ul className="list-none text-sm sm:text-base text-gray-700 mt-2">
                  <li className="flex items-center gap-2"><span className="text-blue-600">👤</span> User Interviews & Surveys: Gather direct feedback.</li>
                  <li className="flex items-center gap-2"><span className="text-blue-600">🖼️</span> Prototypes & Wireframes: Visualize your idea.</li>
                  <li className="flex items-center gap-2"><span className="text-blue-600">📈</span> Landing Page Tests: Gauge market interest.</li>
                </ul>
                <div className="border border-dashed border-yellow-300 p-4 bg-gray-50 rounded-lg mt-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Landing Page Test Simulator</h3>
                  {!submitted ? (
                    <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                      <input
                        type="email"
                        placeholder="Enter your email for early access"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-yellow-300 rounded-lg px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        aria-label="Email for early access"
                      />
                      <button
                        type="submit"
                        className="w-full sm:w-auto bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        aria-label="Sign up for early access"
                      >
                        Sign Up
                      </button>
                    </form>
                  ) : (
                    <div className="p-3 bg-green-50 border border-green-300 text-green-800 rounded-md">
                      <p className="text-sm sm:text-base">Thank you! {email} is registered for early access.</p>
                    </div>
                  )}
                  {submissionCount > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-md">
                      <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
                        <span className="text-green-600">💡</span> Insights
                      </h4>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{generateInsights()}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 3: Building an MVP */}
            {activeTab === 3 && (
              <div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Build a basic version of your product with core functionalities to gather user feedback quickly.
                </p>
                <ul className="list-none text-sm sm:text-base text-gray-700 mt-2">
                  <li className="flex items-center gap-2"><span className="text-blue-600">🖱️</span> Core User Interactions</li>
                  <li className="flex items-center gap-2"><span className="text-blue-600">🎨</span> Basic Design & Functionality</li>
                  <li className="flex items-center gap-2"><span className="text-blue-600">📢</span> Feedback Mechanisms</li>
                </ul>
                <div className="border border-dashed border-yellow-300 p-4 bg-gray-50 rounded-lg mt-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">MVP Builder Simulator</h3>
                  {!mvpBuilt ? (
                    <div>
                      <p className="text-sm sm:text-base mb-2">Select the core features for your MVP:</p>
                      <div className="flex flex-col gap-2 mb-3">
                        <label className="flex items-center text-sm sm:text-base">
                          <input
                            type="checkbox"
                            value="Task Addition"
                            onChange={() => handleFeatureToggle('Task Addition')}
                            checked={selectedFeatures.includes('Task Addition')}
                            className="mr-2 accent-yellow-600"
                            aria-label="Task Addition feature"
                          />
                          Task Addition (High Priority)
                        </label>
                        <label className="flex items-center text-sm sm:text-base">
                          <input
                            type="checkbox"
                            value="Deadline Reminders"
                            onChange={() => handleFeatureToggle('Deadline Reminders')}
                            checked={selectedFeatures.includes('Deadline Reminders')}
                            className="mr-2 accent-yellow-600"
                            aria-label="Deadline Reminders feature"
                          />
                          Deadline Reminders (Medium Priority)
                        </label>
                        <label className="flex items-center text-sm sm:text-base">
                          <input
                            type="checkbox"
                            value="Notifications"
                            onChange={() => handleFeatureToggle('Notifications')}
                            checked={selectedFeatures.includes('Notifications')}
                            className="mr-2 accent-yellow-600"
                            aria-label="Notifications feature"
                          />
                          Notifications (Low Priority)
                        </label>
                      </div>
                      <button
                        onClick={buildMVP}
                        className="w-full sm:w-auto bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        aria-label="Build MVP"
                      >
                        Build MVP
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm sm:text-base mb-2">Your MVP has been built with the following features:</p>
                      <ul className="list-none text-sm sm:text-base text-gray-700">
                        {selectedFeatures.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="text-blue-600">{`${index + 1}️⃣`}</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4">
                        <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Feature Priorities:</h4>
                        <div className="flex flex-col sm:flex-row gap-2">
                          {featureCategories.map((cat, index) => (
                            <div key={index} className="flex-1">
                              <div className="text-xs sm:text-sm text-gray-700 text-center">{cat}</div>
                              <div
                                className="bg-yellow-200 rounded"
                                style={{ height: `${featureScores[index]}px`, minHeight: '20px' }}
                              ></div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-blue-50 rounded-md">
                        <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
                          <span className="text-green-600">💡</span> Insights
                        </h4>
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{generateInsights()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 4: Product Launch & GTM Strategy */}
            {activeTab === 4 && (
              <div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Finalize testing, execute a go-to-market strategy, and start acquiring users to launch your product.
                </p>
                <ul className="list-none text-sm sm:text-base text-gray-700 mt-2">
                  <li className="flex items-center gap-2"><span className="text-blue-600">🧪</span> Final Testing & Bug Fixes</li>
                  <li className="flex items-center gap-2"><span className="text-blue-600">📢</span> Go-To-Market Strategy</li>
                  <li className="flex items-center gap-2"><span className="text-blue-600">👥</span> Marketing & User Acquisition</li>
                </ul>
                <div className="border border-dashed border-yellow-300 p-4 bg-gray-50 rounded-lg mt-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Product Launch Simulator</h3>
                  {!launched ? (
                    <button
                      onClick={launchProduct}
                      className="w-full sm:w-auto bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                      aria-label="Launch product"
                    >
                      Launch Product
                    </button>
                  ) : (
                    <div className="p-3 bg-green-50 border border-green-300 text-green-800 rounded-md">
                      <p className="text-sm sm:text-base">Congratulations! Your product has been launched with a {acquisitionRate}% user acquisition rate.</p>
                    </div>
                  )}
                  {launched && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-md">
                      <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
                        <span className="text-green-600">💡</span> Insights
                      </h4>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{generateInsights()}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            <button
              onClick={handleReset}
              className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600 mt-4"
              aria-label="Reset simulation"
            >
              Reset
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDevelopmentLifecycle;