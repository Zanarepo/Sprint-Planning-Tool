// ActivityContext.js
import React, { createContext, useContext, useState } from 'react';

const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);

  // Log an activity. New activities are added to the beginning of the list.
  const logActivity = (activity) => {
    setActivities((prev) => [activity, ...prev]);
  };

  return (
    <ActivityContext.Provider value={{ activities, logActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};

// Custom hook to use the activity context
export const useActivity = () => useContext(ActivityContext);
