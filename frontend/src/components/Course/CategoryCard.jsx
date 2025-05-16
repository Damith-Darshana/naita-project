import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CategoryCard({ id, name, count, icon }) {
  return (
    <Link 
      to={`/courses?category=${id}`}
      className="group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
    >
      <div className="bg-naita-blue-light w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 group-hover:bg-naita-blue group-hover:text-white transition">
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-naita-blue transition">
        {name}
      </h3>
      <p className="text-gray-600 mt-2 group-hover:text-naita-blue-dark transition">
        {count}+ Courses
      </p>
    </Link>
  );
}

CategoryCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
};