import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkHover = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024;
      const mediaMatch = window.matchMedia('(hover: none)').matches || window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(hasTouch || isSmallScreen || mediaMatch);
    };
    checkHover();
    window.addEventListener('resize', checkHover);
    return () => window.removeEventListener('resize', checkHover);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [data-hover]');
      setHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY, isMobile]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="cursor-dot fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="w-2 h-2 rounded-full bg-brand-teal" />
      </motion.div>
      <motion.div
        className="cursor-ring fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovered ? 80 : 40,
          height: hovered ? 80 : 40,
        }}
      >
        <div className={`w-full h-full rounded-full border ${hovered ? 'border-brand-teal border-2' : 'border-brand-navy/40'} transition-colors`} />
      </motion.div>
    </>
  );
};

export default CustomCursor;
