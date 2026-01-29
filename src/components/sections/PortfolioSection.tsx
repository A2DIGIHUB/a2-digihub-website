import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, PhotoIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { supabase } from '../../lib/supabase';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  live_link: string;
}

interface PortfolioSectionProps {
  showAll?: boolean;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ showAll = false }) => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const { data, error } = await supabase
        .from('projects_portfolio')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error loading portfolio', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...Array.from(new Set(items.map(item => item.category)))];

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter(item => item.category === activeCategory);

  const displayedItems = showAll ? filteredItems : filteredItems.slice(0, 3);

  if (loading) return <div className="text-center py-10 text-gray-500 font-medium">Loading portfolio...</div>;

  if (items.length === 0) return <div className="text-center py-10 text-gray-500 font-medium">Our portfolio is being updated. Check back soon!</div>;

  // If showAll is true, use grid layout. Otherwise, use carousel
  if (showAll) {
    return (
      <div className="space-y-12">
        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${activeCategory === category
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 group hover:shadow-lg"
            >
              <div className="relative h-64 bg-gray-100 dark:bg-gray-900 overflow-hidden">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <PhotoIcon className="w-16 h-16 text-gray-400 dark:text-gray-600" />
                  </div>
                )}
              </div>
              <div className="p-8">
                <span className="text-xs font-bold text-orange-600 dark:text-orange-500 uppercase tracking-wide">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-3 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                {item.live_link && (
                  <a
                    href={item.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-orange-600 dark:text-orange-500 font-bold hover:gap-2 transition-all"
                  >
                    View Project
                    <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Simple grid view for home page (Clean Minimal)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayedItems.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:border-orange-500 dark:hover:border-orange-500 transition-colors group"
        >
          <div className="relative h-48 bg-gray-100 dark:bg-gray-900 overflow-hidden">
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <PhotoIcon className="w-16 h-16 text-gray-400 dark:text-gray-600" />
              </div>
            )}
          </div>
          <div className="p-6">
            <span className="text-xs font-semibold text-orange-600 dark:text-orange-500 uppercase tracking-wide">
              {item.category}
            </span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
              {item.description}
            </p>
            {item.live_link && (
              <a
                href={item.live_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-orange-600 dark:text-orange-500 font-semibold text-sm hover:underline transition-all"
              >
                View Project
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PortfolioSection;
