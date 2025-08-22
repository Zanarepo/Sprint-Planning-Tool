import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const ProductDevelopmentProcess = () => {
  const [openCard, setOpenCard] = useState(null);
  const [openSections, setOpenSections] = useState({ overview: true });

  // Card 1: Idea Generation & Market Research
  const [ideaInput, setIdeaInput] = useState('');
  const [ideaCategory, setIdeaCategory] = useState('');
  const [ideas, setIdeas] = useState([]);

  // Card 2: Product Discovery & Validation
  const [email, setEmail] = useState('');
  const [submissionCount, setSubmissionCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Card 3: Building an MVP
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [mvpBuilt, setMvpBuilt] = useState(false);

  // Card 4: Product Launch & GTM Strategy
  const [launched, setLaunched] = useState(false);
  const [acquisitionRate, setAcquisitionRate] = useState(0);

  const toggleCard = (index) => {
    setOpenCard(openCard === index ? null : index);
  };

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
    setOpenCard(null);
    setOpenSections({ overview: true });
  };

  // Card 1: Handle Idea Submission
  const handleIdeaSubmit = (e) => {
    e.preventDefault();
    if (ideaInput.trim() !== '' && ideaCategory) {
      setIdeas([...ideas, { text: ideaInput, category: ideaCategory }]);
      setIdeaInput('');
      setIdeaCategory('');
    }
  };

  // Card 2: Handle Email Submission
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setSubmissionCount((prev) => prev + 1);
      setSubmitted(true);
      setEmail('');
    }
  };

  // Card 3: Handle Feature Toggle
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

  // Card 4: Handle Product Launch
  const launchProduct = () => {
    setLaunched(true);
    setAcquisitionRate(Math.floor(Math.random() * 50) + 50); // Mock acquisition rate
  };

  // Generate Insights
  const generateInsights = (index) => {
    if (index === 0) {
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
    } else if (index === 1) {
      const conversionRate = (submissionCount / 100) * 5; // Mock conversion rate
      return `Landing page shows a ${conversionRate.toFixed(1)}% conversion rate. ${
        conversionRate > 3 ? 'Strong interest! Proceed with development.' : 'Consider refining your pitch to boost interest.'
      } 📊`;
    } else if (index === 2) {
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

  // Calculate Idea Category Distribution (Card 1)
  const ideaCategoryCounts = ideas.reduce((acc, idea) => {
    acc[idea.category] = (acc[idea.category] || 0) + 1;
    return acc;
  }, {});
  const ideaCategories = ['Pain Point', 'Competitor Gap', 'Trend', 'Other'];
  const maxIdeaCount = Math.max(...Object.values(ideaCategoryCounts), 1);
  const ideaCategoryScores = ideaCategories.map((cat) => ((ideaCategoryCounts[cat] || 0) / maxIdeaCount) * 100);

  // Calculate Feature Priority Distribution (Card 3)
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
    toast.info('Learn the product development process!', {
      toastId: 'welcome-process',
      theme: 'light',
      style: { background: '#fef3c7', color: '#1f2937' },
    });
  }, []);

  const cards = [
    {
      title: '1. Idea Generation & Market Research',
      emoji: '💡',
      content: (
        <>
          <div>
            <h3 className="text-base sm:text-lg font-medium mt-4">A. Idea Generation</h3>
            <p className="mt-2 text-sm sm:text-base leading-relaxed">
              This is the stage where new product ideas are born. Ideas can come from:
            </p>
            <ul className="list-none ml-6 mt-2 text-sm sm:text-base">
              <li className="flex items-center gap-2"><span className="text-blue-600">😤</span> Customer pain points – What problems do people face?</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">📊</span> Competitor gaps – What are competitors missing?</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">🌟</span> Industry trends – What’s changing in the market?</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">💭</span> Brainstorming & team insights – Internal innovation sessions.</li>
            </ul>
            <div className="mt-4 p-3 sm:p-4 bg-blue-50 border-l-4 border-blue-600 rounded-md">
              <strong>Example:</strong>
              <p className="mt-1 text-sm sm:text-base">
                Imagine you notice that students struggle to manage multiple assignments and deadlines. This could inspire the idea for a smart task management app for students.
              </p>
            </div>
            <div className="mt-4 p-3 sm:p-4 bg-gray-50 border border-dashed border-yellow-300 rounded-lg">
              <h4 className="text-sm sm:text-base font-semibold mb-3">Idea Generation Simulator</h4>
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
                  <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-md">
                    <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
                      <span className="text-green-600">💡</span> Insights
                    </h4>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{generateInsights(0)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-medium mt-6">B. Market Research</h3>
            <p className="mt-2 text-sm sm:text-base leading-relaxed">
              Before building anything, research is needed to check if the idea is worth pursuing:
            </p>
            <ul className="list-none ml-6 mt-2 text-sm sm:text-base">
              <li className="flex items-center gap-2"><span className="text-blue-600">👤</span> User Interviews & Surveys – Talking to potential users.</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">📊</span> Competitive Analysis – Studying existing solutions.</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">📈</span> Market Size & Demand – Checking how big the problem is.</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">🔧</span> Feasibility Check – Can we actually build it?</li>
            </ul>
            <div className="mt-4 p-3 sm:p-4 bg-green-50 border-l-4 border-green-600 rounded-md">
              <strong>Example:</strong>
              <p className="mt-1 text-sm sm:text-base">
                If research shows that 80% of students find managing assignments difficult, and current apps lack automated reminders, then there’s an opportunity to create a better tool.
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      title: '2. Product Discovery & Validation',
      emoji: '🔍',
      content: (
        <>
          <div>
            <h3 className="text-base sm:text-lg font-medium mt-4">A. Understanding the Problem Deeply</h3>
            <p className="mt-2 text-sm sm:text-base leading-relaxed">
              Define the exact problem you are solving, identify your target audience (e.g., college students aged 18-25), and create user personas.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-medium mt-6">B. Validation Methods</h3>
            <p className="mt-2 text-sm sm:text-base leading-relaxed">
              Validate the idea using:
            </p>
            <ul className="list-none ml-6 mt-2 text-sm sm:text-base">
              <li className="flex items-center gap-2"><span className="text-blue-600">🌐</span> Landing Page Test – Create a webpage to gauge interest.</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">🖼️</span> Prototype & Wireframes – A basic design to show users.</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">🧪</span> Beta Testing – A small group tries an early version.</li>
            </ul>
            <div className="mt-4 p-3 sm:p-4 bg-purple-50 border-l-4 border-purple-600 rounded-md">
              <strong>Example:</strong>
              <p className="mt-1 text-sm sm:text-base">
                For the smart task app, create a clickable prototype using Figma and ask students for feedback before coding.
              </p>
            </div>
            <div className="mt-4 p-3 sm:p-4 bg-gray-50 border border-dashed border-yellow-300 rounded-lg">
              <h4 className="text-sm sm:text-base font-semibold mb-3">Landing Page Test Simulator</h4>
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
                <div className="p-3 sm:p-4 bg-green-50 border border-green-300 text-green-800 rounded-md">
                  <p className="text-sm sm:text-base">Thank you! {email} is registered for early access.</p>
                </div>
              )}
              {submissionCount > 0 && (
                <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-md">
                  <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
                    <span className="text-green-600">💡</span> Insights
                  </h4>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{generateInsights(1)}</p>
                </div>
              )}
            </div>
          </div>
        </>
      ),
    },
    {
      title: '3. Building an MVP (Minimum Viable Product)',
      emoji: '💻',
      content: (
        <>
          <div>
            <h3 className="text-base sm:text-lg font-medium mt-4">A. What is an MVP?</h3>
            <p className="mt-2 text-sm sm:text-base leading-relaxed">
              An MVP is a basic version of your product with just enough features to test the idea with real users. Focus on core functionality (e.g., for the task app: adding tasks, setting reminders) and skip non-essential features.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-medium mt-6">B. The MVP Process</h3>
            <ul className="list-none ml-6 mt-2 text-sm sm:text-base">
              <li className="flex items-center gap-2"><span className="text-blue-600">🗝️</span> Define Core Features – What’s the most important function?</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">⚡</span> Develop Quickly – Build using no-code tools or simple tech.</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">👥</span> Test with Early Users – Get real-world feedback.</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">🔄</span> Iterate & Improve – Adjust based on feedback.</li>
            </ul>
            <div className="mt-4 p-3 sm:p-4 bg-yellow-50 border-l-4 border-yellow-600 rounded-md">
              <strong>Example:</strong>
              <p className="mt-1 text-sm sm:text-base">
                The MVP for a smart task app might allow students to add tasks, set deadlines, and receive reminders—but without fancy AI suggestions or integrations yet.
              </p>
            </div>
            <div className="mt-4 p-3 sm:p-4 bg-gray-50 border border-dashed border-yellow-300 rounded-lg">
              <h4 className="text-sm sm:text-base font-semibold mb-3">MVP Builder Simulator</h4>
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
                  <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-md">
                    <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
                      <span className="text-green-600">💡</span> Insights
                    </h4>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{generateInsights(2)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ),
    },
    {
      title: '4. Product Launch & Go-To-Market Strategy',
      emoji: '📢',
      content: (
        <>
          <div>
            <h3 className="text-base sm:text-lg font-medium mt-4">A. Preparing for Launch</h3>
            <ul className="list-none ml-6 mt-2 text-sm sm:text-base">
              <li className="flex items-center gap-2"><span className="text-blue-600">🧪</span> Beta Testing – Final round of testing with real users.</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">🐞</span> Bug Fixing & Optimizations – Ensuring a smooth experience.</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">📢</span> Marketing Plan – Decide how to reach users (ads, influencers, etc.).</li>
            </ul>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-medium mt-6">B. Go-To-Market (GTM) Strategy</h3>
            <ul className="list-none ml-6 mt-2 text-sm sm:text-base">
              <li className="flex items-center gap-2"><span className="text-blue-600">🌐</span> Launch on App Store/Web – Make it publicly available.</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">👥</span> User Acquisition – How will people find it? (SEO, ads, social media).</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">💰</span> Monetization – How will it make money? (subscriptions, ads).</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">🛠️</span> Customer Support & Feedback Loop – Provide help and improve based on feedback.</li>
            </ul>
            <div className="mt-4 p-3 sm:p-4 bg-red-50 border-l-4 border-red-600 rounded-md">
              <strong>Example:</strong>
              <p className="mt-1 text-sm sm:text-base">
                For the task app, launch on the Google Play Store, use TikTok & Instagram ads targeting students, and offer a free version with an optional premium upgrade.
              </p>
            </div>
            <div className="mt-4 p-3 sm:p-4 bg-gray-50 border border-dashed border-yellow-300 rounded-lg">
              <h4 className="text-sm sm:text-base font-semibold mb-3">Product Launch Simulator</h4>
              {!launched ? (
                <button
                  onClick={launchProduct}
                  className="w-full sm:w-auto bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  aria-label="Launch product"
                >
                  Launch Product
                </button>
              ) : (
                <div className="p-3 sm:p-4 bg-green-50 border border-green-300 text-green-800 rounded-md">
                  <p className="text-sm sm:text-base">Congratulations! Your product has been launched with a {acquisitionRate}% user acquisition rate.</p>
                </div>
              )}
              {launched && (
                <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-md">
                  <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
                    <span className="text-green-600">💡</span> Insights
                  </h4>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{generateInsights(3)}</p>
                </div>
              )}
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans flex flex-col">
      <header className="mb-8 border-b border-yellow-200 flex-1">
        <div className="flex justify-between items-center mx-4 sm:mx-6 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">💡</span>
            Product Development Process
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
              Explore the product development process from ideation to launch. Use interactive simulators to generate ideas, validate them, build an MVP, and launch your product with actionable insights! 🚀
            </p>
          </div>
        </div>
      </header>

      <section className="mx-4 sm:mx-6 flex-1">
        <div className="flex flex-col space-y-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="w-full bg-yellow-50 rounded-lg shadow-md p-4 sm:p-6 cursor-pointer border border-yellow-300 transition-all duration-300 hover:scale-105"
              onClick={() => toggleCard(index)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center mb-4">
                  <span className="text-xl sm:text-2xl mr-3 text-yellow-600">{card.emoji}</span>
                  <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">{card.title}</h2>
                </div>
                <button
                  className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
                  aria-expanded={openCard === index}
                  aria-controls={`card-content-${index}`}
                >
                  {openCard === index ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className={`transition-all duration-500 overflow-hidden ${openCard === index ? 'max-h-max' : 'max-h-0'}`}>
                {card.content}
              </div>
            </div>
          ))}
          <button
            onClick={handleReset}
            className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600 mt-6"
            aria-label="Reset process"
          >
            Reset
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductDevelopmentProcess;