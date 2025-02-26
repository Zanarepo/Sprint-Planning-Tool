import { useState, useEffect, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AgileSprintSimulation from "./AgileSprintSimulation";
import { supabase } from "../supabaseClient";

export default function SprintSimulation() {
  // Simulation state
  const [stage, setStage] = useState("product_backlog");
  const [features, setFeatures] = useState([]);
  const [sprintBacklog, setSprintBacklog] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [editingFeature, setEditingFeature] = useState(null);
  const [editText, setEditText] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  // User state
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);

  // Simulation stages
  const stages = [
    "product_backlog",
    "prioritization",
    "sprint_planning",
    "sprint_execution",
    "review",
  ];

  // -------------------------------
  // Fetch Functions with useCallback
  // -------------------------------
  const fetchFeatures = useCallback(async () => {
    if (userId) {
      const { data, error } = await supabase
        .from("features")
        .select("*")
        .eq("user_id", userId);
      if (error) {
        console.error("Error fetching features:", error);
      } else {
        setFeatures(data);
      }
    }
  }, [userId]);

  const fetchSprintBacklog = useCallback(async () => {
    if (userId) {
      // Join with features table to get name and effort.
      const { data, error } = await supabase
        .from("sprint_backlog")
        .select("*, features(name, effort)")
        .eq("user_id", userId);
      if (error) {
        console.error("Error fetching sprint backlog:", error);
      } else {
        setSprintBacklog(data);
      }
    }
  }, [userId]);

  // -------------------------------
  // User Info and Initial Data Fetch
  // -------------------------------
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

  useEffect(() => {
    if (userId) {
      fetchFeatures();
      fetchSprintBacklog();
    }
  }, [userId, fetchFeatures, fetchSprintBacklog]);

  // -------------------------------
  // Stage Navigation
  // -------------------------------
  const nextStage = () => {
    const currentIndex = stages.indexOf(stage);
    if (currentIndex < stages.length - 1) {
      setStage(stages[currentIndex + 1]);
      setInput("");
      setError("");
    }
  };

  const prevStage = () => {
    const currentIndex = stages.indexOf(stage);
    if (currentIndex > 0) {
      setStage(stages[currentIndex - 1]);
    }
  };

  // -------------------------------
  // Feature Creation (Using snake_case fields)
  // -------------------------------
  const handleFeatureCreation = async () => {
    if (!input.trim()) {
      setError("Please enter at least one feature");
      return;
    }

    const newFeatures = input
      .split("\n")
      .filter((f) => f.trim())
      .map((f, index) => ({
        id: `temp-${Date.now()}-${index}`, // temporary id for UI; DB will provide a UUID
        name: f.trim(),
        user_need: 3,
        business_value: 3,
        effort: 3,
        status: "todo",
      }));

    // Optimistically update the UI
    setFeatures([...features, ...newFeatures]);
    setInput("");

    // Insert into Supabase
    const inserts = newFeatures.map((f) => ({
      name: f.name,
      user_need: f.user_need,
      business_value: f.business_value,
      effort: f.effort,
      user_id: userId,
    }));

    const { data, error } = await supabase
      .from("features")
      .insert(inserts)
      .select();

    if (error) {
      console.error("Error inserting features:", error);
    } else if (data) {
      // Replace temporary features with those returned from Supabase
      setFeatures((prev) =>
        prev.filter((f) => !String(f.id).startsWith("temp-")).concat(data)
      );
    }
  };

  // -------------------------------
  // Feature Updates
  // -------------------------------
  const handlePrioritizationChange = async (featureId, field, value) => {
    setFeatures((prev) =>
      prev.map((f) =>
        f.id === featureId ? { ...f, [field]: Number(value) } : f
      )
    );

    if (!String(featureId).startsWith("temp-")) {
      const updateObj = {};
      if (field === "user_need") updateObj.user_need = Number(value);
      if (field === "business_value") updateObj.business_value = Number(value);
      if (field === "effort") updateObj.effort = Number(value);

      const { error } = await supabase
        .from("features")
        .update(updateObj)
        .eq("id", featureId);
      if (error) console.error("Error updating feature:", error);
    }
  };

  const calculatePriorityScore = (feature) => {
    return ((feature.user_need + feature.business_value) / 2) - (feature.effort * 0.2);
  };

  const prioritizedFeatures = [...features].sort(
    (a, b) => calculatePriorityScore(b) - calculatePriorityScore(a)
  );

  // -------------------------------
  // Adding to Sprint Backlog
  // -------------------------------
  const addToSprint = async (featureId) => {
    const feature = features.find((f) => f.id === featureId);
    if (!feature) return;

    const { error } = await supabase.from("sprint_backlog").insert({
      feature_id: featureId,
      status: "todo",
      order_index: sprintBacklog.length,
      user_id: userId,
    });
    if (error) {
      console.error("Error adding feature to sprint:", error);
    } else {
      fetchSprintBacklog();
    }
  };

  // -------------------------------
  // Edit Feature
  // -------------------------------
  const handleEditStart = (feature) => {
    setEditingFeature(feature);
    setEditText(feature.name);
    setShowEditModal(true);
  };

  const handleEditSave = async () => {
    setFeatures((prev) =>
      prev.map((f) =>
        f.id === editingFeature.id ? { ...f, name: editText } : f
      )
    );
    setShowEditModal(false);

    if (!String(editingFeature.id).startsWith("temp-")) {
      const { error } = await supabase
        .from("features")
        .update({ name: editText })
        .eq("id", editingFeature.id);
      if (error) console.error("Error updating feature name:", error);
      else {
        // Refresh both features and sprint backlog
        fetchFeatures();
        fetchSprintBacklog();
      }
    }
  };

  // -------------------------------
  // Removal Functions
  // -------------------------------
  // Remove a feature (from features table and via cascade its sprint_backlog records)
  const handleRemoveFeature = async (featureId) => {
    if (!window.confirm("Are you sure you want to remove this feature?")) return;
    
    if (!String(featureId).startsWith("temp-")) {
      const { error } = await supabase
        .from("features")
        .delete()
        .eq("id", featureId);
      if (error) {
        console.error("Error removing feature:", error);
        return;
      }
    }
    // Re-fetch data so the UI reflects the deletion.
    fetchFeatures();
    fetchSprintBacklog();
  };

  // Remove a sprint backlog record only (without deleting the feature)
  const handleRemoveSprintBacklog = async (sprintItemId) => {
    if (
      !window.confirm(
        "Are you sure you want to remove this feature from the sprint backlog?"
      )
    )
      return;

    const { error } = await supabase
      .from("sprint_backlog")
      .delete()
      .eq("id", sprintItemId);
    if (error) {
      console.error("Error removing sprint backlog item:", error);
    } else {
      fetchSprintBacklog();
    }
  };

  // -------------------------------
  // Drag and Drop for Sprint Backlog
  // -------------------------------
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(sprintBacklog);
    const [reorderedItem] = items.splice(result.source.index, 1);
    reorderedItem.status = result.destination.droppableId;
    items.splice(result.destination.index, 0, reorderedItem);
    setSprintBacklog(items);

    if (!String(reorderedItem.id).startsWith("temp-")) {
      const { error } = await supabase
        .from("sprint_backlog")
        .update({ status: reorderedItem.status })
        .eq("id", reorderedItem.id)
        .eq("user_id", userId);
      if (error) console.error("Error updating sprint backlog item:", error);
    }
  };

  // -------------------------------
  // Render
  // -------------------------------
  return (
    <div className="p-6 space-y-6 bg-gray-50 rounded-lg shadow-md mt-4">
      <AgileSprintSimulation />
      <h1 className="text-2xl font-bold text-blue-700 text-center">
        Agile Sprint Simulation
      </h1>

      {/* Display logged in user email */}
      {userEmail && (
        <p className="text-gray-700 text-center">Logged in as: {userEmail}</p>
      )}

      {/* Edit Feature Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Edit Feature</h3>
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Backlog Creation */}
      {stage === "product_backlog" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Step 1: Product Backlog Creation</h2>
          <p className="text-gray-600">
            List all potential features (one per line):
          </p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
            placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
          />
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={handleFeatureCreation}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Features to List
            </button>
            {features.length > 0 && (
              <button
                onClick={nextStage}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Proceed to Prioritization
              </button>
            )}
          </div>
          {features.length > 0 && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Feature</th>
                    <th className="border p-2 w-32">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature) => (
                    <tr key={feature.id} className="border">
                      <td className="p-2">{feature.name}</td>
                      <td className="p-2 flex gap-2">
                        <button
                          onClick={() => handleEditStart(feature)}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleRemoveFeature(feature.id)}
                          className="px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Feature Prioritization */}
      {stage === "prioritization" && (
        <div className="space-y-4 overflow-x-auto">
          <h2 className="text-xl font-semibold">Step 2: Feature Prioritization</h2>
          <table className="w-full border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Feature</th>
                <th className="border p-2">User Needs (1-5)</th>
                <th className="border p-2">Business Value (1-5)</th>
                <th className="border p-2">Effort Estimate (1-5)</th>
                <th className="border p-2">Priority Score</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {prioritizedFeatures.map((feature) => (
                <tr key={feature.id} className="border">
                  <td className="p-2">{feature.name}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={feature.user_need}
                        onChange={(e) =>
                          handlePrioritizationChange(
                            feature.id,
                            "user_need",
                            e.target.value
                          )
                        }
                        className="w-32 accent-green-500"
                      />
                      <span className="w-6 text-center font-medium">
                        {feature.user_need}
                      </span>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={feature.business_value}
                        onChange={(e) =>
                          handlePrioritizationChange(
                            feature.id,
                            "business_value",
                            e.target.value
                          )
                        }
                        className="w-32 accent-blue-500"
                      />
                      <span className="w-6 text-center font-medium">
                        {feature.business_value}
                      </span>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={feature.effort}
                        onChange={(e) =>
                          handlePrioritizationChange(
                            feature.id,
                            "effort",
                            e.target.value
                          )
                        }
                        className="w-32 accent-red-500"
                      />
                      <span className="w-6 text-center font-medium">
                        {feature.effort}
                      </span>
                    </div>
                  </td>
                  <td className="p-2 font-semibold">
                    {calculatePriorityScore(feature).toFixed(1)}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleRemoveFeature(feature.id)}
                      className="px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Sprint Planning */}
      {stage === "sprint_planning" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Step 3: Sprint Planning</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="overflow-x-auto">
              <h3 className="font-semibold mb-2">Prioritized Backlog</h3>
              <table className="w-full border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Priority</th>
                    <th className="border p-2">Feature</th>
                    <th className="border p-2">Score</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {prioritizedFeatures.map((feature, index) => (
                    <tr key={feature.id} className="border">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{feature.name}</td>
                      <td className="p-2">
                        {calculatePriorityScore(feature).toFixed(1)}
                      </td>
                      <td className="p-2 space-x-2">
                        <button
                          onClick={() => handleEditStart(feature)}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => addToSprint(feature.id)}
                          className="px-2 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200"
                          disabled={sprintBacklog.some((item) => item.feature_id === feature.id)}
                        >
                          {sprintBacklog.some((item) => item.feature_id === feature.id)
                            ? "Added"
                            : "Add to Sprint"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="overflow-x-auto">
              <h3 className="font-semibold mb-2">Sprint Backlog</h3>
              {sprintBacklog.length === 0 ? (
                <p className="text-gray-500">No features added yet</p>
              ) : (
                <table className="w-full border-collapse min-w-[400px]">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2">Feature</th>
                      <th className="border p-2">Effort</th>
                      <th className="border p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sprintBacklog.map((item) => (
                      <tr key={item.id} className="border">
                        <td className="p-2">
                          {/* Display the joined feature name if available */}
                          {item.features?.name || "(no name)"}
                        </td>
                        <td className="p-2">
                          {item.features?.effort || item.effort || "-"}
                        </td>
                        <td className="p-2">
                          <button
                            onClick={() => handleRemoveSprintBacklog(item.id)}
                            className="px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sprint Execution */}
      {stage === "sprint_execution" && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Step 4: Sprint Execution</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["todo", "inProgress", "done"].map((column) => (
                <Droppable key={column} droppableId={column}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`p-4 rounded-lg min-h-[200px] ${
                        column === "todo"
                          ? "bg-orange-100"
                          : column === "inProgress"
                          ? "bg-blue-100"
                          : "bg-green-100"
                      }`}
                    >
                      <h3 className="font-semibold mb-2">
                        {column === "todo"
                          ? "To Do"
                          : column === "inProgress"
                          ? "In Progress"
                          : "Done"}
                      </h3>
                      {sprintBacklog
                        .filter((item) => item.status === column)
                        .map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-white p-3 rounded mb-2 shadow-md hover:shadow-lg transition-shadow"
                              >
                                <div className="flex justify-between items-center">
                                  <span>{item.features?.name || "(no name)"}</span>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleEditStart(item)}
                                      className="text-blue-600 hover:text-blue-800"
                                    >
                                      ✏️
                                    </button>
                                    <button
                                      onClick={() => handleRemoveSprintBacklog(item.id)}
                                      className="text-red-600 hover:text-red-800"
                                    >
                                      🗑️
                                    </button>
                                  </div>
                                </div>
                                <div className="mt-2 text-sm text-gray-500">
                                  Effort: {item.features?.effort || item.effort || "-"}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </div>
        </DragDropContext>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        {stage !== "product_backlog" && (
          <button
            onClick={prevStage}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Back
          </button>
        )}
        {stage === "prioritization" && (
          <button
            onClick={nextStage}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Proceed to Sprint Planning
          </button>
        )}
        {stage === "sprint_planning" && (
          <button
            onClick={nextStage}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={sprintBacklog.length === 0}
          >
            Start Sprint
          </button>
        )}
        {stage === "sprint_execution" && (
          <button
            onClick={nextStage}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Complete Sprint
          </button>
        )}
        {stage === "review" && (
          <button
            onClick={() => setStage("product_backlog")}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Start New Sprint
          </button>
        )}
      </div>

      {/* Sprint Review */}
      {stage === "review" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Sprint Review & Retrospective</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Completed Work</h3>
              <ul className="list-disc pl-6">
                {sprintBacklog.map((item) => (
                  <li key={item.id} className="mb-2">
                    {item.features?.name || "(no name)"} (Effort: {item.features?.effort || item.effort || "-"})
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Velocity Metrics</h3>
              <p>Total Effort: {sprintBacklog.reduce((sum, item) => sum + (item.features?.effort || item.effort || 0), 0)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}





