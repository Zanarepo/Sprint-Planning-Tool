import React from 'react';
import FunnelSimulation  from './FunnelSimulation'; // Assuming this is a component you have
import { 
  FaFunnelDollar, 
  FaLightbulb, 
  FaChartBar, 

} from 'react-icons/fa';

const FunnelOptimizationToolkit = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
            <FaFunnelDollar className="mr-2 text-teal-500" /> Funnel Optimization: A Teaching Toolkit
          </h1>
          <p className="text-gray-600 mt-2">
            (Customer Lifecycle Stages: Acquisition → Activation → Retention → Revenue → Referral)
          </p>
        </header>

        {/* Section 1: Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
            <FaLightbulb className="mr-2 text-yellow-500" /> 1. Overview of Funnel Optimization
          </h2>
          <div className="mt-4 space-y-6 text-gray-700">
            <div>
              <h3 className="font-bold">Definition:</h3>
              <p>
                You will learn how to systematically improve the user journey across stages of the customer lifecycle to eliminate friction, increase conversions, and drive growth.
              </p>
            </div>
            <div>
              <h3 className="font-bold">Why It Matters:</h3>
              <ul className="list-disc ml-6">
                <li>It helps you identify "leaks" in the user journey where potential customers drop off.</li>
                <li>It enables you to prioritize high-impact fixes that maximize ROI.</li>
                <li>It aligns your team around a shared understanding of user behavior.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold">Key Frameworks:</h3>
              <ul className="list-disc ml-6">
                <li><strong>AARRR (Pirate Metrics):</strong> Acquisition, Activation, Retention, Revenue, Referral.</li>
                <li><strong>HEART Framework:</strong> Happiness, Engagement, Adoption, Retention, Task Success.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Breakdown of Each Funnel Stage */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
            <FaChartBar className="mr-2 text-blue-500" /> 2. Breakdown of Each Funnel Stage - Acquisition
          </h2>
          <div className="mt-4 space-y-6 text-gray-700">
            <div>
              <h3 className="font-bold">Goal:</h3>
              <p>Attract users to your product.</p>
            </div>
            <div>
              <h3 className="font-bold">Key Metrics:</h3>
              <ul className="list-disc ml-6">
                <li>Traffic sources (organic, paid, referrals).</li>
                <li>Cost Per Acquisition (CPA).</li>
                <li>Click-Through Rate (CTR).</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold">Common Bottlenecks:</h3>
              <ul className="list-disc ml-6">
                <li>Poor targeting (e.g., ads reaching the wrong audience).</li>
                <li>High bounce rates on landing pages.</li>
                <li>Weak value proposition in messaging.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold">Optimization Strategies:</h3>
              <ul className="list-disc ml-6">
                <li>A/B test ad creatives, headlines, and CTAs.</li>
                <li>Use SEO to improve organic reach.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold">Example:</h3>
              <p>
                Consider how Dropbox’s referral program incentivized users to invite friends in exchange for extra storage.
              </p>
            </div>
            <div>
              <h3 className="font-bold">Exercise:</h3>
              <p>
                Analyze a landing page (for example, Airbnb's page) and identify three changes that could improve user acquisition.
              </p>
            </div>
          </div>
        </section>
      </div>
      <FunnelSimulation/>
    </div>
  );
};

export default FunnelOptimizationToolkit;
