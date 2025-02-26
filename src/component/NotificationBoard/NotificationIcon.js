import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';

const NotificationLink = ({ notificationCount }) => {
  return (
    <Link to="/usernotify" className="relative flex items-center hover:underline">
      <FaBell className="w-6 h-6 text-yellow-800" />
      {notificationCount > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
          {notificationCount}
        </span>
      )}
    </Link>
  );
};

export default NotificationLink;
