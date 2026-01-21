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
  const [activeBlogIndex, setActiveBlogIndex] = useState(0);

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

      {/* Process Timeline Section */}
      <section className="py-24 bg-ios-surface/30 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-ios-text mb-4">
              How We Work
            </h2>
            <p className="text-ios-subtext text-lg max-w-2xl mx-auto">
              Our proven process ensures your project succeeds from concept to launch
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Discovery Call',
                  description: 'We discuss your vision, goals, and requirements to understand your needs.',
                  icon: '🎯'
                },
                {
                  step: '02',
                  title: 'Strategy & Planning',
                  description: 'We create a detailed roadmap with timelines, milestones, and deliverables.',
                  icon: '📋'
                },
                {
                  step: '03',
                  title: 'Development & Testing',
                  description: 'Our team builds your solution with regular updates and quality assurance.',
                  icon: '⚡'
                },
                {
                  step: '04',
                  title: 'Launch & Support',
                  description: 'We deploy your project and provide ongoing support and maintenance.',
                  icon: '🚀'
                }
              ].map((process, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6 relative group hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="text-6xl mb-4 opacity-10 font-bold text-ios-blue absolute top-4 right-4">
                    {process.step}
                  </div>
                  <div className="text-4xl mb-4">{process.icon}</div>
                  <h3 className="text-xl font-bold text-ios-text mb-3">
                    {process.title}
                  </h3>
                  <p className="text-ios-subtext text-sm leading-relaxed">
                    {process.description}
                  </p>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-ios-blue to-transparent"></div>
                  )}
                </motion.div>
              ))}
            </div>
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

          {/* Use PortfolioSection component which will be updated to carousel */}
          <PortfolioSection showAll={false} />
        </div>
      </section>

      {/* Latest Insights (Blogs) - Carousel */}
      {blogs.length > 0 && (
        <section className="py-24 bg-ios-bg overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-ios-text mb-4">Latest Insights</h2>
              <p className="text-ios-subtext text-lg">Updates from our team</p>
            </div>

            <div className="relative max-w-6xl mx-auto">
              {/* Carousel Container */}
              <div className="flex items-center justify-center gap-4">
                {/* Previous Button */}
                <button
                  onClick={() => setActiveBlogIndex((prev) => (prev === 0 ? blogs.length - 1 : prev - 1))}
                  className="p-3 rounded-full bg-ios-surface border border-ios-border hover:bg-ios-surface-2 transition-all z-10"
                  aria-label="Previous blog"
                >
                  <ChevronDownIcon className="w-6 h-6 text-ios-text rotate-90" />
                </button>

                {/* Carousel Items */}
                <div className="flex-1 relative h-[500px] flex items-center justify-center">
                  {blogs.map((blog, index) => {
                    const offset = index - activeBlogIndex;
                    const isActive = offset === 0;
                    const isVisible = Math.abs(offset) <= 1;

                    if (!isVisible) return null;

                    return (
                      <motion.div
                        key={blog.id}
                        initial={false}
                        animate={{
                          x: `${offset * 110}%`,
                          scale: isActive ? 1 : 0.8,
                          opacity: isActive ? 1 : 0.4,
                          filter: isActive ? 'blur(0px)' : 'blur(4px)',
                          zIndex: isActive ? 10 : 1,
                        }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="absolute w-full max-w-md"
                        onClick={() => !isActive && setActiveBlogIndex(index)}
                      >
                        <Link
                          to={`/blog/${blog.slug}`}
                          className={`group block ${!isActive ? 'pointer-events-none' : ''}`}
                        >
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
                      </motion.div>
                    );
                  })}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => setActiveBlogIndex((prev) => (prev === blogs.length - 1 ? 0 : prev + 1))}
                  className="p-3 rounded-full bg-ios-surface border border-ios-border hover:bg-ios-surface-2 transition-all z-10"
                  aria-label="Next blog"
                >
                  <ChevronDownIcon className="w-6 h-6 text-ios-text -rotate-90" />
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-8">
                {blogs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveBlogIndex(index)}
                    className={`h-2 rounded-full transition-all ${index === activeBlogIndex
                        ? 'w-8 bg-ios-blue'
                        : 'w-2 bg-ios-border hover:bg-ios-blue/50'
                      }`}
                    aria-label={`Go to blog ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-24 bg-ios-bg">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-ios-text mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-ios-subtext text-lg max-w-2xl mx-auto">
              Got questions? We've got answers
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: 'How long does a typical project take?',
                answer: 'Project timelines vary based on complexity. A simple website takes 2-4 weeks, while complex web applications can take 2-3 months. We provide detailed timelines during the planning phase.'
              },
              {
                question: 'What technologies do you use?',
                answer: 'We use modern, industry-standard technologies including React, TypeScript, Node.js, Python, and cloud platforms like AWS and Azure. We choose the best tech stack for your specific needs.'
              },
              {
                question: 'Do you offer support after launch?',
                answer: 'Yes! We provide ongoing support and maintenance packages. This includes bug fixes, updates, security patches, and feature enhancements to keep your solution running smoothly.'
              },
              {
                question: 'What is your pricing model?',
                answer: 'We offer flexible pricing based on project scope. Options include fixed-price projects, hourly rates, or monthly retainers. Contact us for a custom quote tailored to your needs.'
              },
              {
                question: 'Can you work with our existing systems?',
                answer: 'Absolutely! We specialize in integrating with existing systems, APIs, and databases. We ensure seamless compatibility and data migration when needed.'
              },
              {
                question: 'Do you provide training for our team?',
                answer: 'Yes, we offer comprehensive training and documentation for your team to effectively use and manage the solutions we build. Training can be conducted remotely or on-site.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <details className="glass-card p-6 group cursor-pointer">
                  <summary className="flex justify-between items-center font-semibold text-ios-text list-none">
                    <span className="text-lg">{faq.question}</span>
                    <ChevronDownIcon className="w-5 h-5 text-ios-blue transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 text-ios-subtext leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-ios-surface/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-12 text-center"
            >
              <div className="mb-6">
                <span className="text-4xl mb-4 block">📬</span>
                <h2 className="text-3xl md:text-4xl font-bold text-ios-text mb-4">
                  Stay Updated with Tech Insights
                </h2>
                <p className="text-ios-subtext text-lg max-w-2xl mx-auto">
                  Get weekly tips on AI, web development, and digital transformation delivered to your inbox
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = (e.target as HTMLFormElement).email.value;
                  // TODO: Integrate with your email service (EmailJS, Mailchimp, etc.)
                  alert(`Thanks for subscribing! We'll send updates to ${email}`);
                  (e.target as HTMLFormElement).reset();
                }}
                className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl bg-ios-surface/50 backdrop-blur-sm border border-ios-border text-ios-text placeholder:text-ios-subtext focus:outline-none focus:ring-2 focus:ring-ios-blue transition-all"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-ios-blue text-white font-semibold rounded-xl hover:bg-purple-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
                >
                  Subscribe
                </button>
              </form>

              <p className="text-ios-subtext text-sm mt-4">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
