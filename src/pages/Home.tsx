import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronDownIcon,
  RocketLaunchIcon,
  CpuChipIcon,
  CloudIcon,
  LightBulbIcon,
  UserGroupIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import FloatingElement from '../components/graphics/FloatingElement';
import GradientText from '../components/graphics/GradientText';
import Footer from '../components/Footer';
import PortfolioSection from '../components/sections/PortfolioSection';
import { supabase } from '../lib/supabase';
import { useContent } from '../contexts/ContentContext';

const Home: React.FC = () => {
  const { settings } = useContent();
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetchLatestBlogs();
  }, []);

  const fetchLatestBlogs = async () => {
    const { data } = await supabase
      .from('blogs')
      .select('id, title, excerpt, slug, cover_image, created_at')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(3);
    setBlogs(data || []);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 min-h-[80vh]">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white/5 rounded-full"
                style={{
                  width: Math.random() * 300 + 50,
                  height: Math.random() * 300 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="relative container mx-auto px-4 sm:px-6 flex min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center py-12 md:py-20">
            {/* Left column - Text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="inline-block"
                >
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-500/10 text-blue-200 text-xs sm:text-sm font-medium">
                    Welcome to {settings.site_name}
                  </span>
                </motion.div>
                <GradientText
                  text="Transforming Ideas into Digital Reality"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                  gradient="from-white via-blue-100 to-blue-200"
                />
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-base sm:text-lg md:text-xl text-blue-100/90 max-w-xl"
                >
                  {settings.description || "Empowering businesses with cutting-edge digital solutions for the modern technological landscape."}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <Link
                  to="/contact"
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg font-medium text-white text-center overflow-hidden transition-all hover:scale-105"
                >
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 transition-transform group-hover:translate-x-full" />
                  Get Started
                </Link>
                <Link
                  to="/services"
                  className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/20 text-white rounded-lg font-medium text-center hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm"
                >
                  Explore Services
                </Link>
              </motion.div>
            </motion.div>

            {/* Right column - Interactive 3D element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square">
                {/* Animated rings */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 border-2 border-white/20 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.2, 0.1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 10 + i * 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ))}

                {/* Central sphere */}
                <motion.div
                  className="absolute inset-0 m-auto w-48 h-48 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-lg"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Floating icons */}
                {[
                  { icon: <RocketLaunchIcon className="w-8 h-8" />, position: "top-1/4 left-1/4" },
                  { icon: <CpuChipIcon className="w-8 h-8" />, position: "top-1/4 right-1/4" },
                  { icon: <CloudIcon className="w-8 h-8" />, position: "bottom-1/4 left-1/4" },
                  { icon: <LightBulbIcon className="w-8 h-8" />, position: "bottom-1/4 right-1/4" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`absolute ${item.position} text-white/80`}
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5,
                    }}
                  >
                    {item.icon}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <FloatingElement>
            <ChevronDownIcon className="w-8 h-8 text-white/80" />
          </FloatingElement>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 bg-gray-50 dark:bg-slate-900 transition-colors">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <GradientText
              text="Cutting-Edge Features"
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
            />
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Discover how our innovative solutions can transform your business with
              state-of-the-art technology and expert implementation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                icon: <RocketLaunchIcon className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: 'Rapid Development',
                description: 'Quick turnaround times with our agile development methodology.'
              },
              {
                icon: <CpuChipIcon className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: 'Advanced Technology',
                description: 'Utilizing cutting-edge tech stack for optimal performance.'
              },
              {
                icon: <CloudIcon className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: 'Cloud Solutions',
                description: 'Scalable and secure cloud infrastructure for your applications.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Our Featured Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Discover how we've helped businesses transform and succeed in the digital age
            </motion.p>
          </div>

          <PortfolioSection showAll={false} />
        </div>
      </section>

      {/* Latest Insights (Blogs) */}
      {blogs.length > 0 && (
        <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Latest Insights</h2>
              <p className="text-gray-600 dark:text-gray-400">Updates from our team</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map(blog => (
                <Link to={`/blog/${blog.slug}`} key={blog.id} className="group block">
                  <div className="bg-gray-100 dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-48 bg-gray-200 dark:bg-slate-700">
                      {blog.cover_image && <img src={blog.cover_image} alt={blog.title} className="w-full h-full object-cover" />}
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{blog.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{blog.excerpt}</p>
                      <span className="text-xs text-blue-500 mt-4 block">Read more &rarr;</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden bg-white dark:bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800">
          {/* Animated shapes */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* ... animated bubbles ... */}
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 py-12">
            <div className="md:w-2/3 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Ready to Transform Your Digital Presence?
                </h2>
                <p className="text-xl text-blue-100">
                  Start your journey towards digital excellence today.
                </p>
              </motion.div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                >
                  Start Your Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
