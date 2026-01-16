import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import {
  AcademicCapIcon,
  ClockIcon,
  UserGroupIcon,
  StarIcon,
  BookOpenIcon,
  CodeBracketIcon,
  ServerIcon,
  PaintBrushIcon,
  SwatchIcon,
  ShieldCheckIcon,
  ChartBarIcon // Kept for Why Choose Us section
} from '@heroicons/react/24/outline';

interface Course {
  id: string;
  title: string;
  alias?: string; // category
  description: string;
  duration: string;
  level: string;
  price: number | string;
  image_url: string;
  active: boolean;
  created_at: string;
}

// Icon mapper helper
const getCategoryIcon = (alias: string) => {
  switch (alias) {
    case 'frontend': return CodeBracketIcon;
    case 'backend': return ServerIcon;
    case 'uiux': return PaintBrushIcon;
    case 'graphic': return SwatchIcon;
    case 'security': return ShieldCheckIcon;
    default: return BookOpenIcon;
  }
};

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full"
    >
      <div className="relative h-64 w-full group overflow-hidden">
        {course.image_url ? (
          <img
            src={course.image_url}
            alt={course.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-slate-200 flex items-center justify-center">
            <AcademicCapIcon className="w-16 h-16 text-slate-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
              {course.level}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
          <span className="text-lg font-bold text-blue-600">
            {typeof course.price === 'number' ? `₦${course.price.toLocaleString()}` : course.price}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3 flex-1">{course.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-6 mt-auto">
          <div className="flex items-center text-gray-600 text-sm">
            <ClockIcon className="w-4 h-4 mr-2 text-blue-600" />
            <span>{course.duration}</span>
          </div>
          {/* Mock Data for stats not in DB yet */}
          <div className="flex items-center text-gray-600 text-sm">
            <UserGroupIcon className="w-4 h-4 mr-2 text-blue-600" />
            <span>Students: 20+</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <StarIcon className="w-4 h-4 mr-2 text-yellow-500" />
            <span>5.0</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <AcademicCapIcon className="w-4 h-4 mr-2 text-blue-600" />
            <span>{course.level}</span>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-100">
          <Link
            to="/contact" // Ideally specific enrollment link, but contact works for now
            className="block w-full py-3 px-6 text-center font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error("Error fetching courses", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* Course Grid */}
      <div id="courses" className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No courses available at the moment. Please check back later.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Illumi-Labs?
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

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Courses;
