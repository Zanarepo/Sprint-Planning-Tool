import React, { useState } from 'react';
import './App.css';
import Nosql2 from './Nosql2'; // Assuming Nosql2 is in the same directory

function App() {
  // Simulated NoSQL collection stored in state
  const [documents, setDocuments] = useState([]);
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    email: '',
    posts: '',
    friends: ''
  });
  const [message, setMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission: add a new document
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new document object
    const newDoc = {
      userId: formData.userId || (documents.length + 1).toString(),
      name: formData.name,
      email: formData.email,
      posts: formData.posts ? formData.posts.split(',').map(s => s.trim()) : [],
      friends: formData.friends ? formData.friends.split(',').map(s => s.trim()) : []
    };

    setDocuments([...documents, newDoc]);
    setMessage(`Document for user "${newDoc.name}" added successfully!`);
    // Reset form
    setFormData({
      userId: '',
      name: '',
      email: '',
      posts: '',
      friends: ''
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar with explanation */}
      <aside className="bg-blue-600 text-white p-6 md:w-1/3">
        <h2 className="text-2xl font-bold mb-4">NoSQL Databases</h2>
        <p className="mb-2">
          <strong>When to use NoSQL?</strong>
          <br />
          NoSQL databases are perfect for applications that need a flexible schema, high scalability, and fast performance on unstructured or semi-structured data.
        </p>
        <p className="mb-2">
          <strong>Products Using NoSQL:</strong>
          <ul className="list-disc ml-6">
            <li>Amazon DynamoDB</li>
            <li>MongoDB</li>
            <li>Apache Cassandra</li>
            <li>Couchbase</li>
          </ul>
        </p>
        <p>
          <strong>Examples of NoSQL Databases:</strong> MongoDB, Apache Cassandra, Redis, CouchDB.
        </p>
      </aside>

      {/* Main simulator area */}
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-6">Facebook Users Collection Simulator</h1>

        {/* Form to add new document */}
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text"
              name="userId"
              placeholder="User ID (optional)"
              value={formData.userId}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input 
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input 
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input 
              type="text"
              name="posts"
              placeholder="Posts (comma-separated)"
              value={formData.posts}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input 
              type="text"
              name="friends"
              placeholder="Friends (comma-separated)"
              value={formData.friends}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button 
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Document
            </button>
          </form>
          {message && (
            <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
              {message}
            </div>
          )}
        </div>

        {/* Display simulated collection */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4">User ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Posts</th>
                <th className="py-3 px-4">Friends</th>
              </tr>
            </thead>
            <tbody>
              {documents.length > 0 ? (
                documents.map((doc, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{doc.userId}</td>
                    <td className="py-2 px-4">{doc.name}</td>
                    <td className="py-2 px-4">{doc.email}</td>
                    <td className="py-2 px-4">
                      {doc.posts.length > 0 ? doc.posts.join(', ') : 'N/A'}
                    </td>
                    <td className="py-2 px-4">
                      {doc.friends.length > 0 ? doc.friends.join(', ') : 'N/A'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">No documents yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      <Nosql2/>
    </div>
  );
}

export default App;
