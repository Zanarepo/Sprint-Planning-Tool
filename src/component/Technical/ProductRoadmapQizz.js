// RoadmapQuiz.jsx
import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const roadmapQuizData = [
  {
    section: "Phase 1: Research & Planning",
    question: "What is the primary focus of the Research & Planning phase?",
    options: [
      { id: "a", text: "Developing the final production code." },
      { id: "b", text: "Gathering requirements, conducting user research, and defining initial UX flows." },
      { id: "c", text: "Launching the complete product to all users." },
      { id: "d", text: "Analyzing sales data and marketing metrics." }
    ],
    correctAnswer: "b",
    explanation: "In the Research & Planning phase, the primary focus is to gather detailed requirements from stakeholders, conduct user research and competitive benchmarking, and define UX flows along with initial wireframes."
  },
  {
    section: "Phase 2: MVP Development",
    question: "What are the key activities in the MVP Development phase?",
    options: [
      { id: "a", text: "Gathering feedback from beta users." },
      { id: "b", text: "Developing the seller registration wizard, integrating core KYC functionality, and setting up backend endpoints with appropriate database schemas." },
      { id: "c", text: "Expanding the product to international markets." },
      { id: "d", text: "Finalizing the marketing strategy for launch." }
    ],
    correctAnswer: "b",
    explanation: "MVP Development focuses on building the minimal viable product with core functionalities. This includes developing the seller registration wizard, integrating essential KYC via third-party APIs, and creating backend endpoints along with the necessary database schemas."
  },
  {
    section: "Phase 3: Beta Launch & Feedback",
    question: "What is the main objective of the Beta Launch phase?",
    options: [
      { id: "a", text: "To release the product widely with complete features." },
      { id: "b", text: "To roll out the MVP to a select group of sellers and gather feedback on usability, compliance accuracy, and performance." },
      { id: "c", text: "To start planning the product roadmap." },
      { id: "d", text: "To finalize the product design aesthetics." }
    ],
    correctAnswer: "b",
    explanation: "The Beta Launch phase is designed to release the MVP to a limited audience. Its main objective is to gather actionable feedback on usability, integration, and compliance which will inform further refinements before the full-scale launch."
  },
  {
    section: "Phase 4: Full Launch & Scale",
    question: "During the Full Launch & Scale phase, what activities are prioritized?",
    options: [
      { id: "a", text: "Refining the onboarding workflow, launching the full version to all sellers, and implementing an admin dashboard for ongoing compliance monitoring." },
      { id: "b", text: "Conducting market research and competitive analysis." },
      { id: "c", text: "Developing initial wireframes and UX flows." },
      { id: "d", text: "Collecting first-round user feedback." }
    ],
    correctAnswer: "a",
    explanation: "In Phase 4, the full product is launched after incorporating feedback. Key activities include refining the onboarding workflow, launching the product to the entire audience, and setting up an Admin Dashboard for compliance and performance monitoring."
  },
  {
    section: "Phase 5: Iteration & Expansion",
    question: "What is the focus of the Iteration & Expansion phase?",
    options: [
      { id: "a", text: "To finalize the MVP." },
      { id: "b", text: "To introduce advanced features like periodic re-verification, automate regulatory updates, and expand support for additional regions." },
      { id: "c", text: "To conduct user research and develop initial prototypes." },
      { id: "d", text: "To shut down the beta testing program." }
    ],
    correctAnswer: "b",
    explanation: "Iteration & Expansion involves continuously improving the product by adding advanced functionalities such as periodic re-verification, automated regulatory updates, deeper analytics, and expanding into new regions as the platform grows."
  }
];

