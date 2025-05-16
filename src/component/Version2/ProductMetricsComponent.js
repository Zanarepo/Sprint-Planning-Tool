




import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
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
import ProductMetricsFeatures from '../ProductMetricsFeatures'
import { FaArrowUp, FaArrowDown, FaArrowRight, FaEdit, FaTrash } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const ProductMetricsComponent = () => {
  // Each record represents data for one period.
  // Fields:
  // - date: period date
  // - newUsers: number of new users acquired this period (for growth rate)
  // - retainedUsers: number of users returning (for retention rate)
  // - churnedUsers: number of users lost (for churn rate)
  // - totalUsersAtStart: number of users active at the start of the period (base for retention/churn)
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    id: null,
    date: '',
    newUsers: '',
    retainedUsers: '',
    churnedUsers: '',
    totalUsersAtStart: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  // Update form values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Add or update a record
  const handleSubmit = (e) => {
    e.preventDefault();
    const { date, newUsers, retainedUsers, churnedUsers, totalUsersAtStart } = form;
    if (!date || newUsers === '' || retainedUsers === '' || churnedUsers === '' || totalUsersAtStart === '') {
      alert('Please fill in all fields.');
      return;
    }
    const data = {
      ...form,
      newUsers: Number(newUsers),
      retainedUsers: Number(retainedUsers),
      churnedUsers: Number(churnedUsers),
      totalUsersAtStart: Number(totalUsersAtStart),
    };

    if (isEditing) {
      setRecords(records.map((rec) => (rec.id === form.id ? data : rec)));
      setIsEditing(false);
    } else {
      data.id = Date.now();
      setRecords([...records, data]);
    }
    setForm({ id: null, date: '', newUsers: '', retainedUsers: '', churnedUsers: '', totalUsersAtStart: '' });
  };

  // Prepare record for editing
  const handleEdit = (id) => {
    const rec = records.find((r) => r.id === id);
    if (rec) {
      setForm(rec);
      setIsEditing(true);
    }
  };

  // Delete a record
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setRecords(records.filter((r) => r.id !== id));
    }
  };

  // Sort records by date ascending so we can compute growth rate (based on previous period)
  const sortedRecords = [...records].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Compute metrics for each record.
  // For Growth Rate, the first record will have no previous period so we set it as null.
  const computedRecords = sortedRecords.map((record, index) => {
    const growthRate =
      index === 0 || sortedRecords[index - 1].newUsers === 0
        ? null
        : ((record.newUsers - sortedRecords[index - 1].newUsers) / sortedRecords[index - 1].newUsers) * 100;
    const retentionRate =
      record.totalUsersAtStart > 0 ? (record.retainedUsers / record.totalUsersAtStart) * 100 : 0;
    const churnRate = record.totalUsersAtStart > 0 ? (record.churnedUsers / record.totalUsersAtStart) * 100 : 0;
    return { ...record, growthRate, retentionRate, churnRate };
  });

  // Prepare chart data arrays (using the sorted records by date)
  const chartLabels = sortedRecords.map((r) => r.date);
  const growthRatesData = sortedRecords.map((record, index) => {
    if (index === 0 || sortedRecords[index - 1].newUsers === 0) {
      return 0;
    }
    return Number((((record.newUsers - sortedRecords[index - 1].newUsers) / sortedRecords[index - 1].newUsers) * 100).toFixed(2));
  });
  const retentionRatesData = sortedRecords.map((r) =>
    r.totalUsersAtStart > 0 ? Number(((r.retainedUsers / r.totalUsersAtStart) * 100).toFixed(2)) : 0
  );
  const churnRatesData = sortedRecords.map((r) =>
    r.totalUsersAtStart > 0 ? Number(((r.churnedUsers / r.totalUsersAtStart) * 100).toFixed(2)) : 0
  );

  // Chart options (time‑scaled x‑axis)
  const chartOptions = (title, yLabel) => ({
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: title },
    },
    scales: {
      x: {
        type: 'time',
        time: { unit: 'day', tooltipFormat: 'PP' },
        title: { display: true, text: 'Date' },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: yLabel },
      },
    },
  });

  return (
    
  <div className="mt-16 px-4 w-full">
        <ProductMetricsFeatures/>
   
        <form
  onSubmit={handleSubmit}
  className="bg-white shadow-lg rounded px-4 sm:px-8 pt-6 pb-8 mb-12 w-full"
>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
      Date
    </label>
    <input
      type="date"
      id="date"
      name="date"
      value={form.date}
      onChange={handleChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
    />
  </div>

  <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newUsers">
        New Users
      </label>
      <input
        type="number"
        id="newUsers"
        name="newUsers"
        value={form.newUsers}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
        placeholder="e.g. 50"
      />
    </div>
  
        {/* Retained Users */}
<div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
  <div>
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor="retainedUsers"
    >
      Retained Users
    </label>
    <input
      type="number"
      id="retainedUsers"
      name="retainedUsers"
      value={form.retainedUsers}
      onChange={handleChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
      placeholder="e.g. 30"
    />
  </div>
</div>

{/* Churned Users */}
<div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
  <div>
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor="churnedUsers"
    >
      Churned Users
    </label>
    <input
      type="number"
      id="churnedUsers"
      name="churnedUsers"
      value={form.churnedUsers}
      onChange={handleChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
      placeholder="e.g. 5"
    />
  </div>
</div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="totalUsersAtStart">
              Total Users at Start
            </label>
            <input
              type="number"
              id="totalUsersAtStart"
              name="totalUsersAtStart"
              value={form.totalUsersAtStart}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              placeholder="e.g. 200"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          >
            {isEditing ? 'Update Record' : 'Add Record'}
          </button>
        </div>
      </form>
{/* Charts Section */}
<div className="container mx-auto px-2 sm:px-4 mb-12 ">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Growth Rate Chart */}
    <div className="bg-white shadow-lg rounded p-6">
      <h3 className="text-xl font-bold mb-4">User Growth Rate (%)</h3>
      <Line
        data={{
          labels: chartLabels,
          datasets: [
            {
              label: 'Growth Rate (%)',
              data: growthRatesData,
              fill: false,
              backgroundColor: 'rgba(59,130,246,0.4)',
              borderColor: 'rgba(59,130,246,1)',
              tension: 0.2,
            },
          ],
        }}
        options={chartOptions('User Growth Rate Over Time', 'Growth Rate (%)')}
      />
    </div>
    {/* Additional chart cards can be added here */}
  </div>



        {/* Retention Rate Chart */}
        <div className="bg-white shadow-lg rounded p-6">
          <h3 className="text-xl font-bold mb-4">User Retention Rate (%)</h3>
          <Line
            data={{
              labels: chartLabels,
              datasets: [
                {
                  label: 'Retention Rate (%)',
                  data: retentionRatesData,
                  fill: false,
                  backgroundColor: 'rgba(16,185,129,0.4)',
                  borderColor: 'rgba(16,185,129,1)',
                  tension: 0.2,
                },
              ],
            }}
            options={chartOptions('User Retention Rate Over Time', 'Retention Rate (%)')}
          />
        </div>
        {/* Churn Rate Chart */}
        <div className="bg-white shadow-lg rounded p-6">
          <h3 className="text-xl font-bold mb-4">User Churn Rate (%)</h3>
          <Line
            data={{
              labels: chartLabels,
              datasets: [
                {
                  label: 'Churn Rate (%)',
                  data: churnRatesData,
                  fill: false,
                  backgroundColor: 'rgba(220,38,38,0.4)',
                  borderColor: 'rgba(220,38,38,1)',
                  tension: 0.2,
                },
              ],
            }}
            options={chartOptions('User Churn Rate Over Time', 'Churn Rate (%)')}
          />
        </div>
      </div>

      {/* Data Table Section */}
      <div className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-12 max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold mb-4 text-center">Records</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border-b">Date</th>
                <th className="px-4 py-2 border-b">New Users</th>
                <th className="px-4 py-2 border-b">Growth Rate</th>
                <th className="px-4 py-2 border-b">Retained Users</th>
                <th className="px-4 py-2 border-b">Retention Rate</th>
                <th className="px-4 py-2 border-b">Churned Users</th>
                <th className="px-4 py-2 border-b">Churn Rate</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {computedRecords
                .slice()
                .reverse()
                .map((record) => (
                  <tr key={record.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border-b">{record.date}</td>
                    <td className="px-4 py-2 border-b">{record.newUsers}</td>
                    <td className="px-4 py-2 border-b">
                      {record.growthRate === null ? (
                        'N/A'
                      ) : (
                        <span
                          className={
                            record.growthRate > 0
                              ? 'text-green-500'
                              : record.growthRate < 0
                              ? 'text-red-500'
                              : 'text-gray-500'
                          }
                        >
                          {record.growthRate.toFixed(2)}%{' '}
                          {record.growthRate > 0 ? (
                            <FaArrowUp className="inline" />
                          ) : record.growthRate < 0 ? (
                            <FaArrowDown className="inline" />
                          ) : (
                            <FaArrowRight className="inline" />
                          )}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 border-b">{record.retainedUsers}</td>
                    <td className="px-4 py-2 border-b">
                      <span className="text-green-500">{record.retentionRate.toFixed(2)}%</span>
                    </td>
                    <td className="px-4 py-2 border-b">{record.churnedUsers}</td>
                    <td className="px-4 py-2 border-b">
                      <span className="text-red-500">{record.churnRate.toFixed(2)}%</span>
                    </td>
                    <td className="px-4 py-2 border-b">
                      <button
                        onClick={() => handleEdit(record.id)}
                        title="Edit"
                        className="text-blue-500 hover:text-blue-700 mr-4"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        title="Delete"
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              {computedRecords.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center px-4 py-2">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductMetricsComponent;
