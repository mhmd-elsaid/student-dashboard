'use client';

import React from 'react';
import { Course } from '../../../types/course';
import Link from 'next/link';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`}>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Instructor: {course.instructor}</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            course.status === 'active' ? 'bg-green-100 text-green-800' :
            course.status === 'completed' ? 'bg-gray-100 text-gray-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {course.status}
          </span>
        </div>
      </div>
    </Link>
  );
} 