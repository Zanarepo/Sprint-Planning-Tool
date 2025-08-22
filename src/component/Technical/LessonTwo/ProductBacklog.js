import React from "react";

const ProductBacklog = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold text-center mb-4">Product Backlog</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold">What is a Product Backlog?</h2>
        <p className="text-gray-700">
          The Product Backlog is a prioritized list of tasks, features, and enhancements
          that guide the development of a product. It is managed by the Product Owner
          and continuously updated based on feedback and business priorities.
        </p>
        <div className="w-full h-40 bg-gray-300 flex items-center justify-center mt-4">
          <span className="text-gray-600">[Product Backlog Image Placeholder]</span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Sprint Backlog</h2>
        <p className="text-gray-700">
          The Sprint Backlog consists of tasks selected from the Product Backlog for
          implementation in a sprint. The development team commits to completing these
          tasks within the sprint duration.
        </p>
        <div className="w-full h-40 bg-gray-300 flex items-center justify-center mt-4">
          <span className="text-gray-600">[\image\PBI.jpg]</span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Criteria for Ordering the Product Backlog</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Business Value - Features that bring the most value to users.</li>
          <li>Urgency - Time-sensitive tasks or regulatory requirements.</li>
          <li>Complexity - High complexity tasks might require early initiation.</li>
          <li>Dependencies - Items that unblock other tasks should be prioritized.</li>
          <li>Market Trends - Aligning with industry demands and competition.</li>
        </ul>
        <div className="w-full h-40 bg-gray-300 flex items-center justify-center mt-4">
          <span className="text-gray-600">[Prioritization Image Placeholder]</span>
        </div>
      </div>
    </div>
  );
};

export default ProductBacklog;
