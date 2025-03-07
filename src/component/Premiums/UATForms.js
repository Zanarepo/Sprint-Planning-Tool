import React, { useState, useEffect , useCallback} from "react";
import { supabase } from "../../supabaseClient"; // Adjust the import path as needed
import UATFeature from './UATFeature'

const UATForms = () => {
  // State for logged-in user
  const [, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);
  
  // State to store list of UAT forms for the logged-in user
  const [uatForms] = useState([]);
  
  // Initial state for creating a new UAT form
  const initialFormState = {
    title: "",
    version: "",
    author: "",
    document_date: "",
    introduction_purpose: "",
    introduction_overview: "",
    scope_inscope: "",
    scope_outscope: "",
    objectives: "",
    uat_team: "",
    test_environment_setup: "",
    test_environment_hardware: "",
    test_environment_data: "",
    entry_criteria: "",
    exit_criteria: "",
    test_scenarios: "",
    test_schedule_start_date: "",
    test_schedule_end_date: "",
    test_schedule_meetings: "",
    issue_reporting_tool: "",
    issue_classification: "",
    issue_reporting_format: "",
    roles_and_responsibilities: "",
    approval_final_verification: "",
    approval_signoff: "",
  };
  const [formData, setFormData] = useState(initialFormState);

  // State for viewing a form
  const [selectedForm, setSelectedForm] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // State for editing a form (separate from creation)
  const [editForm, setEditForm] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Retrieve the user's email from localStorage and fetch the user id from Supabase
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

  // Wrap fetchUATForms in useCallback so its reference is stable
  const fetchUATForms = useCallback(async () => {
    // Your fetching logic here
    // For example:
    const { data, error } = await supabase
      .from("uat_forms")
      .select("*")
      .eq("user_id", userId);
    if (error) {
      console.error("Error fetching UAT forms:", error);
    } else {
      // Process your data
      console.debug("UAT forms:", data);
    }
  }, [userId]); // add any other dependencies if needed

  // Now include fetchUATForms in the dependency array
  useEffect(() => {
    if (userId) {
      fetchUATForms();
    }
  }, [userId, fetchUATForms]);

  // Handle changes in the creation form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Create a new UAT form record
  const handleCreateForm = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("uat_forms")
      .insert([{ ...formData, user_id: userId }]);
    if (error) {
      console.error("Error creating form:", error);
    } else {
      console.debug("Form created:", data);
      setFormData(initialFormState);
      fetchUATForms();
    }
  };

  // Handle changes in the edit form
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  // Update an existing UAT form record (via edit modal)
  const handleUpdateForm = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("uat_forms")
      .update({ ...editForm })
      .eq("id", editForm.id);
    if (error) {
      console.error("Error updating form:", error);
    } else {
      console.debug("Form updated:", data);
      setIsEditModalOpen(false);
      setEditForm(null);
      fetchUATForms();
    }
  };

  // Delete a UAT form record
  const handleDeleteForm = async (formId) => {
    const { error } = await supabase
      .from("uat_forms")
      .delete()
      .eq("id", formId);
    if (error) {
      console.error("Error deleting form:", error);
    } else {
      fetchUATForms();
    }
  };

  // Open view modal with form details
  const handleViewForm = (form) => {
    setSelectedForm(form);
    setIsViewModalOpen(true);
  };

  // Open edit modal with prefilled form data
  const handleEditForm = (form) => {
    setEditForm(form);
    setIsEditModalOpen(true);
  };

  // Print the displayed form details (from view modal)
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <UATFeature/>
      <h2 className="text-3xl font-extrabold text-blue-800 mb-8">
      
      </h2>

      {/* New UAT Form Creation */}
      <form
        onSubmit={handleCreateForm}
        className="bg-white shadow-lg rounded-lg p-8 mb-12 border border-gray-200"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Create New UAT Form
        </h3>

        {/* Document Information */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="User Acceptance Testing Plan for XYZ Product"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <small className="text-gray-500 text-sm">Title of the UAT Plan.</small>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Version</label>
            <input
              type="text"
              name="version"
              value={formData.version}
              onChange={handleInputChange}
              placeholder="1.0"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <small className="text-gray-500 text-sm">Version of the UAT Plan.</small>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="[Your Name]"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <small className="text-gray-500 text-sm">Author of the UAT Plan.</small>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Document Date</label>
          <input
            type="date"
            name="document_date"
            value={formData.document_date}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <small className="text-gray-500 text-sm">Date of the UAT Plan document.</small>
        </div>

        {/* Introduction */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Introduction Purpose</label>
          <textarea
            name="introduction_purpose"
            value={formData.introduction_purpose}
            onChange={handleInputChange}
            placeholder="To verify that the XYZ Product meets business requirements and is ready for production."
            required
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <small className="text-gray-500 text-sm">Purpose of the UAT.</small>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Introduction Overview</label>
          <textarea
            name="introduction_overview"
            value={formData.introduction_overview}
            onChange={handleInputChange}
            placeholder="This document outlines the process, schedule, roles, test scenarios, and test cases for UAT."
            required
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <small className="text-gray-500 text-sm">Overview of the UAT.</small>
        </div>

        {/* Scope */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Scope In-Scope</label>
            <textarea
              name="scope_inscope"
              value={formData.scope_inscope}
              onChange={handleInputChange}
              placeholder="Testing of key functionalities such as user login, dashboard, data entry forms, and reporting modules."
              required
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <small className="text-gray-500 text-sm">What is included in the testing.</small>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Scope Out-Scope</label>
            <textarea
              name="scope_outscope"
              value={formData.scope_outscope}
              onChange={handleInputChange}
              placeholder="Performance and security testing (handled separately)."
              required
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <small className="text-gray-500 text-sm">What is not included in the testing.</small>
          </div>
        </div>

        {/* Objectives */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Objectives</label>
          <textarea
            name="objectives"
            value={formData.objectives}
            onChange={handleInputChange}
            placeholder="Confirm the product meets business requirements, validate the overall user experience, and document any defects/issues."
            required
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <small className="text-gray-500 text-sm">Goals to achieve with UAT.</small>
        </div>

        {/* UAT Team */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">UAT Team</label>
          <textarea
            name="uat_team"
            value={formData.uat_team}
            onChange={handleInputChange}
            placeholder="UAT Coordinator: John Doe, End-User Testers: Jane Smith, Mike Brown, Sarah Lee, QA Support: Emily White"
            required
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <small className="text-gray-500 text-sm">Team members responsible for UAT.</small>
        </div>

        {/* Test Environment */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Test Environment Setup</label>
          <textarea
            name="test_environment_setup"
            value={formData.test_environment_setup}
            onChange={handleInputChange}
            placeholder="A staging environment that closely mirrors production."
            required
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <small className="text-gray-500 text-sm">Environment setup for testing.</small>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Test Environment Hardware/Software</label>
            <textarea
              name="test_environment_hardware"
              value={formData.test_environment_hardware}
              onChange={handleInputChange}
              placeholder="Standard desktop browsers and mobile devices (as required)."
              required
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <small className="text-gray-500 text-sm">Hardware/software configurations for testing.</small>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Test Environment Data</label>
            <textarea
              name="test_environment_data"
              value={formData.test_environment_data}
              onChange={handleInputChange}
              placeholder="Predefined sample user accounts and data provided for testing."
              required
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <small className="text-gray-500 text-sm">Information about test data.</small>
          </div>
        </div>

        {/* Entry and Exit Criteria */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Entry Criteria</label>
            <textarea
              name="entry_criteria"
              value={formData.entry_criteria}
              onChange={handleInputChange}
              placeholder="Application deployed to staging, test data loaded, environment verified as stable."
              required
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <small className="text-gray-500 text-sm">Conditions required before testing can begin.</small>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Exit Criteria</label>
            <textarea
              name="exit_criteria"
              value={formData.exit_criteria}
              onChange={handleInputChange}
              placeholder="All critical/major defects fixed, all test cases passed, formal sign-off obtained."
              required
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <small className="text-gray-500 text-sm">Conditions required to complete UAT.</small>
          </div>
        </div>

        {/* Test Scenarios */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Test Scenarios and Test Cases</label>
          <textarea
            name="test_scenarios"
            value={formData.test_scenarios}
            onChange={handleInputChange}
            placeholder="Detailed test scenarios and test cases with steps and expected results."
            required
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <small className="text-gray-500 text-sm">Test scenarios (e.g., user login, data entry tests).</small>
        </div>

        {/* Test Schedule */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Test Schedule Start Date</label>
            <input
              type="date"
              name="test_schedule_start_date"
              value={formData.test_schedule_start_date}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <small className="text-gray-500 text-sm">Start date for testing.</small>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Test Schedule End Date</label>
            <input
              type="date"
              name="test_schedule_end_date"
              value={formData.test_schedule_end_date}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <small className="text-gray-500 text-sm">End date for testing.</small>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Test Schedule Meetings</label>
          <textarea
            name="test_schedule_meetings"
            value={formData.test_schedule_meetings}
            onChange={handleInputChange}
            placeholder="Daily status meetings at 10 AM"
            required
            rows="2"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <small className="text-gray-500 text-sm">Meeting schedule for UAT review.</small>
        </div>

        {/* Issue Reporting and Tracking */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Issue Reporting Tool</label>
            <input
              type="text"
              name="issue_reporting_tool"
              value={formData.issue_reporting_tool}
              onChange={handleInputChange}
              placeholder="JIRA"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <small className="text-gray-500 text-sm">Tool used for reporting issues.</small>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Issue Classification</label>
            <input
              type="text"
              name="issue_classification"
              value={formData.issue_classification}
              onChange={handleInputChange}
              placeholder="Critical, Major, Minor"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <small className="text-gray-500 text-sm">Categories for issues.</small>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Issue Reporting Format</label>
          <textarea
            name="issue_reporting_format"
            value={formData.issue_reporting_format}
            onChange={handleInputChange}
            placeholder="Description, steps to reproduce, screenshots, expected vs actual results"
            required
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <small className="text-gray-500 text-sm">Format for issue reporting.</small>
        </div>

        {/* Roles and Responsibilities */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Roles and Responsibilities</label>
          <textarea
            name="roles_and_responsibilities"
            value={formData.roles_and_responsibilities}
            onChange={handleInputChange}
            placeholder="Details about UAT Coordinator, End-User Testers, and QA Support responsibilities"
            required
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <small className="text-gray-500 text-sm">UAT team responsibilities.</small>
        </div>

        {/* Approval and Sign-Off */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Approval Final Verification</label>
            <textarea
              name="approval_final_verification"
              value={formData.approval_final_verification}
              onChange={handleInputChange}
              placeholder="Final review process to ensure all test cases pass"
              required
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <small className="text-gray-500 text-sm">Final verification details.</small>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Approval Signoff</label>
            <textarea
              name="approval_signoff"
              value={formData.approval_signoff}
              onChange={handleInputChange}
              placeholder="Sign-off details and documentation process"
              required
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <small className="text-gray-500 text-sm">Sign-off process details.</small>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-colors"
        >
          Create Form
        </button>
      </form>

      {/* UAT Forms List */}
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-600">
            <tr>
              <th className="py-3 px-5 text-left text-sm font-semibold text-white">Title</th>
              <th className="py-3 px-5 text-left text-sm font-semibold text-white">Version</th>
              <th className="py-3 px-5 text-left text-sm font-semibold text-white">Author</th>
              <th className="py-3 px-5 text-left text-sm font-semibold text-white">Document Date</th>
              <th className="py-3 px-5 text-left text-sm font-semibold text-white">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {uatForms.map((form) => (
              <tr key={form.id}>
                <td className="py-3 px-5">{form.title}</td>
                <td className="py-3 px-5">{form.version}</td>
                <td className="py-3 px-5">{form.author}</td>
                <td className="py-3 px-5">{form.document_date}</td>
                <td className="py-3 px-5 flex space-x-2">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                    onClick={() => handleViewForm(form)}
                  >
                    View
                  </button>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md"
                    onClick={() => handleEditForm(form)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                    onClick={() => handleDeleteForm(form.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {isViewModalOpen && selectedForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 overflow-y-auto max-h-full">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">UAT Form Details</h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-700 hover:text-gray-900 text-3xl leading-none"
              >
                &times;
              </button>
            </div>
            <div className="px-6 py-4 space-y-3 text-gray-700">
              <p><strong>Title:</strong> {selectedForm.title}</p>
              <p><strong>Version:</strong> {selectedForm.version}</p>
              <p><strong>Author:</strong> {selectedForm.author}</p>
              <p><strong>Document Date:</strong> {selectedForm.document_date}</p>
              <p><strong>Introduction Purpose:</strong> {selectedForm.introduction_purpose}</p>
              <p><strong>Introduction Overview:</strong> {selectedForm.introduction_overview}</p>
              <p><strong>Scope In-Scope:</strong> {selectedForm.scope_inscope}</p>
              <p><strong>Scope Out-Scope:</strong> {selectedForm.scope_outscope}</p>
              <p><strong>Objectives:</strong> {selectedForm.objectives}</p>
              <p><strong>UAT Team:</strong> {selectedForm.uat_team}</p>
              <p><strong>Test Environment Setup:</strong> {selectedForm.test_environment_setup}</p>
              <p><strong>Test Environment Hardware/Software:</strong> {selectedForm.test_environment_hardware}</p>
              <p><strong>Test Environment Data:</strong> {selectedForm.test_environment_data}</p>
              <p><strong>Entry Criteria:</strong> {selectedForm.entry_criteria}</p>
              <p><strong>Exit Criteria:</strong> {selectedForm.exit_criteria}</p>
              <p><strong>Test Scenarios and Test Cases:</strong> {selectedForm.test_scenarios}</p>
              <p><strong>Test Schedule Start Date:</strong> {selectedForm.test_schedule_start_date}</p>
              <p><strong>Test Schedule End Date:</strong> {selectedForm.test_schedule_end_date}</p>
              <p><strong>Test Schedule Meetings:</strong> {selectedForm.test_schedule_meetings}</p>
              <p><strong>Issue Reporting Tool:</strong> {selectedForm.issue_reporting_tool}</p>
              <p><strong>Issue Classification:</strong> {selectedForm.issue_classification}</p>
              <p><strong>Issue Reporting Format:</strong> {selectedForm.issue_reporting_format}</p>
              <p><strong>Roles and Responsibilities:</strong> {selectedForm.roles_and_responsibilities}</p>
              <p><strong>Approval Final Verification:</strong> {selectedForm.approval_final_verification}</p>
              <p><strong>Approval Signoff:</strong> {selectedForm.approval_signoff}</p>
            </div>
            <div className="px-6 py-4 border-t flex justify-end space-x-4">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
              <button
                onClick={handlePrint}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Print
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 overflow-y-auto max-h-full">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">Edit UAT Form</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-700 hover:text-gray-900 text-3xl leading-none"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleUpdateForm} className="px-6 py-4">
              {/* Document Information */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleEditInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Version</label>
                  <input
                    type="text"
                    name="version"
                    value={editForm.version}
                    onChange={handleEditInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={editForm.author}
                    onChange={handleEditInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Document Date</label>
                <input
                  type="date"
                  name="document_date"
                  value={editForm.document_date}
                  onChange={handleEditInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Introduction */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Introduction Purpose</label>
                <textarea
                  name="introduction_purpose"
                  value={editForm.introduction_purpose}
                  onChange={handleEditInputChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Introduction Overview</label>
                <textarea
                  name="introduction_overview"
                  value={editForm.introduction_overview}
                  onChange={handleEditInputChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>

              {/* Scope */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Scope In-Scope</label>
                  <textarea
                    name="scope_inscope"
                    value={editForm.scope_inscope}
                    onChange={handleEditInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Scope Out-Scope</label>
                  <textarea
                    name="scope_outscope"
                    value={editForm.scope_outscope}
                    onChange={handleEditInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  ></textarea>
                </div>
              </div>

              {/* Objectives */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Objectives</label>
                <textarea
                  name="objectives"
                  value={editForm.objectives}
                  onChange={handleEditInputChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>

              {/* UAT Team */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">UAT Team</label>
                <textarea
                  name="uat_team"
                  value={editForm.uat_team}
                  onChange={handleEditInputChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>

              {/* Test Environment */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Test Environment Setup</label>
                <textarea
                  name="test_environment_setup"
                  value={editForm.test_environment_setup}
                  onChange={handleEditInputChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Test Environment Hardware/Software</label>
                  <textarea
                    name="test_environment_hardware"
                    value={editForm.test_environment_hardware}
                    onChange={handleEditInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Test Environment Data</label>
                  <textarea
                    name="test_environment_data"
                    value={editForm.test_environment_data}
                    onChange={handleEditInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  ></textarea>
                </div>
              </div>

              {/* Entry and Exit Criteria */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Entry Criteria</label>
                  <textarea
                    name="entry_criteria"
                    value={editForm.entry_criteria}
                    onChange={handleEditInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Exit Criteria</label>
                  <textarea
                    name="exit_criteria"
                    value={editForm.exit_criteria}
                    onChange={handleEditInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  ></textarea>
                </div>
              </div>

              {/* Test Scenarios */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Test Scenarios and Test Cases</label>
                <textarea
                  name="test_scenarios"
                  value={editForm.test_scenarios}
                  onChange={handleEditInputChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>

              {/* Test Schedule */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Test Schedule Start Date</label>
                  <input
                    type="date"
                    name="test_schedule_start_date"
                    value={editForm.test_schedule_start_date}
                    onChange={handleEditInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Test Schedule End Date</label>
                  <input
                    type="date"
                    name="test_schedule_end_date"
                    value={editForm.test_schedule_end_date}
                    onChange={handleEditInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Test Schedule Meetings</label>
                <textarea
                  name="test_schedule_meetings"
                  value={editForm.test_schedule_meetings}
                  onChange={handleEditInputChange}
                  required
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>

              {/* Issue Reporting and Tracking */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Issue Reporting Tool</label>
                  <input
                    type="text"
                    name="issue_reporting_tool"
                    value={editForm.issue_reporting_tool}
                    onChange={handleEditInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Issue Classification</label>
                  <input
                    type="text"
                    name="issue_classification"
                    value={editForm.issue_classification}
                    onChange={handleEditInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Issue Reporting Format</label>
                <textarea
                  name="issue_reporting_format"
                  value={editForm.issue_reporting_format}
                  onChange={handleEditInputChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>

              {/* Roles and Responsibilities */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Roles and Responsibilities</label>
                <textarea
                  name="roles_and_responsibilities"
                  value={editForm.roles_and_responsibilities}
                  onChange={handleEditInputChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>

              {/* Approval and Sign-Off */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Approval Final Verification</label>
                  <textarea
                    name="approval_final_verification"
                    value={editForm.approval_final_verification}
                    onChange={handleEditInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Approval Signoff</label>
                  <textarea
                    name="approval_signoff"
                    value={editForm.approval_signoff}
                    onChange={handleEditInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UATForms;
