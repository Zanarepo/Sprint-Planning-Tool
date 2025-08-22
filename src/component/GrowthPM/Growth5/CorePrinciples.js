import React from 'react';
import { 
  FaServer, 

  FaRobot, 
  
  FaTasks, 
  
  FaNetworkWired 
} from 'react-icons/fa';

const CorePrinciples = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Module Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">S2. Core Principles</h1>
        
        {/* A. Technical Scalability */}
        <section className="mb-8">
          <div className="flex items-center mb-4">
            <FaServer className="text-3xl text-blue-500 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">A. Technical Scalability</h2>
          </div>
          
          {/* Architect for Growth */}
          <div className="mb-4 pl-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-1">Architect for Growth:</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              <li>Use modular systems (e.g., microservices, serverless architecture).</li>
              <li>
                <span className="font-semibold">Example:</span> Netflix’s shift from monolithic to cloud-based microservices.
              </li>
            </ul>
          </div>

          {/* Leverage Cloud Infrastructure */}
          <div className="mb-4 pl-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-1">Leverage Cloud Infrastructure:</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              <li>Auto-scaling (AWS, Google Cloud) adjusts resources based on demand.</li>
              <li>Pay-as-you-go models reduce upfront costs.</li>
            </ul>
          </div>

          {/* Optimize Databases */}
          <div className="pl-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-1">Optimize Databases:</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              <li>Use sharding, caching (Redis), or NoSQL databases (MongoDB) for high read/write loads.</li>
            </ul>
          </div>
        </section>

        {/* B. Process Automation */}
        <section className="mb-8">
          <div className="flex items-center mb-4">
            <FaRobot className="text-3xl text-green-500 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">B. Process Automation</h2>
          </div>
          
          {/* CI/CD Pipelines */}
          <div className="mb-4 pl-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-1">CI/CD Pipelines:</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              <li>Automate code testing, deployment, and monitoring (e.g., GitHub Actions, Jenkins).</li>
            </ul>
          </div>
          
          {/* Automated Testing */}
          <div className="mb-4 pl-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-1">Automated Testing:</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              <li>Unit tests, integration tests, and tools like Selenium ensure code quality.</li>
            </ul>
          </div>
          
          {/* Infrastructure as Code (IaC) */}
          <div className="pl-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-1">Infrastructure as Code (IaC):</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              <li>Tools like Terraform or AWS CloudFormation automate server provisioning.</li>
            </ul>
          </div>
        </section>

        {/* C. Scalable Processes */}
        <section className="mb-8">
          <div className="flex items-center mb-4">
            <FaTasks className="text-3xl text-purple-500 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">C. Scalable Processes</h2>
          </div>
          
          {/* Agile Workflows */}
          <div className="mb-4 pl-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-1">Agile Workflows:</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              <li>Automate task management (Jira, Trello) and sprint planning.</li>
            </ul>
          </div>
          
          {/* Documentation */}
          <div className="pl-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-1">Documentation:</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              <li>Create self-serve resources (e.g., wikis, chatbots) to reduce dependency on human support.</li>
            </ul>
          </div>
        </section>

        {/* D. Resource Management */}
        <section>
          <div className="flex items-center mb-4">
            <FaNetworkWired className="text-3xl text-red-500 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">D. Resource Management</h2>
          </div>
          
          {/* Auto-Scaling */}
          <div className="mb-4 pl-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-1">Auto-Scaling:</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              <li>Set rules to add/remove servers based on metrics (CPU usage, requests per second).</li>
            </ul>
          </div>
          
          {/* Load Balancing */}
          <div className="pl-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-1">Load Balancing:</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              <li>Distribute traffic across servers (e.g., NGINX, AWS Elastic Load Balancer).</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CorePrinciples;
