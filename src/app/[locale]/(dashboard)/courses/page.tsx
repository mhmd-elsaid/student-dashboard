import CourseList from '@/components/features/courses/CourseList';

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Courses</h1>
      <CourseList />
    </div>
  );
} 