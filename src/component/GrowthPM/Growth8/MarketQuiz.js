import React, { useState } from 'react';
import { FaQuestionCircle, FaCheckCircle } from 'react-icons/fa';

const quizQuestions = [
  {
    question: "What is the main objective of exploring new markets?",
    answer: "To expand the product’s reach and drive sustainable growth by entering untapped user segments or geographic regions.",
  },
  {
    question: "Name one key driver for exploring new markets.",
    answer: "Market Saturation, Diversification, Competitive Advantage, or Revenue Growth.",
  },
  {
    question: "What does CAC stand for in the context of metrics?",
    answer: "Customer Acquisition Cost.",
  },
  {
    question: "Which metrics are used to measure retention?",
    answer: "DAU/MAU (Daily/Monthly Active Users) and Churn Rate.",
  },
  {
    question: "What does ARPU stand for?",
    answer: "Average Revenue Per User.",
  },
  {
    question: "Name one ethical consideration when expanding into low-income markets.",
    answer: "Avoid exploitative pricing.",
  },
  {
    question: "Which tool or framework can be used to assess market potential?",
    answer: "PESTEL Analysis, TAM-SAM-SOM, or Google Trends.",
  },
  {
    question: "How did Spotify adapt its offering for the Indian market?",
    answer: "They added Bollywood playlists, introduced sachet pricing (daily plans), and incorporated regional languages.",
  },
  {
    question: "What is a common challenge when localizing products?",
    answer: "Cultural misalignment.",
  },
  {
    question: "List one step from the action plan template for market expansion.",
    answer: "Research using PESTEL to evaluate 3 potential markets, validate with a landing page MVP, localize a core feature, or test with a pilot.",
  },
];

const ConceptQuiz = () => {
  const [visibleAnswers, setVisibleAnswers] = useState({});

  const toggleAnswer = (index) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center">
          <FaQuestionCircle className="mr-2 text-blue-500" /> Concept Quiz
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Test your understanding of key concepts related to market expansion, metrics, ethical considerations, and action planning.
        </p>
      </header>
      <div className="space-y-6">
        {quizQuestions.map((item, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                {index + 1}. {item.question}
              </h2>
              <button
                onClick={() => toggleAnswer(index)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                {visibleAnswers[index] ? "Hide Answer" : "Show Answer"}
              </button>
            </div>
            {visibleAnswers[index] && (
              <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded flex items-center">
                <FaCheckCircle className="text-green-600 mr-2" />
                <span className="text-green-800 font-medium">{item.answer}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConceptQuiz;
