import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';
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

  const isScrolled = scrollPosition > 0;
  const isHomePage = location.pathname === '/';

  // Dynamic navbar styles based on scroll and page
  const navBackground = isScrolled || !isHomePage
    ? 'glass-panel border-b border-ios-border'
    : 'bg-transparent';

  const textColor = isScrolled || !isHomePage
    ? 'text-ios-text'
    : 'text-white';

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${navBackground}`}>
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2 group">
            <span className="sr-only">{settings.site_name}</span>
            <div className={`p-2 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 group-hover:from-purple-500 group-hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-purple-500/20`}>
              <SparklesIcon className="h-6 w-6 text-white" />
            </div>
            <span className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${isScrolled || !isHomePage
              ? 'from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400'
              : 'from-white to-blue-100'
              }`}>
              {settings.site_name}
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 ${textColor}`}
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-semibold leading-6 transition-colors duration-300 hover:text-ios-blue ${textColor}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center gap-4">
          <ThemeToggle />
          <Link
            to="/login"
            className={`text-sm font-semibold leading-6 ${textColor} hover:text-ios-blue transition-colors duration-300`}
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-ios-blue px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-purple-500 hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Get Started
          </Link>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-ios-bg px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 transition-colors duration-300">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <div className="p-2 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600">
                <SparklesIcon className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-ios-text">
                {settings.site_name}
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-ios-subtext hover:text-ios-text"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-ios-border">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-xl px-3 py-2 text-base font-semibold leading-7 text-ios-text hover:bg-ios-surface hover:text-ios-blue"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6 space-y-3">
                <Link
                  to="/login"
                  className="-mx-3 block rounded-xl px-3 py-2.5 text-base font-semibold leading-7 text-ios-text hover:bg-ios-surface hover:text-ios-blue"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="-mx-3 block rounded-xl px-3 py-2.5 text-base font-semibold leading-7 text-white bg-ios-blue hover:bg-purple-500 text-center shadow-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Navbar;
