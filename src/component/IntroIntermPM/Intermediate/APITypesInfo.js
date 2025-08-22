import React, { useState } from 'react';
import {
  FaNetworkWired,
  FaDesktop,
  FaCode,
  FaDatabase,
  FaMicrochip,
  FaCloud,
  FaCreditCard,
  FaShareAlt,
  FaWifi,
  FaPrint,
} from 'react-icons/fa';
import APISimulation from './APISimulation';

const apiData = [
  {
    id: 1,
    title: "Web APIs",
    icon: <FaNetworkWired />,
    color: "blue",
    shortDescription: "Interfaces for web and mobile apps using standard HTTP methods.",
    details: "Web APIs include RESTful APIs (e.g., Twitter, Google Maps), SOAP APIs (used in banking and enterprise), GraphQL APIs (fetch exactly what you need), and gRPC APIs (for efficient microservices communication).",
    quiz: {
      question: "Which protocol is commonly used by Web APIs for communication?",
      options: [
        { value: "A", text: "FTP" },
        { value: "B", text: "HTTP" },
        { value: "C", text: "SMTP" },
        { value: "D", text: "TCP" },
      ],
      correctAnswer: "B",
    },
  },
  {
    id: 2,
    title: "Operating System APIs",
    icon: <FaDesktop />,
    color: "green",
    shortDescription: "APIs to interact with the operating system, managing files and hardware.",
    details: "These APIs help in building desktop applications, system utilities, and device drivers. Examples include the Windows API and POSIX.",
    quiz: {
      question: "What is a common use case for Operating System APIs?",
      options: [
        { value: "A", text: "Building web applications" },
        { value: "B", text: "Developing device drivers" },
        { value: "C", text: "Processing payments" },
        { value: "D", text: "Fetching social media data" },
      ],
      correctAnswer: "B",
    },
  },
  {
    id: 3,
    title: "Library/Framework APIs",
    icon: <FaCode />,
    color: "purple",
    shortDescription: "APIs provided by libraries or frameworks to speed up development.",
    details: "They offer pre-built code to build features faster. Examples include React for UI, TensorFlow for machine learning, and Stripe SDK for payment processing.",
    quiz: {
      question: "Which library is an example of a Library/Framework API for UI development?",
      options: [
        { value: "A", text: "MongoDB" },
        { value: "B", text: "React" },
        { value: "C", text: "AWS SDK" },
        { value: "D", text: "PayPal API" },
      ],
      correctAnswer: "B",
    },
  },
  {
    id: 4,
    title: "Database APIs",
    icon: <FaDatabase />,
    color: "indigo",
    shortDescription: "APIs for interacting with databases to perform CRUD operations.",
    details: "Database APIs allow applications to connect, query, and manipulate data in relational and NoSQL databases like MongoDB.",
    quiz: {
      question: "What does CRUD stand for in the context of Database APIs?",
      options: [
        { value: "A", text: "Create, Read, Update, Delete" },
        { value: "B", text: "Connect, Retrieve, Upload, Destroy" },
        { value: "C", text: "Compute, Render, Update, Deploy" },
        { value: "D", text: "Capture, Read, Unify, Deliver" },
      ],
      correctAnswer: "A",
    },
  },
  {
    id: 5,
    title: "Hardware APIs",
    icon: <FaMicrochip />,
    color: "red",
    shortDescription: "Interfaces for communication between software and hardware devices.",
    details: "They allow access to device sensors, cameras, and peripherals. Common in mobile apps to access features like GPS, camera, or accelerometer.",
    quiz: {
      question: "What is a common feature accessed by Hardware APIs in mobile apps?",
      options: [
        { value: "A", text: "Social media feeds" },
        { value: "B", text: "GPS" },
        { value: "C", text: "Cloud storage" },
        { value: "D", text: "Payment processing" },
      ],
      correctAnswer: "B",
    },
  },
  {
    id: 6,
    title: "Cloud Service APIs",
    icon: <FaCloud />,
    color: "sky",
    shortDescription: "APIs provided by cloud providers to manage computing resources.",
    details: "These APIs help automate tasks like provisioning servers, managing storage, and configuring networks. Examples include AWS, Google Cloud, and Azure APIs.",
    quiz: {
      question: "What is a primary function of Cloud Service APIs?",
      options: [
        { value: "A", text: "Fetching social media posts" },
        { value: "B", text: "Automating server provisioning" },
        { value: "C", text: "Building user interfaces" },
        { value: "D", text: "Processing payments" },
      ],
      correctAnswer: "B",
    },
  },
  {
    id: 7,
    title: "Payment APIs",
    icon: <FaCreditCard />,
    color: "yellow",
    shortDescription: "APIs that enable secure payment processing.",
    details: "Payment APIs allow apps to handle transactions securely without managing sensitive data directly. Examples include Stripe and PayPal.",
    quiz: {
      question: "What is a key benefit of using Payment APIs like Stripe?",
      options: [
        { value: "A", text: "Fetching user profiles" },
        { value: "B", text: "Secure transaction processing" },
        { value: "C", text: "Managing hardware sensors" },
        { value: "D", text: "Querying databases" },
      ],
      correctAnswer: "B",
    },
  },
  {
    id: 8,
    title: "Social Media APIs",
    icon: <FaShareAlt />,
    color: "pink",
    shortDescription: "APIs to interact with social media platforms and their data.",
    details: "They are used to fetch profiles, posts, or analytics data. Examples include the Facebook Graph API and Twitter API.",
    quiz: {
      question: "What type of data can Social Media APIs fetch?",
      options: [
        { value: "A", text: "Hardware sensor data" },
        { value: "B", text: "User profiles and posts" },
        { value: "C", text: "Server logs" },
        { value: "D", text: "Payment transactions" },
      ],
      correctAnswer: "B",
    },
  },
  {
    id: 9,
    title: "IoT APIs",
    icon: <FaWifi />,
    color: "teal",
    shortDescription: "APIs for connecting and controlling Internet of Things devices.",
    details: "IoT APIs enable real-time data collection and automation for smart devices like sensors and home automation systems.",
    quiz: {
      question: "What is a primary use case for IoT APIs?",
      options: [
        { value: "A", text: "Processing payments" },
        { value: "B", text: "Controlling smart devices" },
        { value: "C", text: "Building web interfaces" },
        { value: "D", text: "Querying relational databases" },
      ],
      correctAnswer: "B",
    },
  },
];

