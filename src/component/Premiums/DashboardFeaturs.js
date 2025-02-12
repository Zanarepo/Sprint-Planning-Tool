import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const DashboardWelcome = () => {
  const [userName, setUserName] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);

  // Retrieve the email from local storage and use it to fetch user details.
  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      console.error("No email found in local storage. Please store the user's email.");
      return;
    }

    async function fetchUser() {
      // Query the 'users' table for the user with the given email.
      const { data, error } = await supabase
        .from('users')
        .select('full_name')
        .eq('email', email.trim().toLowerCase())
        .single();

      if (error) {
        console.error('Error fetching user details:', error);
      } else if (data) {
        // Extract only the first part (first name) from the full name.
        const firstName = data.full_name.split(' ')[0];
        setUserName(firstName);
      }
    }
    fetchUser();
  }, []);

  // Hide the welcome card after 5 seconds or when user activity occurs.
  useEffect(() => {
    const handleActivity = () => {
      if (showWelcome) {
        setShowWelcome(false);
        removeActivityListeners();
      }
    };

    const removeActivityListeners = () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);

    const timer = setTimeout(() => {
      setShowWelcome(false);
      removeActivityListeners();
    }, 7000);

    return () => {
      clearTimeout(timer);
      removeActivityListeners();
    };
  }, [showWelcome]);

  return (
    <>
      {/* Fixed User Icon and Name (positioned below the navbar) */}
      <div className="fixed top-20 left-5 flex items-center z-50">
        <svg
          className="w-6 h-6 text-orange-900 mr-2"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.2c-3.2 0-9.6 1.6-9.6 4.8v2.7h19.2v-2.7c0-3.2-6.4-4.8-9.6-4.8z" />
        </svg>
        <span className="text-lg text-orange-900">{userName}'s Dashboard</span>
      </div>

      {/* Welcome Card (ensured to appear on top of the navbar) */}
      {showWelcome && userName && (
        <div
          className="fixed top-5 left-1/2 transform -translate-x-1/2 w-72 bg-green-600 text-white p-5 rounded text-center"
          style={{ zIndex: 1000 }}
        >
          <h3 className="text-lg m-0">Welcome, {userName}!</h3>
        </div>
      )}
    </>
  );
};

export default DashboardWelcome;
