'use client';

import React from 'react';
import { useCourses } from '@/lib/api/courses';
import CourseCard from './CourseCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function CourseList() {
  const { data: courses, isLoading, error } = useCourses();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load courses" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses?.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
} 