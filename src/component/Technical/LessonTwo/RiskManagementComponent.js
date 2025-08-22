import React, { useRef } from "react";

import {AlertCircle, ShieldCheck, Server } from "lucide-react";
import RiskManagementSim from './RiskManagementSim'

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

const RiskManagementComponent = () => {
  const contentRef = useRef();

  return (
    <div className="p-6 space-y-8 bg-gray-50" ref={contentRef}>
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Risk Management & Mitigation</h1>
      <p className="mb-6 text-lg text-gray-700">
        Imagine you're building a <strong>new smartphone app</strong> for people to
        track their daily habits (like how much water they drink or how many
        steps they take). While making this app, there are <strong>risks</strong> —
        things that could go wrong. As a TPM (Technical Product Manager),
        it's your job to think about what could go wrong <strong>before</strong>
        it happens and make sure it doesn’t mess up the app for users.
      </p>

      <Section
        title="1. Technical Risks"
        icon={AlertCircle}
        content="The app might crash if too many people use it at once because the system can’t handle that much traffic. As a TPM, you need to plan ahead by ensuring the app can handle a lot of users at the same time (this is called scalability)."
        imageSrc="/images/technical_risk_example.png"
        altText="Technical Risk Example"
      />

      <Section
        title="2. Security Risks"
        icon={ShieldCheck}
        content="Users might lose their personal data if hackers attack the app. You need to make sure the app has strong security (like encrypting data) so the users' information stays safe."
        imageSrc="/images/security_risk_example.png"
        altText="Security Risk Example"
      />

      <Section
        title="3. Failover & Backup Strategies"
        icon={Server}
        content="Imagine the app’s main server crashes during the launch. A backup server would immediately step in and keep the app running smoothly for the users, even though the main one isn’t working."
        imageSrc="/images/failover_example.png"
        altText="Failover Example"
      />

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-blue-600">Why Is This Important for a TPM?</h3>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
          <li>
            <strong>Prevent issues:</strong> Plan ahead for things like crashes or security problems.
          </li>
          <li>
            <strong>Backup plans:</strong> Have resources like backup servers ready to step in.
          </li>
          <li>
            <strong>Reliability:</strong> Keep everything running smoothly so users stay happy.
          </li>
        </ul>
      </div>

      <div className="mt-8 text-center">
        <RiskManagementSim/>
       
      </div>
    </div>
  );
};

export default RiskManagementComponent;
