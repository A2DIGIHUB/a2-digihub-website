import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RocketLaunchIcon,
  CodeBracketIcon,
  CloudArrowUpIcon,
  CpuChipIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  CursorArrowRaysIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';
import Footer from '../components/Footer';
import ProjectBuilder from '../components/ProjectBuilder';

const services = [
  {
    id: 1,
    title: 'Digital Transformation',
    category: 'consulting',
    description: 'End-to-end digital transformation solutions for your business',
    features: [
      'Business Process Analysis',
      'Technology Stack Assessment',
      'Digital Strategy Development',
      'Implementation Roadmap',
    ],
    icon: RocketLaunchIcon,
    color: 'blue',
  },
  {
    id: 2,
    title: 'Custom Software Development',
    category: 'development',
    description: 'Tailored software solutions to meet your specific needs',
    features: [
      'Web Applications',
      'Mobile Apps',
      'Enterprise Software',
      'API Integration',
    ],
    icon: CodeBracketIcon,
    color: 'indigo',
  },
  {
    id: 3,
    title: 'Cloud Solutions',
    category: 'cloud',
    description: 'Comprehensive cloud services and migration solutions',
    features: [
      'Cloud Migration',
      'Cloud Architecture',
      'DevOps Services',
      'Cloud Security',
    ],
    icon: CloudArrowUpIcon,
    color: 'blue',
  },
  {
    id: 4,
    title: 'AI & Machine Learning',
    category: 'ai',
    description: 'Intelligent solutions powered by AI and ML',
    features: [
      'Predictive Analytics',
      'Natural Language Processing',
      'Computer Vision',
      'Machine Learning Models',
    ],
    icon: CpuChipIcon,
    color: 'indigo',
  },
  {
    id: 5,
    title: 'Data Analytics',
    category: 'ai',
    description: 'Transform your data into actionable insights',
    features: [
      'Business Intelligence',
      'Data Visualization',
      'Real-time Analytics',
      'Performance Metrics',
    ],
    icon: ChartBarIcon,
    color: 'blue',
  },
  {
    id: 6,
    title: 'Cybersecurity',
    category: 'cloud',
    description: 'Protect your digital assets with advanced security solutions',
    features: [
      'Security Audits',
      'Threat Detection',
      'Compliance Management',
      'Security Training',
    ],
    icon: ShieldCheckIcon,
    color: 'indigo',
  },
  {
    id: 7,
    title: 'UI/UX Design',
    category: 'development',
    description: 'Create exceptional user experiences',
    features: [
      'User Research',
      'Interface Design',
      'Prototyping',
      'Usability Testing',
    ],
    icon: CursorArrowRaysIcon,
    color: 'blue',
  },
  {
    id: 8,
    title: 'IT Consulting',
    category: 'consulting',
    description: 'Strategic technology consulting for business growth',
    features: [
      'IT Strategy',
      'System Architecture',
      'Technology Selection',
      'Project Management',
    ],
    icon: WrenchScrewdriverIcon,
    color: 'indigo',
  },
];

const categories = [
  { id: 'all', name: 'All Services' },
  { id: 'consulting', name: 'Consulting' },
  { id: 'development', name: 'Development' },
  { id: 'cloud', name: 'Cloud' },
  { id: 'ai', name: 'AI & ML' },
];

const processSteps = [
  {
    title: 'Discovery',
    description: 'Understanding your business needs and objectives',
    icon: '🔍',
  },
  {
    title: 'Planning',
    description: 'Developing a comprehensive solution strategy',
    icon: '📋',
  },
  {
    title: 'Development',
    description: 'Building and implementing the solution',
    icon: '⚙️',
  },
  {
    title: 'Testing',
    description: 'Ensuring quality and performance',
    icon: '✓',
  },
  {
    title: 'Deployment',
    description: 'Launching your solution',
    icon: '🚀',
  },
  {
    title: 'Support',
    description: 'Ongoing maintenance and optimization',
    icon: '🛠️',
  },
];

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const filteredServices = services.filter(
    (service) => selectedCategory === 'all' || service.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-ios-bg text-ios-text">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900 mix-blend-multiply opacity-90" />
          <div className="absolute inset-0" style={{ backgroundImage: "url('/grid.svg')", opacity: 0.1 }} />
        </div>
        <div className="relative z-10">
          <div className="container mx-auto px-4 py-24 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
                Our Services
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto">
                Comprehensive digital solutions to transform your business and drive growth
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-0 z-20 glass-panel backdrop-blur-xl border-b border-ios-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${selectedCategory === category.id
                  ? 'bg-ios-blue text-white shadow-lg shadow-blue-500/30'
                  : 'bg-ios-surface hover:bg-ios-surface-2 text-ios-subtext hover:text-ios-text border border-ios-border'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-24 bg-ios-bg">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onHoverStart={() => setHoveredService(service.id)}
                  onHoverEnd={() => setHoveredService(null)}
                  className={`glass-card p-8 group cursor-pointer ${hoveredService === service.id ? 'scale-[1.02] border-ios-blue/30 shadow-xl' : ''
                    }`}
                >
                  <div className={`text-${service.color}-500 mb-6 p-4 rounded-2xl bg-${service.color}-500/10 w-fit group-hover:bg-${service.color}-500 group-hover:text-white transition-colors duration-300`}>
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-ios-text">{service.title}</h3>
                  <p className="text-ios-subtext mb-6 text-sm leading-relaxed">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center text-ios-subtext text-sm"
                      >
                        <svg
                          className={`w-4 h-4 text-${service.color}-500 mr-3 flex-shrink-0`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Process Timeline */}
      <div className="py-24 bg-ios-surface/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-ios-text">Our Process</h2>
            <p className="text-xl text-ios-subtext max-w-2xl mx-auto">
              A streamlined approach to deliver exceptional results, transparently and efficiently.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-6 gap-8 relative">
            {/* Connecting Line for Desktop */}
            <div className="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-blue-500/20" />

            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative z-10"
              >
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-ios-surface-2 border border-ios-border rounded-3xl flex items-center justify-center text-3xl transform rotate-3 hover:rotate-0 transition-all duration-300 shadow-lg hover:shadow-ios-blue/20 hover:border-ios-blue/30 group">
                    <span className="group-hover:scale-110 transition-transform duration-300">{step.icon}</span>
                  </div>
                  <div className="mt-8 text-center px-2">
                    <h3 className="text-lg font-bold mb-2 text-ios-text">{step.title}</h3>
                    <p className="text-sm text-ios-subtext leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Builder Section */}
      <div className="py-24 bg-ios-bg" id="project-builder">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-ios-text">Build Your Project</h2>
            <p className="text-ios-subtext max-w-2xl mx-auto text-lg">
              Use our interactive project builder to customize your solution and get started.
              Select the services you need and tell us about your project requirements.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ProjectBuilder />
          </motion.div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-indigo-900" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="glass-card bg-white/5 border-white/10 p-12 md:p-20 text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-white sm:text-5xl mb-8 leading-tight">
                Ready to Transform Your Business?
              </h2>
              <div className="mt-8 flex justify-center">
                <motion.a
                  href="#project-builder"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-10 py-4 border border-transparent text-lg font-bold rounded-full shadow-xl text-blue-900 bg-white hover:bg-blue-50 transition-all hover:-translate-y-1"
                >
                  Start Building Now
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
