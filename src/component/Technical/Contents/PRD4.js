import React from 'react';

// Icons for each section (using inline SVG from Heroicons)
const StoriesIcon = () => (
  <svg
    className="w-8 h-8 text-yellow-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12l9-5-9-5-9 5 9 5z" />
  </svg>
);

const OutScopeIcon = () => (
  <svg
    className="w-8 h-8 text-red-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-1.414 1.414M6.343 17.657l-1.414 1.414M18.364 18.364l-1.414-1.414M6.343 6.343L4.93 7.757M12 8v4m0 4h.01m-6.364-9.364a9 9 0 1112.728 0 9 9 0 01-12.728 0z" />
  </svg>
);

const QuestionIcon = () => (
  <svg
    className="w-8 h-8 text-blue-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16h6" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v.01M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
  </svg>
);

// Reusable Tile component for consistency
const Tile = ({ title, icon, children, useCase }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
    <div className="flex items-center mb-4">
      {icon}
      <h2 className="text-xl font-bold ml-3">{title}</h2>
    </div>
    <div className="text-gray-700 mb-4">
      {children}
    </div>
    <div className="mt-auto pt-2 border-t border-gray-200">
      <p className="text-sm text-gray-500">
        <strong>Use Case / Reason:</strong> {useCase}
      </p>
    </div>
  </div>
);

const UserStoriesAndOutOfScope = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          User Stories, Out of Scope & Questions Tracker
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Stories and Requirements per Release */}
          <Tile
            title="User Stories & Requirements"
            icon={<StoriesIcon />}
            useCase="Documents detailed functionality across releases to guide development and testing."
          >
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Release 1: Core Transaction Monitoring</p>
                <p>
                  <strong>User Story:</strong> As a POS agent, I want to view my transactions in real time so that I can immediately spot any irregularities.
                </p>
                <p className="mt-1"><strong>Requirements:</strong></p>
                <ul className="list-disc pl-5">
                  <li>Live data feed with transaction details</li>
                  <li>Anomaly detection indicator</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Release 2: Fraud Detection and Alerts</p>
                <p>
                  <strong>User Story:</strong> As a POS agent, I need to receive immediate alerts when suspicious activity is detected so that I can prevent fraud.
                </p>
                <p className="mt-1"><strong>Requirements:</strong></p>
                <ul className="list-disc pl-5">
                  <li>Integration of machine learning algorithms</li>
                  <li>Real-time push notifications and SMS alerts</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Release 3: Dispute Resolution Module</p>
                <p>
                  <strong>User Story:</strong> As a POS agent, I want to quickly report and track customer disputes so that I can resolve them efficiently.
                </p>
                <p className="mt-1"><strong>Requirements:</strong></p>
                <ul className="list-disc pl-5">
                  <li>A simple interface to log disputes</li>
                  <li>Automated status tracking and escalation workflows</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Release 4: Cash Supplier Connectivity</p>
                <p>
                  <strong>User Story:</strong> As a POS agent, I need to connect with reliable cash suppliers instantly to prevent cash shortages.
                </p>
                <p className="mt-1"><strong>Requirements:</strong></p>
                <ul className="list-disc pl-5">
                  <li>Directory of verified cash suppliers</li>
                  <li>Request system with real-time status updates on cash replenishment</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Release 5: Pilot Deployment & Iteration</p>
                <p>
                  <strong>User Story:</strong> As a pilot user, I want to provide feedback on the system’s usability and effectiveness so that the product can be improved continuously.
                </p>
                <p className="mt-1"><strong>Requirements:</strong></p>
                <ul className="list-disc pl-5">
                  <li>In-app feedback mechanism</li>
                  <li>Regular surveys and focus group sessions</li>
                </ul>
              </div>
            </div>
          </Tile>

          {/* Out of Scope */}
          <Tile
            title="Out of Scope"
            icon={<OutScopeIcon />}
            useCase="Clarifies which features and integrations are not included in the MVP to keep the project focused."
          >
            <ul className="list-disc pl-5 space-y-1">
              <li>Advanced performance analytics beyond core KPIs</li>
              <li>Full-scale integration with external financial systems and third-party services not essential to core functionality</li>
              <li>Comprehensive agent performance monitoring beyond the basic real-time transaction tracking</li>
              <li>Extended UI/UX refinements beyond the MVP pilot requirements</li>
            </ul>
          </Tile>

          {/* Questions and Decision Tracker */}
          <Tile
            title="Questions & Decision Tracker"
            icon={<QuestionIcon />}
            useCase="Captures key questions and decisions to guide product development and ensure stakeholder alignment."
          >
            <div className="space-y-4">
              <div>
                <p>
                  <strong>Q:</strong> What is the primary metric for fraud reduction, and how will it be tracked?
                </p>
                <p>
                  <strong>A:</strong> The primary metric is a 50% reduction in reported fraudulent incidents, tracked via in-app reporting and transaction logs.
                </p>
              </div>
              <div>
                <p>
                  <strong>Q:</strong> How will we ensure reliable connectivity with cash suppliers?
                </p>
                <p>
                  <strong>A:</strong> Early partnerships and pre-pilot integration tests with selected suppliers will be established.
                </p>
              </div>
              <div>
                <p>
                  <strong>Q:</strong> What is the pilot group size for the MVP deployment?
                </p>
                <p>
                  <strong>A:</strong> The pilot group will initially consist of approximately 30% of the targeted POS agents to ensure a representative sample.
                </p>
              </div>
              <div>
                <p>
                  <strong>Q:</strong> How will user feedback be collected and acted upon?
                </p>
                <p>
                  <strong>A:</strong> Through in-app feedback tools, periodic surveys, and structured focus group sessions, with a dedicated review process for iterative improvements.
                </p>
              </div>
              <div>
                <p>
                  <strong>Q:</strong> What are the contingency plans if AI fraud detection results in high false positives?
                </p>
                <p>
                  <strong>A:</strong> There will be a process for manual review and continuous tuning of the algorithms based on pilot feedback.
                </p>
              </div>
            </div>
          </Tile>
        </div>
      </div>
    </div>
  );
};

export default UserStoriesAndOutOfScope;
