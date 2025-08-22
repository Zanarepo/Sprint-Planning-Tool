import React, { useRef } from 'react';
import { FaLock, FaUserCheck, FaShieldAlt, FaFileSignature, FaUserSecret } from 'react-icons/fa';

import SecuritySimulations from './SecuritySimulations'

const SecurityCompliance = () => {
  const contentRef = useRef();

  return (
    <div className="container mx-auto p-6" ref={contentRef}>
      <h1 className="text-3xl font-bold mb-4">Understanding Security Best Practices and Compliance for TPMs</h1>
      <p className="mb-6 text-gray-700">
        For a Technical Product Manager (TPM), understanding security and compliance is essential for building secure, reliable, and user-trusted products. It helps align development with PRDs, prioritize backlog items effectively, and manage risk proactively.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Why It Matters</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Protect user data and minimize risks.</li>
          <li>Ensure legal and industry standard compliance.</li>
          <li>Foster customer trust and gain a competitive edge.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Security Best Practices</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <FaLock className="text-3xl mb-4 text-blue-600" />
            <h3 className="font-semibold text-lg">Encryption</h3>
            <p className="mb-2">
              Converts readable data into a coded format only accessible with a secret key.
            </p>
            <p className="text-sm">
              Example: Encrypting customer credit card data ensures that even if stolen, the information is unreadable.
            </p>
            <p className="text-sm">
              Alignment: Include encryption requirements in the PRD to ensure security measures are built into the system.
            </p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <FaUserCheck className="text-3xl mb-4 text-green-600" />
            <h3 className="font-semibold text-lg">Secure Authentication</h3>
            <p className="mb-2">
              Verifies user identities to grant access.
            </p>
            <p className="text-sm">
              Example: A banking app using multi-factor authentication (password + OTP) ensures only authorized access.
            </p>
            <p className="text-sm">
              Alignment: Add secure authentication tasks to the backlog to prioritize during sprint planning.
            </p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <FaShieldAlt className="text-3xl mb-4 text-orange-600" />
            <h3 className="font-semibold text-lg">OWASP Principles</h3>
            <p className="mb-2">
              Provides guidelines for building secure applications and preventing vulnerabilities.
            </p>
            <p className="text-sm">
              Example: Use OWASP’s Top 10 to prevent injection attacks and data leaks.
            </p>
            <p className="text-sm">
              Alignment: Reference OWASP guidelines in the PRD as non-functional requirements.
            </p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <FaFileSignature className="text-3xl mb-4 text-purple-600" />
            <h3 className="font-semibold text-lg">Security Testing</h3>
            <p className="mb-2">
              Identifies and fixes weaknesses in the application.
            </p>
            <p className="text-sm">
              Example: Conduct penetration testing to find and address vulnerabilities before release.
            </p>
            <p className="text-sm">
              Alignment: Include testing tasks in the backlog to ensure security readiness.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Compliance Requirements</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <FaUserSecret className="text-3xl mb-4 text-red-600" />
            <h3 className="font-semibold text-lg">GDPR</h3>
            <p className="mb-2">
              Protects personal data of EU citizens and enforces rights like “data deletion.”
            </p>
            <p className="text-sm">
              Example: Include features like “Delete My Account” in your PRD.
            </p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <FaLock className="text-3xl mb-4 text-blue-600" />
            <h3 className="font-semibold text-lg">HIPAA</h3>
            <p className="mb-2">
              Protects healthcare-related information in the U.S.
            </p>
            <p className="text-sm">
              Example: Ensure patient data is encrypted and access is logged.
            </p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <FaShieldAlt className="text-3xl mb-4 text-green-600" />
            <h3 className="font-semibold text-lg">PCI DSS</h3>
            <p className="mb-2">
              Ensures secure handling of payment card information.
            </p>
            <p className="text-sm">
              Example: Use encrypted payment gateways and secure storage for payment data.
            </p>
          </div>
        </div>
        <SecuritySimulations/>
      </section>

    </div>
  );
};

export default SecurityCompliance;
