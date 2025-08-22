import { useState } from "react";
import Simulate from './Version Control/Simulate'

export default function SprintSimulation() {
  const [stage, setStage] = useState("product_backlog");
  const [features, setFeatures] = useState([]);
  const [sprintBacklog, setSprintBacklog] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const stages = [
    "product_backlog",
    "prioritization",
    "sprint_planning",
    "sprint_execution",
    "review"
  ];

  // Feature structure: { id: string, name: string, userNeed: number, businessValue: number, effort: number }
  
  const nextStage = () => {
    const currentIndex = stages.indexOf(stage);
    if (currentIndex < stages.length - 1) {
      setStage(stages[currentIndex + 1]);
      setInput("");
      setError("");
    }
  };

  const handleFeatureCreation = () => {
    if (!input.trim()) {
      setError("Please enter at least one feature");
      return;
    }
    
    const newFeatures = input.split('\n')
      .filter(f => f.trim())
      .map((f, index) => ({
        id: `feature-${Date.now()}-${index}`,
        name: f.trim(),
        userNeed: 0,
        businessValue: 0,
        effort: 0
      }));
    
    setFeatures([...features, ...newFeatures]);
    setInput("");
  };

  const handlePrioritizationChange = (featureId, field, value) => {
    setFeatures(features.map(f => 
      f.id === featureId ? { ...f, [field]: Number(value) } : f
    ));
  };

  const calculatePriorityScore = (feature) => {
    return ((feature.userNeed + feature.businessValue) / 2) - (feature.effort * 0.2);
  };

  const prioritizedFeatures = [...features].sort((a, b) => 
    calculatePriorityScore(b) - calculatePriorityScore(a)
  );

  const addToSprint = (featureId) => {
    const feature = features.find(f => f.id === featureId);
    setSprintBacklog([...sprintBacklog, feature]);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 rounded-lg shadow-md">
        <Simulate/>
      <h1 className="text-2xl font-bold text-blue-700">Agile Sprint Simulation</h1>

      {/* Product Backlog Creation */}
      {stage === "product_backlog" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Step 1: Product Backlog Creation</h2>
          <p className="text-gray-600">List all potential features (one per line):</p>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
            placeholder="Feature 1\nFeature 2\nFeature 3"
          />
          
          {error && <p className="text-red-500">{error}</p>}
          
          <div className="flex gap-4">
            <button
              onClick={handleFeatureCreation}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Features
            </button>
            
            {features.length > 0 && (
              <button
                onClick={nextStage}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Proceed to Prioritization
              </button>
            )}
          </div>

          {features.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Current Product Backlog</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Feature</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature) => (
                    <tr key={feature.id} className="border">
                      <td className="p-2">{feature.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Feature Prioritization */}
      {stage === "prioritization" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Step 2: Feature Prioritization</h2>
          <p className="text-gray-600">Evaluate features based on:</p>
          
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Feature</th>
                <th className="border p-2">User Needs (1-5)</th>
                <th className="border p-2">Business Value (1-5)</th>
                <th className="border p-2">Effort Estimate (1-5)</th>
                <th className="border p-2">Priority Score</th>
              </tr>
            </thead>
            <tbody>
              {prioritizedFeatures.map((feature) => (
                <tr key={feature.id} className="border">
                  <td className="p-2">{feature.name}</td>
                  <td className="p-2">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={feature.userNeed}
                      onChange={(e) => handlePrioritizationChange(feature.id, 'userNeed', e.target.value)}
                      className="w-24"
                    />
                    {feature.userNeed}
                  </td>
                  <td className="p-2">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={feature.businessValue}
                      onChange={(e) => handlePrioritizationChange(feature.id, 'businessValue', e.target.value)}
                      className="w-24"
                    />
                    {feature.businessValue}
                  </td>
                  <td className="p-2">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={feature.effort}
                      onChange={(e) => handlePrioritizationChange(feature.id, 'effort', e.target.value)}
                      className="w-24"
                    />
                    {feature.effort}
                  </td>
                  <td className="p-2 font-semibold">
                    {calculatePriorityScore(feature).toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={nextStage}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Proceed to Sprint Planning
          </button>
        </div>
      )}

      {/* Sprint Planning */}
      {stage === "sprint_planning" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Step 3: Sprint Planning</h2>
          <div className="grid grid-cols-2 gap-8">
            {/* Prioritized Backlog */}
            <div>
              <h3 className="font-semibold mb-2">Prioritized Backlog</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Priority</th>
                    <th className="border p-2">Feature</th>
                    <th className="border p-2">Score</th>
                    <th className="border p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {prioritizedFeatures.map((feature, index) => (
                    <tr key={feature.id} className="border">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{feature.name}</td>
                      <td className="p-2">{calculatePriorityScore(feature).toFixed(1)}</td>
                      <td className="p-2">
                        <button
                          onClick={() => addToSprint(feature.id)}
                          className="px-2 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200"
                          disabled={sprintBacklog.some(f => f.id === feature.id)}
                        >
                          {sprintBacklog.some(f => f.id === feature.id) ? 'Added' : 'Add to Sprint'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sprint Backlog */}
            <div>
              <h3 className="font-semibold mb-2">Sprint Backlog</h3>
              {sprintBacklog.length === 0 ? (
                <p className="text-gray-500">No features added yet</p>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2">Feature</th>
                      <th className="border p-2">Effort</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sprintBacklog.map((feature) => (
                      <tr key={feature.id} className="border">
                        <td className="p-2">{feature.name}</td>
                        <td className="p-2">{feature.effort}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <button
            onClick={nextStage}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={sprintBacklog.length === 0}
          >
            Start Sprint
          </button>
        </div>
      )}

      {/* Sprint Execution */}
      {stage === "sprint_execution" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Step 4: Sprint Execution</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-orange-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">To Do</h3>
              {sprintBacklog.map((feature) => (
                <div key={feature.id} className="bg-white p-2 rounded mb-2 shadow">
                  {feature.name}
                </div>
              ))}
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">In Progress</h3>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Done</h3>
            </div>
          </div>
          <button
            onClick={nextStage}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Complete Sprint
          </button>
        </div>
      )}

      {/* Sprint Review */}
      {stage === "review" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Sprint Review & Retrospective</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Completed Work</h3>
              <ul className="list-disc pl-6">
                {sprintBacklog.map((feature) => (
                  <li key={feature.id} className="mb-2">
                    {feature.name} (Effort: {feature.effort})
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Velocity Metrics</h3>
              <p>Total Effort: {sprintBacklog.reduce((sum, f) => sum + f.effort, 0)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}