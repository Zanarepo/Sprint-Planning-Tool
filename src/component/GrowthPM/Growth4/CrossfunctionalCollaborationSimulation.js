import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaRegLightbulb } from 'react-icons/fa';

const simulationQuestions = [
  {
    id: 1,
    question: "Engineering Team: They prioritize reducing tech debt over experiments. How do you address their concerns?",
    options: [
      {
        text: "Frame the experiment as an opportunity to refactor and reduce tech debt while testing a new feature.",
        isCorrect: true,
      },
      {
        text: "Tell them to ignore tech debt and focus solely on the experiment.",
        isCorrect: false,
      },
    ],
  },
  {
    id: 2,
    question: "Design Team: They disagree with your proposed UI changes. How do you resolve the conflict?",
    options: [
      {
        text: "Propose running an A/B test on both designs and let data decide which version works better.",
        isCorrect: true,
      },
      {
        text: "Impose your preferred design without discussion.",
        isCorrect: false,
      },
    ],
  },
  {
    id: 3,
    question: "Marketing Team: They want to push for rapid feature releases. How do you balance their push with quality assurance?",
    options: [
      {
        text: "Incorporate marketing insights while ensuring that the release process includes quality checks and controlled experiments.",
        isCorrect: true,
      },
      {
        text: "Agree to a rapid release, even if it means skipping some quality control measures.",
        isCorrect: false,
      },
    ],
  },
];

const CrossfunctionalCollaborationSimulation = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [simulationFinished, setSimulationFinished] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = simulationQuestions[currentQuestionIndex];

  const handleOptionSelect = (option, index) => {
    // Save the selected answer for this question
    const newSelections = [...selectedOptions];
    newSelections[currentQuestionIndex] = index;
    setSelectedOptions(newSelections);

    // Update score if answer is correct
    if (option.isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < simulationQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setSimulationFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptions([]);
    setScore(0);
    setSimulationFinished(false);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6 flex items-center justify-center">
        <FaRegLightbulb className="mr-2 text-yellow-500" />
        Crossfunctional Collaboration Simulation
      </h1>

      {simulationFinished ? (
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-700 mb-4">
            Your Score: {score} out of {simulationQuestions.length}
          </p>
          {score === simulationQuestions.length ? (
            <p className="text-xl text-green-600">Excellent job! You effectively coordinated with all teams.</p>
          ) : score >= simulationQuestions.length / 2 ? (
            <p className="text-xl text-blue-600">
              Good effort! There's room for improvement in aligning all teams.
            </p>
          ) : (
            <p className="text-xl text-red-600">
              Consider revisiting crossfunctional strategies to better align teams.
            </p>
          )}
          <button
            onClick={handleRestart}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Restart Simulation
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <p className="text-xl text-gray-800 font-medium">
              Question {currentQuestionIndex + 1}: {currentQuestion.question}
            </p>
          </div>
          <ul className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedOptions[currentQuestionIndex] === index;
              return (
                <li
                  key={index}
                  onClick={() => {
                    if (selectedOptions[currentQuestionIndex] === undefined)
                      handleOptionSelect(option, index);
                  }}
                  className={`p-4 border rounded cursor-pointer transition-colors flex items-center ${
                    isSelected
                      ? option.isCorrect
                        ? "bg-green-100 border-green-500"
                        : "bg-red-100 border-red-500"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                  <span>{option.text}</span>
                  {isSelected && (
                    option.isCorrect ? (
                      <FaCheckCircle className="text-green-600 ml-auto" />
                    ) : (
                      <FaTimesCircle className="text-red-600 ml-auto" />
                    )
                  )}
                </li>
              );
            })}
          </ul>
          {selectedOptions[currentQuestionIndex] !== undefined && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                {currentQuestionIndex + 1 < simulationQuestions.length ? "Next" : "Finish"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CrossfunctionalCollaborationSimulation;
