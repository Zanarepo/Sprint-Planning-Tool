import React, { useState, useEffect, useRef } from 'react';
import { FaChartBar, FaEye, FaEyeSlash, FaChevronDown, FaChevronUp, FaTasks, FaCheckCircle, FaUserPlus } from 'react-icons/fa';
import Chart from 'chart.js/auto';

const simpleHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash) % 100;
};

const ABTestProgressBar = () => {
  const [userId, setUserId] = useState(null);
  const [userGroup, setUserGroup] = useState(null);
  const [progress, setProgress] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [interactions, setInteractions] = useState([]);
  const [showIntro, setShowIntro] = useState(true);
  const [showExplanations, setShowExplanations] = useState({
    twoTeams: false,
    fairSplitting: false,
    savingTeams: false,
    trackingPlay: false,
    checkingResults: false,
  });
  const [toast, setToast] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    let storedUserId = localStorage.getItem('abTestUserId');
    if (!storedUserId) {
      storedUserId = 'user-' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('abTestUserId', storedUserId);
    }
    setUserId(storedUserId);

    const storedGroup = localStorage.getItem('abTestGroup');
    if (storedGroup) {
      setUserGroup(storedGroup);
    } else {
      const hashValue = simpleHash(storedUserId);
      const group = hashValue < 50 ? 'control' : 'treatment';
      setUserGroup(group);
      localStorage.setItem('abTestGroup', group);
    }
  }, []);

  const simulateNewUser = () => {
    const newUserId = 'user-' + Math.random().toString(36).substr(2, 9);
    setUserId(newUserId);
    setProgress(0);
    setTaskCount(0);
    const hashValue = simpleHash(newUserId);
    const group = hashValue < 50 ? 'control' : 'treatment';
    setUserGroup(group);
    localStorage.setItem('abTestUserId', newUserId);
    localStorage.setItem('abTestGroup', group);
    setToast({ message: 'New user simulated!', icon: <FaUserPlus className="text-yellow-600" /> });
    setTimeout(() => setToast(null), 2000);
  };

  const completeTask = () => {
    setTaskCount((prev) => prev + 1);
    if (userGroup === 'treatment') {
      setProgress((prev) => Math.min(100, prev + 10));
    }
    setInteractions((prev) => [
      ...prev,
      {
        userId,
        group: userGroup,
        taskCount: taskCount + 1,
        timestamp: new Date().toLocaleString(),
      },
    ]);
    setToast({ message: 'Task completed!', icon: <FaCheckCircle className="text-yellow-600" /> });
    setTimeout(() => setToast(null), 2000);
  };

  useEffect(() => {
    const ctx = document.getElementById('interactionChart')?.getContext('2d');
    if (!ctx) return;

    const controlTasks = interactions
      .filter((i) => i.group === 'control')
      .reduce((sum, i) => sum + i.taskCount, 0);
    const treatmentTasks = interactions
      .filter((i) => i.group === 'treatment')
      .reduce((sum, i) => sum + i.taskCount, 0);

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Control (No Progress Bar)', 'Treatment (Progress Bar)'],
        datasets: [
          {
            label: 'Total Tasks Completed',
            data: [controlTasks, treatmentTasks],
            backgroundColor: ['#3B82F6', '#10B981'],
          },
        ],
      },
      options: {
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'Tasks Completed' } },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [interactions]);

  const uniqueUsers = {
    control: new Set(interactions.filter((i) => i.group === 'control').map((i) => i.userId)).size,
    treatment: new Set(interactions.filter((i) => i.group === 'treatment').map((i) => i.userId)).size,
  };

  const toggleExplanation = (key) => {
    setShowExplanations({ ...showExplanations, [key]: !showExplanations[key] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-white p-0 max-w-full pt-16 sm:pt-24">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center animate-fade-in-out">
          {toast.icon}
          <span className="ml-2">{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b-4 border-yellow-600 shadow-2xl py-4 sm:py-6 px-4 sm:px-6 text-center">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 flex justify-center items-center">
          <FaChartBar className="mr-2 text-yellow-600 text-2xl sm:text-3xl" /> A/B Test: Progress Bar vs. No Progress Bar
        </h1>
        <p className="mt-2 text-sm sm:text-lg text-gray-600 max-w-full mx-auto">
          Discover how a progress bar impacts user engagement in this interactive test.
        </p>
        <button
          onClick={() => document.getElementById('introduction').scrollIntoView({ behavior: 'smooth' })}
          className="mt-4 bg-yellow-600 text-white py-2 px-4 sm:px-6 rounded-lg hover:bg-yellow-700 transition duration-300 transform hover:scale-105"
        >
          Explore Test
        </button>
      </header>

      {/* Introduction Section */}
      <section id="introduction" className="max-w-4xl mx-auto my-6 sm:my-8 bg-white shadow-lg rounded-lg border border-yellow-600">
        <div className="flex items-center justify-between p-4 sm:p-6 bg-gray-50">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Introduction to Progress Bar A/B Test</h2>
          <button
            onClick={() => setShowIntro(!showIntro)}
            className="flex items-center bg-yellow-600 text-white py-2 px-3 sm:px-4 rounded-lg hover:bg-yellow-700 transition duration-300"
          >
            {showIntro ? <FaEyeSlash className="mr-2" /> : <FaEye className="mr-2" />}
            {showIntro ? 'Hide' : 'Show'} Introduction
          </button>
        </div>
        {showIntro && (
          <div className="p-4 sm:p-6">
            <p className="text-gray-600 text-sm sm:text-lg leading-relaxed">
              This interactive A/B test lets you experience how a progress bar affects app usage. You’ll be assigned to either the control group (no progress bar) or the treatment group (with a progress bar) and can complete tasks to see the impact.
            </p>
            <ul className="mt-4 space-y-2 sm:space-y-3 text-gray-600 text-sm sm:text-lg">
              <li><span className="font-semibold text-yellow-600">Complete Tasks:</span> Click “Complete a Task” to simulate app usage.</li>
              <li><span className="font-semibold text-yellow-600">Simulate New User:</span> Try a new user ID to experience the other group.</li>
              <li><span className="font-semibold text-yellow-600">Track Results:</span> The dashboard shows how each group performs over time.</li>
            </ul>
            <p className="mt-4 text-gray-600 text-sm sm:text-lg">
              Start by completing tasks below to see how the progress bar influences engagement!
            </p>
          </div>
        )}
      </section>

      {/* App Experience Section */}
      <section className="max-w-4xl mx-auto my-6 sm:my-8 bg-white shadow-lg rounded-lg border border-yellow-600">
        <div className="p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Your App Experience</h2>
          <p className="mb-4 text-gray-600 text-sm sm:text-lg">
            User ID: <strong>{userId || 'Loading...'}</strong> | Group: <strong>{userGroup || 'Loading...'}</strong>
          </p>
          <p className="mb-6 text-gray-600 text-sm sm:text-lg">
            {userGroup === 'treatment'
              ? 'You’re using the app with a shiny new progress bar to track your tasks!'
              : userGroup === 'control'
              ? 'You’re using the regular app without a progress bar.'
              : 'Setting up your experience...'}
          </p>
          <div className={`p-4 rounded-lg ${userGroup === 'treatment' ? 'shadow-yellow-200' : 'shadow-gray-200'} shadow-md`}>
            {userGroup === 'treatment' && (
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">Your Progress Bar</h3>
                <div className="w-full bg-gray-200 rounded-full h-8 relative overflow-hidden">
                  <div
                    className="bg-yellow-600 h-8 rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${progress}%` }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-white font-semibold">
                      {progress}%
                    </span>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mt-2">Tasks Completed: {taskCount}</p>
                {progress > 0 && (
                  <p className="text-sm sm:text-base text-yellow-600 mt-2 animate-pulse">Keep going! You’re making great progress!</p>
                )}
              </div>
            )}
            {userGroup === 'control' && (
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 flex items-center">
                  <FaTasks className="mr-2 text-yellow-600" /> Regular App
                </h3>
                <div className="w-full bg-gray-200 rounded-lg p-4 text-center">
                  <p className="text-gray-600 font-semibold text-sm sm:text-base">Tasks Completed: {taskCount}</p>
                  <p className="text-sm text-gray-500">You’re tracking tasks without a progress bar.</p>
                </div>
              </div>
            )}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
              <button
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition duration-300 flex items-center justify-center"
                onClick={completeTask}
              >
                <FaCheckCircle className="mr-2" /> Complete a Task
              </button>
              <button
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition duration-300 flex items-center justify-center"
                onClick={simulateNewUser}
              >
                <FaUserPlus className="mr-2" /> Simulate New User
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interaction Dashboard */}
      <section className="max-w-4xl mx-auto my-6 sm:my-8 bg-white shadow-lg rounded-lg border border-yellow-600">
        <div className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">Interaction Dashboard</h3>
          <p className="text-gray-600 mb-4 text-sm sm:text-lg">
            See how users interact with each version. Aim for 100 users per group for reliable results!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-600 text-sm sm:text-base">
                <strong>Control Group Users:</strong> {uniqueUsers.control} / 100
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-yellow-600 h-2 rounded-full"
                  style={{ width: `${(uniqueUsers.control / 100) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-sm sm:text-base">
                <strong>Treatment Group Users:</strong> {uniqueUsers.treatment} / 100
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-yellow-600 h-2 rounded-full"
                  style={{ width: `${(uniqueUsers.treatment / 100) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Task Completion Comparison</h4>
            <canvas id="interactionChart" className="w-full max-w-md mx-auto" height="200"></canvas>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-600 border border-yellow-600">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 sm:p-3 border-r border-yellow-600">User ID</th>
                  <th className="p-2 sm:p-3 border-r border-yellow-600">Group</th>
                  <th className="p-2 sm:p-3 border-r border-yellow-600">Tasks Completed</th>
                  <th className="p-2 sm:p-3">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {interactions.map((interaction, index) => (
                  <tr key={index} className={`border-t border-yellow-600 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}>
                    <td className="p-2 sm:p-3 border-r border-yellow-600">{interaction.userId}</td>
                    <td className="p-2 sm:p-3 border-r border-yellow-600">{interaction.group}</td>
                    <td className="p-2 sm:p-3 border-r border-yellow-600">{interaction.taskCount}</td>
                    <td className="p-2 sm:p-3">{interaction.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Explanation Section */}
      <section className="max-w-4xl mx-auto my-6 sm:my-8 bg-white shadow-lg rounded-lg border border-yellow-600">
        <div className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">How This Test Works</h3>
          {[
            {
              key: 'twoTeams',
              title: 'Two Teams',
              text: 'Users are split into two teams: control (no progress bar) and treatment (with progress bar). Each team needs about 6,394 users for reliable results, like picking teams for a fair game.',
            },
            {
              key: 'fairSplitting',
              title: 'Fair Splitting',
              text: 'Each user gets a random number based on their ID, like drawing a number from a hat. Numbers 0–50 join the control team; 51–100 get the progress bar team.',
            },
            {
              key: 'savingTeams',
              title: 'Saving Teams',
              text: 'Your team is saved so you always see the same app version, like keeping the same game rules every time you play.',
            },
            {
              key: 'trackingPlay',
              title: 'Tracking Play',
              text: 'Click “Complete a Task” to use the app. The dashboard tracks how many tasks each team completes, like counting points in a game.',
            },
            {
              key: 'checkingResults',
              title: 'Checking Results',
              text: 'With enough users (200 total), we compare task counts to see if the progress bar team outperforms, like checking which team won the game!',
            },
          ].map(({ key, title, text }) => (
            <div key={key} className="mb-2">
              <button
                className="w-full flex justify-between items-center p-3 bg-green-50 rounded-lg text-gray-800 hover:bg-green-100"
                onClick={() => toggleExplanation(key)}
              >
                <span className="font-semibold text-sm sm:text-base">{title}</span>
                {showExplanations[key] ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {showExplanations[key] && (
                <p className="p-3 text-gray-600 text-sm sm:text-base">{text}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ABTestProgressBar;