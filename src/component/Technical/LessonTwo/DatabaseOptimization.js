import React from 'react';

import { FiSettings, FiDatabase, FiActivity, FiZap } from 'react-icons/fi';

const DatabaseOptimization = () => {
  

  return (
    <div className="container mx-auto p-6" id="optimization-content">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-600">Database Optimization & Scalability</h1>
        <p className="text-lg mt-2 text-gray-600">Ensuring efficient data handling and seamless app performance.</p>
      </div>

      {/* Optimization Section */}
      <section>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Optimization Concepts</h2>

        {/* Example Use Case */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-800">1. Example Use Case</h3>
          <p className="mt-4 text-lg text-gray-600">
            Imagine a scenario where a user is playing a song, and the app also needs to load recommendations based on their listening history. Without optimization, fetching this data might slow down the app due to repetitive computations. Here's how optimization helps:
          </p>
          <ul className="mt-6 space-y-4 text-lg text-gray-600">
            <li className="flex items-center">
              <FiZap className="mr-3 text-green-600" />
              <strong>Query Caching:</strong> Stores results of previous queries to avoid recalculating recommendations every time.
            </li>
            <li className="flex items-center">
              <FiDatabase className="mr-3 text-green-600" />
              <strong>Sharding:</strong> Divides the database into smaller parts to reduce query time, e.g., storing user and song data in separate shards.
            </li>
            <li className="flex items-center">
              <FiSettings className="mr-3 text-green-600" />
              <strong>Pre-computed Data:</strong> Stores pre-calculated results (e.g., song popularity) for instant retrieval.
            </li>
          </ul>
        </div>

        {/* Benefits Section */}
        <div className="mb-12 bg-gray-100 p-6 rounded-md shadow-md">
          <h3 className="text-2xl font-semibold text-green-600">Benefits of Optimization</h3>
          <ul className="mt-4 space-y-4 text-lg text-gray-600">
            <li className="flex items-center">
              <FiActivity className="mr-3 text-green-600" />
              <strong>Improved Performance:</strong> Faster data retrieval and app responsiveness.
            </li>
            <li className="flex items-center">
              <FiZap className="mr-3 text-green-600" />
              <strong>Scalability:</strong> Supports growth without slowing down, ensuring optimal performance as data grows.
            </li>
          </ul>
        </div>

        {/* Illustration Section */}
        <div className="mb-12 text-center">
          <img
            src="images/optimization-illustration.png"
            alt="Optimization Illustration"
            className="mx-auto rounded-md shadow-lg w-2/3 md:w-1/2"
          />
        </div>
      </section>
      {/* Importance Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800">Why It’s Important for TPMs</h2>
        <p className="text-lg mt-4 text-gray-600">
          As a Technical Product Manager (TPM), understanding database optimization concepts is crucial for ensuring your product is scalable, efficient, and delivers a seamless user experience. These concepts help you:
        </p>
        <ul className="mt-6 space-y-4 text-lg text-gray-600">
          <li className="flex items-center">
            <FiActivity className="mr-3 text-green-600" />
            <strong>Plan for Scalability:</strong> Ensure the product can handle increasing users and data without performance degradation.
          </li>
          <li className="flex items-center">
            <FiZap className="mr-3 text-green-600" />
            <strong>Improve User Experience:</strong> Faster searches, quicker load times, and efficient data handling lead to smoother interactions.
          </li>
          <li className="flex items-center">
            <FiSettings className="mr-3 text-green-600" />
            <strong>Collaborate with Engineers:</strong> Make informed decisions about trade-offs, performance, and future system enhancements.
          </li>
        </ul>
      </section>

      {/* Learning Importance Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800">Why Learning These Concepts is Important for a TPM</h2>
        <p className="text-lg mt-4 text-gray-600">
          As a Technical Product Manager (TPM), understanding database normalization, indexing, and optimization is essential for several reasons:
        </p>
        <ul className="mt-6 space-y-4 text-lg text-gray-600">
          <li className="flex items-center">
            <FiActivity className="mr-3 text-green-600" />
            <strong>Plan for Scalability:</strong> By learning how to structure and optimize databases, you ensure that the product can handle an increasing volume of users and data. Working closely with engineers, you can design systems that grow with the user base.
          </li>
          <li className="flex items-center">
            <FiZap className="mr-3 text-green-600" />
            <strong>Improve User Experience:</strong> Understanding these database concepts helps you prioritize features that enhance the user experience. Faster searches, quicker load times, and efficient data management all contribute to smoother interactions with the app.
          </li>
          <li className="flex items-center">
            <FiSettings className="mr-3 text-green-600" />
            <strong>Collaborate with Engineers:</strong> A solid grasp of database concepts enables better communication with engineers, allowing you to make informed decisions about trade-offs, performance, and future system changes.
          </li>
          <li className="flex items-center">
            <FiDatabase className="mr-3 text-green-600" />
            <strong>Make Better Decisions:</strong> With knowledge of how databases work, you can make decisions that improve the app's overall performance. For example, optimizing the search functionality or enhancing how data is structured will positively impact user satisfaction.
          </li>
        </ul>
      </section>

    </div>
  );
};

export default DatabaseOptimization;