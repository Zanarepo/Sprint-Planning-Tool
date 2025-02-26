import React, { useCallback, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Bar } from "react-chartjs-2";
import CompetitiveMatrixFeature from "./CompetitiveMatrixFeature";
import CompetitiveMatrixExplainer from "./CompetitiveMatrixExplainer";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CompetitiveMatrixComparison = () => {
  // --- User States ---
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);

  // --- Creation Form Toggle ---
  const [showCreationForm, setShowCreationForm] = useState(false);

  // --- Matrix Creation / Selection States ---
  const [matrixTitle, setMatrixTitle] = useState("");
  const [matrixTitleSet, setMatrixTitleSet] = useState(false);
  const [matrixOpen, setMatrixOpen] = useState(false); // Toggles display of matrix details

  // --- New Entry Form State (for creating new entries) ---
  const [newEntry, setNewEntry] = useState({
    competitor_name: "",
    feature_name: "",
    competitor_feature_description: "",
    your_feature_description: "",
    competitor_pricing: "",
    your_pricing: "",
    competitor_usability_score: "",
    your_usability_score: "",
    competitor_feedback_rating: "",
    your_feedback_rating: "",
  });
  const [tempEntries, setTempEntries] = useState([]);

  // --- Fetched Matrix Entries for the Current Matrix ---
  const [matrixEntries, setMatrixEntries] = useState([]);

  // --- Edit Mode State ---
  const [editMode, setEditMode] = useState(false);
  const [entryToEdit, setEntryToEdit] = useState(null);

  // --- Benchmark / Recommendation ---
  const [recommendation, setRecommendation] = useState("");

  // --- Refresh Flag ---
  const [refresh, setRefresh] = useState(false);

  // --- List of All Matrices Created by the User (Distinct Titles) ---
  const [userMatrices, setUserMatrices] = useState([]);

  // --- Retrieve User Email and ID ---
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
      console.debug("User email found:", email);
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
      console.debug("No user email found.");
    }
  }, []);

  // --- Ensure a Unique Voter Identifier Exists (for public voting) ---
  useEffect(() => {
    let voterId = localStorage.getItem("voter_identifier");
    if (!voterId) {
      voterId = Math.random().toString(36).substring(2);
      localStorage.setItem("voter_identifier", voterId);
    }
  }, []);

  // --- Fetch All Matrices Created by the User ---
  const fetchUserMatrices = useCallback(async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("competitive_matrix")
      .select("matrix_title")
      .eq("user_id", userId);
    if (error) {
      console.error("Error fetching matrices:", error);
    } else {
      const distinct = [...new Set(data.map((item) => item.matrix_title))];
      setUserMatrices(distinct);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserMatrices();
  }, [fetchUserMatrices, refresh]);

  // --- Fetch Entries for the Current Matrix ---
  const fetchMatrixEntries = useCallback(async () => {
    if (!userId || !matrixTitleSet) {
      setMatrixEntries([]);
      return;
    }
    const { data, error } = await supabase
      .from("competitive_matrix")
      .select("*")
      .eq("user_id", userId)
      .eq("matrix_title", matrixTitle)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching matrix entries:", error);
    } else {
      setMatrixEntries(data);
    }
  }, [userId, matrixTitle, matrixTitleSet]);

  useEffect(() => {
    fetchMatrixEntries();
  }, [fetchMatrixEntries, refresh]);

  // --- Handlers for Matrix Creation ---
  const handleSetMatrixTitle = () => {
    if (!matrixTitle.trim()) {
      alert("Please enter a matrix title.");
      return;
    }
    setMatrixTitle(matrixTitle.trim());
    setMatrixTitleSet(true);
    setMatrixOpen(true);
  };

  // --- Handlers for New Entry Form (Creation Mode) ---
  const handleNewEntryChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEntryToTemp = () => {
    if (!newEntry.competitor_name.trim() || !newEntry.feature_name.trim()) {
      alert("Please enter at least a competitor name and feature name.");
      return;
    }
    setTempEntries((prev) => [...prev, { ...newEntry }]);
    setNewEntry({
      competitor_name: "",
      feature_name: "",
      competitor_feature_description: "",
      your_feature_description: "",
      competitor_pricing: "",
      your_pricing: "",
      competitor_usability_score: "",
      your_usability_score: "",
      competitor_feedback_rating: "",
      your_feedback_rating: "",
    });
  };

  const handleSubmitMatrix = async () => {
    if (tempEntries.length === 0) {
      alert("No entries to submit.");
      return;
    }
    const payload = tempEntries.map((entry) => ({
      ...entry,
      matrix_title: matrixTitle,
      user_id: userId,
      competitor_pricing: entry.competitor_pricing || null,
      your_pricing: entry.your_pricing || null,
      competitor_usability_score: entry.competitor_usability_score || null,
      your_usability_score: entry.your_usability_score || null,
      competitor_feedback_rating: entry.competitor_feedback_rating || null,
      your_feedback_rating: entry.your_feedback_rating || null,
    }));
    const { error } = await supabase.from("competitive_matrix").insert(payload);
    if (error) {
      console.error("Error submitting matrix:", error);
    } else {
      setTempEntries([]);
      setRefresh((prev) => !prev);
    }
  };

  // --- Handlers for Editing an Entry (Edit Mode via Full Form) ---
  const startEditEntry = (entry) => {
    setEntryToEdit(entry);
    setEditMode(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEntryToEdit((prev) => ({ ...prev, [name]: value }));
  };

  const saveEditedEntry = async () => {
    if (!entryToEdit) return;
    const { error } = await supabase
      .from("competitive_matrix")
      .update(entryToEdit)
      .eq("id", entryToEdit.id);
    if (error) {
      console.error("Error updating entry:", error);
    } else {
      setEditMode(false);
      setEntryToEdit(null);
      setRefresh((prev) => !prev);
    }
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEntryToEdit(null);
  };

  // --- Handlers for Deletion ---
  const handleDeleteEntry = async (entryId) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      const { error } = await supabase.from("competitive_matrix").delete().eq("id", entryId);
      if (error) {
        console.error("Error deleting entry:", error);
      } else {
        setRefresh((prev) => !prev);
      }
    }
  };

  const handleDeleteMatrix = async (title) => {
    if (window.confirm("Are you sure you want to delete the entire matrix?")) {
      const { error } = await supabase
        .from("competitive_matrix")
        .delete()
        .eq("user_id", userId)
        .eq("matrix_title", title);
      if (error) {
        console.error("Error deleting matrix:", error);
      } else {
        if (title === matrixTitle) {
          setMatrixTitle("");
          setMatrixTitleSet(false);
          setMatrixOpen(false);
          setMatrixEntries([]);
        }
        setRefresh((prev) => !prev);
      }
    }
  };

  // --- Benchmark Calculation ---
  // Overall Score = (Pricing 30% + Usability 40% + Feedback 30%)
  const calculateBenchmark = () => {
    if (matrixEntries.length === 0) {
      setRecommendation("No entries to calculate.");
      return;
    }
    const weightPricing = 0.3;
    const weightUsability = 0.4;
    const weightFeedback = 0.3;
    let compTotal = 0,
      yourTotal = 0,
      count = 0;
    matrixEntries.forEach((entry) => {
      if (
        entry.competitor_pricing &&
        entry.competitor_usability_score &&
        entry.competitor_feedback_rating &&
        entry.your_pricing &&
        entry.your_usability_score &&
        entry.your_feedback_rating
      ) {
        const compScore =
          Number(entry.competitor_pricing) * weightPricing +
          Number(entry.competitor_usability_score) * weightUsability +
          Number(entry.competitor_feedback_rating) * weightFeedback;
        const yourScore =
          Number(entry.your_pricing) * weightPricing +
          Number(entry.your_usability_score) * weightUsability +
          Number(entry.your_feedback_rating) * weightFeedback;
        compTotal += compScore;
        yourTotal += yourScore;
        count++;
      }
    });
    if (count === 0) {
      setRecommendation("Not enough data to calculate benchmark.");
      return;
    }
    const compAvg = compTotal / count;
    const yourAvg = yourTotal / count;
    let recMessage = `Based on weighted averages, your product's overall score is ${yourAvg.toFixed(
      1
    )} compared to the competitor's ${compAvg.toFixed(1)}. `;
    if (yourAvg > compAvg) {
      recMessage += "Your product is outperforming the competitor overall.";
    } else if (yourAvg < compAvg) {
      recMessage += "There is room for improvement in key areas.";
    } else {
      recMessage += "Both products perform similarly. Review individual metrics for more insights.";
    }
    setRecommendation(recMessage);
  };

  // --- Chart Data for Overall Score Comparison ---
  const chartData = {
    labels: matrixEntries.map((entry) => entry.feature_name),
    datasets: [
      {
        label: "Competitor Overall Score",
        data: matrixEntries.map((entry) =>
          entry.competitor_pricing &&
          entry.competitor_usability_score &&
          entry.competitor_feedback_rating
            ? Number(entry.competitor_pricing) * 0.3 +
              Number(entry.competitor_usability_score) * 0.4 +
              Number(entry.competitor_feedback_rating) * 0.3
            : 0
        ),
        backgroundColor: "rgba(220,53,69,0.7)", // red-ish
      },
      {
        label: "Your Overall Score",
        data: matrixEntries.map((entry) =>
          entry.your_pricing && entry.your_usability_score && entry.your_feedback_rating
            ? Number(entry.your_pricing) * 0.3 +
              Number(entry.your_usability_score) * 0.4 +
              Number(entry.your_feedback_rating) * 0.3
            : 0
        ),
        backgroundColor: "rgba(40,167,69,0.7)", // green-ish
      },
    ],
  };

  return (
    <div className="w-full p-4 ">
        <CompetitiveMatrixFeature/>
      
     

      {/* Constant "Create New Comparison Matrix" Button */}
      {userEmail && (
        <div className="mb-6 flex justify-center">
          <button
            onClick={() => setShowCreationForm((prev) => !prev)}
            className="bg-blue-900 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
          >
            {showCreationForm ? "Hide Creation Form" : "Create New Comparison Matrix"}
          </button>
        </div>
      )}

      {/* Matrix Creation Form (Always visible if toggled by the button) */}
      {userEmail && showCreationForm && (
        <section className="bg-blue-900 p-6 rounded-lg text-white mb-6">
          <h2 className="text-2xl font-bold mb-4">New Comparison Matrix</h2>
          {/* If matrix title is not set, show title field */}
          {!matrixTitleSet ? (
            <div className="flex flex-col bg-gray gap-4">
              <input
                type="text"
                placeholder="Matrix Title"
                value={matrixTitle}
                onChange={(e) => setMatrixTitle(e.target.value)}
                className="p-2 rounded border border-gray-300 text-black"
              />
              <button
                type="button"
                onClick={handleSetMatrixTitle}
                className="bg-white text-blue-900 font-bold py-2 px-4 rounded hover:bg-blue-100"
              >
                Set Matrix Title
              </button>
            </div>
          ) : (
            <>
              <p className="text-xl font-semibold mb-4">Matrix: {matrixTitle}</p>
              {/* New Entry Form */}
              <div className="flex flex-col bg-gray gap-4">
                <input
                  type="text"
                  name="competitor_name"
                  placeholder="Competitor Name"
                  value={newEntry.competitor_name}
                  onChange={handleNewEntryChange}
                  className="p-2 rounded border border-gray-300 text-black"
                />
                <input
                  type="text"
                  name="feature_name"
                  placeholder="Feature Name"
                  value={newEntry.feature_name}
                  onChange={handleNewEntryChange}
                  className="p-2 rounded border border-gray-300 text-black"
                />
                <textarea
                  name="competitor_feature_description"
                  placeholder="Competitor Feature Description (optional)"
                  value={newEntry.competitor_feature_description}
                  onChange={handleNewEntryChange}
                  className="p-2 rounded border border-gray-300 text-black"
                />
                <textarea
                  name="your_feature_description"
                  placeholder="Your Feature Description (optional)"
                  value={newEntry.your_feature_description}
                  onChange={handleNewEntryChange}
                  className="p-2 rounded border border-gray-300 text-black"
                />
                <input
                  type="number"
                  name="competitor_pricing"
                  placeholder="Competitor Pricing (1-10)"
                  value={newEntry.competitor_pricing}
                  onChange={handleNewEntryChange}
                  className="p-2 rounded border border-gray-300 text-black"
                />
                <input
                  type="number"
                  name="your_pricing"
                  placeholder="Your Pricing (1-10)"
                  value={newEntry.your_pricing}
                  onChange={handleNewEntryChange}
                  className="p-2 rounded border border-gray-300 text-black"
                />
                <input
                  type="number"
                  name="competitor_usability_score"
                  placeholder="Competitor Usability (1-10)"
                  value={newEntry.competitor_usability_score}
                  onChange={handleNewEntryChange}
                  className="p-2 rounded border border-gray-300 text-black"
                />
                <input
                  type="number"
                  name="your_usability_score"
                  placeholder="Your Usability (1-10)"
                  value={newEntry.your_usability_score}
                  onChange={handleNewEntryChange}
                  className="p-2 rounded border border-gray-300 text-black"
                />
                <input
                  type="number"
                  name="competitor_feedback_rating"
                  placeholder="Competitor Feedback (1-10)"
                  value={newEntry.competitor_feedback_rating}
                  onChange={handleNewEntryChange}
                  className="p-2 rounded border border-gray-300 text-black"
                />
                <input
                  type="number"
                  name="your_feedback_rating"
                  placeholder="Your Feedback (1-10)"
                  value={newEntry.your_feedback_rating}
                  onChange={handleNewEntryChange}
                  className="p-2 rounded border border-gray-300 text-black"
                />
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleAddEntryToTemp}
                    className="bg-white text-blue-900 font-bold py-2 px-4 rounded hover:bg-blue-100"
                  >
                    Add Entry
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitMatrix}
                    className="bg-white text-blue-900 font-bold py-2 px-4 rounded hover:bg-blue-100"
                  >
                    Submit Matrix
                  </button>
                </div>
              </div>
              {tempEntries.length > 0 && (
                <div className="mt-4 bg-white text-blue-900 p-4 rounded">
                  <h3 className="font-bold">Entries to be added:</h3>
                  <ul>
                    {tempEntries.map((entry, idx) => (
                      <li key={idx}>
                        <span className="font-semibold">{entry.feature_name}</span> (Competitor: {entry.competitor_name})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => handleDeleteMatrix(matrixTitle)}
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
                >
                  Delete Entire Matrix
                </button>
              </div>
            </>
          )}
        </section>
      )}

      {/* Section: List All Matrices (Always visible below the creation form) */}
      {userEmail && userId && userMatrices.length > 0 && (
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Your Comparison Matrices</h2>
          <div className="flex flex-wrap gap-4">
            {userMatrices.map((title, idx) => (
              <div
                key={idx}
                className="bg-gray-100 p-4 rounded shadow flex items-center justify-between w-full md:w-1/3"
              >
                <span className="font-semibold text-blue-900">{title}</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMatrixTitle(title);
                      setMatrixTitleSet(true);
                      setMatrixOpen(true);
                    }}
                    className="bg-blue-900 text-white py-1 px-3 rounded hover:bg-blue-600"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteMatrix(title)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <CompetitiveMatrixExplainer/>
        </section>
      )}

      {/* Section: Matrix Details (Read-Only View) */}
      {matrixTitleSet && matrixEntries.length > 0 && matrixOpen && !editMode && (
        <section className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Matrix Entries for: {matrixTitle}</h2>
            <button
              type="button"
              onClick={() => setMatrixOpen(false)}
              className="bg-gray-300 text-gray-800 py-1 px-3 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="px-4 py-2 border">Competitor</th>
                  <th className="px-4 py-2 border">Feature</th>
                  <th className="px-4 py-2 border">Competitor Overall</th>
                  <th className="px-4 py-2 border">Your Overall</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {matrixEntries.map((entry) => (
                  <tr key={entry.id} className="text-center">
                    <td className="px-4 py-2 border">{entry.competitor_name}</td>
                    <td className="px-4 py-2 border">{entry.feature_name}</td>
                    <td className="px-4 py-2 border">
                      {entry.competitor_pricing &&
                      entry.competitor_usability_score &&
                      entry.competitor_feedback_rating
                        ? (
                            Number(entry.competitor_pricing) * 0.3 +
                            Number(entry.competitor_usability_score) * 0.4 +
                            Number(entry.competitor_feedback_rating) * 0.3
                          ).toFixed(1)
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      {entry.your_pricing &&
                      entry.your_usability_score &&
                      entry.your_feedback_rating
                        ? (
                            Number(entry.your_pricing) * 0.3 +
                            Number(entry.your_usability_score) * 0.4 +
                            Number(entry.your_feedback_rating) * 0.3
                          ).toFixed(1)
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      {userId === entry.user_id && (
                        <>
                          <button
                            type="button"
                            onClick={() => startEditEntry(entry)}
                            className="bg-blue-900 text-white py-1 px-2 rounded mr-2"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteEntry(entry.id)}
                            className="bg-red-500 text-white py-1 px-2 rounded"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-col items-center">
            <button
              onClick={calculateBenchmark}
              className="bg-white text-blue-900 font-bold py-2 px-4 rounded hover:bg-blue-100"
            >
              Calculate Benchmark
            </button>
            {recommendation && (
              <p className="mt-2 text-lg font-semibold text-center">{recommendation}</p>
            )}
          </div>
          <div className="mt-6">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: "Overall Scores Comparison" },
                },
              }}
            />
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Overall Score = (Pricing 30% + Usability 40% + Feedback 30%).</p>
          </div>
        </section>
      )}

      {/* Section: Edit Form for an Entry (Shown when edit mode is active) */}
      {editMode && entryToEdit && (
        <section className="bg-blue-500 p-6 rounded-lg text-white mb-6">
          <h2 className="text-2xl font-bold mb-4">Edit Entry</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="competitor_name"
              placeholder="Competitor Name"
              value={entryToEdit.competitor_name}
              onChange={handleEditFormChange}
              className="p-2 rounded border border-gray-300 text-black"
            />
            <input
              type="text"
              name="feature_name"
              placeholder="Feature Name"
              value={entryToEdit.feature_name}
              onChange={handleEditFormChange}
              className="p-2 rounded border border-gray-300 text-black"
            />
            <textarea
              name="competitor_feature_description"
              placeholder="Competitor Feature Description (optional)"
              value={entryToEdit.competitor_feature_description}
              onChange={handleEditFormChange}
              className="p-2 rounded border border-gray-300 text-black"
            />
            <textarea
              name="your_feature_description"
              placeholder="Your Feature Description (optional)"
              value={entryToEdit.your_feature_description}
              onChange={handleEditFormChange}
              className="p-2 rounded border border-gray-300 text-black"
            />
            <input
              type="number"
              name="competitor_pricing"
              placeholder="Competitor Pricing (1-10)"
              value={entryToEdit.competitor_pricing}
              onChange={handleEditFormChange}
              className="p-2 rounded border border-gray-300 text-black"
            />
            <input
              type="number"
              name="your_pricing"
              placeholder="Your Pricing (1-10)"
              value={entryToEdit.your_pricing}
              onChange={handleEditFormChange}
              className="p-2 rounded border border-gray-300 text-black"
            />
            <input
              type="number"
              name="competitor_usability_score"
              placeholder="Competitor Usability (1-10)"
              value={entryToEdit.competitor_usability_score}
              onChange={handleEditFormChange}
              className="p-2 rounded border border-gray-300 text-black"
            />
            <input
              type="number"
              name="your_usability_score"
              placeholder="Your Usability (1-10)"
              value={entryToEdit.your_usability_score}
              onChange={handleEditFormChange}
              className="p-2 rounded border border-gray-300 text-black"
            />
            <input
              type="number"
              name="competitor_feedback_rating"
              placeholder="Competitor Feedback (1-10)"
              value={entryToEdit.competitor_feedback_rating}
              onChange={handleEditFormChange}
              className="p-2 rounded border border-gray-300 text-black"
            />
            <input
              type="number"
              name="your_feedback_rating"
              placeholder="Your Feedback (1-10)"
              value={entryToEdit.your_feedback_rating}
              onChange={handleEditFormChange}
              className="p-2 rounded border border-gray-300 text-black"
            />
            <div className="flex gap-4">
              <button
                type="button"
                onClick={saveEditedEntry}
                className="bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-100"
              >
                Save Update
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          
          </div>
         
        </section>
        
      )}
      
    </div>
  );
};

export default CompetitiveMatrixComparison;
