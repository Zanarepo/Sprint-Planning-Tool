import React from 'react';
import { FaBullseye, FaSyncAlt, FaComments, FaHandshake, FaTools } from 'react-icons/fa';

const CollaborationStrategies = () => {
  return (
    <div className="w-full min-h-screen p-8 bg-gray-100">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <FaTools className="mr-2 text-teal-500" /> Strategies for Effective Collaboration
        </h1>
        
        {/* Shared Goals */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center">
            <FaBullseye className="mr-2 text-blue-500" /> Shared Goals
          </h2>
          <p className="text-gray-700">
            Align all teams on north star metrics (e.g., MAU, conversion rate). For example, if the goal is to improve activation:
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-700">
            <li>
              <strong>Design:</strong> Simplify the onboarding process.
            </li>
            <li>
              <strong>Engineering:</strong> Reduce load times.
            </li>
            <li>
              <strong>Marketing:</strong> Target high-intent users.
            </li>
          </ul>
        </section>

        {/* Regular Syncs */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center">
            <FaSyncAlt className="mr-2 text-green-500" /> Regular Syncs
          </h2>
          <p className="text-gray-700">
            Maintain alignment and accountability with regular meetings:
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-700">
            <li>
              Weekly standups with engineering and design teams.
            </li>
            <li>
              Biweekly strategy sessions with marketing and data teams.
            </li>
          </ul>
        </section>

        {/* Clear Communication */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center">
            <FaComments className="mr-2 text-purple-500" /> Clear Communication
          </h2>
          <p className="text-gray-700">
            Use tools and language that promote understanding across teams:
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-700">
            <li>
              Write detailed user stories to explain experiment goals to engineers.
            </li>
            <li>
              Share data visualizations, such as funnel drop-offs, to justify design changes.
            </li>
          </ul>
        </section>

        {/* Conflict Resolution */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center">
            <FaHandshake className="mr-2 text-red-500" /> Conflict Resolution
          </h2>
          <p className="text-gray-700">
            Address disagreements by negotiating and planning effective rollouts. For example:
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-700">
            <li>
              If marketing pushes for a feature launch before engineering is ready, negotiate a phased rollout or launch an MVP.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default CollaborationStrategies;
