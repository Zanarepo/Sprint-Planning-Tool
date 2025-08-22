import React from "react";
import { useNavigate } from "react-router-dom";

export default function Introduction() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        onClick={() => navigate("/")}
        className="mb-6 px-4 py-2 text-sm font-medium text-indigo-700 border border-indigo-300 rounded-lg hover:bg-indigo-100"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-2xl font-bold text-indigo-700 mb-4">
        Introduction to Product Management
      </h1>
      <p className="text-gray-700">
        Welcome! In this lesson, you’ll learn the foundations of product
        management, including roles, responsibilities, and the product lifecycle.
      </p>
    </div>
  );
}
