import React from 'react';
import { motion, useInView, useSpring, useMotionValue, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  delay?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2,
  delay = 0,
  className = '',
  prefix = '',
  suffix = ''
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hasAnimated, setHasAnimated] = React.useState(false);

  const springValue = useSpring(0, {
    duration: duration * 1000,
    delay: delay * 1000,
    onComplete: () => {
      setHasAnimated(true);
    }
  });

  const currentValue = useMotionValue(0);
  springValue.onChange(v => currentValue.set(v));

  const rounded = useTransform(currentValue, v => Math.round(v));

  React.useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(end);
    }
  }, [isInView, end, springValue, hasAnimated]);

  return (
    <motion.span
      ref={ref}
      className={className}
    >
      {prefix}
      {rounded}
      {suffix}
    </motion.span>
  );
};

export default AnimatedCounter;
