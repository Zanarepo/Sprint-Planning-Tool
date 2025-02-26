
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import CohortStickinessFeature from './CohortStickinessFeature'
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

const CohortStickinessDashboard = () => {
  // Tab state: "cohort" or "stickiness"
  const [activeTab, setActiveTab] = useState("cohort");

  /* ============================= Cohort Analysis ============================= */
  const [cohorts, setCohorts] = useState([]);
  const [cohortForm, setCohortForm] = useState({
    id: null,
    cohortDate: "",
    totalUsers: "",
    retainedUsers: "",
  });
  const [isEditingCohort, setIsEditingCohort] = useState(false);

  const handleCohortChange = (e) => {
    const { name, value } = e.target;
    setCohortForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCohortSubmit = (e) => {
    e.preventDefault();
    const { cohortDate, totalUsers, retainedUsers } = cohortForm;
    if (!cohortDate || !totalUsers || !retainedUsers) {
      alert("Please fill in all fields for Cohort Analysis.");
      return;
    }
    const data = {
      ...cohortForm,
      id: isEditingCohort ? cohortForm.id : Date.now(),
      totalUsers: Number(totalUsers),
      retainedUsers: Number(retainedUsers),
    };
    if (isEditingCohort) {
      setCohorts(cohorts.map((c) => (c.id === data.id ? data : c)));
      setIsEditingCohort(false);
    } else {
      setCohorts([...cohorts, data]);
    }
    setCohortForm({ id: null, cohortDate: "", totalUsers: "", retainedUsers: "" });
  };

  const handleEditCohort = (id) => {
    const c = cohorts.find((c) => c.id === id);
    if (c) {
      setCohortForm(c);
      setIsEditingCohort(true);
    }
  };

  const handleDeleteCohort = (id) => {
    if (window.confirm("Delete this cohort record?")) {
      setCohorts(cohorts.filter((c) => c.id !== id));
    }
  };

  const sortedCohorts = [...cohorts].sort((a, b) => new Date(a.cohortDate) - new Date(b.cohortDate));
  const cohortDataWithMetrics = sortedCohorts.map((c, index) => {
    const retentionRate = c.totalUsers > 0 ? (c.retainedUsers / c.totalUsers) * 100 : 0;
    let percentageChange = null;
    if (index > 0) {
      const prevRetention =
        sortedCohorts[index - 1].totalUsers > 0
          ? (sortedCohorts[index - 1].retainedUsers / sortedCohorts[index - 1].totalUsers) * 100
          : 0;
      if (prevRetention !== 0) {
        percentageChange = ((retentionRate - prevRetention) / prevRetention) * 100;
      }
    }
    let outcome = "Stable";
    let recommendation = "Monitor trends closely.";
    if (percentageChange !== null) {
      if (percentageChange > 0) {
        outcome = "Positive";
        recommendation = "Retention is improving. Reinforce successful strategies.";
      } else if (percentageChange < 0) {
        outcome = "Negative";
        recommendation = "Retention is declining. Investigate and adjust engagement tactics.";
      }
    }
    return { ...c, retentionRate, percentageChange, outcome, recommendation };
  });

  const cohortChartData = {
    labels: sortedCohorts.map((c) => c.cohortDate),
    datasets: [
      {
        label: "Retention Rate (%)",
        data: sortedCohorts.map((c) => (c.totalUsers > 0 ? (c.retainedUsers / c.totalUsers) * 100 : 0)),
        fill: false,
        backgroundColor: "rgba(59,130,246,0.5)",
        borderColor: "rgba(59,130,246,1)",
        tension: 0.2,
      },
    ],
  };

  /* ============================ Stickiness Analysis =========================== */
  const [stickinessRecords, setStickinessRecords] = useState([]);
  const [stickinessForm, setStickinessForm] = useState({
    id: null,
    date: "",
    DAU: "",
    MAU: "",
  });
  const [isEditingStickiness, setIsEditingStickiness] = useState(false);

  const handleStickinessChange = (e) => {
    const { name, value } = e.target;
    setStickinessForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStickinessSubmit = (e) => {
    e.preventDefault();
    const { date, DAU, MAU } = stickinessForm;
    if (!date || !DAU || !MAU) {
      alert("Please fill in all fields for Stickiness Analysis.");
      return;
    }
    const data = {
      ...stickinessForm,
      id: isEditingStickiness ? stickinessForm.id : Date.now(),
      DAU: Number(DAU),
      MAU: Number(MAU),
    };
    if (isEditingStickiness) {
      setStickinessRecords(stickinessRecords.map((r) => (r.id === data.id ? data : r)));
      setIsEditingStickiness(false);
    } else {
      setStickinessRecords([...stickinessRecords, data]);
    }
    setStickinessForm({ id: null, date: "", DAU: "", MAU: "" });
  };

  const handleEditStickiness = (id) => {
    const rec = stickinessRecords.find((r) => r.id === id);
    if (rec) {
      setStickinessForm(rec);
      setIsEditingStickiness(true);
    }
  };

  const handleDeleteStickiness = (id) => {
    if (window.confirm("Delete this stickiness record?")) {
      setStickinessRecords(stickinessRecords.filter((r) => r.id !== id));
    }
  };

  const sortedStickiness = [...stickinessRecords].sort((a, b) => new Date(a.date) - new Date(b.date));
  const stickinessDataWithMetrics = sortedStickiness.map((r, index) => {
    const stickiness = r.MAU > 0 ? (r.DAU / r.MAU) * 100 : 0;
    let percentageChange = null;
    if (index > 0) {
      const prevStickiness =
        sortedStickiness[index - 1].MAU > 0 ? (sortedStickiness[index - 1].DAU / sortedStickiness[index - 1].MAU) * 100 : 0;
      if (prevStickiness !== 0) {
        percentageChange = ((stickiness - prevStickiness) / prevStickiness) * 100;
      }
    }
    let outcome = "Stable";
    let recommendation = "Maintain current engagement levels.";
    if (percentageChange !== null) {
      if (percentageChange > 0) {
        outcome = "Positive";
        recommendation = "Stickiness is growing. Keep up engagement strategies.";
      } else if (percentageChange < 0) {
        outcome = "Negative";
        recommendation = "Stickiness is declining. Revisit user engagement tactics.";
      }
    }
    return { ...r, stickiness, percentageChange, outcome, recommendation };
  });

  const stickinessChartData = {
    labels: sortedStickiness.map((r) => r.date),
    datasets: [
      {
        label: "Stickiness Ratio (%)",
        data: sortedStickiness.map((r) => (r.MAU > 0 ? (r.DAU / r.MAU) * 100 : 0)),
        fill: false,
        backgroundColor: "rgba(16,185,129,0.5)",
        borderColor: "rgba(16,185,129,1)",
        tension: 0.2,
      },
    ],
  };

  const chartOptions = (title, yLabel) => ({
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: title },
    },
    scales: {
      x: {
        type: "time",
        time: { unit: "day", tooltipFormat: "PP" },
        title: { display: true, text: "Date" },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: yLabel },
      },
    },
  });

  return (
    <div className="container mx-auto p-6 mt-10">
     
<CohortStickinessFeature/>
      {/* Tab Navigation */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveTab("cohort")}
          className={`px-4 py-2 mx-2 rounded ${activeTab === "cohort" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Cohort Analysis
        </button>
        <button
          onClick={() => setActiveTab("stickiness")}
          className={`px-4 py-2 mx-2 rounded ${activeTab === "stickiness" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Stickiness Ratio
        </button>
      </div>

      {/* Explanation Section */}
      {activeTab === "cohort" ? (
        <div className="bg-blue-50 p-4 rounded-lg shadow mb-6 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold mb-2">Cohort Analysis</h3>
          <p className="text-gray-700">
            Cohort Analysis groups users by their start date and measures the retention rate over time.
            <br />
            <strong>Calculation:</strong> Retention Rate = (Retained Users / Total Users) * 100.
            <br />
            Percentage change is computed relative to the previous cohort. Positive changes indicate improved retention.
          </p>
        </div>
      ) : (
        <div className="bg-blue-50 p-4 rounded-lg shadow mb-6 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold mb-2">Stickiness Ratio Analysis</h3>
          <p className="text-gray-700">
            The Stickiness Ratio measures user engagement by comparing Daily Active Users (DAU) to Monthly Active Users (MAU).
            <br />
            <strong>Calculation:</strong> Stickiness Ratio = (DAU / MAU) * 100.
            <br />
            Percentage change is computed compared to the previous period. A higher ratio indicates a more engaged user base.
          </p>
        </div>
      )}

      {/* Render active tab content */}
      {activeTab === "cohort" ? (
       <section className="mb-12">
       <h3 className="text-2xl font-bold mb-4 text-center">Cohort Analysis</h3>
       {/* Cohort Form */}
       <form
         onSubmit={handleCohortSubmit}
         className="bg-white shadow-lg rounded px-4 sm:px-8 pt-6 pb-8 mb-6 max-w-lg mx-auto"
       >
         <div className="mb-4">
           <label className="block text-gray-700 text-sm font-bold mb-2">
             Cohort Date
           </label>
           <input
             type="date"
             name="cohortDate"
             value={cohortForm.cohortDate}
             onChange={handleCohortChange}
             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
           />
         </div>
         <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
           <div>
             <label className="block text-gray-700 text-sm font-bold mb-2">
               Total Users
             </label>
             <input
               type="number"
               name="totalUsers"
               value={cohortForm.totalUsers}
               onChange={handleCohortChange}
               placeholder="e.g. 1000"
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
             />
           </div>
           <div>
             <label className="block text-gray-700 text-sm font-bold mb-2">
               Retained Users
             </label>
             <input
               type="number"
               name="retainedUsers"
               value={cohortForm.retainedUsers}
               onChange={handleCohortChange}
               placeholder="e.g. 600"
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
             />
           </div>
         </div>
         <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
           <button
             type="submit"
             className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
           >
             {isEditingCohort ? "Update Cohort" : "Add Cohort"}
           </button>
           <button
             type="button"
             onClick={() => window.print()}
             className="w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
           >
             Print Cohort Data
           </button>
         </div>
       </form>
     
     

          {/* Cohort Table */}
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border rounded shadow">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Total Users</th>
                  <th className="px-4 py-2 border">Retained Users</th>
                  <th className="px-4 py-2 border">Retention (%)</th>
                  <th className="px-4 py-2 border">% Change</th>
                  <th className="px-4 py-2 border">Outcome</th>
                  <th className="px-4 py-2 border">Recommendation</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cohortDataWithMetrics.length > 0 ? (
                  cohortDataWithMetrics
                    .slice()
                    .reverse()
                    .map((c) => (
                      <tr key={c.id} className="text-center hover:bg-gray-100">
                        <td className="px-4 py-2 border">{c.cohortDate}</td>
                        <td className="px-4 py-2 border">{c.totalUsers}</td>
                        <td className="px-4 py-2 border">{c.retainedUsers}</td>
                        <td className="px-4 py-2 border">{c.retentionRate.toFixed(2)}%</td>
                        <td className="px-4 py-2 border">
                          {c.percentageChange === null ? "N/A" : `${Math.abs(c.percentageChange).toFixed(2)}%`}
                        </td>
                        <td className="px-4 py-2 border">{c.outcome}</td>
                        <td className="px-4 py-2 border">{c.recommendation}</td>
                        <td className="px-4 py-2 border space-x-2">
                          <button
                            onClick={() => handleEditCohort(c.id)}
                            className="text-blue-500 hover:text-blue-700"
                            title="Edit"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteCohort(c.id)}
                            className="text-red-500 hover:text-red-700"
                            title="Delete"
                          >
                            <Trash size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center px-4 py-2">
                      No cohort records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Cohort Chart */}
          <div className="bg-white shadow-lg rounded p-6 mb-6 max-w-3xl mx-auto">
            <Line
              data={cohortChartData}
              options={chartOptions("Cohort Retention Over Time", "Retention (%)")}
            />
          </div>
        </section>
      ) : (
        <section className="mb-12">
        <h3 className="text-2xl font-bold mb-4 text-center">
          Stickiness Ratio Analysis
        </h3>
        {/* Stickiness Form */}
        <form
          onSubmit={handleStickinessSubmit}
          className="bg-white shadow-lg rounded px-4 sm:px-8 pt-6 pb-8 mb-6 max-w-lg mx-auto"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={stickinessForm.date}
              onChange={handleStickinessChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
            />
          </div>
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                DAU
              </label>
              <input
                type="number"
                name="DAU"
                value={stickinessForm.DAU}
                onChange={handleStickinessChange}
                placeholder="e.g. 500"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                MAU
              </label>
              <input
                type="number"
                name="MAU"
                value={stickinessForm.MAU}
                onChange={handleStickinessChange}
                placeholder="e.g. 2000"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isEditingStickiness ? "Update Record" : "Add Record"}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Print Stickiness Data
            </button>
          </div>
        </form>
   
      

          {/* Stickiness Table */}
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border rounded shadow">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">DAU</th>
                  <th className="px-4 py-2 border">MAU</th>
                  <th className="px-4 py-2 border">Stickiness (%)</th>
                  <th className="px-4 py-2 border">% Change</th>
                  <th className="px-4 py-2 border">Outcome</th>
                  <th className="px-4 py-2 border">Recommendation</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stickinessDataWithMetrics.length > 0 ? (
                  stickinessDataWithMetrics
                    .slice()
                    .reverse()
                    .map((r) => (
                      <tr key={r.id} className="text-center hover:bg-gray-100">
                        <td className="px-4 py-2 border">{r.date}</td>
                        <td className="px-4 py-2 border">{r.DAU}</td>
                        <td className="px-4 py-2 border">{r.MAU}</td>
                        <td className="px-4 py-2 border">{r.stickiness.toFixed(2)}%</td>
                        <td className="px-4 py-2 border">
                          {r.percentageChange === null ? "N/A" : `${Math.abs(r.percentageChange).toFixed(2)}%`}
                        </td>
                        <td className="px-4 py-2 border">{r.outcome}</td>
                        <td className="px-4 py-2 border">{r.recommendation}</td>
                        <td className="px-4 py-2 border space-x-2">
                          <button
                            onClick={() => handleEditStickiness(r.id)}
                            className="text-blue-500 hover:text-blue-700"
                            title="Edit"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteStickiness(r.id)}
                            className="text-red-500 hover:text-red-700"
                            title="Delete"
                          >
                            <Trash size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center px-4 py-2">
                      No stickiness records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Stickiness Chart */}
          <div className="bg-white shadow-lg rounded p-6 mb-6 max-w-3xl mx-auto">
            <Line
              data={stickinessChartData}
              options={chartOptions("Stickiness Ratio Over Time", "Stickiness Ratio (%)")}
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default CohortStickinessDashboard;
