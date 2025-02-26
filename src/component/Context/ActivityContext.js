// ActivityContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the ActivityContext
const ActivityContext = createContext();

// Provider component that wraps your app and makes the activity context available
export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);

  // Function to log an activity.
  // Each new activity is added to the beginning of the list.
  const logActivity = (activity) => {
    setActivities((prevActivities) => [activity, ...prevActivities]);
  };

  return (
    <ActivityContext.Provider value={{ activities, logActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};

// Custom hook to use the ActivityContext in your components
export const useActivity = () => useContext(ActivityContext);
