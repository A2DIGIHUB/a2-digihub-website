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
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    category: "Web Development",
    link: "#"
  },
  {
    id: 2,
    title: "FinTech Mobile App",
    description: "Mobile banking solution with advanced security features and seamless user experience.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    category: "Mobile Development",
    link: "#"
  },
  {
    id: 3,
    title: "AI-Powered Analytics",
    description: "Business intelligence platform leveraging artificial intelligence for predictive analytics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    category: "AI & Machine Learning",
    link: "#"
  },
  {
    id: 4,
    title: "IoT Smart Home",
    description: "Connected home automation system with real-time monitoring and control.",
    image: "https://images.unsplash.com/photo-1558002038-bb4237b50307?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    category: "IoT Solutions",
    link: "#"
  },
  {
    id: 5,
    title: "Healthcare Management",
    description: "Digital healthcare platform for patient management and telemedicine services.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    category: "Healthcare",
    link: "#"
  },
  {
    id: 6,
    title: "Supply Chain Platform",
    description: "Blockchain-based supply chain management system for transparency and efficiency.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    category: "Blockchain",
    link: "#"
  },
  {
    id: 7,
    title: "Graphic Design Portfolio",
    description: "Collection of creative graphic design works including branding, illustrations, and digital art.",
    image: "/images/graphic-design.jpg",
    category: "Graphic Design",
    link: "https://drive.google.com/drive/folders/12OwxZiEsHkrW2E2jIMDLD3DHRIIdcFAm?usp=sharing"
  }
];

interface PortfolioSectionProps {
  showAll?: boolean;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ showAll = false }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const categories = ['all', ...Array.from(new Set(portfolioItems.map(item => item.category)))];
  
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
            <div className="relative h-64 w-full">
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                target="_blank"
                rel="noopener noreferrer"
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
