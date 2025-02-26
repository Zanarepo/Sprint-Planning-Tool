import { useState } from 'react';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const estimationMethods = {
  FIBONACCI: [1, 2, 3, 5, 8, 13, 21],
  TSHIRT: ['XS', 'S', 'M', 'L', 'XL'],
  HOURS: [1, 2, 4, 8, 16, 24, 40],
  STORY_POINTS: [1, 2, 3, 5, 8, 13],
  DOG_SIZE: ['Chihuahua', 'Poodle', 'Labrador', 'Husky', 'Great Dane']
};

export default function EstimationPlayground() {
  const [features, setFeatures] = useState([]);
  const [method, setMethod] = useState('FIBONACCI');
  const [newFeature, setNewFeature] = useState('');
  const [velocity, setVelocity] = useState(20);
  const [estimates, setEstimates] = useState({});

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setFeatures([...features, newFeature]);
    setNewFeature('');
  };

  const handleEstimate = (feature, value) => {
    setEstimates(prev => ({
      ...prev,
      [feature]: {
        ...prev[feature],
        [method]: value
      }
    }));
  };

  const currentScale = estimationMethods[method];
  const numericEstimates = features.map(feature => 
    parseFloat(estimates[feature]?.[method]) || 0
  );
  const totalEstimate = numericEstimates.reduce((a, b) => a + b, 0);

  const chartData = {
    labels: features,
    datasets: [{
      label: 'Estimated Effort',
      data: numericEstimates,
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  return (
    <div className="p-12 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-blue-800 text-center mt-16">Agile Estimation Playground</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Estimation Method Selection */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-blue-600">Estimation Method</h2>
          <select 
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="FIBONACCI">Fibonacci Sequence</option>
            <option value="TSHIRT">T-Shirt Sizing</option>
            <option value="HOURS">Hours/Days</option>
            <option value="STORY_POINTS">Story Points</option>
            <option value="DOG_SIZE">Dog Size Analogy</option>
          </select>
          
          <div className="p-4 bg-gray-50 rounded">
            <h3 className="font-medium mb-2 text-blue-600">Method Description</h3>
            {method === 'FIBONACCI' && (
              <p>Use Fibonacci sequence to represent relative complexity. Good for story points estimation.</p>
            )}
            {method === 'TSHIRT' && (
              <p>T-Shirt sizes for quick, relative sizing. Convert to numbers for planning (XS=1, S=2, etc.)</p>
            )}
            {method === 'HOURS' && (
              <p>Direct time estimation in hours/days. Useful for short-term task planning.</p>
            )}
            {method === 'STORY_POINTS' && (
              <p>Abstract points representing effort. Focus on relative sizing rather than time.</p>
            )}
            {method === 'DOG_SIZE' && (
              <p>Fun analogy for complexity estimation. Chihuahua=trivial, Great Dane=very complex.</p>
            )}
          </div>
        </div>

        {/* Feature Input */}
        <div className="space-y-4">
  <h2 className="text-lg font-semibold text-blue-600 mt-8">Add Features</h2>
  <div className="flex flex-col sm:flex-row gap-2">
    <input
      value={newFeature}
      onChange={(e) => setNewFeature(e.target.value)}
      placeholder="Enter feature name"
      className="flex-1 p-2 border rounded"
    />
    <button 
      onClick={addFeature}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Add Feature
    </button>
  </div>
</div>
      </div>

      {/* Estimation Area */}
      <div className="mb-8">
      
        <h2 className="text-lg font-semibold text-blue-600 mt-8">Estimate Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(feature => (
            <div key={feature} className="p-4 border rounded">
              <h3 className="font-medium mb-2">{feature}</h3>
              <div className="flex flex-wrap gap-2">
                {currentScale.map(value => (
                  <button
                    key={value}
                    onClick={() => handleEstimate(feature, value)}
                    className={`px-3 py-1 rounded ${
                      estimates[feature]?.[method] === value 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Results Visualization */}
      <div className="w-full">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="w-full border rounded">
      <h2 className="text-lg font-semibold text-blue-600 mt-8">Estimation Results</h2>
      <Bar data={chartData} />
    </div>
    {/* Add other grid columns here if needed */}
  </div>


        {/* Velocity Planning */}
        <div className="p-4 border rounded space-y-4">
          <h2 className="text-lg font-semibold text-blue-600">Sprint Planning</h2>
          <div>
            <label className="block mb-2 text-blue-600" >Team Velocity (points/sprint):</label>
            <input
              type="number"
              value={velocity}
              onChange={(e) => setVelocity(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="space-y-2">
            <p>Total Estimated Effort: {totalEstimate} points</p>
            <p>Estimated Sprints Needed: {Math.ceil(totalEstimate / velocity)}</p>
            <p>Features per Sprint: {(features.length / (totalEstimate / velocity)).toFixed(1)}</p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="mt-8 w-full">
  <h2 className="text-lg font-semibold mb-4 text-blue-600">
    Estimation Comparison
  </h2>
  <div className="overflow-x-auto">
    <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr className="bg-blue-200">
          <th className="p-2 text-left whitespace-nowrap">Feature</th>
          {Object.keys(estimationMethods).map((method) => (
            <th key={method} className="p-2 text-left whitespace-nowrap">
              {method.replace("_", " ")}
            </th>
          ))}
        </tr>
      </thead>
            <tbody>
              {features.map(feature => (
                <tr key={feature} className="border-t">
                  <td className="p-2">{feature}</td>
                  {Object.keys(estimationMethods).map(method => (
                    <td key={method} className="p-2">
                      {estimates[feature]?.[method] || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}