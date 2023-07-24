'use client'
import React, { useState, useEffect } from 'react';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (isFormSubmitted) return; // Prevent multiple form submissions

    try {
      setIsFormSubmitted(true);
      setIsButtonDisabled(true);
      setMessage('Sending password reset link...');

      const response = await fetch('https://nextjs13-ecommerce.onrender.com/api/user/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message);

      setTimeout(() => {
        setIsButtonDisabled(false);
        setSecondsLeft(60);
        setIsFormSubmitted(false);
      }, 60000);
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
      setIsButtonDisabled(false);
      setIsFormSubmitted(false);
    }
  };


  useEffect(() => {
    // Update the countdown every second
    if (isButtonDisabled && secondsLeft > 0) {
      const timer = setTimeout(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);

      // Clear the timer when the component unmounts or when button is enabled
      return () => clearTimeout(timer);
    }
  }, [isButtonDisabled, secondsLeft]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot Password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isButtonDisabled}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM2 10a8 8 0 018-8V2a10 10 0 100 20V10a8 8 0 01-8-8z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {isButtonDisabled
                ? `Sending (${secondsLeft}s)`
                : 'Send Password Reset Link'}
            </button>
          </div>
        </form>
        {message && (
          <p className="mt-2 text-sm text-center text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordForm;