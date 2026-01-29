import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BeakerIcon,
  StarIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ChevronRightIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  SparklesIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import Footer from '../components/Footer';

const stats = [
  { label: 'Years of Experience', value: '10', prefix: '', suffix: '+' },
  { label: 'Projects Completed', value: '500', prefix: '', suffix: '+' },
  { label: 'Happy Clients', value: '200', prefix: '', suffix: '+' },
  { label: 'Team Members', value: '50', prefix: '', suffix: '+' },
];

const values = [
  {
    icon: <BeakerIcon className="w-8 h-8" />,
    title: 'Innovation',
    description: 'Pushing boundaries and embracing new technologies to create cutting-edge solutions.',
  },
  {
    icon: <StarIcon className="w-8 h-8" />,
    title: 'Excellence',
    description: 'Committed to delivering the highest quality in everything we do.',
  },
  {
    icon: <ShieldCheckIcon className="w-8 h-8" />,
    title: 'Integrity',
    description: 'Building trust through transparency and ethical practices.',
  },
  {
    icon: <UserGroupIcon className="w-8 h-8" />,
    title: 'Collaboration',
    description: 'Working together to achieve extraordinary results.',
  },
];

const journey = [
  {
    year: '2021',
    title: 'Foundation',
    description: 'OKIKE was founded with a vision to transform digital experiences.'
  },
  {
    year: '2022',
    title: 'Growth',
    description: 'Expanded our team and launched innovative solutions.'
  },
  {
    year: '2023',
    title: 'Innovation Hub',
    description: 'Launched our first innovation lab.'
  },
  {
    year: '2024',
    title: 'Digital Leadership',
    description: 'Recognized as industry leader in digital transformation.'
  }
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section - Split Design (KEEPING AS IS) */}
      <section className="relative bg-white dark:bg-gray-950 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px] py-20">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-950/30 rounded-full">
                <SparklesIcon className="w-4 h-4 text-orange-600 dark:text-orange-500" />
                <span className="text-sm font-semibold text-orange-600 dark:text-orange-500">About Us</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 dark:text-white">
                Building the <span className="text-orange-600 dark:text-orange-500">future</span> of digital innovation
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                We're a team of passionate innovators, designers, and developers committed to transforming businesses through cutting-edge technology solutions.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Get Started
                </Link>
                <Link
                  to="/portfolio"
                  className="px-8 py-4 border-2 border-gray-300 dark:border-gray-700 hover:border-orange-600 dark:hover:border-orange-500 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  View Our Work
                </Link>
              </div>
            </motion.div>

            {/* Right Column - Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
                >
                  <div className="text-4xl md:text-5xl font-bold text-orange-600 dark:text-orange-500 mb-2">
                    {stat.prefix}{stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section - Asymmetric Layout */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 items-center max-w-7xl mx-auto">
            {/* Left - Large Quote/Story */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 space-y-6"
            >
              <div className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-full mb-4">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Our Story</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Transforming ideas into <span className="text-orange-600 dark:text-orange-500">digital reality</span> since 2021
              </h2>

              <div className="space-y-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  What started as a small team of passionate technologists has evolved into a leading digital innovation company. We've helped over 200 businesses across the globe transform their digital presence and achieve remarkable growth.
                </p>
                <p>
                  Our journey is defined by continuous learning, adaptation, and an unwavering commitment to our clients' success. Every project we undertake is an opportunity to push boundaries and set new standards in digital excellence.
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white dark:border-gray-950"></div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">50+ Team Members</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Experts in their fields</p>
                </div>
              </div>
            </motion.div>

            {/* Right - Trusted Partners & Recognition */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Trusted by Industry Leaders</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-20 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer">
                      <span className="text-gray-400 font-bold text-xl">Client {i}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/10 rounded-3xl p-8 border border-orange-100 dark:border-orange-500/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-500/20 rounded-full flex items-center justify-center">
                    <StarIcon className="w-6 h-6 text-orange-600 dark:text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Award Winning</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Recognized for Excellence</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  "OKIKE has consistently delivered outstanding results, setting new benchmarks for digital innovation in the region."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Overlapping Cards */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-200 dark:bg-orange-900/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100 dark:bg-orange-900/10 rounded-full blur-3xl opacity-50"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Mission - Larger, Prominent */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:mt-12"
              >
                <div className="bg-white dark:bg-gray-950 rounded-3xl p-10 shadow-xl border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-shadow">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <RocketLaunchIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-orange-600 dark:text-orange-500 mb-2">What Drives Us</div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
                    </div>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    To empower businesses with innovative digital solutions that drive measurable growth, enhance operational efficiency, and create lasting value in an ever-evolving digital landscape.
                  </p>
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-orange-600 dark:text-orange-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Client-first approach</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Vision - Offset */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:-mt-12"
              >
                <div className="bg-white dark:bg-gray-950 rounded-3xl p-10 shadow-xl border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-shadow">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <LightBulbIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-orange-600 dark:text-orange-500 mb-2">Where We're Going</div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Vision</h2>
                    </div>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    To be the global leader in digital transformation, recognized for setting new standards in innovation, excellence, and client success across all industries we serve.
                  </p>
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-orange-600 dark:text-orange-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Innovation-driven culture</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Bento Grid with Hover Effects */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-block px-4 py-2 bg-orange-50 dark:bg-orange-950/30 rounded-full mb-4">
                <span className="text-sm font-semibold text-orange-600 dark:text-orange-500">What We Believe In</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Our Core Values</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">The principles that guide every decision we make</p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white dark:bg-gray-950 border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-8 group-hover:border-transparent transition-all duration-300 h-full">
                  <div className="w-16 h-16 bg-orange-50 dark:bg-orange-950/30 rounded-xl flex items-center justify-center mb-6 text-orange-600 dark:text-orange-500 group-hover:bg-white/20 group-hover:text-white transition-all">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-white transition-colors">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-white/90 transition-colors">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline - Vertical with Connecting Line */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-block px-4 py-2 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-full mb-4">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">The Road So Far</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Our Journey</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">Key milestones that shaped OKIKE</p>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-orange-400 to-orange-300 hidden md:block"></div>

            <div className="space-y-12">
              {journey.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex gap-8 items-start"
                >
                  {/* Year Badge */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg z-10">
                    {item.year.slice(2)}
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover:border-orange-500 dark:hover:border-orange-500 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-sm text-orange-600 dark:text-orange-500 font-semibold mb-1">{item.year}</div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                      </div>
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Founder - Clean Minimal */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Image Side - Simple & Clean */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                <img
                  src="/team/benjamin-pascal.jpg"
                  alt="Benjamin Pascal"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Crect fill="%23f3f4f6" width="400" height="500"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="64" font-weight="bold" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EBP%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              {/* Clean Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 hidden md:block">
                <p className="text-sm font-semibold text-orange-600 dark:text-orange-500 mb-1">FOUNDER & CEO</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">Benjamin Pascal</p>
              </div>
            </motion.div>

            {/* Content Side */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-950/30 rounded-full mb-6">
                  <SparklesIcon className="w-4 h-4 text-orange-600 dark:text-orange-500" />
                  <span className="text-sm font-bold text-orange-600 dark:text-orange-500">The Visionary</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  Meet the <span className="text-orange-600 dark:text-orange-500">Mind</span>
                </h2>
              </div>

              <blockquote className="text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-300 leading-relaxed italic border-l-4 border-orange-500 pl-6">
                "Innovation isn't just about technology; it's about solving real human problems. At OKIKE, we create digital legacies."
              </blockquote>

              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  As a visionary leader in digital transformation, Benjamin drives the strategic direction of OKIKE. His passion lies in bridging the gap between complex technology and intuitive user experiences, fostering a culture of continuous innovation.
                </p>
              </div>

              <div className="pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700 transition-colors"
                >
                  Connect on LinkedIn <span className="text-xl">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Clean & Minimal (Matching Home) */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to create something extraordinary?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              Join the 200+ businesses that have chosen OKIKE to transform their digital presence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors duration-200 shadow-sm"
              >
                Start Your Project
              </Link>
              <Link
                to="/portfolio"
                className="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-orange-600 dark:hover:border-orange-500 text-gray-900 dark:text-white font-bold rounded-lg transition-colors duration-200"
              >
                Explore Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
