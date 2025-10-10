import React from "react";
import { FiDatabase, FiLink, FiPlayCircle, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

export default function SupportTicketJoinTutorial() {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-4 text-center text-blue-400">
          🎫 SQL Lesson: Joining 3 Tables — Users, Tickets & Agents
        </h1>
        <p className="text-gray-300 text-lg text-center mb-12">
          Learn how to connect users, support tickets, and assigned agents to analyze customer support performance.
        </p>

        {/* Step 1: Tables */}
        <motion.div
          className="bg-gray-800 p-6 rounded-2xl shadow-lg mb-12"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-4 text-xl font-semibold text-blue-300">
            <FiDatabase /> Step 1: Define the Tables
          </div>
          <p className="text-gray-300 mb-6">
            We’ll work with <b>users</b> (customers), <b>support_tickets</b> (issues), and <b>support_agents</b> (staff who handle them).
          </p>

          <div className="grid md:grid-cols-3 gap-4 text-sm">
            {/* Users */}
            <div className="bg-gray-700 p-4 rounded-xl">
              <h3 className="font-semibold text-yellow-400 mb-2">users</h3>
              <table className="w-full text-left border border-gray-600">
                <thead>
                  <tr className="bg-gray-600">
                    <th className="p-2">id</th>
                    <th className="p-2">full_name</th>
                    <th className="p-2">email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">1</td>
                    <td className="p-2">Alice Johnson</td>
                    <td className="p-2">alice@email.com</td>
                  </tr>
                  <tr>
                    <td className="p-2">2</td>
                    <td className="p-2">Bob Smith</td>
                    <td className="p-2">bob@email.com</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Support Tickets */}
            <div className="bg-gray-700 p-4 rounded-xl">
              <h3 className="font-semibold text-yellow-400 mb-2">support_tickets</h3>
              <table className="w-full text-left border border-gray-600">
                <thead>
                  <tr className="bg-gray-600">
                    <th className="p-2">id</th>
                    <th className="p-2">user_id</th>
                    <th className="p-2">agent_id</th>
                    <th className="p-2">subject</th>
                    <th className="p-2">status</th>
                    <th className="p-2">priority</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">1</td>
                    <td className="p-2">1</td>
                    <td className="p-2">1</td>
                    <td className="p-2">Login Issue</td>
                    <td className="p-2">Open</td>
                    <td className="p-2">High</td>
                  </tr>
                  <tr>
                    <td className="p-2">2</td>
                    <td className="p-2">2</td>
                    <td className="p-2">2</td>
                    <td className="p-2">Billing Error</td>
                    <td className="p-2">Closed</td>
                    <td className="p-2">Medium</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Agents */}
            <div className="bg-gray-700 p-4 rounded-xl">
              <h3 className="font-semibold text-yellow-400 mb-2">support_agents</h3>
              <table className="w-full text-left border border-gray-600">
                <thead>
                  <tr className="bg-gray-600">
                    <th className="p-2">id</th>
                    <th className="p-2">agent_name</th>
                    <th className="p-2">department</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">1</td>
                    <td className="p-2">John Doe</td>
                    <td className="p-2">Technical Support</td>
                  </tr>
                  <tr>
                    <td className="p-2">2</td>
                    <td className="p-2">Sarah Lee</td>
                    <td className="p-2">Billing</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Step 2: Query */}
        <motion.div
          className="bg-gray-800 p-6 rounded-2xl shadow-lg mb-12"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-4 text-xl font-semibold text-blue-300">
            <FiLink /> Step 2: The Query
          </div>
          <pre className="bg-gray-950 text-green-400 p-4 rounded-xl text-sm overflow-x-auto">
{`SELECT
  u.full_name AS customer_name,
  u.email AS customer_email,
  t.subject AS ticket_subject,
  t.status AS ticket_status,
  t.priority AS ticket_priority,
  a.agent_name AS assigned_agent,
  a.department AS agent_department,
  t.created_at AS date_created
FROM
  users u
JOIN
  support_tickets t ON u.id = t.user_id
JOIN
  support_agents a ON t.agent_id = a.id
ORDER BY
  u.full_name, t.created_at DESC;`}
          </pre>
        </motion.div>

        {/* Step 3: Explanation */}
        <motion.div
          className="bg-gray-800 p-6 rounded-2xl shadow-lg mb-12"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-4 text-xl font-semibold text-blue-300">
            <FiPlayCircle /> Step 3: Line-by-Line Explanation
          </div>
          <ul className="space-y-3 text-gray-300">
            <li>
              <b>FROM users u:</b> Start with the <b>users</b> table — our customers.
            </li>
            <li>
              <b>JOIN support_tickets t ON u.id = t.user_id:</b> Match each customer to their support tickets.
            </li>
            <li>
              <b>JOIN support_agents a ON t.agent_id = a.id:</b> Add the agent assigned to handle each ticket.
            </li>
            <li>
              <b>SELECT ... AS ...:</b> We rename columns (e.g., <b>u.full_name</b> → <b>customer_name</b>) for readability.
            </li>
            <li>
              <b>ORDER BY u.full_name, t.created_at DESC:</b> Sort results by customer name and newest tickets first.
            </li>
          </ul>
        </motion.div>

        {/* Step 4: Sample Result */}
        <motion.div
          className="bg-gray-800 p-6 rounded-2xl shadow-lg"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-4 text-xl font-semibold text-blue-300">
            <FiArrowRight /> Step 4: Result Table
          </div>

          <table className="w-full text-left border border-gray-700 text-sm">
            <thead>
              <tr className="bg-gray-700 text-gray-200">
                <th className="p-2">customer_name</th>
                <th className="p-2">customer_email</th>
                <th className="p-2">ticket_subject</th>
                <th className="p-2">ticket_status</th>
                <th className="p-2">ticket_priority</th>
                <th className="p-2">assigned_agent</th>
                <th className="p-2">agent_department</th>
                <th className="p-2">date_created</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-700">
                <td className="p-2">Alice Johnson</td>
                <td className="p-2">alice@email.com</td>
                <td className="p-2">Login Issue</td>
                <td className="p-2">Open</td>
                <td className="p-2">High</td>
                <td className="p-2">John Doe</td>
                <td className="p-2">Technical Support</td>
                <td className="p-2">2025-10-09</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-2">Bob Smith</td>
                <td className="p-2">bob@email.com</td>
                <td className="p-2">Billing Error</td>
                <td className="p-2">Closed</td>
                <td className="p-2">Medium</td>
                <td className="p-2">Sarah Lee</td>
                <td className="p-2">Billing</td>
                <td className="p-2">2025-10-08</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}
