import React, { useState} from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  LabelList,
} from 'recharts';

// Helper function to classify each activity based on effort and impact
const classifyActivity = (effort, impact) => {
  const effortThreshold = 50;
  const impactThreshold = 50;
  
  if (effort <= effortThreshold && impact >= impactThreshold) return 'Quick Win';
  if (effort > effortThreshold && impact >= impactThreshold) return 'Major Project';
  if (effort <= effortThreshold && impact < impactThreshold) return 'Fill-In';
  if (effort > effortThreshold && impact < impactThreshold) return 'Time-Waster';
  return 'Unclassified';
};

// Generate a summary string for an activity based on its quadrant
const getSummary = (activity) => {
  switch (activity.quadrant) {
    case 'Quick Win':
      return `${activity.title}: Low Effort, High Impact = Prioritize`;
    case 'Major Project':
      return `${activity.title}: High Effort, High Impact = Plan Carefully`;
    case 'Fill-In':
      return `${activity.title}: Low Effort, Low Impact = Consider Filling Gaps`;
    case 'Time-Waster':
      return `${activity.title}: High Effort, Low Impact = Avoid`;
    default:
      return activity.title;
  }
};

// Custom label renderer for chart points

const ImpactEffortMatrix = () => {
  // Activity: { id, title, effort, impact, description, quadrant }
  const [activities, setActivities] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    effort: '',
    impact: '',
    description: '',
  });

  // CRUD: Create or Update
  const handleSubmit = (e) => {
    e.preventDefault();
    const newActivity = {
      id: editingId ? editingId : Date.now(),
      title: formData.title,
      effort: Number(formData.effort),
      impact: Number(formData.impact),
      description: formData.description,
      quadrant: classifyActivity(Number(formData.effort), Number(formData.impact)),
    };

    if (editingId) {
      setActivities((prev) =>
        prev.map((act) => (act.id === editingId ? newActivity : act))
      );
      setEditingId(null);
    } else {
      setActivities((prev) => [...prev, newActivity]);
    }

    setFormData({ title: '', effort: '', impact: '', description: '' });
  };

  // CRUD: Delete
  const handleDelete = (id) => {
    setActivities((prev) => prev.filter((act) => act.id !== id));
  };

  // Edit: Populate form with existing data
  const handleEdit = (activity) => {
    setEditingId(activity.id);
    setFormData({
      title: activity.title,
      effort: activity.effort,
      impact: activity.impact,
      description: activity.description,
    });
  };

  // Recommendation based on the distribution of activities
  const recommendation = () => {
    const counts = activities.reduce(
      (acc, act) => {
        acc[act.quadrant] = (acc[act.quadrant] || 0) + 1;
        return acc;
      },
      {}
    );
    if ((counts['Quick Win'] || 0) > (counts['Major Project'] || 0)) {
      return 'Focus on Quick Wins to gain momentum!';
    } else if ((counts['Major Project'] || 0) > 0) {
      return 'Consider investing in Major Projects for long-term gains.';
    } else {
      return 'Review your initiatives and consider reprioritizing.';
    }
  };

  const renderCustomizedLabel = ({ x, y, payload }) => {
    if (!payload) return null; // Guard against undefined payload
    const summary = getSummary(payload);
    return (
      <text x={x} y={y - 10} fill="#333" fontSize={12} textAnchor="middle">
        {summary}
      </text>
    );
  };
  
  // Chart colors based on quadrant
  const getColor = (quadrant) => {
    switch (quadrant) {
      case 'Quick Win':
        return '#48bb78'; // green
      case 'Major Project':
        return '#4299e1'; // blue
      case 'Fill-In':
        return '#ed8936'; // orange
      case 'Time-Waster':
        return '#f56565'; // red
      default:
        return '#a0aec0'; // gray
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Introductory Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">
          Impact Effort Matrix
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          List potential activities, assess their effort/cost and potential impact,
          and plot them on the matrix. Use the visual quadrant to prioritize: focus on Quick Wins
          and Major Projects, fill in with spare capacity, and avoid Time-Wasters.
        </p>
      </header>

      {/* CRUD Form */}
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded shadow-md max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">{editingId ? 'Edit Activity' : 'Add New Activity'}</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Title:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700">Effort (0-100):</label>
            <input
              type="number"
              value={formData.effort}
              onChange={(e) => setFormData({ ...formData, effort: e.target.value })}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700">Impact (0-100):</label>
            <input
              type="number"
              value={formData.impact}
              onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
              className="w-full border rounded p-2"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description:</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editingId ? 'Update Activity' : 'Add Activity'}
        </button>
      </form>

      {/* Activities List */}
      <div className="max-w-4xl mx-auto mb-8">
        <h2 className="text-2xl font-bold mb-4">Your Activities</h2>
        {activities.length === 0 ? (
          <p className="text-gray-600">No activities added yet.</p>
        ) : (
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Title</th>
                <th className="py-2 px-4 border">Effort</th>
                <th className="py-2 px-4 border">Impact</th>
                <th className="py-2 px-4 border">Quadrant</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((act) => (
                <tr key={act.id} className="text-center">
                  <td className="py-2 px-4 border">{act.title}</td>
                  <td className="py-2 px-4 border">{act.effort}</td>
                  <td className="py-2 px-4 border">{act.impact}</td>
                  <td className="py-2 px-4 border" style={{ color: getColor(act.quadrant) }}>
                    {act.quadrant}
                  </td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleEdit(act)}
                      className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(act.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Interactive Impact-Effort Matrix */}
      <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Impact-Effort Matrix</h2>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
            <CartesianGrid />
            <XAxis type="number" dataKey="effort" name="Effort" domain={[0, 100]}>
              <Label value="Effort" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis type="number" dataKey="impact" name="Impact" domain={[0, 100]}>
              <Label value="Impact" angle={-90} position="insideLeft" />
            </YAxis>
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }} 
              formatter={(value, name, props) => value}
              labelFormatter={(label) => `Effort: ${label}`}
            />
            <Scatter
              name="Activities"
              data={activities}
              fill="#8884d8"
              shape="circle"
            >
              <LabelList dataKey="title" content={renderCustomizedLabel} />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Recommendation Section */}
      <div className="max-w-3xl mx-auto bg-blue-100 p-6 rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-2">Recommendation</h2>
        <p className="text-lg text-gray-700">{recommendation()}</p>
      </div>
    </div>
  );
};

export default ImpactEffortMatrix;
