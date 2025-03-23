import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CourseCard from '@/components/features/courses/CourseCard';

const mockCourse = {
  id: 1,
  title: 'Test Course',
  description: 'Test Description',
  units: [],
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

describe('CourseCard', () => {
  it('renders course information correctly', () => {
    render(<CourseCard course={mockCourse} />);
    
    expect(screen.getByText('Test Course')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('0 Units')).toBeInTheDocument();
  });
}); 