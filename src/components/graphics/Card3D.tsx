import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { debounce } from 'lodash';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Maximum rotation angle in degrees
   * @default 10
   */
  maxRotation?: number;
  /**
   * Scale factor on hover
   * @default 1.05
   */
  hoverScale?: number;
  /**
   * Enable/disable 3D effect
   * @default true
   */
  enabled?: boolean;
}

const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  maxRotation = 10,
  hoverScale = 1.05,
  enabled = true
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);
  const prefersReducedMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window);
  }, []);

  const calculateRotation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !enabled || prefersReducedMotion) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateXValue = (mouseY / (rect.height / 2)) * -maxRotation;
    const rotateYValue = (mouseX / (rect.width / 2)) * maxRotation;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  }, [maxRotation, enabled, prefersReducedMotion]);

  // Debounced mouse move handler
  const handleMouseMove = debounce(calculateRotation, 5);

  const handleMouseEnter = () => {
    if (!enabled || prefersReducedMotion) return;
    setScale(hoverScale);
  };

  const handleMouseLeave = () => {
    if (!enabled || prefersReducedMotion) return;
    setRotateX(0);
    setRotateY(0);
    setScale(1);
  };

  // Handle keyboard focus
  const handleFocus = () => {
    if (!enabled || prefersReducedMotion) return;
    setScale(hoverScale);
  };

  const handleBlur = () => {
    if (!enabled || prefersReducedMotion) return;
    setScale(1);
    setRotateX(0);
    setRotateY(0);
  };

  const shouldDisableEffects = !enabled || prefersReducedMotion || isTouchDevice;

  return (
    <motion.div
      ref={cardRef}
      className={`relative transform-gpu ${className}`}
      onMouseMove={shouldDisableEffects ? undefined : handleMouseMove}
      onMouseEnter={shouldDisableEffects ? undefined : handleMouseEnter}
      onMouseLeave={shouldDisableEffects ? undefined : handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      role="presentation"
      style={{
        transformStyle: shouldDisableEffects ? undefined : 'preserve-3d',
        perspective: shouldDisableEffects ? undefined : '1000px'
      }}
      animate={{
        rotateX: shouldDisableEffects ? 0 : rotateX,
        rotateY: shouldDisableEffects ? 0 : rotateY,
        scale
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 0.5
      }}
      whileTap={shouldDisableEffects ? undefined : { scale: 0.95 }}
    >
      <div
        className="relative w-full h-full"
        style={{
          transform: shouldDisableEffects ? undefined : 'translateZ(50px)',
          transformStyle: shouldDisableEffects ? undefined : 'preserve-3d'
        }}
      >
        {children}
      </div>
      {!shouldDisableEffects && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg pointer-events-none"
          style={{
            transform: 'translateZ(75px)',
            transformStyle: 'preserve-3d'
          }}
        />
      )}
    </motion.div>
  );
};

export default Card3D;
