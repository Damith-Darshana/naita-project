import API from './api';

export const getHeroContent = async () => {
  try {
    const response = await API.get('courses/hero-content/');
    return response.data;
  } catch (error) {
    console.error('Error fetching hero content:', error);
    return null;
  }
};