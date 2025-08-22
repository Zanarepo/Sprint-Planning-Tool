import React, { useRef } from "react";

import {AlertCircle, ShieldCheck, Code } from "lucide-react";

const Section = ({ title, icon: Icon, content, imageSrc, altText }) => (
  <div className="mb-6 space-y-4">
    <div className="flex items-center space-x-3">
      <Icon className="w-6 h-6 text-blue-600" />
      <h3 className="text-xl font-semibold text-blue-600">{title}</h3>
    </div>
    <p className="text-lg text-gray-700">{content}</p>
    {imageSrc && (
      <img
        src={imageSrc}
        alt={altText}
        className="w-full rounded-md shadow-lg"
      />
    )}
  </div>
);

const FeatureFeasibilityComponent = () => {
  const contentRef = useRef();


  return (
    <div className="p-6 space-y-8 bg-gray-50" ref={contentRef}>
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Feature Feasibility & Trade-offs</h1>

      <div className="mb-6 text-lg text-gray-700">
        <h2 className="text-xl font-semibold text-blue-600">What It Means:</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Assessing Technical Feasibility:</strong> This is about evaluating whether a new feature can realistically be implemented given the current technical setup, available resources, and constraints.
          </li>
          <li>
            <strong>Managing Trade-offs:</strong> This involves deciding between competing priorities like speed, cost, performance, and reliability. Every choice comes with benefits and drawbacks.
          </li>
        </ul>
      </div>

      <Section
        title="Why It’s Important for a TPM"
        icon={Code}
        content="As a Technical Product Manager (TPM), understanding these concepts ensures that the features you propose align with the technical capabilities of your team, resources, and architecture. It helps you prioritize effectively and communicate trade-offs clearly to stakeholders."
        imageSrc="/images/tpm_why_important.png"
        altText="Why It’s Important for a TPM"
      />

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-blue-600">Illustrative Example:</h2>
        <p className="text-lg text-gray-700">
          Imagine you’re building a <strong>fitness tracking app</strong> with a core feature: real-time step tracking. Now, you want to introduce a new feature: <strong>group challenges</strong> where users compete in real time.
        </p>
      </div>

      <Section
        title="Step 1: Assessing Feasibility"
        icon={AlertCircle}
        content="Evaluate whether your app’s current architecture can support real-time updates across all users. This may require shifting to a real-time database like Firebase or implementing a WebSocket server."
        imageSrc="/images/technical_feasibility_example.png"
        altText="Technical Feasibility Example"
      />

      <div className="mb-6 text-lg text-gray-700">
        <h3 className="text-lg font-semibold text-blue-600">Assessment of Architecture:</h3>
        <p>
          The current app stores data locally and syncs periodically to the cloud. Real-time group challenges require instantaneous updates, which could demand a significant change to the backend architecture.
        </p>
      </div>

      <Section
        title="Step 2: Managing Trade-offs"
        icon={ShieldCheck}
        content="As you consider whether to move to a real-time solution, weigh the trade-offs between performance, cost, speed, and reliability."
        imageSrc="/images/tradeoffs_example.png"
        altText="Trade-offs Example"
      />

      <div className="mb-6 text-lg text-gray-700">
        <h3 className="text-lg font-semibold text-blue-600">Trade-off Examples:</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Performance vs. Cost:</strong> A real-time feature will increase server costs. Is the feature essential enough to justify this investment?
          </li>
          <li>
            <strong>Speed vs. Reliability:</strong> Speeding up development could mean skipping thorough testing. Is meeting the launch date more important than ensuring the app is fully reliable?
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-blue-600">Key Takeaways for a TPM:</h2>
        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
          <li>
            <strong>Feasibility Analysis Avoids Surprises:</strong> Ensuring the feature is achievable within the technical constraints helps avoid unexpected challenges.
          </li>
          <li>
            <strong>Trade-offs Build Alignment:</strong> Being transparent with stakeholders about trade-offs helps set realistic expectations.
          </li>
          <li>
            <strong>Better Prioritization:</strong> Understanding feasibility and trade-offs helps focus on the most impactful features.
          </li>
          <li>
            <strong>Communication:</strong> Effectively explaining trade-offs to non-technical stakeholders builds trust and buy-in.
          </li>
        </ul>
      </div>

      
   
    </div>
  );
};

export default FeatureFeasibilityComponent;
