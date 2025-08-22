import React, { useState } from 'react';
import { FaDatabase, FaTable } from 'react-icons/fa';
import Database2 from './Database2'; // Assuming Database2 is in the same directory
import DatabaseSimulator from './DatabaseSimulator'; // Assuming DatabaseSimulator is in the same directory
//import PKFKSimulator from './PKFKSimulator'; // Assuming PKFKSimulator is in the same directory
import DatabaseSimulator2 from './DatabaseSimulator2'; // Assuming DatabaseSimulator is in the same directory
import Nosqldatabase from './Nosqldatabase'; // Assuming Nosqldatabase is in the same directory
import SQLTutorial from './SQLTutorial'; // Assuming SQLTutorial is in the same directory
import SQLForeignKeyTutorial from './SQLForeignKeyTutorial'; // Assuming SQLForeignKeyTutorial is in the same directory

const DatabaseSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="my-4">
      <button
        className="flex items-center text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
        onClick={toggleVisibility}
      >
        <FaDatabase className="mr-2" /> Understanding Databases
      </button>

      {isVisible && (
        <div className="p-6 border border-gray-300 rounded-lg shadow-lg mt-4 bg-white">
          <div className="flex items-center mb-4">
            <FaTable className="text-3xl text-blue-500 mr-3" />
            <h2 className="text-xl font-semibold">Why Databases Matter for Product Managers</h2>
          </div>

          <p className="text-gray-700 mb-4">
            As a product manager, understanding how databases work helps you make informed decisions on how to structure and manage data. Whether you're building a user management system or a product catalog, databases are at the core of handling and organizing large amounts of data efficiently. Having a solid grasp of databases ensures your product can scale, provide real-time insights, and deliver an excellent user experience.
          </p>

          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Example of Database in Action</h3>
            <p className="text-gray-700">
              Imagine you're managing a product that requires customer orders and user information. You need to store data such as user profiles and order histories. Databases allow you to store, update, and retrieve this data quickly and securely, making sure your product remains reliable and responsive.
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Key Concepts Every Product Manager Should Know</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li><strong>Table</strong>: Think of it as an organized sheet of data—like rows in a spreadsheet, each containing a record.</li>
              <li><strong>Row</strong>: A single unit of data, such as a user's profile.</li>
              <li><strong>Column</strong>: Each piece of data in a record, such as name, email, or order ID.</li>
              <li><strong>Primary Key (PK)</strong>: This uniquely identifies each record in a table, ensuring no two records are the same.</li>
              <li><strong>Foreign Key (FK)</strong>: A way to link two tables together, like relating a user to their orders.</li>
            </ul>
          </div>

          <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Example Database Structure</h3>
            <p className="text-gray-700 mb-4">
              Here’s a simplified example of how user data and their orders might be stored in two related tables, showing the role of primary and foreign keys:
            </p>

            <table className="w-full border-collapse border border-gray-300 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 p-2">User ID (PK)</th>
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 text-center">1</td>
                  <td className="border border-gray-300 p-2">John Doe</td>
                  <td className="border border-gray-300 p-2">john@example.com</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-center">2</td>
                  <td className="border border-gray-300 p-2">Jane Smith</td>
                  <td className="border border-gray-300 p-2">jane@example.com</td>
                </tr>
              </tbody>
            </table>

            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 p-2">Order ID (PK)</th>
                  <th className="border border-gray-300 p-2">Order Date</th>
                  <th className="border border-gray-300 p-2">User ID (FK)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 text-center">101</td>
                  <td className="border border-gray-300 p-2">2025-01-10</td>
                  <td className="border border-gray-300 p-2 text-center">1</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-center">102</td>
                  <td className="border border-gray-300 p-2">2025-01-11</td>
                  <td className="border border-gray-300 p-2 text-center">2</td>
                </tr>
              </tbody>
            </table>

            <p className="text-gray-700 mt-4">
              In this example, the "User ID" in the "Orders" table links to the "User ID" in the "Users" table. This is an example of how data is connected and ensures your product has consistent, retrievable data—whether it's for user profiles or order histories.
            </p>
          </div>

          {/* Q&A Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Have Questions?</h3>
            <p className="text-gray-700">Feel free to ask any questions about databases and how they can optimize product development!</p>
            <textarea
              className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your question here..."
            ></textarea>
            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Submit Question
            </button>
          </div>
        </div>
      )}
      <Database2 /> <br/>

      <DatabaseSimulator /> {/* Include the DatabaseSimulator component here */} <br/>

     {/* <PKFKSimulator />  Include the PKFKSimulator component here */} <br/>

      <DatabaseSimulator2 /> {/* Include the DatabaseSimulator component here */} <br/>

      <Nosqldatabase /> {/* Include the Nosqldatabase component here */} <br/>

      <SQLTutorial /> {/* Include the SQLTutorial component here */} <br/>

      <SQLForeignKeyTutorial/> 
    </div>
  );
};

export default DatabaseSection;
