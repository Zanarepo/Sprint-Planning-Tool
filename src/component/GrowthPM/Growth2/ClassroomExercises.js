import React, { useState } from 'react';
import { FaBrain, FaVial, FaBalanceScale } from 'react-icons/fa';

const ClassroomExercises = () => {
  // Quiz state for Hypothesis Brainstorming
  const [iceQuizAnswer, setIceQuizAnswer] = useState('');
  const [iceQuizFeedback, setIceQuizFeedback] = useState('');

  // Quiz state for Ethics Debate
  const [ethicsQuizAnswer, setEthicsQuizAnswer] = useState('');
  const [ethicsQuizFeedback, setEthicsQuizFeedback] = useState('');

  // Simple check functions for quiz answers (these are examples)
  const checkIceQuiz = () => {
    // Example correct answer: "ICE stands for Impact, Confidence, and Ease."
    if (iceQuizAnswer.toLowerCase().includes('impact') && iceQuizAnswer.toLowerCase().includes('confidence') && iceQuizAnswer.toLowerCase().includes('ease')) {
      setIceQuizFeedback('Correct! ICE stands for Impact, Confidence, and Ease.');
    } else {
      setIceQuizFeedback('Try again! Remember, ICE stands for Impact, Confidence, and Ease.');
    }
  };

  const checkEthicsQuiz = () => {
    // Example: correct if answer includes "ethical" or "not ethical"
    if (ethicsQuizAnswer.toLowerCase().includes('dark pattern')) {
      setEthicsQuizFeedback('Great point! Consider the ethical implications of using manipulative design patterns.');
    } else {
      setEthicsQuizFeedback('Consider discussing whether using dark patterns is ethical and why.');
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 flex justify-center items-center">
          <FaBrain className="mr-2" /> Classroom Exercises
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Dive into interactive exercises to apply your product experimentation and ethics knowledge!
        </p>
      </header>

      {/* Exercise 1: Hypothesis Brainstorming */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaVial className="text-3xl text-blue-500 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-800">1. Hypothesis Brainstorming</h2>
        </div>
        <p className="text-gray-700 mb-4">
          <strong>Your task:</strong> You are given a problem: <em>"Low activation rates for a fitness app."</em> In teams, generate 5 hypotheses using the ICE framework. Remember:
        </p>
        <ul className="list-disc ml-6 text-gray-700 space-y-1 mb-4">
          <li><strong>I</strong> - Impact: How much impact will the hypothesis have?</li>
          <li><strong>C</strong> - Confidence: How confident are you that it will work?</li>
          <li><strong>E</strong> - Ease: How easy is it to implement?</li>
        </ul>
        <p className="text-gray-700 mb-4">
          To check your understanding of the ICE framework, please answer the following quiz question:
        </p>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            What does ICE stand for in hypothesis prioritization?
          </label>
          <input
            type="text"
            value={iceQuizAnswer}
            onChange={(e) => setIceQuizAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={checkIceQuiz}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Check Answer
          </button>
          {iceQuizFeedback && (
            <p className="mt-2 text-gray-700">{iceQuizFeedback}</p>
          )}
        </div>
      </section>

      {/* Exercise 2: Mock A/B Test */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaVial className="text-3xl text-green-500 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-800">2. Mock A/B Test</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Your task is to design two versions of a landing page using a design tool such as Figma.
          <br />
          <strong>Instructions:</strong>
        </p>
        <ul className="list-disc ml-6 text-gray-700 space-y-1 mb-4">
          <li>Design a control version (current design) and a variant with a proposed improvement.</li>
          <li>Present your designs to the class.</li>
          <li>Discuss and debate whether the variant should be shipped based on usability and design principles.</li>
        </ul>
        <p className="text-gray-700">
          After your presentation, reflect on the test's potential outcomes and consider which design might drive higher conversions.
        </p>
      </section>

      {/* Exercise 3: Ethics Debate */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaBalanceScale className="text-3xl text-red-500 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-800">3. Ethics Debate</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Engage in a debate on the ethical considerations of testing design strategies.
          <br />
          <strong>Discussion Topic:</strong> Is it acceptable to test dark patterns to boost conversions? What are the ethical implications of using manipulative design elements?
        </p>
        <p className="text-gray-700 mb-4">
          To start the discussion, please share your thoughts in the quiz below:
        </p>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Share your opinion on using dark patterns in A/B tests:
          </label>
          <textarea
            value={ethicsQuizAnswer}
            onChange={(e) => setEthicsQuizAnswer(e.target.value)}
            placeholder="Type your opinion here..."
            className="w-full p-2 border border-gray-300 rounded"
            rows="3"
          ></textarea>
          <button
            onClick={checkEthicsQuiz}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Submit Opinion
          </button>
          {ethicsQuizFeedback && (
            <p className="mt-2 text-gray-700">{ethicsQuizFeedback}</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ClassroomExercises;
