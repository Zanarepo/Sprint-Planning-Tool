import React from 'react';
import {

  
  FiCheckSquare,
  FiTrendingUp,
} from 'react-icons/fi';


const ExampleTracking = () => {
  

  return (
    <div className="container mx-auto p-6" id="product-analysis-content">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          <FiTrendingUp className="inline-block mr-2" />
          Understanding Product Metrics and Analysis
        </h1>
        <p className="text-lg mt-2 text-gray-600">
          How to define metrics to be tracked using product analysis tools.
        </p>
      </div>

      {/* Download PDF Button */}
     
     
      {/* Example Tracking Plan Template */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800">
          <FiCheckSquare className="inline-block mr-2" />
          Example Tracking Plan Template
        </h2>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border-collapse mt-4 text-left border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border">Event Name</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Trigger Point</th>
                <th className="px-4 py-2 border">Properties</th>
                <th className="px-4 py-2 border">Priority</th>
                <th className="px-4 py-2 border">Owner</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border">signup_completed</td>
                <td className="px-4 py-2 border">User completes the signup flow.</td>
                <td className="px-4 py-2 border">After account creation success.</td>
                <td className="px-4 py-2 border">referral_source, plan_type</td>
                <td className="px-4 py-2 border">High</td>
                <td className="px-4 py-2 border">Developer</td>
                <td className="px-4 py-2 border">In Progress</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">item_added_to_cart</td>
                <td className="px-4 py-2 border">Item added to shopping cart.</td>
                <td className="px-4 py-2 border">When "Add to Cart" is clicked.</td>
                <td className="px-4 py-2 border">product_id, category, price</td>
                <td className="px-4 py-2 border">High</td>
                <td className="px-4 py-2 border">Developer</td>
                <td className="px-4 py-2 border">Not Started</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">feature_used</td>
                <td className="px-4 py-2 border">User uses feature X.</td>
                <td className="px-4 py-2 border">When user activates feature X.</td>
                <td className="px-4 py-2 border">feature_name, usage_time</td>
                <td className="px-4 py-2 border">Medium</td>
                <td className="px-4 py-2 border">Analyst</td>
                <td className="px-4 py-2 border">Completed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

   
    </div>
  );
};

export default ExampleTracking;
