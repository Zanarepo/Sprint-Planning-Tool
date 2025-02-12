import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import BurnDownFeature from './BurnDownFeature'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const BurndownChartTracker = () => {
  // Sprint profile state
  const [sprintProfile, setSprintProfile] = useState({
    duration: 0,
    unit: "days",
    totalStoryPoints: 0,
    totalStories: 0,
  });
  const [profileSet, setProfileSet] = useState(false);

  // Form states for sprint profile
  const [durationInput, setDurationInput] = useState("");
  const [unitInput, setUnitInput] = useState("days");
  const [totalStoryPointsInput, setTotalStoryPointsInput] = useState("");
  const [totalStoriesInput, setTotalStoriesInput] = useState("");

  // Tasks (completed work) state
  const [tasks, setTasks] = useState([]);
  // Task input fields
  const [taskDay, setTaskDay] = useState("");
  const [taskStoriesCompleted, setTaskStoriesCompleted] = useState("");
  const [taskStoryPointsCompleted, setTaskStoryPointsCompleted] = useState("");
  // For editing an entry
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Convert sprint duration into days (if months, assume 30 days per month)
  const sprintDurationDays =
    sprintProfile.unit === "months" ? sprintProfile.duration * 30 : sprintProfile.duration;

  // Calculate cumulative totals for tasks
  const totalCompletedStories = tasks.reduce((sum, task) => sum + Number(task.storiesCompleted), 0);
  const totalCompletedStoryPoints = tasks.reduce((sum, task) => sum + Number(task.storyPointsCompleted), 0);

  // Determine if sprint has ended (when both story points and stories meet or exceed the profile)
  const sprintEnded =
    profileSet &&
    totalCompletedStories >= sprintProfile.totalStories &&
    totalCompletedStoryPoints >= sprintProfile.totalStoryPoints;

  // Calculate velocity: average story points completed per day based on the highest day logged
  const maxDay = tasks.length ? Math.max(...tasks.map((task) => Number(task.day))) : 0;
  const velocity = maxDay > 0 ? (totalCompletedStoryPoints / maxDay).toFixed(2) : 0;

  // Calculate remaining work
  const remainingStoryPoints = Math.max(sprintProfile.totalStoryPoints - totalCompletedStoryPoints, 0);
  const remainingStories = Math.max(sprintProfile.totalStories - totalCompletedStories, 0);
  const daysCompleted = maxDay;
  const daysRemaining = sprintDurationDays - daysCompleted;
  const requiredRateStoryPoints = daysRemaining > 0 ? (remainingStoryPoints / daysRemaining).toFixed(2) : "N/A";
  const requiredRateStories = daysRemaining > 0 ? (remainingStories / daysRemaining).toFixed(2) : "N/A";

  // Prepare burndown chart data
  const labels = Array.from({ length: sprintDurationDays + 1 }, (_, i) => i);
  const sortedTasks = [...tasks].sort((a, b) => Number(a.day) - Number(b.day));
  let cumulative = 0;
  const remainingPoints = labels.map((day) => {
    sortedTasks.forEach((task) => {
      if (Number(task.day) === day) {
        cumulative += Number(task.storyPointsCompleted);
      }
    });
    const remaining = sprintProfile.totalStoryPoints - cumulative;
    return remaining < 0 ? 0 : remaining;
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: "Remaining Story Points",
        data: remainingPoints,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
      {
        label: "Ideal Burndown",
        data: labels.map((day) => {
          const ideal = sprintProfile.totalStoryPoints - (sprintProfile.totalStoryPoints / sprintDurationDays) * day;
          return ideal < 0 ? 0 : ideal;
        }),
        borderColor: "rgba(54, 162, 235, 1)",
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  // Handler for setting the sprint profile
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (durationInput && totalStoryPointsInput && totalStoriesInput) {
      setSprintProfile({
        duration: Number(durationInput),
        unit: unitInput,
        totalStoryPoints: Number(totalStoryPointsInput),
        totalStories: Number(totalStoriesInput),
      });
      setProfileSet(true);
    }
  };

  // Handler for editing the sprint profile (prefilled inputs)
  const handleEditProfile = () => {
    // Populate the sprint profile form with current profile values
    setDurationInput(sprintProfile.duration);
    setUnitInput(sprintProfile.unit);
    setTotalStoryPointsInput(sprintProfile.totalStoryPoints);
    setTotalStoriesInput(sprintProfile.totalStories);
    setProfileSet(false);
    // Clear existing tasks since the profile is changing
    setTasks([]);
  };

  // Handler to reset entire board
  const handleResetBoard = () => {
    setSprintProfile({
      duration: 0,
      unit: "days",
      totalStoryPoints: 0,
      totalStories: 0,
    });
    setProfileSet(false);
    setDurationInput("");
    setUnitInput("days");
    setTotalStoryPointsInput("");
    setTotalStoriesInput("");
    setTasks([]);
    setTaskDay("");
    setTaskStoriesCompleted("");
    setTaskStoryPointsCompleted("");
    setEditingTaskId(null);
  };

  // Handler for adding or updating a task entry
  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (taskDay && taskStoriesCompleted && taskStoryPointsCompleted) {
      if (editingTaskId !== null) {
        const updatedTasks = tasks.map((task) =>
          task.id === editingTaskId
            ? {
                ...task,
                day: Number(taskDay),
                storiesCompleted: Number(taskStoriesCompleted),
                storyPointsCompleted: Number(taskStoryPointsCompleted),
              }
            : task
        );
        setTasks(updatedTasks);
        setEditingTaskId(null);
      } else {
        const newTask = {
          id: Date.now(),
          day: Number(taskDay),
          storiesCompleted: Number(taskStoriesCompleted),
          storyPointsCompleted: Number(taskStoryPointsCompleted),
        };
        setTasks([...tasks, newTask]);
      }
      setTaskDay("");
      setTaskStoriesCompleted("");
      setTaskStoryPointsCompleted("");
    }
  };

  // Prepare task for editing
  const handleEditTask = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setTaskDay(task.day);
      setTaskStoriesCompleted(task.storiesCompleted);
      setTaskStoryPointsCompleted(task.storyPointsCompleted);
      setEditingTaskId(taskId);
    }
  };

  // Delete a task entry
  const handleDeleteTask = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Burndown Chart Tracker</h1>
    <BurnDownFeature/>

      {/* Sprint Profile Form */}
      {!profileSet ? (
        <form onSubmit={handleProfileSubmit} className="mb-6 p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Set Sprint Profile</h2>
          <div className="mb-2">
            <label className="block">Sprint Duration</label>
            <input
              type="number"
              value={durationInput}
              onChange={(e) => setDurationInput(e.target.value)}
              className="border p-1 w-full"
              placeholder="Enter duration"
            />
          </div>
          <div className="mb-2">
            <label className="block">Time Unit</label>
            <select
              value={unitInput}
              onChange={(e) => setUnitInput(e.target.value)}
              className="border p-1 w-full"
            >
              <option value="days">Days</option>
              <option value="months">Months</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block">Total Story Points</label>
            <input
              type="number"
              value={totalStoryPointsInput}
              onChange={(e) => setTotalStoryPointsInput(e.target.value)}
              className="border p-1 w-full"
              placeholder="Enter total story points"
            />
          </div>
          <div className="mb-2">
            <label className="block">Total Stories</label>
            <input
              type="number"
              value={totalStoriesInput}
              onChange={(e) => setTotalStoriesInput(e.target.value)}
              className="border p-1 w-full"
              placeholder="Enter total number of stories"
            />
          </div>
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
            Set Profile
          </button>
        </form>
      ) : (
        <div>
          {/* Display Sprint Profile with Edit and Reset Options */}
          <div className="mb-4 p-4 border rounded shadow">
            <h2 className="text-xl font-semibold text-red-600">Sprint Profile</h2>
            <p>
              <strong>Duration:</strong> {sprintProfile.duration} {sprintProfile.unit} (
              {sprintDurationDays} days)
            </p>
            <p>
              <strong>Total Story Points:</strong> {sprintProfile.totalStoryPoints}
            </p>
            <p>
              <strong>Total Stories:</strong> {sprintProfile.totalStories}
            </p>
            <div className="mt-2">
              <button onClick={handleEditProfile} className="bg-yellow-500 text-white px-3 py-1 mr-2 rounded">
                Edit Profile
              </button>
              <button onClick={handleResetBoard} className="bg-red-600 text-white px-3 py-1 rounded">
                Reset Board
              </button>
            </div>
          </div>

          {/* Task (Completed Work) Form */}
          <form onSubmit={handleTaskSubmit} className="mb-6 p-4 border rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Log Completed Work</h2>
            <div className="mb-2">
              <label className="block">Day</label>
              <input
                type="number"
                value={taskDay}
                onChange={(e) => setTaskDay(e.target.value)}
                className="border p-1 w-full"
                placeholder="Enter day number"
              />
            </div>
            <div className="mb-2">
              <label className="block">Stories Completed</label>
              <input
                type="number"
                value={taskStoriesCompleted}
                onChange={(e) => setTaskStoriesCompleted(e.target.value)}
                className="border p-1 w-full"
                placeholder="Enter number of stories completed"
              />
            </div>
            <div className="mb-2">
              <label className="block">Story Points Completed</label>
              <input
                type="number"
                value={taskStoryPointsCompleted}
                onChange={(e) => setTaskStoryPointsCompleted(e.target.value)}
                className="border p-1 w-full"
                placeholder="Enter story points completed"
              />
            </div>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
              {editingTaskId ? "Update Entry" : "Add Entry"}
            </button>
          </form>

          {/* Logged Tasks Table */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Logged Entries</h2>
            {tasks.length > 0 ? (
              <table className="min-w-full border">
                <thead>
                  <tr>
                    <th className="border p-2">Day</th>
                    <th className="border p-2">Stories Completed</th>
                    <th className="border p-2">Story Points Completed</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id}>
                      <td className="border p-2 text-center">{task.day}</td>
                      <td className="border p-2 text-center">{task.storiesCompleted}</td>
                      <td className="border p-2 text-center">{task.storyPointsCompleted}</td>
                      <td className="border p-2 text-center">
                        <button
                          onClick={() => handleEditTask(task.id)}
                          className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="bg-red-600 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No entries logged yet.</p>
            )}
          </div>

          {/* Sprint Summary */}
          <div className="mb-6 p-4 border rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Sprint Summary</h2>
            <p>
              <strong>Total Stories Completed:</strong> {totalCompletedStories}
            </p>
            <p>
              <strong>Total Story Points Completed:</strong> {totalCompletedStoryPoints}
            </p>
            <p>
              <strong>Remaining Stories:</strong> {remainingStories}
            </p>
            <p>
              <strong>Remaining Story Points:</strong> {remainingStoryPoints}
            </p>
            <p>
              <strong>Velocity (Story Points/Day):</strong> {velocity}
            </p>
            <p>
              <strong>Required Rate (Story Points/Day):</strong> {requiredRateStoryPoints}
            </p>
            <p>
              <strong>Required Rate (Stories/Day):</strong> {requiredRateStories}
            </p>
            {sprintEnded && (
              <div className="mt-4 p-4 bg-green-100 border rounded">
                <h3 className="text-lg font-bold">Sprint Completed!</h3>
                <p>You've achieved the sprint goals.</p>
                {totalCompletedStoryPoints >= sprintProfile.totalStoryPoints &&
                totalCompletedStories >= sprintProfile.totalStories ? (
                  <p>Great job! You met the sprint expectations.</p>
                ) : (
                  <p>You were behind the sprint expectations.</p>
                )}
              </div>
            )}
          </div>

          {/* Burndown Chart */}
          <div className="mb-6 p-4 border rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Burndown Chart</h2>
            <div style={{ height: "400px" }}>
              <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurndownChartTracker;
