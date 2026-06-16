import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, Undo, Redo, Save, RefreshCw, Plus, MapPin, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import BackgroundEye from './BackgroundEye';
import Chatbot from './Chatbot';
import CustomCursor from './CustomCursor';
import Footer from './Footer';
import { useEdit } from '../context/EditContext';
import { WEBSITE_COLORS } from '../data/brandColors';

const Layout: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isLocationWidgetOpen, setIsLocationWidgetOpen] = useState(true);
  const location = useLocation();
  const { isEditMode, toggleEditMode, undo, redo, canUndo, canRedo, saveChanges, resetChanges, selectedElement } = useEdit();

  const isAboutActive = [
    '/about',
    '/facilities'
  ].includes(location.pathname);

  const isServicesActive = [
    '/services',
    '/cataract',
    '/refractive-surgery',
    '/retina-services',
    '/glaucoma-services',
    '/oculoplasty-services',
    '/paediatric-ophthalmology',
    '/vr-surgery',
    '/optical-services'
  ].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    setIsMoreDropdownOpen(false);
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
        style={{ top: isEditMode ? '60px' : '0px', transition: 'top 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-brand-navy/95 backdrop-blur-md py-3 shadow-lg border-b border-cream/5' : 'bg-brand-navy py-5'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 flex justify-between items-center">
          {/* Logo wrapper */}
          <Logo className="h-10 md:h-12" withGlow={true} />

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex gap-8 items-center font-merriweather text-[10px] tracking-[0.25em] uppercase font-bold text-cream/80">
            <Link to="/" className={`hover:text-brand-teal transition-colors ${location.pathname === '/' ? 'text-brand-teal font-black' : 'text-cream/80'}`}>Home</Link>

            {/* About Dropdown / Links */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsMoreDropdownOpen(!isMoreDropdownOpen);
                  setIsServicesDropdownOpen(false);
                }}
                className={`hover:text-brand-teal transition-colors flex items-center gap-1 focus:outline-none ${isAboutActive ? 'text-brand-teal font-black' : 'text-cream/80'}`}
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
                    <Link to="/about" className={`hover:text-brand-teal transition-colors py-1 flex items-center justify-between ${location.pathname === '/about' ? 'text-brand-teal font-black' : 'text-cream/90'}`}>
                      <span>About Hospital</span>
                      {location.pathname === '/about' && <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />}
                    </Link>
                    <Link to="/facilities" className={`hover:text-brand-teal transition-colors py-1 flex items-center justify-between ${location.pathname === '/facilities' ? 'text-brand-teal font-black' : 'text-cream/90'}`}>
                      <span>Hospital Facilities</span>
                      {location.pathname === '/facilities' && <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />}
                    </Link>
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
                }}
                className={`hover:text-brand-teal transition-colors flex items-center gap-1 focus:outline-none ${isServicesActive ? 'text-brand-teal font-black' : 'text-cream/80'}`}
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
                    <Link to="/services" className={`hover:text-brand-teal transition-colors py-1 font-black flex items-center justify-between ${location.pathname === '/services' ? 'text-brand-teal' : 'text-cream/90'}`}>
                      <span>All Offerings</span>
                      {location.pathname === '/services' && <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />}
                    </Link>
                    <hr className="border-cream/10" />
                    <Link to="/cataract" className={`hover:text-brand-teal transition-colors py-0.5 flex items-center justify-between ${location.pathname === '/cataract' ? 'text-brand-teal font-black' : 'text-cream/90'}`}>
                      <span>Cataract Surgery</span>
                      {location.pathname === '/cataract' && <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />}
                    </Link>
                    <Link to="/refractive-surgery" className={`hover:text-brand-teal transition-colors py-0.5 flex items-center justify-between ${location.pathname === '/refractive-surgery' ? 'text-brand-teal font-black' : 'text-cream/90'}`}>
                      <span>Refractive Surgery</span>
                      {location.pathname === '/refractive-surgery' && <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />}
                    </Link>
                    <Link to="/retina-services" className={`hover:text-brand-teal transition-colors py-0.5 flex items-center justify-between ${location.pathname === '/retina-services' ? 'text-brand-teal font-black' : 'text-cream/90'}`}>
                      <span>Retina Services</span>
                      {location.pathname === '/retina-services' && <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />}
                    </Link>
                    <Link to="/glaucoma-services" className={`hover:text-brand-teal transition-colors py-0.5 flex items-center justify-between ${location.pathname === '/glaucoma-services' ? 'text-brand-teal font-black' : 'text-cream/90'}`}>
                      <span>Glaucoma Services</span>
                      {location.pathname === '/glaucoma-services' && <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />}
                    </Link>
                    <Link to="/oculoplasty-services" className={`hover:text-brand-teal transition-colors py-0.5 flex items-center justify-between ${location.pathname === '/oculoplasty-services' ? 'text-brand-teal font-black' : 'text-cream/90'}`}>
                      <span>Oculoplasty Services</span>
                      {location.pathname === '/oculoplasty-services' && <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />}
                    </Link>
                    <Link to="/paediatric-ophthalmology" className={`hover:text-brand-teal transition-colors py-0.5 flex items-center justify-between ${location.pathname === '/paediatric-ophthalmology' ? 'text-brand-teal font-black' : 'text-cream/90'}`}>
                      <span>Paediatric Ophthalmology</span>
                      {location.pathname === '/paediatric-ophthalmology' && <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />}
                    </Link>
                    <Link to="/vr-surgery" className={`hover:text-brand-teal transition-colors py-0.5 flex items-center justify-between ${location.pathname === '/vr-surgery' ? 'text-brand-teal font-black' : 'text-cream/90'}`}>
                      <span>VR Surgery</span>
                      {location.pathname === '/vr-surgery' && <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />}
                    </Link>
                    <Link to="/optical-services" className={`hover:text-brand-teal transition-colors py-0.5 flex items-center justify-between ${location.pathname === '/optical-services' ? 'text-brand-teal font-black' : 'text-cream/90'}`}>
                      <span>Optical Services</span>
                      {location.pathname === '/optical-services' && <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />}
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/test-eye" className={`hover:text-brand-teal transition-colors font-black ${location.pathname === '/test-eye' ? 'text-brand-teal font-black' : 'text-brand-teal'}`}>Digital Eye Test</Link>
            <Link to="/centres" className={`hover:text-brand-teal transition-colors ${location.pathname === '/centres' ? 'text-brand-teal font-black' : 'text-cream/80'}`}>Centres</Link>

            <Link to="/gallery" className={`hover:text-brand-teal transition-colors ${location.pathname === '/gallery' ? 'text-brand-teal font-black' : 'text-cream/80'}`}>Gallery</Link>

            <Link to="/contact" className={`hover:text-brand-teal transition-colors ${location.pathname === '/contact' ? 'text-brand-teal font-black' : 'text-cream/80'}`}>Contact</Link>
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
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={location.pathname === '/' ? 'text-brand-teal font-black' : ''}>Home</Link>
              <hr className="border-cream/10" />
              <p className="text-[10px] text-brand-teal font-black tracking-widest uppercase">About Us</p>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={`pl-4 text-xs ${location.pathname === '/about' ? 'text-brand-teal font-black' : ''}`}>About Hospital</Link>
              <Link to="/facilities" onClick={() => setIsMobileMenuOpen(false)} className={`pl-4 text-xs ${location.pathname === '/facilities' ? 'text-brand-teal font-black' : ''}`}>Facilities</Link>
              <hr className="border-cream/10" />
              <p className="text-[10px] text-brand-teal font-black tracking-widest uppercase">Eye Services</p>
              <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className={`pl-4 text-xs ${location.pathname === '/services' ? 'text-brand-teal font-black' : ''}`}>All Specialties</Link>
              <Link to="/cataract" onClick={() => setIsMobileMenuOpen(false)} className={`pl-4 text-xs ${location.pathname === '/cataract' ? 'text-brand-teal font-black' : ''}`}>Cataract Surgery</Link>
              <Link to="/refractive-surgery" onClick={() => setIsMobileMenuOpen(false)} className={`pl-4 text-xs ${location.pathname === '/refractive-surgery' ? 'text-brand-teal font-black' : ''}`}>Refractive Surgery</Link>
              <Link to="/retina-services" onClick={() => setIsMobileMenuOpen(false)} className={`pl-4 text-xs ${location.pathname === '/retina-services' ? 'text-brand-teal font-black' : ''}`}>Retina Services</Link>
              <Link to="/glaucoma-services" onClick={() => setIsMobileMenuOpen(false)} className={`pl-4 text-xs ${location.pathname === '/glaucoma-services' ? 'text-brand-teal font-black' : ''}`}>Glaucoma Care</Link>
              <Link to="/oculoplasty-services" onClick={() => setIsMobileMenuOpen(false)} className={`pl-4 text-xs ${location.pathname === '/oculoplasty-services' ? 'text-brand-teal font-black' : ''}`}>Oculoplasty</Link>
              <Link to="/paediatric-ophthalmology" onClick={() => setIsMobileMenuOpen(false)} className={`pl-4 text-xs ${location.pathname === '/paediatric-ophthalmology' ? 'text-brand-teal font-black' : ''}`}>Paediatric Eye Care</Link>
              <Link to="/vr-surgery" onClick={() => setIsMobileMenuOpen(false)} className={`pl-4 text-xs ${location.pathname === '/vr-surgery' ? 'text-brand-teal font-black' : ''}`}>VR Surgery</Link>
              <Link to="/optical-services" onClick={() => setIsMobileMenuOpen(false)} className={`pl-4 text-xs ${location.pathname === '/optical-services' ? 'text-brand-teal font-black' : ''}`}>Optical Store</Link>
              <hr className="border-cream/10" />
              <Link to="/test-eye" onClick={() => setIsMobileMenuOpen(false)} className={`text-brand-teal font-black ${location.pathname === '/test-eye' ? 'underline' : ''}`}>Digital Eye Test</Link>
              <Link to="/centres" onClick={() => setIsMobileMenuOpen(false)} className={location.pathname === '/centres' ? 'text-brand-teal font-black' : ''}>Centres</Link>
              <hr className="border-cream/10" />
              <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)} className={location.pathname === '/gallery' ? 'text-brand-teal font-black' : ''}>Gallery</Link>
              <hr className="border-cream/10" />
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={location.pathname === '/contact' ? 'text-brand-teal font-black' : ''}>Contact Us</Link>
              <hr className="border-cream/10" />
              <Link to="/privacy" onClick={() => setIsMobileMenuOpen(false)} className="text-xs text-cream/60">Privacy Policy</Link>
              <Link to="/terms" onClick={() => setIsMobileMenuOpen(false)} className="text-xs text-cream/60">Terms & Conditions</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === PAGE BODY CONTENT === */}
      <main
        className="flex-grow pt-[80px] z-10 relative transition-all duration-300"
        style={{
          paddingTop: isEditMode ? '140px' : '80px',
          paddingRight: isEditMode && selectedElement ? '380px' : '0px',
          transition: 'padding-top 0.3s cubic-bezier(0.16, 1, 0.3, 1), padding-right 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <Outlet />
      </main>

      {/* === FOOTER === */}
      <Footer />

      {/* Top Visual Editor Control Bar */}
      <AnimatePresence>
        {isEditMode && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 h-[60px] bg-brand-navy border-b border-brand-teal/30 z-[1000] flex items-center justify-between px-6 shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-brand-teal rounded-full animate-pulse" />
              <div>
                <h4 className="text-[10px] font-black text-cream uppercase tracking-widest">Visual Page Editor</h4>
                <p className="text-[8px] text-brand-teal/70 font-semibold tracking-wide">Click any text, image, card or section to edit it in the panel.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Undo / Redo */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={undo}
                  disabled={!canUndo}
                  className={`p-2 rounded-lg transition-colors ${canUndo ? 'text-cream hover:bg-cream/10' : 'text-cream/20 cursor-not-allowed'}`}
                  title="Undo last change"
                >
                  <Undo className="w-4 h-4" />
                </button>
                <button
                  onClick={redo}
                  disabled={!canRedo}
                  className={`p-2 rounded-lg transition-colors ${canRedo ? 'text-cream hover:bg-cream/10' : 'text-cream/20 cursor-not-allowed'}`}
                  title="Redo change"
                >
                  <Redo className="w-4 h-4" />
                </button>
              </div>

              <div className="h-6 w-px bg-cream/10" />

              {/* Reset/Discard & Save */}
              <button
                onClick={resetChanges}
                className="border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg text-[9px] tracking-wider uppercase font-black transition-all flex items-center gap-1"
                title="Discard all changes"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Discard
              </button>

              <button
                onClick={async () => {
                  const success = await saveChanges();
                  if (success) {
                    alert('Changes saved permanently!');
                  } else {
                    alert('Failed to save changes. Please try again.');
                  }
                }}
                className="bg-brand-teal hover:bg-brand-teal-bright text-brand-navy px-4 py-1.5 rounded-lg text-[9px] tracking-wider uppercase font-black transition-all flex items-center gap-1 shadow-lg shadow-brand-teal/20"
                title="Save changes permanently to local files"
              >
                <Save className="w-3.5 h-3.5" /> Confirm Changes
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Visual Builder Pen Button */}
      <motion.button
        onClick={toggleEditMode}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`hidden md:flex fixed bottom-8 left-8 z-[999] rounded-full shadow-2xl transition-all items-center justify-center border w-14 h-14 ${
          isEditMode
            ? 'bg-brand-teal text-brand-navy border-brand-teal glow-teal'
            : 'bg-brand-navy border-brand-teal/40 text-cream hover:bg-brand-teal hover:text-brand-navy hover:shadow-brand-teal/30'
        }`}
        aria-label="Toggle Visual Editor"
      >
        <span className="sr-only">Toggle Visual Editor</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
      </motion.button>

      {/* Floating Google Maps Location Button */}
      {/* Floating Google Maps Location Widget & Button */}
      <div className="fixed bottom-28 right-8 z-[999] flex flex-col items-end">
        <AnimatePresence>
          {isLocationWidgetOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3 w-[290px] bg-brand-navy/95 border border-brand-teal/30 rounded-3xl p-5 shadow-2xl text-cream flex flex-col gap-3.5 backdrop-blur-md glow-navy"
            >
              <div className="flex justify-between items-center border-b border-cream/10 pb-2">
                <h3 className="font-body text-[10px] font-black uppercase text-brand-teal tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Hospital Location
                </h3>
                <button 
                  onClick={() => setIsLocationWidgetOpen(false)} 
                  className="text-cream/40 hover:text-cream p-1 hover:bg-cream/5 rounded transition-all"
                  aria-label="Close Location Widget"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Haldwani Main Branch */}
              <div className="flex flex-col gap-1">
                <span className="font-black text-[9px] text-brand-teal uppercase tracking-widest">Haldwani Centre</span>
                <p className="text-cream/80 text-[11px] leading-tight font-lora">
                  Canal Road, Tikonia Circle, Haldwani, Nainital, Uttarakhand - 263139
                </p>
                <div className="flex gap-4 mt-1">
                  <a 
                    href="https://www.google.com/maps/place/Vedanta+Netralya+Haldwani/@29.2266568,79.5255779,642m/data=!3m1!1e3!4m10!1m2!2m1!1svedanta+netralya+haldwani!3m6!1s0x39a09b1779d2b223:0xccc4371f2e361808!8m2!3d29.2266493!4d79.5281364!15sChl2ZWRhbnRhIG5ldHJhbHlhIGhhbGR3YW5pkgEPZXllX2NhcmVfY2VudGVy4AEA!16s%2Fg%2F11n422c3lg!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[9px] tracking-wider uppercase font-black text-brand-teal hover:text-brand-teal-bright transition-colors"
                  >
                    Directions <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <span className="text-cream/20">|</span>
                  <a href="tel:05946223616" className="text-[9px] tracking-wider uppercase font-black text-cream/70 hover:text-brand-teal transition-colors">
                    Call Center
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsLocationWidgetOpen(!isLocationWidgetOpen)}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2.5 pr-4 md:p-3 md:pr-5 rounded-2xl shadow-2xl flex items-center gap-2 md:gap-3 border transition-all duration-300 w-[170px] md:w-[200px] select-none text-left ${
            isLocationWidgetOpen 
              ? 'bg-brand-teal text-brand-navy border-brand-teal glow-teal' 
              : 'bg-brand-navy/95 border-brand-teal/40 text-cream hover:bg-brand-teal hover:text-brand-navy hover:shadow-brand-teal/30'
          }`}
          title="Locations & Directions Widget"
          aria-label="Toggle Location Widget"
        >
          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
            isLocationWidgetOpen ? 'bg-brand-navy text-brand-teal' : 'bg-brand-teal/10 text-brand-teal'
          }`}>
            <MapPin className="w-4.5 h-4.5 md:w-5 md:h-5" />
          </div>
          <div className="min-w-0 flex flex-col leading-tight">
            <span className={`text-[7px] md:text-[8px] tracking-widest font-black uppercase ${
              isLocationWidgetOpen ? 'text-brand-navy/60' : 'text-brand-teal'
            }`}>
              Find Us
            </span>
            <span className="text-[10px] md:text-xs font-black uppercase font-body mt-0.5 truncate">
              Haldwani Centre
            </span>
            <span className={`text-[7px] md:text-[8px] font-medium block mt-0.5 ${
              isLocationWidgetOpen ? 'text-brand-navy/60' : 'text-cream/50'
            }`}>
              Directions & Info
            </span>
          </div>
        </motion.button>
      </div>

      {/* Floating Web-Speech AI Chatbot */}
      <Chatbot />

      {/* Visual Settings Sidebar Panel */}
      <AnimatePresence>
        {isEditMode && selectedElement && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-[140px] bottom-0 w-[380px] bg-brand-navy border-l border-brand-teal/20 shadow-2xl z-[990] flex flex-col select-text"
            style={{ height: 'calc(100vh - 140px)' }}
          >
            <SettingsSidebar />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ============================================================
   VISUAL EDITOR SIDEBAR
   ============================================================ */

const labelCls = 'block text-[10px] text-brand-teal uppercase font-black mb-1.5 font-body';
const textInputCls = 'w-full bg-cream/5 border border-cream/10 rounded-lg p-2 text-xs text-cream focus:outline-none focus:border-brand-teal';

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <label className={labelCls}>{label}</label>
    {children}
  </div>
);

