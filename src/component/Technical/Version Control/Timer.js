import React, { useState, useEffect } from 'react';

const Timer = ({ children }) => {
  const [timeSpent, setTimeSpent] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if (timerActive) {
      const timer = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timerActive]);

  const handleStartTimer = () => setTimerActive(true);
  const handleStopTimer = () => setTimerActive(false);

  useEffect(() => {
    handleStartTimer();
    return handleStopTimer;
  }, []);

  return (
    <div>
      <div className="mb-4">
        <strong>Time Spent:</strong> {Math.floor(timeSpent / 60)}:{timeSpent % 60 < 10 ? `0${timeSpent % 60}` : timeSpent % 60} min
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Timer;
