
import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import StrategyFeature from "../StrategyFeature";
import StrategyDoc from "../StrategyDoc";

// Initial state for the strategy form (keys match the DB schema)
const initialStrategyForm = {
  id: null,
  name: "",
  mission: "",
  vision: "",
  target_audience: "",
  customer_problem: "",
  competitors: "",
  proposed_solution: "",
  positioning: "",
  business_model: "",
  monetization: "",
  roadmap: "",
  go_to_market: "",
  kpis: "",
  recommendation: "",
};

const ProductStrategy = () => {
  // User and strategies state
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [strategies, setStrategies] = useState([]);
  const [strategyForm, setStrategyForm] = useState(initialStrategyForm);
  const [editingId, setEditingId] = useState(null);
  const [viewMode, setViewMode] = useState("table");

  // Retrieve user email from localStorage and fetch user id
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
      console.debug("User email found in localStorage:", email);
      (async () => {
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
      })();
    } else {
      console.debug("No user email found in localStorage.");
    }
  }, []);

  // Fetch strategies for the logged-in user
  useEffect(() => {
    if (userId) {
      (async () => {
        const { data, error } = await supabase
          .from("product_strategies")
          .select("*")
          .eq("user_id", userId);
        if (error) {
          console.error("Error fetching strategies:", error);
        } else if (data) {
          // Ensure we store only non-null entries.
          setStrategies(data.filter((d) => d != null));
        }
      })();
    }
  }, [userId]);

  // ========= CRUD Operations =========

  // Create a new strategy (remove the id field so PostgreSQL auto-generates it)
  const createStrategy = async (newStrategy) => {
    const { id, ...strategyData } = newStrategy;
    const { data, error } = await supabase
      .from("product_strategies")
      .insert([{ ...strategyData, user_id: userId }])
      .single();
    if (error) {
      console.error("Error creating strategy:", error);
    } else if (data) {
      setStrategies((prev) => [...prev, data].filter((s) => s != null));
    }
  };

  // Update an existing strategy.
  const updateStrategy = async (updatedStrategy) => {
    if (!updatedStrategy.id) {
      console.error("No strategy id provided for update.");
      return;
    }
    const { data, error } = await supabase
      .from("product_strategies")
      .update(updatedStrategy)
      .eq("id", updatedStrategy.id)
      .single();
    if (error || !data) {
      console.error("Error updating strategy:", error);
    } else {
      setStrategies((prevStrategies) =>
        prevStrategies.filter((s) => s != null).map((s) =>
          s.id === data.id ? data : s
        )
      );
    }
  };

  // Delete a strategy.
  const deleteStrategy = async (id) => {
    const { error } = await supabase
      .from("product_strategies")
      .delete()
      .eq("id", id);
    if (error) {
      console.error("Error deleting strategy:", error);
    } else {
      setStrategies((prevStrategies) =>
        prevStrategies.filter((s) => s && s.id !== id)
      );
    }
  };

  // ========= Form Handlers =========

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setStrategyForm({ ...strategyForm, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Validate required fields: name, mission, vision, and roadmap
    if (
      !strategyForm.name ||
      !strategyForm.mission ||
      !strategyForm.vision ||
      !strategyForm.roadmap
    ) {
      alert("Please fill in the required fields: Name, Mission, Vision, and Roadmap.");
      return;
    }
    if (editingId) {
      // Merge stored editingId in case strategyForm.id is missing
      await updateStrategy({ ...strategyForm, id: editingId });
      setEditingId(null);
    } else {
      await createStrategy(strategyForm);
    }
    setStrategyForm(initialStrategyForm);
  };

  const handleEdit = (strategy) => {
    setStrategyForm(strategy);
    setEditingId(strategy.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this strategy?")) {
      await deleteStrategy(id);
    }
  };

  const handleResetForm = () => {
    setStrategyForm(initialStrategyForm);
    setEditingId(null);
  };

  // ========= Grouping for Organogram View =========

  const groupedData = strategies
    .filter((s) => s != null)
    .reduce((acc, strat) => {
      const key = strat.mission || "Unknown Mission";
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(strat);
      return acc;
    }, {});

  // ========= Rendering =========

  return (
    <div className="container mx-auto p-6 mt-8">
      <StrategyFeature />
      <h1 className="text-3xl font-bold mb-4 text-center">Product Strategy Tracker</h1>
      {userEmail && <p className="mb-4 text-center">Welcome, {userEmail}</p>}

      {/* Strategy Document Creation / Editing Form */}
      <form onSubmit={handleFormSubmit} className="mb-6 p-4 border rounded shadow">
        <h3 className="text-xl font-semibold mb-2">
          {editingId ? "Edit Product Strategy" : "Create New Product Strategy"}
        </h3>

        {/* Strategy Name */}
        <div className="mb-4">
          <label className="font-bold mb-1 block" htmlFor="name">
            Strategy Name<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={strategyForm.name}
            onChange={handleFormChange}
            placeholder="Enter strategy name"
            className="border p-2 w-full"
            required
          />
        </div>

        {/* Mission & Vision */}
        <div className="mb-4">
          <label className="font-bold mb-1 block" htmlFor="mission">
            Mission<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="mission"
            value={strategyForm.mission}
            onChange={handleFormChange}
            placeholder="Enter mission"
            className="border p-2 w-full mb-2"
            required
          />
          <label className="font-bold mb-1 block" htmlFor="vision">
            Vision<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="vision"
            value={strategyForm.vision}
            onChange={handleFormChange}
            placeholder="Enter vision"
            className="border p-2 w-full"
            required
          />
        </div>

        {/* Market & Customers */}
        <div className="mb-4">
          <label className="font-bold mb-1 block" htmlFor="target_audience">
            Target Audience
          </label>
          <input
            type="text"
            name="target_audience"
            value={strategyForm.target_audience}
            onChange={handleFormChange}
            placeholder="e.g., teens, small businesses"
            className="border p-2 w-full mb-2"
          />
          <label className="font-bold mb-1 block" htmlFor="customer_problem">
            Customer Problem
          </label>
          <input
            type="text"
            name="customer_problem"
            value={strategyForm.customer_problem}
            onChange={handleFormChange}
            placeholder="Describe the customer problem"
            className="border p-2 w-full mb-2"
          />
          <label className="font-bold mb-1 block" htmlFor="competitors">
            Competitors
          </label>
          <input
            type="text"
            name="competitors"
            value={strategyForm.competitors}
            onChange={handleFormChange}
            placeholder="List competitors"
            className="border p-2 w-full mb-2"
          />
          <label className="font-bold mb-1 block" htmlFor="proposed_solution">
            Proposed Solution
          </label>
          <input
            type="text"
            name="proposed_solution"
            value={strategyForm.proposed_solution}
            onChange={handleFormChange}
            placeholder="Describe your solution"
            className="border p-2 w-full"
          />
        </div>

        {/* Product Positioning */}
        <div className="mb-4">
          <label className="font-bold mb-1 block" htmlFor="positioning">
            Product Positioning & Unique Value
          </label>
          <input
            type="text"
            name="positioning"
            value={strategyForm.positioning}
            onChange={handleFormChange}
            placeholder="What makes your product unique?"
            className="border p-2 w-full"
          />
        </div>

        {/* Business Model & Monetization */}
        <div className="mb-4">
          <label className="font-bold mb-1 block" htmlFor="business_model">
            Business Model
          </label>
          <input
            type="text"
            name="business_model"
            value={strategyForm.business_model}
            onChange={handleFormChange}
            placeholder="e.g., subscription, advertising"
            className="border p-2 w-full mb-2"
          />
          <label className="font-bold mb-1 block" htmlFor="monetization">
            Monetization Strategy
          </label>
          <input
            type="text"
            name="monetization"
            value={strategyForm.monetization}
            onChange={handleFormChange}
            placeholder="How will your product make money?"
            className="border p-2 w-full"
          />
        </div>

        {/* Product Roadmap */}
        <div className="mb-4">
          <label className="font-bold mb-1 block" htmlFor="roadmap">
            Product Roadmap<span className="text-red-600">*</span>
          </label>
          <textarea
            name="roadmap"
            value={strategyForm.roadmap}
            onChange={handleFormChange}
            placeholder="Outline key features and planned release dates."
            rows="3"
            className="border p-2 w-full"
            required
          ></textarea>
        </div>

        {/* Go-To-Market Strategy */}
        <div className="mb-4">
          <label className="font-bold mb-1 block" htmlFor="go_to_market">
            Go-To-Market Strategy
          </label>
          <textarea
            name="go_to_market"
            value={strategyForm.go_to_market}
            onChange={handleFormChange}
            placeholder="How will you launch and promote your product?"
            rows="3"
            className="border p-2 w-full"
          ></textarea>
        </div>

        {/* Measuring Success */}
        <div className="mb-4">
          <label className="font-bold mb-1 block" htmlFor="kpis">
            Key Performance Indicators
          </label>
          <input
            type="text"
            name="kpis"
            value={strategyForm.kpis}
            onChange={handleFormChange}
            placeholder="e.g., DAU, conversion rate, revenue"
            className="border p-2 w-full mb-2"
          />
          <label className="font-bold mb-1 block" htmlFor="recommendation">
            Recommendation / Notes
          </label>
          <textarea
            name="recommendation"
            value={strategyForm.recommendation}
            onChange={handleFormChange}
            placeholder="Your review or recommendations (optional)"
            rows="2"
            className="border p-2 w-full"
          ></textarea>
        </div>

        <div className="flex space-x-4">
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
            {editingId ? "Update Strategy" : "Create Strategy"}
          </button>
          <button type="button" onClick={handleResetForm} className="bg-gray-500 text-white px-4 py-2 rounded">
            Reset
          </button>
        </div>
      </form>

      {/* View Mode Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
        <button
          onClick={() => setViewMode("table")}
          className={`w-full sm:w-auto px-4 py-2 rounded ${
            viewMode === "table" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Table View
        </button>
        <button
          onClick={() => setViewMode("organogram")}
          className={`w-full sm:w-auto px-4 py-2 rounded ${
            viewMode === "organogram" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Organogram View
        </button>
        <button
          onClick={() => window.print()}
          className="w-full sm:w-auto px-4 py-2 rounded bg-gray-800 text-white"
        >
          Print Dashboard
        </button>
      </div>

      {/* Dashboard: Display Strategies */}
      {viewMode === "table" ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-indigo-200">
              <tr>
                <th className="border p-2">Name</th>
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
              {strategies
                .filter((s) => s != null)
                .map((s) => (
                  <tr key={s.id} className="border-t">
                    <td className="border p-2">{s.name}</td>
                    <td className="border p-2">{s.mission}</td>
                    <td className="border p-2">{s.vision}</td>
                    <td className="border p-2">{s.target_audience}</td>
                    <td className="border p-2">{s.customer_problem}</td>
                    <td className="border p-2">{s.competitors}</td>
                    <td className="border p-2">{s.proposed_solution}</td>
                    <td className="border p-2">{s.positioning}</td>
                    <td className="border p-2">{s.business_model}</td>
                    <td className="border p-2">{s.monetization}</td>
                    <td className="border p-2">{s.roadmap}</td>
                    <td className="border p-2">{s.go_to_market}</td>
                    <td className="border p-2">{s.kpis}</td>
                    <td className="border p-2">{s.recommendation}</td>
                    <td className="border p-2 text-center">
                      <button onClick={() => handleEdit(s)} className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(s.id)} className="bg-red-600 text-white px-2 py-1 rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              {strategies.filter((s) => s != null).length === 0 && (
                <tr>
                  <td colSpan="15" className="border p-2 text-center">
                    No strategies available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <StrategyDoc/>
        </div>
      ) : (
        // Organogram View
        <div>
          {Object.keys(groupedData).length === 0 ? (
            <p className="text-center">No strategies to display.</p>
          ) : (
            Object.keys(groupedData).map((mission) => (
              <div key={mission} className="mb-6 border p-4 rounded shadow">
                <h3 className="text-xl font-bold">{mission}</h3>
                {groupedData[mission]
                  .filter((s) => s != null)
                  .map((s) => (
                    <div key={s.id} className="ml-4 mt-2 border-l pl-4">
                      <p>
                        <strong>Name:</strong> {s.name}
                      </p>
                      <p>
                        <strong>Vision:</strong> {s.vision}
                      </p>
                      <p>
                        <strong>Target Audience:</strong> {s.target_audience}
                      </p>
                      <p>
                        <strong>Customer Problem:</strong> {s.customer_problem}
                      </p>
                      <p>
                        <strong>Competitors:</strong> {s.competitors}
                      </p>
                      <p>
                        <strong>Proposed Solution:</strong> {s.proposed_solution}
                      </p>
                      <p>
                        <strong>Positioning:</strong> {s.positioning}
                      </p>
                      <p>
                        <strong>Business Model:</strong> {s.business_model}
                      </p>
                      <p>
                        <strong>Monetization:</strong> {s.monetization}
                      </p>
                      <p>
                        <strong>Roadmap:</strong> {s.roadmap}
                      </p>
                      <p>
                        <strong>Go-To-Market:</strong> {s.go_to_market}
                      </p>
                      <p>
                        <strong>KPIs:</strong> {s.kpis}
                      </p>
                      <p>
                        <strong>Recommendation:</strong> {s.recommendation}
                      </p>
                      <div className="mt-2">
                        <button onClick={() => handleEdit(s)} className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(s.id)} className="bg-red-600 text-white px-2 py-1 rounded">
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

export default ProductStrategy;
