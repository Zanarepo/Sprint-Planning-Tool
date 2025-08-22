import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001'); // Change this if using a real server

const UserInterviewSimulation = () => {
  const [openSections, setOpenSections] = useState({
    overview: true,
    interview: false,
    responses: false,
    example: false,
  });
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');
  const [response, setResponse] = useState('');
  const [interviewLog, setInterviewLog] = useState([]);
  const [isCollaborating, setIsCollaborating] = useState(false);

  useEffect(() => {
    socket.on('newResponse', (data) => {
      setInterviewLog((prev) => [...prev, data]);
    });

    socket.on('userJoined', () => {
      setIsCollaborating(true);
    });

    return () => {
      socket.off('newResponse');
      socket.off('userJoined');
    };
  }, []);

  const sendResponse = () => {
    if (question && response && category) {
      const newEntry = { question, category, response };
      socket.emit('sendResponse', newEntry);
      setInterviewLog((prev) => [...prev, newEntry]);
      setQuestion('');
      setCategory('');
      setResponse('');
    }
  };

  const handleReset = () => {
    setQuestion('');
    setCategory('');
    setResponse('');
    setInterviewLog([]);
    setOpenSections((prev) => ({ ...prev, interview: true, responses: true }));
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Generate insights based on interview log
  const generateInsights = () => {
    const categories = interviewLog.map((log) => log.category);
    if (categories.includes('Usability')) {
      return 'Insight: Users are concerned about usability. Consider simplifying the interface or streamlining processes to enhance user experience. 🖱️';
    } else if (categories.includes('Preferences')) {
      return 'Insight: Users have expressed specific preferences. Prioritize features or offerings that align with these preferences to increase engagement. 🌟';
    } else if (categories.includes('Pain Points')) {
      return 'Insight: Users are reporting pain points. Develop solutions to address these frustrations, such as faster response times or better support. 😤';
    } else {
      return 'Insight: Continue exploring user feedback to uncover actionable insights and improve your product. 🔍';
    }
  };

  // Calculate category distribution for visualization
  const categoryCounts = interviewLog.reduce((acc, log) => {
    acc[log.category] = (acc[log.category] || 0) + 1;
    return acc;
  }, {});
  const categories = ['Usability', 'Preferences', 'Pain Points', 'Other'];
  const maxCount = Math.max(...Object.values(categoryCounts), 1);
  const categoryScores = categories.map((cat) => ((categoryCounts[cat] || 0) / maxCount) * 100);

  useEffect(() => {
    toast.info('Conduct user interviews to uncover needs!', {
      toastId: 'welcome-interview',
      theme: 'light',
      style: { background: '#fef3c7', color: '#1f2937' },
    });
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans flex flex-col">
      <header className="mb-8 border-b border-yellow-200 flex-1">
        <div className="flex justify-between items-center mx-4 sm:mx-6 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">🎤</span>
            User Interview Simulator
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
          <div className="mx-4 sm:mx-6 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300 text-center">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              Practice conducting user interviews to uncover user needs before building a product. Ask questions, categorize responses, and collaborate in real-time to gain insights!
            </p>
          </div>
        </div>
      </header>

      <section className="mx-4 sm:mx-6 flex-1">
        {/* Interview Panel Section */}
        <div>
          <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center text-gray-800">
              <span className="mr-2 text-blue-600">👤</span>
              Ask a Question
            </h2>
            <button
              onClick={() => toggleSection('interview')}
              className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
              aria-expanded={openSections.interview}
              aria-controls="interview-section"
            >
              {openSections.interview ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className={`transition-all duration-500 overflow-hidden ${openSections.interview ? 'max-h-max' : 'max-h-0'}`}>
            <div className="mt-4 p-4 sm:p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300 flex flex-col gap-4 sm:gap-6">
              <div>
                <label className="block text-gray-700 font-medium text-sm sm:text-base mb-2">
                  Select a question category:
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-yellow-300 rounded-lg px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  required
                >
                  <option value="" disabled>Select category</option>
                  <option value="Usability">Usability</option>
                  <option value="Preferences">Preferences</option>
                  <option value="Pain Points">Pain Points</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium text-sm sm:text-base mb-2">
                  Enter a user research question:
                </label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full border border-yellow-300 rounded-lg px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  placeholder="e.g., What challenges do you face when using our product?"
                  aria-label="User research question"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium text-sm sm:text-base mb-2">
                  Enter the user's response:
                </label>
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  className="w-full border border-yellow-300 rounded-lg px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  rows="4"
                  placeholder="e.g., It's hard to navigate the menu."
                  aria-label="User response"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <button
                  onClick={sendResponse}
                  className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  aria-label="Submit response"
                >
                  Submit Response
                </button>
                <button
                  onClick={handleReset}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  aria-label="Reset simulation"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Responses Section */}
        <div>
          <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4 mt-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center text-gray-800">
              <span className="mr-2 text-green-600">💬</span>
              Live Interview Log
            </h2>
            <button
              onClick={() => toggleSection('responses')}
              className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
              aria-expanded={openSections.responses}
              aria-controls="responses-section"
            >
              {openSections.responses ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className={`transition-all duration-500 overflow-hidden ${openSections.responses ? 'max-h-max' : 'max-h-0'}`}>
            <div className="mt-4 p-4 sm:p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300 flex flex-col gap-4 sm:gap-6">
              <div className="h-60 overflow-y-auto border border-yellow-300 rounded p-4">
                {interviewLog.length === 0 ? (
                  <p className="text-sm sm:text-base text-gray-600">No responses yet.</p>
                ) : (
                  interviewLog.map((log, index) => (
                    <div key={index} className="p-3 bg-gray-100 rounded mb-2">
                      <p className="text-sm sm:text-base">
                        <span className="text-blue-600">{`${index + 1}️⃣`}</span> <strong>Q:</strong> {log.question} <span className="text-gray-500">({log.category})</span>
                      </p>
                      <p className="text-sm sm:text-base"><strong>A:</strong> {log.response}</p>
                    </div>
                  ))
                )}
              </div>
              {interviewLog.length > 0 && (
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Response Categories:</h3>
                  <div className="flex flex-col sm:flex-row gap-2 mt-2">
                    {categories.map((cat, index) => (
                      <div key={index} className="flex-1">
                        <div className="text-xs sm:text-sm text-gray-700 text-center">{cat}</div>
                        <div
                          className="bg-yellow-200 rounded"
                          style={{ height: `${categoryScores[index]}px`, minHeight: '20px' }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {interviewLog.length > 0 && (
                <div className="p-4 bg-blue-50 rounded-md">
                  <h3 className="text-lg sm:text-xl font-bold text-blue-800 flex items-center gap-2">
                    <span className="text-green-600">💡</span> Insights
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{generateInsights()}</p>
                </div>
              )}
              {isCollaborating && (
                <p className="text-sm sm:text-base text-green-600 mt-4 flex items-center gap-2">
                  <span className="text-green-600">🔗</span> Someone else is also conducting an interview in this session.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Real-World Example Section */}
        <div>
          <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4 mt-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center text-gray-800">
              <span className="mr-2 text-purple-600">📊</span>
              Real-World Example
            </h2>
            <button
              onClick={() => toggleSection('example')}
              className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
              aria-expanded={openSections.example}
              aria-controls="example-section"
            >
              {openSections.example ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className={`transition-all duration-500 overflow-hidden ${openSections.example ? 'max-h-max' : 'max-h-0'}`}>
            <div className="mt-4 p-4 sm:p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300 flex flex-col gap-4 sm:gap-6">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                <span className="text-purple-600">🔹</span> <strong>Instagram Reels:</strong> Instagram conducted user research and found that users wanted shorter, engaging videos similar to TikTok. Based on this feedback, they built and launched Instagram Reels, which became a huge success. 🎥
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserInterviewSimulation;