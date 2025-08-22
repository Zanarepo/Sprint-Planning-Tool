import React, { useState } from "react";

/* Print Button Component */
const PrintButton = () => {
  return (
    <button
      onClick={() => window.print()}
      className="m-4 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-4 py-2 rounded-lg inline-flex items-center transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
      aria-label="Print this page"
    >
      <span className="mr-2 text-xl">🖨️</span>
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

/* Simulation Component */
const Simulation = () => {
  const steps = [
    {
      title: "Wireframing",
      description:
        "Sketch a basic layout of your digital product. Imagine drawing boxes for headers, images, buttons, and text. This is your first step—getting the structure down.",
      icon: "📝",
    },
    {
      title: "Prototyping",
      description:
        "Turn your wireframe into an interactive model. Simulate user interactions by clicking through screens. This helps you test the flow and design decisions.",
      icon: "📱",
    },
    {
      title: "Usability Testing",
      description:
        "Test your prototype with real users. Observe how they interact with your design and gather feedback to identify pain points.",
      icon: "🛠️",
    },
    {
      title: "Iteration & Feedback",
      description:
        "Based on the feedback from usability testing, implement changes to improve the design. This iterative process ensures your product meets user needs.",
      icon: "💡",
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className="mt-6">
      {/* Timeline Navigation */}
      <div className="flex justify-around items-center mb-6 overflow-x-auto">
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            className={`flex flex-col items-center p-3 m-1 rounded-lg transition-all duration-300 ${
              index === currentStep
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
        <h2 className="text-xl sm:text-2xl font-bold flex items-center text-gray-800 mb-4">
          <span className="mr-2 text-2xl">{steps[currentStep].icon}</span>
          {steps[currentStep].title}
        </h2>
        <p className="mb-4 text-gray-700 text-sm sm:text-base leading-relaxed">{steps[currentStep].description}</p>
        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2 mb-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index <= currentStep ? "bg-yellow-600" : "bg-yellow-200"
              }`}
            ></div>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

/* Main Component */
const WireframePrototypeUsability = () => {
  const [openSections, setOpenSections] = useState({
    basics: true,
    tools: true,
    fidelity: true,
    usability: true,
    finalThoughts: true,
    simulation: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans">
      <PrintButton />

      {/* Section 1: Wireframing & Prototyping Basics */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">🔍</span>
            Wireframing & Prototyping Basics
          </h1>
          <button
            onClick={() => toggleSection("basics")}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.basics}
            aria-controls="basics-section"
          >
            {openSections.basics ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.basics ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">What Is a Wireframe?</h2>
            <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>Definition:</strong> A wireframe is a simple, visual blueprint of a digital product (like a website or mobile app). Think of it as a rough sketch or a map that shows the layout, structure, and key elements without focusing on colors, fonts, or detailed graphics.
            </p>
            <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>Purpose:</strong>
            </p>
            <ul className="list-disc list-inside mb-2 text-gray-700 text-sm sm:text-base">
              <li><strong>Structure First:</strong> Decide where elements (buttons, images, text, menus) will go.</li>
              <li><strong>Communication Tool:</strong> Discuss ideas with stakeholders early on without getting distracted by design details.</li>
            </ul>
            <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>Example:</strong> Imagine you’re designing a shopping app. A wireframe for the homepage might show a header, a search bar, product listings arranged in a grid, and a footer. There are no colors or real images—just boxes and placeholder text.
            </p>
          </div>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">What Is a Prototype?</h2>
            <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>Definition:</strong> A prototype is an early, working model of your product that simulates how the final version will work. It can be interactive—allowing you to click through different screens and experience transitions and animations.
            </p>
            <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>Purpose:</strong>
            </p>
            <ul className="list-disc list-inside mb-2 text-gray-700 text-sm sm:text-base">
              <li><strong>Test Interactions:</strong> Simulate user interactions to see how users navigate the product.</li>
              <li><strong>Iterative Feedback:</strong> Gather feedback on functionality, usability, and overall flow before full development.</li>
            </ul>
            <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>Example:</strong> In our shopping app example, a prototype might let a user click a product to view details, add it to a cart, and then proceed to checkout—demonstrating the intended user journey.
            </p>
          </div>
          <Quiz
            quizId="quiz1"
            question="What is the primary purpose of a wireframe?"
            options={[
              { value: "A", text: "To determine the color palette." },
              { value: "B", text: "To define layout and structure." },
              { value: "C", text: "To implement the final design." },
              { value: "D", text: "To test server performance." },
            ]}
            correctAnswer="B"
          />
          <Quiz
            quizId="quiz2"
            question="What is the main difference between a wireframe and a prototype?"
            options={[
              { value: "A", text: "Wireframes are interactive." },
              { value: "B", text: "Prototypes simulate user interactions." },
              { value: "C", text: "Wireframes include detailed visuals." },
              { value: "D", text: "There is no difference." },
            ]}
            correctAnswer="B"
          />
        </div>
      </section>

      {/* Section 2: Tools for Wireframing & Prototyping */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">🛠️</span>
            Tools for Wireframing & Prototyping
          </h1>
          <button
            onClick={() => toggleSection("tools")}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.tools}
            aria-controls="tools-section"
          >
            {openSections.tools ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.tools ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">Figma</h2>
            <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>What It Is:</strong> A cloud-based design tool used for both wireframing and high-fidelity prototyping.
            </p>
            <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>Key Features:</strong> Real-time collaboration, interactive prototypes with clickable elements, and extensive libraries of components.
            </p>
            <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>Use Case:</strong> A product team working on a new social media app can use Figma to create detailed, interactive prototypes while collaborating in real time.
            </p>
          </div>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">Balsamiq</h2>
            <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>What It Is:</strong> A dedicated wireframing tool that gives designs a “hand-drawn” look—emphasizing that the designs are early drafts.
            </p>
            <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>Key Features:</strong> Quick, low-fidelity sketches that focus on layout and functionality.
            </p>
            <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>Use Case:</strong> Brainstorming a new dashboard layout for an analytics platform.
            </p>
          </div>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">Miro</h2>
            <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>What It Is:</strong> An online collaborative whiteboard platform ideal for brainstorming, mind mapping, and creating initial wireframes.
            </p>
            <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>Key Features:</strong> Real-time collaboration, sticky notes, sketches, and integrations with other tools.
            </p>
            <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>Use Case:</strong> During a remote design sprint, team members use Miro to outline the user journey and sketch basic wireframes.
            </p>
          </div>
          <Quiz
            quizId="quiz3"
            question="Which tool gives a hand-drawn, low-fidelity sketch look?"
            options={[
              { value: "A", text: "Figma" },
              { value: "B", text: "Miro" },
              { value: "C", text: "Balsamiq" },
              { value: "D", text: "Adobe XD" },
            ]}
            correctAnswer="C"
          />
        </div>
      </section>

      {/* Section 3: Low-Fidelity vs. High-Fidelity Prototypes */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">📊</span>
            Low-Fidelity vs. High-Fidelity Prototypes
          </h1>
          <button
            onClick={() => toggleSection("fidelity")}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.fidelity}
            aria-controls="fidelity-section"
          >
            {openSections.fidelity ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.fidelity ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">Low-Fidelity Prototypes</h2>
            <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>Definition:</strong> Basic representations (often sketches or wireframes) that focus on structure and user flow—without detailed design elements.
            </p>
            <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>Characteristics:</strong>
            </p>
            <ul className="list-disc list-inside mb-2 text-gray-700 text-sm sm:text-base">
              <li>Simple and quick to create.</li>
              <li>Focus on functionality and navigation.</li>
              <li>Ideal for early-stage feedback.</li>
            </ul>
            <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>Example:</strong> A paper sketch or a digital wireframe showing where buttons, menus, and text will be placed.
            </p>
          </div>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">High-Fidelity Prototypes</h2>
            <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>Definition:</strong> Detailed, interactive models that closely resemble the final product in terms of visual design and functionality.
            </p>
            <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>Characteristics:</strong>
            </p>
            <ul className="list-disc list-inside mb-2 text-gray-700 text-sm sm:text-base">
              <li>Includes realistic visuals, typography, and color schemes.</li>
              <li>Interactive elements simulate real user interactions.</li>
              <li>Often built with tools like Figma or Adobe XD.</li>
            </ul>
            <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>Example:</strong> A fully interactive prototype of an e-commerce website where users can click through product pages and simulate a checkout process.
            </p>
          </div>
          <Quiz
            quizId="quiz4"
            question="Which prototype is best for early-stage feedback?"
            options={[
              { value: "A", text: "High-fidelity prototype" },
              { value: "B", text: "Low-fidelity prototype" },
              { value: "C", text: "Both equally" },
              { value: "D", text: "None" },
            ]}
            correctAnswer="B"
          />
        </div>
      </section>

      {/* Section 4: Conducting Usability Testing */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">✅</span>
            Conducting Usability Testing
          </h1>
          <button
            onClick={() => toggleSection("usability")}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.usability}
            aria-controls="usability-section"
          >
            {openSections.usability ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.usability ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">What Is Usability Testing?</h2>
            <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>Definition:</strong> A method to evaluate a product by testing it with representative users. The goal is to identify usability issues and gather feedback.
            </p>
            <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>Purpose:</strong>
            </p>
            <ul className="list-disc list-inside mb-2 text-gray-700 text-sm sm:text-base">
              <li>Observe real user interactions.</li>
              <li>Identify pain points and obstacles in the user flow.</li>
              <li>Gather both qualitative and quantitative data.</li>
            </ul>
            <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>Example:</strong> Testing a mobile banking app by having users perform tasks like logging in, checking their balance, and transferring money.
            </p>
          </div>
          <Quiz
            quizId="quiz5"
            question="What is a primary goal of usability testing?"
            options={[
              { value: "A", text: "To evaluate user interaction and gather feedback." },
              { value: "B", text: "To finalize visual design." },
              { value: "C", text: "To improve server performance." },
              { value: "D", text: "To determine cost structure." },
            ]}
            correctAnswer="A"
          />
        </div>
      </section>

      {/* Section 5: Final Thoughts */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">💡</span>
            Final Thoughts
          </h1>
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
            <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              Understanding the basics of wireframing, prototyping, and usability testing is essential for building effective digital products. By starting with a simple wireframe, creating interactive prototypes, and testing usability with real users, product teams can iterate and refine their designs to create products that truly meet user needs.
            </p>
            <p className="mb-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              Use tools like <strong>Figma</strong>, <strong>Balsamiq</strong>, and <strong>Miro</strong> to streamline your design process, and remember that early feedback is crucial for success.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Simulation */}
      <section className="mb-8">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">🔄</span>
            Simulation: From Wireframe to Usability Testing
          </h1>
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
            <Simulation />
          </div>
        </div>
      </section>
    </div>
  );
};

export default WireframePrototypeUsability;