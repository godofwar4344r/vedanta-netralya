import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import Logo from './Logo';
import BackgroundEye from './BackgroundEye';
import Chatbot from './Chatbot';
import CustomCursor from './CustomCursor';

const Layout: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isGalleryDropdownOpen, setIsGalleryDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and dropdowns on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    setIsMoreDropdownOpen(false);
    setIsGalleryDropdownOpen(false);
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="relative min-h-screen bg-cream text-brand-navy selection:bg-brand-navy selection:text-cream flex flex-col overflow-x-hidden font-body">
      <CustomCursor />
      
      {/* Background eyeball watermark */}
      <BackgroundEye />

      {/* === NAVBAR === */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-brand-navy/95 backdrop-blur-md py-3 shadow-lg border-b border-cream/5' : 'bg-brand-navy py-5'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 flex justify-between items-center">
          {/* Logo wrapper */}
          <Logo className="h-10 md:h-12" withGlow={true} />

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex gap-8 items-center font-merriweather text-[10px] tracking-[0.25em] uppercase font-bold text-cream/80">
            <Link to="/" className="hover:text-brand-teal transition-colors">Home</Link>
            
            {/* About Dropdown / Links */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsMoreDropdownOpen(!isMoreDropdownOpen);
                  setIsServicesDropdownOpen(false);
                  setIsGalleryDropdownOpen(false);
                }}
                className="hover:text-brand-teal transition-colors flex items-center gap-1 focus:outline-none"
              >
                About <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {isMoreDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-8 left-0 w-64 bg-brand-navy border border-cream/10 rounded-2xl p-4 flex flex-col gap-3 shadow-xl backdrop-blur-md z-[100]"
                  >
                    <Link to="/about" className="hover:text-brand-teal text-cream/90 transition-colors py-1">About Hospital</Link>
                    <Link to="/vision-mission" className="hover:text-brand-teal text-cream/90 transition-colors py-1">Vision & Mission</Link>
                    <Link to="/facilities" className="hover:text-brand-teal text-cream/90 transition-colors py-1">Hospital Facilities</Link>
                    <Link to="/doctors" className="hover:text-brand-teal text-cream/90 transition-colors py-1">Board of Doctors</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsServicesDropdownOpen(!isServicesDropdownOpen);
                  setIsMoreDropdownOpen(false);
                  setIsGalleryDropdownOpen(false);
                }}
                className="hover:text-brand-teal transition-colors flex items-center gap-1 focus:outline-none"
              >
                Eye Services <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {isServicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-8 left-0 w-72 bg-brand-navy border border-cream/10 rounded-2xl p-4 flex flex-col gap-3 shadow-xl backdrop-blur-md z-[100] max-h-[80vh] overflow-y-auto"
                  >
                    <Link to="/services" className="hover:text-brand-teal text-cream/90 transition-colors py-1 font-black">All Offerings</Link>
                    <hr className="border-cream/10" />
                    <Link to="/cataract" className="hover:text-brand-teal text-cream/90 transition-colors py-0.5">Cataract Surgery</Link>
                    <Link to="/lasik" className="hover:text-brand-teal text-cream/90 transition-colors py-0.5">Refractive / LASIK</Link>
                    <Link to="/retina-services" className="hover:text-brand-teal text-cream/90 transition-colors py-0.5">Retina Services</Link>
                    <Link to="/glaucoma-services" className="hover:text-brand-teal text-cream/90 transition-colors py-0.5">Glaucoma Services</Link>
                    <Link to="/oculoplasty-services" className="hover:text-brand-teal text-cream/90 transition-colors py-0.5">Oculoplasty Services</Link>
                    <Link to="/paediatric-ophthalmology" className="hover:text-brand-teal text-cream/90 transition-colors py-0.5">Paediatric Ophthalmology</Link>
                    <Link to="/vr-surgery" className="hover:text-brand-teal text-cream/90 transition-colors py-0.5">VR Surgery</Link>
                    <Link to="/optical-services" className="hover:text-brand-teal text-cream/90 transition-colors py-0.5">Optical Services</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/test-eye" className="hover:text-brand-teal text-brand-teal font-black transition-colors">Digital Eye Test</Link>
            <Link to="/centres" className="hover:text-brand-teal transition-colors">Centres</Link>

            {/* Gallery Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsGalleryDropdownOpen(!isGalleryDropdownOpen);
                  setIsServicesDropdownOpen(false);
                  setIsMoreDropdownOpen(false);
                }}
                className="hover:text-brand-teal transition-colors flex items-center gap-1 focus:outline-none"
              >
                Gallery <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {isGalleryDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-8 left-0 w-64 bg-brand-navy border border-cream/10 rounded-2xl p-4 flex flex-col gap-3 shadow-xl backdrop-blur-md z-[100]"
                  >
                    <Link to="/gallery/images" className="hover:text-brand-teal text-cream/90 transition-colors py-1">Image Gallery</Link>
                    <Link to="/gallery/videos" className="hover:text-brand-teal text-cream/90 transition-colors py-1">Video Gallery</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/contact" className="hover:text-brand-teal transition-colors">Contact</Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-cream hover:text-brand-teal transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[72px] bg-brand-navy-deep z-40 p-8 flex flex-col gap-6 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-4 font-merriweather text-sm tracking-wider uppercase font-bold text-cream/90">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <hr className="border-cream/10" />
              <p className="text-[10px] text-brand-teal font-black tracking-widest uppercase">About Us</p>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="pl-4 text-xs">About Hospital</Link>
              <Link to="/vision-mission" onClick={() => setIsMobileMenuOpen(false)} className="pl-4 text-xs">Vision & Mission</Link>
              <Link to="/facilities" onClick={() => setIsMobileMenuOpen(false)} className="pl-4 text-xs">Facilities</Link>
              <Link to="/doctors" onClick={() => setIsMobileMenuOpen(false)} className="pl-4 text-xs">Doctors</Link>
              <hr className="border-cream/10" />
              <p className="text-[10px] text-brand-teal font-black tracking-widest uppercase">Eye Services</p>
              <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className="pl-4 text-xs">All Specialties</Link>
              <Link to="/cataract" onClick={() => setIsMobileMenuOpen(false)} className="pl-4 text-xs">Cataract Surgery</Link>
              <Link to="/lasik" onClick={() => setIsMobileMenuOpen(false)} className="pl-4 text-xs">LASIK / Refractive</Link>
              <Link to="/retina-services" onClick={() => setIsMobileMenuOpen(false)} className="pl-4 text-xs">Retina Services</Link>
              <Link to="/glaucoma-services" onClick={() => setIsMobileMenuOpen(false)} className="pl-4 text-xs">Glaucoma Care</Link>
              <Link to="/oculoplasty-services" onClick={() => setIsMobileMenuOpen(false)} className="pl-4 text-xs">Oculoplasty</Link>
              <Link to="/paediatric-ophthalmology" onClick={() => setIsMobileMenuOpen(false)} className="pl-4 text-xs">Paediatric Eye Care</Link>
              <Link to="/vr-surgery" onClick={() => setIsMobileMenuOpen(false)} className="pl-4 text-xs">VR Surgery</Link>
              <Link to="/optical-services" onClick={() => setIsMobileMenuOpen(false)} className="pl-4 text-xs">Optical Store</Link>
              <hr className="border-cream/10" />
              <Link to="/test-eye" onClick={() => setIsMobileMenuOpen(false)} className="text-brand-teal font-black">Digital Eye Test</Link>
              <Link to="/centres" onClick={() => setIsMobileMenuOpen(false)}>Centres</Link>
              <hr className="border-cream/10" />
              <p className="text-[10px] text-brand-teal font-black tracking-widest uppercase">Gallery</p>
              <Link to="/gallery/images" onClick={() => setIsMobileMenuOpen(false)} className="pl-4 text-xs">Image Gallery</Link>
              <Link to="/gallery/videos" onClick={() => setIsMobileMenuOpen(false)} className="pl-4 text-xs">Video Gallery</Link>
              <hr className="border-cream/10" />
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
              <hr className="border-cream/10" />
              <Link to="/privacy" onClick={() => setIsMobileMenuOpen(false)} className="text-xs text-cream/60">Privacy Policy</Link>
              <Link to="/terms" onClick={() => setIsMobileMenuOpen(false)} className="text-xs text-cream/60">Terms & Conditions</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === PAGE BODY CONTENT === */}
      <main className="flex-grow pt-[80px] z-10 relative">
        <Outlet />
      </main>



      {/* Floating Web-Speech AI Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Layout;
