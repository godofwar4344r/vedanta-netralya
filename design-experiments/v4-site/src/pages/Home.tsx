import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowUpRight, Eye, ChevronDown, Activity, Heart, Shield, Layers, Quote, Star, Scissors } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EditableContainer, EditableText, EditableMedia, EditableCard } from '../components/Editable';
import { useEdit } from '../context/EditContext';
import VisionSimulator from '../components/VisionSimulator';
import StickySpecialties from '../components/StickySpecialties';


// Assets
import heroEye3d from '../assets/hero-eye-3d.png';
import heroEyePrecision from '../assets/hero-eye-precision.png';
import drSameerVerma from '../assets/dr-sameer-verma.png';
import introVid from '../assets/intro-video.mp4';
import gallery3 from '../assets/gallery-3.png';

// Service Images
import serviceLasik from '../assets/service-lasik.png';
import serviceGlaucoma from '../assets/service-glaucoma.png';
import serviceRetina from '../assets/service-retina.png';
import servicePaediatric from '../assets/service-paediatric.png';
import serviceOculoplasty from '../assets/service-oculoplasty.png';
import serviceCataract from '../assets/service-cataract.png';

const Counter: React.FC<{ value: number; suffix?: string; duration?: number }> = ({ value, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = Math.max(Math.floor(totalMiliseconds / end), 16);
    
    let timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString('en-US')}{suffix}
    </span>
  );
};

const services = [
  {
    title: 'Femto-LASIK & SMILE',
    description: 'Ultra-precise vision correction lasers for absolute freedom from spectacles and contact lenses.',
    icon: <Eye className="w-6 h-6" />,
    path: '/lasik'
  },
  {
    title: 'Glaucoma Treatment & Laser',
    description: 'Intraocular pressure monitoring, selective laser therapy, and advanced micro-drainage implants.',
    icon: <Activity className="w-6 h-6" />,
    path: '/services'
  },
  {
    title: 'Retinal Care & Surgery',
    description: 'Comprehensive medical & surgical retina care for diabetic retinopathy, AMD, and retinal tears.',
    icon: <Layers className="w-6 h-6" />,
    path: '/services'
  },
  {
    title: 'Squint & Pediatric Ophthalmology',
    description: 'Specialized diagnostics, squint corrections, and child-friendly vision alignment therapies.',
    icon: <Heart className="w-6 h-6" />,
    path: '/contact'
  },
  {
    title: 'Dry Eye Treatment & Aesthetics',
    description: 'Intense Regulated Pulsed Light (IRPL) therapy and advanced ocular surface restoration.',
    icon: <Shield className="w-6 h-6" />,
    path: '/services'
  },
  {
    title: 'Oculoplasty & Lid Surgery',
    description: 'Eyelid reconstructions, tear duct lacrimal surgeries, and cosmetic blepharoplasty procedures.',
    icon: <Scissors className="w-6 h-6" />,
    path: '/oculoplasty-services'
  }
];

const faqs = [
  {
    question: 'What is the recovery time after Cataract Surgery?',
    answer: 'Most patients experience clearer vision within 24 to 48 hours. Complete stabilization of the eye and final prescription for reading glasses (if required) typically takes about 3 to 4 weeks. Standard activities can be resumed immediately, with minimal restrictions.'
  },
  {
    question: 'Is LASIK surgery painful, and how long does it take?',
    answer: 'LASIK is a virtually painless procedure. Anesthetic eye drops are used to numb the eyes, so you will only feel mild pressure. The actual laser treatment takes under 20-30 seconds per eye, and the entire procedure is completed in about 15 minutes.'
  },
  {
    question: 'What is the difference between standard and robotic laser Cataract surgery?',
    answer: 'Standard cataract surgery is performed manually using hand-held blades, whereas Robotic FLACS (Femtosecond Laser-Assisted Cataract Surgery) uses a computer-guided laser to make ultra-precise incisions, fragment the cataract, and correct astigmatism, leading to faster healing and better visual outcomes.'
  },
  {
    question: 'How often should I have a comprehensive eye check-up?',
    answer: 'For adults under 40 with no known vision issues, an exam every 2 years is recommended. After age 40, an annual exam is critical to screen for asymptomatic conditions like Glaucoma, Macular Degeneration, and Cataracts, which become more common with age.'
  },
  {
    question: 'Do you accept medical insurance for surgical procedures?',
    answer: 'Yes, Vedanta Netralya is empanelled with all major TPA insurance providers, corporate panels, and government health schemes. Our dedicated TPA desk helps you coordinate pre-authorization and cashless claims seamlessly.'
  }
];

