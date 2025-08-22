import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaPrint, FaStar } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/* Print Button Component */
const PrintButton = () => {
  return (
    <button
      onClick={() => window.print()}
      className="m-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg inline-flex items-center transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600"
      aria-label="Print this page"
    >
      <FaPrint className="mr-2 text-xl" />
      Print
    </button>
  );
};

/* Quiz Component */
const Quiz = ({ quizId, question, options, correctAnswer }) => {
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleOptionChange = (e) => {
    setSelected(e.target.value);
    setFeedback("");
  };

  const handleSubmit = () => {
    if (!selected) {
      setFeedback("Please select an answer.");
      return;
    }
    if (selected === correctAnswer) {
      setFeedback("Correct! 🎉");
    } else {
      setFeedback("Incorrect. Try again!");
    }
  };

  return (
    <div className="bg-yellow-50 p-4 sm:p-6 rounded-lg border border-yellow-300 mt-4 shadow-md">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">{question}</h3>
      {options.map((option, index) => (
        <label
          key={index}
          className="block mb-2 cursor-pointer text-gray-700 text-sm sm:text-base hover:bg-yellow-100 rounded p-1 transition duration-200"
        >
          <input
            type="radio"
            name={quizId}
            value={option.value}
            onChange={handleOptionChange}
            className="mr-2 accent-yellow-600 focus:ring-yellow-600"
          />
          {option.text}
        </label>
      ))}
      <button
        onClick={handleSubmit}
        className="mt-2 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
      >
        Submit Answer
      </button>
      {feedback && (
        <div
          className={`mt-2 font-bold text-sm sm:text-base animate-pulse ${
            feedback.startsWith("Correct") ? "text-green-600" : "text-red-600"
          }`}
        >
          {feedback}
        </div>
      )}
    </div>
  );
};

