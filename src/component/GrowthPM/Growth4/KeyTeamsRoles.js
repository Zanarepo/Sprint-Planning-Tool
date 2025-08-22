import React from 'react';
import { FaBullhorn, FaCogs, FaPaintBrush, FaDatabase } from 'react-icons/fa';

const teamsData = [
  {
    team: 'Marketing',
    role: 'Drives user acquisition, messaging, campaigns.',
    collaboration: 'Align on target audiences, campaign timing, and metrics (e.g., CAC). Share product updates for campaigns.',
    icon: <FaBullhorn className="text-blue-500 inline-block mr-2" />,
  },
  {
    team: 'Engineering',
    role: 'Builds and scales features, ensures technical health.',
    collaboration: 'Prioritize experiments, clarify requirements, and negotiate timelines. Advocate for growth-focused tech debt.',
    icon: <FaCogs className="text-green-500 inline-block mr-2" />,
  },
  {
    team: 'Design',
    role: 'Optimizes UX to reduce friction and improve conversion.',
    collaboration: 'Co-create user flows, A/B test UI changes, and validate prototypes with user feedback.',
    icon: <FaPaintBrush className="text-purple-500 inline-block mr-2" />,
  },
  {
    team: 'Data',
    role: 'Provides insights, tracks metrics, and analyzes experiments.',
    collaboration: 'Define KPIs, set up tracking, and interpret results. Collaborate on hypothesis generation.',
    icon: <FaDatabase className="text-yellow-500 inline-block mr-2" />,
  },
];

const KeyTeamsRoles = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <header className="p-6 bg-blue-600">
          <h1 className="text-3xl text-white font-bold">Key Teams & Their Roles</h1>
        </header>
        <div className="p-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-700">Team</th>
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-700">Role in Growth</th>
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-700">Growth PM’s Collaboration Focus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {teamsData.map((teamItem, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-800">
                    {teamItem.icon}
                    {teamItem.team}
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-gray-700">{teamItem.role}</td>
                  <td className="px-6 py-4 whitespace-normal text-gray-700">{teamItem.collaboration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KeyTeamsRoles;
