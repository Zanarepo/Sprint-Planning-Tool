import React, { useState } from 'react';
import { FaUsers, FaChartLine, FaRegLightbulb } from 'react-icons/fa';

const FunnelSimulation = () => {
  // State variables for simulation inputs
  const [initialTraffic, setInitialTraffic] = useState(1000);
  const [acquisitionRate, setAcquisitionRate] = useState(20); // %
  const [activationRate, setActivationRate] = useState(50); // %
  const [retentionRate, setRetentionRate] = useState(40); // %
  const [revenueRate, setRevenueRate] = useState(30); // %
  const [referralRate, setReferralRate] = useState(10); // %

  // Calculate conversion values for each stage
  const acquired = Math.round((initialTraffic * acquisitionRate) / 100);
  const activated = Math.round((acquired * activationRate) / 100);
  const retained = Math.round((activated * retentionRate) / 100);
  const revenue = Math.round((retained * revenueRate) / 100);
  const referred = Math.round((revenue * referralRate) / 100);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
            <FaChartLine className="mr-2 text-teal-500" /> Funnel Optimization Simulation
          </h1>
          <p className="text-gray-600 mt-2">
            Adjust the conversion rates to see how your customer funnel performs.
          </p>
        </header>

        {/* Input Controls */}
        <section className="space-y-6 mb-8">
          <div>
            <label className="block text-gray-700 font-semibold">Initial Traffic</label>
            <input
              type="number"
              value={initialTraffic}
              onChange={(e) => setInitialTraffic(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              min="0"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">
              Acquisition Rate (%) <span className="text-sm text-gray-500">(Traffic → Acquired)</span>
            </label>
            <input
              type="number"
              value={acquisitionRate}
              onChange={(e) => setAcquisitionRate(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              min="0"
              max="100"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">
              Activation Rate (%) <span className="text-sm text-gray-500">(Acquired → Activated)</span>
            </label>
            <input
              type="number"
              value={activationRate}
              onChange={(e) => setActivationRate(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              min="0"
              max="100"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">
              Retention Rate (%) <span className="text-sm text-gray-500">(Activated → Retained)</span>
            </label>
            <input
              type="number"
              value={retentionRate}
              onChange={(e) => setRetentionRate(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              min="0"
              max="100"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">
              Revenue Rate (%) <span className="text-sm text-gray-500">(Retained → Revenue)</span>
            </label>
            <input
              type="number"
              value={revenueRate}
              onChange={(e) => setRevenueRate(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              min="0"
              max="100"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">
              Referral Rate (%) <span className="text-sm text-gray-500">(Revenue → Referred)</span>
            </label>
            <input
              type="number"
              value={referralRate}
              onChange={(e) => setReferralRate(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              min="0"
              max="100"
            />
          </div>
        </section>

        {/* Results */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaUsers className="mr-2 text-purple-500" /> Funnel Stages Results
          </h2>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded">
              <p className="font-bold">
                Stage 1: Acquisition
              </p>
              <p>
                <span className="font-semibold">Acquired Users:</span> {acquired}
              </p>
              <p className="text-gray-600 text-sm">
                Insight: These users represent the portion of your initial traffic that responded to your marketing efforts.
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded">
              <p className="font-bold">
                Stage 2: Activation
              </p>
              <p>
                <span className="font-semibold">Activated Users:</span> {activated}
              </p>
              <p className="text-gray-600 text-sm">
                Insight: Activated users are those who took a meaningful action within your product. Low numbers may suggest onboarding issues.
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded">
              <p className="font-bold">
                Stage 3: Retention
              </p>
              <p>
                <span className="font-semibold">Retained Users:</span> {retained}
              </p>
              <p className="text-gray-600 text-sm">
                Insight: Retained users continue to engage with your product over time. This is critical for long-term success.
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded">
              <p className="font-bold">
                Stage 4: Revenue
              </p>
              <p>
                <span className="font-semibold">Revenue-Generating Users:</span> {revenue}
              </p>
              <p className="text-gray-600 text-sm">
                Insight: These are users who have converted to paying customers. Low revenue conversion indicates pricing or value proposition challenges.
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded">
              <p className="font-bold">
                Stage 5: Referral
              </p>
              <p>
                <span className="font-semibold">Referred Users:</span> {referred}
              </p>
              <p className="text-gray-600 text-sm">
                Insight: Referral numbers show how many paying users are helping to drive new traffic. This is a sign of strong user satisfaction.
              </p>
            </div>
          </div>
        </section>

        {/* Overall Funnel Insight */}
        <section className="bg-gray-50 p-4 rounded">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <FaRegLightbulb className="mr-2 text-yellow-500" /> Overall Funnel Insights
          </h2>
          <p className="text-gray-700 mt-2">
            Review the conversion numbers and insights above. If any stage shows a sharp drop, it signals a potential area for optimization. For example, if the number of activated users is much lower than acquired users, focus on improving your onboarding process. Similarly, a low referral rate may indicate that your customers are not sufficiently delighted to recommend your product.
          </p>
        </section>
      </div>
    </div>
  );
};

export default FunnelSimulation;
