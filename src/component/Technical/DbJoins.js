import React, { useState } from "react";
import { FiArrowLeft, FiArrowRight, FiDatabase } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import SqlConcept from "./SqlConcept";
import DbJoins2 from "./DbJoins2";
import DbJoins3 from "./DbJoins3";
import DbJoins4 from "./DbJoins4";

export default function SQLJoinTutorial() {
  const [step, setStep] = useState(0);

  // ===============================
  // STEP DATA
  // ===============================
  const steps = [
    {
      title: "🔍 Introduction to SQL Queries and Joins",
      content: (
        <>
          <p className="mb-3">
            A <strong>SQL query</strong> is simply a request for information
            from a database.
          </p>
          <pre className="bg-gray-900 text-green-400 p-3 rounded-lg text-sm">
{`SELECT * FROM users;`}
          </pre>
          <p className="mt-3">
            That means: “Show me all data from the <code>users</code> table.”
          </p>
          <p className="mt-4">
            In real databases, information is split across tables — for example,
            <strong> users </strong> and <strong> purchases</strong>. We use{" "}
            <strong>JOINs</strong> to connect those tables together based on a
            related column (like <code>user_id</code>).
          </p>
        </>
      ),
    },
    {
      title: "1️⃣ SELECT",
      content: (
        <>
          <p className="mb-3">
            <strong>SELECT</strong> tells the database which columns you want to
            see.
          </p>
          <pre className="bg-gray-900 text-green-400 p-3 rounded-lg text-sm overflow-auto">
{`SELECT u.full_name, u.email, p.product_name, p.price, p.quantity`}
          </pre>
          <p className="mt-3">
            So we’re saying: “I want to see each user’s name and email plus the
            product they bought, its price, and quantity.”
          </p>
        </>
      ),
    },
    {
      title: "2️⃣ FROM users u",
      content: (
        <p>
          <strong>FROM users u</strong> means start with the{" "}
          <code className="bg-gray-200 px-1 rounded">users</code> table. The{" "}
          <code className="bg-gray-200 px-1 rounded">u</code> is just an alias
          (shortcut) for the table name.
        </p>
      ),
    },
    {
      title: "3️⃣ JOIN purchases p",
      content: (
        <>
          <p>
            <strong>JOIN purchases p</strong> combines the{" "}
            <code className="bg-gray-200 px-1 rounded">users</code> table with
            the{" "}
            <code className="bg-gray-200 px-1 rounded">purchases</code> table.
          </p>
          <p className="mt-2">
            The alias <code className="bg-gray-200 px-1 rounded">p</code> makes
            it shorter to reference in your query.
          </p>
        </>
      ),
    },
    {
      title: "4️⃣ ON p.user_id = u.id",
      content: (
        <>
          <p>This tells SQL how to connect rows from both tables.</p>
          <pre className="bg-gray-900 text-green-400 p-3 rounded-lg text-sm overflow-auto">
{`ON p.user_id = u.id`}
          </pre>
          <p className="mt-3">
            Meaning: “Only join rows where the user’s ID (
            <code className="bg-gray-200 px-1 rounded">u.id</code>) matches the{" "}
            <code className="bg-gray-200 px-1 rounded">user_id</code> in the
            purchases table.”
          </p>
        </>
      ),
    },
    {
      title: "🧾 Final Result",
      content: (
        <>
          <table className="w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-2">full_name</th>
                <th className="p-2">email</th>
                <th className="p-2">product_name</th>
                <th className="p-2">price</th>
                <th className="p-2">quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Alice Johnson</td>
                <td className="p-2">alice@email.com</td>
                <td className="p-2">Shoes</td>
                <td className="p-2">50.00</td>
                <td className="p-2">2</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Alice Johnson</td>
                <td className="p-2">alice@email.com</td>
                <td className="p-2">Hat</td>
                <td className="p-2">20.00</td>
                <td className="p-2">1</td>
              </tr>
              <tr>
                <td className="p-2">Bob Smith</td>
                <td className="p-2">bob@email.com</td>
                <td className="p-2">Jacket</td>
                <td className="p-2">100.00</td>
                <td className="p-2">1</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-4 text-gray-700">
            Each purchase now includes the user’s details — that’s the power of
            a <strong>JOIN</strong>.
          </p>
        </>
      ),
    },
    {
      title: "🧩 Summary (in simple terms)",
      content: (
        <table className="w-full text-sm border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2">SQL Part</th>
              <th className="p-2">Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">FROM users u</td>
              <td className="p-2">Start with the users table</td>
            </tr>
            <tr>
              <td className="p-2">JOIN purchases p</td>
              <td className="p-2">Combine it with the purchases table</td>
            </tr>
            <tr>
              <td className="p-2">ON p.user_id = u.id</td>
              <td className="p-2">Match rows where user IDs are the same</td>
            </tr>
            <tr>
              <td className="p-2">SELECT ...</td>
              <td className="p-2">Pick the columns you want to show</td>
            </tr>
          </tbody>
        </table>
      ),
    },
  ];

  // ===============================
  // COMPONENT RENDER
  // ===============================
  return (
   <div className="w-full min-h-screen p-6 bg-gray-50">

      <h1 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
        <FiDatabase className="text-blue-600" /> SQL JOIN Visual Tutorial
      </h1>

      {/* Progress Bar */}
      <div className="flex justify-center mb-6 gap-2">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-8 rounded-full transition-all duration-300 ${
              i <= step ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-3">
              {steps[step]?.title ?? ""}
            </h2>
            <div className="text-gray-700">{steps[step]?.content ?? ""}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className={`flex items-center gap-1 px-4 py-2 rounded-md border transition-all ${
            step === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-gray-100 text-gray-700 border-gray-300"
          }`}
        >
          <FiArrowLeft /> Previous
        </button>

        <button
          onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
          disabled={step === steps.length - 1}
          className={`flex items-center gap-1 px-4 py-2 rounded-md border transition-all ${
            step === steps.length - 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white border-blue-700"
          }`}
        >
          Next <FiArrowRight />
        </button>
      </div>
        <div className="mt-10">
        <SqlConcept/>
        </div>
        <div className="mt-10">
        <DbJoins2/>
        </div>
        <div className="mt-10">
        <DbJoins3/>
        </div>
        <div className="mt-10">
        <DbJoins4/>
        </div>

       
    </div>
  );
}
