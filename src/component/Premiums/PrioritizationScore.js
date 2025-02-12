import React, { useState } from 'react';
import PrioritizationScoreFeature from './PrioritizationScoreFeature'

// Define the calculation methods, required fields, and calculation functions.
const techniqueOptions = {
  rice: {
    name: 'RICE 🚀',
    bestFor: 'Strategic feature planning',
    fields: [
      { name: 'reach', label: 'Reach', type: 'number', placeholder: 'Enter reach value' },
      { name: 'impact', label: 'Impact', type: 'number', placeholder: 'Enter impact value' },
      { name: 'confidence', label: 'Confidence', type: 'number', placeholder: 'Enter confidence (0-100)' },
      { name: 'effort', label: 'Effort', type: 'number', placeholder: 'Enter effort value' },
    ],
    // Calculation: (reach * impact * (confidence/100)) / effort
    calculate: (data) => {
      const { reach, impact, confidence, effort } = data;
      return effort ? ((reach * impact * (confidence / 100)) / effort).toFixed(2) : 0;
    },
  },
  ice: {
    name: 'ICE ❄️',
    bestFor: 'Quick growth experiments',
    fields: [
      { name: 'impact', label: 'Impact', type: 'number', placeholder: 'Enter impact value' },
      { name: 'confidence', label: 'Confidence', type: 'number', placeholder: 'Enter confidence (0-100)' },
      { name: 'ease', label: 'Ease', type: 'number', placeholder: 'Enter ease value' },
    ],
    // Calculation: impact * (confidence/100) * ease
    calculate: (data) => {
      const { impact, confidence, ease } = data;
      return (impact * (confidence / 100) * ease).toFixed(2);
    },
  },
  moscow: {
    name: 'MoSCoW 🎯',
    bestFor: 'MVP and Agile prioritization',
    fields: [
      {
        name: 'category',
        label: 'Category',
        type: 'select',
        options: ['Must', 'Should', 'Could', "Won't"],
      },
    ],
    // Mapping category to score (for simplicity).
    calculate: (data) => {
      const mapping = { 'Must': 4, 'Should': 3, 'Could': 2, "Won't": 1 };
      return mapping[data.category] || 0;
    },
  },
  valueVsEffort: {
    name: 'Value vs. Effort 📊',
    bestFor: 'Visual trade-offs in roadmaps',
    fields: [
      { name: 'value', label: 'Value', type: 'number', placeholder: 'Enter value' },
      { name: 'effort', label: 'Effort', type: 'number', placeholder: 'Enter effort' },
    ],
    // Calculation: value / effort
    calculate: (data) => {
      const { value, effort } = data;
      return effort ? (value / effort).toFixed(2) : 0;
    },
  },
  weighted: {
    name: 'Weighted Scoring ⚖️',
    bestFor: 'Business impact & ROI-driven decisions',
    fields: [
      { name: 'score1', label: 'Score 1', type: 'number', placeholder: 'Enter score for criterion 1' },
      { name: 'weight1', label: 'Weight 1', type: 'number', placeholder: 'Enter weight for criterion 1' },
      { name: 'score2', label: 'Score 2', type: 'number', placeholder: 'Enter score for criterion 2' },
      { name: 'weight2', label: 'Weight 2', type: 'number', placeholder: 'Enter weight for criterion 2' },
      { name: 'score3', label: 'Score 3', type: 'number', placeholder: 'Enter score for criterion 3' },
      { name: 'weight3', label: 'Weight 3', type: 'number', placeholder: 'Enter weight for criterion 3' },
    ],
    // Calculation: Sum(score * weight) for each criterion.
    calculate: (data) => {
      const { score1, weight1, score2, weight2, score3, weight3 } = data;
      return ((score1 * weight1) + (score2 * weight2) + (score3 * weight3)).toFixed(2);
    },
  },
};

// Table of frameworks with a brief explanation of what they’re best for.
const frameworkCases = [
  { framework: 'RICE 🚀', bestFor: 'Strategic feature planning' },
  { framework: 'ICE ❄️', bestFor: 'Quick growth experiments' },
  { framework: 'MoSCoW 🎯', bestFor: 'MVP and Agile prioritization' },
  { framework: 'Value vs. Effort 📊', bestFor: 'Visual trade-offs in roadmaps' },
  { framework: 'Weighted Scoring ⚖️', bestFor: 'Business impact & ROI-driven decisions' },
];

