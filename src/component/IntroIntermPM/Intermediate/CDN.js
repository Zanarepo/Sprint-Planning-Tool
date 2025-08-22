import React, { useState } from 'react';
import './index.css'; // This file includes Tailwind's directives and custom CSS animations
import CloudInfrastructureInfo from './CloudInfrastructureInfo';

/**
 * App Component
 *
 * Displays two buttons to switch between VPN and CDN simulations.
 * Renders the appropriate simulation and an explanation block that describes:
 * - How the simulation works.
 * - The importance of the concept.
 * - Real-life use cases.
 */
function App() {
  const [simulationType, setSimulationType] = useState('vpn'); // "vpn" or "cdn"

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <CloudInfrastructureInfo/>
      <h1 className="text-3xl font-bold mb-4">CDN and VPN Simulation</h1>
      <div className="flex space-x-4 mb-6">
        {/* Buttons to switch between simulations */}
        <button 
          onClick={() => setSimulationType('vpn')} 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          VPN Simulation
        </button>
        <button 
          onClick={() => setSimulationType('cdn')} 
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          CDN Simulation
        </button>
      </div>
      {/* Render the chosen simulation */}
      {simulationType === 'vpn' ? <VPNSimulation /> : <CDNSimulation />}
      {/* Additional explanation text */}
      <SimulationExplanation simulationType={simulationType} />
    </div>
  );
}

/**
 * VPNSimulation Component
 *
 * Simulates the journey of a data packet through a VPN:
 * - It starts at the "User" box.
 * - It passes through the "VPN Server" box (where encryption is simulated by a color change).
 * - It ends at the "Corporate Server" box.
 *
 * This animation represents the process of encrypting data before it reaches its destination.
 */
