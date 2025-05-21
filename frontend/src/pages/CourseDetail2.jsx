import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseDetails } from '../services/CourseService';

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseDetails(id);
        const processedCourse = {
          ...data,
          districts: data.districts || [],
          features: data.features || [],
          content: data.content || [],
          requirements: data.requirements || [],
        };
        setCourse(processedCourse);
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
    <div>
      {/* Hero Image */}
      <div className="w-full overflow-clip relative z-0">
        <div
          className="bg-cover bg-center h-[235px] lg:h-[800px]"
          style={{ backgroundImage: `url(${course.background_image})` }}
        ></div>
      </div>

      <div className="px-5 bg-gray-100 pb-24">
        {/* Course Card */}
        <div className="z-10 relative -mt-24 bg-white rounded-sm px-7 w-full h-[230px] md:w-[700px] shadow-sm lg:h-[524px] lg:w-auto lg:py-24 lg:px-10 lg:-mt-66">
          <div className="py-5 text-base font-bold text-gray-900 lg:text-5xl">
            <h1>{course.title}</h1>
          </div>
          <div className="text-[12px] font-[inter] h-[83px] text-justify overflow-auto text-gray-600 lg:text-xl lg:h-auto">
            <p>{course.description}</p>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex flex-row justify-between items-center py-3 lg:py-24">
              <div className="flex flex-col justify-between pb-5 font-[inter] text-[10px] lg:text-base lg:flex-row lg:gap-2">
                <div className="flex flex-row items-center gap-2 text-gray-600">
                  <div className="bg-red-800 min-w-[5px] min-h-[5px] rounded-full lg:min-w-[15px] lg:min-h-[15px]"></div>
                  <div>Duration - {course.duration} {course.duration_unit}</div>
                </div>
                {course.certification && (
                  <div className="flex flex-row items-center gap-2 text-gray-600">
                    <div className="bg-red-800 w-[5px] h-[5px] rounded-full lg:min-w-[15px] lg:min-h-[15px]"></div>
                    <div>{course.certification}</div>
                  </div>
                )}
              </div>
              <div>
                <button className="text-[12px] font-[inter] font-bold w-[120px] h-[45px] text-white bg-red-800 hover:bg-red-900 rounded-sm lg:w-[210px] lg:h-[75px] lg:text-[24px] lg:rounded-md">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="bg-white flex flex-col w-42 p-2 absolute right-4 rounded-sm mt-6 shadow-sm lg:rotate-20 lg:w-[401px] lg:h-[235px] lg:p-10 lg:mt-24 lg:mr-6">
          <div className="text-gray-600 font-[inter] text-[10px] lg:text-xl lg:font-bold py-1">Course Fee</div>
          <div className="text-sm font-bold text-red-800 lg:text-5xl py-1">{Number(course.fee).toLocaleString()} LKR</div>
          <div className="text-gray-600 font-[inter] text-[10px] lg:text-xl lg:font-bold py-1">
            Registration Fee - {Number(course.registration_fee).toLocaleString()} LKR
          </div>
        </div>

        {/* District Section */}
        {course.districts.length > 0 && (
          <div className="mt-10">
            <div className="text-sm font-bold text-gray-900 py-2 lg:text-3xl">
              <h1>Available Districts</h1>
            </div>
            <div className="font-[inter] text-[12px] text-gray-600 lg:text-xl">
              {course.districts.map((district, idx) => (
                <div key={idx} className="flex flex-row gap-x-2 items-center">
                  <div className="bg-red-800 w-[5px] h-[5px] rounded-full lg:w-[12px] lg:h-[12px]"></div>
                  <div>{district}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features Section */}
        {course.features.length > 0 && (
          <div className="mt-10">
            <div className="text-sm font-bold text-gray-900 py-2 lg:text-3xl">
              <h1>Features</h1>
            </div>
            <div className="font-[inter] text-[12px] text-gray-600 text-justify lg:text-xl">
              {course.features.map((feature, idx) => (
                <div key={idx} className="flex flex-row gap-x-2 items-baseline">
                  <div className="bg-red-800 w-[5px] h-[5px] rounded-full lg:w-[15px] lg:h-[15px]"></div>
                  <div className="text-pretty">{feature}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Course Content Section */}
        {course.content.length > 0 && (
          <div className="mt-10">
            <div className="text-sm font-bold text-gray-900 py-2 lg:text-3xl">
              <h1>Course Content</h1>
            </div>
            {course.content.map((module, idx) => (
              <div key={idx} className="content-list-container">
                <div className="text-xs font-semibold text-gray-700 py-2 lg:text-xl lg:font-normal">
                  <h2>{module.title}</h2>
                </div>
                <div className="content-sub-list">
                  {module.topics?.map((topic, tIdx) => (
                    <div
                      key={tIdx}
                      className="bg-gray-200 my-2 p-2 border-l-2 text-[12px] font-[inter] text-gray-700 lg:text-[16px]"
                    >
                      <p>{topic}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Entry Qualifications Section */}
        {course.requirements.length > 0 && (
          <div className="mt-10">
            <div className="text-sm font-bold text-gray-900 py-2 lg:text-3xl">
              <h1>Entry Qualifications</h1>
            </div>
            <div className="font-[inter] text-[12px] text-gray-600 text-justify lg:text-xl">
              {course.requirements.map((req, idx) => (
                <div key={idx} className="flex flex-row gap-x-2 items-baseline">
                  <div className="bg-red-800 w-[5px] h-[5px] rounded-full lg:w-[15px] lg:h-[15px]"></div>
                  <div className="text-pretty">{req}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
