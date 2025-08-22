import React, { useState } from 'react';
import {
  FaCodeBranch,
  FaGitAlt,
  FaFolder,
  FaClone,
  FaLightbulb,
} from 'react-icons/fa';

const InteractiveGitSimulation = () => {
  // Repository state: created, branches, commits, and current branch
  const [repoCreated, setRepoCreated] = useState(false);
  const [branches, setBranches] = useState([]);
  const [commits, setCommits] = useState({});
  const [currentBranch, setCurrentBranch] = useState('');
  const [commitMessage, setCommitMessage] = useState('');
  const [newBranchName, setNewBranchName] = useState('');
  const [mergeSource, setMergeSource] = useState('');

  // Create repository with default branch 'main'
  const createRepository = () => {
    setRepoCreated(true);
    setBranches(['main']);
    setCommits({ main: [] });
    setCurrentBranch('main');
  };

  // Handle a new commit on the current branch
  const addCommit = () => {
    if (!commitMessage.trim()) return;
    const newCommit = {
      id: Date.now(),
      message: commitMessage,
    };
    setCommits((prev) => ({
      ...prev,
      [currentBranch]: [...(prev[currentBranch] || []), newCommit],
    }));
    setCommitMessage('');
  };

  // Create a new branch from the current branch
  const createBranch = () => {
    if (!newBranchName.trim()) return;
    if (branches.includes(newBranchName)) {
      alert('Branch already exists.');
      return;
    }
    setBranches((prev) => [...prev, newBranchName]);
    // Copy commits from current branch as starting point for new branch
    setCommits((prev) => ({
      ...prev,
      [newBranchName]: [...(prev[currentBranch] || [])],
    }));
    setNewBranchName('');
  };

  // Switch to another branch
  const switchBranch = (branch) => {
    setCurrentBranch(branch);
  };

  // Merge a branch (source) into the current branch
  const mergeBranch = () => {
    if (!mergeSource || mergeSource === currentBranch) {
      alert('Please select a valid branch to merge.');
      return;
    }
    // For simulation, we simply append the commits from mergeSource to current branch.
    setCommits((prev) => ({
      ...prev,
      [currentBranch]: [
        ...prev[currentBranch],
        ...prev[mergeSource].filter(
          (commit) =>
            !prev[currentBranch].some((c) => c.id === commit.id)
        ),
      ],
    }));
    setMergeSource('');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <header className="bg-blue-600 text-white py-6 text-center">
        <h1 className="text-3xl font-bold">
          Interactive Git Simulation for TPMs
        </h1>
        <p className="mt-2">
          Practice key Git operations: repository creation, branching, commits,
          and merging.
        </p>
      </header>

      <main className="p-6">
        {!repoCreated ? (
          <div className="text-center">
            <button
              onClick={createRepository}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <FaFolder className="mr-2" />
              <span>Create Repository</span>
            </button>
          </div>
        ) : (
          <div>
            {/* Display current repository info */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
                <FaGitAlt className="text-blue-500" /> Repository: <span className="italic">MyRepo</span>
              </h2>
              <p>
                Current Branch: <strong>{currentBranch}</strong>
              </p>
              <div className="mt-4">
                <h3 className="font-semibold">Branches:</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {branches.map((branch) => (
                    <button
                      key={branch}
                      onClick={() => switchBranch(branch)}
                      className={`px-3 py-1 rounded-full border ${
                        branch === currentBranch
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-blue-500'
                      }`}
                    >
                      {branch}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Commit Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
                <FaLightbulb className="text-yellow-500" /> Make a Commit
              </h2>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                  placeholder="Enter commit message..."
                  className="flex-1 p-2 border rounded"
                />
                <button
                  onClick={addCommit}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Commit
                </button>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold">Commits on {currentBranch}:</h3>
                <ul className="list-disc pl-6 mt-2">
                  {(commits[currentBranch] || []).map((commit) => (
                    <li key={commit.id}>{commit.message}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Branching Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
                <FaCodeBranch className="text-green-500" /> Create a New Branch
              </h2>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={newBranchName}
                  onChange={(e) => setNewBranchName(e.target.value)}
                  placeholder="New branch name..."
                  className="flex-1 p-2 border rounded"
                />
                <button
                  onClick={createBranch}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Create Branch
                </button>
              </div>
            </section>

            {/* Merge Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
                <FaClone className="text-purple-500" /> Merge Branch
              </h2>
              <div className="flex flex-col md:flex-row gap-4">
                <select
                  value={mergeSource}
                  onChange={(e) => setMergeSource(e.target.value)}
                  className="p-2 border rounded flex-1"
                >
                  <option value="">Select branch to merge into {currentBranch}</option>
                  {branches
                    .filter((branch) => branch !== currentBranch)
                    .map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                </select>
                <button
                  onClick={mergeBranch}
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                >
                  Merge
                </button>
              </div>
              {mergeSource && (
                <p className="mt-2 text-sm text-gray-600">
                  Merging branch <strong>{mergeSource}</strong> into <strong>{currentBranch}</strong>.
                </p>
              )}
            </section>
          </div>
        )}
      </main>

      <footer className="text-center text-sm text-gray-600 mt-10">
        <p>
          Practice makes perfect! Use this simulation to understand Git concepts like
          branching, committing, and merging – essential skills for effective version
          control.
        </p>
      </footer>
    </div>
  );
};

export default InteractiveGitSimulation;
