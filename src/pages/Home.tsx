import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowUpRight, Plus, Eye, Sparkles, ChevronDown, Activity, Heart, Shield, Layers, Quote, Star, Scissors } from 'lucide-react';
import { Link } from 'react-router-dom';
import VisionSimulator from '../components/VisionSimulator';
import EditableSection from '../components/EditableSection';


// Assets
import heroEye3d from '../assets/hero-eye-3d.png';
import heroEyePrecision from '../assets/hero-eye-precision.png';
import drSameerVerma from '../assets/dr-sameer-verma.png';
import introVid from '../assets/intro-video.mp4';
import gallery3 from '../assets/gallery-3.png';

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

const Home: React.FC = () => {
  const [activeSpec, setActiveSpec] = useState(0);
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
  const [showIntroVideo, setShowIntroVideo] = useState(true);
  const [introVideoReady, setIntroVideoReady] = useState(false);
  const introVideoRef = useRef<HTMLVideoElement>(null);

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
      setShowIntroVideo(false);
    }
  };



  const specialties = [
    { 
      title: 'Cataract Surgery', 
      num: '01',
      tag: 'Robotic FLACS Laser',
      stat: '15,000+',
      statLabel: 'Lens Implants',
      desc: 'Premium micro-incision phacoemulsification with foldable IOL technology. Recovery within 24 hours.',
      icon: <Sparkles className="w-8 h-8" />,
      path: '/cataract'
    },
    { 
      title: 'Refractive LASIK', 
      num: '02',
      tag: 'Bladeless Femto-LASIK',
      stat: '20/20',
      statLabel: 'Vision Achieved',
      desc: 'Custom wavefront-guided LASIK and SMILE procedures for permanent freedom from glasses.',
      icon: <Eye className="w-8 h-8" />,
      path: '/lasik'
    },
    { 
      title: 'Pediatric Ophthalmology', 
      num: '03',
      tag: 'Squint & Orthoptics',
      stat: '5,000+',
      statLabel: 'Children Treated',
      desc: 'Specialized eye care for infants and children, squint correction, and vision therapy programs.',
      icon: <Eye className="w-8 h-8" />,
      path: '/contact'
    },
    { 
      title: 'Glaucoma Management', 
      num: '04',
      tag: 'Intraocular Pressure Control',
      stat: '4,500+',
      statLabel: 'Glaucoma Patients',
      desc: 'Advanced diagnostic imaging, micro-shunts, and selective laser trabeculoplasty (SLT) to manage intraocular pressure and protect your optic nerve.',
      icon: <Eye className="w-8 h-8" />,
      path: '/services'
    },
    { 
      title: 'Retina & Vitreous', 
      num: '05',
      tag: 'Vitreoretinal Specialty',
      stat: '6,000+',
      statLabel: 'Retina Procedures',
      desc: 'Specialized vitreoretinal care for diabetic retinopathy, macular degeneration, and retinal detachment using state-of-the-art sutureless surgery.',
      icon: <Sparkles className="w-8 h-8" />,
      path: '/services'
    }
  ];

  const scrollToSimulator = () => {
    document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="overflow-hidden bg-transparent">

      {/* === HERO: Sticky Doctor Section === */}
      <div className="sticky top-0 h-[80vh] overflow-hidden bg-cream flex items-end justify-center z-10 w-full">

          {/* Soft radial glow behind doctor */}
          <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-0">
            <div className="w-[500px] h-[500px] rounded-full bg-brand-teal/6 blur-[100px] mb-0" />
          </div>

          {/* Doctor Portrait / Intro Video - centered, smooth cross-fade */}
          <motion.div 
            style={{ opacity: doctorOpacity }}
            className="absolute bottom-0 left-0 right-0 h-full flex justify-center items-end z-10 pointer-events-none"
          >
            <AnimatePresence>
              {showIntroVideo && (
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
                  animate={{ opacity: introVideoReady ? 1 : 0 }}
                  exit={{ opacity: 0, transition: { duration: 0 } }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute bottom-0 h-full w-auto object-contain select-none z-20 pointer-events-none mix-blend-multiply"
                  style={{
                    scale: 0.95,
                    x: isMobile ? "0px" : "4vw",
                    originY: 1,
                    originX: 0.5,
                    filter: 'contrast(1.15) brightness(1.12) saturate(1.05)',
                    WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 2%, rgba(0,0,0,1) 98%, rgba(0,0,0,0) 100%)',
                    maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 2%, rgba(0,0,0,1) 98%, rgba(0,0,0,0) 100%)',
                    clipPath: 'inset(0% 8% 8% 8%)'
                  }}
                />
              )}
            </AnimatePresence>
            <motion.img
              src={drSameerVerma}
              alt="Dr. Sameer Verma – Senior Eye Specialist"
              initial={{ opacity: 0 }}
              animate={showIntroVideo ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0 }}
              className="absolute bottom-0 h-full w-auto object-contain select-none z-10"
              style={{
                scale: 0.95,
                x: isMobile ? "0px" : "4vw",
                originY: 1,
                originX: 0.5,
                filter: 'contrast(1.15) brightness(1.12) saturate(1.05) drop-shadow(0 -10px 60px rgba(0,20,40,0.12))'
              }}
            />
          </motion.div>

          {/* Floating Widget 1: Digital Eye Test — Right */}
          <motion.div
            style={{ opacity: widgetOpacity }}
            initial={{ opacity: 0, x: 70 }}
            animate={showIntroVideo ? { opacity: 0, x: 70 } : { opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.7, type: 'spring', stiffness: 80 }}
            className="absolute right-[4%] sm:right-[6%] lg:right-[8%] top-[25%] z-20"
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
            animate={showIntroVideo ? { opacity: 0, x: 70 } : { opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.7, type: 'spring', stiffness: 80 }}
            className="absolute right-[4%] sm:right-[6%] lg:right-[8%] top-[45%] z-20"
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
            animate={showIntroVideo ? { opacity: 0, x: 70 } : { opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.7, type: 'spring', stiffness: 80 }}
            className="absolute right-[4%] sm:right-[6%] lg:right-[8%] top-[65%] z-20"
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
            animate={showIntroVideo ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: textY, opacity: textOpacity }}
            className="absolute bottom-[14%] left-[6%] sm:left-[8%] lg:left-[10%] z-30 pointer-events-none select-none w-max max-w-[45vw]"
          >
            <h1 className="leading-[0.95] text-left">
              <motion.span 
                initial={{ opacity: 0, y: 40 }}
                animate={showIntroVideo ? { opacity: 0, y: 40 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
                className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-brand-navy"
                style={{ fontFamily: 'var(--font-body, serif)' }}
              >The Clarity</motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 40 }}
                animate={showIntroVideo ? { opacity: 0, y: 40 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 2.3, ease: [0.16, 1, 0.3, 1] }}
                className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic font-light text-brand-teal"
                style={{ fontFamily: 'Lora, serif' }}
              >You Deserve.</motion.span>
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
      <div className="relative z-40 bg-cream" style={{ marginTop: '-1px' }}>

      {/* === STATS COUNTER SECTION === */}
      <EditableSection id="stats-counter">
        <section className="py-16 bg-cream relative z-10">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {[
                { value: 18, suffix: '+', label: 'Years Of Experience' },
                { value: 25000, suffix: '+', label: 'Successful Eye Surgeries' },
                { value: 120000, suffix: '+', label: 'Patients Treated' },
                { value: 25, suffix: '+', label: 'Publications' }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-white border-2 border-brand-navy rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,30,60,0.95)] hover:shadow-[2px_2px_0px_0px_rgba(0,30,60,0.95)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 flex flex-col justify-center items-center"
                >
                  <h3 className="text-3xl md:text-4xl font-black text-brand-navy mb-2">
                    <Counter value={item.value} suffix={item.suffix} />
                  </h3>
                  <p className="text-[9px] tracking-[0.15em] uppercase text-brand-navy/60 font-black leading-tight">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {/* === ABOUT HOSPITAL & HISTORY SECTION === */}
      <EditableSection id="about-hospital-legacy">
        <section className="py-24 bg-cream relative z-10">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              {/* Left: Legacy Image */}
              <div className="lg:col-span-5 rounded-[2.5rem] overflow-hidden shadow-2xl relative group max-h-[500px]">
                <img 
                  src={gallery3} 
                  alt="Vedanta Netralya Legacy & Clinical Care" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-brand-navy/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Right: Hospital History Content */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <p className="text-brand-teal text-[10px] tracking-[0.3em] uppercase font-black mb-2">Our Heritage</p>
                <h2 className="section-text text-brand-navy">
                  A Legacy of<br />
                  <span className="italic font-light text-brand-teal" style={{ fontFamily: 'Lora, serif' }}>Ocular Excellence.</span>
                </h2>
                <p className="text-lg text-brand-navy/70 font-lora leading-relaxed">
                  Founded in 2003, Vedanta Netralya has evolved from a premier local eye clinic into North India's elite super-specialty eye care institute. Driven by the mission of providing ethical, world-class ophthalmic care, we have introduced robotic laser systems, high-definition diagnostics, and advanced micro-surgical wings to restore visual clarity.
                </p>
                <p className="text-base text-brand-navy/60 font-lora leading-relaxed">
                  Under the able leadership of a team of ophthalmic experts Dr. R.J.K. Singh, Dr. Sameer Varma, and Dr. Kanhaiya Mittal, the hospital strives to provide premium and comprehensive eye care. Vedanta Netralya is a newly built, air-conditioned hospital which is a leading eye hospital in the Kumaun region of Uttarakhand.
                </p>
              </div>
            </div>
          </div>
        </section>
      </EditableSection>

      {/* === MARQUEE SPECIALTIES === */}
      <EditableSection id="marquee-specialties">
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
      </EditableSection>

      {/* === SPECIALTIES SECTION === */}
      <EditableSection id="specialties-wing">
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
                  vedanta<br/>
                  <span className="italic font-light text-brand-teal" style={{ fontFamily: 'Lora, serif' }}>specialties.</span>
                </h2>
              </div>
              <div className="lg:col-span-8 flex items-end">
                <p className="text-lg text-brand-navy/60 font-lora leading-relaxed max-w-2xl">
                  Five pillars of ophthalmic excellence — each wing equipped with internationally-certified equipment and led by AIIMS-trained super-specialists.
                </p>
              </div>
            </motion.div>

            {/* Interactive Specialty Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 flex flex-col gap-2">
                {specialties.map((spec, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveSpec(idx)}
                    onMouseEnter={() => setActiveSpec(idx)}
                    className={`group cursor-pointer py-6 border-t border-brand-navy/10 transition-all ${
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
                          {spec.title}
                        </h3>
                      </div>
                      <div className={`w-10 h-10 rounded-full border border-brand-navy/20 flex items-center justify-center transition-all ${
                        activeSpec === idx ? 'bg-brand-navy border-brand-navy text-brand-teal rotate-45' : ''
                      }`}>
                        <Plus className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="border-t border-brand-navy/10" />
              </div>

              <div className="lg:col-span-7">
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
                            {specialties[activeSpec].tag}
                          </span>
                        </div>
                        
                        <h4 className="text-3xl md:text-4xl font-black mb-4">{specialties[activeSpec].title}</h4>
                        <p className="text-sm text-cream/70 font-lora leading-relaxed mb-8">{specialties[activeSpec].desc}</p>
                      </div>

                      <div className="border-t border-cream/10 pt-6 flex items-end justify-between">
                        <div>
                          <p className="text-4xl font-black text-brand-teal mb-1">{specialties[activeSpec].stat}</p>
                          <p className="text-[9px] tracking-widest uppercase text-cream/40 font-black">{specialties[activeSpec].statLabel}</p>
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
      </EditableSection>

      {/* === OUR SERVICES GRID SECTION === */}
      <EditableSection id="services-grid-home">
        <section id="services" className="py-24 bg-brand-navy text-cream relative z-10 border-t border-cream/5">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-brand-teal text-[10px] tracking-[0.3em] uppercase font-black">Our Services</span>
                </div>
                <h2 className="section-text">
                  World-Class <br/>
                  <span className="italic font-light text-brand-teal" style={{ fontFamily: 'Lora, serif' }}>Clinical Specialties.</span>
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="bg-brand-navy-deep border border-cream/10 hover:border-brand-teal/40 rounded-[2rem] p-8 lg:p-10 flex flex-col justify-between group transition-all duration-300 relative overflow-hidden shadow-lg"
                >
                  {/* Background glow on hover */}
                  <div className="absolute -right-20 -top-20 w-40 h-40 bg-brand-teal/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-brand-teal/10 border border-brand-teal/25 flex items-center justify-center text-brand-teal-bright mb-8 group-hover:bg-brand-teal-bright group-hover:text-brand-navy-deep transition-all duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-xl lg:text-2xl font-black text-cream mb-4">{service.title}</h3>
                    <p className="text-sm font-lora text-cream/60 leading-relaxed mb-8">{service.description}</p>
                  </div>

                  <Link 
                    to={service.path}
                    className="inline-flex items-center gap-2 text-xs tracking-wider uppercase font-black text-brand-teal group-hover:text-cream transition-colors mt-auto"
                  >
                    Learn More 
                    <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {/* === EMBEDDED VISION SIMULATOR === */}
      <EditableSection id="vision-simulator-home">
        <section id="simulator" className="py-24 bg-cream relative z-10 border-t border-brand-navy/5">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
            <VisionSimulator />
          </div>
        </section>
      </EditableSection>

      {/* === FAQ ACCORDION SECTION === */}
      <EditableSection id="faq-home">
        <section className="py-24 bg-cream-dark relative z-10 border-t border-brand-navy/5">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Left Column: Image & Decorative Text */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-brand-teal text-[10px] tracking-[0.3em] uppercase font-black">Support Desk</span>
                  </div>
                  <h2 className="section-text text-brand-navy">
                    Frequently Asked <br />
                    <span className="italic font-light text-brand-teal" style={{ fontFamily: 'Lora, serif' }}>Questions.</span>
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
                          {faq.question}
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
                              {faq.answer}
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
      </EditableSection>

      {/* === TPA & INSURANCE PARTNERS === */}
      <EditableSection id="tpa-partners-section">
        <section className="py-24 bg-white relative z-10 border-t border-brand-navy/5 shadow-sm overflow-hidden">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Cashless Panels</p>
              <h2 className="section-text text-brand-navy mb-6">Our Cashless TPA / Insurance Partners</h2>
              <p className="text-base text-brand-navy/60 font-lora">
                We accept cashless surgery pre-authorizations and cards from more than 40 leading TPAs and insurers.
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
      </EditableSection>

      {/* === TESTIMONIALS SECTION === */}
      <EditableSection id="testimonials-home">
        <section className="py-24 bg-cream-dark relative z-10 border-t border-brand-navy/5">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Patient Chronicles</p>
              <h2 className="section-text text-brand-navy mb-6">Patient Stories</h2>
              <p className="text-base text-brand-navy/60 font-lora">
                Hear from patients who restored their visual clarity and spectacles-free freedom through our clinical experts.
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
                <div
                  key={i}
                  className="bg-brand-navy text-cream rounded-[2.5rem] p-8 border border-cream/5 shadow-xl flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-brand-teal/5 blur-xl" />
                  
                  <div>
                    <Quote className="w-10 h-10 text-brand-teal/30 mb-6" />
                    <div className="flex gap-1 mb-4">
                      {[...Array(rev.rating)].map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-brand-teal-bright text-brand-teal-bright" />
                      ))}
                    </div>
                    <p className="text-sm text-cream/80 font-lora leading-relaxed mb-8">"{rev.quote}"</p>
                  </div>

                  <div className="border-t border-cream/10 pt-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-sm text-cream font-body">{rev.name}</h3>
                      <p className="text-[10px] text-cream/50 tracking-wider font-lora">{rev.location}</p>
                    </div>
                    <span className="text-[9px] tracking-wider uppercase text-brand-teal font-black bg-brand-teal/10 px-3 py-1 rounded-full border border-brand-teal/20">
                      {rev.treatment.split(' ')[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {/* === CALL TO ACTION === */}
      <EditableSection id="cta-section">
        <section className="py-24 bg-transparent text-center relative z-10">
          <div className="max-w-4xl mx-auto px-6">
            <p className="text-brand-teal text-[10px] tracking-[0.5em] uppercase mb-8 font-black">Your Vision Awaits</p>
            <h2 className="section-text text-brand-navy mb-8">
              The Clarity <br />
              <span className="italic font-light text-brand-teal" style={{ fontFamily: 'Lora, serif' }}>You Deserve.</span>
            </h2>
            <Link to="/appointment" className="group inline-flex items-center gap-4 bg-brand-navy text-cream hover:bg-brand-teal hover:text-brand-navy px-8 py-5 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all shadow-xl">
              Begin Your Consultation
              <span className="w-8 h-8 rounded-full bg-brand-teal text-brand-navy group-hover:bg-cream group-hover:text-brand-navy flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </section>
      </EditableSection>
      </div>{/* end of z-40 content overlay wrapper */}
    </div>
  );
};

export default Home;
