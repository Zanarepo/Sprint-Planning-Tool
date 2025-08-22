import React, { useState, useRef } from 'react';
import { FaLock, FaUserCheck, FaShieldAlt, FaFileSignature, FaUserSecret } from 'react-icons/fa';


const SecurityComplianceSimulation = () => {
  // State for security best practices (each true means implemented)
  const [encryption, setEncryption] = useState(false);
  const [auth, setAuth] = useState(false);
  const [owasp, setOwasp] = useState(false);
  const [secTesting, setSecTesting] = useState(false);

  // State for compliance requirements
  const [gdpr, setGdpr] = useState(false);
  const [hipaa, setHipaa] = useState(false);
  const [pci, setPci] = useState(false);

  // Ref for PDF download
  const contentRef = useRef();

  // Calculate a compliance score (out of 100)
  // We'll give 15 points for each security practice and 20 for each compliance requirement.
  const securityScore = (encryption + auth + owasp + secTesting) * 15; // 4 practices max 60 pts
  const complianceScore = (gdpr + hipaa + pci) * 20; // 3 requirements max 60 pts
  const totalScore = securityScore + complianceScore; // max 120 pts

  // Determine a risk level based on the score.
  // Lower scores indicate higher risk.
  let riskLevel = '';
  if (totalScore >= 100) {
    riskLevel = 'Low Risk';
  } else if (totalScore >= 60) {
    riskLevel = 'Moderate Risk';
  } else {
    riskLevel = 'High Risk';
  }



  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6" ref={contentRef}>
      <header className="bg-blue-600 text-white py-6 text-center">
        <h1 className="text-3xl font-bold">Security & Compliance Simulation for TPMs</h1>
        <p className="mt-2">Select security best practices and compliance measures to build a secure system.</p>
      </header>

      <main className="p-6">
        {/* Section: Security Best Practices */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Security Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Encryption */}
            <div className="p-4 bg-gray-100 rounded-lg shadow-lg flex items-center">
              <input
                type="checkbox"
                checked={encryption}
                onChange={() => setEncryption(!encryption)}
                className="mr-4"
              />
              <div>
                <div className="flex items-center gap-2">
                  <FaLock className="text-3xl text-blue-600" />
                  <h3 className="font-semibold text-lg">Encryption</h3>
                </div>
                <p className="text-sm">Encrypt sensitive data to protect it even if accessed.</p>
              </div>
            </div>
            {/* Secure Authentication */}
            <div className="p-4 bg-gray-100 rounded-lg shadow-lg flex items-center">
              <input
                type="checkbox"
                checked={auth}
                onChange={() => setAuth(!auth)}
                className="mr-4"
              />
              <div>
                <div className="flex items-center gap-2">
                  <FaUserCheck className="text-3xl text-green-600" />
                  <h3 className="font-semibold text-lg">Secure Authentication</h3>
                </div>
                <p className="text-sm">Implement MFA and strong password policies.</p>
              </div>
            </div>
            {/* OWASP Principles */}
            <div className="p-4 bg-gray-100 rounded-lg shadow-lg flex items-center">
              <input
                type="checkbox"
                checked={owasp}
                onChange={() => setOwasp(!owasp)}
                className="mr-4"
              />
              <div>
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-3xl text-orange-600" />
                  <h3 className="font-semibold text-lg">OWASP Principles</h3>
                </div>
                <p className="text-sm">Follow OWASP guidelines to prevent vulnerabilities.</p>
              </div>
            </div>
            {/* Security Testing */}
            <div className="p-4 bg-gray-100 rounded-lg shadow-lg flex items-center">
              <input
                type="checkbox"
                checked={secTesting}
                onChange={() => setSecTesting(!secTesting)}
                className="mr-4"
              />
              <div>
                <div className="flex items-center gap-2">
                  <FaFileSignature className="text-3xl text-purple-600" />
                  <h3 className="font-semibold text-lg">Security Testing</h3>
                </div>
                <p className="text-sm">Conduct penetration testing and vulnerability scans.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Compliance Requirements */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Compliance Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* GDPR */}
            <div className="p-4 bg-gray-100 rounded-lg shadow-lg flex items-center">
              <input
                type="checkbox"
                checked={gdpr}
                onChange={() => setGdpr(!gdpr)}
                className="mr-4"
              />
              <div>
                <div className="flex items-center gap-2">
                  <FaUserSecret className="text-3xl text-red-600" />
                  <h3 className="font-semibold text-lg">GDPR</h3>
                </div>
                <p className="text-sm">Ensure personal data protection and rights (e.g., data deletion).</p>
              </div>
            </div>
            {/* HIPAA */}
            <div className="p-4 bg-gray-100 rounded-lg shadow-lg flex items-center">
              <input
                type="checkbox"
                checked={hipaa}
                onChange={() => setHipaa(!hipaa)}
                className="mr-4"
              />
              <div>
                <div className="flex items-center gap-2">
                  <FaLock className="text-3xl text-blue-600" />
                  <h3 className="font-semibold text-lg">HIPAA</h3>
                </div>
                <p className="text-sm">Protect healthcare data by ensuring encryption and proper access.</p>
              </div>
            </div>
            {/* PCI DSS */}
            <div className="p-4 bg-gray-100 rounded-lg shadow-lg flex items-center">
              <input
                type="checkbox"
                checked={pci}
                onChange={() => setPci(!pci)}
                className="mr-4"
              />
              <div>
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-3xl text-green-600" />
                  <h3 className="font-semibold text-lg">PCI DSS</h3>
                </div>
                <p className="text-sm">Secure handling of payment card data with encryption and secure storage.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Simulation Results */}
        <section className="mb-8 p-4 bg-white border rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Simulation Results</h2>
          <div className="mb-4">
            <p className="font-semibold">Compliance Score:</p>
            <p>{totalScore} / 120</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Risk Level:</p>
            <p>{riskLevel}</p>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-600">Implementing more security best practices and meeting compliance standards increases your score and reduces risk.</p>
          </div>
        </section>

        {/* PDF Download Button */}
       
      </main>

      <footer className="text-center text-sm text-gray-600 mt-10">
        <p>
          This simulation demonstrates how implementing security measures and compliance standards impacts overall security posture and risk management.
        </p>
      </footer>
    </div>
  );
};

export default SecurityComplianceSimulation;
