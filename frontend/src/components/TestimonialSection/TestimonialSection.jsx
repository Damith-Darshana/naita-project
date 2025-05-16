import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

export default function TestimonialSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Testimonial data - replace with real data from your backend
  const testimonials = [
    {
      id: 1,
      name: "John De Silva",
      role: "Welding Graduate",
      avatar: "/images/student1.jpg",
      quote: "NAITA's welding course gave me the skills I needed to start my career. The instructors were supportive, and the hands-on training was invaluable. I highly recommend NAITA!"
    },
    {
      id: 2,
      name: "Samantha Perera",
      role: "IT Graduate",
      avatar: "/images/student2.jpg",
      quote: "The computer hardware course at NAITA completely transformed my career prospects. The practical approach to learning made all the difference in my job search."
    },
    {
      id: 3,
      name: "Ravi Fernando",
      role: "Electrical Graduate",
      avatar: "/images/student3.jpg",
      quote: "Thanks to NAITA's electrical wiring program, I started my own business within six months of completing the course. The training was comprehensive and industry-relevant."
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section 
      className="w-full h-[754px] bg-[#87212E] flex flex-col items-center justify-center relative overflow-hidden"
      style={{ maxWidth: '1920px' }}
    >
      {/* Section Title */}
      <h2 className="text-[40px] font-medium text-white text-center mb-8 -mt-12">
        What Our Students Say
      </h2>

      {/* Testimonial Content */}
      <div className="relative w-full max-w-4xl px-8">
        {/* Left Quote Icon */}
        <FaQuoteLeft className="absolute top-82 left-0 text-white text-6xl opacity-30" />
        
        {/* Right Quote Icon */}
        <FaQuoteRight className="absolute -bottom-8 right-0 text-white text-6xl opacity-30" />

        {/* Student Avatar */}
        <div className="flex justify-center mb-2">
          <img 
            src={testimonials[currentTestimonial].avatar} 
            alt={testimonials[currentTestimonial].name}
            className="w-[151px] h-[151px] rounded-full object-cover border-4 border-white"
          />
        </div>

        {/* Student Name */}
        <p className="text-[36px] text-white text-center opacity-60 ">
          {testimonials[currentTestimonial].name}
        </p>

        {/* Student Role */}
        <p className="text-[24px] text-white text-center opacity-60 mb-12">
          {testimonials[currentTestimonial].role}
        </p>

        {/* Testimonial Quote */}
        <p className="text-[32px]  text-white text-center leading-tight px-12">
          {testimonials[currentTestimonial].quote}
        </p>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevTestimonial}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-opacity-20 p-4 rounded-full hover:bg-opacity-30 transition"
      >
        <ChevronLeft size={72} className="text-white" />
      </button>
      
      <button 
        onClick={nextTestimonial}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-opacity-20 p-4 rounded-full hover:bg-opacity-30 transition"
      >
        <ChevronRight size={72} className="text-white" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-3">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTestimonial(index)}
            className={`w-4 h-4 rounded-full transition ${
              index === currentTestimonial ? 'bg-white' : 'bg-white bg-opacity-30'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}