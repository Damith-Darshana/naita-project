import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CourseCard({ id, title, category, duration, fee, thumbnail }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <span className="text-5xl">
            {category === 'Engineering' ? '⚙️' :
             category === 'IT' ? '💻' : '📚'}
          </span>
        )}
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <span className="inline-block px-3 py-1 bg-naita-blue-light text-naita-blue rounded-full text-sm font-medium mb-3 self-start">
          {category}
        </span>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
        
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">{duration}</span>
            <span className="font-bold text-naita-blue">LKR {fee?.toLocaleString()}</span>
          </div>
          <Link
            to={`/courses/${id}`}
            className="block w-full py-2 bg-naita-blue text-white text-center rounded-md hover:bg-naita-blue-dark transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

CourseCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string,
  duration: PropTypes.string,
  fee: PropTypes.number,
  thumbnail: PropTypes.string,
};