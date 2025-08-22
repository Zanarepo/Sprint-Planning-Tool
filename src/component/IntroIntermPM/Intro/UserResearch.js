import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

/* ----------------- Quiz Component ----------------- */
const Quiz = ({ quizId, question, options, correctAnswer, insight }) => {
  const [selected, setSelected] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleOptionChange = (e) => {
    setSelected(e.target.value);
    setFeedback('');
  };

  const handleSubmit = () => {
    if (!selected) {
      setFeedback('Please select an answer.');
      return;
    }
    if (selected === correctAnswer) {
      setFeedback(`Correct! ${insight} 🎉`);
    } else {
      setFeedback(`Incorrect. The correct answer is: ${options.find(opt => opt.value === correctAnswer).text}. ${insight}`);
    }
  };

  const handleReset = () => {
    setSelected('');
    setFeedback('');
  };

  return (
    <div className="bg-yellow-50 p-4 sm:p-6 rounded border border-yellow-300 mt-4 shadow-inner">
      <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800">{question}</h3>
      {options.map((option, index) => (
        <label key={index} className="block mb-2 cursor-pointer text-sm sm:text-base">
          <input
            type="radio"
            name={quizId}
            value={option.value}
            onChange={handleOptionChange}
            className="mr-2 h-4 w-4 text-yellow-600 focus:ring-yellow-600 border-gray-300 accent-yellow-600"
            aria-label={option.text}
          />
          {option.text}
        </label>
      ))}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2">
        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          aria-label="Submit quiz answer"
        >
          Submit Answer
        </button>
        <button
          onClick={handleReset}
          className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          aria-label="Reset quiz"
        >
          Reset
        </button>
      </div>
      {feedback && (
        <div
          className={`mt-2 text-sm sm:text-base font-bold ${
            feedback.startsWith('Correct') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {feedback}
        </div>
      )}
    </div>
  );
};

/* ----------------- Interactive Card Component ----------------- */
const InteractiveCard = ({ step }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-yellow-300 rounded-lg shadow-md mb-6 overflow-hidden transition-all w-full">
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <span className="mr-2 text-xl sm:text-2xl text-yellow-600">{step.icon}</span>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{step.title}</h2>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-1 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          aria-expanded={isOpen}
          aria-controls={step.id}
        >
          {isOpen ? 'Hide' : 'Show'}
        </button>
      </div>
      <div
        className={`transition-all duration-500 overflow-hidden ${isOpen ? 'max-h-max' : 'max-h-0'}`}
      >
        <div className="px-4 sm:px-6 py-4 bg-yellow-50">
          <section className="mb-4">
            <h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-1">Definition:</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{step.definition}</p>
          </section>
          <section className="mb-4">
            <h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-1">What It Means:</h3>
            <ul className="list-none space-y-1 ml-0 text-sm sm:text-base text-gray-700">
              {step.meaning.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-blue-600">✅</span> {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="mb-4">
            <h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-1">Example & Use Case:</h3>
            <p className="text-sm sm:text-base text-gray-700">
              <strong>Example:</strong> {step.example}
            </p>
            <p className="text-sm sm:text-base text-gray-700">
              <strong>Use Case:</strong> {step.useCase}
            </p>
          </section>
          <section className="mb-4">
            <h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-1">Scenario:</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{step.scenario}</p>
          </section>
          <div className="mt-3 p-3 bg-blue-50 rounded-md">
            <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
              <span className="text-green-600">💡</span> Insights
            </h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{step.insight}</p>
          </div>
          {step.quiz && (
            <Quiz
              quizId={step.id}
              question={step.quiz.question}
              options={step.quiz.options}
              correctAnswer={step.quiz.correctAnswer}
              insight={step.quiz.insight}
            />
          )}
        </div>
      </div>
    </div>
  );
};

/* ----------------- Simulation Slider Component ----------------- */
const SimulationSlider = ({ steps, onReset }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleResetSlider = () => {
    setCurrentIndex(0);
    onReset();
  };

  const currentStep = steps[currentIndex];
  const impactScore = 75; // Mock impact score for visualization
  const maxImpact = 100;
  const barHeight = (impactScore / maxImpact) * 100;

  return (
    <div className="mt-10 p-4 sm:p-6 bg-yellow-50 rounded shadow-md border border-yellow-300">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center text-gray-800">
        User Research Process Simulation
      </h2>
      <div className="p-4 border border-yellow-300 rounded mb-4 bg-yellow-50">
        <div className="flex items-center mb-2">
          <span className="mr-2 text-xl sm:text-2xl text-yellow-600">{currentStep.icon}</span>
          <span className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
            {currentStep.title}
          </span>
        </div>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{currentStep.description}</p>
        <div className="mt-4">
          <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Impact Score:</h4>
          <div className="flex">
            <div className="flex-1">
              <div className="text-xs sm:text-sm text-gray-700 text-center">Impact</div>
              <div
                className="bg-yellow-200 rounded"
                style={{ height: `${barHeight}px`, minHeight: '20px' }}
              ></div>
            </div>
          </div>
        </div>
        <div className="mt-3 p-3 bg-blue-50 rounded-md">
          <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
            <span className="text-green-600">💡</span> Insights
          </h4>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            {currentStep.simulationInsight}
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="w-full sm:w-auto flex items-center justify-center bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          aria-label="Previous step"
        >
          <span className="mr-2">⬅️</span> Previous
        </button>
        <button
          onClick={handleResetSlider}
          className="w-full sm:w-auto flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          aria-label="Reset simulation"
        >
          Reset
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === steps.length - 1}
          className="w-full sm:w-auto flex items-center justify-center bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          aria-label="Next step"
        >
          Next <span className="ml-2">➡️</span>
        </button>
      </div>
    </div>
  );
};

/* ----------------- Main User Research Process Component ----------------- */
const UserResearchProcess = () => {
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setResetKey((prev) => prev + 1);
  };

  const researchSteps = [
    {
      id: 'stateHypothesis',
      title: 'State Hypothesis',
      icon: '💡',
      definition:
        'This step involves stating your assumptions—what you believe you understand about your users and their behaviors, as well as your ideas for potential solutions to their needs. These assumptions are unproven and need validation.',
      meaning: [
        'Assumptions About Users: What you think users do, how they behave, and the challenges they face.',
        'Assumptions About Solutions: Your initial ideas on how your product might solve those challenges.',
      ],
      example:
        'Hypothesis: "We believe that young professionals are frustrated by the complexity of our current mobile banking interface, which causes them to abandon transactions."',
      useCase:
        'A fintech startup planning a redesign hypothesizes that simplifying the interface will improve conversion rates and reduce transaction abandonment.',
      scenario:
        'Imagine your team is preparing to launch a new feature. The PM documents: "Our research suggests that users aged 25–35 struggle with finding the bill pay function because the navigation is not intuitive. Simplifying the menu structure should decrease support calls and increase feature usage."',
      quiz: {
        question: 'What does "State Hypothesis" involve?',
        options: [
          { value: 'A', text: 'Stating assumptions about users and potential solutions.' },
          { value: 'B', text: 'Setting product pricing.' },
          { value: 'C', text: 'Designing the interface.' },
          { value: 'D', text: 'Determining technical requirements.' },
        ],
        correctAnswer: 'A',
        insight: 'Stating hypotheses guides targeted research to validate assumptions.',
      },
      insight: 'Stating hypotheses ensures focused research efforts to validate user needs and solutions.',
    },
    {
      id: 'defineObjectives',
      title: 'Define Objectives',
      icon: '🎯',
      definition:
        'This step involves setting clear goals for your research. You determine the specific questions you need to answer and the knowledge gaps you want to fill.',
      meaning: [
        'Clarify the Questions: Identify what you want to learn about your users and product.',
        'Outline Research Goals: Define the insights needed to make informed decisions.',
      ],
      example:
        'Objective: "Understand why users are abandoning transactions in the mobile banking app."',
      useCase:
        'When planning a redesign, the PM sets objectives such as identifying friction points in the user journey and understanding overall user satisfaction.',
      scenario:
        'The PM writes objectives like: "Our research aims to determine which steps in the transaction process cause confusion, how users navigate the app, and what improvements can enhance the experience."',
      quiz: {
        question: 'What is the primary purpose of defining objectives?',
        options: [
          { value: 'A', text: 'To set clear research goals.' },
          { value: 'B', text: 'To design the user interface.' },
          { value: 'C', text: 'To choose technology platforms.' },
          { value: 'D', text: 'To hire more staff.' },
        ],
        correctAnswer: 'A',
        insight: 'Defining objectives focuses research on critical user insights.',
      },
      insight: 'Defining objectives ensures research addresses specific knowledge gaps effectively.',
    },
    {
      id: 'selectResearchMethod',
      title: 'Select User Research Method',
      icon: '🔍',
      definition:
        'In this step, you choose the research method(s) that best match the insights you need. Your choice depends on the kind of data you want (qualitative vs. quantitative), the time available, and the resources you have.',
      meaning: [
        'Qualitative Methods: Interviews, focus groups, usability tests for in-depth insights.',
        'Quantitative Methods: Surveys, analytics for numerical data.',
        'Mixed-Methods: Combining both for a comprehensive view.',
      ],
      example: 'Method: "Conduct usability tests and follow up with a survey."',
      useCase:
        'If the objective is to understand user frustration, the PM conducts one-on-one usability tests and then distributes surveys to gather broader quantitative data.',
      scenario:
        'A PM opts for remote usability testing to observe user interactions, paired with an online survey to quantify difficulties at specific points.',
      quiz: {
        question: 'Which best describes the process of selecting a research method?',
        options: [
          { value: 'A', text: 'Choosing based on available time, resources, and the type of data needed.' },
          { value: 'B', text: 'Randomly selecting a method.' },
          { value: 'C', text: 'Using only qualitative methods.' },
          { value: 'D', text: 'Relying solely on competitor analysis.' },
        ],
        correctAnswer: 'A',
        insight: 'Selecting the right method ensures relevant and actionable data.',
      },
      insight: 'Choosing appropriate research methods ensures relevant and actionable insights.',
    },
    {
      id: 'conductResearch',
      title: 'Conduct Research',
      icon: '📋',
      definition:
        'This step is about executing your research plan. It involves recruiting participants, running interviews or tests, distributing surveys, and collecting data.',
      meaning: [
        'Gather Data: Actively engage with users through the chosen methods.',
        'Record Observations: Collect qualitative insights (interviews, tests) and quantitative data (surveys, analytics).',
      ],
      example:
        'Example: "Conduct 10 remote usability testing sessions and follow up with an online survey sent to 500 users."',
      useCase:
        'A PM schedules remote tests using video conferencing tools and prepares a detailed survey to capture comprehensive data.',
      scenario:
        'Imagine your team conducts a series of usability tests where users complete tasks in the app while being observed. The sessions are recorded, and users later complete a survey rating their experience.',
      quiz: {
        question: 'What does "Conduct Research" involve?',
        options: [
          { value: 'A', text: 'Executing the research plan to collect data.' },
          { value: 'B', text: 'Drafting the product roadmap.' },
          { value: 'C', text: 'Developing new features.' },
          { value: 'D', text: 'Analyzing competitor products.' },
        ],
        correctAnswer: 'A',
        insight: 'Conducting research gathers critical data to inform product decisions.',
      },
      insight: 'Executing research plans gathers critical data for informed decisions.',
    },
    {
      id: 'synthesizeResults',
      title: 'Synthesize the Results',
      icon: '📊',
      definition:
        'This final step involves analyzing the collected data to answer your research questions and determine whether your initial hypotheses are valid. You derive actionable insights from the data.',
      meaning: [
        'Data Analysis: Organize and review both qualitative and quantitative data.',
        'Identify Patterns: Look for recurring themes, pain points, and trends.',
        'Validate Hypotheses: Determine which assumptions were correct and adjust those that weren’t.',
      ],
      example:
        'Example: "After analyzing data, 70% of users struggle with the navigation menu, confirming our hypothesis that it is too complex."',
      useCase:
        'A PM synthesizes feedback from usability tests and surveys to find that users are overwhelmed by too many options, leading to a recommendation to simplify the menu.',
      scenario:
        'After research, the PM summarizes: "Data from 10 usability tests and 500 survey responses reveal consistent navigation issues. The insights confirm our hypothesis and indicate a need to streamline the interface, potentially improving task completion rates by 20%."',
      quiz: {
        question: 'What is the goal of synthesizing the research results?',
        options: [
          { value: 'A', text: 'To derive actionable insights and validate hypotheses.' },
          { value: 'B', text: 'To design a new interface immediately.' },
          { value: 'C', text: 'To ignore user feedback.' },
          { value: 'D', text: 'To determine the product pricing.' },
        ],
        correctAnswer: 'A',
        insight: 'Synthesizing results turns data into actionable product improvements.',
      },
      insight: 'Synthesizing results turns data into actionable insights for product success.',
    },
  ];

  const simulationSteps = [
    {
      title: 'State Hypothesis',
      icon: '💡',
      description:
        'Document your assumptions about user behavior and potential solutions. For example, young professionals might struggle with complex navigation in a mobile banking app.',
      simulationInsight: 'This step ensures research is targeted and effective by defining assumptions.',
    },
    {
      title: 'Define Objectives',
      icon: '🎯',
      description:
        'Set clear research goals and identify the specific questions and knowledge gaps you need to address.',
      simulationInsight: 'Clear objectives focus research on critical user insights.',
    },
    {
      title: 'Select User Research Method',
      icon: '🔍',
      description:
        'Choose the appropriate research methods (qualitative, quantitative, or mixed) based on the insights you need and the resources available.',
      simulationInsight: 'Selecting the right method ensures relevant and actionable data.',
    },
    {
      title: 'Conduct Research',
      icon: '📋',
      description:
        'Execute your research plan by recruiting participants, conducting tests or interviews, and collecting data through surveys and observations.',
      simulationInsight: 'Conducting research gathers critical data to inform decisions.',
    },
    {
      title: 'Synthesize the Results',
      icon: '📊',
      description:
        'Analyze the collected data to identify patterns, validate your hypotheses, and derive actionable insights for product decisions.',
      simulationInsight: 'Synthesizing results drives actionable product improvements.',
    },
  ];

  useEffect(() => {
    toast.info('Master the User Research Process!', {
      toastId: 'welcome-user-research',
      theme: 'light',
      style: { background: '#fef3c7', color: '#1f2937' },
    });
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans flex flex-col py-6 sm:py-8">
      <header className="mb-8 border-b border-yellow-200 flex-1">
        <div className="flex justify-between items-center mx-4 sm:mx-6 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
            <span className="mr-2 text-2xl">📊</span>
            User Research Process
          </h1>
        
        </div>
        <div className="mx-4 sm:mx-6 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300 text-center">
          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
            Follow these steps to validate assumptions, fill knowledge gaps, and drive data-informed product decisions.
          </p>
        </div>
      </header>

      <section className="mx-4 sm:mx-6 flex-1 flex flex-col gap-4 sm:gap-6">
        {researchSteps.map((step) => (
          <InteractiveCard key={`${step.id}-${resetKey}`} step={step} />
        ))}

        <SimulationSlider steps={simulationSteps} onReset={handleReset} />

        <div className="mt-10 p-4 sm:p-6 bg-yellow-50 rounded shadow-md border border-yellow-300">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center text-gray-800">
            Final Thoughts
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            By following these steps—State Hypothesis, Define Objectives, Select a Research Method, Conduct Research, and Synthesize the Results—Product Managers can systematically validate assumptions, gain critical insights, and make data-informed decisions to create products that truly resonate with users.
          </p>
          <div className="mt-3 p-3 bg-blue-50 rounded-md">
            <h4 className="text-sm sm:text-base font-bold text-blue-800 flex items-center gap-2">
              <span className="text-green-600">💡</span> Insights
            </h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              This process ensures user-centric product development through data-driven insights.
            </p>
          </div>
        </div>

        
      </section>
    </div>
  );
};

export default UserResearchProcess;