// Website palette swatches — pick a colour used elsewhere on the site.
const Swatches: React.FC<{ active?: string; onPick: (v: string) => void }> = ({ active, onPick }) => (
  <div className="grid grid-cols-4 gap-1.5 mt-2">
    {WEBSITE_COLORS.map(color => {
      const isActive = (active || '').toLowerCase() === color.value.toLowerCase();
      return (
        <button
          key={color.name}
          onClick={() => onPick(color.value)}
          className={`flex flex-col items-center gap-1 rounded-lg p-1 transition-all ${isActive ? 'bg-brand-teal/20 ring-1 ring-brand-teal' : 'hover:bg-cream/5'}`}
          title={`${color.name} — ${color.value}`}
        >
          <span className={`w-full h-6 rounded-md border ${isActive ? 'border-brand-teal' : 'border-cream/20'}`} style={{ backgroundColor: color.value }} />
          <span className="text-[7px] leading-tight text-cream/60 text-center font-bold">{color.name}</span>
        </button>
      );
    })}
  </div>
);

// Colour control = native picker + hex field + website swatches.
const ColorControl: React.FC<{ label: string; value?: string; pickerFallback: string; onChange: (v: string) => void }> = ({ label, value, pickerFallback, onChange }) => (
  <Field label={label}>
    <div className="flex items-center gap-3">
      <input
        type="color"
        value={value || pickerFallback}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-10 bg-transparent border border-cream/20 cursor-pointer p-0 rounded-lg overflow-hidden flex-shrink-0"
      />
      <input
        type="text"
        value={value || ''}
        placeholder="inherit / default"
        onChange={(e) => onChange(e.target.value)}
        className={textInputCls}
      />
    </div>
    <Swatches active={value} onPick={onChange} />
  </Field>
);

// Generic preset-button row.
const Presets: React.FC<{ options: { name: string; val: string }[]; active?: string; onPick: (v: string) => void }> = ({ options, active, onPick }) => (
  <div className="flex gap-1.5 flex-wrap">
    {options.map(o => (
      <button
        key={o.name}
        onClick={() => onPick(o.val)}
        className={`px-2 py-1 text-[9px] font-bold rounded ${active === o.val ? 'bg-brand-teal text-brand-navy' : 'bg-cream/10 text-cream/70 hover:bg-cream/20'}`}
      >
        {o.name}
      </button>
    ))}
  </div>
);

const FONT_SIZES = [
  { name: 'XS', val: '0.875rem' },
  { name: 'S', val: '1rem' },
  { name: 'M', val: '1.25rem' },
  { name: 'L', val: '1.5rem' },
  { name: 'XL', val: '2rem' },
  { name: '2XL', val: '3rem' },
];

const FONT_FAMILIES = [
  { name: 'Lora', val: 'Lora, serif' },
  { name: 'Inter', val: 'Inter, sans-serif' },
  { name: 'Merriweather', val: 'Merriweather, serif' },
  { name: 'Default', val: '' },
];

const SettingsSidebar: React.FC = () => {
  const { selectedElement, selectElement, state, updateText, updateMedia, updateSection, updateCard, addTextBlock, deleteText } = useEdit();

  if (!selectedElement) return null;
  const { id, type } = selectedElement;
  const close = () => selectElement(null);

  // --- resolve current values (override > default) ---
  const sec = state.sections[id] || {};
  const secBg = sec.bgColor !== undefined ? sec.bgColor : (selectedElement.defaultBgColor || '');
  const secText = sec.textColor !== undefined ? sec.textColor : (selectedElement.defaultTextColor || '');

  const txt = state.texts[id] || {};
  const txtContent = txt.content !== undefined ? txt.content : (selectedElement.defaultText || '');
  const txtStyle = txt.style || {};

  const med = state.media[id] || {};
  const medSrc = med.src !== undefined ? med.src : (selectedElement.defaultSrc || '');

  const card = state.cards[id] || {};

  return (
    <div className="flex flex-col h-full text-cream">
      {/* Header */}
      <div className="p-4 border-b border-brand-teal/20 flex items-center justify-between">
        <div>
          <span className="text-[9px] text-brand-teal uppercase font-black tracking-widest font-body">{type} Editor</span>
          <h3 className="text-xs font-bold text-cream truncate max-w-[220px]" title={id}>{id}</h3>
        </div>
        <button onClick={close} className="p-1.5 text-cream/60 hover:text-cream hover:bg-cream/10 rounded-lg transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5">

        {/* ===== SECTION ===== */}
        {type === 'section' && (
          <>
            <ColorControl label="Background Colour" value={secBg} pickerFallback="#f5f1ea" onChange={(v) => updateSection(id, { bgColor: v })} />
            <ColorControl label="Text Colour" value={secText} pickerFallback="#0a2640" onChange={(v) => updateSection(id, { textColor: v })} />

            <Field label="Font Size">
              <div className="flex items-center gap-3">
                <input type="text" value={sec.fontSize || ''} placeholder="e.g. 1.1rem" onChange={(e) => updateSection(id, { fontSize: e.target.value })} className={`w-24 ${textInputCls}`} />
                <Presets options={FONT_SIZES} active={sec.fontSize} onPick={(v) => updateSection(id, { fontSize: v })} />
              </div>
            </Field>

            <Field label="Font Family">
              <Presets options={FONT_FAMILIES} active={sec.fontFamily} onPick={(v) => updateSection(id, { fontFamily: v })} />
            </Field>

            <div className="pt-4 border-t border-cream/10 space-y-3">
              <button onClick={() => addTextBlock(id)} className="w-full bg-brand-teal hover:bg-brand-teal-bright text-brand-navy font-black text-[10px] tracking-wider uppercase py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md">
                <Plus className="w-3.5 h-3.5" /> Add Text Block
              </button>
              <DeleteButton deleted={!!sec.deleted} label="Section" onToggle={() => updateSection(id, { deleted: !sec.deleted })} />
            </div>
          </>
        )}

        {/* ===== TEXT ===== */}
        {type === 'text' && (
          <>
            <Field label="Text Content">
              <textarea
                value={txtContent}
                onChange={(e) => updateText(id, { content: e.target.value })}
                rows={4}
                className="w-full bg-cream/5 border border-cream/10 rounded-xl p-3 text-xs text-cream focus:border-brand-teal focus:outline-none leading-relaxed"
              />
            </Field>

            <ColorControl label="Text Colour" value={txtStyle.color as string} pickerFallback="#0a2640" onChange={(v) => updateText(id, { style: { color: v } })} />

            <Field label="Font Size">
              <div className="flex items-center gap-3">
                <input type="text" value={(txtStyle.fontSize as string) || ''} placeholder="e.g. 1.25rem" onChange={(e) => updateText(id, { style: { fontSize: e.target.value } })} className={`w-24 ${textInputCls}`} />
                <Presets options={FONT_SIZES} active={txtStyle.fontSize as string} onPick={(v) => updateText(id, { style: { fontSize: v } })} />
              </div>
            </Field>

            <Field label="Font Family">
              <Presets options={FONT_FAMILIES} active={txtStyle.fontFamily as string} onPick={(v) => updateText(id, { style: { fontFamily: v } })} />
            </Field>

            <Field label="Font Weight">
              <Presets
                options={[
                  { name: 'Light', val: '300' },
                  { name: 'Normal', val: '400' },
                  { name: 'Medium', val: '500' },
                  { name: 'Bold', val: '700' },
                  { name: 'Black', val: '900' },
                ]}
                active={txtStyle.fontWeight as string}
                onPick={(v) => updateText(id, { style: { fontWeight: v } })}
              />
            </Field>

            <Field label="Alignment">
              <Presets
                options={[
                  { name: 'Left', val: 'left' },
                  { name: 'Center', val: 'center' },
                  { name: 'Right', val: 'right' },
                  { name: 'Justify', val: 'justify' },
                ]}
                active={txtStyle.textAlign as string}
                onPick={(v) => updateText(id, { style: { textAlign: v as any } })}
              />
            </Field>

            {id.startsWith('text-block-') && (
              <div className="pt-4 border-t border-cream/10">
                <button
                  onClick={() => { if (window.confirm('Delete this text block?')) deleteText(id); }}
                  className="w-full bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white font-black text-[10px] tracking-wider uppercase py-3 rounded-xl transition-all"
                >
                  Delete Text Block
                </button>
              </div>
            )}
          </>
        )}

        {/* ===== MEDIA ===== */}
        {type === 'media' && (
          <>
            <Field label="Source Link / Path">
              <input type="text" value={medSrc} onChange={(e) => updateMedia(id, { src: e.target.value })} className={textInputCls} />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Width">
                <input type="text" value={med.width || ''} placeholder="100% / 300px" onChange={(e) => updateMedia(id, { width: e.target.value })} className={textInputCls} />
              </Field>
              <Field label="Height">
                <input type="text" value={med.height || ''} placeholder="auto / 200px" onChange={(e) => updateMedia(id, { height: e.target.value })} className={textInputCls} />
              </Field>
            </div>

            <Field label="Corner Radius">
              <Presets
                options={[
                  { name: 'None', val: '0px' },
                  { name: 'S', val: '0.5rem' },
                  { name: 'M', val: '1rem' },
                  { name: 'L', val: '2rem' },
                  { name: 'Full', val: '9999px' },
                ]}
                active={med.borderRadius}
                onPick={(v) => updateMedia(id, { borderRadius: v })}
              />
            </Field>

            <Field label="Fit">
              <Presets
                options={[
                  { name: 'Cover', val: 'cover' },
                  { name: 'Contain', val: 'contain' },
                  { name: 'Fill', val: 'fill' },
                ]}
                active={med.objectFit}
                onPick={(v) => updateMedia(id, { objectFit: v })}
              />
            </Field>
          </>
        )}

        {/* ===== CARD ===== */}
        {type === 'card' && (
          <>
            <ColorControl label="Background Colour" value={card.bgColor} pickerFallback="#ffffff" onChange={(v) => updateCard(id, { bgColor: v })} />
            <ColorControl label="Text Colour" value={card.textColor} pickerFallback="#0a2640" onChange={(v) => updateCard(id, { textColor: v })} />

            <div className="grid grid-cols-2 gap-4">
              <Field label="Width">
                <input type="text" value={card.width || ''} placeholder="100% / 300px" onChange={(e) => updateCard(id, { width: e.target.value })} className={textInputCls} />
              </Field>
              <Field label="Height">
                <input type="text" value={card.height || ''} placeholder="auto / 400px" onChange={(e) => updateCard(id, { height: e.target.value })} className={textInputCls} />
              </Field>
            </div>

            <Field label="Corner Radius">
              <Presets
                options={[
                  { name: 'None', val: '0px' },
                  { name: 'S', val: '0.5rem' },
                  { name: 'M', val: '1rem' },
                  { name: 'L', val: '2rem' },
                ]}
                active={card.borderRadius}
                onPick={(v) => updateCard(id, { borderRadius: v })}
              />
            </Field>

            <div className="pt-4 border-t border-cream/10">
              <DeleteButton deleted={!!card.deleted} label="Card" onToggle={() => updateCard(id, { deleted: !card.deleted })} />
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-brand-teal/20 bg-brand-navy-deep flex items-center justify-end gap-2 text-cream">
        <button onClick={close} className="bg-brand-teal hover:bg-brand-teal-bright text-brand-navy px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all shadow-lg shadow-brand-teal/10">
          Done
        </button>
      </div>
    </div>
  );
};

const DeleteButton: React.FC<{ deleted: boolean; label: string; onToggle: () => void }> = ({ deleted, label, onToggle }) => (
  <button
    onClick={onToggle}
    className={`w-full font-black text-[10px] tracking-wider uppercase py-3 rounded-xl transition-all border ${
      deleted ? 'bg-green-500 border-green-500 hover:bg-green-600 text-white' : 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white'
    }`}
  >
    {deleted ? `Restore ${label}` : `Delete ${label}`}
  </button>
);

export default Layout;