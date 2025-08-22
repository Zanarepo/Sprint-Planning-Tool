// RoadmapLearningModule.jsx
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaCalendarAlt } from 'react-icons/fa';
import ProductRoadmapQizz from './ProductRoadmapQizz';

const roadmapPhases = [
  {
    title: "Phase 1: Research & Planning",
    period: "Q1 2025",
    definition: "The research and planning phase lays the foundation for the product. It involves gathering requirements, performing competitive analysis, and mapping out the initial user experience.",
    details: (
      <ul className="list-disc pl-5">
        <li>Gather detailed requirements from legal, compliance, and seller support teams.</li>
        <li>Conduct user research and competitive benchmarking.</li>
        <li>Define UX flows and create initial wireframes for the onboarding process.</li>
      </ul>
    )
  },
  {
    title: "Phase 2: MVP Development",
    period: "Q2 2025",
    definition: "The MVP (Minimum Viable Product) development phase focuses on building the core functionalities necessary to deliver value. It’s where ideas start turning into tangible software.",
    details: (
      <ul className="list-disc pl-5">
        <li>Develop the seller registration wizard with fields for business details.</li>
        <li>Integrate core KYC functionality via third-party APIs.</li>
        <li>Build backend endpoints and set up the necessary database schemas.</li>
      </ul>
    )
  },
  {
    title: "Phase 3: Beta Launch & Feedback",
    period: "Q3 2025",
    definition: "In the Beta Launch phase, an MVP is rolled out to a select group of users. This phase is used to gather feedback and identify any issues before a full-scale launch.",
    details: (
      <ul className="list-disc pl-5">
        <li>Roll out the MVP to a select group of sellers.</li>
        <li>Gather feedback on usability, compliance accuracy, and overall experience.</li>
        <li>Monitor real-time performance and detect any integration or regulatory issues.</li>
      </ul>
    )
  },
  {
    title: "Phase 4: Full Launch & Scale",
    period: "Q4 2025",
    definition: "The full launch phase finalizes the product and scales it to the entire target audience. It also introduces tools for ongoing management and monitoring.",
    details: (
      <ul className="list-disc pl-5">
        <li>Incorporate feedback and refine the onboarding workflow.</li>
        <li>Launch the full version to all sellers, including an Admin Dashboard for compliance monitoring.</li>
        <li>Implement robust notification systems for missing or incomplete verifications.</li>
      </ul>
    )
  },
  {
    title: "Phase 5: Iteration & Expansion",
    period: "2026 Onward",
    definition: "In this phase, continuous improvement is the focus. Advanced features are added, and the product expands to new regions or market segments.",
    details: (
      <ul className="list-disc pl-5">
        <li>Introduce advanced features such as periodic re-verification and automated regulatory updates.</li>
        <li>Enhance analytics to offer deeper insights on performance.</li>
        <li>Expand support for additional regions and compliance regimes as the platform grows.</li>
      </ul>
    )
  }
];

export default function RoadmapLearningModule() {
  // State to track the currently expanded phase.
  const [expandedIndex, setExpandedIndex] = useState(null);

  const togglePhase = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <header className="p-8 bg-indigo-600 text-white text-center">
        <h1 className="text-4xl font-bold">Product Roadmap Learning Module</h1>
        <p className="mt-2 text-lg">
          Explore each phase of the roadmap, learn its definition, and see the detailed objectives.
        </p>
      </header>

      <main className="flex-1 w-full p-8 overflow-y-auto">
        <div className="space-y-6">
          {roadmapPhases.map((phase, index) => (
            <div
              key={index}
              className="border rounded-lg shadow bg-white hover:shadow-xl transition duration-200"
            >
              <button
                onClick={() => togglePhase(index)}
                className="w-full flex items-center justify-between p-4 focus:outline-none bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <FaCalendarAlt className="text-indigo-500" />
                  <span className="text-2xl font-semibold">{phase.title}</span>
                  <span className="text-lg text-gray-600">({phase.period})</span>
                </div>
                <div>
                  {expandedIndex === index ? (
                    <FaChevronUp className="text-indigo-500 text-2xl" />
                  ) : (
                    <FaChevronDown className="text-indigo-500 text-2xl" />
                  )}
                </div>
              </button>

              {expandedIndex === index && (
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">Definition</h3>
                    <p className="mt-1 text-gray-800">{phase.definition}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Details</h3>
                    <div className="mt-1 text-gray-800">{phase.details}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

    <ProductRoadmapQizz/>
    </div>
  );
}
