import React, { useState } from "react";
import {  FaPrint, FaEye, FaEyeSlash } from "react-icons/fa";

const ProductManagementIntro = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full min-h-screen p-4 xs:p-6 sm:p-8 bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col space-y-4 xs:space-y-6 overflow-x-hidden">
      <h1 className="text-4xl font-bold text-blue-600 text-center">Product Management Quizzes</h1>
      <p className="text-gray-700 text-lg text-center">
        Product Management is at the heart of building great products that solve real problems for customers. It combines
        strategy, business, technology, and user experience to create products that succeed in the market.
      </p>
      
      <QuizComponent />

      <button onClick={handlePrint} className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 shadow-md">
        <FaPrint /> Print
      </button>
    </div>
  );
};

const QuizComponent = () => {
  const [showAnswers, setShowAnswers] = useState(false);

  const toggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  const questions = [
    {
      question: "What is the primary responsibility of a Product Manager?",
      answer: "Defining the product vision, strategy, and ensuring it delivers value to users and the business."
    },
    {
      question: "How does a Product Manager differ from a Project Manager?",
      answer: "A Product Manager decides what to build and why, while a Project Manager ensures the execution is done on time and within scope."
    },
    {
      question: "Give an example of a real-world product management decision?",
      answer: "Deciding if Uber should introduce a driver reward system to improve engagement."
    }
  ];

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Test Your Knowledge</h2>
      {questions.map((q, index) => (
        <div key={index} className="mb-4">
          <p className="font-semibold text-gray-700">{index + 1}. {q.question}</p>
          {showAnswers && <p className="text-green-600 mt-2">Answer: {q.answer}</p>}
        </div>
      ))}
      <button
        onClick={toggleAnswers}
        className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-2"
      >
        {showAnswers ? <FaEyeSlash /> : <FaEye />} {showAnswers ? "Hide Answers" : "Show Answers"}
      </button>
    </div>
  );
};

export default ProductManagementIntro;
