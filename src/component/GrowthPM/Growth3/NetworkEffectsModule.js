import React from 'react';
import {
  FaNetworkWired,

  FaBriefcase,
  FaVideo,
  FaChartLine,
 
} from 'react-icons/fa';

const NetworkEffectsModule = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen space-y-12">
      {/* Section 3: Leveraging Network Effects */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaNetworkWired className="text-4xl text-blue-500 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-800">3. Leveraging Network Effects</h2>
        </div>

        {/* Part A: Strategies to Amplify Value */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-700 mb-2">A. Strategies to Amplify Value</h3>
          <ul className="list-disc ml-8 text-gray-700 space-y-2">
            <li>
              <strong>User-Generated Content (UGC):</strong> 
              <span className="ml-2">Platforms like TikTok or Reddit thrive because users create content that attracts others.</span>
            </li>
            <li>
              <strong>Marketplace Liquidity:</strong> 
              <span className="ml-2">Ensure supply/demand balance (e.g., Uber’s driver-rider ratio).</span>
            </li>
            <li>
              <strong>Community Building:</strong> 
              <span className="ml-2">Use forums, leaderboards, or member-exclusive features (e.g., Discord servers) to foster a sense of community.</span>
            </li>
          </ul>
        </div>

        {/* Part B: Case Studies */}
        <div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">B. Case Studies</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center mb-1">
                <FaBriefcase className="text-2xl text-indigo-500 mr-2" />
                <span className="text-xl font-medium text-gray-800">LinkedIn</span>
              </div>
              <ul className="list-disc ml-8 text-gray-700 space-y-1">
                <li>
                  <strong>Network Effect:</strong> More professionals → more recruiters → more job seekers → more professionals.
                </li>
                <li>
                  <strong>Viral Feature:</strong> “Connect with colleagues” prompts during signup.
                </li>
              </ul>
            </div>
            <div>
              <div className="flex items-center mb-1">
                <FaVideo className="text-2xl text-green-500 mr-2" />
                <span className="text-xl font-medium text-gray-800">Zoom</span>
              </div>
              <ul className="list-disc ml-8 text-gray-700 space-y-1">
                <li>
                  <strong>Network Effect:</strong> More users → more meetings → more adoption.
                </li>
                <li>
                  <strong>Viral Feature:</strong> “Invite others” button embedded in every call.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Metrics to Track */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-4xl text-purple-500 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-800">4. Metrics to Track</h2>
        </div>
        <ul className="list-disc ml-8 text-gray-700 space-y-4">
          <li>
            <strong>Viral Coefficient (K-factor):</strong> The average number of new users invited per existing user.
            <br />
            <span className="ml-4">
              <strong>Formula:</strong> K = Invites per user × Conversion rate.
            </span>
            <br />
            <span className="ml-4">
              <strong>Goal:</strong> K &gt; 1 (to achieve exponential growth).
            </span>
          </li>
          <li>
            <strong>Cycle Time:</strong> The time from user signup to inviting others.
          </li>
          <li>
            <strong>Network Density:</strong> The ratio of active connections to total possible connections (e.g., Facebook friends).
          </li>
        </ul>
      </section>
    </div>
  );
};

export default NetworkEffectsModule;
