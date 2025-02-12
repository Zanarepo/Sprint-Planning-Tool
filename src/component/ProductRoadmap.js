import React, { useState } from "react";
import ProductRoadmapFeature from './ProductRoadmapFeature'
const ProductRoadmapCreator = () => {
  // Configuration state
  const [format, setFormat] = useState("quarterly"); // "quarterly" or "phases"
  const [columnCount, setColumnCount] = useState(4); // 3 or 4
  const [roadmapHeader, setRoadmapHeader] = useState("");
  const [generated, setGenerated] = useState(false);

  // Confirmation state: once confirmed, a summary view is shown
  const [confirmed, setConfirmed] = useState(false);

  // Focus state for columns (to dim those not in focus)
  const [focusedColumn, setFocusedColumn] = useState(null);

  // Roadmap board state: each column has an id, title, and array of goals.
  // Each goal is { id, title, timeline, features: [ { id, title, timeline, done } ] }
  const [roadmap, setRoadmap] = useState([]);

  // Local state for adding goals/features
  const [addingGoalFor, setAddingGoalFor] = useState(null);
  const [goalForm, setGoalForm] = useState({ title: "", timeline: "" });
  const [addingFeatureFor, setAddingFeatureFor] = useState({ columnId: null, goalId: null });
  const [featureForm, setFeatureForm] = useState({ title: "", timeline: "" });

  // Editing state for goals and features
  const [editingGoal, setEditingGoal] = useState({ columnId: null, goalId: null });
  const [editGoalForm, setEditGoalForm] = useState({ title: "", timeline: "" });
  const [editingFeature, setEditingFeature] = useState({ columnId: null, goalId: null, featureId: null });
  const [editFeatureForm, setEditFeatureForm] = useState({ title: "", timeline: "" });

  // Generate the roadmap based on the configuration options
  const generateRoadmap = () => {
    let columns = [];
    for (let i = 1; i <= columnCount; i++) {
      let title = format === "quarterly" ? `Q${i}` : `Phase ${i}`;
      columns.push({
        id: Date.now() + i, // simple unique id
        title,
        goals: [],
      });
    }
    setRoadmap(columns);
    setGenerated(true);
  };

  // Back button: return to configuration page without clearing roadmap data
  const handleBack = () => {
    setGenerated(false);
  };

  // Print function remains unchanged
  const handlePrint = () => {
    window.print();
  };

  // -----------------------------
  // CRUD for Goals and Features
  // -----------------------------
  const addGoal = (columnId, title, timeline) => {
    setRoadmap((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              goals: [
                ...col.goals,
                { id: Date.now(), title, timeline, features: [] },
              ],
            }
          : col
      )
    );
  };

  const updateGoal = (columnId, goalId, newTitle, newTimeline) => {
    setRoadmap((prev) =>
      prev.map((col) => {
        if (col.id === columnId) {
          return {
            ...col,
            goals: col.goals.map((goal) =>
              goal.id === goalId
                ? { ...goal, title: newTitle, timeline: newTimeline }
                : goal
            ),
          };
        }
        return col;
      })
    );
  };

  const deleteGoal = (columnId, goalId) => {
    setRoadmap((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, goals: col.goals.filter((goal) => goal.id !== goalId) }
          : col
      )
    );
  };

  const addFeature = (columnId, goalId, title, timeline) => {
    setRoadmap((prev) =>
      prev.map((col) => {
        if (col.id === columnId) {
          return {
            ...col,
            goals: col.goals.map((goal) =>
              goal.id === goalId
                ? {
                    ...goal,
                    features: [
                      ...goal.features,
                      { id: Date.now(), title, timeline, done: false },
                    ],
                  }
                : goal
            ),
          };
        }
        return col;
      })
    );
  };

  const updateFeature = (columnId, goalId, featureId, newTitle, newTimeline) => {
    setRoadmap((prev) =>
      prev.map((col) => {
        if (col.id === columnId) {
          return {
            ...col,
            goals: col.goals.map((goal) => {
              if (goal.id === goalId) {
                return {
                  ...goal,
                  features: goal.features.map((feature) =>
                    feature.id === featureId
                      ? { ...feature, title: newTitle, timeline: newTimeline }
                      : feature
                  ),
                };
              }
              return goal;
            }),
          };
        }
        return col;
      })
    );
  };

  const deleteFeature = (columnId, goalId, featureId) => {
    setRoadmap((prev) =>
      prev.map((col) => {
        if (col.id === columnId) {
          return {
            ...col,
            goals: col.goals.map((goal) => {
              if (goal.id === goalId) {
                return {
                  ...goal,
                  features: goal.features.filter(
                    (feature) => feature.id !== featureId
                  ),
                };
              }
              return goal;
            }),
          };
        }
        return col;
      })
    );
  };

  // Toggle the "done" status for a feature
  const toggleFeatureDone = (columnId, goalId, featureId) => {
    setRoadmap((prev) =>
      prev.map((col) => {
        if (col.id === columnId) {
          return {
            ...col,
            goals: col.goals.map((goal) => {
              if (goal.id === goalId) {
                return {
                  ...goal,
                  features: goal.features.map((feature) => {
                    if (feature.id === featureId) {
                      return { ...feature, done: !feature.done };
                    }
                    return feature;
                  }),
                };
              }
              return goal;
            }),
          };
        }
        return col;
      })
    );
  };

  // Calculate summary info for the confirmed view
  const getSummary = () => {
    return roadmap.map((col) => {
      const totalGoals = col.goals.length;
      const totalFeatures = col.goals.reduce(
        (acc, goal) => acc + goal.features.length,
        0
      );
      return { title: col.title, totalGoals, totalFeatures };
    });
  };

  // -----------------------------
  // Rendering the Roadmap Board
  // -----------------------------
  return (
    <div className="container mx-auto p-4">
        <ProductRoadmapFeature/>
      <h1 className="text-3xl font-bold text-center mb-6">
        Product Roadmap Creator
      </h1>

      {/* Configuration Section */}
      {!generated && (
        <div className="mb-6 p-4 border rounded shadow max-w-xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Configure Your Roadmap
          </h2>
          <div className="mb-4">
            <label className="block font-semibold mb-2">
              Roadmap Header:
            </label>
            <input
              type="text"
              placeholder="What are you building?"
              value={roadmapHeader}
              onChange={(e) => setRoadmapHeader(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">
              Select Format:
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="quarterly">Quarterly (Q1–Q4)</option>
              <option value="phases">Phases (Phase 1–Phase 4)</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">
              Number of Columns:
            </label>
            <select
              value={columnCount}
              onChange={(e) => setColumnCount(Number(e.target.value))}
              className="w-full border p-2 rounded"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <button
            onClick={generateRoadmap}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Generate Roadmap
          </button>
        </div>
      )}

      {/* Roadmap Board */}
      {generated && (
        <div>
          {/* Navigation buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={handleBack}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Back to Setup
            </button>
            <button
              onClick={handlePrint}
              className="bg-gray-800 text-white px-4 py-2 rounded"
            >
              Print Roadmap
            </button>
          </div>

          {/* Roadmap Header */}
          <div className="mb-4 text-center">
            <h2 className="text-2xl font-bold">
              {roadmapHeader || "Your Roadmap"}
            </h2>
          </div>

          {/* Confirm Roadmap & Summary */}
          {!confirmed && (
            <div className="mb-4 text-center">
              <button
                onClick={() => setConfirmed(true)}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Confirm Roadmap
              </button>
            </div>
          )}
          {confirmed && (
            <div className="mb-4 p-4 border rounded bg-gray-100">
           <h3 className="text-xl font-bold mb-2 text-blue-500 text-center">Roadmap Summary</h3>
<p>Total Columns: {roadmap.length}</p>
<table className="min-w-full border-collapse border border-gray-300 mt-4">
  <thead>
    <tr className="bg-blue-100">
      <th className="px-4 py-2 border border-gray-300 text-left">Column</th>
      <th className="px-4 py-2 border border-gray-300 text-left">Goals</th>
      <th className="px-4 py-2 border border-gray-300 text-left">Features</th>
    </tr>
  </thead>
  <tbody>
    {getSummary().map((colSummary, idx) => (
      <tr key={idx} className="odd:bg-white even:bg-50">
        <td className="px-4 py-2 border border-gray-300">{colSummary.title}</td>
        <td className="px-4 py-2 border border-gray-300">{colSummary.totalGoals}</td>
        <td className="px-4 py-2 border border-gray-300">{colSummary.totalFeatures}</td>
      </tr>
    ))}
  </tbody>
</table>




 {/* ListView
    <h3 className="text-xl font-bold mb-2">Roadmap Summary</h3>
              <p>Total Columns: {roadmap.length}</p>
              {getSummary().map((colSummary, idx) => (
                <div key={idx} className="mt-2">
                  <strong>{colSummary.title}:</strong> {colSummary.totalGoals} Goals,{" "}
                  {colSummary.totalFeatures} Features
                </div>
              ))}
              */}

              
              <button
                onClick={() => setConfirmed(false)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit Roadmap
              </button>
            </div>
          )}

          {/* Roadmap Columns */}
          <div className="flex flex-wrap gap-4">
            {roadmap.map((col) => (
              <div
                key={col.id}
                className={`flex-1 min-w-[250px] border p-4 rounded shadow ${
                  focusedColumn && focusedColumn !== col.id ? "opacity-50" : "opacity-100"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-bold">{col.title}</h2>
                  <button
                    onClick={() =>
                      setFocusedColumn(focusedColumn === col.id ? null : col.id)
                    }
                    className="bg-indigo-500 text-white px-2 py-1 rounded text-xs"
                  >
                    {focusedColumn === col.id ? "Unfocus" : "Focus"}
                  </button>
                </div>

                {/* Goals List */}
                {col.goals.map((goal) => (
                  <div key={goal.id} className="mb-4 p-2 border rounded">
                    {editingGoal.columnId === col.id &&
                    editingGoal.goalId === goal.id ? (
                      <div>
                        <input
                          type="text"
                          placeholder="Edit Goal Title"
                          value={editGoalForm.title}
                          onChange={(e) =>
                            setEditGoalForm({
                              ...editGoalForm,
                              title: e.target.value,
                            })
                          }
                          className="border p-1 w-full mb-2"
                        />
                        <input
                          type="date"
                          value={editGoalForm.timeline}
                          onChange={(e) =>
                            setEditGoalForm({ ...editGoalForm, timeline: e.target.value })
                          }
                          className="border p-1 w-full mb-2"
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              updateGoal(
                                col.id,
                                goal.id,
                                editGoalForm.title,
                                editGoalForm.timeline
                              );
                              setEditingGoal({ columnId: null, goalId: null });
                            }}
                            className="bg-green-600 text-white px-2 py-1 rounded"
                          >
                            Save
                          </button>
                          <button
                            onClick={() =>
                              setEditingGoal({ columnId: null, goalId: null })
                            }
                            className="bg-gray-600 text-white px-2 py-1 rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-semibold">{goal.title}</h3>
                          <span className="text-sm text-gray-600">
                            {goal.timeline}
                          </span>
                        </div>
                        <div className="space-x-2">
                          <button
                            onClick={() => {
                              setEditingGoal({ columnId: col.id, goalId: goal.id });
                              setEditGoalForm({
                                title: goal.title,
                                timeline: goal.timeline,
                              });
                            }}
                            className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteGoal(col.id, goal.id)}
                            className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Features List */}
                    <ul className="mt-2 ml-4">
                      {goal.features.map((feature) => (
                        <li
                          key={feature.id}
                          className={`mb-1 flex justify-between items-center p-1 rounded ${
                            feature.done ? "bg-green-200" : ""
                          }`}
                        >
                          {editingFeature.columnId === col.id &&
                          editingFeature.goalId === goal.id &&
                          editingFeature.featureId === feature.id ? (
                            <div className="w-full">
                              <input
                                type="text"
                                placeholder="Edit Feature Title"
                                value={editFeatureForm.title}
                                onChange={(e) =>
                                  setEditFeatureForm({
                                    ...editFeatureForm,
                                    title: e.target.value,
                                  })
                                }
                                className="border p-1 w-full mb-2"
                              />
                              <input
                                type="date"
                                value={editFeatureForm.timeline}
                                onChange={(e) =>
                                  setEditFeatureForm({ ...editFeatureForm, timeline: e.target.value })
                                }
                                className="border p-1 w-full mb-2"
                              />
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => {
                                    updateFeature(
                                      col.id,
                                      goal.id,
                                      feature.id,
                                      editFeatureForm.title,
                                      editFeatureForm.timeline
                                    );
                                    setEditingFeature({
                                      columnId: null,
                                      goalId: null,
                                      featureId: null,
                                    });
                                  }}
                                  className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() =>
                                    setEditingFeature({
                                      columnId: null,
                                      goalId: null,
                                      featureId: null,
                                    })
                                  }
                                  className="bg-gray-600 text-white px-2 py-1 rounded text-xs"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <span className="text-md">{feature.title}</span>
                              <span className="text-sm text-gray-500">
                                {feature.timeline}
                              </span>
                              <div className="space-x-1">
                                <button
                                  onClick={() =>
                                    toggleFeatureDone(col.id, goal.id, feature.id)
                                  }
                                  className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                                >
                                  {feature.done ? "Undo" : "Done"}
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingFeature({
                                      columnId: col.id,
                                      goalId: goal.id,
                                      featureId: feature.id,
                                    });
                                    setEditFeatureForm({
                                      title: feature.title,
                                      timeline: feature.timeline,
                                    });
                                  }}
                                  className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() =>
                                    deleteFeature(col.id, goal.id, feature.id)
                                  }
                                  className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                                >
                                  Delete
                                </button>
                              </div>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 flex space-x-2">
                      <button
                        onClick={() =>
                          setAddingFeatureFor({ columnId: col.id, goalId: goal.id })
                        }
                        className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                      >
                        Add Feature
                      </button>
                      <button
                        onClick={() => deleteGoal(col.id, goal.id)}
                        className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                      >
                        Delete Goal
                      </button>
                    </div>
                    {addingFeatureFor.columnId === col.id &&
                      addingFeatureFor.goalId === goal.id && (
                        <div className="mt-2 p-2 border rounded">
                          <input
                            type="text"
                            placeholder="Feature Title"
                            value={featureForm.title}
                            onChange={(e) =>
                              setFeatureForm({
                                ...featureForm,
                                title: e.target.value,
                              })
                            }
                            className="border p-1 w-full mb-2"
                          />
                          <input
                            type="date"
                            value={featureForm.timeline}
                            onChange={(e) =>
                              setFeatureForm({ ...featureForm, timeline: e.target.value })
                            }
                            className="border p-1 w-full mb-2"
                          />
                          <button
                            onClick={() => {
                              addFeature(
                                col.id,
                                goal.id,
                                featureForm.title,
                                featureForm.timeline
                              );
                              setFeatureForm({ title: "", timeline: "" });
                              setAddingFeatureFor({ columnId: null, goalId: null });
                            }}
                            className="bg-green-600 text-white px-2 py-1 rounded w-full"
                          >
                            Add Feature
                          </button>
                          <button
                            onClick={() =>
                              setAddingFeatureFor({ columnId: null, goalId: null })
                            }
                            className="bg-gray-600 text-white px-2 py-1 rounded w-full mt-2"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                  </div>
                ))}
                <button
                  onClick={() => setAddingGoalFor(col.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-4"
                >
                  Add Goal
                </button>
                {addingGoalFor === col.id && (
                  <div className="mt-4 p-2 border rounded">
                    <input
                      type="text"
                      placeholder="Goal Title"
                      value={goalForm.title}
                      onChange={(e) =>
                        setGoalForm({ ...goalForm, title: e.target.value })
                      }
                      className="border p-1 w-full mb-2"
                    />
                    <input
                      type="date"
                      value={goalForm.timeline}
                      onChange={(e) =>
                        setGoalForm({ ...goalForm, timeline: e.target.value })
                      }
                      className="border p-1 w-full mb-2"
                    />
                    <button
                      onClick={() => {
                        addGoal(col.id, goalForm.title, goalForm.timeline);
                        setGoalForm({ title: "", timeline: "" });
                        setAddingGoalFor(null);
                      }}
                      className="bg-green-600 text-white px-2 py-1 rounded w-full"
                    >
                      Add Goal
                    </button>
                    <button
                      onClick={() => setAddingGoalFor(null)}
                      className="bg-gray-600 text-white px-2 py-1 rounded w-full mt-2"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductRoadmapCreator;
