import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FiTrendingUp, FiDollarSign, FiUsers, FiRefreshCcw } from "react-icons/fi";
//import Projections2 from "./Projections2";

// Default export a single React component
export default function ProductFinancialsSimulator() {
  // === Assumptions (editable inputs) ===
  const [months, setMonths] = useState(12);
  const [startingCustomers, setStartingCustomers] = useState(100);
  const [cac, setCac] = useState(50); // $ per new customer
  const [revenuePerCustomer, setRevenuePerCustomer] = useState(20); // $ / month
  const [churnRate, setChurnRate] = useState(0.05); // monthly churn (decimal)
  const [monthlyNewBase, setMonthlyNewBase] = useState(100); // baseline new customers first month
  const [monthlyNewGrowthPct, setMonthlyNewGrowthPct] = useState(0.1); // growth of new customers month-over-month

  // scenario presets
  const presets = {
    base: {
      startingCustomers: 100,
      cac: 50,
      revenuePerCustomer: 20,
      churnRate: 0.05,
      monthlyNewBase: 100,
      monthlyNewGrowthPct: 0.1,
    },
    best: {
      startingCustomers: 200,
      cac: 30,
      revenuePerCustomer: 25,
      churnRate: 0.03,
      monthlyNewBase: 150,
      monthlyNewGrowthPct: 0.15,
    },
    worst: {
      startingCustomers: 80,
      cac: 80,
      revenuePerCustomer: 15,
      churnRate: 0.12,
      monthlyNewBase: 60,
      monthlyNewGrowthPct: -0.02,
    },
  };

  function applyPreset(p) {
    setStartingCustomers(p.startingCustomers);
    setCac(p.cac);
    setRevenuePerCustomer(p.revenuePerCustomer);
    setChurnRate(p.churnRate);
    setMonthlyNewBase(p.monthlyNewBase);
    setMonthlyNewGrowthPct(p.monthlyNewGrowthPct);
  }

  // === Compute projection data ===
  const projection = useMemo(() => {
    const rows = [];
    let currentCustomers = startingCustomers;
    let newCustomers = monthlyNewBase;

    for (let m = 1; m <= months; m++) {
      const customersStart = Math.round(currentCustomers);
      const churned = Math.round(customersStart * churnRate);
      const customersEnd = Math.max(0, customersStart - churned + Math.round(newCustomers));
      const acquisitionCost = Math.round(newCustomers * cac);
      const revenue = Math.round(customersEnd * revenuePerCustomer);
      const ltv = revenuePerCustomer / Math.max(churnRate, 1e-9); // simple LTV approximation
      const cacToLtv = ltv / cac;

      rows.push({
        month: `M${m}`,
        monthNumber: m,
        customersStart,
        newCustomers: Math.round(newCustomers),
        churned,
        customersEnd,
        acquisitionCost,
        revenue,
        ltv: +ltv.toFixed(2),
        cacToLtv: +cacToLtv.toFixed(2),
      });

      // next month
      currentCustomers = customersEnd;
      newCustomers = newCustomers * (1 + monthlyNewGrowthPct);
    }

    return rows;
  }, [months, startingCustomers, cac, revenuePerCustomer, churnRate, monthlyNewBase, monthlyNewGrowthPct]);

  // KPI summary (last month)
  const kpi = useMemo(() => {
    const last = projection[projection.length - 1] || {};
    const ltv = revenuePerCustomer / Math.max(churnRate, 1e-9);
    const ratio = ltv / cac;
    return {
      finalCustomers: last.customersEnd || 0,
      finalRevenue: last.revenue || 0,
      ltv: +ltv.toFixed(2),
      cacToLtvRatio: +ratio.toFixed(2),
    };
  }, [projection, revenuePerCustomer, churnRate, cac]);

  // color for CAC vs LTV ratio
  const ratioColor = (ratio) => {
    if (ratio >= 3) return "bg-green-100 text-green-800"; // healthy
    if (ratio >= 1) return "bg-yellow-100 text-yellow-800"; // borderline
    return "bg-red-100 text-red-800"; // bad
  };

  // helper for money formatting
  const money = (n) => n.toLocaleString(undefined, { maximumFractionDigits: 0 });

  // charts data mapping
  const revenueData = projection.map((r) => ({ name: r.month, Revenue: r.revenue }));
  const customersData = projection.map((r) => ({ name: r.month, Customers: r.customersEnd }));
  const acqData = projection.map((r) => ({ name: r.month, Acquisition: r.acquisitionCost }));

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Product Financials Simulator</h1>
        <div className="text-sm text-gray-600">Responsive • Tailwind • Recharts • React Icons</div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Inputs card */}
        <div className="col-span-1 md:col-span-2 p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-lg">Model Assumptions</h2>
            <div className="flex gap-2">
              <button
                onClick={() => applyPreset(presets.base)}
                className="px-3 py-1 border rounded text-sm hover:bg-gray-50"
              >
                Base
              </button>
              <button
                onClick={() => applyPreset(presets.best)}
                className="px-3 py-1 border rounded text-sm hover:bg-gray-50"
              >
                Best
              </button>
              <button
                onClick={() => applyPreset(presets.worst)}
                className="px-3 py-1 border rounded text-sm hover:bg-gray-50"
              >
                Worst
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-3 py-1 border rounded text-sm flex items-center gap-1"
                title="Reset page"
              >
                <FiRefreshCcw /> Reset
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="block">
              <div className="text-xs text-gray-600">Months</div>
              <input
                type="number"
                min={3}
                max={60}
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="mt-1 w-full p-2 border rounded"
              />
            </label>

            <label className="block">
              <div className="text-xs text-gray-600">Starting Customers</div>
              <input
                type="number"
                value={startingCustomers}
                onChange={(e) => setStartingCustomers(Number(e.target.value))}
                className="mt-1 w-full p-2 border rounded"
              />
            </label>

            <label className="block">
              <div className="text-xs text-gray-600">Monthly New (base)</div>
              <input
                type="number"
                value={monthlyNewBase}
                onChange={(e) => setMonthlyNewBase(Number(e.target.value))}
                className="mt-1 w-full p-2 border rounded"
              />
            </label>

            <label className="block">
              <div className="text-xs text-gray-600">New Cust Growth % (MoM)</div>
              <input
                type="number"
                step="0.01"
                value={monthlyNewGrowthPct}
                onChange={(e) => setMonthlyNewGrowthPct(Number(e.target.value))}
                className="mt-1 w-full p-2 border rounded"
              />
            </label>

            <label className="block">
              <div className="text-xs text-gray-600">CAC ($ per new cust)</div>
              <input
                type="number"
                value={cac}
                onChange={(e) => setCac(Number(e.target.value))}
                className="mt-1 w-full p-2 border rounded"
              />
            </label>

            <label className="block">
              <div className="text-xs text-gray-600">Revenue / cust / month ($)</div>
              <input
                type="number"
                value={revenuePerCustomer}
                onChange={(e) => setRevenuePerCustomer(Number(e.target.value))}
                className="mt-1 w-full p-2 border rounded"
              />
            </label>

            <label className="block sm:col-span-2">
              <div className="text-xs text-gray-600">Churn Rate (decimal, monthly)</div>
              <input
                type="number"
                step="0.01"
                value={churnRate}
                onChange={(e) => setChurnRate(Number(e.target.value))}
                className="mt-1 w-full p-2 border rounded"
              />
              <div className="text-xs text-gray-500 mt-1">Formula: <span className="font-medium">Churned = Customers Start × Churn Rate</span></div>
            </label>
          </div>

          <div className="mt-3 text-sm text-gray-600">
            <div><span className="font-semibold">LTV formula (simple):</span> <code>Revenue per customer / Churn rate</code></div>
            <div><span className="font-semibold">CAC vs LTV rule:</span> LTV ≥ 3 × CAC (healthy)</div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded"><FiUsers /></div>
              <div>
                <div className="text-xs text-gray-500">Final Customers</div>
                <div className="font-semibold text-lg">{kpi.finalCustomers}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded"><FiDollarSign /></div>
              <div>
                <div className="text-xs text-gray-500">Final Monthly Revenue</div>
                <div className="font-semibold text-lg">${money(kpi.finalRevenue)}</div>
              </div>
            </div>

            <div className={`p-3 rounded ${ratioColor(kpi.cacToLtvRatio || kpi.cacToLtvRatio)}`}>
              <div className="text-xs">CAC vs LTV Ratio</div>
              <div className="font-semibold text-lg">{kpi.cacToLtvRatio}</div>
              <div className="text-xs text-gray-600 mt-1">{kpi.cacToLtvRatio >= 3 ? 'Healthy (LTV ≥ 3×CAC)' : (kpi.cacToLtvRatio >=1 ? 'Borderline (1–3×)' : 'Bad (CAC ≥ LTV)')}</div>
            </div>

            <div className="text-xs text-gray-500">
              <div className="font-semibold">LTV</div>
              <div>${money(kpi.ltv)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts area */}
      <section className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-2 p-4 bg-white rounded shadow">
          <h3 className="font-semibold mb-2 flex items-center gap-2"><FiTrendingUp /> Revenue Growth</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Revenue" stroke="#10B981" strokeWidth={3} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold mb-2 flex items-center gap-2"><FiUsers /> Customers</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={customersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="Customers" stroke="#3B82F6" strokeWidth={3} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-3 p-4 bg-white rounded shadow">
          <h3 className="font-semibold mb-2 flex items-center gap-2">Acquisition & LTV</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={acqData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Acquisition" name="Acquisition Cost" maxBarSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="p-2">
              <div className="text-sm text-gray-600">Quick formulas & explanations</div>
              <ul className="mt-2 text-sm space-y-1">
                <li><strong>CAC</strong>: Cost to acquire a new customer (input).</li>
                <li><strong>LTV</strong>: Lifetime value ≈ Revenue per customer / Churn rate.</li>
                <li><strong>Churned</strong>: Customers Start × Churn Rate.</li>
                <li><strong>Customers End</strong>: Customers Start − Churned + New Customers.</li>
                <li><strong>Revenue</strong>: Customers End × Revenue per customer.</li>
                <li><strong>Healthy rule:</strong> LTV ≥ 3 × CAC → sustainable growth.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Data table */}
      <section className="mt-6 p-4 bg-white rounded shadow">
        <h3 className="font-semibold mb-2">Projection Table</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm table-auto">
            <thead className="text-left text-xs text-gray-500">
              <tr>
                <th className="px-2 py-1">Month</th>
                <th className="px-2 py-1">Customers Start</th>
                <th className="px-2 py-1">New Customers</th>
                <th className="px-2 py-1">Churned</th>
                <th className="px-2 py-1">Customers End</th>
                <th className="px-2 py-1">Acq Cost ($)</th>
                <th className="px-2 py-1">Revenue ($)</th>
                <th className="px-2 py-1">LTV</th>
                <th className="px-2 py-1">LTV/CAC</th>
              </tr>
            </thead>
            <tbody>
              {projection.map((r) => (
                <tr key={r.month} className="border-t">
                  <td className="px-2 py-2">{r.month}</td>
                  <td className="px-2 py-2">{r.customersStart}</td>
                  <td className="px-2 py-2">{r.newCustomers}</td>
                  <td className="px-2 py-2">{r.churned}</td>
                  <td className="px-2 py-2">{r.customersEnd}</td>
                  <td className="px-2 py-2">${money(r.acquisitionCost)}</td>
                  <td className="px-2 py-2">${money(r.revenue)}</td>
                  <td className="px-2 py-2">{r.ltv}</td>
                  <td className={`px-2 py-2 ${r.cacToLtv>=3? 'text-green-600': (r.cacToLtv>=1? 'text-yellow-600':'text-red-600')}`}>{r.cacToLtv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
{/*<Projections2/>*/}
      <footer className="mt-6 text-xs text-gray-500">Tip: Edit assumptions to run different scenarios. Use presets to quickly compare Best / Base / Worst cases.</footer>
    </div>
  );
}
