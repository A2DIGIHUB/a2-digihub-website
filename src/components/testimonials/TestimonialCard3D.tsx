import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TestimonialCard3DProps {
  testimonial: {
    quote: string;
    author: string;
    position: string;
    image: string;
    rating: number;
    tags: string[];
    company: {
      logo: string;
      name: string;
    };
  };
  index: number;
}

const TestimonialCard3D: React.FC<TestimonialCard3DProps> = ({ testimonial, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });
  
  const rotateX = useTransform(mouseY, [-100, 100], [30, -30]);
  const rotateY = useTransform(mouseX, [-100, 100], [-30, 30]);
  const brightness = useTransform(mouseY, [-100, 100], [1.5, 0.5]);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y]);

  const generateStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          filter: `brightness(${brightness})`,
        }}
        className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow relative preserve-3d group-hover:scale-[1.02] duration-300"
      >
        {/* 3D Floating Elements */}
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-500 rounded-xl transform -rotate-12 group-hover:rotate-0 transition-transform duration-300" 
             style={{ transform: 'translateZ(40px)' }} 
        />
        <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"
             style={{ transform: 'translateZ(20px)' }} 
        />

        {/* Content with 3D Effect */}
        <div className="relative" style={{ transform: 'translateZ(75px)' }}>
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-16 h-16 rounded-xl object-cover ring-2 ring-blue-100"
                />
                <motion.div
                  className="absolute -right-2 -bottom-2 w-8 h-8 bg-white rounded-lg shadow-lg flex items-center justify-center"
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={testimonial.company.logo}
                    alt={testimonial.company.name}
                    className="w-6 h-6 object-contain"
                  />
                </motion.div>
              </div>
              <div>
                <h4 className="font-bold text-xl text-gray-900">{testimonial.author}</h4>
                <p className="text-gray-600">{testimonial.position}</p>
                <div className="flex mt-1">
                  {generateStars(testimonial.rating)}
                </div>
              </div>
            </div>
          </div>

          <blockquote className="relative">
            <div className="absolute -left-4 -top-4 text-blue-500/20 transform scale-150">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed pl-6 mb-6">
              {testimonial.quote}
            </p>
          </blockquote>

          <div className="flex flex-wrap gap-2 mt-4">
            {testimonial.tags.map((tag, i) => (
              <motion.span
                key={tag}
                className="px-3 py-1 bg-blue-500/10 text-blue-600 rounded-lg text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TestimonialCard3D;
