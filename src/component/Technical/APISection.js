import React, { useState } from 'react';
import { FaNetworkWired, FaCodeBranch } from 'react-icons/fa';
import StatusCodes from './StatusCodes';
import MenteeDB from './MenteeDB'; // Import the MenteeDB component

const APISection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="my-4">
      <button
        className="flex items-center text-xl font-bold text-purple-600 hover:text-purple-800 transition-colors"
        onClick={toggleVisibility}
      >
        <FaNetworkWired className="mr-2" /> API
      </button>

      {isVisible && (
        <div className="p-6 border border-gray-300 rounded-lg shadow-lg mt-4 bg-white">
          <div className="flex items-center mb-4">
            <FaCodeBranch className="text-3xl text-purple-500 mr-3" />
            <h2 className="text-xl font-semibold">What is an API?</h2>
          </div>

          <p className="text-gray-700 mb-4">
            An API (Application Programming Interface) allows different software applications to communicate with each other. It defines the methods and data formats that applications can use to request and send data.
          </p>

          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Example Using the Mentee API</h3>
            <p className="text-gray-700 mb-4">
              Suppose you are building a platform for managing mentees. You might have an API endpoint for retrieving mentee details:
            </p>

            <div className="bg-black text-white p-4 rounded-md">
              <code>
                <strong>GET</strong> /mentees
              </code>
              <br />
              <span>Response:</span>
              <pre>
{`[ 
  { "id": 1, "username": "john_doe", "email": "john@example.com" },
  { "id": 2, "username": "jane_doe", "email": "jane@example.com" }
]`}
              </pre>
            </div>

            <p className="text-gray-700 mt-4">
              The API returns a list of mentees in JSON format. You can use this data in your frontend to display mentee profiles.
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Common API Requests</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>
                <strong>GET</strong>: Retrieve data from the server (e.g., fetch mentee details).
              </li>
              <li>
                <strong>POST</strong>: Send data to the server (e.g., add a new mentee).
              </li>
              <li>
                <strong>PUT</strong>: Update existing data on the server (e.g., edit mentee information).
              </li>
              <li>
                <strong>DELETE</strong>: Remove data from the server (e.g., delete a mentee).
              </li>
            </ul>
          </div>

          {/* API Endpoint Examples */}
          <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">API Endpoint Examples</h3>

            {/* GET endpoint */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2"><strong>GET</strong>api/mentees{`{id}`}</p>
              <p className="text-gray-700">Fetch a user's details by ID:</p>
              <div className="bg-black text-white p-4 rounded-md">
                <code>
                  <strong>GET</strong> http://localhost:5000/api/users/1
                </code>
                <br />
                <span>Response:</span>
                <pre>
{`{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "full_name": "John Doe",
}`}
                </pre>
              </div>
            </div>

            {/* POST endpoint */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2"><strong>POST</strong> api/mentees</p>
              <p className="text-gray-700">Create a new user:</p>
              <div className="bg-black text-white p-4 rounded-md">
                <code>
                  <strong>POST</strong> http://localhost:5000/api/mentees/
                </code>
                <br />
                <span>Request Body:</span>
                <pre>
{`{
  "username": "jane_doe",
  "email": "jane@example.com",
  "full_name": "Jane Doe",
}`}
                </pre>
                <span>Response:   </span> 
                <pre>
{`{
  "200 ok"
   "message": "Mentee created successfully",
    "menteeId": 12
}`}
                </pre>
              </div>
            </div>

            {/* PUT endpoint */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2"><strong>PUT</strong> /mentee/{`{id}`}</p>
              <p className="text-gray-700">Update a mentees details:</p>
              <div className="bg-black text-white p-4 rounded-md">
                <code>
                  <strong>PUT</strong> http://localhost:5000/api/mentees/1
                </code>
                <br />
                <span>Request Body:</span>
                <pre>
{`{
  "full_name": "Johnathan Doe",
  "role": "super_admin"
}`}
                </pre>
                <span>Response:</span>
                <pre>
{`{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "full_name": "Johnathan Doe",
  "role": "super_admin"
}`}
                </pre>
              </div>
            </div>

            {/* DELETE endpoint */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2"><strong>DELETE</strong> /mentee/{`{id}`}</p>
              <p className="text-gray-700">Delete a user by ID:</p>
              <div className="bg-black text-white p-4 rounded-md">
                <code>
                  <strong>DELETE</strong> http://localhost:5000/api/mentees/1
                </code>
                <br />
                <span>Response:</span>
                <pre>
{`{
  "message": "mentee successfully deleted."
}`}
                </pre>
              </div>
            </div>
          </div>

          <StatusCodes/>

          

          {/* Relationship Between API, BE, and FE */}
          <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Relationship Between API, Backend, and Frontend</h3>
            <p className="text-gray-700">
              APIs serve as the bridge between the frontend and the backend. Here's how they interact:
            </p>
            <ul className="list-disc pl-5 text-gray-700">
              <li>
                <strong>Frontend</strong> sends requests to the API, asking for data or triggering an action (e.g., displaying user data, submitting a form).
              </li>
              <li>
                <strong>Backend</strong> processes the request, retrieves or manipulates data in the database, and sends a response back to the API.
              </li>
              <li>
                The <strong>API</strong> defines how this communication happens by providing endpoints, authentication mechanisms, and data formats (usually JSON).
              </li>
            </ul>
          </div>

          {/* Why APIs are Crucial for Product Managers */}
          <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Why Understanding APIs is Crucial for Product Managers</h3>
            <p className="text-gray-700">
              As a Product Manager, understanding how APIs work is essential for several key reasons:
            </p>
            <ul className="list-disc pl-5 mt-2 text-gray-700">
              <li>
                <FaCodeBranch className="inline mr-2 text-purple-500" />
                <strong>Effective Communication with Technical Teams</strong>: A PM who understands APIs can communicate more effectively with both the frontend and backend developers, facilitating smoother collaboration and better alignment on features.
              </li>
              <li>
                <FaCodeBranch className="inline mr-2 text-purple-500" />
                <strong>Understanding System Limitations</strong>: APIs can have rate limits, security protocols, and constraints based on the backend. Understanding these aspects enables PMs to plan and prioritize features accordingly.
              </li>
              <li>
                <FaCodeBranch className="inline mr-2 text-purple-500" />
                <strong>Better Roadmap Planning</strong>: By knowing how APIs work, PMs can anticipate backend work needed for specific features and properly allocate resources, ensuring the roadmap is realistic and achievable.
              </li>
              <li>
                <FaCodeBranch className="inline mr-2 text-purple-500" />
                <strong>Improved Product Decisions</strong>: Understanding APIs gives PMs the ability to prioritize integrations, identify potential bottlenecks, and manage dependencies between frontend, backend, and third-party systems effectively.
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Have Questions?</h3>
            <p className="text-gray-700">Feel free to ask any questions you have about APIs!</p>
            <textarea
              className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Type your question here..."
            ></textarea>
            <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
              Submit Question
            </button>
          </div>
        </div>
      )}
        <MenteeDB/>
    </div>
  
  );
};

export default APISection;
