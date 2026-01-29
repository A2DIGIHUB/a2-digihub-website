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
  WrenchScrewdriverIcon,
  CheckCircleIcon,
  ArrowRightIcon
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

  const filteredServices = services.filter(
    (service) => selectedCategory === 'all' || service.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      {/* Hero Section - Clean Minimal */}
      <section className="relative py-24 overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-orange-50 dark:bg-orange-950/10 rounded-full blur-3xl opacity-30"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 dark:bg-orange-950/30 rounded-full mb-6">
              <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
              <span className="text-sm font-medium text-orange-600 dark:text-orange-500">Our Capabilities</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
              Comprehensive <span className="text-orange-600 dark:text-orange-500">solutions</span> for your business
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
              We combine technical expertise with strategic thinking to deliver digital products that drive real growth and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-0 z-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 py-4">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${selectedCategory === category.id
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 group hover:shadow-lg"
                >
                  <div className="w-14 h-14 bg-orange-50 dark:bg-orange-950/30 rounded-xl flex items-center justify-center mb-6 text-orange-600 dark:text-orange-500 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed min-h-[40px]">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircleIcon className="w-5 h-5 text-orange-600 dark:text-orange-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Our Process</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A transparent, agile workflow designed to deliver excellence at every stage.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-6 gap-8 relative items-start">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gray-200 dark:bg-gray-800" />

            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl flex items-center justify-center text-3xl shadow-sm mb-6 group hover:border-orange-500 transition-colors">
                  <span className="group-hover:scale-110 transition-transform">{step.icon}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Builder Section */}
      <section className="py-24 bg-white dark:bg-gray-950" id="project-builder">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 dark:bg-orange-950/30 rounded-full mb-6">
                <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                <span className="text-sm font-medium text-orange-600 dark:text-orange-500">Start Building</span>
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Customize your solution</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                Use our interactive project builder to select the services you need and get a preliminary estimate for your project.
              </p>
            </div>
            <div className="lg:w-2/3 w-full">
              <ProjectBuilder />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
              Ready to get started?
            </h2>
            <div className="flex justify-center gap-4">
              <a
                href="#project-builder"
                className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors shadow-sm"
              >
                Start Project Builder
              </a>
              <a
                href="/contact"
                className="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-orange-600 text-gray-900 dark:text-white font-bold rounded-lg transition-colors"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
