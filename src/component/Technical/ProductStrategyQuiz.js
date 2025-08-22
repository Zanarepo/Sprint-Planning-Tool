// QuizModule.jsx
import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const quizData = [
  {
    section: "Vision",
    question: "What is the purpose of a 'Vision' in a product strategy?",
    options: [
      { id: "a", text: "A detailed set of technical specifications." },
      { id: "b", text: "A high-level, inspirational statement that outlines long-term goals." },
      { id: "c", text: "A summary of current financial performance." },
      { id: "d", text: "A step-by-step guide to product deployment." }
    ],
    correctAnswer: "b",
    explanation: "The Vision is an inspirational statement that outlines what the organization aspires to achieve in the long run. It sets a high-level direction and motivates the team."
  },
  {
    section: "Mission",
    question: "Which best defines the 'Mission' component?",
    options: [
      { id: "a", text: "A record of past achievements." },
      { id: "b", text: "A statement of what the team does to achieve its vision." },
      { id: "c", text: "A technical document for engineers." },
      { id: "d", text: "A marketing plan for customer acquisition." }
    ],
    correctAnswer: "b",
    explanation: "The Mission explains what the team does and how they plan to achieve the vision. It translates the vision into actionable strategies and processes."
  },
  {
    section: "Strategic Goals",
    question: "What are 'Strategic Goals' in a product strategy?",
    options: [
      { id: "a", text: "Broad, non-measurable aspirations." },
      { id: "b", text: "Daily tasks assigned to team members." },
      { id: "c", text: "Specific, measurable targets that guide initiatives." },
      { id: "d", text: "Budget allocations for marketing efforts." }
    ],
    correctAnswer: "c",
    explanation: "Strategic Goals are defined as specific, measurable outcomes that guide the product’s initiatives, such as reducing onboarding time or increasing compliance."
  },
  {
    section: "Target Audience",
    question: "Who does the 'Target Audience' refer to?",
    options: [
      { id: "a", text: "Internal team members working on the product." },
      { id: "b", text: "Competitors in the marketplace." },
      { id: "c", text: "Specific groups of people for whom the product is designed." },
      { id: "d", text: "The regulatory bodies overseeing the product." }
    ],
    correctAnswer: "c",
    explanation: "The Target Audience is the specific group of potential customers for whom the product is intended – in this case, small to mid-sized businesses and individual entrepreneurs."
  },
  {
    section: "Market Opportunity & Competitive Analysis",
    question: "What does the 'Market Opportunity & Competitive Analysis' help determine?",
    options: [
      { id: "a", text: "The exact revenue for the next quarter." },
      { id: "b", text: "Technical specs for the product features." },
      { id: "c", text: "Opportunities in the market and how to differentiate from competitors." },
      { id: "d", text: "The daily schedule of the product team." }
    ],
    correctAnswer: "c",
    explanation: "This component evaluates the market environment, including trends, regulatory landscapes, and competitors. It helps position the product uniquely in the marketplace."
  },
  {
    section: "Key Metrics",
    question: "What is the role of 'Key Metrics' in a product strategy?",
    options: [
      { id: "a", text: "They provide quantifiable measures to track performance." },
      { id: "b", text: "They are used to set the company’s annual budget." },
      { id: "c", text: "They specify the user interface design requirements." },
      { id: "d", text: "They define the internal team structure." }
    ],
    correctAnswer: "a",
    explanation: "Key Metrics are quantifiable measures—such as onboarding time, compliance rates, and user satisfaction—that help in assessing the product's performance and success."
  },
  {
    section: "Risks & Considerations",
    question: "Why is it important to identify 'Risks & Considerations'?",
    options: [
      { id: "a", text: "To ignore potential challenges." },
      { id: "b", text: "To understand potential obstacles and design mitigation strategies." },
      { id: "c", text: "To assign blame in case of failures." },
      { id: "d", text: "To reduce the budget for product development." }
    ],
    correctAnswer: "b",
    explanation: "Identifying Risks & Considerations allows the team to recognize potential challenges (like dependency on third-party providers or varying regional regulations) and create strategies to overcome them."
  }
];

export default function QuizModule() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Store answers as an object where key is question index and value is the selected option id.
  const [answers, setAnswers] = useState({});
  // Indicates if current question has been submitted.
  const [submitted, setSubmitted] = useState(false);
  // Flag to show full summary after finishing the quiz.
  const [showSummary, setShowSummary] = useState(false);

  const currentQuestion = quizData[currentQuestionIndex];

  const handleOptionChange = (selectedOption) => {
    // Record answer for current question only if not yet submitted.
    if (!submitted) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestionIndex]: selectedOption
      }));
    }
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    // Prevent submitting without an answer.
    if (answers[currentQuestionIndex] === undefined) {
      alert("Please select an answer before submitting.");
      return;
    }
    setSubmitted(true);
  };

  const handleNext = () => {
    // If we reached last question, show summary.
    if (currentQuestionIndex >= quizData.length - 1) {
      setShowSummary(true);
    } else {
      // Move to next question and reset submission flag.
      setCurrentQuestionIndex((prev) => prev + 1);
      setSubmitted(false);
    }
  };

  const calculateScore = () => {
    return quizData.reduce(
      (score, question, idx) =>
        score + (answers[idx] === question.correctAnswer ? 1 : 0),
      0
    );
  };

  // Render the quiz question view.
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
                  {
                    currentQuestion.options.find(
                      (opt) => opt.id === currentQuestion.correctAnswer
                    ).text
                  }
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
            {currentQuestionIndex === quizData.length - 1 ? "Finish Quiz" : "Next Question"}
          </button>
        )}
      </div>
    </form>
  );

  // Render the summary view which shows all questions with results.
  const renderSummary = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-6">Quiz Summary</h2>
      {quizData.map((questionItem, index) => (
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
                  {
                    questionItem.options.find(
                      (opt) => opt.id === questionItem.correctAnswer
                    ).text
                  }
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
          You scored {calculateScore()} out of {quizData.length}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <header className="p-8 bg-blue-600 text-white text-center">
        <h1 className="text-4xl font-bold">Product Strategy Quiz</h1>
      </header>
      <main className="flex-1 w-full p-8 overflow-y-auto">
        {!showSummary ? renderQuestion() : renderSummary()}
      </main>
     
    </div>
  );
}
