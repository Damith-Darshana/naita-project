import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail';
import CourseDetail2 from './pages/CourseDetail2';
import AboutUs from './pages/AboutUs';
import News from './pages/News';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/courses/:id" 
          element={
            <ErrorBoundary>
              <CourseDetail2 />
            </ErrorBoundary>
          }
         
        />
        <Route path='/about' element={<AboutUs/>} />
        <Route path='/news' element={<News/>} />
      </Routes>
    </Router>
  );
}

export default App;