import React, { useState } from 'react';
import { FaLaptopCode, FaWindowMaximize, FaUsers, FaChartLine, FaDatabase } from 'react-icons/fa';

const FrontendSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="my-4">
      {/* Toggle Button with Icon */}
      <button
        className="flex items-center text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
        onClick={toggleVisibility}
      >
        <FaLaptopCode className="mr-2" /> Frontend
      </button>

      {/* Card Section */}
      {isVisible && (
        <div className="p-6 border border-gray-300 rounded-lg shadow-lg mt-4 bg-white">
          {/* Header with Icon */}
          <div className="flex items-center mb-4">
            <FaWindowMaximize className="text-3xl text-blue-500 mr-3" />
            <h2 className="text-xl font-semibold">What is Frontend?</h2>
          </div>

          {/* Explanation Section */}
          <p className="text-gray-700 mb-4">
            Frontend refers to the visual and interactive part of a web application, designed to provide users with an intuitive and seamless experience.
          </p>

          {/* Product Manager Use Case */}
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Product Management Use Case</h3>
            <p className="text-gray-700">
              As a product manager, you need to ensure that the frontend aligns with your product goals. For example, if you're building a booking platform, the frontend should be user-friendly and enable quick and easy bookings. This will help reduce friction and improve user satisfaction.
            </p>
            <div className="mt-3 flex justify-between items-center">
              <div className="flex items-center">
                <FaUsers className="text-2xl text-blue-500 mr-2" />
                <p className="text-gray-700">User-centric design is key to success.</p>
              </div>
              <div className="flex items-center">
                <FaChartLine className="text-2xl text-blue-500 mr-2" />
                <p className="text-gray-700">Track conversion rates and user interactions to optimize UI.</p>
              </div>
            </div>
          </div>

          {/* Example Section */}
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <p className="text-gray-700">
              Consider a "Checkout Page" in an e-commerce platform. The frontend is where users input their shipping information, select payment methods, and finalize their purchases. Optimizing this process can greatly impact your sales and user satisfaction.
            </p>
          </div>

          {/* Key Technologies Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Key Technologies</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li><strong>HTML</strong>: Structure of the webpage.</li>
              <li><strong>CSS</strong>: Styling and layout of the webpage.</li>
              <li><strong>JavaScript</strong>: Adding interactivity to the webpage (e.g., form validation, dynamic content).</li>
              <li><strong>React, Vue.js, Angular</strong>: Frameworks to build dynamic and responsive web applications.</li>
            </ul>
          </div>

          {/* Interaction Example */}
          <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">How Frontend Interacts with Backend</h3>
            <p className="text-gray-700">
              The frontend communicates with the backend through APIs. For instance, when users log in, the frontend sends their credentials to the backend, which validates them and returns a response. This interaction supports real-time updates and personalized user experiences.
            </p>
          </div>

          {/* Frontend-Backend Relationship with Database */}
          <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Frontend, Backend, API, and Database Relationship</h3>
            <p className="text-gray-700">
              The frontend is the interface that users interact with, but the data displayed is fetched from the backend via API requests. The backend is responsible for processing data, interacting with the database, and providing the required information to the frontend. The API acts as a bridge between the frontend and backend, allowing data to flow between them.
            </p>

            <div className="mt-3 flex items-center">
              <FaDatabase className="text-2xl text-blue-500 mr-2" />
              <p className="text-gray-700">
                The backend communicates with the database to store and retrieve data, such as user profiles, orders, and other necessary information. The frontend sends requests via APIs, and the backend processes them, accessing the database when needed.
              </p>
            </div>
          </div>

          {/* Q&A Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Have Questions?</h3>
            <p className="text-gray-700">Feel free to ask any questions you have about frontend development!</p>
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

export default FrontendSection;
