import React from 'react';
import { FaReact, FaCheckCircle } from 'react-icons/fa';
import { SiTensorflow, SiStripe } from 'react-icons/si';

const SDKsFrameworks = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-6">SDKs & Frameworks</h1>

      {/* What They Are */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">What They Are</h2>
        <p className="text-gray-700">
          SDKs (Software Development Kits) and frameworks are collections of tools, libraries, and documentation designed to help developers build applications. They often provide pre-written code, guidelines, and best practices to speed up development and ensure consistency.
        </p>
      </section>

      {/* Examples */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* React Card */}
          <div className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition">
            <div className="flex items-center mb-3">
              <FaReact className="text-blue-500 text-3xl mr-2" />
              <h3 className="text-xl font-bold">React</h3>
            </div>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Type:</span> Front-end framework (library)
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Usage:</span> Build interactive UIs for single-page applications.
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Key Feature:</span> Component-based architecture that promotes reusability and maintainability.
            </p>
          </div>
          
          {/* TensorFlow Card */}
          <div className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition">
            <div className="flex items-center mb-3">
              <SiTensorflow className="text-orange-500 text-3xl mr-2" />
              <h3 className="text-xl font-bold">TensorFlow</h3>
            </div>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Type:</span> Open-source machine learning framework
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Usage:</span> Develop and deploy machine learning models.
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Key Feature:</span> High-performance training and scalability in neural networks.
            </p>
          </div>

          {/* Stripe SDK Card */}
          <div className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition">
            <div className="flex items-center mb-3">
              <SiStripe className="text-purple-500 text-3xl mr-2" />
              <h3 className="text-xl font-bold">Stripe SDK</h3>
            </div>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Type:</span> SDK for payment processing
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Usage:</span> Integrate payment solutions into web or mobile apps.
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Key Feature:</span> Simplifies secure payment processing without handling sensitive data directly.
            </p>
          </div>
        </div>
      </section>

      {/* Why They’re Valuable */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Why They’re Valuable</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li className="flex items-center">
            <FaCheckCircle className="text-green-500 mr-2" />
            Accelerate Development: Pre-built components and standard practices help teams build features faster.
          </li>
          <li className="flex items-center">
            <FaCheckCircle className="text-green-500 mr-2" />
            Ensure Consistency: Promotes consistent design and code quality, essential for scaling applications.
          </li>
          <li className="flex items-center">
            <FaCheckCircle className="text-green-500 mr-2" />
            Support Innovation: Robust ecosystems and community support enable rapid experimentation and deployment of cutting-edge technologies.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default SDKsFrameworks;
