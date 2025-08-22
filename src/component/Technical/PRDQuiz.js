// PRDQuiz.jsx
import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const prdQuizData = [
  {
    section: "Overview",
    question: "What is the primary purpose of a Product Requirements Document (PRD)?",
    options: [
      { id: "a", text: "To outline the design mockups for the product." },
      { id: "b", text: "To clearly define the product features, requirements, and expectations for the development team." },
      { id: "c", text: "To specify marketing strategies and sales tactics." },
      { id: "d", text: "To document the code implementation details." }
    ],
    correctAnswer: "b",
    explanation: "A PRD’s core purpose is to clearly define and document the product requirements—including features, user stories, and success criteria—to ensure alignment between stakeholders and the development team."
  },
  {
    section: "Key Components",
    question: "Which of the following is typically included in a PRD?",
    options: [
      { id: "a", text: "User stories and acceptance criteria." },
      { id: "b", text: "Functional and non-functional requirements." },
      { id: "c", text: "Assumptions and constraints." },
      { id: "d", text: "All of the above." }
    ],
    correctAnswer: "d",
    explanation: "A comprehensive PRD usually includes user stories, acceptance criteria, detailed functional and non-functional requirements, as well as assumptions, constraints, and sometimes even user flow diagrams."
  },
  {
    section: "Stakeholders",
    question: "Which stakeholder is typically responsible for creating and maintaining the PRD?",
    options: [
      { id: "a", text: "Product Managers." },
      { id: "b", text: "Developers." },
      { id: "c", text: "UX/UI Designers." },
      { id: "d", text: "All of the above can contribute." }
    ],
    correctAnswer: "d",
    explanation: "While the product manager is primarily responsible for the PRD, input from developers, designers, and other stakeholders is often essential to ensure that the document accurately reflects all necessary requirements."
  },
  {
    section: "Benefits",
    question: "How does having a well-defined PRD benefit the development team?",
    options: [
      { id: "a", text: "It provides clarity on what needs to be built, reducing ambiguity." },
      { id: "b", text: "It helps avoid scope creep by setting clear boundaries." },
      { id: "c", text: "It serves as a roadmap for aligning stakeholders." },
      { id: "d", text: "All of the above." }
    ],
    correctAnswer: "d",
    explanation: "A well-defined PRD benefits the development team by clarifying requirements, reducing ambiguity, avoiding scope creep, and acting as a roadmap for all stakeholders. This ensures smoother execution of the project."
  },
  {
    section: "Process",
    question: "At what stage is the PRD most useful?",
    options: [
      { id: "a", text: "During the initial planning and design phase." },
      { id: "b", text: "After the product has been fully developed." },
      { id: "c", text: "Only during the testing phase." },
      { id: "d", text: "None of the above." }
    ],
    correctAnswer: "a",
    explanation: "The PRD is most useful during the initial planning and design phases because it sets the foundation for what is to be built. It guides both the design and development processes."
  }
];

export default function PRDQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Store answers as an object with key = question index and value = selected option id.
  const [answers, setAnswers] = useState({});
  // Flag to indicate if the current question is submitted.
  const [submitted, setSubmitted] = useState(false);
  // When all questions are answered, show the summary dashboard.
  const [showSummary, setShowSummary] = useState(false);

  const currentQuestion = prdQuizData[currentQuestionIndex];

  const handleOptionChange = (selectedOption) => {
    if (!submitted) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestionIndex]: selectedOption
      }));
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
    if (currentQuestionIndex >= prdQuizData.length - 1) {
      setShowSummary(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSubmitted(false);
    }
  };

  const calculateScore = () => {
    return prdQuizData.reduce(
      (score, question, idx) =>
        score + (answers[idx] === question.correctAnswer ? 1 : 0),
      0
    );
  };

  // Render the individual question view.
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
            let optionClass =
              "cursor-pointer p-2 rounded border flex items-center border-gray-300 hover:bg-gray-50";
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
            {currentQuestionIndex === prdQuizData.length - 1 ? "Finish Quiz" : "Next Question"}
          </button>
        )}
      </div>
    </form>
  );

  // Render the summary view that shows all questions and feedback.
  const renderSummary = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-6">PRD Quiz Summary</h2>
      {prdQuizData.map((questionItem, index) => (
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
          You scored {calculateScore()} out of {prdQuizData.length}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <header className="p-8 bg-blue-600 text-white text-center">
        <h1 className="text-4xl font-bold">PRD Quiz</h1>
      </header>
      <main className="flex-1 w-full p-8 overflow-y-auto">
        {!showSummary ? renderQuestion() : renderSummary()}
      </main>
      <footer className="p-4 bg-gray-200 text-center text-sm">
        © 2025 PRD Quiz Module
      </footer>
    </div>
  );
}
