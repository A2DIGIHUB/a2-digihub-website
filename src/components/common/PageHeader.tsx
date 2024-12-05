import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold sm:text-5xl mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-xl text-gray-300">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PageHeader;
