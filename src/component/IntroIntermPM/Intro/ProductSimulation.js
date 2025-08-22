import React, { useState } from "react";
import { FaLightbulb, FaUsers, FaCode, FaRocket } from "react-icons/fa";

const ProductSimulation = () => {
  const [stage, setStage] = useState("idea");
  const [idea, setIdea] = useState("AI-powered Resume Builder");
  const [painPoints, setPainPoints] = useState("");
  const [competitorGaps, setCompetitorGaps] = useState("");
  const [industryTrends, setIndustryTrends] = useState("");
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Product Development Simulation</h1>
        
        {/* Stage Navigation */}
        <div className="flex justify-between mb-6">
          <button className={`p-3 rounded ${stage === "idea" ? "bg-blue-500 text-white" : "bg-gray-300"}`} onClick={() => setStage("idea")}>
            <FaLightbulb /> Idea Generation
          </button>
          <button className={`p-3 rounded ${stage === "discovery" ? "bg-blue-500 text-white" : "bg-gray-300"}`} onClick={() => setStage("discovery")}>
            <FaUsers /> Discovery & Validation
          </button>
          <button className={`p-3 rounded ${stage === "mvp" ? "bg-blue-500 text-white" : "bg-gray-300"}`} onClick={() => setStage("mvp")}>
            <FaCode /> Build MVP
          </button>
          <button className={`p-3 rounded ${stage === "launch" ? "bg-blue-500 text-white" : "bg-gray-300"}`} onClick={() => setStage("launch")}>
            <FaRocket /> Launch & GTM
          </button>
        </div>

        {/* Idea Generation Stage */}
        {stage === "idea" && (
          <div>
            <h2 className="text-2xl font-semibold">Idea Generation & Market Research</h2>
            <p className="text-gray-600">Identify customer pain points, analyze competitor gaps, and spot industry trends.</p>
            <label className="block mt-4">Product Idea:</label>
            <input type="text" className="w-full border p-2 rounded" value={idea} onChange={(e) => setIdea(e.target.value)} />
            <label className="block mt-4">Customer Pain Points:</label>
            <textarea className="w-full border p-2 rounded" value={painPoints} onChange={(e) => setPainPoints(e.target.value)} />
            <label className="block mt-4">Competitor Gaps:</label>
            <textarea className="w-full border p-2 rounded" value={competitorGaps} onChange={(e) => setCompetitorGaps(e.target.value)} />
            <label className="block mt-4">Industry Trends:</label>
            <textarea className="w-full border p-2 rounded" value={industryTrends} onChange={(e) => setIndustryTrends(e.target.value)} />
          </div>
        )}

        {/* Product Discovery & Validation */}
        {stage === "discovery" && (
          <div>
            <h2 className="text-2xl font-semibold">Product Discovery & Validation</h2>
            <p className="text-gray-600">Validate your idea using surveys, user interviews, and prototype tests.</p>
            <ul className="list-disc ml-5 mt-4">
              <li>Conduct user surveys to validate the problem.</li>
              <li>Create low-fidelity prototypes for testing.</li>
              <li>Analyze feedback for refinements.</li>
            </ul>
          </div>
        )}

        {/* MVP Stage */}
        {stage === "mvp" && (
          <div>
            <h2 className="text-2xl font-semibold">Building an MVP</h2>
            <p className="text-gray-600">Develop a Minimum Viable Product with essential features.</p>
            <ul className="list-disc ml-5 mt-4">
              <li>Define core features (e.g., AI resume suggestions).</li>
              <li>Use no-code tools for quick development.</li>
              <li>Gather early adopter feedback.</li>
            </ul>
          </div>
        )}

        {/* Product Launch & GTM Strategy */}
        {stage === "launch" && (
          <div>
            <h2 className="text-2xl font-semibold">Product Launch & GTM Strategy</h2>
            <p className="text-gray-600">Implement your go-to-market strategy and acquire users.</p>
            <ul className="list-disc ml-5 mt-4">
              <li>Run digital marketing campaigns.</li>
              <li>Track conversion rates and optimize strategies.</li>
              <li>Monitor customer engagement for improvements.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSimulation;
