import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

// Helper function using the Web Crypto API to hash the password with SHA-256.
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Fetch the user with the provided email.
      const { data: user, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email.trim().toLowerCase())
        .single();

      if (fetchError) {
        setErrorMessage('Error fetching user. Please try again.');
        setIsSubmitting(false);
        return;
      }

      if (!user) {
        setErrorMessage('Invalid email or password.');
        setIsSubmitting(false);
        return;
      }

      // Hash the input password using the Web Crypto API.
      const hashedInputPassword = await hashPassword(password);

      // Compare the hashed input with the stored hashed password.
      if (hashedInputPassword === user.password) {
        // Store the email in local storage for later retrieval.
        localStorage.setItem('userEmail', email.trim().toLowerCase());

        setSuccessMessage('Login successful! Redirecting you to home in 3 seconds...');
        // Redirect to dashboard after 3 seconds.
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else {
        setErrorMessage('Invalid email or password.');
      }
    } catch (error) {
      setErrorMessage('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border bg-yellow-600 rounded shadow mt-32">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {/* Inline message displays */}
      {errorMessage && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="mb-4 ">
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Password Field with Toggle */}
        <div className="mb-4 relative " >
          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded pr-16"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-gray-600"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-yellow-800 text-white p-2 rounded hover:bg-yellow-700"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;
