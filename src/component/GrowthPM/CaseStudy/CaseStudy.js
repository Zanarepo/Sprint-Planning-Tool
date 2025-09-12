import React, { useState } from 'react';
import { FaBook, FaLightbulb, FaChartBar } from 'react-icons/fa';

import CaseStudies  from './CaseStudies'
import PMCase1  from './PMCase1'
import PMCase2  from './PMCase2'
import PMCase3  from './PMCase3'
import PMCase4  from './PMCase4'
import PMCase5 from './PMCase5'


const PMCaseStudyGuide = () => {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResults, setQuizResults] = useState(null);

  const handleQuizAnswer = (questionId, answer) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answer });
  };

  const checkQuizAnswers = () => {
    const results = {
      q1: quizAnswers.q1 === 'Problem statement' ? 'Correct' : 'Incorrect',
      q2: quizAnswers.q2 === 'Quantifiable metrics' ? 'Correct' : 'Incorrect',
      q3: quizAnswers.q3 === 'Growth case study' ? 'Correct' : 'Incorrect',
    };
    setQuizResults(results);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Section 1: What a PM Case Study Usually Includes */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaBook className="text-3xl text-indigo-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">What a PM Case Study Usually Includes</h1>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Context / Background</h2>
          <p className="text-gray-700 mb-4">Describe the product, team, and market situation.</p>
          <p className="text-gray-700 mb-4"><strong>Example:</strong> “Our mobile e-commerce app had a 40% drop-off rate on checkout.”</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Problem / Challenge</h2>
          <p className="text-gray-700 mb-4">What problem did you aim to solve?</p>
          <p className="text-gray-700 mb-4"><strong>Example:</strong> “Users were abandoning carts due to a long checkout flow.”</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Goal / Metrics</h2>
          <p className="text-gray-700 mb-4">Define clear, measurable success criteria.</p>
          <p className="text-gray-700 mb-4"><strong>Example:</strong> “Increase completed checkouts by 20% within 3 months.”</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Approach / Action</h2>
          <p className="text-gray-700 mb-4">Your process: research, analysis, design, testing.</p>
          <p className="text-gray-700 mb-4"><strong>Example:</strong> “Conducted user interviews, redesigned checkout from 5 steps to 2 steps, and A/B tested changes.”</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Results / Outcome</h2>
          <p className="text-gray-700 mb-4">Quantify impact. Use numbers whenever possible.</p>
          <p className="text-gray-700 mb-4"><strong>Example:</strong> “Checkout completion increased by 25%, reducing cart abandonment by 30%.”</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Learnings / Next Steps</h2>
          <p className="text-gray-700 mb-4">Reflect on what worked, what didn’t, and what could improve.</p>
          <p className="text-gray-700 mb-4"><strong>Example:</strong> “User feedback showed simpler flows increased satisfaction; next, we plan to optimize payment options.”</p>
        </div>
      </section>

      {/* Section 2: Common Types of PM Case Studies */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaLightbulb className="text-3xl text-green-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Common Types of PM Case Studies</h1>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Growth / Metrics Case Study</h2>
          <p className="text-gray-700 mb-4">Focus on improving KPIs: activation, retention, revenue.</p>
          <p className="text-gray-700 mb-4"><strong>Example:</strong> Increasing sign-ups through onboarding redesign.</p>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Product Launch / Feature Case Study</h2>
          <p className="text-gray-700 mb-4">Show how you brought a new feature or product to market.</p>
          <p className="text-gray-700 mb-4"><strong>Example:</strong> Launching a referral program that boosted referrals by 40%.</p>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Problem-Solving / Design Case Study</h2>
          <p className="text-gray-700 mb-4">Focus on solving a UX or technical challenge.</p>
          <p className="text-gray-700 mb-4"><strong>Example:</strong> Reducing page load times to improve engagement.</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Strategic Case Study</h2>
          <p className="text-gray-700 mb-4">Focus on big-picture decisions and roadmaps.</p>
          <p className="text-gray-700 mb-4"><strong>Example:</strong> Deciding which product vertical to prioritize based on market research.</p>
        </div>
      </section>

      {/* Section 3: Tips for Writing PM Case Studies */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaChartBar className="text-3xl text-blue-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Tips for Writing PM Case Studies</h1>
        </div>
        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          <li>Always start with the problem — not the solution.</li>
          <li>Use data-driven results. Numbers matter.</li>
          <li>Keep it structured and concise; recruiters love clarity.</li>
          <li>Include your role clearly — highlight ownership and decision-making.</li>
          <li>Use visuals if possible: charts, flow diagrams, or screenshots.</li>
        </ul>
      </section>

      {/* Quiz Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Test Your Knowledge</h1>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">1. What should a PM case study always start with?</h2>
          <div className="flex flex-col space-y-2">
            {['Solution description', 'Problem statement', 'Results summary', 'Team introduction'].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="q1"
                  value={option}
                  onChange={() => handleQuizAnswer('q1', option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
          {quizResults && (
            <p className={`mt-2 ${quizResults.q1 === 'Correct' ? 'text-green-600' : 'text-red-600'}`}>
              {quizResults.q1}: Correct answer is "Problem statement"
            </p>
          )}
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">2. What is critical for the Results section of a case study?</h2>
          <div className="flex flex-col space-y-2">
            {['Qualitative feedback', 'Team size', 'Quantifiable metrics', 'Design process'].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="q2"
                  value={option}
                  onChange={() => handleQuizAnswer('q2', option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
          {quizResults && (
            <p className={`mt-2 ${quizResults.q2 === 'Correct' ? 'text-green-600' : 'text-red-600'}`}>
              {quizResults.q2}: Correct answer is "Quantifiable metrics"
            </p>
          )}
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">3. Which type of case study focuses on improving KPIs like activation or retention?</h2>
          <div className="flex flex-col space-y-2">
            {['Strategic case study', 'Problem-solving case study', 'Product launch case study', 'Growth case study'].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="q3"
                  value={option}
                  onChange={() => handleQuizAnswer('q3', option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
          {quizResults && (
            <p className={`mt-2 ${quizResults.q3 === 'Correct' ? 'text-green-600' : 'text-red-600'}`}>
              {quizResults.q3}: Correct answer is "Growth case study"
            </p>
          )}
        </div>
        <button
          onClick={checkQuizAnswers}
          className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
        >
          Check Answers
        </button>

        
      </section>

     
      <CaseStudies/>
      <PMCase1/>
      <PMCase2/>
      <PMCase3/>
      <PMCase4/>
      <PMCase5/>
    </div>
    
  );
};

export default PMCaseStudyGuide;