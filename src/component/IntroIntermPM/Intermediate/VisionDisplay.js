import React from "react";
import {
  FaPrint,
  FaUsers,
  FaExclamationTriangle,
  FaMobileAlt,
  FaBullseye,
  FaStar,
  FaQuoteRight,
} from "react-icons/fa";

const sections = [
  {
    title: "Target Audience",
    icon: <FaUsers />,
    content:
      "Tech-savvy millennials in urban areas who are underserved by traditional banking. These are digital natives looking for efficient and modern solutions.",
  },
  {
    title: "User Needs / Problems",
    icon: <FaExclamationTriangle />,
    content:
      "Users find traditional banking apps too cumbersome and time-consuming, causing frustration and lost opportunities for engagement.",
  },
  {
    title: "Product Solution",
    icon: <FaMobileAlt />,
    content:
      "A sleek, intuitive mobile banking app that simplifies everyday transactions—allowing users to check balances, transfer funds, and manage budgets quickly.",
  },
  {
    title: "Business Goals",
    icon: <FaBullseye />,
    content:
      "Achieve 1 million active users in the first year, increase customer retention by 20%, and open new revenue streams through strategic partnerships with banks.",
  },
  {
    title: "Key Differentiators",
    icon: <FaStar />,
    content:
      "A unique blend of innovative security features (such as biometric authentication) combined with a user-friendly interface that differentiates it from traditional banking apps.",
  },
  {
    title: "Vision Statement",
    icon: <FaQuoteRight />,
    content:
      "Empowering users to manage their finances effortlessly and securely from their smartphones, transforming the way they interact with banking services.",
  },
];

const VisionBoard = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header with Title and Print Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">
          Product Vision Board: Mobile Banking App
        </h1>
        <button
          onClick={() => window.print()}
          className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
        >
          <FaPrint className="mr-2" /> Print Board
        </button>
      </div>

      {/* Vision Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-lg p-6 bg-white hover:shadow-2xl transition duration-300"
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl text-indigo-500 mr-3">{section.icon}</span>
              <h2 className="text-2xl font-semibold text-gray-700">
                {section.title}
              </h2>
            </div>
            <p className="text-gray-600">{section.content}</p>
          </div>
        ))}
      </div>

      {/* Board Description Section */}
      <div className="mt-10 p-6 bg-gray-100 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          How It Works
        </h2>
        <p className="text-gray-700">
          This Vision Board visually aligns the product strategy for our mobile
          banking app. Each card represents a core component:
        </p>
        <ul className="list-disc ml-6 mt-2 text-gray-700">
          <li>
            <strong>Target Audience:</strong> Who the product is built for.
          </li>
          <li>
            <strong>User Needs/Problems:</strong> The challenges the users face.
          </li>
          <li>
            <strong>Product Solution:</strong> How the product solves these issues.
          </li>
          <li>
            <strong>Business Goals:</strong> The strategic objectives and targets.
          </li>
          <li>
            <strong>Key Differentiators:</strong> What makes the product stand out.
          </li>
          <li>
            <strong>Vision Statement:</strong> The overarching, inspiring goal.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VisionBoard;
