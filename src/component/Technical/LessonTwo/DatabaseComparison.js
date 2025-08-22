import React, { useRef } from 'react'; 
import { FaDatabase } from 'react-icons/fa'; 

import CompareDatabase from './CompareDatabase'



const DatabaseComparison = () => {
  const contentRef = useRef();


  return (
    <div className="container mx-auto p-6" ref={contentRef}>
      <h1 className="text-3xl font-bold mb-4">Understanding SQL vs. NoSQL Databases for TPMs</h1>
      <p className="mb-6 text-gray-700">
        As a Technical Product Manager (TPM), understanding when to use SQL (Relational) vs. NoSQL (Non-relational) databases is essential for choosing the right data storage solution for your product.
      </p>
      
      {/* SQL Database Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">SQL (Relational) Databases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <FaDatabase className="text-3xl mb-4 text-blue-600" />
            <h3 className="font-semibold text-lg">What It Is</h3>
            <p className="text-sm">
              SQL databases store data in structured tables (rows and columns) and are best for applications that require complex queries and strong data consistency. They are useful for transactional systems.
            </p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <h3 className="font-semibold text-lg">Example Use Cases</h3>
            <p className="text-sm">
              SQL databases are great for applications where data integrity is crucial, like e-commerce platforms or banking systems.
            </p>
          </div>
        </div>
        
        {/* Example SQL Database Structure */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-lg mb-6">
          <h3 className="font-semibold text-lg mb-4">SQL Database Example (E-commerce)</h3>
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Customer Table</th>
                <th className="border border-gray-300 p-2">Orders Table</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">ID | Name | Email | Address</td>
                <td className="border border-gray-300 p-2">OrderID | CustomerID | ProductID | Quantity | Date</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">1 | John Doe | john@example.com | 123 Main St</td>
                <td className="border border-gray-300 p-2">1 | 1 | 101 | 2 | 2025-01-24</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      
      {/* NoSQL Database Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">NoSQL (Non-relational) Databases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <FaDatabase className="text-3xl mb-4 text-green-600" />
            <h3 className="font-semibold text-lg">What It Is</h3>
            <p className="text-sm">
              NoSQL databases store data in a more flexible way than SQL databases. They can handle unstructured data, making them great for applications with dynamic schemas, large-scale data, or high-performance needs.
            </p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <h3 className="font-semibold text-lg">Example Use Cases</h3>
            <p className="text-sm">
              NoSQL databases are ideal for applications like social media platforms or real-time analytics, where scalability and flexibility are important.
            </p>
          </div>
        </div>

        {/* Example NoSQL Database Structure */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-lg mb-6">
          <h3 className="font-semibold text-lg mb-4">NoSQL Database Example (Social Media)</h3>
          <pre className="bg-gray-200 p-4 rounded-lg">
            <code>
              {
                `User Collection:
{
  "_id": "123",
  "username": "john_doe",
  "posts": [
    {
      "post_id": "001",
      "content": "Hello World!",
      "date": "2025-01-24"
    },
    {
      "post_id": "002",
      "content": "My first post on this platform.",
      "date": "2025-01-25"
    }
  ]
}
`
              }
            </code>
          </pre>
        </div>
      </section>
<CompareDatabase/>
      {/* Download Button */}
      
    </div>
  );
};

export default DatabaseComparison;
