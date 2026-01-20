import React from 'react';
import { motion } from 'framer-motion';
import PortfolioSection from '../components/sections/PortfolioSection';
import PageHeader from '../components/common/PageHeader';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-ios-bg">
      <PageHeader
        title="Our Portfolio"
        description="Explore our successful projects and digital innovations"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16 sm:px-6 lg:px-8"
      >
        <PortfolioSection showAll={true} />
      </motion.div>
    </div>
  );
};

export default Portfolio;
