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
  ChartBarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  SparklesIcon
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
      className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 group hover:shadow-lg flex flex-col h-full"
    >
      <div className="relative h-64 w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
        {course.image_url ? (
          <img
            src={course.image_url}
            alt={course.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <AcademicCapIcon className="w-16 h-16 text-gray-400 dark:text-gray-600 opacity-50" />
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-black/80 backdrop-blur-md text-gray-900 dark:text-white shadow-sm">
            {course.level}
          </span>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4 gap-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors line-clamp-2 leading-tight">
            {course.title}
          </h3>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 flex-1 text-sm leading-relaxed">
          {course.description}
        </p>

        <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs font-medium">
            <ClockIcon className="w-4 h-4 mr-2 text-orange-600 dark:text-orange-500" />
            <span>{course.duration}</span>
          </div>
          {/* Mock Stats */}
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs font-medium">
            <UserGroupIcon className="w-4 h-4 mr-2 text-orange-600 dark:text-orange-500" />
            <span>20+ Students</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {typeof course.price === 'number' ? `₦${course.price.toLocaleString()}` : course.price}
          </span>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-lg hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white transition-all text-sm"
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
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      {/* Hero Section - Clean Minimal */}
      <section className="relative py-24 overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-orange-50 dark:bg-orange-950/10 rounded-full blur-3xl opacity-30"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 dark:bg-orange-950/30 rounded-full mb-6">
              <SparklesIcon className="w-4 h-4 text-orange-600 dark:text-orange-500" />
              <span className="text-sm font-medium text-orange-600 dark:text-orange-500">Cultural Technology Academy</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
              Master the skills of the <span className="text-orange-600 dark:text-orange-500">future</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Industry-led training programs designed to launch your career in technology and digital innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="pb-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mb-4"></div>
              <div className="text-gray-500 font-medium">Loading courses...</div>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
              <BookOpenIcon className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No courses available yet</h3>
              <p className="text-gray-500">Check back soon for our upcoming cohorts.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section - Clean */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why learn with us?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              We provide comprehensive training programs designed to help you succeed in the digital world, rooted in real-world application.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: AcademicCapIcon,
                title: 'Expert Instructors',
                description: 'Learn from industry professionals with years of real-world experience building successful products.'
              },
              {
                icon: ChartBarIcon,
                title: 'Practical Learning',
                description: 'Hands-on projects and real-world applications to build your portfolio from day one.'
              },
              {
                icon: UserGroupIcon,
                title: 'Career Support',
                description: 'Get guidance on job placements, resume building, and career advancement opportunities.'
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
                  className="text-center p-8 bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 transition-all hover:shadow-lg"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-500 mb-6">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;
