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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 mix-blend-multiply" />
          <div className="absolute inset-0" style={{ backgroundImage: 'url(../grid.svg)', opacity: 0.2 }} />
        </div>
        <div className="relative">
          <div className="container mx-auto px-4 py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Our Services
              </h1>
              <p className="text-xl md:text-2xl text-blue-100">
                Comprehensive digital solutions to transform your business and drive growth
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
      <div className="py-16">
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
                  className={`bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 ${
                    hoveredService === service.id ? 'scale-105' : ''
                  }`}
                >
                  <div className={`text-${service.color}-600 mb-6`}>
                    <service.icon className="w-12 h-12" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center text-gray-600"
                      >
                        <svg
                          className={`w-5 h-5 text-${service.color}-600 mr-3 flex-shrink-0`}
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
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-xl text-gray-600">
              A streamlined approach to deliver exceptional results
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-6 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-200 to-indigo-200" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Builder Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Build Your Project</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
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
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-8">
                Ready to Transform Your Business?
              </h2>
              <div className="mt-8 flex justify-center">
                <motion.a
                  href="#project-builder"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-600 bg-white hover:bg-blue-50 sm:px-8"
                >
                  Get Started
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
