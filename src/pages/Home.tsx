import React, { useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDownIcon,
  RocketLaunchIcon,
  CpuChipIcon,
  CloudIcon,
  LightBulbIcon,
  UserGroupIcon,
  ChartBarIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChatBubbleBottomCenterTextIcon,
  NewspaperIcon,
  CodeBracketIcon,
  QuestionMarkCircleIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import FloatingElement from '../components/graphics/FloatingElement';
import GradientText from '../components/graphics/GradientText';
import Footer from '../components/Footer';
import PortfolioSection from '../components/sections/PortfolioSection';

const TestimonialCard3D = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      
      <div className="flex items-center gap-4 mb-6 p-8">
        <div className="relative">
          <img
            src={testimonial.image}
            alt={testimonial.author}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-100"
            loading="lazy"
          />
          <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            {testimonial.rating}/5
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-lg text-gray-900">{testimonial.author}</h4>
          <p className="text-gray-600">{testimonial.position}</p>
          <p className="text-gray-600">{testimonial.company.name}</p>
        </div>
      </div>
      
      <blockquote className="text-gray-700 text-lg mb-6 p-8">
        "{testimonial.quote}"
      </blockquote>
      
      <div className="flex flex-wrap gap-2 p-8">
        {testimonial.tags.map(tag => (
          <span
            key={tag}
            className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Home: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const testimonials = [
    {
      quote: "A2-DIGIHUB transformed our digital presence with innovative solutions.",
      author: "Sarah Johnson",
      position: "CEO at TechCorp",
      image: "/images/testimonial1.jpg"
    },
    {
      quote: "Their expertise in AI and cloud solutions gave us a competitive edge.",
      author: "Michael Chen",
      position: "CTO at InnovateTech",
      image: "/images/testimonial2.jpg"
    },
    {
      quote: "Outstanding service and exceptional results. Highly recommended.",
      author: "Emily Rodriguez",
      position: "COO at FutureTech",
      image: "/images/testimonial3.jpg"
    }
  ];

  const blogPosts = [
    {
      title: "The Future of AI in Business",
      excerpt: "Discover how artificial intelligence is reshaping the business landscape...",
      date: "2024-02-15",
      image: "/images/blog1.jpg"
    },
    {
      title: "Cloud Migration Strategies",
      excerpt: "Learn the best practices for seamless cloud migration...",
      date: "2024-02-10",
      image: "/images/blog2.jpg"
    },
    {
      title: "Digital Transformation Success Stories",
      excerpt: "Real-world examples of successful digital transformation...",
      date: "2024-02-05",
      image: "/images/blog3.jpg"
    }
  ];

  const techStack = [
    { name: "React", icon: "/images/tech/react.svg" },
    { name: "Node.js", icon: "/images/tech/nodejs.svg" },
    { name: "Python", icon: "/images/tech/python.svg" },
    { name: "AWS", icon: "/images/tech/aws.svg" },
    { name: "Docker", icon: "/images/tech/docker.svg" },
    { name: "Kubernetes", icon: "/images/tech/kubernetes.svg" }
  ];

  const faqs = [
    {
      category: "Services",
      items: [
        {
          question: "What digital transformation services do you offer?",
          answer: "We provide comprehensive digital solutions including AI integration, cloud architecture, custom software development, and digital strategy consulting. Our services are tailored to transform your business operations and enhance digital capabilities.",
          icon: "💡"
        },
        {
          question: "How do you ensure project success?",
          answer: "We follow an agile methodology with regular client communication, detailed project tracking, and quality assurance at every stage. Our experienced team ensures timely delivery while maintaining the highest standards.",
          icon: "✨"
        }
      ]
    },
    {
      category: "Technology",
      items: [
        {
          question: "What technologies do you specialize in?",
          answer: "We specialize in cutting-edge technologies including AI/ML, cloud computing (AWS, Azure, GCP), blockchain, and modern web/mobile development frameworks. We stay updated with the latest tech trends to deliver innovative solutions.",
          icon: "🚀"
        },
        {
          question: "How do you handle data security?",
          answer: "Security is our top priority. We implement industry-standard encryption, regular security audits, and compliance with data protection regulations. Our solutions are built with security-first architecture.",
          icon: "🔒"
        }
      ]
    },
    {
      category: "Process",
      items: [
        {
          question: "What is your development process?",
          answer: "Our process includes discovery, planning, agile development, testing, and deployment phases. We maintain transparent communication and provide regular updates throughout the project lifecycle.",
          icon: "⚡"
        },
        {
          question: "How long does a typical project take?",
          answer: "Project timelines vary based on complexity and requirements. We provide detailed project schedules during the planning phase and ensure efficient delivery through our agile methodology.",
          icon: "⏱️"
        }
      ]
    }
  ];

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
                    Welcome to A2-DIGIHUB
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
                  Empowering businesses with cutting-edge digital solutions for the modern technological landscape.
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

              {/* Tech stack preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="pt-6 sm:pt-8 border-t border-white/10"
              >
                <p className="text-xs sm:text-sm text-blue-200/80 mb-3 sm:mb-4">Trusted Technologies</p>
                <div className="flex flex-wrap gap-4 sm:gap-6 items-center">
                  {techStack.slice(0, 4).map((tech, index) => (
                    <motion.img
                      key={tech.name}
                      src={tech.icon}
                      alt={tech.name}
                      className="w-8 h-8 sm:w-10 sm:h-10 object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 0.7, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    />
                  ))}
                </div>
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
      <section className="py-12 sm:py-20 bg-gray-50">
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
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
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
                className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="inline-block"
                >
                  <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 text-sm font-medium">
                    Why Choose A2-DIGIHUB
                  </span>
                </motion.div>
                <GradientText
                  text="Transforming Ideas into Digital Reality"
                  className="text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
                />
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-lg sm:text-xl text-gray-600 max-w-xl"
                >
                  Empowering businesses with cutting-edge digital solutions for the modern technological landscape.
                </motion.p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: <LightBulbIcon className="w-6 h-6" />,
                    title: 'Innovative Solutions',
                    description: "We create custom solutions that push the boundaries of what's possible."
                  },
                  {
                    icon: <UserGroupIcon className="w-6 h-6" />,
                    title: 'Expert Team',
                    description: 'Our team of seasoned professionals brings years of industry experience.'
                  },
                  {
                    icon: <ChartBarIcon className="w-6 h-6" />,
                    title: 'Proven Results',
                    description: 'Track record of delivering successful projects across various industries.'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="text-blue-600 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/why-choose-us.jpg"
                  alt="Team collaborating on digital solutions"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-8 rounded-2xl shadow-xl">
                <p className="text-3xl font-bold mb-2">95%</p>
                <p className="text-sm">Client satisfaction rate</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '75+', label: 'Projects Completed' },
              { number: '50+', label: 'Happy Clients' },
              { number: '95%', label: 'Success Rate' },
              { number: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</p>
                <p className="text-blue-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800">
          {/* Animated shapes */}
          <motion.div 
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div 
              className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full mix-blend-overlay filter blur-xl"
              animate={{ 
                y: [0, 50, 0],
                x: [0, 30, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full mix-blend-overlay filter blur-xl"
              animate={{ 
                y: [0, -50, 0],
                x: [0, -30, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 py-12">
            {/* Left side - Content */}
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
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                  >
                    Start Your Project
                    <motion.svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      initial={{ x: 0 }}
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </motion.svg>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Link
                    to="/services"
                    className="group inline-flex items-center gap-2 bg-blue-700/30 text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-700/40 transition-all backdrop-blur-sm border border-white/10"
                  >
                    Explore Services
                    <motion.svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      initial={{ x: 0 }}
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </motion.svg>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Right side - Animated 3D Element */}
            <motion.div
              className="md:w-1/3"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative aspect-square">
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
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Our Featured Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600"
            >
              Discover how we've helped businesses transform and succeed in the digital age
            </motion.p>
          </div>
          
          <PortfolioSection />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left side - Header */}
            <div className="md:w-1/3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-blue-600 font-semibold">TESTIMONIALS</span>
                <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
                  What Our Clients Say
                </h2>
                <p className="text-gray-600">
                  Trusted by industry leaders to deliver exceptional digital solutions
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-blue-600 font-medium mt-6 group"
                >
                  Start Your Project
                  <svg 
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 8l4 4m0 0l-4 4m4-4H3" 
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>

            {/* Right side - Testimonial Cards */}
            <div className="md:w-2/3">
              <div className="relative">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-2xl -rotate-1" />
                
                {/* Cards container */}
                <div className="relative grid gap-4 p-4">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.author}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-50"
                      />
                      <div className="flex-1 min-w-0">
                        <blockquote className="text-gray-700 text-sm mb-1">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 text-sm">{testimonial.author}</span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                          <span className="text-gray-500 text-sm truncate">{testimonial.position}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <GradientText
              text="Latest Insights"
              className="text-3xl md:text-4xl font-bold mb-4"
            />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay updated with our latest thoughts on technology and digital transformation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <p className="text-gray-500 text-sm mb-2">{new Date(post.date).toLocaleDateString()}</p>
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link
                    to="/blog"
                    className="text-blue-600 font-medium hover:text-blue-700 flex items-center"
                  >
                    Read More
                    <ChevronRightIcon className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <GradientText
              text="Technologies We Use"
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
            />
            <p className="text-gray-600 max-w-2xl mx-auto">
              We leverage cutting-edge technologies to build robust and scalable solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-12 h-12 mb-2"
                  loading="lazy"
                />
                <p className="text-sm font-medium text-gray-700">{tech.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
          <div 
            className="absolute -left-48 -top-48 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
            style={{ animationDelay: '0s' }}
          />
          <div 
            className="absolute -right-48 -bottom-48 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
            style={{ animationDelay: '2s' }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 relative">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-600 font-semibold">FAQ</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our services and process
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            className="max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full px-6 py-4 bg-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow pl-12"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </motion.div>

          {/* FAQ Categories */}
          <div className="grid md:grid-cols-3 gap-8">
            {faqs.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.items.map((faq, faqIndex) => (
                    <motion.div
                      key={faqIndex}
                      className="relative"
                      initial={false}
                    >
                      <button
                        onClick={() => setActiveFaq(activeFaq === categoryIndex * 10 + faqIndex ? null : categoryIndex * 10 + faqIndex)}
                        className="w-full text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{faq.icon}</span>
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                            {faq.question}
                          </h4>
                        </div>
                        <motion.div
                          initial={false}
                          animate={{ height: activeFaq === categoryIndex * 10 + faqIndex ? "auto" : 0 }}
                          className="overflow-hidden"
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <p className="text-gray-600 mt-3 pl-9">
                            {faq.answer}
                          </p>
                        </motion.div>
                        <div 
                          className={`absolute right-0 top-1 w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
                            activeFaq === categoryIndex * 10 + faqIndex ? "transform rotate-180" : ""
                          }`}
                        >
                          <svg
                            className="w-4 h-4 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-gray-600 mb-4">
              Can't find what you're looking for?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              Contact our team
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <GradientText
                text="Ready to Transform Your Business?"
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6"
                gradient="from-white to-gray-200"
              />
              <p className="text-white/90 text-lg mb-8">
                Let's work together to bring your digital vision to life.
              </p>
              <Link
                to="/contact"
                className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-all"
              >
                Get Started Today
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
