import React, { useState } from "react";

/**
 * TeamTaskInstructions.jsx
 * ------------------------------------------
 * Purpose: Display full Project Deliverables Framework for student teams.
 * Features:
 * - Includes 3 example projects (Alpha, Beta, Gamma)
 * - Collapsible (toggle) sections for clarity
 * - Fully responsive (mobile + desktop)
 * - Clean readable layout using TailwindCSS
 */

const sections = [
  {
    title: "🚀 Team Projects Overview",
    content: (
      <>
        <p className="text-slate-700 mb-2">
          Below are the assigned projects for each team. Each project represents
          a real-world scenario your team will plan and document.
        </p>
        <ul className="space-y-4 mt-3">
          <li className="border rounded-lg p-3 bg-gray-50">
            <strong>Alpha: “CampusMart” — Student Grocery Ordering App</strong>
            <p className="text-sm mt-1 text-slate-600">
              📝 <strong>Project Task:</strong> Design a simple grocery ordering
              app made for students living on campus. The app helps students buy
              food and essentials from nearby stores with quick delivery.
            </p>
          </li>

          <li className="border rounded-lg p-3 bg-gray-50">
            <strong>Beta: “StudyBuddy” — Assignment Reminder & Notes Tracker</strong>
            <p className="text-sm mt-1 text-slate-600">
              📝 <strong>Project Task:</strong> Plan a Study Reminder app that
              helps students manage assignments, track due dates, and organize
              their notes in one place.
            </p>
          </li>

          <li className="border rounded-lg p-3 bg-gray-50">
            <strong>Gamma: “Feedbackly” — Student Feedback Portal</strong>
            <p className="text-sm mt-1 text-slate-600">
              📝 <strong>Project Task:</strong> Design a student feedback web app
              where students can rate courses or give feedback to lecturers
              anonymously. Admins can view summary reports.
            </p>
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "📘 Overview",
    content: (
      <>
        <p>
          Each team must submit <strong>two main documents:</strong>
        </p>
        <ul className="list-disc ml-6 mt-2">
          <li>1️⃣ Product Strategy Document</li>
          <li>2️⃣ Product Requirements Document (PRD) + Roadmap</li>
        </ul>
      </>
    ),
  },
  {
    title: "🧭 Product Strategy Document",
    content: (
      <>
        <p>
          Each team’s Product Strategy must include the following sections
          (structured like a professional PM deck):
        </p>

        <ul className="list-disc ml-6 mt-3 space-y-2">
          <li>
            <strong>🧾 Executive Summary:</strong> Overview of what the product
            is, who it serves, and what problem it solves.
          </li>
          <li>
            <strong>⚙️ Problem Statement:</strong> Define the main problem the
            product addresses. Include user pain points.
          </li>
          <li>
            <strong>💡 Solution:</strong> Describe the core idea and how it
            directly solves the problem.
          </li>
          <li>
            <strong>🚀 Vision & Mission:</strong> Define your vision and mission.
          </li>
          <li>
            <strong>💎 UVP:</strong> What makes your product unique?
          </li>
          <li>
            <strong>🌍 Market Overview & Trends:</strong> Describe the current
            market and trends that support your idea.
          </li>
          <li>
            <strong>📈 Market Opportunity:</strong> Define TAM, SAM, and SOM.
          </li>
          <li>
            <strong>🧠 PESTEL Analysis:</strong> Political, Economic, Social,
            Technological, Environmental, Legal.
          </li>
          <li>
            <strong>⚔️ Competitor Analysis:</strong> Compare your product with
            2–3 competitors.
          </li>
          <li>
            <strong>👥 Customer Segmentation:</strong> Define user groups and
            create 1–2 personas.
          </li>
          <li>
            <strong>🧩 Strategic Frameworks:</strong> Include Porter’s Five
            Forces, SWOT, and Resource & Capability Assessment.
          </li>
          <li>
            <strong>🎯 Go-to-Market (GTM) Strategy:</strong> How will you reach
            users? (Social media, referrals, etc.)
          </li>
          <li>
            <strong>💰 Financial Projections:</strong> Revenue and cost
            estimates (3–6 months).
          </li>
          <li>
            <strong>⚠️ Risk Assessment & Mitigation:</strong> Key risks and how
            to handle them.
          </li>
          <li>
            <strong>🗺️ Roadmap & Implementation Plan:</strong> MVP → Beta →
            Launch → Scale.
          </li>
          <li>
            <strong>📊 KPIs & Success Metrics:</strong> Active users, retention,
            conversion rate, etc.
          </li>
          <li>
            <strong>🌱 Exit Strategy & Scalability:</strong> How can the product
            grow or pivot?
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "🧩 Product Requirements Document (PRD)",
    content: (
      <>
        <p>
          The PRD defines the <strong>functional and technical scope</strong> of
          your MVP.
        </p>

        <ul className="list-disc ml-6 mt-3 space-y-2">
          <li>
            <strong>🧾 Executive Summary / Vision:</strong> Restate your vision
            and MVP goal.
          </li>
          <li>
            <strong>🚩 Problem Statement:</strong> What user problem are you
            solving?
          </li>
          <li>
            <strong>🎯 MVP Scope:</strong> Define what’s included and what’s not.
          </li>
          <li>
            <strong>📈 Goals / Success Metrics:</strong> Measurable outcomes like
            “100 early users.”
          </li>
          <li>
            <strong>👤 Target Users / Personas:</strong> Describe who will use
            your app.
          </li>
          <li>
            <strong>🧩 Jobs-To-Be-Done (JTBD):</strong> Example: “When I’m out
            of groceries, I want to order quickly...”
          </li>
          <li>
            <strong>⚙️ Features / Functional Requirements:</strong> List
            must-have features (registration, catalog, cart, checkout).
          </li>
          <li>
            <strong>🔧 Non-Functional Requirements:</strong> Performance,
            reliability, and scalability.
          </li>
          <li>
            <strong>💻 Technical Requirements:</strong> Tech stack and APIs.
          </li>
          <li>
            <strong>🧑‍💻 User Stories / Workflows:</strong> Include at least 2–3.
          </li>
          <li>
            <strong>🗓️ Timeline / Roadmap:</strong> Split into sprints.
          </li>
          <li>
            <strong>✅ Success Criteria / KPIs:</strong> How to measure success.
          </li>
          <li>
            <strong>⚠️ Risks & Mitigations:</strong> Plan for potential
            challenges.
          </li>
          <li>
            <strong>🚀 Go-To-Market (GTM) Strategy:</strong> How you’ll launch.
          </li>
          <li>
            <strong>🔗 Dependencies:</strong> External tools or data sources.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "🧭 Submission Instructions",
    content: (
      <>
        <ul className="list-disc ml-6 mt-2">
          <li>Product Strategy Document (with all sections above)</li>
          <li>PRD + Roadmap</li>
          <li>ERD (showing database structure)</li>
        </ul>
        <p className="mt-2 text-sm text-slate-500">
          📅 Submit all deliverables by the given deadline via your team portal.
        </p>
      </>
    ),
  },
];

export default function TeamTaskInstructions() {
  const [openSection, setOpenSection] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-4 text-center">
          🧩 Team Task Module — Project Deliverables Framework
        </h1>
        <p className="text-slate-600 text-center mb-6">
          This guide contains all the information your team needs to complete
          your project deliverables and submissions.
        </p>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-lg border overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenSection(openSection === index ? null : index)
                }
                className="w-full text-left px-4 py-3 font-semibold flex justify-between items-center hover:bg-gray-100"
              >
                <span>{section.title}</span>
                <span>{openSection === index ? "−" : "+"}</span>
              </button>

              {openSection === index && (
                <div className="px-4 pb-4 text-sm text-slate-700">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>

        <footer className="text-center mt-8 text-slate-500 text-sm">
          © {new Date().getFullYear()} Team Task Module — Product Strategy & PRD
        </footer>
      </div>
    </div>
  );
}
