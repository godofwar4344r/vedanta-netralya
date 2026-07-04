import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowUpRight, Plus, Eye, Sparkles, ChevronDown, Activity, Heart, Shield, Layers, Quote, Star, Scissors, MapPin, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EditableContainer, EditableText, EditableMedia, EditableCard } from '../components/Editable';
import { useEdit } from '../context/EditContext';
import VisionSimulator from '../components/VisionSimulator';


// Assets
import heroEye3d from '../assets/hero-eye-3d.png';
import heroEyePrecision from '../assets/hero-eye-precision.png';
import drSameerVerma from '../assets/dr-sameer-verma.png';
import introVid from '../assets/intro-video.mp4';
import hospitalFacade from '../assets/hospital-facade.jpeg';

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
    title: 'Cataract & Refractive Surgery',
    description: 'Advanced micro-incision cataract removal and modern laser vision correction for spectacle-free clarity.',
    icon: <Eye className="w-6 h-6" />,
    path: '/refractive-surgery'
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
    question: 'What is lasik surgery & is it necessary for myopia ?',
    answer: 'LASIK (Laser-Assisted in Situ Keratomileusis) is an advanced vision correction procedure that reshapes the cornea to fix refractive errors. It is NOT medically necessary for myopia, but is a highly popular elective option for patients who want to reduce or eliminate their dependence on eyeglasses or contact lenses.'
  },
  {
    question: 'What is Micro-Incision Cataract Surgery (MICS) and how does it compare to older methods?',
    answer: 'Older manual cataract surgery methods involved larger incisions and stitches. Modern Micro-Incision Cataract Surgery (MICS) uses high-frequency ultrasound energy (Phacoemulsification) to gently dissolve the cloudy lens through a tiny 1.8mm self-healing incision. It is completely sutureless, painless, and allows quick recovery in under 24 hours.'
  },
  {
    question: 'How often should I have a comprehensive eye check-up?',
    answer: 'For adults under 40 with no known vision issues, an exam every 2 years is recommended. After age 40, an annual exam is critical to screen for asymptomatic conditions like Glaucoma, Macular Degeneration, and Cataracts, which become more common with age.'
  },
  {
    question: 'Do you accept medical insurance for surgical procedures?',
    answer: 'Yes, Vedanta Netralya is empanelled with all major TPA insurance providers, corporate panels, and government health schemes. Our dedicated TPA desk helps you coordinate pre-authorization and cashless claims seamlessly (including coverage for cataract, glaucoma, retina surgeries, and refractive procedures like Femto-LASIK as per policy terms).'
  },
  {
    question: 'Why is preventive eye screening important even if my vision feels perfect?',
    answer: 'Many serious eye conditions, such as Glaucoma (often called the silent thief of sight) and early diabetic retinopathy, develop gradually without any pain or noticeable warning signs. By the time vision loss is felt, permanent damage has occurred. Routine screening catches these conditions early when they are highly treatable.'
  },
  {
    question: 'What is the best way to prevent digital eye strain during long screen hours?',
    answer: 'Protect your eyes by practicing the 20-20-20 rule: every 20 minutes, take a 20-second break and look at something 20 feet away. Additionally, maintain proper monitor distance, use anti-glare screen filters, ensure adequate room lighting, and schedule annual preventive eye check-ups to monitor strain indicators.'
  }
];

