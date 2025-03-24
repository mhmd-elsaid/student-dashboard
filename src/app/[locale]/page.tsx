import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Student Dashboard
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Access your courses, assignments, and track your progress.
        </p>
        <div className="space-x-4">
          
          <Link
            href="/courses"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            View Courses
          </Link>
          <Link
            href="/assignments"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            View Assignments
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
} 