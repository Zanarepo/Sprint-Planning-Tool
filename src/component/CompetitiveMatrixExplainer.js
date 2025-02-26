import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CompetitiveMatrixExplainer = () => {
  const [open, setOpen] = useState(false);

  // Data for each explanation card
  const explanationItems = [
    {
      title: "What is a Competitive Matrix?",
      description:
        "A competitive matrix is a tool used to systematically compare your product's features, pricing, usability, and customer feedback against your competitors. It helps identify market gaps and areas for improvement.",
    },
    {
      title: "Pricing",
      description:
        "Pricing is rated on a scale (e.g., 1-10) and represents the cost competitiveness of the product. A lower price might be more attractive, but quality and value should also be considered.",
    },
    {
      title: "Usability",
      description:
        "Usability measures how user-friendly and intuitive the product is. A higher usability rating indicates that users find the product easier to navigate and more efficient to use.",
    },
    {
      title: "Customer Feedback",
      description:
        "Customer feedback is gathered from reviews and surveys. This metric reflects how satisfied users are with the product, and higher ratings indicate better overall customer experience.",
    },
    {
      title: "Overall Score",
      description:
        "The overall score is typically calculated using a weighted average of the key metrics (e.g., Pricing 30%, Usability 40%, Feedback 30%). It provides a single benchmark to help assess and compare product performance.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Headline */}
      <h1 className="text-3xl font-semibold text-gray-800 text-center">
        Competitive Matrix Explainer
      </h1>

      {/* Toggle Button */}
      <div className="flex justify-center my-4">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="bg-blue-800 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          {open ? "Hide Details" : "Show Details"}
        </button>
      </div>

      {/* Explanation Cards */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="grid gap-4 sm:grid-cols-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {explanationItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-4 border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CompetitiveMatrixExplainer;
