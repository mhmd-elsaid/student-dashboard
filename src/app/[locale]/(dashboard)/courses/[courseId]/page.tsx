import { useCourse } from '@/lib/api/courses';
import { notFound } from 'next/navigation';

interface CoursePageProps {
  params: {
    courseId: string;
  };
}

export default function CoursePage({ params }: CoursePageProps) {
  const courseId = parseInt(params.courseId);
  
  if (isNaN(courseId)) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CourseContent courseId={courseId} />
    </div>
  );
}

function CourseContent({ courseId }: { courseId: number }) {
  const { data: course, isLoading, error } = useCourse(courseId);

  if (isLoading) {
    return <div>Loading course...</div>;
  }

  if (error || !course) {
    return <div>Error loading course</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
      <p className="text-gray-600 mb-8">{course.description}</p>
      
      <div className="space-y-6">
        {course.units.map((unit) => (
          <div key={unit.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{unit.title}</h2>
            <p className="text-gray-600 mb-4">{unit.description}</p>
            
            <div className="space-y-4">
              {unit.contents.map((content) => (
                <div
                  key={content.id}
                  className="border rounded-md p-4 hover:bg-gray-50"
                >
                  <h3 className="font-medium text-gray-900">{content.title}</h3>
                  <p className="text-sm text-gray-500">{content.description}</p>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {content.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 