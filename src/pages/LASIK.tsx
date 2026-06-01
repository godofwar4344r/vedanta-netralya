import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, CheckCircle2, Search, Activity, Award, AlertTriangle, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import FooterCTA from '../components/FooterCTA';

// Assets
import heroSurgery from '../assets/hero-surgery.png';

const LASIK: React.FC = () => {
  const diagnosticChecks = [
    {
      title: 'Corneal Topography & Elevation Mapping',
      desc: 'Highly detailed elevation scan maps plotting 22,000 distinct points on the cornea, critical for mapping astigmatism and checking keratoconus safety.'
    },
    {
      title: 'Optical Biometry (ALADIN)',
      desc: 'Advanced non-contact biometry scanning to measure exact corneal curvature and axial length, establishing safety parameters before laser correction.'
    },
    {
      title: 'Dry Eye & Tear Film Assessment',
      desc: 'Thorough evaluation of the tear film and corneal surface to ensure post-operative healing comfort and optimize visual stability.'
    },
    {
      title: 'Pachymetry (Corneal Thickness)',
      desc: 'Ultrasonic or optical measurements of corneal thickness to verify the residual stromal bed is thick enough for safe flap creation.'
    }
  ];

  const correctiveProcedures = [
    {
      title: 'Wavefront-Guided Femto-LASIK',
      desc: 'Completely customized, blade-free laser vision correction. A computerized femtosecond laser creates a precise flap, followed by personalized correction.'
    },
    {
      title: 'Flapless keyhole SMILE',
      desc: 'Small-incision lenticule extraction. Flapless, sutureless refractive surgery that minimizes dry eye and preserves maximal corneal strength.'
    },
    {
      title: 'Implantable Collamer Lenses (ICL)',
      desc: 'Premium phakic lens implants for thin corneas or high prescriptions (up to -20.00D), providing permanent correction without thinning the cornea.'
    },
    {
      title: 'Toric Lenses & Astigmatism Correction',
      desc: 'Direct optical astigmatism correction through tailored laser profiling or implantation of premium toric intraocular lenses.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-transparent font-body"
    >
      <div className="max-w-[1800px] mx-auto px-6 lg:px-16 py-16">
        {/* Header Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7">
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">Refractive Independence</span>
            <h1 className="section-text text-brand-navy mb-6">Bladeless Femto-LASIK & SMILE</h1>
            <p className="text-lg font-lora text-brand-navy/70 leading-relaxed mb-6">
              Imagine waking up to crystal clear vision without glasses. We offer advanced, blade-free laser vision correction tailored to the unique topography of your eyes.
            </p>
            <p className="text-sm text-brand-navy/60 leading-relaxed mb-8">
              Under our NABH-certified surgical care protocols, AIIMS-trained surgeons use high-precision topography-guided mapping and advanced excimer lasers to permanently correct myopia, hyperopia, and astigmatism.
            </p>
            <Link to="/appointment" className="group bg-brand-navy text-cream hover:bg-brand-teal hover:text-brand-navy px-8 py-5 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all flex items-center justify-between max-w-xs shadow-md">
              Check LASIK Suitability
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
          
          {/* Visual Accoutrement */}
          <div className="lg:col-span-5 relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-brand-navy aspect-[4/3] border border-cream/10">
            <img src={heroSurgery} alt="Painless. Precise. Ethical." className="w-full h-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-transparent to-transparent p-8 flex items-end">
              <div>
                <span className="text-[10px] text-brand-teal tracking-[0.3em] font-black uppercase">Painless. Precise. Ethical.</span>
                <p className="text-cream text-lg font-merriweather font-bold mt-1">NABH-certified surgical care wing.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Suitability Checks Section */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Diagnostics Suite</p>
            <h2 className="section-text text-brand-navy mb-6">LASIK Screening & Safety Audits</h2>
            <p className="text-base text-brand-navy/60 font-lora">
              Safety is our absolute priority. We perform comprehensive structural suitability checks using advanced Corneal Topography before recommending any refractive procedure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {diagnosticChecks.map((proc, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300 flex gap-4 items-start"
              >
                <div className="p-3 bg-brand-navy/5 rounded-2xl shrink-0 text-brand-teal">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-brand-navy mb-2">{proc.title}</h3>
                  <p className="text-xs text-brand-navy/70 leading-relaxed font-lora">{proc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Laser Suite Section */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Correction Spectrum</p>
            <h2 className="section-text text-brand-navy mb-6">Our Refractive Treatment Suite</h2>
            <p className="text-base text-brand-navy/60 font-lora">
              From advanced Femto lasers to micro-incision SMILE and phakic ICL lens implants, we offer the complete range of refractive corrections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {correctiveProcedures.map((proc, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300 flex gap-4 items-start"
              >
                <div className="p-3 bg-brand-navy/5 rounded-2xl shrink-0 text-brand-teal">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-brand-navy mb-2">{proc.title}</h3>
                  <p className="text-xs text-brand-navy/70 leading-relaxed font-lora">{proc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Symptoms, Effects, and Cure Section */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Clinical Profile</p>
            <h2 className="section-text text-brand-navy mb-6">Symptoms, Risks & Treatments</h2>
            <p className="text-base text-brand-navy/60 font-lora">
              Understanding refractive errors, lifestyle impacts of visual dependence, and laser correction solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Symptoms Card */}
            <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-brand-navy mb-4">Common Symptoms</h3>
              <ul className="space-y-3 text-xs leading-relaxed text-brand-navy/70 font-lora list-disc pl-4">
                <li>Nearsightedness (difficulty seeing distant road signs or whiteboards clearly)</li>
                <li>Farsightedness (blurry vision when reading or looking at phone screens)</li>
                <li>Astigmatism (distorted or shadowed vision at all focal distances)</li>
                <li>Frequent eye strain, headaches, and squinting to focus</li>
              </ul>
            </div>

            {/* Effects Card */}
            <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mb-6">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-brand-navy mb-4">Potential Effects</h3>
              <ul className="space-y-3 text-xs leading-relaxed text-brand-navy/70 font-lora list-disc pl-4">
                <li>Heavy and restrictive dependency on heavy spectacles or contact lenses</li>
                <li>Limitations in participating in active sports, swimming, and professional careers (e.g., defense, aviation)</li>
                <li>Chronic dry eye and corneal hypoxia from long-term contact lens overwear</li>
                <li>Substandard peripheral visual tracking due to frame obstructions</li>
              </ul>
            </div>

            {/* Cure Card */}
            <div className="bg-brand-navy text-cream rounded-[2.5rem] p-8 shadow-xl border border-cream/5 hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-brand-teal/10 text-brand-teal rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-cream mb-4">The Cure / Treatment</h3>
              <ul className="space-y-3 text-xs leading-relaxed text-cream/80 font-lora list-disc pl-4">
                <li>Wavefront-guided Femto-LASIK (completely blade-free flap procedure)</li>
                <li>SMILE (Small Incision Lenticule Extraction) flapless keyhole correction</li>
                <li>Implantation of Implantable Collamer Lenses (ICL) for thin corneas or high refractive errors</li>
                <li>Topography-guided Contoura Vision custom corneal ablation for HD clarity</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tech Features Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-brand-navy text-cream rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-xl">
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl" />
          <div className="lg:col-span-12 flex flex-col justify-center">
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">Personalized Sight Correction</span>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Advanced Contoura Vision Corneal Mapping</h2>
            <p className="text-base text-cream/70 font-lora leading-relaxed mb-8 max-w-3xl">
              We employ advanced Contoura Vision mapping that analyzes 22,000 unique elevation points on your cornea. This maps optical imperfections in detail, enabling excimer lasers to create a highly personalized treatment profile for extremely sharp vision.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Sparkles className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">Bladeless Flaps</h3>
                <p className="text-[11px] text-cream/60 leading-normal">Computer-guided femtosecond flap creations.</p>
              </div>
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Activity className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">Corneal Topography</h3>
                <p className="text-[11px] text-cream/60 leading-normal">Safeguarding long-term corneal biomechanical strength.</p>
              </div>
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Award className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">Permanent Freedom</h3>
                <p className="text-[11px] text-cream/60 leading-normal">No glasses or contacts needed after brief 15 min procedures.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shared Footer CTA */}
      <FooterCTA />
    </motion.div>
  );
};

export default LASIK;

