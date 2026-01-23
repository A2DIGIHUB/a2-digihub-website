import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BeakerIcon,
  StarIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  LinkIcon,
  ChevronRightIcon,
  SparklesIcon,
  ChevronLeftIcon,
  DocumentArrowDownIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  HeartIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const stats = [
  { label: 'Years of Experience', value: '10', prefix: '', suffix: '+' },
  { label: 'Projects Completed', value: '500', prefix: '', suffix: '+' },
  { label: 'Happy Clients', value: '200', prefix: '', suffix: '+' },
  { label: 'Team Members', value: '50', prefix: '', suffix: '+' },
];

const teamMembers = [
  {
    name: 'Benjamin Pascal',
    role: 'Founder & CEO',
    image: '/team/benjamin-pascal.jpg',
    bio: 'Visionary leader driving digital innovation and transformation.',
    social: {
      linkedin: '#',
      twitter: '#',
    }
  },
  {
    name: 'Ani Charles',
    role: 'Co-founder',
    image: '/team/ani-charles.jpg',
    bio: 'Strategic innovator shaping the future of digital solutions.',
    social: {
      linkedin: '#',
      twitter: '#',
    }
  },
  {
    name: 'Blessing Abraham',
    role: 'Secretary',
    image: '/team/blessing-abraham.jpg',
    bio: 'Ensuring seamless operations and organizational excellence.',
    social: {
      linkedin: '#',
      twitter: '#',
    }
  },
  {
    name: 'Ekoh Nelson',
    role: 'Educational Head',
    image: '/team/ekoh-nelson.jpg',
    bio: 'Leading educational initiatives and knowledge development.',
    social: {
      linkedin: '#',
      twitter: '#',
    }
  },
  {
    name: 'Okon Precious',
    role: 'Marketing Specialist',
    image: '/team/okon-precious.jpg',
    bio: 'Crafting compelling narratives and driving market growth.',
    social: {
      linkedin: '#',
      twitter: '#',
    }
  },
  {
    name: 'KC',
    role: 'Lead Developer',
    image: '/team/kc.jpg',
    bio: 'Architecting robust solutions with cutting-edge technology.',
    social: {
      linkedin: '#',
      twitter: '#',
    }
  }
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
    description: 'Delivering the highest quality solutions that exceed expectations.',
  },
  {
    icon: <ShieldCheckIcon className="w-8 h-8" />,
    title: 'Integrity',
    description: 'Building trust through honest partnerships and transparent communication.',
  },
  {
    icon: <UserGroupIcon className="w-8 h-8" />,
    title: 'Collaboration',
    description: 'Working together to achieve greatness and foster innovation.',
  },
];