export default function RoadmapQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Store answers as key: question index, value: selected option id.
  const [answers, setAnswers] = useState({});
  // Flag to indicate if current question's answer is submitted.
  const [submitted, setSubmitted] = useState(false);
  // Flag to indicate if the quiz is finished and summary should be displayed.
  const [showSummary, setShowSummary] = useState(false);

  const currentQuestion = roadmapQuizData[currentQuestionIndex];

  const handleOptionChange = (selectedOption) => {
    if (!submitted) {
      setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: selectedOption }));
    }
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (answers[currentQuestionIndex] === undefined) {
      alert("Please select an answer before submitting.");
      return;
    }
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex >= roadmapQuizData.length - 1) {
      setShowSummary(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSubmitted(false);
    }
  };

  const calculateScore = () => {
    return roadmapQuizData.reduce(
      (score, question, idx) => score + (answers[idx] === question.correctAnswer ? 1 : 0),
      0
    );
  };

  // Renders each individual question view.
  const renderQuestion = () => (
    <form className="w-full space-y-6" onSubmit={handleQuestionSubmit}>
      <div className="border rounded-lg p-6 shadow hover:shadow-xl transition duration-200 bg-white">
        <div className="mb-3">
          <span className="text-xl font-semibold text-gray-800">
            {currentQuestionIndex + 1}. [{currentQuestion.section}]
          </span>
          <p className="mt-2 text-lg">{currentQuestion.question}</p>
        </div>
        <div className="space-y-3">
          {currentQuestion.options.map((option) => {
            const isUserChoice = answers[currentQuestionIndex] === option.id;
            let optionClass = "cursor-pointer p-2 rounded border flex items-center border-gray-300 hover:bg-gray-50";
            if (submitted) {
              if (option.id === currentQuestion.correctAnswer) {
                optionClass += " bg-green-100 border-green-400";
              } else if (isUserChoice) {
                optionClass += " bg-red-100 border-red-400";
              }
            }
            return (
              <label key={option.id} className={optionClass}>
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={option.id}
                  checked={isUserChoice || false}
                  onChange={() => handleOptionChange(option.id)}
                  className="mr-3"
                  disabled={submitted}
                />
                <span className="text-lg">{option.text}</span>
              </label>
            );
          })}
        </div>
        {submitted && (
          <div className="mt-4 p-4 bg-gray-50 border rounded border-gray-200">
            {answers[currentQuestionIndex] === currentQuestion.correctAnswer ? (
              <div className="flex items-center text-green-700">
                <FaCheckCircle className="mr-2" /> Correct!
              </div>
            ) : (
              <div className="flex items-center text-red-700">
                <FaTimesCircle className="mr-2" /> Incorrect. The correct answer is{" "}
                <strong>
                  {currentQuestion.options.find(opt => opt.id === currentQuestion.correctAnswer).text}
                </strong>.
              </div>
            )}
            <p className="mt-2 text-gray-800">
              <strong>Explanation:</strong> {currentQuestion.explanation}
            </p>
          </div>
        )}
      </div>
      <div className="text-center">
        {!submitted ? (
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
          >
            Submit Answer
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="px-8 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition-colors"
          >
            {currentQuestionIndex === roadmapQuizData.length - 1 ? "Finish Quiz" : "Next Question"}
          </button>
        )}
      </div>
    </form>
  );

  // Renders the summary view with all questions, feedback, and overall score.
  const renderSummary = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-6">Product Roadmap Quiz Summary</h2>
      {roadmapQuizData.map((questionItem, index) => (
        <div key={index} className="mb-6 border rounded-lg p-6 shadow bg-white">
          <div className="mb-3">
            <span className="text-xl font-semibold text-gray-800">
              {index + 1}. [{questionItem.section}]
            </span>
            <p className="mt-2 text-lg">{questionItem.question}</p>
          </div>
          <div className="space-y-3">
            {questionItem.options.map((option) => {
              const userChoice = answers[index];
              const isUserChoice = userChoice === option.id;
              let optionClass = "p-2 rounded border flex items-center border-gray-300";
              if (option.id === questionItem.correctAnswer) {
                optionClass += " bg-green-100 border-green-400";
              } else if (isUserChoice) {
                optionClass += " bg-red-100 border-red-400";
              }
              return (
                <div key={option.id} className={optionClass}>
                  <span className="text-lg">{option.text}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 p-4 bg-gray-50 border rounded border-gray-200">
            {answers[index] === questionItem.correctAnswer ? (
              <div className="flex items-center text-green-700">
                <FaCheckCircle className="mr-2" /> Correct!
              </div>
            ) : (
              <div className="flex items-center text-red-700">
                <FaTimesCircle className="mr-2" /> Incorrect. The correct answer is{" "}
                <strong>
                  {questionItem.options.find((opt) => opt.id === questionItem.correctAnswer).text}
                </strong>.
              </div>
            )}
            <p className="mt-2 text-gray-800">
              <strong>Explanation:</strong> {questionItem.explanation}
            </p>
          </div>
        </div>
      ))}
      <div className="text-center mt-8">
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded inline-block text-lg font-semibold">
          You scored {calculateScore()} out of {roadmapQuizData.length}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <header className="p-8 bg-blue-600 text-white text-center">
        <h1 className="text-4xl font-bold">Product Roadmap Quiz</h1>
      </header>
      <main className="flex-1 w-full p-8 overflow-y-auto">
        {!showSummary ? renderQuestion() : renderSummary()}
      </main>
      <footer className="p-4 bg-gray-200 text-center text-sm">
        © 2025 Product Roadmap Quiz Module
      </footer>
    </div>
  );
}
