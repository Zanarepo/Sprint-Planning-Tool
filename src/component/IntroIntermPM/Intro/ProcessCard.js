import React from 'react';

const ProcessCard = ({ title, Icon, children }) => {
  return (
    <div className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 h-full">
        <div className="flex items-center mb-4">
          {Icon && <Icon className="text-blue-500 mr-2" size={28} />}
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        </div>
        <div className="text-gray-700 text-sm">{children}</div>
      </div>
    </div>
  );
};

export default ProcessCard;
