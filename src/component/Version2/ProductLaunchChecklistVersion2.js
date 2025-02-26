import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabaseClient";
import {  Pie } from "react-chartjs-2";
import { Edit3, Trash } from "lucide-react";
import LaunchChecklistFeature from "./LaunchChecklistFeature";

// Import and register Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const ProductLaunchChecklist = () => {
  // User identification state
  const [, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);

  // Checklist tasks state
  const [tasks, setTasks] = useState([]);
  // Form state for checklist tasks
  const [form, setForm] = useState({
    id: null,
    task: "",
    owner: "",
    dependencies: "",
    notes: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Receipt modal state and selected task
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedTask] = useState(null);
 
 

  // Retrieve user email from localStorage and fetch user id
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

  // Fetch checklist tasks for the user
  const fetchTasks = useCallback(async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("product_launch_checklist")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });
    if (error) {
      console.error("Error fetching tasks:", error);
    } else {
      setTasks(data);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchTasks();
    }
  }, [userId, fetchTasks]);

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to add/update a task
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { task, owner, dependencies, notes, id } = form;
    if (!task || !owner) {
      alert("Please fill in both the Task and Task Owner fields.");
      return;
    }
    const recordData = {
      user_id: userId,
      task,
      owner,
      dependencies,
      notes,
      completed: false, // Default to not completed when creating new task
    };
    if (isEditing) {
      const { error } = await supabase
        .from("product_launch_checklist")
        .update(recordData)
        .eq("id", id)
        .eq("user_id", userId);
      if (error) {
        console.error("Error updating task:", error);
      } else {
        setIsEditing(false);
        setForm({ id: null, task: "", owner: "", dependencies: "", notes: "" });
        fetchTasks();
      }
    } else {
      const { error } = await supabase.from("product_launch_checklist").insert([recordData]);
      if (error) {
        console.error("Error adding task:", error);
      } else {
        setForm({ id: null, task: "", owner: "", dependencies: "", notes: "" });
        fetchTasks();
      }
    }
  };

  // Populate form for editing an existing task
  const handleEdit = (id) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    if (taskToEdit) {
      setForm(taskToEdit);
      setIsEditing(true);
    }
  };

  // Delete a single task record
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const { error } = await supabase
        .from("product_launch_checklist")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);
      if (error) {
        console.error("Error deleting task:", error);
      } else {
        fetchTasks();
      }
    }
  };

  // Delete the entire checklist for the user
  const handleDeleteAll = async () => {
    if (window.confirm("Are you sure you want to delete the entire checklist?")) {
      const { error } = await supabase
        .from("product_launch_checklist")
        .delete()
        .eq("user_id", userId);
      if (error) {
        console.error("Error deleting all tasks:", error);
      } else {
        fetchTasks();
      }
    }
  };

  // Toggle completed status using a slider (instead of a button)
  const handleToggleCompleted = async (id, currentStatus) => {
    const { error } = await supabase
      .from("product_launch_checklist")
      .update({ completed: !currentStatus })
      .eq("id", id)
      .eq("user_id", userId);
    if (error) {
      console.error("Error toggling completed status:", error);
    } else {
      fetchTasks();
    }
  };


  // Count completed and incomplete tasks for the pie chart
  const completedCount = tasks.filter((t) => t.completed).length;
  const incompleteCount = tasks.filter((t) => !t.completed).length;
  const pieData = {
    labels: ["Completed", "Incomplete"],
    datasets: [
      {
        data: [completedCount, incompleteCount],
        backgroundColor: ["#4CAF50", "#FF5722"],
        hoverBackgroundColor: ["#66BB6A", "#FF7043"],
      },
    ],
  };
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Task Completion Breakdown" },
    },
  };

  // Inline CSS for slider toggle
  const sliderStyles = `
    .switch {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 24px;
    }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: .4s;
      border-radius: 34px;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
    input:checked + .slider { background-color: #4CAF50; }
    input:checked + .slider:before { transform: translateX(26px); }
  `;

  // Global Print (Data/Chart) and form are already in place
  // We'll render the Pie Chart below the checklist table.

  return (
    <div className="container mx-auto p-4">
      <LaunchChecklistFeature />
  

      {/* Include slider CSS */}
      <style>{sliderStyles}</style>

      {/* Input Form (Full Width) */}
      <form onSubmit={handleSubmit} className="w-full bg-purple-500 p-6 rounded shadow mb-6">
        <div className="mb-4">
          <label className="block text-white font-bold mb-2">Task Description</label>
          <input
            type="text"
            name="task"
            value={form.task}
            onChange={handleChange}
            placeholder="Enter task description"
            className="w-full px-3 py-2 border rounded focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white font-bold mb-2">Task Owner</label>
          <input
            type="text"
            name="owner"
            value={form.owner}
            onChange={handleChange}
            placeholder="Enter responsible party or team"
            className="w-full px-3 py-2 border rounded focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white font-bold mb-2">Dependencies</label>
          <input
            type="text"
            name="dependencies"
            value={form.dependencies}
            onChange={handleChange}
            placeholder="List any dependencies"
            className="w-full px-3 py-2 border rounded focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white font-bold mb-2">Additional Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Provide any additional notes or justification"
            rows="3"
            className="w-full px-3 py-2 border rounded focus:outline-none"
          ></textarea>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <button
            type="submit"
            className="w-full sm:w-auto bg-white hover:bg-purple-300 text-purple-500 font-bold py-2 px-4 rounded"
          >
            {isEditing ? "Update Task" : "Add Task"}
          </button>
          <button
            type="button"
            onClick={handleDeleteAll}
            className="w-full sm:w-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete Entire Checklist
          </button>
        </div>
      </form>

      {/* Checklist Table */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-purple-200">
            <tr>
              <th className="px-4 py-2 border">Task</th>
              <th className="px-4 py-2 border">Owner</th>
              <th className="px-4 py-2 border">Dependencies</th>
              <th className="px-4 py-2 border">Notes</th>
              <th className="px-4 py-2 border">Completed</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.id} className="text-center hover:bg-gray-100">
                  <td className="px-4 py-2 border">{task.task}</td>
                  <td className="px-4 py-2 border">{task.owner}</td>
                  <td className="px-4 py-2 border">{task.dependencies}</td>
                  <td className="px-4 py-2 border">{task.notes}</td>
                  <td className="px-4 py-2 border">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleCompleted(task.id, task.completed)}
                      />
                      <span className="slider"></span>
                    </label>
                  </td>
                  <td className="px-4 py-2 border space-x-2">
                    <button
                      onClick={() => handleEdit(task.id)}
                      className="text-purple-500 hover:text-purple-700"
                      title="Edit"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <Trash size={18} />
                    </button>
                    
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center px-4 py-2">
                  No tasks added.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pie Chart: Completed vs. Incomplete Tasks */}
      <div className="bg-white p-6 mb-6 w-full max-w-3xl mx-auto" style={{ height: "400px" }}>
        <Pie data={pieData} options={pieOptions} />
      </div>

      {/* Line Chart: (Optional) You can include a chart for tasks over time if needed */}
      {/* <div className="bg-white shadow-lg rounded p-6 mb-6 w-full" style={{ height: "500px" }}>
        <Line data={lineChartData} options={lineChartOptions} />
      </div> */}

      {/* Receipt Modal (Pop-up with Cancel button) */}
      {showReceipt && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="text-2xl font-bold">Task Receipt</h3>
              <button
                onClick={() => setShowReceipt(false)}
                className="text-red-500 font-bold text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="mb-4">
              <p>
                <strong>Task:</strong> {selectedTask.task}
              </p>
              <p>
                <strong>Owner:</strong> {selectedTask.owner}
              </p>
              <p>
                <strong>Dependencies:</strong> {selectedTask.dependencies}
              </p>
              <p>
                <strong>Notes:</strong> {selectedTask.notes}
              </p>
              <p>
                <strong>Date Recorded:</strong>{" "}
                {new Date(selectedTask.created_at).toLocaleString()}
              </p>
              <p>
                <strong>Completed:</strong> {selectedTask.completed ? "Yes" : "No"}
              </p>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowReceipt(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => window.print()}
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Print Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => window.print()}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
        >
          Print Data/Chart
        </button>
      </div>
    </div>
  );
};

export default ProductLaunchChecklist;