function VPNSimulation() {
  return (
    <div className="relative w-full max-w-3xl h-48 border border-gray-300 bg-white rounded shadow-lg mb-6">
      {/* User Box: Represents the remote user initiating the connection */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-40 h-12 bg-gray-200 border border-gray-700 flex items-center justify-center rounded">
        User (Remote)
      </div>
      {/* VPN Server Box: Represents the intermediary where encryption occurs */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-40 h-12 bg-gray-200 border border-gray-700 flex items-center justify-center rounded">
        VPN Server
      </div>
      {/* Corporate Server Box: Represents the secure destination */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-40 h-12 bg-gray-200 border border-gray-700 flex items-center justify-center rounded">
        Corporate Server
      </div>
      {/* Data Packet: Moves along the boxes, changing color to indicate encryption */}
      <div className="absolute w-5 h-5 rounded-full bg-blue-500 vpn-packet"></div>
    </div>
  );
}

/**
 * CDNSimulation Component
 *
 * Simulates content delivery via a CDN:
 * - Several CDN nodes are displayed at different positions.
 * - When "Request Content" is clicked, a data packet appears at a random CDN node.
 * - The packet animates toward the "User" box, simulating the delivery of content from the closest server.
 */
function CDNSimulation() {
  const [packetStyle, setPacketStyle] = useState({ display: 'none' });
  const [isAnimating, setIsAnimating] = useState(false);

  // Define positions for three CDN nodes (simulate different geographical locations)
  const cdnNodes = [
    { id: 'A', left: '10%', top: '10%' },
    { id: 'B', left: '45%', top: '5%' },
    { id: 'C', left: '80%', top: '10%' },
  ];
  // Define the User's position (destination for content)
  const userPosition = { left: '45%', top: '75%' };

  // requestContent triggers the animation that moves the data packet
  // from a randomly chosen CDN node to the User box.
  const requestContent = () => {
    if (isAnimating) return; // Prevent multiple triggers during animation

    // Randomly select a CDN node to simulate the nearest server delivering content
    const node = cdnNodes[Math.floor(Math.random() * cdnNodes.length)];
    // Set the packet's initial position at the selected CDN node
    setPacketStyle({
      display: 'block',
      left: node.left,
      top: node.top,
      transition: 'none'
    });
    setIsAnimating(true);
    // Animate the packet moving to the User box after a short delay
    setTimeout(() => {
      setPacketStyle({
        display: 'block',
        left: userPosition.left,
        top: userPosition.top,
        transition: 'all 2s ease-in-out'
      });
    }, 100);
    // After the animation, reset the packet state
    setTimeout(() => {
      setIsAnimating(false);
      setPacketStyle({ display: 'none' });
    }, 2500);
  };

  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-2xl font-semibold mb-4">CDN Simulation</h2>
      <p className="mb-4 text-gray-600">
        Click "Request Content" to simulate content being delivered from a CDN node to the user.
      </p>
      <button 
        onClick={requestContent} 
        disabled={isAnimating} 
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Request Content
      </button>
      <div className="relative w-full h-96 mt-4 border border-gray-300 bg-gray-50 rounded">
        {/* Render the CDN nodes */}
        {cdnNodes.map((node) => (
          <div
            key={node.id}
            className="absolute w-28 h-12 bg-blue-200 border border-blue-700 flex items-center justify-center rounded"
            style={{ left: node.left, top: node.top }}
          >
            CDN Node {node.id}
          </div>
        ))}
        {/* User Box: Represents the end user receiving content */}
        <div 
          className="absolute w-28 h-12 bg-red-200 border border-red-700 flex items-center justify-center rounded"
          style={{ left: userPosition.left, top: userPosition.top }}
        >
          User
        </div>
        {/* Data Packet: Represents the content being delivered */}
        <div className="absolute w-5 h-5 rounded-full bg-purple-500 cdn-packet" style={packetStyle}></div>
      </div>
    </div>
  );
}

/**
 * SimulationExplanation Component
 *
 * Provides detailed explanation text below the simulation.
 * Explains:
 * - How the simulation works.
 * - The importance of the concept (VPN or CDN).
 * - Real-life use cases for each concept.
 */
function SimulationExplanation({ simulationType }) {
  return (
    <div className="mt-8 max-w-4xl text-left bg-white p-4 border border-gray-300 rounded">
      {simulationType === 'vpn' ? (
        <>
          <h3 className="text-xl font-semibold mb-2">VPN Simulation Explained</h3>
          <p className="mb-2">
            <strong>User Box:</strong> Represents the remote user initiating a connection. VPNs are essential for allowing secure remote access.
          </p>
          <p className="mb-2">
            <strong>VPN Server Box:</strong> Acts as an intermediary that encrypts data (shown by the color change from blue to green). This ensures that any data intercepted en route is unreadable.
          </p>
          <p className="mb-2">
            <strong>Corporate Server Box:</strong> The final destination that receives the encrypted data.
          </p>
          <p className="mb-2">
            <strong>Importance:</strong> VPNs play a crucial role in online security, privacy, and remote work by protecting data over public networks and bypassing geographic restrictions.
          </p>
          <p className="mb-2">
            <strong>Use Cases:</strong> Secure remote access for employees, safe communication over public Wi-Fi, bypassing censorship, and protecting personal data during online transactions.
          </p>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-2">CDN Simulation Explained</h3>
          <p className="mb-2">
            <strong>CDN Nodes:</strong> Represent distributed servers that cache content. The closest node is selected to deliver content quickly.
          </p>
          <p className="mb-2">
            <strong>User Box:</strong> The destination where the content is delivered. This helps in reducing latency and improving user experience.
          </p>
          <p className="mb-2">
            <strong>Importance:</strong> CDNs improve website performance, reduce load times, handle traffic spikes, and protect against DDoS attacks. Fast delivery also benefits SEO.
          </p>
          <p>
            <strong>Use Cases:</strong> Streaming video platforms, e-commerce websites, high-traffic media sites, and any online service that requires fast, reliable content delivery across the globe.
          </p>
        </>
      )}
    </div>
  );
}

export default App;
