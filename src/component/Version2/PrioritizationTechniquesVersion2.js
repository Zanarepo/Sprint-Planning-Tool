

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "../../supabaseClient";
import PrioritizationFeature from '../PrioritizationFeature'

// You can import additional UI components if needed
// import PrioritizationFeature from './PrioritizationFeature';

const FeaturePrioritization = () => {
  // State to hold the logged-in user's email and ID.
  const [, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);

  // Define the available prioritization techniques along with descriptions,
  // fields (for building the feature form), and acronym explanations.
  const techniqueOptions = useMemo(
    () => ({
      moscow: {
        name: "MoSCoW",
        description:
          "MoSCoW categorizes features as Must, Should, Could, and Won't. Use this when requirements are clearly understood and need to be classified by criticality.",
        fields: [
          { name: "feature_name", label: "Feature Name", type: "text" },
          {
            name: "priority",
            label: "Priority",
            type: "select",
            options: ["Must", "Should", "Could", "Won't"],
          },
        ],
      },
      rice: {
        name: "RICE",
        description:
          "RICE evaluates features based on Reach, Impact, Confidence, and Effort. It is useful when you need to balance multiple feature requests using numeric estimates.",
        fields: [
          { name: "feature_name", label: "Feature Name", type: "text" },
          { name: "reach", label: "Reach", type: "number" },
          { name: "impact", label: "Impact", type: "number" },
          { name: "confidence", label: "Confidence (%)", type: "number" },
          { name: "effort", label: "Effort", type: "number" },
        ],
      },
      kano: {
        name: "Kano",
        description:
          "The Kano model categorizes features based on customer satisfaction. Use this to identify which features delight users versus those that are basic requirements.",
        fields: [
          { name: "feature_name", label: "Feature Name", type: "text" },
          {
            name: "category",
            label: "Category",
            type: "select",
            options: ["Basic", "Performance", "Excitement", "Indifferent", "Reverse"],
          },
        ],
      },
    }),
    []
  );

  const acronymExplanations = useMemo(
    () => ({
      moscow: {
        Must: "Critical requirement that is non-negotiable.",
        Should: "Important feature that is not critical but adds significant value.",
        Could: "Optional feature if time and resources permit.",
        "Won't": "Feature not planned for the current iteration.",
      },
      rice: {
        R: "Reach: Estimated number of users impacted.",
        I: "Impact: Degree of improvement in user experience.",
        C: "Confidence: Certainty in the estimates.",
        E: "Effort: Amount of work required.",
      },
      kano: {
        Basic: "Expected features that cause dissatisfaction if missing.",
        Performance: "Better performance leads to higher satisfaction.",
        Excitement: "Delights users when present, even if not expected.",
        Indifferent: "Features that have little to no effect on customer satisfaction.",
        Reverse: "Features that may cause dissatisfaction if implemented or overdone.",
      },
    }),
    []
  );

  // The selected technique (which also defines the UI and the data to store).
  const [selectedTechnique, setSelectedTechnique] = useState("moscow");

  // State for the feature form. It is dynamically built based on the selected technique.
  const [featureFormData, setFeatureFormData] = useState(
    (() => {
      const initial = {};
      techniqueOptions.moscow.fields.forEach((field) => {
        initial[field.name] = field.type === "number" ? 0 : "";
      });
      return initial;
    })()
  );

  // State to hold the list of features fetched from Supabase.
  const [features, setFeatures] = useState([]);

  // States to handle editing an existing feature.
  const [isEditingFeature, setIsEditingFeature] = useState(false);
  const [editingFeatureId, setEditingFeatureId] = useState(null);

  // On component mount, retrieve the user's email from localStorage
  // and then fetch the user ID from the users table.
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

  // Helper function to generate initial form data for the given technique.
  const getInitialFeatureFormData = useCallback(
    (techKey) => {
      const fields = techniqueOptions[techKey].fields;
      const initialData = {};
      fields.forEach((field) => {
        initialData[field.name] = field.type === "number" ? 0 : "";
      });
      return initialData;
    },
    [techniqueOptions]
  );

  // Whenever the selected technique changes (or userId becomes available),
  // reset the form and fetch the features for that technique.
  const fetchFeatures = useCallback(async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("feature_prioritization")
      .select("*")
      .eq("user_id", userId)
      .eq("technique_type", selectedTechnique)
      .order("created_at", { ascending: true });
    if (error) {
      console.error("Error fetching features:", error);
    } else {
      setFeatures(data);
    }
  }, [userId, selectedTechnique]);

  useEffect(() => {
    setFeatureFormData(getInitialFeatureFormData(selectedTechnique));
    setIsEditingFeature(false);
    setEditingFeatureId(null);
    if (userId) {
      fetchFeatures();
    }
  }, [selectedTechnique, getInitialFeatureFormData, userId, fetchFeatures]);
  // Handle technique selection change.
  const handleTechniqueChange = (e) => {
    setSelectedTechnique(e.target.value);
  };

  // Handle changes in the feature form inputs.
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFeatureFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  // Handle form submission for adding or updating a feature.
  const handleFeatureSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error("User not logged in.");
      return;
    }

    if (isEditingFeature) {
      // Update the existing feature.
      const { error } = await supabase
        .from("feature_prioritization")
        .update({
          ...featureFormData,
          technique_type: selectedTechnique,
        })
        .eq("id", editingFeatureId)
        .eq("user_id", userId);
      if (error) {
        console.error("Error updating feature:", error);
      } else {
        setIsEditingFeature(false);
        setEditingFeatureId(null);
        setFeatureFormData(getInitialFeatureFormData(selectedTechnique));
        fetchFeatures();
      }
    } else {
      // Insert a new feature.
      const { error } = await supabase
        .from("feature_prioritization")
        .insert([
          {
            user_id: userId,
            technique_type: selectedTechnique,
            ...featureFormData,
          },
        ]);
      if (error) {
        console.error("Error inserting feature:", error);
      } else {
        setFeatureFormData(getInitialFeatureFormData(selectedTechnique));
        fetchFeatures();
      }
    }
  };

  // Populate the form for editing a feature.
  const handleEditFeature = (feature) => {
    setFeatureFormData(feature);
    setIsEditingFeature(true);
    setEditingFeatureId(feature.id);
  };

  // Delete a single feature.
  const handleDeleteFeature = async (featureId) => {
    const { error } = await supabase
      .from("feature_prioritization")
      .delete()
      .eq("id", featureId)
      .eq("user_id", userId);
    if (error) {
      console.error("Error deleting feature:", error);
    } else {
      fetchFeatures();
    }
  };

  // Delete the entire “table” (i.e. all features for the current technique).
  const handleDeleteEntireTable = async () => {
    const { error } = await supabase
      .from("feature_prioritization")
      .delete()
      .eq("user_id", userId)
      .eq("technique_type", selectedTechnique);
    if (error) {
      console.error("Error deleting entire table:", error);
    } else {
      fetchFeatures();
    }
  };

  // Optional: a print handler.
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto p-4" id="printableArea">
      <PrioritizationFeature/>
      {/* Technique Selection */}
      <div className="mb-4">
        <label
          htmlFor="technique"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Select Prioritization Method:
        </label>
        <select
          id="technique"
          value={selectedTechnique}
          onChange={handleTechniqueChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {Object.entries(techniqueOptions).map(([key, tech]) => (
            <option key={key} value={key}>
              {tech.name}
            </option>
          ))}
        </select>
      </div>

      {/* Technique Description */}
      <div className="mb-6">
        <p className="text-gray-600">
          {techniqueOptions[selectedTechnique].description}
        </p>
      </div>

      {/* Feature Form */}
      <div className="mb-6 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-xl font-semibold mb-4">
          {isEditingFeature ? "Edit Feature" : "Add New Feature"}
        </h2>
        <form onSubmit={handleFeatureSubmit}>
          {techniqueOptions[selectedTechnique].fields.map((field) => (
            <div className="mb-4" key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                {field.label}
              </label>
              {field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={featureFormData[field.name]}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={featureFormData[field.name]}
                  onChange={handleInputChange}
                  placeholder={field.label}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              )}
            </div>
          ))}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isEditingFeature ? "Update Feature" : "Add Feature"}
            </button>
            {isEditingFeature && (
              <button
                type="button"
                onClick={() => {
                  setIsEditingFeature(false);
                  setEditingFeatureId(null);
                  setFeatureFormData(getInitialFeatureFormData(selectedTechnique));
                }}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Features Table */}
      <div className="mb-6 bg-white shadow-md rounded px-8 pt-6 pb-8 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">
          Prioritized Features ({techniqueOptions[selectedTechnique].name})
        </h2>
        {features.length === 0 ? (
          <p className="text-gray-600">No features added yet.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {techniqueOptions[selectedTechnique].fields.map((field) => (
                  <th
                    key={field.name}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {field.label}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {features.map((feature) => (
                <tr key={feature.id}>
                  {techniqueOptions[selectedTechnique].fields.map((field) => (
                    <td key={field.name} className="px-6 py-4 whitespace-nowrap">
                      {feature[field.name]}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEditFeature(feature)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteFeature(feature.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Delete Entire Table Button */}
      <div className="mb-6">
        <button
          onClick={handleDeleteEntireTable}
          className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
        >
          Delete Entire Table
        </button>
      </div>

      {/* Acronym Explanations Table */}
      <div className="mt-6 bg-white shadow-md rounded px-8 pt-6 pb-8 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-2">
          Acronym Explanations - {techniqueOptions[selectedTechnique].name}
        </h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acronym / Term
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Explanation
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(acronymExplanations[selectedTechnique]).map(
              ([key, explanation]) => (
                <tr key={key}>
                  <td className="px-6 py-4 whitespace-nowrap font-bold">{key}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{explanation}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Organogram View */}
      <div className="mt-6 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-xl font-semibold mb-2">
          Organogram - {techniqueOptions[selectedTechnique].name}
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {Object.entries(acronymExplanations[selectedTechnique]).map(
            ([key, explanation]) => (
              <div
                key={key}
                className="flex flex-col items-center p-4 border rounded shadow-md"
              >
                <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
                  {key}
                </div>
                <p className="mt-2 text-center text-sm">{explanation}</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Print Button */}
      <div className="text-center mt-6">
        <button
          onClick={handlePrint}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Print Page
        </button>
      </div>
    </div>
  );
};

export default FeaturePrioritization;



























