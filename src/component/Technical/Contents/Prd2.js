import React from 'react';

// Inline SVG icons from Heroicons

const ValueIcon = () => (
  <svg
    className="w-8 h-8 text-purple-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.5 3a4.5 4.5 0 00-4.5 4.5v9a4.5 4.5 0 004.5 4.5h9a4.5 4.5 0 004.5-4.5v-9a4.5 4.5 0 00-4.5-4.5h-9z" />
  </svg>
);

const ReleaseIcon = () => (
  <svg
    className="w-8 h-8 text-indigo-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-5H3v5a2 2 0 002 2z" />
  </svg>
);

const GoalsIcon = () => (
  <svg
    className="w-8 h-8 text-green-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.105 0-2 .895-2 2 0 .634.298 1.187.766 1.539l-.766 2.182c-.095.268.064.556.338.556h3.984c.273 0 .433-.288.338-.556l-.766-2.182A1.993 1.993 0 0014 10c0-1.105-.895-2-2-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 110 20 10 10 0 010-20z" />
  </svg>
);

// Reusable Tile component
const Tile = ({ title, icon, children, useCase }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
    <div className="flex items-center mb-4">
      {icon}
      <h2 className="text-xl font-bold ml-3">{title}</h2>
    </div>
    <div className="text-gray-700 mb-4">{children}</div>
    <div className="mt-auto pt-2 border-t border-gray-200">
      <p className="text-sm text-gray-500">
        <strong>Use Case / Reason: </strong>{useCase}
      </p>
    </div>
  </div>
);

const AdditionalSections = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Continuation</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Value Proposition Tile */}
          <Tile
            title="Value Proposition"
            icon={<ValueIcon />}
            useCase="Demonstrates how POS-Padi addresses key pain points, enhancing security, streamlining operations, ensuring liquidity, and boosting customer trust."
          >
            <ul className="list-disc pl-5">
              <li><strong>Enhancing Security:</strong> Through AI-driven fraud alerts that help agents act before losses mount.</li>
              <li><strong>Streamlining Operations:</strong> Real-time monitoring empowers agents to track transactions and address issues immediately.</li>
              <li><strong>Improving Liquidity:</strong> Direct connectivity to a verified network of cash suppliers minimizes cash shortages.</li>
              <li><strong>Boosting Trust:</strong> Faster dispute resolution and transparent operations improve customer confidence and agent credibility.</li>
            </ul>
          </Tile>

         {/* Key Features Tile */}
<Tile
  title="Key Features"
  icon={<ReleaseIcon />}
  useCase="Highlights the core functionalities of the MVP essential for delivering operational efficiency and value to POS agents."
>
  <ul className="list-disc pl-5 space-y-1">
    <li><strong>Real-time transaction tracking</strong></li>
    <li><strong>Profit and expense tracker</strong></li>
    <li><strong>Customer relationship management</strong></li>
    <li><strong>Push notifications and smart alerts</strong></li>
    <li><strong>Dashboard and reporting</strong></li>
    <li><strong>Cash supply network</strong></li>
    <li><strong>Dispute management system</strong></li>
    <li><strong>Fraud detection and alerts</strong></li>
    <li><strong>Agent and terminal management</strong></li>
  </ul>
  <div className="mt-4">
    <p className="font-semibold">Must-Have Features:</p>
    <ul className="list-disc pl-5 mt-1 space-y-1">
      <li>Profit and expense tracker</li>
      <li>Customer relationship management</li>
      <li>Dashboard and reporting</li>
      <li>Dispute management system</li>
      <li>Agent and terminal management</li>
    </ul>
  </div>
</Tile>


          {/* Goals and Success Criteria Tile */}
          <Tile
            title="Goals & Success Criteria"
            icon={<GoalsIcon />}
            useCase="Sets clear, measurable outcomes to validate that the MVP meets key operational needs and delivers value to the users."
          >
            <ul className="list-disc pl-5">
              <li><strong>Fraud Reduction:</strong> Validate that POS agents can significantly reduce fraud incidents.</li>
              <li><strong>Dispute Resolution:</strong> Demonstrate that disputes are resolved more quickly.</li>
              <li><strong>Liquidity Management:</strong> Ensure agents connect with reliable cash suppliers.</li>
              <li><strong>User Satisfaction:</strong> Achieve high operational trust through real-time insights and alerts.</li>
            </ul>
          </Tile>
        </div>
      </div>
    </div>
  );
};

export default AdditionalSections;
