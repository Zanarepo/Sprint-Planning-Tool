import React, { useState } from 'react';
import { FaQuestionCircle, FaCheckCircle } from 'react-icons/fa';

const quizQuestions = [
  {
    question: "Why do you explore new markets?",
    answer: "To expand your product’s reach and drive sustainable growth by tapping into untapped user segments or geographic regions.",
  },
  {
    question: "Name one key driver for exploring new markets.",
    answer: "Market Saturation, Diversification, Competitive Advantage, or Revenue Growth.",
  },
  {
    question: "What does CAC stand for?",
    answer: "Customer Acquisition Cost.",
  },
  {
    question: "Which metrics do you use to track retention?",
    answer: "DAU/MAU (Daily/Monthly Active Users) and Churn Rate.",
  },
  {
    question: "What is ARPU?",
    answer: "Average Revenue Per User.",
  },
  {
    question: "How can you use paid ads to test psychological triggers?",
    answer: "By running ads with messages that tap into social proof (e.g., 'Join 1M+ users') or urgency, and then measuring the impact on conversions.",
  },
  {
    question: "What is one key principle of behavioral psychology that drives user action?",
    answer: "Scarcity & Urgency: For example, using limited-time offers or countdown timers to prompt quick decisions.",
  },
  {
    question: "How can you apply social proof in your product?",
    answer: "Show customer testimonials, user reviews, or display how many people bought or use your product today.",
  },
  {
    question: "What is the purpose of integrating digital marketing with behavioral psychology?",
    answer: "To create campaigns that not only drive traffic via SEO and paid ads but also leverage psychological triggers to boost user engagement and conversions.",
  },
  {
    question: "Give an example of an experiment using digital marketing and behavioral psychology together.",
    answer: "Hypothesis: Adding customer testimonials to a pricing page will increase conversions. Experiment: A/B test two versions of the page—one with testimonials and one without. If the version with testimonials wins, scale it.",
  },
  {
    question: "What tools should you learn for SEO?",
    answer: "Ahrefs, Moz, and Google Search Console.",
  },
  {
    question: "Which tools help you run paid ads?",
    answer: "Google Ads, Facebook Ads Manager, and UTM tracking.",
  },
  {
    question: "What behavioral analysis tools can you use?",
    answer: "Hotjar for heatmaps and Amplitude for tracking user journeys.",
  },
];

const Quiz = () => {
  const [visibleAnswers, setVisibleAnswers] = useState({});

  const toggleAnswer = (index) => {
    setVisibleAnswers(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center">
          <FaQuestionCircle className="mr-2 text-blue-500" /> Integrated Concepts Quiz
        </h1>
        <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
          Test your understanding of market expansion, digital marketing, behavioral psychology, and integration strategies.
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

export default Quiz;
