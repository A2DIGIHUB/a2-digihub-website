import React from 'react';
import { motion } from 'framer-motion';
import PortfolioSection from '../components/sections/PortfolioSection';
import Footer from '../components/Footer';
import { SparklesIcon } from '@heroicons/react/24/outline';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      {/* Hero Section - Clean Minimal */}
      <section className="relative py-24 overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-orange-50 dark:bg-orange-950/10 rounded-full blur-3xl opacity-30"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 dark:bg-orange-950/30 rounded-full mb-6">
              <SparklesIcon className="w-4 h-4 text-orange-600 dark:text-orange-500" />
              <span className="text-sm font-medium text-orange-600 dark:text-orange-500">Our Work</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
              Selected <span className="text-orange-600 dark:text-orange-500">Projects</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Explore how we help businesses transform and grow through innovative digital solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid Section */}
      <section className="pb-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <PortfolioSection showAll={true} />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
