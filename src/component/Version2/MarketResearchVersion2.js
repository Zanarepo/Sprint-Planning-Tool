import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "../../supabaseClient";
import MarketResearchFeatures from "../MarketResearchFeatures";

const MarketResearchDoc = () => {
  // State to hold the logged-in user’s email and id

  const [userId, setUserId] = useState(null);

  // State for the research docs list and for toggling expanded view of each doc
  const [researchList, setResearchList] = useState([]);
  const [expandedDocs, setExpandedDocs] = useState({});

  // Form state for creating/updating a research doc
  const initialResearch = {
    overview_title: "",
    overview_author: "",
    overview_date: "",
    overview_status: "",
    overview_version: "",
    market_description: "",
    market_size: "",
    demographics: "",
    market_segments: "",
    growth_projections: "",
    research_tools: "",
    research_methods: "",
    data_sources: "",
    gap_analysis: "",
    gap_recommendations: "",
    key_trends: "",
    trends_sources: "",
    swot_strengths: "",
    swot_weaknesses: "",
    swot_opportunities: "",
    swot_threats: "",
    competitor_analysis: "",
    competitor_profiles: "",
    final_recommendations: "",
    next_steps: ""
  };
  const [formData, setFormData] = useState(initialResearch);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Retrieve user email from localStorage and then fetch user id from Supabase
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
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

  // Wrap fetchResearchDocs in useCallback so that its identity is stable
  const fetchResearchDocs = useCallback(async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("market_research_docs")
      .select("*")
      .eq("user_id", userId);
    if (error) {
      console.error("Error fetching research docs:", error);
    } else {
      setResearchList(data);
    }
  }, [userId]);

  // Once userId is available, fetch all research docs for that user
  useEffect(() => {
    if (userId) {
      fetchResearchDocs();
    }
  }, [userId, fetchResearchDocs]);

  // Update form state for each change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Reset the form to its initial state
  const resetForm = () => {
    setFormData(initialResearch);
  };

  // Handle form submission for create and update operations
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error("User not identified. Cannot submit research document.");
      return;
    }
    if (isEditing) {
      // UPDATE operation: update existing document in the database
      const { data, error } = await supabase
        .from("market_research_docs")
        .update({ ...formData })
        .eq("id", editingId);
      if (error) {
        console.error("Error updating research doc:", error);
      } else {
        console.log("Research doc updated:", data);
        fetchResearchDocs();
        setIsEditing(false);
        setEditingId(null);
        resetForm();
      }
    } else {
      // CREATE operation: insert a new research document for the user
      const newDoc = { ...formData, user_id: userId };
      const { data, error } = await supabase
        .from("market_research_docs")
        .insert([newDoc]);
      if (error) {
        console.error("Error creating research doc:", error);
      } else {
        console.log("Research doc created:", data);
        fetchResearchDocs();
        resetForm();
      }
    }
  };

  // Load a document into the form for editing
  const handleEdit = (doc) => {
    setFormData(doc);
    setIsEditing(true);
    setEditingId(doc.id);
  };

  // Delete a document from the database
  const handleDelete = async (id) => {
    const { error } = await supabase
      .from("market_research_docs")
      .delete()
      .eq("id", id);
    if (error) {
      console.error("Error deleting research doc:", error);
    } else {
      console.log("Research doc deleted");
      fetchResearchDocs();
    }
  };

  // Toggle the expanded (detailed) view of a document in the list
  const handleToggle = (id) => {
    setExpandedDocs((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Cancel editing mode and reset the form
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    resetForm();
  };

  // Optional: Print the page
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto p-4" id="printableArea">
      
      <MarketResearchFeatures />
      <h1 className="text-3xl font-bold text-center mb-6">
        Market Research Documentation
      </h1>

      {/* Form to Create/Update a Market Research Document */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6"
      >
        {/* 1. Overview */}
        <h2 className="text-2xl font-bold mb-4">1. Overview</h2>
        <div className="mb-4">
          <label
            htmlFor="overview_title"
            className="block text-gray-700 font-bold mb-2"
          >
            Research Title
          </label>
          <input
            type="text"
            id="overview_title"
            name="overview_title"
            value={formData.overview_title}
            onChange={handleChange}
            placeholder="Enter the research title"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            required
          />
          <small className="text-gray-500">
            A clear, concise title for your market research study.
          </small>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label
              htmlFor="overview_author"
              className="block text-gray-700 font-bold mb-2"
            >
              Author
            </label>
            <input
              type="text"
              id="overview_author"
              name="overview_author"
              value={formData.overview_author}
              onChange={handleChange}
              placeholder="Your name"
              className="shadow appearance-none border rounded w-full py-2 px-3"
              required
            />
            <small className="text-gray-500">
              Who is responsible for this research?
            </small>
          </div>
          <div>
            <label
              htmlFor="overview_date"
              className="block text-gray-700 font-bold mb-2"
            >
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
            />
            <small className="text-gray-500">
              When was the research conducted?
            </small>
          </div>
          <div>
            <label
              htmlFor="overview_status"
              className="block text-gray-700 font-bold mb-2"
            >
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
            />
            <small className="text-gray-500">
              Current status of the documentation.
            </small>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="overview_version"
            className="block text-gray-700 font-bold mb-2"
          >
            Version
          </label>
          <input
            type="text"
            id="overview_version"
            name="overview_version"
            value={formData.overview_version}
            onChange={handleChange}
            placeholder="E.g., 1.0"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            required
          />
          <small className="text-gray-500">Document version number.</small>
        </div>

        {/* 2. Market Overview */}
        <h2 className="text-2xl font-bold mb-4">2. Market Overview</h2>
        <div className="mb-4">
          <label
            htmlFor="market_description"
            className="block text-gray-700 font-bold mb-2"
          >
            Market Description
          </label>
          <textarea
            id="market_description"
            name="market_description"
            value={formData.market_description}
            onChange={handleChange}
            placeholder="Describe the target market"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            rows="3"
            required
          ></textarea>
          <small className="text-gray-500">
            Provide an overview of the market, including its scope and
            characteristics.
          </small>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="market_size"
              className="block text-gray-700 font-bold mb-2"
            >
              Market Size
            </label>
            <input
              type="text"
              id="market_size"
              name="market_size"
              value={formData.market_size}
              onChange={handleChange}
              placeholder="E.g., $10B"
              className="shadow appearance-none border rounded w-full py-2 px-3"
              required
            />
            <small className="text-gray-500">
              Estimated total size of the market.
            </small>
          </div>
          <div>
            <label
              htmlFor="demographics"
              className="block text-gray-700 font-bold mb-2"
            >
              Demographics
            </label>
            <input
              type="text"
              id="demographics"
              name="demographics"
              value={formData.demographics}
              onChange={handleChange}
              placeholder="Key demographic details"
              className="shadow appearance-none border rounded w-full py-2 px-3"
              required
            />
            <small className="text-gray-500">
              Key demographic characteristics of the target audience.
            </small>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="market_segments"
              className="block text-gray-700 font-bold mb-2"
            >
              Market Segments
            </label>
            <input
              type="text"
              id="market_segments"
              name="market_segments"
              value={formData.market_segments}
              onChange={handleChange}
              placeholder="E.g., Consumer, Enterprise"
              className="shadow appearance-none border rounded w-full py-2 px-3"
              required
            />
            <small className="text-gray-500">
              Different segments within the market.
            </small>
          </div>
          <div>
            <label
              htmlFor="growth_projections"
              className="block text-gray-700 font-bold mb-2"
            >
              Growth Projections
            </label>
            <input
              type="text"
              id="growth_projections"
              name="growth_projections"
              value={formData.growth_projections}
              onChange={handleChange}
              placeholder="E.g., 5% YoY"
              className="shadow appearance-none border rounded w-full py-2 px-3"
              required
            />
            <small className="text-gray-500">
              Expected market growth rate.
            </small>
          </div>
        </div>

        {/* 3. Research Tools & Methods */}
        <h2 className="text-2xl font-bold mb-4">3. Research Tools & Methods</h2>
        <div className="mb-4">
          <label
            htmlFor="research_tools"
            className="block text-gray-700 font-bold mb-2"
          >
            Research Tools
          </label>
          <input
            type="text"
            id="research_tools"
            name="research_tools"
            value={formData.research_tools}
            onChange={handleChange}
            placeholder="E.g., Surveys, Focus Groups"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            required
          />
          <small className="text-gray-500">
            Tools and platforms used to collect data.
          </small>
        </div>
        <div className="mb-4">
          <label
            htmlFor="research_methods"
            className="block text-gray-700 font-bold mb-2"
          >
            Research Methods
          </label>
          <input
            type="text"
            id="research_methods"
            name="research_methods"
            value={formData.research_methods}
            onChange={handleChange}
            placeholder="E.g., Qualitative, Quantitative"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            required
          />
          <small className="text-gray-500">
            Methodologies used to conduct the research.
          </small>
        </div>
        <div className="mb-4">
          <label
            htmlFor="data_sources"
            className="block text-gray-700 font-bold mb-2"
          >
            Data Sources
          </label>
          <textarea
            id="data_sources"
            name="data_sources"
            value={formData.data_sources}
            onChange={handleChange}
            placeholder="List the sources (e.g., industry reports, surveys)"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            rows="2"
            required
          ></textarea>
          <small className="text-gray-500">
            Where the data was collected from.
          </small>
        </div>

        {/* 4. Gap Analysis */}
        <h2 className="text-2xl font-bold mb-4">4. Gap Analysis</h2>
        <div className="mb-4">
          <label
            htmlFor="gap_analysis"
            className="block text-gray-700 font-bold mb-2"
          >
            Gap Analysis
          </label>
          <textarea
            id="gap_analysis"
            name="gap_analysis"
            value={formData.gap_analysis}
            onChange={handleChange}
            placeholder="Identify gaps in the market"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            rows="3"
            required
          ></textarea>
          <small className="text-gray-500">
            Areas where current offerings do not meet market needs.
          </small>
        </div>
        <div className="mb-4">
          <label
            htmlFor="gap_recommendations"
            className="block text-gray-700 font-bold mb-2"
          >
            Recommendations
          </label>
          <textarea
            id="gap_recommendations"
            name="gap_recommendations"
            value={formData.gap_recommendations}
            onChange={handleChange}
            placeholder="Recommendations to address these gaps"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            rows="3"
            required
          ></textarea>
          <small className="text-gray-500">
            Suggestions on how to bridge the identified gaps.
          </small>
        </div>

        {/* 5. Key Trends */}
        <h2 className="text-2xl font-bold mb-4">5. Key Trends</h2>
        <div className="mb-4">
          <label
            htmlFor="key_trends"
            className="block text-gray-700 font-bold mb-2"
          >
            Key Trends
          </label>
          <textarea
            id="key_trends"
            name="key_trends"
            value={formData.key_trends}
            onChange={handleChange}
            placeholder="Describe the major trends impacting the market"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            rows="3"
            required
          ></textarea>
          <small className="text-gray-500">
            Emerging trends and dynamics in the industry.
          </small>
        </div>
        <div className="mb-4">
          <label
            htmlFor="trends_sources"
            className="block text-gray-700 font-bold mb-2"
          >
            Trend Sources
          </label>
          <textarea
            id="trends_sources"
            name="trends_sources"
            value={formData.trends_sources}
            onChange={handleChange}
            placeholder="E.g., industry reports, news articles"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            rows="2"
            required
          ></textarea>
          <small className="text-gray-500">
            Sources from which trend data was gathered.
          </small>
        </div>

        {/* 6. SWOT Analysis */}
        <h2 className="text-2xl font-bold mb-4">6. SWOT Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="swot_strengths"
              className="block text-gray-700 font-bold mb-2"
            >
              Strengths
            </label>
            <textarea
              id="swot_strengths"
              name="swot_strengths"
              value={formData.swot_strengths}
              onChange={handleChange}
              placeholder="List internal strengths"
              className="shadow appearance-none border rounded w-full py-2 px-3"
              rows="2"
              required
            ></textarea>
            <small className="text-gray-500">
              Internal attributes that provide a competitive advantage.
            </small>
          </div>
          <div>
            <label
              htmlFor="swot_weaknesses"
              className="block text-gray-700 font-bold mb-2"
            >
              Weaknesses
            </label>
            <textarea
              id="swot_weaknesses"
              name="swot_weaknesses"
              value={formData.swot_weaknesses}
              onChange={handleChange}
              placeholder="List internal weaknesses"
              className="shadow appearance-none border rounded w-full py-2 px-3"
              rows="2"
              required
            ></textarea>
            <small className="text-gray-500">
              Areas where the organization could improve.
            </small>
          </div>
          <div>
            <label
              htmlFor="swot_opportunities"
              className="block text-gray-700 font-bold mb-2"
            >
              Opportunities
            </label>
            <textarea
              id="swot_opportunities"
              name="swot_opportunities"
              value={formData.swot_opportunities}
              onChange={handleChange}
              placeholder="List external opportunities"
              className="shadow appearance-none border rounded w-full py-2 px-3"
              rows="2"
              required
            ></textarea>
            <small className="text-gray-500">
              External factors that the organization can capitalize on.
            </small>
          </div>
          <div>
            <label
              htmlFor="swot_threats"
              className="block text-gray-700 font-bold mb-2"
            >
              Threats
            </label>
            <textarea
              id="swot_threats"
              name="swot_threats"
              value={formData.swot_threats}
              onChange={handleChange}
              placeholder="List external threats"
              className="shadow appearance-none border rounded w-full py-2 px-3"
              rows="2"
              required
            ></textarea>
            <small className="text-gray-500">
              External risks that could impact the market.
            </small>
          </div>
        </div>

        {/* 7. Competitor Analysis */}
        <h2 className="text-2xl font-bold mb-4">7. Competitor Analysis</h2>
        <div className="mb-4">
          <label
            htmlFor="competitor_analysis"
            className="block text-gray-700 font-bold mb-2"
          >
            Competitor Overview
          </label>
          <textarea
            id="competitor_analysis"
            name="competitor_analysis"
            value={formData.competitor_analysis}
            onChange={handleChange}
            placeholder="Describe the competitive landscape"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            rows="3"
            required
          ></textarea>
          <small className="text-gray-500">
            Overview of the key players in the market.
          </small>
        </div>
        <div className="mb-4">
          <label
            htmlFor="competitor_profiles"
            className="block text-gray-700 font-bold mb-2"
          >
            Competitor Profiles
          </label>
          <textarea
            id="competitor_profiles"
            name="competitor_profiles"
            value={formData.competitor_profiles}
            onChange={handleChange}
            placeholder="Detail competitor strengths, weaknesses, and market positions"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            rows="3"
            required
          ></textarea>
          <small className="text-gray-500">
            Detailed information on each competitor.
          </small>
        </div>

        {/* 8. Final Recommendations */}
        <h2 className="text-2xl font-bold mb-4">8. Final Recommendations</h2>
        <div className="mb-4">
          <label
            htmlFor="final_recommendations"
            className="block text-gray-700 font-bold mb-2"
          >
            Recommendations
          </label>
          <textarea
            id="final_recommendations"
            name="final_recommendations"
            value={formData.final_recommendations}
            onChange={handleChange}
            placeholder="Summarize the final recommendations"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            rows="3"
            required
          ></textarea>
          <small className="text-gray-500">
            Actionable insights and recommendations based on the research.
          </small>
        </div>
        <div className="mb-4">
          <label
            htmlFor="next_steps"
            className="block text-gray-700 font-bold mb-2"
          >
            Next Steps
          </label>
          <textarea
            id="next_steps"
            name="next_steps"
            value={formData.next_steps}
            onChange={handleChange}
            placeholder="Outline the next steps"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            rows="2"
            required
          ></textarea>
          <small className="text-gray-500">
            Planned actions to implement the recommendations.
          </small>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-6">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          >
            {isEditing ? "Update Research" : "Add Research"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List of Market Research Documents */}
     <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6 overflow-x-auto">
  <h2 className="text-2xl font-bold mb-4">
    Your Market Research Documents
  </h2>
  {researchList.length === 0 ? (
    <p className="text-gray-600">
      No market research documents added yet.
    </p>
        ) : (
          <div  >
            
            {researchList.map((doc) => (
              <div key={doc.id} className="border rounded mb-4 p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
     
                  <div>
                    <h3 className="text-xl font-bold">{doc.overview_title}</h3>
                    <p className="text-gray-600">
                      {doc.overview_author} - {doc.overview_date}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:flex-nowrap">
  <button
    onClick={() => handleToggle(doc.id)}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
  >
    {expandedDocs[doc.id] ? "Hide " : "Show"}
  </button>
  <button
    onClick={() => handleEdit(doc)}
    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
  >
    Edit
  </button>
  <button
    onClick={() => handleDelete(doc.id)}
    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
  >
    Delete
  </button>
</div>

                </div>
                {expandedDocs[doc.id] && (
           <div className="mt-4">
           <h2 className="text-2xl font-bold mb-4">Market Research Details</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
            <p>
              <strong>Status:</strong> {doc.overview_status}
            </p>
            <p>
              <strong>Version:</strong> {doc.overview_version}
            </p>
            <p>
              <strong>Market Description:</strong> {doc.market_description}
            </p>
            <p>
              <strong>Market Size:</strong> {doc.market_size}
            </p>
            <p>
              <strong>Demographics:</strong> {doc.demographics}
            </p>
            <p>
              <strong>Market Segments:</strong> {doc.market_segments}
            </p>
            <p>
              <strong>Growth Projections:</strong> {doc.growth_projections}
            </p>
            <p>
              <strong>Research Tools:</strong> {doc.research_tools}
            </p>
            <p>
              <strong>Research Methods:</strong> {doc.research_methods}
            </p>
            <p>
              <strong>Data Sources:</strong> {doc.data_sources}
            </p>
            <p>
              <strong>Gap Analysis:</strong> {doc.gap_analysis}
            </p>
            <p>
              <strong>Recommendations:</strong> {doc.gap_recommendations}
            </p>
            <p>
              <strong>Key Trends:</strong> {doc.key_trends}
            </p>
            <p>
              <strong>Trend Sources:</strong> {doc.trends_sources}
            </p>
            <p>
              <strong>SWOT Strengths:</strong> {doc.swot_strengths}
            </p>
            <p>
              <strong>SWOT Weaknesses:</strong> {doc.swot_weaknesses}
            </p>
            <p>
              <strong>SWOT Opportunities:</strong> {doc.swot_opportunities}
            </p>
            <p>
              <strong>SWOT Threats:</strong> {doc.swot_threats}
            </p>
            <p>
              <strong>Competitor Analysis:</strong> {doc.competitor_analysis}
            </p>
            <p>
              <strong>Competitor Profiles:</strong> {doc.competitor_profiles}
            </p>
            <p>
              <strong>Final Recommendations:</strong> {doc.final_recommendations}
            </p>
            <p>
              <strong>Next Steps:</strong> {doc.next_steps}
            </p>
          </div>
          </div>
                )}
              </div>
            ))}
          </div>
        )}
        

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
    </div>
  );
};

export default MarketResearchDoc;


















































