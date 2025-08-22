import React from 'react';
import { FaCodeBranch, FaGitAlt, FaFolder, FaClone, FaLightbulb } from 'react-icons/fa'; // Importing icons

import GithubSimulation from './GithubSimulation'




const App = () => {
 

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-blue-600 text-white py-6 text-center">
        <h1 className="text-3xl font-bold">Understanding GitHub: A Simple Guide</h1>
        <p className="mt-2">Learn version control with ease!</p>
      </header>

      <main id="content" className="p-6">
        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <FaGitAlt className="text-blue-500" /> What is Git and GitHub?
          </h2>
          <p>
            <strong>Git</strong> is a version control system that tracks changes in your code, allowing collaboration and history tracking. <br />
            <strong>GitHub</strong> is a platform that hosts Git repositories online for sharing and collaboration.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <FaCodeBranch className="text-green-500" /> Key Concepts
          </h2>
          <ul className="list-disc pl-6">
            <li>Repository (Repo): A folder to store your project and its history.</li>
            <li>Branch: A separate version of your project for experimentation or features.</li>
            <li>Commit: A snapshot of changes you make in the code.</li>
            <li>Merge: Combining changes from one branch into another.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <FaFolder className="text-purple-500" /> Basic Workflow
          </h2>
          <ol className="list-decimal pl-6">
            <li>Create a Repository on GitHub.</li>
            <li>Clone the repository using <code>git clone</code>.</li>
            <li>Make changes to the files.</li>
            <li>Commit the changes with <code>git commit</code>.</li>
            <li>Push the changes using <code>git push</code>.</li>
          </ol>
        </section>

        {/* Section 4 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <FaClone className="text-yellow-500" /> Collaboration
          </h2>
          <ul className="list-disc pl-6">
            <li>Fork repositories to your account.</li>
            <li>Propose changes via Pull Requests.</li>
            <li>Review and merge contributions.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <FaLightbulb className="text-red-500" /> Why Understanding Git is Important for TPMs
          </h2>
          <ul className="list-disc pl-6">
            <li>Version Control: Tracks history and contributions.</li>
            <li>Collaboration: Enables teamwork across locations.</li>
            <li>Risk Mitigation: Prevents code-breaking issues.</li>
            <li>Project Management: Tracks progress effectively.</li>
          </ul>
        </section>
<GithubSimulation/>
        {/* Download PDF Button */}
        

        <footer className="text-center text-sm text-gray-600 mt-10">
          <p>Practice makes perfect! Start experimenting with Git and GitHub today.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
