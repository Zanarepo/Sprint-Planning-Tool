import React, { useState } from "react";

/**
 * TeamTaskInstructions.jsx
 * ------------------------------------------
 * Purpose: Display full Project Deliverables Framework for student teams.
 * Features:
 * - No CRUD, purely instructional
 * - Collapsible (toggle) sections for clarity
 * - Fully responsive (mobile + desktop)
 * - Clean readable layout using TailwindCSS
 */

const sections = [
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
            <strong>🧾 Executive Summary:</strong> A short overview of what the
            product is, who it serves, and what problem it solves. <br />
            <em>
              Example: “CampusMart is a campus-based delivery app helping
              students order groceries faster and cheaper.”
            </em>
          </li>
          <li>
            <strong>⚙️ Problem Statement:</strong> Define the main problem the
            product addresses. Include data or user pain points if possible.
          </li>
          <li>
            <strong>💡 Solution:</strong> Describe the core idea and how it
            directly solves the problem.
          </li>
          <li>
            <strong>🚀 Vision & Mission:</strong> Define the long-term vision and
            current mission.
          </li>
          <li>
            <strong>💎 Unique Value Proposition (UVP):</strong> What makes your
            product stand out and why users should choose it.
          </li>
          <li>
            <strong>🌍 Market Overview & Trends:</strong> Describe the current
            market and trends that support your product.
          </li>
          <li>
            <strong>📈 Market Opportunity:</strong> Define TAM, SAM, and SOM.
          </li>
          <li>
            <strong>🧠 PESTEL Analysis:</strong> Analyze Political, Economic,
            Social, Technological, Environmental, and Legal factors.
          </li>
          <li>
            <strong>⚔️ Competitor Analysis:</strong> Compare your product with
            2–3 competitors, highlighting strengths and weaknesses.
          </li>
          <li>
            <strong>👥 Customer Segmentation:</strong> Define target users and
            create 1–2 personas.
          </li>
          <li>
            <strong>🧩 Strategic Frameworks:</strong> Include Porter’s Five
            Forces, SWOT Analysis, and Resource & Capability Assessment.
          </li>
          <li>
            <strong>🎯 Go-to-Market (GTM) Strategy:</strong> Outline how you’ll
            launch and reach users (e.g., influencer campaigns, social media).
          </li>
          <li>
            <strong>💰 Financial Projections:</strong> Estimate potential
            revenue, costs, or break-even point (3–6 months).
          </li>
          <li>
            <strong>⚠️ Risk Assessment & Mitigation:</strong> Identify key risks
            and mitigation plans.
          </li>
          <li>
            <strong>🗺️ Roadmap & Implementation Plan:</strong> Define your
            development phases (MVP → Beta → Launch → Scale).
          </li>
          <li>
            <strong>📊 KPIs & Success Metrics:</strong> Define success
            indicators (e.g., active users, retention, conversion rate).
          </li>
          <li>
            <strong>🌱 Exit Strategy & Scalability:</strong> Explain how the
            product can grow or pivot.
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
            <strong>🧾 Executive Summary / Vision:</strong> Restate the vision
            and MVP goal.
          </li>
          <li>
            <strong>🚩 Problem Statement:</strong> What user problem are you
            solving?
          </li>
          <li>
            <strong>🎯 MVP Scope:</strong> Define what’s included (core
            features) and what’s excluded.
          </li>
          <li>
            <strong>📈 Goals / Success Metrics:</strong> Define measurable
            success targets (e.g., 100 early users, 90% task completion).
          </li>
          <li>
            <strong>👤 Target Users / Personas:</strong> Describe who your
            product serves.
          </li>
          <li>
            <strong>🧩 Jobs-To-Be-Done (JTBD):</strong> Write user-centered
            statements. <br />
            <em>
              Example: “When I’m out of groceries, I want to order quickly so I
              don’t waste time going to the store.”
            </em>
          </li>
          <li>
            <strong>⚙️ Features / Functional Requirements:</strong> List
            must-have features like user registration, product catalog, add to
            cart, and checkout.
          </li>
          <li>
            <strong>🔧 Non-Functional Requirements:</strong> Define performance,
            reliability, and scalability expectations.
          </li>
          <li>
            <strong>💻 Technical Requirements:</strong> Specify tech stack, APIs,
            and integrations.
          </li>
          <li>
            <strong>🧑‍💻 User Stories / Workflows:</strong> Include 2–3 sample
            stories. <br />
            <em>
              Example: “As a student, I want to add products to my cart so I can
              buy multiple items at once.”
            </em>
          </li>
          <li>
            <strong>🗓️ Timeline / Roadmap:</strong> Break development into
            sprints or phases.
          </li>
          <li>
            <strong>✅ Success Criteria / KPIs:</strong> Define how you’ll
            measure success.
          </li>
          <li>
            <strong>⚠️ Risks & Mitigations:</strong> Identify potential
            challenges and contingency plans.
          </li>
          <li>
            <strong>🚀 Go-To-Market (GTM) Strategy:</strong> Outline your
            product launch plan.
          </li>
          <li>
            <strong>🔗 Dependencies:</strong> List external tools, APIs, or data
            sources needed.
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
          <li>Product Strategy Document (with all sections listed above)</li>
          <li>PRD + Roadmap</li>
          <li>ERD (showing database structure)</li>
        </ul>
        <p className="mt-2 text-sm text-slate-500">
          📅 Submit all documents by the assigned deadline through your team
          portal or designated submission platform.
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
          📘 Project Deliverables Framework
        </h1>
        <p className="text-slate-600 text-center mb-6">
          This guide explains everything your team needs to prepare and submit
          your Product Strategy and PRD documents.
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
          © {new Date().getFullYear()} Product Strategy & PRD Framework
        </footer>
      </div>
    </div>
  );
}
