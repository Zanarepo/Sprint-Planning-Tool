import React from "react";
import { FiDatabase, FiLink, FiPlayCircle, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ThreeTableJoinTutorial() {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-gray-100 p-8">
      {/* Title */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-blue-400">
          🧩 SQL Lesson: Joining 3 Tables — Users, Bookings & Events
        </h1>
        <p className="text-gray-300 text-lg text-center mb-12">
          Learn how to connect three related tables to show event booking data with total costs per user.
        </p>

        {/* Step 1: Tables */}
        <motion.div
          className="bg-gray-800 p-6 rounded-2xl shadow-lg mb-12"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-4 text-xl font-semibold text-blue-300">
            <FiDatabase /> Step 1: Define the Tables
          </div>
          <p className="text-gray-300 mb-4">
            We’ll use three tables: <b>users</b>, <b>events</b>, and <b>bookings</b>. Each table plays a different role:
          </p>

          <div className="grid md:grid-cols-3 gap-4 text-sm">
            {/* Users Table */}
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
                  <tr>
                    <td className="p-2">3</td>
                    <td className="p-2">Clara Lee</td>
                    <td className="p-2">clara@email.com</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Events Table */}
            <div className="bg-gray-700 p-4 rounded-xl">
              <h3 className="font-semibold text-yellow-400 mb-2">events</h3>
              <table className="w-full text-left border border-gray-600">
                <thead>
                  <tr className="bg-gray-600">
                    <th className="p-2">id</th>
                    <th className="p-2">event_name</th>
                    <th className="p-2">ticket_price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">1</td>
                    <td className="p-2">Tech Summit</td>
                    <td className="p-2">$100</td>
                  </tr>
                  <tr>
                    <td className="p-2">2</td>
                    <td className="p-2">Music Fest</td>
                    <td className="p-2">$75</td>
                  </tr>
                  <tr>
                    <td className="p-2">3</td>
                    <td className="p-2">Art Expo</td>
                    <td className="p-2">$50</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bookings Table */}
            <div className="bg-gray-700 p-4 rounded-xl">
              <h3 className="font-semibold text-yellow-400 mb-2">bookings</h3>
              <table className="w-full text-left border border-gray-600">
                <thead>
                  <tr className="bg-gray-600">
                    <th className="p-2">id</th>
                    <th className="p-2">user_id</th>
                    <th className="p-2">event_id</th>
                    <th className="p-2">tickets_purchased</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">1</td>
                    <td className="p-2">1</td>
                    <td className="p-2">1</td>
                    <td className="p-2">2</td>
                  </tr>
                  <tr>
                    <td className="p-2">2</td>
                    <td className="p-2">1</td>
                    <td className="p-2">2</td>
                    <td className="p-2">1</td>
                  </tr>
                  <tr>
                    <td className="p-2">3</td>
                    <td className="p-2">2</td>
                    <td className="p-2">3</td>
                    <td className="p-2">3</td>
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
            <FiLink /> Step 2: The Query to Join All 3 Tables
          </div>
          <pre className="bg-gray-950 text-green-400 p-4 rounded-xl text-sm overflow-x-auto">
{`SELECT 
  u.full_name,
  u.email,
  e.event_name,
  e.event_date,
  b.tickets_purchased,
  (b.tickets_purchased * e.ticket_price) AS total_cost
FROM 
  users u
JOIN 
  bookings b ON b.user_id = u.id
JOIN 
  events e ON b.event_id = e.id
ORDER BY 
  u.full_name;`}
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
            <li><b>FROM users u:</b> Start with the <b>users</b> table (aliased as <b>u</b>).</li>
            <li><b>JOIN bookings b ON b.user_id = u.id:</b> Connect each user to their bookings.</li>
            <li><b>JOIN events e ON b.event_id = e.id:</b> Bring in event info for each booking.</li>
            <li><b>SELECT ...:</b> Choose what columns to show — user info, event info, and total cost.</li>
            <li><b>(b.tickets_purchased * e.ticket_price):</b> Calculate total cost per booking.</li>
            <li><b>ORDER BY u.full_name:</b> Sort results alphabetically by user.</li>
          </ul>
        </motion.div>

        {/* Step 4: Result Table */}
        <motion.div
          className="bg-gray-800 p-6 rounded-2xl shadow-lg"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-4 text-xl font-semibold text-blue-300">
            <FiArrowRight /> Step 4: Query Result
          </div>

          <table className="w-full text-left border border-gray-700 text-sm">
            <thead>
              <tr className="bg-gray-700 text-gray-200">
                <th className="p-2">full_name</th>
                <th className="p-2">email</th>
                <th className="p-2">event_name</th>
                <th className="p-2">tickets_purchased</th>
                <th className="p-2">total_cost</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-700">
                <td className="p-2">Alice Johnson</td>
                <td className="p-2">alice@email.com</td>
                <td className="p-2">Tech Summit</td>
                <td className="p-2">2</td>
                <td className="p-2">$200.00</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-2">Alice Johnson</td>
                <td className="p-2">alice@email.com</td>
                <td className="p-2">Music Fest</td>
                <td className="p-2">1</td>
                <td className="p-2">$75.00</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-2">Bob Smith</td>
                <td className="p-2">bob@email.com</td>
                <td className="p-2">Art Expo</td>
                <td className="p-2">3</td>
                <td className="p-2">$150.00</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-2">Clara Lee</td>
                <td className="p-2">clara@email.com</td>
                <td className="p-2">Music Fest</td>
                <td className="p-2">2</td>
                <td className="p-2">$150.00</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}

