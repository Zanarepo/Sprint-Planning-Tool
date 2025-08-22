import React from 'react';
import { 
  FaMapMarkerAlt, 
  FaSearch, 
  FaLanguage, 
  FaMoneyBillAlt, 
  FaTruck, 
  FaBullhorn, 
  FaChartBar 
} from 'react-icons/fa';

const LocalizationExpansionTasks = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Module Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 flex justify-center items-center">
          <FaMapMarkerAlt className="mr-2" /> Localization & Expansion Tasks
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Complete the tasks below to adapt an e-commerce platform for Igbo land.
        </p>
      </header>

      {/* Task 1: Market & Cultural Research */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Task 1: Market & Cultural Research</h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-3">
          <li className="flex items-center">
            <FaSearch className="mr-2 text-blue-500" />
            Identify key demographics, shopping behaviors, and consumer trends in Igbo communities.
          </li>
          <li className="flex items-center">
            <FaLanguage className="mr-2 text-green-500" />
            Research local languages and dialects, focusing on Igbo, to understand language and cultural preferences.
          </li>
          <li className="flex items-center">
            <FaSearch className="mr-2 text-blue-500" />
            Analyze competitor e-commerce platforms operating in the region to identify strengths and gaps.
          </li>
        </ul>
      </section>

      {/* Task 2: Localization of Content & Interface */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Task 2: Localization of Content & Interface</h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-3">
          <li className="flex items-center">
            <FaLanguage className="mr-2 text-green-500" />
            Translate and localize product descriptions, UI elements, and customer support content into Igbo.
          </li>
          <li className="flex items-center">
            <FaLanguage className="mr-2 text-green-500" />
            Use culturally relevant imagery, symbols, and color schemes that resonate with Igbo users.
          </li>
          <li className="flex items-center">
            <FaSearch className="mr-2 text-blue-500" />
            Conduct usability testing with Igbo-speaking users to validate your localized content and interface.
          </li>
        </ul>
      </section>

      {/* Task 3: Payment & Logistics Adaptation */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Task 3: Payment & Logistics Adaptation</h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-3">
          <li className="flex items-center">
            <FaMoneyBillAlt className="mr-2 text-yellow-500" />
            Research and integrate local payment methods (e.g., mobile money, bank transfers, local debit/credit cards).
          </li>
          <li className="flex items-center">
            <FaTruck className="mr-2 text-red-500" />
            Identify and partner with local logistics providers to ensure reliable delivery and returns.
          </li>
          <li className="flex items-center">
            <FaSearch className="mr-2 text-blue-500" />
            Evaluate the impact of local taxes, tariffs, and customs procedures on pricing and profitability.
          </li>
        </ul>
      </section>

      {/* Task 4: Marketing & Customer Engagement Strategy */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Task 4: Marketing & Customer Engagement Strategy</h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-3">
          <li className="flex items-center">
            <FaBullhorn className="mr-2 text-purple-500" />
            Develop a marketing strategy that leverages local media channels, influencers, and social networks.
          </li>
          <li className="flex items-center">
            <FaLanguage className="mr-2 text-green-500" />
            Create culturally tailored content that resonates with the Igbo audience, including localized promotions and storytelling.
          </li>
          <li className="flex items-center">
            <FaChartBar className="mr-2 text-purple-500" />
            Define clear KPIs to measure engagement, conversion, and customer satisfaction in the Igbo market.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default LocalizationExpansionTasks;
