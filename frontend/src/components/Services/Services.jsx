// components/Services/Services.jsx
import { useState, useEffect } from 'react';
import { getServices } from '../../services/DashboardService';
import ServiceCard from './ServiceCard';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        console.log(data);
        if (data) {
          setServices(data.results);
        } else {
          setError('Failed to load services');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="mx-4 mt-10">
        <div className="py-5 text-base font-bold text-gray-900 lg:text-2xl">
          <h1>We provide you</h1>
        </div>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-2 lg:mx-48">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-sm shadow-sm border-t-2 min-h-32 border-red-800 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-4 mt-10">
        <div className="py-5 text-base font-bold text-gray-900 lg:text-2xl">
          <h1>We provide you</h1>
        </div>
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="mx-4 mt-10 lg:mt-20">
      <div className="py-5 text-base font-bold text-gray-900 lg:text-2xl">
        <h1>We provide you</h1>
      </div>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-2 lg:mx-48">
        {services.map((service) => (
          <ServiceCard 
            key={service.id}
            title={service.title}
            description={service.description}
            icon={service.icon_name}
          />
        ))}
      </div>
    </div>
  );
}