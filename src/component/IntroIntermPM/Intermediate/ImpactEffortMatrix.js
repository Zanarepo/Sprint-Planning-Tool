import React, { useState } from "react";
import {
  FaPrint,
  FaBolt,
  FaRocket,
  FaTasks,
  FaHourglassHalf,
  FaList,
  FaCalculator,
  FaChartBar,
  FaTh,
  FaSortAmountDown,
  FaCheckCircle,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import ImpactEffortMatrixCreate from "./ImpactEffortMatrixCreate";

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

/* Interactive Card Component */
const InteractiveCard = ({ category }) => {
  const [isOpen, setIsOpen] = useState(true);

  // Define quadrant-specific colors
  const quadrantStyles = {
    quickWins: {
      header: "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
      content: "bg-green-50 border-green-300",
    },
    majorProjects: {
      header: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      content: "bg-blue-50 border-blue-300",
    },
    fillIns: {
      header: "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
      content: "bg-purple-50 border-purple-300",
    },
    timeWasters: {
      header: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
      content: "bg-red-50 border-red-300",
    },
  };

  const style = quadrantStyles[category.id] || quadrantStyles.quickWins;

  return (
    <div className="border rounded-lg shadow-md mb-6 overflow-hidden transition-all">
      <div
        className={`px-4 py-3 cursor-pointer flex items-center justify-between text-white ${style.header}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <span className="mr-2 text-2xl">{category.icon}</span>
          <h2 className="text-xl sm:text-2xl font-bold">{category.title}</h2>
        </div>
        <div className="text-2xl">{isOpen ? "−" : "+"}</div>
      </div>
      <div className={`transition-all duration-500 overflow-hidden ${isOpen ? "max-h-max" : "max-h-0"}`}>
        <div className={`px-6 py-4 ${style.content} border`}>
          <section className="mb-4">
            <h3 className="font-semibold mb-1 text-gray-800 text-sm sm:text-base">Definition:</h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{category.definition}</p>
          </section>
          <section className="mb-4">
            <h3 className="font-semibold mb-1 text-gray-800 text-sm sm:text-base">Example & Use Case:</h3>
            <p className="mb-1 text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>Example:</strong> {category.example}
            </p>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>Scenario:</strong> {category.scenario}
            </p>
          </section>
          <section className="mb-4">
            <h3 className="font-semibold mb-1 text-gray-800 text-sm sm:text-base">Key Points:</h3>
            <ul className="list-disc ml-6 text-gray-700 text-sm sm:text-base">
              {category.keyPoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </section>
          <Quiz
            quizId={category.id}
            question={category.quiz.question}
            options={category.quiz.options}
            correctAnswer={category.quiz.correctAnswer}
          />
        </div>
      </div>
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

  const currentStep = steps[currentIndex];

  return (
    <div className="mt-6">
      <div className="flex justify-around items-center mb-6 overflow-x-auto">
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`flex flex-col items-center p-3 m-1 rounded-lg transition-all duration-300 ${
              index === currentIndex
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-blue-100 text-gray-800 hover:bg-blue-200"
            }`}
            aria-label={`Go to ${step.title}`}
          >
            <span className="text-xl sm:text-2xl">{step.icon}</span>
            <span className="mt-1 text-xs sm:text-sm font-medium">{step.title}</span>
          </button>
        ))}
      </div>
      <div className="border rounded-lg p-4 sm:p-6 bg-white shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold flex items-center text-gray-800 mb-4">
          <span className="mr-2 text-2xl">{currentStep.icon}</span>
          {currentStep.title}
        </h2>
        <p className="mb-4 text-gray-700 text-sm sm:text-base leading-relaxed">{currentStep.description}</p>
        <div className="flex justify-center space-x-2 mb-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index <= currentIndex ? "bg-blue-600" : "bg-blue-200"
              }`}
            ></div>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
          >
            <FaArrowLeft className="mr-2 inline" /> Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === steps.length - 1}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
          >
            Next <FaArrowRight className="ml-2 inline" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* Main Impact Effort Matrix Component */
const ImpactEffortMatrix = () => {
  const [openSections, setOpenSections] = useState({
    introduction: true,
    categories: true,
    simulation: true,
    mapping: true,
    finalThoughts: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const categories = [
    {
      id: "quickWins",
      title: "Quick Wins",
      icon: <FaBolt />,
      definition:
        "Quick wins are actions that require relatively little effort but provide high value or impact. They are low-cost, fast to implement, and yield immediate benefits.",
      example:
        "Imagine you’re a PM for a mobile app, and customer feedback shows that users are frustrated by a minor bug in the user interface.",
      scenario:
        "Fixing this bug might take only a couple of days and can significantly improve user satisfaction and retention, resulting in a 10% increase in engagement.",
      keyPoints: [
        "Low effort / low cost: Can be done quickly with minimal resources.",
        "High impact: Provides noticeable improvements in the short term.",
        "Builds momentum and boosts team morale.",
      ],
      quiz: {
        question: "What best describes Quick Wins?",
        options: [
          { value: "A", text: "High effort and low impact." },
          { value: "B", text: "Low effort and high impact." },
          { value: "C", text: "High effort and high impact." },
          { value: "D", text: "Low effort and low impact." },
        ],
        correctAnswer: "B",
      },
    },
    {
      id: "majorProjects",
      title: "Major Projects",
      icon: <FaRocket />,
      definition:
        "Major projects are initiatives that require significant effort, time, and resources but lead to long-term benefits. They are strategic and often involve multiple teams.",
      example:
        "For a fintech startup, integrating advanced fraud detection into a mobile banking app might take months and require a dedicated team.",
      scenario:
        "Such a project can drastically reduce fraud rates and build long-term customer trust, even though it demands extensive planning.",
      keyPoints: [
        "High effort / high cost: Requires substantial resources and planning.",
        "High long-term impact: Can fundamentally improve the product or market position.",
        "Strategic initiatives often involving cross-functional teams.",
      ],
      quiz: {
        question: "Major projects are best characterized by:",
        options: [
          { value: "A", text: "Low effort and high impact." },
          { value: "B", text: "High effort and low impact." },
          { value: "C", text: "High effort and high impact." },
          { value: "D", text: "Low effort and low impact." },
        ],
        correctAnswer: "C",
      },
    },
    {
      id: "fillIns",
      title: "Fill-Ins",
      icon: <FaTasks />,
      definition:
        "Fill-ins are activities that require minimal effort but provide only minimal value. They are often routine tasks that can be completed during spare time.",
      example:
        "Adding an extra FAQ section to a help page requires little time and development effort.",
      scenario:
        "While it might improve the customer experience slightly, it won’t dramatically affect overall usage or revenue.",
      keyPoints: [
        "Low effort / low impact: Easy to implement but don’t significantly move the needle.",
        "Often routine or nice-to-have enhancements.",
        "Useful for keeping teams busy during downtime.",
      ],
      quiz: {
        question: "Fill-ins are best used for:",
        options: [
          { value: "A", text: "Major strategic changes." },
          { value: "B", text: "Routine tasks with minimal impact." },
          { value: "C", text: "High-risk innovations." },
          { value: "D", text: "Critical product overhauls." },
        ],
        correctAnswer: "B",
      },
    },
    {
      id: "timeWasters",
      title: "Time-Wasters",
      icon: <FaHourglassHalf />,
      definition:
        "Time-wasters are activities that consume a lot of effort and resources while providing little to no value. They distract from more impactful projects.",
      example:
        "Spending weeks developing a fancy new feature that users don’t care about is a time-waster.",
      scenario:
        "For example, creating a complex animation for a non-critical part of the app may not improve usability or satisfaction enough to justify the time spent.",
      keyPoints: [
        "High effort / low impact: Consumes significant resources with minimal benefit.",
        "Detrimental opportunity cost: Diverts resources from high-impact tasks.",
        "Should be avoided or eliminated.",
      ],
      quiz: {
        question: "Time-wasters are characterized by:",
        options: [
          { value: "A", text: "Low effort and high impact." },
          { value: "B", text: "High effort and low impact." },
          { value: "C", text: "High effort and high impact." },
          { value: "D", text: "Low effort and low impact." },
        ],
        correctAnswer: "B",
      },
    },
  ];

  const simulationSteps = [
    {
      title: "List Potential Activities",
      icon: <FaList />,
      description:
        "Write down all potential projects, features, or tasks that could add value.",
    },
    {
      title: "Assess Effort/Cost",
      icon: <FaCalculator />,
      description:
        "Evaluate the time, money, and resources required to complete each activity.",
    },
    {
      title: "Evaluate Potential Impact",
      icon: <FaChartBar />,
      description:
        "Determine the expected benefits in both short-term wins and long-term returns.",
    },
    {
      title: "Plot on the Matrix",
      icon: <FaTh />,
      description:
        "Create a two-dimensional grid with Effort/Cost on the X-axis and Impact on the Y-axis.",
    },
    {
      title: "Prioritize",
      icon: <FaSortAmountDown />,
      description:
        "Focus on Quick Wins and Major Projects while scheduling Fill-Ins and eliminating Time-Wasters.",
    },
    {
      title: "Make Decisions",
      icon: <FaCheckCircle />,
      description:
        "Decide which activities to implement based on their position on the matrix.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans">
      <PrintButton />

      {/* Introduction Section */}
      <section className="mb-8 border-b border-blue-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">📊</span>
            Impact Effort Matrix
          </h1>
          <button
            onClick={() => toggleSection("introduction")}
            className="text-blue-600 hover:text-blue-700 text-sm sm:text-base"
            aria-expanded={openSections.introduction}
            aria-controls="introduction-section"
          >
            {openSections.introduction ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.introduction ? "max-h-max" : "max-h-0"}`}>
          <div className="m-4 bg-blue-50 p-4 sm:p-6 rounded-lg shadow-lg border border-blue-300">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              The Impact Effort Matrix is a strategic tool that helps you evaluate and prioritize activities based on the effort required and the potential impact. It divides tasks into four categories: Quick Wins, Major Projects, Fill-Ins, and Time-Wasters.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-8 border-b border-blue-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">🗂️</span>
            Matrix Categories
          </h1>
          <button
            onClick={() => toggleSection("categories")}
            className="text-blue-600 hover:text-blue-700 text-sm sm:text-base"
            aria-expanded={openSections.categories}
            aria-controls="categories-section"
          >
            {openSections.categories ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.categories ? "max-h-max" : "max-h-0"}`}>
          <div className="m-4">
            {categories.map((category) => (
              <InteractiveCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Simulation Section */}
      <section className="mb-8 border-b border-blue-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">🔄</span>
            Simulation: Mapping & Evaluating Actions
          </h1>
          <button
            onClick={() => toggleSection("simulation")}
            className="text-blue-600 hover:text-blue-700 text-sm sm:text-base"
            aria-expanded={openSections.simulation}
            aria-controls="simulation-section"
          >
            {openSections.simulation ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.simulation ? "max-h-max" : "max-h-0"}`}>
          <div className="m-4 bg-blue-50 p-4 sm:p-6 rounded-lg shadow-lg border border-blue-300">
            <SimulationSlider steps={simulationSteps} />
          </div>
        </div>
      </section>

      {/* Mapping and Evaluating Actions Section */}
      <section className="mb-8 border-b border-blue-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">📋</span>
            Mapping and Evaluating Actions
          </h1>
          <button
            onClick={() => toggleSection("mapping")}
            className="text-blue-600 hover:text-blue-700 text-sm sm:text-base"
            aria-expanded={openSections.mapping}
            aria-controls="mapping-section"
          >
            {openSections.mapping ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.mapping ? "max-h-max" : "max-h-0"}`}>
          <div className="m-4 bg-blue-50 p-4 sm:p-6 rounded-lg shadow-lg border border-blue-300">
            <ol className="list-decimal ml-6 space-y-2 text-gray-700 text-sm sm:text-base">
              <li>
                <strong>List Potential Activities:</strong> Write down all possible initiatives.
              </li>
              <li>
                <strong>Assess Effort/Cost:</strong> Evaluate the time, money, and resources required.
              </li>
              <li>
                <strong>Evaluate Potential Impact:</strong> Consider both short-term and long-term benefits.
              </li>
              <li>
                <strong>Plot on the Matrix:</strong> Create a grid with Effort on the X-axis and Impact on the Y-axis.
              </li>
              <li>
                <strong>Prioritize:</strong> Focus on Quick Wins and Major Projects, use Fill-Ins when you have spare capacity, and avoid Time-Wasters.
              </li>
              <li>
                <strong>Make Decisions:</strong> Decide which actions to implement based on their position on the matrix.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Final Thoughts Section */}
      <section className="mb-8 border-b border-blue-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">💡</span>
            Final Thoughts
          </h1>
          <button
            onClick={() => toggleSection("finalThoughts")}
            className="text-blue-600 hover:text-blue-700 text-sm sm:text-base"
            aria-expanded={openSections.finalThoughts}
            aria-controls="final-thoughts-section"
          >
            {openSections.finalThoughts ? "Hide" : "Show"}
          </button>

        </div>

        <div className={`transition-all duration-500 overflow-hidden ${openSections.finalThoughts ? "max-h-max" : "max-h-0"}`}>
          <div className="m-4 bg-blue-50 p-4 sm:p-6 rounded-lg shadow-lg border border-blue-300">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              The Impact Effort Matrix is a powerful tool for prioritizing tasks. It helps you quickly see which activities will bring the best return for the effort required, allowing you to focus on high-impact tasks while avoiding time-wasters. By mapping actions based on effort and impact, you can make smarter, data-driven decisions that balance short-term wins with long-term strategy.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Effort Matrix Create Component */}
      <section className="mb-8">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">📈</span>
            Create Your Matrix
          </h1>
          <button
            onClick={() => toggleSection("createMatrix")}
            className="text-blue-600 hover:text-blue-700 text-sm sm:text-base"
            aria-expanded={openSections.createMatrix}
            aria-controls="create-matrix-section"
          >
            {openSections.createMatrix ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.createMatrix ? "max-h-max" : "max-h-0"}`}>
          <div className="m-4 bg-blue-50 p-4 sm:p-6 rounded-lg shadow-lg border border-blue-300">
            <ImpactEffortMatrixCreate />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImpactEffortMatrix;