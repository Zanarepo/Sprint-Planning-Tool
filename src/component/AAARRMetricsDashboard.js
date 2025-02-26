




import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import AARRRMetricsFeatures from './AARRRMetricsFeatures'
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
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Edit3, Trash } from "lucide-react";

// Register Chart.js components
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

const AAARRMetricsDashboard = () => {
  // State for storing records (each record represents a period)
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    date: "",
    acquisition: "",
    activation: "",
    retention: "",
    revenue: "",
    referral: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add or update a record
  const handleSubmit = (e) => {
    e.preventDefault();
    const { date, acquisition, activation, retention, revenue, referral } = formData;
    if (!date || acquisition === "" || activation === "" || retention === "" || revenue === "" || referral === "") {
      alert("Please fill in all fields");
      return;
    }
    const newRecord = {
      ...formData,
      id: isEditing ? formData.id : Date.now(),
      acquisition: Number(acquisition),
      activation: Number(activation),
      retention: Number(retention),
      revenue: Number(revenue),
      referral: Number(referral),
    };
    if (isEditing) {
      setRecords(records.map((rec) => (rec.id === newRecord.id ? newRecord : rec)));
      setIsEditing(false);
    } else {
      setRecords([...records, newRecord]);
    }
    setFormData({ id: null, date: "", acquisition: "", activation: "", retention: "", revenue: "", referral: "" });
  };

  // Edit a record
  const handleEdit = (id) => {
    const record = records.find((rec) => rec.id === id);
    if (record) {
      setFormData(record);
      setIsEditing(true);
    }
  };

  // Delete a record
  const handleDelete = (id) => {
    if (window.confirm("Delete this record?")) {
      setRecords(records.filter((rec) => rec.id !== id));
    }
  };

  // Sort records by date (ascending)
  const sortedRecords = [...records].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Compute conversion metrics for each record
  const recordsWithConversions = sortedRecords.map((record) => {
    const activationRate = record.acquisition > 0 ? (record.activation / record.acquisition) * 100 : 0;
    const retentionRate = record.activation > 0 ? (record.retention / record.activation) * 100 : 0;
    const referralRate = record.retention > 0 ? (record.referral / record.retention) * 100 : 0;
    const revenuePerRetainedUser = record.retention > 0 ? record.revenue / record.retention : 0;
    return { ...record, activationRate, retentionRate, referralRate, revenuePerRetainedUser };
  });

  // Prepare chart data: Display raw AAARR numbers over time
  const chartData = {
    labels: sortedRecords.map((record) => record.date),
    datasets: [
      {
        label: "Acquisition",
        data: sortedRecords.map((record) => record.acquisition),
        fill: false,
        backgroundColor: "rgba(59,130,246,0.5)",
        borderColor: "rgba(59,130,246,1)",
        tension: 0.2,
      },
      {
        label: "Activation",
        data: sortedRecords.map((record) => record.activation),
        fill: false,
        backgroundColor: "rgba(16,185,129,0.5)",
        borderColor: "rgba(16,185,129,1)",
        tension: 0.2,
      },
      {
        label: "Retention",
        data: sortedRecords.map((record) => record.retention),
        fill: false,
        backgroundColor: "rgba(234,179,8,0.5)",
        borderColor: "rgba(234,179,8,1)",
        tension: 0.2,
      },
      {
        label: "Revenue",
        data: sortedRecords.map((record) => record.revenue),
        fill: false,
        backgroundColor: "rgba(220,38,38,0.5)",
        borderColor: "rgba(220,38,38,1)",
        tension: 0.2,
      },
      {
        label: "Referral",
        data: sortedRecords.map((record) => record.referral),
        fill: false,
        backgroundColor: "rgba(139,92,246,0.5)",
        borderColor: "rgba(139,92,246,1)",
        tension: 0.2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "AAARR Metrics Over Time" },
    },
    scales: {
      x: {
        type: "time",
        time: { unit: "day", tooltipFormat: "PP" },
        title: { display: true, text: "Date" },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Count / Value" },
      },
    },
  };

  return (
    <div className="container mx-auto p-6 mt-10">
        <AARRRMetricsFeatures/>
     


      {/* Data Entry Form */}
      <form
  onSubmit={handleSubmit}
  className="bg-white shadow-lg rounded px-4 sm:px-8 pt-6 pb-8 mb-6 max-w-lg mx-auto"
>
  <div className="mb-4">
    <label className="block text-gray-700 font-bold mb-2">Date</label>
    <input
      type="date"
      name="date"
      value={formData.date}
      onChange={handleChange}
      className="w-full px-3 py-2 border rounded"
    />
  </div>
  <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <label className="block text-gray-700 font-bold mb-2">Acquisition</label>
      <input
        type="number"
        name="acquisition"
        value={formData.acquisition}
        onChange={handleChange}
        placeholder="e.g., 1000"
        className="w-full px-3 py-2 border rounded"
      />
    </div>
    <div>
      <label className="block text-gray-700 font-bold mb-2">Activation</label>
      <input
        type="number"
        name="activation"
        value={formData.activation}
        onChange={handleChange}
        placeholder="e.g., 600"
        className="w-full px-3 py-2 border rounded"
      />
    </div>
    <div>
      <label className="block text-gray-700 font-bold mb-2">Retention</label>
      <input
        type="number"
        name="retention"
        value={formData.retention}
        onChange={handleChange}
        placeholder="e.g., 400"
        className="w-full px-3 py-2 border rounded"
      />
    </div>
    <div>
      <label className="block text-gray-700 font-bold mb-2">Revenue</label>
      <input
        type="number"
        name="revenue"
        value={formData.revenue}
        onChange={handleChange}
        placeholder="e.g., 5000"
        className="w-full px-3 py-2 border rounded"
      />
    </div>
    <div className="col-span-1 sm:col-span-2">
      <label className="block text-gray-700 font-bold mb-2">Referral</label>
      <input
        type="number"
        name="referral"
        value={formData.referral}
        onChange={handleChange}
        placeholder="e.g., 150"
        className="w-full px-3 py-2 border rounded"
      />
    </div>
  </div>
  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
    <button
      type="submit"
      className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {isEditing ? "Update Record" : "Add Record"}
    </button>
    <button
      type="button"
      onClick={() => window.print()}
      className="w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      Print Data/Chart
    </button>
  </div>
</form>


      {/* Data Table */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Acquisition</th>
              <th className="px-4 py-2 border">Activation</th>
              <th className="px-4 py-2 border">Retention</th>
              <th className="px-4 py-2 border">Revenue</th>
              <th className="px-4 py-2 border">Referral</th>
              <th className="px-4 py-2 border">Activation %</th>
              <th className="px-4 py-2 border">Retention %</th>
              <th className="px-4 py-2 border">Referral %</th>
              <th className="px-4 py-2 border">Rev/Retained</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recordsWithConversions.length > 0 ? (
              recordsWithConversions
                .slice()
                .reverse()
                .map((record) => (
                  <tr key={record.id} className="text-center hover:bg-gray-100">
                    <td className="px-4 py-2 border">{record.date}</td>
                    <td className="px-4 py-2 border">{record.acquisition}</td>
                    <td className="px-4 py-2 border">{record.activation}</td>
                    <td className="px-4 py-2 border">{record.retention}</td>
                    <td className="px-4 py-2 border">${record.revenue.toFixed(2)}</td>
                    <td className="px-4 py-2 border">{record.referral}</td>
                    <td className="px-4 py-2 border">{record.activationRate.toFixed(2)}%</td>
                    <td className="px-4 py-2 border">{record.retentionRate.toFixed(2)}%</td>
                    <td className="px-4 py-2 border">{record.referralRate.toFixed(2)}%</td>
                    <td className="px-4 py-2 border">${record.revenuePerRetainedUser.toFixed(2)}</td>
                    <td className="px-4 py-2 border space-x-2">
                      <button onClick={() => handleEdit(record.id)} className="text-blue-500 hover:text-blue-700" title="Edit">
                        <Edit3 size={18} />
                      </button>
                      <button onClick={() => handleDelete(record.id)} className="text-red-500 hover:text-red-700" title="Delete">
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
                
            ) : (
              <tr>
                <td colSpan="11" className="text-center px-4 py-2">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Chart Section */}
      <div className="bg-white shadow-lg rounded p-6 mb-6 max-w-3xl mx-auto">
        <Line data={chartData} options={chartOptions} />
      </div>
      
      {/* Explanation Section */}
      <div className="bg-indigo-50 p-4 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold mb-2">Understanding AAARR Metrics</h3>
        <p className="text-gray-700 mb-2">
          <strong>Acquisition:</strong> Number of new users acquired during the period.
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Activation:</strong> Users who performed a key action (e.g., completing onboarding).
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Retention:</strong> Users who continue to use the product over time.
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Revenue:</strong> Total revenue generated in the period.
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Referral:</strong> Users who refer others to the product.
        </p>
        <p className="text-gray-700">
          <strong>Conversion Rates:</strong>
          <br />
          Activation Rate = (Activation / Acquisition) * 100
          <br />
          Retention Rate = (Retention / Activation) * 100
          <br />
          Referral Rate = (Referral / Retention) * 100
          <br />
          Revenue per Retained User = Revenue / Retention
        </p>
      </div>
    </div>
  );
};

export default AAARRMetricsDashboard;
