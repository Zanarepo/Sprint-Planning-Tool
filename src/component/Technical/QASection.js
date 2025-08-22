import React, { useState, useEffect } from 'react';
import { FaQuestionCircle, FaPlay, FaStop } from 'react-icons/fa';

const QASection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answerTimer, setAnswerTimer] = useState(300); // 5 minutes for answers
  const [isAnswerTimerRunning, setIsAnswerTimerRunning] = useState(false);
  const [visibleAnswer, setVisibleAnswer] = useState(null); // Track which answer is revealed

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Handle the timer countdown for audience questions
  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  // Handle the timer countdown for answering questions
  useEffect(() => {
    let interval;
    if (isAnswerTimerRunning && answerTimer > 0) {
      interval = setInterval(() => {
        setAnswerTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (answerTimer === 0) {
      setIsAnswerTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isAnswerTimerRunning, answerTimer]);

  const startTimer = () => {
    setIsTimerRunning(true);
    setTimer(300); // Reset to 5 minutes when starting the timer
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  const startAnswerTimer = () => {
    setIsAnswerTimerRunning(true);
    setAnswerTimer(300); // Reset to 5 minutes when starting the answer timer
  };

  const stopAnswerTimer = () => {
    setIsAnswerTimerRunning(false);
  };

  const submitQuestion = (e) => {
    e.preventDefault();
    const question = e.target.question.value;
    setQuestions([...questions, question]);
    e.target.reset();
  };

  const toggleAnswer = (index) => {
    setVisibleAnswer((prevIndex) => (prevIndex === index ? null : index));
  };

  const questionsAndAnswers = [
    {
      question: "What do you think is the most important aspect of the frontend in system design?",
      answer: "The most important aspect is user experience (UX). A good UX ensures that the system is intuitive, responsive, and accessible to users, which is crucial for product success."
    },
    {
      question: "How do APIs enhance communication between the frontend and backend?",
      answer: "APIs enable the frontend and backend to communicate by providing a standardized way to request and exchange data, ensuring seamless integration and scalability."
    },
    {
      question: "What does a CRUD system mean?",
      answer: "Create. Read, Update, Delete."
    },
    {
      question: "what tools can you use to test APIs endpoints?",
      answer: "Postman, Insomnia, Curl etc"
    },
    {
      question: "When requesting for a user details from the database, what method do you use?",
      answer: "GET"

    },
    {
        question: "Zana wants to updates a user details using postman and he used the GET request method, what do you think will be the response, 200 ok or 404?",
        answer: "404 Not Found"
        
      }
  ];

  return (
    <div className="my-4">
      <button
        className="flex items-center text-xl font-bold text-blue-600 hover:text-blue-800"
        onClick={toggleVisibility}
      >
        <FaQuestionCircle className="mr-2" /> Q&A
      </button>

      {isVisible && (
        <div className="p-6 border border-gray-300 rounded-lg shadow-lg mt-4 bg-white">
          {/* Audience Question Timer */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Audience Question Time</h3>
            <div className="flex justify-between items-center mt-4">
              <div className="text-4xl font-bold">{`${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''}${timer % 60}`}</div>
              <div className="flex space-x-2">
                {!isTimerRunning ? (
                  <button onClick={startTimer} className="px-4 py-2 bg-blue-600 text-white rounded">
                    <FaPlay className="mr-2" /> Start Timer
                  </button>
                ) : (
                  <button onClick={stopTimer} className="px-4 py-2 bg-red-600 text-white rounded">
                    <FaStop className="mr-2" /> Stop Timer
                  </button>
                )}
              </div>
            </div>

            <form onSubmit={submitQuestion} className="mt-6">
              <textarea
                name="question"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Type your question here..."
                required
              ></textarea>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Submit Question</button>
            </form>

            <div className="mt-6">
              <h4 className="text-lg font-semibold">Submitted Questions</h4>
              <ul className="list-disc pl-5 text-gray-700">
                {questions.map((question, index) => (
                  <li key={index}>{question}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mentee Answer Timer */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold">Mentee Answer Time</h3>
            <div className="flex justify-between items-center mt-4">
              <div className="text-4xl font-bold">{`${Math.floor(answerTimer / 60)}:${answerTimer % 60 < 10 ? '0' : ''}${answerTimer % 60}`}</div>
              <div className="flex space-x-2">
                {!isAnswerTimerRunning ? (
                  <button onClick={startAnswerTimer} className="px-4 py-2 bg-blue-600 text-white rounded">
                    <FaPlay className="mr-2" /> Start Timer
                  </button>
                ) : (
                  <button onClick={stopAnswerTimer} className="px-4 py-2 bg-red-600 text-white rounded">
                    <FaStop className="mr-2" /> Stop Timer
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold">Predefined Questions</h4>
              <ul className="list-disc pl-5 text-gray-700">
                {questionsAndAnswers.map((item, index) => (
                  <li key={index} className="mb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold mb-3">{item.question}</h3>
                      <button
                        onClick={() => toggleAnswer(index)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        {visibleAnswer === index ? 'Hide Answer' : 'Show Answer'}
                      </button>
                    </div>
                    {visibleAnswer === index && (
                      <div className="mt-2 text-gray-700">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QASection;
