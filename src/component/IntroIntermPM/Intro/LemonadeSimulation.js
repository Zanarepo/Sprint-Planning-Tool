import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';

const LemonadeSimulation = () => {
  const [openSections, setOpenSections] = useState({
    overview: false,
    sales: false,
    insights: false,
    actions: false,
  });
  const [strawberrySales, setStrawberrySales] = useState(300);
  const [classicSales, setClassicSales] = useState(150);
  const [strawberryCost, setStrawberryCost] = useState(1);
  const [classicCost, setClassicCost] = useState(0.75);
  const [retentionRate, setRetentionRate] = useState(70);
  const [profit, setProfit] = useState(0);
  const [recommendation, setRecommendation] = useState("");

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleReset = () => {
    setStrawberrySales(300);
    setClassicSales(150);
    setStrawberryCost(1);
    setClassicCost(0.75);
    setRetentionRate(70);
    setOpenSections((prev) => ({ ...prev, sales: true, insights: true, actions: true }));
  };

  useEffect(() => {
    const strawberryProfit = strawberrySales * (2 - strawberryCost);
    const classicProfit = classicSales * (1.5 - classicCost);
    const totalProfit = strawberryProfit + classicProfit;
    setProfit(totalProfit);

    const insights = [];
    if (strawberrySales > classicSales) {
      insights.push('Strawberry Lemonade 🍓 is selling better. Increase its production to capitalize on demand.');
    } else if (classicSales > strawberrySales) {
      insights.push('Classic Lemonade 🍋 is selling better. Increase its production to meet demand.');
    } else {
      insights.push('Sales are balanced between flavors. Consider diversifying offerings to attract new customers.');
    }
    if (strawberryProfit / strawberrySales < 0.5 || classicProfit / classicSales < 0.5) {
      insights.push('Profit margins are low. Optimize production costs or adjust pricing to improve profitability.');
    }
    if (retentionRate < 80) {
      insights.push('Customer retention is below industry standards. Implement loyalty programs or improve customer experience to boost repeat purchases.');
    } else {
      insights.push('Strong customer retention! Maintain high-quality service to keep customers returning.');
    }
    setRecommendation(insights.join(' '));
  }, [strawberrySales, classicSales, strawberryCost, classicCost, retentionRate]);

  useEffect(() => {
    toast.info('Track your lemonade sales and optimize!', {
      toastId: 'welcome-lemonade',
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
            Lemonade Sales Simulation
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
              Track and optimize your lemonade stand by adjusting sales, costs, and retention metrics. Use real-time data to make informed business decisions and boost profits! 🍓🍋
            </p>
          </div>
        </div>
      </header>

      <section className="mx-4 sm:mx-6 flex-1">
        {/* Sales Data Section */}
        <div>
          <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center text-gray-800">
              <span className="mr-2 text-blue-600">📊</span>
              Sales Data
            </h2>
            <button
              onClick={() => toggleSection('sales')}
              className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
              aria-expanded={openSections.sales}
              aria-controls="sales-section"
            >
              {openSections.sales ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className={`transition-all duration-500 overflow-hidden ${openSections.sales ? 'max-h-max' : 'max-h-0'}`}>
            <div className="mt-4 p-4 sm:p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300 flex flex-col gap-4 sm:gap-6">
              {/* TODO: Replace with a chart component such as react-chartjs-2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="p-4 bg-white rounded-lg shadow-md text-center border border-yellow-300">
                  <h3 className="text-lg sm:text-xl font-semibold text-red-600 flex items-center gap-2 justify-center">
                    <span>🍓</span> Strawberry Lemonade
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 font-bold">{strawberrySales} cups sold</p>
                  <div className="mt-2">
                    <label className="block text-gray-700 text-sm sm:text-base">
                      Sales: <span className="font-bold">{strawberrySales}</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={strawberrySales}
                      onChange={(e) => setStrawberrySales(Number(e.target.value))}
                      className="w-full accent-yellow-600"
                      aria-label="Strawberry lemonade sales"
                    />
                  </div>
                  <div className="mt-2">
                    <label className="block text-gray-700 text-sm sm:text-base">
                      Cost per Cup ($): <span className="font-bold">{strawberryCost.toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={strawberryCost}
                      onChange={(e) => setStrawberryCost(Number(e.target.value))}
                      className="w-full accent-yellow-600"
                      aria-label="Strawberry lemonade cost"
                    />
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md text-center border border-yellow-300">
                  <h3 className="text-lg sm:text-xl font-semibold text-yellow-600 flex items-center gap-2 justify-center">
                    <span>🍋</span> Classic Lemonade
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 font-bold">{classicSales} cups sold</p>
                  <div className="mt-2">
                    <label className="block text-gray-700 text-sm sm:text-base">
                      Sales: <span className="font-bold">{classicSales}</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={classicSales}
                      onChange={(e) => setClassicSales(Number(e.target.value))}
                      className="w-full accent-yellow-600"
                      aria-label="Classic lemonade sales"
                    />
                  </div>
                  <div className="mt-2">
                    <label className="block text-gray-700 text-sm sm:text-base">
                      Cost per Cup ($): <span className="font-bold">{classicCost.toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={classicCost}
                      onChange={(e) => setClassicCost(Number(e.target.value))}
                      className="w-full accent-yellow-600"
                      aria-label="Classic lemonade cost"
                    />
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-md border border-yellow-300">
                <label className="block text-gray-700 text-sm sm:text-base">
                  Customer Retention Rate (%): <span className="font-bold">{retentionRate}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={retentionRate}
                  onChange={(e) => setRetentionRate(Number(e.target.value))}
                  className="w-full accent-yellow-600"
                  aria-label="Customer retention rate"
                />
              </div>
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
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{recommendation}</p>
                <p className="text-sm sm:text-base text-green-600 font-semibold mt-2">
                  Total Profit: ${profit.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div>
          <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4 mt-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center text-gray-800">
              <span className="mr-2 text-yellow-600">⚙️</span>
              Actions
            </h2>
            <button
              onClick={() => toggleSection('actions')}
              className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
              aria-expanded={openSections.actions}
              aria-controls="actions-section"
            >
              {openSections.actions ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className={`transition-all duration-500 overflow-hidden ${openSections.actions ? 'max-h-max' : 'max-h-0'}`}>
            <div className="mt-4 p-4 sm:p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300 flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button
                onClick={() => setStrawberrySales(strawberrySales + 50)}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                aria-label="Produce more strawberry lemonade"
              >
                Produce More 🍓
              </button>
              <button
                onClick={() => setClassicSales(classicSales + 50)}
                className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                aria-label="Produce more classic lemonade"
              >
                Produce More 🍋
              </button>
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
      </section>
    </div>
  );
};

export default LemonadeSimulation;