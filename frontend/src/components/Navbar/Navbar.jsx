import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search } from 'react-feather';
import logo from '../../assets/images/react.svg';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const navLinks = [
    { path: '/', name: 'Home' },
    { path: '/about', name: 'About Us' },
    { path: '/courses', name: 'Courses' },
    { path: '/centers', name: 'Training Centers' },
    { path: '/news', name: 'News' },
    { path: '/contact', name: 'Contact' },
  ];

  return (
    <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
      {/* Logo */}
      <img src={logo} alt="NAITA Logo" className="h-16" />

      {/* Navigation Links - Center */}
      <div className="hidden lg:flex space-x-12 mx-8">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-lg font-medium ${
              location.pathname === link.path ? 'text-naita-red' : 'text-[#636262]'
            } hover:text-naita-red transition`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Search Bar - Right */}
      <div className="relative w-[431px] hidden lg:block">
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-[64px] pl-6 pr-[150px] border border-gray-300 rounded-[30px] focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-red-800 text-white w-[138px] h-[48px] rounded-[30px] flex items-center justify-center">
          <Search className="mr-2" size={18} />
          Search
        </button>
      </div>
    </nav>
  );
}