import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'react-feather';
import { Link } from 'react-router-dom';
import { getCourses, getCourseCategories } from '../../services/CourseService';
import { useDebounce } from 'use-debounce';
import CourseCard from '../Course/CourseCard';

export default function CourseExplorer() {
  // State management
  const [currentPage, setCurrentPage] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebounce(searchInput, 500); // 500ms debounce
  const [filters, setFilters] = useState({
    category: '',
    duration: '',
    fee_min: '',
    fee_max: ''
  });
  const [activeFilters, setActiveFilters] = useState({});

  // Fetch courses and categories
  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const coursesData = await getCourses(searchQuery, activeFilters);
      setCourses(coursesData || []);
      setCurrentPage(0); // Reset to first page on new search/filters
    } catch (err) {
      setError(err.message);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, activeFilters]);

  // Fetch categories on mount
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

  // Apply debounced search and active filters
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

  // Auto-slide functionality
  useEffect(() => {
    if (!autoSlide || courses.length === 0 || totalPages <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentPage(prev => (prev + 1) % totalPages);
    }, 7000);

    return () => clearInterval(interval);
  }, [autoSlide, totalPages, courses.length]);

  // Handle search submission
  const handleSearch = () => {
    if(filters.fee_min && filters.fee_max && filters.fee_min > filters.fee_max) {
      setError('Minimum fee cannot be greater than maximum fee.');
      return;
    } 
    setSearchQuery(searchInput);
    setActiveFilters(filters);
    setError(null); // Reset error state on new search
  };

  // Handle filter changes without immediate search
 const handleFilterChange = (filterName, value) => {
  setFilters(prev => ({
    ...prev,
    [filterName]: value === '' ? '' : Number(value) // Convert to number except empty string
  }));
};

  // Reset all filters and search
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

  // Loading state
  if (loading && courses.length === 0) {
    return (
      <section className="py-16 bg-[#87212E]/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white w-[387px] h-[565px] rounded-[10px] shadow-md p-6 animate-pulse">
                <div className="bg-gray-200 h-[369px] rounded mb-4"></div>
                <div className="bg-gray-200 h-6 w-3/4 mb-3"></div>
                <div className="bg-gray-200 h-4 w-1/2 mb-6"></div>
                <div className="bg-gray-200 h-10 rounded-md mt-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#87212E]/20">
      <div className="container mx-auto px-4">
        {/* Header Section - Always visible */}
        <div className="mb-16">
          <h2 className="text-[72px] font-semibold text-black mb-4">Let's Explore Your Course!...</h2>
          <p className="text-[24px] text-[#333333] font-medium">
            Find the perfect course to kickstart your professional journey...
          </p>
        </div>

        {/* Search and Filter Section - Always visible */}
        <div className="flex flex-col mb-16">
          {/* Search Bar */}
          <div className="flex gap-4 mb-8">
            <input
              type="text"
              placeholder="Search courses (e.g., Computer Hardware Technician)"
              className="flex-1 h-[72px] bg-white rounded-xl px-6 focus:outline-none border-none shadow-sm text-[18px]"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="bg-[#87212E] text-white w-[200px] h-[72px] rounded-xl font-medium hover:bg-[#6a1a25] transition shadow-md text-[18px]"
            >
              Search
            </button>
          </div>

          {/* Filter Row - Always visible */}
          <div className="flex flex-wrap gap-6 mb-6">
            {/* Category Filter */}
            <div className="flex-1 min-w-[250px]">
              <label className="block text-[18px] font-medium text-[#242424] mb-2">Category</label>
              <div className="relative">
                <select
                  className="w-full h-[60px] bg-white rounded-xl px-6 pr-12 focus:outline-none appearance-none border-none shadow-sm text-[#414141]"
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
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none text-[#636262]">
                  <ChevronDown size={20}/>
                </div>
              </div>
            </div>

            {/* Duration Filter */}
            <div className="flex-1 min-w-[250px]">
              <label className="block text-[18px] font-medium text-[#242424] mb-2">Duration</label>
              <div className="relative">
                <select
                  className="w-full h-[60px] bg-white rounded-xl px-6 pr-12 focus:outline-none appearance-none border-none shadow-sm text-[#414141]"
                  value={filters.duration}
                  onChange={(e) => handleFilterChange('duration', e.target.value)}
                >
                  <option value="">Any Duration</option>
                  <option value="1">1 Month or longer</option>
                  <option value="3">3 Months or longer</option>
                  <option value="6">6 Months or longer</option>
                  <option value="12">1 Year or longer</option>
                </select>
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none text-[#636262]">
                  <ChevronDown size={20}/>
                </div>
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="flex-1 min-w-[250px]">
              <label className="block text-[18px] font-medium text-[#242424] mb-2">Price Range (LKR)</label>
              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder="Min"
                  className="flex-1 h-[60px] bg-white rounded-xl px-6 focus:outline-none border-none shadow-sm"
                  value={filters.fee_min}
                  onChange={(e) => handleFilterChange('fee_min', e.target.value)}
                  min="0"
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="flex-1 h-[60px] bg-white rounded-xl px-6 focus:outline-none border-none shadow-sm"
                  value={filters.fee_max}
                  onChange={(e) => handleFilterChange('fee_max', e.target.value)}
                  min={filters.fee_min || 0}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons - Always visible */}
          <div className="flex justify-between">
            <button 
              onClick={handleSearch}
              className="bg-[#87212E] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#6a1a25] transition shadow-md text-[18px]"
            >
              Apply Filters
            </button>
            <button 
              onClick={resetFilters}
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-400 transition shadow-md text-[18px]"
            >
              Reset All
            </button>
          </div>
        </div>

        {/* Results Section - Always visible */}
        {error ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center mb-8">
            <h3 className="text-xl font-semibold text-red-600 mb-4">Error Loading Courses</h3>
            <p className="text-gray-700 mb-4">{error}</p>
            <button 
              onClick={fetchCourses}
              className="bg-naita-blue text-white px-4 py-2 rounded hover:bg-naita-blue-dark"
            >
              Retry
            </button>
          </div>
        ) : courses.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">No Courses Found</h3>
            <p className="text-gray-700 mb-4">Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          <>
            {/* Courses Carousel */}
            <div className="relative mb-16">
              <div className="flex" style={{ gap: '61px' }}>
               {visibleCourses.map((course) => (
                  <div key={course.id} className="flex-shrink-0">
                    <CourseCard
                      id={course.id}
                      title={course.title}
                      category={course.category?.name}
                      duration={`${course.duration} ${course.duration_unit}`}
                      fee={course.fee}
                      thumbnail={course.thumbnail}
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              {totalPages > 1 && (
                <>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                    disabled={currentPage === 0}
                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 z-10 ${
                      currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <ChevronLeft size={32} className="text-[#87212E]"/>
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
                    disabled={currentPage === totalPages - 1}
                    className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 z-10 ${
                      currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <ChevronRight size={32} className="text-[#87212E]"/>
                  </button>
                </>
              )}
            </div>

            {/* Pagination Dots */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-3">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-4 h-4 rounded-full transition ${
                      index === currentPage ? 'bg-[#87212E]' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}