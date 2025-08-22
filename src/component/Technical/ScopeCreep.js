import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ScopeCreep = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sections = [
    {
      id: 'definition',
      title: 'What is Scope Creep?',
      content: [
        {
          subtitle: 'Definition',
          text: 'Scope creep refers to the uncontrolled expansion of a project’s scope beyond its original objectives, often due to new requirements, features, or changes added without proper evaluation or approval.'
        },
        {
          subtitle: 'Characteristics',
          points: [
            'Unplanned Additions: New features or tasks introduced after the project scope is defined.',
            'Lack of Formal Approval: Changes occur without stakeholder sign-off or impact assessment.',
            'Gradual Expansion: Small, incremental additions that accumulate over time.',
            'Misalignment: Occurs when teams or stakeholders have differing expectations of project goals.'
          ]
        }
      ]
    },
    {
      id: 'impact',
      title: 'Impact on Development',
      content: [
        {
          subtitle: 'Effects on Development',
          points: [
            'Delayed Timelines: Additional features extend development cycles, pushing back release dates.',
            'Budget Overruns: Unplanned work increases costs for labor, tools, or resources.',
            'Reduced Quality: Rushed implementation to meet deadlines can lead to bugs or incomplete features.',
            'Team Burnout: Overloaded teams face stress and morale issues due to constant scope changes.',
            'Stakeholder Frustration: Misaligned expectations erode trust between teams and clients.'
          ]
        },
        {
          subtitle: 'Example Impact',
          points: [
            'A mobile app project planned for 3 months extends to 6 months due to added social sharing features, increasing costs by 50%.',
            'Developers skip thorough testing to accommodate new requirements, resulting in a buggy release.',
            'Team members work overtime to meet deadlines, leading to decreased productivity and higher turnover.'
          ]
        }
      ]
    },
    {
      id: 'avoidance',
      title: 'How to Avoid Scope Creep',
      content: [
        {
          subtitle: 'Strategies',
          points: [
            'Define Clear Requirements: Use a Product Requirements Document (PRD) to specify features, acceptance criteria, and constraints upfront.',
            'Implement Change Management: Require formal approval for new requests, assessing impact on timeline and budget.',
            'Align Stakeholders: Reference the Product Vision Document to ensure changes support the core vision.',
            'Prioritize Features: Use the Product Roadmap to focus on high-priority tasks and defer non-essential additions.',
            'Communicate Regularly: Hold frequent reviews with cross-functional teams to clarify expectations.',
            'Set Boundaries: Clearly define what is out of scope during planning to avoid ambiguity.',
            'Monitor Progress: Track OKRs/KPIs to ensure the project stays aligned with original goals.'
          ]
        },
        {
          subtitle: 'Practical Steps',
          points: [
            'Conduct a kickoff meeting to align all teams on the PRD and roadmap.',
            'Use a change request form to document and evaluate new feature proposals.',
            'Review scope in every sprint planning session to catch creep early.'
          ]
        }
      ]
    },
    {
      id: 'examples',
      title: 'Examples and Use Cases',
      content: [
        {
          subtitle: 'Example 1: E-Commerce Platform',
          points: [
            'Scenario: A project to build an e-commerce platform has a PRD specifying product listings, cart, and checkout features. Mid-development, stakeholders request a recommendation engine.',
            'Impact: Adding the engine requires new APIs, data models, and 2 extra months, delaying launch and increasing costs by $30K.',
            'Use Case: The PM rejects the request, citing the PRD, and proposes the engine for Phase 2, keeping the project on track.',
            'Use Case: During sprint planning, the PM uses the Product Roadmap to prioritize checkout optimization over unplanned features.'
          ]
        },
        {
          subtitle: 'Example 2: Fitness App',
          points: [
            'Scenario: A fitness app’s vision focuses on AI-driven workout plans. Stakeholders later request social sharing to compete with rival apps.',
            'Impact: Developers divert resources to build sharing features, delaying the AI module by 6 weeks and introducing UI bugs.',
            'Use Case: The PM references the Product Vision Document to argue that social sharing dilutes the core focus, deferring it to a future release.',
            'Use Case: The PM conducts a stakeholder review to realign on the vision, preventing further scope creep.'
          ]
        },
        {
          subtitle: 'Example 3: SaaS Dashboard',
          points: [
            'Scenario: A SaaS dashboard PRD specifies data visualization widgets. During UAT, users request real-time collaboration tools.',
            'Impact: Adding collaboration requires new backend services, extending development by 3 months and exceeding budget.',
            'Use Case: The PM uses the UAT Plan to limit feedback to predefined requirements, scheduling collaboration for a later phase.',
            'Use Case: The PM updates the Business Case Document to show that delaying collaboration preserves ROI for the initial launch.'
          ]
        }
      ]
    }
  ];

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">Understanding Scope Creep</h1>
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="bg-white p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
              <button
                onClick={() => toggleSection(section.id)}
                className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 flex items-center gap-2 focus:ring-2 focus:ring-indigo-500 transition transform hover:scale-105"
                aria-label={openSections[section.id] ? `Hide ${section.title}` : `Show ${section.title}`}
              >
                {openSections[section.id] ? <FaEyeSlash /> : <FaEye />}
                {openSections[section.id] ? "Hide" : "Show"}
              </button>
            </div>
            {openSections[section.id] && (
              <div className="space-y-4">
                {section.content.map((content, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-medium text-gray-700">{content.subtitle}</h3>
                    {content.text && <p className="text-gray-600">{content.text}</p>}
                    {content.points && (
                      <ul className="list-disc pl-5 text-gray-600">
                        {content.points.map((point, pointIndex) => (
                          <li key={pointIndex}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScopeCreep;