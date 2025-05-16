import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Award } from 'react-feather';
import { getCourseDetails } from '../services/CourseService';

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseData = await getCourseDetails(id);
        setCourse(courseData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <div className="text-center py-12">Loading course details...</div>;
  if (error) return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  if (!course) return <div className="text-center py-12">Course not found</div>;

  return (
    <div className="relative">
      {/* Hero Section with Background Image */}
      <div 
        className="w-full h-[860px] bg-cover bg-center"
        style={{ backgroundImage: "url('/course-detail-bg.jpg')" }}
      >
        {/* Course Info Card */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="w-[1632px] h-[524px] bg-white rounded-xl shadow-lg p-12">
            {/* Course Title */}
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {course.title}
            </h1>

            {/* Course Description */}
            <p className="text-xl text-gray-700 font-normal mb-8 text-justify">
              {course.description}
            </p>

            {/* Duration and Certification */}
            <div className="flex items-center gap-8 mb-8">
              <div className="flex items-center">
                <Clock size={15} className="text-red-800 mr-2"/>
                <span className="text-xl text-gray-700">Duration - {course.duration}</span>
              </div>
              <div className="flex items-center">
                <Award size={15} className="text-red-800 mr-2"/>
                <span className="text-xl text-gray-700">{course.certification}</span>
              </div>
            </div>

            {/* Apply Button */}
            <div className="flex justify-end">
              <button className="bg-red-800 text-white w-[210px] h-[75px] rounded-xl text-xl font-medium hover:bg-red-900 transition">
                APPLY
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-[300px] pb-16">
        <div className="flex">
          {/* Left Content */}
          <div className="flex-1 pr-8">
            {/* Available Districts */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Available Districts</h2>
              <ul className="list-disc pl-6 space-y-2">
                {course.districts?.map((district, index) => (
                  <li key={index} className="text-xl text-gray-700">{district}</li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Features</h2>
              <ul className="space-y-4">
                {course.features?.map((feature, index) => (
                  <li key={index} className="text-xl text-gray-700">{feature}</li>
                ))}
              </ul>
            </div>

            {/* Course Content */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Content</h2>
              <div className="space-y-8">
                {course.content?.map((section, index) => (
                  <div key={index}>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">{section.title}</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      {section.topics?.map((topic, i) => (
                        <li key={i} className="text-xl text-gray-700">{topic}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Entry Qualifications */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Entry Qualifications</h2>
              <ul className="space-y-4">
                {course.requirements?.map((requirement, index) => (
                  <li key={index} className="text-xl text-gray-700">{requirement}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side - Course Fee Card */}
          <div className="w-[400px]">
            <div className="transform -rotate-[19.75deg] bg-white rounded-lg shadow-md p-6 w-[400px] h-[235px]">
              <h3 className="text-xl font-bold text-gray-600 mb-4">Course Fee</h3>
              <p className="text-5xl font-bold text-red-800 mb-4">
                {course.fee?.toLocaleString()} LKR
              </p>
              <p className="text-xl font-bold text-gray-600">
                Registration Fee: {course.registration_fee || 'Included'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}