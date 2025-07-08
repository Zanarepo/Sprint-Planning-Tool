import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabaseClient";
import EpicsFeatures from './EpicsFeatures'

const EpicFeatureManager = () => {
  // User state
  const [, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);

  // State for competitive analyses (epics)
  const [epics, setEpics] = useState([]);
  const [currentEpicForm, setCurrentEpicForm] = useState({ title: "", description: "" });
  const [editingEpic, setEditingEpic] = useState(false);
  const [editingEpicId, setEditingEpicId] = useState(null);

  // Features stored by epic id: { [epicId]: [features] }
  const [featuresByEpic, setFeaturesByEpic] = useState({});
  // Feature form values per epic
  const [featureForms, setFeatureForms] = useState({});
  // Editing state for features per epic: { [epicId]: { isEditing: boolean, featureId: number|null } }
  const [editingFeature, setEditingFeature] = useState({});
  // Toggle the visibility of the feature form for each epic
  const [showFeatureForm, setShowFeatureForm] = useState({});

  // On mount, get the user email from localStorage and fetch the user id
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

  // Once userId is set, fetch all epics for that user


 const fetchEpics = useCallback(async () => {
    const { data, error } = await supabase
      .from("epics")
      .select("*")
      .eq("user_id", userId);
    if (error) {
      console.error("Error fetching epics:", error);
    } else {
      // Add an "isOpen" property (false by default) to toggle the UI
      const epicsWithOpen = data.map((epic) => ({ ...epic, isOpen: false }));
      setEpics(epicsWithOpen);
    }
  }, [userId, setEpics]); // Dependencies: userId and setEpics

  // Fetch epics when userId changes
  useEffect(() => {
    if (userId) {
      fetchEpics();
    }
  }, [userId, fetchEpics]); // fetchEpics is now stable



  // Toggle epic details open/closed. When opening, fetch its features.
  const toggleEpicOpen = (epicId) => {
    setEpics((prevEpics) =>
      prevEpics.map((epic) => {
        if (epic.id === epicId) {
          if (!epic.isOpen) {
            fetchFeatures(epicId);
          }
          return { ...epic, isOpen: !epic.isOpen };
        }
        return epic;
      })
    );
  };

  // Fetch features for a given epic from Supabase
  const fetchFeatures = async (epicId) => {
    const { data, error } = await supabase
      .from("stories_features")
      .select("*")
      .eq("epic_id", epicId);
    if (error) {
      console.error("Error fetching features:", error);
    } else {
      setFeaturesByEpic((prev) => ({ ...prev, [epicId]: data }));
    }
  };

  // Handle submission of the epic (analysis) form
  const handleEpicSubmit = async (e) => {
    e.preventDefault();
    if (editingEpic) {
      // Update an existing epic
      const { error } = await supabase
        .from("epics")
        .update({
          title: currentEpicForm.title,
          description: currentEpicForm.description,
        })
        .eq("id", editingEpicId);
      if (error) {
        console.error("Error updating epic:", error);
      } else {
        setEpics((prev) =>
          prev.map((epic) =>
            epic.id === editingEpicId
              ? { ...epic, title: currentEpicForm.title, description: currentEpicForm.description }
              : epic
          )
        );
      }
      setEditingEpic(false);
      setEditingEpicId(null);
    } else {
      // Insert a new epic
      const { data, error } = await supabase
        .from("epics")
        .insert([
          {
            title: currentEpicForm.title,
            description: currentEpicForm.description,
            user_id: userId,
          },
        ])
        .single();
      if (error) {
        console.error("Error creating epic:", error);
      } else {
        // Append the new epic immediately to the UI
        setEpics((prev) => [...prev, { ...data, isOpen: false }]);
      }
    }
    setCurrentEpicForm({ title: "", description: "" });
  };

  // Delete an epic and remove its features from local state
  const handleDeleteEpic = async (epicId) => {
    const { error } = await supabase.from("epics").delete().eq("id", epicId);
    if (error) {
      console.error("Error deleting epic:", error);
    } else {
      setEpics((prev) => prev.filter((epic) => epic.id !== epicId));
      setFeaturesByEpic((prev) => {
        const updated = { ...prev };
        delete updated[epicId];
        return updated;
      });
    }
  };

  // Pre-fill the epic form for editing an epic
  const handleEditEpic = (epic) => {
    setCurrentEpicForm({ title: epic.title, description: epic.description });
    setEditingEpic(true);
    setEditingEpicId(epic.id);
  };

  // Helper: get feature form values for a given epic; use defaults if not set
  const getFeatureForm = (epicId) => {
    return (
      featureForms[epicId] || {
        featureTitle: "",
        userStories: "",
        acceptanceCriteria: "",
        dependencies: "",
        prioritizationTechnique: "",
        priorityRanking: "",
        timeline: "",
        assignedDeveloper: "",
      }
    );
  };

  // Update the feature form state for a given epic
  const updateFeatureForm = (epicId, field, value) => {
    setFeatureForms((prev) => ({
      ...prev,
      [epicId]: {
        ...getFeatureForm(epicId),
        [field]: value,
      },
    }));
  };

  // Check whether we are editing a feature for a given epic
  const isEditingFeature = (epicId) => {
    return editingFeature[epicId]?.isEditing || false;
  };

  // Return the feature id currently being edited (if any) for a given epic
  const editingFeatureIdForEpic = (epicId) => {
    return editingFeature[epicId]?.featureId || null;
  };

  // Toggle the display of the feature form for a given epic
  const toggleFeatureFormVisibility = (epicId) => {
    setShowFeatureForm((prev) => ({
      ...prev,
      [epicId]: !prev[epicId],
    }));
  };

  // Handle submission of the feature form (add or update)
  const handleFeatureSubmit = async (e, epicId) => {
    e.preventDefault();
    const featureForm = getFeatureForm(epicId);
    if (isEditingFeature(epicId)) {
      // Update the existing feature
      const featureId = editingFeatureIdForEpic(epicId);
      const { error } = await supabase
        .from("stories_features")
        .update({
          feature_title: featureForm.featureTitle,
          user_stories: featureForm.userStories,
          acceptance_criteria: featureForm.acceptanceCriteria,
          dependencies: featureForm.dependencies,
          prioritization_technique: featureForm.prioritizationTechnique,
          priority_ranking: featureForm.priorityRanking,
          timeline: featureForm.timeline,
          assigned_developer: featureForm.assignedDeveloper,
          user_id: userId,
        })
        .eq("id", featureId);
      if (error) {
        console.error("Error updating feature:", error);
      } else {
        setFeaturesByEpic((prev) => {
          const updatedFeatures = prev[epicId].map((feature) =>
            feature.id === featureId
              ? {
                  ...feature,
                  feature_title: featureForm.featureTitle,
                  user_stories: featureForm.userStories,
                  acceptance_criteria: featureForm.acceptanceCriteria,
                  dependencies: featureForm.dependencies,
                  prioritization_technique: featureForm.prioritizationTechnique,
                  priority_ranking: featureForm.priorityRanking,
                  timeline: featureForm.timeline,
                  assigned_developer: featureForm.assignedDeveloper,
                }
              : feature
          );
          return { ...prev, [epicId]: updatedFeatures };
        });
      }
      setEditingFeature((prev) => ({
        ...prev,
        [epicId]: { isEditing: false, featureId: null },
      }));
    } else {
      // Insert a new feature and update the state immediately
      const { data, error } = await supabase
        .from("stories_features")
        .insert([
          {
            epic_id: epicId,
            user_id: userId,
            feature_title: featureForm.featureTitle,
            user_stories: featureForm.userStories,
            acceptance_criteria: featureForm.acceptanceCriteria,
            dependencies: featureForm.dependencies,
            prioritization_technique: featureForm.prioritizationTechnique,
            priority_ranking: featureForm.priorityRanking,
            timeline: featureForm.timeline,
            assigned_developer: featureForm.assignedDeveloper,
          },
        ])
        .single();
      if (error) {
        console.error("Error inserting feature:", error);
      } else {
        setFeaturesByEpic((prev) => {
          const currentFeatures = prev[epicId] || [];
          return { ...prev, [epicId]: [...currentFeatures, data] };
        });
      }
    }
    // Reset the feature form for that epic
    setFeatureForms((prev) => ({
      ...prev,
      [epicId]: {
        featureTitle: "",
        userStories: "",
        acceptanceCriteria: "",
        dependencies: "",
        prioritizationTechnique: "",
        priorityRanking: "",
        timeline: "",
        assignedDeveloper: "",
      },
    }));
    // Optionally, hide the form after submission
    setShowFeatureForm((prev) => ({ ...prev, [epicId]: false }));
  };

  // Prepare to edit a feature: prefill its form and show the form
  const handleEditFeature = (epicId, feature) => {
    if (!feature) return;
    // Ensure the feature form is visible
    setShowFeatureForm((prev) => ({ ...prev, [epicId]: true }));
    setFeatureForms((prev) => ({
      ...prev,
      [epicId]: {
        featureTitle: feature.feature_title,
        userStories: feature.user_stories,
        acceptanceCriteria: feature.acceptance_criteria,
        dependencies: feature.dependencies,
        prioritizationTechnique: feature.prioritization_technique,
        priorityRanking: feature.priority_ranking,
        timeline: feature.timeline,
        assignedDeveloper: feature.assigned_developer,
      },
    }));
    setEditingFeature((prev) => ({
      ...prev,
      [epicId]: { isEditing: true, featureId: feature.id },
    }));
  };

  // Delete a feature and update the table immediately
  const handleDeleteFeature = async (epicId, featureId) => {
    const { error } = await supabase.from("stories_features").delete().eq("id", featureId);
    if (error) {
      console.error("Error deleting feature:", error);
    } else {
      setFeaturesByEpic((prev) => ({
        ...prev,
        [epicId]: prev[epicId].filter((feature) => feature && feature.id !== featureId),
      }));
    }
  };

  // Print only the printable section (epic description and features table)
  const handlePrintSection = (epicId) => {
    const element = document.getElementById(`printable-section-${epicId}`);
    if (!element) return;
    const printContents = element.innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Section</title>
          <style>
            @media print { .no-print { display: none; } }
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="container mx-auto p-4">
       <EpicsFeatures/>
      <h1 className="text-3xl font-bold mb-4"> Epics & Users Stories</h1>

      {/* Epic Creation / Editing Form */}
      <div className="bg-white shadow-md rounded p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">
          {editingEpic ? "Edit Epics " : "Add New Epics"}
        </h2>
        <form onSubmit={handleEpicSubmit}>
          <div className="mb-4">
            <label htmlFor="epicTitle" className="block text-gray-700 font-bold mb-2">
              Epic Title
            </label>
            <input
              type="text"
              id="epicTitle"
              name="title"
              value={currentEpicForm.title}
              onChange={(e) => setCurrentEpicForm({ ...currentEpicForm, title: e.target.value })}
              placeholder="Enter Epic title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="epicDescription" className="block text-gray-700 font-bold mb-2">
              Epic Description
            </label>
            <textarea
              id="epicDescription"
              name="description"
              value={currentEpicForm.description}
              onChange={(e) => setCurrentEpicForm({ ...currentEpicForm, description: e.target.value })}
              placeholder="Enter Epic description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              rows="3"
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              {editingEpic ? "Update Epic" : "Add Epic"}
            </button>
            {editingEpic && (
              <button
                type="button"
                onClick={() => {
                  setEditingEpic(false);
                  setEditingEpicId(null);
                  setCurrentEpicForm({ title: "", description: "" });
                }}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List of Epics */}
      {epics.map((epic) => (
      <div key={epic.id} className="bg-white shadow-md rounded p-4 mb-4">
      <div className="flex items-center justify-between flex-nowrap">
        <h2 className="text-xl md:text-2xl font-bold">{epic.title}</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleEpicOpen(epic.id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {epic.isOpen ? "Hide" : "Show"}
          </button>
          <button
            onClick={() => handleEditEpic(epic)}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteEpic(epic.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    
    
          {epic.isOpen && (
            <div className="mt-4">
              {/* Print Button */}
              <div className="flex justify-end mb-2">
                <button onClick={() => handlePrintSection(epic.id)} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-3 rounded">
                  Print Section
                </button>
              </div>
              {/* Printable Section: Epic Description + Features Table */}
              <div id={`printable-section-${epic.id}`}>
                <p className="mb-4">{epic.description}</p>
                {featuresByEpic[epic.id] && featuresByEpic[epic.id].filter(f => f != null).length > 0 ? (
                 <div className="overflow-x-auto">
                 <table className="min-w-full divide-y divide-gray-200">
                   <thead className="bg-green-50">
                     <tr>
                       <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                         Feature Title
                       </th>
                       <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                         User Stories
                       </th>
                       <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                         Acceptance Criteria
                       </th>
                       <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                         Dependencies
                       </th>
                       <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                         Prioritization
                       </th>
                       <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                         Timeline
                       </th>
                       <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                         Developer
                       </th>
                       <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider no-print">
                         Actions
                       </th>
                     </tr>
                   </thead>
                   <tbody className="bg-white divide-y divide-gray-200">
                     {featuresByEpic[epic.id]
                       .filter((feature) => feature != null)
                       .map((feature) => (
                         <tr key={feature.id}>
                           <td className="px-4 py-2 whitespace-nowrap">{feature.feature_title}</td>
                           <td className="px-4 py-2 whitespace-nowrap">{feature.user_stories}</td>
                           <td className="px-4 py-2 whitespace-nowrap">{feature.acceptance_criteria}</td>
                           <td className="px-4 py-2 whitespace-nowrap">{feature.dependencies}</td>
                           <td className="px-4 py-2 whitespace-nowrap">
                             <strong>{feature.prioritization_technique}</strong> ({feature.priority_ranking})
                           </td>
                           <td className="px-4 py-2 whitespace-nowrap">{feature.timeline}</td>
                           <td className="px-4 py-2 whitespace-nowrap">{feature.assigned_developer}</td>
                           <td className="px-4 py-2 whitespace-nowrap no-print">
                             <button
                               onClick={() => handleEditFeature(epic.id, feature)}
                               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
                             >
                               Edit
                             </button>
                             <button
                               onClick={() => handleDeleteFeature(epic.id, feature.id)}
                               className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                             >
                               Delete
                             </button>
                           </td>
                         </tr>
                       ))}
                   </tbody>
                 </table>
               </div>
               

                ) : (
                  <p className="text-gray-600">No features added yet.</p>
                )}
              </div>

              {/* Toggle Feature Form Button */}
              <div className="mt-4">
                <button onClick={() => toggleFeatureFormVisibility(epic.id)} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                  {showFeatureForm[epic.id] ? "Hide Feature Form" : "Toggle Feature Form"}
                </button>
              </div>

              {/* Feature Form (visible if toggled on) */}
              {showFeatureForm[epic.id] && (
                <div className="bg-gray-100 p-4 rounded mt-4">
                  <h3 className="text-xl font-bold mb-2">
                    {isEditingFeature(epic.id) ? "Edit Feature" : "Add New Feature"}
                  </h3>
                  <form onSubmit={(e) => handleFeatureSubmit(e, epic.id)}>
                    <div className="mb-4">
                      <label htmlFor={`featureTitle-${epic.id}`} className="block text-gray-700 font-bold mb-2">
                        Feature Title
                      </label>
                      <input
                        type="text"
                        id={`featureTitle-${epic.id}`}
                        name="featureTitle"
                        value={getFeatureForm(epic.id).featureTitle || ""}
                        onChange={(e) => updateFeatureForm(epic.id, "featureTitle", e.target.value)}
                        placeholder="Enter feature title"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor={`userStories-${epic.id}`} className="block text-gray-700 font-bold mb-2">
                        User Stories
                      </label>
                      <textarea
                        id={`userStories-${epic.id}`}
                        name="userStories"
                        value={getFeatureForm(epic.id).userStories || ""}
                        onChange={(e) => updateFeatureForm(epic.id, "userStories", e.target.value)}
                        placeholder="Enter user stories"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        rows="2"
                        required
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label htmlFor={`acceptanceCriteria-${epic.id}`} className="block text-gray-700 font-bold mb-2">
                        Acceptance Criteria
                      </label>
                      <textarea
                        id={`acceptanceCriteria-${epic.id}`}
                        name="acceptanceCriteria"
                        value={getFeatureForm(epic.id).acceptanceCriteria || ""}
                        onChange={(e) => updateFeatureForm(epic.id, "acceptanceCriteria", e.target.value)}
                        placeholder="Enter acceptance criteria"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        rows="2"
                        required
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label htmlFor={`dependencies-${epic.id}`} className="block text-gray-700 font-bold mb-2">
                        Dependencies
                      </label>
                      <textarea
                        id={`dependencies-${epic.id}`}
                        name="dependencies"
                        value={getFeatureForm(epic.id).dependencies || ""}
                        onChange={(e) => updateFeatureForm(epic.id, "dependencies", e.target.value)}
                        placeholder="List dependencies"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        rows="2"
                      ></textarea>
                    </div>
                    <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor={`prioritizationTechnique-${epic.id}`} className="block text-gray-700 font-bold mb-2">
                          Prioritization Technique
                        </label>
                        <select
                          id={`prioritizationTechnique-${epic.id}`}
                          name="prioritizationTechnique"
                          value={getFeatureForm(epic.id).prioritizationTechnique || ""}
                          onChange={(e) => updateFeatureForm(epic.id, "prioritizationTechnique", e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                          required
                        >
                          <option value="">Select Technique</option>
                          <option value="MoSCoW">MoSCoW</option>
                          <option value="RICE">RICE</option>
                          <option value="Kano">Kano</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor={`priorityRanking-${epic.id}`} className="block text-gray-700 font-bold mb-2">
                          Priority Ranking
                        </label>
                        <input
                          type="text"
                          id={`priorityRanking-${epic.id}`}
                          name="priorityRanking"
                          value={getFeatureForm(epic.id).priorityRanking || ""}
                          onChange={(e) => updateFeatureForm(epic.id, "priorityRanking", e.target.value)}
                          placeholder="E.g., Must-have"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor={`timeline-${epic.id}`} className="block text-gray-700 font-bold mb-2">
                          Timeline
                        </label>
                        <input
                          type="text"
                          id={`timeline-${epic.id}`}
                          name="timeline"
                          value={getFeatureForm(epic.id).timeline || ""}
                          onChange={(e) => updateFeatureForm(epic.id, "timeline", e.target.value)}
                          placeholder="E.g., Q2 2025"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor={`assignedDeveloper-${epic.id}`} className="block text-gray-700 font-bold mb-2">
                        Assigned Developer
                      </label>
                      <input
                        type="text"
                        id={`assignedDeveloper-${epic.id}`}
                        name="assignedDeveloper"
                        value={getFeatureForm(epic.id).assignedDeveloper || ""}
                        onChange={(e) => updateFeatureForm(epic.id, "assignedDeveloper", e.target.value)}
                        placeholder="Enter developer name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <button type="submit" className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        {isEditingFeature(epic.id) ? "Update Feature" : "Add Feature"}
                      </button>
                      {isEditingFeature(epic.id) && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingFeature((prev) => ({
                              ...prev,
                              [epic.id]: { isEditing: false, featureId: null },
                            }));
                            setFeatureForms((prev) => ({
                              ...prev,
                              [epic.id]: {
                                featureTitle: "",
                                userStories: "",
                                acceptanceCriteria: "",
                                dependencies: "",
                                prioritizationTechnique: "",
                                priorityRanking: "",
                                timeline: "",
                                assignedDeveloper: "",
                              },
                            }));
                          }}
                          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EpicFeatureManager;