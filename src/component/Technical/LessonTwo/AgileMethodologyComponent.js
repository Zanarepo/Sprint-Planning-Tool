

import React, { useRef } from 'react';
import { FaProjectDiagram, FaSync } from 'react-icons/fa';
import ProductBacklog from "./ProductBacklog"
const AgileMethodologyComponent = () => {
  const contentRef = useRef();


  return (
    <div className="container mx-auto p-6" ref={contentRef}>
      <h1 className="text-3xl font-bold mb-4">Agile Methodology & Project Management</h1>
      <p className="mb-6 text-gray-700">
        Agile is a flexible and iterative approach to project management that helps teams deliver high-quality products faster and more efficiently. It focuses on collaboration, customer feedback, and small, manageable work increments.
      </p>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. What is Agile?</h2>
        <p className="text-sm">
          Agile methodology is based on the Agile Manifesto, which focuses on:
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>Individuals and interactions over processes and tools.</li>
          <li>Working software over comprehensive documentation.</li>
          <li>Customer collaboration over contract negotiation.</li>
          <li>Responding to change over following a plan.</li>
        </ul>
        <p className="mt-4">
          <strong>Key Benefits of Agile:</strong>
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>Flexibility: Agile allows for changes even late in the development process.</li>
          <li>Faster Delivery: Short, iterative cycles (called sprints) ensure that features are delivered faster.</li>
          <li>Continuous Improvement: Teams regularly reflect on their work to improve processes.</li>
        </ul>
      </div>

      {/* Scrum Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Agile Frameworks: Scrum</h2>
        <div className="flex items-center mb-4">
          <FaProjectDiagram className="text-3xl mr-2 text-blue-500" />
          <h3 className="text-lg font-semibold">Scrum Framework</h3>
        </div>
        <p className="text-sm">
          Scrum is an Agile framework that divides the development process into Sprints (short cycles of work), and each Sprint delivers a product increment. 
          <strong>Key Scrum Roles:</strong>
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>Product Owner: Defines and prioritizes product features (e.g., user stories).</li>
          <li>Scrum Master: Facilitates Scrum events and removes any obstacles.</li>
          <li>Development Team: The team of engineers that builds the product increment.</li>
        </ul>
        <p className="mt-4">
          <strong>Key Scrum Artifacts:</strong>
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>Product Backlog: A prioritized list of features, bugs, and improvements.</li>
          <li>Sprint Backlog: A subset of tasks from the product backlog for the current Sprint.</li>
          <li>Increment: The working product that is produced after each Sprint.</li>
        </ul>
        <p className="mt-4">
          <strong>Scrum Events:</strong>
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>Sprint Planning: The team plans what to achieve in the Sprint.</li>
          <li>Daily Standups: A quick meeting to sync up on progress.</li>
          <li>Sprint Review: A meeting to demonstrate what was completed.</li>
          <li>Sprint Retrospective: A reflection meeting to improve processes.</li>
        </ul>
      </div>

      {/* Kanban Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Agile Frameworks: Kanban</h2>
        <div className="flex items-center mb-4">
          <FaSync className="text-3xl mr-2 text-green-500" />
          <h3 className="text-lg font-semibold">Kanban Framework</h3>
        </div>
        <p className="text-sm">
          Kanban is an Agile framework that focuses on visualizing the workflow and managing work items through various stages of the process. It’s a continuous flow system, as opposed to Scrum's iterative sprints.
        </p>
        <p className="mt-4">
          <strong>Key Kanban Concepts:</strong>
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>Kanban Board: A visual tool where work items are displayed in columns representing the stages of development (e.g., To Do, In Progress, Done).</li>
          <li>Work In Progress (WIP): Limits the number of tasks in any given stage to avoid bottlenecks.</li>
        </ul>
        <p className="mt-4">
          <strong>Key Benefits of Kanban:</strong>
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>Continuous Delivery: Since there are no Sprints, work is delivered continuously.</li>
          <li>Flexibility: Work can be reprioritized as needed.</li>
          <li>Efficient Workflows: Helps prevent overloading the team with too many tasks at once.</li>
        </ul>
      </div>
<ProductBacklog/>
      {/* User Stories & Epics Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. User Stories & Epics</h2>
        <p className="text-sm">
          <strong>User Stories:</strong> A user story is a short, simple description of a feature from the perspective of the end user.
        </p>
        <p className="mt-4">Example: "As a user, I want to log into my account so that I can access my personal dashboard."</p>
        <p className="mt-4">
          <strong>Epics:</strong> An epic is a large body of work that can be broken down into smaller user stories. 
        </p>
        <p className="mt-4">
          Example: "Account Management" (which could consist of user stories like login, profile editing, password recovery, etc.).
        </p>
      </div>

      {/* Download PDF Button */}
      
    </div>
  );
};

export default AgileMethodologyComponent;

