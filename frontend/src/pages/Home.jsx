import TopBar from '../components/TopBar/TopBar';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import Dashboard from '../components/Dashboard/Dashboard';
import CourseExplorer from '../components/CourseExplorer/CourseExplorer';
import Footer from '../components/Footer/Footer';
import NewsSection from '../components/NewsSection/NewsSection';
import TestimonialSection from '../components/TestimonialSection/TestimonialSection';

export default function Home() {
  return (
    <div className="bg-white">
      <TopBar />
      <Navbar />
      <Hero />
      <Dashboard />
      <CourseExplorer />
      <NewsSection/>
      <TestimonialSection/>
      <Footer />
    </div>
  );
}