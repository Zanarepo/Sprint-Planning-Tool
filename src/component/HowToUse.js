import { useState, useEffect } from "react";

export default function HowToUseSprintify() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if the user has already seen the guide
    if (localStorage.getItem("howToUseSprintify")) {
      setIsVisible(false); // Hide if already seen
    }
  }, []);
  
  const handleClose = () => {
    // Save to localStorage that the user has seen the guide
    localStorage.setItem("howToUseSprintify", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null; // Don't render the guide if it's closed

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen fixed inset-0 bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl space-y-6">
        <h1 className="text-2xl font-bold  text-blue-800">How to Use Sprintify</h1>

        <p className="text-lg text-gray-700">
          Sprintify helps you brainstorm and organize product features, challenges, and solutions for your product. Here's how to use it effectively.
        </p>

        {/* Step 1: Input Problem Statement */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Step 1: Input the Problem Statement</h2>
          <p className="text-gray-600">
            Start by describing the problem that your product will solve. This will help you define the core issue that your product addresses.
          </p>
        </div>

        {/* Step 2: List the Problem Your Product Solves */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Step 2: List the Problem Your Product Solves</h2>
          <p className="text-gray-600">
            Clearly list out the specific problems your product is designed to tackle. This will help focus your brainstorming on relevant features.
          </p>
        </div>

        {/* Step 3: Input Features, Challenges, and Solutions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Step 3: Input Features, Challenges, and Solutions</h2>
          <p className="text-gray-600">
            Now, you'll input ideas for product features. For each feature, describe the challenge involved in building that feature and the likely solution. Click "Add to Table" after each entry.
          </p>
        </div>

        {/* Table View for Features, Challenges, and Solutions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Captured Ideas</h2>
          <p className="text-gray-600">
            As you input each feature, challenge, and solution, they will appear in the table below, helping you organize your thoughts and ideas.
          </p>
        </div>

        {/* Step 4: Hide the Guide */}
        <div className="mt-6 text-right">
          <button
            onClick={handleClose}
            className="p-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Got It! Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
