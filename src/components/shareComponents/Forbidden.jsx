import React from 'react';
import { Navigate, useNavigate } from 'react-router';

const Forbidden = () => {
    const Navigate = useNavigate()
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md text-center bg-white shadow-xl p-10 rounded-2xl">
        <h1 className="text-7xl font-bold text-red-500">403</h1>
        <h2 className="text-2xl font-semibold mt-4 text-gray-800">Access Forbidden</h2>
        <p className="text-gray-500 mt-2">
          You don’t have permission to access this page.
        </p>

        <button
          onClick={() => Navigate("/")}
          className="mt-6 px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
        >
          Go Back Home
        </button>
      </div>
    </div>
    );
};

export default Forbidden;