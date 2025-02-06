import { useState, useEffect } from "react";
import HowToUse from './HowToUse'
export default function ProductBrainstorming() {
  const [timer, setTimer] = useState(5 * 60); // 5 minutes timer
  const [problem, setProblem] = useState("");
  const [uvp, setUvp] = useState("");
  const [features, setFeatures] = useState([]);
  const [currentFeature, setCurrentFeature] = useState("");
  const [currentChallenge, setCurrentChallenge] = useState("");
  const [currentSolution, setCurrentSolution] = useState("");
  const [error, setError] = useState(""); // To hold error message

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleAddFeature = () => {
    if (currentFeature && currentChallenge && currentSolution) {
      setFeatures([
        ...features,
        { feature: currentFeature, challenge: currentChallenge, solution: currentSolution },
      ]);
      setCurrentFeature("");
      setCurrentChallenge("");
      setCurrentSolution("");
      setError(""); // Clear error on successful addition
    } else {
      setError("All fields are required!"); // Show error if fields are incomplete
    }
  };

  const isFormValid = currentFeature && currentChallenge && currentSolution; // Check if form is valid

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <HowToUse/>
      <h1 className="text-2xl font-bold text-gray-800">Product Brainstorming</h1>
  
      {/* Timer */}
      <div className="mb-4 text-gray-700 font-semibold">
        Time Remaining: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
      </div>
  
      {/* Problem Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Problem the Product Solves</h2>
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="Describe the problem"
          className="w-full p-3 border rounded-md shadow-sm"
        />
      </div>
  
      {/* UVP Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Unique Value Proposition (UVP)</h2>
        <textarea
          value={uvp}
          onChange={(e) => setUvp(e.target.value)}
          placeholder="Describe the UVP"
          className="w-full p-3 border rounded-md shadow-sm"
        />
      </div>
  
      {/* Idea Input Fields */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800">Brainstorming Features, Challenges, and Solutions</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={currentFeature}
            onChange={(e) => setCurrentFeature(e.target.value)}
            placeholder="Feature Name"
            className="p-3 border rounded-md w-full shadow-sm"
          />
          <input
            type="text"
            value={currentChallenge}
            onChange={(e) => setCurrentChallenge(e.target.value)}
            placeholder="Challenge"
            className="p-3 border rounded-md w-full shadow-sm"
          />
          <input
            type="text"
            value={currentSolution}
            onChange={(e) => setCurrentSolution(e.target.value)}
            placeholder="Possible Solution"
            className="p-3 border rounded-md w-full shadow-sm"
          />
          
          {/* Display error message if required fields are not filled */}
          {error && <p className="text-red-600">{error}</p>}

          <button
            onClick={handleAddFeature}
            disabled={!isFormValid}
            className={`mt-4 p-3 rounded-md transition ${isFormValid ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
          >
            Add Idea to Table
          </button>
        </div>
      </div>
  
      {/* Captured Ideas Table */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800">Captured Ideas</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200 text-gray-800">
              <tr>
                <th className="border p-3">#</th>
                <th className="border p-3">Feature</th>
                <th className="border p-3">Challenge</th>
                <th className="border p-3">Solution</th>
                <th className="border p-3">UVP</th>
                <th className="border p-3">Problem</th>
              </tr>
            </thead>
            <tbody>
              {features.map((item, index) => (
                <tr key={index} className="text-gray-700 text-center">
                  <td className="border p-3 font-semibold">{index + 1}</td>
                  <td className="border p-3">{item.feature}</td>
                  <td className="border p-3">{item.challenge}</td>
                  <td className="border p-3">{item.solution}</td>
                  <td className="border p-3">{uvp}</td>
                  <td className="border p-3">{problem}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  
      {/* End Session Button */}
      <div className="mt-6">
        
      </div>
    </div>
  );
}
