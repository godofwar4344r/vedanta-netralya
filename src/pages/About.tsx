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

// Import hospital intro video
import introVid from '../assets/intro-video.mp4';

// Doctor Images
import drSameer from '../assets/dr-sameer-varma.png';
import drRjk from '../assets/dr-rjk-singh.png';
import drKanhaiya from '../assets/dr-kanhaiya-mittal.png';
import drDavinder from '../assets/dr-davinder-tyagi.png';

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

  const doctors = [
    {
      name: 'Dr. Sameer Varma',
      image: drSameer,
      role: 'Founder & Senior Eye Specialist',
      specialty: 'Comprehensive Ophthalmology, Cataract, Oculoplasty, Glaucoma, Paediatric Cataract, LASIK',
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
      name: 'Dr. R.J.K. Singh',
      image: drRjk,
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
      name: 'Dr. Kanhaiya Mittal',
      image: drKanhaiya,
      role: 'Chief Retina Consultant & Surgeon',
      specialty: 'Vitreoretinal (VR) Surgery & Medical Retina',
      edu: 'MBBS (Maulana Azad Medical College), MD (AIIMS New Delhi), DNB, FICO, MRCS',
      exp: '10,000+',
      desc: 'Completed MBBS from Maulana Azad Medical College in 2009, followed by MD from All India Institute of Medical Sciences (AIIMS) New Delhi in 2011. Completed 3 years of rigorous advanced Vitreo Retina training at AIIMS. Highly skilled in complex retinal detachments, macular surgeries, and diabetic retinopathy.',
      fellowships: [
        '3 years Vitreo Retina training at AIIMS New Delhi',
        'FICO & MRCS certified clinical specialist',
        'Over 10,000 successful Vitreoretinal micro-surgeries'
      ]
    },
    {
      name: 'Dr. Davinder Tyagi',
      image: drDavinder,
      role: 'Co-Founder & Vitreoretinal Specialist',
      specialty: 'Vitreoretinal Surgery, Retina & Uvea Care',
      edu: 'M.D. (R.P. Centre, AIIMS New Delhi, 2006)',
      exp: '4,000+',
      desc: 'Finished post-graduation from R.P Centre, AIIMS in 2006 and completed specialized vitreo-retinal training at AIIMS. He pioneered vitreo-retinal surgery in Haldwani and Kumaon region starting in 2007. He serves as Vitreoretinal Consultant at Vedanta Netralya and Vardan Retina Centre.',
      fellowships: [
        'Post-Graduation from R.P. Centre, AIIMS New Delhi',
        'Pioneered Vitreo-Retinal surgery in Haldwani & Kumaon in 2007',
        'Over 4,000 successful Vitreoretinal procedures'
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-transparent"
    >
      <div className="max-w-[1800px] mx-auto px-6 lg:px-16 py-20">
        
        {/* Main Header & Video Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">About Our Hospital</p>
            <h1 className="section-text text-brand-navy mb-8">
              Excellence in Ophthalmic Care <span className="italic font-light text-brand-teal" style={{ fontFamily: 'Lora, serif' }}>Since 2003.</span>
            </h1>
            <p className="text-lg font-lora text-brand-navy/70 leading-relaxed mb-6">
              Vedanta Netralya is a centrally located, super-specialty healthcare facility at **Canal Road, Tikonia Circle, Haldwani (Nainital, Uttarakhand)**. As Kumaun region's premier eye hospital, we blend advanced surgical technologies with ethical, patient-centric values.
            </p>
            <p className="text-base text-brand-navy/60 leading-relaxed mb-8">
              Our hospital is fully air-conditioned and features a welcoming ambience, supported by a highly qualified team of AIIMS-trained doctors and experienced ophthalmic surgeons. We strive to provide premium, personal, and comprehensive eye care.
            </p>
            <div className="flex gap-4">
              <Link to="/appointment" className="bg-brand-navy text-cream px-6 py-4 rounded-full text-[10px] tracking-[0.25em] uppercase font-black hover:bg-brand-teal hover:text-brand-navy transition-all shadow-md">
                Book Slot
              </Link>
              <Link to="/centres" className="border border-brand-navy/20 text-brand-navy px-6 py-4 rounded-full text-[10px] tracking-[0.25em] uppercase font-black hover:bg-brand-navy hover:text-cream transition-all">
                Our Centres
              </Link>
            </div>
          </div>
          
          {/* Hospital Video Container */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border border-brand-navy/10 group bg-brand-navy">
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
              Take a virtual walkthrough of our Haldwani superspecialty hospital
            </p>
          </div>
        </div>

        {/* Infrastructure & Clinical Facility Grid - Original Website Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-24">
          {/* Left Column: Original Site Features */}
          <div className="lg:col-span-7 bg-white border border-brand-navy/10 rounded-[3rem] p-10 md:p-12 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-brand-teal tracking-widest font-black uppercase">Infrastructure Specs</span>
              <h2 className="text-3xl font-black text-brand-navy mt-2 mb-6 font-body">Clinical Capabilities & Facilities</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-brand-navy/80">
                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-brand-navy">Modular Operating Theater</h4>
                      <p className="text-xs text-brand-navy/70 mt-0.5 font-lora">Equipped with Boyle's apparatus, suction machines, and complete monitoring systems to handle complex cardiac and high-risk cases.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-brand-navy">Three Anesthesia Modes</h4>
                      <p className="text-xs text-brand-navy/70 mt-0.5 font-lora">Tailored pain management with General Anesthesia (GA), Local Anesthesia (LA), or Topical Anesthesia (TA) options.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-brand-navy">Premium Lens Implants</h4>
                      <p className="text-xs text-brand-navy/70 mt-0.5 font-lora">Advanced Foldable, Aspheric, Multifocal, and EDOF (Symphony) lenses. SF-IOL / AC-IOL implants in complicated cases.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-brand-navy">Recovery & Ward Rooms</h4>
                      <p className="text-xs text-brand-navy/70 mt-0.5 font-lora">Comfortable recovery ward equipped with specialized beds and recliners for the convenience of outpatient OT clients.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-brand-navy">OPD & Consultation Stations</h4>
                      <p className="text-xs text-brand-navy/70 mt-0.5 font-lora">Features 2 diagnostic refraction stations, 2 doctor consult chambers, and a separate counseling room for patient guidance.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-brand-navy">Stores & Power Backup</h4>
                      <p className="text-xs text-brand-navy/70 mt-0.5 font-lora">In-house Optical store, Medical store/pharmacy, and a 24-hour generator power backup system for uninterrupted patient care.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-brand-navy/5 mt-8 flex justify-between items-center flex-wrap gap-4">
              <p className="text-xs text-brand-navy/50 font-lora">
                * All diagnostics and services meet rigid national standards and are NABH certified.
              </p>
              <Link to="/facilities" className="text-brand-teal text-[10px] tracking-wider uppercase font-black flex items-center gap-1 hover:text-brand-navy transition-colors">
                View Full Facilities
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
          
          {/* Right Column: Values */}
          <div className="lg:col-span-5 bg-brand-navy text-cream rounded-[3rem] p-10 md:p-12 shadow-xl border border-cream/10 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl" />
            
            <div>
              <h2 className="text-2xl font-black mb-6 tracking-wide">Our Core Values</h2>
              <div className="space-y-6">
                {[
                  { icon: <Shield className="text-brand-teal w-6 h-6" />, title: 'Uncompromising Safety', desc: 'Adhering to strict NABH safety standards and sterile operating theater protocols.' },
                  { icon: <Sparkles className="text-brand-teal w-6 h-6" />, title: 'Advanced Technology', desc: 'Deploying laser diagnostics and robotics from Carl Zeiss and Alcon.' },
                  { icon: <Activity className="text-brand-teal w-6 h-6" />, title: 'Clinical Rigor', desc: 'Case consults managed by board-certified, AIIMS-trained surgeons.' },
                  { icon: <Award className="text-brand-teal w-6 h-6" />, title: 'Patient Integrity', desc: 'Transparent billing packages and strictly ethical treatment decisions.' }
                ].map((v, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="p-3 bg-cream/5 rounded-2xl shrink-0">{v.icon}</div>
                    <div>
                      <h3 className="font-bold text-sm mb-1">{v.title}</h3>
                      <p className="text-xs text-cream/70 leading-relaxed font-lora">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mission, Aim, Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
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
            <h3 className="text-xl font-bold text-brand-navy mb-3">Our Mission</h3>
            <p className="text-sm text-brand-navy/70 leading-relaxed font-lora">
              To deliver ethical, state-of-the-art eye care with maximum precision, utilizing advanced technology to restore and preserve sight for every individual who walks through our doors.
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
            <h3 className="text-xl font-bold text-brand-navy mb-3">Our Aim</h3>
            <p className="text-sm text-brand-navy/70 leading-relaxed font-lora">
              To ensure accessibility to quality eye care, eradicate preventable blindness, and consistently upgrade our surgical infrastructure to protect visual wellness.
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
            <h3 className="text-xl font-bold text-brand-navy mb-3">Our Vision</h3>
            <p className="text-sm text-brand-navy/70 leading-relaxed font-lora">
              To be a global benchmark for patient-centric ophthalmic excellence, setting new standards in clinical outcomes, empathy, and affordable cutting-edge treatments.
            </p>
          </motion.div>
        </div>

        {/* Doctors Showcase Section */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 font-body">Expert Doctors</p>
            <h2 className="section-text text-brand-navy mb-6 font-body">Our Medical Experts</h2>
            <p className="text-base text-brand-navy/60 font-lora">
              Meet our board-certified, AIIMS-trained surgeons and consulting specialists leading our clinical teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
            {doctors.map((doc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="bg-brand-navy text-cream rounded-[2.5rem] overflow-hidden border border-cream/5 shadow-xl flex flex-col justify-between group"
              >
                <div>
                  {/* Doctor Image Container */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-navy-deep border-b border-cream/10">
                    <img 
                      src={doc.image} 
                      alt={doc.name} 
                      className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent" />
                  </div>

                  {/* Doctor Info Details */}
                  <div className="p-8 pb-4">
                    <span className="text-[10px] text-brand-teal tracking-widest font-black uppercase font-body">{doc.role}</span>
                    <h3 className="text-xl font-black mt-1 font-body text-cream min-h-[3.5rem] flex items-center">{doc.name}</h3>
                    <p className="text-xs text-brand-teal/80 italic mt-1 font-lora leading-normal min-h-[2.5rem]">{doc.specialty}</p>

                    <hr className="border-cream/10 my-4" />

                    <p className="text-xs text-cream/70 font-lora leading-relaxed mb-6 min-h-[6.5rem]">{doc.desc}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex gap-2.5 items-start text-xs min-h-[2.5rem]">
                        <GraduationCap className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                        <span><strong>Education:</strong> {doc.edu}</span>
                      </div>
                      <div className="flex gap-2.5 items-start text-xs">
                        <Award className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                        <div>
                          <strong>Key Milestones:</strong>
                          <ul className="list-disc pl-4 text-cream/60 text-[11px] mt-1 space-y-1">
                            {doc.fellowships.slice(0, 3).map((f, i) => <li key={i}>{f}</li>)}
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
                    Book Slot
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:rotate-45 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Ophthalmic Panel Spot Note */}
          <div className="max-w-4xl mx-auto bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 md:p-10 shadow-md text-brand-navy">
            <div className="flex items-center gap-3 mb-4">
              <Stethoscope className="w-5 h-5 text-brand-teal" />
              <span className="text-[10px] text-brand-teal tracking-widest font-black uppercase">Ophthalmic Panel</span>
            </div>
            <h3 className="text-xl font-black mb-2">Consulting Surgeons & Clinical Support</h3>
            <p className="text-xs font-lora text-brand-navy/70 leading-relaxed">
              Our clinical panel also includes consulting surgeons and specialists working in rotation. Together, our panel strives to deliver premium, ethical, and personal eye care using the highest level of diagnostic technology and surgical standards.
            </p>
          </div>
        </div>

        {/* History Timeline */}
        <div className="bg-cream-dark/40 rounded-[3rem] p-10 md:p-16 border border-brand-navy/5">
          <h2 className="text-center font-merriweather text-xs tracking-[0.4em] uppercase font-black text-brand-navy/40 mb-16">Our Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { year: '2003', title: 'Foundation', desc: 'Established our primary superspecialty clinic in Haldwani with dedicated outpatient care.' },
              { year: '2010', title: 'Refractive Suite', desc: 'Launched advanced laser vision correction and LASIK capabilities.' },
              { year: '2018', title: 'Robotic Surgery', desc: 'Acquired Carl Zeiss and Alcon FLACS laser surgery suites.' },
              { year: '2026', title: '15,000+ Smiles', desc: 'Celebrating vision restored across generations of Kumaun patients.' }
            ].map((t, i) => (
              <div key={i} className="flex flex-col border-t border-brand-navy/10 pt-6">
                <span className="text-5xl font-black text-brand-teal mb-3">{t.year}</span>
                <h3 className="font-bold text-sm mb-1 text-brand-navy">{t.title}</h3>
                <p className="text-xs text-brand-navy/60 leading-relaxed font-lora">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shared Footer CTA */}
      <FooterCTA />
    </motion.div>
  );
};

export default About;
