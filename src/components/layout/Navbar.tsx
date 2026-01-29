import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
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

  const isScrolled = scrollPosition > 10;
  const isHomePage = location.pathname === '/';

  // Dynamic navbar styles based on scroll and page
  // Always use a subtle background for better readability in Clean Minimal
  const navBackground = isScrolled || !isHomePage
    ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm'
    : 'bg-transparent';

  const textColor = isScrolled || !isHomePage
    ? 'text-gray-900 dark:text-white'
    : 'text-gray-900 dark:text-white lg:text-white'; // On home hero, text might need to be white if hero is dark, but our new hero is light. 
  // Wait, the new Home.tsx hero has white bg? 
  // "bg-white dark:bg-gray-950". 
  // So text should ALWAYS be dark (or white in dark mode).
  // Let's simplify.

  const finalTextColor = 'text-gray-900 dark:text-white';
  const finalNavBackground = 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50';

  // Check if current path is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={finalNavBackground}>
      <nav className="container mx-auto px-6 lg:px-8 max-w-7xl flex items-center justify-between py-4" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2 group">
            <span className="sr-only">{settings.site_name}</span>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-orange-600 text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform duration-200">
              O
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold tracking-tight ${finalTextColor}`}>
                {settings.site_name}
              </span>
            </div>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-4">
          <ThemeToggle />
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700 dark:text-gray-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8 items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-bold transition-all duration-200 ${isActive(item.href)
                ? 'text-orange-600 dark:text-orange-500'
                : 'text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500'
                }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center gap-4">
          <ThemeToggle />
          <Link
            to="/contact"
            className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold rounded-lg hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white transition-all shadow-sm hover:shadow-md"
          >
            Start Project
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-950 px-6 py-6 sm:max-w-sm border-l border-gray-100 dark:border-gray-800 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <div className="w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center font-bold">
                O
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {settings.site_name}
              </span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-100 dark:divide-gray-800">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-bold leading-7 hover:bg-gray-50 dark:hover:bg-gray-900 ${isActive(item.href)
                        ? 'text-orange-600 dark:text-orange-500 bg-orange-50 dark:bg-orange-950/30'
                        : 'text-gray-900 dark:text-white'
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6 space-y-3">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-bold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  Log in
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-3 py-3 text-center text-base font-bold text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Start Project
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
