import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaCalendarAlt } from 'react-icons/fa';

const roadmapPhases = [
  {
    title: "Phase 1: Research & Planning",
    period: "Q2 2025",
    definition: "The research and planning phase establishes the foundation for Sellytics, identifying user needs and designing the initial product experience.",
    details: (
      <ul className="list-disc pl-5">
        <li>Conduct user interviews with SME store owners in Alaba, Trade Fair, and Computer Village.</li>
        <li>Perform competitive analysis of existing inventory and sales tools.</li>
        <li>Create wireframes for the web-based dashboard, focusing on barcode scanning and multi-store management.</li>
      </ul>
    )
  },
  {
    title: "Phase 2: MVP Development",
    period: "Q3 2025",
    definition: "The MVP phase builds core features to deliver value to Lagos traders, turning requirements into a functional web platform.",
    details: (
      <ul className="list-disc pl-5">
        <li>Develop the web-based dashboard with inventory tracking and barcode scanning.</li>
        <li>Implement sales and expense tracking with real-time analytics.</li>
        <li>Build multi-store management and receipt generation features.</li>
      </ul>
    )
  },
  {
    title: "Phase 3: Beta Launch & Feedback",
    period: "Q4 2025",
    definition: "The beta launch phase tests the MVP with a small group of Lagos traders to gather feedback and refine the platform.",
    details: (
      <ul className="list-disc pl-5">
        <li>Roll out the MVP to 50 store owners in Alaba, Trade Fair, and Computer Village.</li>
        <li>Collect feedback on usability, feature effectiveness, and low-bandwidth performance.</li>
        <li>Monitor platform stability and address any technical issues.</li>
      </ul>
    )
  },
  {
    title: "Phase 4: Full Launch & Scale",
    period: "Q1 2026",
    definition: "The full launch phase refines the platform based on beta feedback and scales to all SME traders in Lagos’ key markets.",
    details: (
      <ul className="list-disc pl-5">
        <li>Incorporate beta feedback to enhance dashboard usability and features.</li>
        <li>Launch the platform to all traders in Alaba, Trade Fair, and Computer Village.</li>
        <li>Establish partnerships with market unions (e.g., Alaba Traders Association) for broader adoption.</li>
      </ul>
    )
  },
  {
    title: "Phase 5: Iteration & Expansion",
    period: "Q2 2026 Onward",
    definition: "This phase focuses on continuous improvement, adding advanced features and exploring expansion beyond Lagos.",
    details: (
      <ul className="list-disc pl-5">
        <li>Add offline mode and advanced analytics for sales trends.</li>
        <li>Enhance low-bandwidth optimization for broader accessibility.</li>
        <li>Explore expansion to other Nigerian markets like Port Harcourt and Aba.</li>
      </ul>
    )
  }
];

export default function RoadmapLearningModule() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const togglePhase = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <header className="p-8 bg-indigo-600 text-white text-center">
        <h1 className="text-4xl font-bold">Sellytics Product Roadmap Learning Module</h1>
        <p className="mt-2 text-lg">
          Explore the phases of Sellytics’ roadmap, from research to expansion, and see how we’re transforming retail for Lagos’ SME traders.
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
    </div>
  );
}