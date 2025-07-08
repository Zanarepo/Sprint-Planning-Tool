
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
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


/**
 * Editable CRUD view for an analysis set.
 * Only displays the inline edit form when a competitor's "Edit" button is clicked.
 * Otherwise shows a read-only view (chart + SWOT details).
 */
const CompetitorAnalysisDetails = ({ analysis_name, userId }) => {
  const initialCompetitor = {
    competitor_name: '',
    competitor_description: '',
    market_share: '',
    pricing_strategy: '',
    swot_strengths: '',
    swot_weaknesses: '',
    swot_opportunities: '',
    swot_threats: '',
  };

  const [competitors, setCompetitors] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState(initialCompetitor);

  const fetchCompetitors = async () => {
    const { data, error } = await supabase
      .from('competitor_analysis')
      .select('*')
      .eq('user_id', userId)
      .eq('analysis_name', analysis_name);
    if (error) {
      console.error('Error fetching competitor entries:', error);
    } else {
      setCompetitors(data);
    }
  };

  useEffect(() => {
    if (analysis_name && userId) {
      fetchCompetitors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analysis_name, userId]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fixed update function: chain .select() so that updated record is returned.
  const handleUpdate = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('competitor_analysis')
      .update({ ...editFormData })
      .eq('id', editingId)
      .select();
    if (error) {
      console.error('Error updating competitor:', error);
    } else if (data && data.length > 0) {
      setCompetitors((prev) =>
        prev.map((comp) => (comp.id === editingId ? data[0] : comp))
      );
    }
    setEditingId(null);
    setEditFormData(initialCompetitor);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData(initialCompetitor);
  };

  const handleSelectForEdit = (comp) => {
    setEditFormData({
      competitor_name: comp.competitor_name,
      competitor_description: comp.competitor_description,
      market_share: comp.market_share,
      pricing_strategy: comp.pricing_strategy,
      swot_strengths: comp.swot_strengths,
      swot_weaknesses: comp.swot_weaknesses,
      swot_opportunities: comp.swot_opportunities,
      swot_threats: comp.swot_threats,
    });
    setEditingId(comp.id);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('competitor_analysis')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error deleting competitor:', error);
    } else {
      setCompetitors((prev) => prev.filter((comp) => comp.id !== id));
      if (editingId === id) {
        handleCancelEdit();
      }
    }
  };

  const chartData = {
    labels: competitors.map((comp) => comp.competitor_name),
    datasets: [
      {
        label: 'Market Share (%)',
        data: competitors.map((comp) => Number(comp.market_share)),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Competitor Market Share' },
    },
  };

  return (
    <div className="p-4">
      {/* Chart section */}
      <CompetitiveAnalysisFeature/>
      <div className="bg-white shadow-md rounded p-6 mb-8">
        <h4 className="text-2xl font-bold mb-4">Market Share Overview</h4>
        {competitors.length > 0 ? (
          <Bar data={chartData} options={chartOptions} />
          
        ) : (
          <p className="text-gray-600">No competitor data to display chart.</p>
        )}
      </div>
      {/* Competitor entries */}
      <div className="grid grid-cols-1 gap-6">
        {competitors.map((comp) =>
          editingId === comp.id ? (
            <form
              key={comp.id}
              onSubmit={handleUpdate}
              className="bg-white shadow-md rounded p-6"
            >
              <h4 className="text-xl font-bold mb-4">Edit Competitor</h4>
              <div className="mb-4">
                <label htmlFor="competitor_name_edit" className="block text-gray-700 font-bold mb-2">
                  Competitor Name
                </label>
                <input
                  type="text"
                  id="competitor_name_edit"
                  name="competitor_name"
                  value={editFormData.competitor_name}
                  onChange={handleEditChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="competitor_description_edit" className="block text-gray-700 font-bold mb-2">
                  Description
                </label>
                <textarea
                  id="competitor_description_edit"
                  name="competitor_description"
                  value={editFormData.competitor_description}
                  onChange={handleEditChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="market_share_edit" className="block text-gray-700 font-bold mb-2">
                    Market Share (%)
                  </label>
                  <input
                    type="number"
                    id="market_share_edit"
                    name="market_share"
                    value={editFormData.market_share}
                    onChange={handleEditChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="pricing_strategy_edit" className="block text-gray-700 font-bold mb-2">
                    Pricing Strategy
                  </label>
                  <input
                    type="text"
                    id="pricing_strategy_edit"
                    name="pricing_strategy"
                    value={editFormData.pricing_strategy}
                    onChange={handleEditChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="swot_strengths_edit" className="block text-green-800 font-bold mb-2">
                    Strengths
                  </label>
                  <textarea
                    id="swot_strengths_edit"
                    name="swot_strengths"
                    value={editFormData.swot_strengths}
                    onChange={handleEditChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3"
                    rows="2"
                    required
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="swot_weaknesses_edit" className="block text-red-800 font-bold mb-2">
                    Weaknesses
                  </label>
                  <textarea
                    id="swot_weaknesses_edit"
                    name="swot_weaknesses"
                    value={editFormData.swot_weaknesses}
                    onChange={handleEditChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3"
                    rows="2"
                    required
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="swot_opportunities_edit" className="block text-blue-800 font-bold mb-2">
                    Opportunities
                  </label>
                  <textarea
                    id="swot_opportunities_edit"
                    name="swot_opportunities"
                    value={editFormData.swot_opportunities}
                    onChange={handleEditChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3"
                    rows="2"
                    required
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="swot_threats_edit" className="block text-yellow-800 font-bold mb-2">
                    Threats
                  </label>
                  <textarea
                    id="swot_threats_edit"
                    name="swot_threats"
                    value={editFormData.swot_threats}
                    onChange={handleEditChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3"
                    rows="2"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button type="submit" className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">
                  Update Competitor
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div key={comp.id} className="bg-white shadow-md rounded p-6">
              <h4 className="text-xl font-bold mb-2">{comp.competitor_name}</h4>
              <p className="text-gray-700 mb-2">{comp.competitor_description}</p>
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Market Share:</span> {comp.market_share}%
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-bold">Pricing Strategy:</span> {comp.pricing_strategy}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-100 p-2 rounded">
                  <h5 className="text-green-800 font-bold">Strengths</h5>
                  <p className="text-green-700 text-sm">{comp.swot_strengths}</p>
                </div>
                <div className="bg-red-100 p-2 rounded">
                  <h5 className="text-red-800 font-bold">Weaknesses</h5>
                  <p className="text-red-700 text-sm">{comp.swot_weaknesses}</p>
                </div>
                <div className="bg-blue-100 p-2 rounded">
                  <h5 className="text-blue-800 font-bold">Opportunities</h5>
                  <p className="text-blue-700 text-sm">{comp.swot_opportunities}</p>
                </div>
                <div className="bg-yellow-100 p-2 rounded">
                  <h5 className="text-yellow-800 font-bold">Threats</h5>
                  <p className="text-yellow-700 text-sm">{comp.swot_threats}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleSelectForEdit(comp)}
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
          )
        )}
      </div>
    </div>
  );
};

/**
 * Main component that:
 * - Retrieves the user's email and id.
 * - Provides a global form for adding new competitor entries.
 * - Lists distinct analysis sets.
 * - For each set, displays a header with a "Show/Hide" toggle and a "Delete Set" button.
 *   When open, it shows the summary view by default.
 */
const CompetitorAnalysisManager = () => {
  const [, setUserEmail] = useState('');
  const [userId, setUserId] = useState(null);
  const [competitorForm, setCompetitorForm] = useState({
    analysis_name: '',
    competitor_name: '',
    competitor_description: '',
    market_share: '',
    pricing_strategy: '',
    swot_strengths: '',
    swot_weaknesses: '',
    swot_opportunities: '',
    swot_threats: '',
  });
  const [openAnalysis, setOpenAnalysis] = useState({});
  const [analysisSets, setAnalysisSets] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
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
    }
  }, []);

  const fetchAnalysisSets = async () => {
    if (userId) {
      const { data, error } = await supabase
        .from("competitor_analysis")
        .select("analysis_name")
        .eq("user_id", userId);
      if (error) {
        console.error("Error fetching analysis sets:", error);
      } else if (data) {
        const uniqueSets = [...new Set(data.map((row) => row.analysis_name))];
        setAnalysisSets(uniqueSets);
      }
    }
  };

  useEffect(() => {
    fetchAnalysisSets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCompetitorForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;
    const { error } = await supabase
      .from("competitor_analysis")
      .insert([{ ...competitorForm, user_id: userId }]);
    if (error) {
      console.error("Error adding competitor:", error);
    } else {
      setCompetitorForm({
        analysis_name: '',
        competitor_name: '',
        competitor_description: '',
        market_share: '',
        pricing_strategy: '',
        swot_strengths: '',
        swot_weaknesses: '',
        swot_opportunities: '',
        swot_threats: '',
      });
      fetchAnalysisSets();
    }
  };

  const toggleAnalysisSet = (setName) => {
    setOpenAnalysis((prev) => ({ ...prev, [setName]: !prev[setName] }));
  };

  // Delete the entire analysis set (all records with that analysis_name)
  const deleteAnalysisSet = async (setName) => {
    const { error } = await supabase
      .from("competitor_analysis")
      .delete()
      .eq("analysis_name", setName)
      .eq("user_id", userId);
    if (error) {
      console.error("Error deleting analysis set:", error);
    } else {
      setAnalysisSets((prev) => prev.filter((s) => s !== setName));
      setOpenAnalysis((prev) => {
        const newState = { ...prev };
        delete newState[setName];
        return newState;
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Competitive Analysis Manager</h1>
      
      {/* Global Competitor Entry Form */}
      <form onSubmit={handleFormSubmit} className="bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Add Competitor Entry</h2>
        <div className="mb-4">
          <label htmlFor="analysis_name" className="block text-gray-700 font-bold mb-2">
            Analysis Set
          </label>
          <input
            type="text"
            id="analysis_name"
            name="analysis_name"
            value={competitorForm.analysis_name}
            onChange={handleFormChange}
            placeholder="Enter analysis set name"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="competitor_name" className="block text-gray-700 font-bold mb-2">
            Competitor Name
          </label>
          <input
            type="text"
            id="competitor_name"
            name="competitor_name"
            value={competitorForm.competitor_name}
            onChange={handleFormChange}
            placeholder="Enter competitor name"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="competitor_description" className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            id="competitor_description"
            name="competitor_description"
            value={competitorForm.competitor_description}
            onChange={handleFormChange}
            placeholder="Describe the competitor"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            rows="3"
            required
          ></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="market_share" className="block text-gray-700 font-bold mb-2">
              Market Share (%)
            </label>
            <input
              type="number"
              id="market_share"
              name="market_share"
              value={competitorForm.market_share}
              onChange={handleFormChange}
              placeholder="e.g., 25"
              className="shadow appearance-none border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div>
            <label htmlFor="pricing_strategy" className="block text-gray-700 font-bold mb-2">
              Pricing Strategy
            </label>
            <input
              type="text"
              id="pricing_strategy"
              name="pricing_strategy"
              value={competitorForm.pricing_strategy}
              onChange={handleFormChange}
              placeholder="e.g., premium, value-based"
              className="shadow appearance-none border rounded w-full py-2 px-3"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="swot_strengths" className="block text-green-800 font-bold mb-2">
              Strengths
            </label>
            <textarea
              id="swot_strengths"
              name="swot_strengths"
              value={competitorForm.swot_strengths}
              onChange={handleFormChange}
              placeholder="List key strengths"
              className="shadow appearance-none border rounded w-full py-2 px-3"
              rows="2"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="swot_weaknesses" className="block text-red-800 font-bold mb-2">
              Weaknesses
            </label>
            <textarea
              id="swot_weaknesses"
              name="swot_weaknesses"
              value={competitorForm.swot_weaknesses}
              onChange={handleFormChange}
              placeholder="List key weaknesses"
              className="shadow appearance-none border rounded w-full py-2 px-3"
              rows="2"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="swot_opportunities" className="block text-blue-800 font-bold mb-2">
              Opportunities
            </label>
            <textarea
              id="swot_opportunities"
              name="swot_opportunities"
              value={competitorForm.swot_opportunities}
              onChange={handleFormChange}
              placeholder="List key opportunities"
              className="shadow appearance-none border rounded w-full py-2 px-3"
              rows="2"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="swot_threats" className="block text-yellow-800 font-bold mb-2">
              Threats
            </label>
            <textarea
              id="swot_threats"
              name="swot_threats"
              value={competitorForm.swot_threats}
              onChange={handleFormChange}
              placeholder="List key threats"
              className="shadow appearance-none border rounded w-full py-2 px-3"
              rows="2"
              required
            ></textarea>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">
            Add Competitor Entry
          </button>
        </div>
      </form>
      
      {/* Analysis Sets List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Analysis Sets</h2>
        {analysisSets.length > 0 ? (
          analysisSets.map((set) => (
            <div key={set} className="mb-6 border rounded shadow">
              <div className="flex justify-between items-center bg-gray-100 p-4">
                <h3 className="text-xl font-bold">{set}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleAnalysisSet(set)}
                    className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                  >
                    {openAnalysis[set] ? 'Hide' : 'Show'}
                  </button>
                  <button
                    onClick={() => deleteAnalysisSet(set)}
                    className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete Set
                  </button>
                </div>
              </div>
              {openAnalysis[set] && (
                <CompetitorAnalysisDetails analysis_name={set} userId={userId} />
              )}
            </div>
          ))
        ) : (
          <p>No analysis sets found. Add a competitor entry to create one.</p>
        )}
      </div>
    </div>
  );
};

export default CompetitorAnalysisManager;