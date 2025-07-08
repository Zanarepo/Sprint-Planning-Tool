import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabaseClient";
import { Pie } from "react-chartjs-2";
import { Edit3, Trash } from "lucide-react";
import BugTrackingFeature from "./BugTrackingFeature";

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

const BugTrackingTool = () => {
  // User identification state
  const [, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);

  // Bug records state (persisted in Supabase)
  const [bugs, setBugs] = useState([]);
  // Form state for bug entry
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    severity: "",
    status: "Open",
    reporter: "",
    assigned_to: "",
    date_reported: "",
    notes: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Retrieve user email from localStorage and fetch user id from Supabase
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

  // Fetch bug records for the user
  const fetchBugs = useCallback(async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("bug_tracking")
      .select("*")
      .eq("user_id", userId)
      .order("date_reported", { ascending: true });
    if (error) {
      console.error("Error fetching bugs:", error);
    } else {
      setBugs(data);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchBugs();
    }
  }, [userId, fetchBugs]);

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission to add/update a bug record
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate required fields
    if (
      !form.title ||
      !form.description ||
      !form.severity ||
      !form.reporter ||
      !form.assigned_to ||
      !form.date_reported
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    const recordData = {
      user_id: userId,
      title: form.title,
      description: form.description,
      severity: form.severity,
      status: form.status,
      reporter: form.reporter,
      assigned_to: form.assigned_to,
      date_reported: form.date_reported,
      notes: form.notes,
    };
    if (isEditing) {
      const { error } = await supabase
        .from("bug_tracking")
        .update(recordData)
        .eq("id", form.id)
        .eq("user_id", userId);
      if (error) {
        console.error("Error updating bug:", error);
      } else {
        setIsEditing(false);
        setForm({
          id: null,
          title: "",
          description: "",
          severity: "",
          status: "Open",
          reporter: "",
          assigned_to: "",
          date_reported: "",
          notes: "",
        });
        fetchBugs();
      }
    } else {
      const { error } = await supabase.from("bug_tracking").insert([recordData]);
      if (error) {
        console.error("Error adding bug:", error);
      } else {
        setForm({
          id: null,
          title: "",
          description: "",
          severity: "",
          status: "Open",
          reporter: "",
          assigned_to: "",
          date_reported: "",
          notes: "",
        });
        fetchBugs();
      }
    }
  };

  // Populate form for editing a bug record
  const handleEdit = (id) => {
    const bug = bugs.find((b) => b.id === id);
    if (bug) {
      setForm(bug);
      setIsEditing(true);
    }
  };

  // Delete a bug record
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this bug?")) {
      const { error } = await supabase
        .from("bug_tracking")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);
      if (error) {
        console.error("Error deleting bug:", error);
      } else {
        fetchBugs();
      }
    }
  };

  // Delete the entire bug tracking table for this user

  // Calculate severity distribution
  const severityCounts = {
    Low: 0,
    Medium: 0,
    High: 0,
    Critical: 0,
  };
  bugs.forEach((bug) => {
    if (bug.severity in severityCounts) {
      severityCounts[bug.severity]++;
    }
  });
  const severityChartData = {
    labels: ["Low", "Medium", "High", "Critical"],
    datasets: [
      {
        data: [
          severityCounts["Low"],
          severityCounts["Medium"],
          severityCounts["High"],
          severityCounts["Critical"],
        ],
        backgroundColor: ["#4CAF50", "#FFEB3B", "#FF9800", "#F44336"],
        hoverBackgroundColor: ["#66BB6A", "#FFF176", "#FFB74D", "#E57373"],
      },
    ],
  };

  // Calculate status distribution
  const statusCounts = {
    Open: 0,
    "In Progress": 0,
    Resolved: 0,
    Closed: 0,
  };
  bugs.forEach((bug) => {
    if (bug.status in statusCounts) {
      statusCounts[bug.status]++;
    }
  });
  const statusChartData = {
    labels: ["Open", "In Progress", "Resolved", "Closed"],
    datasets: [
      {
        data: [
          statusCounts["Open"],
          statusCounts["In Progress"],
          statusCounts["Resolved"],
          statusCounts["Closed"],
        ],
        backgroundColor: ["#2196F3", "#FF9800", "#4CAF50", "#9E9E9E"],
        hoverBackgroundColor: ["#64B5F6", "#FFB74D", "#66BB6A", "#BDBDBD"],
      },
    ],
  };

  // Pie chart options for both charts
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true },
    },
  };

  // Inline CSS for slider toggle

  // Handle toggling a bug's "completed" status using a slider

  // Receipt Modal: For this component, bugs don't show a receipt,
  // but if needed you can add a modal pop-up for viewing bug details.
  // (For example, we'll use the same modal pattern for viewing details.)
  const [showDetails, setShowDetails] = useState(false);
  const [selectedBug, setSelectedBug] = useState(null);
  const handleView = (id) => {
    const bug = bugs.find((b) => b.id === id);
    if (bug) {
      setSelectedBug(bug);
      setShowDetails(true);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <BugTrackingFeature />


      {/* Bug Entry Form */}
      <form onSubmit={handleSubmit} className="w-full bg-red-200 shadow-lg rounded px-4 sm:px-8 pt-6 pb-8 mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Bug Title</label>
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
          <label className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter bug description"
            rows="3"
            className="w-full px-3 py-2 border rounded focus:outline-none"
          ></textarea>
        </div>
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Severity</label>
            <select
              name="severity"
              value={form.severity}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none"
            >
              <option value="">Select severity</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none"
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
            <label className="block text-gray-700 font-bold mb-2">Reporter</label>
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
            <label className="block text-gray-700 font-bold mb-2">Assigned To</label>
            <input
              type="text"
              name="assigned_to"
              value={form.assigned_to}
              onChange={handleChange}
              placeholder="Assignee"
              className="w-full px-3 py-2 border rounded focus:outline-none"
            />
          </div>
        </div>
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Date Reported</label>
            <input
              type="date"
              name="date_reported"
              value={form.date_reported}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Notes</label>
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
      <div className="overflow-x-auto mb-6">
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
                  <td className="px-4 py-2 border">{bug.assigned_to}</td>
                  <td className="px-4 py-2 border">{bug.date_reported}</td>
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
                    <button
                      onClick={() => handleView(bug.id)}
                      className="text-green-500 hover:text-green-700"
                      title="View Details"
                    >
                      View
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

      {/* Charts Section */}
      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        {/* Severity Distribution Pie Chart */}
        <div className="bg-white shadow-lg rounded p-6 w-full sm:w-1/2 max-w-3xl mx-auto" style={{ height: "400px" }}>
          <Pie data={severityChartData} options={{ ...pieOptions, plugins: { ...pieOptions.plugins, title: { display: true, text: "Severity Distribution" } } }} />
        </div>
        {/* Status Distribution Pie Chart */}
        <div className="bg-white shadow-lg rounded p-6 w-full sm:w-1/2 max-w-3xl mx-auto" style={{ height: "400px" }}>
          <Pie data={statusChartData} options={{ ...pieOptions, plugins: { ...pieOptions.plugins, title: { display: true, text: "Status Distribution" } } }} />
        </div>
      </div>

      {/* Receipt/Details Modal (Pop-up with Cancel button) */}
      {showDetails && selectedBug && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="text-2xl font-bold">Bug Details</h3>
              <button onClick={() => setShowDetails(false)} className="text-red-500 font-bold text-2xl">
                &times;
              </button>
            </div>
            <div className="mb-4">
              <p><strong>Title:</strong> {selectedBug.title}</p>
              <p><strong>Description:</strong> {selectedBug.description}</p>
              <p><strong>Severity:</strong> {selectedBug.severity}</p>
              <p><strong>Status:</strong> {selectedBug.status}</p>
              <p><strong>Reporter:</strong> {selectedBug.reporter}</p>
              <p><strong>Assigned To:</strong> {selectedBug.assigned_to}</p>
              <p><strong>Date Reported:</strong> {new Date(selectedBug.date_reported).toLocaleString()}</p>
              <p><strong>Notes:</strong> {selectedBug.notes}</p>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDetails(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => window.print()}
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              >
                Print Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Print Button */}
      <div className="flex justify-end mb-4">
      
      </div>
    </div>
  );
};

export default BugTrackingTool;



