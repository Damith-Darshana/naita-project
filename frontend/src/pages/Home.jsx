import TopBar from '../components/TopBar/TopBar';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import Services from '../components/Services/Services';
import Dashboard from '../components/DashboardStats/DashboardStats';
import CourseExplorer from '../components/CourseExplorer/CourseExplorer';
import Footer from '../components/Footer/Footer';
import NewsSection from '../components/NewsSection/NewsSection';
import TestimonialSection from '../components/TestimonialSection/TestimonialSection';
import DashboardStats from '../components/DashboardStats/DashboardStats';

export default function Home() {
  return (
    <div className="bg-gray-100">
      <TopBar />
      <Navbar />
          <Hero 
        // These become fallback values if API fails
        staticTitle="National Apprentice..."
        staticDescription="In 1971, the National..."
        staticButtonText="Register Now"
        staticBackgroundImage="/Training1.jpg"
      />
      <Services/>
      <DashboardStats/>
      <CourseExplorer />
      <NewsSection/>
      {/* <TestimonialSection/> */}
      {/* <Footer /> */}
    </div>
  );
}