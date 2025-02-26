import React, { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "../../supabaseClient";
import CohortStickinessFeature from '../CohortStickinessFeature'


import { Line } from "react-chartjs-2";
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
  // User state
  const [, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);
  // Toggle between Cohort and Stickiness analysis
  const [activeTab, setActiveTab] = useState("cohort");

  /* =========================== COHORT ANALYSIS STATE =========================== */
  const [cohorts, setCohorts] = useState([]);
  const [cohortForm, setCohortForm] = useState({
    id: null,
    cohort_date: "",
    total_users: "",
    retained_users: "",
  });
  const [isEditingCohort, setIsEditingCohort] = useState(false);

  /* =========================== STICKINESS ANALYSIS STATE =========================== */
  const [stickinessRecords, setStickinessRecords] = useState([]);
  const [stickinessForm, setStickinessForm] = useState({
    id: null,
    analysis_date: "",
    dau: "",
    mau: "",
  });
  const [isEditingStickiness, setIsEditingStickiness] = useState(false);

  /* ========================== USER IDENTIFICATION ========================== */
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
      console.debug("User email found in localStorage:", email);
      const fetchUserId = async () => {
        const { data, error } = await supabase
          .from("users")
          .select("id")
          .eq("email", email)
          .single();
        if (error) {
          console.error("Error fetching user id:", error);
        } else if (data) {
          setUserId(data.id);
        }
      };
      fetchUserId();
    } else {
      console.debug("No user email found in localStorage.");
    }
  }, []);

  /* ===================== FETCHING DATA FROM SUPABASE ===================== */
  // Fetch Cohort Analysis records
  const fetchCohorts = useCallback(async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("cohort_analysis")
      .select("*")
      .eq("user_id", userId)
      .order("cohort_date", { ascending: true });
    if (error) {
      console.error("Error fetching cohorts:", error);
    } else {
      setCohorts(data);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchCohorts();
    }
  }, [userId, fetchCohorts]);

  // Fetch Stickiness Analysis records
  const fetchStickiness = useCallback(async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("stickiness_analysis")
      .select("*")
      .eq("user_id", userId)
      .order("analysis_date", { ascending: true });
    if (error) {
      console.error("Error fetching stickiness records:", error);
    } else {
      setStickinessRecords(data);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchStickiness();
    }
  }, [userId, fetchStickiness]);

  /* ========================= COHORT ANALYSIS HANDLERS ========================= */
  const handleCohortChange = (e) => {
    const { name, value } = e.target;
    setCohortForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCohortSubmit = async (e) => {
    e.preventDefault();
    const { cohort_date, total_users, retained_users, id } = cohortForm;
    if (!cohort_date || total_users === "" || retained_users === "") {
      alert("Please fill in all fields for Cohort Analysis.");
      return;
    }
    const recordData = {
      user_id: userId,
      cohort_date,
      total_users: Number(total_users),
      retained_users: Number(retained_users),
    };
    if (isEditingCohort) {
      const { error } = await supabase
        .from("cohort_analysis")
        .update(recordData)
        .eq("id", id)
        .eq("user_id", userId);
      if (error) {
        console.error("Error updating cohort record:", error);
      } else {
        setIsEditingCohort(false);
        setCohortForm({ id: null, cohort_date: "", total_users: "", retained_users: "" });
        fetchCohorts();
      }
    } else {
      const { error } = await supabase.from("cohort_analysis").insert([recordData]);
      if (error) {
        console.error("Error creating cohort record:", error);
      } else {
        setCohortForm({ id: null, cohort_date: "", total_users: "", retained_users: "" });
        fetchCohorts();
      }
    }
  };

  const handleEditCohort = (id) => {
    const rec = cohorts.find((c) => c.id === id);
    if (rec) {
      setCohortForm({
        id: rec.id,
        cohort_date: rec.cohort_date,
        total_users: rec.total_users,
        retained_users: rec.retained_users,
      });
      setIsEditingCohort(true);
    }
  };

  const handleDeleteCohort = async (id) => {
    if (window.confirm("Delete this cohort record?")) {
      const { error } = await supabase
        .from("cohort_analysis")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);
      if (error) {
        console.error("Error deleting cohort record:", error);
      } else {
        fetchCohorts();
      }
    }
  };

  const handleDeleteAllCohorts = async () => {
    if (window.confirm("Delete all cohort analysis records?")) {
      const { error } = await supabase
        .from("cohort_analysis")
        .delete()
        .eq("user_id", userId);
      if (error) {
        console.error("Error deleting all cohort records:", error);
      } else {
        fetchCohorts();
      }
    }
  };

  /* ======================= STICKINESS ANALYSIS HANDLERS ======================= */
  const handleStickinessChange = (e) => {
    const { name, value } = e.target;
    setStickinessForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStickinessSubmit = async (e) => {
    e.preventDefault();
    const { analysis_date, dau, mau, id } = stickinessForm;
    if (!analysis_date || dau === "" || mau === "") {
      alert("Please fill in all fields for Stickiness Analysis.");
      return;
    }
    const recordData = {
      user_id: userId,
      analysis_date,
      dau: Number(dau),
      mau: Number(mau),
    };
    if (isEditingStickiness) {
      const { error } = await supabase
        .from("stickiness_analysis")
        .update(recordData)
        .eq("id", id)
        .eq("user_id", userId);
      if (error) {
        console.error("Error updating stickiness record:", error);
      } else {
        setIsEditingStickiness(false);
        setStickinessForm({ id: null, analysis_date: "", dau: "", mau: "" });
        fetchStickiness();
      }
    } else {
      const { error } = await supabase.from("stickiness_analysis").insert([recordData]);
      if (error) {
        console.error("Error creating stickiness record:", error);
      } else {
        setStickinessForm({ id: null, analysis_date: "", dau: "", mau: "" });
        fetchStickiness();
      }
    }
  };

  const handleEditStickiness = (id) => {
    const rec = stickinessRecords.find((r) => r.id === id);
    if (rec) {
      setStickinessForm({
        id: rec.id,
        analysis_date: rec.analysis_date,
        dau: rec.dau,
        mau: rec.mau,
      });
      setIsEditingStickiness(true);
    }
  };

  const handleDeleteStickiness = async (id) => {
    if (window.confirm("Delete this stickiness record?")) {
      const { error } = await supabase
        .from("stickiness_analysis")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);
      if (error) {
        console.error("Error deleting stickiness record:", error);
      } else {
        fetchStickiness();
      }
    }
  };

  const handleDeleteAllStickiness = async () => {
    if (window.confirm("Delete all stickiness records?")) {
      const { error } = await supabase
        .from("stickiness_analysis")
        .delete()
        .eq("user_id", userId);
      if (error) {
        console.error("Error deleting all stickiness records:", error);
      } else {
        fetchStickiness();
      }
    }
  };

  /* ====================== COMPUTED METRICS FOR COHORT ANALYSIS ====================== */
  const sortedCohorts = useMemo(() => {
    return [...cohorts].sort((a, b) => new Date(a.cohort_date) - new Date(b.cohort_date));
  }, [cohorts]);

  const cohortsWithMetrics = useMemo(() => {
   
    return sortedCohorts.map((rec, index) => {
      const retentionRate = rec.total_users > 0 ? (rec.retained_users / rec.total_users) * 100 : 0;
      let percentageChange = null;
      if (index > 0) {
        const prevRetention =
          sortedCohorts[index - 1].total_users > 0
            ? (sortedCohorts[index - 1].retained_users / sortedCohorts[index - 1].total_users) * 100
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
      return { ...rec, retentionRate, percentageChange, outcome, recommendation };
    });
  }, [sortedCohorts]);

  /* ====================== COMPUTED METRICS FOR STICKINESS ANALYSIS ====================== */
  const sortedStickiness = useMemo(() => {
    return [...stickinessRecords].sort((a, b) => new Date(a.analysis_date) - new Date(b.analysis_date));
  }, [stickinessRecords]);

  const stickinessWithMetrics = useMemo(() => {
    return sortedStickiness.map((rec, index) => {
      const stickiness = rec.mau > 0 ? (rec.dau / rec.mau) * 100 : 0;
      let percentageChange = null;
      if (index > 0) {
        const prevStickiness =
          sortedStickiness[index - 1].mau > 0 ? (sortedStickiness[index - 1].dau / sortedStickiness[index - 1].mau) * 100 : 0;
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
      return { ...rec, stickiness, percentageChange, outcome, recommendation };
    });
  }, [sortedStickiness]);

  /* ============================== CHART DATA ============================== */
  // Cohort Analysis Chart
  const cohortChartData = useMemo(() => {
    const labels = sortedCohorts.map((rec) => rec.cohort_date);
    const data = sortedCohorts.map((rec) =>
      rec.total_users > 0 ? (rec.retained_users / rec.total_users) * 100 : 0
    );
    return {
      labels,
      datasets: [
        {
          label: "Retention Rate (%)",
          data,
          fill: false,
          backgroundColor: "rgba(59,130,246,0.5)",
          borderColor: "rgba(59,130,246,1)",
          tension: 0.2,
        },
      ],
    };
  }, [sortedCohorts]);

  const cohortChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Cohort Retention Over Time" },
    },
    scales: {
      x: {
        type: "time",
        time: { unit: "day", tooltipFormat: "PP" },
        title: { display: true, text: "Cohort Date" },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Retention Rate (%)" },
      },
    },
  };

  // Stickiness Analysis Chart
  const stickinessChartData = useMemo(() => {
    const labels = sortedStickiness.map((rec) => rec.analysis_date);
    const data = sortedStickiness.map((rec) => (rec.mau > 0 ? (rec.dau / rec.mau) * 100 : 0));
    return {
      labels,
      datasets: [
        {
          label: "Stickiness Ratio (%)",
          data,
          fill: false,
          backgroundColor: "rgba(16,185,129,0.5)",
          borderColor: "rgba(16,185,129,1)",
          tension: 0.2,
        },
      ],
    };
  }, [sortedStickiness]);

  const stickinessChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Stickiness Ratio Over Time" },
    },
    scales: {
      x: {
        type: "time",
        time: { unit: "day", tooltipFormat: "PP" },
        title: { display: true, text: "Analysis Date" },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Stickiness Ratio (%)" },
      },
    },
  };

  return (
    <div className="container mx-auto p-4">
      <CohortStickinessFeature/>


      {/* Toggle Navigation */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveTab("cohort")}
          className={`px-4 py-2 mx-2 rounded ${
            activeTab === "cohort" ? "bg-green-700 text-white" : "bg-green-200 text-gray-800"
          }`}
        >
          Cohort Analysis
        </button>
        <button
          onClick={() => setActiveTab("stickiness")}
          className={`px-4 py-2 mx-2 rounded ${
            activeTab === "stickiness" ? "bg-green-600 text-white" : "bg-green-200 text-gray-800"
          }`}
        >
          Stickiness Analysis
        </button>
      </div>

      {/* COHORT ANALYSIS SECTION */}
      {activeTab === "cohort" && (
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-4 text-center">Cohort Analysis</h3>
          {/* Explanation */}
          <div className="bg-green-50 p-4 rounded-lg shadow mb-6 w-full">
            <h3 className="text-xl font-bold mb-2">Cohort Analysis</h3>
            <p className="text-gray-700">
              Cohort Analysis groups users by their join date and tracks retention over time.
              Retention Rate = (Retained Users / Total Users) * 100.
              Percentage change between cohorts indicates trends.
            </p>
          </div>
          {/* Cohort Form */}
          <form
            onSubmit={handleCohortSubmit}
            className="bg-green-700 shadow-lg rounded px-4 sm:px-8 pt-6 pb-8 mb-6 w-full"
          >
            <div className="mb-4">
              <label className="block text-white font-bold mb-2">Cohort Date</label>
              <input
                type="date"
                name="cohort_date"
                value={cohortForm.cohort_date}
                onChange={handleCohortChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-bold mb-2">Total Users</label>
                <input
                  type="number"
                  name="total_users"
                  value={cohortForm.total_users}
                  onChange={handleCohortChange}
                  placeholder="e.g., 1000"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-white font-bold mb-2">Retained Users</label>
                <input
                  type="number"
                  name="retained_users"
                  value={cohortForm.retained_users}
                  onChange={handleCohortChange}
                  placeholder="e.g., 600"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                className="w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
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
              <button
                type="button"
                onClick={handleDeleteAllCohorts}
                className="w-full sm:w-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete All Cohort Records
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
                {cohortsWithMetrics.length > 0 ? (
                  cohortsWithMetrics.slice().reverse().map((rec) => (
                    <tr key={rec.id} className="text-center hover:bg-gray-100">
                      <td className="px-4 py-2 border">{rec.cohort_date}</td>
                      <td className="px-4 py-2 border">{rec.total_users}</td>
                      <td className="px-4 py-2 border">{rec.retained_users}</td>
                      <td className="px-4 py-2 border">{rec.retentionRate.toFixed(2)}%</td>
                      <td className="px-4 py-2 border">
                        {rec.percentageChange === null ? "N/A" : `${Math.abs(rec.percentageChange).toFixed(2)}%`}
                      </td>
                      <td className="px-4 py-2 border">{rec.outcome}</td>
                      <td className="px-4 py-2 border">{rec.recommendation}</td>
                      <td className="px-4 py-2 border space-x-2">
                        <button onClick={() => handleEditCohort(rec.id)} className="text-blue-500 hover:text-blue-700" title="Edit">
                          <Edit3 size={18} />
                        </button>
                        <button onClick={() => handleDeleteCohort(rec.id)} className="text-red-500 hover:text-red-700" title="Delete">
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
          <div className="bg-white shadow-lg rounded p-6 mb-6 w-full" style={{ height: "500px" }}>
            <Line data={cohortChartData} options={cohortChartOptions} />
          </div>
        </section>
      )}

      {/* STICKINESS ANALYSIS SECTION */}
      {activeTab === "stickiness" && (
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-4 text-center">Stickiness Analysis</h3>
          {/* Explanation */}
          <div className="bg-green-50 p-4 rounded-lg shadow mb-6 w-full">
            <h3 className="text-xl font-bold mb-2">Stickiness Analysis</h3>
            <p className="text-gray-700">
              Stickiness Analysis compares Daily Active Users (dau) to Monthly Active Users (mau). Stickiness Ratio = (dau / mau) * 100. Changes between periods indicate trends in user engagement.
            </p>
          </div>
          {/* Stickiness Form */}
          <form
            onSubmit={handleStickinessSubmit}
            className="bg-green-700 shadow-lg rounded px-4 sm:px-8 pt-6 pb-8 mb-6 w-full"
          >
            <div className="mb-4">
              <label className="block text-white font-bold mb-2">Analysis Date</label>
              <input
                type="date"
                name="analysis_date"
                value={stickinessForm.analysis_date}
                onChange={handleStickinessChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-bold mb-2">DAU</label>
                <input
                  type="number"
                  name="dau"
                  value={stickinessForm.dau}
                  onChange={handleStickinessChange}
                  placeholder="e.g., 500"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-white font-bold mb-2">MAU</label>
                <input
                  type="number"
                  name="mau"
                  value={stickinessForm.mau}
                  onChange={handleStickinessChange}
                  placeholder="e.g., 2000"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                className="w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
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
              <button
                type="button"
                onClick={handleDeleteAllStickiness}
                className="w-full sm:w-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete All Stickiness Records
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
                {stickinessWithMetrics.length > 0 ? (
                  stickinessWithMetrics.slice().reverse().map((rec) => (
                    <tr key={rec.id} className="text-center hover:bg-gray-100">
                      <td className="px-4 py-2 border">{rec.analysis_date}</td>
                      <td className="px-4 py-2 border">{rec.dau}</td>
                      <td className="px-4 py-2 border">{rec.mau}</td>
                      <td className="px-4 py-2 border">{rec.stickiness.toFixed(2)}%</td>
                      <td className="px-4 py-2 border">
                        {rec.percentageChange === null ? "N/A" : `${Math.abs(rec.percentageChange).toFixed(2)}%`}
                      </td>
                      <td className="px-4 py-2 border">{rec.outcome}</td>
                      <td className="px-4 py-2 border">{rec.recommendation}</td>
                      <td className="px-4 py-2 border space-x-2">
                        <button
                          onClick={() => handleEditStickiness(rec.id)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Edit"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteStickiness(rec.id)}
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
          <div className="bg-white shadow-lg rounded p-6 mb-6 w-full" style={{ height: "500px" }}>
            <Line data={stickinessChartData} options={stickinessChartOptions} />
          </div>
        </section>
      )}

      {/* Global Print Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => window.print()}
          className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
        >
          Print Data/Chart
        </button>
      </div>
    </div>
  );
};

export default CohortStickinessDashboard;


