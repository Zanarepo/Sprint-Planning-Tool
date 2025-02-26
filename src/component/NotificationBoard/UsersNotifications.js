import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const UsersNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch notifications for the given userId in ascending order
  const fetchNotifications = async (userId) => {
    const { data, error } = await supabase
      .from('users_notification')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching notifications:', error);
    } else {
      setNotifications(data);
    }
  };

  useEffect(() => {
    const getUserNotifications = async () => {
      // Retrieve the user's email from localStorage
      const email = localStorage.getItem('userEmail');
      if (!email) {
        console.error("User email not found in localStorage");
        setLoading(false);
        return;
      }

      // Fetch the user record from the existing 'users' table using the email
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (userError || !userData) {
        console.error('Error fetching user details:', userError);
        setLoading(false);
        return;
      }

      // Now, fetch notifications for this user using their id
      await fetchNotifications(userData.id);
      setLoading(false);
    };

    getUserNotifications();
  }, []);

  // Handler to mark a notification as read
  const markAsRead = async (notificationId) => {
    const { error } = await supabase
      .from('users_notification')
      .update({ is_read: true })
      .eq('id', notificationId);

    if (error) {
      console.error('Error marking notification as read:', error);
      return;
    }

    // Update the local state to reflect the change
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, is_read: true } : notif
      )
    );
  };

  // Handler to delete a notification
  const deleteNotification = async (notificationId) => {
    const { error } = await supabase
      .from('users_notification')
      .delete()
      .eq('id', notificationId);

    if (error) {
      console.error('Error deleting notification:', error);
      return;
    }

    // Remove the deleted notification from the local state
    setNotifications((prev) =>
      prev.filter((notif) => notif.id !== notificationId)
    );
  };

  if (loading) {
    return <div className="text-center p-4">Loading notifications...</div>;
  }

  return (
    <div className="w-full-width mx-auto p-4 mt-32">
  {/* Your component content */}


  <h1 className="text-center text-2xl font-bold mb-4">Your Notifications</h1>

      {notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-4 border rounded ${
                notification.is_read ? 'bg-yellow-50' : 'bg-gray-100'
              }`}
            >
              <p>{notification.message}</p>
              <div className="mt-2 flex space-x-2">
                {!notification.is_read && (
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => deleteNotification(notification.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersNotifications;
