




import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import ActiveUserFeatures from '../ActiveUserFeatures'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { FaArrowUp, FaArrowDown, FaArrowRight, FaEdit, FaTrash } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const ActiveUsersComponent = () => {
  // State to store metric entries
  const [metrics, setMetrics] = useState([]);
  // State for the form data
  const [form, setForm] = useState({
    id: null,
    type: 'DAU',
    date: '',
    count: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Create or update a metric entry
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.date || form.count === '') {
      alert('Please fill in all fields.');
      return;
    }
    if (isEditing) {
      // Update existing record
      setMetrics(metrics.map((m) => (m.id === form.id ? { ...form, count: Number(form.count) } : m)));
      setIsEditing(false);
    } else {
      // Create a new record with a unique id
      setMetrics([...metrics, { ...form, id: Date.now(), count: Number(form.count) }]);
    }
    // Reset form
    setForm({ id: null, type: 'DAU', date: '', count: '' });
  };

  // Populate form for editing an existing record
  const handleEdit = (id) => {
    const metric = metrics.find((m) => m.id === id);
    if (metric) {
      setForm(metric);
      setIsEditing(true);
    }
  };

  // Delete a record
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setMetrics(metrics.filter((m) => m.id !== id));
    }
  };

  // Helper to compute trend (growth, decline, stagnation) and percentage change
  const getTrendForType = (type) => {
    const typeMetrics = metrics
      .filter((m) => m.type === type)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    if (typeMetrics.length < 2)
      return { trend: 'stagnation', icon: <FaArrowRight className="inline" />, percentage: null };
    const latest = typeMetrics[typeMetrics.length - 1];
    const previous = typeMetrics[typeMetrics.length - 2];
    let percentage = null;
    if (previous.count !== 0) {
      percentage = (((latest.count - previous.count) / previous.count) * 100).toFixed(2);
    }
    if (latest.count > previous.count) {
      return { trend: 'growth', icon: <FaArrowUp className="inline" />, percentage };
    } else if (latest.count < previous.count) {
      return { trend: 'decline', icon: <FaArrowDown className="inline" />, percentage };
    } else {
      return { trend: 'stagnation', icon: <FaArrowRight className="inline" />, percentage };
    }
  };

  // Recommendation based on trend
  const getRecommendation = (trend) => {
    switch (trend) {
      case 'growth':
        return 'Great job! Consider scaling up your engagement strategies.';
      case 'decline':
        return 'Review user feedback and improve onboarding to re-engage users.';
      case 'stagnation':
      default:
        return 'Consider experimenting with new features or engagement initiatives.';
    }
  };

  // Group metrics by type for display in the table section
  const groupedMetrics = metrics.reduce((acc, metric) => {
    if (!acc[metric.type]) {
      acc[metric.type] = [];
    }
    acc[metric.type].push(metric);
    return acc;
  }, {});

  // Prepare chart data for a given type
  const getChartDataForType = (type) => {
    const sortedRecords = metrics
      .filter((m) => m.type === type)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    return {
      labels: sortedRecords.map((record) => record.date),
      datasets: [
        {
          label: type,
          data: sortedRecords.map((record) => record.count),
          fill: false,
          backgroundColor:
            type === 'DAU'
              ? 'rgba(59,130,246,0.4)'
              : type === 'WAU'
              ? 'rgba(139,92,246,0.4)'
              : 'rgba(234,179,8,0.4)',
          borderColor:
            type === 'DAU'
              ? 'rgba(59,130,246,1)'
              : type === 'WAU'
              ? 'rgba(139,92,246,1)'
              : 'rgba(234,179,8,1)',
          tension: 0.2,
        }
      ]
    };
  };

  // Return appropriate time unit for the x-axis based on the metric type
  const getTimeUnit = (type) => {
    switch (type) {
      case 'DAU':
        return 'day';
      case 'WAU':
        return 'week';
      case 'MAU':
        return 'month';
      default:
        return 'day';
    }
  };

  // Chart options
  const getChartOptions = (type) => {
    return {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: `${type} Trend Over Time` },
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: getTimeUnit(type),
            tooltipFormat: 'PP',
          },
          title: {
            display: true,
            text: 'Date',
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Count',
          },
        },
      },
    };
  };

  return (
    <div className="bg-white shadow-lg rounded px-4 sm:px-8 pt-6 pb-8 mb-12 w-full">
        <ActiveUserFeatures/>
      <h2 className="text-3xl font-bold text-center mb-8">
        Active Users Metrics (DAU, WAU, MAU)
      </h2>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded px-4 sm:px-8 pt-6 pb-8 mb-12 w-full"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          >
            <option value="DAU">Daily Active Users (DAU)</option>
            <option value="WAU">Weekly Active Users (WAU)</option>
            <option value="MAU">Monthly Active Users (MAU)</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Count</label>
          <input
            type="number"
            name="count"
            value={form.count}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          >
            {isEditing ? 'Update Metric' : 'Add Metric'}
          </button>
        </div>
      </form>

      {/* Charts Visualization Section */}
      <div className="mb-12">
        {['DAU', 'WAU', 'MAU'].map((type) => {
          const chartData = getChartDataForType(type);
          return chartData.labels.length > 0 ? (
            <div key={type} className="bg-white shadow-lg rounded p-6 mb-6 max-w-3xl mx-auto">
              <Line data={chartData} options={getChartOptions(type)} />
            </div>
          ) : null;
        })}
      </div>

      {/* Data Tables Section */}
      {['DAU', 'WAU', 'MAU'].map((type) => {
        const data = groupedMetrics[type] || [];
        const trendData = getTrendForType(type);
        return (
          <div
            key={type}
            className="bg-white shadow-lg rounded px-4 sm:px-8 pt-6 pb-8 mb-12 w-full"
          >
            <div className="flex items-center mb-4">
              <h3 className="text-2xl font-semibold">{type}</h3>
              <span className="ml-4 text-xl">{trendData.icon}</span>
              <span className="ml-2 text-gray-600 text-lg">({trendData.trend})</span>
              {trendData.percentage !== null && trendData.trend !== 'stagnation' && (
                <span
                  className={`ml-4 text-lg font-bold ${
                    trendData.trend === 'growth'
                      ? 'text-green-500'
                      : trendData.trend === 'decline'
                      ? 'text-red-500'
                      : 'text-gray-500'
                  }`}
                >
                  {Math.abs(trendData.percentage)}%
                </span>
              )}
            </div>
            <p className="italic text-gray-600 mb-6">{getRecommendation(trendData.trend)}</p>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 border-b text-left">Date</th>
                    <th className="px-4 py-2 border-b text-left">Count</th>
                    <th className="px-4 py-2 border-b text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((metric) => (
                      <tr key={metric.id} className="hover:bg-gray-100">
                        <td className="px-4 py-2 border-b">{metric.date}</td>
                        <td className="px-4 py-2 border-b">{metric.count}</td>
                        <td className="px-4 py-2 border-b">
                          <button
                            onClick={() => handleEdit(metric.id)}
                            title="Edit"
                            className="text-blue-500 hover:text-blue-700 mr-4"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(metric.id)}
                            title="Delete"
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  {data.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center px-4 py-2">
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActiveUsersComponent;
