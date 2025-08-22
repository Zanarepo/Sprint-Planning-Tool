import React, { useRef } from 'react'; 
import { FaServer, FaCar, FaTrafficLight, FaClipboardList, FaGlobe } from 'react-icons/fa';

import MicroserviceSimulations from './MicroserviceSimulations'

const TPMArchitectureGuide = () => {
  const contentRef = useRef();

  return (
    <div className="container mx-auto p-6" ref={contentRef}>
      <h1 className="text-3xl font-bold mb-4">System Architecture Guide for TPMs</h1>
      <p className="mb-6 text-gray-700">
        For a Technical Product Manager (TPM), understanding various system architectures, including microservices, monoliths, and load balancing, is crucial to scaling, securing, and optimizing products.
      </p>

      

      {/* Microservices Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Microservices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <FaServer className="text-3xl mb-4 text-blue-600" />
            <h3 className="font-semibold text-lg">What It Is</h3>
            <p className="text-sm">
              Microservices are independent services that can be scaled and updated independently, similar to how load balancers distribute traffic across different servers.
            </p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <h3 className="font-semibold text-lg">Benefits & Drawbacks</h3>
            <p className="mb-2 text-sm">
              <strong>Benefits:</strong> Scalability, flexibility, and fault isolation.
            </p>
            <p className="text-sm">
              <strong>Drawbacks:</strong> Complexity, overhead in communication between services.
            </p>
          </div>
        </div>
      </section>

      {/* Monoliths Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Monoliths</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <FaCar className="text-3xl mb-4 text-green-600" />
            <h3 className="font-semibold text-lg">What It Is</h3>
            <p className="text-sm">
              A monolithic architecture is one where all components of an application are bundled together. This structure often leads to scaling issues if not supported by proper infrastructure, like load balancing.
            </p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <h3 className="font-semibold text-lg">Benefits & Drawbacks</h3>
            <p className="mb-2 text-sm">
              <strong>Benefits:</strong> Simplicity and better performance when scaling vertically.
            </p>
            <p className="text-sm">
              <strong>Drawbacks:</strong> Difficult to scale and maintain in large applications.
            </p>
          </div>
        </div>
      </section>

      {/* Load Balancer Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Load Balancers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <FaTrafficLight className="text-3xl mb-4 text-yellow-600" />
            <h3 className="font-semibold text-lg">What It Is</h3>
            <p className="text-sm">
              A load balancer acts as a middleman that distributes incoming network traffic across multiple servers to optimize performance and availability.
            </p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <h3 className="font-semibold text-lg">Benefits & Use Case</h3>
            <p className="text-sm">
              <strong>Benefits:</strong> Improved reliability, availability, and fault tolerance.
            </p>
            <p className="text-sm">
              <strong>Example:</strong> Distributing traffic among servers to ensure a smooth experience in video streaming apps.
            </p>
          </div>
        </div>
      </section>

      {/* Key Architecture Patterns Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Key Architecture Patterns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <FaClipboardList className="text-3xl mb-4 text-purple-600" />
            <h3 className="font-semibold text-lg">Client-Server</h3>
            <p className="text-sm">
              A basic architecture where clients make requests to servers for resources. Load balancing can help scale this pattern by distributing the client requests.
            </p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <FaGlobe className="text-3xl mb-4 text-red-600" />
            <h3 className="font-semibold text-lg">Event-Driven</h3>
            <p className="text-sm">
              A system where components react to events. This architecture benefits from load balancing by ensuring events are handled by available resources.
            </p>
          </div>
        </div>
      </section>
      
{/* Why These Concepts Matter for a TPM */}
<section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Why These Concepts Matter for a TPM</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Feature Feasibility:</strong> Understanding system architecture helps you assess the technical feasibility of features (e.g., real-time updates, high concurrency).
          </li>
          <li>
            <strong>Scalability Planning:</strong> Helps you plan for traffic growth and make decisions about when to move from a monolith to microservices or add caching.
          </li>
          <li>
            <strong>Collaborating with Engineering Teams:</strong> Enables you to discuss trade-offs (e.g., microservices vs. monoliths) and advocate for technical investments.
          </li>
          <li>
            <strong>Risk Management:</strong> Knowing the role of load balancers and caching allows you to identify risks, like server overload or slow response times.
          </li>
          <li>
            <strong>Budget Management:</strong> Helps you understand how technical decisions (e.g., adding servers, using caching) impact cloud and infrastructure costs.
          </li>
        </ul>

        <MicroserviceSimulations/>
      </section>
      {/* Download Button */}
      
    </div>
  );
};

export default TPMArchitectureGuide;
