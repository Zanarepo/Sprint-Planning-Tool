import React, { useState, useEffect , useCallback} from "react";
import { supabase } from "../supabaseClient"; // adjust the path as needed
import { Line } from "react-chartjs-2";
import BurnDownFeature from "./BurnDownFeature";
import { ArrowLeft, Eye, Pencil, Trash , PlusCircle, XCircle } from "lucide-react";
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


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BurndownChartTracker = () => {
  /*** USER & GLOBAL STATE ***/

  const [userId, setUserId] = useState(null);

  const [charts, setCharts] = useState([]);

  const [, setUserEmail] = useState("");
  


  // When a chart is selected, we display its details (tasks, chart, etc.)
  const [selectedChart, setSelectedChart] = useState(null);

  // Controls whether the sprint profile form is visible (for creating or editing)
  const [showProfileForm, setShowProfileForm] = useState(false);
  // If editing an existing chart, its id is stored here.
  const [editingChartId, setEditingChartId] = useState(null);

  /*** SPRINT PROFILE (Chart) FORM FIELDS ***/
  const [durationInput, setDurationInput] = useState("");
  const [unitInput, setUnitInput] = useState("days");
  const [totalStoryPointsInput, setTotalStoryPointsInput] = useState("");
  const [totalStoriesInput, setTotalStoriesInput] = useState("");

  /*** TASKS STATE (for detail view) ***/
  const [tasks, setTasks] = useState([]);
  const [taskDay, setTaskDay] = useState("");
  const [taskStoriesCompleted, setTaskStoriesCompleted] = useState("");
  const [taskStoryPointsCompleted, setTaskStoryPointsCompleted] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  /*** FETCH USER ID FROM LOCALSTORAGE ***/
useEffect(() => {
  const email = localStorage.getItem("userEmail");
  if (email) {
    setUserEmail(email);
    console.debug("User email found in localStorage:", email);
    
    const fetchUserId = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();
      if (error) {
        console.error("Error fetching user id:", error);
      } else if (data) {
        setUserId(data.id);
      }
    };
    
    fetchUserId();
  } else {
    console.debug("No user email found in localStorage.");
  }
}, []);

useEffect(() => {
  const email = localStorage.getItem("userEmail");
  if (email) {
    setUserEmail(email);
    console.debug("User email found in localStorage:", email);
    
    const fetchUserId = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();
      if (error) {
        console.error("Error fetching user id:", error);
      } else if (data) {
        setUserId(data.id);
      }
    };
    
    fetchUserId();
  } else {
    console.debug("No user email found in localStorage.");
  }
}, []);

/*** FETCH ALL CHARTS FOR THIS USER ***/
const fetchCharts = useCallback(async () => {
  if (!userId) return;

  const { data, error } = await supabase
    .from("burndown_chart")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching charts:", error);
  } else {
    setCharts(data);
  }
}, [userId]); // ✅ useCallback ensures `fetchCharts` does not change unless userId changes

