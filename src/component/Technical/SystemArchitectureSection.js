import React, { useState } from 'react';
import { FaServer, FaDatabase, FaDesktop, FaCodeBranch, FaLink } from 'react-icons/fa';

const SystemArchitectureSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="my-4">
      {/* Toggle Button with Icon */}
      <button
        className="flex items-center text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
        onClick={toggleVisibility}
      >
        <FaCodeBranch className="mr-2" /> System Architecture
      </button>

      {/* Card Section */}
      {isVisible && (
        <div className="p-6 border border-gray-300 rounded-lg shadow-lg mt-4 bg-white">
          {/* Header with Icon */}
          <div className="flex items-center mb-4">
            <FaServer className="text-3xl text-blue-500 mr-3" />
            <h2 className="text-xl font-semibold">System Architecture: How FE, BE, API & Database Interact</h2>
          </div>

          {/* Explanation Section */}
          <p className="text-gray-700 mb-4">
            The frontend (FE), backend (BE), and database work together to provide a seamless user experience. The API serves as the bridge between the frontend and backend, enabling them to exchange data in real-time. The backend processes requests and interacts with the database to fetch or store information.
          </p>

          {/* Architecture Flowchart */}
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">System Flow</h3>
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-center">
                <FaDesktop className="text-4xl text-blue-500 mb-2" />
                <p className="text-gray-700 font-semibold">Frontend (FE)</p>
                <p className="text-gray-600 text-center">User Interface: Interacts with the user. Sends data to the backend through API calls.</p>
              </div>

              <FaLink className="text-4xl text-blue-500 mx-4" />

              <div className="flex flex-col items-center">
                <FaServer className="text-4xl text-blue-500 mb-2" />
                <p className="text-gray-700 font-semibold">Backend (BE)</p>
                <p className="text-gray-600 text-center">Processes user requests. Validates, manipulates, and returns data. Communicates with the database.</p>
              </div>

              <FaLink className="text-4xl text-blue-500 mx-4" />

              <div className="flex flex-col items-center">
                <FaDatabase className="text-4xl text-blue-500 mb-2" />
                <p className="text-gray-700 font-semibold">Database</p>
                <p className="text-gray-600 text-center">Stores and retrieves data. Backend interacts with it to fetch or store information needed by the frontend.</p>
              </div>
            </div>
          </div>

          {/* What Makes Communication Possible */}
          <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">What Makes Communication Possible?</h3>
            <p className="text-gray-700">
              The API (Application Programming Interface) acts as the intermediary that makes communication possible between the frontend, backend, and database. Here's how:
            </p>
            <ul className="list-disc pl-5 text-gray-700 mt-3">
              <li><strong>API (Application Programming Interface)</strong>: Defines the protocols and tools for frontend and backend to communicate.</li>
              <li><strong>HTTP Requests</strong>: Frontend sends HTTP requests (GET, POST, PUT, DELETE) to the backend through the API.</li>
              <li><strong>Data Formats (JSON, XML)</strong>: API responds in standardized data formats like JSON or XML, allowing data exchange.</li>
              <li><strong>Authentication & Authorization</strong>: The backend ensures secure communication through tokens, sessions, or OAuth, validating API requests from the frontend.</li>
              <li><strong>Backend Logic</strong>: The backend processes API requests, manipulates data, and communicates with the database to store or retrieve data.</li>
              <li><strong>Database Queries</strong>: The backend communicates with the database using queries (SQL or NoSQL) to fetch or store data based on frontend requests.</li>
            </ul>
          </div>

          {/* Q&A Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Have Questions?</h3>
            <p className="text-gray-700">Feel free to ask any questions you have about the system architecture!</p>
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
    </div>
  );
};

export default SystemArchitectureSection;
