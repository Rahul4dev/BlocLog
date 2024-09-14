/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const VerifyEmailPage = () => {
  const [token, setToken] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post('/api/users/verifyUserEmail', { token });
      setVerified(true);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken || '');
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify your email</h1>
      <h2 className="p-2 bg-cyan-300 text-black rounded">
        {token ? `${token}` : 'No Token'}
      </h2>

      {verified && (
        <div className="">
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div className="">
          <h2 className="text-2xl bg-red-300 text-black rounded">Error</h2>
          <p className="text-normal">
            {' '}
            Something went wrong, Please Try again!
          </p>
          <Link href="/signup">SignUp</Link>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailPage;
