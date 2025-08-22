// StrategySimulator.jsx
import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

// Pre-defined companies with default strategy data
const companies = [
  {
    name: "Sprintify",
    defaultStrategy: {
      vision: "Create a seamless, secure seller onboarding and compliance solution that builds trust and reduces friction for third-party sellers.",
      mission: "Develop a self-service onboarding wizard that automates identity verification, collects essential tax and business registration data, and performs continuous compliance checks.",
      strategicGoals: [
        "Enhance Seller Trust & Safety.",
        "Accelerate Onboarding by reducing time by 30%.",
        "Maintain Regulatory Excellence through automated KYC.",
        "Drive Market Expansion by simplifying regulatory challenges."
      ],
      targetAudience: "Small to mid-sized businesses and individual entrepreneurs.",
      marketOpportunity: "Increasing regulatory scrutiny and a demand for trustworthy transactions.",
      keyMetrics: [
        "Seller onboarding duration",
        "Percentage of verified sellers",
        "Reduction in compliance issues",
        "Seller satisfaction scores"
      ],
      risks: [
        "Dependency on third-party KYC providers",
        "Regional regulatory differences",
        "Balancing frictionless experience with compliance"
      ]
    }
  },
 
 
  {
    name: "TechCorp",
    defaultStrategy: {
      vision: "Innovate cutting-edge solutions that empower smarter technology.",
      mission: "Deploy AI-driven systems that deliver measurable and scalable results.",
      strategicGoals: [
        "Launch innovative products ahead of competitors.",
        "Increase market share via smart integrations.",
        "Enhance customer experience with streamlined services."
      ],
      targetAudience: "Businesses looking for next-gen tech solutions.",
      marketOpportunity: "A rapidly evolving tech landscape with high growth potential.",
      keyMetrics: [
        "Customer acquisition cost",
        "Market share growth",
        "Product adoption rate"
      ],
      risks: [
        "Fast-changing technology trends",
        "High competition",
        "Scaling operationally"
      ]
    }
  }


];

