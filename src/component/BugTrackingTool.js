


import React, { useState } from "react";
import { Edit3, Trash } from "lucide-react";
import BugTrackingFeature from './BugTrackingFeature'
const BugTrackingTool = () => {
  // State to store bug records
  const [bugs, setBugs] = useState([]);
  // Form state for bug entry
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    severity: "",
    status: "Open",
    reporter: "",
    assignedTo: "",
    dateReported: "",
    notes: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission for adding/updating a bug
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate required fields
    if (
      !form.title ||
      !form.description ||
      !form.severity ||
      !form.reporter ||
      !form.assignedTo ||
      !form.dateReported
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    const newBug = {
      ...form,
      id: isEditing ? form.id : Date.now(),
    };
    if (isEditing) {
      setBugs(bugs.map((bug) => (bug.id === newBug.id ? newBug : bug)));
      setIsEditing(false);
    } else {
      setBugs([...bugs, newBug]);
    }
    // Reset form state
    setForm({
      id: null,
      title: "",
      description: "",
      severity: "",
      status: "Open",
      reporter: "",
      assignedTo: "",
      dateReported: "",
      notes: "",
    });
  };

  // Load bug data into the form for editing
  const handleEdit = (id) => {
    const bug = bugs.find((b) => b.id === id);
    if (bug) {
      setForm(bug);
      setIsEditing(true);
    }
  };

  // Delete a bug
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this bug?")) {
      setBugs(bugs.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-6 mt-10">
     <BugTrackingFeature/>

      {/* Bug Entry Form */}
      <form
  onSubmit={handleSubmit}
  className="bg-white shadow-lg rounded px-4 sm:px-8 pt-6 pb-8 mb-12 w-full"
>
  <div className="mb-4">
    <label className="block text-gray-700 font-bold mb-2">
      Bug Title
    </label>
    <input
      type="text"
      name="title"
      value={form.title}
      onChange={handleChange}
      placeholder="Enter bug title"
      className="w-full px-3 py-2 border rounded focus:outline-none"
    />
  </div>

  <div className="mb-4">
    <label className="block text-gray-700 font-bold mb-2">
      Description
    </label>
    <textarea
      name="description"
      value={form.description}
      onChange={handleChange}
      placeholder="Enter bug description"
      rows="3"
      className="w-full px-3 py-2 border rounded focus:outline-none"
    ></textarea>
  </div>

  <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
  {/* Severity Field */}
  <div>
    <label className="block text-gray-700 font-bold text-sm sm:text-base mb-2">
      Severity
    </label>
    <select
      name="severity"
      value={form.severity}
      onChange={handleChange}
      className="w-full px-3 py-2 text-sm sm:text-base border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select severity</option>
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
      <option value="Critical">Critical</option>
    </select>
  </div>

  {/* Status Field */}
  <div>
    <label className="block text-gray-700 font-bold text-sm sm:text-base mb-2">
      Status
    </label>
    <select
      name="status"
      value={form.status}
      onChange={handleChange}
      className="w-full px-3 py-2 text-sm sm:text-base border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="Open">Open</option>
      <option value="In Progress">In Progress</option>
      <option value="Resolved">Resolved</option>
      <option value="Closed">Closed</option>
    </select>
  </div>
</div>

<div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
  <div>
    <label className="block text-gray-700 font-bold mb-2">
      Reporter
    </label>
    <input
      type="text"
      name="reporter"
      value={form.reporter}
      onChange={handleChange}
      placeholder="Reporter name"
      className="w-full px-3 py-2 border rounded focus:outline-none"
    />
  </div>
  <div>
    <label className="block text-gray-700 font-bold mb-2">
      Assigned To
    </label>
    <input
      type="text"
      name="assignedTo"
      value={form.assignedTo}
      onChange={handleChange}
      placeholder="Assignee"
      className="w-full px-3 py-2 border rounded focus:outline-none"
    />
  </div>
</div>

<div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
  <div>
    <label className="block text-gray-700 font-bold mb-2">
      Date Reported
    </label>
    <input
      type="date"
      name="dateReported"
      value={form.dateReported}
      onChange={handleChange}
      className="w-full px-3 py-2 border rounded focus:outline-none"
    />
  </div>
  <div>
    <label className="block text-gray-700 font-bold mb-2">
      Additional Notes
    </label>
    <input
      type="text"
      name="notes"
      value={form.notes}
      onChange={handleChange}
      placeholder="Any extra info"
      className="w-full px-3 py-2 border rounded focus:outline-none"
    />
  </div>
</div>

<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
  <button
    type="submit"
    className="w-full sm:w-auto bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
  >
    {isEditing ? "Update Bug" : "Add Bug"}
  </button>
  <button
    type="button"
    onClick={() => window.print()}
    className="w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
  >
    Print Bug List
  </button>
</div>
</form>
      {/* Bug List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-red-200">
            <tr>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Severity</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Reporter</th>
              <th className="px-4 py-2 border">Assigned To</th>
              <th className="px-4 py-2 border">Date Reported</th>
              <th className="px-4 py-2 border">Notes</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bugs.length > 0 ? (
              bugs.map((bug) => (
                <tr key={bug.id} className="hover:bg-gray-100 text-center">
                  <td className="px-4 py-2 border">{bug.title}</td>
                  <td className="px-4 py-2 border">{bug.description}</td>
                  <td className="px-4 py-2 border">{bug.severity}</td>
                  <td className="px-4 py-2 border">{bug.status}</td>
                  <td className="px-4 py-2 border">{bug.reporter}</td>
                  <td className="px-4 py-2 border">{bug.assignedTo}</td>
                  <td className="px-4 py-2 border">{bug.dateReported}</td>
                  <td className="px-4 py-2 border">{bug.notes}</td>
                  <td className="px-4 py-2 border space-x-2">
                    <button
                      onClick={() => handleEdit(bug.id)}
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(bug.id)}
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
                <td colSpan="9" className="text-center px-4 py-2">
                  No bugs reported.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BugTrackingTool;
