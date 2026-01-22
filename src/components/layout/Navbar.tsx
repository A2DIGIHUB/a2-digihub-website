import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, SparklesIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useTheme } from '../../contexts/ThemeContext';
import { useContent } from '../../contexts/ContentContext';
import ThemeToggle from '../common/ThemeToggle';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Insights', href: '/blog' },
  { name: 'Courses', href: '/courses' },
  { name: 'Contact', href: '/contact' },
];

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const location = useLocation();
  const { theme } = useTheme();
  const { settings } = useContent();

  const isScrolled = scrollPosition > 20;
  const isHomePage = location.pathname === '/';

  // Dynamic navbar styles based on scroll and page
  const navBackground = isScrolled || !isHomePage
    ? 'glass-panel border-b border-ios-border shadow-lg'
    : 'bg-transparent';

  const textColor = isScrolled || !isHomePage
    ? 'text-ios-text'
    : 'text-white';

  // Check if current path is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${navBackground}`}>
      <nav className="container mx-auto flex items-center justify-between px-6 py-4 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-3 group">
            <span className="sr-only">{settings.site_name}</span>
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 group-hover:from-purple-500 group-hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 group-hover:scale-105">
              <SparklesIcon className="h-6 w-6 text-white" />
            </div>
            <span className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r transition-all duration-300 ${isScrolled || !isHomePage
              ? 'from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400'
              : 'from-white to-purple-100'
              }`}>
              {settings.site_name}
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            className={`-m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 hover:bg-white/10 transition-colors ${textColor}`}
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-1 items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 group ${isActive(item.href)
                ? 'text-ios-blue'
                : `${textColor} hover:text-ios-blue`
                }`}
            >
              {item.name}
              {isActive(item.href) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-ios-blue rounded-full"></span>
              )}
              <span className={`absolute inset-0 rounded-lg transition-all duration-300 ${isActive(item.href)
                ? 'bg-ios-blue/10'
                : 'bg-transparent group-hover:bg-white/5'
                }`}></span>
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center gap-4">
          <ThemeToggle />
          <div className="h-6 w-px bg-ios-border"></div>
          <Link
            to="/login"
            className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 ${textColor} hover:text-ios-blue hover:bg-white/5`}
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 group"
          >
            <span className="relative z-10">Get Started</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-ios-bg px-6 py-6 sm:max-w-sm border-l border-ios-border shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <div className="p-2 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-lg">
                <SparklesIcon className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                {settings.site_name}
              </span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-lg p-2.5 text-ios-text hover:bg-ios-surface transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 text-base font-semibold rounded-xl transition-all duration-300 ${isActive(item.href)
                  ? 'bg-ios-blue text-white shadow-lg shadow-purple-500/20'
                  : 'text-ios-text hover:bg-ios-surface'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-ios-border space-y-3">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full px-4 py-3 text-center text-base font-semibold text-ios-text bg-ios-surface rounded-xl hover:bg-ios-surface-2 transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full px-4 py-3 text-center text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Get Started
            </Link>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Navbar;