export default function StrategySimulator() {
  // State to store the selected company and the strategy data.
  const [selectedCompany, setSelectedCompany] = useState("");
  const [strategy, setStrategy] = useState({
    vision: "",
    mission: "",
    strategicGoals: [],
    targetAudience: "",
    marketOpportunity: "",
    keyMetrics: [],
    risks: [],
  });
  const [showDashboard, setShowDashboard] = useState(false);

  // For new items for dynamic lists.
  const [newGoal, setNewGoal] = useState("");
  const [newKeyMetric, setNewKeyMetric] = useState("");
  const [newRisk, setNewRisk] = useState("");

  // For inline editing of list items; track the editing item by index.
  const [editingIndex, setEditingIndex] = useState({
    strategicGoal: null,
    keyMetric: null,
    risk: null,
  });
  const [editingText, setEditingText] = useState("");

  // When a company is selected, load its default strategy.
  const handleCompanyChange = (e) => {
    const companyName = e.target.value;
    setSelectedCompany(companyName);
    setShowDashboard(false);
    const company = companies.find((comp) => comp.name === companyName);
    if (company) {
      setStrategy({
        vision: company.defaultStrategy.vision,
        mission: company.defaultStrategy.mission,
        strategicGoals: [...company.defaultStrategy.strategicGoals],
        targetAudience: company.defaultStrategy.targetAudience,
        marketOpportunity: company.defaultStrategy.marketOpportunity,
        keyMetrics: [...company.defaultStrategy.keyMetrics],
        risks: [...company.defaultStrategy.risks],
      });
    } else {
      // Reset form if no company is selected.
      setStrategy({
        vision: "",
        mission: "",
        strategicGoals: [],
        targetAudience: "",
        marketOpportunity: "",
        keyMetrics: [],
        risks: [],
      });
    }
  };

  // Update simple text fields.
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setStrategy((prev) => ({ ...prev, [name]: value }));
  };

  // Functions for dynamic list manipulation.
  const addItem = (field, newItem, setNewItem) => {
    if (!newItem.trim()) return;
    setStrategy((prev) => ({
      ...prev,
      [field]: [...prev[field], newItem.trim()],
    }));
    setNewItem("");
  };

  const removeItem = (field, index) => {
    setStrategy((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const editItem = (field, index) => {
    setEditingIndex((prev) => ({ ...prev, [field]: index }));
    setEditingText(strategy[field][index]);
  };

  const updateItem = (field, index) => {
    const updatedItems = [...strategy[field]];
    updatedItems[index] = editingText;
    setStrategy((prev) => ({ ...prev, [field]: updatedItems }));
    setEditingIndex((prev) => ({ ...prev, [field]: null }));
    setEditingText("");
  };

  // Submit the strategy form to show the dashboard.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCompany) {
      alert("Please select a company.");
      return;
    }
    setShowDashboard(true);
  };

  // The editable form view.
  const renderForm = () => (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded shadow space-y-8">
      {/* Company selection */}
      <div>
        <label className="block text-lg font-semibold mb-2">Select Company:</label>
        <select
          value={selectedCompany}
          onChange={handleCompanyChange}
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">-- Choose a Company --</option>
          {companies.map((company) => (
            <option key={company.name} value={company.name}>
              {company.name}
            </option>
          ))}
        </select>
      </div>

      {/* Vision */}
      <div>
        <label className="block text-lg font-semibold mb-2">Vision:</label>
        <textarea
          name="vision"
          value={strategy.vision}
          onChange={handleFieldChange}
          rows="3"
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter the vision for the product strategy"
        ></textarea>
      </div>

      {/* Mission */}
      <div>
        <label className="block text-lg font-semibold mb-2">Mission:</label>
        <textarea
          name="mission"
          value={strategy.mission}
          onChange={handleFieldChange}
          rows="3"
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter the mission for the product strategy"
        ></textarea>
      </div>

      {/* Strategic Goals */}
      <div>
        <label className="block text-lg font-semibold mb-2">Strategic Goals:</label>
        <ul className="list-disc pl-5 space-y-2">
          {strategy.strategicGoals.map((goal, index) => (
            <li key={index} className="flex items-center">
              {editingIndex.strategicGoal === index ? (
                <>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <button
                    type="button"
                    onClick={() => updateItem("strategicGoals", index)}
                    className="ml-2 text-green-600"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1">{goal}</span>
                  <button
                    type="button"
                    onClick={() => editItem("strategicGoals", index)}
                    className="ml-2 text-blue-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem("strategicGoals", index)}
                    className="ml-2 text-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
        <div className="flex items-center mt-2">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Add a new goal..."
            className="flex-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            type="button"
            onClick={() => addItem("strategicGoals", newGoal, setNewGoal)}
            className="ml-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Target Audience */}
      <div>
        <label className="block text-lg font-semibold mb-2">Target Audience:</label>
        <textarea
          name="targetAudience"
          value={strategy.targetAudience}
          onChange={handleFieldChange}
          rows="2"
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Define the target audience for the product strategy"
        ></textarea>
      </div>

      {/* Market Opportunity & Competitive Analysis */}
      <div>
        <label className="block text-lg font-semibold mb-2">
          Market Opportunity & Competitive Analysis:
        </label>
        <textarea
          name="marketOpportunity"
          value={strategy.marketOpportunity}
          onChange={handleFieldChange}
          rows="3"
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Describe the market opportunity and competitive analysis"
        ></textarea>
      </div>

      {/* Key Metrics */}
      <div>
        <label className="block text-lg font-semibold mb-2">Key Metrics:</label>
        <ul className="list-disc pl-5 space-y-2">
          {strategy.keyMetrics.map((metric, index) => (
            <li key={index} className="flex items-center">
              {editingIndex.keyMetric === index ? (
                <>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <button
                    type="button"
                    onClick={() => updateItem("keyMetrics", index)}
                    className="ml-2 text-green-600"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1">{metric}</span>
                  <button
                    type="button"
                    onClick={() => editItem("keyMetrics", index)}
                    className="ml-2 text-blue-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem("keyMetrics", index)}
                    className="ml-2 text-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
        <div className="flex items-center mt-2">
          <input
            type="text"
            value={newKeyMetric}
            onChange={(e) => setNewKeyMetric(e.target.value)}
            placeholder="Add a new key metric..."
            className="flex-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            type="button"
            onClick={() => addItem("keyMetrics", newKeyMetric, setNewKeyMetric)}
            className="ml-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Risks & Considerations */}
      <div>
        <label className="block text-lg font-semibold mb-2">Risks & Considerations:</label>
        <ul className="list-disc pl-5 space-y-2">
          {strategy.risks.map((risk, index) => (
            <li key={index} className="flex items-center">
              {editingIndex.risk === index ? (
                <>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <button
                    type="button"
                    onClick={() => updateItem("risks", index)}
                    className="ml-2 text-green-600"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1">{risk}</span>
                  <button
                    type="button"
                    onClick={() => editItem("risks", index)}
                    className="ml-2 text-blue-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem("risks", index)}
                    className="ml-2 text-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
        <div className="flex items-center mt-2">
          <input
            type="text"
            value={newRisk}
            onChange={(e) => setNewRisk(e.target.value)}
            placeholder="Add a new risk..."
            className="flex-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            type="button"
            onClick={() => addItem("risks", newRisk, setNewRisk)}
            className="ml-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-4 px-8 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
        >
          Save &amp; View Full Strategy
        </button>
      </div>
    </div>
  );

  // The dashboard view displays the complete strategy document.
  const renderDashboard = () => (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded shadow space-y-8">
      <h2 className="text-3xl font-bold text-center">Strategy Dashboard</h2>
      <div>
        <h3 className="text-xl font-semibold mb-1">Company:</h3>
        <p className="text-gray-800">{selectedCompany}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-1">Vision</h3>
        <p className="text-gray-800">{strategy.vision}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-1">Mission</h3>
        <p className="text-gray-800">{strategy.mission}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-1">Strategic Goals</h3>
        <ul className="list-disc pl-5 text-gray-800">
          {strategy.strategicGoals.map((goal, index) => (
            <li key={index}>{goal}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-1">Target Audience</h3>
        <p className="text-gray-800">{strategy.targetAudience}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-1">Market Opportunity & Competitive Analysis</h3>
        <p className="text-gray-800">{strategy.marketOpportunity}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-1">Key Metrics</h3>
        <ul className="list-disc pl-5 text-gray-800">
          {strategy.keyMetrics.map((metric, index) => (
            <li key={index}>{metric}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-1">Risks & Considerations</h3>
        <ul className="list-disc pl-5 text-gray-800">
          {strategy.risks.map((risk, index) => (
            <li key={index}>{risk}</li>
          ))}
        </ul>
      </div>
      <div className="text-center">
        <button
          type="button"
          onClick={() => setShowDashboard(false)}
          className="px-8 py-3 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 transition-colors"
        >
          Edit Strategy
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <header className="p-8 bg-blue-600 text-white text-center">
        <h1 className="text-4xl font-bold">Product Strategy Builder</h1>
      </header>
      <main className="flex-1 w-full p-8 overflow-y-auto">
        {!showDashboard ? renderForm() : renderDashboard()}
      </main>
      
    </div>
  );
}
