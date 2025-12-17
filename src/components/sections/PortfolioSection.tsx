import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, PhotoIcon } from '@heroicons/react/24/outline';
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
        // .order('featured', { ascending: false }) // Optional: prioritize featured
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

  const displayedItems = showAll ? filteredItems : filteredItems.slice(0, 3); // Limit to 3 if on home/summary view

  if (loading) return <div className="text-center py-10 text-gray-400">Loading portfolio...</div>;

  if (items.length === 0) return <div className="text-center py-10 text-gray-400">Our portfolio is being updated. Check back soon!</div>;

  return (
    <div className="space-y-8">
      {showAll && (
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category
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
            className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full"
          >
            <div className="relative h-64 w-full bg-gray-200">
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <PhotoIcon className="w-16 h-16" />
                </div>
              )}
            </div>
            <div className="p-6 flex flex-col flex-1">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full w-fit">
                {item.category}
              </span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {item.description}
              </p>

              <div className="mt-auto pt-4">
                {item.live_link ? (
                  <a
                    href={item.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View Project
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </a>
                ) : (
                  <span className="text-sm text-gray-400">Project details coming soon</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {!showAll && displayedItems.length < items.length && (
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
