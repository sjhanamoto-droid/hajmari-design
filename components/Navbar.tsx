import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Camera, PenTool, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Top', path: '/' },
    { name: 'About', path: '/profile' },
    { name: 'Branding', path: '/design' },
    { name: 'Photography', path: '/photo' },
    { name: 'Portfolio', path: '/portfolio' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold tracking-widest flex items-center gap-2 z-50 relative group">
          SJ DESIGN
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-dark transition-all duration-300 group-hover:w-full"></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm tracking-widest uppercase relative group py-1 ${
                location.pathname === link.path ? 'text-brand-accent font-medium' : 'text-brand-dark'
              }`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 h-[1px] bg-brand-accent transition-all duration-300 ${
                location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          ))}
          <Link 
            to="/design" 
            className="px-6 py-2 bg-brand-dark text-white text-xs tracking-widest hover:bg-brand-accent transition-colors duration-300"
          >
            CONTACT
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden z-50 p-2 text-brand-dark"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-2xl font-serif text-brand-dark hover:text-brand-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-8 border-t border-gray-200 w-24 mx-auto"></div>
              <div className="flex gap-8">
                <Link to="/design" className="flex flex-col items-center gap-2 text-gray-500 hover:text-brand-dark transition-colors">
                  <PenTool size={24} />
                  <span className="text-xs">Design</span>
                </Link>
                <Link to="/photo" className="flex flex-col items-center gap-2 text-gray-500 hover:text-brand-dark transition-colors">
                  <Camera size={24} />
                  <span className="text-xs">Photo</span>
                </Link>
                <Link to="/profile" className="flex flex-col items-center gap-2 text-gray-500 hover:text-brand-dark transition-colors">
                  <User size={24} />
                  <span className="text-xs">Profile</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;