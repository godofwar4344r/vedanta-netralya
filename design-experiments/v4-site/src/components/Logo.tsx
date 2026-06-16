import React from 'react';
import logoImg from '../assets/logo.png';

interface LogoProps {
  className?: string;
  withGlow?: boolean;
  theme?: 'light' | 'dark';
}

const Logo: React.FC<LogoProps> = ({ className = 'h-9 md:h-11' }) => {
  return (
    <a
      href="/"
      className="inline-flex items-center group bg-white px-4 py-2 rounded-2xl shadow-md border border-white/20 transition-all duration-300 hover:scale-[1.02] focus:outline-none"
    >
      <img
        src={logoImg}
        alt="Vedanta Netralya"
        className={`${className} object-contain`}
        draggable={false}
      />
    </a>
  );
};

export default Logo;
