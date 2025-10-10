import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiTrendingUp } from "react-icons/fi";

export default function SQLGroupByLesson() {
  const [step, setStep] = useState(0);

  // STEP DATA — each step teaches a part of the query
  const steps = [
    {
      title: "🧠 Step 1: What’s the goal?",
      content: (
        <div className="space-y-3">
          <p>
            We want to find out <strong>how much each user has spent</strong> in total, 
            and <strong>how many transactions</strong> they made.
          </p>
          <p>
            This means we’re not just listing all purchases — we’re <em>aggregating</em> data per user.
          </p>
          <p>
            In SQL, aggregation means combining multiple rows into one summary result — like totals or averages.
          </p>
        </div>
      ),
    },
    {
      title: "💡 Step 2: Understanding Aggregates (SUM & COUNT)",
      content: (
        <div className="space-y-3">
          <p>
            Two key functions help us summarize data:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <code className="bg-gray-100 px-1 py-0.5 rounded">SUM(p.price * p.quantity)</code> — adds up each user's total spending.
            </li>
            <li>
              <code className="bg-gray-100 px-1 py-0.5 rounded">COUNT(p.id)</code> — counts how many purchases (transactions) each user made.
            </li>
          </ul>
          <p>
            Both of these are <strong>aggregate functions</strong> because they process many rows and return one value per group.
          </p>
        </div>
      ),
    },
    {
      title: "📊 Step 3: The GROUP BY Clause",
      content: (
        <div className="space-y-3">
          <p>
            The <code className="bg-gray-100 px-1 rounded">GROUP BY</code> clause tells SQL how to <strong>group rows together</strong>.
          </p>
          <p>
            Here, we group all purchases by <code>u.full_name</code> and <code>u.email</code> — meaning one result row per user.
          </p>
          <pre className="bg-gray-800 text-white p-3 rounded-lg text-sm">
{`GROUP BY 
  u.full_name, u.email`}
          </pre>
          <p>
            Every user’s multiple purchases collapse into one summary row.
          </p>
        </div>
      ),
    },
    {
      title: "📈 Step 4: Sorting with ORDER BY",
      content: (
        <div className="space-y-3">
          <p>
            Once we have totals, we can sort users by who spent the most:
          </p>
          <pre className="bg-gray-800 text-white p-3 rounded-lg text-sm">
{`ORDER BY total_spent DESC`}
          </pre>
          <p>
            <strong>DESC</strong> means descending order — biggest spender at the top.
          </p>
        </div>
      ),
    },
    {
      title: "🧩 Step 5: Putting It All Together",
      content: (
        <div className="space-y-3">
          <p>Here’s the complete query:</p>
          <pre className="bg-gray-800 text-white p-3 rounded-lg text-sm overflow-x-auto">
{`SELECT 
  u.full_name,
  u.email,
  SUM(p.price * p.quantity) AS total_spent,
  COUNT(p.id) AS total_transactions
FROM 
  users u
JOIN 
  purchases p
ON 
  p.user_id = u.id
GROUP BY 
  u.full_name, u.email
ORDER BY 
  total_spent DESC;`}
          </pre>
          <p>
            This query calculates total spending and transaction count per user,
            then orders results from biggest spender to smallest.
          </p>
        </div>
      ),
    },
    {
      title: "📊 Step 6: Sample Result Table",
      content: (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-2 text-left">Full Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Total Spent ($)</th>
                <th className="p-2 text-left">Transactions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-2">Alice Johnson</td>
                <td className="p-2">alice@email.com</td>
                <td className="p-2">$120</td>
                <td className="p-2">3</td>
              </tr>
              <tr className="border-t">
                <td className="p-2">Bob Smith</td>
                <td className="p-2">bob@email.com</td>
                <td className="p-2">$100</td>
                <td className="p-2">2</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-4">
            ✅ Alice appears first because she spent the most — that’s the effect of <code>ORDER BY total_spent DESC</code>.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center flex items-center gap-3 mb-6">
        <FiTrendingUp className="text-blue-600" />
        SQL Aggregation & GROUP BY Tutorial
      </h1>

      {/* Progress Bar */}
      <div className="flex items-center gap-2 mb-6">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-10 rounded-full ${
              i <= step ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>

      {/* Animated Content */}
      <div className="w-full max-w-5xl bg-white p-6 rounded-xl shadow-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">
              {steps[step].title}
            </h2>
            <div className="text-gray-700 leading-relaxed">{steps[step].content}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between w-full max-w-5xl mt-6">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-white ${
            step === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <FiArrowLeft /> Previous
        </button>

        <button
          onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
          disabled={step === steps.length - 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-white ${
            step === steps.length - 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Next <FiArrowRight />
        </button>
      </div>
    </div>
  );
}
