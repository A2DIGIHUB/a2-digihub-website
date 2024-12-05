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
            className={`inline-flex items-center text-sm font-medium transition-all duration-200 px-4 py-2 rounded-lg
              ${open 
                ? 'text-sky-300 bg-sky-400/10' 
                : 'text-gray-300 hover:text-sky-300 hover:bg-sky-400/5'
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
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-slate-900/95 shadow-lg ring-1 ring-sky-900/30 focus:outline-none overflow-hidden">
              <div className="py-2 px-1">
                {items.map((item) => (
                  <Menu.Item key={item.path}>
                    {({ active }) => (
                      <Link
                        to={item.path}
                        className={`block px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                          location.pathname === item.path
                            ? 'text-sky-300 bg-sky-400/10'
                            : active
                            ? 'text-sky-300 bg-sky-400/5'
                            : 'text-gray-300'
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