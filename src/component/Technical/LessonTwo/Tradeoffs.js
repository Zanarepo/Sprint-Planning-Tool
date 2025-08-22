import React, { useRef } from 'react';

import Tradestask from './Tradestask'
import { FaClock, FaDollarSign, FaBalanceScale, FaUsers, FaTasks, FaChartLine, FaExclamationTriangle, FaRocket, FaDatabase } from 'react-icons/fa';



const TradeOffs = () => {
  const contentRef = useRef();

 
  const tradeOffs = [
    { icon: <FaClock className="text-blue-500" />, title: "Features vs. Time-to-Market", description: "Adding more features can delay the launch. Example: Launching an MVP first." },
    { icon: <FaBalanceScale className="text-green-500" />, title: "Quality vs. Speed", description: "High quality takes time; rushing may compromise quality. Example: Skipping usability tests for deadlines." },
    { icon: <FaDollarSign className="text-yellow-500" />, title: "Cost vs. Innovation", description: "Innovative features increase costs. Example: Using off-the-shelf components instead of custom ones." },
    { icon: <FaTasks className="text-purple-500" />, title: "Scope vs. Resources", description: "More features require more resources. Example: Focusing on a niche market due to limited resources." },
    { icon: <FaUsers className="text-red-500" />, title: "User Experience vs. Development Complexity", description: "A polished UX requires complex development. Example: Simplifying UI to save time." },
    { icon: <FaBalanceScale className="text-indigo-500" />, title: "Customization vs. Standardization", description: "Customization improves experience but complicates development. Example: SaaS offering limited customization." },
    { icon: <FaChartLine className="text-gray-500" />, title: "Performance vs. Cost", description: "Higher performance needs better materials. Example: Using a less powerful processor to keep costs down." },
    { icon: <FaDatabase className="text-blue-400" />, title: "Scalability vs. Initial Investment", description: "Building for scale requires upfront investment. Example: Starting with a simple architecture to save costs." },
    { icon: <FaExclamationTriangle className="text-orange-500" />, title: "Risk vs. Reward", description: "High-risk innovations can lead to big rewards or failures. Example: Investing in a new VR feature." },
    { icon: <FaRocket className="text-teal-500" />, title: "Technical Debt vs. Speed", description: "Taking shortcuts speeds up development but creates future tech debt. Example: Releasing a product with tech debt to meet a deadline." }
  ];

  return (
    <div className="container mx-auto p-6" ref={contentRef}>
      <h1 className="text-3xl font-bold mb-4">Trade-Offs in Product Development</h1>
      <p className="mb-6 text-gray-700">
      In product development, trade-offs are critical decisions that teams must make to balance competing factors such as time, cost, quality, and functionality. 
      These decisions often arise due to limited resources, changing requirements, or conflicting stakeholder needs. 
      Understanding and managing trade-offs effectively is key to delivering a successful product.  </p>
      <div className="space-y-6">
        {tradeOffs.map((tradeOff, index) => (
          <div key={index} className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="text-3xl mr-4">{tradeOff.icon}</div>
            <div>
              <h2 className="text-xl font-semibold">{tradeOff.title}</h2>
              <p className="text-gray-700">{tradeOff.description}</p>
            </div>
          </div>
        ))}
      </div>


      <h1 className="text-3xl font-bold mb-4 mt-8">The Trade-Off Game ("Would You Rather?")</h1>
      <p className="mb-6 text-gray-700">
      Would you rather have 1,000 customers who pay $1 each OR 10 customers who pay $100?
Would you rather launch with an unfinished product now or delay for 6 months for a perfect version? </p>
     

<Tradestask/>
    
    </div>
  );
};

export default TradeOffs;
