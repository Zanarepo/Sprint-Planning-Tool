import React from 'react';

// Sample semi-structured data (documents can have variable structure)
const semiStructuredData = [
  {
    id: 1,
    name: 'Alice Johnson',
    attributes: { age: 28, location: 'New York', interests: ['reading', 'hiking'] },
    tags: ['active', 'premium']
  },
  {
    id: 2,
    name: 'Bob Smith',
    attributes: { age: 35, location: 'San Francisco' },
    tags: ['inactive']
  }
];

// Sample unstructured data (free text documents)

function SemiStructuredTable() {
  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Semi-Structured Data</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Attributes</th>
            <th className="py-2 px-4">Tags</th>
          </tr>
        </thead>
        <tbody>
          {semiStructuredData.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4">{item.id}</td>
              <td className="py-2 px-4">{item.name}</td>
              <td className="py-2 px-4">
                <pre className="text-sm whitespace-pre-wrap">
                  {JSON.stringify(item.attributes, null, 2)}
                </pre>
              </td>
              <td className="py-2 px-4">{item.tags.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">NoSQL Data Simulator</h1>
        <p className="text-gray-600 mt-2">
          Demonstration of Semi-Structured & Unstructured Data Tables
        </p>
      </header>
      <div className="container mx-auto space-y-12">
        <SemiStructuredTable />
       
      </div>
      
    </div>
    
  );
}

export default App;
