import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Simulate from './Simulate';

export default function SprintSimulation() {
  const [stage, setStage] = useState("product_backlog");
  const [features, setFeatures] = useState([]);
  const [sprintBacklog, setSprintBacklog] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [editingFeature, setEditingFeature] = useState(null);
  const [editText, setEditText] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  const stages = [
    "product_backlog",
    "prioritization",
    "sprint_planning",
    "sprint_execution",
    "review"
  ];

  // Feature structure: { id: string, name: string, userNeed: number, businessValue: number, effort: number, status: string }
  
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
        userNeed: 3,
        businessValue: 3,
        effort: 3,
        status: "todo"
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
    setSprintBacklog([...sprintBacklog, { ...feature, status: "todo" }]);
  };

  // Edit functionality
  const handleEditStart = (feature) => {
    setEditingFeature(feature);
    setEditText(feature.name);
    setShowEditModal(true);
  };

  const handleEditSave = () => {
    const updatedFeatures = features.map(f => 
      f.id === editingFeature.id ? { ...f, name: editText } : f
    );
    setFeatures(updatedFeatures);
    setSprintBacklog(sprintBacklog.map(f => 
      f.id === editingFeature.id ? { ...f, name: editText } : f
    ));
    setShowEditModal(false);
  };

  const handleRemoveFeature = (featureId) => {
    if (window.confirm("Are you sure you want to remove this feature?")) {
      setFeatures(features.filter(f => f.id !== featureId));
      setSprintBacklog(sprintBacklog.filter(f => f.id !== featureId));
    }
  };

  // Drag and drop functionality
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(sprintBacklog);
    const [reorderedItem] = items.splice(result.source.index, 1);
    reorderedItem.status = result.destination.droppableId;
    items.splice(result.destination.index, 0, reorderedItem);
    setSprintBacklog(items);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 rounded-lg shadow-md">
      <Simulate />
      <h1 className="text-2xl font-bold text-blue-700">Agile Sprint Simulation </h1>

      {/* Edit Feature Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Edit Feature</h3>
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

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
          
          <div className="flex gap-4 flex-wrap">
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
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Feature</th>
                    <th className="border p-2 w-32">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature) => (
                    <tr key={feature.id} className="border">
                      <td className="p-2">{feature.name}</td>
                      <td className="p-2 flex gap-2">
                        <button
                          onClick={() => handleEditStart(feature)}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleRemoveFeature(feature.id)}
                          className="px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
                        >
                          Remove
                        </button>
                      </td>
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
        <div className="space-y-4 overflow-x-auto">
          <h2 className="text-xl font-semibold">Step 2: Feature Prioritization</h2>
          <table className="w-full border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Feature</th>
                <th className="border p-2">User Needs (1-5)</th>
                <th className="border p-2">Business Value (1-5)</th>
                <th className="border p-2">Effort Estimate (1-5)</th>
                <th className="border p-2">Priority Score</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {prioritizedFeatures.map((feature) => (
                <tr key={feature.id} className="border">
                  <td className="p-2">{feature.name}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={feature.userNeed}
                        onChange={(e) => handlePrioritizationChange(feature.id, 'userNeed', e.target.value)}
                        className="w-32 accent-green-500"
                      />
                      <span className="w-6 text-center font-medium">{feature.userNeed}</span>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={feature.businessValue}
                        onChange={(e) => handlePrioritizationChange(feature.id, 'businessValue', e.target.value)}
                        className="w-32 accent-blue-500"
                      />
                      <span className="w-6 text-center font-medium">{feature.businessValue}</span>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={feature.effort}
                        onChange={(e) => handlePrioritizationChange(feature.id, 'effort', e.target.value)}
                        className="w-32 accent-red-500"
                      />
                      <span className="w-6 text-center font-medium">{feature.effort}</span>
                    </div>
                  </td>
                  <td className="p-2 font-semibold">
                    {calculatePriorityScore(feature).toFixed(1)}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleRemoveFeature(feature.id)}
                      className="px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
                    >
                      Remove
                    </button>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="overflow-x-auto">
              <h3 className="font-semibold mb-2">Prioritized Backlog</h3>
              <table className="w-full border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Priority</th>
                    <th className="border p-2">Feature</th>
                    <th className="border p-2">Score</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {prioritizedFeatures.map((feature, index) => (
                    <tr key={feature.id} className="border">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{feature.name}</td>
                      <td className="p-2">{calculatePriorityScore(feature).toFixed(1)}</td>
                      <td className="p-2 space-x-2">
                        <button
                          onClick={() => handleEditStart(feature)}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                        >
                          Edit
                        </button>
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

            <div className="overflow-x-auto">
              <h3 className="font-semibold mb-2">Sprint Backlog</h3>
              {sprintBacklog.length === 0 ? (
                <p className="text-gray-500">No features added yet</p>
              ) : (
                <table className="w-full border-collapse min-w-[400px]">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2">Feature</th>
                      <th className="border p-2">Effort</th>
                      <th className="border p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sprintBacklog.map((feature) => (
                      <tr key={feature.id} className="border">
                        <td className="p-2">{feature.name}</td>
                        <td className="p-2">{feature.effort}</td>
                        <td className="p-2">
                          <button
                            onClick={() => handleRemoveFeature(feature.id)}
                            className="px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
                          >
                            Remove
                          </button>
                        </td>
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
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Step 4: Sprint Execution</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['todo', 'inProgress', 'done'].map((column) => (
                <Droppable key={column} droppableId={column}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`p-4 rounded-lg min-h-[200px] ${
                        column === 'todo' ? 'bg-orange-100' :
                        column === 'inProgress' ? 'bg-blue-100' : 'bg-green-100'
                      }`}
                    >
                      <h3 className="font-semibold mb-2">
                        {column === 'todo' ? 'To Do' :
                         column === 'inProgress' ? 'In Progress' : 'Done'}
                      </h3>
                      {sprintBacklog
                        .filter(f => f.status === column)
                        .map((feature, index) => (
                          <Draggable key={feature.id} draggableId={feature.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-white p-3 rounded mb-2 shadow-md hover:shadow-lg transition-shadow"
                              >
                                <div className="flex justify-between items-center">
                                  <span>{feature.name}</span>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleEditStart(feature)}
                                      className="text-blue-600 hover:text-blue-800"
                                    >
                                      ✏️
                                    </button>
                                    <button
                                      onClick={() => handleRemoveFeature(feature.id)}
                                      className="text-red-600 hover:text-red-800"
                                    >
                                      🗑️
                                    </button>
                                  </div>
                                </div>
                                <div className="mt-2 text-sm text-gray-500">
                                  Effort: {feature.effort}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
            <button
              onClick={nextStage}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Complete Sprint
            </button>
          </div>
        </DragDropContext>
      )}

      {/* Sprint Review */}
      {stage === "review" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Sprint Review & Retrospective</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
           
              <h3 className="font-semibold mb-2">Velocity Metrics</h3>
              <p>Total Effort: {sprintBacklog.reduce((sum, f) => sum + f.effort, 0)}</p>
            </div>
          </div>
        
      )}
    </div>
  );
}