const tpaPartners = [
  "Aditya Birla Health Insurance",
  "BSNL",
  "Uttarakhand Power Corporation",
  "Iffco Tokio",
  "Max Bupa",
  "FHPL",
  "Rohini Network",
  "Vision E-Medi Solutions",
  "Vidal Health Insurance",
  "Vipul Med Corp",
  "United Healthcare Parekh",
  "Universal Sompo",
  "Health India TPA",
  "Bharti AXA General",
  "Raksha Health Insurance",
  "New India Assurance",
  "ICICI Lombard",
  "Star Health",
  "Safeway Insurance",
  "Reliance Health",
  "Royal Sundaram",
  "Religare Health",
  "Rothshield Insurance",
  "Paramount Health",
  "Manipal Cigna",
  "Medi Assist",
  "Medsave Health",
  "Medicare Insurance",
  "Liberty General",
  "HDFC ERGO",
  "Genins",
  "Good Health Insurance",
  "FOCUS Health",
  "Future Generali",
  "Chola MS",
  "Bajaj Allianz",
  "Apollo Munich",
  "Anyuta TPA",
  "Alankit TPA"
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.02
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 12 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14 }
  }
};

const getHomeServiceImage = (index: number) => {
  switch (index) {
    case 0: return serviceLasik;
    case 1: return serviceGlaucoma;
    case 2: return serviceRetina;
    case 3: return servicePaediatric;
    case 4: return serviceOculoplasty;
    case 5: return serviceCataract;
    default: return serviceLasik;
  }
};

let hasPlayedIntroVideo = false;

