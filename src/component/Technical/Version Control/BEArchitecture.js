import React from 'react';
import { FaServer, FaHandshake, FaCloud, FaDollarSign, FaBullseye, FaSyncAlt, FaFileSignature } from 'react-icons/fa'; // Importing relevant icons

import InteractiveBackendClass from './InteractiveBackendClass'

const Architecture = () => {


  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-blue-600 text-white py-6 text-center">
        <h1 className="text-3xl font-bold">Understanding Backend Servers: A Guide for TPMs</h1>
        <p className="mt-2">Learn about backend architecture, scalability, and more!</p>
      </header>

      <main id="content" className="p-6">
        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <FaServer className="text-blue-500" /> Improved Communication with Engineers
          </h2>
          <p>
            Engineers often make architectural decisions that affect scalability, performance, and reliability. As a TPM, knowing about multiple backend servers and distributed systems allows you to:
            <ul className="list-disc pl-6">
              <li>Ask informed questions.</li>
              <li>Understand the trade-offs in technical decisions.</li>
              <li>Contribute effectively to discussions on backend designs.</li>
            </ul>
          </p>
          <img src="path_to_server_image1.jpg" alt="Server Architecture" className="mt-4 w-full h-auto rounded-lg" />
        </section>

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <FaCloud className="text-green-500" /> Planning for Scalability
          </h2>
          <p>
            Systems scale horizontally by adding more servers. Understanding this helps you set realistic expectations and advocate for resource allocation during product growth.
            <ul className="list-disc pl-6">
              <li>Push for backend optimization and additional servers as needed.</li>
              <li>Plan ahead for handling increased user traffic.</li>
            </ul>
          </p>
          <img src="path_to_server_image2.jpg" alt="Scalable Server Architecture" className="mt-4 w-full h-auto rounded-lg" />
        </section>

        {/* Section 3 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <FaHandshake className="text-yellow-500" /> Collaboration with DevOps Teams
          </h2>
          <p>
            Understanding backend systems helps you collaborate on infrastructure roadmaps and discuss challenges like server outages or latency.
            <ul className="list-disc pl-6">
              <li>Collaborate effectively on server scaling and performance monitoring.</li>
              <li>Understand technical challenges during peak traffic.</li>
            </ul>
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <FaDollarSign className="text-purple-500" /> Budget and Cost Management
          </h2>
          <p>
            Running multiple backend servers involves costs for hardware, cloud services, and maintenance. As a TPM, understanding this allows you to justify expenses with finance teams.
            <ul className="list-disc pl-6">
              <li>Work with finance teams to allocate budgets for additional servers.</li>
              <li>Justify the expenses for scaling the infrastructure.</li>
            </ul>
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <FaBullseye className="text-red-500" /> Aligning Technical and Business Goals
          </h2>
          <p>
            The product's backend architecture affects user experience, reliability, and global reach. Ensuring the backend aligns with business goals helps deliver a seamless product experience.
            <ul className="list-disc pl-6">
              <li>Enhance user experience by ensuring fast response times.</li>
              <li>Deploy servers closer to new user regions to improve performance.</li>
            </ul>
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <FaSyncAlt className="text-orange-500" /> Risk Mitigation and Trade-offs
          </h2>
          <p>
            Knowing how systems are designed helps you assess risks and proactively address potential failures, such as system crashes or server overloads.
            <ul className="list-disc pl-6">
              <li>Identify risks related to server crashes and server overloads.</li>
              <li>Advocate for a robust architecture with redundancy.</li>
            </ul>
          </p>
        </section>

        {/* Section 7 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <FaFileSignature className="text-blue-500" /> Prioritizing Features Based on Backend Capabilities
          </h2>
          <p>
            Understanding the backend allows you to prioritize features based on their technical requirements, such as adding servers or optimizing databases.
            <ul className="list-disc pl-6">
              <li>Prioritize features realistically based on backend readiness.</li>
              <li>Align development efforts with infrastructure requirements.</li>
            </ul>
          </p>
        </section>

        {/* Download PDF Button */}
  

        <footer className="text-center text-sm text-gray-600 mt-10">
          <p>Knowledge of backend architecture helps you bridge communication gaps, manage risks, and deliver successful products.</p>
        </footer>
      </main>
      <InteractiveBackendClass/>
    </div>
  );
};

export default Architecture;
