import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "E-Learning Platform",
    description: "A comprehensive digital learning platform with interactive courses and real-time analytics.",
    image: "/images/portfolio/elearning.jpg",
    category: "Web Development",
    link: "#"
  },
  {
    id: 2,
    title: "FinTech Mobile App",
    description: "Mobile banking solution with advanced security features and seamless user experience.",
    image: "/images/portfolio/fintech.jpg",
    category: "Mobile Development",
    link: "#"
  },
  {
    id: 3,
    title: "AI-Powered Analytics",
    description: "Business intelligence platform leveraging artificial intelligence for predictive analytics.",
    image: "/images/portfolio/analytics.jpg",
    category: "AI & Machine Learning",
    link: "#"
  },
  {
    id: 4,
    title: "IoT Smart Home",
    description: "Connected home automation system with real-time monitoring and control.",
    image: "/images/portfolio/iot.jpg",
    category: "IoT Solutions",
    link: "#"
  },
  {
    id: 5,
    title: "Healthcare Management",
    description: "Digital healthcare platform for patient management and telemedicine services.",
    image: "/images/portfolio/healthcare.jpg",
    category: "Healthcare",
    link: "#"
  },
  {
    id: 6,
    title: "Supply Chain Platform",
    description: "Blockchain-based supply chain management system for transparency and efficiency.",
    image: "/images/portfolio/supply-chain.jpg",
    category: "Blockchain",
    link: "#"
  }
];

interface PortfolioSectionProps {
  showAll?: boolean;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ showAll = false }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const categories = ['all', ...new Set(portfolioItems.map(item => item.category))];
  
  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  const displayedItems = showAll ? filteredItems : filteredItems.slice(0, 3);

  return (
    <div className="space-y-8">
      {showAll && (
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={item.image}
                alt={item.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
                {item.category}
              </span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {item.description}
              </p>
              <a
                href={item.link}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                Learn More
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {!showAll && displayedItems.length < portfolioItems.length && (
        <div className="text-center mt-12">
          <Link
            to="/portfolio"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Projects
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default PortfolioSection;
