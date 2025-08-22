import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

/* ----------------- Quiz Component ----------------- */
const Quiz = ({ quizId, question, options, correctAnswer, insight }) => {
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
    if (selected === correctAnswer) {
      setFeedback(`Correct! ${insight} 🎉`);
    } else {
      setFeedback(`Incorrect. The correct answer is: ${options.find(opt => opt.value === correctAnswer).text}. ${insight}`);
    }
  };

  const handleReset = () => {
    setSelected('');
    setFeedback('');
  };

  return (
    <div className="bg-yellow-50 p-4 sm:p-6 rounded border border-yellow-300 mt-4 shadow-inner">
      <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800">{question}</h3>
      {options.map((option, index) => (
        <label key={index} className="block mb-2 cursor-pointer text-sm sm:text-base">
          <input
            type="radio"
            name={quizId}
            value={option.value}
            onChange={handleOptionChange}
            className="mr-2 h-4 w-4 text-yellow-600 focus:ring-yellow-600 border-gray-300 accent-yellow-600"
            aria-label={option.text}
          />
          {option.text}
        </label>
      ))}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2">
        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          aria-label="Submit quiz answer"
        >
          Submit Answer
        </button>
        <button
          onClick={handleReset}
          className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          aria-label="Reset quiz"
        >
          Reset
        </button>
      </div>
      {feedback && (
        <div
          className={`mt-2 text-sm sm:text-base font-bold ${
            feedback.startsWith('Correct') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {feedback}
        </div>
      )}
    </div>
  );
};

/* ----------------- Interactive Card Component ----------------- */
const InteractiveCard = ({ stage }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-yellow-300 rounded-lg shadow-md mb-6 overflow-hidden transition-all w-full">
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <span className="mr-2 text-xl sm:text-2xl text-yellow-600">{stage.icon}</span>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{stage.title}</h2>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-1 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          aria-expanded={isOpen}
          aria-controls={stage.id}
        >
          {isOpen ? 'Hide' : 'Show'}
        </button>
      </div>
      <div
        className={`transition-all duration-500 overflow-hidden ${isOpen ? 'max-h-max' : 'max-h-0'}`}
      >
        <div className="px-4 sm:px-6 py-4 bg-yellow-50">
          <div className="mb-4">
            <h3 className="font-semibold text-sm sm:text-base text-gray-800">Definition:</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{stage.definition}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-sm sm:text-base text-gray-800">Example & Use Case:</h3>
            <p className="mb-1 text-sm sm:text-base text-gray-700">
              <strong>Example:</strong> {stage.example}
            </p>
            <p className="text-sm sm:text-base text-gray-700">
              <strong>Scenario:</strong> {stage.scenario}
            </p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-sm sm:text-base text-gray-800">Key Points:</h3>
            <ul className="list-none space-y-1 ml-0 text-sm sm:text-base text-gray-700">
              {stage.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-blue-600">✅</span> {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-3 p-3 bg-blue-50 rounded-md">
            <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
              <span className="text-green-600">💡</span> Insights
            </h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{stage.insight}</p>
          </div>
          <Quiz
            quizId={stage.id}
            question={stage.quiz.question}
            options={stage.quiz.options}
            correctAnswer={stage.quiz.correctAnswer}
            insight={stage.quiz.insight}
          />
        </div>
      </div>
    </div>
  );
};

/* ----------------- Simulation Slider Component ----------------- */
const SimulationSlider = ({ stages, onReset }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < stages.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleResetSlider = () => {
    setCurrentIndex(0);
    onReset();
  };

  const currentStage = stages[currentIndex];
  const impactScore = 75; // Mock impact score for visualization
  const maxImpact = 100;
  const barHeight = (impactScore / maxImpact) * 100;

  return (
    <div className="mt-10 p-4 sm:p-6 bg-yellow-50 rounded shadow-md border border-yellow-300">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center text-gray-800">
        Simulation: Market Research Stages
      </h2>
      <div className="p-4 border border-yellow-300 rounded mb-4 bg-yellow-50">
        <div className="flex items-center mb-2">
          <span className="mr-2 text-xl sm:text-2xl text-yellow-600">{currentStage.icon}</span>
          <span className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
            {currentStage.title}
          </span>
        </div>
        <p className="text-sm sm:text-base text-gray-700">{currentStage.summary}</p>
        <div className="mt-4">
          <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Impact Score:</h4>
          <div className="flex">
            <div className="flex-1">
              <div className="text-xs sm:text-sm text-gray-700 text-center">Impact</div>
              <div
                className="bg-yellow-200 rounded"
                style={{ height: `${barHeight}px`, minHeight: '20px' }}
              ></div>
            </div>
          </div>
        </div>
        <div className="mt-3 p-3 bg-blue-50 rounded-md">
          <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
            <span className="text-green-600">💡</span> Insights
          </h4>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            {currentStage.simulationInsight}
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="w-full sm:w-auto flex items-center justify-center bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          aria-label="Previous stage"
        >
          <span className="mr-2">⬅️</span> Previous
        </button>
        <button
          onClick={handleResetSlider}
          className="w-full sm:w-auto flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          aria-label="Reset simulation"
        >
          Reset
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === stages.length - 1}
          className="w-full sm:w-auto flex items-center justify-center bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          aria-label="Next stage"
        >
          Next <span className="ml-2">➡️</span>
        </button>
      </div>
    </div>
  );
};

/* ----------------- Main Market Research Component ----------------- */
const MarketResearch = () => {
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setResetKey((prev) => prev + 1);
  };

  const stages = [
    {
      id: 'stage1',
      title: 'What Is the Market Size?',
      icon: '📈',
      definition:
        'Market size is an estimate of the total number of potential customers or the total revenue opportunity available for a product or service within a specific market. It tells you how big the opportunity is.',
      example:
        'If you are developing a new mobile banking app, the market size might be estimated by the number of smartphone users in your target region who have or need banking services.',
      scenario:
        'A PM for a fintech startup might analyze data from government statistics, industry reports, and smartphone penetration rates to estimate that there are 50 million potential customers in a region.',
      keyPoints: [
        'Provides an overview of the revenue potential.',
        'Helps in setting realistic sales and growth targets.',
        'Often segmented by demographics, geography, or user behavior.',
      ],
      quiz: {
        question: 'What does market size estimate?',
        options: [
          { value: 'A', text: 'The number of potential customers and revenue opportunity.' },
          { value: 'B', text: 'Future growth trends.' },
          { value: 'C', text: 'Geographical demand only.' },
          { value: 'D', text: 'Competitor performance.' },
        ],
        correctAnswer: 'A',
        insight: 'Market size estimation validates revenue potential and guides resource allocation.',
      },
      summary: 'An estimate of potential customers and revenue opportunity in the market.',
      insight: 'Market size estimation guides strategic resource allocation and validates revenue potential.',
      simulationInsight: 'This stage highlights the market’s revenue potential for strategic planning.',
    },
    {
      id: 'stage2',
      title: 'What Is the Market Forecast?',
      icon: '🚀',
      definition:
        'Market forecast involves predicting how a market will evolve over a future period. It includes estimating future growth rates, trends, and potential changes in market size based on historical data and current trends.',
      example:
        'A report might forecast that the mobile banking market will grow at a compound annual growth rate (CAGR) of 10% over the next five years.',
      scenario:
        'A PM planning a product roadmap might use this forecast to justify prioritizing features that support scalability and long-term user engagement, anticipating that the market will continue to expand.',
      keyPoints: [
        'Helps in strategic planning and resource allocation.',
        'Informs decisions about scaling, marketing, and product feature development.',
        'Often derived from industry reports, market surveys, and economic indicators.',
      ],
      quiz: {
        question: 'What is one key benefit of a market forecast?',
        options: [
          { value: 'A', text: 'It supports strategic planning and resource allocation.' },
          { value: 'B', text: 'It determines the exact market size.' },
          { value: 'C', text: 'It replaces competitor analysis.' },
          { value: 'D', text: 'It sets product pricing without further analysis.' },
        ],
        correctAnswer: 'A',
        insight: 'Market forecasts drive long-term planning and scalability decisions.',
      },
      summary: 'A prediction of future market growth rates and trends.',
      insight: 'Market forecasts drive long-term planning and scalability decisions.',
      simulationInsight: 'This stage predicts market trends to inform scalable product strategies.',
    },
    {
      id: 'stage3',
      title: 'Which Countries Drive the Most Demand?',
      icon: '🌍',
      definition:
        'This term refers to identifying the geographical regions or countries where demand for a product or service is highest. It can be based on current sales, user interest, or market trends.',
      example:
        'For a mobile banking app, countries like the United States, India, and Brazil might drive the most demand due to high smartphone penetration and a growing need for digital financial services.',
      scenario:
        'A PM might use regional sales data and user behavior analytics to decide to launch localized features or marketing campaigns in these high-demand countries, tailoring the product to local needs and regulatory requirements.',
      keyPoints: [
        'Helps in prioritizing market entry strategies.',
        'Informs localization and customization efforts.',
        'Supports decisions on where to invest in customer acquisition.',
      ],
      quiz: {
        question: 'Why is it important to identify which countries drive the most demand?',
        options: [
          { value: 'A', text: 'To prioritize market entry strategies and tailor offerings.' },
          { value: 'B', text: 'To set universal pricing for all regions.' },
          { value: 'C', text: 'To ignore regional preferences.' },
          { value: 'D', text: 'To focus solely on domestic markets.' },
        ],
        correctAnswer: 'A',
        insight: 'Identifying high-demand regions ensures focused market entry and localization.',
      },
      summary: 'Identify regions with the highest demand to guide market entry and localization.',
      insight: 'Identifying high-demand regions ensures effective market entry and localization.',
      simulationInsight: 'This stage guides geographic prioritization for market expansion.',
    },
    {
      id: 'stage4',
      title: 'What Are the Opportunities?',
      icon: '💡',
      definition:
        'Opportunities refer to favorable market conditions or unmet needs that a product can address. These could be gaps in current offerings, emerging trends, or new customer segments that are not being fully served.',
      example:
        'An opportunity for a mobile banking app might be the large unbanked or underbanked population in emerging markets.',
      scenario:
        'A PM might identify that small business owners in developing countries need easier access to credit and financial management tools, leading to features like micro-loans or budgeting tools.',
      keyPoints: [
        'Drives innovation and product differentiation.',
        'Can be uncovered through customer feedback, competitive analysis, and market research.',
        'Directly influences the product roadmap and feature prioritization.',
      ],
      quiz: {
        question: 'Opportunities in market research help to:',
        options: [
          { value: 'A', text: 'Drive innovation and product differentiation.' },
          { value: 'B', text: 'Only focus on technical limitations.' },
          { value: 'C', text: 'Increase the product price arbitrarily.' },
          { value: 'D', text: 'Ignore customer feedback.' },
        ],
        correctAnswer: 'A',
        insight: 'Opportunities drive innovation by addressing unmet market needs.',
      },
      summary: 'Unmet market needs and gaps that can drive innovation.',
      insight: 'Identifying opportunities drives innovation and product differentiation.',
      simulationInsight: 'This stage uncovers gaps for innovative product solutions.',
    },
    {
      id: 'stage5',
      title: 'What Are the Challenges?',
      icon: '⚠️',
      definition:
        'Challenges are the obstacles or issues that may hinder the product’s success in the market. They can include regulatory hurdles, technical limitations, intense competition, or shifting consumer preferences.',
      example:
        'A major challenge for a mobile banking app might be ensuring robust cybersecurity measures to protect user data and meet compliance standards.',
      scenario:
        'During planning, a PM discovers that integrating with legacy banking systems poses technical challenges, requiring additional time and resources. This shapes a realistic timeline and risk mitigation strategy.',
      keyPoints: [
        'Identifying challenges early allows for proactive planning.',
        'Helps in risk management and contingency planning.',
        'Informs necessary trade-offs during product development.',
      ],
      quiz: {
        question: 'Early identification of challenges helps in:',
        options: [
          { value: 'A', text: 'Proactive planning and risk management.' },
          { value: 'B', text: 'Ignoring technical limitations.' },
          { value: 'C', text: 'Reducing market research.' },
          { value: 'D', text: 'Increasing product price.' },
        ],
        correctAnswer: 'A',
        insight: 'Proactively addressing challenges ensures smoother product development.',
      },
      summary: 'The obstacles that may hinder a product’s success and need proactive planning.',
      insight: 'Proactively addressing challenges ensures smoother product development.',
      simulationInsight: 'This stage prepares you for obstacles with strategic planning.',
    },
    {
      id: 'stage6',
      title: 'What Are the Price Points?',
      icon: '💰',
      definition:
        'Price points refer to the typical price levels at which products or services are offered in the market. They help determine how much customers are willing to pay and how competitors price their offerings.',
      example:
        'For a subscription-based mobile app, price points might range from $5 to $20 per month depending on the features and value offered.',
      scenario:
        'A PM conducts surveys and competitor analysis to decide the optimal price point—possibly leading to a freemium model with tiered subscriptions.',
      keyPoints: [
        'Affects revenue generation and market competitiveness.',
        'Influences marketing strategies and customer segmentation.',
        'Helps balance between affordability and profitability.',
      ],
      quiz: {
        question: 'Price points influence:',
        options: [
          { value: 'A', text: 'Revenue generation and market competitiveness.' },
          { value: 'B', text: 'Only the technical specifications.' },
          { value: 'C', text: 'Market segmentation alone.' },
          { value: 'D', text: 'None of the above.' },
        ],
        correctAnswer: 'A',
        insight: 'Optimal price points balance affordability and profitability.',
      },
      summary: 'Understanding customer willingness to pay and how competitors price their offerings.',
      insight: 'Optimal price points balance affordability and profitability for market success.',
      simulationInsight: 'This stage optimizes pricing for competitive market positioning.',
    },
    {
      id: 'stage7',
      title: 'Who Are the Main Competitors?',
      icon: '👔',
      definition:
        'This term involves identifying the key players in the market who offer similar products or services. Competitor analysis helps understand the strengths and weaknesses of others and informs differentiation strategies.',
      example:
        'In the mobile banking space, competitors might include established banks with digital services, fintech startups, and large tech companies entering the financial arena.',
      scenario:
        'A PM creates a competitive matrix comparing features, pricing, and customer satisfaction. This analysis highlights gaps in user experience that the product could fill.',
      keyPoints: [
        'Enables strategic positioning and differentiation.',
        'Provides insights into market trends and customer expectations.',
        'Informs feature development and marketing messaging.',
      ],
      quiz: {
        question: 'Competitor analysis primarily helps in:',
        options: [
          { value: 'A', text: 'Strategic positioning and differentiation.' },
          { value: 'B', text: 'Determining the internal tech stack only.' },
          { value: 'C', text: 'Setting subscription fees exclusively.' },
          { value: 'D', text: 'Ignoring market trends.' },
        ],
        correctAnswer: 'A',
        insight: 'Competitor analysis informs differentiation and market positioning.',
      },
      summary: 'Identify key market players to shape competitive differentiation.',
      insight: 'Competitor analysis informs differentiation and strategic positioning.',
      simulationInsight: 'This stage reveals gaps for competitive differentiation.',
    },
    {
      id: 'stage8',
      title: 'What Type of Revenue Do These Products Bring In?',
      icon: '💸',
      definition:
        'This term refers to the revenue model used by products in the market. It might include subscription fees, one-time purchases, freemium models, in-app purchases, or advertising revenue.',
      example:
        'A mobile banking app might generate revenue through subscription fees, transaction fees, or partnerships with financial institutions.',
      scenario:
        'A PM analyzes competitor revenue models to decide whether to offer a free version with premium features (freemium) or charge a flat monthly fee, influencing the overall business model.',
      keyPoints: [
        'Influences product design and feature prioritization.',
        'Helps forecast financial performance and profitability.',
        'Critical for investor presentations and business planning.',
      ],
      quiz: {
        question: 'Revenue models primarily affect:',
        options: [
          { value: 'A', text: 'Product design and feature prioritization.' },
          { value: 'B', text: 'Only technical constraints.' },
          { value: 'C', text: 'Market segmentation alone.' },
          { value: 'D', text: 'None of the above.' },
        ],
        correctAnswer: 'A',
        insight: 'Revenue models shape product design and financial planning.',
      },
      summary: 'Describes how the product generates income and its monetization model.',
      insight: 'Revenue models shape product design and financial planning.',
      simulationInsight: 'This stage informs sustainable revenue strategies.',
    },
    {
      id: 'stage9',
      title: 'How Fast Are the Industries Growing?',
      icon: '📊',
      definition:
        'This term measures the rate at which a market or industry is expanding, usually expressed as a Compound Annual Growth Rate (CAGR) or YoY growth metrics.',
      example:
        'The digital payments industry might be growing at a CAGR of 15%, indicating rapid adoption and increasing potential.',
      scenario:
        'A PM for a mobile banking app uses industry growth data to justify aggressive feature development and scaling investments to handle future demand.',
      keyPoints: [
        'Indicates market momentum and future potential.',
        'Helps prioritize investments and scaling strategies.',
        'Informs long-term product roadmap and resource allocation.',
      ],
      quiz: {
        question: 'Industry growth rates help signal:',
        options: [
          { value: 'A', text: 'Market momentum and future potential.' },
          { value: 'B', text: 'Only current customer satisfaction.' },
          { value: 'C', text: 'Exclusive competitor weaknesses.' },
          { value: 'D', text: 'None of the above.' },
        ],
        correctAnswer: 'A',
        insight: 'Industry growth rates guide investment and scaling strategies.',
      },
      summary: 'A measure of how quickly the market or industry is expanding.',
      insight: 'Industry growth rates guide investment and scaling strategies.',
      simulationInsight: 'This stage highlights market momentum for strategic scaling.',
    },
  ];

  useEffect(() => {
    toast.info('Master Market Research Methods!', {
      toastId: 'welcome-market-research',
      theme: 'light',
      style: { background: '#fef3c7', color: '#1f2937' },
    });
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans flex flex-col py-6 sm:py-8">
      <header className="mb-8 border-b border-yellow-200 flex-1">
        <div className="flex justify-between items-center mx-4 sm:mx-6 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
            <span className="mr-2 text-2xl">📊</span>
            Market Research Methods
          </h1>
       
        </div>
      </header>

      <section className="mx-4 sm:mx-6 flex-1 flex flex-col gap-4 sm:gap-6">
        {stages.map((stage) => (
          <InteractiveCard key={`${stage.id}-${resetKey}`} stage={stage} />
        ))}

        <SimulationSlider stages={stages} onReset={handleReset} />

        <div className="mt-10 p-4 sm:p-6 bg-yellow-50 rounded shadow-md border border-yellow-300">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center text-gray-800">
            Final Thoughts
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Understanding market research terms is crucial for Product Managers. These insights help evaluate opportunities, identify challenges, and make informed decisions about product strategy, pricing, and competitive positioning. Whether analyzing a new digital product like a mobile banking app or assessing an established market, these concepts guide you toward building a successful, user-centric product in a competitive landscape.
          </p>
          <div className="mt-3 p-3 bg-blue-50 rounded-md">
            <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
              <span className="text-green-600">💡</span> Insights
            </h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Applying these market research methods ensures data-driven decisions for product success.
            </p>
          </div>
        </div>

      
      </section>
    </div>
  );
};

export default MarketResearch;