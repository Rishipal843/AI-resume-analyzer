import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import logo from "../assets/resume_logo-removebg-preview.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Analysis", path: "/analysis" },
    { name: "Keywords", path: "/keywords" },
  ];

  return (
    <nav className="bg-[#0a0f18] border-b border-gray-800 px-6 py-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Section: Logo */}
        <div className="flex items-center gap-3">
          <div className="w-15 h-10 bg-teal-500/10 rounded-xl flex items-center justify-center border border-teal-500/20">
            <img src={logo} alt="ResumeAI logo" className="w-25 h-25 object-contain" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">InsightCV</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center bg-[#161d2a] p-1.5 rounded-xl border border-gray-800">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive(link.path) ? "bg-[#1f2937] text-white shadow-sm" : "text-gray-400 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button onClick={handleLogout} className="ml-2 p-2 text-gray-400 hover:text-[#2dd4bf] transition-colors" title="Logout">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-gray-400 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0d1420] border-b border-gray-800 p-4 space-y-2 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-medium ${
                isActive(link.path) ? "bg-[#11212a] text-[#2dd4bf]" : "text-gray-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-4 py-3 text-gray-400 hover:text-[#2dd4bf]"
          >
            <span>Logout</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;