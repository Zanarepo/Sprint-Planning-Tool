import React, { useState, useEffect , useCallback} from "react";
import { supabase } from "../supabaseClient";
import PRDFeature from "./PRDFeature";
import PRDdocument from  './PRDdocument'

const PRDDocument = () => {
  // State for user information
  const [, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);

  // Initial state for the PRD document form fields
  const initialPRD = {
    // 1. Overview
    overview_productname: "",
    overview_author: "",
    overview_date: "",
    overview_status: "",
    overview_version: "",
    // 2. Executive Summary
    executive_problemstatement: "",
    executive_goals: "",
    executive_scope: "",
    // 3. Target Audience
    audience_primary: "",
    audience_secondary: "",
    audience_personas: "",
    // 4. Use Cases
    usecases: "",
    // 5. Features & Requirements
    features_core: "",
    features_prioritization: "",
    features_technical: "",
    features_uiux: "",
    // 6. Timeline & Milestones
    timeline_launch: "",
    timeline_phases: "",
    timeline_milestones: "",
    // 7. Metrics for Success
    metrics_kpis: "",
    metrics_tracking: "",
    // 8. Dependencies
    dependencies_technical: "",
    dependencies_business: "",
    // 9. Risks & Mitigation
    risks_factors: "",
    risks_mitigation: "",
    // 10. Stakeholders
    stakeholders_internal: "",
    stakeholders_external: "",
    // 11. Budget & Resources
    budget: "",
    resources: "",
    // 12. Post-Launch Plan
    post_launch_monitoring: "",
    post_launch_maintenance: "",
  };

  


  // State to hold form data, the list of PRDs, and editing status
  const [formData, setFormData] = useState(initialPRD);
  const [prdList, setPrdList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
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

  // Wrap fetchPRDs in useCallback so it can be used safely as a dependency
  const fetchPRDs = useCallback(async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("prd_documents")
      .select("*")
      .eq("user_id", userId);
    if (error) {
      console.error("Error fetching PRDs:", error);
    } else {
      setPrdList(data);
    }
  }, [userId]);

  // When userId is set, fetch that user's PRD documents
  useEffect(() => {
    if (userId) {
      fetchPRDs();
    }
  }, [userId, fetchPRDs]);

  // Handle all input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission for both creating and updating a PRD
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error("User ID not set, cannot submit PRD");
      return;
    }
    if (isEditing) {
      // Update an existing PRD record
      const { data, error } = await supabase
        .from("prd_documents")
        .update({ ...formData })
        .eq("id", editingId);
      if (error) {
        console.error("Error updating PRD:", error);
      } else {
        console.debug("PRD updated successfully:", data);
        fetchPRDs();
      }
      setIsEditing(false);
      setEditingId(null);
    } else {
      // Create a new PRD record
      const { data, error } = await supabase
        .from("prd_documents")
        .insert([{ user_id: userId, ...formData }]);
      if (error) {
        console.error("Error creating PRD:", error);
      } else {
        console.debug("PRD created successfully:", data);
        fetchPRDs();
      }
    }
    setFormData(initialPRD);
  };

  // Populate the form for editing an existing PRD
  const handleEdit = (prd) => {
    setFormData(prd);
    setIsEditing(true);
    setEditingId(prd.id);
  };

  // Delete a PRD record
  const handleDelete = async (id) => {
    const { error } = await supabase
      .from("prd_documents")
      .delete()
      .eq("id", id);
    if (error) {
      console.error("Error deleting PRD:", error);
    } else {
      console.debug("PRD deleted successfully");
      fetchPRDs();
    }
  };



  // Print the page
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto p-4" id="printableArea">
      <PRDFeature />

      {/* Form to add/update a PRD */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
        {/* 1. Overview */}
        <h2 className="text-2xl font-bold mb-4">1. Overview</h2>
        <div className="mb-4">
          <label htmlFor="overview_productname" className="block text-gray-700 font-bold mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="overview_productname"
            name="overview_productname"
            value={formData.overview_productname}
            onChange={handleInputChange}
            placeholder="Enter the product or feature name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
          <small className="text-gray-500">
            The name of the product or feature being developed.
          </small>
        </div>
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="overview_author" className="block text-gray-700 font-bold mb-2">
              Author
            </label>
            <input
              type="text"
              id="overview_author"
              name="overview_author"
              value={formData.overview_author}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
            <small className="text-gray-500">
              The person responsible for writing this PRD.
            </small>
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
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
            <small className="text-gray-500">The date on which the PRD is created.</small>
          </div>
        </div>
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="overview_status" className="block text-gray-700 font-bold mb-2">
              Status
            </label>
            <input
              type="text"
              id="overview_status"
              name="overview_status"
              value={formData.overview_status}
              onChange={handleInputChange}
              placeholder="E.g., Draft, In Review, Approved"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
            <small className="text-gray-500">Current state of the PRD.</small>
          </div>
          <div>
            <label htmlFor="overview_version" className="block text-gray-700 font-bold mb-2">
              Version
            </label>
            <input
              type="text"
              id="overview_version"
              name="overview_version"
              value={formData.overview_version}
              onChange={handleInputChange}
              placeholder="Enter the version number (e.g., 1.0)"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
            <small className="text-gray-500">Version number of the PRD.</small>
          </div>
        </div>

        {/* 2. Executive Summary */}
        <h2 className="text-2xl font-bold mb-4">2. Executive Summary</h2>
        <div className="mb-4">
          <label htmlFor="executive_problemstatement" className="block text-gray-700 font-bold mb-2">
            Problem Statement
          </label>
          <textarea
            id="executive_problemstatement"
            name="executive_problemstatement"
            value={formData.executive_problemstatement}
            onChange={handleInputChange}
            placeholder="Describe the problem being solved"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            rows="3"
            required
          ></textarea>
          <small className="text-gray-500">Explain why this product or feature is needed.</small>
        </div>
        <div className="mb-4">
          <label htmlFor="executive_goals" className="block text-gray-700 font-bold mb-2">
            Goals & Objectives
          </label>
          <textarea
            id="executive_goals"
            name="executive_goals"
            value={formData.executive_goals}
            onChange={handleInputChange}
            placeholder="List the goals and objectives of the product"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            rows="3"
            required
          ></textarea>
          <small className="text-gray-500">
            Define measurable objectives and KPIs for success.
          </small>
        </div>
        <div className="mb-4">
          <label htmlFor="executive_scope" className="block text-gray-700 font-bold mb-2">
            Scope
          </label>
          <textarea
            id="executive_scope"
            name="executive_scope"
            value={formData.executive_scope}
            onChange={handleInputChange}
            placeholder="Define the boundaries of the project"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            rows="3"
            required
          ></textarea>
          <small className="text-gray-500">
            Clarify what is included and excluded in the project.
          </small>
        </div>

        {/* 3. Target Audience */}
        <h2 className="text-2xl font-bold mb-4">3. Target Audience</h2>
        <div className="mb-4">
          <label htmlFor="audience_primary" className="block text-gray-700 font-bold mb-2">
            Primary Audience
          </label>
          <input
            type="text"
            id="audience_primary"
            name="audience_primary"
            value={formData.audience_primary}
            onChange={handleInputChange}
            placeholder="E.g., Businesses, General Users"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
          <small className="text-gray-500">Main group that will use this product.</small>
        </div>
        <div className="mb-4">
          <label htmlFor="audience_secondary" className="block text-gray-700 font-bold mb-2">
            Secondary Audience
          </label>
          <input
            type="text"
            id="audience_secondary"
            name="audience_secondary"
            value={formData.audience_secondary}
            onChange={handleInputChange}
            placeholder="Additional groups who might benefit"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
          <small className="text-gray-500">
            Other groups that might use or benefit from this product.
          </small>
        </div>
        <div className="mb-4">
          <label htmlFor="audience_personas" className="block text-gray-700 font-bold mb-2">
            User Personas
          </label>
          <textarea
            id="audience_personas"
            name="audience_personas"
            value={formData.audience_personas}
            onChange={handleInputChange}
            placeholder="Describe key user personas, their needs and pain points"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            rows="3"
          ></textarea>
          <small className="text-gray-500">
            Detailed personas that represent typical users.
          </small>
        </div>

        {/* 4. Use Cases */}
        <h2 className="text-2xl font-bold mb-4">4. Use Cases</h2>
        <div className="mb-4">
          <label htmlFor="usecases" className="block text-gray-700 font-bold mb-2">
            Use Cases
          </label>
          <textarea
            id="usecases"
            name="usecases"
            value={formData.usecases}
            onChange={handleInputChange}
            placeholder="List key scenarios or user stories"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            rows="3"
            required
          ></textarea>
          <small className="text-gray-500">
            Key scenarios where the product will be used.
          </small>
        </div>

        {/* 5. Features & Requirements */}
        <h2 className="text-2xl font-bold mb-4">5. Features & Requirements</h2>
        <div className="mb-4">
          <label htmlFor="features_core" className="block text-gray-700 font-bold mb-2">
            Core Features
          </label>
          <textarea
            id="features_core"
            name="features_core"
            value={formData.features_core}
            onChange={handleInputChange}
            placeholder="Describe the main functionalities of the product"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            rows="3"
            required
          ></textarea>
          <small className="text-gray-500">
            Primary functions that the product must perform.
          </small>
        </div>
        <div className="mb-4">
          <label htmlFor="features_prioritization" className="block text-gray-700 font-bold mb-2">
            Prioritization
          </label>
          <textarea
            id="features_prioritization"
            name="features_prioritization"
            value={formData.features_prioritization}
            onChange={handleInputChange}
            placeholder="Classify features (e.g., Must-have, Nice-to-have)"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            rows="2"
            required
          ></textarea>
          <small className="text-gray-500">
            Determine the importance of each feature.
          </small>
        </div>
        <div className="mb-4">
          <label htmlFor="features_technical" className="block text-gray-700 font-bold mb-2">
            Technical Requirements
          </label>
          <textarea
            id="features_technical"
            name="features_technical"
            value={formData.features_technical}
            onChange={handleInputChange}
            placeholder="Outline any technical dependencies or architecture details"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            rows="2"
          ></textarea>
          <small className="text-gray-500">
            Technical considerations, such as APIs or integration needs.
          </small>
        </div>
        <div className="mb-4">
          <label htmlFor="features_uiux" className="block text-gray-700 font-bold mb-2">
            UI/UX Considerations
          </label>
          <textarea
            id="features_uiux"
            name="features_uiux"
            value={formData.features_uiux}
            onChange={handleInputChange}
            placeholder="Describe the user interface and experience"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            rows="2"
          ></textarea>
          <small className="text-gray-500">
            User interface design and user experience factors.
          </small>
        </div>

        {/* 6. Timeline & Milestones */}
        <h2 className="text-2xl font-bold mb-4">6. Timeline & Milestones</h2>
        <div className="mb-4">
          <label htmlFor="timeline_launch" className="block text-gray-700 font-bold mb-2">
            Launch Timeline
          </label>
          <input
            type="text"
            id="timeline_launch"
            name="timeline_launch"
            value={formData.timeline_launch}
            onChange={handleInputChange}
            placeholder="E.g., Q2 2025"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
          <small className="text-gray-500">
            Estimated launch timeframe for the product.
          </small>
        </div>
        <div className="mb-4">
          <label htmlFor="timeline_phases" className="block text-gray-700 font-bold mb-2">
            Phases
          </label>
          <input
            type="text"
            id="timeline_phases"
            name="timeline_phases"
            value={formData.timeline_phases}
            onChange={handleInputChange}
            placeholder="E.g., Alpha, Beta, Full Release"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
          <small className="text-gray-500">
            Break the launch process into phases.
          </small>
        </div>
        <div className="mb-4">
          <label htmlFor="timeline_milestones" className="block text-gray-700 font-bold mb-2">
            Milestones
          </label>
          <textarea
            id="timeline_milestones"
            name="timeline_milestones"
            value={formData.timeline_milestones}
            onChange={handleInputChange}
            placeholder="List key milestones (e.g., Prototype, Beta Testing)"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            rows="2"
            required
          ></textarea>
          <small className="text-gray-500">
            Key achievements to track progress.
          </small>
        </div>

        {/* 7. Metrics for Success */}
        <h2 className="text-2xl font-bold mb-4">7. Metrics for Success</h2>
        <div className="mb-4">
          <label htmlFor="metrics_kpis" className="block text-gray-700 font-bold mb-2">
            KPIs
          </label>
          <textarea
            id="metrics_kpis"
            name="metrics_kpis"
            value={formData.metrics_kpis}
            onChange={handleInputChange}
            placeholder="Define key performance indicators"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            rows="2"
            required
          ></textarea>
          <small className="text-gray-500">
            Metrics to measure the product's success.
          </small>
        </div>
        <div className="mb-4">
          <label htmlFor="metrics_tracking" className="block text-gray-700 font-bold mb-2">
            How to Track
          </label>
          <textarea
            id="metrics_tracking"
            name="metrics_tracking"
            value={formData.metrics_tracking}
            onChange={handleInputChange}
            placeholder="Describe the tracking mechanism (e.g., Analytics tools)"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            rows="2"
            required
          ></textarea>
          <small className="text-gray-500">
            Methods or tools to monitor the KPIs.
          </small>
        </div>

        {/* 8. Dependencies */}
        <h2 className="text-2xl font-bold mb-4">8. Dependencies</h2>
        <div className="mb-4">
          <label htmlFor="dependencies_technical" className="block text-gray-700 font-bold mb-2">
            Technical Dependencies
          </label>
          <textarea
            id="dependencies_technical"
            name="dependencies_technical"
            value={formData.dependencies_technical}
            onChange={handleInputChange}
            placeholder="Outline any technical dependencies or integration needs"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            rows="2"
          ></textarea>
          <small className="text-gray-500">
            Other systems or technologies the product relies on.
          </small>
        </div>
        <div className="mb-4">
          <label htmlFor="dependencies_business" className="block text-gray-700 font-bold mb-2">
            Business Dependencies
          </label>
          <textarea
            id="dependencies_business"
            name="dependencies_business"
            value={formData.dependencies_business}
            onChange={handleInputChange}
            placeholder="Mention any business partnerships or regulatory factors"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            rows="2"
          ></textarea>
          <small className="text-gray-500">
            Non-technical dependencies affecting the project.
          </small>
        </div>

        {/* 9. Risks & Mitigation */}
        <h2 className="text-2xl font-bold mb-4">9. Risks & Mitigation</h2>
        <div className="mb-4">
          <label htmlFor="risks_factors" className="block text-gray-700 font-bold mb-2">
            Risk Factors
          </label>
          <textarea
            id="risks_factors"
            name="risks_factors"
            value={formData.risks_factors}
            onChange={handleInputChange}
            placeholder="Identify potential risks"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            rows="2"
            required
          ></textarea>
          <small className="text-gray-500">
            Potential issues that may affect the project.
          </small>
        </div>
        <div className="mb-4">
          <label htmlFor="risks_mitigation" className="block text-gray-700 font-bold mb-2">
            Mitigation Plans
          </label>
          <textarea
            id="risks_mitigation"
            name="risks_mitigation"
            value={formData.risks_mitigation}
            onChange={handleInputChange}
            placeholder="Describe strategies to mitigate risks"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            rows="2"
            required
          ></textarea>
          <small className="text-gray-500">
            Steps to reduce or manage risks.
          </small>
        </div>

        {/* 10. Stakeholders */}
        <h2 className="text-2xl font-bold mb-4">10. Stakeholders</h2>
        <div className="mb-4">
          <label htmlFor="stakeholders_internal" className="block text-gray-700 font-bold mb-2">
            Internal Stakeholders
          </label>
          <input
            type="text"
            id="stakeholders_internal"
            name="stakeholders_internal"
            value={formData.stakeholders_internal}
            onChange={handleInputChange}
            placeholder="E.g., Product Managers, Engineers"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
          <small className="text-gray-500">
            Key internal team members involved in the project.
          </small>
        </div>
        <div className="mb-4">
          <label htmlFor="stakeholders_external" className="block text-gray-700 font-bold mb-2">
            External Stakeholders
          </label>
          <input
            type="text"
            id="stakeholders_external"
            name="stakeholders_external"
            value={formData.stakeholders_external}
            onChange={handleInputChange}
            placeholder="E.g., Partners, Vendors"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
          <small className="text-gray-500">
            Any external parties involved in the project.
          </small>
        </div>

        {/* 11. Budget & Resources */}
        <h2 className="text-2xl font-bold mb-4">11. Budget & Resources</h2>
        <div className="mb-4">
          <label htmlFor="budget" className="block text-gray-700 font-bold mb-2">
            Budget
          </label>
          <input
            type="text"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            placeholder="Estimated budget for the project"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
          <small className="text-gray-500">
            Financial resources allocated for the project.
          </small>
        </div>
        <div className="mb-4">
          <label htmlFor="resources" className="block text-gray-700 font-bold mb-2">
            Resources
          </label>
          <textarea
            id="resources"
            name="resources"
            value={formData.resources}
            onChange={handleInputChange}
            placeholder="List the resources (teams, tools, infrastructure)"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            rows="2"
            required
          ></textarea>
          <small className="text-gray-500">
            Human and technical resources needed.
          </small>
        </div>

        {/* 12. Post-Launch Plan */}
        <h2 className="text-2xl font-bold mb-4">12. Post-Launch Plan</h2>
        <div className="mb-4">
          <label htmlFor="post_launch_monitoring" className="block text-gray-700 font-bold mb-2">
            Monitoring & Evaluation
          </label>
          <textarea
            id="post_launch_monitoring"
            name="post_launch_monitoring"
            value={formData.post_launch_monitoring}
            onChange={handleInputChange}
            placeholder="How will the product's performance be monitored?"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            rows="2"
            required
          ></textarea>
          <small className="text-gray-500">
            Define the process for tracking performance metrics.
          </small>
        </div>
        <div className="mb-4">
          <label htmlFor="post_launch_maintenance" className="block text-gray-700 font-bold mb-2">
            Maintenance Plan
          </label>
          <textarea
            id="post_launch_maintenance"
            name="post_launch_maintenance"
            value={formData.post_launch_maintenance}
            onChange={handleInputChange}
            placeholder="Outline plans for ongoing support and updates"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            rows="2"
            required
          ></textarea>
          <small className="text-gray-500">
            Strategies for post-launch product support.
          </small>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-6">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          >
            {isEditing ? "Update PRD" : "Add PRD"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setFormData(initialPRD);
                setEditingId(null);
              }}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Display Documented PRDs in separate responsive tables */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Documented PRDs</h2>
        {prdList.length === 0 ? (
          <p className="text-gray-600">No PRDs documented yet.</p>
        ) : (
          <div className="space-y-8">
            {prdList.map((prd) => (
              <table key={prd.id} className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">{prd.overview_productname}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{prd.overview_author}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{prd.overview_date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{prd.overview_status}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(prd)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(prd.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        )}
      </div>
      <PRDdocument/>
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

export default PRDDocument;
