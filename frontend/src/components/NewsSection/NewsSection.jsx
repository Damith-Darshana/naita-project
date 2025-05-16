import { useState, useEffect } from 'react';
import { ChevronRight } from 'react-feather';

export default function NewsSection() {
  const [activeTab, setActiveTab] = useState('Announcements');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock news data - replace with real data from your backend
  const newsData = {
    Announcements: Array(5).fill().map((_, i) => ({
      id: `announce-${i}`,
      title: `Important Announcement ${i + 1}`,
      description: `This is a detailed description of the announcement ${i + 1}. It contains important information that all students should be aware of regarding upcoming changes.`,
      image: '/images/news-announcement.jpg',
      author: {
        name: 'NAITA Admin',
        avatar: '/images/admin-avatar.jpg',
        posted: `${i + 1} hours ago`
      },
      date: `December ${11 + i}, 2024`
    })),
    News: Array(5).fill().map((_, i) => ({
      id: `news-${i}`,
      title: `Latest News Update ${i + 1}`,
      description: `This news update covers recent developments in vocational training programs. Stay informed about the latest opportunities available through NAITA.`,
      image: '/images/news-update.jpg',
      author: {
        name: 'News Editor',
        avatar: '/images/editor-avatar.jpg',
        posted: `${i + 2} hours ago`
      },
      date: `December ${12 + i}, 2024`
    })),
    LatestNews: Array(5).fill().map((_, i) => ({
      id: `latest-${i}`,
      title: `Breaking News ${i + 1}`,
      description: `Breaking news about immediate opportunities or urgent notifications for all NAITA students and applicants.`,
      image: '/images/breaking-news.jpg',
      author: {
        name: 'NAITA Reporter',
        avatar: '/images/reporter-avatar.jpg',
        posted: `${i} hours ago`
      },
      date: `December ${10 + i}, 2024`
    }))
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % newsData[activeTab].length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [activeTab, newsData]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-[28px] font-semibold text-black mb-8">News and Updates</h2>
        
        {/* Tab Buttons */}
        <div className="flex gap-4 mb-12">
          {['Announcements', 'News', 'LatestNews'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentSlide(0); // Reset to first slide when changing tab
              }}
              className={`w-[250px] h-[58px] rounded-[8px] text-[18px] font-medium transition
                ${activeTab === tab 
                  ? 'bg-[#87212E] text-white' 
                  : 'bg-[#333333] text-black hover:bg-[#444444]'
                }`}
            >
              {tab.replace(/([A-Z])/g, ' $1').trim()} {/* Convert camelCase to normal text */}
            </button>
          ))}
        </div>
        
        {/* News Carousel */}
        <div className="relative overflow-hidden h-[700px]">
          <div 
            className="flex transition-transform duration-1000 ease-linear"
            style={{
              transform: `translateX(-${currentSlide * (384 + 23)}px)`,
              gap: '23px'
            }}
          >
            {newsData[activeTab].map((news) => (
              <div 
                key={news.id}
                className="flex-shrink-0 w-[384px] h-[611px] rounded-[2px] shadow-md overflow-hidden bg-white"
              >
                {/* News Image */}
                <div className="w-[384px] h-[302px] overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* News Content */}
                <div className="p-6">
                  {/* Author Info */}
                  <div className="flex items-center mb-4">
                    <img 
                      src={news.author.avatar} 
                      alt={news.author.name}
                      className="w-[25px] h-[25px] rounded-full mr-2"
                    />
                    <span className="text-[18px] font-bold mr-2">{news.author.name}</span>
                    <span className="text-[16px] text-[#676767]">• {news.author.posted}</span>
                  </div>
                  
                  {/* News Title */}
                  <h3 className="text-[18px] font-bold text-black mb-3">{news.title}</h3>
                  
                  {/* News Description */}
                  <p className="text-[18px] text-[#676767] mb-6 line-clamp-3">
                    {news.description}
                  </p>
                  
                  {/* Read More Link */}
                  <a href="#" className="text-[#87212E] text-[18px] font-medium flex items-center mb-3">
                    Read more <ChevronRight size={18} className="ml-1" />
                  </a>
                  
                  {/* News Date */}
                  <p className="text-[14px] text-[#676767] font-medium">
                    {news.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}