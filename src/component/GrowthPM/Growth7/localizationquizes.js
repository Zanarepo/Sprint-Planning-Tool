import React, { useState } from 'react';
import { FaQuestionCircle, FaCheckCircle } from 'react-icons/fa';

const quizQuestions = [
  {
    question: "Which KPI measures how quickly a product is adopted in new markets?",
    answer: "Adoption Rate",
  },
  {
    question: "Which tools can be used for analyzing regional user behavior?",
    answer: "Google Analytics and Mixpanel (filter by region)",
  },
  {
    question: "What does CAC stand for?",
    answer: "Customer Acquisition Cost",
  },
  {
    question: "What is a common pitfall when localizing products?",
    answer: "Over-localization leading to loss of core product identity",
  },
  {
    question: "How can you avoid assuming one market's preferences apply to all?",
    answer: "Hire local experts and conduct market-specific research",
  },
  {
    question: "In Spotify’s expansion case study, what adaptation did they implement?",
    answer: "They added Arabic playlists, partnered with telecom providers, and priced for affordability",
  },
  {
    question: "For Duolingo in Southeast Asia, what key strategy was used?",
    answer: "They introduced courses in local dialects and applied gamified learning for mobile-first users",
  },
  {
    question: "What is the key takeaway behind 'Think Globally, Act Locally'?",
    answer: "Balance scalability with cultural nuance",
  },
  {
    question: "What is an effective strategy to test localized product features?",
    answer: "Test early by piloting in smaller markets",
  },
  {
    question: "What method is suggested for continuous improvement of localized products?",
    answer: "Build feedback loops to continuously gather local user insights",
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
          Test your understanding of localization, metrics, pitfalls, and case studies.
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
