import React, { useState } from 'react';

const BlueEnergyClasswork = () => {
  const [selectedExample, setSelectedExample] = useState(null);

  const examples = [
    {
      title: "Tesla",
      details: {
        Eliminated: "Need for fuel stations",
        Reduced: "Dealership sales model",
        Raised: "Performance & sustainability",
        Created: "Direct-to-customer sales, supercharger network"
      }
    },
    {
      title: "Netflix",
      details: {
        Eliminated: "Late fees, physical rental stores",
        Reduced: "Dependence on physical DVDs",
        Raised: "On-demand access, personalized recommendations",
        Created: "Subscription-based streaming model"
      }
    },
    {
      title: "Nintendo Wii",
      details: {
        Eliminated: "Complex gaming interfaces",
        Reduced: "Emphasis on high-end graphics",
        Raised: "Accessibility for casual gamers",
        Created: "Motion-controlled gaming experience"
      }
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Blue Ocean Strategy from a Product Manager’s Perspective</h1>
      <p className="mb-4">Blue Ocean Strategy encourages companies to create new, uncontested market spaces rather than competing in overcrowded markets.</p>
      
      <h2 className="text-2xl font-semibold mt-6">Interactive Blue Ocean Strategy Examples</h2>
      <p>Select a company to see how they applied the Four Actions Framework (ERRC):</p>
      <div className="flex space-x-4 mt-4">
        {examples.map((example, index) => (
          <button
            key={index}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setSelectedExample(example)}
          >
            {example.title}
          </button>
        ))}
      </div>
      {selectedExample && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h3 className="text-xl font-semibold">{selectedExample.title}</h3>
          <ul className="list-disc pl-6 mt-2">
            {Object.entries(selectedExample.details).map(([key, value], i) => (
              <li key={i}><strong>{key}:</strong> {value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BlueEnergyClasswork;
