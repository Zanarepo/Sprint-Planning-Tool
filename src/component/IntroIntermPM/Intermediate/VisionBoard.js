import React, { useState } from "react";
import VisionDisplay from './VisionDisplay';
import VisionBoardCreate from './VisionBoardCreate';

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
    setFeedback(selected === correctAnswer ? "Correct! 🎉" : "Incorrect. Try again!");
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

/* Interactive Card Component */
const InteractiveCard = ({ section }) => {
  return (
    <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300">
      <div className="flex items-center mb-4">
        <span className="mr-2 text-2xl">{section.icon}</span>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">{section.title}</h2>
      </div>
      <section className="mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">Definition:</h3>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{section.definition}</p>
      </section>
      <section className="mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">Example:</h3>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{section.example}</p>
      </section>
      {section.scenario && (
        <section className="mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">Scenario:</h3>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{section.scenario}</p>
        </section>
      )}
      {section.keyPoints && (
        <section className="mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">Key Points:</h3>
          <ul className="list-disc ml-6 text-gray-700 text-sm sm:text-base">
            {section.keyPoints.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </section>
      )}
      {section.quiz && (
        <Quiz
          quizId={section.id}
          question={section.quiz.question}
          options={section.quiz.options}
          correctAnswer={section.quiz.correctAnswer}
        />
      )}
    </div>
  );
};

/* Simulation Slider Component */
const SimulationSlider = ({ steps }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className="mt-6">
      {/* Timeline Navigation */}
      <div className="flex justify-around items-center mb-6 overflow-x-auto">
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`flex flex-col items-center p-3 m-1 rounded-lg transition-all duration-300 ${
              index === currentIndex
                ? "bg-yellow-600 text-white shadow-lg"
                : "bg-yellow-100 text-gray-800 hover:bg-yellow-200"
            }`}
            aria-label={`Go to ${step.title}`}
          >
            <span className="text-xl sm:text-2xl">{step.icon}</span>
            <span className="mt-1 text-xs sm:text-sm font-medium">{step.title}</span>
          </button>
        ))}
      </div>
      {/* Step Details */}
      <div className="border rounded-lg p-4 sm:p-6 bg-white shadow-md">
        <div className="flex items-center mb-4">
          <span className="mr-2 text-2xl">{steps[currentIndex].icon}</span>
          <span className="text-xl sm:text-2xl font-semibold text-gray-800">{steps[currentIndex].title}</span>
        </div>
        <p className="mb-4 text-gray-700 text-sm sm:text-base leading-relaxed">{steps[currentIndex].description}</p>
        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2 mb-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index <= currentIndex ? "bg-yellow-600" : "bg-yellow-200"
              }`}
            ></div>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600 disabled:opacity-50"
          >
            <span className="mr-2">⬅️</span> Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === steps.length - 1}
            className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600 disabled:opacity-50"
          >
            Next <span className="ml-2">➡️</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* --- Main Product Vision Board Component --- */
const ProductVisionBoard = () => {
  const [openSections, setOpenSections] = useState({
    coreComponents: true,
    useCases: true,
    benefits: true,
    simulation: true,
    finalThoughts: true,
    visionDisplay: true,
    visionBoardCreate: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Data for core components
  const coreComponents = [
    {
      id: "targetAudience",
      title: "Target Audience",
      icon: "👥",
      definition:
        "Who are the users or customers that the product is intended for?",
      example:
        'Example: "Tech-savvy millennials in urban areas who are underserved by traditional banking."',
      keyPoints: [
        "Clarifies who the product is built for.",
        "Helps tailor marketing and design strategies.",
      ],
      quiz: {
        question: "Who best describes the target audience in our example?",
        options: [
          { value: "A", text: "Retirees in rural areas" },
          { value: "B", text: "Tech-savvy millennials in urban areas" },
          { value: "C", text: "Traditional bank customers" },
          { value: "D", text: "Young children" },
        ],
        correctAnswer: "B",
      },
    },
    {
      id: "userNeeds",
      title: "User Needs / Problems",
      icon: "⚠️",
      definition:
        "What key challenges or pain points do the target users experience?",
      example:
        'Example: "Users find traditional banking apps too cumbersome and time-consuming."',
      keyPoints: [
        "Identifies the problems that need solving.",
        "Drives the direction for the product solution.",
      ],
      quiz: {
        question: "User needs/problems refer to:",
        options: [
          { value: "A", text: "The technical specifications of the product" },
          { value: "B", text: "The challenges faced by users" },
          { value: "C", text: "The company’s revenue goals" },
          { value: "D", text: "The design aesthetics only" },
        ],
        correctAnswer: "B",
      },
    },
    {
      id: "productSolution",
      title: "Product Solution",
      icon: "💡",
      definition:
        "What is the core idea or value proposition of the product?",
      example:
        'Example: "A sleek, intuitive mobile banking app that simplifies everyday transactions."',
      keyPoints: [
        "Highlights how the product solves the users’ problems.",
        "Differentiates the product from competitors.",
      ],
      quiz: {
        question: "The product solution should:",
        options: [
          { value: "A", text: "Only focus on aesthetics" },
          { value: "B", text: "Clearly address user problems" },
          { value: "C", text: "Ignore competitor features" },
          { value: "D", text: "Be vague about its benefits" },
        ],
        correctAnswer: "B",
      },
    },
    {
      id: "businessGoals",
      title: "Business Goals",
      icon: "🎯",
      definition:
        "What are the long-term objectives for the product from a business perspective?",
      example:
        'Example: "Achieve 1 million active users in the first year, increase customer retention by 20%, and open new revenue streams through partnerships."',
      keyPoints: [
        "Aligns the product with company strategy.",
        "Helps measure success over time.",
      ],
      quiz: {
        question: "Business goals help to:",
        options: [
          { value: "A", text: "Set vague targets" },
          { value: "B", text: "Measure long-term success" },
          { value: "C", text: "Focus solely on design" },
          { value: "D", text: "Ignore user needs" },
        ],
        correctAnswer: "B",
      },
    },
    {
      id: "keyDifferentiators",
      title: "Key Differentiators",
      icon: "⭐",
      definition:
        "What makes the product unique compared to competitors?",
      example:
        'Example: "A unique blend of innovative security features (like biometric authentication) combined with a user-friendly interface."',
      keyPoints: [
        "Highlights unique selling points.",
        "Provides competitive advantage.",
      ],
      quiz: {
        question: "Key differentiators should:",
        options: [
          { value: "A", text: "Be the same as competitors" },
          { value: "B", text: "Show what makes the product unique" },
          { value: "C", text: "Ignore user feedback" },
          { value: "D", text: "Focus on cost reduction only" },
        ],
        correctAnswer: "B",
      },
    },
    {
      id: "visionStatement",
      title: "Vision Statement",
      icon: "📜",
      definition:
        "A concise statement that encapsulates the overarching goal of the product.",
      example:
        'Example: "Empowering users to manage their finances effortlessly and securely from their smartphones."',
      keyPoints: [
        "Serves as the product’s North Star.",
        "Guides decision-making across teams.",
      ],
      quiz: {
        question: "The vision statement should:",
        options: [
          { value: "A", text: "Be long and detailed" },
          { value: "B", text: "Concise and inspiring" },
          { value: "C", text: "Exclude customer needs" },
          { value: "D", text: "Focus solely on profits" },
        ],
        correctAnswer: "B",
      },
    },
  ];

  // Data for use case cards
  const useCases = [
    {
      id: "useCase1",
      title: "Use Case: Mobile Banking App",
      icon: "📱",
      definition:
        "A fintech startup uses a Vision Board to align stakeholders around launching a mobile banking app.",
      example:
        "The board identifies urban millennials as the target audience, highlights their need for a simple, fast, and secure financial management tool, and outlines key features like biometric login and budgeting tools.",
      scenario:
        "During a vision workshop, the PM, along with designers, engineers, and marketing, agrees on a clear value proposition that drives feature prioritization and guides marketing efforts.",
      keyPoints: [
        "Aligns the team on customer needs and strategic goals.",
        "Prioritizes high-impact features like biometric security.",
        "Serves as a reference during product development and launch.",
      ],
      quiz: {
        question: "What is the primary impact of using a Vision Board for a mobile banking app?",
        options: [
          { value: "A", text: "It delays the project timeline." },
          { value: "B", text: "It aligns teams and prioritizes high-impact features." },
          { value: "C", text: "It focuses only on design aesthetics." },
          { value: "D", text: "It ignores user feedback." },
        ],
        correctAnswer: "B",
      },
    },
    {
      id: "useCase2",
      title: "Use Case: Professional Networking Platform",
      icon: "🌐",
      definition:
        "A company leverages a Vision Board to launch a networking platform for freelancers and entrepreneurs.",
      example:
        "The board defines the target audience as freelancers and startup founders, emphasizes the need for networking and mentorship, and outlines a solution that integrates job-matching with community features.",
      scenario:
        "The PM uses the Vision Board to set strategic goals—such as reaching 500,000 active users—and to differentiate the platform through intelligent matching algorithms and a community-driven interface.",
      keyPoints: [
        "Clarifies the product’s unique value proposition.",
        "Guides feature prioritization and strategic goals.",
        "Helps communicate the vision to investors and early adopters.",
      ],
      quiz: {
        question: "The Vision Board for the networking platform primarily helps to:",
        options: [
          { value: "A", text: "Ignore market trends." },
          { value: "B", text: "Guide strategic feature prioritization." },
          { value: "C", text: "Focus only on short-term gains." },
          { value: "D", text: "Eliminate the need for marketing." },
        ],
        correctAnswer: "B",
      },
    },
  ];

  // Data for simulation slider steps
  const simulationSteps = [
    {
      title: "Identify Target Audience",
      icon: "👥",
      description:
        "Determine who your product is for by identifying key demographics and user segments.",
    },
    {
      title: "Define User Needs/Problems",
      icon: "⚠️",
      description:
        "List the main challenges or pain points your target users face.",
    },
    {
      title: "Develop the Product Solution",
      icon: "💡",
      description:
        "Outline how your product addresses the user needs with a unique solution.",
    },
    {
      title: "Set Business Goals",
      icon: "🎯",
      description:
        "Establish clear, measurable long-term objectives for your product.",
    },
    {
      title: "Determine Key Differentiators",
      icon: "⭐",
      description:
        "Identify what makes your product stand out from the competition.",
    },
    {
      title: "Craft the Vision Statement",
      icon: "📜",
      description:
        "Create a concise statement that captures the product's ultimate goal.",
    },
    {
      title: "Align & Refine the Vision",
      icon: "💻",
      description:
        "Review and adjust your Vision Board with feedback from stakeholders to ensure clarity and alignment.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans">
      {/* Print Button */}
      <div className="flex justify-end m-4">
        <button
          onClick={() => window.print()}
          className="flex items-center bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          aria-label="Print this page"
        >
          <span className="mr-2 text-xl">🖨️</span>
          Print
        </button>
      </div>

      {/* Title and Introduction */}
      <header className="m-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          Product Vision Board
        </h1>
        <p className="text-center text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
          A Vision Board in product management is a strategic tool used to
          articulate, visualize, and align the long-term vision and strategy of a
          product. It serves as a "North Star" guiding decisions from development
          to marketing.
        </p>
      </header>

      {/* Core Components Section */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">🔍</span>
            Core Components
          </h2>
          <button
            onClick={() => toggleSection("coreComponents")}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.coreComponents}
            aria-controls="core-components-section"
          >
            {openSections.coreComponents ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.coreComponents ? 'max-h-max' : 'max-h-0'}`}>
          {coreComponents.map((component) => (
            <InteractiveCard key={component.id} section={component} />
          ))}
        </div>
      </section>

      {/* Use Cases & Real-Life Scenarios Section */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">📚</span>
            Use Cases & Real-Life Scenarios
          </h2>
          <button
            onClick={() => toggleSection("useCases")}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.useCases}
            aria-controls="use-cases-section"
          >
            {openSections.useCases ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.useCases ? 'max-h-max' : 'max-h-0'}`}>
          {useCases.map((useCase) => (
            <InteractiveCard key={useCase.id} section={useCase} />
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">✅</span>
            Benefits of a Product Vision Board
          </h2>
          <button
            onClick={() => toggleSection("benefits")}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.benefits}
            aria-controls="benefits-section"
          >
            {openSections.benefits ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.benefits ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300">
            <ul className="list-disc ml-6 space-y-2 text-gray-700 text-sm sm:text-base">
              <li>
                <strong>Alignment:</strong> Ensures all stakeholders share a common
                understanding of the product’s purpose.
              </li>
              <li>
                <strong>Clarity:</strong> Breaks down complex goals into clear, actionable
                components.
              </li>
              <li>
                <strong>Communication:</strong> Serves as a visual reference for internal and
                external stakeholders.
              </li>
              <li>
                <strong>Decision-Making:</strong> Provides a framework to evaluate new ideas
                against the core vision.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Simulation Slider */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">🔄</span>
            Vision Board Simulation
          </h2>
          <button
            onClick={() => toggleSection("simulation")}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.simulation}
            aria-controls="simulation-section"
          >
            {openSections.simulation ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.simulation ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300">
            <SimulationSlider steps={simulationSteps} />
          </div>
        </div>
      </section>

      {/* Final Thoughts */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">💡</span>
            Final Thoughts
          </h2>
          <button
            onClick={() => toggleSection("finalThoughts")}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.finalThoughts}
            aria-controls="final-thoughts-section"
          >
            {openSections.finalThoughts ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.finalThoughts ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              A Product Vision Board is a dynamic tool that evolves with your product.
              By clearly outlining your target audience, user needs, product solution,
              business goals, and key differentiators, it becomes the cornerstone of your
              product strategy. Use it to stay aligned, make informed decisions, and
              communicate your strategy effectively across teams.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Display */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">📊</span>
            Vision Display
          </h2>
          <button
            onClick={() => toggleSection("visionDisplay")}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.visionDisplay}
            aria-controls="vision-display-section"
          >
            {openSections.visionDisplay ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.visionDisplay ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300">
            <VisionDisplay />
          </div>
        </div>
      </section>

      {/* Vision Board Create */}
      <section className="mb-8">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">✍️</span>
            Vision Board Create
          </h2>
          <button
            onClick={() => toggleSection("visionBoardCreate")}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.visionBoardCreate}
            aria-controls="vision-board-create-section"
          >
            {openSections.visionBoardCreate ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.visionBoardCreate ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300">
            <VisionBoardCreate />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductVisionBoard;