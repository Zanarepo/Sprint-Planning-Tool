import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

/* ------------------- Quiz Component ------------------- */
const Quiz = ({ quizId, quiz, onReset }) => {
  const [selected, setSelected] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleOptionChange = (e) => {
    setSelected(e.target.value);
    setFeedback('');
  };

  const handleSubmit = () => {
    if (!selected) {
      setFeedback('Please select an answer.');
      return;
    }
    if (selected === quiz.correctAnswer) {
      setFeedback(`Correct! 🎉 ${quiz.successInsight}`);
    } else {
      setFeedback(`Incorrect. ${quiz.failureInsight} Try again!`);
    }
  };

  const handleQuizReset = () => {
    setSelected('');
    setFeedback('');
    onReset();
  };

  return (
    <div className="bg-yellow-50 p-4 sm:p-6 rounded-lg border border-yellow-300 mt-4">
      <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800">{quiz.question}</h3>
      {quiz.options.map((option, index) => (
        <label key={index} className="block mb-2 cursor-pointer text-sm sm:text-base">
          <input
            type="radio"
            name={quizId}
            value={option.value}
            onChange={handleOptionChange}
            className="mr-2 accent-yellow-600"
            aria-label={option.text}
          />
          {option.text}
        </label>
      ))}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2">
        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          aria-label="Submit quiz answer"
        >
          Submit Answer
        </button>
        <button
          onClick={handleQuizReset}
          className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          aria-label="Reset quiz"
        >
          Reset Quiz
        </button>
      </div>
      {feedback && (
        <div
          className={`mt-2 font-bold text-sm sm:text-base ${
            feedback.startsWith('Correct') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {feedback}
        </div>
      )}
    </div>
  );
};

/* ------------------- Lifecycle Simulation Component ------------------- */
const LifecycleSimulation = ({ stages, onReset }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentStage = stages[currentIndex];

  // Mock sales growth data for bar chart
  const salesData = {
    'Introduction Stage': 10,
    'Growth Stage': 50,
    'Maturity Stage': 80,
    'Decline Stage': 20,
    'Retirement / Exit Stage': 0,
  };
  const maxSales = Math.max(...Object.values(salesData), 1);
  const salesScores = stages.map((stage) => (salesData[stage.stage] / maxSales) * 100);

  const generateSimulationInsight = () => {
    switch (currentStage.stage) {
      case 'Introduction Stage':
        return 'Focus on marketing and awareness to boost user acquisition in the Introduction Stage. 📢';
      case 'Growth Stage':
        return 'Expand features and markets to capitalize on rapid growth. 🚀';
      case 'Maturity Stage':
        return 'Retain users and optimize revenue to maximize profits in the Maturity Stage. 💰';
      case 'Decline Stage':
        return 'Consider refreshing the product or targeting a niche to stay relevant. 📉';
      case 'Retirement / Exit Stage':
        return 'Plan a graceful exit or transition users to a new product. ☠️';
      default:
        return 'Explore each stage to understand strategic priorities. 🔄';
    }
  };

  return (
    <div className="mt-10 p-4 sm:p-6 border-t border-yellow-200 pt-6">
      <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center text-gray-800">
          <span className="mr-2 text-yellow-600">🔄</span> Interactive Lifecycle Simulation
        </h2>
        <button
          onClick={() => onReset()}
          className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
          aria-expanded={true}
          aria-controls="simulation-section"
        >
          Show
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6 overflow-x-auto">
        {stages.map((stage, index) => (
          <button
            key={stage.id}
            onClick={() => setCurrentIndex(index)}
            className={`flex flex-col items-center p-2 sm:p-3 m-1 rounded-full transition-all duration-300 hover:scale-105 ${
              index === currentIndex
                ? 'bg-yellow-600 text-white shadow-lg'
                : 'bg-yellow-50 text-gray-800 hover:bg-yellow-100 border border-yellow-300'
            }`}
            aria-label={`Switch to ${stage.stage}`}
          >
            <span className="text-xl sm:text-2xl">{stage.icon}</span>
            <span className="mt-1 text-xs sm:text-sm font-medium">{stage.stage.split(' ')[0]}</span>
          </button>
        ))}
      </div>
      <div className="bg-yellow-50 shadow-md rounded-lg p-4 sm:p-6 border border-yellow-300">
        <div className="flex items-center mb-4">
          <span className="text-2xl sm:text-3xl mr-3 text-yellow-600">{currentStage.icon}</span>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{currentStage.stage}</h3>
        </div>
        <p className="mb-3 text-sm sm:text-base text-gray-700">
          <strong>What Happens:</strong> {currentStage.whatHappens}
        </p>
        <p className="mb-3 text-sm sm:text-base text-gray-700">
          <strong>{currentStage.exampleTitle}</strong>
          <br />
          {currentStage.example}
        </p>
        <div className="mb-3 text-sm sm:text-base text-gray-700">
          <strong>Key Strategies:</strong>
          <ul className="list-none ml-6 mt-1">
            {currentStage.keyStrategies.map((strategy, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-blue-600">✅</span> {strategy}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Sales Growth:</h4>
          <div className="flex flex-col sm:flex-row gap-2">
            {stages.map((stage, index) => (
              <div key={index} className="flex-1">
                <div className="text-xs sm:text-sm text-gray-700 text-center">{stage.stage.split(' ')[0]}</div>
                <div
                  className="bg-yellow-200 rounded"
                  style={{ height: `${salesScores[index]}px`, minHeight: '20px' }}
                ></div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-md">
          <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
            <span className="text-green-600">💡</span> Insights
          </h4>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{generateSimulationInsight()}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between mt-4">
          <button
            onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev))}
            disabled={currentIndex === 0}
            className="w-full sm:w-auto bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-lg transition duration-300 hover:scale-105 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            aria-label="Previous stage"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev < stages.length - 1 ? prev + 1 : prev))}
            disabled={currentIndex === stages.length - 1}
            className="w-full sm:w-auto bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-lg transition duration-300 hover:scale-105 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            aria-label="Next stage"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

/* ------------------- Main Product Lifecycle Component ------------------- */
const ProductLifecycle = () => {
  const [openSections, setOpenSections] = useState({
    stages: Array(5).fill(true),
    simulation: true,
    finalThoughts: true,
  });
  const [, setQuizStates] = useState(Array(5).fill({ selected: '', feedback: '' }));

  const toggleSection = (section, index = null) => {
    if (index !== null) {
      setOpenSections((prev) => {
        const newStages = [...prev.stages];
        newStages[index] = !newStages[index];
        return { ...prev, stages: newStages };
      });
    } else {
      setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    }
  };

  const handleReset = () => {
    setQuizStates(Array(5).fill({ selected: '', feedback: '' }));
    setOpenSections({
      stages: Array(5).fill(true),
      simulation: true,
      finalThoughts: true,
    });
  };

  const handleQuizReset = (index) => {
    setQuizStates((prev) => {
      const newStates = [...prev];
      newStates[index] = { selected: '', feedback: '' };
      return newStates;
    });
  };

  const stages = [
    {
      id: 1,
      stage: 'Introduction Stage',
      icon: '🎉',
      whatHappens:
        'The product is newly launched in the market. Awareness is low, and sales are slow. Heavy marketing and advertising are needed to attract early users. High costs (R&D, production, distribution) make this stage unprofitable.',
      exampleTitle: 'Example: Instagram in 2010',
      example:
        'Launched as a simple photo-sharing app with filters. Focused on getting early adopters (tech lovers, bloggers). No ads or monetization—just user growth.',
      keyStrategies: [
        'Marketing & Awareness – Invest in ads, influencer partnerships, and PR.',
        'Pricing Strategy – May offer free trials or discounts to attract users.',
        'Feedback Loop – Gather early feedback to improve the product.',
      ],
      quiz: {
        question: 'In the Introduction Stage, what is the primary focus?',
        options: [
          { value: 'A', text: 'Maximizing profits immediately.' },
          { value: 'B', text: 'Gaining user awareness and early adoption.' },
          { value: 'C', text: 'Reducing operational costs.' },
          { value: 'D', text: 'Retaining existing customers.' },
        ],
        correctAnswer: 'B',
        successInsight: 'Understanding the Introduction Stage helps prioritize user acquisition.',
        failureInsight: 'The Introduction Stage focuses on awareness, not profits or retention.',
      },
      userAcquisition: 10, // Mock metric for bar chart
    },
    {
      id: 2,
      stage: 'Growth Stage',
      icon: '🚀',
      whatHappens:
        'The product gains traction and demand increases. Sales and revenue grow rapidly. More competitors enter the market. Scaling operations becomes a priority.',
      exampleTitle: 'Example: Instagram (2011-2013)',
      example:
        'Millions of users joined after celebrities like Justin Bieber used the app. Instagram was acquired by Facebook for $1 billion (2012). Introduced new features like hashtags, explore tab, and videos to drive engagement.',
      keyStrategies: [
        'Market Expansion – Target new audiences (e.g., international markets).',
        'Feature Enhancements – Improve the product based on feedback.',
        'Competitive Differentiation – Stand out from competitors with unique features.',
      ],
      quiz: {
        question: 'What is a key focus during the Growth Stage?',
        options: [
          { value: 'A', text: 'Cutting costs significantly.' },
          { value: 'B', text: 'Expanding the market and enhancing features.' },
          { value: 'C', text: 'Preparing for product retirement.' },
          { value: 'D', text: 'Reducing advertising.' },
        ],
        correctAnswer: 'B',
        successInsight: 'The Growth Stage is ideal for scaling and feature expansion.',
        failureInsight: 'The Growth Stage is about expansion, not cost-cutting or retirement.',
      },
      userAcquisition: 50, // Mock metric for bar chart
    },
    {
      id: 3,
      stage: 'Maturity Stage',
      icon: '💰',
      whatHappens:
        'Growth slows down as the product reaches market saturation. The focus shifts from acquiring new customers to retaining existing users. The business aims to maximize profits. Competition is high, and differentiation is key.',
      exampleTitle: 'Example: Instagram (2014-Present)',
      example:
        'Became the #1 photo-sharing app globally. Introduced monetization (ads, influencer partnerships). Added features like Stories, IGTV, Reels to compete with Snapchat & TikTok.',
      keyStrategies: [
        'Customer Retention – Improve user experience to keep users engaged.',
        'New Revenue Streams – Ads, subscriptions, or premium features.',
        'Cost Optimization – Reduce operational costs while maintaining quality.',
      ],
      quiz: {
        question: 'During the Maturity Stage, what is the main focus?',
        options: [
          { value: 'A', text: 'Acquiring new users at all costs.' },
          { value: 'B', text: 'Retaining existing users and maximizing profits.' },
          { value: 'C', text: 'Expanding into new markets.' },
          { value: 'D', text: 'Reducing marketing efforts.' },
        ],
        correctAnswer: 'B',
        successInsight: 'The Maturity Stage focuses on retention and profitability.',
        failureInsight: 'The Maturity Stage prioritizes retention over aggressive acquisition.',
      },
      userAcquisition: 80, // Mock metric for bar chart
    },
    {
      id: 4,
      stage: 'Decline Stage',
      icon: '📉',
      whatHappens:
        'Sales and revenue start dropping. The market is saturated, or new technologies replace the product. Fewer new users, and existing users move to competitors. Businesses must decide whether to reinvent, pivot, or retire the product.',
      exampleTitle: 'Example: Facebook (Declining Since 2019)',
      example:
        'Younger audiences moved to Instagram, Snapchat, and TikTok. Engagement dropped, and Facebook rebranded to Meta to focus on the metaverse. Introduced AI-driven recommendations and reels to keep users engaged.',
      keyStrategies: [
        'Product Refresh – Introduce new features to stay relevant.',
        'Target a Niche Market – Focus on a specific audience (e.g., LinkedIn for professionals).',
        'Cost-Cutting – Reduce expenses to maintain profitability.',
      ],
      quiz: {
        question: 'What challenge is faced during the Decline Stage?',
        options: [
          { value: 'A', text: 'Low user acquisition cost.' },
          { value: 'B', text: 'Market saturation and user migration to competitors.' },
          { value: 'C', text: 'Excessive growth in revenue.' },
          { value: 'D', text: 'Increased brand loyalty.' },
        ],
        correctAnswer: 'B',
        successInsight: 'Recognizing decline helps plan strategic pivots or refreshes.',
        failureInsight: 'The Decline Stage involves market saturation, not revenue growth.',
      },
      userAcquisition: 20, // Mock metric for bar chart
    },
    {
      id: 5,
      stage: 'Retirement / Exit Stage',
      icon: '☠️',
      whatHappens:
        'The product is discontinued due to lack of demand, high costs, or outdated technology. The company may replace it with a new product or sell it to another company. Users may transition to an alternative product.',
      exampleTitle: 'Example: Google+ (Shut Down in 2019)',
      example:
        'Google+ failed to compete with Facebook & Twitter. Low user engagement and security issues led to its shutdown. Google focused on other successful products like YouTube & Google Meet.',
      keyStrategies: [
        'Sell the Product – If profitable, sell to another company.',
        'Rebrand or Merge – Integrate features into another product.',
        'Gradual Shutdown – Give users time to transition to alternatives.',
      ],
      quiz: {
        question: 'What is the common approach during the Retirement Stage?',
        options: [
          { value: 'A', text: 'Aggressively invest in new features.' },
          { value: 'B', text: 'Replace, sell, or gradually shut down the product.' },
          { value: 'C', text: 'Focus solely on user growth.' },
          { value: 'D', text: 'Expand market reach.' },
        ],
        correctAnswer: 'B',
        successInsight: 'The Retirement Stage requires strategic exit planning.',
        failureInsight: 'The Retirement Stage is about exiting, not growth or investment.',
      },
      userAcquisition: 0, // Mock metric for bar chart
    },
  ];

  // Calculate user acquisition data for bar charts
  const maxAcquisition = Math.max(...stages.map((stage) => stage.userAcquisition), 1);
  const acquisitionScores = stages.map((stage) => (stage.userAcquisition / maxAcquisition) * 100);

  const generateStageInsight = (stage) => {
    switch (stage.stage) {
      case 'Introduction Stage':
        return 'Heavy marketing investment is key to building awareness and attracting early adopters. 📢';
      case 'Growth Stage':
        return 'Scaling operations and enhancing features drive rapid user growth. 🚀';
      case 'Maturity Stage':
        return 'Focus on retention and new revenue streams to sustain profitability. 💰';
      case 'Decline Stage':
        return 'Innovate or pivot to avoid obsolescence in a saturated market. 📉';
      case 'Retirement / Exit Stage':
        return 'Plan a graceful exit to maintain brand trust and user satisfaction. ☠️';
      default:
        return 'Understand each stage to make informed strategic decisions. 🔄';
    }
  };

  useEffect(() => {
    toast.info('Explore the Product Lifecycle!', {
      toastId: 'welcome-lifecycle',
      theme: 'light',
      style: { background: '#fef3c7', color: '#1f2937' },
    });
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans flex flex-col">
      <header className="mb-8 border-b border-yellow-200 flex-1">
        <div className="flex justify-between items-center mx-4 sm:mx-6 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800 tracking-tight">
            <span className="mr-2 text-2xl">🔄</span>
            Product Lifecycle
          </h1>
      
        </div>
      </header>

      <section className="mx-4 sm:mx-6 flex-1 flex flex-col gap-4 sm:gap-6">
        {stages.map((stage, index) => (
          <div key={stage.id}>
            <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center text-gray-800">
                <span className="mr-2 text-yellow-600">{stage.icon}</span> {stage.stage}
              </h2>
              <button
                onClick={() => toggleSection('stages', index)}
                className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
                aria-expanded={openSections.stages[index]}
                aria-controls={`stage-${stage.id}`}
              >
                {openSections.stages[index] ? 'Hide' : 'Show'}
              </button>
            </div>
            <div
              className={`transition-all duration-500 overflow-hidden ${openSections.stages[index] ? 'max-h-max' : 'max-h-0'}`}
            >
              <div className="p-4 sm:p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300">
                <div className="mb-4 text-sm sm:text-base text-gray-700">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">What Happens?</h3>
                  <p>{stage.whatHappens}</p>
                </div>
                <div className="mb-4 text-sm sm:text-base text-gray-700">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">{stage.exampleTitle}</h3>
                  <p>{stage.example}</p>
                </div>
                <div className="mb-4 text-sm sm:text-base text-gray-700">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Key Strategies:</h3>
                  <ul className="list-none ml-6">
                    {stage.keyStrategies.map((strategy, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-blue-600">✅</span> {strategy}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">User Acquisition Rate:</h4>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1">
                      <div className="text-xs sm:text-sm text-gray-700 text-center">{stage.stage.split(' ')[0]}</div>
                      <div
                        className="bg-yellow-200 rounded"
                        style={{ height: `${acquisitionScores[index]}px`, minHeight: '20px' }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-md">
                  <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
                    <span className="text-green-600">💡</span> Insights
                  </h4>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{generateStageInsight(stage)}</p>
                </div>
                <Quiz quizId={`quiz${stage.id}`} quiz={stage.quiz} onReset={() => handleQuizReset(index)} />
              </div>
            </div>
          </div>
        ))}

        <div>
          <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center text-gray-800">
              <span className="mr-2 text-yellow-600">🔄</span> Interactive Lifecycle Simulation
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
            <LifecycleSimulation stages={stages} onReset={() => handleReset()} />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center text-gray-800">
              <span className="mr-2 text-green-600">💡</span> Final Thoughts
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
            <div className="p-4 sm:p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                The Product Lifecycle helps businesses make strategic decisions at each stage. Knowing when to invest, expand, monetize, or pivot is crucial to long-term success. A successful product – like Instagram – continually reinvents itself (for example, launching Reels to compete with TikTok) to avoid decline.
              </p>
              <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-md">
                <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
                  <span className="text-green-600">💡</span> Insights
                </h4>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Continuous innovation and strategic timing are key to sustaining a product’s success across its lifecycle.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600 mt-6"
          aria-label="Reset lifecycle"
        >
          Reset
        </button>
      </section>
    </div>
  );
};

export default ProductLifecycle;