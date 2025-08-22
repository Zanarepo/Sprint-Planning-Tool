// LearningModule.jsx
import React, { useState } from 'react';

import ProductStrategyQuiz from './ProductStrategyQuiz';
import ProductStrategySimulation from './ProductStrategySimulation';

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
    definition: "A high-level, inspirational statement that outlines what the organization aims to achieve in the long run.",
    detail: (
      <>
        <p>
          Our vision is to create a seamless, secure seller onboarding and compliance solution that builds trust and reduces friction for third-party sellers on our e-commerce platform. This solution will solidify SystemSpecs’ position as an industry leader in regulatory excellence and innovation.
        </p>
      </>
    )
  },
  {
    title: "Mission",
    icon: <FaBullseye className="text-green-500" />,
    definition: "A clear, actionable statement of what the team does to accomplish the vision, outlining processes and objectives.",
    detail: (
      <>
        <p>
          The mission is to develop a self-service onboarding wizard that automates identity verification, collects essential tax and business registration data, and performs continuous compliance checks—helping sellers quickly come online while ensuring adherence to local and international regulations.
        </p>
      </>
    )
  },
  {
    title: "Strategic Goals",
    icon: <FaLightbulb className="text-yellow-500" />,
    definition: "Specific, measurable targets that guide initiatives and measure the success of the product strategy.",
    detail: (
      <ul className="list-disc pl-5">
        <li>
          <strong>Enhance Seller Trust &amp; Safety:</strong> Ensure every seller on the platform is verified and compliant, thereby protecting buyers and the platform.
        </li>
        <li>
          <strong>Accelerate Onboarding:</strong> Reduce the seller onboarding time by 30% through an efficient, guided registration process.
        </li>
        <li>
          <strong>Maintain Regulatory Excellence:</strong> Leverage automated KYC and compliance checks to minimize non-compliant listings by 50%.
        </li>
        <li>
          <strong>Drive Market Expansion:</strong> Support platform growth by addressing regulatory challenges and simplifying entry into new regions.
        </li>
      </ul>
    )
  },
  {
    title: "Target Audience",
    icon: <FaUsers className="text-purple-500" />,
    definition: "The specific group of people for whom the product is designed.",
    detail: (
      <p>
        Our target audience consists of small to mid-sized businesses and individual entrepreneurs seeking to sell on our e-commerce platform. They require an easy, secure, and compliant way to start selling online.
      </p>
    )
  },
  {
    title: "Market Opportunity & Competitive Analysis",
    icon: <FaChartBar className="text-red-500" />,
    definition: "An evaluation of the market environment, including potential opportunities and competitors, to position the product successfully.",
    detail: (
      <>
        <p>
          <strong>Opportunity:</strong> With increasing regulatory scrutiny and heightened consumer demand for trustworthy online transactions, having a streamlined compliance solution is a major market differentiator.
        </p>
        <p>
          <strong>Competitive Edge:</strong> SystemSpecs’ strong reputation in financial technology through products like Remita and HumanManager allows us to offer a unique, integrated compliance solution that many competitors cannot match.
        </p>
      </>
    )
  },
  {
    title: "Key Metrics",
    icon: <FaChartBar className="text-indigo-500" />,
    definition: "Quantifiable measures used to track the performance and success of the product strategy over time.",
    detail: (
      <ul className="list-disc pl-5">
        <li>Seller onboarding duration</li>
        <li>Percentage of sellers successfully verified and compliant at initial registration</li>
        <li>Reduction in post-onboarding compliance issues</li>
        <li>Seller satisfaction scores</li>
      </ul>
    )
  },
  {
    title: "Risks & Considerations",
    icon: <FaExclamationTriangle className="text-orange-500" />,
    definition: "Potential challenges and obstacles that could impact the success of the product strategy.",
    detail: (
      <ul className="list-disc pl-5">
        <li>Dependency on third-party KYC providers and potential API uptime issues.</li>
        <li>Regional regulatory differences that might require dynamic adjustments.</li>
        <li>Balancing a frictionless experience with rigorous compliance requirements.</li>
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
      <h1 className="text-4xl font-bold text-center mb-6">Product Strategy Learning Module</h1>
      <p className="text-center mb-10 text-lg">
        Explore the key elements of our product strategy. Click on each section to first learn the definition, then dive into the details!
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
          Imagine you're a product manager tasked with enhancing seller trust. You conceptualize a self-service onboarding wizard that streamlines identity verification and compliance checks. As a result, the onboarding time decreases by 30% while increasing seller satisfaction.
        </p>
        <p className="italic">
          Reflect: Which key metrics would you use to measure the success of your initiative?
        </p>
      </div> <br/>

      <ProductStrategyQuiz/> <br/>

      <ProductStrategySimulation/> <br/>

    </div>
    
  );
}