const tpaPartners = [
  "Aditya Birla Health Insurance Company Limited",
  "Max/Niva Bupa Health Insurance",
  "Vidal Health Insurance TPA Pvt. Ltd.",
  "United Healthcare Prekh Insurance TPA Pvt. Ltd.",
  "Raksha Health Insurance TPA Pvt. Ltd.",
  "Royal Sundaram General Insurance Co. Ltd.",
  "Rothshield Insurance TPA Ltd.",
  "Paramount Health services & Insurance TPA Pvt. Ltd.",
  "Medi Assist Insurance TPA Pvt. Ltd.",
  "Medicare Insurance TPA services (India) Pvt.",
  "ICICI Lombard General Insurance Ltd.",
  "Health Insurance TPA of India Ltd.",
  "Genins India Insurance Co. Ltd.",
  "FOCUS Health Insurance TPA Ltd.",
  "Chola MS General Insurance",
  "Apollo Munich Health Insurance Company Ltd.",
  "Alankit TPA",
  "Iffco Tokio General Insurance",
  "FHPL",
  "Vision E-Medi Solutions Insurance TPA Pvt. Ltd.",
  "Vipul Med Crop Insurance TPA Pvt. Ltd.",
  "Universal Sompo",
  "Star Health and Allied Insurance Co. Ltd.",
  "Safeway Insurance TPA Pvt. Ltd.",
  "Reliance Health Insurance Ltd.",
  "Religare Health Insurance Company Ltd.",
  "Mahipal Cigna TTK Health Insurance Co. Ltd.",
  "Medsave Health Insurance (TPA) Ltd.",
  "Liberty General Insurance Ltd.",
  "Health India TPA",
  "HDFC ERGO General Insurance Company Ltd.",
  "Good Health Insurance TPA Ltd.",
  "Future Generali Insurance",
  "Bajaj Allianz General Insurance",
  "Anyuta TPA in Healthcare(Pvt.) Ltd.",
  "Tri-partite Addendum with Health India TPA & Bharti AXA General",
  "Tri-partite Addendum with ICICI Lombard & Vidal Health Insurance TPA",
  "Tri-partite Addendum with Raksha Health Insurance TPA Pvt. Ltd. & The New India Assurance Co. Ltd.",
  "BSNL",
  "Uttarakhand Power Corporation",
  "Rohini Network"
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
  const [activeSpec, setActiveSpec] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showPromoModal, setShowPromoModal] = useState(false);

  useEffect(() => {
    const hasSeenPromo = sessionStorage.getItem('hasSeenWednesdayPromo_2026');
    if (!hasSeenPromo) {
      const timer = setTimeout(() => {
        setShowPromoModal(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePromoModal = () => {
    setShowPromoModal(false);
    sessionStorage.setItem('hasSeenWednesdayPromo_2026', 'true');
  };

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
  const isTabletOrMobile = screenWidth < 1024;
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
    video.currentTime = 0.0;
  };

  const handleIntroVideoSeeked = () => {
    setIntroVideoReady(true);
  };

  const handleIntroVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.currentTime >= 2.0) {
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



  const specialties = [
    { 
      title: 'Cataract Surgery', 
      num: '01',
      tag: 'Advanced Micro-Incision',
      stat: '50k+',
      statLabel: 'Lens Implants',
      desc: 'Premium micro-incision phacoemulsification with foldable IOL technology. Recovery within 24 hours.',
      icon: <Sparkles className="w-8 h-8" />,
      path: '/cataract'
    },
    { 
      title: 'Retina & Vitreous', 
      num: '02',
      tag: 'Vitreoretinal Specialty',
      stat: '2000+',
      statLabel: 'Retina Surgeries',
      desc: 'Specialized medical and surgical retinal care for diabetic retinopathy, macular degeneration, and retinal detachment.',
      icon: <Layers className="w-8 h-8" />,
      path: '/retina-services'
    },
    { 
      title: 'Glaucoma Management', 
      num: '03',
      tag: 'Intraocular Pressure Control',
      stat: '7000+',
      statLabel: 'Glaucoma Patients',
      desc: 'Advanced diagnostic imaging, micro-shunts, and selective laser trabeculoplasty (SLT) to manage intraocular pressure and protect your optic nerve.',
      icon: <Activity className="w-8 h-8" />,
      path: '/glaucoma-services'
    },
    { 
      title: 'Oculoplasty Services', 
      num: '04',
      tag: 'Eyelid & Orbit Surgery',
      stat: '8000+',
      statLabel: 'Procedures',
      desc: 'Correction of drooping eyelids, tear duct blocks (DCR), ocular tumors, prosthetics, and cosmetic eye surgeries.',
      icon: <Scissors className="w-8 h-8" />,
      path: '/oculoplasty-services'
    },
    { 
      title: 'Pediatric Ophthalmology', 
      num: '05',
      tag: 'Squint & Orthoptics',
      stat: '5,000+',
      statLabel: 'Children Treated',
      desc: 'Specialized eye care for infants and children, squint correction, and structural vision therapy programs.',
      icon: <Heart className="w-8 h-8" />,
      path: '/paediatric-ophthalmology'
    },
    { 
      title: 'Refractive Surgery', 
      num: '06',
      tag: 'Lens Implants (ICL / RLE)',
      stat: '20/20',
      statLabel: 'Vision Quality',
      desc: 'Advanced lens-based vision correction solutions including Implantable Collamer Lenses (ICL) and Refractive Lens Exchange to eliminate glasses.',
      icon: <Eye className="w-8 h-8" />,
      path: '/refractive-surgery'
    }
  ];

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
            className={`absolute left-0 right-0 mx-auto flex items-end justify-center z-10 ${
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
                scale: 1.55,
                originY: 0,
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
            className="absolute top-[12%] md:top-auto md:bottom-[10%] left-6 md:left-[4%] sm:left-[8%] lg:left-[10%] right-6 md:right-auto z-30 pointer-events-none select-none text-center md:text-left flex flex-col items-center md:items-start"
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isVideoDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex items-center gap-1.5 text-brand-teal text-[10px] tracking-[0.2em] font-black uppercase mb-3 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-brand-teal/20"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Nawabi Road, Subhash Nagar, Haldwani</span>
            </motion.div>
            <h1 className="leading-[0.95] text-center md:text-left">
              <motion.span 
                initial={{ opacity: 0, y: 40 }}
                animate={isVideoDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.9, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-brand-navy"
              ><EditableText id="hero-title-main">The Clarity</EditableText></motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 40 }}
                animate={isVideoDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.9, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
                className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic font-light text-brand-teal"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {[
                { value: 18, suffix: '+', label: 'Years Of Experience' },
                { value: 50000, suffix: '+', label: 'Successful Surgeries' },
                { value: 150000, suffix: '+', label: 'Patients Treated' }
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
                  src={hospitalFacade}
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
                  <span className="italic font-light text-brand-teal">
                    <EditableText id="about-legacy-title-2">Ocular Excellence.</EditableText>
                  </span>
                </h2>
                <p className="text-lg text-brand-navy/70 font-lora leading-relaxed">
                  <EditableText id="about-legacy-desc-1">Founded in 2017, Vedanta Netralya has evolved from a premier local eye clinic into North India's elite super-specialty eye care institute. Driven by the mission of providing ethical, world-class ophthalmic care, we have introduced state-of-the-art diagnostic systems, high-definition imaging, and advanced micro-surgical wings to restore visual clarity.</EditableText>
                </p>
                <p className="text-base text-brand-navy/60 font-lora leading-relaxed">
                  <EditableText id="about-legacy-desc-2">Under the leadership of a team of ophthalmic experts Dr. Sameer Varma, Dr. R.J.K. Singh, and Dr. Aditya Bhardwaj, the hospital strives to provide premium and comprehensive eye care. Vedanta Netralya is a newly built, air-conditioned hospital which is a leading eye hospital in the Kumaun region of Uttarakhand.</EditableText>
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
                {['CATARACT', 'RETINA', 'GLAUCOMA', 'OCULOPLASTY', 'PEDIATRIC', 'REFRACTIVE'].map((item, j) => (
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
        <section id="wings" className="py-24 bg-cream-dark relative">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16"
            >
              <div className="lg:col-span-4">
                <h2 className="section-text text-brand-navy leading-tight">
                  <EditableText id="specialties-title-1">vedanta</EditableText><br/>
                  <span className="italic font-light text-brand-teal">
                    <EditableText id="specialties-title-2">specialties.</EditableText>
                  </span>
                </h2>
              </div>
              <div className="lg:col-span-8 flex items-end">
                <p className="text-lg text-brand-navy/60 font-lora leading-relaxed max-w-2xl">
                  <EditableText id="specialties-desc">Six wings of ophthalmic excellence — each wing equipped with internationally-certified equipment and led by board-certified super-specialists.</EditableText>
                </p>
              </div>
            </motion.div>

            {/* Interactive Specialty Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 flex flex-col gap-2">
                {specialties.map((spec, idx) => (
                  <EditableCard key={idx} id={`specialty-item-card-${idx}`} className="border-t border-brand-navy/10">
                    <div
                      onClick={() => setActiveSpec(idx)}
                      onMouseEnter={() => !isTabletOrMobile ? setActiveSpec(idx) : undefined}
                      className={`group cursor-pointer py-6 transition-all ${
                        activeSpec === idx ? 'pl-4 border-t-brand-teal' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className={`text-[10px] font-black tracking-widest transition-colors ${
                            activeSpec === idx ? 'text-brand-teal' : 'text-brand-navy/30'
                          }`}>
                            {spec.num}
                          </span>
                          <h3 className={`text-2xl md:text-3xl font-black transition-all ${
                            activeSpec === idx ? 'text-brand-navy' : 'text-brand-navy/40'
                          }`}>
                            <EditableText id={`specialty-list-title-${idx}`}>{spec.title}</EditableText>
                          </h3>
                        </div>
                        <div className={`w-10 h-10 rounded-full border border-brand-navy/20 flex items-center justify-center transition-all ${
                          activeSpec === idx ? 'bg-brand-navy border-brand-navy text-brand-teal rotate-45' : ''
                        }`}>
                          <Plus className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                    {/* Accordion detail inline for mobile */}
                    <AnimatePresence initial={false}>
                      {isTabletOrMobile && activeSpec === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="bg-brand-navy rounded-[2rem] p-6 text-cream relative overflow-hidden shadow-xl mb-6 mt-2">
                            <div className="relative z-10 flex flex-col gap-6">
                              <div className="flex items-start justify-between">
                                <div className="w-12 h-12 rounded-xl bg-brand-teal/15 border border-brand-teal/30 flex items-center justify-center text-brand-teal-bright">
                                  {spec.icon}
                                </div>
                                <span className="text-[8px] tracking-widest uppercase text-brand-teal-bright font-black mt-2">
                                  <EditableText id={`specialty-detail-tag-${idx}`}>{spec.tag}</EditableText>
                                </span>
                              </div>
                              
                              <div>
                                <h4 className="text-xl font-black mb-2">
                                  <EditableText id={`specialty-detail-title-${idx}`}>{spec.title}</EditableText>
                                </h4>
                                <p className="text-xs text-cream/70 font-lora leading-relaxed">
                                  <EditableText id={`specialty-detail-desc-${idx}`}>{spec.desc}</EditableText>
                                </p>
                              </div>

                              <div className="border-t border-cream/10 pt-4 flex items-end justify-between">
                                <div>
                                  <p className="text-2xl font-black text-brand-teal leading-none mb-1">
                                    <EditableText id={`specialty-detail-stat-${idx}`}>{spec.stat}</EditableText>
                                  </p>
                                  <p className="text-[8px] tracking-widest uppercase text-cream/40 font-black">
                                    <EditableText id={`specialty-detail-statlabel-${idx}`}>{spec.statLabel}</EditableText>
                                  </p>
                                </div>
                                <Link to={spec.path} className="bg-brand-teal text-brand-navy w-10 h-10 rounded-full flex items-center justify-center hover:bg-cream hover:text-brand-navy transition-all shadow-md">
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </EditableCard>
                ))}
                <div className="border-t border-brand-navy/10" />
              </div>

              {/* Desktop specialty detail block */}
              <div className="hidden lg:block lg:col-span-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSpec}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="bg-brand-navy rounded-[2.5rem] p-10 md:p-12 text-cream relative overflow-hidden shadow-xl"
                  >
                    <div className="relative z-10 flex flex-col justify-between h-full min-h-[300px]">
                      <div>
                        <div className="flex items-start justify-between mb-8">
                          <div className="w-16 h-16 rounded-2xl bg-brand-teal/15 border border-brand-teal/30 flex items-center justify-center text-brand-teal-bright">
                            {specialties[activeSpec].icon}
                          </div>
                          <span className="text-[9px] tracking-widest uppercase text-brand-teal-bright font-black">
                            <EditableText id={`specialty-detail-tag-${activeSpec}`}>{specialties[activeSpec].tag}</EditableText>
                          </span>
                        </div>
                        
                        <h4 className="text-3xl md:text-4xl font-black mb-4">
                          <EditableText id={`specialty-detail-title-${activeSpec}`}>{specialties[activeSpec].title}</EditableText>
                        </h4>
                        <p className="text-sm text-cream/70 font-lora leading-relaxed mb-8">
                          <EditableText id={`specialty-detail-desc-${activeSpec}`}>{specialties[activeSpec].desc}</EditableText>
                        </p>
                      </div>

                      <div className="border-t border-cream/10 pt-6 flex items-end justify-between">
                        <div>
                          <p className="text-4xl font-black text-brand-teal mb-1">
                            <EditableText id={`specialty-detail-stat-${activeSpec}`}>{specialties[activeSpec].stat}</EditableText>
                          </p>
                          <p className="text-[9px] tracking-widest uppercase text-cream/40 font-black">
                            <EditableText id={`specialty-detail-statlabel-${activeSpec}`}>{specialties[activeSpec].statLabel}</EditableText>
                          </p>
                        </div>
                        <Link to={specialties[activeSpec].path} className="bg-brand-teal text-brand-navy w-12 h-12 rounded-full flex items-center justify-center hover:bg-cream hover:text-brand-navy transition-all shadow-md">
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      </EditableContainer>

      {/* === OUR SERVICES GRID SECTION === */}
      <EditableContainer id="services-grid-home">
        <section id="services" className="py-24 bg-brand-navy text-cream relative z-10 border-t border-cream/5 overflow-hidden">
          {/* Decorative Background Glows for Glassmorphism */}
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-teal/10 rounded-full blur-[120px] pointer-events-none z-0" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-brand-teal/5 rounded-full blur-[150px] pointer-events-none z-0" />

          <div className="max-w-[1800px] mx-auto px-6 lg:px-16 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-brand-teal text-[10px] tracking-[0.3em] uppercase font-black">
                    <EditableText id="services-eyebrow">Our Services</EditableText>
                  </span>
                </div>
                <h2 className="section-text">
                  <EditableText id="services-title-1">World-Class</EditableText> <br/>
                  <span className="italic font-light text-brand-teal">
                    <EditableText id="services-title-2">Clinical Specialties.</EditableText>
                  </span>
                </h2>
              </div>
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

      {/* === WEEKLY SPECIALS & OFFERS SECTION === */}
      <EditableContainer id="weekly-specials-section">
        <section className="py-24 bg-white relative z-10 border-t border-brand-navy/5 shadow-sm">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 font-body">
                <EditableText id="offers-eyebrow">Weekly OPD Specials</EditableText>
              </p>
              <h2 className="section-text text-brand-navy mb-6 font-body">
                <EditableText id="offers-title-1">Special OPD Days</EditableText> <br />
                <span className="italic font-light text-brand-teal">
                  <EditableText id="offers-title-2">& Patient Health Campaigns.</EditableText>
                </span>
              </h2>
              <p className="text-base text-brand-navy/60 font-lora">
                <EditableText id="offers-desc">Benefit from our dedicated health checkup programs, free pediatric screening camps, and special OPD discounts.</EditableText>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Tuesday offer */}
              <motion.div
                whileHover={{ y: -6, borderColor: 'rgba(0, 171, 192, 0.4)' }}
                className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 md:p-10 shadow-lg flex flex-col justify-between group transition-all duration-300 relative overflow-hidden"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-teal bg-brand-teal/10 px-3 py-1 rounded-full">Tuesday</span>
                    <span className="text-2xl font-black text-brand-teal/20">01</span>
                  </div>
                  <h3 className="text-2xl font-black text-brand-navy mb-4 font-body">Retina Screening Day</h3>
                  <div className="text-3xl font-black text-brand-teal mb-4">50% OFF</div>
                  <p className="text-xs text-brand-navy/60 leading-relaxed font-lora mb-6">
                    Retina screening for diabetics, hypertensives and ARMD. Get a 50% discount on standard OPD consultation and fundus evaluation charges.
                  </p>
                </div>
                <Link to="/appointment" className="w-full bg-brand-navy text-cream hover:bg-brand-teal hover:text-brand-navy py-4 rounded-full text-xs tracking-widest uppercase font-black transition-all flex items-center justify-center gap-2 shadow-md mt-8">
                  Book Slot
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Wednesday offer */}
              <motion.div
                whileHover={{ y: -6, borderColor: 'rgba(0, 171, 192, 0.4)' }}
                className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 md:p-10 shadow-lg flex flex-col justify-between group transition-all duration-300 relative overflow-hidden"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-teal bg-brand-teal/10 px-3 py-1 rounded-full">Wednesday</span>
                    <span className="text-2xl font-black text-brand-teal/20">02</span>
                  </div>
                  <h3 className="text-2xl font-black text-brand-navy mb-2 font-body">Pediatric Eye Clinic</h3>
                  <p className="text-[10px] tracking-widest uppercase font-black text-brand-teal mb-4 font-body">Below 5 Yrs (Infants, Toddlers & Pre-School)</p>
                  <div className="text-3xl font-black text-brand-teal mb-4">FREE SCREENING</div>
                  <p className="text-xs text-brand-navy/60 leading-relaxed font-lora mb-6">
                    Free general ophthalmic examination, vision screening & refraction for children below 5 yrs (infants, toddlers & pre-school children).
                  </p>
                </div>
                <Link to="/appointment" className="w-full bg-brand-navy text-cream hover:bg-brand-teal hover:text-brand-navy py-4 rounded-full text-xs tracking-widest uppercase font-black transition-all flex items-center justify-center gap-2 shadow-md mt-8">
                  Book Free Slot
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Friday offer */}
              <motion.div
                whileHover={{ y: -6, borderColor: 'rgba(0, 171, 192, 0.4)' }}
                className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 md:p-10 shadow-lg flex flex-col justify-between group transition-all duration-300 relative overflow-hidden"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-teal bg-brand-teal/10 px-3 py-1 rounded-full">Friday</span>
                    <span className="text-2xl font-black text-brand-teal/20">03</span>
                  </div>
                  <h3 className="text-2xl font-black text-brand-navy mb-4 font-body">Senior Citizen Day</h3>
                  <div className="text-3xl font-black text-brand-teal mb-4">50% OFF</div>
                  <p className="text-xs text-brand-navy/60 leading-relaxed font-lora mb-6">
                    Get 50% off on OPD consultations, slit-lamp examinations, and general eye screenings for senior citizens above 60 yr.
                  </p>
                </div>
                <Link to="/appointment" className="w-full bg-brand-navy text-cream hover:bg-brand-teal hover:text-brand-navy py-4 rounded-full text-xs tracking-widest uppercase font-black transition-all flex items-center justify-center gap-2 shadow-md mt-8">
                  Book Slot
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
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
                    <span className="italic font-light text-brand-teal">
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
                  treatment: 'Micro-Incision Cataract Surgery (MICS)',
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

      {/* === BRANCHES & DIRECTIONS SECTION === */}
      <EditableContainer id="homepage-location-section">
        <section className="py-20 bg-cream-dark relative z-10 border-t border-brand-navy/5">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">Our Locations</span>
              <h2 className="section-text text-brand-navy mb-6">Find Our Centres</h2>
              <p className="text-base text-brand-navy/60 font-lora">
                Visit our superspecialty eye hospitals. Select a branch below to view its location, clinical timings, and get instant driving directions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Haldwani Card */}
              <div className="bg-brand-navy text-cream rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-cream/5 hover:border-brand-teal/40 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <span className="text-brand-teal text-[10px] tracking-widest font-black uppercase mb-2 block">Main Superspecialty Centre</span>
                  <h3 className="text-2xl font-black mb-4">Haldwani Centre</h3>
                  <p className="text-xs text-cream/70 leading-relaxed mb-6 font-lora">
                    Nawabi Rd, near DPS Junior School, Subhash Nagar, Haldwani, Uttarakhand 263139
                  </p>
                  <div className="space-y-2 text-xs text-cream/60 font-body mb-8">
                    <p><strong>OPD Hours:</strong> Mon - Sat: 9:00 AM - 7:00 PM</p>
                    <p><strong>Sunday:</strong> 9:00 AM - 2:00 PM</p>
                    <p><strong>Phone:</strong> 05946-223616, +91-9068561971</p>
                  </div>
                </div>
                <a 
                  href="https://www.google.com/maps/place/Vedanta+Netralya+Haldwani/@29.2266568,79.5255779,642m/data=!3m1!1e3!4m10!1m2!2m1!1svedanta+netralya+haldwani!3m6!1s0x39a09b1779d2b223:0xccc4371f2e361808!8m2!3d29.2266493!4d79.5281364!15sChl2ZWRhbnRhIG5ldHJhbHlhIGhhbGR3YW5pkgEPZXllX2NhcmVfY2VudGVy4AEA!16s%2Fg%2F11n422c3lg!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-brand-teal text-brand-navy hover:bg-cream hover:text-brand-navy py-4 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <MapPin className="w-4 h-4" />
                  Navigate on Google Maps
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* Kichha Card */}
              <div className="bg-brand-navy text-cream rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-cream/5 hover:border-brand-teal/40 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <span className="text-brand-teal text-[10px] tracking-widest font-black uppercase mb-2 block">Specialist Outreach Clinic</span>
                  <h3 className="text-2xl font-black mb-4">Kichha Centre</h3>
                  <p className="text-xs text-cream/70 leading-relaxed mb-6 font-lora">
                    1, Kichha, Uttarakhand 263148, India
                  </p>
                  <div className="space-y-2 text-xs text-cream/60 font-body mb-8">
                    <p><strong>OPD Hours:</strong> Mon - Sat: 9:00 AM - 6:00 PM</p>
                    <p><strong>Sunday:</strong> Closed</p>
                    <p><strong>Phone:</strong> +91-9068561971</p>
                  </div>
                </div>
                <a 
                  href="https://www.google.com/maps?q=Vedanta+Netralya+Kichha,+1,+Kichha,+Uttarakhand+263148&ftid=0x39a07b005f4f3ee5:0x40618a7fc6385a24&entry=gps&shh=CAE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-brand-teal text-brand-navy hover:bg-cream hover:text-brand-navy py-4 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <MapPin className="w-4 h-4" />
                  Navigate on Google Maps
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
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
              <span className="italic font-light text-brand-teal">
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

      {/* === WEEKLY PROMOTIONAL MODAL POPUP === */}
      <AnimatePresence>
        {showPromoModal && (
          <div className="fixed inset-0 z-[9999] bg-brand-navy/70 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="bg-brand-navy border border-brand-teal/30 rounded-[2.5rem] p-8 md:p-12 max-w-xl w-full shadow-2xl relative text-cream text-center overflow-hidden"
            >
              {/* Subtle background glow */}
              <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-brand-teal/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full bg-brand-teal/10 blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={closePromoModal}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-cream transition-colors focus:outline-none"
                aria-label="Close Announcement"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Icon / Tag */}
              <div className="inline-flex items-center gap-1.5 bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-[9px] tracking-[0.25em] font-black uppercase px-4 py-1.5 rounded-full mb-6">
                <Sparkles className="w-3 h-3 animate-pulse" />
                Special Announcement
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl md:text-4xl font-black mb-2 text-white font-body leading-none">
                Weekly Free Clinic
              </h2>
              <p className="text-brand-teal text-[11px] tracking-widest uppercase font-black mb-6">
                Infants, Toddlers & Pre-School (Below 5 Yrs)
              </p>

              {/* Highlight Box */}
              <div className="bg-white/5 border border-cream/10 rounded-3xl p-6 mb-8 text-center">
                <span className="text-[10px] tracking-widest uppercase font-black text-brand-teal bg-brand-teal/20 px-3 py-1 rounded-full inline-block mb-3">
                  Every Wednesday
                </span>
                <p className="text-2xl font-black text-white mb-2 uppercase">
                  Free Pediatric Screening
                </p>
                <p className="text-xs text-cream/70 font-lora leading-relaxed">
                  Free general ophthalmic examination, vision screening & refraction for children below 5 yrs (infants, toddlers & pre-school children).
                </p>
              </div>

              {/* Other Weekly Offers Row */}
              <div className="grid grid-cols-2 gap-4 mb-8 text-left">
                <div className="border border-cream/10 rounded-2xl p-4 bg-white/5">
                  <p className="text-[8px] tracking-wider uppercase font-black text-brand-teal">Tuesday Specials</p>
                  <p className="text-sm font-bold text-white mt-1">Retina Screening</p>
                  <p className="text-[9px] text-cream/60 mt-1 font-lora">For diabetics, hypertensives & ARMD</p>
                  <p className="text-[10px] font-black text-brand-teal mt-2">50% OFF ON OPD CHARGES</p>
                </div>
                <div className="border border-cream/10 rounded-2xl p-4 bg-white/5">
                  <p className="text-[8px] tracking-wider uppercase font-black text-brand-teal">Friday Specials</p>
                  <p className="text-sm font-bold text-white mt-1">Senior Citizens</p>
                  <p className="text-[9px] text-cream/60 mt-1 font-lora">For patients above 60 yr</p>
                  <p className="text-[10px] font-black text-brand-teal mt-2">50% OFF ON OPD CHARGES</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link
                  to="/appointment"
                  onClick={closePromoModal}
                  className="w-full sm:flex-1 bg-brand-teal text-brand-navy hover:bg-cream hover:text-brand-navy py-4 rounded-full text-[10px] tracking-widest uppercase font-black transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  Book Special Slot
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={closePromoModal}
                  className="w-full sm:w-auto px-8 py-4 rounded-full border border-cream/20 text-cream/70 hover:text-white hover:border-cream/40 text-[10px] tracking-widest uppercase font-black transition-all"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;