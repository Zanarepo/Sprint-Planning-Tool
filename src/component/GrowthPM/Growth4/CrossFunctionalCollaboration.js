import React from 'react';
import { FaUsers} from 'react-icons/fa';

const CrossFunctionalCollaboration = () => {
 
 
 
    return (
    <div className="p-1 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-2">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            Cross-Functional Collaboration for Growth PMs
          </h1>
          <p className="mt-2 text-lg text-gray-600 text-center">
            (Designed for students learning growth PM principles)
          </p>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Objective</h2>
          <p className="text-gray-700">
            Teach you how Growth PMs collaborate across teams to execute growth strategies, emphasizing why cross-functional work matters and how to do it effectively.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Content Breakdown</h2>
          <ol className="list-decimal ml-6 space-y-4">
            <li>
              <div className="flex items-start">
                <FaUsers className="text-2xl text-blue-500 mr-3 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Why Cross-Functional Collaboration Matters
                  </h3>
                  <ul className="list-disc ml-6 text-gray-700 mt-2 space-y-1">
                    <li>
                      <strong>Growth is a team sport:</strong> No single team owns growth—success requires input from marketing (acquisition), engineering (implementation), design (UX), and data (insights).
                    </li>
                    <li>
                      <strong>Break down silos:</strong> Misalignment between teams slows progress (e.g., marketing campaigns failing if engineering can’t build features on time).
                    </li>
                    <li>
                      <strong>Holistic impact:</strong> Growth PMs balance user needs, technical feasibility, and business goals across teams.
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ol>
        </section>

        <footer className="mt-8 text-center">
          <p className="text-gray-600">
            Remember, effective cross-functional collaboration is key to achieving growth. Work closely with every team, share insights, and break down silos for holistic success.
          </p>
        </footer>
      </div>
   
    </div>
  );
};

export default CrossFunctionalCollaboration;
