import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

interface DropdownItem {
  path: string;
  label: string;
}

interface NavDropdownProps {
  label: string;
  items: DropdownItem[];
}

const NavDropdown: React.FC<NavDropdownProps> = ({ label, items }) => {
  const location = useLocation();

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button 
            className={`inline-flex items-center text-sm font-medium transition-all duration-200 px-3 py-2 rounded-md
              ${open 
                ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800' 
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }
            `}
          >
            {label}
            <ChevronDownIcon
              className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                open ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white dark:bg-slate-900 shadow-lg ring-1 ring-slate-900/10 dark:ring-slate-50/[0.06] focus:outline-none overflow-hidden backdrop-blur-md">
              <div className="py-2 px-1">
                {items.map((item) => (
                  <Menu.Item key={item.path}>
                    {({ active }) => (
                      <Link
                        to={item.path}
                        className={`block px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                          location.pathname === item.path
                            ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800'
                            : active
                            ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800'
                            : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default NavDropdown;