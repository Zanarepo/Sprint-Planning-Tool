import React from 'react';
import { 
  FaTasks, 
  FaClipboardList, 
  FaCalendarAlt, 
  FaSlack, 
  FaBook, 
  FaVideo, 
  FaUserFriends, 
  FaBullseye, 
  FaAngleRight 
} from 'react-icons/fa';

const ToolsFrameworks = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Tools & Frameworks</h1>
      </header>
      
      {/* Section: Tools & Frameworks */}
      <section className="mb-12 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Project Management</h2>
        <ul className="list-disc ml-6 space-y-1 text-gray-700">
          <li>
            <FaTasks className="inline-block mr-2 text-blue-500" />
            <strong>Jira:</strong> Track experiments.
          </li>
          <li>
            <FaClipboardList className="inline-block mr-2 text-green-500" />
            <strong>Trello:</strong> Roadmap visibility.
          </li>
          <li>
            <FaCalendarAlt className="inline-block mr-2 text-purple-500" />
            <strong>Asana:</strong> Campaign timelines.
          </li>
        </ul>

        <h2 className="text-3xl font-semibold text-gray-800 mt-8 mb-4">Communication</h2>
        <ul className="list-disc ml-6 space-y-1 text-gray-700">
          <li>
            <FaSlack className="inline-block mr-2 text-indigo-500" />
            <strong>Slack:</strong> Daily updates.
          </li>
          <li>
            <FaBook className="inline-block mr-2 text-yellow-500" />
            <strong>Notion:</strong> Shared documentation.
          </li>
          <li>
            <FaVideo className="inline-block mr-2 text-red-500" />
            <strong>Loom:</strong> Async video updates.
          </li>
        </ul>

        <h2 className="text-3xl font-semibold text-gray-800 mt-8 mb-4">Alignment Frameworks</h2>
        <ul className="list-disc ml-6 space-y-1 text-gray-700">
          <li>
            <FaUserFriends className="inline-block mr-2 text-teal-500" />
            <strong>RACI Matrix:</strong> Clarify who’s Responsible, Accountable, Consulted, and Informed for each experiment.
          </li>
          <li>
            <FaBullseye className="inline-block mr-2 text-orange-500" />
            <strong>OKRs:</strong> Tie team objectives to growth metrics (e.g., “Improve sign-up conversion by 20% in Q3”).
          </li>
        </ul>
      </section>

      {/* Section: Real-World Example */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Real-World Example: Dropbox Referral Program</h2>
        
        <div className="space-y-4 text-gray-700">
          <p className="flex items-center">
            <FaAngleRight className="mr-2 text-gray-600" />
            <strong>Collaboration in Action:</strong> A Growth PM identified referrals as a lever for virality.
          </p>
          <p className="flex items-center">
            <FaAngleRight className="mr-2 text-gray-600" />
            <strong>Engineering:</strong> Built the “free storage for referrals” feature.
          </p>
          <p className="flex items-center">
            <FaAngleRight className="mr-2 text-gray-600" />
            <strong>Design:</strong> Created a simple, incentivized sharing interface.
          </p>
          <p className="flex items-center">
            <FaAngleRight className="mr-2 text-gray-600" />
            <strong>Marketing:</strong> Promoted the program via email campaigns.
          </p>
          <p className="flex items-center">
            <FaAngleRight className="mr-2 text-gray-600" />
            <strong>Data:</strong> Tracked referral rates and LTV of acquired users.
          </p>
          <p className="flex items-center">
            <FaAngleRight className="mr-2 text-gray-600" />
            <strong>Result:</strong> Achieved an astounding 3900% user growth in 15 months.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ToolsFrameworks;
