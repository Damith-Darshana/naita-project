import { Link } from 'react-router-dom'
import { Menu, X } from 'react-feather'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/assets/logo.png" alt="NAITA Logo" className="h-10" />
          <span className="ml-2 text-xl font-bold text-naita-blue">NAITA</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-naita-blue font-medium">Home</Link>
          <Link to="/courses" className="text-gray-600 hover:text-naita-blue">Courses</Link>
          <Link to="/centers" className="text-gray-600 hover:text-naita-blue">Centers</Link>
          <Link to="/about" className="text-gray-600 hover:text-naita-blue">About</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="px-4 py-2 text-naita-blue font-medium">Login</Link>
          <Link to="/register" className="px-4 py-2 bg-naita-blue text-white rounded-md hover:bg-naita-blue-dark">
            Register
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-md">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-naita-blue font-medium">Home</Link>
            <Link to="/courses" className="text-gray-600">Courses</Link>
            <Link to="/centers" className="text-gray-600">Centers</Link>
            <Link to="/about" className="text-gray-600">About</Link>
          </nav>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link to="/login" className="block py-2 text-naita-blue">Login</Link>
            <Link to="/register" className="block py-2 text-naita-blue">Register</Link>
          </div>
        </div>
      )}
    </header>
  )
}