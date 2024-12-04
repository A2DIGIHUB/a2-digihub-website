import React from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-16 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="hover:text-blue-300 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-300 transition-colors">About Us</Link></li>
              <li><Link to="/courses" className="hover:text-blue-300 transition-colors">All Courses</Link></li>
              <li><Link to="/contact" className="hover:text-blue-300 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-xl font-bold mb-6">Our Courses</h3>
            <ul className="space-y-4">
              <li><Link to="/courses" className="hover:text-blue-300 transition-colors">Frontend Development</Link></li>
              <li><Link to="/courses" className="hover:text-blue-300 transition-colors">Backend Development</Link></li>
              <li><Link to="/courses" className="hover:text-blue-300 transition-colors">UI/UX Design</Link></li>
              <li><Link to="/courses" className="hover:text-blue-300 transition-colors">Graphic Design</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <PhoneIcon className="w-5 h-5 mr-2" />
                <span>+234 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <EnvelopeIcon className="w-5 h-5 mr-2" />
                <span>a2digihub@gmail.com</span>
              </li>
              <li className="flex items-center">
                <MapPinIcon className="w-5 h-5 mr-2" />
                <span>Lagos, Nigeria</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6">Newsletter</h3>
            <p className="mb-4">Subscribe to get updates on new courses and tech news.</p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-blue-400"
              />
              <button
                type="submit"
                className="w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p>&copy; {new Date().getFullYear()} A2 DigiHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