const journey = [
  {
    year: '2021',
    title: 'Company Founded',
    description: 'Started with a vision to transform digital landscape.'
  },
  {
    year: '2022',
    title: 'Global Expansion',
    description: 'Opened offices in major tech hubs worldwide.'
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

const TeamCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Background particles configuration
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
  }));

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45
    })
  };

  const containerVariants = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = teamMembers.length - 1;
      if (newIndex >= teamMembers.length) newIndex = 0;
      return newIndex;
    });
  };

  const member = teamMembers[currentIndex];

  return (
    <div className="relative overflow-hidden w-full max-w-4xl mx-auto py-12">
      {/* Background Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-white rounded-full opacity-30"
          animate={{
            x: [
              `${particle.initialX}%`,
              `${particle.initialX + (Math.random() * 20 - 10)}%`
            ],
            y: [
              `${particle.initialY}%`,
              `${particle.initialY + (Math.random() * 20 - 10)}%`
            ],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        />
      ))}

      {/* Navigation Buttons */}
      <motion.div
        className="absolute top-1/2 left-4 z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button
          onClick={() => paginate(-1)}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors duration-200 group"
        >
          <ChevronLeftIcon className="w-6 h-6 text-white group-hover:text-blue-200 transition-colors" />
        </button>
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-4 z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button
          onClick={() => paginate(1)}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors duration-200 group"
        >
          <ChevronRightIcon className="w-6 h-6 text-white group-hover:text-blue-200 transition-colors" />
        </button>
      </motion.div>

      {/* Main Carousel */}
      <div className="relative h-[500px] w-full perspective-1000">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
            rotateY: { duration: 0.6 },
            scale: { duration: 0.4 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute w-full h-full preserve-3d"
        >
          <motion.div
            className="w-full h-full flex items-center justify-center"
            variants={containerVariants}
            whileHover="hover"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full shadow-xl"
              animate={{
                boxShadow: isHovered
                  ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                  : "0 10px 15px -3px rgba(0, 0, 0, 0.3)"
              }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <motion.div
                  className="relative w-48 h-48 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-indigo-500"
                  variants={imageVariants}
                  whileHover="hover"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: [-200, 200],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 0.5
                    }}
                  />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=3b82f6&color=fff&size=200`;
                    }}
                  />
                </motion.div>
                <motion.div
                  className="flex-1 text-center md:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.h3
                    className="text-2xl font-bold text-white mb-2"
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {member.name}
                  </motion.h3>
                  <motion.p
                    className="text-blue-200 font-medium mb-4"
                    animate={{ x: isHovered ? 10 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {member.role}
                  </motion.p>
                  <motion.p
                    className="text-blue-100 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {member.bio}
                  </motion.p>
                  <motion.div
                    className="flex items-center justify-center md:justify-start space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {Object.entries(member.social).map(([platform, url], index) => (
                      <motion.a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-200 hover:text-white transition-colors duration-200"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <LinkIcon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center space-x-3 mt-8">
        {teamMembers.map((_, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => {
              const direction = index > currentIndex ? 1 : -1;
              setDirection(direction);
              setCurrentIndex(index);
            }}
            className="group relative"
          >
            <motion.div
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${index === currentIndex ? 'bg-white' : 'bg-white/30'
                }`}
              whileHover={{ scale: 1.2 }}
              animate={index === currentIndex ? {
                scale: [1, 1.2, 1],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                }
              } : {}}
            />
            <motion.div
              className="absolute -inset-2 bg-white rounded-full opacity-20"
              initial={{ scale: 0 }}
              animate={index === currentIndex ? {
                scale: [0, 1.5, 0],
                opacity: [0, 0.2, 0],
              } : {}}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white overflow-hidden">
        {/* Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-grid-pattern" />
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 py-24 md:py-32">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Subtitle */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center space-x-2"
                >
                  <SparklesIcon className="w-5 h-5 text-blue-200" />
                  <span className="text-blue-200 font-medium">Welcome to Our Story</span>
                </motion.div>

                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  About OKIKE
                </h1>

                {/* Description */}
                <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                  We are a leading digital innovation company, transforming businesses through cutting-edge technology solutions.
                </p>

                {/* Secondary Description */}
                <p className="text-blue-200 text-lg leading-relaxed">
                  Since 2021, we've been at the forefront of digital transformation, helping businesses adapt and thrive in the digital age.
                </p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <button className="mt-8 px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold flex items-center space-x-2 hover:bg-purple-50 transition-colors duration-200">
                    <span>Learn More</span>
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </motion.div>
              </motion.div>

              {/* Right Column - Floating Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative hidden md:block"
              >
                <div className="relative w-full h-[500px]">
                  {/* Floating Cards */}
                  <motion.div
                    animate={{
                      y: [0, -20, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-0 right-0 w-64 h-64 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
                  >
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl mb-4" />
                    <div className="space-y-2">
                      <div className="w-3/4 h-4 bg-white/20 rounded" />
                      <div className="w-1/2 h-4 bg-white/20 rounded" />
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{
                      y: [0, 20, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                    className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
                  >
                    <div className="w-12 h-12 bg-indigo-500/20 rounded-xl mb-4" />
                    <div className="space-y-2">
                      <div className="w-3/4 h-4 bg-white/20 rounded" />
                      <div className="w-1/2 h-4 bg-white/20 rounded" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24 bg-ios-bg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-8 bg-ios-surface rounded-2xl border border-ios-border"
              >
                <motion.div
                  className="text-4xl font-bold text-ios-blue mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.1 + index * 0.1
                  }}
                >
                  {stat.prefix}{stat.value}{stat.suffix}
                </motion.div>
                <div className="text-ios-subtext font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-24 bg-ios-surface/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card p-10"
            >
              <h2 className="text-3xl font-bold mb-6 text-ios-blue">Our Mission</h2>
              <p className="text-ios-subtext text-lg leading-relaxed">
                To empower businesses with innovative digital solutions that drive growth and success in the modern world.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card p-10"
            >
              <h2 className="text-3xl font-bold mb-6 text-ios-blue">Our Vision</h2>
              <p className="text-ios-subtext text-lg leading-relaxed">
                To be the global leader in digital transformation, setting new standards for innovation and excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Journey Section */}
      <div className="py-24 bg-ios-bg">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-20 text-ios-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Journey
          </motion.h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-ios-border" />

            {/* Journey items */}
            <div className="space-y-24">
              {journey.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'
                    }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                    <div className="glass-card p-8 group hover:-translate-y-1 transition-transform">
                      <div className="text-ios-blue font-bold text-2xl mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold mb-3 text-ios-text">{item.title}</h3>
                      <p className="text-ios-subtext leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-ios-blue rounded-full ring-4 ring-ios-bg" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-24 bg-gradient-to-br from-purple-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white mb-6"
            >
              Meet Our Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-blue-100 max-w-2xl mx-auto"
            >
              The passionate individuals driving innovation and excellence at OKIKE
            </motion.p>
          </div>
          <TeamCarousel />
        </div>
      </div>

      {/* Values Section */}
      <div className="py-24 bg-ios-bg">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl font-bold mb-6 text-ios-text">Our Core Values</h2>
            <p className="text-xl text-ios-subtext">
              The principles that guide our mission and shape our commitment to excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 text-ios-blue bg-purple-500/10 rounded-2xl flex items-center justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-center text-ios-text">{value.title}</h3>
                <p className="text-ios-subtext text-center leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="py-24 bg-ios-surface/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-ios-text mb-6">
                Download Our Company Information
              </h2>
              <p className="text-xl text-ios-subtext mb-12 max-w-3xl mx-auto">
                Learn more about our policies, values, and commitment to excellence. Download our comprehensive documents.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {/* Company Profile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass-card p-10 group"
              >
                <div className="space-y-6">
                  <div className="w-20 h-20 bg-purple-500/10 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 border border-purple-500/20">
                    <DocumentArrowDownIcon className="w-10 h-10 text-ios-blue" />
                  </div>
                  <h3 className="text-2xl font-bold text-ios-text">Company Profile</h3>
                  <p className="text-ios-subtext leading-relaxed">
                    Get detailed information about our company structure, mission, and achievements.
                  </p>
                  <motion.a
                    href="/company-profile.pdf"
                    download
                    className="inline-flex items-center justify-center px-8 py-4 bg-ios-blue text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200 w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Download Profile
                  </motion.a>
                </div>
              </motion.div>

              {/* Company Policy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="glass-card p-10 group"
              >
                <div className="space-y-6">
                  <div className="w-20 h-20 bg-indigo-500/10 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 border border-indigo-500/20">
                    <DocumentArrowDownIcon className="w-10 h-10 text-indigo-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-ios-text">Company Policy</h3>
                  <p className="text-ios-subtext leading-relaxed">
                    Review our company policies, privacy guidelines, and data protection measures.
                  </p>
                  <motion.a
                    href="/company-policy.pdf"
                    download
                    className="inline-flex items-center justify-center px-8 py-4 bg-indigo-500 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200 w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Download Policy
                  </motion.a>
                </div>
              </motion.div>

              {/* Constitution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="glass-card p-10 group"
              >
                <div className="space-y-6">
                  <div className="w-20 h-20 bg-purple-500/10 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 border border-purple-500/20">
                    <DocumentArrowDownIcon className="w-10 h-10 text-purple-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-ios-text">Constitution</h3>
                  <p className="text-ios-subtext leading-relaxed">
                    Read our organization's constitution and governing principles.
                  </p>
                  <motion.a
                    href="/constitution.pdf"
                    download
                    className="inline-flex items-center justify-center px-8 py-4 bg-purple-500 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200 w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Download Constitution
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="py-24 bg-ios-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto glass-card overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10" />
            <div className="relative p-12 text-center">
              <h2 className="text-3xl font-bold mb-6 text-ios-text">Have Questions?</h2>
              <p className="text-xl text-ios-subtext mb-8">
                Our team is here to help you understand how we can support your business growth.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-ios-blue text-white rounded-xl font-medium hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
                >
                  <EnvelopeIcon className="w-5 h-5 mr-2" />
                  Contact Us
                </Link>
                <a
                  href="tel:+1234567890"
                  className="inline-flex items-center px-8 py-4 bg-ios-surface text-ios-text border border-ios-border rounded-xl font-medium hover:bg-ios-surface-2 transition-all"
                >
                  <PhoneIcon className="w-5 h-5 mr-2" />
                  Schedule a Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
