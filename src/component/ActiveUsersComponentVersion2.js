












import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '../supabaseClient';
import { Line } from 'react-chartjs-2';
import ActiveUserFeatures from './ActiveUserFeatures'
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const ActiveUserMetrics = () => {
  const [, setUserEmail] = useState('');
  const [userId, setUserId] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [form, setForm] = useState({
    id: null,
    type: 'DAU', // Also used as the filter for displayed data
    metric_date: '',
    count: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // New filter state: filter by month or by a specific day.
  const [filterMonth, setFilterMonth] = useState('');
  const [filterDay, setFilterDay] = useState('');

  // Load user email from localStorage and fetch user id from Supabase.
  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
      console.debug('User email found in localStorage:', email);
      const fetchUserId = async () => {
        const { data, error } = await supabase
          .from('users')
          .select('id')
          .eq('email', email)
          .single();
        if (error) {
          console.error('Error fetching user id:', error);
        } else if (data) {
          setUserId(data.id);
        }
      };
      fetchUserId();
    } else {
      console.debug('No user email found in localStorage.');
    }
  }, []);

  // Memoized fetchMetrics to avoid dependency warnings.
  const fetchMetrics = useCallback(async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from('active_user_metrics')
      .select('*')
      .eq('user_id', userId)
      .order('metric_date', { ascending: true });
    if (error) {
      console.error('Error fetching metrics:', error);
    } else {
      setMetrics(data);
    }
  }, [userId]);

  // Fetch metrics when userId or fetchMetrics changes.
  useEffect(() => {
    if (userId) {
      fetchMetrics();
    }
  }, [userId, fetchMetrics]);

  // Handle form input changes.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Create or update a metric record.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { type, metric_date, count, id } = form;
    if (!metric_date || count === '') {
      alert('Please fill in all fields.');
      return;
    }
    if (isEditing) {
      const { error } = await supabase
        .from('active_user_metrics')
        .update({
          type,
          metric_date,
          count: Number(count),
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('user_id', userId);
      if (error) {
        console.error('Error updating metric:', error);
      } else {
        setIsEditing(false);
        setForm({ id: null, type: 'DAU', metric_date: '', count: '' });
        fetchMetrics();
      }
    } else {
      const { error } = await supabase
        .from('active_user_metrics')
        .insert([{ user_id: userId, type, metric_date, count: Number(count) }]);
      if (error) {
        console.error('Error creating metric:', error);
      } else {
        setForm({ id: null, type: 'DAU', metric_date: '', count: '' });
        fetchMetrics();
      }
    }
  };

  // Pre-fill the form for editing a metric.
  const handleEdit = (metric) => {
    setForm({
      id: metric.id,
      type: metric.type,
      metric_date: metric.metric_date,
      count: metric.count
    });
    setIsEditing(true);
  };

  // Delete an individual metric record.
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this metric?')) {
      const { error } = await supabase
        .from('active_user_metrics')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);
      if (error) {
        console.error('Error deleting metric:', error);
      } else {
        fetchMetrics();
      }
    }
  };

  // Delete all metrics for the current type.
  const handleDeleteAllForType = async (type) => {
    if (window.confirm(`Are you sure you want to delete all ${type} metrics?`)) {
      const { error } = await supabase
        .from('active_user_metrics')
        .delete()
        .eq('user_id', userId)
        .eq('type', type);
      if (error) {
        console.error(`Error deleting all ${type} metrics:`, error);
      } else {
        fetchMetrics();
      }
    }
  };

  // Filter metrics to only display those matching the selected type
  // and further filter by month or day if specified.
  const filteredMetrics = useMemo(() => {
    let result = metrics.filter(metric => metric.type === form.type);
    if (filterDay) {
      result = result.filter(metric => metric.metric_date === filterDay);
    } else if (filterMonth) {
      // input type "month" returns value in "YYYY-MM" format.
      result = result.filter(metric => metric.metric_date.startsWith(filterMonth));
    }
    return result;
  }, [metrics, form.type, filterDay, filterMonth]);

  // Compute percentage change and trend for each metric relative to its predecessor.
  const computedMetrics = useMemo(() => {
    const sortedAsc = [...filteredMetrics].sort(
      (a, b) => new Date(a.metric_date) - new Date(b.metric_date)
    );
    const withChanges = sortedAsc.map((metric, index) => {
      if (index === 0) {
        return { ...metric, percentageChange: null, trend: null };
      } else {
        const previous = sortedAsc[index - 1];
        let percentage = null;
        let trend = '';
        if (previous.count === 0) {
          percentage = null;
          trend = 'N/A';
        } else {
          percentage = ((metric.count - previous.count) / previous.count) * 100;
          trend = metric.count > previous.count ? 'growth' : metric.count < previous.count ? 'decline' : 'stagnation';
        }
        return { ...metric, percentageChange: percentage, trend };
      }
    });
    return withChanges.reverse(); // Most recent first.
  }, [filteredMetrics]);

  // Prepare chart data for the selected type using filtered metrics.
  const getChartData = () => {
    const sortedMetrics = [...filteredMetrics].sort(
      (a, b) => new Date(a.metric_date) - new Date(b.metric_date)
    );
    return {
      labels: sortedMetrics.map(m => m.metric_date),
      datasets: [
        {
          label: form.type,
          data: sortedMetrics.map(m => m.count),
          fill: false,
          backgroundColor:
            form.type === 'DAU'
              ? 'rgba(59,130,246,0.4)'
              : form.type === 'WAU'
              ? 'rgba(139,92,246,0.4)'
              : 'rgba(234,179,8,0.4)',
          borderColor:
            form.type === 'DAU'
              ? 'rgba(59,130,246,1)'
              : form.type === 'WAU'
              ? 'rgba(139,92,246,1)'
              : 'rgba(234,179,8,1)',
          tension: 0.2,
        },
      ],
    };
  };

  const getChartOptions = () => ({
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: `${form.type} Trend Over Time` },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: form.type === 'DAU' ? 'day' : form.type === 'WAU' ? 'week' : 'month',
          tooltipFormat: 'PP',
        },
        title: { display: true, text: 'Date' },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Count' },
      },
    },
  });

  // Compute overall trend from the two most recent records (if available).
  const getTrendData = () => {
    if (computedMetrics.length < 2) {
      return { trend: 'stagnation', icon: <FaArrowRight className="inline" />, percentage: null };
    }
    const latest = computedMetrics[0];
    const previous = computedMetrics[1];
    if (previous.count === 0) {
      return { trend: 'N/A', icon: <FaArrowRight className="inline" />, percentage: null };
    }
    const percentage = ((latest.count - previous.count) / previous.count) * 100;
    if (latest.count > previous.count) {
      return { trend: 'growth', icon: <FaArrowUp className="inline" />, percentage };
    } else if (latest.count < previous.count) {
      return { trend: 'decline', icon: <FaArrowDown className="inline" />, percentage };
    } else {
      return { trend: 'stagnation', icon: <FaArrowRight className="inline" />, percentage };
    }
  };

  const trendData = getTrendData();

  // Recommendation message based on overall trend.
  const getRecommendation = (trend) => {
    switch (trend) {
      case 'growth':
        return 'Great job! Keep up the momentum.';
      case 'decline':
        return 'Consider reviewing your strategy to improve metrics.';
      case 'stagnation':
      default:
        return 'Consider experimenting with new initiatives to drive change.';
    }
  };

  // Function to clear the filters.
  const clearFilters = () => {
    setFilterMonth('');
    setFilterDay('');
  };

  // Function to trigger printing.
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto p-4">
      <ActiveUserFeatures/>
      {/* <h2 className="text-3xl font-bold text-center mb-6">Active User Metrics</h2>*/}
      <div className="flex justify-end mb-4">
        <button
          onClick={handlePrint}
          className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
        >
          Print
        </button>
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded px-6 py-4 mb-6 max-w-full mx-auto"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="DAU">Daily Active Users (DAU)</option>
            <option value="WAU">Weekly Active Users (WAU)</option>
            <option value="MAU">Monthly Active Users (MAU)</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Date</label>
          <input
            type="date"
            name="metric_date"
            value={form.metric_date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Count</label>
          <input
            type="number"
            name="count"
            value={form.count}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder='Type the numbers of active users during this period?'
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          {isEditing ? 'Update Metric' : 'Add Metric'}
        </button>
      </form>

      {/* Filter Section */}
      <div className="bg-white shadow-lg rounded px-6 py-4 mb-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex flex-col sm:flex-row items-center w-full space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-bold mb-1">Filter by Month</label>
            <input
              type="month"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-bold mb-1">Filter by Day</label>
            <input
              type="date"
              value={filterDay}
              onChange={(e) => setFilterDay(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>
        <button
          onClick={clearFilters}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 sm:mt-0"
        >
          Clear Filters
        </button>
      </div>

      {/* Table Section (displayed above the graph) */}
      <div className="bg-white shadow-lg rounded px-6 py-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <div className="flex items-center">
            <h3 className="text-2xl font-semibold mr-2">{form.type}</h3>
            <span>{trendData.icon}</span>
            <span className="ml-2 text-gray-600">({trendData.trend})</span>
            {trendData.percentage !== null && trendData.trend !== 'stagnation' && (
              <span className={`ml-4 font-bold ${trendData.trend === 'growth' ? 'text-green-500' : 'text-red-500'}`}>
                {Math.abs(trendData.percentage).toFixed(2)}%
              </span>
            )}
          </div>
          <button
            onClick={() => handleDeleteAllForType(form.type)}
            className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded mt-2 sm:mt-0"
          >
            Delete All {form.type}
          </button>
        </div>

        <div className="overflow-x-auto mb-4">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Count</th>
                <th className="px-4 py-2 border">Change</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {computedMetrics.length > 0 ? (
                computedMetrics.map((metric) => (
                  <tr key={metric.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border text-center">{metric.metric_date}</td>
                    <td className="px-4 py-2 border text-center">{metric.count}</td>
                    <td className="px-4 py-2 border text-center">
                      {metric.percentageChange === null ? (
                        "N/A"
                      ) : (
                        <span
                          className={
                            metric.trend === 'growth'
                              ? 'text-green-500'
                              : metric.trend === 'decline'
                              ? 'text-red-500'
                              : 'text-gray-500'
                          }
                        >
                          {Math.abs(metric.percentageChange).toFixed(2)}%{' '}
                          {metric.trend === 'growth' ? (
                            <FaArrowUp className="inline" />
                          ) : metric.trend === 'decline' ? (
                            <FaArrowDown className="inline" />
                          ) : (
                            <FaArrowRight className="inline" />
                          )}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <button onClick={() => handleEdit(metric)} className="text-blue-500 hover:text-blue-700 mr-2">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(metric.id)} className="text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-2">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Recommendations Section (if there is output) */}
        {computedMetrics.length > 0 && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <h4 className="font-semibold text-lg">Recommendations</h4>
            <p className="text-gray-700">{getRecommendation(trendData.trend)}</p>
          </div>
        )}

        {/* Graph Section */}
        {getChartData().labels.length > 0 && (
          <div className="mb-4">
            <Line data={getChartData()} options={getChartOptions()} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveUserMetrics;















