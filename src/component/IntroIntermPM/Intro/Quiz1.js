import React, { useState } from "react";

const Quiz = ({ quizId, question, options, correctAnswer, onAnswer }) => {
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");
  const [answered, setAnswered] = useState(false);

  const handleOptionChange = (e) => {
    if (!answered) {
      setSelected(e.target.value);
      setFeedback("");
    }
  };

  const handleSubmit = () => {
    if (!selected) {
      setFeedback("Please select an answer.");
      return;
    }
    setAnswered(true);
    if (selected === correctAnswer) {
      setFeedback("Correct! 🎉");
      onAnswer(true);
    } else {
      setFeedback(`Incorrect. The correct answer is: "${options.find(opt => opt.value === correctAnswer).text}"`);
      onAnswer(false);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded border mt-4">
      <h3 className="text-lg font-semibold mb-2">{question}</h3>
      {options.map((option, index) => (
        <label key={index} className="block mb-2 cursor-pointer">
          <input
            type="radio"
            name={quizId}
            value={option.value}
            checked={selected === option.value}
            onChange={handleOptionChange}
            className="mr-2"
            disabled={answered}
          />
          {option.text}
        </label>
      ))}
      {!answered && (
        <button
          onClick={handleSubmit}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
        >
          Submit Answer
        </button>
      )}
      {feedback && (
        <div
          className={`mt-2 font-bold ${
            feedback.startsWith("Correct") ? "text-green-500" : "text-red-500"
          }`}
        >
          {feedback}
        </div>
      )}
    </div>
  );
};

const ProductManagementQuiz = () => {
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setTotalAnswered(prev => prev + 1);
  };

  const quizzes = [
    // ProductOpportunityCanvas Quizzes
    {
      quizId: "q1",
      question: "What is a primary benefit of opportunity assessment?",
      options: [
        { value: "A", text: "It delays product launch." },
        { value: "B", text: "It increases development costs." },
        { value: "C", text: "It clarifies the product's value and reduces risk." },
        { value: "D", text: "It reduces market size." },
      ],
      correctAnswer: "C",
    },
    {
      quizId: "q2",
      question: "What does a strong value proposition communicate?",
      options: [
        { value: "A", text: "The color scheme of the product." },
        { value: "B", text: "The core benefit and promise to the customer." },
        { value: "C", text: "The detailed technical architecture." },
        { value: "D", text: "The market competitors." },
      ],
      correctAnswer: "B",
    },
    {
      quizId: "q3",
      question: "Who is the target market for a parking app?",
      options: [
        { value: "A", text: "Retired seniors." },
        { value: "B", text: "Rural farmers." },
        { value: "C", text: "Urban commuters and event attendees." },
        { value: "D", text: "None of the above." },
      ],
      correctAnswer: "C",
    },
    {
      quizId: "q4",
      question: "What does market size estimation help you understand?",
      options: [
        { value: "A", text: "The total potential revenue and customer base." },
        { value: "B", text: "User interface design." },
        { value: "C", text: "The technical stack." },
        { value: "D", text: "None of the above." },
      ],
      correctAnswer: "A",
    },
    {
      quizId: "q5",
      question: "Why is analyzing the competitive landscape important?",
      options: [
        { value: "A", text: "It increases product costs." },
        { value: "B", text: "It helps to copy competitor features exactly." },
        { value: "C", text: "It identifies gaps and opportunities for differentiation." },
        { value: "D", text: "None of the above." },
      ],
      correctAnswer: "C",
    },
    {
      quizId: "q6",
      question: "What is a key aspect of a strong differentiator?",
      options: [
        { value: "A", text: "Identical features to competitors." },
        { value: "B", text: "Higher production costs." },
        { value: "C", text: "Unique strengths that offer a competitive edge." },
        { value: "D", text: "None of the above." },
      ],
      correctAnswer: "C",
    },
    {
      quizId: "q7",
      question: "What does the 'Market Window' refer to?",
      options: [
        { value: "A", text: "The product development timeline." },
        { value: "B", text: "The ideal timing to launch based on external trends." },
        { value: "C", text: "The technical infrastructure." },
        { value: "D", text: "None of the above." },
      ],
      correctAnswer: "B",
    },
    {
      quizId: "q8",
      question: "What is a core element of a GTM strategy?",
      options: [
        { value: "A", text: "Ignoring market feedback." },
        { value: "B", text: "Focusing only on product development." },
        { value: "C", text: "Targeted marketing and strategic partnerships." },
        { value: "D", text: "None of the above." },
      ],
      correctAnswer: "C",
    },
    {
      quizId: "q9",
      question: "Which of the following is a key metric for success?",
      options: [
        { value: "A", text: "Office location." },
        { value: "B", text: "User acquisition and retention rates." },
        { value: "C", text: "The number of features built." },
        { value: "D", text: "None of the above." },
      ],
      correctAnswer: "B",
    },
    {
      quizId: "q10",
      question: "What is a critical factor for a parking app's success?",
      options: [
        { value: "A", text: "Complex design." },
        { value: "B", text: "High pricing." },
        { value: "C", text: "Accurate real-time data." },
        { value: "D", text: "None of the above." },
      ],
      correctAnswer: "C",
    },
    {
      quizId: "q11",
      question: "What does a 'Go' recommendation indicate?",
      options: [
        { value: "A", text: "The product should be shelved." },
        { value: "B", text: "No decision has been made." },
        { value: "C", text: "The product should be pursued." },
        { value: "D", text: "None of the above." },
      ],
      correctAnswer: "C",
    },

    // PrioritizationTechniques Quizzes
    {
      quizId: "q12",
      question: "Which method categorizes features as Must-Have, Should-Have, Could-Have, and Won't-Have?",
      options: [
        { value: "A", text: "Kano" },
        { value: "B", text: "RICE" },
        { value: "C", text: "MoSCoW" },
        { value: "D", text: "None of the above" },
      ],
      correctAnswer: "C",
    },
    {
      quizId: "q13",
      question: "Which method uses Reach, Impact, Confidence, and Effort for scoring?",
      options: [
        { value: "A", text: "MoSCoW" },
        { value: "B", text: "RICE" },
        { value: "C", text: "Kano" },
        { value: "D", text: "None of the above" },
      ],
      correctAnswer: "B",
    },
    {
      quizId: "q14",
      question: "Which model focuses on customer delight vs. expectation?",
      options: [
        { value: "A", text: "RICE" },
        { value: "B", text: "MoSCoW" },
        { value: "C", text: "Kano" },
        { value: "D", text: "None of the above" },
      ],
      correctAnswer: "C",
    },
    {
      quizId: "q15",
      question: "What is a key use case for the MoSCoW method?",
      options: [
        { value: "A", text: "Customer-focused development" },
        { value: "B", text: "MVP development" },
        { value: "C", text: "Roadmap planning" },
        { value: "D", text: "None of the above" },
      ],
      correctAnswer: "B",
    },
    {
      quizId: "q16",
      question: "What does the RICE scoring model prioritize?",
      options: [
        { value: "A", text: "High-impact, low-effort features" },
        { value: "B", text: "Low-impact, high-effort features" },
        { value: "C", text: "Aesthetic design improvements" },
        { value: "D", text: "None of the above" },
      ],
      correctAnswer: "A",
    },

    // ProductDevelopmentLifecycle Quizzes
    {
      quizId: "q17",
      question: "What is the main goal of the Idea Generation stage?",
      options: [
        { value: "A", text: "Building a full product" },
        { value: "B", text: "Finalizing testing" },
        { value: "C", text: "Identifying customer pain points and trends" },
        { value: "D", text: "Launching the product" },
      ],
      correctAnswer: "C",
    },
    {
      quizId: "q18",
      question: "What is a key activity in Product Discovery & Validation?",
      options: [
        { value: "A", text: "Mass production" },
        { value: "B", text: "User interviews and landing page tests" },
        { value: "C", text: "Marketing campaigns" },
        { value: "D", text: "None of the above" },
      ],
      correctAnswer: "B",
    },
    {
      quizId: "q19",
      question: "What is the focus of building an MVP?",
      options: [
        { value: "A", text: "Core functionalities to gather user feedback" },
        { value: "B", text: "Complex features for all users" },
        { value: "C", text: "Marketing strategies" },
        { value: "D", text: "None of the above" },
      ],
      correctAnswer: "A",
    },
    {
      quizId: "q20",
      question: "What does the Product Launch stage include?",
      options: [
        { value: "A", text: "Idea generation" },
        { value: "B", text: "Final testing and go-to-market strategy" },
        { value: "C", text: "Prototype design" },
        { value: "D", text: "None of the above" },
      ],
      correctAnswer: "B",
    },

    // UserResearchProcess Quizzes
    {
      quizId: "q21",
      question: "What does 'State Hypothesis' involve?",
      options: [
        { value: "A", text: "Setting product pricing" },
        { value: "B", text: "Designing the interface" },
        { value: "C", text: "Stating assumptions about users and solutions" },
        { value: "D", text: "Determining technical requirements" },
      ],
      correctAnswer: "C",
    },
    {
      quizId: "q22",
      question: "What is the primary purpose of defining objectives in user research?",
      options: [
        { value: "A", text: "To design the user interface" },
        { value: "B", text: "To set clear research goals" },
        { value: "C", text: "To choose technology platforms" },
        { value: "D", text: "To hire more staff" },
      ],
      correctAnswer: "B",
    },
    {
      quizId: "q23",
      question: "How is a user research method selected?",
      options: [
        { value: "A", text: "Randomly selecting a method" },
        { value: "B", text: "Based on time, resources, and data needed" },
        { value: "C", text: "Using only qualitative methods" },
        { value: "D", text: "Relying solely on competitor analysis" },
      ],
      correctAnswer: "B",
    },
    {
      quizId: "q24",
      question: "What does 'Conduct Research' involve?",
      options: [
        { value: "A", text: "Drafting the product roadmap" },
        { value: "B", text: "Developing new features" },
        { value: "C", text: "Executing the research plan to collect data" },
        { value: "D", text: "Analyzing competitor products" },
      ],
      correctAnswer: "C",
    },
    {
      quizId: "q25",
      question: "What is the goal of synthesizing research results?",
      options: [
        { value: "A", text: "To design a new interface immediately" },
        { value: "B", text: "To ignore user feedback" },
        { value: "C", text: "To derive actionable insights and validate hypotheses" },
        { value: "D", text: "To determine product pricing" },
      ],
      correctAnswer: "C",
    },
  ];

  return (
    <div className="w-full min-h-screen p-4 xs:p-6 sm:p-8 bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col space-y-4 xs:space-y-6 overflow-x-hidden">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Management Comprehensive Quiz</h1>
      <p className="text-center text-gray-600 mb-6">
        Test your knowledge on product opportunity assessment, prioritization techniques, product development lifecycle, and user research process.
      </p>
      {quizzes.map((quiz) => (
        <Quiz
          key={quiz.quizId}
          quizId={quiz.quizId}
          question={quiz.question}
          options={quiz.options}
          correctAnswer={quiz.correctAnswer}
          onAnswer={handleAnswer}
        />
      ))}
      {totalAnswered === quizzes.length && (
        <div className="mt-6 p-4 bg-white rounded border">
          <h2 className="text-xl font-semibold">
            Your Score: {score} / {quizzes.length}
          </h2>
          <p className="mt-2">
            {score === quizzes.length
              ? "Perfect! You nailed it! 🎉"
              : "Good effort! Review the feedback to improve your score."}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductManagementQuiz;