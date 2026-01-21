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
  const [activeIndex, setActiveIndex] = useState(0);

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

  if (loading) return <div className="text-center py-10 text-ios-subtext">Loading portfolio...</div>;

  if (items.length === 0) return <div className="text-center py-10 text-ios-subtext">Our portfolio is being updated. Check back soon!</div>;

  // If showAll is true, use grid layout. Otherwise, use carousel
  if (showAll) {
    return (
      <div className="space-y-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="relative h-64 bg-ios-surface-2 overflow-hidden">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <PhotoIcon className="w-16 h-16 text-ios-subtext" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-ios-blue uppercase tracking-wide">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold text-ios-text mt-2 mb-3">
                  {item.title}
                </h3>
                <p className="text-ios-subtext mb-4 line-clamp-2">
                  {item.description}
                </p>
                {item.live_link && (
                  <a
                    href={item.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-ios-blue font-semibold hover:gap-2 transition-all"
                  >
                    View Project
                    <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/portfolio"
            className="inline-flex items-center px-8 py-4 text-base font-bold text-white bg-ios-blue rounded-full shadow-lg hover:bg-purple-600 transition-all hover:-translate-y-1"
          >
            View All Projects
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  // Carousel view for home page
  return (
    <div className="relative max-w-6xl mx-auto overflow-hidden">
      <div className="flex items-center justify-center gap-4">
        {/* Previous Button */}
        <button
          onClick={() => setActiveIndex((prev) => (prev === 0 ? displayedItems.length - 1 : prev - 1))}
          className="p-3 rounded-full bg-ios-surface border border-ios-border hover:bg-ios-surface-2 transition-all z-10 flex-shrink-0"
          aria-label="Previous project"
        >
          <ChevronDownIcon className="w-6 h-6 text-ios-text rotate-90" />
        </button>

        {/* Carousel Items */}
        <div className="flex-1 relative h-[550px] flex items-center justify-center">
          {displayedItems.map((item, index) => {
            const offset = index - activeIndex;
            const isActive = offset === 0;
            const isVisible = Math.abs(offset) <= 1;

            if (!isVisible) return null;

            return (
              <motion.div
                key={item.id}
                initial={false}
                animate={{
                  x: `${offset * 110}%`,
                  scale: isActive ? 1 : 0.8,
                  opacity: isActive ? 1 : 0.4,
                  filter: isActive ? 'blur(0px)' : 'blur(4px)',
                  zIndex: isActive ? 10 : 1,
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute w-full max-w-md cursor-pointer"
                onClick={() => !isActive && setActiveIndex(index)}
              >
                <div className={`glass-card overflow-hidden ${!isActive ? 'pointer-events-none' : 'group'}`}>
                  <div className="relative h-64 bg-ios-surface-2 overflow-hidden">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <PhotoIcon className="w-16 h-16 text-ios-subtext" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-ios-blue uppercase tracking-wide">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-bold text-ios-text mt-2 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-ios-subtext mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    {item.live_link && isActive && (
                      <a
                        href={item.live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-ios-blue font-semibold hover:gap-2 transition-all"
                      >
                        View Project
                        <ArrowRightIcon className="w-4 h-4 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => setActiveIndex((prev) => (prev === displayedItems.length - 1 ? 0 : prev + 1))}
          className="p-3 rounded-full bg-ios-surface border border-ios-border hover:bg-ios-surface-2 transition-all z-10 flex-shrink-0"
          aria-label="Next project"
        >
          <ChevronDownIcon className="w-6 h-6 text-ios-text -rotate-90" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {displayedItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition-all ${index === activeIndex
              ? 'w-8 bg-ios-blue'
              : 'w-2 bg-ios-border hover:bg-ios-blue/50'
              }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center mt-12">
        <Link
          to="/portfolio"
          className="inline-flex items-center px-8 py-4 text-base font-bold text-white bg-ios-blue rounded-full shadow-lg hover:bg-purple-600 transition-all hover:-translate-y-1"
        >
          View All Projects
          <ArrowRightIcon className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default PortfolioSection;
