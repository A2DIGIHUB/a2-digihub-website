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
      className="glass-card overflow-hidden hover:bg-ios-surface-2 transition-all duration-300 flex flex-col h-full group"
    >
      <div className="relative h-64 w-full overflow-hidden">
        {course.image_url ? (
          <img
            src={course.image_url}
            alt={course.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-ios-surface-2 flex items-center justify-center">
            <AcademicCapIcon className="w-16 h-16 text-ios-subtext opacity-50" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-ios-blue/80 backdrop-blur-md text-white border border-white/10">
              {course.level}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-ios-text group-hover:text-ios-blue transition-colors line-clamp-1">{course.title}</h3>
          <span className="text-lg font-bold text-ios-green">
            {typeof course.price === 'number' ? `₦${course.price.toLocaleString()}` : course.price}
          </span>
        </div>

        <p className="text-ios-subtext mb-6 line-clamp-3 flex-1 text-sm leading-relaxed">{course.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-6 mt-auto">
          <div className="flex items-center text-ios-subtext text-xs font-medium">
            <ClockIcon className="w-4 h-4 mr-2 text-ios-blue" />
            <span>{course.duration}</span>
          </div>
          {/* Mock Data for stats not in DB yet */}
          <div className="flex items-center text-ios-subtext text-xs font-medium">
            <UserGroupIcon className="w-4 h-4 mr-2 text-ios-blue" />
            <span>Students: 20+</span>
          </div>
          <div className="flex items-center text-ios-subtext text-xs font-medium">
            <StarIcon className="w-4 h-4 mr-2 text-yellow-500" />
            <span>5.0</span>
          </div>
          <div className="flex items-center text-ios-subtext text-xs font-medium">
            <AcademicCapIcon className="w-4 h-4 mr-2 text-ios-blue" />
            <span>{course.level}</span>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-ios-border">
          <Link
            to="/contact" // Ideally specific enrollment link, but contact works for now
            className="block w-full py-3 px-6 text-center font-bold text-white bg-ios-blue rounded-xl hover:bg-blue-600 transition-all hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]"
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
    <div className="min-h-screen bg-ios-bg">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 py-24 mb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20 bg-center" style={{ backgroundImage: "url('/grid.svg')" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ios-bg/90" />
        </div>

        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1.5 mb-6 rounded-full bg-ios-surface/50 border border-ios-border text-blue-100 backdrop-blur-md text-sm font-medium"
            >
              Discover Your Path to Success
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight"
            >
              Transform Your Career with Our Expert-Led Courses
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-ios-subtext mb-8 max-w-2xl mx-auto"
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
                className="px-8 py-3.5 text-lg font-bold text-white bg-ios-blue rounded-full shadow-lg hover:bg-blue-600 transition-all hover:-translate-y-1 hover:shadow-blue-500/30"
              >
                Browse Courses
              </a>
              <Link
                to="/contact"
                className="px-8 py-3.5 text-lg font-bold text-white border border-white/20 bg-white/5 rounded-full hover:bg-white/10 transition-all hover:-translate-y-1 backdrop-blur-sm"
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
          <div className="text-center py-20 text-ios-subtext">Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20 text-ios-subtext">No courses available at the moment. Please check back later.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-ios-surface/30 py-24 border-t border-ios-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-ios-text mb-6">
              Why Choose OKIKE?
            </h2>
            <p className="text-lg text-ios-subtext">
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
                  className="text-center p-8 glass-card hover:bg-ios-surface transition-colors"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-ios-blue/10 text-ios-blue mb-6">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-ios-text mb-4">{feature.title}</h3>
                  <p className="text-ios-subtext leading-relaxed">{feature.description}</p>
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
