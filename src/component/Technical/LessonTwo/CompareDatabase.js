import React, { useRef } from 'react'; 
import { FaDatabase, FaCheckCircle, FaTimesCircle, FaServer, FaDollarSign, FaUsers, FaFileAlt } from 'react-icons/fa'; 


const DatabaseComparison = () => {
  const contentRef = useRef();

  return (
    <div className="container mx-auto p-6" ref={contentRef}>
      <h1 className="text-3xl font-bold mb-4">SQL vs. NoSQL Databases: A Guide for TPMs</h1>
      <p className="mb-6 text-gray-700">
        Understanding when to use SQL (Relational) or NoSQL (Non-relational) databases is critical for making informed decisions about your product's data storage needs.
      </p>
      
      {/* Feature Feasibility */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center"><FaCheckCircle className="mr-2" />1. Feature Feasibility</h2>
        <p className="text-sm mb-4">
          As a TPM, understanding which type of database best fits the needs of your features is key to success:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <FaDatabase className="text-3xl mb-4 text-blue-600" />
            <h3 className="font-semibold text-lg">SQL Database</h3>
            <p className="text-sm">
              Ideal for structured data like customer information (e.g., name, email, address). SQL is best when data integrity and organization are crucial.
            </p>
            <p className="font-semibold text-gray-600">Example: <span className="text-blue-600">Banking Systems</span></p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <FaDatabase className="text-3xl mb-4 text-green-600" />
            <h3 className="font-semibold text-lg">NoSQL Database</h3>
            <p className="text-sm">
              Best for unstructured data like user-generated content, logs, or social media posts. NoSQL allows flexibility and rapid adjustments.
            </p>
            <p className="font-semibold text-gray-600">Example: <span className="text-green-600">Social Media Platforms</span></p>
          </div>
        </div>
      </section>

      {/* Scalability Planning */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center"><FaServer className="mr-2" />2. Scalability Planning</h2>
        <p className="text-sm mb-4">
          As your product grows, you need to ensure the database scales effectively:
        </p>
        <ul className="list-disc pl-6 text-sm">
          <li><strong>SQL:</strong> Best for smaller datasets and structured data, but scaling vertically can become complex.</li>
          <li><strong>NoSQL:</strong> Easily scalable by adding more servers, making it ideal for rapidly growing or unpredictable data.</li>
        </ul>
        <p className="font-semibold text-gray-600 mt-4">Example: <span className="text-blue-600">E-commerce Platforms (SQL)</span>, <span className="text-green-600">Real-Time Analytics (NoSQL)</span></p>
      </section>

      {/* Cost Management */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center"><FaDollarSign className="mr-2" />3. Cost Management</h2>
        <p className="text-sm mb-4">
          Cost efficiency is crucial, and different databases come with different needs:
        </p>
        <ul className="list-disc pl-6 text-sm">
          <li><strong>SQL:</strong> Can become more expensive with scaling, requiring more powerful servers to handle structured data.</li>
          <li><strong>NoSQL:</strong> Can be cheaper for applications with massive datasets due to horizontal scaling and less need for expensive hardware.</li>
        </ul>
      </section>

      {/* Collaboration with Engineering Teams */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center"><FaUsers className="mr-2" />4. Collaboration with Engineering Teams</h2>
        <p className="text-sm mb-4">
          Effective communication with your engineering team is essential. Here’s how each type of database impacts collaboration:
        </p>
        <ul className="list-disc pl-6 text-sm">
          <li><strong>SQL:</strong> Requires more upfront planning for data structure, but ensures consistency and data integrity.</li>
          <li><strong>NoSQL:</strong> Offers flexibility and adaptability but might introduce consistency challenges in distributed systems.</li>
        </ul>
      </section>

      {/* Risk Management */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center"><FaTimesCircle className="mr-2" />5. Risk Management</h2>
        <p className="text-sm mb-4">
          Choosing the wrong database can introduce risks to your product:
        </p>
        <ul className="list-disc pl-6 text-sm">
          <li><strong>SQL:</strong> Difficult to scale when traffic increases, leading to potential slowdowns or crashes.</li>
          <li><strong>NoSQL:</strong> Flexibility can lead to inconsistent data if not managed well across multiple sources.</li>
        </ul>
      </section>

      {/* Decision-Making */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center"><FaFileAlt className="mr-2" />6. Decision-Making</h2>
        <p className="text-sm mb-4">
          As a TPM, you need to make informed decisions about database structure early on:
        </p>
        <ul className="list-disc pl-6 text-sm">
          <li>Guiding your team towards the right database choice based on the product's needs.</li>
          <li>Making decisions that ensure a solid foundation for the product's growth and scalability.</li>
        </ul>
      </section>

      {/* Download Button */}
      
    </div>
  );
};

export default DatabaseComparison;
