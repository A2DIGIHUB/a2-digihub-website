import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ServiceIcon {
  icon: React.ReactNode;
  title: string;
}

interface GridItemProps extends ServiceIcon {
  mouseX: number;
  mouseY: number;
  row: number;
  col: number;
  totalRows: number;
  totalCols: number;
  isHovered: boolean;
}

const GridItem: React.FC<GridItemProps> = ({
  icon,
  title,
  mouseX,
  mouseY,
  row,
  col,
  totalRows,
  totalCols,
  isHovered
}) => {
  const distanceFromCenter = Math.sqrt(
    Math.pow(col - (totalCols - 1) / 2, 2) +
    Math.pow(row - (totalRows - 1) / 2, 2)
  );

  const intensity = 1 - Math.min(distanceFromCenter / Math.max(totalRows, totalCols), 1);
  
  const x = mouseX * 30 * intensity;
  const y = mouseY * 30 * intensity;
  const rotate = mouseX * 10 * intensity;
  const scale = 1 + (isHovered ? 0.1 : 0) * intensity;

  return (
    <motion.div
      animate={{
        x,
        y,
        rotate,
        scale,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.5
      }}
      className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-xl backdrop-blur-sm shadow-xl border border-white/10 hover:border-primary/50 transition-colors duration-300"
    >
      <div className="text-4xl text-primary mb-3">
        {icon}
      </div>
      <p className="text-sm font-medium text-white/80">{title}</p>
    </motion.div>
  );
};

interface InteractiveServiceGridProps {
  services: ServiceIcon[];
  gridSize?: { rows: number; cols: number };
}

const InteractiveServiceGrid: React.FC<InteractiveServiceGridProps> = ({
  services,
  gridSize = { rows: 3, cols: 3 }
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !isHovered) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseXRelative = (e.clientX - centerX) / (rect.width / 2);
      const mouseYRelative = (e.clientY - centerY) / (rect.height / 2);

      setMouseX(mouseXRelative);
      setMouseY(mouseYRelative);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered]);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouseX(0);
    setMouseY(0);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[500px] perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="grid grid-cols-3 gap-8 p-8">
        <AnimatePresence>
          {Array.from({ length: gridSize.rows * gridSize.cols }).map((_, index) => {
            const row = Math.floor(index / gridSize.cols);
            const col = index % gridSize.cols;
            const service = services[index % services.length];
            
            return (
              <GridItem
                key={index}
                {...service}
                mouseX={mouseX}
                mouseY={mouseY}
                row={row}
                col={col}
                totalRows={gridSize.rows}
                totalCols={gridSize.cols}
                isHovered={isHovered}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveServiceGrid;
