import React, { useState } from 'react';
import { FaRocket, FaCloud, FaProjectDiagram, FaCogs } from 'react-icons/fa';

const apiData = {
  REST: {
    title: 'RESTful API',
    description:
      'RESTful APIs use HTTP methods (GET, POST, PUT, DELETE) to fetch or modify data. For example, a GET request to https://api.example.com/users returns a list of users in JSON format.',
    request: 'GET https://api.example.com/users',
    response: `{
  "users": [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"}
  ]
}`,
    icon: <FaRocket className="text-indigo-600" size={24} />,
  },
  SOAP: {
    title: 'SOAP API',
    description:
      'SOAP APIs rely on XML-based messages. They include a formal contract (WSDL) that defines the operations and data types. For instance, a SOAP request might query account details in a banking system.',
    request: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  <soapenv:Body>
    <getAccountDetails>
      <accountId>12345</accountId>
    </getAccountDetails>
  </soapenv:Body>
</soapenv:Envelope>`,
    response: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  <soapenv:Body>
    <getAccountDetailsResponse>
      <account>
        <id>12345</id>
        <name>John Doe</name>
        <balance>1000</balance>
      </account>
    </getAccountDetailsResponse>
  </soapenv:Body>
</soapenv:Envelope>`,
    icon: <FaCloud className="text-blue-600" size={24} />,
  },
  GraphQL: {
    title: 'GraphQL API',
    description:
      'GraphQL APIs let clients request exactly what they need. A single endpoint is used to query or mutate data. For example, a query might request just the name and email of a user.',
    request: `query {
  user(id: "1") {
    name
    email
  }
}`,
    response: `{
  "data": {
    "user": {
      "name": "Alice",
      "email": "alice@example.com"
    }
  }
}`,
    icon: <FaProjectDiagram className="text-purple-600" size={24} />,
  },
  gRPC: {
    title: 'gRPC API',
    description:
      'gRPC uses Protocol Buffers (protobuf) for serializing structured data and operates over HTTP/2 for high performance. It is commonly used for microservices communication. Calls are defined in .proto files and compiled for efficient binary communication.',
    request: `// gRPC call (pseudo-code)
client.GetUser({ id: 1 }, (error, response) => {
  console.log(response);
});`,
    response: `User {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
}`,
    icon: <FaCogs className="text-green-600" size={24} />,
  },
};

const APISimulation = () => {
  const [selectedAPI, setSelectedAPI] = useState('REST');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const simulateRequest = () => {
    setLoading(true);
    setResult('');
    // Simulate an API call with a delay
    setTimeout(() => {
      setResult(apiData[selectedAPI].response);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-8">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold text-indigo-700">
          Web API Simulation
        </h1>
        <p className="mt-2 text-gray-700 max-w-3xl mx-auto">
          Explore how different web APIs work in a realtime use case. Imagine building a social media dashboard that fetches data from various services.
        </p>
      </header>

      {/* API Selection Tabs */}
      <div className="flex justify-center space-x-4">
        {Object.keys(apiData).map((apiKey) => (
          <button
            key={apiKey}
            onClick={() => {
              setSelectedAPI(apiKey);
              setResult('');
            }}
            className={`px-4 py-2 rounded shadow ${
              selectedAPI === apiKey
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            {apiData[apiKey].title}
          </button>
        ))}
      </div>

      {/* API Details */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto space-y-4">
        <div className="flex items-center gap-3">
          {apiData[selectedAPI].icon}
          <h2 className="text-2xl font-semibold text-gray-800">
            {apiData[selectedAPI].title}
          </h2>
        </div>
        <p className="text-gray-700">{apiData[selectedAPI].description}</p>
        <div>
          <h3 className="text-lg font-bold text-gray-800">Simulated Request</h3>
          <pre className="bg-gray-100 p-3 rounded overflow-auto text-sm text-gray-800">
            {apiData[selectedAPI].request}
          </pre>
        </div>
        <button
          onClick={simulateRequest}
          className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition"
        >
          {loading ? 'Loading...' : 'Simulate API Call'}
        </button>
        {result && (
          <div className="mt-4">
            <h3 className="text-lg font-bold text-gray-800">Response</h3>
            <pre className="bg-gray-100 p-3 rounded overflow-auto text-sm text-gray-800">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default APISimulation;
