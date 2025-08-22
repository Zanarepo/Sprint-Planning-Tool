import React, { useState } from "react";
import WorkshopSimulation from "./WorkshopSimulation";
import TechnicalConstraintsSimulation from "./TechnicalConstraintsSimulation";
import RealTimeChatSimulation from "./RealTimeChatSimulation";
import OrderProcessingSimulation from "./OrderProcessingSimulation";
import PRDSimulation from "./PRDSimulation";

/* --- Quiz Component --- */
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

/* --- Simulation Component --- */
const Simulation = () => {
  const stages = [
    {
      title: "Working with Engineering & Design Teams",
      icon: "👥",
      summary:
        "Bridge business goals and technical execution. Collaborate with design on mockups and with engineering on feasibility and API requirements.",
    },
    {
      title: "Understanding Technical Constraints",
      icon: "⚙️",
      summary:
        "Identify limits such as legacy code, scalability issues, and security requirements. Adjust scope or plan upgrades accordingly.",
    },
    {
      title: "Collaboration Best Practices",
      icon: "💬",
      summary:
        "Hold regular meetings (standups, sprint planning), maintain clear documentation, encourage open communication, and have feedback loops.",
    },
    {
      title: "Writing PRDs",
      icon: "📝",
      summary:
        "Create a detailed blueprint including objectives, user stories, specifications, acceptance criteria, and dependencies.",
    },
  ];

  const [currentStage, setCurrentStage] = useState(0);

  const handleNext = () => {
    setCurrentStage((prev) => (prev < stages.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setCurrentStage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className="mt-6">
      {/* Timeline Navigation */}
      <div className="flex justify-around items-center mb-6 overflow-x-auto">
        {stages.map((stage, index) => (
          <button
            key={index}
            onClick={() => setCurrentStage(index)}
            className={`flex flex-col items-center p-3 m-1 rounded-lg transition-all duration-300 ${
              index === currentStage
                ? "bg-yellow-600 text-white shadow-lg"
                : "bg-yellow-100 text-gray-800 hover:bg-yellow-200"
            }`}
            aria-label={`Go to ${stage.title}`}
          >
            <span className="text-xl sm:text-2xl">{stage.icon}</span>
            <span className="mt-1 text-xs sm:text-sm font-medium">{stage.title}</span>
          </button>
        ))}
      </div>
      {/* Stage Details */}
      <div className="border rounded-lg p-4 sm:p-6 bg-white shadow-md">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-2">{stages[currentStage].icon}</span>
          <span className="text-xl sm:text-2xl font-semibold text-gray-800">
            {stages[currentStage].title}
          </span>
        </div>
        <p className="mb-4 text-gray-700 text-sm sm:text-base leading-relaxed">{stages[currentStage].summary}</p>
        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2 mb-4">
          {stages.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index <= currentStage ? "bg-yellow-600" : "bg-yellow-200"
              }`}
            ></div>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStage === 0}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600 disabled:opacity-50"
          >
            <span className="mr-2">⬅️</span> Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentStage === stages.length - 1}
            className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600 disabled:opacity-50"
          >
            Next <span className="ml-2">➡️</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* --- Main Component --- */
const PMWorkflow = () => {
  const [openSections, setOpenSections] = useState({
    teams: true,
    constraints: true,
    collaboration: true,
    prd: true,
    simulation: true,
    finalThoughts: true,
    workshop: true,
    technical: true,
    chat: true,
    order: true,
    prdSim: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

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

      {/* Section 1: Working with Engineering & Design Teams */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">👥</span>
            Working with Engineering & Design Teams
          </h2>
          <button
            onClick={() => toggleSection("teams")}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.teams}
            aria-controls="teams-section"
          >
            {openSections.teams ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.teams ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300 space-y-4">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>What It Means:</strong> As a PM, you serve as the bridge
              between business goals and technical execution. You work closely
              with both engineering and design teams to ensure the product meets
              customer needs, is technically feasible, and looks and feels great.
            </p>
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Key Responsibilities:</h3>
              <ul className="list-disc ml-6 text-gray-700 text-sm sm:text-base">
                <li>
                  <strong>Translating Requirements:</strong> Explain customer
                  needs and business goals in a way that technical teams can build
                  and designers can visualize.
                </li>
                <li>
                  <strong>Facilitating Communication:</strong> Organize meetings,
                  stand-ups, and review sessions so everyone stays on the same page.
                </li>
                <li>
                  <strong>Prioritizing Tasks:</strong> Help teams understand which
                  features are most important and need to be built first.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Real-World Example:</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Imagine you’re working on a new mobile banking app. Customer
                feedback shows that users want an easier way to check their
                account balances. You collaborate with the Design Team to sketch
                clear, simple dashboard mockups and with the Engineering Team to
                discuss backend API changes and security considerations.
              </p>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Use-Case Scenario:</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                You set up a workshop where designers present layout ideas and
                engineers explain potential technical constraints. Together, you
                reach a consensus on a solution that is both user-friendly and
                feasible.
              </p>
            </div>
            <Quiz
              quizId="quiz1"
              question="What is one key responsibility when working with engineering and design teams?"
              options={[
                { value: "A", text: "Translating customer needs into technical requirements." },
                { value: "B", text: "Working independently without team input." },
                { value: "C", text: "Avoiding meetings to save time." },
                { value: "D", text: "Prioritizing personal ideas over customer needs." },
              ]}
              correctAnswer="A"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Understanding Technical Constraints */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">⚙️</span>
            Understanding Technical Constraints
          </h2>
          <button
            onClick={() => toggleSection("constraints")}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.constraints}
            aria-controls="constraints-section"
          >
            {openSections.constraints ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.constraints ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300 space-y-4">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>What It Means:</strong> Technical constraints are the
              limitations imposed by technology, infrastructure, or existing
              systems. They can include hardware limitations, legacy code issues,
              performance bottlenecks, or integration challenges.
            </p>
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Key Points:</h3>
              <ul className="list-disc ml-6 text-gray-700 text-sm sm:text-base">
                <li>
                  <strong>Feasibility:</strong> Not every idea can be built as
                  envisioned.
                </li>
                <li>
                  <strong>Scalability:</strong> Can the solution handle growth?
                </li>
                <li>
                  <strong>Security & Compliance:</strong> Some features must
                  meet strict regulations.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Real-World Example:</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                When planning a video conferencing feature, engineers might note
                that current servers can’t support high-resolution streams for
                thousands of users—forcing the team to optimize video compression
                or phase the rollout.
              </p>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Use-Case Scenario:</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                In a planning session for a real-time chat feature, engineers
                reveal that the database isn’t optimized for high-frequency writes.
                The PM then collaborates with the team to adjust the feature scope
                or plan for a backend upgrade.
              </p>
            </div>
            <Quiz
              quizId="quiz2"
              question="What is a critical aspect to consider regarding technical constraints?"
              options={[
                { value: "A", text: "Only design aesthetics matter." },
                { value: "B", text: "Feasibility, scalability, and security." },
                { value: "C", text: "Avoiding any change to existing systems." },
                { value: "D", text: "Prioritizing speed over quality." },
              ]}
              correctAnswer="B"
            />
          </div>
        </div>
      </section>

      {/* Section 3: Collaboration Best Practices */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">💬</span>
            Collaboration Best Practices
          </h2>
          <button
            onClick={() => toggleSection("collaboration")}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.collaboration}
            aria-controls="collaboration-section"
          >
            {openSections.collaboration ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.collaboration ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300 space-y-4">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>What It Means:</strong> Collaboration best practices help
              teams work together efficiently, avoid misunderstandings, and
              deliver successful products.
            </p>
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Key Best Practices:</h3>
              <ul className="list-disc ml-6 text-gray-700 text-sm sm:text-base">
                <li>
                  <strong>Regular Meetings:</strong> Daily standups, sprint
                  planning, and “Show & Tell” sessions.
                </li>
                <li>
                  <strong>Clear Documentation:</strong> Keep project documents,
                  design specs, and requirements updated and accessible.
                </li>
                <li>
                  <strong>Open Communication:</strong> Use channels (Slack, Teams)
                  and project management tools (Jira, Trello) for transparency.
                </li>
                <li>
                  <strong>Feedback Loops:</strong> Regular retrospectives to refine
                  processes.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Real-World Example:</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                A startup PM holds biweekly “Show & Tell” sessions where
                engineers and designers share recent work. This boosts transparency
                and sparks collaborative innovation.
              </p>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Use-Case Scenario:</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                During a sprint, a designer spots an inconsistent button style.
                They raise the issue in the daily standup, and the team quickly
                agrees to update the style guide—keeping the project on track.
              </p>
            </div>
            <Quiz
              quizId="quiz3"
              question="Which of the following is a collaboration best practice?"
              options={[
                { value: "A", text: "Avoid regular meetings to save time." },
                { value: "B", text: "Keep documentation updated and hold daily standups." },
                { value: "C", text: "Work in isolation." },
                { value: "D", text: "Skip feedback sessions." },
              ]}
              correctAnswer="B"
            />
          </div>
        </div>
      </section>

      {/* Section 4: Writing PRDs */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">📝</span>
            Writing PRDs (Product Requirement Documents)
          </h2>
          <button
            onClick={() => toggleSection("prd")}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.prd}
            aria-controls="prd-section"
          >
            {openSections.prd ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.prd ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300 space-y-4">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>What It Means:</strong> A PRD is a detailed document that
              outlines the product’s purpose, features, functionality, and success
              criteria. It serves as the blueprint for what needs to be built.
            </p>
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Key Components:</h3>
              <ul className="list-disc ml-6 text-gray-700 text-sm sm:text-base">
                <li>
                  <strong>Objective:</strong> Explain why the product or feature is
                  needed.
                </li>
                <li>
                  <strong>User Stories:</strong> Short descriptions from the user’s
                  perspective.
                </li>
                <li>
                  <strong>Specifications:</strong> Detailed requirements,
                  design guidelines, and technical constraints.
                </li>
                <li>
                  <strong>Acceptance Criteria:</strong> Conditions that must be met
                  for the feature to be complete.
                </li>
                <li>
                  <strong>Dependencies:</strong> Any external factors or assumptions.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Real-World Example:</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                For an e-commerce app feature that filters products by price,
                the PRD would include the objective, user story (e.g., “As a shopper,
                I want to filter by price so I can find items within my budget”),
                detailed specs, and acceptance criteria ensuring smooth performance.
              </p>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Use-Case Scenario:</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                A PM writes a PRD for a new notification system, incorporating user
                stories, design wireframes, and technical notes. During sprint planning,
                the PRD becomes the central reference, ensuring alignment across the team.
              </p>
            </div>
            <Quiz
              quizId="quiz4"
              question="What is a key component of an effective PRD?"
              options={[
                { value: "A", text: "Vague feature ideas with no user context." },
                { value: "B", text: "Clear objectives, user stories, and acceptance criteria." },
                { value: "C", text: "Only technical specifications." },
                { value: "D", text: "A list of features without any details." },
              ]}
              correctAnswer="B"
            />
          </div>
        </div>
      </section>

      {/* Simulation of the Stages */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">🔄</span>
            Interactive Simulation
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
            <Simulation />
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
              Working with engineering and design teams, understanding technical constraints,
              following collaboration best practices, and writing clear PRDs are essential
              to delivering products that truly resonate with users while being technically
              feasible and on schedule.
            </p>
          </div>
        </div>
      </section>

      {/* Workshop Simulation */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">🏭</span>
            Workshop Simulation
          </h2>
          <button
            onClick={() => toggleSection("workshop")}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.workshop}
            aria-controls="workshop-section"
          >
            {openSections.workshop ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.workshop ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300">
            <WorkshopSimulation />
          </div>
        </div>
      </section>

      {/* Technical Constraints Simulation */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">⚙️</span>
            Technical Constraints Simulation
          </h2>
          <button
            onClick={() => toggleSection("technical")}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.technical}
            aria-controls="technical-section"
          >
            {openSections.technical ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.technical ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300">
            <TechnicalConstraintsSimulation />
          </div>
        </div>
      </section>

      {/* Real-Time Chat Simulation */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">💬</span>
            Real-Time Chat Simulation
          </h2>
          <button
            onClick={() => toggleSection("chat")}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.chat}
            aria-controls="chat-section"
          >
            {openSections.chat ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.chat ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300">
            <RealTimeChatSimulation />
          </div>
        </div>
      </section>

      {/* Order Processing Simulation */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">🛒</span>
            Order Processing Simulation
          </h2>
          <button
            onClick={() => toggleSection("order")}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.order}
            aria-controls="order-section"
          >
            {openSections.order ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.order ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300">
            <OrderProcessingSimulation />
          </div>
        </div>
      </section>

      {/* PRD Simulation */}
      <section className="mb-8">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">📝</span>
            PRD Simulation
          </h2>
          <button
            onClick={() => toggleSection("prdSim")}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.prdSim}
            aria-controls="prdSim-section"
          >
            {openSections.prdSim ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.prdSim ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300">
            <PRDSimulation />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PMWorkflow;