import React from "react";
import StickyNotesManager from './StickyNotesManager';
//import StickyNotesInfoFeature from './StickyNotesInfoFeature';

const StickyDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 mt-32">
      {/* Whiteboard Header (Moved Outside) */}
      <div className="text-yellow-600 font-semibold text-xl mb-4 flex items-center gap-2">
        Stick On It
        
      </div> 
      <div className="text-brown-600  text-xl mb-2 flex items-center gap-2">
       Capture your ideas - document on the go
        
      </div>

      {/* Whiteboard Frame */}
      <div className="relative bg-white shadow-lg border-8 border-gray-400 rounded-lg w-11/12 h-5/6 max-w-5xl">
        {/* Whiteboard Surface */}
        <div className="w-full h-full p-4 overflow-hidden">
          {/* Users will place sticky notes here */}
          <StickyNotesManager />
        </div>
      </div>
    </div>
  );
};

export default StickyDashboard;
