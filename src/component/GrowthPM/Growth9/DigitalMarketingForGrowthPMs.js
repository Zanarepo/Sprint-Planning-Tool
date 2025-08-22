import React from 'react';
import { FaSearch, FaRocket } from 'react-icons/fa';


const DigitalMarketingForGrowthPMs = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Title and Overview */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 flex justify-center items-center">
          Digital Marketing for Growth PMs
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Learn how SEO drives organic traffic by improving product visibility in search engines. This helps Growth PMs attract high-intent users at scale and reduce customer acquisition costs (CAC).
        </p>
      </header>

      {/* SEO Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-4">
          <FaSearch className="mr-2 text-blue-500" /> SEO Overview
        </h2>
        <p className="text-gray-700 mb-4">
          SEO is essential for driving organic traffic by increasing a product’s visibility on search engines (e.g., Google). It helps attract high-intent users and ultimately lowers CAC.
        </p>

        {/* On-Page SEO */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">On-Page SEO</h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>
              <strong>Keyword Research:</strong> Use tools like Google Keyword Planner, Ahrefs, or SEMrush to identify high-volume, low-competition keywords.
            </li>
            <li>
              <strong>Example:</strong> A SaaS tool targeting "best project management software for remote teams."
            </li>
            <li>
              <strong>Content Optimization:</strong> Align page titles, headers, meta descriptions, and body content with your target keywords.
            </li>
            <li>
              <strong>User Intent:</strong> Create content that matches search intent (informational, navigational, transactional).
            </li>
          </ul>
        </div>

        {/* Technical SEO */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Technical SEO</h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>
              <strong>Site Speed Optimization:</strong> Compress images, leverage browser caching, and optimize code.
            </li>
            <li>
              <strong>Mobile-Friendliness:</strong> Ensure your site is responsive and works well on all devices.
            </li>
            <li>
              <strong>Fixing Broken Links:</strong> Resolve 404 errors and improve crawlability with proper sitemaps.
            </li>
          </ul>
        </div>

        {/* Content Strategy */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Content Strategy</h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>
              <strong>Creating Valuable Content:</strong> Develop blog posts, guides, or tools that answer user queries (e.g., HubSpot’s free templates).
            </li>
            <li>
              <strong>Building Backlinks:</strong> Earn links through partnerships, guest posts, or viral content.
            </li>
          </ul>
        </div>
      </section>

      {/* Practical Application Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-4">
          <FaRocket className="mr-2 text-green-500" /> Practical Application for Growth PMs
        </h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>
            <strong>Optimize Product Landing Pages:</strong> Focus on keywords like "free budgeting app" to drive targeted traffic.
          </li>
          <li>
            <strong>Collaborate with Content Teams:</strong> Work together to create SEO-driven resources, such as articles on "How to start investing in stocks."
          </li>
          <li>
            <strong>Monitor & Adjust:</strong> Use tools like Google Search Console to monitor search rankings and fix issues promptly.
          </li>
        </ul>
      </section>
   

    </div>
  );
};

export default DigitalMarketingForGrowthPMs;
