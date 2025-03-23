'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from './client';

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'upcoming';
}

const coursesApi = {
  list: async (): Promise<Course[]> => {
    const response = await apiClient.get('/courses');
    return response.data;
  },
  getById: async (id: string): Promise<Course> => {
    const response = await apiClient.get(`/courses/${id}`);
    return response.data;
  },
};

export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: coursesApi.list,
  });
};

export const useCourse = (id: string) => {
  return useQuery({
    queryKey: ['courses', id],
    queryFn: () => coursesApi.getById(id),
  });
}; 