useEffect(() => {
  fetchCharts();
}, [fetchCharts]); // ✅ Now includes `fetchCharts`
  /*** FETCH TASKS FOR SELECTED CHART (detail view) ***/
  useEffect(() => {
    if (selectedChart) {
      fetchTasksForChart(selectedChart.id);
    }
  }, [selectedChart]);

  const fetchTasksForChart = async (chartId) => {
    const { data, error } = await supabase
      .from("burndown_tasks")
      .select("*")
      .eq("burndown_chart_id", chartId);
    if (error) {
      console.error("Error fetching tasks:", error);
    } else if (data) {
      const fetchedTasks = data.map((task) => ({
        id: task.id,
        day: task.day,
        storiesCompleted: task.stories_completed,
        storyPointsCompleted: task.story_points_completed,
      }));
      setTasks(fetchedTasks);
    }
  };

  /*** HANDLER: Create or Update Sprint Profile (Chart) ***/
  const handleProfileFormSubmit = async (e) => {
    e.preventDefault();
    if (durationInput && totalStoryPointsInput && totalStoriesInput && userId) {
      if (editingChartId) {
        // Update existing chart
        const { error } = await supabase
          .from("burndown_chart")
          .update({
            sprint_duration: Number(durationInput),
            sprint_unit: unitInput,
            total_story_points: Number(totalStoryPointsInput),
            total_stories: Number(totalStoriesInput),
          })
          .eq("id", editingChartId);
        if (error) {
          console.error("Error updating chart:", error);
        } else {
          // If we're in detail view and editing the selected chart, update it locally.
          if (selectedChart && editingChartId === selectedChart.id) {
            setSelectedChart({
              ...selectedChart,
              sprint_duration: Number(durationInput),
              sprint_unit: unitInput,
              total_story_points: Number(totalStoryPointsInput),
              total_stories: Number(totalStoriesInput),
            });
          }
          setShowProfileForm(false);
          setEditingChartId(null);
          setDurationInput("");
          setUnitInput("days");
          setTotalStoryPointsInput("");
          setTotalStoriesInput("");
          fetchCharts();
        }
      } else {
        // Create new chart
        const { data, error } = await supabase
          .from("burndown_chart")
          .insert({
            user_id: userId,
            sprint_duration: Number(durationInput),
            sprint_unit: unitInput,
            total_story_points: Number(totalStoryPointsInput),
            total_stories: Number(totalStoriesInput),
          })
          .select();
        if (error) {
          console.error("Error creating chart:", error);
        } else if (data && data.length > 0) {
          setShowProfileForm(false);
          setDurationInput("");
          setUnitInput("days");
          setTotalStoryPointsInput("");
          setTotalStoriesInput("");
          fetchCharts();
        }
      }
    }
  };

  /*** HANDLER: Delete a Chart ***/
  const handleDeleteChart = async (chartId) => {
    const { error } = await supabase
      .from("burndown_chart")
      .delete()
      .eq("id", chartId);
    if (error) {
      console.error("Error deleting chart:", error);
    } else {
      // If the deleted chart is currently selected, go back to dashboard.
      if (selectedChart && selectedChart.id === chartId) {
        setSelectedChart(null);
        setTasks([]);
      }
      fetchCharts();
    }
  };

  /*** HANDLER: Prepare Editing for a Chart (from dashboard) ***/
  const handleEditChart = (chart) => {
    setEditingChartId(chart.id);
    setDurationInput(chart.sprint_duration);
    setUnitInput(chart.sprint_unit);
    setTotalStoryPointsInput(chart.total_story_points);
    setTotalStoriesInput(chart.total_stories);
    setShowProfileForm(true);
  };

  /*** HANDLER: Select a Chart to View Details ***/
  const handleSelectChart = (chart) => {
    setSelectedChart(chart);
    setTasks([]); // tasks will be fetched via useEffect
  };

  /*** TASKS: Create or Update Task ***/
  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (taskDay && taskStoriesCompleted && taskStoryPointsCompleted && selectedChart) {
      if (editingTaskId !== null) {
        // Update an existing task
        const { error } = await supabase
          .from("burndown_tasks")
          .update({
            day: Number(taskDay),
            stories_completed: Number(taskStoriesCompleted),
            story_points_completed: Number(taskStoryPointsCompleted),
          })
          .eq("id", editingTaskId);
        if (error) {
          console.error("Error updating task:", error);
        } else {
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
        }
      } else {
        // Create a new task
        const { data, error } = await supabase
          .from("burndown_tasks")
          .insert({
            burndown_chart_id: selectedChart.id,
            day: Number(taskDay),
            stories_completed: Number(taskStoriesCompleted),
            story_points_completed: Number(taskStoryPointsCompleted),
          })
          .select();
        if (error) {
          console.error("Error creating task:", error);
        } else if (data && data.length > 0) {
          const newTask = {
            id: data[0].id,
            day: data[0].day,
            storiesCompleted: data[0].stories_completed,
            storyPointsCompleted: data[0].story_points_completed,
          };
          setTasks([...tasks, newTask]);
        }
      }
      setTaskDay("");
      setTaskStoriesCompleted("");
      setTaskStoryPointsCompleted("");
    }
  };

  /*** TASKS: Edit a Task ***/
  const handleEditTask = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setTaskDay(task.day);
      setTaskStoriesCompleted(task.storiesCompleted);
      setTaskStoryPointsCompleted(task.storyPointsCompleted);
      setEditingTaskId(taskId);
    }
  };

  /*** TASKS: Delete a Task ***/
  const handleDeleteTask = async (taskId) => {
    const { error } = await supabase
      .from("burndown_tasks")
      .delete()
      .eq("id", taskId);
    if (error) {
      console.error("Error deleting task:", error);
    } else {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  /*** CALCULATIONS FOR DETAIL VIEW (if a chart is selected) ***/
  // Use selectedChart values as the sprint profile.
  const sprintProfile = selectedChart
    ? {
        duration: selectedChart.sprint_duration,
        unit: selectedChart.sprint_unit,
        totalStoryPoints: selectedChart.total_story_points,
        totalStories: selectedChart.total_stories,
      }
    : { duration: 0, unit: "days", totalStoryPoints: 0, totalStories: 0 };

  const sprintDurationDays =
    sprintProfile.unit === "months"
      ? sprintProfile.duration * 30
      : sprintProfile.duration;

  const totalCompletedStories = tasks.reduce(
    (sum, task) => sum + Number(task.storiesCompleted),
    0
  );
  const totalCompletedStoryPoints = tasks.reduce(
    (sum, task) => sum + Number(task.storyPointsCompleted),
    0
  );
  const sprintEnded =
    selectedChart &&
    totalCompletedStories >= sprintProfile.totalStories &&
    totalCompletedStoryPoints >= sprintProfile.totalStoryPoints;

  const maxDay = tasks.length ? Math.max(...tasks.map((task) => Number(task.day))) : 0;
  const velocity = maxDay > 0 ? (totalCompletedStoryPoints / maxDay).toFixed(2) : 0;
  const remainingStoryPoints = Math.max(
    sprintProfile.totalStoryPoints - totalCompletedStoryPoints,
    0
  );
  const remainingStories = Math.max(
    sprintProfile.totalStories - totalCompletedStories,
    0
  );
  const daysCompleted = maxDay;
  const daysRemaining = sprintDurationDays - daysCompleted;
  const requiredRateStoryPoints =
    daysRemaining > 0 ? (remainingStoryPoints / daysRemaining).toFixed(2) : "N/A";
  const requiredRateStories =
    daysRemaining > 0 ? (remainingStories / daysRemaining).toFixed(2) : "N/A";

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
          const ideal =
            sprintProfile.totalStoryPoints -
            (sprintProfile.totalStoryPoints / sprintDurationDays) * day;
          return ideal < 0 ? 0 : ideal;
        }),
        borderColor: "rgba(54, 162, 235, 1)",
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  /*** RENDERING ***/
  // --- Dashboard View (when no chart is selected) ---
  if (!selectedChart) {
    return (
      <div className="container mx-auto p-4">
        <BurnDownFeature/>
    

        {/* Create New Profile Button */}
        <button
          onClick={() => {
            setShowProfileForm(!showProfileForm);
            setEditingChartId(null);
            setDurationInput("");
            setUnitInput("days");
            setTotalStoryPointsInput("");
            setTotalStoriesInput("");
          }}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 bg-blue-600 px-4 py-2 rounded mb-4 mt-12"
        >
          {showProfileForm ? <XCircle size={20} /> : <PlusCircle size={20} />}
          {showProfileForm ? "Cancel" : "Profile"}
        </button>
       
        {/* Sprint Profile Form for Creating/Editing */}
        {showProfileForm && (
          <form
            onSubmit={handleProfileFormSubmit}
            className="mb-6 p-4 border rounded shadow"
          >
            <h2 className="text-xl font-semibold mb-2">
              {editingChartId ? "Edit Sprint Profile" : "Create Sprint Profile"}
            </h2>
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
              {editingChartId ? "Update Profile" : "+Profile"}
            </button>
          </form>
        )}

        {/* Display User's Charts */}
        <h2 className="text-2xl font-semibold mb-2">Your Charts</h2>
        {charts.length > 0 ? (
          <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border p-2">Duration</th>
                <th className="border p-2">Total Story Points</th>
                <th className="border p-2">Total Stories</th>
                <th className="border p-2">Created At</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {charts.map((chart) => (
                <tr key={chart.id}>
                  <td className="border p-2 text-center">
                    {chart.sprint_duration} {chart.sprint_unit}
                  </td>
                  <td className="border p-2 text-center">
                    {chart.total_story_points}
                  </td>
                  <td className="border p-2 text-center">{chart.total_stories}</td>
                  <td className="border p-2 text-center">
                    {new Date(chart.created_at).toLocaleString()}
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleSelectChart(chart)}
                      className="bg-green-600 text-white px-2 py-1 mr-2 rounded"
                    >
                     <Eye size={15} />
                    </button>
                    <button
                      onClick={() => handleEditChart(chart)}
                      className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                            >
                    <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDeleteChart(chart.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                     <Trash size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        ) : (
          <p>No charts found. Please create one.</p>
        )}
      </div>
    );
  }

  // --- Detail View: Display the Selected Chart (Sprint Profile & Tasks) ---
  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => {
          setSelectedChart(null);
          setTasks([]);
        }}
        className="mb-4 bg-gray-600 text-white px-4 py-2 rounded mt-32"
      >
      <ArrowLeft size={20} />
      </button>
      <h1 className="text-3xl font-bold mb-4">Chart Details</h1>

      {/* Sprint Profile Display */}
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
        {/* Button to edit sprint profile inline */}
        <button
          onClick={() => {
            setEditingChartId(selectedChart.id);
            setDurationInput(selectedChart.sprint_duration);
            setUnitInput(selectedChart.sprint_unit);
            setTotalStoryPointsInput(selectedChart.total_story_points);
            setTotalStoriesInput(selectedChart.total_stories);
            setShowProfileForm(true);
          }}
          className="mt-2 bg-yellow-500 text-white px-3 py-1 mr-2 rounded"
        >
          <Pencil size={15} />
        </button>
        <button
          onClick={handleDeleteChart.bind(null, selectedChart.id)}
          className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
        >
         <Trash size={15} />
        </button>
      </div>

      {/* Edit Profile Form in Detail View */}
      {showProfileForm && selectedChart && editingChartId === selectedChart.id && (
        <form
          onSubmit={handleProfileFormSubmit}
          className="mb-6 p-4 border rounded shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Edit Sprint Profile</h2>
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
            Update Profile
          </button>
        </form>
      )}

      {/* Task (Completed Work) Form */}
      <form
        onSubmit={handleTaskSubmit}
        className="mb-6 p-4 border rounded shadow"
      >
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
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      <Trash size={20} />
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
  );
};

export default BurndownChartTracker;


