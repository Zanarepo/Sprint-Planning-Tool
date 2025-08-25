import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

// Tile Component
const Tile = ({ title, icon, children, diagram }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full">
      <div
        className="flex items-center justify-between mb-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {icon}
          <h2 className="text-xl font-bold ml-3 text-gray-800">{title}</h2>
        </div>
        {isOpen ? (
          <ChevronUpIcon className="w-6 h-6 text-gray-500" />
        ) : (
          <ChevronDownIcon className="w-6 h-6 text-gray-500" />
        )}
      </div>
      {isOpen && (
        <div className="text-gray-700">
          {children}
          {diagram && (
            <div className="mt-4 h-[300px] w-full bg-gray-50 rounded-lg">
              {diagram}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Example diagrams with React Flow
const apiGatewayDiagram = (
  <ReactFlow
    nodes={[
      { id: "1", position: { x: 50, y: 100 }, data: { label: "Client" }, style:{background:"#dbeafe"} },
      { id: "2", position: { x: 250, y: 100 }, data: { label: "API Gateway" }, style:{background:"#fef3c7"} },
      { id: "3", position: { x: 500, y: 50 }, data: { label: "User Service" }, style:{background:"#dcfce7"} },
      { id: "4", position: { x: 500, y: 150 }, data: { label: "Order Service" }, style:{background:"#dcfce7"} },
    ]}
    edges={[
      { id: "e1-2", source: "1", target: "2", label: "Request" },
      { id: "e2-3", source: "2", target: "3", label: "Route" },
      { id: "e2-4", source: "2", target: "4", label: "Route" },
    ]}
    fitView
  >
    <Background />
    <Controls />
  </ReactFlow>
);

const loadBalancerDiagram = (
  <ReactFlow
    nodes={[
      { id: "1", position: { x: 50, y: 100 }, data: { label: "Client" }, style:{background:"#dbeafe"} },
      { id: "2", position: { x: 250, y: 100 }, data: { label: "Load Balancer" }, style:{background:"#fef3c7"} },
      { id: "3", position: { x: 500, y: 50 }, data: { label: "Instance A" }, style:{background:"#dcfce7"} },
      { id: "4", position: { x: 500, y: 150 }, data: { label: "Instance B" }, style:{background:"#dcfce7"} },
    ]}
    edges={[
      { id: "e1-2", source: "1", target: "2", label: "Request" },
      { id: "e2-3", source: "2", target: "3", label: "Distribute" },
      { id: "e2-4", source: "2", target: "4", label: "Distribute" },
    ]}
    fitView
  >
    <Background />
    <Controls />
  </ReactFlow>
);

const serviceDiscoveryDiagram = (
  <ReactFlow
    nodes={[
      { id: "1", position: { x: 50, y: 100 }, data: { label: "API Gateway" }, style:{background:"#fef3c7"} },
      { id: "2", position: { x: 250, y: 50 }, data: { label: "Service Discovery" }, style:{background:"#fde68a"} },
      { id: "3", position: { x: 450, y: 50 }, data: { label: "User Service (Healthy)" }, style:{background:"#dcfce7"} },
      { id: "4", position: { x: 450, y: 150 }, data: { label: "Order Service (Healthy)" }, style:{background:"#dcfce7"} },
    ]}
    edges={[
      { id: "e1-2", source: "1", target: "2", label: "Lookup" },
      { id: "e2-3", source: "2", target: "3", label: "Route" },
      { id: "e2-4", source: "2", target: "4", label: "Route" },
    ]}
    fitView
  >
    <Background />
    <Controls />
  </ReactFlow>
);

// Main Component
const ApiGatewayComponent = () => {
  return (
    <div className="min-h-screen bg-white p-4 sm:p-8 w-full">
      <div className="mx-auto w-full">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-yellow-800 flex items-center justify-center">
          📊 API Gateway & Microservices Visualizer
        </h1>

        <Tile
          title="API Gateway"
          icon={<span className="text-blue-500">🔗</span>}
          diagram={apiGatewayDiagram}
        >
          <p>
            Acts as a single entry point for clients. Routes requests to the
            appropriate service.
          </p>
        </Tile>

        <Tile
          title="Load Balancer"
          icon={<span className="text-green-500">⚖️</span>}
          diagram={loadBalancerDiagram}
        >
          <p>Distributes traffic evenly across multiple service instances.</p>
        </Tile>

        <Tile
          title="Service Discovery"
          icon={<span className="text-yellow-500">🔍</span>}
          diagram={serviceDiscoveryDiagram}
        >
          <p>Finds healthy services dynamically to handle client requests.</p>
        </Tile>
      </div>
    </div>
  );
};

export default ApiGatewayComponent;
