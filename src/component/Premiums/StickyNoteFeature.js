import React from "react";
import { motion } from "framer-motion";
// Use the StickyNote icon from lucide-react (or substitute with a similar icon if unavailable)
import { StickyNote } from "lucide-react";

const StickyNoteComponent = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 max-w-3xl mx-auto mt-0">
      {/* Icon */}
      <StickyNote size={40} className="text-green-700" />

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
        Digital Sticky Notes
      </h2>

      {/* Sliding Tagline */}
      <motion.p
        className="text-green-600 font-semibold text-lg italic mt-2"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Organize. Capture. Create."
      </motion.p>

      {/* Description with Background */}
      <p className="bg-green-50 text-gray-700 mt-4 text-lg leading-relaxed p-4 rounded-lg shadow">
        Capture your thoughts, ideas, and tasks effortlessly with our digital sticky notes.  
        Rearrange, edit, and prioritize your notes to keep your workflow organized and efficient.
      </p>
    </div>
  );
};

export default StickyNoteComponent;
