import React, { useState } from 'react';

// Utility function to get competitiveness score based on selections
const calculateCompetitiveness = (forces) => {
  let score = 0;
  forces.forEach(force => {
    score += force === 'High' ? 3 : force === 'Medium' ? 2 : 1;
  });
  return score;
};

const InteractivePortersExercise = () => {
  // State for Porter's 5 Forces and their selected impact levels
  const [forces, setForces] = useState({
    threatOfNewEntrants: 'Medium',
    bargainingPowerOfSuppliers: 'Medium',
    bargainingPowerOfBuyers: 'Medium',
    threatOfSubstitutes: 'Medium',
    industryRivalry: 'Medium',
  });

  // Handler to update impact level of each force
  const handleImpactChange = (force, value) => {
    setForces(prevState => {
      const newForces = {
        ...prevState,
        [force]: value,
      };
      return newForces;
    });
  };

  // Recalculate competitiveness score based on updated selections
  const competitivenessScore = calculateCompetitiveness(Object.values(forces));

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Porter's 5 Forces: Interactive Exercise</h1>
      <p className="mb-4 text-lg">In this exercise, you will analyze each of Porter's Five Forces and rank their impact on the competitiveness of a specific market. Use the dropdowns to select your evaluation for each force.</p>

      <div className="space-y-6">
        {/* Threat of New Entrants */}
        <div>
          <h2 className="font-semibold text-lg">1. Threat of New Entrants</h2>
          <p>How easy is it for new competitors to enter the market?</p>
          <select
            className="p-2 border rounded-md mt-2"
            value={forces.threatOfNewEntrants}
            onChange={(e) => handleImpactChange('threatOfNewEntrants', e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Bargaining Power of Suppliers */}
        <div>
          <h2 className="font-semibold text-lg">2. Bargaining Power of Suppliers</h2>
          <p>How much control do suppliers have over the prices of materials or services?</p>
          <select
            className="p-2 border rounded-md mt-2"
            value={forces.bargainingPowerOfSuppliers}
            onChange={(e) => handleImpactChange('bargainingPowerOfSuppliers', e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Bargaining Power of Buyers */}
        <div>
          <h2 className="font-semibold text-lg">3. Bargaining Power of Buyers</h2>
          <p>How easily can customers switch to competitors or negotiate for better prices?</p>
          <select
            className="p-2 border rounded-md mt-2"
            value={forces.bargainingPowerOfBuyers}
            onChange={(e) => handleImpactChange('bargainingPowerOfBuyers', e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Threat of Substitutes */}
        <div>
          <h2 className="font-semibold text-lg">4. Threat of Substitute Products or Services</h2>
          <p>How likely is it that customers will turn to a substitute solution for the same need?</p>
          <select
            className="p-2 border rounded-md mt-2"
            value={forces.threatOfSubstitutes}
            onChange={(e) => handleImpactChange('threatOfSubstitutes', e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Industry Rivalry */}
        <div>
          <h2 className="font-semibold text-lg">5. Industry Rivalry</h2>
          <p>How intense is the competition between existing competitors in the market?</p>
          <select
            className="p-2 border rounded-md mt-2"
            value={forces.industryRivalry}
            onChange={(e) => handleImpactChange('industryRivalry', e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Submit and Show Results */}
        <div className="mt-6">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-full"
            onClick={() => alert(`Your market competitiveness score is: ${competitivenessScore}`)}
          >
            Submit and See Competitiveness Score
          </button>
        </div>

        <div className="mt-6">
          <p className="font-semibold">Market Competitiveness Score: {competitivenessScore}</p>
          <p className="text-sm">The score is calculated based on the impact levels you selected. Higher scores indicate more competitive markets.</p>
        </div>
      </div>
    </div>
  );
};

export default InteractivePortersExercise;
