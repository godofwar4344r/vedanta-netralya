import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const AnimatedEye: React.FC<{ size?: number; hideBorders?: boolean }> = ({ size = 400, hideBorders = true }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  const pupilX = useTransform(springX, [-1, 1], [-25, 25]);
  const pupilY = useTransform(springY, [-1, 1], [-15, 15]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative" style={{ width: size, height: size * 0.7 }}>
      {/* Pulse rings behind */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-full h-full border border-brand-teal/20 rounded-full pulse-ring" />
        <div className="absolute w-full h-full border border-brand-teal/20 rounded-full pulse-ring" style={{ animationDelay: '1s' }} />
        <div className="absolute w-full h-full border border-brand-teal/20 rounded-full pulse-ring" style={{ animationDelay: '2s' }} />
      </div>

      <svg viewBox="0 0 400 280" className="w-full h-full relative z-10" xmlns="http://www.w3.org/2000/svg">
        {/* Upper Eyelid (only shown if not hidden) */}
        {!hideBorders && (
          <motion.path
            d="M 30,170 C 90,40 310,40 370,130"
            fill="none"
            stroke="#0a2640"
            strokeWidth="14"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        )}

        {/* Iris with gradient */}
        <defs>
          <radialGradient id="irisGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2dd4e6" />
            <stop offset="60%" stopColor="#00abc0" />
            <stop offset="100%" stopColor="#0a2640" />
          </radialGradient>
          <radialGradient id="pupilGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#061829" />
            <stop offset="100%" stopColor="#0a2640" />
          </radialGradient>
        </defs>

        {/* Iris */}
        <motion.circle
          cx="200" cy="140" r="55"
          fill="url(#irisGradient)"
          style={{ x: pupilX, y: pupilY }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring", duration: 1 }}
        />
        {/* Pupil */}
        <motion.circle
          cx="200" cy="140" r="22"
          fill="url(#pupilGlow)"
          style={{ x: pupilX, y: pupilY }}
        />
        {/* Highlight */}
        <motion.circle
          cx="183" cy="125" r="8"
          fill="white"
          style={{ x: pupilX, y: pupilY }}
        />
        <motion.circle
          cx="215" cy="155" r="3"
          fill="white"
          opacity="0.6"
          style={{ x: pupilX, y: pupilY }}
        />

        {/* Lower Sweep (only shown if not hidden) */}
        {!hideBorders && (
          <motion.path
            d="M 50,170 C 120,250 290,250 350,200 C 372,180 380,140 385,80"
            fill="none"
            stroke="#00abc0"
            strokeWidth="14"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: "easeInOut", delay: 0.4 }}
          />
        )}
      </svg>
    </div>
  );
};

export default AnimatedEye;
