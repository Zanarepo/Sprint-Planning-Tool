import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabaseClient";
import { FaTrash, FaEye, FaArrowLeft } from "react-icons/fa";

const RoadmapDisplay = () => {
  const [, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [roadmaps, setRoadmaps] = useState([]);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);

  // Retrieve user email and then fetch the corresponding userId
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

  // Fetch roadmaps for the logged-in user
  const fetchRoadmaps = useCallback(async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("product_roadmap")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching roadmaps:", error);
    } else {
      setRoadmaps(data);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchRoadmaps();
    }
  }, [userId, fetchRoadmaps]);

  // Helper: Render a value in a structured way.
  // Filters out any key named "id" (case-insensitive)
  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              {Object.keys(value[0] || {})
                .filter((key) => key.toLowerCase() !== "id")
                .map((key, idx) => (
                  <th key={idx} className="border border-gray-300 p-1 text-sm">
                    {key}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {value.map((item, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                {Object.entries(item)
                  .filter(([key]) => key.toLowerCase() !== "id")
                  .map(([key, val], i) => (
                    <td key={i} className="border border-gray-300 p-1 text-sm">
                      {typeof val === "object" && val !== null
                        ? renderValue(val)
                        : val?.toString()}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (typeof value === "object" && value !== null) {
      return (
        <div className="pl-2">
          {Object.entries(value)
            .filter(([key]) => key.toLowerCase() !== "id")
            .map(([key, val]) => (
              <div key={key}>
                <span className="font-semibold">{key}: </span>
                {typeof val === "object" && val !== null
                  ? renderValue(val)
                  : val?.toString()}
              </div>
            ))}
        </div>
      );
    }
    return value?.toString();
  };

  // Render the features cell with a toggle when the feature title is clicked.
  const renderFeaturesCell = (features, goalIndex) => {
    if (!Array.isArray(features) || features.length === 0) {
      return <span className="text-gray-600">No features</span>;
    }
    return (
      <div className="space-y-1">
        {features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            className="flex items-center justify-between cursor-pointer"
            onClick={() =>
              handleToggleFeature(goalIndex, featureIndex, feature.done)
            }
          >
            <span
              className={`text-sm ${
                feature.done
                  ? "line-through text-green-500"
                  : "text-gray-800 hover:underline"
              }`}
            >
              {feature.title}
            </span>
            <span className="text-xs text-gray-500">
              {feature.done ? "Read" : "Unread"}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Toggle the "done" status for a specific feature within a goal.
  const handleToggleFeature = async (goalIndex, featureIndex, currentDone) => {
    if (!selectedRoadmap) return;
    // Clone the current roadmap goals array
    const updatedRoadmap = [...selectedRoadmap.roadmap];
    const updatedGoal = { ...updatedRoadmap[goalIndex] };
    if (Array.isArray(updatedGoal.features)) {
      updatedGoal.features = updatedGoal.features.map((feature, idx) => {
        if (idx === featureIndex) {
          return { ...feature, done: !currentDone };
        }
        return feature;
      });
    }
    updatedRoadmap[goalIndex] = updatedGoal;
    await updateRoadmap(selectedRoadmap.id, updatedRoadmap);
  };

  // Update a roadmap record with the new JSON (after a feature toggle)
  const updateRoadmap = async (roadmapId, newRoadmapJSON) => {
    const { error } = await supabase
      .from("product_roadmap")
      .update({
        roadmap: newRoadmapJSON,
        updated_at: new Date().toISOString(),
      })
      .eq("id", roadmapId)
      .eq("user_id", userId);
    if (error) {
      console.error("Error updating roadmap:", error);
    } else {
      fetchRoadmaps();
      setSelectedRoadmap((prev) => ({ ...prev, roadmap: newRoadmapJSON }));
    }
  };

  // Delete the entire roadmap record
  const deleteRoadmap = async (roadmapId) => {
    const { error } = await supabase
      .from("product_roadmap")
      .delete()
      .eq("id", roadmapId)
      .eq("user_id", userId);
    if (error) {
      console.error("Error deleting roadmap:", error);
    } else {
      fetchRoadmaps();
      if (selectedRoadmap && selectedRoadmap.id === roadmapId) {
        setSelectedRoadmap(null);
      }
    }
  };

  // Render the goals table (detailed view) with one header row for all goals.
  const renderGoalsTable = (goals) => {
    if (!goals || goals.length === 0) {
      return <p className="p-2 text-gray-600">No goals available.</p>;
    }
    // Compute the union of keys across all goal objects (excluding "id")
    const headersSet = new Set();
    goals.forEach((goal) => {
      Object.keys(goal).forEach((key) => {
        if (key.toLowerCase() !== "id") headersSet.add(key);
      });
    });
    const headers = Array.from(headersSet);
    return (
      <table className="min-w-full border border-gray-300 mt-2">
        <thead>
          <tr className="bg-blue-500 text-white">
            {headers.map((header, idx) => (
              <th key={idx} className="border border-gray-300 p-2 text-sm">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {goals.map((goal, rowIdx) => (
            <tr key={rowIdx} className={rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              {headers.map((header, idx) => (
                <td key={idx} className="border border-gray-300 p-2 text-sm">
                  {header.toLowerCase() === "features"
                    ? renderFeaturesCell(goal[header], rowIdx)
                    : renderValue(goal[header])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Render the main list view.
  // The table shows the roadmap title, nested goals, and actions (with a fixed width).
  const renderRoadmapList = () => {
    if (roadmaps.length === 0) {
      return <p className="text-gray-600">No roadmaps found.</p>;
    }
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="border border-gray-300 p-3">Title</th>
              <th className="border border-gray-300 p-3">Goals</th>
              <th className="border border-gray-300 p-3 w-28 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roadmaps.map((rm, idx) => (
              <tr key={rm.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-300 p-3">{rm.roadmap_header}</td>
                <td className="border border-gray-300 p-3">
                  {Array.isArray(rm.roadmap) ? (
                    <table className="min-w-full border border-gray-300">
                      <thead>
                        <tr className="bg-gray-200">
                          {Object.keys(rm.roadmap[0] || {})
                            .filter((key) => key.toLowerCase() !== "id")
                            .map((key, idx) => (
                              <th key={idx} className="border border-gray-300 p-1 text-xs">
                                {key}
                              </th>
                            ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rm.roadmap.map((goal, rowIdx) => (
                          <tr key={rowIdx} className={rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            {Object.entries(goal)
                              .filter(([key]) => key.toLowerCase() !== "id")
                              .map(([key, val], colIdx) => (
                                <td key={colIdx} className="border border-gray-300 p-1 text-xs">
                                  {renderValue(val)}
                                </td>
                              ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    renderValue(rm.roadmap)
                  )}
                </td>
                <td className="border border-gray-300 p-3 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <button
                      onClick={() => setSelectedRoadmap(rm)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded inline-flex items-center text-xs"
                    >
                      <FaEye className="mr-1" /> View
                    </button>
                    <button
                      onClick={() => deleteRoadmap(rm.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded inline-flex items-center text-xs"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Render the detailed view for a selected roadmap.
  const renderRoadmapDetail = () => {
    if (!selectedRoadmap) return null;
    return (
      <div className="mb-4">
        <button
          onClick={() => setSelectedRoadmap(null)}
          className="mb-4 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded inline-flex items-center"
        >
          <FaArrowLeft className="mr-1" /> Back to List
        </button>
        <h2 className="text-2xl font-bold mb-2">{selectedRoadmap.roadmap_header}</h2>
        <p className="mb-2 text-gray-700">
          Format: {selectedRoadmap.format} | Columns: {selectedRoadmap.column_count}
        </p>
        <div>{renderGoalsTable(selectedRoadmap.roadmap)}</div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Roadmap Dashboard</h1>
      {selectedRoadmap ? renderRoadmapDetail() : renderRoadmapList()}
    </div>
  );
};

export default RoadmapDisplay;
