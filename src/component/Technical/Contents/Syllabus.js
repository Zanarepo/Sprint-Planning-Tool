import React, { useState } from 'react';

const curriculumData = [
  {
    module: "Module 1: Practical Basics of Product Management",
    objective:
      "Introduce the fundamentals, including what PM is, the core responsibilities, and essential frameworks and tools.",
    episodes: [
      {
        title: "Introduction to Product Management",
        content:
          "Define the role, explain day-to-day responsibilities, and introduce common frameworks (e.g., Lean, Agile).",
        format:
          "Talking head with overlay graphics and screen recordings of frameworks or simple diagrams.",
      },
      {
        title: "User Research & Validation",
        content:
          "Show practical ways to conduct user interviews, surveys, and usability tests.",
        format:
          "Screen recordings, on-site interviews (or simulated sessions), and tool walkthroughs (e.g., using SurveyMonkey or Typeform).",
      },
      {
        title: "Building a Product Roadmap",
        content:
          "Demonstrate how to create a roadmap using tools like Notion, Trello, or Miro.",
        format:
          "Live screen recording with step-by-step commentary.",
      },
      {
        title: "Writing User Stories & Requirements",
        content:
          "Explain how to break down features into user stories with clear acceptance criteria.",
        format:
          "Real-world examples on a whiteboard or screen sharing a document.",
      },
      {
        title: "Prioritization Techniques (RICE, MoSCoW, etc.)",
        content:
          "Walk through different prioritization frameworks with a practical example for each.",
        format:
          "Comparison charts, interactive polls, and case study examples.",
      },
    ],
  },
  {
    module: "Module 2: Practical Growth Product Management",
    objective:
      "Teach strategies and tactics for driving product growth through data, experimentation, and innovative techniques.",
    episodes: [
      {
        title: "Introduction to Growth PM",
        content:
          "Define Growth PM and explain how it differs from traditional PM roles.",
        format: "Talking head with dynamic slides and graphics.",
      },
      {
        title: "Key Metrics & Growth Funnels",
        content:
          "Break down important KPIs, conversion rates, retention metrics, and how to build a growth funnel.",
        format:
          "Live analytics dashboard walkthroughs, using tools like Google Analytics or Mixpanel.",
      },
      {
        title: "A/B Testing and Experimentation",
        content:
          "Guide your audience through setting up A/B tests, analyzing results, and iterating on features.",
        format:
          "Screen recordings of test setups, case studies, and tips for interpreting data.",
      },
      {
        title: "Growth Hacking Tactics",
        content:
          "Share hands-on examples of low-budget, high-impact tactics (viral loops, referral programs, etc.).",
        format:
          "Real-life case examples, storytelling, and visual demonstrations of campaign setups.",
      },
      {
        title: "Leveraging Data for Product Decisions",
        content:
          "Show how to build dashboards and reports, and how data drives feature prioritization and product iterations.",
        format:
          "Tutorial on dashboard creation using tools like Tableau, Looker, or even Excel.",
      },
    ],
  },
  {
    module: "Module 3: Practical Technical Product Management",
    objective:
      "Equip PMs with the technical know-how to communicate effectively with engineering teams and manage technical products.",
    episodes: [
      {
        title: "What is a Technical PM?",
        content:
          "Discuss the role, required technical skills, and how it differs from the more general PM role.",
        format:
          "Interview-style discussion or a solo explainer with technical diagrams.",
      },
      {
        title: "Managing Technical Backlogs & Writing Technical Specs",
        content:
          "Demonstrate how to create and manage a technical backlog and write clear, actionable technical specifications.",
        format:
          "Screen recordings of project management tools (e.g., Jira) and real-life document walkthroughs.",
      },
      {
        title: "Understanding APIs & Technical Documentation",
        content:
          "Provide a practical guide to understanding APIs, reading technical documentation, and using tools like Postman.",
        format:
          "Live demo showing how to make API calls and interpret documentation.",
      },
      {
        title: "Agile & Scrum for Technical PMs",
        content:
          "Offer a deep dive into agile frameworks, sprint planning, and how to leverage these methodologies in tech projects.",
        format:
          "Combination of screen recordings from Agile boards and real-world examples from your experience.",
      },
      {
        title: "Bridging the Communication Gap Between Tech & Business",
        content:
          "Share practical strategies for facilitating communication between engineers and non-technical stakeholders.",
        format:
          "Role-play scenarios, tips for effective meetings, and communication frameworks.",
      },
    ],
  },
];

const CurriculumOverview = () => {
  const [selected, setSelected] = useState(null);

  const handleTileClick = (moduleIndex, episodeIndex) => {
    const key = `${moduleIndex}-${episodeIndex}`;
    // Toggle if the same tile is clicked
    setSelected(selected === key ? null : key);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Curriculum Overview</h1>
      {curriculumData.map((module, mIndex) => (
        <div key={mIndex} className="mb-12">
          <h2 className="text-2xl font-semibold mb-2">{module.module}</h2>
          <p className="mb-4 text-gray-700">{module.objective}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {module.episodes.map((episode, eIndex) => {
              const key = `${mIndex}-${eIndex}`;
              const isSelected = selected === key;
              return (
                <div
                  key={key}
                  className="bg-white shadow rounded-lg cursor-pointer border border-gray-200 hover:border-blue-400 transition-all"
                  onClick={() => handleTileClick(mIndex, eIndex)}
                >
                  <div className="p-4">
                    <h3 className="text-xl font-medium">{episode.title}</h3>
                    {isSelected && (
                      <div className="mt-3 border-t pt-3 text-gray-600">
                        <p className="mb-2">
                          <span className="font-semibold">Content: </span>
                          {episode.content}
                        </p>
                        <p>
                          <span className="font-semibold">Format: </span>
                          {episode.format}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CurriculumOverview;
