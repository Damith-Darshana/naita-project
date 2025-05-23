import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Link } from 'react-router-dom';
import { getCourses, getCourseCategories } from '../../services/CourseService';
import { useDebounce } from 'use-debounce';
import CourseCard from '../Course/CourseCard';

export default function CourseExplorer() {
  // State management (same as before)
  const [currentPage, setCurrentPage] = useState(0);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebounce(searchInput, 500);
  const [filters, setFilters] = useState({
    category: '',
    duration: '',
    fee_min: '',
    fee_max: ''
  });
  const [activeFilters, setActiveFilters] = useState({});

  // Fetch functions remain the same
  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const coursesData = await getCourses(searchQuery, activeFilters);
      setCourses(coursesData || []);
      setCurrentPage(0);
    } catch (err) {
      setError(err.message);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, activeFilters]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCourseCategories();
        setCategories(categoriesData || []);
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses, debouncedSearch]);

  // Pagination logic
  const itemsPerPage = 4;
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const visibleCourses = courses.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Handler functions remain the same
  const handleSearch = () => {
    if(filters.fee_min && filters.fee_max && filters.fee_min > filters.fee_max) {
      setError('Minimum fee cannot be greater than maximum fee.');
      return;
    }
    setSearchQuery(searchInput);
    setActiveFilters(filters);
    setError(null);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value === '' ? '' : Number(value)
    }));
  };

  const resetFilters = () => {
    setSearchInput('');
    setSearchQuery('');
    setFilters({
      category: '',
      duration: '',
      fee_min: '',
      fee_max: ''
    });
    setActiveFilters({});
  };

  // Loading state with new styling
  if (loading && courses.length === 0) {
    return (
      <section className="mt-10 mx-4">
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white w-full rounded-sm shadow-sm p-2 lg:rounded-md animate-pulse">
              <div className="bg-gray-200 w-full h-[145px] rounded-sm lg:h-[360px]"></div>
              <div className="mt-2 space-y-2">
                <div className="bg-gray-200 h-4 w-3/4"></div>
                <div className="bg-gray-200 h-4 w-1/2"></div>
                <div className="bg-gray-200 h-6 w-full mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10 mx-4">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 lg:text-5xl">
          Let's Explore Your Course!...
        </h1>
        <p className="text-sm text-gray-600 lg:text-xl lg:mt-3">
          Find the perfect course to kickstart your professional journey...
        </p>
      </div>

      {/* Search */}
      <div className="flex flex-col gap-y-2 py-4 lg:flex-row lg:gap-x-2">
        <input
          className="grow h-[60px] min-w-[272px] bg-white rounded-sm shadow-sm p-3 text-sm focus:outline focus:outline-red-800 lg:text-base lg:rounded-md"
          type="text"
          placeholder="e.g. Computer Hardware Technician"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="bg-red-800 hover:bg-red-900 h-[60px] text-white text-base rounded-sm font-bold min-w-[100px] lg:min-w-[240px] lg:p-3 lg:rounded-md lg:text-xl"
        >
          Search
        </button>
      </div>

      {/* Filters - Updated to match your design */}
      <div className="grid grid-cols-3 gap-1 mb-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 lg:text-xl">Category</label>
          <div className="relative mt-1">
            <select
              className="w-full h-[40px] bg-white text-[12px] text-gray-600 rounded-sm shadow-sm px-2 flex justify-between items-center focus:outline-red-800 focus:outline focus:outline-2 lg:text-base lg:h-[60px] lg:rounded-md"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Duration Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 lg:text-xl">Duration</label>
          <div className="relative mt-1">
            <select
              className="w-full h-[40px] bg-white text-[12px] text-gray-600 rounded-sm shadow-sm px-2 flex justify-between items-center focus:outline-red-800 focus:outline focus:outline-2 lg:text-base lg:h-[60px] lg:rounded-md"
              value={filters.duration}
              onChange={(e) => handleFilterChange('duration', e.target.value)}
            >
              <option value="">Any Duration</option>
              <option value="1">1 Month or longer</option>
              <option value="3">3 Months or longer</option>
              <option value="6">6 Months or longer</option>
              <option value="12">1 Year or longer</option>
            </select>
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 lg:text-xl">Price (LKR)</label>
          <div className="flex gap-1 mt-1">
            <input
              type="number"
              placeholder="Min"
              className="w-full h-[40px] bg-white rounded-sm shadow-sm px-2 text-[12px] focus:outline-red-800 focus:outline focus:outline-2 lg:text-base lg:h-[60px] lg:rounded-md"
              value={filters.fee_min}
              onChange={(e) => handleFilterChange('fee_min', e.target.value)}
              min="0"
            />
            <input
              type="number"
              placeholder="Max"
              className="w-full h-[40px] bg-white rounded-sm shadow-sm px-2 text-[12px] focus:outline-red-800 focus:outline focus:outline-2 lg:text-base lg:h-[60px] lg:rounded-md"
              value={filters.fee_max}
              onChange={(e) => handleFilterChange('fee_max', e.target.value)}
              min={filters.fee_min || 0}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mb-6">
        <button
          onClick={handleSearch}
          className="bg-red-800 text-white px-4 py-2 rounded-sm font-medium hover:bg-red-900 transition shadow-sm text-sm lg:text-base lg:px-6 lg:py-3 lg:rounded-md"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-sm font-medium hover:bg-gray-400 transition shadow-sm text-sm lg:text-base lg:px-6 lg:py-3 lg:rounded-md"
        >
          Reset All
        </button>
      </div>

      {/* Results Section */}
      {error ? (
        <div className="bg-white p-4 rounded-sm shadow-sm text-center mb-8 lg:p-8 lg:rounded-md">
          <h3 className="text-lg font-semibold text-red-600 mb-2 lg:text-xl">Error Loading Courses</h3>
          <p className="text-gray-700 mb-4 text-sm lg:text-base">{error}</p>
          <button
            onClick={fetchCourses}
            className="bg-red-800 text-white px-4 py-2 rounded-sm hover:bg-red-900 text-sm lg:text-base lg:rounded-md"
          >
            Retry
          </button>
        </div>
      ) : courses.length === 0 ? (
        <div className="bg-white p-4 rounded-sm shadow-sm text-center mb-8 lg:p-8 lg:rounded-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 lg:text-xl">No Courses Found</h3>
          <p className="text-gray-700 text-sm lg:text-base">Try adjusting your search criteria or filters</p>
        </div>
      ) : (
        <>
          {/* Course Cards Grid */}
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {visibleCourses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                category={course.category?.name}
                duration={`${course.duration} ${course.duration_unit}`}
                fee={course.fee}
                thumbnail={course.thumbnail}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-row justify-center w-full">
              <div className="flex">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`mx-1 px-3 py-2 ${
                      index === currentPage 
                        ? 'bg-red-800 text-white' 
                        : 'bg-white text-gray-700 hover:bg-red-800 hover:text-white'
                    } font-medium rounded-sm shadow-sm text-sm lg:text-base`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}