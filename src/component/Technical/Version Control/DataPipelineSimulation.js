import React, { useState, useRef } from 'react';
import { FaDatabase, FaArrowRight, FaCogs } from 'react-icons/fa';


const DataPipelineSimulation = () => {
  // State variables to represent the number of data items at each stage.
  const [dataSources, setDataSources] = useState(20);
  const [ingestion, setIngestion] = useState(0);
  const [processing, setProcessing] = useState(0);
  const [storage, setStorage] = useState(0);
  
  // State for simulation controls
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000); // milliseconds per tick
  
  const intervalRef = useRef(null);
  const contentRef = useRef();

  // Function to start simulation using setInterval.
  const startSimulation = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        // Move items from Data Sources to Ingestion
        setDataSources((prev) => {
          if (prev > 0) {
            const moving = Math.min(3, prev);
            setIngestion((ing) => ing + moving);
            return prev - moving;
          }
          return prev;
        });
        // Move items from Ingestion to Processing
        setIngestion((prev) => {
          if (prev > 0) {
            const moving = Math.min(2, prev);
            setProcessing((proc) => proc + moving);
            return prev - moving;
          }
          return prev;
        });
        // Move items from Processing to Storage
        setProcessing((prev) => {
          if (prev > 0) {
            const moving = Math.min(2, prev);
            setStorage((stor) => stor + moving);
            return prev - moving;
          }
          return prev;
        });
      }, speed);
    }
  };

  // Stop simulation
  const stopSimulation = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  // Reset simulation state
  const resetSimulation = () => {
    stopSimulation();
    setDataSources(20);
    setIngestion(0);
    setProcessing(0);
    setStorage(0);
  };

  // Download the simulation view as a PDF.
 

  return (
    <div ref={contentRef} className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <header className="bg-blue-600 text-white py-6 text-center">
        <h1 className="text-3xl font-bold">Data Pipeline Simulation</h1>
        <p className="mt-2">Observe how data flows from sources through ingestion, processing, and into storage.</p>
      </header>

      <main className="p-6">
        {/* Simulation Flow */}
        <section className="mb-8">
          {/* Data Sources */}
          <div className="bg-white p-4 rounded shadow text-center mb-4">
            <h2 className="font-semibold mb-2">Data Sources</h2>
            <p className="text-xl">{dataSources}</p>
            <FaDatabase className="text-4xl text-blue-500 mx-auto mt-2" />
          </div>
          
          {/* Ingestion Layer */}
          <div className="bg-white p-4 rounded shadow text-center mb-4">
            <h2 className="font-semibold mb-2">Ingestion</h2>
            <p className="text-xl">{ingestion}</p>
            <FaArrowRight className="text-4xl text-green-500 mx-auto mt-2" />
          </div>
          
          {/* Processing Layer */}
          <div className="bg-white p-4 rounded shadow text-center mb-4">
            <h2 className="font-semibold mb-2">Processing</h2>
            <p className="text-xl">{processing}</p>
            <FaCogs className="text-4xl text-orange-500 mx-auto mt-2" />
          </div>
          
          {/* Storage Layer */}
          <div className="bg-white p-4 rounded shadow text-center mb-4">
            <h2 className="font-semibold mb-2">Storage</h2>
            <p className="text-xl">{storage}</p>
            <FaDatabase className="text-4xl text-purple-500 mx-auto mt-2" />
          </div>
        </section>

        {/* Simulation Controls */}
        <section className="flex flex-col items-center space-y-4 mb-8">
          <div className="flex space-x-4">
            <button
              onClick={startSimulation}
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Start Simulation
            </button>
            <button
              onClick={stopSimulation}
              className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Stop Simulation
            </button>
            <button
              onClick={resetSimulation}
              className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Reset
            </button>
          </div>
          <div className="w-full max-w-md">
            <label htmlFor="speedSlider" className="block text-center mb-2 font-semibold">
              Simulation Speed (ms per tick): {speed}
            </label>
            <input
              id="speedSlider"
              type="range"
              min="500"
              max="3000"
              step="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </section>

        {/* Strategic Recommendations (Integrated into Simulation) */}
        <section className="bg-white p-4 rounded shadow mb-8">
          <h2 className="text-2xl font-bold mb-4">Strategic Insights</h2>
          <div className="mb-4">
            <h3 className="font-semibold">Aligning Technical and Business Goals</h3>
            <ul className="list-disc pl-6 text-sm">
              <li>Fast response times improve user experience.</li>
              <li>Deploying servers closer to users enhances performance.</li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Risk Mitigation and Trade-offs</h3>
            <ul className="list-disc pl-6 text-sm">
              <li>Monitor for server overload and crashes.</li>
              <li>Advocate for redundancy to ensure reliability.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Prioritizing Features Based on Backend Capabilities</h3>
            <ul className="list-disc pl-6 text-sm">
              <li>Assess feature feasibility based on backend readiness.</li>
              <li>Align development priorities with infrastructure needs.</li>
            </ul>
          </div>
        </section>

      </main>

      <footer className="text-center text-sm text-gray-600 mt-10">
        <p>
          This simulation demonstrates how data flows through a pipeline, and it integrates strategic insights to help you understand how backend architecture aligns with business goals.
        </p>
      </footer>
    </div>
  );
};

export default DataPipelineSimulation;
