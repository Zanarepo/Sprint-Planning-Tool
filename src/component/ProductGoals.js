import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import KPIsFeatures from './KPIsFeatures'


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

// Register necessary ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

// A simple progress bar component that shows progress relative to the product goal target.
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
  // State for overall entries; each entry represents a Product Goal with its Feature Goal and Key Results.
  const [entries, setEntries] = useState([]);
  // Form state for Product Goal & Feature Goal details.
  const [productGoalName, setProductGoalName] = useState("");
  const [productGoalTarget, setProductGoalTarget] = useState(""); // e.g., 30 for 30%
  const [featureGoalName, setFeatureGoalName] = useState("");

  // State for Key Results (KR) currently being added.
  // During creation, we only ask for description and target; done always starts as false.
  const [krList, setKrList] = useState([]);
  const [krForm, setKrForm] = useState({ description: "", target: "" });

  // For editing an existing entry.
  const [editingId, setEditingId] = useState(null);

  // View mode: "table" or "organogram".
  const [viewMode, setViewMode] = useState("table");

  // Update KR form fields for adding a new KR.
  const handleKRChange = (e) => {
    const { name, value } = e.target;
    setKrForm((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new Key Result to the KR list; default done status is false.
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

  // Compute overall progress for an entry.
  // overallProgress = (number of KRs marked done / total KRs) * productGoalTarget.
  const computeOverallProgress = (keyResults, goalTarget) => {
    if (keyResults.length === 0) return 0;
    const doneCount = keyResults.filter((kr) => kr.done).length;
    return (doneCount / keyResults.length) * goalTarget;
  };

  // Handle form submission to create or update an entry.
  const handleSubmit = (e) => {
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
    const overallProgress = computeOverallProgress(krList, Number(productGoalTarget));
    const newEntry = {
      id: editingId ? editingId : Date.now(),
      productGoalName,
      productGoalTarget: Number(productGoalTarget),
      featureGoalName,
      keyResults: krList,
      overallProgress,
    };

    if (editingId) {
      setEntries(entries.map((entry) => (entry.id === editingId ? newEntry : entry)));
      setEditingId(null);
    } else {
      setEntries([...entries, newEntry]);
    }
    // Clear form fields.
    setProductGoalName("");
    setProductGoalTarget("");
    setFeatureGoalName("");
    setKrList([]);
  };

  // Populate the form for editing an entry.
  const handleEdit = (id) => {
    const entry = entries.find((e) => e.id === id);
    if (entry) {
      setProductGoalName(entry.productGoalName);
      setProductGoalTarget(entry.productGoalTarget.toString());
      setFeatureGoalName(entry.featureGoalName);
      setKrList(entry.keyResults);
      setEditingId(entry.id);
    }
  };

  // Delete an entire entry.
  const handleDelete = (id) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  // Toggle a KR's done state for a given entry.
  const handleToggleKR = (entryId, krId) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) => {
        if (entry.id === entryId) {
          const updatedKeyResults = entry.keyResults.map((kr) =>
            kr.id === krId ? { ...kr, done: !kr.done } : kr
          );
          // Use the entry's stored productGoalTarget for calculation.
          const updatedOverallProgress = computeOverallProgress(updatedKeyResults, entry.productGoalTarget);
          return { ...entry, keyResults: updatedKeyResults, overallProgress: updatedOverallProgress };
        }
        return entry;
      })
    );
  };

  // Print the dashboard.
  const handlePrint = () => {
    window.print();
  };

  // Prepare data for Organogram view: group entries by Product Goal.
  const groupedData = entries.reduce((acc, entry) => {
    if (!acc[entry.productGoalName]) {
      acc[entry.productGoalName] = [];
    }
    acc[entry.productGoalName].push(entry);
    return acc;
  }, {});

  // --- PIE CHART DATA FOR OVERALL AGGREGATED PROGRESS ---
  // We'll group entries by product goal name.
  const aggregatedData = {};
  entries.forEach((entry) => {
    const name = entry.productGoalName;
    if (!aggregatedData[name]) {
      aggregatedData[name] = { target: 0, progress: 0 };
    }
    aggregatedData[name].target += entry.productGoalTarget;
    aggregatedData[name].progress += entry.overallProgress;
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

  // Compute overall aggregated rate.
  const totalTarget = Object.values(aggregatedData).reduce((sum, val) => sum + val.target, 0);
  const totalProgress = Object.values(aggregatedData).reduce((sum, val) => sum + val.progress, 0);
  const overallRate = totalTarget > 0 ? ((totalProgress / totalTarget) * 100).toFixed(2) : 0;

  return (
    <div className="container mx-auto p-4 mt-8">
    
  <KPIsFeatures />

  {/* Form Section */}
  <form
    onSubmit={handleSubmit}
    className="max-w-lg mx-auto mb-6 p-4 border rounded shadow"
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
                <strong>{kr.description}</strong> - Pending
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
          placeholder="Key Result Description"
        />
        <input
          type="number"
          name="target"
          value={krForm.target}
          onChange={handleKRChange}
          className="border p-1 w-24 mb-2 md:mb-0"
          placeholder="Target"
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


           <div className="overflow-x-auto">
  <table className="min-w-full border-collapse">
    <tbody>
      {entries.map((entry) => (
        <tr key={entry.id}>
          <td className="border p-2 whitespace-nowrap">{entry.productGoalName}</td>
          <td className="border p-2 whitespace-nowrap">{entry.featureGoalName}</td>
          <td className="border p-2">
            <ProgressBar
              progress={entry.overallProgress}
              target={entry.productGoalTarget}
            />
          </td>
          <td className="border p-2">
            <ul>
              {entry.keyResults.map((kr) => (
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
          </table>
        </div>
      ) : (
        // Organogram View: Group entries by Product Goal.
        <div className="space-y-6">
        {Object.keys(groupedData).length === 0 ? (
          <p className="text-center text-gray-600">No entries to display.</p>
        ) : (
          Object.keys(groupedData).map((prodGoal) => (
            <div key={prodGoal} className="mb-6 border p-4 rounded shadow bg-white">
              <h2 className="text-xl font-bold mb-2">{prodGoal}</h2>
              {groupedData[prodGoal].map((entry) => (
                <div key={entry.id} className="ml-4 mt-2 border-l pl-4">
                  <h3 className="text-lg font-semibold">{entry.featureGoalName}</h3>
                  <div className="my-2">
                    <ProgressBar
                      progress={entry.overallProgress}
                      target={entry.productGoalTarget}
                    />
                  </div>
                  <ul className="list-disc ml-6">
                    {entry.keyResults.map((kr) => (
                      <li
                        key={kr.id}
                        className="mb-1 flex flex-col sm:flex-row items-start sm:items-center justify-between"
                      >
                        <span className="text-sm">
                          <strong>{kr.description}</strong> - {kr.done ? "Done" : "Pending"}
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

     {/* Overall Aggregated Progress Pie Chart */}
{entries.length > 0 && (
  <div className="mt-8 p-4 border rounded shadow">
    <h2 className="text-xl font-semibold mb-2">Overall Product Goals Achievement</h2>
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
