import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Bar } from 'react-chartjs-2';
import FeatureEstimator from './FeatureEstimator';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const estimationMethods = {
  FIBONACCI: [1, 2, 3, 5, 8, 13, 21],
  TSHIRT: ['XS', 'S', 'M', 'L', 'XL'],
  HOURS: [1, 2, 4, 8, 16, 24, 40],
  STORY_POINTS: [1, 2, 3, 5, 8, 13],
  DOG_SIZE: ['Chihuahua', 'Poodle', 'Labrador', 'Husky', 'Great Dane'],
};

export default function EstimationPlayground() {
  const [features, setFeatures] = useState([]);
  const [method, setMethod] = useState('FIBONACCI');
  const [newFeature, setNewFeature] = useState('');
  const [velocity, setVelocity] = useState(20);
  const [estimates, setEstimates] = useState({});
  const [userId, setUserId] = useState(null);
  const [savedEstimations, setSavedEstimations] = useState([]);
  const [editingBatchId, setEditingBatchId] = useState(null);
  const [editingBatchData, setEditingBatchData] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      const fetchUserData = async () => {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id')
          .eq('email', email)
          .single();
        if (userError || !userData) {
          console.error('Error fetching user id:', userError);
          return;
        }
        setUserId(userData.id);
        const { data: activitiesData, error: activitiesError } = await supabase
          .from('estimations')
          .select('*')
          .eq('user_id', userData.id)
          .order('created_at', { ascending: false });
        if (activitiesError) {
          console.error('Error fetching activities:', activitiesError);
        } else {
          setActivities(activitiesData);
        }
        fetchSavedEstimations(userData.id);
      };
      fetchUserData();
    } else {
      console.debug('No user email found in localStorage.');
    }
  }, []);

  const fetchSavedEstimations = async (uid) => {
    const { data, error } = await supabase
      .from('estimations')
      .select('*')
      .eq('user_id', uid)
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching saved estimations:', error);
    } else {
      setSavedEstimations(data);
    }
  };

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setFeatures([...features, newFeature]);
    setNewFeature('');
  };

  const handleEstimate = (feature, value) => {
    setEstimates((prev) => ({
      ...prev,
      [feature]: {
        ...prev[feature],
        [method]: value,
      },
    }));
  };

  const saveEstimation = async () => {
    if (!userId) {
      console.error('User ID not found. Cannot save estimation.');
      return;
    }
    const batchId = crypto.randomUUID();
    const friendlyName = `Estimate ${savedEstimations.length + 1}`;
    const { data, error } = await supabase
      .from('estimations')
      .insert([
        {
          user_id: userId,
          batch_id: batchId,
          batch_name: friendlyName,
          features,
          estimates,
          method,
          velocity,
          total_estimate: totalEstimate,
        },
      ]);
    if (error) {
      console.error('Error saving estimation:', error);
    } else {
      console.log('Estimation saved successfully:', data);
      setFeatures([]);
      setEstimates({});
      fetchSavedEstimations(userId);
    }
  };

  const updateEstimationFull = async (recordId) => {
    if (!editingBatchData) return;
    const newFeatures = editingBatchData.featuresText.split('\n').map((f) => f.trim()).filter(Boolean);
    let newEstimates;
    try {
      newEstimates = JSON.parse(editingBatchData.estimatesText);
    } catch (err) {
      console.error('Error parsing estimates JSON:', err);
      return;
    }
    const newNumericEstimates = newFeatures.map((feature) =>
      parseFloat(newEstimates[feature]?.[editingBatchData.method]) || 0
    );
    const newTotalEstimate = newNumericEstimates.reduce((a, b) => a + b, 0);
    const { data, error } = await supabase
      .from('estimations')
      .update({
        batch_name: editingBatchData.batch_name,
        method: editingBatchData.method,
        features: newFeatures,
        estimates: newEstimates,
        total_estimate: newTotalEstimate,
      })
      .eq('id', recordId);
    if (error) {
      console.error('Error updating estimation:', error);
    } else {
      console.log('Estimation updated successfully:', data);
      setEditingBatchId(null);
      setEditingBatchData(null);
      fetchSavedEstimations(userId);
    }
  };

  const deleteEstimationBatch = async (batchId) => {
    const { error } = await supabase
      .from('estimations')
      .delete()
      .eq('batch_id', batchId);
    if (error) {
      console.error('Error deleting estimation batch:', error);
    } else {
      console.log('Estimation batch deleted successfully');
      fetchSavedEstimations(userId);
    }
  };

  const currentScale = estimationMethods[method];
  const numericEstimates = features.map((feature) => parseFloat(estimates[feature]?.[method]) || 0);
  const totalEstimate = numericEstimates.reduce((a, b) => a + b, 0);

  const chartData = {
    labels: features,
    datasets: [
      {
        label: 'Estimated Effort',
        data: numericEstimates,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const groupedEstimations = savedEstimations.reduce((groups, est) => {
    const groupKey = est.batch_id;
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(est);
    return groups;
  }, {});

  return (
    <div className="p-12 bg-white rounded-lg shadow-md">
      <FeatureEstimator />

      <div className="space-y-8 mb-8">
        {/* Estimation Method Selection */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-green-600">Estimation Method</h2>
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
            <h3 className="font-medium mb-2 text-green-600">Method Description</h3>
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
          <h2 className="text-lg font-semibold text-green-600">Add Features</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Enter feature name"
              className="flex-1 p-2 border rounded w-full"
            />
            <button
              onClick={addFeature}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full sm:w-auto"
            >
              Add Feature
            </button>
          </div>
        </div>
      </div>

      {/* Estimation Area */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-green-600">Estimate Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div key={feature} className="p-4 border rounded">
              <h3 className="font-medium mb-2">{feature}</h3>
              <div className="flex flex-wrap gap-2">
                {currentScale.map((value) => (
                  <button
                    key={value}
                    onClick={() => handleEstimate(feature, value)}
                    className={`px-3 py-1 rounded ${
                      estimates[feature]?.[method] === value
                        ? 'bg-green-600 text-white'
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

      {/* Results Visualization & Velocity Planning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 border rounded shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-green-600">Estimation Results</h2>
          <Bar data={chartData} />
        </div>
        <div className="p-4 border rounded space-y-4 shadow-sm">
          <h2 className="text-lg font-semibold text-green-600">Sprint Planning</h2>
          <div>
            <label className="block mb-2 text-green-600">Team Velocity (points/sprint):</label>
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

      {/* Save Estimation Button with Print */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={saveEstimation}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Estimation
        </button>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
        >
          Print Current Table
        </button>
      </div>

      {/* Comparison Table */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-green-600">Estimation Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="p-6 bg-green-200">
                <th className="p-2 text-left">Feature</th>
                {Object.keys(estimationMethods).map((method) => (
                  <th key={method} className="p-2 text-left">
                    {method.replace('_', ' ')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature} className="border-t">
                  <td className="p-2">{feature}</td>
                  {Object.keys(estimationMethods).map((method) => (
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

      {/* Saved Estimations */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-green-600">Saved Estimation Tables</h2>
        {Object.keys(groupedEstimations).length === 0 ? (
          <p>No estimation tables saved yet.</p>
        ) : (
          Object.entries(groupedEstimations).map(([batchId, estimationsGroup]) => {
            const record = estimationsGroup[0];
            return (
              <div key={batchId} className="mb-8 border p-4 rounded shadow">
                {editingBatchId === record.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="font-medium">Batch Name:</label>
                      <input
                        type="text"
                        value={editingBatchData.batch_name}
                        onChange={(e) =>
                          setEditingBatchData((prev) => ({ ...prev, batch_name: e.target.value }))
                        }
                        className="p-1 border rounded w-full"
                      />
                    </div>
                    <div>
                      <label className="font-medium">Estimation Method:</label>
                      <select
                        value={editingBatchData.method}
                        onChange={(e) =>
                          setEditingBatchData((prev) => ({ ...prev, method: e.target.value }))
                        }
                        className="p-1 border rounded w-full"
                      >
                        {Object.keys(estimationMethods).map((m) => (
                          <option key={m} value={m}>
                            {m.replace('_', ' ')}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="font-medium">Features (one per line):</label>
                      <textarea
                        value={editingBatchData.featuresText}
                        onChange={(e) =>
                          setEditingBatchData((prev) => ({ ...prev, featuresText: e.target.value }))
                        }
                        className="p-1 border rounded w-full"
                        rows={4}
                      />
                    </div>
                    <div>
                      <label className="font-medium">Estimates (JSON format):</label>
                      <textarea
                        value={editingBatchData.estimatesText}
                        onChange={(e) =>
                          setEditingBatchData((prev) => ({ ...prev, estimatesText: e.target.value }))
                        }
                        className="p-1 border rounded w-full"
                        rows={4}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateEstimationFull(record.id)}
                        className="px-2 py-1 bg-green-500 text-white rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingBatchId(null);
                          setEditingBatchData(null);
                        }}
                        className="px-2 py-1 bg-gray-500 text-white rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">{record.batch_name}</h3>
                      <button
                        onClick={() =>
                          setEditingBatchData({
                            batch_name: record.batch_name,
                            method: record.method,
                            featuresText: record.features.join('\n'),
                            estimatesText: JSON.stringify(record.estimates, null, 2),
                          }) || setEditingBatchId(record.id)
                        }
                        className="px-2 py-1 bg-yellow-500 text-white rounded"
                      >
                        Edit Table
                      </button>
                    </div>
                    <p><strong>Method:</strong> {record.method}</p>
                    <p><strong>Velocity:</strong> {record.velocity}</p>
                    <p><strong>Total Estimate:</strong> {record.total_estimate} points</p>
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Features & Estimates:</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="p-6 bg-green-200">
                              <th className="p-2 text-left">Feature</th>
                              {Object.keys(estimationMethods).map((m) => (
                                <th key={m} className="p-2 text-left">
                                  {m.replace('_', ' ')}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {record.features.map((feature, idx) => (
                              <tr key={idx} className="border-t">
                                <td className="p-2">{feature}</td>
                                {Object.keys(estimationMethods).map((m) => (
                                  <td key={m} className="p-2">
                                    {record.estimates[feature]?.[m] || '-'}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => window.print()}
                        className="px-2 py-1 bg-gray-800 text-white rounded hover:bg-gray-900"
                      >
                        Print Table
                      </button>
                      <button
                        onClick={() => deleteEstimationBatch(batchId)}
                        className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete Table
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Activities Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4 text-green-600">Your Recent Activities</h2>
        {activities.length === 0 ? (
          <p>No activities found.</p>
        ) : (
          <ul className="list-disc ml-6">
            {activities.map((activity) => (
              <li key={activity.id}>
                <span className="font-medium">{activity.activity_text}</span> -{' '}
                {new Date(activity.created_at).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}