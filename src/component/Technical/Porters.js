import React from 'react';
import { FaArrowCircleRight, FaUsers, FaIndustry, FaExchangeAlt} from 'react-icons/fa';

import InteractivePortersExercise from './InteractivePortersExercise'

export default function PortersFiveForces() {

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
        Porter's Five Forces Analysis in Product Management
      </h1>

      <div id="porters-five-forces" className="space-y-10">
        <section className="p-6 bg-white rounded-lg shadow-md border-l-4 border-blue-500">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaArrowCircleRight className="text-blue-500 mr-3" />
            1. Threat of New Entrants
          </h2>
          <p className="text-gray-700 mb-2">
            <strong>Product Strategy Implication:</strong> If there are low barriers to entry, product managers need to innovate quickly and differentiate the product to stay ahead of new competitors. This can involve unique features or superior customer experiences.
          </p>
          <p className="text-gray-700">
            <strong>Example:</strong> A new app with similar functionality could easily enter the market, so the product manager needs to offer a unique experience to prevent customers from switching.
          </p>
        </section>

        <section className="p-6 bg-white rounded-lg shadow-md border-l-4 border-blue-500">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaIndustry className="text-blue-500 mr-3" />
            2. Bargaining Power of Suppliers
          </h2>
          <p className="text-gray-700 mb-2">
            <strong>Product Strategy Implication:</strong> Product managers need to reduce dependency on specific suppliers to avoid cost increases and quality issues.
          </p>
          <p className="text-gray-700">
            <strong>Example:</strong> If your product depends on a third-party API, and the supplier increases prices, this could affect the product’s cost structure and force a redesign.
          </p>
        </section>

        <section className="p-6 bg-white rounded-lg shadow-md border-l-4 border-blue-500">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaUsers className="text-blue-500 mr-3" />
            3. Bargaining Power of Buyers
          </h2>
          <p className="text-gray-700 mb-2">
            <strong>Product Strategy Implication:</strong> If customers can easily switch to competitors, the product must offer something unique, such as personalized experiences or exceptional features.
          </p>
          <p className="text-gray-700">
            <strong>Example:</strong> In competitive markets like e-commerce, a product manager needs to offer continuous updates, loyalty programs, or advanced features to keep customers engaged.
          </p>
        </section>

        <section className="p-6 bg-white rounded-lg shadow-md border-l-4 border-blue-500">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaExchangeAlt className="text-blue-500 mr-3" />
            4. Threat of Substitute Products or Services
          </h2>
          <p className="text-gray-700 mb-2">
            <strong>Product Strategy Implication:</strong> Stay aware of substitutes and trends that could replace your product. Keep improving your product's functionality and stay ahead of market trends.
          </p>
          <p className="text-gray-700">
            <strong>Example:</strong> For ride-sharing apps, keep track of substitutes like public transportation, bikes, or car rentals to ensure your app remains competitive.
          </p>
        </section>

        <section className="p-6 bg-white rounded-lg shadow-md border-l-4 border-blue-500">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          
            5. Industry Rivalry
          </h2>
          <p className="text-gray-700 mb-2">
            <strong>Product Strategy Implication:</strong> Focus on differentiation and positioning strategies, such as refining the product’s unique selling proposition (USP) and delivering superior customer experiences.
          </p>
          <p className="text-gray-700">
            <strong>Example:</strong> In the smartphone market, companies differentiate their products with features like camera quality or user interface improvements.
          </p>
        </section>
      </div>
<InteractivePortersExercise/>
     
    </div>
  );
}
