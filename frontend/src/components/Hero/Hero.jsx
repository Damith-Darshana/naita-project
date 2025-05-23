import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getHeroContent } from '../../services/HeroService';

export default function Hero({ 
  staticTitle,
  staticDescription,
  staticButtonText,
  staticBackgroundImage
}) {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await getHeroContent();
        setHeroData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // Use static props as fallback
  const title = heroData?.title || staticTitle;
  const description = heroData?.description || staticDescription;
  const buttonText = heroData?.button_text || staticButtonText;
  const backgroundImage = heroData?.background_image || staticBackgroundImage;

  if (loading) {
    return (
      <div className="relative w-full h-[233px] lg:h-[860px] bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 w-full h-full lg:w-[1038px] lg:h-[533px]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Hero Error:', error);
    // Fallback to static content if API fails
    return (
      <StaticHero 
        title={staticTitle}
        description={staticDescription}
        buttonText={staticButtonText}
        backgroundImage={staticBackgroundImage}
      />
    );
  }

  return (
    <div className="relative w-full h-[233px] lg:h-[860px] bg-cover bg-center" 
         style={{ backgroundImage: `url(${backgroundImage})` }}>
      
      <div className="absolute inset-0 bg-black/30 bg-opacity-40 flex items-center">
        <div className="container ml-4 mt-50 lg:ml-20">
          <div className="bg-white bg-opacity-90 w-auto h-[263px] rounded-[5px] p-5 
                         lg:w-[1038px] lg:h-[533px] lg:p-12 lg:rounded-lg">
            <h1 className="text-xl font-bold text-gray-900 mb-4 lg:text-5xl">
              {title}
            </h1>
            <p className="text-xs text-gray-700 mb-4 max-w-3xl lg:text-2xl">
              {description}
            </p>
            <Link 
              to="/register"
              className="bg-red-800 text-white w-full h-[55px] rounded-[12px] text-base font-medium hover:bg-opacity-90 transition mt-4 flex items-center justify-center
                         lg:w-[372px] lg:h-[91px] lg:text-2xl lg:mt-12"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

Hero.propTypes = {
  staticTitle: PropTypes.string,
  staticDescription: PropTypes.string,
  staticButtonText: PropTypes.string,
  staticBackgroundImage: PropTypes.string,
};

Hero.defaultProps = {
  staticTitle: "National Apprentice and Industrial Training Authority - Sri Lanka",
  staticDescription: "In 1971, the National Apprentice Board (NAB) was created to manage and organize job-based training programs for students. With help from the United Nations and the International Labor Organization, NAB developed skills to improve apprenticeship training.",
  staticButtonText: "Register Now",
  staticBackgroundImage: "/Training1.jpg"
};

// Static fallback component
function StaticHero({ title, description, buttonText, backgroundImage }) {
  return (
    <div className="relative w-full h-[233px] lg:h-[860px] bg-cover bg-center" 
         style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* ... same content as main Hero ... */}
    </div>
  );
}