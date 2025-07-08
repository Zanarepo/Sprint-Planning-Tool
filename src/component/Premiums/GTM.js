
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../supabaseClient';
import GTMFeature from './GTMFeature'
import { jsPDF } from 'jspdf';

const GTMStrategySimulator = () => {
  // Initial structure of a GTM strategy document
  const initialStrategy = {
    overview_title: "",
    overview_product: "",
    overview_owner: "",
    overview_date: "",
    overview_status: "",
    target_market: "",
    market_needs: "",
    buyer_personas: "",
    value_proposition: "",
    unique_selling_points: "",
    pricing_model: "",
    pricing_justification: "",
    distribution_channels: "",
    channel_strategy: "",
    marketing_goals: "",
    marketing_tactics: "",
    marketing_budget: "",
    sales_approach: "",
    sales_team_structure: "",
    launch_timeline: "",
    launch_milestones: "",
    success_metrics: "",
    kpi_targets: "",
    risks: "",
    mitigation_strategies: "",
  };

  // State management
  const [strategyList, setStrategyList] = useState([]);
  const [formData, setFormData] = useState(initialStrategy);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setuserId] = useState(null);

  const [viewStrategy, setViewStrategy] = useState(null);

  // Fetch user ID from localStorage
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      console.debug("User email found in localStorage:", email);
      const fetchUserId = async () => {
        try {
          const { data, error } = await supabase
            .from("users")
            .select("id")
            .eq("email", email)
            .single();
          if (error) {
            console.error("Error fetching user ID:", error);
            setError("Failed to fetch user ID: " + error.message);
          } else if (data) {
            setuserId(data.id);

          }
        } catch (err) {
          console.error("Unexpected error fetching user ID:", err);
          setError("Unexpected error fetching user ID: " + err.message);
        }
      };
      fetchUserId();
    } else {
      console.debug("No user email found in localStorage.");
      setError("No user email found in localStorage. Please try logging in again.");
    }
  }, []);

  // Memoize fetchStrategies
  const fetchStrategies = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("gtm_strategies")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setStrategyList(data || []);
    } catch (err) {
      setError("Failed to fetch strategies: " + err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Fetch strategies when userId changes
  useEffect(() => {
    if (userId) {
      fetchStrategies();
    }
  }, [userId, fetchStrategies]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setError("Cannot submit: No user ID available. Please log in.");
      return;
    }

    setLoading(true);
    try {
      const strategyData = { ...formData, user_id: userId };

      if (isEditing) {
        // Update existing strategy
        const { error } = await supabase
          .from("gtm_strategies")
          .update(strategyData)
          .eq("id", editingId)
          .eq("user_id", userId);

        if (error) throw error;
        setStrategyList((prev) =>
          prev.map((strategy) =>
            strategy.id === editingId ? { ...strategyData, id: editingId } : strategy
          )
        );
        setIsEditing(false);
        setEditingId(null);
      } else {
        // Create new strategy
        const { data, error } = await supabase
          .from("gtm_strategies")
          .insert(strategyData)
          .select()
          .single();

        if (error) throw error;
        setStrategyList((prev) => [data, ...prev]);
      }
      setFormData(initialStrategy);
    } catch (err) {
      setError("Failed to save strategy: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (strategy) => {
    setFormData(strategy);
    setIsEditing(true);
    setEditingId(strategy.id);
    setViewStrategy(null);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!userId) {
      setError("Cannot delete: No user ID available. Please log in.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("gtm_strategies")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);

      if (error) throw error;
      setStrategyList((prev) => prev.filter((strategy) => strategy.id !== id));
    } catch (err) {
      setError("Failed to delete strategy: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle view
  const handleView = (strategy) => {
    setViewStrategy(strategy);
  };

  // Close view modal
  const handleCloseView = () => {
    setViewStrategy(null);
  };

  // Download strategy as PDF
  const handleDownloadPDF = (strategy) => {
    const doc = new jsPDF();
    let yOffset = 10;

    // Title
    doc.setFontSize(16);
    doc.text("GTM Strategy Document", 10, yOffset);
    yOffset += 10;

    // Sections
    const sections = [
      {
        title: "1. Strategy Overview",
        fields: [
          { label: "Title", value: strategy.overview_title },
          { label: "Product", value: strategy.overview_product },
          { label: "Owner", value: strategy.overview_owner },
          { label: "Date", value: strategy.overview_date },
          { label: "Status", value: strategy.overview_status },
        ],
      },
      {
        title: "2. Target Market",
        fields: [
          { label: "Target Market", value: strategy.target_market },
          { label: "Market Needs", value: strategy.market_needs },
          { label: "Buyer Personas", value: strategy.buyer_personas },
        ],
      },
      {
        title: "3. Value Proposition",
        fields: [
          { label: "Value Proposition", value: strategy.value_proposition },
          { label: "Unique Selling Points", value: strategy.unique_selling_points },
        ],
      },
      {
        title: "4. Pricing Strategy",
        fields: [
          { label: "Pricing Model", value: strategy.pricing_model },
          { label: "Pricing Justification", value: strategy.pricing_justification },
        ],
      },
      {
        title: "5. Distribution Channels",
        fields: [
          { label: "Distribution Channels", value: strategy.distribution_channels },
          { label: "Channel Strategy", value: strategy.channel_strategy },
        ],
      },
      {
        title: "6. Marketing Plan",
        fields: [
          { label: "Marketing Goals", value: strategy.marketing_goals },
          { label: "Marketing Tactics", value: strategy.marketing_tactics },
          { label: "Marketing Budget", value: strategy.marketing_budget },
        ],
      },
      {
        title: "7. Sales Strategy",
        fields: [
          { label: "Sales Approach", value: strategy.sales_approach },
          { label: "Sales Team Structure", value: strategy.sales_team_structure },
        ],
      },
      {
        title: "8. Launch Plan",
        fields: [
          { label: "Launch Timeline", value: strategy.launch_timeline },
          { label: "Launch Milestones", value: strategy.launch_milestones },
        ],
      },
      {
        title: "9. Success Metrics",
        fields: [
          { label: "Success Metrics", value: strategy.success_metrics },
          { label: "KPI Targets", value: strategy.kpi_targets },
        ],
      },
      {
        title: "10. Risk Analysis",
        fields: [
          { label: "Risks", value: strategy.risks },
          { label: "Mitigation Strategies", value: strategy.mitigation_strategies },
        ],
      },
    ];

    sections.forEach((section) => {
      doc.setFontSize(12);
      doc.text(section.title, 10, yOffset);
      yOffset += 7;

      section.fields.forEach((field) => {
        doc.setFontSize(10);
        const text = `${field.label}: ${field.value || "N/A"}`;
        const splitText = doc.splitTextToSize(text, 180);
        doc.text(splitText, 10, yOffset);
        yOffset += splitText.length * 5 + 2;
      });

      yOffset += 5;
    });

    // Save PDF
    doc.save(`${strategy.overview_title || "GTM_Strategy"}.pdf`);
  };

  // Print page
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto p-4" id="printableArea">
        <GTMFeature/>
      <h1 className="text-3xl font-bold text-center mb-6">Go-to-Market Strategy Simulator</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {loading && <p className="text-gray-500 text-center mb-4">Loading...</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
        {/* 1. Strategy Overview */}
        <h2 className="text-xl font-bold mb-4">1. Strategy Overview</h2>
        <div className="mb-4">
          <label htmlFor="overview_title" className="block text-gray-700 font-bold mb-2">
            Strategy Title
          </label>
          <input
            type="text"
            id="overview_title"
            name="overview_title"
            value={formData.overview_title}
            onChange={handleChange}
            placeholder="Enter the strategy title"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            required
            disabled={loading || !userId}
          />
          <small className="text-gray-500">A clear, concise title for your GTM strategy.</small>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="overview_product" className="block text-gray-700 font-bold mb-2">
              Product
            </label>
            <input
              type="text"
              id="overview_product"
              name="overview_product"
              value={formData.overview_product}
              onChange={handleChange}
              placeholder="Product name"
              className="shadow appearance-none border rounded w-full py-2 px-3"
              required
              disabled={loading || !userId}
            />
            <small className="text-gray-500">The product this strategy is for.</small>
          </div>
          <div>
            <label htmlFor="overview_owner" className="block text-gray-700 font-bold mb-2">
              Owner
            </label>
            <input
              type="text"
              id="overview_owner"
              name="overview_owner"
              value={formData.overview_owner}
              onChange={handleChange}
              placeholder="Strategy owner"
              className="shadow appearance-none border rounded w-full py-2 px-3"
              required
              disabled={loading || !userId}
            />
            <small className="text-gray-500">Who is responsible for this strategy?</small>
          </div>
          <div>
            <label htmlFor="overview_date" className="block text-gray-700 font-bold mb-2">
              Date
            </label>
            <input
              type="date"
              id="overview_date"
              name="overview_date"
              value={formData.overview_date}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3"
              required
              disabled={loading || !userId}
            />
            <small className="text-gray-500">When was the strategy created?</small>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="overview_status" className="block text-gray-700 font-bold mb-2">
            Status
          </label>
          <input
            type="text"
            id="overview_status"
            name="overview_status"
            value={formData.overview_status}
            onChange={handleChange}
            placeholder="E.g., Draft, Final"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            required
            disabled={loading || !userId}
          />
          <small className="text-gray-500">Current status of the strategy.</small>
        </div>

        {/* 2. Target Market */}
        <h2 className="text-xl font-bold mb-4">2. Target Market</h2>
        <div className="mb-4">
          <label htmlFor="target_market" className="block text-gray-700 font-bold mb-2">
            Target Market
          </label>
          <textarea
            id="target_market"
            name="target_market"
            value={formData.target_market}
            onChange={handleChange}
            placeholder="Describe the target market"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            rows="3"
            required
            disabled={loading || !userId}
          ></textarea>
          <small className="text-gray-500">Who is the intended audience for the product?</small>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="market_needs" className="block text-gray-700 font-bold mb-2">
              Market Needs
            </label>
            <textarea
              id="market_needs"
              name="market_needs"
              value={formData.market_needs}
              onChange={handleChange}
              placeholder="Key needs of the target market"
              className="shadow appearance-none border rounded w-full py-2 px-3"
              rows="2"
              required
              disabled={loading || !userId}
            ></textarea>
            <small className="text-gray-500">What problems does the product solve?</small>
          </div>
          <div>
            <label htmlFor="buyer_personas" className="block text-gray-700 font-bold mb-2">
              Buyer Personas
            </label>
            <textarea
              id="buyer_personas"
              name="buyer_personas"
              value={formData.buyer_personas}
              onChange={handleChange}
              placeholder="Describe key buyer personas"
              className="shadow appearance-none border rounded w-full py-2 px-3"
              rows="2"
              required
              disabled={loading || !userId}
            ></textarea>
            <small className="text-gray-500">Detailed profiles of typical buyers.</small>
          </div>
        </div>

        {/* 3. Value Proposition */}
        <h2 className="text-xl font-bold mb-4">3. Value Proposition</h2>
        <div className="mb-4">
          <label htmlFor="value_proposition" className="block text-gray-700 font-bold mb-2">
            Value Proposition
          </label>
          <textarea
            id="value_proposition"
            name="value_proposition"
            value={formData.value_proposition}
            onChange={handleChange}
            placeholder="What makes your product unique?"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            rows="3"
            required
            disabled={loading || !userId}
          ></textarea>
          <small className="text-gray-500">Why customers should choose your product.</small>
        </div>
        <div className="mb-4">
          <label htmlFor="unique_selling_points" className="block text-gray-700 font-bold mb-2">
            Unique Selling Points
          </label>
          <textarea
            id="unique_selling_points"
            name="unique_selling_points"
            value={formData.unique_selling_points}
            onChange={handleChange}
            placeholder="List key differentiators"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            rows="2"
            required
            disabled={loading || !userId}
          ></textarea>
          <small className="text-gray-500">Specific features that set the product apart.</small>
        </div>

        {/* 4. Pricing Strategy */}
        <h2 className="text-xl font-bold mb-4">4. Pricing Strategy</h2>
        <div className="mb-4">
          <label htmlFor="pricing_model" className="block text-gray-700 font-bold mb-2">
            Pricing Model
          </label>
          <input
            type="text"
            id="pricing_model"
            name="pricing_model"
            value={formData.pricing_model}
            onChange={handleChange}
            placeholder="E.g., Subscription, One-time"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            required
            disabled={loading || !userId}
          />
          <small className="text-gray-500">How will the product be priced?</small>
        </div>
        <div className="mb-4">
          <label htmlFor="pricing_justification" className="block text-gray-700 font-bold mb-2">
            Pricing Justification
          </label>
          <textarea
            id="pricing_justification"
            name="pricing_justification"
            value={formData.pricing_justification}
            onChange={handleChange}
            placeholder="Justify the pricing strategy"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            rows="2"
            required
            disabled={loading || !userId}
          ></textarea>
          <small className="text-gray-500">Why is this pricing appropriate?</small>
        </div>

        {/* 5. Distribution Channels */}
        <h2 className="text-xl font-bold mb-4">5. Distribution Channels</h2>
        <div className="mb-4">
          <label htmlFor="distribution_channels" className="block text-gray-700 font-bold mb-2">
            Distribution Channels
          </label>
          <input
            type="text"
            id="distribution_channels"
            name="distribution_channels"
            value={formData.distribution_channels}
            onChange={handleChange}
            placeholder="E.g., Direct Sales, Online Store"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            required
            disabled={loading || !userId}
          />
          <small className="text-gray-500">How will the product reach customers?</small>
        </div>
        <div className="mb-4">
          <label htmlFor="channel_strategy" className="block text-gray-700 font-bold mb-2">
            Channel Strategy
          </label>
          <textarea
            id="channel_strategy"
            name="channel_strategy"
            value={formData.channel_strategy}
            onChange={handleChange}
            placeholder="Describe the distribution strategy"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            rows="2"
            required
            disabled={loading || !userId}
          ></textarea>
          <small className="text-gray-500">Details of how channels will be utilized.</small>
        </div>

        {/* 6. Marketing Plan */}
        <h2 className="text-xl font-bold mb-4">6. Marketing Plan</h2>
        <div className="mb-4">
          <label htmlFor="marketing_goals" className="block text-gray-700 font-bold mb-2">
            Marketing Goals
          </label>
          <textarea
            id="marketing_goals"
            name="marketing_goals"
            value={formData.marketing_goals}
            onChange={handleChange}
            placeholder="List marketing objectives"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            rows="2"
            required
            disabled={loading || !userId}
          ></textarea>
          <small className="text-gray-500">What are the key marketing objectives?</small>
        </div>
        <div className="mb-4">
          <label htmlFor="marketing_tactics" className="block text-gray-700 font-bold mb-2">
            Marketing Tactics
          </label>
          <textarea
            id="marketing_tactics"
            name="marketing_tactics"
            value={formData.marketing_tactics}
            onChange={handleChange}
            placeholder="E.g., Social Media, Email Campaigns"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            rows="2"
            required
            disabled={loading || !userId}
          ></textarea>
          <small className="text-gray-500">Specific tactics to achieve marketing goals.</small>
        </div>
        <div className="mb-4">
          <label htmlFor="marketing_budget" className="block text-gray-700 font-bold mb-2">
            Marketing Budget
          </label>
          <input
            type="text"
            id="marketing_budget"
            name="marketing_budget"
            value={formData.marketing_budget}
            onChange={handleChange}
            placeholder="E.g., $50,000"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            required
            disabled={loading || !userId}
          />
          <small className="text-gray-500">Estimated budget for marketing activities.</small>
        </div>

        {/* 7. Sales Strategy */}
        <h2 className="text-xl font-bold mb-4">7. Sales Strategy</h2>
        <div className="mb-4">
          <label htmlFor="sales_approach" className="block text-gray-700 font-bold mb-2">
            Sales Approach
          </label>
          <textarea
            id="sales_approach"
            name="sales_approach"
            value={formData.sales_approach}
            onChange={handleChange}
            placeholder="Describe the sales approach"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            rows="2"
            required
            disabled={loading || !userId}
          ></textarea>
          <small className="text-gray-500">How will the sales team operate?</small>
        </div>
        <div className="mb-4">
          <label htmlFor="sales_team_structure" className="block text-gray-700 font-bold mb-2">
            Sales Team Structure
          </label>
          <textarea
            id="sales_team_structure"
            name="sales_team_structure"
            value={formData.sales_team_structure}
            onChange={handleChange}
            placeholder="Describe the sales team organization"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            rows="2"
            required
            disabled={loading || !userId}
          ></textarea>
          <small className="text-gray-500">Structure and roles within the sales team.</small>
        </div>

        {/* 8. Launch Plan */}
        <h2 className="text-xl font-bold mb-4">8. Launch Plan</h2>
        <div className="mb-4">
          <label htmlFor="launch_timeline" className="block text-gray-700 font-bold mb-2">
            Launch Timeline
          </label>
          <textarea
            id="launch_timeline"
            name="launch_timeline"
            value={formData.launch_timeline}
            onChange={handleChange}
            placeholder="Outline the launch timeline"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            rows="2"
            required
            disabled={loading || !userId}
          ></textarea>
          <small className="text-gray-500">Key dates and phases of the product launch.</small>
        </div>
        <div className="mb-4">
          <label htmlFor="launch_milestones" className="block text-gray-700 font-bold mb-2">
            Launch Milestones
          </label>
          <textarea
            id="launch_milestones"
            name="launch_milestones"
            value={formData.launch_milestones}
            onChange={handleChange}
            placeholder="List key milestones"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            rows="2"
            required
            disabled={loading || !userId}
          ></textarea>
          <small className="text-gray-500">Critical achievements for the launch.</small>
        </div>

        {/* 9. Success Metrics */}
        <h2 className="text-xl font-bold mb-4">9. Success Metrics</h2>
        <div className="mb-4">
          <label htmlFor="success_metrics" className="block text-gray-700 font-bold mb-2">
            Success Metrics
          </label>
          <textarea
            id="success_metrics"
            name="success_metrics"
            value={formData.success_metrics}
            onChange={handleChange}
            placeholder="E.g., Revenue, Market Share"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            rows="2"
            required
            disabled={loading || !userId}
          ></textarea>
          <small className="text-gray-500">How will success be measured?</small>
        </div>
        <div className="mb-4">
          <label htmlFor="kpi_targets" className="block text-gray-700 font-bold mb-2">
            KPI Targets
          </label>
          <textarea
            id="kpi_targets"
            name="kpi_targets"
            value={formData.kpi_targets}
            onChange={handleChange}
            placeholder="Specific KPI targets"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            rows="2"
            required
            disabled={loading || !userId}
          ></textarea>
          <small className="text-gray-500">Quantifiable goals for key performance indicators.</small>
        </div>

        {/* 10. Risk Analysis */}
        <h2 className="text-xl font-bold mb-4">10. Risk Analysis</h2>
        <div className="mb-4">
          <label htmlFor="risks" className="block text-gray-700 font-bold mb-2">
            Risks
          </label>
          <textarea
            id="risks"
            name="risks"
            value={formData.risks}
            onChange={handleChange}
            placeholder="List potential risks"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            rows="2"
            required
            disabled={loading || !userId}
          ></textarea>
          <small className="text-gray-500">Potential challenges to the GTM strategy.</small>
        </div>
        <div className="mb-4">
          <label htmlFor="mitigation_strategies" className="block text-gray-700 font-bold mb-2">
            Mitigation Strategies
          </label>
          <textarea
            id="mitigation_strategies"
            name="mitigation_strategies"
            value={formData.mitigation_strategies}
            onChange={handleChange}
            placeholder="How to address these risks"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            rows="2"
            required
            disabled={loading || !userId}
          ></textarea>
          <small className="text-gray-500">Plans to minimize or avoid risks.</small>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-6">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none disabled:opacity-50"
            disabled={loading || !userId}
          >
            {isEditing ? "Update Strategy" : "Add Strategy"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setFormData(initialStrategy);
                setEditingId(null);
              }}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none disabled:opacity-50"
              disabled={loading || !userId}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Strategies Table */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6 overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">Documented GTM Strategies</h2>
        {strategyList.length === 0 ? (
          <p className="text-gray-600">No GTM strategies added yet.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {strategyList.map((strategy) => (
                <tr key={strategy.id}>
                  <td className="px-4 py-2 whitespace-nowrap">{strategy.overview_title}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{strategy.overview_product}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{strategy.overview_owner}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{strategy.overview_date}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{strategy.overview_status}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <button
                      onClick={() => handleView(strategy)}
                      className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-3 rounded mr-2 disabled:opacity-50"
                      disabled={loading || !userId}
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(strategy)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2 disabled:opacity-50"
                      disabled={loading || !userId}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(strategy.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded disabled:opacity-50"
                      disabled={loading || !userId}
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

      {/* View Strategy Modal */}
      {viewStrategy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">GTM Strategy Details</h2>
            {/* 1. Strategy Overview */}
            <h3 className="text-xl font-semibold mb-2">1. Strategy Overview</h3>
            <p><strong>Title:</strong> {viewStrategy.overview_title}</p>
            <p><strong>Product:</strong> {viewStrategy.overview_product}</p>
            <p><strong>Owner:</strong> {viewStrategy.overview_owner}</p>
            <p><strong>Date:</strong> {viewStrategy.overview_date}</p>
            <p><strong>Status:</strong> {viewStrategy.overview_status}</p>

            {/* 2. Target Market */}
            <h3 className="text-xl font-semibold mt-4 mb-2">2. Target Market</h3>
            <p><strong>Target Market:</strong> {viewStrategy.target_market}</p>
            <p><strong>Market Needs:</strong> {viewStrategy.market_needs}</p>
            <p><strong>Buyer Personas:</strong> {viewStrategy.buyer_personas}</p>

            {/* 3. Value Proposition */}
            <h3 className="text-xl font-semibold mt-4 mb-2">3. Value Proposition</h3>
            <p><strong>Value Proposition:</strong> {viewStrategy.value_proposition}</p>
            <p><strong>Unique Selling Points:</strong> {viewStrategy.unique_selling_points}</p>

            {/* 4. Pricing Strategy */}
            <h3 className="text-xl font-semibold mt-4 mb-2">4. Pricing Strategy</h3>
            <p><strong>Pricing Model:</strong> {viewStrategy.pricing_model}</p>
            <p><strong>Pricing Justification:</strong> {viewStrategy.pricing_justification}</p>

            {/* 5. Distribution Channels */}
            <h3 className="text-xl font-semibold mt-4 mb-2">5. Distribution Channels</h3>
            <p><strong>Distribution Channels:</strong> {viewStrategy.distribution_channels}</p>
            <p><strong>Channel Strategy:</strong> {viewStrategy.channel_strategy}</p>

            {/* 6. Marketing Plan */}
            <h3 className="text-xl font-semibold mt-4 mb-2">6. Marketing Plan</h3>
            <p><strong>Marketing Goals:</strong> {viewStrategy.marketing_goals}</p>
            <p><strong>Marketing Tactics:</strong> {viewStrategy.marketing_tactics}</p>
            <p><strong>Marketing Budget:</strong> {viewStrategy.marketing_budget}</p>

            {/* 7. Sales Strategy */}
            <h3 className="text-xl font-semibold mt-4 mb-2">7. Sales Strategy</h3>
            <p><strong>Sales Approach:</strong> {viewStrategy.sales_approach}</p>
            <p><strong>Sales Team Structure:</strong> {viewStrategy.sales_team_structure}</p>

            {/* 8. Launch Plan */}
            <h3 className="text-xl font-semibold mt-4 mb-2">8. Launch Plan</h3>
            <p><strong>Launch Timeline:</strong> {viewStrategy.launch_timeline}</p>
            <p><strong>Launch Milestones:</strong> {viewStrategy.launch_milestones}</p>

            {/* 9. Success Metrics */}
            <h3 className="text-xl font-semibold mt-4 mb-2">9. Success Metrics</h3>
            <p><strong>Success Metrics:</strong> {viewStrategy.success_metrics}</p>
            <p><strong>KPI Targets:</strong> {viewStrategy.kpi_targets}</p>

            {/* 10. Risk Analysis */}
            <h3 className="text-xl font-semibold mt-4 mb-2">10. Risk Analysis</h3>
            <p><strong>Risks:</strong> {viewStrategy.risks}</p>
            <p><strong>Mitigation Strategies:</strong> {viewStrategy.mitigation_strategies}</p>

            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => handleDownloadPDF(viewStrategy)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Download PDF
              </button>
              <button
                onClick={handleCloseView}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print Button */}
      <div className="text-center mb-6">
        <button
          onClick={handlePrint}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          disabled={loading || !userId}
        >
          Print Page
        </button>
      </div>
    </div>
  );
};

export default GTMStrategySimulator;