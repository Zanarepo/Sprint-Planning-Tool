import React, { useState } from 'react';
import { FaFileAlt, FaUserAlt, FaCogs, FaCheckCircle, FaLink } from 'react-icons/fa';

const PRDSimulation = () => {
  // State for the PRD fields
  const [featureName, setFeatureName] = useState('Price Filter for E-Commerce App');
  const [objective, setObjective] = useState('Allow users to filter products by price range so they can find items within their budget quickly.');
  const [userStories, setUserStories] = useState([
    'As a shopper, I want to filter by price so I can view products within my budget.',
    'As a user, I need a responsive filter so that I can adjust the price range on mobile devices.',
  ]);
  const [specifications, setSpecifications] = useState('The price filter should support a minimum and maximum value input. It must integrate seamlessly with the product search API and support responsive design across devices.');
  const [acceptanceCriteria, setAcceptanceCriteria] = useState('1. The filter should return accurate results within 1 second.\n2. The UI should update dynamically as the price range is adjusted.\n3. Must pass cross-browser testing on Chrome, Firefox, and Safari.');
  const [dependencies, setDependencies] = useState('Dependent on the product search API, pricing data integrity, and design approval from the UI team.');

  // Functions to update list-based fields (User Stories)
  const handleUserStoryChange = (index, value) => {
    const newStories = [...userStories];
    newStories[index] = value;
    setUserStories(newStories);
  };

  const addUserStory = () => {
    setUserStories([...userStories, '']);
  };

  const removeUserStory = (index) => {
    const newStories = userStories.filter((_, idx) => idx !== index);
    setUserStories(newStories);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-8">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold text-indigo-600 flex items-center justify-center gap-3">
          <FaFileAlt className="text-indigo-600" /> PRD Simulation
        </h1>
        <p className="mt-2 text-gray-700 max-w-3xl mx-auto">
          Simulate writing a Product Requirement Document (PRD) by filling in the details below. Use this template to understand the key components and practice creating your own PRDs.
        </p>
      </header>

      {/* PRD Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter PRD Details</h2>
          <form className="space-y-4">
            {/* Feature Name */}
            <div>
              <label className="block text-gray-700 font-medium">Feature Name</label>
              <input
                type="text"
                value={featureName}
                onChange={(e) => setFeatureName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                placeholder="Enter the feature name"
              />
            </div>
            {/* Objective */}
            <div>
              <label className="block text-gray-700 font-medium">Objective</label>
              <textarea
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                rows="3"
                placeholder="Explain why this feature is needed"
              />
            </div>
            {/* User Stories */}
            <div>
              <label className="block text-gray-700 font-medium">User Stories</label>
              {userStories.map((story, index) => (
                <div key={index} className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    value={story}
                    onChange={(e) => handleUserStoryChange(index, e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder={`User story ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeUserStory(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addUserStory}
                className="mt-2 text-indigo-600 hover:underline"
              >
                + Add User Story
              </button>
            </div>
            {/* Specifications */}
            <div>
              <label className="block text-gray-700 font-medium">Specifications</label>
              <textarea
                value={specifications}
                onChange={(e) => setSpecifications(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                rows="4"
                placeholder="Enter detailed requirements, design guidelines, and technical constraints"
              />
            </div>
            {/* Acceptance Criteria */}
            <div>
              <label className="block text-gray-700 font-medium">Acceptance Criteria</label>
              <textarea
                value={acceptanceCriteria}
                onChange={(e) => setAcceptanceCriteria(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                rows="4"
                placeholder="List the conditions that must be met for the feature to be complete"
              />
            </div>
            {/* Dependencies */}
            <div>
              <label className="block text-gray-700 font-medium">Dependencies</label>
              <textarea
                value={dependencies}
                onChange={(e) => setDependencies(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                rows="2"
                placeholder="List any external factors or assumptions"
              />
            </div>
          </form>
        </div>

        {/* PRD Preview */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">PRD Preview</h2>
          <div className="space-y-4">
            {/* Feature Name */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaFileAlt className="text-indigo-600" />
                {featureName}
              </h3>
            </div>
            {/* Objective */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <FaUserAlt className="text-green-500" /> Objective
              </h4>
              <p className="text-gray-700">{objective}</p>
            </div>
            {/* User Stories */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <FaCogs className="text-purple-500" /> User Stories
              </h4>
              <ul className="list-disc ml-6 text-gray-700">
                {userStories.map((story, index) => (
                  <li key={index}>{story}</li>
                ))}
              </ul>
            </div>
            {/* Specifications */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <FaCheckCircle className="text-blue-500" /> Specifications
              </h4>
              <p className="text-gray-700 whitespace-pre-wrap">{specifications}</p>
            </div>
            {/* Acceptance Criteria */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <FaCheckCircle className="text-blue-500" /> Acceptance Criteria
              </h4>
              <p className="text-gray-700 whitespace-pre-wrap">{acceptanceCriteria}</p>
            </div>
            {/* Dependencies */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <FaLink className="text-red-500" /> Dependencies
              </h4>
              <p className="text-gray-700">{dependencies}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PRDSimulation;
