import React, { useState } from "react";
import StrategyFeature from './StrategyFeature'

// ---------- Main Component: ProductStrategyTracker ----------
const ProductStrategyTracker = () => {
  // State for our list of strategy entries.
  const [strategies, setStrategies] = useState([]);

  // Form state for a strategy entry.
  const [strategyForm, setStrategyForm] = useState({
    id: null,
    mission: "",
    vision: "",
    targetAudience: "",
    customerProblem: "",
    competitors: "",
    proposedSolution: "",
    positioning: "",
    businessModel: "",
    monetization: "",
    roadmap: "",
    goToMarket: "",
    kpis: "",
    recommendation: "",
  });

  // For editing an entry.
  const [editingId, setEditingId] = useState(null);

  // View mode: "table" or "organogram"
  const [viewMode, setViewMode] = useState("table");

  // ---------- Handlers for Form ----------
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setStrategyForm({ ...strategyForm, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Validate required fields (for this example, require Mission, Vision, and Roadmap).
    if (!strategyForm.mission || !strategyForm.vision || !strategyForm.roadmap) {
      alert("Please fill in the required fields: Mission, Vision, and Roadmap.");
      return;
    }
    const newStrategy = {
      ...strategyForm,
      id: strategyForm.id || Date.now(),
    };
    if (strategyForm.id) {
      setStrategies(strategies.map((s) => (s.id === strategyForm.id ? newStrategy : s)));
      setEditingId(null);
    } else {
      setStrategies([...strategies, newStrategy]);
    }
    // Clear the form fields.
    setStrategyForm({
      id: null,
      mission: "",
      vision: "",
      targetAudience: "",
      customerProblem: "",
      competitors: "",
      proposedSolution: "",
      positioning: "",
      businessModel: "",
      monetization: "",
      roadmap: "",
      goToMarket: "",
      kpis: "",
      recommendation: "",
    });
  };

  const handleEdit = (id) => {
    const strat = strategies.find((s) => s.id === id);
    if (strat) {
      setStrategyForm(strat);
      setEditingId(strat.id);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this strategy?")) {
      setStrategies(strategies.filter((s) => s.id !== id));
    }
  };

  // Reset the form (simulate "Back" functionality).
  const handleResetForm = () => {
    setStrategyForm({
      id: null,
      mission: "",
      vision: "",
      targetAudience: "",
      customerProblem: "",
      competitors: "",
      proposedSolution: "",
      positioning: "",
      businessModel: "",
      monetization: "",
      roadmap: "",
      goToMarket: "",
      kpis: "",
      recommendation: "",
    });
    setEditingId(null);
  };

  // Print the dashboard.

  // Group strategies by Mission (or any other field) for Organogram view.
  const groupedData = strategies.reduce((acc, strat) => {
    if (!acc[strat.mission]) {
      acc[strat.mission] = [];
    }
    acc[strat.mission].push(strat);
    return acc;
  }, {});

  // ---------- Renderers for Views ----------


  return (
    <div className="container mx-auto p-6">
      <StrategyFeature/>
    
      {/* Explanation Section */}
      <div className="bg-blue-50 p-4 rounded-lg shadow mb-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-center">Product Strategy Overview</h2>
        <p className="text-gray-700">
          <strong>Mission & Vision</strong>: Define why your company exists and the future you want to create.<br /><br />
          <strong>Understanding the Market & Customers</strong>: Identify your target audience, their problems, competitors, and your solution.<br /><br />
          <strong>Product Positioning & Unique Value</strong>: Explain what makes your product unique.<br /><br />
          <strong>Business Model & Monetization</strong>: Outline how your product makes money.<br /><br />
          <strong>Product Roadmap</strong>: List key features and release timelines.<br /><br />
          <strong>Go-To-Market Strategy</strong>: Define how you'll reach your customers.<br /><br />
          <strong>Measuring Success</strong>: Specify the KPIs you'll track and any recommendations for improvement.
        </p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleFormSubmit} className="mb-6 p-4 border rounded shadow">
        <h2 className="text-xl font-semibold mb-2">
          {editingId ? "Edit Product Strategy" : "Create New Product Strategy"}
        </h2>

        {/* Section 1: Mission & Vision */}
        <div className="mb-4">
          <h3 className="font-bold mb-1">Mission & Vision</h3>
          <p className="text-sm text-gray-600 mb-1">
            <em>Mission:</em> Why does your company exist?<br />
            <em>Vision:</em> What future do you want to create?
          </p>
          <input
            type="text"
            name="mission"
            value={strategyForm.mission}
            onChange={handleFormChange}
            placeholder='e.g., "To give people the power to build community..."'
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="text"
            name="vision"
            value={strategyForm.vision}
            onChange={handleFormChange}
            placeholder='e.g., "To create the next evolution of social connection..."'
            className="border p-2 w-full"
            required
          />
        </div>

        {/* Section 2: Understanding the Market & Customers */}
        <div className="mb-4">
          <h3 className="font-bold mb-1">Understanding the Market & Customers</h3>
          <p className="text-sm text-gray-600 mb-1">
            Who is your product for? What problem does it solve? Who are the competitors? What is your solution?
          </p>
          <input
            type="text"
            name="targetAudience"
            value={strategyForm.targetAudience}
            onChange={handleFormChange}
            placeholder="Target Audience (e.g., teens, small businesses)"
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            name="customerProblem"
            value={strategyForm.customerProblem}
            onChange={handleFormChange}
            placeholder="Customer Problem"
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            name="competitors"
            value={strategyForm.competitors}
            onChange={handleFormChange}
            placeholder="Competitors"
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            name="proposedSolution"
            value={strategyForm.proposedSolution}
            onChange={handleFormChange}
            placeholder="Proposed Solution"
            className="border p-2 w-full"
          />
        </div>

        {/* Section 3: Product Positioning & Unique Value */}
        <div className="mb-4">
          <h3 className="font-bold mb-1">Product Positioning & Unique Value</h3>
          <p className="text-sm text-gray-600 mb-1">
            What makes your product unique? Why should customers choose it?
          </p>
          <input
            type="text"
            name="positioning"
            value={strategyForm.positioning}
            onChange={handleFormChange}
            placeholder="Unique Value Proposition / Positioning"
            className="border p-2 w-full"
          />
        </div>

        {/* Section 4: Business Model & Monetization */}
        <div className="mb-4">
          <h3 className="font-bold mb-1">Business Model & Monetization</h3>
          <p className="text-sm text-gray-600 mb-1">
            How will your product make money? (e.g., advertising, subscriptions)
          </p>
          <input
            type="text"
            name="businessModel"
            value={strategyForm.businessModel}
            onChange={handleFormChange}
            placeholder="Business Model"
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            name="monetization"
            value={strategyForm.monetization}
            onChange={handleFormChange}
            placeholder="Monetization Strategy"
            className="border p-2 w-full"
          />
        </div>

        {/* Section 5: Product Roadmap */}
        <div className="mb-4">
          <h3 className="font-bold mb-1">Product Roadmap</h3>
          <p className="text-sm text-gray-600 mb-1">
            Outline key features and their planned release dates.
          </p>
          <textarea
            name="roadmap"
            value={strategyForm.roadmap}
            onChange={handleFormChange}
            placeholder="e.g., 2023: Launch new mobile app; 2024: Integrate AI-powered recommendations..."
            rows="3"
            className="border p-2 w-full"
          ></textarea>
        </div>

        {/* Section 6: Go-To-Market Strategy */}
        <div className="mb-4">
          <h3 className="font-bold mb-1">Go-To-Market Strategy</h3>
          <p className="text-sm text-gray-600 mb-1">
            How will you launch and promote your product?
          </p>
          <textarea
            name="goToMarket"
            value={strategyForm.goToMarket}
            onChange={handleFormChange}
            placeholder="e.g., Leverage social media, influencer partnerships, paid ads..."
            rows="3"
            className="border p-2 w-full"
          ></textarea>
        </div>

        {/* Section 7: Measuring Success */}
        <div className="mb-4">
          <h3 className="font-bold mb-1">Measuring Success</h3>
          <p className="text-sm text-gray-600 mb-1">
            What KPIs will you track? (e.g., DAU, conversion rate, revenue, customer satisfaction)
          </p>
          <input
            type="text"
            name="kpis"
            value={strategyForm.kpis}
            onChange={handleFormChange}
            placeholder="Key Performance Indicators"
            className="border p-2 w-full mb-2"
          />
          <textarea
            name="recommendation"
            value={strategyForm.recommendation}
            onChange={handleFormChange}
            placeholder="Your review or recommendation (optional)"
            rows="2"
            className="border p-2 w-full"
          ></textarea>
        </div>

        <div className="flex space-x-4">
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
            {editingId ? "Update Strategy" : "Create Strategy"}
          </button>
          <div type="" onClick={handleResetForm} className="text-white px-4 py-2 rounded">
           
          </div>
        </div>
      </form>

      {/* View Mode & Print Buttons */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <button
          onClick={() => setViewMode("table")}
          className={`px-4 py-2 rounded ${viewMode === "table" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Table View
        </button>
        <button
          onClick={() => setViewMode("organogram")}
          className={`px-4 py-2 rounded ${viewMode === "organogram" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Organogram View
        </button>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded bg-gray-800 text-white"
        >
          Print Dashboard
        </button>
      </div>

      {/* Dashboard Section */}
      {viewMode === "table" ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-indigo-200">
              <tr>
                <th className="border p-2">Mission</th>
                <th className="border p-2">Vision</th>
                <th className="border p-2">Target Audience</th>
                <th className="border p-2">Customer Problem</th>
                <th className="border p-2">Competitors</th>
                <th className="border p-2">Proposed Solution</th>
                <th className="border p-2">Positioning</th>
                <th className="border p-2">Business Model</th>
                <th className="border p-2">Monetization</th>
                <th className="border p-2">Roadmap</th>
                <th className="border p-2">Go-To-Market</th>
                <th className="border p-2">KPIs</th>
                <th className="border p-2">Recommendation</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {strategies.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="border p-2">{s.mission}</td>
                  <td className="border p-2">{s.vision}</td>
                  <td className="border p-2">{s.targetAudience}</td>
                  <td className="border p-2">{s.customerProblem}</td>
                  <td className="border p-2">{s.competitors}</td>
                  <td className="border p-2">{s.proposedSolution}</td>
                  <td className="border p-2">{s.positioning}</td>
                  <td className="border p-2">{s.businessModel}</td>
                  <td className="border p-2">{s.monetization}</td>
                  <td className="border p-2">{s.roadmap}</td>
                  <td className="border p-2">{s.goToMarket}</td>
                  <td className="border p-2">{s.kpis}</td>
                  <td className="border p-2">{s.recommendation}</td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleEdit(s.id)}
                      className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {strategies.length === 0 && (
                <tr>
                  <td colSpan="14" className="border p-2 text-center">
                    No strategies available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          {Object.keys(groupedData).length === 0 ? (
            <p className="text-center">No strategies to display.</p>
          ) : (
            Object.keys(groupedData).map((mission) => (
              <div key={mission} className="mb-6 border p-4 rounded shadow">
                <h2 className="text-xl font-bold">{mission}</h2>
                {groupedData[mission].map((s) => (
                  <div key={s.id} className="ml-4 mt-2 border-l pl-4">
                    <h3 className="text-lg font-semibold">Vision: {s.vision}</h3>
                    <p><strong>Target Audience:</strong> {s.targetAudience}</p>
                    <p><strong>Customer Problem:</strong> {s.customerProblem}</p>
                    <p><strong>Competitors:</strong> {s.competitors}</p>
                    <p><strong>Proposed Solution:</strong> {s.proposedSolution}</p>
                    <p><strong>Positioning:</strong> {s.positioning}</p>
                    <p><strong>Business Model:</strong> {s.businessModel}</p>
                    <p><strong>Monetization:</strong> {s.monetization}</p>
                    <p><strong>Roadmap:</strong> {s.roadmap}</p>
                    <p><strong>Go-To-Market:</strong> {s.goToMarket}</p>
                    <p><strong>KPIs:</strong> {s.kpis}</p>
                    <p><strong>Recommendation:</strong> {s.recommendation}</p>
                    <div className="mt-2">
                      <button
                        onClick={() => handleEdit(s.id)}
                        className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductStrategyTracker;
