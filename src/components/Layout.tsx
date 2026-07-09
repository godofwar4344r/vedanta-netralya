import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, MapPin, ArrowUpRight, Phone, Calendar } from 'lucide-react';
import Logo from './Logo';
import BackgroundEye from './BackgroundEye';
import Chatbot from './Chatbot';
import Footer from './Footer';
import { useEdit } from '../context/EditContext';

const Layout: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isLocationWidgetOpen, setIsLocationWidgetOpen] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= 768
  );
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { isEditMode } = useEdit();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const locationCard = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 15 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="w-full md:w-[290px] bg-brand-navy/95 border border-brand-teal/30 rounded-3xl p-5 shadow-2xl text-cream flex flex-col gap-3.5 backdrop-blur-md glow-navy"
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
          Nawabi Rd, near DPS Junior School, Subhash Nagar, Haldwani, Uttarakhand 263139
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
  );

  return (
    <div className="relative min-h-screen bg-cream text-brand-navy selection:bg-brand-navy selection:text-cream flex flex-col overflow-x-hidden font-body">


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
            <Link to="/prevention" className={`hover:text-brand-teal transition-colors font-black ${location.pathname === '/prevention' ? 'text-brand-teal font-black' : 'text-brand-teal'}`}>Eye Prevention</Link>
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
              <Link to="/prevention" onClick={() => setIsMobileMenuOpen(false)} className={`text-brand-teal font-black ${location.pathname === '/prevention' ? 'underline' : ''}`}>Eye Prevention</Link>
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
      <main className="flex-grow pt-[80px] z-10 relative">
        <Outlet />
      </main>

      {/* === FOOTER === */}
      <Footer />

      {/* Mobile Location Popover (opens from bottom nav Location button) */}
      <div className="md:hidden fixed bottom-24 left-4 right-4 z-[998]">
        <AnimatePresence>
          {isMobile && isLocationWidgetOpen && locationCard}
        </AnimatePresence>
      </div>

      {/* Floating Google Maps Location Widget & Button */}
      <div className="hidden md:flex fixed bottom-28 right-8 z-[999] flex-col items-end gap-3">
        <AnimatePresence>
          {isLocationWidgetOpen && locationCard}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsLocationWidgetOpen(!isLocationWidgetOpen)}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          layout
          className={`p-2.5 md:p-3 rounded-2xl shadow-2xl flex items-center gap-2 md:gap-3 border transition-all duration-300 select-none text-left ${
            isLocationWidgetOpen 
              ? 'bg-brand-teal text-brand-navy border-brand-teal glow-teal' 
              : 'bg-brand-navy/95 border-brand-teal/40 text-cream hover:bg-brand-teal hover:text-brand-navy hover:shadow-brand-teal/30'
          } ${(isMobile || isScrolled) ? 'w-10 h-10 md:w-12 md:h-12 justify-center p-0 rounded-full' : 'w-[170px] md:w-[200px] pr-4 md:pr-5'}`}
          title="Locations & Directions Widget"
          aria-label="Toggle Location Widget"
        >
          <div className={`rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
            isLocationWidgetOpen ? 'bg-brand-navy text-brand-teal' : 'bg-brand-teal/10 text-brand-teal'
          } ${(isMobile || isScrolled) ? 'w-8 h-8 md:w-10 md:h-10 rounded-full' : 'w-8 h-8 md:w-10 md:h-10'}`}>
            <MapPin className="w-4.5 h-4.5 md:w-5 md:h-5" />
          </div>
          {!(isMobile || isScrolled) && (
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="min-w-0 flex flex-col leading-tight"
            >
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
            </motion.div>
          )}
        </motion.button>

        {/* WhatsApp Support Floating Widget */}
        <motion.a
          href="https://wa.me/919068561971"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          layout
          className={`p-2.5 md:p-3 rounded-2xl shadow-2xl flex items-center gap-2 md:gap-3 border border-emerald-500/20 bg-brand-navy/95 text-cream hover:bg-emerald-600 hover:text-white hover:border-emerald-500 transition-all duration-300 select-none text-left glow-emerald ${
            (isMobile || isScrolled) ? 'w-10 h-10 md:w-12 md:h-12 justify-center p-0 rounded-full' : 'w-[170px] md:w-[200px] pr-4 md:pr-5'
          }`}
          title="WhatsApp Support"
        >
          <div className={`rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-500/10 text-emerald-400 relative ${
            (isMobile || isScrolled) ? 'w-8 h-8 md:w-10 md:h-10 rounded-full' : 'w-8 h-8 md:w-10 md:h-10'
          }`}>
            <svg className="w-4.5 h-4.5 md:w-5 md:h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.578 3.98 14.106 2.957 11.48 2.956c-5.44 0-9.866 4.372-9.87 9.802 0 1.634.428 3.234 1.239 4.646l-.99 3.616 3.798-.986zM17.15 14.74c-.285-.141-1.676-.816-1.936-.91-.26-.094-.45-.141-.64.141-.19.283-.735.91-.9 1.1-.165.19-.33.21-.615.07-.285-.141-1.2-.437-2.286-1.395-.845-.744-1.663-1.663-1.58-1.945-.165-.282-.018-.434.124-.574.127-.127.285-.33.428-.495.143-.165.19-.282.285-.47.095-.188.047-.353-.024-.494-.07-.142-.64-1.525-.877-2.09-.23-.554-.464-.48-.64-.488-.166-.008-.356-.01-.546-.01-.19 0-.5.07-.76.353-.26.283-1 .966-1 2.359s1.01 2.735 1.15 2.922c.14.188 1.986 2.993 4.81 4.197.67.285 1.2.456 1.61.584.673.21 1.285.18 1.768.109.54-.08 1.676-.676 1.916-1.33.24-.654.24-1.216.168-1.33-.072-.114-.265-.184-.55-.325z"/>
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          {!(isMobile || isScrolled) && (
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="min-w-0 flex flex-col leading-tight"
            >
              <span className="text-[7px] md:text-[8px] tracking-widest font-black uppercase text-emerald-400">
                WhatsApp Support
              </span>
              <span className="text-[10px] md:text-xs font-black uppercase font-body mt-0.5 truncate text-white">
                Direct Help Desk
              </span>
              <span className="text-[7px] md:text-[8px] font-medium block mt-0.5 text-cream/50">
                Chat With Us Now
              </span>
            </motion.div>
          )}
        </motion.a>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-6 left-4 right-4 z-[999] md:hidden bg-brand-navy/95 border border-brand-teal/20 rounded-full p-2 flex items-center justify-between shadow-2xl backdrop-blur-md shadow-brand-teal/5">
        {/* Helpline */}
        <a 
          href="tel:05946223616" 
          className="flex flex-col items-center justify-center flex-1 py-1 text-cream/70 active:text-brand-teal hover:text-brand-teal transition-colors"
        >
          <Phone className="w-5 h-5 mb-0.5 text-cream/80" />
          <span className="text-[8px] tracking-wider uppercase font-black font-body">Helpline</span>
        </a>

        {/* BOOK Button */}
        <Link 
          to="/appointment" 
          className="flex items-center justify-center gap-2 bg-red-600 active:bg-red-700 text-white font-black text-[11px] tracking-widest uppercase px-6 py-3.5 rounded-full shadow-lg transition-all transform active:scale-95 flex-shrink-0"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>BOOK</span>
        </Link>

        {/* Location */}
        <button 
          onClick={() => setIsLocationWidgetOpen(!isLocationWidgetOpen)}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            isLocationWidgetOpen ? 'text-brand-teal' : 'text-cream/70 active:text-brand-teal hover:text-brand-teal'
          }`}
        >
          <MapPin className="w-5 h-5 mb-0.5" />
          <span className="text-[8px] tracking-wider uppercase font-black font-body">Location</span>
        </button>
      </div>

      {/* Floating Web-Speech AI Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Layout;