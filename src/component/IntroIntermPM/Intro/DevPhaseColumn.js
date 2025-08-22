import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DevPhaseTask from './DevPhaseTask';
import { FaLightbulb, FaSearch, FaCogs, FaRocket } from 'react-icons/fa';

const iconMapping = {
  "Idea Generation & Market Research": <FaLightbulb className="inline mr-1" />,
  "Product Discovery & Validation": <FaSearch className="inline mr-1" />,
  "Building an MVP": <FaCogs className="inline mr-1" />,
  "Product Launch & GTM Strategy": <FaRocket className="inline mr-1" />,
};

const DevPhaseColumn = ({ id, column }) => {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col w-64">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {iconMapping[column.name] || null} {column.name}
      </h2>
      <SortableContext items={column.items} strategy={verticalListSortingStrategy}>
        {column.items.map(item => (
          <DevPhaseTask key={item.id} id={item.id} content={item.content} />
        ))}
      </SortableContext>
    </div>
  );
};

export default DevPhaseColumn;
