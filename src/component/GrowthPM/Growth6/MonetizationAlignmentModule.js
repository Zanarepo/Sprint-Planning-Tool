import React from 'react';
import { FaDollarSign, FaInfoCircle } from 'react-icons/fa';


const MonetizationAlignmentModule = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Module Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center">
          <FaDollarSign className="mr-3 text-green-500" /> Monetization Alignment for Growth Product Managers
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Objective: Teach you how to balance user growth with sustainable revenue generation while maintaining product-market fit.
        </p>
      </header>

      {/* Core Concept Overview */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaInfoCircle className="text-3xl text-blue-500 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-800">Core Concept Overview</h2>
        </div>
        
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Definition</h3>
          <p className="text-gray-700">
            Monetization alignment ensures that your growth strategies, including user acquisition and engagement, directly contribute to revenue generation without compromising long-term user satisfaction or business viability.
          </p>
        </div>
        
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Why It Matters</h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>
              <span className="font-semibold">Hollow Growth:</span> Growth without monetization leads to "hollow growth" where users don’t convert into paying customers.
            </li>
            <li>
              <span className="font-semibold">Retention Risks:</span> Over-prioritizing revenue can harm retention through aggressive ads or paywalls.
            </li>
            <li>
              <span className="font-semibold">Sustainable Balance:</span> Achieving sustainable growth requires balancing user value with business value.
            </li>
          </ul>
        </div>
      </section> <br />
          
        {/* Monetization Alignment Component */}
    
         
    

    </div>
  );
};

export default MonetizationAlignmentModule;
