import React from "react";
import StickyNotesManager from './StickyNotesManager'
import StickyNotesInfoFeature from './StickyNotesInfoFeature'



const StickyDashboard = () => {
  return (
    
    <div className="flex items-center justify-center h-screen bg-gray-200 mt-32">
      
      {/* Whiteboard Frame */}
      
      <div className="relative bg-white shadow-lg border-8 border-gray-400 rounded-lg w-11/12 h-5/6 max-w-5xl">
        {/* Whiteboard Title */}
        
        <div className="absolute top-2 left-4 text-gray-600 font-semibold text-lg">
          Sticky Whiteboard
          <StickyNotesInfoFeature/>
        </div>

        {/* Whiteboard Surface */}
        <div className="w-full h-full p-4 overflow-hidden">
          {/* Users will place sticky notes here */}
        
          <StickyNotesManager/>
        </div>
      </div>
    </div>
  );
};

export default StickyDashboard;
