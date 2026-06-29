import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Sparkles, 
  Activity, 
  Award, 
  Target, 
  Eye, 
  Play, 
  GraduationCap, 
  ArrowUpRight, 
  CheckCircle,
  Stethoscope
} from 'lucide-react';
import { Link } from 'react-router-dom';
import FooterCTA from '../components/FooterCTA';
import { EditableContainer, EditableText, EditableMedia, EditableList, EditableCard } from '../components/Editable';

// Import hospital intro video
import introVid from '../assets/about-video.mp4';

// Doctor Images
import drSameer from '../assets/dr-sameer-varma-opd.jpeg';
import drRjk from '../assets/dr-rjk-opd.jpeg';
import drAditya from '../assets/dr-aditya-bhardwaj.jpeg';

const About: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.error("Video play failed:", err);
        });
      }
    }
  };

  const defaultDoctors = [
    {
      id: 'doc-sameer',
      name: 'Dr. Sameer Varma',
      image: drSameer,
      imageZoom: 1.2,
      objectPosition: '52% 20%',
      role: 'Founder & Senior Eye Specialist',
      specialty: 'Comprehensive Ophthalmology, Cataract, Oculoplasty, Glaucoma, Paediatric Cataract',
      edu: 'M.S., Fellow Sadguru Netra Chikitsalaya (SNC), Chitrakoot',
      exp: '16,000+',
      desc: 'Highly experienced eye surgeon. Completed fellowship at Sadguru Netra Chikitsalaya, Chitrakoot. Served as Clinical Incharge at Eye Q Superspeciality Eye Hospital, Haldwani from 2007 to 2017 before founding Vedanta Netralya. Expert in micro-incision cataract surgeries, lid and tear duct reconstructions, and glaucoma management.',
      fellowships: [
        'Fellowship in Sadguru Netra Chikitsalaya, Chitrakoot',
        '2,000+ Lacrimal (tear duct) surgeries performed',
        '4,000+ Eyelid reconstruction surgeries performed',
        '16,000+ Cataract surgeries performed'
      ]
    },
    {
      id: 'doc-rjk',
      name: 'Dr. R.J.K. Singh',
      image: drRjk,
      imageZoom: 1.9,
      objectPosition: '85% 15%',
      role: 'Senior Consultant Ophthalmologist',
      specialty: 'Comprehensive Ophthalmology',
      edu: 'DOMS, Kanpur University (1972)',
      exp: '38+',
      desc: 'Completed post-graduation from Kanpur University in 1972. Completed senior fellowship training at the legendary Sitapur Eye Hospital. Dedicated over 35 years as a senior eye surgeon and clinical lead across multiple branches of Sitapur Eye Hospital. Previously senior consultant at Eye Q Eye Hospital.',
      fellowships: [
        'Fellowship at Sitapur Eye Hospital',
        '35+ years clinical career with Sitapur Eye Hospital branches',
        'Senior clinical consultant at Eye Q Eye Hospital'
      ]
    },
    {
      id: 'doc-aditya',
      name: 'Dr. Aditya Bhardwaj',
      image: drAditya,
      imageZoom: 1.6,
      objectPosition: 'center 35%',
      role: 'Chief Retina Consultant & Surgeon',
      specialty: 'Vitreoretinal (VR) Surgery & Medical Retina',
      edu: 'MD (AIIMS New Delhi), DNB, FICO, MRCS',
      exp: '10,000+',
      desc: 'Completed graduation in MBBS and ophthalmology residency. Following this, he completed 3 years of rigorous advanced training in Vitreo Retina from AIIMS, New Delhi. He has performed more than 10,000 retinal micro-surgeries, solving complex cases, and has also worked as a consultant ophthalmologist internationally.',
      fellowships: [
        '3 years Vitreo Retina training at AIIMS New Delhi',
        'FICO & MRCS certified clinical specialist',
        'Over 10,000 successful Vitreoretinal micro-surgeries'
      ]
    }
  ];

  const defaultCoreValues = [
    { id: 'v4', iconName: 'Award', title: 'Patient Integrity', desc: 'Strict ethical treatment decisions and transparent billing packages.' },
    { id: 'v3', iconName: 'Activity', title: 'Clinical Rigour', desc: 'Cases managed by board-certified, well-trained, and experienced surgeons.' },
    { id: 'v2', iconName: 'Sparkles', title: 'Advanced Technology', desc: 'State-of-the-art, cutting-edge diagnostic and surgical technology from Alcon, Zeiss, and Johnson & Johnson.' },
    { id: 'v1', iconName: 'Shield', title: 'Uncompromising Safety', desc: 'Adhering to strict NABH safety standards and sterile operative theatre protocol.' }
  ];

  const defaultTimeline = [
    { id: 'h1', year: '2017', title: 'Foundation', desc: 'Established our primary clinic in Haldwani with dedicated outpatient care.' },
    { id: 'h2', year: '2020', title: 'Retina & VR Wing', desc: 'Expanded to include advanced sutureless vitreoretinal surgery capabilities.' },
    { id: 'h3', year: '2025', title: 'State-of-the-Art Centre', desc: 'State-of-the-art new centre with two modular OTs and advanced infrastructure for patient safety, comfort, and better facility.' },
    { id: 'h4', year: '2026', title: '50,000+ Smiles', desc: 'Celebrating fifty thousand smiles restored across generations of Kumaun patients.' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-transparent"
    >
      <div className="max-w-[1800px] mx-auto px-6 lg:px-16 py-20">
        
        {/* Main Header & Video Section */}
        <EditableContainer id="about-header" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">
              <EditableText id="about-eyebrow">About Our Hospital</EditableText>
            </p>
            <h1 className="section-text text-brand-navy mb-8">
              <EditableText id="about-title-1">Excellence in Ophthalmic Care</EditableText> <span className="italic font-light text-brand-teal">
                <EditableText id="about-title-2">Since 2017.</EditableText>
              </span>
            </h1>
            <p className="text-lg font-lora text-brand-navy/70 leading-relaxed mb-6">
              <EditableText id="about-desc-1">Vedanta Netralya is Kumaun's premium eye care provider, blending advanced surgical technologies with ethical values.</EditableText>
            </p>
            <p className="text-base text-brand-navy/60 leading-relaxed mb-8">
              <EditableText id="about-desc-2">Our modern facilities at Nawabi Road are fully air-conditioned and patient-friendly.</EditableText>
            </p>
            <div className="flex gap-4">
              <Link to="/appointment" className="bg-brand-navy text-cream px-6 py-4 rounded-full text-[10px] tracking-[0.25em] uppercase font-black hover:bg-brand-teal hover:text-brand-navy transition-all shadow-md">
                <EditableText id="about-btn-1">Book Slot</EditableText>
              </Link>
              <Link to="/centres" className="border border-brand-navy/20 text-brand-navy px-6 py-4 rounded-full text-[10px] tracking-[0.25em] uppercase font-black hover:bg-brand-navy hover:text-cream transition-all">
                <EditableText id="about-btn-2">Our Centres</EditableText>
              </Link>
            </div>
          </div>
          
          {/* Hospital Video Container */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="relative max-w-[360px] mx-auto aspect-[9/16] rounded-[3rem] overflow-hidden shadow-2xl border border-brand-navy/10 group bg-brand-navy">
              <video
                ref={videoRef}
                src={introVid}
                className="w-full h-full object-cover"
                playsInline
                preload="metadata"
                controls={isPlaying}
              />
              
              {/* Play Overlay */}
              {!isPlaying && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 bg-brand-navy/30 backdrop-blur-[2px] flex items-center justify-center cursor-pointer transition-all duration-300 group-hover:bg-brand-navy/40"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 rounded-full bg-brand-teal text-brand-navy flex items-center justify-center shadow-lg hover:shadow-brand-teal/20 transition-all z-10"
                  >
                    <Play className="w-8 h-8 fill-brand-navy translate-x-0.5" />
                  </motion.div>
                </div>
              )}
            </div>
            <p className="text-[11px] text-center text-brand-navy/40 italic mt-4 font-lora">
              <EditableText id="about-video-caption">Take a virtual walkthrough of our Haldwani superspecialty hospital</EditableText>
            </p>
          </div>
        </EditableContainer>

        {/* Infrastructure & Clinical Facility Grid - Original Website Details */}
        <EditableContainer id="about-facilities" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-24">
          {/* Left Column: Original Site Features */}
          <div className="lg:col-span-7 bg-white border border-brand-navy/10 rounded-[3rem] p-10 md:p-12 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-brand-teal tracking-widest font-black uppercase">
                <EditableText id="about-infra-eyebrow">Infrastructure Specs</EditableText>
              </span>
              <h2 className="text-3xl font-black text-brand-navy mt-2 mb-6 font-body">
                <EditableText id="about-infra-title">Clinical Capabilities & Facilities</EditableText>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-brand-navy/80">
                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-brand-navy">
                        <EditableText id="about-facility-title-1">Modular Operating Theater</EditableText>
                      </h4>
                      <p className="text-xs text-brand-navy/70 mt-0.5 font-lora">
                        <EditableText id="about-facility-desc-1">Equipped with Boyle's apparatus, suction machines, and complete monitoring systems to handle complex cardiac and high-risk cases.</EditableText>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-brand-navy">
                        <EditableText id="about-facility-title-2">Three Anesthesia Modes</EditableText>
                      </h4>
                      <p className="text-xs text-brand-navy/70 mt-0.5 font-lora">
                        <EditableText id="about-facility-desc-2">Tailored pain management with General Anesthesia (GA), Local Anesthesia (LA), or Topical Anesthesia (TA) options.</EditableText>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-brand-navy">
                        <EditableText id="about-facility-title-3">Premium Lens Implants</EditableText>
                      </h4>
                      <p className="text-xs text-brand-navy/70 mt-0.5 font-lora">
                        <EditableText id="about-facility-desc-3">Advanced Foldable, Aspheric, Multifocal, and EDOF (Symphony) lenses. SF-IOL / AC-IOL implants in complicated cases.</EditableText>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-brand-navy">
                        <EditableText id="about-facility-title-4">Recovery & Ward Rooms</EditableText>
                      </h4>
                      <p className="text-xs text-brand-navy/70 mt-0.5 font-lora">
                        <EditableText id="about-facility-desc-4">Comfortable recovery ward equipped with specialized beds and recliners for the convenience of outpatient OT clients.</EditableText>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-brand-navy">
                        <EditableText id="about-facility-title-5">OPD & Consultation Stations</EditableText>
                      </h4>
                      <p className="text-xs text-brand-navy/70 mt-0.5 font-lora">
                        <EditableText id="about-facility-desc-5">Features 2 diagnostic refraction stations, a 4-doctor consultation chamber, a dedicated paediatric clinic, and a separate counseling room for patient guidance.</EditableText>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-brand-navy">
                        <EditableText id="about-facility-title-6">Stores & Power Backup</EditableText>
                      </h4>
                      <p className="text-xs text-brand-navy/70 mt-0.5 font-lora">
                        <EditableText id="about-facility-desc-6">In-house Optical store, Medical store/pharmacy, and a 24-hour generator power backup system for uninterrupted patient care.</EditableText>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-brand-navy/5 mt-8 flex justify-between items-center flex-wrap gap-4">
              <p className="text-xs text-brand-navy/50 font-lora">
                <EditableText id="about-infra-note">* All diagnostics and services meet rigid national standards and are NABH certified.</EditableText>
              </p>
              <Link to="/facilities" className="text-brand-teal text-[10px] tracking-wider uppercase font-black flex items-center gap-1 hover:text-brand-navy transition-colors">
                <EditableText id="about-infra-btn">View Full Facilities</EditableText>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
          
          {/* Right Column: Values */}
          <div className="lg:col-span-5 bg-brand-navy text-cream rounded-[3rem] p-10 md:p-12 shadow-xl border border-cream/10 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl" />
            
            <div>
              <h2 className="text-2xl font-black mb-6 tracking-wide">
                <EditableText id="about-values-title">Our Core Values</EditableText>
              </h2>
              <div className="space-y-6">
                <EditableList
                  id="about-core-values-list"
                  defaultItems={defaultCoreValues}
                  className="space-y-6"
                  newItemTemplate={{
                    iconName: 'Shield',
                    title: 'New Value',
                    desc: 'Description of the core value here...'
                  }}
                >
                  {(v) => {
                    const IconComponent = v.iconName === 'Shield' ? Shield :
                                          v.iconName === 'Sparkles' ? Sparkles :
                                          v.iconName === 'Activity' ? Activity : Award;
                    return (
                      <div className="flex gap-4 items-start">
                        <div className="p-3 bg-cream/5 rounded-2xl shrink-0">
                          <IconComponent className="text-brand-teal w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm mb-1">
                            <EditableText id={`about-value-title-${v.id}`}>{v.title || 'Value Title'}</EditableText>
                          </h3>
                          <p className="text-xs text-cream/70 leading-relaxed font-lora">
                            <EditableText id={`about-value-desc-${v.id}`}>{v.desc || 'Value Description'}</EditableText>
                          </p>
                        </div>
                      </div>
                    );
                  }}
                </EditableList>
              </div>
            </div>
          </div>
        </EditableContainer>

        {/* Mission, Aim, Vision Cards */}
        <EditableContainer id="about-mav" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {/* Card 1: Mission */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-white/50 backdrop-blur-sm border border-brand-navy/10 rounded-[2.5rem] p-8 hover:border-brand-teal/40 hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-navy/5 flex items-center justify-center text-brand-teal mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-brand-navy mb-3">
              <EditableText id="about-mission-title">Our Mission</EditableText>
            </h3>
            <p className="text-sm text-brand-navy/70 leading-relaxed font-lora">
              <EditableText id="about-mission-desc">To deliver ethical, state-of-the-art eye care with maximum precision, utilizing advanced technology to restore and preserve sight for every individual who walks through our doors.</EditableText>
            </p>
          </motion.div>

          {/* Card 2: Aim */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/50 backdrop-blur-sm border border-brand-navy/10 rounded-[2.5rem] p-8 hover:border-brand-teal/40 hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-navy/5 flex items-center justify-center text-brand-teal mb-6">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-brand-navy mb-3">
              <EditableText id="about-aim-title">Our Aim</EditableText>
            </h3>
            <p className="text-sm text-brand-navy/70 leading-relaxed font-lora">
              <EditableText id="about-aim-desc">To ensure accessibility to quality eye care, eradicate preventable blindness, and consistently upgrade our surgical infrastructure to protect visual wellness.</EditableText>
            </p>
          </motion.div>

          {/* Card 3: Vision */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/50 backdrop-blur-sm border border-brand-navy/10 rounded-[2.5rem] p-8 hover:border-brand-teal/40 hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-navy/5 flex items-center justify-center text-brand-teal mb-6">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-brand-navy mb-3">
              <EditableText id="about-vision-title">Our Vision</EditableText>
            </h3>
            <p className="text-sm text-brand-navy/70 leading-relaxed font-lora">
              <EditableText id="about-vision-desc">To be a global benchmark for patient-centric ophthalmic excellence, setting new standards in clinical outcomes, empathy, and affordable cutting-edge treatments.</EditableText>
            </p>
          </motion.div>
        </EditableContainer>

        {/* Doctors Showcase Section */}
        <EditableContainer id="about-doctors" className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 font-body">
              <EditableText id="about-docs-eyebrow">Expert Doctors</EditableText>
            </p>
            <h2 className="section-text text-brand-navy mb-6 font-body">
              <EditableText id="about-docs-title">Our Medical Experts</EditableText>
            </h2>
            <p className="text-base text-brand-navy/60 font-lora">
              <EditableText id="about-docs-desc">Meet our board-certified, AIIMS-trained surgeons and consulting specialists leading our clinical teams.</EditableText>
            </p>
          </div>

          <EditableList
            id="about-doctors-list"
            defaultItems={defaultDoctors}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto"
            newItemTemplate={{
              name: 'Dr. New Doctor',
              role: 'Consulting Specialist',
              specialty: 'Ophthalmology',
              edu: 'M.S. / MD',
              exp: '5,000+',
              desc: 'Describe experience and clinical focus here...',
              fellowships: ['Fellowship details here...']
            }}
          >
            {(doc, idx) => (
              <EditableCard id={`about-doctor-card-${doc.id}`} className="h-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="bg-brand-navy text-cream rounded-[2.5rem] overflow-hidden border border-cream/5 shadow-xl flex flex-col justify-between group h-full"
                >
                <div>
                  {/* Doctor Image Container */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-navy-deep border-b border-cream/10">
                    <EditableMedia 
                      id={`about-doc-image-${doc.id}`}
                      src={doc.image} 
                      alt={doc.name} 
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                      style={{
                        objectPosition: doc.objectPosition || 'center top',
                        transform: `scale(${doc.imageZoom || 1})`
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Doctor Info Details */}
                  <div className="p-8 pb-4">
                    <span className="text-[10px] text-brand-teal tracking-widest font-black uppercase font-body">
                      <EditableText id={`about-doc-role-${doc.id}`}>{doc.role || 'Doctor Role'}</EditableText>
                    </span>
                    <h3 className="text-xl font-black mt-1 font-body text-cream min-h-[3.5rem] flex items-center">
                      <EditableText id={`about-doc-name-${doc.id}`}>{doc.name || 'Doctor Name'}</EditableText>
                    </h3>
                    <p className="text-xs text-brand-teal/80 italic mt-1 font-lora leading-normal min-h-[2.5rem]">
                      <EditableText id={`about-doc-specialty-${doc.id}`}>{doc.specialty || 'Specialties'}</EditableText>
                    </p>

                    <hr className="border-cream/10 my-4" />

                    <p className="text-xs text-cream/70 font-lora leading-relaxed mb-6 min-h-[6.5rem]">
                      <EditableText id={`about-doc-desc-${doc.id}`}>{doc.desc || 'Short bio...'}</EditableText>
                    </p>

                    <div className="space-y-3 mb-4">
                      <div className="flex gap-2.5 items-start text-xs min-h-[2.5rem]">
                        <GraduationCap className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                        <span><strong>Education:</strong> <EditableText id={`about-doc-edu-${doc.id}`}>{doc.edu || 'Qualifications'}</EditableText></span>
                      </div>
                      <div className="flex gap-2.5 items-start text-xs">
                        <Award className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                        <div>
                          <strong>Key Milestones:</strong>
                          <ul className="list-disc pl-4 text-cream/60 text-[11px] mt-1 space-y-1">
                            {(doc.fellowships || []).slice(0, 3).map((f: string, i: number) => (
                              <li key={i}>
                                <EditableText id={`about-doc-fellowship-${doc.id}-${i}`}>{f || 'Milestone detail'}</EditableText>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 pt-0">
                  <Link
                    to="/appointment"
                    className="group/btn bg-brand-teal text-brand-navy hover:bg-cream hover:text-brand-navy px-6 py-4 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all flex items-center justify-between w-full shadow-md"
                  >
                    <EditableText id={`about-doc-btn-${doc.id}`}>Book Slot</EditableText>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:rotate-45 transition-transform" />
                  </Link>
                </div>
                </motion.div>
              </EditableCard>
            )}
          </EditableList>

          {/* Ophthalmic Panel Spot Note */}
          <div className="max-w-4xl mx-auto bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 md:p-10 shadow-md text-brand-navy">
            <div className="flex items-center gap-3 mb-4">
              <Stethoscope className="w-5 h-5 text-brand-teal" />
              <span className="text-[10px] text-brand-teal tracking-widest font-black uppercase">
                <EditableText id="about-panel-eyebrow">Ophthalmic Panel</EditableText>
              </span>
            </div>
            <h3 className="text-xl font-black mb-2">
              <EditableText id="about-panel-title">Consulting Surgeons & Clinical Support</EditableText>
            </h3>
            <p className="text-xs font-lora text-brand-navy/70 leading-relaxed">
              <EditableText id="about-panel-desc">Our clinical panel also includes consulting surgeons and specialists working in rotation. Together, our panel strives to deliver premium, ethical, and personal eye care using the highest level of diagnostic technology and surgical standards.</EditableText>
            </p>
          </div>
        </EditableContainer>

        {/* History Timeline */}
        <EditableContainer id="about-history" className="bg-cream-dark/40 rounded-[3rem] p-10 md:p-16 border border-brand-navy/5">
          <h2 className="text-center font-merriweather text-xs tracking-[0.4em] uppercase font-black text-brand-navy/40 mb-16">
            <EditableText id="about-history-title">Our Journey</EditableText>
          </h2>
          <EditableList
            id="about-history-timeline"
            defaultItems={defaultTimeline}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            newItemTemplate={{
              year: '2026',
              title: 'Milestone Title',
              desc: 'Milestone description details here...'
            }}
          >
            {(t) => (
              <div className="flex flex-col border-t border-brand-navy/10 pt-6">
                <span className="text-5xl font-black text-brand-teal mb-3">
                  <EditableText id={`about-history-year-${t.id}`}>{t.year || 'Year'}</EditableText>
                </span>
                <h3 className="font-bold text-sm mb-1 text-brand-navy">
                  <EditableText id={`about-history-item-title-${t.id}`}>{t.title || 'Milestone Title'}</EditableText>
                </h3>
                <p className="text-xs text-brand-navy/60 leading-relaxed font-lora">
                  <EditableText id={`about-history-item-desc-${t.id}`}>{t.desc || 'Milestone description...'}</EditableText>
                </p>
              </div>
            )}
          </EditableList>
        </EditableContainer>
      </div>

      {/* Shared Footer CTA */}
      <FooterCTA />
    </motion.div>
  );
};

export default About;
