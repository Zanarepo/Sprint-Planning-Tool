// RecentActivities.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useActivity } from './ActivityContext';

const RecentActivities = () => {
  const { activities } = useActivity();

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-2">Recent Activities</h2>
      {activities.length === 0 ? (
        <p className="text-gray-600">No recent activities.</p>
      ) : (
        <ul className="space-y-2">
          {activities.map((activity, index) => (
            <li key={index}>
              <Link
                to={activity.route}
                className="text-blue-600 hover:underline"
              >
                {activity.feature}
              </Link>
              <span className="text-xs text-gray-500 ml-2">
                {new Date(activity.timestamp).toLocaleTimeString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentActivities;
