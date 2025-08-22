import React, { useState, useEffect } from 'react';
import { FaChartLine, FaChartBar , FaClipboardList } from "react-icons/fa";

import { toast } from 'react-toastify';  // Importing toast notifications for user feedback
import ExampleTracking from './ExampleTracking';
import ProductAnalysis from './ProductAnalysis'
import UnderstandingProductAnalysis from './UnderstandingProductAnalysis'





const Dashboard = () => {
  const [isExampleTrackingOpen, setIsExampleTrackingOpen] = useState(false);
  const [isProductAnalysisOpen, setIsProductAnalysisOpen] = useState(false);
  const [isUnderstandingProductAnalysisOpen, setIsUnderstandingProductAnalysisOpen] = useState(false);



  
  // Card data for the overview grid
  const cardData = [

    




/////////////////////////////////////////////////////////////////////////////////////////////////////////
{
    icon: <FaChartLine className="text-4xl text-blue-600" />,
    title: 'Product Analysis',
    toggle: () => setIsProductAnalysisOpen(!isProductAnalysisOpen),
  },
  

  
  {
    icon: <FaChartBar className="text-4xl text-blue-600" />,
    title: 'Product Metrics',
    toggle: () => setIsUnderstandingProductAnalysisOpen(!isUnderstandingProductAnalysisOpen),
  },

    {
      icon: <FaClipboardList className="text-4xl text-blue-600" />,
      title: 'Tracking Plan Template',
     
      toggle: () => setIsExampleTrackingOpen(!isExampleTrackingOpen),
    },


  


   
  ];







  // UseEffect to show a toast notification when the component is mounted
  useEffect(() => {
    toast.info('Welcome to the Product Manager Dashboard! Click any icon to explore the content.');
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold bg-blue-100 items-center mb-2">
        Masterclass: Understanding Product Analytics
      </h1>

      {/* Grid of icons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col items-center text-center cursor-pointer"
            onClick={card.toggle}
          >
            {card.icon}
            <h2 className="text-xl font-semibold mt-4">{card.title}</h2>
            <p className="text-gray-700 mt-2">{card.description}</p>
          </div>
        ))}
      </div>

      {/* Render sections based on toggle state */}
      <div className="mt-8">
        {isExampleTrackingOpen && <ExampleTracking />}
        {isProductAnalysisOpen && <ProductAnalysis />}
        {isUnderstandingProductAnalysisOpen && <UnderstandingProductAnalysis/>}
        

      
      </div>
    </div>
  );
};

export default Dashboard;