const Home: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { scrollY } = useScroll();
  const widgetOpacity = useTransform(scrollY, [0, 150], [1, 0]);
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  const doctorOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenWidth < 768;
  const textY = useTransform(scrollY, [0, 300], [0, -50]);
  const textOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  // Intro Video States & Ref
  const [isVideoDone, setIsVideoDone] = useState(hasPlayedIntroVideo);
  const [introVideoReady, setIntroVideoReady] = useState(hasPlayedIntroVideo);
  const introVideoRef = useRef<HTMLVideoElement>(null);

  const { state, isEditMode, selectElement, selectedElement } = useEdit();
  const heroMedia = state.media['hero-doctor-portrait'] || {};
  const isSelected = selectedElement?.id === 'hero-doctor-portrait' && selectedElement?.type === 'media';
  const [isPortraitHovered, setIsPortraitHovered] = useState(false);

  const heroHeight = isMobile 
    ? (heroMedia.height || '46vh') 
    : (heroMedia.height || '58vh');
  const heroWidth = heroMedia.width || 'auto';
  const portraitSrc = heroMedia.src || drSameerVerma;

  const handleIntroVideoLoaded = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    video.currentTime = 3.0;
  };

  const handleIntroVideoSeeked = () => {
    setIntroVideoReady(true);
  };

  const handleIntroVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.currentTime >= 5.0) {
      video.pause();
      setIsVideoDone(true);
      hasPlayedIntroVideo = true;
    }
  };

  useEffect(() => {
    if (hasPlayedIntroVideo) return;
    // Fallback: If video is not ready after 3 seconds, fail gracefully to fallback image
    const timer = setTimeout(() => {
      if (!introVideoReady) {
        setIsVideoDone(true);
        hasPlayedIntroVideo = true;
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [introVideoReady]);





  const scrollToSimulator = () => {
    document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="overflow-hidden bg-transparent">

      {/* === HERO: Sticky Doctor Section === */}
      <div className="sticky top-0 h-[72vh] md:h-[80vh] overflow-hidden flex items-end justify-center z-10 w-full">

          {/* Soft radial glow behind doctor */}
          <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-0">
            <div className="w-[500px] h-[500px] rounded-full bg-brand-teal/6 blur-[100px] mb-0" />
          </div>

          {/* Doctor Portrait / Intro Video - centered, smooth cross-fade */}
          <motion.div 
            onMouseEnter={() => setIsPortraitHovered(true)}
            onMouseLeave={() => setIsPortraitHovered(false)}
            onClick={(e) => {
              if (!isEditMode) return;
              e.stopPropagation();
              selectElement({ id: 'hero-doctor-portrait', type: 'media', defaultSrc: drSameerVerma });
            }}
            style={{
              opacity: doctorOpacity,
              bottom: isMobile ? "0px" : "15px",
              height: heroHeight,
              width: heroWidth === 'auto' ? undefined : heroWidth,
              aspectRatio: heroWidth === 'auto' ? '682/1024' : undefined,
              scale: isMobile ? 1.0 : 1.34,
              x: isMobile ? "0px" : "4vw",
              originY: 1,
              originX: 0.5,
              outline: isEditMode ? (isSelected ? '3px solid #00abc0' : isPortraitHovered ? '2px dashed rgba(0,171,192,0.55)' : undefined) : undefined,
              outlineOffset: '2px',
              borderRadius: '16px',
              overflow: 'hidden'
            }}
            className={`absolute flex items-end justify-center z-10 ${
              isEditMode ? 'cursor-pointer pointer-events-auto' : 'pointer-events-none'
            }`}
          >
            {/* Intro Video plays first, then fades out smoothly to the identical fallback image */}
            <motion.video
              ref={introVideoRef}
              src={introVid}
              autoPlay
              muted
              playsInline
              onLoadedMetadata={handleIntroVideoLoaded}
              onSeeked={handleIntroVideoSeeked}
              onTimeUpdate={handleIntroVideoTimeUpdate}
              initial={{ opacity: 0 }}
              animate={{ opacity: !isVideoDone && introVideoReady ? 1 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover select-none z-20 pointer-events-none mix-blend-multiply"
              style={{
                scale: 1.0,
                originY: 1,
                originX: 0.5,
                filter: 'contrast(1.15) brightness(1.12) saturate(1.05)'
              }}
            />
            
            <motion.img
              src={portraitSrc}
              alt="Dr. Sameer Verma – Senior Eye Specialist"
              initial={{ opacity: 1 }}
              animate={{ opacity: isVideoDone || !introVideoReady ? 1 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover select-none z-10"
              style={{
                scale: 1.0,
                originY: 1,
                originX: 0.5,
                filter: 'contrast(1.15) brightness(1.12) saturate(1.05)'
              }}
            />

            {isEditMode && isSelected && (
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 bg-brand-teal text-brand-navy text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shadow-lg pointer-events-auto">
                Hero Doctor Portrait
              </span>
            )}
          </motion.div>

          {/* Floating Widget 1: Digital Eye Test — Right */}
          <motion.div
            style={{ opacity: widgetOpacity }}
            initial={{ opacity: 0, x: 70 }}
            animate={isVideoDone ? { opacity: 1, x: 0 } : { opacity: 0, x: 70 }}
            transition={{ delay: 0.1, duration: 0.7, type: 'spring', stiffness: 80 }}
            className="hidden md:block absolute right-[4%] sm:right-[6%] lg:right-[8%] top-[25%] z-20"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.06 }}
              className="bg-white/90 backdrop-blur-lg border border-brand-navy/8 p-3 rounded-2xl shadow-2xl flex items-center gap-3 cursor-pointer group w-[195px] select-none"
            >
              <Link to="/test-eye" className="flex items-center gap-3 w-full">
                <div className="w-11 h-11 rounded-xl overflow-hidden bg-brand-navy flex-shrink-0">
                  <img src={heroEyePrecision} alt="Digital Eye Test" className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] tracking-widest text-brand-teal font-black uppercase">Digital Test</p>
                  <p className="text-xs font-bold text-brand-navy">Eye Acuity Check</p>
                  <span className="text-[8px] text-brand-navy/45 font-medium block mt-0.5">2-Min Snellen Chart</span>
                </div>
              </Link>
            </motion.div>
          </motion.div>
 
          {/* Floating Widget 2: AI Vision Bot — Right */}
          <motion.div
            style={{ opacity: widgetOpacity }}
            initial={{ opacity: 0, x: 70 }}
            animate={isVideoDone ? { opacity: 1, x: 0 } : { opacity: 0, x: 70 }}
            transition={{ delay: 0.3, duration: 0.7, type: 'spring', stiffness: 80 }}
            className="hidden md:block absolute right-[4%] sm:right-[6%] lg:right-[8%] top-[45%] z-20"
          >
            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.06 }}
              className="bg-white/90 backdrop-blur-lg border border-brand-navy/8 p-3 rounded-2xl shadow-2xl flex items-center gap-3 cursor-pointer group w-[195px] select-none"
              onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
            >
              <div className="w-11 h-11 rounded-xl overflow-hidden bg-brand-navy flex-shrink-0 relative">
                <img src={heroEye3d} alt="AI Bot" className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-brand-teal/15 animate-pulse" />
              </div>
              <div className="min-w-0">
                <p className="text-[8px] tracking-widest text-brand-teal font-black uppercase">AI Vision Bot</p>
                <p className="text-xs font-bold text-brand-navy">Ocular Assistant</p>
                <span className="text-[8px] text-green-600 font-bold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" /> Online Now
                </span>
              </div>
            </motion.div>
          </motion.div>
 
          {/* Floating Widget 3: Sight Simulator — Right */}
          <motion.div
            style={{ opacity: widgetOpacity }}
            initial={{ opacity: 0, x: 70 }}
            animate={isVideoDone ? { opacity: 1, x: 0 } : { opacity: 0, x: 70 }}
            transition={{ delay: 0.5, duration: 0.7, type: 'spring', stiffness: 80 }}
            className="hidden md:block absolute right-[4%] sm:right-[6%] lg:right-[8%] top-[65%] z-20"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.06 }}
              className="bg-white/90 backdrop-blur-lg border border-brand-navy/8 p-3 rounded-2xl shadow-2xl flex items-center gap-3 cursor-pointer group w-[195px] select-none"
              onClick={scrollToSimulator}
            >
              <div className="w-11 h-11 rounded-xl overflow-hidden bg-brand-navy flex-shrink-0">
                <img src={heroEyePrecision} alt="Sight Simulator" className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="min-w-0">
                <p className="text-[8px] tracking-widest text-brand-teal font-black uppercase">Vision Simulator</p>
                <p className="text-xs font-bold text-brand-navy">See Like Patients</p>
                <span className="text-[8px] text-brand-navy/45 font-medium block mt-0.5">5 Eye Conditions</span>
              </div>
            </motion.div>
          </motion.div>

          {/* "The Clarity You Deserve." — scroll responsive alignment */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVideoDone ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: textY, opacity: textOpacity }}
            className="absolute bottom-[10%] left-[4%] sm:left-[8%] lg:left-[10%] z-30 pointer-events-none select-none w-max max-w-[78vw] sm:max-w-[45vw]"
          >
            <h1 className="leading-[0.95] text-left">
              <motion.span 
                initial={{ opacity: 0, y: 40 }}
                animate={isVideoDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.9, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-brand-navy"
                style={{ fontFamily: 'var(--font-body, serif)' }}
              ><EditableText id="hero-title-main">The Clarity</EditableText></motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 40 }}
                animate={isVideoDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.9, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
                className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic font-light text-brand-teal"
                style={{ fontFamily: "'General Sans', sans-serif" }}
              ><EditableText id="hero-title-sub">You Deserve.</EditableText></motion.span>
            </h1>
          </motion.div>

          {/* Scroll cue arrow at bottom */}
          <motion.div
            style={{ opacity: scrollIndicatorOpacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5"
          >
            <span className="text-[8px] tracking-[0.35em] uppercase text-brand-navy/30 font-black">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-4 h-4 text-brand-navy/30" />
            </motion.div>
          </motion.div>

      </div>

      {/* Content sections scroll UP over the pinned doctor */}
      <div className="relative z-40 bg-cream" style={{ marginTop: isMobile ? '-12px' : '-32px' }}>

      {/* === STATS COUNTER SECTION === */}
      <EditableContainer id="stats-counter">
        <section className="pt-8 pb-16 bg-cream relative z-10">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {[
                { value: 18, suffix: '+', label: 'Years Of Experience' },
                { value: 25000, suffix: '+', label: 'Successful Eye Surgeries' },
                { value: 120000, suffix: '+', label: 'Patients Treated' },
                { value: 25, suffix: '+', label: 'Publications' }
              ].map((item, idx) => (
                <EditableCard key={idx} id={`stat-card-${idx}`} className="h-full">
                  <div 
                    className="bg-white border-2 border-brand-navy rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,30,60,0.95)] hover:shadow-[2px_2px_0px_0px_rgba(0,30,60,0.95)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 flex flex-col justify-center items-center h-full"
                  >
                    <h3 className="text-3xl md:text-4xl font-black text-brand-navy mb-2">
                      <Counter value={item.value} suffix={item.suffix} />
                    </h3>
                    <p className="text-[9px] tracking-[0.15em] uppercase text-brand-navy/60 font-black leading-tight">
                      <EditableText id={`stat-label-${idx}`}>{item.label}</EditableText>
                    </p>
                  </div>
                </EditableCard>
              ))}
            </div>
          </div>
        </section>
      </EditableContainer>

      {/* === ABOUT HOSPITAL & HISTORY SECTION === */}
      <EditableContainer id="about-hospital-legacy">
        <section className="py-24 bg-cream relative z-10">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              {/* Left: Legacy Image */}
              <div className="lg:col-span-5 rounded-[2.5rem] overflow-hidden shadow-2xl relative group max-h-[500px]">
                <EditableMedia
                  id="about-legacy-image"
                  src={gallery3}
                  alt="Vedanta Netralya Legacy & Clinical Care"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-brand-navy/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
              </div>

              {/* Right: Hospital History Content */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <p className="text-brand-teal text-[10px] tracking-[0.3em] uppercase font-black mb-2">Our Heritage</p>
                <h2 className="section-text text-brand-navy">
                  <EditableText id="about-legacy-title-1">A Legacy of</EditableText><br />
                  <span className="italic font-light text-brand-teal" style={{ fontFamily: "'General Sans', sans-serif" }}>
                    <EditableText id="about-legacy-title-2">Ocular Excellence.</EditableText>
                  </span>
                </h2>
                <p className="text-lg text-brand-navy/70 font-lora leading-relaxed">
                  <EditableText id="about-legacy-desc-1">Founded in 2003, Vedanta Netralya has evolved from a premier local eye clinic into North India's elite super-specialty eye care institute. Driven by the mission of providing ethical, world-class ophthalmic care, we have introduced robotic laser systems, high-definition diagnostics, and advanced micro-surgical wings to restore visual clarity.</EditableText>
                </p>
                <p className="text-base text-brand-navy/60 font-lora leading-relaxed">
                  <EditableText id="about-legacy-desc-2">Under the leadership of a team of ophthalmic experts Dr. R.J.K. Singh, Dr. Sameer Varma, and Dr. Kanhaiya Mittal, the hospital strives to provide premium and comprehensive eye care. Vedanta Netralya is a newly built, air-conditioned hospital which is a leading eye hospital in the Kumaun region of Uttarakhand.</EditableText>
                </p>
              </div>
            </div>
          </div>
        </section>
      </EditableContainer>

      {/* === MARQUEE SPECIALTIES === */}
      <EditableContainer id="marquee-specialties">
        <div className="bg-brand-navy py-6 overflow-hidden relative z-10">
          <div className="flex marquee-track whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-16 mr-16">
                {['CATARACT', 'LASIK', 'CORNEA', 'PEDIATRIC', 'OCULOPLASTY', 'RETINA', 'GLAUCOMA'].map((item, j) => (
                  <div key={j} className="flex items-center gap-16">
                    <span className="text-cream text-2xl font-black tracking-wider">{item}</span>
                    <span className="text-brand-teal text-xl">✦</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </EditableContainer>

      {/* === SPECIALTIES SECTION === */}
      <EditableContainer id="specialties-wing">
        <StickySpecialties />
      </EditableContainer>

      {/* === OUR SERVICES GRID SECTION === */}
      <EditableContainer id="services-grid-home">
        <section id="services" className="py-24 bg-brand-navy text-cream relative z-10 border-t border-cream/5 overflow-hidden">
          {/* Decorative Background Glows for Glassmorphism */}
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-teal/10 rounded-full blur-[120px] pointer-events-none z-0" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-brand-teal/5 rounded-full blur-[150px] pointer-events-none z-0" />

          <div className="max-w-[1800px] mx-auto px-6 lg:px-16 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block w-5 h-px bg-brand-teal opacity-60" />
                  <span className="text-brand-teal text-[10px] tracking-[0.36em] uppercase font-black">
                    <EditableText id="services-eyebrow">Our Services</EditableText>
                  </span>
                </div>
                <h2 className="section-text">
                  <EditableText id="services-title-1">World-Class</EditableText> <br/>
                  <span className="italic font-light text-brand-teal" style={{ fontFamily: "'General Sans', sans-serif" }}>
                    <EditableText id="services-title-2">Clinical Specialties.</EditableText>
                  </span>
                </h2>
              </div>
              <Link
                to="/services"
                className="hidden md:inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-black text-cream/60 hover:text-brand-teal transition-colors border border-cream/15 hover:border-brand-teal/40 rounded-full px-5 py-3 mb-1 flex-shrink-0"
              >
                View All Services
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service, index) => (
                <EditableCard key={index} id={`service-card-${index}`} className="h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="bg-brand-navy-deep/40 backdrop-blur-md border border-cream/10 hover:border-brand-teal/40 rounded-[2rem] flex flex-col justify-between group transition-all duration-300 relative overflow-hidden shadow-lg h-full"
                  >
                    {/* Background glow on hover */}
                    <div className="absolute -right-20 -top-20 w-40 h-40 bg-brand-teal/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    {/* Top Image Container */}
                    <div className="relative h-48 w-full overflow-hidden rounded-t-[2rem]">
                      <EditableMedia
                        id={`home-service-image-${index}`}
                        src={getHomeServiceImage(index)}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent opacity-80 pointer-events-none" />
                      <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-brand-navy/80 backdrop-blur-md border border-cream/10 flex items-center justify-center text-brand-teal pointer-events-none">
                        {service.icon}
                      </div>
                    </div>

                    {/* Content Container */}
                    <div className="p-6 lg:p-8 flex flex-col flex-grow justify-between">
                      <div>
                        <h3 className="text-xl font-black text-cream mb-3">
                          <EditableText id={`service-item-title-${index}`}>{service.title}</EditableText>
                        </h3>
                        <p className="text-xs font-lora text-cream/60 leading-relaxed mb-6">
                          <EditableText id={`service-item-desc-${index}`}>{service.description}</EditableText>
                        </p>
                      </div>

                      <Link 
                        to={service.path}
                        className="inline-flex items-center gap-2 text-[10px] tracking-wider uppercase font-black text-black hover:text-brand-navy transition-colors mt-auto border-t border-brand-navy/10 pt-4 w-full"
                      >
                        <EditableText id={`service-item-link-${index}`}>Learn More</EditableText> 
                        <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                      </Link>
                    </div>
                  </motion.div>
                </EditableCard>
              ))}
            </div>
          </div>
        </section>
      </EditableContainer>

      {/* === EMBEDDED VISION SIMULATOR === */}
      <EditableContainer id="vision-simulator-home">
        <section id="simulator" className="py-24 bg-cream relative z-10 border-t border-brand-navy/5">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
            <VisionSimulator />
          </div>
        </section>
      </EditableContainer>

      {/* === FAQ ACCORDION SECTION === */}
      <EditableContainer id="faq-home">
        <section className="py-24 bg-cream-dark relative z-10 border-t border-brand-navy/5">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Left Column: Image & Decorative Text */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-brand-teal text-[10px] tracking-[0.3em] uppercase font-black">
                      <EditableText id="faq-eyebrow">Support Desk</EditableText>
                    </span>
                  </div>
                  <h2 className="section-text text-brand-navy">
                    <EditableText id="faq-title-1">Frequently Asked</EditableText> <br />
                    <span className="italic font-light text-brand-teal" style={{ fontFamily: "'General Sans', sans-serif" }}>
                      <EditableText id="faq-title-2">Questions.</EditableText>
                    </span>
                  </h2>
                </div>
              </div>

              {/* Right Column: Accordion */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div 
                      key={index}
                      className="border-b border-brand-navy/10 transition-colors duration-300"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full py-6 flex items-center justify-between text-left group"
                      >
                        <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${
                          isOpen ? 'text-brand-teal' : 'text-brand-navy group-hover:text-brand-teal'
                        }`}>
                          <EditableText id={`faq-question-${index}`}>{faq.question}</EditableText>
                        </span>
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                          isOpen 
                            ? 'bg-brand-navy border-brand-navy text-brand-teal rotate-180' 
                            : 'border-brand-navy/20 text-brand-navy group-hover:border-brand-teal'
                        }`}>
                          <ChevronDown className="w-4 h-4" />
                        </span>
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="pb-6 pr-6 text-brand-navy/70 text-sm md:text-base font-lora leading-relaxed">
                              <EditableText id={`faq-answer-${index}`}>{faq.answer}</EditableText>
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
              
            </div>
          </div>
        </section>
      </EditableContainer>

      {/* === TPA & INSURANCE PARTNERS === */}
      <EditableContainer id="tpa-partners-section">
        <section className="py-24 bg-white relative z-10 border-t border-brand-navy/5 shadow-sm overflow-hidden">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 font-body">
                <EditableText id="tpa-eyebrow">Cashless Panels</EditableText>
              </p>
              <h2 className="section-text text-brand-navy mb-6 font-body">
                <EditableText id="tpa-title">Our Cashless TPA / Insurance Partners</EditableText>
              </h2>
              <p className="text-base text-brand-navy/60 font-lora">
                <EditableText id="tpa-desc">We accept cashless surgery pre-authorizations and cards from more than 40 leading TPAs and insurers.</EditableText>
              </p>
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            >
              {tpaPartners.map((partner, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.06, 
                    y: -6, 
                    borderColor: 'rgba(0, 171, 192, 0.5)',
                    boxShadow: '0 15px 30px rgba(0, 171, 192, 0.12)',
                    backgroundColor: '#ffffff'
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="border border-brand-navy/10 rounded-2xl p-4 text-xs font-bold text-brand-navy bg-cream/10 flex items-center justify-center gap-3 min-h-[70px] shadow-sm cursor-pointer select-none transition-colors duration-200"
                >
                  <Shield className="w-3.5 h-3.5 text-brand-teal/70 flex-shrink-0" />
                  <span className="text-center leading-tight">{partner}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </EditableContainer>

      {/* === TESTIMONIALS SECTION === */}
      <EditableContainer id="testimonials-home">
        <section className="py-24 bg-cream-dark relative z-10 border-t border-brand-navy/5">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 font-body">
                <EditableText id="testimonial-eyebrow">Patient Chronicles</EditableText>
              </p>
              <h2 className="section-text text-brand-navy mb-6 font-body">
                <EditableText id="testimonial-title">Patient Stories</EditableText>
              </h2>
              <p className="text-base text-brand-navy/60 font-lora">
                <EditableText id="testimonial-desc">Hear from patients who restored their visual clarity and spectacles-free freedom through our clinical experts.</EditableText>
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Rajesh Singhal',
                  location: 'Haldwani, Nainital',
                  treatment: 'Robotic FLACS Cataract Surgery',
                  quote: "My cataract surgery at Vedanta Netralya was completely painless. I was back home within hours, and the next morning my vision was perfectly clear. Dr. Sameer Varma explained the premium multifocal lens option beautifully.",
                  rating: 5
                },
                {
                  name: 'Priyanka Sharma',
                  location: 'Kichha, Udham Singh Nagar',
                  treatment: 'Femto-LASIK Vision Correction',
                  quote: "Getting rid of my specs after 12 years feels like a miracle! The bladeless LASIK procedure took less than 15 minutes. Dr. Sameer Varma's expertise and the state-of-the-art Carl Zeiss laser made me feel extremely safe.",
                  rating: 5
                },
                {
                  name: 'Harbhajan Singh',
                  location: 'Tallital, Nainital',
                  treatment: 'Glaucoma Management & Laser',
                  quote: "I was diagnosed with high intraocular pressure. The selective laser trabeculoplasty (SLT) therapy did not hurt at all and successfully reduced my pressure, preserving my vision. Extremely grateful to Dr. Kanhaiya Mittal.",
                  rating: 5
                }
              ].map((rev, i) => (
                <EditableCard key={i} id={`testimonial-card-${i}`} className="h-full">
                  <div
                    className="bg-brand-navy text-cream rounded-[2.5rem] p-8 border border-cream/5 shadow-xl flex flex-col justify-between relative overflow-hidden h-full"
                  >
                    <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-brand-teal/5 blur-xl" />
                    
                    <div>
                      <Quote className="w-10 h-10 text-brand-teal/30 mb-6" />
                      <div className="flex gap-1 mb-4">
                        {[...Array(rev.rating)].map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 fill-brand-teal-bright text-brand-teal-bright" />
                        ))}
                      </div>
                      <p className="text-sm text-cream/80 font-lora leading-relaxed mb-8">
                        <EditableText id={`testimonial-quote-${i}`}>{`"${rev.quote}"`}</EditableText>
                      </p>
                    </div>

                    <div className="border-t border-cream/10 pt-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-sm text-cream font-body">
                          <EditableText id={`testimonial-name-${i}`}>{rev.name}</EditableText>
                        </h3>
                        <p className="text-[10px] text-cream/50 tracking-wider font-lora">
                          <EditableText id={`testimonial-location-${i}`}>{rev.location}</EditableText>
                        </p>
                      </div>
                      <span className="text-[9px] tracking-wider uppercase text-brand-teal font-black bg-brand-teal/10 px-3 py-1 rounded-full border border-brand-teal/20">
                        {rev.treatment.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                </EditableCard>
              ))}
            </div>
          </div>
        </section>
      </EditableContainer>

      {/* === CALL TO ACTION === */}
      <EditableContainer id="cta-section">
        <section className="py-24 bg-transparent text-center relative z-10">
          <div className="max-w-4xl mx-auto px-6">
            <p className="text-brand-teal text-[10px] tracking-[0.5em] uppercase mb-8 font-black">
              <EditableText id="cta-eyebrow">Your Vision Awaits</EditableText>
            </p>
            <h2 className="section-text text-brand-navy mb-8">
              <EditableText id="cta-title-1">The Clarity</EditableText> <br />
              <span className="italic font-light text-brand-teal" style={{ fontFamily: "'General Sans', sans-serif" }}>
                <EditableText id="cta-title-2">You Deserve.</EditableText>
              </span>
            </h2>
            <Link to="/appointment" className="group inline-flex items-center gap-4 bg-brand-navy text-cream hover:bg-brand-teal hover:text-brand-navy px-8 py-5 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all shadow-xl">
              <EditableText id="cta-button-text">Begin Your Consultation</EditableText>
              <span className="w-8 h-8 rounded-full bg-brand-teal text-brand-navy group-hover:bg-cream group-hover:text-brand-navy flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </section>
      </EditableContainer>
      </div>{/* end of z-40 content overlay wrapper */}
    </div>
  );
};

export default Home;
