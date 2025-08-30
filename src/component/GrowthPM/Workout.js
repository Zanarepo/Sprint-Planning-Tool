import React, { useEffect, useState } from "react";
import { useFeature } from "@growthbook/growthbook-react";
import { supabase } from "../../supabaseClient";

const WorkoutPage = () => {
  const ClickThrough = useFeature("Click-through"); // experiment key
  const [timeSpent, setTimeSpent] = useState(0);
  const [taskStep, setTaskStep] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isTaskCompleted, setIsTaskCompleted] = useState(false); // Track if current task is completed
  // Local state for dashboard metrics
  const [metrics, setMetrics] = useState({
    control: {
      completed_task_1: 0,
      completed_task_2: 0,
      completed_task_3: 0,
      completed_task_4: 0,
      completed_task_5: 0,
      workout_completed: 0,
      end_workout: 0,
    },
    variant: {
      completed_task_1: 0,
      completed_task_2: 0,
      completed_task_3: 0,
      completed_task_4: 0,
      completed_task_5: 0,
      workout_completed: 0,
      end_workout: 0,
    },
  });

  // Start timer on mount
  useEffect(() => {
    const id = setInterval(() => setTimeSpent((t) => t + 1), 1000);
    setIntervalId(id);
    return () => clearInterval(id);
  }, []);

  // Log exposure once (original Supabase logic preserved)
  useEffect(() => {
    const logExposure = async () => {
      const userEmail = localStorage.getItem("userEmail");
      if (!ClickThrough || !userEmail) return;

      const { data } = await supabase
        .from("feature_exposures")
        .select("*")
        .eq("email", userEmail)
        .eq("feature_key", "Click-through")
        .single();

      if (!data) {
        await supabase.from("feature_exposures").insert([
          {
            email: userEmail,
            feature_key: "Click-through",
            variation: ClickThrough.on ? "variant" : "control",
            created_at: new Date().toISOString(),
          },
        ]);
      }
    };
    logExposure();
  }, [ClickThrough]);

  // Handle task interactions (original Supabase logic preserved)
  const handleInteraction = async (action) => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) return;

    const variantLabel = ClickThrough.on ? "variant" : "control";

    // Original Supabase logic
    await supabase.from("workout_metrics").insert([
      {
        email: userEmail,
        ui_variant: variantLabel,
        action,
        time_spent: timeSpent,
        created_at: new Date().toISOString(),
      },
    ]);

    // Update local dashboard metrics
    setMetrics((prev) => ({
      ...prev,
      [variantLabel]: {
        ...prev[variantLabel],
        [action]: (prev[variantLabel][action] || 0) + 1,
      },
    }));
  };

  // Workout tasks
  const tasks = [
    "Do 10 squats",
    "Do 15 push-ups",
    "Do 20 jumping jacks",
    "Hold a 30s plank",
    "Do 12 lunges (each leg)",
  ];

  const currentTask = tasks[taskStep];

  const handleCompleteTask = () => {
    if (isTaskCompleted) return; // Prevent multiple clicks on current task

    handleInteraction(`completed_task_${taskStep + 1}`);
    setIsTaskCompleted(true); // Disable button for current task

    if (taskStep < tasks.length - 1) {
      // Move to next task after a short delay for better UX
      setTimeout(() => {
        setTaskStep((step) => step + 1);
        setIsTaskCompleted(false); // Re-enable button for next task
      }, 500);
    } else {
      clearInterval(intervalId); // Auto stop timer at end
      handleInteraction("workout_completed");
    }
  };

  return (
    <div className="p-8 min-h-screen mt-16">
      <h1 className="text-3xl font-bold mb-6">🏋️‍♂️ Workout Page</h1>

      <p className="mb-4 text-gray-600">⏱ Time spent: {timeSpent}s</p>

      {ClickThrough.on ? (
        // ✅ Variant: with progress bar
        <div className="bg-green-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Take Charge of Your Body</h2>
          <progress
            value={((taskStep + (isTaskCompleted && taskStep < tasks.length - 1 ? 1 : 0)) / tasks.length) * 100}
            max="100"
            className="w-full h-4 rounded mb-4"
          ></progress>
          <h3 className="text-lg font-medium mb-2">Current Task:</h3>
          <p className="mb-4">{currentTask}</p>
          <button
            className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${
              isTaskCompleted || metrics.variant.workout_completed > 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleCompleteTask}
            disabled={isTaskCompleted || metrics.variant.workout_completed > 0}
          >
            Complete Task
          </button>
        </div>
      ) : (
        // ⚡ Control: no progress bar
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Take Your Workout to the Next Level</h2>
          <h3 className="text-lg font-medium mb-2">Current Task:</h3>
          <p className="mb-4">{currentTask}</p>
          <button
            className={`bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ${
              isTaskCompleted || metrics.control.workout_completed > 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleCompleteTask}
            disabled={isTaskCompleted || metrics.control.workout_completed > 0}
          >
            Complete Task
          </button>
        </div>
      )}

      <button
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => {
          clearInterval(intervalId);
          handleInteraction("end_workout");
        }}
      >
        End Workout
      </button>

      {/* Mini Dashboard */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">📊 Action Counts Dashboard</h2>
        <p className="mb-4 text-gray-600">
          Local counts of actions performed for your {ClickThrough.on ? "Progress Bar" : "Standard"} interface
        </p>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Action</th>
              <th className="border p-2 text-center">Count</th>
            </tr>
          </thead>
          <tbody>
            {[
              { key: "completed_task_1", label: "Completed Task 1 (Squats)" },
              { key: "completed_task_2", label: "Completed Task 2 (Push-ups)" },
              { key: "completed_task_3", label: "Completed Task 3 (Jumping Jacks)" },
              { key: "completed_task_4", label: "Completed Task 4 (Plank)" },
              { key: "completed_task_5", label: "Completed Task 5 (Lunges)" },
              { key: "workout_completed", label: "Workout Completed" },
              { key: "end_workout", label: "End Workout" },
            ].map(({ key, label }) => (
              <tr key={key}>
                <td className="border p-2">{label}</td>
                <td className="border p-2 text-center">
                  {metrics[ClickThrough.on ? "variant" : "control"][key] || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkoutPage;