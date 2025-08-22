import { useState } from "react";

const RiskManagementSimulation = () => {
  const [trafficLoad, setTrafficLoad] = useState(50);
  const [securityBreach, setSecurityBreach] = useState(false);
  const [backupActive, setBackupActive] = useState(false);
  const [apiFailure, setApiFailure] = useState(false);

  const simulateHighTraffic = () => {
    const newLoad = trafficLoad + Math.floor(Math.random() * 40);
    setTrafficLoad(newLoad > 100 ? 100 : newLoad);
  };

  const simulateSecurityRisk = () => {
    setSecurityBreach(Math.random() > 0.7);
  };

  const simulateApiFailure = () => {
    setApiFailure(Math.random() > 0.6);
  };

  const activateBackupAndSecure = () => {
    setBackupActive(true);
    setTrafficLoad(50);
    setSecurityBreach(false);
    setApiFailure(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4 text-center">Risk Management & Mitigation</h2>
      <p className="text-lg text-gray-700 text-center max-w-2xl">
        This simulation helps you understand how to manage risks in a tech product. Try different scenarios below.
      </p>
      
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg text-center mt-6">
        <p className="text-lg font-semibold">🚀 Technical Risk: Server Load</p>
        <p className="text-sm text-gray-600">If too many users access the app at once, the system might crash.</p>
        <div className="w-full bg-gray-300 h-4 rounded-full overflow-hidden my-2">
          <div
            className={`h-4 ${trafficLoad > 80 ? 'bg-red-500' : 'bg-green-500'}`}
            style={{ width: `${trafficLoad}%` }}
          ></div>
        </div>
        <p className="text-lg font-bold">{trafficLoad}%</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg text-center mt-4">
        <p className="text-lg font-semibold">🔒 Security Risk</p>
        <p className="text-sm text-gray-600">A hacker attack can lead to a data breach.</p>
        <p className={`text-lg font-bold ${securityBreach ? 'text-red-500' : 'text-green-500'}`}>
          {securityBreach ? "Breach Detected!" : "Secure"}
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg text-center mt-4">
        <p className="text-lg font-semibold">🔄 API Stability</p>
        <p className="text-sm text-gray-600">If the API fails, the app will stop functioning correctly.</p>
        <p className={`text-lg font-bold ${apiFailure ? 'text-red-500' : 'text-green-500'}`}>
          {apiFailure ? "API Failure!" : "Operational"}
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg text-center mt-4">
        <p className="text-lg font-semibold">🛠️ Failover Status</p>
        <p className="text-sm text-gray-600">If the main system fails, a backup server should take over.</p>
        <p className={`text-lg font-bold ${backupActive ? 'text-green-500' : 'text-gray-500'}`}>
          {backupActive ? "Backup Active" : "Primary Server Running"}
        </p>
      </div>

      <div className="mt-6 space-x-4 flex flex-wrap justify-center">
        <button onClick={simulateHighTraffic} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600">
          Simulate High Traffic
        </button>
        <button onClick={simulateSecurityRisk} className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600">
          Simulate Security Risk
        </button>
        <button onClick={simulateApiFailure} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
          Simulate API Failure
        </button>
        <button onClick={activateBackupAndSecure} className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600">
          Activate Backup & Secure
        </button>
      </div>
    </div>
  );
};

export default RiskManagementSimulation;
