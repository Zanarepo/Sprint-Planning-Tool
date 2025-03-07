import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const DashboardWelcome = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      console.error("No email found in local storage. Please store the user's email.");
      return;
    }
    async function fetchUser() {
      const { data, error } = await supabase
        .from('users')
        .select('full_name')
        .eq('email', email.trim().toLowerCase())
        .single();
      if (error) {
        console.error('Error fetching user details:', error);
      } else if (data) {
        const firstName = data.full_name.split(' ')[0];
        setUserName(firstName);
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="mt-2 flex flex-col items-center">
      <svg
        className="w-20 h-20 text-yellow-800 dark:text-yellow-800"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.2c-3.2 0-9.6 1.6-9.6 4.8v2.7h19.2v-2.7c0-3.2-6.4-4.8-9.6-4.8z" />
      </svg>
      <span className="mt-2 text-3xl font-bold text-yellow-800 dark:text-yellow-800">
        Hello, {userName}!
      </span>
    </div>
  );
};

export default DashboardWelcome;
