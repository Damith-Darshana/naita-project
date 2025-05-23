import { useState, useEffect } from 'react';
import API from '../../services/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import NewsCard from './NewsCard';
import 'swiper/css';
import 'swiper/css/pagination';

export default function NewsSection() {
  const [activeTab, setActiveTab] = useState('AN');
  const [newsPosts, setNewsPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await API.get(`news/posts/?post_type=${activeTab}`);
        setNewsPosts(response.data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, [activeTab]);

  if (loading) {
    return (
      <div className="mx-4 mt-10">
        <h1 className="text-base font-bold text-gray-900 lg:text-2xl">News and Updates</h1>
        <div className="grid grid-cols-2 gap-2 mt-5 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-sm shadow-sm p-4 h-64 animate-pulse">
              <div className="h-32 bg-gray-200 rounded-sm mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-4 mt-10">
        <h1 className="text-base font-bold text-gray-900 lg:text-2xl">News and Updates</h1>
        <div className="text-red-600">Error loading news: {error}</div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="mx-4 mt-10 mb-10">
      <h1 className="text-base font-bold text-gray-900 lg:text-2xl">News and Updates</h1>
      
      <div className="links flex flex-row gap-x-2 text-sm text-gray-600 font-semibold py-2 pl-10 lg:text-base lg:gap-x-4 my-10">
        {[
          { value: 'NW', label: 'News' },
          { value: 'AN', label: 'Announcements' },
          { value: 'UP', label: 'Latest News' }
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={` lg:p-3 lg:rounded-sm lg:shadow-sm lg:w-38 text-center  ${
              activeTab === tab.value ? ' lg:bg-red-800  lg:text-white' : 'lg:bg-white  lg:hover:bg-red-300/25 lg:hover:text-red-800 '
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="swiper mySwiper w-full max-w-[600px] mx-auto lg:max-w-full lg:mx-4">
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
            type: 'bullets',
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper bg-red-300 "
        >
          {newsPosts.map((post) => (
            <SwiperSlide key={post.id}>
              <NewsCard
                title={post.title}
                description={post.description}
                imageUrl={post.image_url}
                category={post.category?.name}
                author={{
                  name: post.author?.first_name 
                    ? `${post.author.first_name} ${post.author.last_name}` 
                    : 'NAITA Admin',
                  first_name: post.author?.first_name,
                  last_name: post.author?.last_name,
                  avatar: post.author?.avatar
                }}
                date={formatDate(post.created_at)}
                className="w-[180px] lg:w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-pagination relative mt-7 text-center"></div>
      </div>
    </div>
  );
}