import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  AcademicCapIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  StarIcon,
  BookOpenIcon,
  ComputerDesktopIcon,
  PresentationChartBarIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';

// Course categories
const categories = [
  { id: 'all', name: 'All Courses', icon: BookOpenIcon },
  { id: 'web', name: 'Web Development', icon: CodeBracketIcon },
  { id: 'digital', name: 'Digital Marketing', icon: PresentationChartBarIcon },
  { id: 'design', name: 'Design', icon: ComputerDesktopIcon },
];

// Course data
const courses = [
  {
    id: 1,
    title: 'Full Stack Web Development',
    category: 'web',
    description: 'Master both frontend and backend development with modern technologies.',
    duration: '16 weeks',
    level: 'Intermediate',
    students: '75+',
    rating: 4.9,
    price: '₦85,000',
    image: '/courses/fullstack.jpg',
    features: [
      'HTML5, CSS3 & JavaScript',
      'React & Node.js',
      'Database Management',
      'API Development',
      'DevOps Basics',
      'Real-world Projects'
    ],
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'Git'],
    enrollmentLink: 'https://your-backend-url/enroll/fullstack'
  },
  {
    id: 2,
    title: 'Digital Marketing Professional',
    category: 'digital',
    description: 'Comprehensive digital marketing training with practical implementation.',
    duration: '12 weeks',
    level: 'All Levels',
    students: '90+',
    rating: 4.8,
    price: '₦65,000',
    image: '/courses/digital-marketing.jpg',
    features: [
      'SEO & SEM',
      'Social Media Marketing',
      'Content Strategy',
      'Email Marketing',
      'Analytics & Reporting',
      'Campaign Management'
    ],
    skills: ['Google Analytics', 'SEO', 'Social Media', 'Content Marketing'],
    enrollmentLink: 'https://your-backend-url/enroll/digital-marketing'
  },
  {
    id: 3,
    title: 'UI/UX Design Masterclass',
    category: 'design',
    description: 'Learn to create beautiful, user-centered designs for web and mobile.',
    duration: '14 weeks',
    level: 'Intermediate',
    students: '60+',
    rating: 4.9,
    price: '₦75,000',
    image: '/courses/uiux.jpg',
    features: [
      'Design Principles',
      'User Research',
      'Wireframing',
      'Prototyping',
      'Design Systems',
      'Portfolio Building'
    ],
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Design Thinking'],
    enrollmentLink: 'https://your-backend-url/enroll/uiux'
  },
  {
    id: 4,
    title: 'Frontend Development Specialist',
    category: 'web',
    description: 'Become an expert in creating responsive and interactive web interfaces.',
    duration: '12 weeks',
    level: 'Beginner to Intermediate',
    students: '85+',
    rating: 4.7,
    price: '₦70,000',
    image: '/courses/frontend.jpg',
    features: [
      'Modern HTML & CSS',
      'JavaScript ES6+',
      'React Development',
      'State Management',
      'Performance Optimization',
      'Modern Build Tools'
    ],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Redux'],
    enrollmentLink: 'https://your-backend-url/enroll/frontend'
  },
];

const CourseCard: React.FC<{ course: typeof courses[0] }> = ({ course }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
    >
      <div className="relative aspect-w-16 aspect-h-9 group">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
              {course.level}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
          <span className="text-lg font-bold text-blue-600">{course.price}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-gray-600">
            <ClockIcon className="w-5 h-5 mr-2 text-blue-600" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <UserGroupIcon className="w-5 h-5 mr-2 text-blue-600" />
            <span>{course.students}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <StarIcon className="w-5 h-5 mr-2 text-yellow-500" />
            <span>{course.rating}/5.0</span>
          </div>
          <div className="flex items-center text-gray-600">
            <AcademicCapIcon className="w-5 h-5 mr-2 text-blue-600" />
            <span>{course.level}</span>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Key Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {course.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <a
            href={course.enrollmentLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 px-6 text-center font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Enroll Now
          </a>
          <button className="block w-full py-3 px-6 text-center font-semibold text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200">
            Learn More
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCourses = selectedCategory === 'all'
    ? courses
    : courses.filter(course => course.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-20 mb-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:20px_20px] opacity-20" />
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/30 text-blue-100 backdrop-blur-sm"
            >
              Discover Your Path to Success
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Transform Your Career with Our Expert-Led Courses
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-blue-100 mb-8"
            >
              Industry-relevant curriculum designed to help you master the skills needed in today's digital world
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a
                href="#courses"
                className="px-8 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-400 transition-colors duration-200"
              >
                Browse Courses
              </a>
              <Link
                to="/contact"
                className="px-8 py-3 text-lg font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Course Categories */}
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex flex-col items-center p-4 rounded-lg transition-colors duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <Icon className="w-6 h-6 mb-2" />
                  <span className="font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div id="courses" className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose A2 DigiHub?
            </h2>
            <p className="text-lg text-gray-600">
              We provide comprehensive training programs designed to help you succeed in the digital world
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: AcademicCapIcon,
                title: 'Expert Instructors',
                description: 'Learn from industry professionals with years of real-world experience'
              },
              {
                icon: ChartBarIcon,
                title: 'Practical Learning',
                description: 'Hands-on projects and real-world applications to build your portfolio'
              },
              {
                icon: UserGroupIcon,
                title: 'Career Support',
                description: 'Get guidance on job placements and career advancement opportunities'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Join thousands of students who have transformed their careers through our courses
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors duration-200"
              >
                Contact Us
              </Link>
              <a
                href="#courses"
                className="px-8 py-3 text-lg font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                View Courses
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Courses;