/* Print Button Component */
const PrintButton = () => {
  return (
    <button
      onClick={() => window.print()}
      className="m-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg inline-flex items-center transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600"
      aria-label="Print this page"
    >
      <FaPrint className="mr-2 text-xl" />
      Print
    </button>
  );
};

/* Quiz Component */
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
    <div className="bg-yellow-50 p-4 sm:p-6 rounded-lg border border-yellow-300 mt-4 shadow-md">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">{question}</h3>
      {options.map((option, index) => (
        <label
          key={index}
          className="block mb-2 cursor-pointer text-gray-700 text-sm sm:text-base hover:bg-yellow-100 rounded p-1 transition duration-200"
        >
          <input
            type="radio"
            name={quizId}
            value={option.value}
            onChange={handleOptionChange}
            className="mr-2 accent-yellow-600 focus:ring-yellow-600"
          />
          {option.text}
        </label>
      ))}
      <button
        onClick={handleSubmit}
        className="mt-2 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
      >
        Submit Answer
      </button>
      {feedback && (
        <div
          className={`mt-2 font-bold text-sm sm:text-base animate-pulse ${
            feedback.startsWith("Correct") ? "text-green-600" : "text-red-600"
          }`}
        >
          {feedback}
        </div>
      )}
    </div>
  );
};

