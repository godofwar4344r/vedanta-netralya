import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  showText?: boolean;
  theme?: 'light' | 'dark';
}

const VedantaLogo: React.FC<LogoProps> = ({ className = "h-12", showText = true, theme = 'light' }) => {
  const isLight = theme === 'light';
  const mainColor = isLight ? '#fdfbf7' : '#123d6a';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 150 100"
        className="h-full w-auto overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Upper Eyelid Arch */}
        <motion.path
          d="M 15,62 C 30,20 100,20 118,48"
          fill="none"
          stroke={mainColor}
          strokeWidth="11"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* Central Teardrop Pupil */}
        <motion.path
          d="M 54,34 C 64,28 78,28 88,34 C 84,56 78,70 71,70 C 64,70 58,56 54,34 Z"
          fill={mainColor}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
        />

        {/* Lower Sweep Highlight */}
        <motion.path
          d="M 26,62 C 40,88 95,88 114,72 C 122,64 125,48 127,24"
          fill="none"
          stroke="#00abc0"
          strokeWidth="11"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
        />
      </svg>
      
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-merriweather font-bold text-2xl tracking-tighter text-brand-teal animate-pulse-slow" style={{ letterSpacing: '-1.2px' }}>
            Vedanta
          </span>
          <span className={`font-lora text-lg tracking-widest uppercase mt-1 ${isLight ? 'text-cream/90' : 'text-brand-navy'}`}>
            Netralya
          </span>
        </div>
      )}
    </div>
  );
};

export default VedantaLogo;
