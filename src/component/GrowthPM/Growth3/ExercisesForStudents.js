import React from 'react';
import {FaBrain, FaComments } from 'react-icons/fa';

const ExercisesForStudents = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 flex justify-center items-center">
          Class  Activity
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Engage in hands-on activities to boost your understanding of viral growth and community building.
        </p>
      </header>

      {/* Section A: Workshop Activity */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaBrain className="text-3xl text-blue-500 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-800">
            A. Workshop Activity: Design a Viral Loop
          </h2>
        </div>
        <p className="text-gray-700 mb-4">
          <strong>Task:</strong> Pick a product (e.g., fitness app, e-commerce site) and design a viral feature.
        </p>
        <div className="ml-6 space-y-3">
          <p className="text-gray-700">
            <strong>Steps:</strong>
          </p>
          <ul className="list-disc text-gray-700 ml-6 space-y-1">
            <li>
              <strong>Identify a key user action:</strong> For example, completing a workout.
            </li>
            <li>
              <strong>Create a sharing trigger:</strong> For instance, “Share your workout to invite friends.”
            </li>
            <li>
              <strong>Define incentives:</strong> For example, “Unlock a free workout plan for 3 invites.”
            </li>
            <li>
              <strong>Map the viral loop:</strong> Draw a flowchart outlining the user journey and sharing process.
            </li>
          </ul>
        </div>
      </section>

      {/* Section B: Case Study Analysis */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaComments className="text-3xl text-green-500 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-800">
            B. Case Study Analysis
          </h2>
        </div>
        <p className="text-gray-700 mb-4">
          <strong>Example:</strong> Analyze how Discord grew through community-driven network effects.
        </p>
        <div className="ml-6 space-y-3">
          <p className="text-gray-700">
            <strong>Questions to Consider:</strong>
          </p>
          <ul className="list-disc text-gray-700 ml-6 space-y-1">
            <li>
              What features encouraged users to invite others?
            </li>
            <li>
              How did servers and roles create value as the user base grew?
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ExercisesForStudents;
