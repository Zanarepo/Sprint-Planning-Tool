import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const ProductManagementIntro = () => {
  const [openSections, setOpenSections] = useState({
    overview: true,
    whatIs: true,
    roles: true,
    comparison: true,
    analogy: true,
    finalThoughts: true,
  });
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleReset = () => {
    setQuizAnswer('');
    setQuizFeedback('');
    setOpenSections({
      overview: true,
      whatIs: true,
      roles: true,
      comparison: true,
      analogy: true,
      finalThoughts: true,
    });
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    if (quizAnswer === 'Product Manager') {
      setQuizFeedback('Correct! The Product Manager defines the product vision and strategy.');
    } else {
      setQuizFeedback(`Incorrect. The ${quizAnswer || 'selected role'} focuses on ${
        quizAnswer === 'Project Manager'
          ? 'execution and delivery'
          : quizAnswer === 'Program Manager'
          ? 'coordinating multiple projects'
          : 'other tasks'
      }. Try again!`);
    }
  };



  // Data for CSS-based bar chart (mock responsibility counts)
  const roleData = {
    'Product Manager': 5,
    'Project Manager': 3,
    'Program Manager': 4,
  };
  const maxRoleCount = Math.max(...Object.values(roleData), 1);
  const roleScores = Object.keys(roleData).map((role) => (roleData[role] / maxRoleCount) * 100);

  useEffect(() => {
    toast.info('Discover Product Management!', {
      toastId: 'welcome-pm-intro',
      theme: 'light',
      style: { background: '#fef3c7', color: '#1f2937' },
    });
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans flex flex-col">
      <header className="mb-8 border-b border-yellow-200 flex-1">
        <div className="flex justify-between items-center mx-4 sm:mx-6 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800 tracking-tight">
            <span className="mr-2 text-2xl">💡</span>
            Introduction to Product Management
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
              Product Management is at the heart of building great products that solve real problems for customers. It combines strategy, business, technology, and user experience to create products that succeed in the market.
            </p>
          </div>
        </div>
      </header>

      <section className="mx-4 sm:mx-6 flex-1 flex flex-col gap-4 sm:gap-6">
        {/* What is Product Management */}
        <div>
          <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-2 text-gray-800">
              <span className="text-yellow-600">💡</span> What is Product Management?
            </h2>
            <button
              onClick={() => toggleSection('whatIs')}
              className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
              aria-expanded={openSections.whatIs}
              aria-controls="what-is-section"
            >
              {openSections.whatIs ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className={`transition-all duration-500 overflow-hidden ${openSections.whatIs ? 'max-h-max' : 'max-h-0'}`}>
            <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md border border-yellow-300">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Product Management is the process of identifying, developing, and delivering products that meet customer needs while aligning with business goals. It involves:
              </p>
              <ul className="list-none pl-5 space-y-2 text-gray-700 mt-2">
                <li className="flex items-center gap-2 text-sm sm:text-base">
                  <span className="text-green-600">✅</span> Understanding user problems through research and data
                </li>
                <li className="flex items-center gap-2 text-sm sm:text-base">
                  <span className="text-green-600">✅</span> Defining product vision and strategy to solve those problems
                </li>
                <li className="flex items-center gap-2 text-sm sm:text-base">
                  <span className="text-green-600">✅</span> Collaborating with cross-functional teams
                </li>
                <li className="flex items-center gap-2 text-sm sm:text-base">
                  <span className="text-green-600">✅</span> Prioritizing features and initiatives based on business impact
                </li>
                <li className="flex items-center gap-2 text-sm sm:text-base">
                  <span className="text-green-600">✅</span> Measuring success using key product metrics
                </li>
              </ul>
              <div className="text-sm sm:text-base text-gray-700 bg-blue-50 p-3 sm:p-4 rounded-lg mt-4">
                <span className="text-blue-600 mr-1">👥</span> <strong>Example:</strong> Think about Spotify. A product manager helps decide new features (e.g., AI-generated playlists) and ensures they meet user needs.
              </div>
              <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-md">
                <h3 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
                  <span className="text-green-600">💡</span> Insights
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Product Managers drive strategy by aligning user needs with business goals, ensuring products deliver value.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Role & Responsibilities */}
        <div>
          <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-2 text-gray-800">
              <span className="text-purple-600">📋</span> Role & Responsibilities
            </h2>
            <button
              onClick={() => toggleSection('roles')}
              className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
              aria-expanded={openSections.roles}
              aria-controls="roles-section"
            >
              {openSections.roles ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className={`transition-all duration-500 overflow-hidden ${openSections.roles ? 'max-h-max' : 'max-h-0'}`}>
            <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md border border-yellow-300">
              <ul className="list-none pl-5 space-y-2 text-gray-700 mt-2">
                <li className="flex items-center gap-2 text-sm sm:text-base">
                  <span className="text-green-600">✅</span> Valuable – Solves a real problem for users
                </li>
                <li className="flex items-center gap-2 text-sm sm:text-base">
                  <span className="text-green-600">✅</span> Usable – Easy and enjoyable to use
                </li>
                <li className="flex items-center gap-2 text-sm sm:text-base">
                  <span className="text-green-600">✅</span> Feasible – Can be built within technical constraints
                </li>
              </ul>
              <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-md">
                <h3 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
                  <span className="text-green-600">💡</span> Insights
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Product Managers ensure products are valuable, usable, and feasible, balancing user needs with technical realities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Differences Between Roles */}
        <div>
          <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-2 text-gray-800">
              <span className="text-indigo-600">📊</span> Roles Comparison
            </h2>
            <button
              onClick={() => toggleSection('comparison')}
              className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
              aria-expanded={openSections.comparison}
              aria-controls="comparison-section"
            >
              {openSections.comparison ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className={`transition-all duration-500 overflow-hidden ${openSections.comparison ? 'max-h-max' : 'max-h-0'}`}>
            <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md border border-yellow-300">
              <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse border border-yellow-300 rounded-lg text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-yellow-100 text-gray-700">
                      <th className="border border-yellow-300 p-2 sm:p-3 text-left">Role</th>
                      <th className="border border-yellow-300 p-2 sm:p-3 text-left">Focus</th>
                      <th className="border border-yellow-300 p-2 sm:p-3 text-left">Key Responsibilities</th>
                      <th className="border border-yellow-300 p-2 sm:p-3 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white hover:bg-yellow-50">
                      <td className="border border-yellow-300 p-2 sm:p-3">Product Manager</td>
                      <td className="border border-yellow-300 p-2 sm:p-3">What to build and why</td>
                      <td className="border border-yellow-300 p-2 sm:p-3">Defines vision, strategy, and features</td>
                      <td className="border border-yellow-300 p-2 sm:p-3">Decides if Uber should launch a subscription plan</td>
                    </tr>
                    <tr className="bg-yellow-50 hover:bg-yellow-100">
                      <td className="border border-yellow-300 p-2 sm:p-3">Project Manager</td>
                      <td className="border border-yellow-300 p-2 sm:p-3">How to execute a plan</td>
                      <td className="border border-yellow-300 p-2 sm:p-3">Manages tasks, deadlines, and resources</td>
                      <td className="border border-yellow-300 p-2 sm:p-3">Ensures Uber’s engineering team delivers a feature on time</td>
                    </tr>
                    <tr className="bg-white hover:bg-yellow-50">
                      <td className="border border-yellow-300 p-2 sm:p-3">Program Manager</td>
                      <td className="border border-yellow-300 p-2 sm:p-3">Coordinating multiple projects</td>
                      <td className="border border-yellow-300 p-2 sm:p-3">Manages interdependencies</td>
                      <td className="border border-yellow-300 p-2 sm:p-3">Oversees all Uber driver experience projects</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Role Responsibility Scope:</h3>
                <div className="flex flex-col sm:flex-row gap-2">
                  {Object.keys(roleData).map((role, index) => (
                    <div key={index} className="flex-1">
                      <div className="text-xs sm:text-sm text-gray-700 text-center">{role}</div>
                      <div
                        className="bg-yellow-200 rounded"
                        style={{ height: `${roleScores[index]}px`, minHeight: '20px' }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-md">
                <h3 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
                  <span className="text-green-600">💡</span> Insights
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Understanding the distinct roles of Product, Project, and Program Managers ensures clear collaboration and effective product delivery.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Analogy: Building a House */}
        <div>
          <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-2 text-gray-800">
              <span className="text-orange-600">🏠</span> Analogy: Building a House
            </h2>
            <button
              onClick={() => toggleSection('analogy')}
              className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
              aria-expanded={openSections.analogy}
              aria-controls="analogy-section"
            >
              {openSections.analogy ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className={`transition-all duration-500 overflow-hidden ${openSections.analogy ? 'max-h-max' : 'max-h-0'}`}>
            <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md border border-yellow-300">
              <p className="text-sm sm:text-base text-gray-700 italic">
                Think of Product Management like building a house:
              </p>
              <p className="text-sm sm:text-base text-gray-700 mt-1">
                <strong>Product Manager:</strong> Decides what kind of house to build.
              </p>
              <p className="text-sm sm:text-base text-gray-700 mt-1">
                <strong>Project Manager:</strong> Ensures construction happens on time and within budget.
              </p>
              <p className="text-sm sm:text-base text-gray-700 mt-1">
                <strong>Program Manager:</strong> Oversees multiple housing projects in the city.
              </p>
              <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-md">
                <h3 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
                  <span className="text-green-600">💡</span> Insights
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  The house-building analogy clarifies how each role contributes uniquely to the product development process.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final Thoughts */}
        <div>
          <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-2 text-gray-800">
              <span className="text-green-600">🎯</span> Final Thoughts
            </h2>
            <button
              onClick={() => toggleSection('finalThoughts')}
              className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
              aria-expanded={openSections.finalThoughts}
              aria-controls="final-thoughts-section"
            >
              {openSections.finalThoughts ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className={`transition-all duration-500 overflow-hidden ${openSections.finalThoughts ? 'max-h-max' : 'max-h-0'}`}>
            <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md border border-yellow-300">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Product Management is about creating value, solving problems, and working cross-functionally. Understanding these roles is the first step in becoming an effective product leader.
              </p>
              <div className="mt-4 p-3 sm:p-4 bg-gray-50 border border-dashed border-yellow-300 rounded-lg">
                <h3 className="text-sm sm:text-base font-semibold mb-3">Quick Quiz</h3>
                <form onSubmit={handleQuizSubmit} className="flex flex-col gap-4">
                  <label className="block text-gray-700 font-medium text-sm sm:text-base">
                    Which role defines the product vision?
                  </label>
                  <select
                    value={quizAnswer}
                    onChange={(e) => setQuizAnswer(e.target.value)}
                    className="w-full border border-yellow-300 rounded-lg px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    aria-label="Select role for quiz"
                    required
                  >
                    <option value="" disabled>Select a role</option>
                    <option value="Product Manager">Product Manager</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="Program Manager">Program Manager</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    aria-label="Submit quiz answer"
                  >
                    Submit Answer
                  </button>
                </form>
                {quizFeedback && (
                  <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-md">
                    <p className="text-sm sm:text-base text-gray-700">{quizFeedback}</p>
                  </div>
                )}
              </div>
              <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-md">
                <h3 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
                  <span className="text-green-600">💡</span> Insights
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Mastering Product Management starts with understanding its role in creating user-focused, impactful products.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600 mt-6"
          aria-label="Reset introduction"
        >
          Reset
        </button>
      </section>
    </div>
  );
};

export default ProductManagementIntro;