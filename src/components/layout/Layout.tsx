import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import NavDropdown from '../navigation/NavDropdown';
import { useAuth } from '../../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${isScrolled || location.pathname !== '/'
          ? 'bg-white/90 dark:bg-slate-900/90 shadow-lg'
          : 'bg-transparent'
          }`}
      >
        <div className="absolute inset-0 border-b border-slate-900/10 dark:border-slate-50/[0.06]"></div>
        <nav className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className="flex items-center space-x-2 group"
            >
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:via-sky-600 group-hover:to-emerald-600 transition-all duration-300">
                ILLUMI-LABS
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-all duration-200 px-3 py-2 rounded-md ${location.pathname === item.path
                    ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              <NavDropdown label="Solutions" items={dropdownItems} />

              <div className="ml-6 flex items-center space-x-4">
                {user ? (
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors shadow-sm hover:shadow-md"
                  >
                    <UserCircleIcon className="h-5 w-5" />
                    <span>My Dashboard</span>
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
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
              className="md:hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-900/10 dark:border-slate-50/[0.06]"
            >
              <div className="container mx-auto px-4 py-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${location.pathname === item.path
                      ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Solutions
                </div>
                {dropdownItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${location.pathname === item.path
                      ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="h-px bg-slate-200 dark:bg-slate-800 my-3 mx-3" />

                <div className="px-3 space-y-2">
                  {user ? (
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center w-full px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      <UserCircleIcon className="h-5 w-5 mr-2" />
                      My Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-center w-full px-4 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-center w-full px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm transition-all duration-200"
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow pt-16 w-full max-w-full">
        {children}
      </main>

      <footer className="bg-slate-900 text-white w-full">
        {/* Footer content */}
      </footer>
    </div>
  );
};

export default Layout;
