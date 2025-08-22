import React from 'react';

// Icons for each section (using inline SVG from Heroicons style)

const SuccessIcon = () => (
  <svg
    className="w-8 h-8 text-green-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const UseCasesIcon = () => (
  <svg
    className="w-8 h-8 text-blue-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a9 9 0 00-9 9h18a9 9 0 00-9-9z" />
  </svg>
);

const SolutionIcon = () => (
  <svg
    className="w-8 h-8 text-indigo-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-3-3v6m-7 2a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v10z" />
  </svg>
);

const UXIcon = () => (
  <svg
    className="w-8 h-8 text-purple-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
  </svg>
);

// Reusable Tile component
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
        <strong>Use Case / Reason: </strong>{useCase}
      </p>
    </div>
  </div>
);

const POSPadiExtendedDetails = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">POS-Padi MVP – Detailed Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Success Criteria Tile */}
          <Tile
            title="Success Criteria"
            icon={<SuccessIcon />}
            useCase="Sets clear, measurable targets to validate that the MVP meets key operational needs and delivers value."
          >
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Adoption:</strong> At least 30% of the targeted POS agents actively use the MVP during the pilot phase.</li>
              <li><strong>Fraud Reduction:</strong> Achieve a 50% decrease in reported fraudulent incidents.</li>
              <li><strong>Dispute Resolution Efficiency:</strong> Resolve 70% of disputes within 24 hours.</li>
              <li><strong>Liquidity Connectivity:</strong> Ensure 80% of active agents connect with at least one verified cash supplier.</li>
              <li><strong>User Feedback:</strong> Collect positive qualitative feedback via surveys and focus groups.</li>
            </ul>
          </Tile>

          {/* Use Cases Tile */}
          <Tile
            title="Use Cases"
            icon={<UseCasesIcon />}
            useCase="Illustrates real-world scenarios for our primary persona, ensuring the solution addresses everyday challenges."
          >
            <div className="space-y-4">
              <div>
                <p className="font-bold">Primary Persona: Kofi the POS Agent</p>
                <p className="text-gray-600">Kofi is a 35-year-old POS agent operating in a busy urban setting and servicing nearby rural areas. He handles high transaction volumes daily.</p>
              </div>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Fraud Prevention:</strong> Receives real-time alerts for suspicious transactions to prevent loss.</li>
                <li><strong>Dispute Resolution:</strong> Logs customer disputes immediately and tracks resolution progress.</li>
                <li><strong>Liquidity Management:</strong> Connects instantly with a verified cash supplier when cash is low.</li>
                <li><strong>Operational Oversight:</strong> Monitors live transaction data to adjust operations as needed.</li>
              </ul>
            </div>
          </Tile>

          {/* Solution Overview Tile */}
          <Tile
            title="Solution Overview"
            icon={<SolutionIcon />}
            useCase="Outlines the integrated components that empower POS agents to maintain efficiency, secure revenue, and build customer trust."
          >
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Real-Time Transaction Monitoring Dashboard:</strong> Centralizes live transaction data for immediate oversight.</li>
              <li><strong>AI-Powered Fraud Detection:</strong> Detects and alerts on potentially fraudulent transactions.</li>
              <li><strong>Streamlined Dispute Resolution System:</strong> Provides automated workflow support for rapid dispute resolution.</li>
              <li><strong>Connectivity Module:</strong> Links agents directly to a pre-verified network of cash suppliers, ensuring liquidity.</li>
            </ul>
            <p className="mt-4">
              This combination equips agents with essential tools to operate efficiently, secure revenue streams, and sustain customer trust.
            </p>
          </Tile>

          {/* High Level User Experience Tile */}
          <Tile
            title="High Level User Experience"
            icon={<UXIcon />}
            useCase="Illustrates the complete journey from onboarding to feedback, ensuring an intuitive and effective interface for POS agents."
          >
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Onboarding:</strong> Agents log in via a secure portal and receive a brief walkthrough of the key features.</li>
              <li><strong>Dashboard:</strong> The home screen displays real-time transaction data, alerts, and a summary of current disputes and cash supplier connectivity.</li>
              <li><strong>Alerts & Notifications:</strong> Pop-up notifications and push alerts inform agents of anomalies or suspicious activity.</li>
              <li><strong>Dispute Module:</strong> An intuitive interface for agents to report and track disputes with clear status updates.</li>
              <li><strong>Supplier Access:</strong> A dedicated section enables quick requests to verified cash suppliers, showing available liquidity and estimated delivery times.</li>
              <li><strong>Feedback Loop:</strong> Integrated feedback options allow agents to report issues and suggest improvements easily.</li>
            </ul>
          </Tile>
        </div>
      </div>
    </div>
  );
};

export default POSPadiExtendedDetails;
