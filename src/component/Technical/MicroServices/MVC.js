import React, { useState } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

// Nodes with real-world use cases + MVC process names
const nodes = [
  { id: "intro", data: { label: "What is MVC?" }, position: { x: 0, y: -150 }, style: { background: "#e0f2fe" } },
  { id: "search", data: { label: "User Searches Website" }, position: { x: 0, y: 0 }, style: { background: "#f9fafb" } },
  { id: "view", data: { label: "View (React UI)" }, position: { x: 250, y: 0 }, style: { background: "#bfdbfe" } },
  { id: "order", data: { label: "User Makes Order" }, position: { x: 0, y: 150 }, style: { background: "#f9fafb" } },
  { id: "controller", data: { label: "Controller (API / Logic)" }, position: { x: 250, y: 150 }, style: { background: "#bbf7d0" } },
  { id: "model", data: { label: "Model (Database)" }, position: { x: 500, y: 150 }, style: { background: "#fde68a" } },
  { id: "receive", data: { label: "User Receives Updates" }, position: { x: 0, y: 300 }, style: { background: "#f9fafb" } },
  { id: "notif", data: { label: "Notification Service" }, position: { x: 250, y: 300 }, style: { background: "#fbcfe8" } },
  { id: "pm", data: { label: "Why PMs Should Know MVC" }, position: { x: 0, y: 450 }, style: { background: "#e9d5ff" } },
];

// Edges with process names
const edges = [
  { id: "e-intro-search", source: "intro", target: "search", label: "Concept → User Flow", animated: true },
  { id: "e-search-view", source: "search", target: "view", label: "User views UI", animated: true },
  { id: "e-view-controller", source: "view", target: "controller", label: "Request sent (search/order)", animated: true },
  { id: "e-order-controller", source: "order", target: "controller", label: "Place order", animated: true },
  { id: "e-controller-model", source: "controller", target: "model", label: "Query/Update DB", animated: true },
  { id: "e-model-controller", source: "model", target: "controller", label: "Return results", animated: true },
  { id: "e-controller-view", source: "controller", target: "view", label: "Update UI", animated: true },
  { id: "e-model-notif", source: "model", target: "notif", label: "Trigger event", animated: true },
  { id: "e-notif-receive", source: "notif", target: "receive", label: "Real-time updates", animated: true },
  { id: "e-receive-pm", source: "receive", target: "pm", label: "User outcome → PM value", animated: true },
];

// Explanations with real-world examples, tools, and PM value
const explanations = {
  intro: {
    title: "What is MVC?",
    text: "MVC (Model-View-Controller) is a software design pattern that separates concerns: the View handles the interface, the Controller processes input, and the Model manages data. It ensures clarity, scalability, and maintainability.",
    tools: "Frameworks like React (View), Express/Rails (Controller), PostgreSQL/MongoDB (Model)",
    pm: "PMs should understand MVC to map user needs to technical layers, prioritize effectively, and communicate clearly with engineers."
  },
  search: {
    title: "User Searches Website",
    text: "A customer opens the website/app and searches for food or services. This is the starting point of interaction with the View.",
    tools: "Browsers, Mobile apps, Search components",
    pm: "PMs should know how the View is optimized for discoverability and ease of use."
  },
  view: {
    title: "View (React UI)",
    text: "The user interface presents the search results, menus, and order forms. This is the ‘V’ in MVC: it shows data from the model and captures user actions.",
    tools: "React, TailwindCSS, Next.js",
    pm: "PMs should ensure views align with customer needs, are accessible, and support real-time updates."
  },
  order: {
    title: "User Makes Order",
    text: "The user selects items and places an order. The request is sent through the controller for processing.",
    tools: "Order forms, Payment UI",
    pm: "PMs should know how the View passes data to the Controller and how UX can reduce friction."
  },
  controller: {
    title: "Controller (API / Logic)",
    text: "The controller is the brain. It receives requests (place order, fetch restaurants), applies business logic, and communicates with the Model.",
    tools: "API Gateway, Express.js, Rails, Authentication",
    pm: "PMs can understand trade-offs here (e.g., performance bottlenecks, business rules)."
  },
  model: {
    title: "Model (Database)",
    text: "The Model stores and manages business data like users, orders, and restaurants. It ensures integrity and consistency.",
    tools: "PostgreSQL, MongoDB, Redis",
    pm: "PMs should know why data accuracy matters for features like order tracking."
  },
  receive: {
    title: "User Receives Updates",
    text: "The user sees real-time notifications — e.g., order confirmed, driver assigned, driver approaching.",
    tools: "Mobile push notifications, WebSockets",
    pm: "PMs must prioritize timely, clear communication to boost customer trust."
  },
  notif: {
    title: "Notification Service",
    text: "Pushes real-time updates (driver location, order status) from the Model back to the View.",
    tools: "WebSockets, Kafka, Firebase",
    pm: "PMs should recognize the value of real-time systems for customer satisfaction."
  },
  pm: {
    title: "Why PMs Should Know MVC",
    text: "Understanding MVC helps PMs bridge business needs and technical execution. It shows how user actions map to backend processes and data, clarifying dependencies and risks.",
    tools: "Documentation tools, Lucidchart, Jira for planning",
    pm: "With MVC knowledge, PMs can: (1) Prioritize features by layer impact, (2) Spot potential risks early, (3) Communicate effectively with engineers, (4) Advocate for scalable, user-focused design."
  }
};

export default function MVCInteractiveFlow() {
  const [selectedNode, setSelectedNode] = useState(null);

  return (
    <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-3">
      <h1 className="text-3xl font-bold mb-4">Understanding MVC for Product Managers</h1>
        <p className="text-gray-700 mb-6">
        This interactive diagram illustrates the Model-View-Controller (MVC) architecture using a real-world example of a food delivery app. Click on each process node to see its use case, tools involved, and why it's important for Product Managers to understand. 
        </p>
        </div>
      {/* Left side: Flow diagram */}
      <div className="md:col-span-2 h-[750px] border rounded-2xl shadow-md">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          style={{ height: "100%" }}
          onNodeClick={(_, node) => setSelectedNode(node.id)}
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>

      {/* Right side: Explainer panel */}
      <div className="border rounded-2xl shadow-md p-4 bg-gray-50">
        {selectedNode ? (
          <div>
            <h2 className="text-xl font-bold mb-2">{explanations[selectedNode].title}</h2>
            <p className="mb-4">{explanations[selectedNode].text}</p>
            <p className="text-sm text-gray-700"><strong>Tools:</strong> {explanations[selectedNode].tools}</p>
            <p className="text-sm text-gray-700 mt-2"><strong>PM Value:</strong> {explanations[selectedNode].pm}</p>
          </div>
        ) : (
          <p className="text-gray-600">Click a process node to see its real-life use case, tools, and PM value.</p>
        )}
      </div>
    </div>
  );
}