// Helper to initialize fields based on technique.
const getInitialFieldsForTechnique = (techniqueKey) => {
  const fields = techniqueOptions[techniqueKey].fields;
  let initial = {};
  fields.forEach((field) => {
    if (field.type === 'number') {
      initial[field.name] = 0;
    } else if (field.type === 'select' && field.options && field.options.length > 0) {
      initial[field.name] = field.options[0];
    } else {
      initial[field.name] = '';
    }
  });
  return initial;
};

// Interpret the calculated score and provide comment and recommendation.
const getScoreInterpretation = (techniqueKey, score) => {
  let comment = "";
  let recommendation = "";
  const numericScore = parseFloat(score);
  
  if (techniqueKey === "rice") {
    if (numericScore >= 10) {
      comment = "Excellent score: high potential relative to effort.";
      recommendation = "Prioritize this feature for strategic impact.";
    } else if (numericScore >= 5) {
      comment = "Moderate score: balanced trade-offs.";
      recommendation = "Review this feature further before deciding.";
    } else {
      comment = "Low score: limited impact or high cost.";
      recommendation = "Reassess or consider deprioritizing this feature.";
    }
  } else if (techniqueKey === "ice") {
    if (numericScore >= 10) {
      comment = "Outstanding potential for rapid growth.";
      recommendation = "Push forward with implementation.";
    } else if (numericScore >= 5) {
      comment = "Moderate potential, merits further investigation.";
      recommendation = "Test this feature in experiments.";
    } else {
      comment = "Low potential: might not yield quick wins.";
      recommendation = "Reevaluate this feature's viability.";
    }
  } else if (techniqueKey === "moscow") {
    // For MoSCoW, score is based on category mapping.
    const mapping = { '4': "Must", '3': "Should", '2': "Could", '1': "Won't" };
    const category = mapping[score] || "Unknown";
    if (category === "Must") {
      comment = "Critical requirement.";
      recommendation = "Implement immediately as top priority.";
    } else if (category === "Should") {
      comment = "Important feature.";
      recommendation = "Plan to implement if resources permit.";
    } else if (category === "Could") {
      comment = "Optional feature with added benefits.";
      recommendation = "Consider for later phases.";
    } else {
      comment = "Not prioritized.";
      recommendation = "Defer or drop this feature from current scope.";
    }
  } else if (techniqueKey === "valueVsEffort") {
    if (numericScore >= 2) {
      comment = "High value relative to effort.";
      recommendation = "Strong candidate for implementation.";
    } else if (numericScore >= 1) {
      comment = "Moderate value; requires careful consideration.";
      recommendation = "Evaluate for potential improvements.";
    } else {
      comment = "Low value compared to effort.";
      recommendation = "Consider deprioritizing this feature.";
    }
  } else if (techniqueKey === "weighted") {
    if (numericScore >= 20) {
      comment = "High weighted score indicating strong business impact.";
      recommendation = "Prioritize for immediate execution.";
    } else if (numericScore >= 10) {
      comment = "Moderate score, suggesting moderate ROI.";
      recommendation = "Review and consider for future phases.";
    } else {
      comment = "Low score with limited ROI.";
      recommendation = "Reassess or postpone this feature.";
    }
  }
  return { comment, recommendation };
};

// Generate a details string from technique-specific fields.
const getDetails = (item) => {
  const fields = techniqueOptions[item.technique].fields;
  return fields.map((f) => `${f.label}: ${item[f.name]}`).join(', ');
};

