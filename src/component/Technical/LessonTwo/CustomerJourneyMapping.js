import React from 'react';

import { FiUser, FiClipboard, FiUsers, FiAlignLeft } from 'react-icons/fi';

import  UserFlowsAndDesign from './UserFlowsAndDesign'

const CustomerJourneyMapping = () => {
 
  return (
    <div className="container mx-auto p-6" id="customer-journey-content">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Customer Journey Mapping & UX/UI</h1>
        <p className="text-lg mt-2 text-gray-600">Understanding customer needs and delivering an intuitive experience.</p>
      </div>

     

      {/* Why It's Important for TPMs */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800">Why It’s Important for TPMs</h2>
        <p className="text-lg mt-4 text-gray-600">
          As a TPM, your role requires you to be a bridge between the technical and business aspects of the product. 
          Understanding the customer’s experience ensures that the product is not only technically sound but also user-friendly and aligned with the business goals.
        </p>
        <ul className="mt-6 space-y-4 text-lg text-gray-600">
          <li className="flex items-center">
            <FiUsers className="mr-3 text-blue-600" />
            <strong>Prioritize Features:</strong> By understanding what’s most important to users, you can prioritize features that directly impact their experience.
          </li>
          <li className="flex items-center">
            <FiUser className="mr-3 text-blue-600" />
            <strong>Align Cross-Functional Teams:</strong> You can help designers, engineers, and stakeholders focus on solving the most critical user problems.
          </li>
          <li className="flex items-center">
            <FiAlignLeft className="mr-3 text-blue-600" />
            <strong>Optimize User Retention:</strong> A seamless, intuitive user experience helps improve engagement and retention.
          </li>
          <li className="flex items-center">
            <FiClipboard className="mr-3 text-blue-600" />
            <strong>Minimize Technical Debt:</strong> Prioritizing usability early on can help avoid costly redesigns or feature overhauls later.
          </li>
        </ul>
      </section>

      {/* Key Concepts Section */}
      <section>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Key Concepts in Customer Journey Mapping & UX/UI</h2>

        {/* Customer Personas & Empathy Maps */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-800">1. Customer Personas & Empathy Maps</h3>
          <p className="mt-4 text-lg text-gray-600">
            Customer Personas are detailed representations of different user types who interact with your product. They help you better understand who your users are, what their pain points are, and how they make decisions.
            <br />
            Empathy Maps are used to understand the user’s needs, emotions, and experiences, providing a more holistic view of the customer, guiding your design and product decisions.
          </p>
          <div className="flex mt-6 space-x-4">
            <div className="flex-1 bg-gray-100 p-4 rounded-md shadow-md">
              <h4 className="font-semibold text-xl text-blue-600">Why it’s important for TPMs:</h4>
              <ul className="mt-4 space-y-2 text-lg text-gray-600">
                <li className="flex items-center">
                  <FiUser className="mr-3 text-blue-600" />
                  <strong>Empathy for the Customer:</strong> Understanding customer needs and frustrations helps you prioritize the right features.
                </li>
                <li className="flex items-center">
                  <FiUsers className="mr-3 text-blue-600" />
                  <strong>Collaborating with Designers:</strong> Personas and empathy maps help design teams create experiences that resonate with users.
                </li>
                <li className="flex items-center">
                  <FiClipboard className="mr-3 text-blue-600" />
                  <strong>Stakeholder Alignment:</strong> Clear personas help align product goals with business objectives.
                </li>
              </ul>
            </div>
            <div className="flex-1 bg-gray-100 p-4 rounded-md shadow-md">
              <h4 className="font-semibold text-xl text-blue-600">Example:</h4>
              <p className="text-lg text-gray-600 mt-4">
                If you’re developing a personal finance app, one persona might be a “Budget-Conscious Millennial” who is tech-savvy but needs a clear and simple interface to track their spending.
              </p>
            </div>
          </div>
        </div>

        {/* Illustrations */}
        <div className="mb-12 text-center">
        <img
    src="images/image.png"
    alt="Customer Journey Illustration"
    className="mx-auto rounded-md shadow-lg w-2/3 md:w-2/3" 
  />
        </div>
      </section>
 <UserFlowsAndDesign/>
    </div>
  );
};

export default CustomerJourneyMapping;


