// Frontend/src/components/TestAPI.jsx
import { useEffect } from 'react';
import { getCourses } from '../services/CourseService';

export default function TestAPI() {
  useEffect(() => {
    const testAPI = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/courses/courses/');
        const data = await response.json();
        console.log('Raw API Response:', data);
      } catch (error) {
        console.error('API Test Error:', error);
      }
    };
    testAPI();
  }, []);

  return <div>Check browser console for API test results</div>;
}