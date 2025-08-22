import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CompetitiveAnalysisSimulation = () => {
  const [openSections, setOpenSections] = useState({
    overview: true,
    simulation: false,
    insights: false,
  });
  const [yourCustomers, setYourCustomers] = useState(50);
  const [competitorCustomers, setCompetitorCustomers] = useState(100);
  const [yourQuality, setYourQuality] = useState(50);
  const [competitorQuality, setCompetitorQuality] = useState(70);
  const [yourPrice, setYourPrice] = useState(3);
  const [competitorPrice, setCompetitorPrice] = useState(2.5);
  const [yourSatisfaction, setYourSatisfaction] = useState(60);
  const [competitorSatisfaction, setCompetitorSatisfaction] = useState(80);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleReset = () => {
    setYourCustomers(50);
    setCompetitorCustomers(100);
    setYourQuality(50);
    setCompetitorQuality(70);
    setYourPrice(3);
    setCompetitorPrice(2.5);
    setYourSatisfaction(60);
    setCompetitorSatisfaction(80);
    setOpenSections((prev) => ({ ...prev, simulation: true, insights: true }));
  };

  // Generate insights based on comparisons
  const generateInsights = () => {
    const insights = [];
    if (competitorCustomers > yourCustomers) {
      insights.push(
        'Your competitor attracts more customers. Consider boosting marketing efforts with social media campaigns or offering promotions to increase foot traffic. 📢'
      );
    } else {
      insights.push('Great job! Your stand attracts more customers than the competitor. Keep engaging your audience to maintain this edge. 👍');
    }
    if (competitorQuality > yourQuality) {
      insights.push(
        'Your competitor’s lemonade quality is superior. Refine your recipe, source better ingredients, or improve service to close the gap. 🍋'
      );
    } else {
      insights.push('Excellent! Your lemonade quality surpasses the competitor’s. Continue focusing on high-quality offerings. 🌟');
    }
    if (competitorPrice < yourPrice) {
      insights.push(
        'Your competitor offers lower prices. Consider adjusting your pricing strategy or highlighting unique value to justify costs. 💸'
      );
    } else {
      insights.push('Your pricing is competitive! Maintain or slightly adjust prices to stay attractive to customers. 💰');
    }
    if (competitorSatisfaction > yourSatisfaction) {
      insights.push(
        'Your competitor has higher customer satisfaction. Implement loyalty programs or enhance customer experience to boost satisfaction. 😊'
      );
    } else {
      insights.push('Fantastic! Your customers are more satisfied than your competitor’s. Keep prioritizing customer experience. 🎉');
    }
    return insights.length > 0
      ? insights.join(' ')
      : 'Great job! Your lemonade stand is performing well across all metrics. Continue to monitor the market and innovate to stay ahead. 🚀';
  };

  // Data for visualization
  const metrics = [
    { name: 'Customers', yourValue: yourCustomers, competitorValue: competitorCustomers, max: 200 },
    { name: 'Quality', yourValue: yourQuality, competitorValue: competitorQuality, max: 100 },
    { name: 'Price ($)', yourValue: yourPrice, competitorValue: competitorPrice, max: 5 },
    { name: 'Satisfaction', yourValue: yourSatisfaction, competitorValue: competitorSatisfaction, max: 100 },
  ];
  const insightText = generateInsights();

  useEffect(() => {
    toast.info('Analyze your lemonade stand vs. the competition!', {
      toastId: 'welcome-competitive',
      theme: 'light',
      style: { background: '#fef3c7', color: '#1f2937' },
    });
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans flex flex-col">
      <header className="mb-8 border-b border-yellow-200 flex-1">
        <div className="flex justify-between items-center mx-4 sm:mx-6 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">🍋</span>
            Competitive Analysis & Benchmarking
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
              Compare your lemonade stand to a competitor’s by adjusting metrics like customers, quality, price, and satisfaction. Get tailored insights to improve your strategy!
            </p>
            <ul className="mt-2 list-none text-sm sm:text-base text-gray-700 text-left max-w-xl mx-auto">
              <li className="flex items-center gap-2"><span className="text-blue-600">👀</span> Look at what your competitors do well.</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">🚀</span> Figure out how to be even better.</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">❌</span> Learn from their mistakes.</li>
            </ul>
          </div>
        </div>
      </header>

      <section className="mx-4 sm:mx-6 flex-1">
        {/* Simulation Dashboard Section */}
        <div>
          <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center text-gray-800">
              <span className="mr-2 text-blue-600">📊</span>
              Simulation Dashboard
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Your Lemonade Stand */}
                <div className="p-4 rounded-lg border border-yellow-300">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="text-yellow-600">🍋</span> Your Lemonade Stand
                  </h3>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm sm:text-base">
                      Daily Customers: <span className="font-bold">{yourCustomers}</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={yourCustomers}
                      onChange={(e) => setYourCustomers(Number(e.target.value))}
                      className="w-full accent-yellow-600"
                      aria-label="Your daily customers"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm sm:text-base">
                      Lemonade Quality: <span className="font-bold">{yourQuality}</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={yourQuality}
                      onChange={(e) => setYourQuality(Number(e.target.value))}
                      className="w-full accent-yellow-600"
                      aria-label="Your lemonade quality"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm sm:text-base">
                      Price per Cup ($): <span className="font-bold">{yourPrice.toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="0.1"
                      value={yourPrice}
                      onChange={(e) => setYourPrice(Number(e.target.value))}
                      className="w-full accent-yellow-600"
                      aria-label="Your price per cup"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm sm:text-base">
                      Customer Satisfaction: <span className="font-bold">{yourSatisfaction}</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={yourSatisfaction}
                      onChange={(e) => setYourSatisfaction(Number(e.target.value))}
                      className="w-full accent-yellow-600"
                      aria-label="Your customer satisfaction"
                    />
                  </div>
                </div>
                {/* Competitor's Lemonade Stand */}
                <div className="p-4 rounded-lg border border-yellow-300">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="text-yellow-600">🍋</span> Competitor's Lemonade Stand
                  </h3>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm sm:text-base">
                      Daily Customers: <span className="font-bold">{competitorCustomers}</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={competitorCustomers}
                      onChange={(e) => setCompetitorCustomers(Number(e.target.value))}
                      className="w-full accent-yellow-600"
                      aria-label="Competitor's daily customers"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm sm:text-base">
                      Lemonade Quality: <span className="font-bold">{competitorQuality}</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={competitorQuality}
                      onChange={(e) => setCompetitorQuality(Number(e.target.value))}
                      className="w-full accent-yellow-600"
                      aria-label="Competitor's lemonade quality"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm sm:text-base">
                      Price per Cup ($): <span className="font-bold">{competitorPrice.toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="0.1"
                      value={competitorPrice}
                      onChange={(e) => setCompetitorPrice(Number(e.target.value))}
                      className="w-full accent-yellow-600"
                      aria-label="Competitor's price per cup"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm sm:text-base">
                      Customer Satisfaction: <span className="font-bold">{competitorSatisfaction}</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={competitorSatisfaction}
                      onChange={(e) => setCompetitorSatisfaction(Number(e.target.value))}
                      className="w-full accent-yellow-600"
                      aria-label="Competitor's customer satisfaction"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                aria-label="Reset simulation"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Insights Section */}
        <div>
          <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4 mt-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center text-gray-800">
              <span className="mr-2 text-green-600">💡</span>
              Insights & Recommendations
            </h2>
            <button
              onClick={() => toggleSection('insights')}
              className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
              aria-expanded={openSections.insights}
              aria-controls="insights-section"
            >
              {openSections.insights ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className={`transition-all duration-500 overflow-hidden ${openSections.insights ? 'max-h-max' : 'max-h-0'}`}>
            <div className="mt-4 p-4 sm:p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300 flex flex-col gap-4 sm:gap-6">
              <div className="p-4 bg-blue-50 rounded-md">
                <h3 className="text-lg sm:text-xl font-bold text-blue-800 flex items-center gap-2">
                  <span className="text-green-600">💡</span> Recommendations
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{insightText}</p>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Metric Comparison:</h3>
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                  {metrics.map((metric, index) => (
                    <div key={index} className="flex-1">
                      <div className="text-xs sm:text-sm text-gray-700 text-center">{metric.name}</div>
                      <div className="flex gap-1">
                        <div className="flex-1">
                          <div className="text-xs sm:text-sm text-gray-700 text-center">You</div>
                          <div
                            className="bg-yellow-200 rounded"
                            style={{ height: `${(metric.yourValue / metric.max) * 100}px`, minHeight: '20px' }}
                          ></div>
                        </div>
                        <div className="flex-1">
                          <div className="text-xs sm:text-sm text-gray-700 text-center">Competitor</div>
                          <div
                            className="bg-blue-200 rounded"
                            style={{ height: `${(metric.competitorValue / metric.max) * 100}px`, minHeight: '20px' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompetitiveAnalysisSimulation;