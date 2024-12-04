import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  AcademicCapIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

// Course data - you can move this to a separate data file later
const courses = [
  {
    id: 1,
    title: 'Web Development Fundamentals',
    description: 'Learn the basics of HTML, CSS, and JavaScript to build modern websites.',
    duration: '12 weeks',
    level: 'Beginner',
    students: '50+',
    rating: 4.8,
    price: '₦50,000',
    image: '/courses/web-dev.jpg',
    features: [
      'HTML5 & CSS3',
      'JavaScript Basics',
      'Responsive Design',
      'Basic Web Projects',
    ],
    enrollmentLink: 'https://your-backend-url/enroll/web-dev'
  },
  {
    id: 2,
    title: 'Digital Marketing Mastery',
    description: 'Master digital marketing strategies, SEO, and social media marketing.',
    duration: '8 weeks',
    level: 'Intermediate',
    students: '40+',
    rating: 4.7,
    price: '₦45,000',
    image: '/courses/digital-marketing.jpg',
    features: [
      'SEO Fundamentals',
      'Social Media Strategy',
      'Content Marketing',
      'Analytics & Tracking',
    ],
    enrollmentLink: 'https://your-backend-url/enroll/digital-marketing'
  },
  {
    id: 3,
    title: 'UI/UX Design Essentials',
    description: 'Learn to create beautiful and functional user interfaces and experiences.',
    duration: '10 weeks',
    level: 'Intermediate',
    students: '35+',
    rating: 4.9,
    price: '₦55,000',
    image: '/courses/uiux-design.jpg',
    features: [
      'Design Principles',
      'User Research',
      'Prototyping',
      'Design Systems',
    ],
    enrollmentLink: 'https://your-backend-url/enroll/uiux-design'
  },
  // Add more courses as needed
];

const CourseCard: React.FC<{ course: typeof courses[0] }> = ({ course }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4">{course.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-gray-600">
            <ClockIcon className="w-5 h-5 mr-2 text-blue-600" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <UserGroupIcon className="w-5 h-5 mr-2 text-blue-600" />
            <span>{course.students}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <StarIcon className="w-5 h-5 mr-2 text-blue-600" />
            <span>{course.rating}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <CurrencyDollarIcon className="w-5 h-5 mr-2 text-blue-600" />
            <span>{course.price}</span>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">What you'll learn:</h4>
          <ul className="space-y-2">
            {course.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <a
          href={course.enrollmentLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 px-6 text-center font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Enroll Now
        </a>
      </div>
    </motion.div>
  );
};

const Courses = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 py-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }} />
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Empower Your Future with Our Courses
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-blue-100 mb-8"
            >
              Discover our comprehensive range of tech courses designed to help you succeed in the digital world
            </motion.p>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Join thousands of students who have transformed their careers through our courses
            </p>
            <Link
              to="/contact"
              className="inline-block py-3 px-8 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Contact Us for More Information
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Courses;
