import React, { useState } from 'react';
import { FaServer, FaExchangeAlt, FaDatabase, FaArrowRight } from 'react-icons/fa';

const BackendSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="my-4">
      <button
        className="flex items-center text-xl font-bold text-green-600 hover:text-green-800 transition-colors"
        onClick={toggleVisibility}
      >
        <FaServer className="mr-2" /> Backend
      </button>

      {isVisible && (
        <div className="p-6 border border-gray-300 rounded-lg shadow-lg mt-4 bg-white">
          <div className="flex items-center mb-4">
            <FaServer className="text-3xl text-green-500 mr-3" />
            <h2 className="text-xl font-semibold">What is Backend?</h2>
          </div>

          <p className="text-gray-700 mb-4">
            The backend refers to the server-side part of a web application that handles data processing, business logic, and interactions with the database. It acts as the middle layer between the frontend and the database, ensuring smooth communication between them.
          </p>

          {/* Example Section */}
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <p className="text-gray-700">
              When a user submits a login form on the frontend, the backend receives the data, checks it against the user data stored in the database, and sends a response (success or failure) back to the frontend for display.
            </p>
          </div>

          {/* How Backend Interacts with Frontend and Database */}
          <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">How Backend Interacts with Frontend and Database</h3>
            <p className="text-gray-700">
              The backend processes requests from the frontend and interacts with the database to either retrieve or modify data. Here’s how they interact:
            </p>
            <ul className="list-disc pl-5 mt-2 text-gray-700">
              <li>
                <FaArrowRight className="inline mr-2 text-green-500" />
                The frontend sends requests (e.g., login form submission) to the backend via APIs.
              </li>
              <li>
                <FaArrowRight className="inline mr-2 text-green-500" />
                The backend queries the database to validate user data or fetch relevant information.
              </li>
              <li>
                <FaArrowRight className="inline mr-2 text-green-500" />
                After processing, the backend sends data back to the frontend, such as success messages, user data, or error responses.
              </li>
            </ul>
          </div>

          {/* Key Technologies Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Key Technologies</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li><strong>Node.js</strong>: JavaScript runtime for server-side programming.</li>
              <li><strong>Express.js</strong>: Web framework for Node.js that simplifies routing and API management.</li>
              <li><strong>Databases</strong>: PostgreSQL, MySQL, or MongoDB are used to store and retrieve data.</li>
            </ul>
          </div>

          {/* Database Interaction */}
          <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">How Backend Interacts with Databases</h3>
            <p className="text-gray-700">
              The backend is responsible for querying and updating the database. It ensures that the frontend gets the correct data (e.g., fetching a user's profile information) and can make updates (e.g., modifying a user's password).
            </p>
            <div className="flex items-center mt-3">
              <FaDatabase className="text-3xl text-gray-500 mr-2" />
              <p className="text-gray-700">The backend communicates with databases using queries (e.g., SQL for PostgreSQL or MongoDB queries). It retrieves, updates, and deletes data based on user interactions from the frontend.</p>
            </div>
          </div>

          {/* Importance for Product Managers */}
          <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Why Understanding Backend is Important for Product Managers</h3>
            <p className="text-gray-700">
              As a Product Manager, understanding the backend is crucial for several reasons:
            </p>
            <ul className="list-disc pl-5 mt-2 text-gray-700">
              <li>
                <FaExchangeAlt className="inline mr-2 text-green-500" />
                <strong>Communication with Developers</strong>: It enables you to communicate effectively with the backend developers, ensuring you can clearly articulate product needs and make informed decisions about technical limitations or possibilities.
              </li>
              <li>
                <FaExchangeAlt className="inline mr-2 text-green-500" />
                <strong>Understanding Technical Constraints</strong>: Knowing how the backend handles requests, data retrieval, and processing will help you better understand the challenges and constraints the development team faces, allowing you to manage expectations.
              </li>
              <li>
                <FaExchangeAlt className="inline mr-2 text-green-500" />
                <strong>Better Decision Making</strong>: Understanding backend processes enables you to prioritize features based on technical feasibility and allows you to make data-driven decisions about product features, scalability, and performance.
              </li>
              <li>
                <FaExchangeAlt className="inline mr-2 text-green-500" />
                <strong>Optimizing Product Roadmap</strong>: With backend knowledge, you can better plan and schedule the product roadmap by considering dependencies and the time it will take for the backend to implement certain features or optimizations.
              </li>
            </ul>
          </div>

          {/* Q&A Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Have Questions?</h3>
            <p className="text-gray-700">Feel free to ask any questions you have about backend development!</p>
            <textarea
              className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Type your question here..."
            ></textarea>
            <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Submit Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackendSection;
