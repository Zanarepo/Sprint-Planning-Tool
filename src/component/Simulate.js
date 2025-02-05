import { useState, useEffect } from "react";

export default function ProductBrainstorming() {
  const [timer, setTimer] = useState(5 * 60); // 5 minutes timer
  const [problem, setProblem] = useState("");
  const [uvp, setUvp] = useState("");
  const [features, setFeatures] = useState([]);


  const [currentFeature, setCurrentFeature] = useState("");
  const [currentChallenge, setCurrentChallenge] = useState("");
  const [currentSolution, setCurrentSolution] = useState("");

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleAddFeature = () => {
    setFeatures([...features, { feature: currentFeature, challenge: currentChallenge, solution: currentSolution }]);
    setCurrentFeature("");
    setCurrentChallenge("");
    setCurrentSolution("");
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Product Brainstorming</h1>
      
      <div className="mb-4">
        <p>Time Remaining: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Problem the Product Solves</h2>
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="Describe the problem"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold">Unique Value Proposition (UVP)</h2>
        <textarea
          value={uvp}
          onChange={(e) => setUvp(e.target.value)}
          placeholder="Describe the UVP"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Brainstorming Features, Challenges, and Solutions</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={currentFeature}
            onChange={(e) => setCurrentFeature(e.target.value)}
            placeholder="Feature Name"
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            value={currentChallenge}
            onChange={(e) => setCurrentChallenge(e.target.value)}
            placeholder="Challenge"
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            value={currentSolution}
            onChange={(e) => setCurrentSolution(e.target.value)}
            placeholder="Possible Solution"
            className="p-2 border rounded w-full"
          />
          <button
            onClick={handleAddFeature}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Add Idea to Table
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Captured Ideas</h2>
        <table className="min-w-full table-auto border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Feature</th>
              <th className="border p-2">Challenge</th>
              <th className="border p-2">Solution</th>
            </tr>
          </thead>
          <tbody>
            {features.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.feature}</td>
                <td className="border p-2">{item.challenge}</td>
                <td className="border p-2">{item.solution}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <button
          onClick={() => setTimer(0)}
          className="p-2 bg-red-500 text-white rounded"
        >
          End Session
        </button>
      </div>
    </div>
  );
}
