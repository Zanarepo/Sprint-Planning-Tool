import React, { useEffect } from 'react';
import { FaChartLine, FaChartBar, FaClipboardList } from "react-icons/fa";
import { toast } from 'react-toastify'; // Importing toast notifications for user feedback
import { BrowserRouter as  Link } from 'react-router-dom';

const Dashboards = () => {
  // Show a toast notification when the component is mounted
  useEffect(() => {
    toast.info('Welcome to the Product Manager Dashboard! Click any icon to explore the content.');
  }, []);

  // Card data for the overview grid
  const cardData = [
    {
      icon: <FaChartLine className="text-4xl text-blue-600" />,
      title: 'Lesson 1',
      route: '/Dashboard',
    },
    {
      icon: <FaChartBar className="text-4xl text-blue-600" />,
      title: 'Lesson 2',
      route: '/Dashboard2',
    },
    {
      icon: <FaClipboardList className="text-4xl text-blue-600" />,
      title: 'Lesson 3',
      route: '/Dashboard3',
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold bg-blue-100 items-center mb-2">
        Masterclass: Understanding Product Analytics
      </h1>

      {/* Grid of icons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cardData.map((card, index) => (
          <Link to={card.route} key={index}>
            <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col items-center text-center cursor-pointer">
              {card.icon}
              <h2 className="text-xl font-semibold mt-4">{card.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboards;
