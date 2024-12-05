import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import NavDropdown from '../navigation/NavDropdown';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const dropdownItems = [
    { path: '/services', label: 'Services' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/courses', label: 'Courses' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || location.pathname !== '/' 
            ? 'bg-slate-900/95 shadow-lg'
            : 'bg-slate-900/80'
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link 
              to="/" 
              className="flex items-center space-x-2 group"
            >
              <span className="text-2xl font-bold text-sky-400 group-hover:text-sky-300 transition-colors duration-300">
                A2 DIGIHUB
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-all duration-200 px-4 py-2 rounded-lg ${
                    location.pathname === item.path
                      ? 'text-sky-300 bg-sky-400/10'
                      : 'text-gray-300 hover:text-sky-300 hover:bg-sky-400/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <NavDropdown label="Solutions" items={dropdownItems} />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-sky-300 hover:bg-sky-400/5 transition-colors focus:outline-none"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900/95 border-t border-sky-900/30"
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      location.pathname === item.path
                        ? 'text-sky-300 bg-sky-400/10'
                        : 'text-gray-300 hover:text-sky-300 hover:bg-sky-400/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Solutions
                </div>
                {dropdownItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-6 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      location.pathname === item.path
                        ? 'text-sky-300 bg-sky-400/10'
                        : 'text-gray-300 hover:text-sky-300 hover:bg-sky-400/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow pt-20 w-full max-w-full">
        {children}
      </main>

      <footer className="bg-gray-900 text-white w-full">
        {/* Footer content */}
      </footer>
    </div>
  );
};

export default Layout;
