import API from './api';

export const getServices = async () => {
  try {
    const response = await API.get('courses/services/');
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return null;
  }
};

export const getNews = async () => {
  try{
    const response = await API.get('')
  }
}