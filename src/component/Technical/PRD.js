// LearningModule.js
import React, { useState } from 'react';

import { 
  FaHome, FaClipboardList, FaShieldAlt, FaCogs, 
  FaCheckCircle, FaExclamationTriangle, FaClock, FaChartBar 
} from 'react-icons/fa';
import NonfuntionalRequirement from './NonfuntionalRequirement';
import PRDQuiz from './PRDQuiz';


const sections = [
  {
    id: "overview",
    title: "Overview",
    icon: <FaHome className="inline mr-2" />,
    content: (
      <div className="space-y-4">
        <p>
          <strong>Title:</strong> Seller Onboarding & Compliance System
        </p>
        <p>
          <strong>Objective:</strong> Build an intuitive onboarding wizard for sellers that automates business verification, collects mandatory compliance data (e.g., tax IDs, business registration numbers), and integrates real-time KYC checks. This will ensure that only verified and compliant sellers are allowed on the platform.
        </p>
      </div>
    )
  },
  {
    id: "functional",
    title: "Functional Requirements",
    icon: <FaClipboardList className="inline mr-2" />,
    content: (
      <div className="space-y-4">
        <h3 className="font-bold">User Registration & Onboarding Wizard:</h3>
        <p>
          <strong>Registration Form:</strong> Fields include Business name, registration number, tax ID, contact information, and address.
        </p>
        <p>
          <strong>Document Upload:</strong> Ability to attach scanned copies of business registration certificates, identification, and tax documents.
        </p>
        <p>
          <strong>Guided Flow:</strong> A step-by-step process that outlines required documents and information, dynamically adapting based on seller type or region.
        </p>
        <h3 className="font-bold">KYC Integration:</h3>
        <p>
          <strong>Endpoint:</strong> POST <code>/sellers/register</code> to capture seller details.
        </p>
        <p>
          <strong>Verification:</strong> Automatically trigger KYC checks (via secure integration with a third-party provider) once the seller completes the form.
        </p>
        <h3 className="font-bold">Compliance Checks:</h3>
        <p>
          Automated validation of document formats and essential data, along with real-time alerts for missing or invalid details.
        </p>
        <h3 className="font-bold">Notifications & Alerts:</h3>
        <p>
          Email or in-app notifications inform sellers about registration status, next steps, or issues requiring manual review.
        </p>
        <h3 className="font-bold">Admin Dashboard:</h3>
        <p>
          <strong>Overview Panel:</strong> Displays seller registration status, verification progress, and compliance alerts.
        </p>
        <p>
          <strong>Manual Review Interface:</strong> Allows compliance officers to review flagged cases and override or escalate issues as necessary.
        </p>
      </div>
    )
  },
  {
    id: "nonFunctional",
    title: "Non-Functional Requirements",
    icon: <FaShieldAlt className="inline mr-2" />,
    content: (
      <div className="space-y-4">
        <p>
          <strong>Security:</strong> End-to-end encryption for data in transit and at rest. Role-based access controls (RBAC) ensure that only authorized personnel can access sensitive data.
        </p>
        <p>
          <strong>Performance:</strong> API response times should be below 2 seconds under normal load, with the system supporting high concurrent onboarding requests.
        </p>
        <p>
          <strong>Scalability:</strong> The design supports anticipated growth in sellers and increased regulatory checks.
        </p>
        <p>
          <strong>Compliance:</strong> Adherence to GDPR, local data privacy laws, and industry-specific regulations.
        </p>
        <p>
          <strong>Reliability:</strong> Integrations with third-party services include fallback and error-handling strategies.
        </p>
      </div>
    )
  },
  {
    id: "technical",
    title: "Technical Specifications",
    icon: <FaCogs className="inline mr-2" />,
    content: (
      <div className="space-y-4">
        <h3 className="font-bold">APIs:</h3>
        <p>
          <strong>Seller Registration Endpoint:</strong> POST <code>/sellers/register</code> – Accepts seller details and documents, returns a registration ID and preliminary status.
        </p>
        <p>
          <strong>Seller Verification Endpoint:</strong> POST <code>/sellers/{'{id}'}/verify</code> – Initiates KYC verification and returns the verification status.
        </p>
        <p>
          <strong>Seller Status Retrieval:</strong> GET <code>/sellers/{'{id}'}</code> – Returns the current compliance and registration status.
        </p>
        <h3 className="font-bold">Database Schema:</h3>
        <p>
          <strong>Sellers Table:</strong> Contains fields such as seller_id, user_id, business_name, registration_number, tax_id, verification_status, document_urls, created_at, and updated_at.
        </p>
        <p>
          <strong>Compliance Logs:</strong> Records events such as document uploads, KYC responses, and compliance reviews.
        </p>
        <h3 className="font-bold">UI/UX Components:</h3>
        <p>
          <strong>Responsive Web Forms:</strong> Developed using modern frameworks (e.g., React) to ensure usability on both desktop and mobile devices.
        </p>
        <p>
          <strong>Dynamic Onboarding Flow:</strong> Features conditional fields that adjust based on user input.
        </p>
        <p>
          <strong>Admin Dashboard:</strong> Provides real-time updates on seller statuses and compliance alerts.
        </p>
      </div>
    )
  },
  {
    id: "acceptance",
    title: "Acceptance Criteria",
    icon: <FaCheckCircle className="inline mr-2" />,
    content: (
      <div className="space-y-4">
        <h3 className="font-bold">User Onboarding:</h3>
        <p>Sellers can complete registration and document upload without errors.</p>
        <p>Automated KYC verification is triggered immediately after registration.</p>
        <h3 className="font-bold">Compliance Alerts:</h3>
        <p>The system flags incomplete or invalid submissions.</p>
        <p>The admin dashboard reflects real-time seller statuses with clear indicators for pending manual reviews.</p>
        <h3 className="font-bold">Performance & Security:</h3>
        <p>API response times must be under 2 seconds. Data encryption and RBAC are implemented and verified through security testing.</p>
        <h3 className="font-bold">Beta Testing:</h3>
        <p>Achieve a seller onboarding success rate of at least 80% during the beta phase with clear documentation of any issues.</p>
      </div>
    )
  },
  {
    id: "dependencies",
    title: "Dependencies & Risks",
    icon: <FaExclamationTriangle className="inline mr-2" />,
    content: (
      <div className="space-y-4">
        <h3 className="font-bold">Integration with Third-Party KYC Provider:</h3>
        <p>Depends on the uptime and reliability of external verification services.</p>
        <h3 className="font-bold">Regulatory Variations:</h3>
        <p>Must account for regional differences in compliance requirements.</p>
        <h3 className="font-bold">Internal Stakeholder Alignment:</h3>
        <p>Close collaboration is required with legal, compliance, and customer support teams.</p>
      </div>
    )
  },
  {
    id: "timeline",
    title: "Timeline",
    icon: <FaClock className="inline mr-2" />,
    content: (
      <div className="space-y-4">
        <p>
          <strong>Development (Q2 2025):</strong> Initial build and integration of the seller onboarding flow and core KYC features.
        </p>
        <p>
          <strong>Beta Testing (Q3 2025):</strong> Limited release to gather feedback and iterate.
        </p>
        <p>
          <strong>Full Rollout (Q4 2025):</strong> Comprehensive launch with a full admin dashboard and support systems.
        </p>
      </div>
    )
  },
  {
    id: "metrics",
    title: "Success Metrics",
    icon: <FaChartBar className="inline mr-2" />,
    content: (
      <div className="space-y-4">
        <p>
          <strong>30% reduction</strong> in average seller onboarding time.
        </p>
        <p>
          <strong>50% decrease</strong> in non-compliant listings post-onboarding.
        </p>
        <p>
          <strong>Seller satisfaction scores</strong> above 80%.
        </p>
        <p>
          <strong>High system uptime</strong> with minimal compliance-related support tickets.
        </p>
      </div>
    )
  }
];

function LearningModule() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 p-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Seller Onboarding & Compliance System</h1>
        <p className="text-lg text-gray-600 mt-2">Interactive Learning Module for Learners</p>
      </header>
      <div className="flex max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-1/4 bg-gray-100 p-4 border-r border-gray-200">
          <ul className="space-y-4">
            {sections.map(section => (
              <li key={section.id}>
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-2 rounded transition-colors duration-200 ${
                    activeSection === section.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-blue-300'
                  }`}
                >
                  {section.icon}
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        {/* Main Content */}
        <main className="w-3/4 p-6">
          {sections.map(section => (
            <div key={section.id} className={activeSection === section.id ? 'block' : 'hidden'}>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">{section.title}</h2>
              <div className="text-gray-700 text-base leading-relaxed">
                {section.content}
              </div>
            </div>
          ))}
        </main>
      </div> <br/>
<NonfuntionalRequirement/> <br/>
<PRDQuiz/> <br/>


 
      <footer className="mt-8 text-center text-gray-500">
        <p>Learning Module created for understanding the PRD in detail.</p>
      </footer>
    </div>
  );
}

export default LearningModule;
