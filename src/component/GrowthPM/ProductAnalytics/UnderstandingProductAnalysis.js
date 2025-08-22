import React from 'react';
import ExampleTracking from './ExampleTracking'
import {

  FiClipboard,
  FiSettings,
  FiActivity,
  FiCheckSquare,
  FiTrendingUp,
} from 'react-icons/fi';


const ProductAnalysisMetrics = () => {
 

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


      {/* How to Define Metrics */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800">
          <FiClipboard className="inline-block mr-2" />
          How to Define Metrics to Be Tracked
        </h2>
        <div className="mt-6 space-y-8 text-gray-600">
          <div>
            <h3 className="text-xl font-semibold text-blue-600">
              <FiSettings className="inline-block mr-2" />
              1. Define Business Objectives
            </h3>
            <p className="mt-2 text-lg">
              Start with the "Why": Clearly outline the goals you want to achieve with tracking. For example:
              <ul className="list-disc pl-6 mt-4 text-gray-600">
                <li>Increase user retention by 10%.</li>
                <li>Improve the conversion rate in the onboarding flow.</li>
              </ul>
              Align with KPIs: Map each goal to specific Key Performance Indicators (KPIs), such as "signup-to-first-purchase rate" or "time spent on feature X."
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-600">
              <FiActivity className="inline-block mr-2" />
              2. Identify Key Events
            </h3>
            <p className="mt-2 text-lg">
              Break down user journeys and define milestones, such as:
              <ul className="list-disc pl-6 mt-4 text-gray-600">
                <li>signup_completed for onboarding</li>
                <li>item_added_to_cart for e-commerce</li>
                <li>feature_used for SaaS applications</li>
              </ul>
              Categorize events by category like onboarding, engagement, retention, or monetization.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-600">
              <FiCheckSquare className="inline-block mr-2" />
              3. Determine Event Properties
            </h3>
            <p className="mt-2 text-lg">
              Add contextual metadata to each event to allow for deeper analysis. Example properties:
              <ul className="list-disc pl-6 mt-4 text-gray-600">
                <li>signup_completed: referral_source, device_type, signup_method</li>
                <li>purchase_completed: product_id, price, payment_method</li>
              </ul>
              Focus on critical properties for segmentation and insights.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-600">
              <FiClipboard className="inline-block mr-2" />
              4. Create a Tracking Plan Document
            </h3>
            <p className="mt-2 text-lg">
              Use a structured document with key columns such as:
              <ul className="list-disc pl-6 mt-4 text-gray-600">
                <li>Event Name</li>
                <li>Description</li>
                <li>Trigger Point</li>
                <li>Properties</li>
                <li>Priority</li>
                <li>Owner</li>
                <li>Status</li>
              </ul>
              This document becomes the source of truth for event tracking.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-600">
              <FiSettings className="inline-block mr-2" />
              5. Align Stakeholders
            </h3>
            <p className="mt-2 text-lg">
              Host a kickoff meeting to ensure product managers, developers, and analysts align on the objectives and tracking plan. Validate feasibility and ensure all stakeholders agree on event definitions.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-600">
              <FiActivity className="inline-block mr-2" />
              6. Implement and Test
            </h3>
            <p className="mt-2 text-lg">
              Developers set up SDKs and use tools like Mixpanel’s Debugger to test that events fire correctly. Automate validation with QA scripts to ensure accuracy.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-600">
              <FiTrendingUp className="inline-block mr-2" />
              7. Monitor and Iterate
            </h3>
            <p className="mt-2 text-lg">
              After implementing, review the data to ensure it matches expectations. Regularly audit and adjust the tracking plan as the product evolves.
            </p>
          </div>
        </div>
      </section>

      {/* Example Workflow */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800">
          <FiCheckSquare className="inline-block mr-2" />
          Example Workflow
        </h2>
        <div className="mt-6 text-gray-600 text-lg">
          <p>
            <strong>PM/TPM:</strong> "We want to measure the success of the onboarding flow."
          </p>
          <p>
            <strong>Analyst:</strong> "We should track signup_completed and tutorial_started with properties like source and device_type."
          </p>
          <p>
            <strong>Developer:</strong> Implements these events in the code and ensures they're logged via the Mixpanel SDK.
          </p>
          <p>
            <strong>PM/Analyst:</strong> Monitors the data in Mixpanel dashboards to derive insights and refine strategies.
          </p>
        </div>
      </section>
      <ExampleTracking/>
    </div>
  );
};

export default ProductAnalysisMetrics;
