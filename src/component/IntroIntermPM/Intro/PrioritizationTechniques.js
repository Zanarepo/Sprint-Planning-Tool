import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

/* ------------------- Tile Component ------------------- */
const Tile = ({ title, icon, children, tileId }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 sm:p-6 mb-6 shadow-md transition-all duration-300 hover:scale-105 w-full">
      <div
        className="flex items-center justify-between cursor-pointer py-2"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={tileId}
      >
        <div className="flex items-center space-x-3">
          <span className="text-yellow-600 text-xl sm:text-2xl">{icon}</span>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">{title}</h2>
        </div>
        <div className="text-lg font-semibold text-yellow-600">{open ? 'Hide' : 'Show'}</div>
      </div>
      <div className={`transition-all duration-500 overflow-hidden ${open ? 'max-h-max' : 'max-h-0'}`}>
        <div className="mt-3 text-gray-700 text-sm sm:text-base">{children}</div>
      </div>
    </div>
  );
};

/* ------------------- Simulation Component ------------------- */
const Simulation = ({ onReset }) => {
  const [projectType, setProjectType] = useState('');

  const recommendations = {
    MVP: 'For MVP development, the MoSCoW method is recommended to define the minimum necessary features.',
    Roadmap: 'For roadmap planning, the RICE scoring model is ideal to prioritize high-impact features with minimal effort.',
    Customer: 'For customer-focused development, the Kano model is best to balance basic needs with delight factors.',
  };

  const insights = {
    MVP: 'MoSCoW ensures a lean MVP by focusing on must-have features, speeding up delivery. 📋',
    Roadmap: 'RICE helps prioritize features that maximize impact and reach, aligning with long-term goals. 📊',
    Customer: 'Kano enhances user satisfaction by balancing essential and delightful features. 😊',
  };

  // Mock suitability scores for bar chart
  const suitabilityData = {
    MoSCoW: projectType === 'MVP' ? 80 : 50,
    RICE: projectType === 'Roadmap' ? 90 : 60,
    Kano: projectType === 'Customer' ? 85 : 55,
  };
  const maxSuitability = Math.max(...Object.values(suitabilityData), 1);
  const suitabilityScores = Object.keys(suitabilityData).map(
    (method) => (suitabilityData[method] / maxSuitability) * 100
  );

  const handleReset = () => {
    setProjectType('');
    onReset();
  };

  return (
    <Tile title="Scenario Simulation" icon="❓" tileId="simulation">
      <p className="mb-3 text-gray-600 text-sm sm:text-base">
        Select a project type to get a prioritization recommendation:
      </p>
      <select
        className="w-full p-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 bg-white text-sm sm:text-base transition-colors"
        value={projectType}
        onChange={(e) => setProjectType(e.target.value)}
        aria-label="Select project type"
      >
        <option value="">Select Project Type</option>
        <option value="MVP">MVP Development</option>
        <option value="Roadmap">Roadmap Planning</option>
        <option value="Customer">Customer-Focused Development</option>
      </select>
      {projectType && (
        <>
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm sm:text-base text-gray-700">
            {recommendations[projectType]}
          </div>
          <div className="mt-4">
            <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Method Suitability:</h4>
            <div className="flex flex-col sm:flex-row gap-2">
              {Object.keys(suitabilityData).map((method, index) => (
                <div key={index} className="flex-1">
                  <div className="text-xs sm:text-sm text-gray-700 text-center">{method}</div>
                  <div
                    className="bg-yellow-200 rounded"
                    style={{ height: `${suitabilityScores[index]}px`, minHeight: '20px' }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 p-3 bg-blue-50 rounded-md">
            <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
              <span className="text-green-600">💡</span> Insights
            </h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{insights[projectType]}</p>
          </div>
          <button
            onClick={handleReset}
            className="w-full sm:w-auto mt-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            aria-label="Reset simulation"
          >
            Reset Simulation
          </button>
        </>
      )}
    </Tile>
  );
};

/* ------------------- Quiz Component ------------------- */
const Quiz = ({ onReset }) => {
  const quizQuestions = [
    {
      question: 'Which method categorizes features as Must-Have, Should-Have, Could-Have, and Won’t-Have?',
      options: ['MoSCoW', 'RICE', 'Kano'],
      answer: 'MoSCoW',
      insight: 'MoSCoW is ideal for MVP prioritization by focusing on critical features.',
    },
    {
      question: 'Which method uses Reach, Impact, Confidence, and Effort for scoring?',
      options: ['MoSCoW', 'RICE', 'Kano'],
      answer: 'RICE',
      insight: 'RICE helps prioritize high-impact, low-effort features for roadmaps.',
    },
    {
      question: 'Which model focuses on customer delight vs. expectation?',
      options: ['MoSCoW', 'RICE', 'Kano'],
      answer: 'Kano',
      insight: 'Kano balances essential and delightful features for user satisfaction.',
    },
  ];

  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleOptionChange = (qIndex, value) => {
    setUserAnswers({ ...userAnswers, [qIndex]: value });
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setShowResults(false);
    onReset();
  };

  const score = quizQuestions.reduce((acc, q, index) => {
    return userAnswers[index] === q.answer ? acc + 1 : acc;
  }, 0);

  return (
    <Tile title="Test Your Knowledge" icon="❓" tileId="quiz">
      {quizQuestions.map((q, index) => (
        <div key={index} className="mb-4">
          <p className="font-medium text-sm sm:text-base text-gray-700 mb-2">
            {index + 1}. {q.question}
          </p>
          <div className="space-y-2">
            {q.options.map((option, i) => (
              <label key={i} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-600 border-gray-300 accent-yellow-600"
                  onChange={() => handleOptionChange(index, option)}
                  disabled={showResults}
                  aria-label={option}
                />
                <span className="text-sm sm:text-base text-gray-700">{option}</span>
              </label>
            ))}
          </div>
          {showResults && (
            <div className="mt-2 text-sm sm:text-base">
              <span className={userAnswers[index] === q.answer ? 'text-green-600' : 'text-red-600'}>
                Your Answer: {userAnswers[index] || 'Not Answered'}
              </span>
              <span className="ml-2"> | </span>
              <span className="text-green-600">Correct Answer: {q.answer}</span>
              <p className="mt-1 text-gray-700">{q.insight}</p>
            </div>
          )}
        </div>
      ))}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <button
          className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          onClick={() => setShowResults(true)}
          aria-label="Submit quiz answers"
        >
          Submit Answers
        </button>
        <button
          className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          onClick={handleResetQuiz}
          aria-label="Reset quiz"
        >
          Reset Quiz
        </button>
      </div>
      {showResults && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="font-medium text-sm sm:text-base text-gray-800 mb-3">
            Your Score: {score} / {quizQuestions.length}
          </p>
          <p className="text-sm sm:text-base text-gray-700">
            {score === quizQuestions.length
              ? 'Perfect! You’ve mastered prioritization techniques. 🎉'
              : 'Good effort! Review the insights to improve your understanding. 📚'}
          </p>
        </div>
      )}
    </Tile>
  );
};

/* ------------------- Main Prioritization Techniques Component ------------------- */
const PrioritizationTechniques = () => {
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setResetKey((prev) => prev + 1);
  };

  // Mock efficiency scores for bar charts
  const efficiencyData = {
    MoSCoW: 80,
    RICE: 90,
    Kano: 85,
  };
  const maxEfficiency = Math.max(...Object.values(efficiencyData), 1);
  const efficiencyScores = Object.keys(efficiencyData).map(
    (method) => (efficiencyData[method] / maxEfficiency) * 100
  );

  useEffect(() => {
    toast.info('Master Product Prioritization!', {
      toastId: 'welcome-prioritization',
      theme: 'light',
      style: { background: '#fef3c7', color: '#1f2937' },
    });
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans flex flex-col py-6 sm:py-8">
      <header className="mb-8 border-b border-yellow-200 flex-1">
        <div className="flex justify-between items-center mx-4 sm:mx-6 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800 tracking-tight">
            <span className="mr-2 text-2xl">📋</span>
            Product Prioritization Techniques
          </h1>
        
        </div>
        <div className="mx-4 sm:mx-6 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300 text-center">
          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
            Explore key techniques to prioritize features and tasks effectively in product management.
          </p>
        </div>
      </header>

      <section className="mx-4 sm:mx-6 flex-1 flex flex-col gap-4 sm:gap-6">
        <Simulation key={`simulation-${resetKey}`} onReset={handleReset} />
        <Tile title="MoSCoW Method" icon="📋" tileId="moscow">
          <p className="mb-3 text-sm sm:text-base text-gray-700">
            <strong>Overview:</strong> Categorizes features into four priority levels to streamline development.
          </p>
          <ul className="list-none ml-5 mb-3 space-y-1 text-sm sm:text-base text-gray-700">
            <li className="flex items-center gap-2"><span className="text-blue-600">✅</span> <strong>Must-Have:</strong> Critical features for product functionality.</li>
            <li className="flex items-center gap-2"><span className="text-blue-600">✅</span> <strong>Should-Have:</strong> Important but delayable features.</li>
            <li className="flex items-center gap-2"><span className="text-blue-600">✅</span> <strong>Could-Have:</strong> Enhancements that are nice to have.</li>
            <li className="flex items-center gap-2"><span className="text-blue-600">✅</span> <strong>Won’t-Have:</strong> Non-priority features for the current phase.</li>
          </ul>
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm sm:text-base text-gray-700">
            <strong>Example:</strong>
            <p>For a <strong>food delivery app</strong>:</p>
            <ul className="list-none ml-5 mt-2 space-y-1">
              <li className="flex items-center gap-2"><span className="text-blue-600">✅</span> <strong>Must-Have:</strong> Order placement, payment integration, restaurant listings.</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">✅</span> <strong>Should-Have:</strong> Order tracking, reviews & ratings.</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">✅</span> <strong>Could-Have:</strong> Dark mode, loyalty points.</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">✅</span> <strong>Won’t-Have:</strong> AR-based virtual dining experience.</li>
            </ul>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm sm:text-base text-gray-700">
            <strong>Use Case:</strong> Ideal for <em>MVP development</em> to focus on essential features.
          </div>
          <div className="mt-4">
            <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Prioritization Efficiency:</h4>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <div className="text-xs sm:text-sm text-gray-700 text-center">MoSCoW</div>
                <div className="bg-yellow-200 rounded" style={{ height: `${efficiencyScores[0]}px`, minHeight: '20px' }}></div>
              </div>
            </div>
          </div>
          <div className="mt-3 p-3 bg-blue-50 rounded-md">
            <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
              <span className="text-green-600">💡</span> Insights
            </h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              MoSCoW helps streamline MVP development by focusing on critical features, ensuring faster delivery.
            </p>
          </div>
        </Tile>
        <Tile title="RICE Scoring Model" icon="📊" tileId="rice">
          <p className="mb-3 text-sm sm:text-base text-gray-700">
            <strong>Overview:</strong> Prioritizes features by scoring based on four factors.
          </p>
          <ul className="list-none ml-5 mb-3 space-y-1 text-sm sm:text-base text-gray-700">
            <li className="flex items-center gap-2"><span className="text-blue-600">✅</span> <strong>R (Reach):</strong> Number of users impacted.</li>
            <li className="flex items-center gap-2"><span className="text-blue-600">✅</span> <strong>I (Impact):</strong> Significance of the benefit.</li>
            <li className="flex items-center gap-2"><span className="text-blue-600">✅</span> <strong>C (Confidence):</strong> Certainty of impact estimates.</li>
            <li className="flex items-center gap-2"><span className="text-blue-600">✅</span> <strong>E (Effort):</strong> Resources and time required.</li>
          </ul>
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm sm:text-base text-gray-700">
            <strong>Example:</strong>
            <p>For a <strong>fitness app</strong>:</p>
            <ol className="list-decimal ml-5 mt-2 space-y-2">
              <li>
                <strong>Personalized Workout Plans</strong> (RICE Score: 600)
                <ul className="list-none ml-5 mt-1 space-y-1">
                  <li className="flex items-center gap-2"><span className="text-blue-600">✅</span> Reach: 50,000 users</li>
                  <li className="flex items-center gap-2"><span className="text-blue-600">✅</span> Impact: 4/5</li>
                  <li className="flex items-center gap-2"><span className="text-blue-600">✅</span> Confidence: 80%</li>
                  <li className="flex items-center gap-2"><span className="text-blue-600">✅</span> Effort: 20 person-days</li>
                </ul>
              </li>
              <li>
                <strong>Live Trainer Support</strong> (RICE Score: 300)
                <ul className="list-none ml-5 mt-1 space-y-1">
                  <li className="flex items-center gap-2"><span className="text-blue-600">✅</span> Reach: 10,000 users</li>
                  <li className="flex items-center gap-2"><span className="text-blue-600">✅</span> Impact: 5/5</li>
                  <li className="flex items-center gap-2"><span className="text-blue-600">✅</span> Confidence: 60%</li>
                  <li className="flex items-center gap-2"><span className="text-blue-600">✅</span> Effort: 40 person-days</li>
                </ul>
              </li>
            </ol>
            <p className="mt-2"><strong>Personalized Workout Plans</strong> scores higher and should be prioritized.</p>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm sm:text-base text-gray-700">
            <strong>Use Case:</strong> Best for <em>roadmap planning</em> to prioritize high-impact, low-effort features.
          </div>
          <div className="mt-4">
            <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Prioritization Efficiency:</h4>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <div className="text-xs sm:text-sm text-gray-700 text-center">RICE</div>
                <div className="bg-yellow-200 rounded" style={{ height: `${efficiencyScores[1]}px`, minHeight: '20px' }}></div>
              </div>
            </div>
          </div>
          <div className="mt-3 p-3 bg-blue-50 rounded-md">
            <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
              <span className="text-green-600">💡</span> Insights
            </h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              RICE scoring optimizes roadmaps by prioritizing features with high reach and impact, minimizing effort.
            </p>
          </div>
        </Tile>
        <Tile title="Kano Model" icon="😊" tileId="kano">
          <p className="mb-3 text-sm sm:text-base text-gray-700">
            <strong>Overview:</strong> Categorizes features based on customer satisfaction and expectations.
          </p>
          <ul className="list-none ml-5 mb-3 space-y-1 text-sm sm:text-base text-gray-700">
            <li className="flex items-center gap-2"><span className="text-blue-600">✅</span> <strong>Basic Needs:</strong> Expected features (e.g., e-commerce search bar).</li>
            <li className="flex items-center gap-2"><span className="text-blue-600">✅</span> <strong>Performance Features:</strong> Better implementation, higher satisfaction (e.g., app speed).</li>
            <li className="flex items-center gap-2"><span className="text-blue-600">✅</span> <strong>Excitement Features:</strong> Unexpected delights (e.g., free next-day delivery).</li>
          </ul>
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm sm:text-base text-gray-700">
            <strong>Example:</strong>
            <p>For a <strong>music streaming app</strong>:</p>
            <ul className="list-none ml-5 mt-2 space-y-1">
              <li className="flex items-center gap-2"><span className="text-blue-600">✅</span> <strong>Basic Need:</strong> Play and pause songs.</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">✅</span> <strong>Performance Feature:</strong> High audio quality.</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">✅</span> <strong>Delighter:</strong> AI-powered song recommendations.</li>
            </ul>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm sm:text-base text-gray-700">
            <strong>Use Case:</strong> Perfect for <em>customer-focused development</em> to balance essentials and delights.
          </div>
          <div className="mt-4">
            <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Prioritization Efficiency:</h4>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <div className="text-xs sm:text-sm text-gray-700 text-center">Kano</div>
                <div className="bg-yellow-200 rounded" style={{ height: `${efficiencyScores[2]}px`, minHeight: '20px' }}></div>
              </div>
            </div>
          </div>
          <div className="mt-3 p-3 bg-blue-50 rounded-md">
            <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
              <span className="text-green-600">💡</span> Insights
            </h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Kano enhances user satisfaction by identifying features that delight customers beyond basic expectations.
            </p>
          </div>
        </Tile>
        <Quiz key={`quiz-${resetKey}`} onReset={handleReset} />
        <button
          onClick={handleReset}
          className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          aria-label="Reset all"
        >
          Reset All
        </button>
      </section>
    </div>
  );
};

export default PrioritizationTechniques;