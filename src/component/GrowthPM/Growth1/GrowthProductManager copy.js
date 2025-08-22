import React from 'react';

import {
  FaChartLine,
  FaUsers,
  FaSearch,
  FaHandshake,
  FaLightbulb,
  FaCogs,
  FaFlask,
  FaRocket,
} from 'react-icons/fa';

const GrowthProductManager = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Growth Product Manager Overview
          </h1>
          <p className="text-lg text-gray-600">
            A Growth Product Manager is a specialized product leader focused on
            driving rapid, sustainable user and revenue growth. This role blends
            traditional product management with marketing, analytics, and
            experimental thinking to identify and optimize key drivers of growth.
          </p>
        </header>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Key Concepts & Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Data-Driven Decision Making */}
            <div className="flex items-start p-4 bg-gray-50 rounded-lg shadow">
              <FaChartLine className="text-4xl text-blue-500 mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-700">
                  Data-Driven Decision Making
                </h3>
                <p className="text-gray-600">
                  Leverage analytics, KPIs, and A/B testing to drive informed
                  decisions. <br />
                  <strong>Real-Time Use Case:</strong> Running experiments to
                  optimize user onboarding flows.
                </p>
              </div>
            </div>

            {/* Customer Acquisition & Retention */}
            <div className="flex items-start p-4 bg-gray-50 rounded-lg shadow">
              <FaUsers className="text-4xl text-green-500 mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-700">
                  Customer Acquisition & Retention
                </h3>
                <p className="text-gray-600">
                  Develop strategies to attract new users while keeping current
                  customers engaged. <br />
                  <strong>Real-Time Use Case:</strong> Creating loyalty programs
                  that increase customer lifetime value.
                </p>
              </div>
            </div>

            {/* Market & User Insights */}
            <div className="flex items-start p-4 bg-gray-50 rounded-lg shadow">
              <FaSearch className="text-4xl text-purple-500 mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-700">
                  Market & User Insights
                </h3>
                <p className="text-gray-600">
                  Conduct user research and competitive analysis to pinpoint
                  market opportunities. <br />
                  <strong>Real-Time Use Case:</strong> Utilizing customer
                  surveys and heatmaps to enhance product features.
                </p>
              </div>
            </div>

            {/* Cross-Functional Collaboration */}
            <div className="flex items-start p-4 bg-gray-50 rounded-lg shadow">
              <FaHandshake className="text-4xl text-red-500 mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-700">
                  Cross-Functional Collaboration
                </h3>
                <p className="text-gray-600">
                  Work with engineering, marketing, design, and sales teams to
                  align growth strategies. <br />
                  <strong>Real-Time Use Case:</strong> Coordinating with design
                  teams to develop a feature that drives higher engagement.
                </p>
              </div>
            </div>

            {/* Strategic Thinking & Innovation */}
            <div className="flex items-start p-4 bg-gray-50 rounded-lg shadow">
              <FaLightbulb className="text-4xl text-yellow-500 mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-700">
                  Strategic Thinking & Innovation
                </h3>
                <p className="text-gray-600">
                  Create and implement innovative strategies that drive
                  scalable growth. <br />
                  <strong>Real-Time Use Case:</strong> Developing growth loops that
                  fuel viral acquisition.
                </p>
              </div>
            </div>

            {/* Operational Excellence */}
            <div className="flex items-start p-4 bg-gray-50 rounded-lg shadow">
              <FaCogs className="text-4xl text-indigo-500 mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-700">
                  Operational Excellence
                </h3>
                <p className="text-gray-600">
                  Optimize internal processes to ensure efficient product
                  iterations and scalability. <br />
                  <strong>Real-Time Use Case:</strong> Streamlining workflows
                  with automation tools.
                </p>
              </div>
            </div>

            {/* Experimentation & Innovation */}
            <div className="flex items-start p-4 bg-gray-50 rounded-lg shadow">
              <FaFlask className="text-4xl text-pink-500 mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-700">
                  Experimentation & Testing
                </h3>
                <p className="text-gray-600">
                  Use rigorous testing protocols to validate hypotheses and
                  iterate rapidly. <br />
                  <strong>Real-Time Use Case:</strong> Launching A/B tests on new
                  feature ideas.
                </p>
              </div>
            </div>

            {/* Rapid Growth & Scaling */}
            <div className="flex items-start p-4 bg-gray-50 rounded-lg shadow">
              <FaRocket className="text-4xl text-teal-500 mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-700">
                  Rapid Growth & Scaling
                </h3>
                <p className="text-gray-600">
                  Implement scalable strategies that ensure long-term success.
                  <br />
                  <strong>Real-Time Use Case:</strong> Leveraging viral loops and
                  referral programs.
                </p>
              </div>
            </div>
          </div>
        </section> 


        <footer className="mt-8 text-center">
          <p className="text-gray-500">
            By mastering these skills, a Growth Product Manager can effectively
            drive user engagement, revenue growth, and product success.
          </p>
        </footer>
      </div>

    </div>
  );
};

export default GrowthProductManager;
