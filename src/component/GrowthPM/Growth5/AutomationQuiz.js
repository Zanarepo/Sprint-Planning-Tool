import React, { useState } from 'react';

const quizQuestions = [
  {
    question: "What does automation primarily help you achieve?",
    options: [
      "Reduce manual errors and increase efficiency",
      "Increase manual processes",
      "Eliminate all human tasks",
      "Make decisions randomly",
    ],
    answer: "Reduce manual errors and increase efficiency",
    explanation: "Automation reduces repetitive work, thereby decreasing errors and increasing efficiency."
  },
  {
    question: "Why is automation considered a force multiplier?",
    options: [
      "It doubles the speed of all processes",
      "It enables you to focus on high-leverage tasks while automating repetitive ones",
      "It replaces all human work",
      "It makes systems slower",
    ],
    answer: "It enables you to focus on high-leverage tasks while automating repetitive ones",
    explanation: "By automating routine tasks, you free up time to concentrate on strategic, high-impact activities."
  },
  {
    question: "Which of the following is a key benefit of automation in product management?",
    options: [
      "It allows teams to ignore metrics",
      "It provides consistency and scalability in processes",
      "It makes the product management process more manual",
      "It increases the risk of human error",
    ],
    answer: "It provides consistency and scalability in processes",
    explanation: "Automation ensures that processes are consistent and scalable, which is critical in managing growth effectively."
  }
];

const AutomationQuiz = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionChange = (questionIndex, selectedOption) => {
    setUserAnswers({ ...userAnswers, [questionIndex]: selectedOption });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newScore = 0;
    quizQuestions.forEach((q, index) => {
      if (userAnswers[index] === q.answer) {
        newScore++;
      }
    });
    setScore(newScore);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Automation Quiz</h2>
        <form onSubmit={handleSubmit}>
          {quizQuestions.map((q, index) => (
            <div key={index} className="mb-6">
              <p className="text-xl font-medium text-gray-700 mb-2">
                {index + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      onChange={() => handleOptionChange(index, option)}
                      disabled={isSubmitted}
                      className="form-radio text-blue-500"
                      checked={userAnswers[index] === option}
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
              {isSubmitted && (
                <div className="mt-2 p-2 border rounded bg-gray-100">
                  {userAnswers[index] === q.answer ? (
                    <p className="text-green-600 font-medium">Correct! {q.explanation}</p>
                  ) : (
                    <p className="text-red-600 font-medium">
                      Incorrect. The correct answer is: <span className="font-bold">{q.answer}</span>.
                      <br />
                      Explanation: {q.explanation}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
          {!isSubmitted ? (
            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors"
            >
              Submit Quiz
            </button>
          ) : (
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800 mb-4">
                Your Score: {score} / {quizQuestions.length}
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="py-2 px-4 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AutomationQuiz;
