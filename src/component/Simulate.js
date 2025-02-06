import { useState, useEffect } from "react";

export default function ProductBrainstorming() {
  const [timer, setTimer] = useState(5 * 60);
  const [problem, setProblem] = useState("");
  const [uvp, setUvp] = useState("");
  const [features, setFeatures] = useState([]);
  const [uvpList, setUvpList] = useState([]);
  const [currentFeature, setCurrentFeature] = useState("");
  const [currentChallenge, setCurrentChallenge] = useState("");
  const [currentSolution, setCurrentSolution] = useState("");
  const [editingFeatureIndex, setEditingFeatureIndex] = useState(null);
  const [editingUvpIndex, setEditingUvpIndex] = useState(null);
  const [ setError] = useState("");

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleAddFeature = () => {
    if (currentFeature && currentChallenge && currentSolution) {
      if (editingFeatureIndex !== null) {
        const updatedFeatures = [...features];
        updatedFeatures[editingFeatureIndex] = {
          feature: currentFeature,
          challenge: currentChallenge,
          solution: currentSolution,
        };
        setFeatures(updatedFeatures);
        setEditingFeatureIndex(null);
      } else {
        setFeatures([...features, { feature: currentFeature, challenge: currentChallenge, solution: currentSolution }]);
      }
      setCurrentFeature("");
      setCurrentChallenge("");
      setCurrentSolution("");
      setError("");
    } else {
      setError("All fields are required!");
    }
  };

  const handleEditFeature = (index) => {
    const item = features[index];
    setCurrentFeature(item.feature);
    setCurrentChallenge(item.challenge);
    setCurrentSolution(item.solution);
    setEditingFeatureIndex(index);
  };

  const handleDeleteFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleAddUvp = () => {
    if (uvp && problem) {
      if (editingUvpIndex !== null) {
        const updatedUvpList = [...uvpList];
        updatedUvpList[editingUvpIndex] = { uvp, problem };
        setUvpList(updatedUvpList);
        setEditingUvpIndex(null);
      } else {
        setUvpList([...uvpList, { uvp, problem }]);
      }
      setUvp("");
      setProblem("");
    }
  };

  const handleEditUvp = (index) => {
    const item = uvpList[index];
    setUvp(item.uvp);
    setProblem(item.problem);
    setEditingUvpIndex(index);
  };

  const handleDeleteUvp = (index) => {
    setUvpList(uvpList.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen mt-8">
     <h1 className="text-2xl font-bold text-blue-800 text-center">Product Brainstorming</h1>

      <div className="mb-4 text-gray-700 font-semibold">
        Time Remaining: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-blue-800">Unique Value Proposition (UVP) </h2>
        <textarea
          value={uvp}
          onChange={(e) => setUvp(e.target.value)}
          placeholder="Describe the UVP"
          className="w-full p-3 border rounded-md shadow-sm"
        />
        <h2 className="text-lg font-semibold text-blue-800">Problem Statement (PS)</h2>
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="What is the problem statement"
          className="w-full p-3 border rounded-md shadow-sm mt-2"
        />
        <button onClick={handleAddUvp} className="mt-4 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          {editingUvpIndex !== null ? "Update" : "Add"} UVP & PS to Table
        </button>
      </div>
      
      <table className="min-w-full border bg-white shadow-md rounded-lg">
        <thead className="bg-blue-200">
          <tr>
            <th className="border p-3">UVP</th>
            <th className="border p-3">Problem</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {uvpList.map((item, index) => (
            <tr key={index}>
              <td className="border p-3">{item.uvp}</td>
              <td className="border p-3">{item.problem}</td>
              <td className="border p-3">
                <button onClick={() => handleEditUvp(index)} className="mr-2 text-blue-600">Edit</button>
                <button onClick={() => handleDeleteUvp(index)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <h2 className="text-lg font-semibold text-blue-600">Features</h2>
      <input type="text" value={currentFeature} onChange={(e) => setCurrentFeature(e.target.value)} placeholder="Feature Name" className="p-3 border rounded-md w-full shadow-sm" />
      <input type="text" value={currentChallenge} onChange={(e) => setCurrentChallenge(e.target.value)} placeholder="Challenge" className="p-3 border rounded-md w-full shadow-sm" />
      <input type="text" value={currentSolution} onChange={(e) => setCurrentSolution(e.target.value)} placeholder="Possible Solution" className="p-3 border rounded-md w-full shadow-sm" />
      <button onClick={handleAddFeature} className="mt-4 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        {editingFeatureIndex !== null ? "Update" : "Add"} Feature to Table
      </button>
      
      <table className="min-w-full border bg-white shadow-md rounded-lg">
        <thead className="bg-blue-200">
          <tr>
            <th className="border p-3">Feature</th>
            <th className="border p-3">Challenge</th>
            <th className="border p-3">Solution</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {features.map((item, index) => (
            <tr key={index}>
              <td className="border p-3">{item.feature}</td>
              <td className="border p-3">{item.challenge}</td>
              <td className="border p-3">{item.solution}</td>
              <td className="border p-3">
                <button onClick={() => handleEditFeature(index)} className="mr-2 text-blue-600">Edit</button>
                <button onClick={() => handleDeleteFeature(index)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}