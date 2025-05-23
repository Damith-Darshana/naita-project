import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CourseCard({ id, title, category, duration, fee, thumbnail }) {
  return (
    <div className="bg-white rounded-sm shadow-sm p-2 hover:shadow-md transition-shadow lg:rounded-md">
      {/* Image */}
      <div className="bg-[url(Apprenticeship-Training.jpg)] bg-cover w-full h-[145px] rounded-sm lg:h-[360px]">
        {thumbnail && (
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover rounded-sm lg:rounded-md"
          />
        )}
      </div>

      {/* Category */}
      <div className="flex items-center gap-x-2 py-2">
        <div className="bg-red-800 rounded-full w-[5px] h-[5px] lg:w-[10px] lg:h-[10px]"></div>
        <div className="text-xs text-gray-600 lg:text-base">{category}</div>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-gray-900 line-clamp-2 lg:text-xl">
        {title}
      </h3>

      {/* Duration and Price */}
      <div className="flex justify-between items-center pt-2">
        <span className="text-xs text-gray-600 lg:text-base">{duration}</span>
        <span className="text-xs font-bold text-gray-800 lg:text-base">
          LKR {fee?.toLocaleString()}
        </span>
      </div>

      {/* View More */}
      <div className="text-sm text-red-800 pt-2 font-semibold lg:text-base lg:pb-5">
        <Link to={`/courses/${id}`}>view more &gt;</Link>
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