import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import SimulationModule from './SimulationModule';


const Quiz = ({ quizId, question, options, correctAnswer }) => {
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleOptionChange = (e) => {
    setSelected(e.target.value);
    setFeedback("");
  };

  const handleSubmit = () => {
    if (!selected) {
      setFeedback("Please select an answer.");
      return;
    }
    if (selected === correctAnswer) {
      setFeedback("Correct! 🎉");
    } else {
      setFeedback("Incorrect. Try again!");
    }
  };

  return (
    <div className="bg-yellow-50 p-4 sm:p-6 rounded-lg border border-yellow-300 shadow-md mt-4">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{question}</h3>
      {options.map((option, index) => (
        <label key={index} className="block mb-2 cursor-pointer hover:bg-yellow-100 rounded p-1 transition-transform duration-300">
          <input
            type="radio"
            name={quizId}
            value={option.value}
            onChange={handleOptionChange}
            className="mr-2 accent-yellow-600"
          />
          {option.text}
        </label>
      ))}
      <button
        onClick={handleSubmit}
        className="mt-2 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-4 py-2 rounded-lg text-sm sm:text-base transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
        aria-label="Submit quiz answer"
      >
        Submit Answer
      </button>
      {feedback && (
        <div
          className={`mt-2 font-bold text-sm sm:text-base ${
            feedback.startsWith("Correct") ? "text-green-600" : "text-red-600"
          }`}
        >
          {feedback}
        </div>
      )}
    </div>
  );
};

