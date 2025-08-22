import React, { useState } from 'react';

const productDatabaseMapping = {
  "E-commerce Website": {
    type: "SQL",
    simulation: `-- SQL Simulation Example
SELECT * FROM products
WHERE price > 20;`,
    explanation:
      "Relational data, transactions, and inventory management are crucial.",
  },
  "Social Media Platform": {
    type: "NoSQL",
    simulation: `// NoSQL Simulation Example (MongoDB)
db.posts.find({ likes: { $gt: 100 } });`,
    explanation:
      "High scalability and flexible schema are essential for handling dynamic and large volumes of unstructured data.",
  },
  "Blogging Platform": {
    type: "SQL",
    simulation: `-- SQL Simulation Example
SELECT * FROM posts
ORDER BY published_date DESC;`,
    explanation:
      "Relational databases can efficiently manage structured data such as posts and comments with consistent relationships.",
  },
  "Real-time Analytics Dashboard": {
    type: "NoSQL",
    simulation: `// NoSQL Simulation Example (Cassandra)
SELECT * FROM metrics
WHERE timestamp > '2025-01-01';`,
    explanation:
      "NoSQL databases can handle high-speed write operations and distributed data needed for real-time analytics.",
  },
  "Inventory Management System": {
    type: "SQL",
    simulation: `-- SQL Simulation Example
SELECT inventory_level
FROM stock
WHERE item_id = 101;`,
    explanation:
      "Consistency and transaction management are key for inventory systems where data accuracy is critical.",
  },
};

function DatabaseConcepts() {
  const [selectedProduct, setSelectedProduct] = useState("");

  const handleSelect = (e) => {
    setSelectedProduct(e.target.value);
  };

  const recommendation = selectedProduct ? productDatabaseMapping[selectedProduct] : null;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6">
        Understanding Databases: SQL vs NoSQL
      </h1>

      {/* Concepts Section */}
      <section className="mb-8 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Concepts & Use Cases</h2>
        <p className="mb-4">
          <strong>SQL Databases:</strong> Use Structured Query Language (SQL) to manage data in relational tables. They are ideal for applications requiring complex transactions, relationships, and consistency, such as <em>Inventory Management, E-commerce, or Banking</em>.
        </p>
        <p className="mb-4">
          <strong>NoSQL Databases:</strong> Offer a flexible schema and horizontal scalability, making them perfect for handling large volumes of unstructured or semi-structured data. They are often used for <em>Social Media Platforms, Real-time Analytics, and Content Management Systems</em>.
        </p>
        <p>
          The choice between SQL and NoSQL depends on your application's data structure, scalability needs, and transaction complexity.
        </p>
      </section>

      {/* Product Selection */}
      <section className="mb-8 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">
          Select a Product Type to Simulate a Database Use Case
        </h2>
        <select
          value={selectedProduct}
          onChange={handleSelect}
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">-- Select a Product Type --</option>
          {Object.keys(productDatabaseMapping).map((product) => (
            <option key={product} value={product}>
              {product}
            </option>
          ))}
        </select>
      </section>

      {/* Database Simulation & Recommendation */}
      {recommendation && (
        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">
            Database Simulation & Recommendation
          </h2>
          <div className="mb-4">
            <p>
              <strong>Product:</strong> {selectedProduct}
            </p>
            <p>
              <strong>Recommended Database:</strong> {recommendation.type}
            </p>
          </div>
          <div className="mb-4 p-4 bg-gray-50 rounded border">
            <pre className="font-mono text-sm whitespace-pre-wrap">
              {recommendation.simulation}
            </pre>
          </div>
          <div className="p-4 bg-blue-50 rounded">
            <p className="text-blue-700">{recommendation.explanation}</p>
          </div>
        </section>
      )}
    </div>
  );
}

export default DatabaseConcepts;
