// components/DashboardStats/DashboardStats.jsx
import { useState, useEffect } from 'react';
import { getDashboardStats } from '../../services/DashboardService';
import StatCard from './StatCard';
import CourseBar from './CourseBar';

export default function DashboardStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        if (data) {
          setStats(data);
        } else {
          setError('Failed to load dashboard statistics');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="mx-4 mt-10">
        <h1 className="text-base font-bold text-gray-900 lg:text-2xl">Dashboard</h1>
        <div className="flex flex-col gap-2 py-5 lg:flex-row lg:gap-6">
          <div className="flex flex-row gap-2 lg:flex-col lg:min-w-54">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-sm shadow-sm p-4 w-full h-32 animate-pulse"></div>
            ))}
          </div>
          <div className="rounded-sm bg-white shadow-sm w-full p-4 h-64 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="mx-4 mt-10">
        <h1 className="text-base font-bold text-gray-900 lg:text-2xl">Dashboard</h1>
        <div className="text-red-600">Error: {error || 'No data available'}</div>
      </div>
    );
  }

  const statCards = [
    {
      value: stats.active_learners.toLocaleString(),
      label: "Active Learners",
      year: stats.current_year.toString(),
      icon: "personicon.png"
    },
    {
      value: stats.total_courses.toLocaleString(),
      label: "Total Courses offered",
      icon: "bookicon.png"
    },
    {
      value: stats.proud_graduates.toLocaleString(),
      label: "Proud graduates",
      year: stats.current_year.toString(),
      icon: "graduateicon.png"
    }
  ];

  return (
    <div className="mx-4 mt-10">
      <h1 className="text-base font-bold text-gray-900 lg:text-2xl">Dashboard</h1>
      
      <div className="flex flex-row gap-2 py-5 lg:flex-row lg:gap-6">
        {/* Stats Cards */}
        <div className="flex flex-col gap-2 lg:flex-col lg:min-w-54">
          {statCards.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              label={stat.label}
              year={stat.year}
              icon={stat.icon}
            />
          ))}
        </div>

        {/* Popular Courses Chart */}
        <div className="rounded-sm bg-white shadow-sm w-full p-4 lg:p-6">
          <div className="text-sm font-semibold text-gray-700 pb-4 lg:text-xl">
            <h1>Most Demanded Courses - {stats.current_year}</h1>
          </div>
          <div className="flex flex-col gap-3 text-[10px] font-inter text-gray-600 lg:gap-6">
            {stats.popular_courses.map((course, index) => (
              <CourseBar 
                key={index}
                name={course.name}
                percentage={course.percentage}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}