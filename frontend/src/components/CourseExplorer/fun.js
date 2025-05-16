 {visibleCourses.map((course) => (
                  <Link to={`/courses/${course.id}`} key={course.id}>
                    <div className="bg-white w-[387px] h-[565px] rounded-[10px] shadow-md overflow-hidden hover:shadow-lg transition flex-shrink-0">
                      {/* Course Image */}
                      <div className="w-[369px] h-[369px] mx-auto mt-2 mb-4 overflow-hidden bg-gray-100">
                        {course.thumbnail ? (
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover rounded-[6px]"
                            onError={(e) => {
                              e.target.src = '/images/default-course.jpg';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-5xl">
                            {course.category?.name === 'Engineering' ? '⚙️' : 
                             course.category?.name === 'IT' ? '💻' : '📚'}
                          </div>
                        )}
                      </div>

                      {/* Course Details */}
                      <div className="p-6 flex flex-col h-[196px]">
                        <span className="inline-block px-3 py-1 bg-naita-blue-light text-naita-blue rounded-full text-sm font-medium mb-3 self-start">
                          {course.category?.name || 'General'}
                        </span>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                          {course.title}
                        </h3>
                        
                        <div className="mt-auto">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600">
                              {course.duration} {course.duration_unit}
                            </span>
                            <span className="font-bold text-naita-blue">
                              LKR {parseFloat(course.fee).toLocaleString()}
                            </span>
                          </div>
                          <div className="w-full py-2 bg-naita-blue text-white text-center rounded-md hover:bg-naita-blue-dark transition">
                            View Details
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))} */