import React, { useState, useEffect , useCallback} from "react";
import { Pie } from "react-chartjs-2";
import KPIsFeatures from "./KPIsFeatures";
import { supabase } from "../supabaseClient";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

// A simple progress bar component
const ProgressBar = ({ progress, target }) => {
  const achieved = progress >= target;
  const widthPercent = Math.min((progress / target) * 100, 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-6">
      <div
        className={`h-6 rounded-full text-center text-white text-sm leading-6 ${
          achieved ? "bg-indigo-600" : "bg-indigo-600"
        }`}
        style={{ width: `${widthPercent}%` }}
      >
        {achieved ? `Goal Achieved ${target}%` : `${progress.toFixed(0)}%`}
      </div>
    </div>
  );
};

const ProductGoalsTracker = () => {
  // Local state variables
  const [entries, setEntries] = useState([]);
  const [productGoalName, setProductGoalName] = useState("");
  const [productGoalTarget, setProductGoalTarget] = useState("");
  const [featureGoalName, setFeatureGoalName] = useState("");
  const [krList, setKrList] = useState([]);
  const [krForm, setKrForm] = useState({ description: "", target: "" });
  const [editingId, setEditingId] = useState(null);
  const [viewMode, setViewMode] = useState("table");
  const [, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);
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

  // Wrap the fetchProductGoals function with useCallback so that it doesn't change on every render.
  const fetchProductGoals = useCallback(async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("product_goals")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });
    if (error) {
      console.error("Error fetching product goals:", error);
    } else {
      // Ensure overall_progress is a number
      const formattedData = data.map((item) => ({
        ...item,
        overall_progress: Number(item.overall_progress),
      }));
      setEntries(formattedData);
    }
  }, [userId]);

  // When userId is set, fetch product goals for this user
  useEffect(() => {
    if (userId) {
      fetchProductGoals();
    }
  }, [userId, fetchProductGoals]);

  // Handle changes in the Key Result (KR) form
  const handleKRChange = (e) => {
    const { name, value } = e.target;
    setKrForm((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new Key Result to the list
  const addKeyResult = () => {
    if (krForm.description && krForm.target) {
      const newKR = {
        id: Date.now(),
        description: krForm.description,
        target: Number(krForm.target),
        done: false,
      };
      setKrList([...krList, newKR]);
      setKrForm({ description: "", target: "" });
    }
  };

  // Compute overall progress based on the number of completed key results
  const computeOverallProgress = (keyResults, goalTarget) => {
    if (keyResults.length === 0) return 0;
    const doneCount = keyResults.filter((kr) => kr.done).length;
    return (doneCount / keyResults.length) * goalTarget;
  };

  // Handle form submission for creating or updating an entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !productGoalName ||
      !productGoalTarget ||
      !featureGoalName ||
      krList.length === 0
    ) {
      alert("Please complete all required fields and add at least one key result.");
      return;
    }
    const overallProgress = computeOverallProgress(
      krList,
      Number(productGoalTarget)
    );

    if (editingId) {
      // Update an existing entry
      const { error } = await supabase
        .from("product_goals")
        .update({
          product_goal_name: productGoalName,
          product_goal_target: Number(productGoalTarget),
          feature_goal_name: featureGoalName,
          key_results: krList,
          overall_progress: overallProgress,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingId)
        .eq("user_id", userId);
      if (error) {
        console.error("Error updating entry:", error);
      } else {
        console.debug("Entry updated successfully");
        fetchProductGoals();
      }
      setEditingId(null);
    } else {
      // Create a new entry
      const { error } = await supabase
        .from("product_goals")
        .insert([
          {
            user_id: userId,
            product_goal_name: productGoalName,
            product_goal_target: Number(productGoalTarget),
            feature_goal_name: featureGoalName,
            key_results: krList,
            overall_progress: overallProgress,
          },
        ]);
      if (error) {
        console.error("Error creating entry:", error);
      } else {
        console.debug("Entry created successfully");
        fetchProductGoals();
      }
    }
    // Clear the form fields
    setProductGoalName("");
    setProductGoalTarget("");
    setFeatureGoalName("");
    setKrList([]);
  };

  // Populate the form with an entry's details for editing
  const handleEdit = (id) => {
    const entry = entries.find((e) => e.id === id);
    if (entry) {
      setProductGoalName(entry.product_goal_name);
      setProductGoalTarget(entry.product_goal_target.toString());
      setFeatureGoalName(entry.feature_goal_name);
      setKrList(entry.key_results);
      setEditingId(entry.id);
    }
  };

  // Delete an entry from Supabase
  const handleDelete = async (id) => {
    const { error } = await supabase
      .from("product_goals")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);
    if (error) {
      console.error("Error deleting entry:", error);
    } else {
      console.debug("Entry deleted successfully");
      fetchProductGoals();
    }
  };

  // Toggle a key result's "done" status and update the entry in Supabase
  const handleToggleKR = async (entryId, krId) => {
    const entry = entries.find((entry) => entry.id === entryId);
    if (entry) {
      const updatedKeyResults = entry.key_results.map((kr) =>
        kr.id === krId ? { ...kr, done: !kr.done } : kr
      );
      const updatedOverallProgress = computeOverallProgress(
        updatedKeyResults,
        entry.product_goal_target
      );
      const { error } = await supabase
        .from("product_goals")
        .update({
          key_results: updatedKeyResults,
          overall_progress: updatedOverallProgress,
          updated_at: new Date().toISOString(),
        })
        .eq("id", entryId)
        .eq("user_id", userId);
      if (error) {
        console.error("Error updating key result:", error);
      } else {
        console.debug("Key result updated successfully");
        fetchProductGoals();
      }
    }
  };

  // Print the dashboard
  const handlePrint = () => {
    window.print();
  };

  // Group entries by Product Goal for the Organogram view
  const groupedData = entries.reduce((acc, entry) => {
    const goalName = entry.product_goal_name;
    if (!acc[goalName]) {
      acc[goalName] = [];
    }
    acc[goalName].push(entry);
    return acc;
  }, {});

  // Prepare Pie Chart data for overall aggregated progress
  const aggregatedData = {};
  entries.forEach((entry) => {
    const name = entry.product_goal_name;
    if (!aggregatedData[name]) {
      aggregatedData[name] = { target: 0, progress: 0 };
    }
    aggregatedData[name].target += entry.product_goal_target;
    aggregatedData[name].progress += entry.overall_progress;
  });
  const pieLabels = Object.keys(aggregatedData);
  const pieData = pieLabels.map((goal) => aggregatedData[goal].progress);
  const pieChartData = {
    labels: pieLabels,
    datasets: [
      {
        data: pieData,
        backgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const totalTarget = Object.values(aggregatedData).reduce(
    (sum, val) => sum + val.target,
    0
  );
  const totalProgress = Object.values(aggregatedData).reduce(
    (sum, val) => sum + val.progress,
    0
  );
  const overallRate =
    totalTarget > 0 ? ((totalProgress / totalTarget) * 100).toFixed(2) : 0;

  return (
    <div className="container mx-auto p-10 mt-8">
      <KPIsFeatures />

      {/* Form Section */}
      <form
    
       onSubmit={handleSubmit}
       className="w-full md:w-4/5 mx-auto mb-6 p-4 border rounded shadow"
     >
       <h2 className="text-xl font-semibold mb-2 text-center">
         {editingId ? "Edit Entry" : "Create New Entry"}
       </h2>
     
       <div className="mb-2">
         <label className="block text-gray-700 font-bold mb-2">
           Product Goal Name
         </label>
         <input
           type="text"
           value={productGoalName}
           onChange={(e) => setProductGoalName(e.target.value)}
           className="border p-1 w-full"
           placeholder="e.g., Increase Revenue"
           required
         />
       </div>
     
       <div className="mb-2">
         <label className="block text-gray-700 font-bold mb-2">
           Product Goal Target (%)
         </label>
         <input
           type="number"
           value={productGoalTarget}
           onChange={(e) => setProductGoalTarget(e.target.value)}
           className="border p-1 w-full"
           placeholder="e.g., 30"
           required
         />
       </div>
     
       <div className="mb-2">
         <label className="block text-gray-700 font-bold mb-2">
           Feature Goal Name
         </label>
         <input
           type="text"
           value={featureGoalName}
           onChange={(e) => setFeatureGoalName(e.target.value)}
           className="border p-1 w-full"
           placeholder="e.g., Improve Landing Page"
           required
         />
       </div>
       {/* Additional form fields go here */}
  
     

        {/* Key Results Section */}
        <div className="mb-2 border p-2 rounded">
          <h3 className="font-semibold mb-1">Key Results</h3>
          {krList.length > 0 && (
            <ul className="mb-2">
              {krList.map((kr) => (
                <li
                  key={kr.id}
                  className="flex items-center justify-between border-b py-1"
                >
                  <span>
                    <strong>{kr.description}</strong> -{" "}
                    {kr.done ? "Done" : "Pending"}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-col md:flex-row md:space-x-2 items-center">
            <input
              type="text"
              name="description"
              value={krForm.description}
              onChange={handleKRChange}
              className="border p-1 flex-1 mb-2 md:mb-0"
              placeholder="Key Results Description"
            />
            <input
              type="number"
              name="target"
              value={krForm.target}
              onChange={handleKRChange}
              className="border p-1 w-24 mb-2 md:mb-0"
              placeholder="% target"
            />
            <button
              type="button"
              onClick={addKeyResult}
              className="bg-indigo-600 text-white px-3 py-1 rounded"
            >
              +
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Entry" : "Create Entry"}
        </button>
      </form>

      {/* View Mode Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
          <button
          onClick={() => setViewMode("table")}
          className={`w-full sm:w-auto px-4 py-2 rounded ${
            viewMode === "table"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Table View
        </button>
        <button
          onClick={() => setViewMode("organogram")}
          className={`w-full sm:w-auto px-4 py-2 rounded ${
            viewMode === "organogram"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Organogram View
        </button>
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-4 py-2 rounded bg-gray-800 text-white"
        >
          Print Dashboard
        </button>
        
      </div>

      {/* Dashboard Section */}
      {viewMode === "table" ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-indigo-200">
              <tr>
                <th className="border p-2">Product Goal</th>
                <th className="border p-2">Feature Goal</th>
                <th className="border p-2">Overall Progress</th>
                <th className="border p-2">Key Results</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td className="border p-2 whitespace-nowrap">
                    {entry.product_goal_name}
                  </td>
                  <td className="border p-2 whitespace-nowrap">
                    {entry.feature_goal_name}
                  </td>
                  <td className="border p-2">
                    <ProgressBar
                      progress={entry.overall_progress}
                      target={entry.product_goal_target}
                    />
                  </td>
                  <td className="border p-2">
                    <ul>
                      {entry.key_results.map((kr) => (
                        <li key={kr.id} className="flex items-center justify-between">
                          <span className="text-sm">
                            {kr.description} - {kr.done ? "Done" : "Pending"}
                          </span>
                          <button
                            onClick={() => handleToggleKR(entry.id, kr.id)}
                            className="ml-2 text-blue-600 text-xs"
                          >
                            {kr.done ? "Mark as Pending" : "Mark as Done"}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border p-2 text-center whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(entry.id)}
                      className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {entries.length === 0 && (
                <tr>
                  <td colSpan="5" className="border p-2 text-center">
                    No entries available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        // Organogram View
        <div className="space-y-6">
          {Object.keys(groupedData).length === 0 ? (
            <p className="text-center text-gray-600">No entries to display.</p>
          ) : (
            Object.keys(groupedData).map((prodGoal) => (
              <div key={prodGoal} className="mb-6 border p-4 rounded shadow bg-white">
                <h2 className="text-xl font-bold mb-2">{prodGoal}</h2>
                {groupedData[prodGoal].map((entry) => (
                  <div key={entry.id} className="ml-4 mt-2 border-l pl-4">
                    <h3 className="text-lg font-semibold">{entry.feature_goal_name}</h3>
                    <div className="my-2">
                      <ProgressBar
                        progress={entry.overall_progress}
                        target={entry.product_goal_target}
                      />
                    </div>
                    <ul className="list-disc ml-6">
                      {entry.key_results.map((kr) => (
                        <li
                          key={kr.id}
                          className="mb-1 flex flex-col sm:flex-row items-start sm:items-center justify-between"
                        >
                          <span className="text-sm">
                            <strong>{kr.description}</strong> -{" "}
                            {kr.done ? "Done" : "Pending"}
                          </span>
                          <button
                            onClick={() => handleToggleKR(entry.id, kr.id)}
                            className="mt-1 sm:mt-0 ml-0 sm:ml-2 text-indigo-600 text-xs"
                          >
                            {kr.done ? "Mark as Pending" : "Mark as Done"}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => handleEdit(entry.id)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      )}

      {/* Pie Chart for Overall Aggregated Progress */}
      {entries.length > 0 && (
        <div className="mt-8 p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">
            Overall Product Goals Achievement
          </h2>
          <div className="mb-4 w-72 h-72 mx-auto">
            <Pie
              data={pieChartData}
              options={{ maintainAspectRatio: true, responsive: true }}
            />
          </div>
          <p className="text-center font-bold">
            Overall Achievement Rate: {overallRate}% (Aggregated)
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGoalsTracker;
