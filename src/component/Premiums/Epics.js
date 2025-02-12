import React, { useState } from 'react';
import EpicsFeatures from './EpicsFeatures'

const EpicFeatureManager = () => {
  // State for EPIC details (the overall container for features)
  const initialEpic = {
    title: '',
    description: '',
  };

  // State for a single feature
  const initialFeature = {
    featureTitle: '',
    userStories: '',
    acceptanceCriteria: '',
    dependencies: '',
    prioritizationTechnique: '', // e.g., MoSCoW, RICE, Kano
    priorityRanking: '', // e.g., Must-have, Nice-to-have
    timeline: '', // e.g., Q2 2025
    assignedDeveloper: '',
  };

  // Overall component state
  const [epic, setEpic] = useState(initialEpic);
  const [features, setFeatures] = useState([]);
  const [featureForm, setFeatureForm] = useState(initialFeature);
  const [isEditingFeature, setIsEditingFeature] = useState(false);
  const [editingFeatureId, setEditingFeatureId] = useState(null);

  // Update EPIC details
  const handleEpicChange = (e) => {
    const { name, value } = e.target;
    setEpic((prev) => ({ ...prev, [name]: value }));
  };

  // Update feature form fields
  const handleFeatureChange = (e) => {
    const { name, value } = e.target;
    setFeatureForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit the feature form (either adding a new feature or updating an existing one)
  const handleFeatureSubmit = (e) => {
    e.preventDefault();
    if (isEditingFeature) {
      setFeatures((prev) =>
        prev.map((feature) =>
          feature.id === editingFeatureId ? { ...feature, ...featureForm } : feature
        )
      );
      setIsEditingFeature(false);
      setEditingFeatureId(null);
    } else {
      const newFeature = { ...featureForm, id: Date.now() };
      setFeatures((prev) => [...prev, newFeature]);
    }
    setFeatureForm(initialFeature);
  };

  // Populate the feature form for editing a feature
  const handleEditFeature = (feature) => {
    setFeatureForm(feature);
    setIsEditingFeature(true);
    setEditingFeatureId(feature.id);
  };

  // Delete a feature from the list
  const handleDeleteFeature = (id) => {
    setFeatures((prev) => prev.filter((feature) => feature.id !== id));
  };

  // Trigger printing the page (all EPIC details and features)
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto p-4" id="printableArea">
        <EpicsFeatures/>
     

      {/* EPIC Details Section */}
      <div className="bg-white shadow-md rounded p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Epic Details</h2>
        <div className="mb-4">
          <label htmlFor="epicTitle" className="block text-gray-700 font-bold mb-2">
            Epic Title
          </label>
          <input
            type="text"
            id="epicTitle"
            name="title"
            value={epic.title}
            onChange={handleEpicChange}
            placeholder="Enter the epic title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
          <small className="text-gray-500">
            The name of the EPIC that groups related features.
          </small>
        </div>
        <div className="mb-4">
          <label htmlFor="epicDescription" className="block text-gray-700 font-bold mb-2">
            Epic Description
          </label>
          <textarea
            id="epicDescription"
            name="description"
            value={epic.description}
            onChange={handleEpicChange}
            placeholder="Describe the epic and its goals"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            rows="3"
          ></textarea>
          <small className="text-gray-500">
            A brief overview of the epic and the overall objectives.
          </small>
        </div>
      </div>

      {/* Feature Form Section */}
      <div className="bg-white shadow-md rounded p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">
          {isEditingFeature ? 'Edit Feature' : 'Add New Feature'}
        </h2>
        <form onSubmit={handleFeatureSubmit}>
          {/* Feature Title */}
          <div className="mb-4">
            <label htmlFor="featureTitle" className="block text-gray-700 font-bold mb-2">
              Feature Title
            </label>
            <input
              type="text"
              id="featureTitle"
              name="featureTitle"
              value={featureForm.featureTitle}
              onChange={handleFeatureChange}
              placeholder="Enter feature title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
            <small className="text-gray-500">
              A concise title for the feature.
            </small>
          </div>

          {/* User Stories */}
          <div className="mb-4">
            <label htmlFor="userStories" className="block text-gray-700 font-bold mb-2">
              User Stories
            </label>
            <textarea
              id="userStories"
              name="userStories"
              value={featureForm.userStories}
              onChange={handleFeatureChange}
              placeholder="Describe the user stories associated with this feature"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              rows="3"
              required
            ></textarea>
            <small className="text-gray-500">
              Outline the user stories that capture the requirements and use cases.
            </small>
          </div>

          {/* Acceptance Criteria */}
          <div className="mb-4">
            <label htmlFor="acceptanceCriteria" className="block text-gray-700 font-bold mb-2">
              Acceptance Criteria
            </label>
            <textarea
              id="acceptanceCriteria"
              name="acceptanceCriteria"
              value={featureForm.acceptanceCriteria}
              onChange={handleFeatureChange}
              placeholder="List acceptance criteria"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              rows="3"
              required
            ></textarea>
            <small className="text-gray-500">
              Conditions that must be met for this feature to be considered complete.
            </small>
          </div>

          {/* Dependencies */}
          <div className="mb-4">
            <label htmlFor="dependencies" className="block text-gray-700 font-bold mb-2">
              Dependencies
            </label>
            <textarea
              id="dependencies"
              name="dependencies"
              value={featureForm.dependencies}
              onChange={handleFeatureChange}
              placeholder="List any dependencies"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              rows="2"
            ></textarea>
            <small className="text-gray-500">
              Identify other features, systems, or teams this feature depends on.
            </small>
          </div>

          {/* Prioritization Section */}
          <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="prioritizationTechnique" className="block text-gray-700 font-bold mb-2">
                Prioritization Technique
              </label>
              <select
                id="prioritizationTechnique"
                name="prioritizationTechnique"
                value={featureForm.prioritizationTechnique}
                onChange={handleFeatureChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              >
                <option value="">Select Technique</option>
                <option value="MoSCoW">MoSCoW</option>
                <option value="RICE">RICE</option>
                <option value="Kano">Kano</option>
              </select>
              <small className="text-gray-500">
                Choose a method to prioritize the feature.
              </small>
            </div>
            <div>
              <label htmlFor="priorityRanking" className="block text-gray-700 font-bold mb-2">
                Priority Ranking
              </label>
              <input
                type="text"
                id="priorityRanking"
                name="priorityRanking"
                value={featureForm.priorityRanking}
                onChange={handleFeatureChange}
                placeholder="E.g., Must-have"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
              <small className="text-gray-500">
                Indicate the priority level for this feature.
              </small>
            </div>
            <div>
              <label htmlFor="timeline" className="block text-gray-700 font-bold mb-2">
                Timeline
              </label>
              <input
                type="text"
                id="timeline"
                name="timeline"
                value={featureForm.timeline}
                onChange={handleFeatureChange}
                placeholder="E.g., Q2 2025"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
              <small className="text-gray-500">
                Expected delivery timeframe for this feature.
              </small>
            </div>
          </div>
          {/* Assigned Developer */}
          <div className="mb-4">
            <label htmlFor="assignedDeveloper" className="block text-gray-700 font-bold mb-2">
              Assigned Developer
            </label>
            <input
              type="text"
              id="assignedDeveloper"
              name="assignedDeveloper"
              value={featureForm.assignedDeveloper}
              onChange={handleFeatureChange}
              placeholder="Enter developer name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
            <small className="text-gray-500">
              Name of the developer responsible for implementing the feature.
            </small>
          </div>

          {/* Action Buttons for Feature Form */}
          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              {isEditingFeature ? 'Update Feature' : 'Add Feature'}
            </button>
            {isEditingFeature && (
              <button
                type="button"
                onClick={() => {
                  setIsEditingFeature(false);
                  setFeatureForm(initialFeature);
                  setEditingFeatureId(null);
                }}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List of Features */}
      <div className="bg-white shadow-md rounded p-6 mb-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Features List</h2>
        {features.length === 0 ? (
          <p className="text-gray-600">No features added yet.</p>
        ) : (
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
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {features.map((feature) => (
                <tr key={feature.id}>
                  <td className="px-4 py-2 whitespace-nowrap">{feature.featureTitle}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{feature.userStories}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{feature.acceptanceCriteria}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{feature.dependencies}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <strong>{feature.prioritizationTechnique}</strong> ({feature.priorityRanking})
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{feature.timeline}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{feature.assignedDeveloper}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <button
                      onClick={() => handleEditFeature(feature)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
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

      {/* Print Button */}
      <div className="text-center mb-6">
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

export default EpicFeatureManager;