const NorthStarMetrics = () => {
  const [userEngagement, setUserEngagement] = useState(50);
  const [customerRetention, setCustomerRetention] = useState(50);
  const [revenue, setRevenue] = useState(50);
  const [openSections, setOpenSections] = useState({
    header: true,
    explanation: true,
    importance: true,
    keyMetrics: true,
    simulation: true,
  });

  const compositeMetric = ((userEngagement + customerRetention + revenue) / 3).toFixed(1);
  const projectedGrowth = (compositeMetric * (1.1 + compositeMetric / 1000)).toFixed(1);
  const feedbackMessage = compositeMetric > 80 ? 'Excellent! 🚀' : compositeMetric > 50 ? 'Good job! 👍' : 'Needs improvement ⚠️';

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const resetMetrics = () => {
    setUserEngagement(50);
    setCustomerRetention(50);
    setRevenue(50);
  };

  const randomizeMetrics = () => {
    setUserEngagement(Math.floor(Math.random() * 101));
    setCustomerRetention(Math.floor(Math.random() * 101));
    setRevenue(Math.floor(Math.random() * 101));
  };

  return (
    <div className="w-full max-w-5xl mx-auto min-h-screen bg-gray-50 font-sans p-4 sm:p-6">
      <PrintButton />

      {/* Header Section */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold flex items-center text-gray-800">
            <FaStar className="mr-2 text-xl sm:text-2xl" />
            North Star Metrics
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
          <div className="mt-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Understand the core value of your product through key performance indicators. These metrics help align your team’s efforts and drive growth.
            </p>
            <Quiz
              quizId="headerQuiz"
              question="What is the primary purpose of a North Star Metric?"
              options={[
                { value: "A", text: "To track all possible metrics" },
                { value: "B", text: "To focus on one key indicator of success" },
                { value: "C", text: "To measure hardware performance" },
                { value: "D", text: "To monitor server uptime" },
              ]}
              correctAnswer="B"
            />
          </div>
        </div>
      </section>

      {/* Explanation Section */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-xl sm:text-2xl">🎯</span>
            What are North Star Metrics?
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
          <div className="mt-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-md border border-yellow-300 animate-slide-in">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              North Star Metrics capture the primary value your product delivers. Rather than tracking dozens of metrics, you focus on one key indicator that best reflects your product’s success. This focus ensures every team member is working towards the same goal.
            </p>
            <Quiz
              quizId="explanationQuiz"
              question="Why is focusing on a single North Star Metric beneficial?"
              options={[
                { value: "A", text: "It increases server capacity" },
                { value: "B", text: "It aligns teams towards a common goal" },
                { value: "C", text: "It reduces the need for analytics" },
                { value: "D", text: "It automates data collection" },
              ]}
              correctAnswer="B"
            />
          </div>
        </div>
      </section>

      {/* Importance Section */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-xl sm:text-2xl">📈</span>
            Why They Matter
          </h2>
          <button
            onClick={() => toggleSection('importance')}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.importance}
            aria-controls="importance-section"
          >
            {openSections.importance ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.importance ? 'max-h-max' : 'max-h-0'}`}>
          <div className="mt-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-md border border-yellow-300 animate-slide-in">
            <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base space-y-2">
              <li><strong>Focus:</strong> Directs your team towards what truly matters.</li>
              <li><strong>Alignment:</strong> Ensures all departments work towards a common goal.</li>
              <li><strong>Growth:</strong> Helps you measure and drive product success over time.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Key Metrics Section */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-xl sm:text-2xl">👥</span>
            Key Metrics Explained
          </h2>
          <button
            onClick={() => toggleSection('keyMetrics')}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.keyMetrics}
            aria-controls="key-metrics-section"
          >
            {openSections.keyMetrics ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.keyMetrics ? 'max-h-max' : 'max-h-0'}`}>
          <div className="mt-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-md border border-yellow-300 animate-slide-in">
            <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base space-y-2">
              <li><strong>User Engagement:</strong> How actively users interact with your product.</li>
              <li><strong>Customer Retention:</strong> The percentage of users who continue using your product over time.</li>
              <li><strong>Revenue:</strong> The financial performance and market fit of your product.</li>
            </ul>
            <Quiz
              quizId="keyMetricsQuiz"
              question="Which metric measures how actively users interact with a product?"
              options={[
                { value: "A", text: "Revenue" },
                { value: "B", text: "Customer Retention" },
                { value: "C", text: "User Engagement" },
                { value: "D", text: "Projected Growth" },
              ]}
              correctAnswer="C"
            />
          </div>
        </div>
      </section>

      {/* Simulation Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-xl sm:text-2xl">💰</span>
            Interactive Simulation
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
          <div className="mt-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-md border border-yellow-300">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Adjust the sliders to simulate how changes in key metrics affect overall performance. This simulation includes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base mb-4 space-y-1">
              <li><strong>Composite Metric:</strong> The average of User Engagement, Customer Retention, and Revenue.</li>
              <li><strong>Projected Growth:</strong> An estimated growth rate based on the composite metric.</li>
            </ul>
            <div className="space-y-6">
              {/* User Engagement Slider */}
              <div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700 text-sm sm:text-base">User Engagement</span>
                  <span className="font-bold text-gray-800 text-sm sm:text-base">{userEngagement}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={userEngagement}
                  onChange={(e) => setUserEngagement(Number(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer accent-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  aria-label="Adjust User Engagement"
                />
              </div>
              {/* Customer Retention Slider */}
              <div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700 text-sm sm:text-base">Customer Retention</span>
                  <span className="font-bold text-gray-800 text-sm sm:text-base">{customerRetention}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={customerRetention}
                  onChange={(e) => setCustomerRetention(Number(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer accent-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  aria-label="Adjust Customer Retention"
                />
              </div>
              {/* Revenue Slider */}
              <div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700 text-sm sm:text-base">Revenue</span>
                  <span className="font-bold text-gray-800 text-sm sm:text-base">{revenue}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer accent-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  aria-label="Adjust Revenue"
                />
              </div>
            </div>
            <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-300">
              <p className="text-sm sm:text-base text-gray-700">
                <strong>Composite Metric:</strong> {compositeMetric} <br />
                <strong>Projected Growth:</strong> {projectedGrowth}% <br />
                <strong>Feedback:</strong>{' '}
                <span
                  className={`font-bold ${
                    compositeMetric > 80 ? 'text-green-600' : compositeMetric > 50 ? 'text-yellow-600' : 'text-red-600'
                  }`}
                >
                  {feedbackMessage}
                </span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
              <button
                onClick={resetMetrics}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                aria-label="Reset metrics to default"
              >
                Reset
              </button>
              <button
                onClick={randomizeMetrics}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                aria-label="Randomize metrics"
              >
                Randomize
              </button>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mt-6 mb-4">Metrics Visualization</h3>
            <div className="w-full h-64 sm:h-80">
              <Bar
                data={{
                  labels: ['User Engagement', 'Customer Retention', 'Revenue'],
                  datasets: [
                    {
                      label: 'Metrics',
                      data: [userEngagement, customerRetention, revenue],
                      backgroundColor: ['#d97706', '#f59e0b', '#eab308'],
                      borderColor: ['#b45309', '#d97706', '#ca8a04'],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      title: { display: true, text: 'Value', font: { size: 12 } },
                      ticks: { font: { size: 10 } },
                    },
                    x: {
                      title: { display: true, text: 'Metric', font: { size: 12 } },
                      ticks: { font: { size: 10 } },
                    },
                  },
                  plugins: {
                    legend: { display: false },
                    tooltip: { bodyFont: { size: 10 } },
                  },
                }}
              />
            </div>
            <Quiz
              quizId="simulationQuiz"
              question="What does the Composite Metric represent in this simulation?"
              options={[
                { value: "A", text: "The sum of all metrics" },
                { value: "B", text: "The average of User Engagement, Customer Retention, and Revenue" },
                { value: "C", text: "The highest metric value" },
                { value: "D", text: "The projected revenue" },
              ]}
              correctAnswer="B"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default NorthStarMetrics;