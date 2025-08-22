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

  const handleSubmit = (e) => {
    e.stopPropagation();
    if (!selected) {
      setFeedback('Please select an answer.');
      return;
    }
    if (selected === correctAnswer) {
      setFeedback(`Correct! ${insight} 🎉`);
    } else {
      setFeedback(`Incorrect. The correct answer is: ${correctAnswer}. ${insight}`);
    }
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setSelected('');
    setFeedback('');
  };

  return (
    <div
      className="bg-yellow-50 p-4 rounded mt-4 shadow-inner border border-yellow-300"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800">{question}</h3>
      {options.map((option, idx) => (
        <label key={idx} className="block mb-2 text-sm sm:text-base">
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

/* ----------------- Simulation Card ----------------- */
const SimulationCard = ({ title, simulationContent, insight }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = (e) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  // Mock impact score for bar chart
  const impactScore = 75;
  const maxImpact = 100;
  const barHeight = (impactScore / maxImpact) * 100;

  return (
    <div onClick={toggleFlip} className="flip-card cursor-pointer w-full">
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-front bg-yellow-50 border border-yellow-300 rounded p-4 shadow-md hover:bg-yellow-100 transition-all duration-300">
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">{title}</h3>
          <p className="text-sm sm:text-base text-gray-600">Click to see simulation details.</p>
        </div>
        <div className="flip-card-back bg-yellow-50 border border-yellow-300 rounded p-4 shadow-md">
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">{title} Details</h3>
          <p className="text-sm sm:text-base text-gray-700">{simulationContent}</p>
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
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{insight}</p>
          </div>
          <p className="mt-2 text-sm italic text-gray-500">Click to flip back.</p>
        </div>
      </div>
    </div>
  );
};

/* ----------------- Opportunity Card ----------------- */
const OpportunityCard = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-6">
      <div
        className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer w-full"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={data.id}
      >
        <div className="flex items-center">
          <span className="text-2xl sm:text-3xl mr-4 text-yellow-600">{data.icon}</span>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{data.title}</h2>
        </div>
        {!isExpanded && (
          <p className="mt-2 text-sm sm:text-base text-gray-600">{data.brief}</p>
        )}
        <div
          className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-max' : 'max-h-0'}`}
        >
          <div className="mt-4">
            {data.content.map((para, index) => (
              <p key={index} className="mb-2 text-sm sm:text-base text-gray-700 leading-relaxed">
                {para}
              </p>
            ))}
            {data.useCase && (
              <div className="mt-2 p-3 border-l-4 border-blue-500 bg-blue-50 rounded-md">
                <strong className="text-sm sm:text-base text-gray-800">Use Case: </strong>
                <p className="text-sm sm:text-base text-gray-700">{data.useCase}</p>
              </div>
            )}
            <div className="mt-3 p-3 bg-blue-50 rounded-md">
              <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
                <span className="text-green-600">💡</span> Insights
              </h4>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{data.insight}</p>
            </div>
            {data.quiz && (
              <div onClick={(e) => e.stopPropagation()}>
                <Quiz
                  quizId={data.id}
                  question={data.quiz.question}
                  options={data.quiz.options}
                  correctAnswer={data.quiz.correctAnswer}
                  insight={data.quiz.insight}
                />
              </div>
            )}
            {data.simulation && (
              <div onClick={(e) => e.stopPropagation()} className="mt-4">
                <SimulationCard
                  title={`${data.title} Simulation`}
                  simulationContent={data.simulation}
                  insight={data.simulationInsight}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ----------------- Main Component ----------------- */
const ProductOpportunityCanvas = () => {
  const [resetKey, ] = useState(0);

 

  const cardsData = [
    {
      id: 'card1',
      title: 'Benefits of Opportunity Assessment',
      icon: '💡',
      brief: 'Understand why your product matters and reduce risks.',
      content: [
        'Clarifies the value: It forces you to answer why your product matters.',
        'Reduces risk: Identifying potential pitfalls early can save time and money.',
        'Informs strategy: It guides decisions on market entry, positioning, and resource allocation.',
        'Aligns the team: Everyone understands the "why" and "how" behind the idea.',
      ],
      useCase:
        'For example, before launching a new parking app, assessing the opportunity helps determine if the solution genuinely meets a critical need.',
      quiz: {
        question: 'What is a primary benefit of opportunity assessment?',
        options: [
          { value: 'A', text: 'It delays product launch.' },
          { value: 'B', text: 'It clarifies the product’s value and reduces risk.' },
          { value: 'C', text: 'It increases development costs.' },
          { value: 'D', text: 'It reduces market size.' },
        ],
        correctAnswer: 'B',
        insight: 'Opportunity assessment reduces risk by clarifying value and aligning teams.',
      },
      simulation:
        'Imagine a dashboard that displays risk factors, potential benefits, and a clear strategy roadmap. Interactive metrics show projected savings and team alignment scores.',
      insight: 'Opportunity assessment aligns teams and reduces risks, ensuring a focused product strategy.',
      simulationInsight: 'This simulation highlights risk reduction and strategic alignment benefits.',
    },
    {
      id: 'card2',
      title: 'What Problem Will This Solve? (Value Proposition)',
      icon: '❓',
      brief: 'Define the core promise your product offers.',
      content: [
        'This is the central benefit your product offers—its core promise to customers.',
        'Example: A mobile app that helps users find available parking in crowded cities.',
        'Value Proposition: "Find parking quickly and easily, reducing stress and saving time."',
      ],
      useCase:
        'A driver in a busy downtown area uses the app to locate the nearest available spot, saving time compared to circling around looking for parking.',
      quiz: {
        question: 'What does a strong value proposition communicate?',
        options: [
          { value: 'A', text: 'The detailed technical architecture.' },
          { value: 'B', text: 'The core benefit and promise to the customer.' },
          { value: 'C', text: 'The color scheme of the product.' },
          { value: 'D', text: 'The market competitors.' },
        ],
        correctAnswer: 'B',
        insight: 'A clear value proposition ensures customer-centric product development.',
      },
      simulation:
        'Visualize a split-screen: one side shows a frustrated driver, and the other displays a streamlined app interface guiding the driver to an available parking spot.',
      insight: 'Clarifying the value proposition ensures customer-centric product development.',
      simulationInsight: 'This simulation showcases how a clear value proposition solves user pain points.',
    },
    {
      id: 'card3',
      title: 'For Whom Do We Solve That Problem? (Target Market)',
      icon: '👥',
      brief: 'Identify the specific group of people who face this problem.',
      content: [
        'Determine who experiences the problem and would benefit most from your solution.',
        'Example: Urban commuters, event attendees, or residents in high-density areas.',
      ],
      useCase:
        'Marketing campaigns can be tailored to urban professionals who frequently drive in congested city centers.',
      quiz: {
        question: 'Who is the target market for a parking app?',
        options: [
          { value: 'A', text: 'Rural farmers.' },
          { value: 'B', text: 'Urban commuters and event attendees.' },
          { value: 'C', text: 'Retired seniors.' },
          { value: 'D', text: 'None of the above.' },
        ],
        correctAnswer: 'B',
        insight: 'Identifying the target market ensures focused marketing and product fit.',
      },
      simulation:
        'An interactive map highlights urban areas with heavy traffic, pinpointing potential users and their daily routes.',
      insight: 'A well-defined target market ensures focused marketing and product alignment.',
      simulationInsight: 'This simulation helps visualize your target audience’s needs and behaviors.',
    },
    {
      id: 'card4',
      title: 'How Big Is the Opportunity? (Market Size)',
      icon: '📊',
      brief: 'Estimate potential customers and revenue.',
      content: [
        'Estimate the total number of potential customers and the revenue they could generate.',
        'For instance, if there are 500,000 urban drivers and each saves 15 minutes per day, calculate the potential market value.',
      ],
      useCase:
        'Conduct surveys and analyze traffic data to determine how many drivers face parking challenges and what they’d pay for a solution.',
      quiz: {
        question: 'What does market size estimation help you understand?',
        options: [
          { value: 'A', text: 'User interface design.' },
          { value: 'B', text: 'The total potential revenue and customer base.' },
          { value: 'C', text: 'The technical stack.' },
          { value: 'D', text: 'None of the above.' },
        ],
        correctAnswer: 'B',
        insight: 'Market size estimation validates the financial potential of your product.',
      },
      simulation:
        'See a dynamic chart that adjusts potential market size based on different user adoption rates and pricing models.',
      insight: 'Estimating market size validates the financial potential of your product idea.',
      simulationInsight: 'This simulation quantifies the market opportunity for strategic planning.',
    },
    {
      id: 'card5',
      title: 'What Alternatives Are Out There? (Competitive Landscape)',
      icon: '🎯',
      brief: 'Identify existing solutions and competitors.',
      content: [
        'Identify current solutions addressing the same problem.',
        'Example: For a parking app, competitors might include traditional parking meters, other parking-finding apps like ParkWhiz, or navigation apps with parking features.',
      ],
      useCase:
        'A competitive analysis reveals gaps in real-time updates or niche focus (e.g., street parking vs. parking garages).',
      quiz: {
        question: 'Why is analyzing the competitive landscape important?',
        options: [
          { value: 'A', text: 'It helps to copy competitor features exactly.' },
          { value: 'B', text: 'It identifies gaps and opportunities for differentiation.' },
          { value: 'C', text: 'It increases product costs.' },
          { value: 'D', text: 'None of the above.' },
        ],
        correctAnswer: 'B',
        insight: 'Competitive analysis identifies gaps for differentiation and market positioning.',
      },
      simulation:
        'Interactive competitor matrix where clicking on a competitor shows strengths, weaknesses, and market gaps.',
      insight: 'Understanding competitors helps identify gaps for differentiation.',
      simulationInsight: 'This simulation reveals opportunities for differentiation in a competitive market.',
    },
    {
      id: 'card6',
      title: 'Why Are We Best Suited to Pursue This? (Our Differentiator)',
      icon: '⚙️',
      brief: 'Outline your unique competitive edge.',
      content: [
        'Describe what makes your team or product unique.',
        'Example: A proprietary algorithm for accurate parking availability predictions, exclusive partnerships, or deep market understanding.',
      ],
      useCase:
        'Pilot programs demonstrate higher accuracy in predicting parking spots compared to competitors.',
      quiz: {
        question: 'What is a key aspect of a strong differentiator?',
        options: [
          { value: 'A', text: 'Identical features to competitors.' },
          { value: 'B', text: 'Unique strengths that offer a competitive edge.' },
          { value: 'C', text: 'Higher production costs.' },
          { value: 'D', text: 'None of the above.' },
        ],
        correctAnswer: 'B',
        insight: 'A strong differentiator sets your product apart in a competitive market.',
      },
      simulation:
        'A side-by-side comparison chart that visually highlights your unique features versus competitors.',
      insight: 'A clear differentiator strengthens your competitive positioning.',
      simulationInsight: 'This simulation highlights your unique strengths for market success.',
    },
    {
      id: 'card7',
      title: 'Why Now? (Market Window)',
      icon: '⏰',
      brief: 'Explain the timing and external factors.',
      content: [
        'Describe why this is the right moment to launch your product.',
        'Examples: Increased smartphone penetration, urbanization, and demand for contactless services.',
      ],
      useCase:
        'The surge in urban populations and advancements in real-time data make this an ideal time to launch a parking app.',
      quiz: {
        question: 'What does the "Market Window" refer to?',
        options: [
          { value: 'A', text: 'The product development timeline.' },
          { value: 'B', text: 'The ideal timing to launch based on external trends.' },
          { value: 'C', text: 'The technical infrastructure.' },
          { value: 'D', text: 'None of the above.' },
        ],
        correctAnswer: 'B',
        insight: 'Timing the market window maximizes your product’s relevance and impact.',
      },
      simulation:
        'Timeline slider showing key trends and events that make now the right time to launch.',
      insight: 'Timing the market window ensures your product meets current demands.',
      simulationInsight: 'This simulation emphasizes the urgency of launching at the right time.',
    },
    {
      id: 'card8',
      title: 'How Will We Get This Product to Market? (GTM Strategy)',
      icon: '📣',
      brief: 'Plan your go-to-market approach.',
      content: [
        'Outline your strategy for launching the product and attracting users.',
        'Example: Digital marketing, strategic partnerships, and promotional incentives.',
      ],
      useCase:
        'A phased rollout in select cities with targeted ads and influencer campaigns.',
      quiz: {
        question: 'What is a core element of a GTM strategy?',
        options: [
          { value: 'A', text: 'Ignoring market feedback.' },
          { value: 'B', text: 'Targeted marketing and strategic partnerships.' },
          { value: 'C', text: 'Focusing only on product development.' },
          { value: 'D', text: 'None of the above.' },
        ],
        correctAnswer: 'B',
        insight: 'A strong GTM strategy drives user acquisition and market penetration.',
      },
      simulation:
        'Interactive roadmap that shows stages of product launch, from pilot to full-scale rollout.',
      insight: 'A robust GTM strategy ensures effective market entry and user adoption.',
      simulationInsight: 'This simulation maps out a strategic launch plan for success.',
    },
    {
      id: 'card9',
      title: 'How Will We Measure Success/Make Money? (Metrics/Revenue Strategy)',
      icon: '💰',
      brief: 'Define KPIs and revenue streams.',
      content: [
        'Identify key performance indicators and revenue models.',
        'Example: User acquisition, retention rates, engagement, subscription fees, or ad revenue.',
      ],
      useCase:
        'Measure success by tracking active users, time saved by drivers, and premium subscriptions.',
      quiz: {
        question: 'Which of the following is a key metric for success?',
        options: [
          { value: 'A', text: 'User acquisition and retention rates.' },
          { value: 'B', text: 'The number of features built.' },
          { value: 'C', text: 'Office location.' },
          { value: 'D', text: 'None of the above.' },
        ],
        correctAnswer: 'A',
        insight: 'Defining KPIs ensures measurable progress toward product goals.',
      },
      simulation:
        'Dashboard simulation showing interactive graphs for user growth, retention, and revenue streams.',
      insight: 'Clear metrics and revenue strategies drive measurable success.',
      simulationInsight: 'This simulation visualizes KPIs to track product performance.',
    },
    {
      id: 'card10',
      title: 'What Factors Are Critical to Success? (Solution Requirements)',
      icon: '✅',
      brief: 'Identify essential components for success.',
      content: [
        'List the key requirements your solution must have.',
        'Example: Accurate data, user-friendly interface, and reliable partnerships.',
      ],
      useCase:
        'Success may depend on integrating with city infrastructure for real-time parking data.',
      quiz: {
        question: 'What is a critical factor for a parking app’s success?',
        options: [
          { value: 'A', text: 'Complex design.' },
          { value: 'B', text: 'Accurate real-time data.' },
          { value: 'C', text: 'High pricing.' },
          { value: 'D', text: 'None of the above.' },
        ],
        correctAnswer: 'B',
        insight: 'Critical success factors ensure your product meets user needs effectively.',
      },
      simulation:
        'A checklist simulation that users can interact with to mark critical success factors as complete.',
      insight: 'Identifying critical success factors ensures a robust product foundation.',
      simulationInsight: 'This simulation helps prioritize essential components for success.',
    },
    {
      id: 'card11',
      title: 'Given the Above, What’s the Recommendation? (Go or No-Go)',
      icon: '✅',
      brief: 'Decide whether to move forward with the product.',
      content: [
        'Based on all the gathered insights, determine if the product should be pursued.',
        'Example: If market size is large, competition is manageable, and you have a clear differentiator, the recommendation might be "Go".',
      ],
      useCase:
        'A team uses an Opportunity Canvas to summarize these factors and decides on a "Go" if the outlook is positive.',
      quiz: {
        question: 'What does a "Go" recommendation indicate?',
        options: [
          { value: 'A', text: 'The product should be pursued.' },
          { value: 'B', text: 'The product should be shelved.' },
          { value: 'C', text: 'No decision has been made.' },
          { value: 'D', text: 'None of the above.' },
        ],
        correctAnswer: 'A',
        insight: 'A "Go" decision validates the product’s potential based on comprehensive analysis.',
      },
      simulation:
        'An interactive decision matrix that shows a "Go" or "No-Go" outcome based on weighted criteria.',
      insight: 'A clear recommendation drives confident decision-making for product pursuit.',
      simulationInsight: 'This simulation guides strategic decisions with a clear Go/No-Go outcome.',
    },
  ];

  useEffect(() => {
    toast.info('Frame Your Product Opportunities!', {
      toastId: 'welcome-opportunity',
      theme: 'light',
      style: { background: '#fef3c7', color: '#1f2937' },
    });
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans flex flex-col py-6 sm:py-8">
      <style>{`
        .flip-card {
          perspective: 1000px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        .flip-card.flipped .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>

      <header className="mb-8 border-b border-yellow-200 flex-1">
        <div className="mx-4 sm:mx-6 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 tracking-tight">
            <span className="mr-2 text-2xl">💡</span>
            Framing Product Opportunities
          </h1>
        </div>
        <div className="mx-4 sm:mx-6 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300 text-center">
          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
            Assess product opportunities from all angles to validate your idea and guide your go-to-market strategy.
          </p>
        </div>
      </header>

      <section className="mx-4 sm:mx-6 flex-1 flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col gap-4">
          {cardsData.map((card) => (
            <OpportunityCard key={`${card.id}-${resetKey}`} data={card} />
          ))}
        </div>

        <div className="mt-10 p-4 sm:p-6 bg-yellow-50 border border-yellow-300 rounded-lg shadow-md">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-gray-800">
            The Opportunity Canvas
          </h2>
          <p className="mb-2 text-sm sm:text-base text-gray-700">
            A one-page tool to summarize your product opportunity:
          </p>
          <ul className="list-none space-y-1 text-sm sm:text-base text-gray-700">
            {[
              'Problem Statement/Value Proposition: What problem are you solving and what is your core promise?',
              'Target Market: Who faces this problem?',
              'Market Size: How big is the opportunity?',
              'Competitive Landscape: What alternatives exist?',
              'Differentiators: Why are you uniquely qualified?',
              'Market Timing: Why now?',
              'GTM Strategy: How will you launch the product?',
              'Revenue and Metrics: How will you measure success?',
              'Critical Success Factors: What must be in place?',
              'Final Recommendation: A "Go" or "No-Go" decision.',
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-blue-600">✅</span> <strong>{item.split(':')[0]}:</strong>{item.split(':')[1]}
              </li>
            ))}
          </ul>
          <div className="mt-3 p-3 bg-blue-50 rounded-md">
            <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
              <span className="text-green-600">💡</span> Insights
            </h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              The Opportunity Canvas streamlines decision-making by summarizing critical factors for product success.
            </p>
          </div>
          <p className="mt-4 text-sm sm:text-base text-gray-600 italic">
            Use this canvas to compare and evaluate multiple product ideas quickly.
          </p>
        </div>

        <div className="mt-10 p-4 sm:p-6 bg-yellow-50 border border-yellow-300 rounded-lg shadow-md">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-gray-800">
            Real-Life Example: Grocery Delivery App
          </h2>
          {[
            'Value Proposition: "Deliver fresh groceries in under 30 minutes, saving time and ensuring quality."',
            'Target Market: Busy urban professionals and families.',
            'Market Size: In a metropolitan area with 2 million residents, if 30% are potential customers and each spends $40/month on delivery, the opportunity is significant.',
            'Competitive Landscape: Existing services like Instacart and Amazon Fresh, but with a focus on hyper-local, artisanal products.',
            'Differentiator: Leverages partnerships with local farmers and an AI-driven routing system for faster deliveries.',
            'Market Window: Rising consumer demand for local, sustainable products coupled with improved logistics technology.',
            'GTM Strategy: Launch in select neighborhoods with targeted digital marketing and promotional discounts.',
            'Revenue & Metrics: Measured by customer acquisition, retention, and average order value; revenue via delivery fees and partnerships.',
            'Critical Success Factors: Robust technology, efficient logistics, and reliable supplier relationships.',
            'Recommendation: A "Go" decision based on strong market demand, competitive edge, and favorable timing.',
          ].map((item, index) => (
            <p key={index} className="mb-2 text-sm sm:text-base text-gray-700">
              <strong>{item.split(':')[0]}:</strong>{item.split(':')[1]}
            </p>
          ))}
          <div className="mt-3 p-3 bg-blue-50 rounded-md">
            <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
              <span className="text-green-600">💡</span> Insights
            </h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              This example demonstrates how the Opportunity Canvas validates a grocery delivery app’s potential through comprehensive analysis.
            </p>
          </div>
        </div>

       
      </section>
    </div>
  );
};

export default ProductOpportunityCanvas;