/* API Card Component */
const APICard = ({ api }) => {
  const [isOpen, setIsOpen] = useState(false);

  const colorStyles = {
    blue: { header: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700", content: "bg-blue-50 border-blue-300" },
    green: { header: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700", content: "bg-green-50 border-green-300" },
    purple: { header: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700", content: "bg-purple-50 border-purple-300" },
    indigo: { header: "from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700", content: "bg-indigo-50 border-indigo-300" },
    red: { header: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700", content: "bg-red-50 border-red-300" },
    sky: { header: "from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700", content: "bg-sky-50 border-sky-300" },
    yellow: { header: "from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700", content: "bg-yellow-50 border-yellow-300" },
    pink: { header: "from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700", content: "bg-pink-50 border-pink-300" },
    teal: { header: "from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700", content: "bg-teal-50 border-teal-300" },
  };

  const style = colorStyles[api.color] || colorStyles.blue;

  return (
    <div className="border rounded-lg shadow-md mb-4 overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full p-4 bg-gradient-to-r ${style.header} text-white focus:outline-none transition duration-300`}
      >
        <div className="flex items-center space-x-4">
          <span className="text-2xl">{api.icon}</span>
          <div className="text-left">
            <h2 className="text-lg sm:text-xl font-semibold">{api.title}</h2>
            <p className="text-sm sm:text-base text-white/80">{api.shortDescription}</p>
          </div>
        </div>
        <div className="text-2xl">{isOpen ? "−" : "+"}</div>
      </button>
      <div className={`transition-all duration-500 overflow-hidden ${isOpen ? "max-h-max" : "max-h-0"}`}>
        <div className={`p-4 sm:p-6 ${style.content} border animate-slide-in`}>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{api.details}</p>
          <Quiz
            quizId={`apiQuiz-${api.id}`}
            question={api.quiz.question}
            options={api.quiz.options}
            correctAnswer={api.quiz.correctAnswer}
          />
        </div>
      </div>
    </div>
  );
};

/* APITypesInfo Component */
const APITypesInfo = () => {
  const [openSections, setOpenSections] = useState({
    introduction: true,
    apiTypes: true,
    simulation: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans">
      <PrintButton />

      {/* Introduction Section */}
      <section className="mb-8 border-b border-blue-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">🔌</span>
            Different Types of APIs & Their Use Cases
          </h1>
          <button
            onClick={() => toggleSection("introduction")}
            className="text-blue-600 hover:text-blue-700 text-sm sm:text-base"
            aria-expanded={openSections.introduction}
            aria-controls="introduction-section"
          >
            {openSections.introduction ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.introduction ? "max-h-max" : "max-h-0"}`}>
          <div className="m-4 bg-blue-50 p-4 sm:p-6 rounded-lg shadow-lg border border-blue-300">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              APIs (Application Programming Interfaces) enable different systems to communicate. This interactive guide explores various API types, their roles, and real-world applications. Expand each section to learn more and test your knowledge with quizzes.
            </p>
            <Quiz
              quizId="introQuiz"
              question="What is the primary function of an API?"
              options={[
                { value: "A", text: "To store data permanently" },
                { value: "B", text: "To enable communication between systems" },
                { value: "C", text: "To render user interfaces" },
                { value: "D", text: "To process hardware signals" },
              ]}
              correctAnswer="B"
            />
          </div>
        </div>
      </section>

      {/* API Types Section */}
      <section className="mb-8 border-b border-blue-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">🗂️</span>
            API Types
          </h1>
          <button
            onClick={() => toggleSection("apiTypes")}
            className="text-blue-600 hover:text-blue-700 text-sm sm:text-base"
            aria-expanded={openSections.apiTypes}
            aria-controls="api-types-section"
          >
            {openSections.apiTypes ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.apiTypes ? "max-h-max" : "max-h-0"}`}>
          <div className="m-4 space-y-4">
            {apiData.map((api) => (
              <APICard key={api.id} api={api} />
            ))}
          </div>
        </div>
      </section>

      {/* Simulation Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">🔄</span>
            API Simulation
          </h1>
          <button
            onClick={() => toggleSection("simulation")}
            className="text-blue-600 hover:text-blue-700 text-sm sm:text-base"
            aria-expanded={openSections.simulation}
            aria-controls="simulation-section"
          >
            {openSections.simulation ? "Hide" : "Show"}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.simulation ? "max-h-max" : "max-h-0"}`}>
          <div className="m-4 bg-blue-50 p-4 sm:p-6 rounded-lg shadow-lg border border-blue-300">
            <APISimulation />
          </div>
        </div>
      </section>
    </div>
  );
};

export default APITypesInfo;