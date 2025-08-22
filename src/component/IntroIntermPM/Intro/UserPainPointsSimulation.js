import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const UserPainPointsSimulation = () => {
  const [openSections, setOpenSections] = useState({
    overview: true,
    simulation: false,
    explanation: false,
  });
  const [painPoints, setPainPoints] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [category, setCategory] = useState('');
  const [solution, setSolution] = useState('');

  const handleAddPainPoint = () => {
    if (inputValue.trim() !== '' && category) {
      setPainPoints([...painPoints, { text: inputValue, category }]);
      setInputValue('');
      setCategory('');
    }
  };

  const simulateSolution = () => {
    const containsWaiting = painPoints.some((point) =>
      point.text.toLowerCase().includes('waiting')
    );
    const categories = painPoints.map((point) => point.category);
    if (containsWaiting) {
      setSolution(
        'Solution: Build an app that allows users to order instantly, minimizing wait times—just like Uber did for taxi services! 🚕'
      );
    } else if (categories.includes('Usability')) {
      setSolution(
        'Solution: Simplify the user interface or checkout process to make your product easier to use, addressing usability complaints. 🖱️'
      );
    } else if (categories.includes('Performance')) {
      setSolution(
        'Solution: Optimize product performance, such as faster delivery or loading times, to reduce user frustration. ⚡'
      );
    } else if (categories.includes('Cost')) {
      setSolution(
        'Solution: Offer budget-friendly options or discounts to address cost-related pain points. 💸'
      );
    } else {
      setSolution(
        'Solution: Analyze these pain points and brainstorm innovative ways to address them, such as new features or process improvements. 💡'
      );
    }
  };

  const handleReset = () => {
    setPainPoints([]);
    setInputValue('');
    setCategory('');
    setSolution('');
    setOpenSections((prev) => ({ ...prev, simulation: true }));
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Calculate category distribution for visualization
  const categoryCounts = painPoints.reduce((acc, point) => {
    acc[point.category] = (acc[point.category] || 0) + 1;
    return acc;
  }, {});
  const categories = ['Usability', 'Performance', 'Cost', 'Other'];
  const maxCount = Math.max(...Object.values(categoryCounts), 1);
  const categoryScores = categories.map((cat) => ((categoryCounts[cat] || 0) / maxCount) * 100);

  useEffect(() => {
    toast.info('Identify user pain points and find solutions!', {
      toastId: 'welcome-painpoints',
      theme: 'light',
      style: { background: '#fef3c7', color: '#1f2937' },
    });
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans flex flex-col">
      <header className="mb-8 border-b border-yellow-200 flex-1">
        <div className="flex justify-between items-center mx-4 sm:mx-6 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">👟</span>
            Understanding Users & Their Pain Points
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
              Identify user pain points by entering complaints and categorizing them, then generate tailored solutions to address these issues, just like Uber solved taxi wait times!
            </p>
          </div>
        </div>
      </header>

      <section className="mx-4 sm:mx-6 flex-1">
        {/* Simulation Form Section */}
        <div>
          <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center text-gray-800">
              <span className="mr-2 text-blue-600">🔍</span>
              User Pain Points Simulation
            </h2>
            <button
              onClick={() => toggleSection('simulation')}
              className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
              aria-expanded={openSections.simulation}
              aria-controls="simulation-section"
            >
              {openSections.simulation ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className={`transition-all duration-500 overflow-hidden ${openSections.simulation ? 'max-h-max' : 'max-h-0'}`}>
            <div className="mt-4 p-4 sm:p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300 flex flex-col gap-4 sm:gap-6">
              <div>
                <label className="block text-gray-700 font-medium text-sm sm:text-base mb-2">
                  Select a pain point category:
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-yellow-300 rounded-lg px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  required
                >
                  <option value="" disabled>Select category</option>
                  <option value="Usability">Usability</option>
                  <option value="Performance">Performance</option>
                  <option value="Cost">Cost</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium text-sm sm:text-base mb-2">
                  Enter a user pain point:
                </label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="e.g., Customers complain about waiting too long."
                  className="w-full border border-yellow-300 rounded-lg px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-600"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <button
                  onClick={handleAddPainPoint}
                  className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  aria-label="Add pain point"
                >
                  Add Pain Point
                </button>
                <button
                  onClick={simulateSolution}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  aria-label="Simulate solution"
                >
                  Simulate Solution
                </button>
                <button
                  onClick={handleReset}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  aria-label="Reset simulation"
                >
                  Reset
                </button>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Pain Points List:</h3>
                {painPoints.length === 0 ? (
                  <p className="text-sm sm:text-base text-gray-600">No pain points added yet.</p>
                ) : (
                  <ul className="list-none text-sm sm:text-base text-gray-700">
                    {painPoints.map((point, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="text-blue-600">{`${index + 1}️⃣`}</span>
                        {point.text} <span className="text-gray-500">({point.category})</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {painPoints.length > 0 && (
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Pain Point Categories:</h3>
                  <div className="flex flex-col sm:flex-row gap-2 mt-2">
                    {categories.map((cat, index) => (
                      <div key={index} className="flex-1">
                        <div className="text-xs sm:text-sm text-gray-700 text-center">{cat}</div>
                        <div
                          className="bg-yellow-200 rounded"
                          style={{ height: `${categoryScores[index]}px`, minHeight: '20px' }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {solution && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                  <h3 className="text-lg sm:text-xl font-bold text-green-800 flex items-center gap-2">
                    <span className="text-green-600">💡</span> Recommendation
                  </h3>
                  <p className="text-sm sm:text-base text-green-700 leading-relaxed">{solution}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Explanation Section */}
        <div>
          <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4 mt-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center text-gray-800">
              <span className="mr-2 text-red-600">❓</span>
              Why is this important?
            </h2>
            <button
              onClick={() => toggleSection('explanation')}
              className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
              aria-expanded={openSections.explanation}
              aria-controls="explanation-section"
            >
              {openSections.explanation ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className={`transition-all duration-500 overflow-hidden ${openSections.explanation ? 'max-h-max' : 'max-h-0'}`}>
            <div className="mt-4 p-4 sm:p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300 flex flex-col gap-4 sm:gap-6">
              <ul className="list-none text-sm sm:text-base text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-gray-600">👂</span> Listen to your customers' complaints.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-600">😤</span> Identify what frustrates them.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-600">✅</span> Create solutions that effectively address these issues.
                </li>
              </ul>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                <strong>Example:</strong> Uber realized people hated waiting for taxis 🚕, so they created an app to order rides instantly, transforming their business and the industry.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserPainPointsSimulation;