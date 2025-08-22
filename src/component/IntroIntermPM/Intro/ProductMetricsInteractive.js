import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

/* ------------------- Accordion Component ------------------- */
const Accordion = ({ title, icon, children, accordionId }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border border-yellow-300 rounded-lg my-2 shadow-md">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-4 cursor-pointer bg-gradient-to-r from-yellow-50 to-yellow-100 hover:bg-yellow-100 transition-all duration-300"
        aria-expanded={isOpen}
        aria-controls={accordionId}
      >
        <div className="flex items-center">
          <span className="mr-3 text-yellow-600 text-xl sm:text-2xl">{icon}</span>
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">{title}</h3>
        </div>
        <div className="text-lg font-semibold text-yellow-600">{isOpen ? '−' : '+'}</div>
      </div>
      <div className={`transition-all duration-500 overflow-hidden ${isOpen ? 'max-h-max' : 'max-h-0'}`}>
        <div className="p-4 text-gray-700 text-sm sm:text-base">{children}</div>
      </div>
    </div>
  );
};

/* ------------------- Overview Component ------------------- */
const OverviewComponent = () => {
  const insights = {
    'North Star Metric': 'The North Star Metric guides product strategy by focusing on core value delivery. ⭐',
    Retention: 'Retention ensures long-term user engagement, critical for sustainable growth. 👥',
    Conversion: 'Conversion rates highlight the effectiveness of user journeys and CTAs. ✅',
    Engagement: 'High engagement indicates a sticky product that keeps users coming back. 📈',
    Acquisition: 'Effective acquisition strategies drive user growth through optimal channels. 🔍',
    Activation: 'A strong activation experience sets the tone for user satisfaction. ✨',
    Revenue: 'Revenue metrics reflect the financial health of your product. 💰',
    Referral: 'Referrals amplify growth through organic, user-driven promotion. 🔗',
  };

  return (
    <div>
      {/* North Star Metric */}
      <Accordion title="North Star Metric" icon="⭐" accordionId="north-star">
        <p className="mb-2 text-sm sm:text-base">
          <strong>What It Is:</strong> The single most important metric that reflects the product’s core value.
        </p>
        <p className="mb-2 text-sm sm:text-base">
          <strong>Example/Use Case:</strong>
        </p>
        <ul className="list-none ml-6 space-y-1 text-sm sm:text-base">
          <li className="flex items-center gap-2">
            <span className="text-blue-600">✅</span> For a <em>social networking app</em>, it might be <strong>Daily Active Users (DAU)</strong> – showing how often users engage.
          </li>
          <li className="flex items-center gap-2">
            <span className="text-blue-600">✅</span> For an <em>e-commerce platform</em>, it could be <strong>number of purchases per month</strong> that drives revenue.
          </li>
        </ul>
        <div className="mt-3 p-3 bg-blue-50 rounded-md">
          <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
            <span className="text-green-600">💡</span> Insights
          </h4>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{insights['North Star Metric']}</p>
        </div>
      </Accordion>

      {/* Key Business Metrics */}
      <Accordion title="Key Business Metrics" icon="📈" accordionId="business-metrics">
        <p className="mb-2 text-sm sm:text-base">
          These metrics provide insights into the entire user journey:
        </p>
        <Accordion title="Retention" icon="👥" accordionId="retention">
          <p className="text-sm sm:text-base">
            <strong>Definition:</strong> The percentage of users who continue using the product over time.
          </p>
          <p className="mt-2 text-sm sm:text-base">
            <strong>Example/Use Case:</strong> A streaming service monitors monthly retention rates to determine if users return – helping guide content updates or personalized recommendations.
          </p>
          <div className="mt-3 p-3 bg-blue-50 rounded-md">
            <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
              <span className="text-green-600">💡</span> Insights
            </h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{insights['Retention']}</p>
          </div>
        </Accordion>
        <Accordion title="Conversion" icon="✅" accordionId="conversion">
          <p className="text-sm sm:text-base">
            <strong>Definition:</strong> The percentage of users who complete a desired action (e.g., sign up, purchase, subscribe).
          </p>
          <p className="mt-2 text-sm sm:text-base">
            <strong>Example/Use Case:</strong> An e-commerce website might track the conversion rate on product pages to see if design changes boost sales.
          </p>
          <div className="mt-3 p-3 bg-blue-50 rounded-md">
            <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
              <span className="text-green-600">💡</span> Insights
            </h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{insights['Conversion']}</p>
          </div>
        </Accordion>
        <Accordion title="Engagement" icon="📈" accordionId="engagement">
          <p className="text-sm sm:text-base">
            <strong>Definition:</strong> How actively users interact with your product (e.g., time spent, frequency of visits).
          </p>
          <p className="mt-2 text-sm sm:text-base">
            <strong>Example/Use Case:</strong> A mobile game measures session length and frequency to decide if new challenges or rewards keep players engaged.
          </p>
          <div className="mt-3 p-3 bg-blue-50 rounded-md">
            <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
              <span className="text-green-600">💡</span> Insights
            </h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{insights['Engagement']}</p>
          </div>
        </Accordion>
      </Accordion>

      {/* AARRR Framework */}
      <Accordion title="AARRR Framework" icon="🔗" accordionId="aarrr">
        <p className="mb-2 text-sm sm:text-base">
          The AARRR framework breaks down the customer lifecycle into five stages:
        </p>
        <Accordion title="Acquisition" icon="🔍" accordionId="acquisition">
          <p className="text-sm sm:text-base">
            <strong>What It Is:</strong> How users discover your product.
          </p>
          <p className="mt-2 text-sm sm:text-base">
            <strong>Example/Use Case:</strong> Tracking sign-ups from organic search, social media, and paid ads helps identify the most effective channels.
          </p>
          <div className="mt-3 p-3 bg-blue-50 rounded-md">
            <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
              <span className="text-green-600">💡</span> Insights
            </h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{insights['Acquisition']}</p>
          </div>
        </Accordion>
        <Accordion title="Activation" icon="✨" accordionId="activation">
          <p className="text-sm sm:text-base">
            <strong>What It Is:</strong> The initial user experience that leads to a “happy” moment.
          </p>
          <p className="mt-2 text-sm sm:text-base">
            <strong>Example/Use Case:</strong> For a SaaS tool, activation might be defined as completing an onboarding tutorial or using a key feature.
          </p>
          <div className="mt-3 p-3 bg-blue-50 rounded-md">
            <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
              <span className="text-green-600">💡</span> Insights
            </h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{insights['Activation']}</p>
          </div>
        </Accordion>
        <Accordion title="Retention" icon="🔄" accordionId="retention-aarrr">
          <p className="text-sm sm:text-base">
            <strong>What It Is:</strong> The percentage of users who return after their initial experience.
          </p>
          <p className="mt-2 text-sm sm:text-base">
            <strong>Example/Use Case:</strong> Monitoring weekly active users to see if updates are making the product “sticky.”
          </p>
          <div className="mt-3 p-3 bg-blue-50 rounded-md">
            <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
              <span className="text-green-600">💡</span> Insights
            </h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{insights['Retention']}</p>
          </div>
        </Accordion>
        <Accordion title="Revenue" icon="💰" accordionId="revenue">
          <p className="text-sm sm:text-base">
            <strong>What It Is:</strong> How the product generates income.
          </p>
          <p className="mt-2 text-sm sm:text-base">
            <strong>Example/Use Case:</strong> A subscription service might track Monthly Recurring Revenue (MRR) to assess the impact of pricing changes.
          </p>
          <div className="mt-3 p-3 bg-blue-50 rounded-md">
            <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
              <span className="text-green-600">💡</span> Insights
            </h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{insights['Revenue']}</p>
          </div>
        </Accordion>
        <Accordion title="Referral" icon="🔗" accordionId="referral">
          <p className="text-sm sm:text-base">
            <strong>What It Is:</strong> How often users recommend the product to others.
          </p>
          <p className="mt-2 text-sm sm:text-base">
            <strong>Example/Use Case:</strong> A referral program that rewards users for inviting friends can be monitored to measure word-of-mouth growth.
          </p>
          <div className="mt-3 p-3 bg-blue-50 rounded-md">
            <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
              <span className="text-green-600">💡</span> Insights
            </h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{insights['Referral']}</p>
          </div>
        </Accordion>
      </Accordion>
    </div>
  );
};

/* ------------------- Quiz Component ------------------- */
const QuizComponent = ({ onReset }) => {
  const questions = [
    {
      question: 'Which metric reflects the product’s core value?',
      options: ['Retention', 'Conversion', 'North Star Metric', 'Engagement'],
      answer: 'North Star Metric',
      insight: 'The North Star Metric drives strategic focus by capturing the product’s core value.',
    },
    {
      question: 'Which metric measures the percentage of users who complete a desired action?',
      options: ['Engagement', 'Conversion', 'Referral', 'Acquisition'],
      answer: 'Conversion',
      insight: 'Conversion rates are key to optimizing user journeys and driving desired actions.',
    },
    {
      question: 'In the AARRR framework, which stage focuses on how users discover your product?',
      options: ['Activation', 'Acquisition', 'Revenue', 'Retention'],
      answer: 'Acquisition',
      insight: 'Acquisition metrics help identify the most effective channels for user growth.',
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswer = () => {
    if (selected === '') {
      setFeedback('Please select an answer.');
      return;
    }
    if (selected === questions[currentQuestion].answer) {
      setFeedback(`Correct! ${questions[currentQuestion].insight}`);
      setScore(score + 1);
    } else {
      setFeedback(`Incorrect. The correct answer is: ${questions[currentQuestion].answer}. ${questions[currentQuestion].insight}`);
    }
  };

  const handleNext = () => {
    setFeedback('');
    setSelected('');
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestion(0);
    setSelected('');
    setFeedback('');
    setScore(0);
    setQuizFinished(false);
    onReset();
  };

  return (
    <div className="w-full p-4 sm:p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300">
      {quizFinished ? (
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Quiz Finished!</h2>
          <p className="text-base sm:text-lg text-gray-700">
            Your Score: {score} / {questions.length}
          </p>
          <p className="text-sm sm:text-base text-gray-700 mt-2">
            {score === questions.length
              ? 'Perfect! You’ve mastered product metrics. 🎉'
              : 'Good effort! Review the insights to deepen your understanding. 📚'}
          </p>
          <button
            onClick={handleResetQuiz}
            className="mt-4 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            aria-label="Reset quiz"
          >
            Reset Quiz
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-gray-800">
            {questions[currentQuestion].question}
          </h2>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option}
                onClick={() => setSelected(option)}
                className={`w-full text-left p-2 sm:p-3 border border-yellow-300 rounded-lg hover:bg-yellow-100 transition-all duration-300 text-sm sm:text-base ${
                  selected === option ? 'bg-yellow-100' : ''
                }`}
                aria-label={`Select ${option}`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4">
            <button
              onClick={handleAnswer}
              disabled={selected === ''}
              className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white rounded-lg transition duration-300 hover:scale-105 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-yellow-600"
              aria-label="Submit answer"
            >
              Submit Answer
            </button>
            <button
              onClick={handleNext}
              disabled={feedback === ''}
              className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white rounded-lg transition duration-300 hover:scale-105 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-yellow-600"
              aria-label="Next question"
            >
              Next
            </button>
          </div>
          {feedback && (
            <p className="mt-2 text-sm sm:text-base font-medium text-gray-700">{feedback}</p>
          )}
        </div>
      )}
    </div>
  );
};

/* ------------------- Simulation Component ------------------- */
const SimulationComponent = ({ onReset }) => {
  const [acquisition, setAcquisition] = useState(1000);
  const [activation, setActivation] = useState(500);
  const [retention, setRetention] = useState(50);
  const [revenue, setRevenue] = useState(200);
  const [referral, setReferral] = useState(30);

  const growthScore =
    Math.round(
      (acquisition * 0.2 +
        activation * 0.3 +
        retention * 0.2 +
        revenue * 0.2 +
        referral * 0.1) *
        10
    ) / 10;

  const metricsData = {
    Acquisition: acquisition,
    Activation: activation,
    Retention: retention,
    Revenue: revenue,
    Referral: referral,
  };
  const maxMetric = Math.max(...Object.values(metricsData), 1);
  const metricScores = Object.keys(metricsData).map(
    (metric) => (metricsData[metric] / maxMetric) * 100
  );

  const generateInsight = () => {
    if (growthScore > 800) {
      return 'A high growth score indicates strong user engagement and revenue potential. Keep optimizing all AARRR stages! 📈';
    } else if (growthScore > 500) {
      return 'A moderate growth score suggests balanced performance. Focus on boosting retention and referrals for better results. 🔄';
    } else {
      return 'A low growth score indicates room for improvement. Prioritize activation and acquisition to drive growth. 🔍';
    }
  };

  const handleResetSimulation = () => {
    setAcquisition(1000);
    setActivation(500);
    setRetention(50);
    setRevenue(200);
    setReferral(30);
    onReset();
  };

  return (
    <div className="w-full p-4 sm:p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-gray-800">
        Product Metrics Simulation
      </h2>
      <p className="mb-2 text-sm sm:text-base text-gray-700 text-center">
        Adjust the values below to simulate a real-life product metrics dashboard.
      </p>
      <div className="space-y-4">
        {[
          { label: 'Acquisition (New Users)', value: acquisition, setter: setAcquisition, icon: '🔍' },
          { label: 'Activation (First-time Users)', value: activation, setter: setActivation, icon: '✨' },
          { label: 'Retention (%)', value: retention, setter: setRetention, icon: '🔄' },
          { label: 'Revenue ($)', value: revenue, setter: setRevenue, icon: '💰' },
          { label: 'Referral (Invites)', value: referral, setter: setReferral, icon: '🔗' },
        ].map((metric, index) => (
          <div key={index}>
            <label className="block mb-1 font-medium text-sm sm:text-base text-gray-800 flex items-center gap-2">
              <span className="text-yellow-600">{metric.icon}</span> {metric.label}
            </label>
            <input
              type="number"
              value={metric.value}
              onChange={(e) => metric.setter(Number(e.target.value))}
              className="w-full p-2 sm:p-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 text-sm sm:text-base"
              aria-label={metric.label}
            />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Metric Performance:</h4>
        <div className="flex flex-col sm:flex-row gap-2">
          {Object.keys(metricsData).map((metric, index) => (
            <div key={index} className="flex-1">
              <div className="text-xs sm:text-sm text-gray-700 text-center">{metric}</div>
              <div
                className="bg-yellow-200 rounded"
                style={{ height: `${metricScores[index]}px`, minHeight: '20px' }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-base sm:text-lg font-semibold mb-2 text-center text-gray-800">
          Simulated Growth Score
        </h3>
        <p className="text-center text-2xl sm:text-3xl font-bold text-gray-800">{growthScore}</p>
        <p className="mt-2 text-center text-sm sm:text-base text-gray-600">
          (A higher score suggests better overall performance.)
        </p>
        <div className="mt-3 p-3 bg-blue-50 rounded-md">
          <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2 justify-center">
            <span className="text-green-600">💡</span> Insights
          </h4>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-center">{generateInsight()}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center mt-4">
        <button
          onClick={handleResetSimulation}
          className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          aria-label="Reset simulation"
        >
          Reset Simulation
        </button>
      </div>
    </div>
  );
};

/* ------------------- Main Product Metrics Component ------------------- */
const ProductMetricsInteractive = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setResetKey((prev) => prev + 1);
    setActiveTab('overview');
  };

  useEffect(() => {
    toast.info('Track Product Success with Metrics!', {
      toastId: 'welcome-metrics',
      theme: 'light',
      style: { background: '#fef3c7', color: '#1f2937' },
    });
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans flex flex-col py-6 sm:py-8">
      <header className="mb-8 border-b border-yellow-200 flex-1">
        <div className="flex justify-between items-center mx-4 sm:mx-6 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800 tracking-tight">
            <span className="mr-2 text-2xl">📊</span>
            Basic Product Metrics & KPIs
          </h1>
        
        </div>
      </header>

      <section className="mx-4 sm:mx-6 flex-1 flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-6">
          {['overview', 'quiz', 'simulation'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full sm:w-auto px-4 py-2 sm:px-5 sm:py-3 rounded-lg text-sm sm:text-base transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-white'
                  : 'bg-yellow-50 text-gray-800 hover:bg-yellow-100 border border-yellow-300'
              }`}
              aria-label={`Switch to ${tab} tab`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div>
          {activeTab === 'overview' && <OverviewComponent key={`overview-${resetKey}`} />}
          {activeTab === 'quiz' && <QuizComponent key={`quiz-${resetKey}`} onReset={handleReset} />}
          {activeTab === 'simulation' && (
            <SimulationComponent key={`simulation-${resetKey}`} onReset={handleReset} />
          )}
        </div>
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

export default ProductMetricsInteractive;