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

  if (loading) return <div className="text-center py-10 text-ios-subtext">Loading portfolio...</div>;

  if (items.length === 0) return <div className="text-center py-10 text-ios-subtext">Our portfolio is being updated. Check back soon!</div>;

  return (
    <div className="space-y-8">
      {showAll && (
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeCategory === category
                ? 'bg-ios-blue text-white shadow-lg shadow-blue-500/30'
                : 'bg-ios-surface hover:bg-ios-surface-2 text-ios-subtext hover:text-ios-text border border-ios-border'
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
            className="group relative glass-card overflow-hidden flex flex-col h-full hover:bg-ios-surface-2 transition-all duration-300"
          >
            <div className="relative h-64 w-full bg-ios-surface-2 overflow-hidden">
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-ios-subtext bg-ios-surface">
                  <PhotoIcon className="w-16 h-16 opacity-30" />
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-ios-blue/80 backdrop-blur-md rounded-full shadow-lg border border-white/10">
                  {item.category}
                </span>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-ios-text mb-3 group-hover:text-ios-blue transition-colors">
                {item.title}
              </h3>
              <p className="text-ios-subtext mb-6 line-clamp-3 leading-relaxed text-sm">
                {item.description}
              </p>

              <div className="mt-auto pt-4 border-t border-ios-border">
                {item.live_link ? (
                  <a
                    href={item.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-ios-blue hover:text-white font-medium transition-colors"
                  >
                    View Project
                    <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <span className="text-sm text-ios-subtext/50 italic">Project details coming soon</span>
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
            className="inline-flex items-center px-8 py-4 text-base font-bold text-white bg-ios-blue rounded-full shadow-lg hover:bg-purple-600 transition-all hover:-translate-y-1"
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
