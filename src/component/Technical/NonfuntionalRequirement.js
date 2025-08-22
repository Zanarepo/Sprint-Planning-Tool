// RequirementsModule.js
import React, { useState } from 'react';
import { FaClipboardList, FaShieldAlt } from 'react-icons/fa';

const functionalRequirements = [
  {
    id: 1,
    title: "Seller Registration",
    description: "Sellers fill out a registration form with details like business name, registration number, tax ID, and contact information."
  },
  {
    id: 2,
    title: "Document Upload",
    description: "Sellers upload scanned copies of business registration certificates, identification, and tax documents."
  },
  {
    id: 3,
    title: "KYC Integration",
    description: "After form completion, an automated KYC check is triggered via a POST /sellers/register API call to verify seller identity."
  },
  {
    id: 4,
    title: "Admin Dashboard",
    description: "Admins view seller registration statuses and manually review flagged cases."
  }
];

const nonFunctionalRequirements = [
  {
    id: 1,
    title: "Performance",
    description: "APIs must respond within 2 seconds even under high concurrent load."
  },
  {
    id: 2,
    title: "Security",
    description: "All data should be encrypted in transit and at rest with role-based access control (RBAC) to restrict data access."
  },
  {
    id: 3,
    title: "Scalability",
    description: "The system is designed to scale to support growing numbers of sellers and increased transaction volumes."
  },
  {
    id: 4,
    title: "Reliability",
    description: "Error-handling and fallback strategies must be in place for third-party integrations like the KYC provider."
  }
];

function RequirementsModule() {
  // State to switch between Functional and Non-Functional Requirements
  const [activeTab, setActiveTab] = useState("functional");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Functional vs Non-Functional Requirements
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Understand the difference with examples from the Seller Onboarding System.
        </p>
      </header>

      {/* Tab Navigation */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex rounded overflow-hidden shadow">
          <button
            onClick={() => setActiveTab("functional")}
            className={`flex-1 py-3 text-center transition-colors duration-200 ${
              activeTab === "functional" 
                ? "bg-blue-500 text-white" 
                : "bg-white text-gray-800 hover:bg-blue-100"
            }`}
          >
            <FaClipboardList className="inline mr-2" />
            Functional
          </button>
          <button
            onClick={() => setActiveTab("nonfunctional")}
            className={`flex-1 py-3 text-center transition-colors duration-200 ${
              activeTab === "nonfunctional" 
                ? "bg-blue-500 text-white" 
                : "bg-white text-gray-800 hover:bg-blue-100"
            }`}
          >
            <FaShieldAlt className="inline mr-2" />
            Non-Functional
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {activeTab === "functional" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Functional Requirements</h2>
            <p className="mb-4 text-gray-700">
              Functional requirements define <strong>what</strong> the system must do. They include user interactions, business logic, and the operations the system should perform.
            </p>
            <ul className="space-y-4">
              {functionalRequirements.map(req => (
                <li key={req.id} className="p-4 border rounded hover:bg-gray-50">
                  <h3 className="font-bold text-lg">{req.title}</h3>
                  <p className="text-gray-600">{req.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "nonfunctional" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Non-Functional Requirements</h2>
            <p className="mb-4 text-gray-700">
              Non-functional requirements outline <strong>how</strong> the system performs its functions. They cover aspects such as performance, security, scalability, and reliability.
            </p>
            <ul className="space-y-4">
              {nonFunctionalRequirements.map(req => (
                <li key={req.id} className="p-4 border rounded hover:bg-gray-50">
                  <h3 className="font-bold text-lg">{req.title}</h3>
                  <p className="text-gray-600">{req.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <footer className="mt-8 text-center text-gray-500">
        <p>Module example provided with React and Tailwind CSS.</p>
      </footer>
    </div>
  );
}

export default RequirementsModule;
