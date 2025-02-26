


import React, { useState } from "react";
import { Edit3, Trash } from "lucide-react";
import LaunchChecklistFeature from './LaunchChecklistFeature'

const ProductLaunchChecklist = () => {
  // State to store checklist items
  const [tasks, setTasks] = useState([]);
  // State to control the input form
  const [form, setForm] = useState({
    id: null,
    task: "",
    owner: "",
    dependencies: "",
    notes: "",
    completed: false,
  });
  // State to check if we are editing an existing task
  const [isEditing, setIsEditing] = useState(false);

  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission to add or update a task
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate required fields
    if (!form.task || !form.owner) {
      alert("Please fill in both the Task and Task Owner fields.");
      return;
    }
    if (isEditing) {
      // Update existing task
      setTasks(tasks.map((t) => (t.id === form.id ? { ...form } : t)));
      setIsEditing(false);
    } else {
      // Create a new task record with a unique id
      setTasks([...tasks, { ...form, id: Date.now() }]);
    }
    // Reset form fields
    setForm({
      id: null,
      task: "",
      owner: "",
      dependencies: "",
      notes: "",
      completed: false,
    });
  };

  // Handle editing of a task
  const handleEdit = (id) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    if (taskToEdit) {
      setForm(taskToEdit);
      setIsEditing(true);
    }
  };

  // Handle deletion of a task
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-6 mt-10">
     <LaunchChecklistFeature/>
      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-6"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Task Description
          </label>
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
          <label className="block text-gray-700 font-bold mb-2">
            Task Owner
          </label>
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
          <label className="block text-gray-700 font-bold mb-2">
            Dependencies
          </label>
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
          <label className="block text-gray-700 font-bold mb-2">
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Provide any additional notes or justification"
            rows="3"
            className="w-full px-3 py-2 border rounded focus:outline-none"
          ></textarea>
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="completed"
            checked={form.completed}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="text-gray-700">Completed</span>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            {isEditing ? "Update Task" : "Add Task"}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Print Checklist
          </button>
        </div>
      </form>

      {/* Checklist Table */}
      <div className="overflow-x-auto">
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
                <tr key={task.id} className="hover:bg-gray-100 text-center">
                  <td className="px-4 py-2 border">{task.task}</td>
                  <td className="px-4 py-2 border">{task.owner}</td>
                  <td className="px-4 py-2 border">{task.dependencies}</td>
                  <td className="px-4 py-2 border">{task.notes}</td>
                  <td className="px-4 py-2 border">
                    {task.completed ? "Yes" : "No"}
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
    </div>
  );
};

export default ProductLaunchChecklist;
