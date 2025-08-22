import React, { useState } from 'react';
import { 
  FaEye, 
  FaBullseye, 
  FaLightbulb, 
  FaUsers, 
  FaChartBar, 
  FaExclamationTriangle 
} from 'react-icons/fa';

const sections = [
  {
    title: "Vision",
    icon: <FaEye className="text-blue-500" />,
    definition: "A high-level, aspirational statement that outlines Sellytics’ long-term goal.",
    detail: (
      <>
        <p>
          Our vision is to empower SME store owners in Lagos’ open markets—Alaba, Trade Fair, and Computer Village—with a seamless, affordable web-based platform that transforms retail management, driving efficiency and profitability.
        </p>
      </>
    )
  },
  {
    title: "Mission",
    icon: <FaBullseye className="text-green-500" />,
    definition: "A clear statement of what Sellytics does to achieve its vision, focusing on key processes and objectives.",
    detail: (
      <>
        <p>
          Sellytics’ mission is to deliver an intuitive web-based platform that simplifies inventory management, tracks sales and expenses in real-time, and enables multi-store oversight, helping Lagos traders save time and boost profits while staying competitive.
        </p>
      </>
    )
  },
  {
    title: "Strategic Goals",
    icon: <FaLightbulb className="text-yellow-500" />,
    definition: "Specific, measurable objectives to guide Sellytics’ product development and success.",
    detail: (
      <ul className="list-disc pl-5">
        <li>
          <strong>Streamline Operations:</strong> Reduce inventory management time by 30% through barcode scanning and real-time updates.
        </li>
        <li>
          <strong>Enhance Profitability:</strong> Enable dynamic pricing and expense tracking to improve profit margins for SME traders.
        </li>
        <li>
          <strong>Scale Multi-Store Management:</strong> Support traders with multiple stalls via a unified dashboard, increasing efficiency by 25%.
        </li>
        <li>
          <strong>Drive User Adoption:</strong> Achieve 1,000 active users in Lagos markets by month 12 with a 70% retention rate.
        </li>
      </ul>
    )
  },
  {
    title: "Target Audience",
    icon: <FaUsers className="text-purple-500" />,
    definition: "The specific group of users for whom Sellytics is designed.",
    detail: (
      <p>
        Sellytics targets SME store owners (1–20 employees) in Lagos’ Alaba, Trade Fair, and Computer Village markets, operating in electronics, fashion, and consumer goods, who need affordable, user-friendly tools to manage inventory and sales.
      </p>
    )
  },
  {
    title: "Market Opportunity & Competitive Analysis",
    icon: <FaChartBar className="text-red-500" />,
    definition: "An assessment of the market landscape and competitive positioning for Sellytics.",
    detail: (
      <>
        <p>
          <strong>Opportunity:</strong> Thousands of SMEs in Lagos’ key markets face inefficiencies from manual processes, with growing demand for affordable digital tools. Existing solutions cost ₦50,000–₦100,000/month, pricing out many traders.
        </p>
        <p>
          <strong>Competitive Edge:</strong> Sellytics offers a tailored, low-cost platform (₦15,000–₦25,000/month) optimized for low-bandwidth environments, with features like multi-store management and receipt generation that competitors lack.
        </p>
      </>
    )
  },
  {
    title: "Key Metrics",
    icon: <FaChartBar className="text-indigo-500" />,
    definition: "Quantifiable measures to track Sellytics’ performance and success.",
    detail: (
      <ul className="list-disc pl-5">
        <li>Number of active users (target: 1,000 by month 12)</li>
        <li>Monthly retention rate (target: 70%)</li>
        <li>User login frequency (target: 80% weekly logins)</li>
        <li>Net Promoter Score (target: 50+)</li>
      </ul>
    )
  },
  {
    title: "Risks & Considerations",
    icon: <FaExclamationTriangle className="text-orange-500" />,
    definition: "Potential challenges that could impact Sellytics’ success.",
    detail: (
      <ul className="list-disc pl-5">
        <li>Limited digital literacy among traders may slow adoption.</li>
        <li>Unstable internet connectivity in Lagos markets could disrupt app usage.</li>
        <li>Competition from established platforms like Zoho Inventory.</li>
        <li>User churn if platform value isn’t immediately clear.</li>
      </ul>
    )
  }
];

export default function LearningModule() {
  const [openSectionIndex, setOpenSectionIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenSectionIndex(openSectionIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Sellytics Product Strategy Learning Module</h1>
      <p className="text-center mb-10 text-lg">
        Discover the core elements of Sellytics’ product strategy. Click each section to explore its definition and details!
      </p>
      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={index} className="border rounded shadow">
            <button 
              onClick={() => toggleSection(index)} 
              className="w-full flex items-center justify-between p-4 focus:outline-none bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <div className="flex items-center space-x-3">
                {section.icon}
                <span className="text-2xl font-semibold">{section.title}</span>
              </div>
              <span className="text-2xl">{openSectionIndex === index ? '-' : '+'}</span>
            </button>
            {openSectionIndex === index && (
              <div className="p-6 bg-white space-y-4">
                <div>
                  <h3 className="text-xl font-bold">Definition</h3>
                  <p>{section.definition}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Details</h3>
                  {section.detail}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Example Scenario Section */}
      <div className="mt-10 p-6 bg-blue-50 border border-blue-200 rounded">
        <h2 className="text-3xl font-bold mb-3">Example Scenario</h2>
        <p className="mb-3">
          Imagine you’re a product manager for Sellytics, tasked with improving inventory management for traders in Alaba Market. You develop a barcode scanning feature that cuts stock update time by 30%. Traders like Chinedu can now track inventory and sales in real-time, boosting efficiency.
        </p>
        <p className="italic">
          Reflect: Which metrics would you use to measure the success of this feature?
        </p>
      </div>
    </div>
  );
}





