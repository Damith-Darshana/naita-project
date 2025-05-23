import { ChevronRight } from 'react-feather';
import PropTypes from 'prop-types';

export default function NewsCard({ 
  title, 
  description, 
  imageUrl, 
  category, 
  author, 
  date, 
  className = '' 
}) {
  return (
    <div className={`bg-white h-[300px] rounded-sm shadow-sm mx-auto p-1 m-4 pb-2 ${className} lg:rounded-md lg:h-[500px] `}>
      {/* Image */}
      <div 
        className="w-full h-[120px] bg-cover bg-center rounded-sm lg:h-[302px]"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      
      {/* Category Badge */}
      {category && (
        <div className={`${category.toLowerCase() === 'announcements' ? 'bg-amber-300' : category.toLowerCase()==='news'? 'bg-blue-600': 'bg-red-800'} max-w- mx-8 p-2 text-center  relative z-10 -mt-5 rounded-sm text-white text-xs font-semibold | lg:mx-20 `}>
          {category}
        </div>
      )}
      
      {/* Author and Date */}
      <div className="creater-container mt-2 flex flex-row justify-between items-center mx-2">
        <div className="flex flex-row gap-x-1 items-center">
          <span className="relative inline-block">
            <img 
              src={author?.avatar || 'https://randomuser.me/api/portraits/women/50.jpg'} 
              className="object-cover w-[25px] h-[25px] rounded-full" 
              alt={author?.name}
            />
            <span className="absolute animate-pulse -top-1 right-0 w-[15px] h-[15px] bg-green-500 border-2 border-white rounded-full"></span>
          </span>
          <div className="text-xs font-bold text-gray-600 lg:text-base">
            {author?.first_name || 'NAITA'}
          </div>
        </div>
        
        <div className="flex flex-row gap-x-1 items-center">
          <div className="bg-red-800 w-[5px] h-[5px] rounded-full"></div>
          <div className="text-xs text-nowrap text-gray-600 lg:text-base">
            {date}
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="text-xs font-bold text-gray-900 mx-2 py-2 lg:text-[18px]">
        <h1>{title}</h1>
      </div>

      {/* Description */}
      <div className="text-xs text-gray-600 mx-2 lg:text-base line-clamp-2">
        <p>{description}</p>
      </div>

      {/* Read More */}
      <div className="text-xs absolute bottom-7 text-red-800 pt-2 font-semibold mx-2 lg:text-base lg:font-bold">
        Read more <ChevronRight size={14} className="inline" />
      </div>
    </div>
  );
}

NewsCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  category: PropTypes.string,
  author: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
  date: PropTypes.string.isRequired,
  className: PropTypes.string,
};