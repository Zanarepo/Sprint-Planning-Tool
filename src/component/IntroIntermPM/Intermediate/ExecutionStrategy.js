import React, { useState } from "react";

/* ------------------- Quiz Component ------------------- */
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
    <div className="bg-yellow-50 p-4 sm:p-6 rounded-lg border border-yellow-600 mt-4 shadow-md">
      <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800">{question}</h3>
      {options.map((option, index) => (
        <label key={index} className="block mb-2 cursor-pointer text-gray-700 text-sm sm:text-base">
          <input
            type="radio"
            name={quizId}
            value={option.value}
            onChange={handleOptionChange}
            className="mr-2 accent-yellow-600"
          />
          {option.text}
        </label>
      ))}
      <button
        onClick={handleSubmit}
        className="mt-2 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-lg transition duration-300 text-sm sm:text-base"
      >
        Submit Answer
      </button>
      {feedback && (
        <div
          className={`mt-2 font-bold text-sm sm:text-base ${
            feedback.startsWith("Correct") ? "text-green-600" : "text-red-600"
          }`}
        >
          {feedback}
        </div>
      )}
    </div>
  );
};

/* ------------------- Simulation Component ------------------- */
const RoadmapSimulation = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const current = steps[currentStep];

  return (
    <div className="mt-6 sm:mt-10 p-4 sm:p-6 border-t border-yellow-600">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center text-gray-800">
        <span className="mr-2">🚦</span>Interactive Roadmap Simulation
      </h2>
      {/* Navigation Timeline */}
      <div className="flex justify-around items-center mb-6 overflow-x-auto">
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            className={`flex flex-col items-center p-3 m-1 rounded-full transition-colors text-sm sm:text-base
              ${
                index === currentStep
                  ? "bg-yellow-600 text-white shadow-lg"
                  : "bg-yellow-100 text-gray-800 hover:bg-yellow-200"
              }`}
          >
            <span className="text-2xl sm:text-3xl">{step.icon}</span>
            <span className="mt-1 text-xs sm:text-sm font-medium">{step.title}</span>
          </button>
        ))}
      </div>
      {/* Simulation Details */}
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 border border-yellow-200">
        <div className="flex items-center mb-4">
          <span className="text-2xl sm:text-3xl mr-3">{current.icon}</span>
          <h3 className="text-lg sm:text-2xl font-bold text-gray-800">{current.title}</h3>
        </div>
        <p className="mb-3 text-gray-700 text-sm sm:text-base">{current.description}</p>
        <table className="min-w-full border-collapse mb-3">
          <thead>
            <tr className="bg-yellow-100">
              {current.tableHeaders &&
                current.tableHeaders.map((header, idx) => (
                  <th key={idx} className="border border-yellow-200 px-2 sm:px-4 py-2 text-left text-gray-800 text-sm sm:text-base">
                    {header}
                  </th>
                ))}
            </tr>
          </thead>
          {current.tableData && (
            <tbody>
              {current.tableData.map((row, idx) => (
                <tr key={idx} className="hover:bg-yellow-50">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
        <div className="flex justify-between mt-4">
          <button
            onClick={() =>
              setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev))
            }
            disabled={currentStep === 0}
            className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-lg disabled:opacity-50 transition duration-300 text-sm sm:text-base"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentStep((prev) =>
                prev < steps.length - 1 ? prev + 1 : prev
              )
            }
            disabled={currentStep === steps.length - 1}
            className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-lg disabled:opacity-50 transition duration-300 text-sm sm:text-base"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

/* ------------------- Main Execution & Strategy Component ------------------- */
const ExecutionStrategy = () => {
  // Data for simulation steps
  const simulationSteps = [
    {
      title: "Vision",
      icon: "🏞️",
      description:
        "Your vision is the destination—the long-term, inspiring goal. For example, Instagram’s vision is to empower people to share the world’s moments beautifully.",
      tableHeaders: ["Aspect", "Description"],
      tableData: [
        ["What It Is", "The ultimate picture of success"],
        ["Everyday Analogy", "The destination on your travel map"],
        ["Example", "“To empower people to capture and share moments in a creative way.”"],
      ],
    },
    {
      title: "Strategy",
      icon: "🗺️",
      description:
        "Your strategy is your map—the plan outlining how to reach your vision. It defines focus areas and competitive advantages. Instagram’s strategy, for instance, is built around a mobile-first design and simple, engaging features.",
      tableHeaders: ["Aspect", "Description"],
      tableData: [
        ["What It Is", "The plan or guidelines to achieve the vision"],
        ["Everyday Analogy", "The route and stops on your journey"],
        ["Example", "Focus on mobile-first experience, filters, and community building."],
      ],
    },
    {
      title: "Execution",
      icon: "🚗",
      description:
        "Execution is the journey—the day-to-day tasks and projects that bring your strategy to life. It involves building the product, running campaigns, and iterating based on feedback.",
      tableHeaders: ["Aspect", "Description"],
      tableData: [
        ["What It Is", "The daily work that makes the strategy real"],
        ["Everyday Analogy", "Driving along your planned route"],
        ["Example", "Developing Instagram’s app, adding features like Stories and filters."],
      ],
    },
    {
      title: "Roadmap",
      icon: "🗓️",
      description:
        "A product roadmap is your strategic itinerary. It outlines the themes, epics, features, timelines, and milestones that guide your team. Think of it as planning your road trip step by step.",
      tableHeaders: ["Component", "Example"],
      tableData: [
        ["Themes/Objectives", "Enhance User Engagement"],
        ["Epics/Features", "Develop Stories, In-App Messaging"],
        ["Timeline", "Organized by quarter or sprint"],
        ["Milestones", "MVP Launch, Beta Testing"],
      ],
    },
    {
      title: "Stakeholder Alignment",
      icon: "🤝",
      description:
        "Aligning stakeholders means ensuring that everyone—from executives to team members—is on the same page. This involves clear communication, realistic goal setting, and regular feedback.",
      tableHeaders: ["Tip", "Action"],
      tableData: [
        ["Regular Communication", "Hold meetings and share updates"],
        ["Clear Documentation", "Use visual roadmaps and reports"],
        ["Feedback Loops", "Encourage input and adjust plans as needed"],
      ],
    },
  ];

  // State for collapsible sections
  const [openSections, setOpenSections] = useState({
    strategy: true,
    simulation: true,
    final: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg border border-yellow-600">
      {/* Print Button */}
  
      {/* Header & Objective */}
      <header className="mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-gray-800">Execution & Strategy</h1>
        <p className="text-sm sm:text-lg text-gray-700">
          Objective: Equip yourself with the ability to create a clear product vision, develop a strategy to get there, and execute your plans through an actionable product roadmap. Learn how to bring all stakeholders together and manage their expectations as you move forward.
        </p>
      </header>

      {/* ================== 1. Product Strategy & Roadmapping ================== */}
      <section className="mb-8 sm:mb-12 pb-6 border-b border-yellow-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2">
              <svg className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.76 9h-3.52L12 5.84zM2 13h20v9H2v-9z" />
              </svg>
            </span>
            Product Strategy & Roadmapping
          </h2>
          <button
            onClick={() => toggleSection("strategy")}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.strategy}
            aria-controls="strategy-section"
          >
            {openSections.strategy ? "Hide" : "Show"}
          </button>
        </div>
        {openSections.strategy && (
          <div id="strategy-section">
            {/* A. Vision vs. Strategy vs. Execution */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-2xl font-semibold mb-2 flex items-center text-gray-800">
                <span className="mr-2">🚦</span>Vision vs. Strategy vs. Execution
              </h3>
              <p className="mb-4 text-gray-700 text-sm sm:text-base">
                Understanding these differences is like planning a long road trip. Your vision is the destination, your strategy is the map, and execution is the journey.
              </p>
              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse mb-4">
                  <thead>
                    <tr className="bg-yellow-100">
                      <th className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-800 text-sm sm:text-base">Concept</th>
                      <th className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-800 text-sm sm:text-base">Description</th>
                      <th className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-800 text-sm sm:text-base">Everyday Analogy</th>
                      <th className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-800 text-sm sm:text-base">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-yellow-50">
                      <td className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">Vision</td>
                      <td className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">
                        The long-term, inspiring goal that defines why you’re building the product.
                      </td>
                      <td className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">The destination on your map.</td>
                      <td className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">
                        “To empower people to capture and share moments creatively.” (Instagram)
                      </td>
                    </tr>
                    <tr className="hover:bg-yellow-50">
                      <td className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">Strategy</td>
                      <td className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">
                        The plan or guidelines that outline how you’ll reach your vision.
                      </td>
                      <td className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">The map with roads and stops.</td>
                      <td className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">
                        Focus on mobile-first design and community building.
                      </td>
                    </tr>
                    <tr className="hover:bg-yellow-50">
                      <td className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">Execution</td>
                      <td className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">
                        The day-to-day work that turns the strategy into reality.
                      </td>
                      <td className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">Driving the route and handling detours.</td>
                      <td className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">
                        Building the app, launching features like Stories and filters.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Quiz for Vision vs. Strategy vs. Execution */}
              <Quiz
                quizId="quiz-vision-strategy-execution"
                question="What does 'Strategy' represent in the road trip analogy?"
                options={[
                  { value: "A", text: "The destination." },
                  { value: "B", text: "The map with the planned route." },
                  { value: "C", text: "The journey along the route." },
                  { value: "D", text: "The vehicle used for travel." },
                ]}
                correctAnswer="B"
              />
            </div>

            {/* B. Creating a Product Roadmap */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-2xl font-semibold mb-2 flex items-center text-gray-800">
                <span className="mr-2">🗓️</span>Creating a Product Roadmap
              </h3>
              <p className="mb-4 text-gray-700 text-sm sm:text-base">
                A product roadmap is your strategic itinerary—it shows where your product is headed, what features will be built, and when you expect to deliver them.
              </p>
              <ul className="list-disc ml-6 mb-4 text-gray-700 text-sm sm:text-base">
                <li>
                  <strong>Themes/Objectives:</strong> Broad areas of focus (e.g., “Enhance User Engagement”).
                </li>
                <li>
                  <strong>Epics/Features:</strong> Large pieces of work broken into smaller functionalities (e.g., “Develop Stories feature”).
                </li>
                <li>
                  <strong>Timeline:</strong> When work will begin and end (organized by quarter, month, or sprint).
                </li>
                <li>
                  <strong>Milestones:</strong> Important progress markers (e.g., “MVP Launch”, “Beta Testing Begins”).
                </li>
              </ul>
              {/* Example Table for a Fitness App Roadmap */}
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse mb-4">
                  <thead>
                    <tr className="bg-yellow-100">
                      <th className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-800 text-sm sm:text-base">Quarter</th>
                      <th className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-800 text-sm sm:text-base">Focus</th>
                      <th className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-800 text-sm sm:text-base">Key Activities</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-yellow-50">
                      <td className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">Q1</td>
                      <td className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">Define Vision & Core Features</td>
                      <td className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">Build the MVP</td>
                    </tr>
                    <tr className="hover:bg-yellow-50">
                      <td className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">Q2</td>
                      <td className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">Launch & Feedback</td>
                      <td className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">Launch MVP, gather feedback, iterate</td>
                    </tr>
                    <tr className="hover:bg-yellow-50">
                      <td className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">Q3</td>
                      <td className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">Introduce Premium Features</td>
                      <td className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">Develop personalized training plans</td>
                    </tr>
                    <tr className="hover:bg-yellow-50">
                      <td className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">Q4</td>
                      <td className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">Expand & Refine</td>
                      <td className="border border-yellow-200 px-2 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">Launch on additional platforms, refine UX</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Quiz for Product Roadmap */}
              <Quiz
                quizId="quiz-roadmap"
                question="What is the main purpose of a product roadmap?"
                options={[
                  { value: "A", text: "To detail every single task for developers." },
                  { value: "B", text: "To outline the strategic itinerary with themes, features, timelines, and milestones." },
                  { value: "C", text: "To list all marketing activities for the product launch." },
                  { value: "D", text: "To present the final product design only." },
                ]}
                correctAnswer="B"
              />
            </div>

            {/* C. Aligning Stakeholders & Managing Expectations */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-2xl font-semibold mb-2 flex items-center text-gray-800">
                <span className="mr-2">🤝</span>Aligning Stakeholders & Managing Expectations
              </h3>
              <p className="mb-4 text-gray-700 text-sm sm:text-base">
                For a product to succeed, everyone involved must be on the same page. This means regular communication, clear documentation, and transparent feedback loops.
              </p>
              <ul className="list-disc ml-6 mb-4 text-gray-700 text-sm sm:text-base">
                <li>
                  <strong>Who Are Stakeholders?</strong> Company leadership, team members, investors, customers, and partners.
                </li>
                <li>
                  <strong>How to Align Them:</strong> Regular meetings, updates, shared roadmaps, and collaborative tools.
                </li>
                <li>
                  <strong>Managing Expectations:</strong> Set realistic goals, be transparent about challenges, and show progress with demos or reports.
                </li>
              </ul>
              {/* Quiz for Stakeholder Alignment */}
              <Quiz
                quizId="quiz-stakeholders"
                question="Which of the following is a key method for aligning stakeholders?"
                options={[
                  { value: "A", text: "Avoiding regular communication." },
                  { value: "B", text: "Using clear documentation and frequent updates." },
                  { value: "C", text: "Keeping plans secret until launch." },
                  { value: "D", text: "Only updating once a year." },
                ]}
                correctAnswer="B"
              />
            </div>
          </div>
        )}
      </section>

      {/* ================== Interactive Simulation: Roadmap Journey ================== */}
      <section className="mb-8 sm:mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2">
              <svg className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15H7v-2h6v2zm4-4H7v-2h10v2z" />
              </svg>
            </span>
            Interactive Roadmap Simulation
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
        {openSections.simulation && (
          <div id="simulation-section">
            <RoadmapSimulation steps={simulationSteps} />
          </div>
        )}
      </section>

      {/* ================== Final Thoughts ================== */}
      <section className="mt-6 sm:mt-10 pt-6 border-t border-yellow-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2">
              <svg className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 11-3.8-11.7 8.38 8.38 0 013.8.9L21 3l-1.5 4.5L21 11.5z" />
              </svg>
            </span>
            Final Thoughts
          </h2>
          <button
            onClick={() => toggleSection("final")}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.final}
            aria-controls="final-section"
          >
            {openSections.final ? "Hide" : "Show"}
          </button>
        </div>
        {openSections.final && (
          <div id="final-section">
            <p className="text-sm sm:text-lg text-gray-700">
              By understanding the difference between vision, strategy, and execution, you lay the foundation for a successful product. A well-crafted product roadmap guides your team and aligns everyone toward the same goal, while clear stakeholder communication prevents misunderstandings. Digital giants like Instagram use these frameworks to build products that evolve and captivate millions.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ExecutionStrategy;