const PMConcepts = () => {
  const [openSections, setOpenSections] = useState({
    overview: true,
    customerMarket: true,
    userPainPoints: true,
    competitiveAnalysis: true,
    userInterviews: true,
    dataDriven: true,
    finalTakeaway: true,
    simulations: true,
  });


  useEffect(() => {
    toast.info('Explore key PM concepts!', {
      toastId: 'welcome-pmconcepts',
      theme: 'light',
      style: { background: '#fef3c7', color: '#1f2937' },
    });

  }, []);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

 

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans flex flex-col">
      <header className="mb-8 border-b border-yellow-200 flex-1">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">🌟</span>
            Product Management Concepts
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => toggleSection('overview')}
              className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
              aria-expanded={openSections.overview}
              aria-controls="overview-section"
            >
              {openSections.overview ? 'Hide' : 'Show'}
            </button>
           
          </div>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.overview ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300 text-center">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Learn essential product management concepts through simple explanations, quizzes, and interactive simulations, using a lemonade stand analogy to make ideas clear and actionable.
            </p>
          </div>
        </div>
      </header>

      <section className="m-4 max-w-7xl mx-auto flex-1 space-y-8">
        {/* Section 1: Customer & Market Research */}
        <div>
          <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center text-gray-800">
              <span className="mr-2 text-blue-600">1️⃣</span>
              Customer & Market Research
            </h2>
            <button
              onClick={() => toggleSection('customerMarket')}
              className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
              aria-expanded={openSections.customerMarket}
              aria-controls="customer-market-section"
            >
              {openSections.customerMarket ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className={`transition-all duration-500 overflow-hidden ${openSections.customerMarket ? 'max-h-max' : 'max-h-0'}`}>
            <div className="mt-4 p-4 sm:p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300">
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">What is it?</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
                  Imagine you want to open a lemonade stand. 🍋🚀 To succeed, you need to know:
                </p>
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 mb-2">
                  <li>Who wants lemonade? (Your customers)</li>
                  <li>Where do people buy lemonade now? (Your market)</li>
                  <li>What flavors do they like? (Customer preferences)</li>
                </ul>
                <p className="text-sm sm:text-base text-gray-700">
                  <strong>Customer & Market Research</strong> helps you understand your customers and their needs.
                </p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Why is it important?</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Without research, you might sell hot soup on a sunny day! 🥵🍲 Research ensures you create what people want.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Example:</h3>
                <p className="text-sm sm:text-base text-gray-700">🔸 Netflix studies viewing habits to decide which shows to produce. 🎥</p>
              </div>
              <Quiz
                quizId="quiz1"
                question="What does Customer & Market Research help you understand?"
                options={[
                  { value: "A", text: "How to build a product." },
                  { value: "B", text: "Who your customers are and their preferences." },
                  { value: "C", text: "The exact price to sell your product." },
                  { value: "D", text: "How to design your product logo." },
                ]}
                correctAnswer="B"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Understanding Users & Their Pain Points */}
        <div>
          <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center text-gray-800">
              <span className="mr-2 text-green-600">2️⃣</span>
              Understanding Users & Their Pain Points
            </h2>
            <button
              onClick={() => toggleSection('userPainPoints')}
              className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
              aria-expanded={openSections.userPainPoints}
              aria-controls="user-pain-points-section"
            >
              {openSections.userPainPoints ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className={`transition-all duration-500 overflow-hidden ${openSections.userPainPoints ? 'max-h-max' : 'max-h-0'}`}>
            <div className="mt-4 p-4 sm:p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300">
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">What is it?</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
                  Imagine selling shoes. 👟 A customer says, "These hurt my feet!" That’s a <strong>pain point</strong>.
                </p>
                <p className="text-sm sm:text-base text-gray-700 mb-2">Understanding users means:</p>
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 mb-2">
                  <li>Listening to their complaints. 👂</li>
                  <li>Finding what frustrates them. 😤</li>
                  <li>Solving their problems. ✅</li>
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Why is it important?</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Ignoring pain points means building products no one needs!
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Example:</h3>
                <p className="text-sm sm:text-base text-gray-700">🔸 Uber created an app to solve the pain of waiting for taxis. 🚕</p>
              </div>
              <Quiz
                quizId="quiz2"
                question="What does understanding users help you solve?"
                options={[
                  { value: "A", text: "Designing flashy graphics." },
                  { value: "B", text: "Creating products that solve user problems." },
                  { value: "C", text: "Deciding on product pricing." },
                  { value: "D", text: "Determining market share." },
                ]}
                correctAnswer="B"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Competitive Analysis & Benchmarking */}
        <div>
          <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center text-gray-800">
              <span className="mr-2 text-yellow-600">3️⃣</span>
              Competitive Analysis & Benchmarking
            </h2>
            <button
              onClick={() => toggleSection('competitiveAnalysis')}
              className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
              aria-expanded={openSections.competitiveAnalysis}
              aria-controls="competitive-analysis-section"
            >
              {openSections.competitiveAnalysis ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className={`transition-all duration-500 overflow-hidden ${openSections.competitiveAnalysis ? 'max-h-max' : 'max-h-0'}`}>
            <div className="mt-4 p-4 sm:p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300">
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">What is it?</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
                  Imagine your friend’s lemonade stand gets more customers. 🍋😲 Competitive analysis means:
                </p>
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 mb-2">
                  <li>Studying what competitors do well. 👀</li>
                  <li>Improving your own offering. 🚀</li>
                  <li>Learning from their mistakes. ❌</li>
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Why is it important?</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  If competitors make better lemonade, you’ll lose customers unless you improve.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Example:</h3>
                <p className="text-sm sm:text-base text-gray-700">🔸 Samsung studies Apple’s iPhones to improve Android phones. 📱</p>
              </div>
              <Quiz
                quizId="quiz3"
                question="What is the goal of competitive analysis?"
                options={[
                  { value: "A", text: "To copy exactly what competitors do." },
                  { value: "B", text: "To understand competitors and improve your own offering." },
                  { value: "C", text: "To focus only on your own product." },
                  { value: "D", text: "To lower your product price." },
                ]}
                correctAnswer="B"
              />
            </div>
          </div>
        </div>

        {/* Section 4: User Interviews & Surveys */}
        <div>
          <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center text-gray-800">
              <span className="mr-2 text-purple-600">4️⃣</span>
              User Interviews & Surveys
            </h2>
            <button
              onClick={() => toggleSection('userInterviews')}
              className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
              aria-expanded={openSections.userInterviews}
              aria-controls="user-interviews-section"
            >
              {openSections.userInterviews ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className={`transition-all duration-500 overflow-hidden ${openSections.userInterviews ? 'max-h-max' : 'max-h-0'}`}>
            <div className="mt-4 p-4 sm:p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300">
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">What is it?</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
                  Imagine designing a video game. 🎮 Instead of guessing, ask users:
                </p>
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 mb-2">
                  <li>“What’s your favorite part of a game?”</li>
                  <li>“What annoys you in games?”</li>
                  <li>“What would make a game more fun?”</li>
                </ul>
                <p className="text-sm sm:text-base text-gray-700">
                  Interviews and surveys help you build what users want.
                </p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Why is it important?</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Building based on your opinion alone risks missing what users need.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Example:</h3>
                <p className="text-sm sm:text-base text-gray-700">🔸 Instagram added Reels after users wanted shorter videos like TikTok. 🎥</p>
              </div>
              <Quiz
                quizId="quiz4"
                question="Why are user interviews and surveys valuable?"
                options={[
                  { value: "A", text: "They replace the need for market research." },
                  { value: "B", text: "They provide insights into user preferences and problems." },
                  { value: "C", text: "They guarantee product success." },
                  { value: "D", text: "They help in creating catchy slogans." },
                ]}
                correctAnswer="B"
              />
            </div>
          </div>
        </div>

        {/* Section 5: Data-Driven Decision Making */}
        <div>
          <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center text-gray-800">
              <span className="mr-2 text-red-600">5️⃣</span>
              Data-Driven Decision Making
            </h2>
            <button
              onClick={() => toggleSection('dataDriven')}
              className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
              aria-expanded={openSections.dataDriven}
              aria-controls="data-driven-section"
            >
              {openSections.dataDriven ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className={`transition-all duration-500 overflow-hidden ${openSections.dataDriven ? 'max-h-max' : 'max-h-0'}`}>
            <div className="mt-4 p-4 sm:p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300">
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">What is it?</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
                  Imagine selling two lemonade flavors: 🍋🍓
                </p>
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 mb-2">
                  <li>Strawberry Lemonade</li>
                  <li>Classic Lemonade</li>
                </ul>
                <p className="text-sm sm:text-base text-gray-700 mb-2">Sales data shows:</p>
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 mb-2">
                  <li>✅ Strawberry: 500 cups/day</li>
                  <li>❌ Classic: 50 cups/day</li>
                </ul>
                <p className="text-sm sm:text-base text-gray-700 mb-2">So, focus on Strawberry Lemonade! 🎉</p>
                <p className="text-sm sm:text-base text-gray-700">Data-driven decision-making means:</p>
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 mb-2">
                  <li>Using real numbers. 🔢</li>
                  <li>Avoiding guesses. ❌</li>
                  <li>Making smart choices. ✅</li>
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Why is it important?</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Ignoring data risks wasting resources on unpopular products.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Example:</h3>
                <p className="text-sm sm:text-base text-gray-700">🔸 Spotify uses listening data to recommend similar music. 🎵</p>
              </div>
              <Quiz
                quizId="quiz5"
                question="What is the key benefit of data-driven decision making?"
                options={[
                  { value: "A", text: "It replaces the need for user research." },
                  { value: "B", text: "It helps you make decisions based on real evidence rather than guesses." },
                  { value: "C", text: "It ensures you will always be correct." },
                  { value: "D", text: "It increases the production cost." },
                ]}
                correctAnswer="B"
              />
            </div>
          </div>
        </div>

        {/* Section 6: Final Takeaway */}
        <div>
          <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center text-gray-800">
              <span className="mr-2 text-orange-600">💡</span>
              Final Takeaway
            </h2>
            <button
              onClick={() => toggleSection('finalTakeaway')}
              className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
              aria-expanded={openSections.finalTakeaway}
              aria-controls="final-takeaway-section"
            >
              {openSections.finalTakeaway ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className={`transition-all duration-500 overflow-hidden ${openSections.finalTakeaway ? 'max-h-max' : 'max-h-0'}`}>
            <div className="mt-4 p-4 sm:p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
                PM is like running a lemonade stand 🍋:
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700">
                <li>✅ Know your customers (Market Research)</li>
                <li>✅ Fix their problems (Pain Points)</li>
                <li>✅ Learn from competitors (Competitive Analysis)</li>
                <li>✅ Ask what they want (User Interviews)</li>
                <li>✅ Use data, not guesses (Data-Driven Decisions)</li>
              </ul>
            </div>
          </div>
        </div>

      <SimulationModule/>
       
      </section>

    </div>
  );
};

export default PMConcepts;