const PrioritizationCalculator = () => {
  // Form state holds a common "featureName", chosen technique, and technique-specific fields.
  const [formData, setFormData] = useState({
    featureName: '',
    technique: 'rice', // default technique
    ...getInitialFieldsForTechnique('rice'),
  });

  // List to store features (each with a calculated score).
  const [featuresList, setFeaturesList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // When technique selection changes, update the formData with new default fields.
  const handleTechniqueChange = (e) => {
    const newTechnique = e.target.value;
    setFormData({
      featureName: formData.featureName,
      technique: newTechnique,
      ...getInitialFieldsForTechnique(newTechnique),
    });
  };

  // Handle changes for all form inputs.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to calculate the score and add or update a feature.
  const handleSubmit = (e) => {
    e.preventDefault();
    const currentTechnique = formData.technique;
    // Extract only technique-specific fields.
    let techniqueData = {};
    techniqueOptions[currentTechnique].fields.forEach((field) => {
      techniqueData[field.name] = formData[field.name];
    });
    // Calculate the score.
    const calculatedScore = techniqueOptions[currentTechnique].calculate(techniqueData);

    if (isEditing) {
      setFeaturesList((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...formData, id: editingId, calculatedScore } : item
        )
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      setFeaturesList((prev) => [
        ...prev,
        { ...formData, id: Date.now(), calculatedScore },
      ]);
    }
    // Reset the form but preserve the selected technique.
    setFormData({
      featureName: '',
      technique: formData.technique,
      ...getInitialFieldsForTechnique(formData.technique),
    });
  };

  // Populate the form for editing a feature.
  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
    setEditingId(item.id);
  };

  // Delete a feature.
  const handleDelete = (id) => {
    setFeaturesList((prev) => prev.filter((item) => item.id !== id));
  };

  // Print the entire page.
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto p-4" id="printableArea">
        <PrioritizationScoreFeature/>
      <h1 className="text-3xl font-bold text-center mb-6">Prioritization Calculator</h1>

      {/* Form for adding/updating a prioritized feature */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
        {/* Feature Name */}
        <div className="mb-4">
          <label htmlFor="featureName" className="block text-gray-700 font-bold mb-2">
            Feature Name
          </label>
          <input
            type="text"
            id="featureName"
            name="featureName"
            value={formData.featureName}
            onChange={handleChange}
            placeholder="Enter feature name"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            required
          />
          <small className="text-gray-500">Name of the feature to be prioritized.</small>
        </div>

        {/* Technique Selection */}
        <div className="mb-4">
          <label htmlFor="technique" className="block text-gray-700 font-bold mb-2">
            Prioritization Technique
          </label>
          <select
            id="technique"
            name="technique"
            value={formData.technique}
            onChange={handleTechniqueChange}
            className="shadow appearance-none border rounded w-full py-2 px-3"
          >
            {Object.keys(techniqueOptions).map((key) => (
              <option key={key} value={key}>
                {techniqueOptions[key].name}
              </option>
            ))}
          </select>
          <small className="text-gray-500">
            Choose a technique. {techniqueOptions[formData.technique].name} is best for{' '}
            {techniqueOptions[formData.technique].bestFor}.
          </small>
        </div>

        {/* Technique-specific dynamic fields */}
        {techniqueOptions[formData.technique].fields.map((field) => (
          <div className="mb-4" key={field.name}>
            <label htmlFor={field.name} className="block text-gray-700 font-bold mb-2">
              {field.label}
            </label>
            {field.type === 'select' ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3"
                required
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="shadow appearance-none border rounded w-full py-2 px-3"
                required
              />
            )}
            <small className="text-gray-500">
              {field.label} input for {techniqueOptions[formData.technique].name}.
            </small>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-6">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {isEditing ? 'Update Feature' : 'Add Feature'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  featureName: '',
                  technique: formData.technique,
                  ...getInitialFieldsForTechnique(formData.technique),
                });
                setEditingId(null);
              }}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Table displaying prioritized features with details, score, comment, and recommendation */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Prioritized Features</h2>
        {featuresList.length === 0 ? (
          <p className="text-gray-600">No features added yet.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Feature Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Technique
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Comment
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recommendation
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {featuresList.map((item) => {
                const interpretation = getScoreInterpretation(item.technique, item.calculatedScore);
                return (
                  <tr key={item.id}>
                    <td className="px-4 py-2 whitespace-nowrap">{item.featureName}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{techniqueOptions[item.technique].name}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{item.calculatedScore}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{getDetails(item)}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{interpretation.comment}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{interpretation.recommendation}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Table showing which framework is best for which scenarios */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Which Prioritization Framework is Best?</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Framework
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Best For
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {frameworkCases.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 whitespace-nowrap">{item.framework}</td>
                <td className="px-4 py-2 whitespace-nowrap">{item.bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Print Button */}
      <div className="text-center">
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

export default PrioritizationCalculator;
