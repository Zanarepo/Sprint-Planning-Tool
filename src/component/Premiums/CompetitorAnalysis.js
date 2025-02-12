import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import CompetitiveAnalysisFeature from './CompetitiveAnalysisFeature'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CompetitorAnalysis = () => {
  // Initial competitor structure
  const initialCompetitor = {
    competitorName: '',
    competitorDescription: '',
    marketShare: '',
    pricing: '',
    swot_strengths: '',
    swot_weaknesses: '',
    swot_opportunities: '',
    swot_threats: '',
  };

  // State management for the form and list
  const [competitors, setCompetitors] = useState([]);
  const [formData, setFormData] = useState(initialCompetitor);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit for creating/updating competitor entry
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setCompetitors((prev) =>
        prev.map((comp) =>
          comp.id === editingId ? { ...formData, id: editingId } : comp
        )
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newCompetitor = { ...formData, id: Date.now() };
      setCompetitors((prev) => [...prev, newCompetitor]);
    }
    setFormData(initialCompetitor);
  };

  // Load competitor details into form for editing
  const handleEdit = (comp) => {
    setFormData(comp);
    setIsEditing(true);
    setEditingId(comp.id);
  };

  // Delete a competitor entry
  const handleDelete = (id) => {
    setCompetitors((prev) => prev.filter((comp) => comp.id !== id));
  };

  // Prepare chart data for market share visualization
  const chartData = {
    labels: competitors.map((comp) => comp.competitorName),
    datasets: [
      {
        label: 'Market Share (%)',
        data: competitors.map((comp) => Number(comp.marketShare)),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  // Chart options (optional customizations)
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Competitor Market Share' },
    },
  };

  // Handle printing the entire page
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto p-4" id="printableArea">
      {/* Header */}
      <CompetitiveAnalysisFeature/>
     

      {/* Competitor Form */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          {isEditing ? 'Edit Competitor' : 'Add New Competitor'}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Competitor Name */}
          <div className="mb-4">
            <label htmlFor="competitorName" className="block text-gray-700 font-bold mb-2">
              Competitor Name
            </label>
            <input
              type="text"
              id="competitorName"
              name="competitorName"
              value={formData.competitorName}
              onChange={handleChange}
              placeholder="Enter competitor name"
              className="shadow appearance-none border rounded w-full py-2 px-3"
              required
            />
            <small className="text-gray-500">
              Provide the full name of the competitor.
            </small>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="competitorDescription" className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              id="competitorDescription"
              name="competitorDescription"
              value={formData.competitorDescription}
              onChange={handleChange}
              placeholder="Describe the competitor and its offerings"
              className="shadow appearance-none border rounded w-full py-2 px-3"
              rows="3"
              required
            ></textarea>
            <small className="text-gray-500">
              A brief overview of the competitor’s product/service lineup.
            </small>
          </div>

          {/* Market Share & Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="marketShare" className="block text-gray-700 font-bold mb-2">
                Market Share (%)
              </label>
              <input
                type="number"
                id="marketShare"
                name="marketShare"
                value={formData.marketShare}
                onChange={handleChange}
                placeholder="e.g., 25"
                className="shadow appearance-none border rounded w-full py-2 px-3"
                required
              />
              <small className="text-gray-500">
                Percentage of market share held by this competitor.
              </small>
            </div>
            <div>
              <label htmlFor="pricing" className="block text-gray-700 font-bold mb-2">
                Pricing Strategy
              </label>
              <input
                type="text"
                id="pricing"
                name="pricing"
                value={formData.pricing}
                onChange={handleChange}
                placeholder="Describe pricing (e.g., premium, value-based)"
                className="shadow appearance-none border rounded w-full py-2 px-3"
                required
              />
              <small className="text-gray-500">
                Outline the competitor’s pricing strategy.
              </small>
            </div>
          </div>

          {/* SWOT Analysis */}
          <h3 className="text-xl font-bold mb-2">SWOT Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Strengths */}
            <div>
              <label htmlFor="swot_strengths" className="block text-green-800 font-bold mb-2">
                Strengths
              </label>
              <textarea
                id="swot_strengths"
                name="swot_strengths"
                value={formData.swot_strengths}
                onChange={handleChange}
                placeholder="List key strengths"
                className="shadow appearance-none border rounded w-full py-2 px-3"
                rows="2"
                required
              ></textarea>
              <small className="text-green-600">
                Internal advantages of the competitor.
              </small>
            </div>
            {/* Weaknesses */}
            <div>
              <label htmlFor="swot_weaknesses" className="block text-red-800 font-bold mb-2">
                Weaknesses
              </label>
              <textarea
                id="swot_weaknesses"
                name="swot_weaknesses"
                value={formData.swot_weaknesses}
                onChange={handleChange}
                placeholder="List key weaknesses"
                className="shadow appearance-none border rounded w-full py-2 px-3"
                rows="2"
                required
              ></textarea>
              <small className="text-red-600">
                Internal disadvantages or limitations.
              </small>
            </div>
            {/* Opportunities */}
            <div>
              <label htmlFor="swot_opportunities" className="block text-blue-800 font-bold mb-2">
                Opportunities
              </label>
              <textarea
                id="swot_opportunities"
                name="swot_opportunities"
                value={formData.swot_opportunities}
                onChange={handleChange}
                placeholder="List key opportunities"
                className="shadow appearance-none border rounded w-full py-2 px-3"
                rows="2"
                required
              ></textarea>
              <small className="text-blue-600">
                External opportunities for the competitor.
              </small>
            </div>
            {/* Threats */}
            <div>
              <label htmlFor="swot_threats" className="block text-yellow-800 font-bold mb-2">
                Threats
              </label>
              <textarea
                id="swot_threats"
                name="swot_threats"
                value={formData.swot_threats}
                onChange={handleChange}
                placeholder="List key threats"
                className="shadow appearance-none border rounded w-full py-2 px-3"
                rows="2"
                required
              ></textarea>
              <small className="text-yellow-600">
                External risks or challenges.
              </small>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              {isEditing ? 'Update Competitor' : 'Add Competitor'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData(initialCompetitor);
                  setEditingId(null);
                }}
                className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Bar Chart for Market Share */}
      <div className="bg-white shadow-md rounded p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Market Share Overview</h2>
        {competitors.length > 0 ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <p className="text-gray-600">No data available to display chart.</p>
        )}
      </div>

      {/* Competitor Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {competitors.map((comp) => (
          <div key={comp.id} className="bg-white shadow-md rounded p-6">
            <h3 className="text-xl font-bold mb-2">{comp.competitorName}</h3>
            <p className="text-gray-700 mb-2">{comp.competitorDescription}</p>
            <p className="text-gray-600 mb-2">
              <span className="font-bold">Market Share:</span> {comp.marketShare}%
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-bold">Pricing:</span> {comp.pricing}
            </p>
            {/* SWOT Analysis Display */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-100 p-2 rounded">
                <h4 className="text-green-800 font-bold">Strengths</h4>
                <p className="text-green-700 text-sm">{comp.swot_strengths}</p>
              </div>
              <div className="bg-red-100 p-2 rounded">
                <h4 className="text-red-800 font-bold">Weaknesses</h4>
                <p className="text-red-700 text-sm">{comp.swot_weaknesses}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded">
                <h4 className="text-blue-800 font-bold">Opportunities</h4>
                <p className="text-blue-700 text-sm">{comp.swot_opportunities}</p>
              </div>
              <div className="bg-yellow-100 p-2 rounded">
                <h4 className="text-yellow-800 font-bold">Threats</h4>
                <p className="text-yellow-700 text-sm">{comp.swot_threats}</p>
              </div>
            </div>
            {/* Edit and Delete Actions */}
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => handleEdit(comp)}
                className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-1 px-3 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(comp.id)}
                className="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-3 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Print Button */}
      <div className="text-center mb-8">
        <button
          onClick={handlePrint}
          className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
        >
          Print Page
        </button>
      </div>
    </div>
  );
};

export default CompetitorAnalysis;
