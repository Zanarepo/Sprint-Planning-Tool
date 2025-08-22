import React, { useState } from "react";
import {
  FaPrint,
  FaLightbulb,
  FaSearch,
  FaRegCommentDots,
  FaChartLine,
  FaUserAlt,
  FaQuestionCircle,
} from "react-icons/fa";

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
    <div className="bg-gray-100 p-4 rounded mt-4 border">
      <h3 className="text-lg font-semibold mb-2">{question}</h3>
      {options.map((option, index) => (
        <label key={index} className="block mb-2 cursor-pointer">
          <input
            type="radio"
            name={quizId}
            value={option.value}
            onChange={handleOptionChange}
            className="mr-2"
          />
          {option.text}
        </label>
      ))}
      <button
        onClick={handleSubmit}
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit Answer
      </button>
      {feedback && (
        <div
          className={`mt-2 font-bold ${
            feedback.startsWith("Correct")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {feedback}
        </div>
      )}
    </div>
  );
};

/* Simulation Component – Interactive Timeline of Discovery Key Questions */
const Simulation = () => {
  const steps = [
    {
      id: 1,
      title: "Why are we doing this?",
      description:
        "Define the purpose and motivation behind your product. For example, providing an easier way for busy professionals to manage their schedules.",
    },
    {
      id: 2,
      title: "For whom are we doing this?",
      description:
        "Identify the target audience. E.g., college students who need an efficient study planner or busy professionals seeking time-management solutions.",
    },
    {
      id: 3,
      title: "What people problem do we solve?",
      description:
        "Define the specific pain points. For example, existing planners are too generic and don’t adapt to individual needs.",
    },
    {
      id: 4,
      title: "How are we solving the problem?",
      description:
        "Describe your approach. For example, a smart planner app that uses AI to create personalized schedules based on user data.",
    },
    {
      id: 5,
      title: "What do we want to achieve?",
      description:
        "Set clear goals and outcomes. E.g., increased efficiency, improved performance, and reduced stress.",
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="bg-gray-50 p-6 rounded shadow my-6">
      <h3 className="text-xl font-bold mb-4">Interactive Product Discovery Simulation</h3>
      <div className="border p-4 rounded bg-white">
        <h4 className="text-lg font-semibold mb-2">
          {steps[currentStep].title}
        </h4>
        <p>{steps[currentStep].description}</p>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <div className="mt-4 text-center">
        Step {currentStep + 1} of {steps.length}
      </div>
    </div>
  );
};

/* Main Product Discovery Component */
const ProductDiscovery = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Print Button */}
      <button
        onClick={() => window.print()}
        className="mb-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded inline-flex items-center"
      >
        <FaPrint className="mr-2" /> Print
      </button>

      {/* Product Discovery Introduction */}
      <section className="mb-10">
        <h1 className="text-3xl font-bold mb-4 flex items-center">
          <FaLightbulb className="text-yellow-500 mr-2" /> Product Discovery Introduction
        </h1>
        <p className="mb-4">
          Product Discovery is a critical phase in product management. It’s the process of understanding and validating what you should build, for whom, and why—before you invest significant time and resources in development. Think of it as the "research and planning" phase that helps ensure you create a product that people truly need and love.
        </p>
      </section>

      {/* What is Product Discovery */}
      <section className="mb-10 border-b pb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FaSearch className="text-blue-500 mr-2" /> What is Product Discovery?
        </h2>
        <p className="mb-4">
          Product Discovery is the methodical process of exploring ideas and gathering insights to define a product’s direction. It involves:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Identifying Opportunities:</strong> Uncovering user needs, pain points, and market gaps.
          </li>
          <li>
            <strong>Validating Assumptions:</strong> Testing ideas through customer feedback, prototypes, or experiments.
          </li>
          <li>
            <strong>Defining the Problem:</strong> Clearly stating the problem you’re trying to solve.
          </li>
          <li>
            <strong>Exploring Solutions:</strong> Brainstorming potential solutions and assessing which will deliver the best outcomes.
          </li>
        </ul>
        <p className="mb-4">
          <strong>Example:</strong> Imagine you’re thinking about building a fitness tracking app. Through product discovery, you might learn that many users are frustrated with how their current apps don’t integrate well with wearable devices or offer personalized workout plans. This insight directs you to build a product that uniquely addresses these pain points.
        </p>
        <Quiz
          quizId="quiz1"
          question="Quiz: What is the primary goal of Product Discovery?"
          options={[
            { value: "A", text: "To jump straight into development." },
            { value: "B", text: "To understand and validate what should be built, for whom, and why." },
            { value: "C", text: "To design the UI without user feedback." },
            { value: "D", text: "To market the product before it exists." },
          ]}
          correctAnswer="B"
        />
      </section>

      {/* When Should You Do Product Discovery */}
      <section className="mb-10 border-b pb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FaRegCommentDots className="text-purple-500 mr-2" /> When Should You Do Product Discovery?
        </h2>
        <p className="mb-4">
          Product Discovery should be done:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Before Development:</strong> Always start with discovery to validate that the idea is worth building.
          </li>
          <li>
            <strong>When Entering a New Market:</strong> Use discovery to understand unique needs of a new audience.
          </li>
          <li>
            <strong>When Pivoting:</strong> If your current product isn’t performing as expected, discovery helps determine if a pivot is needed.
          </li>
          <li>
            <strong>Continuously:</strong> Even after launch, ongoing discovery refines and evolves your product based on real feedback.
          </li>
        </ul>
        <p className="mb-4">
          <strong>Example:</strong> A startup developing an e-commerce platform might use product discovery early on to determine which features (like one-click checkout or personalized recommendations) would most improve the shopping experience.
        </p>
        <Quiz
          quizId="quiz2"
          question="Quiz: When is the best time to conduct Product Discovery?"
          options={[
            { value: "A", text: "After the product is fully developed." },
            { value: "B", text: "Before development, and continuously even after launch." },
            { value: "C", text: "Only when the product is failing." },
            { value: "D", text: "When competitors release a similar product." },
          ]}
          correctAnswer="B"
        />
      </section>

      {/* How Do You Do Product Discovery */}
      <section className="mb-10 border-b pb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FaChartLine className="text-red-500 mr-2" /> How Do You Do Product Discovery?
        </h2>
        <p className="mb-4">
          Product Discovery is a mix of research, experimentation, and collaboration. Common methods include:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>User Interviews & Surveys:</strong> Talk directly to potential users to understand their challenges.
          </li>
          <li>
            <strong>Market Research:</strong> Analyze competitors, market trends, and industry data to identify opportunities.
          </li>
          <li>
            <strong>Prototyping & Wireframing:</strong> Create simple models or mockups to visualize ideas and get early feedback.
          </li>
          <li>
            <strong>Usability Testing:</strong> Observe real users interacting with prototypes to spot issues.
          </li>
          <li>
            <strong>Data Analysis:</strong> Validate assumptions with quantitative evidence.
          </li>
          <li>
            <strong>Brainstorming & Workshops:</strong> Collaborate with your team to ideate and prioritize solutions.
          </li>
        </ul>
        <p className="mb-4">
          <strong>Example:</strong> Testing a clickable prototype of a new fitness app interface to see if it improves usability.
        </p>
        <Quiz
          quizId="quiz3"
          question="Quiz: Which of the following is a method used in Product Discovery?"
          options={[
            { value: "A", text: "Guessing user preferences without data." },
            { value: "B", text: "Conducting user interviews and surveys." },
            { value: "C", text: "Skipping user feedback to save time." },
            { value: "D", text: "Directly launching the product without testing." },
          ]}
          correctAnswer="B"
        />
      </section>

      {/* Why Product Discovery */}
      <section className="mb-10 border-b pb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FaLightbulb className="text-yellow-500 mr-2" /> Why Product Discovery?
        </h2>
        <p className="mb-4">
          Product Discovery minimizes risk and maximizes success by ensuring you build the right product. It:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Reduces Waste:</strong> Validates ideas early to avoid unnecessary investment.
          </li>
          <li>
            <strong>Ensures Product-Market Fit:</strong> Tailors your product to solve real user problems.
          </li>
          <li>
            <strong>Guides Decision Making:</strong> Informs priorities and the product roadmap.
          </li>
          <li>
            <strong>Fosters Innovation:</strong> Encourages creative solutions that stand out in the market.
          </li>
        </ul>
        <p className="mb-4">
          <strong>Example:</strong> Before adding a new feature to a social media app, a team might conduct discovery to ensure it will enhance engagement rather than complicate the user experience.
        </p>
        <Quiz
          quizId="quiz4"
          question="Quiz: What is a key benefit of Product Discovery?"
          options={[
            { value: "A", text: "Building a product without user input." },
            { value: "B", text: "Ensuring the product solves real user problems and fits the market." },
            { value: "C", text: "Skipping research to speed up development." },
            { value: "D", text: "Focusing solely on competitor products." },
          ]}
          correctAnswer="B"
        />
      </section>

      {/* Discovery Answers the Following Questions */}
      <section className="mb-10 border-b pb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FaUserAlt className="text-green-500 mr-2" /> Discovery Answers the Following Questions
        </h2>
        <ol className="list-decimal list-inside mb-4">
          <li>
            <strong>Why are we doing this?</strong> – Understand the motivation behind building the product. <em>(e.g., to provide an easier way for busy professionals to manage their schedules.)</em>
          </li>
          <li>
            <strong>For whom are we doing this?</strong> – Identify the target audience. <em>(e.g., college students in need of an efficient study planner.)</em>
          </li>
          <li>
            <strong>What people problem do we solve?</strong> – Define the specific pain points. <em>(e.g., current planners are too generic.)</em>
          </li>
          <li>
            <strong>How are we solving the problem?</strong> – Describe your approach. <em>(e.g., a smart study planner app with AI-driven suggestions.)</em>
          </li>
          <li>
            <strong>What do we want to achieve?</strong> – Set clear goals and outcomes. <em>(e.g., increased study efficiency and reduced stress.)</em>
          </li>
        </ol>
      </section>

      {/* Summary */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FaQuestionCircle className="text-indigo-500 mr-2" /> Summary
        </h2>
        <p className="mb-4">
          Product Discovery is the foundation of successful product management. It ensures that:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>We build products that truly solve real problems.</li>
          <li>We create products for the right audience at the right time.</li>
          <li>We set clear goals and validate our assumptions with real data and user feedback.</li>
        </ul>
        <p>
          By answering the key questions—why, for whom, what problem, how, and what outcomes—Product Discovery guides you to make informed decisions, align your team, and ultimately create products that resonate with users.
        </p>
      </section>

      {/* Interactive Simulation */}
      <Simulation />

      {/* Final Note */}
      <section className="mb-10">
        <p className="text-center text-gray-600 italic">
          Interactive simulation and quizzes designed to enhance your understanding of Product Discovery.
        </p>
      </section>
    </div>
  );
};

export default ProductDiscovery;
