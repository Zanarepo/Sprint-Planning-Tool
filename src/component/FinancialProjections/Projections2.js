import React, { useEffect, useMemo, useState } from "react";
import { FiPlus, FiTrash2, FiEdit, FiSave, FiX, FiDownload } from "react-icons/fi";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";

// A small util to format percentages cleanly
const fmtPct = (v) => {
  if (v === null || v === undefined || Number.isNaN(v)) return "—";
  return `${(v * 100).toFixed(1)}%`;
};
const fmtMoney = (n) => {
  if (n === null || n === undefined || Number.isNaN(n)) return "—";
  return `$${Number(n).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
};

// Local storage key
const LS_KEY = "pf_sim_rows_v1";

// Insight generator based on CAC vs LTV and growth
function generateInsight(row, prevRow) {
  // cac vs ltv
  const ltv = computeLTV(row.revenuePerCustomer, row.churnRate);
  const ratio = row.cac > 0 ? ltv / row.cac : null;

  let econ = "";
  if (ratio === null || Number.isNaN(ratio)) econ = "Not enough data";
  else if (ratio >= 3) econ = "🟢 Unit economics healthy (LTV ≥ 3×CAC)";
  else if (ratio >= 1) econ = "🟡 Borderline (1× ≤ LTV &lt; 3× CAC)";
  else econ = "🔴 Unhealthy (CAC ≥ LTV) — acquisition costs too high";

  // growth signals (use revenue and customers)
  let growth = "";
  if (!prevRow) {
    growth = "No prior data to compare growth.";
  } else {
    const revChange = percentChange(row.revenue, prevRow.revenue);
    const custChange = percentChange(row.customersEnd, prevRow.customersEnd);
    const cacChange = percentChange(row.cac, prevRow.cac);

    const parts = [];
    if (!Number.isNaN(revChange) && Math.abs(revChange) > 0.01) {
      parts.push(revChange > 0 ? `Revenue ↑ ${fmtPct(revChange)}` : `Revenue ↓ ${fmtPct(Math.abs(revChange))}`);
    }
    if (!Number.isNaN(custChange) && Math.abs(custChange) > 0.01) {
      parts.push(custChange > 0 ? `Customers ↑ ${fmtPct(custChange)}` : `Customers ↓ ${fmtPct(Math.abs(custChange))}`);
    }
    if (!Number.isNaN(cacChange) && Math.abs(cacChange) > 0.01) {
      parts.push(cacChange > 0 ? `CAC ↑ ${fmtPct(cacChange)}` : `CAC ↓ ${fmtPct(Math.abs(cacChange))}`);
    }

    growth = parts.length ? parts.join(" • ") : "Stable vs previous period.";
  }

  return `${econ}. ${growth}`;
}

// helper percent change
function percentChange(curr, prev) {
  curr = Number(curr);
  prev = Number(prev);
  if (prev === 0 || Number.isNaN(prev) || Number.isNaN(curr)) return NaN;
  return (curr - prev) / Math.abs(prev);
}

// compute simple LTV = revenuePerCustomer / churnRate
function computeLTV(revenuePerCustomer, churnRate) {
  const r = Number(revenuePerCustomer);
  const c = Number(churnRate);
  if (!r || !c || Number.isNaN(r) || Number.isNaN(c) || c <= 0) return NaN;
  return r / c;
}

// The main component
export default function ProductFinancialsEntrySimulator() {
  const [rows, setRows] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // input state for add/edit form — all strings to allow empty inputs
  const emptyForm = {
    label: "",
    newCustomers: "",
    customersEnd: "",
    cac: "",
    revenuePerCustomer: "",
    churnRate: "",
  };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setRows(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to load from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(rows));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  }, [rows]);

  // Add or Save
  function handleSubmit(e) {
    e.preventDefault();
    // basic validation: at least label required
    if (!form.label.trim()) return alert("Please enter a label (e.g., Month 1, Q1 2026).");

    const parsed = {
      id: editingId || `r_${Date.now()}`,
      label: form.label.trim(),
      newCustomers: form.newCustomers === "" ? null : Number(form.newCustomers),
      customersEnd: form.customersEnd === "" ? null : Number(form.customersEnd),
      cac: form.cac === "" ? null : Number(form.cac),
      revenuePerCustomer: form.revenuePerCustomer === "" ? null : Number(form.revenuePerCustomer),
      churnRate: form.churnRate === "" ? null : Number(form.churnRate),
    };

    if (editingId) {
      setRows((r) => r.map((x) => (x.id === editingId ? parsed : x)));
      setEditingId(null);
    } else {
      setRows((r) => [...r, parsed]);
    }

    setForm(emptyForm);
  }

  function handleEdit(id) {
    const row = rows.find((r) => r.id === id);
    if (!row) return;
    setForm({
      label: row.label || "",
      newCustomers: row.newCustomers ?? "",
      customersEnd: row.customersEnd ?? "",
      cac: row.cac ?? "",
      revenuePerCustomer: row.revenuePerCustomer ?? "",
      churnRate: row.churnRate ?? "",
    });
    setEditingId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

function handleDelete(id) {
  if (!window.confirm("Delete this row?")) return;
  setRows((r) => r.filter((x) => x.id !== id));
}

function clearAll() {
  if (!window.confirm("Clear all rows? This cannot be undone.")) return;
  setRows([]);
  setForm(emptyForm);
  setEditingId(null);
  localStorage.removeItem(LS_KEY);
}


  // Derived computed rows with metrics, percent changes, insights
  const computed = useMemo(() => {
    return rows.map((row, idx) => {
      const prev = rows[idx - 1] || null;
      const revenue = row.customersEnd != null && row.revenuePerCustomer != null ? row.customersEnd * row.revenuePerCustomer : null;
      const ltv = computeLTV(row.revenuePerCustomer, row.churnRate);
      const ratio = row.cac != null && ltv && !Number.isNaN(ltv) && row.cac > 0 ? ltv / row.cac : null;

      const pct = {
        revenue: prev ? percentChange(revenue ?? NaN, prev.customersEnd != null && prev.revenuePerCustomer != null ? prev.customersEnd * prev.revenuePerCustomer : NaN) : NaN,
        customers: prev ? percentChange(row.customersEnd ?? NaN, prev.customersEnd ?? NaN) : NaN,
        cac: prev ? percentChange(row.cac ?? NaN, prev.cac ?? NaN) : NaN,
      };

      const insight = generateInsight(
        {
          ...row,
          revenue,
          ltv,
          cac: row.cac,
          customersEnd: row.customersEnd,
        },
        prev
          ? {
              ...prev,
              revenue: prev.customersEnd != null && prev.revenuePerCustomer != null ? prev.customersEnd * prev.revenuePerCustomer : null,
            }
          : null
      );

      return {
        ...row,
        revenue,
        ltv: Number.isFinite(ltv) ? Number(ltv.toFixed(2)) : null,
        ratio: Number.isFinite(ratio) ? Number(ratio.toFixed(2)) : null,
        pct,
        insight,
      };
    });
  }, [rows]);

  // Chart datasets built from computed
  const chartData = useMemo(() => {
    return computed.map((r) => ({
      label: r.label,
      Revenue: r.revenue ?? 0,
      Customers: r.customersEnd ?? 0,
      CAC: r.cac ?? 0,
      LTV: r.ltv ?? 0,
    }));
  }, [computed]);

  // Export CSV
  function exportCSV() {
    const header = [
      "Label",
      "New Customers",
      "Customers End",
      "CAC",
      "Revenue per Customer",
      "Churn Rate",
      "Revenue",
      "LTV",
      "LTV/CAC",
      "Insight",
    ];
    const lines = [header.join(",")];
    for (const r of computed) {
      const row = [
        `"${r.label}"`,
        r.newCustomers ?? "",
        r.customersEnd ?? "",
        r.cac ?? "",
        r.revenuePerCustomer ?? "",
        r.churnRate ?? "",
        r.revenue ?? "",
        r.ltv ?? "",
        r.ratio ?? "",
        `"${r.insight.replace(/"/g, "'")}"`,
      ];
      lines.push(row.join(","));
    }
    const csv = lines.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pf_sim_export.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <header className="flex items-start justify-between gap-4 mb-4 flex-col sm:flex-row">
        <div>
          <h1 className="text-xl font-bold">Product Financials — Data Entry Simulator</h1>
          <p className="text-sm text-gray-600">Enter your own rows (months/quarters) — fields are empty so you can populate them. Saved locally in your browser.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={exportCSV} className="px-3 py-2 bg-blue-600 text-white rounded flex items-center gap-2">
            <FiDownload /> Export CSV
          </button>
          <button onClick={clearAll} className="px-3 py-2 bg-red-50 text-red-600 border rounded">Clear all</button>
        </div>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs text-gray-600">Label (e.g., Month 1)</label>
          <input value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} className="mt-1 p-2 w-full border rounded" />
        </div>

        <div>
          <label className="block text-xs text-gray-600">New Customers</label>
          <input type="number" value={form.newCustomers} onChange={(e) => setForm((f) => ({ ...f, newCustomers: e.target.value }))} className="mt-1 p-2 w-full border rounded" />
        </div>

        <div>
          <label className="block text-xs text-gray-600">Customers (End)</label>
          <input type="number" value={form.customersEnd} onChange={(e) => setForm((f) => ({ ...f, customersEnd: e.target.value }))} className="mt-1 p-2 w-full border rounded" />
        </div>

        <div>
          <label className="block text-xs text-gray-600">CAC ($ per new cust)</label>
          <input type="number" value={form.cac} onChange={(e) => setForm((f) => ({ ...f, cac: e.target.value }))} className="mt-1 p-2 w-full border rounded" />
        </div>

        <div>
          <label className="block text-xs text-gray-600">Revenue / cust / month ($)</label>
          <input type="number" value={form.revenuePerCustomer} onChange={(e) => setForm((f) => ({ ...f, revenuePerCustomer: e.target.value }))} className="mt-1 p-2 w-full border rounded" />
        </div>

        <div>
          <label className="block text-xs text-gray-600">Churn Rate (decimal, e.g., 0.05)</label>
          <input type="number" step="0.01" value={form.churnRate} onChange={(e) => setForm((f) => ({ ...f, churnRate: e.target.value }))} className="mt-1 p-2 w-full border rounded" />
        </div>

        <div className="md:col-span-3 flex gap-2 mt-2">
          <button type="submit" className="px-3 py-2 bg-green-600 text-white rounded flex items-center gap-2">
            {editingId ? <><FiSave /> Save</> : <><FiPlus /> Add Row</>}
          </button>
          <button type="button" onClick={() => { setForm(emptyForm); setEditingId(null); }} className="px-3 py-2 border rounded flex items-center gap-2">
            <FiX /> Cancel
          </button>
        </div>
      </form>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Revenue & Customers</h3>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip formatter={(v) => (v ? v.toLocaleString() : v)} />
                <Legend />
                <Line type="monotone" dataKey="Revenue" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="Customers" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">CAC vs LTV</h3>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="CAC" name="CAC" />
                <Bar dataKey="LTV" name="LTV" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="bg-white p-4 rounded shadow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Rows</h3>
          <div className="text-xs text-gray-500">Edit entries or remove rows. Data is saved in local storage.</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-gray-600 text-left">
              <tr>
                <th className="p-2">Label</th>
                <th className="p-2">New Cust</th>
                <th className="p-2">Customers End</th>
                <th className="p-2">CAC</th>
                <th className="p-2">Rev / Cust</th>
                <th className="p-2">Churn</th>
                <th className="p-2">Revenue</th>
                <th className="p-2">LTV</th>
                <th className="p-2">LTV/CAC</th>
                <th className="p-2">%Δ Rev</th>
                <th className="p-2">%Δ Cust</th>
                <th className="p-2">%Δ CAC</th>
                <th className="p-2">Insight</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {computed.length === 0 ? (
                <tr>
                  <td colSpan={14} className="p-4 text-center text-gray-500">No rows yet — add your first row above.</td>
                </tr>
              ) : (
                computed.map((r, idx) => (
                  <tr key={r.id} className="border-t">
                    <td className="p-2">{r.label}</td>
                    <td className="p-2">{r.newCustomers ?? "—"}</td>
                    <td className="p-2">{r.customersEnd ?? "—"}</td>
                    <td className={`p-2 ${r.ratio != null ? (r.ratio >= 3 ? "text-green-600" : r.ratio >= 1 ? "text-yellow-600" : "text-red-600") : ""}`}>{r.cac ?? "—"}</td>
                    <td className="p-2">{r.revenuePerCustomer ?? "—"}</td>
                    <td className="p-2">{r.churnRate ?? "—"}</td>
                    <td className="p-2">{r.revenue != null ? fmtMoney(r.revenue) : "—"}</td>
                    <td className="p-2">{r.ltv != null ? fmtMoney(r.ltv) : "—"}</td>
                    <td className="p-2">{r.ratio != null ? r.ratio : "—"}</td>
                    <td className="p-2">{!Number.isNaN(r.pct.revenue) ? (r.pct.revenue >= 0 ? `+${fmtPct(r.pct.revenue)}` : `-${fmtPct(Math.abs(r.pct.revenue))}`) : "—"}</td>
                    <td className="p-2">{!Number.isNaN(r.pct.customers) ? (r.pct.customers >= 0 ? `+${fmtPct(r.pct.customers)}` : `-${fmtPct(Math.abs(r.pct.customers))}`) : "—"}</td>
                    <td className="p-2">{!Number.isNaN(r.pct.cac) ? (r.pct.cac >= 0 ? `+${fmtPct(r.pct.cac)}` : `-${fmtPct(Math.abs(r.pct.cac))}`) : "—"}</td>
                    <td className="p-2 max-w-xs">{r.insight}</td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(r.id)} className="p-1 border rounded text-sm flex items-center gap-1"><FiEdit /> Edit</button>
                        <button onClick={() => handleDelete(r.id)} className="p-1 border rounded text-sm text-red-600 flex items-center gap-1"><FiTrash2 /> Del</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="mt-4 text-xs text-gray-500">Tip: Leave fields blank if you want them ignored. Use the chart to spot trends. Data persists in local storage (browser).</footer>
    </div>
  );
}
