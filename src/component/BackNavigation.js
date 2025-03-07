import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackNavigation = () => {
  const navigate = useNavigate();

  return (
    // Position this container as needed; here it's placed just below the navbar.
    <div className="absolute top-16 left-4  mt-16">
      <button
        onClick={() => navigate("/tools")}
        className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
      >
        <FaArrowLeft className="mr-2" />
        <span>Back to Tools</span>
      </button>
    </div>
  );
};

export default BackNavigation;
