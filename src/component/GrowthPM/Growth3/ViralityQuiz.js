import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ViralityQuiz = () => {
  // State to hold user answers
  const [answers, setAnswers] = useState({
    q1: '', // Objective: Viral loop description
    q2: '', // Objective: Tactic to encourage sharing
    q3: '', // Objective: Tools for virality
    q4: '', // Subjective: Explain Dropbox viral loop
    q5: '', // Subjective: Describe two ways to reduce friction
  });

  // State to show the feedback after submission
  const [submitted, setSubmitted] = useState(false);

  // Correct answers for objective questions
  const correctAnswers = {
    q1: 'B',
    q2: 'B',
    q3: 'A',
  };

  // Sample answers for subjective questions
  const sampleSubjectiveAnswers = {
    q4: 'Dropbox’s viral loop works by offering users extra free storage when they invite friends. When a user uploads a file, the product prompts them to invite others with the incentive of “500MB free storage per friend invited.” This drives exponential growth as each invited friend is also incentivized to invite more users.',
    q5: 'One way to reduce friction is by using pre-populated referral links so users don’t have to manually copy and paste URLs. Another way is to implement one-click sharing options to social media, making it as easy as possible for users to share the product.',
  };

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Virality Concepts Quiz
        </h1>
        <p className="text-lg text-gray-600">
          Answer the questions below to test your understanding of virality.
        </p>
      </header>

      <div className="space-y-8 max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Question 1 - Objective */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            1. Which of the following best describes a viral loop?
          </h2>
          <p className="text-gray-700 ml-4 mt-2">
            A) A closed marketing strategy that limits user sharing.<br />
            <span className="ml-4">B) A cycle where users invite others, who then invite more users.</span><br />
            C) A process where a product fails to gain traction.
          </p>
          <div className="ml-4 mt-2">
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="q1"
                value="A"
                checked={answers.q1 === 'A'}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">A</span>
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="q1"
                value="B"
                checked={answers.q1 === 'B'}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">B</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="q1"
                value="C"
                checked={answers.q1 === 'C'}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">C</span>
            </label>
          </div>
          {submitted && (
            <div className="ml-4 mt-2">
              {answers.q1 === correctAnswers.q1 ? (
                <p className="text-green-600 flex items-center">
                  <FaCheckCircle className="mr-2" /> Correct!
                </p>
              ) : (
                <p className="text-red-600 flex items-center">
                  <FaTimesCircle className="mr-2" /> Incorrect. The correct answer is B.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Question 2 - Objective */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            2. Which tactic is most effective in encouraging user sharing?
          </h2>
          <p className="text-gray-700 ml-4 mt-2">
            A) Removing all referral links.<br />
            <span className="ml-4">B) Using pre-populated referral links and one-click sharing.</span><br />
            C) Making sharing optional with no incentives.
          </p>
          <div className="ml-4 mt-2">
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="q2"
                value="A"
                checked={answers.q2 === 'A'}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">A</span>
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="q2"
                value="B"
                checked={answers.q2 === 'B'}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">B</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="q2"
                value="C"
                checked={answers.q2 === 'C'}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">C</span>
            </label>
          </div>
          {submitted && (
            <div className="ml-4 mt-2">
              {answers.q2 === correctAnswers.q2 ? (
                <p className="text-green-600 flex items-center">
                  <FaCheckCircle className="mr-2" /> Correct!
                </p>
              ) : (
                <p className="text-red-600 flex items-center">
                  <FaTimesCircle className="mr-2" /> Incorrect. The correct answer is B.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Question 3 - Objective */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            3. Which tool is commonly used to implement referral programs for virality?
          </h2>
          <p className="text-gray-700 ml-4 mt-2">
            A) Referral Program Dashboards (e.g., Viral Loops, ReferralCandy).<br />
            B) Traditional email marketing platforms.<br />
            C) Standard CRM systems.
          </p>
          <div className="ml-4 mt-2">
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="q3"
                value="A"
                checked={answers.q3 === 'A'}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">A</span>
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="q3"
                value="B"
                checked={answers.q3 === 'B'}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">B</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="q3"
                value="C"
                checked={answers.q3 === 'C'}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">C</span>
            </label>
          </div>
          {submitted && (
            <div className="ml-4 mt-2">
              {answers.q3 === correctAnswers.q3 ? (
                <p className="text-green-600 flex items-center">
                  <FaCheckCircle className="mr-2" /> Correct!
                </p>
              ) : (
                <p className="text-red-600 flex items-center">
                  <FaTimesCircle className="mr-2" /> Incorrect. The correct answer is A.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Question 4 - Subjective */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            4. Explain how Dropbox’s viral loop works and why it was effective.
          </h2>
          <textarea
            name="q4"
            value={answers.q4}
            onChange={handleChange}
            placeholder="Type your answer here..."
            className="w-full p-2 border border-gray-300 rounded mt-2"
            rows="4"
          ></textarea>
          {submitted && (
            <div className="mt-2 p-4 bg-gray-100 rounded">
              <p className="font-medium text-gray-800">Sample Answer:</p>
              <p className="text-gray-700">{sampleSubjectiveAnswers.q4}</p>
            </div>
          )}
        </div>

        {/* Question 5 - Subjective */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            5. Describe two ways to reduce friction in encouraging user sharing.
          </h2>
          <textarea
            name="q5"
            value={answers.q5}
            onChange={handleChange}
            placeholder="Type your answer here..."
            className="w-full p-2 border border-gray-300 rounded mt-2"
            rows="4"
          ></textarea>
          {submitted && (
            <div className="mt-2 p-4 bg-gray-100 rounded">
              <p className="font-medium text-gray-800">Sample Answer:</p>
              <p className="text-gray-700">{sampleSubjectiveAnswers.q5}</p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Submit Answers
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViralityQuiz;
