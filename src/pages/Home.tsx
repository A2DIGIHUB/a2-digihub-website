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
    <div className="min-h-screen bg-ios-bg text-ios-text">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-900 min-h-[90vh]">
        {/* Animated background elements - retained as they look good */}
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
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 flex min-h-[90vh] items-center py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
            {/* Left column - Text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8 text-center lg:text-left"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="inline-block"
                >
                  <span className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg text-sm font-medium tracking-wide">
                    Welcome to {settings.site_name}
                  </span>
                </motion.div>
                <GradientText
                  text="Transforming Ideas into Digital Reality"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight"
                  gradient="from-white via-purple-100 to-indigo-200"
                />
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-base sm:text-lg md:text-xl text-purple-100/90 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                >
                  {settings.description || "Empowering businesses with cutting-edge digital solutions for the modern technological landscape."}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/contact"
                  className="group relative px-8 py-4 bg-white text-purple-900 rounded-full font-bold text-lg text-center overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.5)] shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                >
                  Get Started
                </Link>
                <Link
                  to="/services"
                  className="group px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-bold text-lg text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/10 backdrop-blur-md"
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
                    className="absolute inset-0 border border-white/10 rounded-full"
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
                  className="absolute inset-0 m-auto w-64 h-64 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Floating icons with glass effect */}
                {[
                  { icon: <RocketLaunchIcon className="w-10 h-10" />, position: "top-[20%] left-[20%]" },
                  { icon: <CpuChipIcon className="w-10 h-10" />, position: "top-[20%] right-[20%]" },
                  { icon: <CloudIcon className="w-10 h-10" />, position: "bottom-[20%] left-[20%]" },
                  { icon: <LightBulbIcon className="w-10 h-10" />, position: "bottom-[20%] right-[20%]" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`absolute ${item.position} w-20 h-20 glass-panel rounded-2xl flex items-center justify-center text-white p-4`}
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 5, -5, 0],
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


      </section>

      {/* Features Section */}
      <section className="py-24 bg-ios-bg">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <GradientText
              text="Cutting-Edge Features"
              className="text-4xl md:text-5xl font-bold mb-4"
            />
            <p className="text-ios-subtext text-lg max-w-2xl mx-auto">
              Discover how our innovative solutions can transform your business with
              state-of-the-art technology and expert implementation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <RocketLaunchIcon className="w-8 h-8" />,
                title: 'Rapid Development',
                description: 'Quick turnaround times with our agile development methodology.'
              },
              {
                icon: <CpuChipIcon className="w-8 h-8" />,
                title: 'Advanced Technology',
                description: 'Utilizing cutting-edge tech stack for optimal performance.'
              },
              {
                icon: <CloudIcon className="w-8 h-8" />,
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
                className="glass-card p-8 group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500 group-hover:text-white transition-colors text-purple-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-ios-text mb-3">
                  {feature.title}
                </h3>
                <p className="text-ios-subtext leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-24 bg-ios-surface/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-ios-text mb-4"
            >
              Our Featured Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-ios-subtext"
            >
              Discover how we've helped businesses transform and succeed in the digital age
            </motion.p>
          </div>

          <PortfolioSection showAll={false} />
        </div>
      </section>

      {/* Latest Insights (Blogs) */}
      {blogs.length > 0 && (
        <section className="py-24 bg-ios-bg">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-ios-text mb-4">Latest Insights</h2>
              <p className="text-ios-subtext text-lg">Updates from our team</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map(blog => (
                <Link to={`/blog/${blog.slug}`} key={blog.id} className="group block">
                  <div className="glass-card overflow-hidden h-full flex flex-col">
                    <div className="h-56 bg-ios-surface-2 relative overflow-hidden">
                      {blog.cover_image && (
                        <img
                          src={blog.cover_image}
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )}
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="font-bold text-xl mb-3 text-ios-text group-hover:text-ios-blue transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-ios-subtext line-clamp-3 mb-6 flex-grow">
                        {blog.excerpt}
                      </p>
                      <span className="text-sm font-semibold text-ios-blue flex items-center mt-auto">
                        Read more <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-700 to-purple-800"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 md:p-20 border border-white/20 shadow-2xl text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                Ready to Transform Your Digital Presence?
              </h2>
              <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-10">
                Start your journey towards digital excellence today with our expert team.
              </p>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-purple-600 px-10 py-5 rounded-full text-lg font-bold hover:bg-purple-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                Start Your Project
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
