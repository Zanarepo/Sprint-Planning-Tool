import React, { useState } from 'react';
import SDKFramework from './SDKFramework';

const ApiPlatformsInfo = () => {
  const [openSections, setOpenSections] = useState({
    intro: true,
    apiCards: true,
    value: true,
    sdkFramework: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const apiCards = [
    {
      id: 'plaid',
      title: 'Plaid',
      icon: '💸',
      purpose: 'Plaid is a financial API platform that connects apps with users’ bank accounts.',
      usage: 'Commonly used for building budgeting apps, payment solutions, or any financial service that needs secure access to banking information.',
      keyFeature: 'Secure data aggregation from multiple banks, simplifying developers’ work with financial data.',
    },
    {
      id: 'openai',
      title: 'OpenAI API',
      icon: '🧠',
      purpose: 'Gives developers access to advanced AI models developed by OpenAI.',
      usage: 'Used for generating text, creating chatbots, or powering creative applications like story generation or code assistance.',
      keyFeature: 'Provides state-of-the-art natural language processing (NLP) capabilities without the need to train complex models in-house.',
    },
    {
      id: 'firebase',
      title: 'Firebase',
      icon: '🔥',
      purpose: 'A platform by Google offering various backend services for mobile and web applications.',
      usage: 'Provides real-time databases, authentication, cloud messaging, and analytics, making it easier to build scalable apps.',
      keyFeature: 'Simplifies development with ready-to-use services that integrate smoothly into apps, reducing the need for custom backend code.',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans">
      {/* Introduction */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">🌐</span>
            API Platforms
          </h1>
          <button
            onClick={() => toggleSection('intro')}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.intro}
            aria-controls="intro-section"
          >
            {openSections.intro ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.intro ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              API platforms provide well-defined interfaces that let different software systems interact with each other over the internet. They expose functionalities or data from one system so that developers can integrate these features into their own applications without building everything from scratch.
            </p>
          </div>
        </div>
      </section>

      {/* API Cards */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">📚</span>
            API Platforms Overview
          </h2>
          <button
            onClick={() => toggleSection('apiCards')}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.apiCards}
            aria-controls="api-cards-section"
          >
            {openSections.apiCards ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.apiCards ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4">
            <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {apiCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-yellow-50 p-6 rounded-lg shadow-md border border-yellow-300 hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-3xl sm:text-4xl mr-3">{card.icon}</span>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{card.title}</h2>
                  </div>
                  <div className="text-gray-700 space-y-2 text-sm sm:text-base">
                    <p>
                      <span className="font-semibold">Purpose:</span> {card.purpose}
                    </p>
                    <p>
                      <span className="font-semibold">Usage:</span> {card.usage}
                    </p>
                    <p>
                      <span className="font-semibold">Key Feature:</span> {card.keyFeature}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why They're Valuable */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">✅</span>
            Why They’re Valuable
          </h2>
          <button
            onClick={() => toggleSection('value')}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.value}
            aria-controls="value-section"
          >
            {openSections.value ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.value ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              <span className="font-semibold">Why They’re Valuable:</span> For product managers and developers, API platforms accelerate development by providing ready-made, reliable functionalities. They reduce time-to-market, allow for rapid prototyping, and enable teams to focus on creating unique value rather than reinventing common services.
            </p>
          </div>
        </div>
      </section>

      {/* SDK Framework */}
      <section className="mb-8">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">🛠️</span>
            SDK Framework
          </h2>
          <button
            onClick={() => toggleSection('sdkFramework')}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.sdkFramework}
            aria-controls="sdk-framework-section"
          >
            {openSections.sdkFramework ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.sdkFramework ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300">
            <SDKFramework />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApiPlatformsInfo;