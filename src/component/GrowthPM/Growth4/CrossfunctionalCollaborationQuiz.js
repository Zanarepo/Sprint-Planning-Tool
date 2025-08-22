import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const questions = [
  {
    question: "What is crossfunctional collaboration?",
    options: [
      "A process where team members from different departments work together to achieve common goals.",
      "A technique used only by engineers to solve technical problems.",
      "A method of working in isolation to maximize individual output.",
      "A strategy focused solely on marketing initiatives."
    ],
    correctIndex: 0,
  },
  {
    question: "Which of the following is a key benefit of crossfunctional collaboration?",
    options: [
      "Reduced communication and increased silos.",
      "Enhanced problem-solving through diverse perspectives.",
      "Increased individual work with little teamwork.",
      "Focusing on one department's goals only."
    ],
    correctIndex: 1,
  },
  {
    question: "How can a Growth PM facilitate crossfunctional collaboration?",
    options: [
      "By isolating departments and enforcing strict hierarchy.",
      "By translating data into actionable insights, aligning teams, and mediating conflicts.",
      "By solely focusing on product features without involving other teams.",
      "By ignoring feedback from design and engineering teams."
    ],
    correctIndex: 1,
  },
  {
    question: "Which action demonstrates effective crossfunctional collaboration?",
    options: [
      "Holding regular meetings with representatives from different teams to discuss challenges and opportunities.",
      "Relying solely on email for all communication.",
      "Avoiding discussions with other departments to focus on personal tasks.",
      "Making unilateral decisions without consulting other teams."
    ],
    correctIndex: 0,
  },
];

const CrossfunctionalCollaborationQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleOptionClick = (index) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowFeedback(true);
    if (index === questions[currentQuestion].correctIndex) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Crossfunctional Collaboration Quiz</h1>
      {quizFinished ? (
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-700 mb-4">
            You scored {score} out of {questions.length}
          </p>
          <p className="text-lg text-gray-600">Great job! Remember, effective crossfunctional collaboration is key to aligning teams and driving success.</p>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <p className="text-xl text-gray-800 font-medium">
              Question {currentQuestion + 1}: {questions[currentQuestion].question}
            </p>
          </div>
          <ul className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(index)}
                className={`p-4 border rounded cursor-pointer hover:bg-gray-50 transition-colors flex items-center ${
                  showFeedback &&
                  (index === questions[currentQuestion].correctIndex
                    ? "bg-green-100 border-green-500"
                    : index === selectedAnswer
                    ? "bg-red-100 border-red-500"
                    : "")
                }`}
              >
                <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                <span className="flex-1">{option}</span>
                {showFeedback && index === selectedAnswer && (
                  index === questions[currentQuestion].correctIndex ? (
                    <FaCheckCircle className="text-green-600" />
                  ) : (
                    <FaTimesCircle className="text-red-600" />
                  )
                )}
              </li>
            ))}
          </ul>
          {showFeedback && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                {currentQuestion + 1 < questions.length ? "Next Question" : "Finish Quiz"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CrossfunctionalCollaborationQuiz;
