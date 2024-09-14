'use client';
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState('Nothing');

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout Successful');
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  // get user information
  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me');
    console.log('User Details:', res.data);

    setData(res.data.data.username);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page Content</p>
      <h2 className="p-2 rounded bg-green-500">
        {data === 'Nothing' ? (
          'Nothing To Display'
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        Logout
      </button>

      <button
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={getUserDetails}
      >
        Get User Details
      </button>
    </div>
  );
}
