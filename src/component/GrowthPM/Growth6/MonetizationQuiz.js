import React, { useState } from 'react';
import { FaQuestionCircle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const MonetizationQuiz = () => {
  const quizQuestions = [
    {
      id: 1,
      question: 'What does Monetization Efficiency measure?',
      options: [
        { id: 'a', text: 'Revenue per active user' },
        { id: 'b', text: 'Conversion rate of free users' },
        { id: 'c', text: 'The ratio of paid to free users' },
        { id: 'd', text: 'Customer lifetime value' },
      ],
      correctAnswer: 'a',
      explanation:
        'Monetization Efficiency is calculated as total revenue divided by the number of active users. It tells you how much revenue is generated on average by each active user.',
    },
    {
      id: 2,
      question: 'What is generally considered a healthy LTV:CAC ratio?',
      options: [
        { id: 'a', text: '1:1' },
        { id: 'b', text: '2:1' },
        { id: 'c', text: '3:1 or higher' },
        { id: 'd', text: '5:1' },
      ],
      correctAnswer: 'c',
      explanation:
        'A healthy LTV:CAC ratio is generally 3:1 or higher. This means that the lifetime value of a customer should be at least three times the cost of acquiring them.',
    },
    {
      id: 3,
      question: 'What does the Upgrade Rate indicate?',
      options: [
        { id: 'a', text: 'The percentage of active users generating revenue' },
        { id: 'b', text: 'The percentage of free users converting to paid plans' },
        { id: 'c', text: 'The average revenue per user' },
        { id: 'd', text: 'The cost efficiency of acquiring customers' },
      ],
      correctAnswer: 'b',
      explanation:
        'The Upgrade Rate measures the percentage of users on the free tier who convert to paid plans, indicating the effectiveness of your conversion strategy.',
    },
  ];

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleOptionChange = (questionId, optionId) => {
    setAnswers({ ...answers, [questionId]: optionId });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex justify-center items-center">
            <FaQuestionCircle className="mr-2 text-blue-500" />
            Monetization Alignment Quiz
          </h1>
          <p className="text-gray-600 mt-2">
            Answer the following questions to test your understanding of monetization alignment.
          </p>
        </header>

        <form onSubmit={handleSubmit}>
          {quizQuestions.map((question) => (
            <div key={question.id} className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800">
                {question.id}. {question.question}
              </h2>
              <div className="mt-2">
                {question.options.map((option) => (
                  <div key={option.id} className="flex items-center mb-1">
                    <input
                      type="radio"
                      id={`q${question.id}_${option.id}`}
                      name={`question-${question.id}`}
                      value={option.id}
                      onChange={() => handleOptionChange(question.id, option.id)}
                      disabled={submitted}
                      className="mr-2"
                      checked={answers[question.id] === option.id}
                    />
                    <label htmlFor={`q${question.id}_${option.id}`} className="text-gray-700">
                      {option.text}
                    </label>
                  </div>
                ))}
              </div>

              {submitted && (
                <div className="mt-2 p-4 rounded-lg border">
                  {answers[question.id] === question.correctAnswer ? (
                    <div className="flex items-center text-green-700">
                      <FaCheckCircle className="mr-2" /> <span>Correct!</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-700">
                      <FaTimesCircle className="mr-2" /> <span>Incorrect. The correct answer is "{question.options.find(opt => opt.id === question.correctAnswer).text}".</span>
                    </div>
                  )}
                  <p className="text-gray-700 mt-2">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-center">
            {!submitted ? (
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Submit Answers
              </button>
            ) : (
              <button
                type="button"
                onClick={resetQuiz}
                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              >
                Reset Quiz
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MonetizationQuiz;
