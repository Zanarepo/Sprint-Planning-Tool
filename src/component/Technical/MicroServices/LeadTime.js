// src/components/Product/LeadTimeOnboardingModule.jsx
import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const modules = [
  {
    key: "leadTime",
    title: "Lead-Time Optimization",
    description:
      "Lead-time optimization focuses on reducing the time it takes to develop and deploy a feature, from planning to production.",
    details: [
      {
        label: "Parallel Tasks",
        content:
          "Run tasks concurrently, like designing the portal UI while coding the backend."
      },
      {
        label: "Automation",
        content:
          "Use tools to automate testing or deployment, e.g., auto-running tests on patient data queries."
      },
      {
        label: "Bottleneck Removal",
        content:
          "Eliminate delays, like streamlining code reviews to avoid waiting days for approvals."
      },
      {
        label: "Prioritization",
        content:
          "Focus on high-impact tasks first, like building core record access before optional features."
      },
      {
        label: "Metrics",
        content:
          'Track lead-time, e.g., "Reduce deployment time from 2 weeks to 3 days."'
      }
    ],
    practicalExample:
      "Automating API tests cuts testing from 2 days to 2 hours, parallelizing UI and backend saves 1 week."
  },
  {
    key: "onboarding",
    title: "Onboarding Friction",
    description:
      "Onboarding friction refers to obstacles that make it hard for users—like doctors or IT teams—to start using a platform.",
    details: [
      {
        label: "Clear Documentation",
        content:
          "Provide simple guides, e.g., a one-page setup for the portal’s API."
      },
      {
        label: "Intuitive Design",
        content:
          "Create user-friendly interfaces, like a portal dashboard doctors can navigate without training."
      },
      {
        label: "Self-Service Tools",
        content:
          "Offer automated setup, e.g., a script for IT teams to configure the portal."
      },
      {
        label: "Feedback Integration",
        content:
          "Use user input to simplify onboarding, like fixing unclear error messages."
      },
      {
        label: "Compliance Support",
        content:
          "Include steps for regulatory needs, like HIPAA-compliant configurations."
      }
    ],
    practicalExample:
      "Create a one-page guide for IT teams with HIPAA-compliant steps and a simple dashboard for doctors."
  },
  {
    key: "b2eB2g",
    title: "B2E/B2G Context",
    description:
      "B2E (business-to-enterprise) and B2G (business-to-government) involve strict security, compliance, and scalability needs.",
    details: [
      {
        label: "Compliance",
        content: "Encrypt patient data to meet HIPAA regulations."
      },
      {
        label: "Security",
        content:
          "Protect systems using OAuth for portal access to prevent breaches."
      },
      {
        label: "Scalability",
        content: "Support large-scale use, e.g., 10,000 daily record queries."
      },
      {
        label: "Stakeholder Needs",
        content:
          "Balance hospital IT demands (secure setup) with doctor needs (fast access)."
      },
      {
        label: "Documentation",
        content: "Provide compliance-focused guides with audit trails."
      }
    ],
    practicalExample:
      "Ensure HIPAA-compliant encryption, OAuth authentication, and a scalable API for 10,000 queries/day."
  }
];

export default function LeadTimeOnboardingModule() {
  const [openModule, setOpenModule] = useState(null);
  const [openDetail, setOpenDetail] = useState({});

  const toggleModule = (key) => {
    setOpenModule(openModule === key ? null : key);
  };

  const toggleDetail = (moduleKey, detailIndex) => {
    setOpenDetail((prev) => ({
      ...prev,
      [moduleKey]: prev[moduleKey] === detailIndex ? null : detailIndex
    }));
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">🚀 Reducing Lead-Time & Onboarding Friction</h2>

      {modules.map((mod) => (
        <div key={mod.key} className="border rounded bg-white shadow p-4">
          <button
            onClick={() => toggleModule(mod.key)}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-semibold text-lg">{mod.title}</span>
            {openModule === mod.key ? <FaMinus /> : <FaPlus />}
          </button>

          {openModule === mod.key && (
            <div className="mt-3 space-y-3">
              <p>{mod.description}</p>

              {mod.details.map((det, idx) => (
                <div key={idx} className="ml-4">
                  <button
                    onClick={() => toggleDetail(mod.key, idx)}
                    className="flex items-center justify-between w-full text-left text-blue-600 hover:underline"
                  >
                    {det.label} {openDetail[mod.key] === idx ? <FaMinus /> : <FaPlus />}
                  </button>
                  {openDetail[mod.key] === idx && (
                    <p className="ml-4 mt-1 text-gray-700">{det.content}</p>
                  )}
                </div>
              ))}

              <div className="mt-2 p-2 bg-gray-100 rounded">
                <p className="font-medium">Practical Example:</p>
                <p className="ml-2">{mod.practicalExample}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
