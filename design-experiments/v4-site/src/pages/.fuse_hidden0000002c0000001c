import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, CheckCircle2, Search, Activity, Award, AlertTriangle, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EditableContainer, EditableText, EditableMedia, EditableList } from '../components/Editable';
import FooterCTA from '../components/FooterCTA';

// Assets
import serviceLasik from '../assets/service-lasik.png';

const LASIK: React.FC = () => {
  const defaultDiagnosticChecks = [
    {
      id: 'diag-1',
      title: 'Corneal Topography & Elevation Mapping',
      desc: 'Highly detailed elevation scan maps plotting 22,000 distinct points on the cornea, critical for mapping astigmatism and checking keratoconus safety.'
    },
    {
      id: 'diag-2',
      title: 'Optical Biometry (ALADIN)',
      desc: 'Advanced non-contact biometry scanning to measure exact corneal curvature and axial length, establishing safety parameters before laser correction.'
    },
    {
      id: 'diag-3',
      title: 'Dry Eye & Tear Film Assessment',
      desc: 'Thorough evaluation of the tear film and corneal surface to ensure post-operative healing comfort and optimize visual stability.'
    },
    {
      id: 'diag-4',
      title: 'Pachymetry (Corneal Thickness)',
      desc: 'Ultrasonic or optical measurements of corneal thickness to verify the residual stromal bed is thick enough for safe flap creation.'
    }
  ];

  const defaultCorrectiveProcedures = [
    {
      id: 'corr-1',
      title: 'Wavefront-Guided Femto-LASIK',
      desc: 'Completely customized, blade-free laser vision correction. A computerized femtosecond laser creates a precise flap, followed by personalized correction.'
    },
    {
      id: 'corr-2',
      title: 'Flapless keyhole SMILE',
      desc: 'Small-incision lenticule extraction. Flapless, sutureless refractive surgery that minimizes dry eye and preserves maximal corneal strength.'
    },
    {
      id: 'corr-3',
      title: 'Implantable Collamer Lenses (ICL)',
      desc: 'Premium phakic lens implants for thin corneas or high prescriptions (up to -20.00D), providing permanent correction without thinning the cornea.'
    },
    {
      id: 'corr-4',
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
        <EditableContainer id="lasik-header" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7">
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">
              <EditableText id="lasik-eyebrow">Refractive Independence</EditableText>
            </span>
            <h1 className="section-text text-brand-navy mb-6">
              <EditableText id="lasik-title">Bladeless Femto-LASIK & SMILE</EditableText>
            </h1>
            <p className="text-lg font-lora text-brand-navy/70 leading-relaxed mb-6">
              <EditableText id="lasik-subtitle">Imagine waking up to crystal clear vision without glasses. We offer advanced, blade-free laser vision correction tailored to the unique topography of your eyes.</EditableText>
            </p>
            <p className="text-sm text-brand-navy/60 leading-relaxed mb-8">
              <EditableText id="lasik-description">Under our NABH-certified surgical care protocols, AIIMS-trained surgeons use high-precision topography-guided mapping and advanced excimer lasers to permanently correct myopia, hyperopia, and astigmatism.</EditableText>
            </p>
            <Link to="/appointment" className="group bg-brand-navy text-cream hover:bg-brand-teal hover:text-brand-navy px-8 py-5 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all flex items-center justify-between max-w-xs shadow-md">
              <EditableText id="lasik-btn">Check LASIK Suitability</EditableText>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
          
          {/* Full Bleed Image Placement */}
          <div className="lg:col-span-5 relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-brand-navy aspect-[4/3] border border-cream/10">
            <EditableMedia 
              id="lasik-image-hero"
              src={serviceLasik} 
              alt="Painless. Precise. Ethical." 
              className="w-full h-full object-cover opacity-90 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-transparent to-transparent p-8 flex items-end pointer-events-none">
              <div>
                <span className="text-[10px] text-brand-teal tracking-[0.3em] font-black uppercase">
                  <EditableText id="lasik-image-eyebrow">Painless. Precise. Ethical.</EditableText>
                </span>
                <p className="text-cream text-lg font-merriweather font-bold mt-1">
                  <EditableText id="lasik-image-title">NABH-certified surgical care wing.</EditableText>
                </p>
              </div>
            </div>
          </div>
        </EditableContainer>

        {/* Suitability Checks Section */}
        <EditableContainer id="lasik-suitability-sec" className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">
              <EditableText id="lasik-diag-eyebrow">Diagnostics Suite</EditableText>
            </p>
            <h2 className="section-text text-brand-navy mb-6">
              <EditableText id="lasik-diag-title">LASIK Screening & Safety Audits</EditableText>
            </h2>
            <p className="text-base text-brand-navy/60 font-lora">
              <EditableText id="lasik-diag-description">Safety is our absolute priority. We perform comprehensive structural suitability checks using advanced Corneal Topography before recommending any refractive procedure.</EditableText>
            </p>
          </div>

          <EditableList
            id="lasik-diagnostics-list"
            defaultItems={defaultDiagnosticChecks}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            newItemTemplate={{
              title: 'New Diagnostic Check',
              desc: 'Describe diagnostic scan device, purpose, and visual outcomes here...'
            }}
          >
            {(proc) => (
              <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300 flex gap-4 items-start h-full">
                <div className="p-3 bg-brand-navy/5 rounded-2xl shrink-0 text-brand-teal">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-brand-navy mb-2">
                    <EditableText id={`lasik-diag-item-title-${proc.id}`}>{proc.title || 'Diagnostic Check Name'}</EditableText>
                  </h3>
                  <p className="text-xs text-brand-navy/70 leading-relaxed font-lora">
                    <EditableText id={`lasik-diag-item-desc-${proc.id}`}>{proc.desc || 'Diagnostic description details'}</EditableText>
                  </p>
                </div>
              </div>
            )}
          </EditableList>
        </EditableContainer>

        {/* Laser Suite Section */}
        <EditableContainer id="lasik-suite-sec" className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">
              <EditableText id="lasik-corr-eyebrow">Correction Spectrum</EditableText>
            </p>
            <h2 className="section-text text-brand-navy mb-6">
              <EditableText id="lasik-corr-title">Our Refractive Treatment Suite</EditableText>
            </h2>
            <p className="text-base text-brand-navy/60 font-lora">
              <EditableText id="lasik-corr-description">From advanced Femto lasers to micro-incision SMILE and phakic ICL lens implants, we offer the complete range of refractive corrections.</EditableText>
            </p>
          </div>

          <EditableList
            id="lasik-corrective-list"
            defaultItems={defaultCorrectiveProcedures}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            newItemTemplate={{
              title: 'New Refractive Solution',
              desc: 'Describe laser tech or implant lens details and focal specs here...'
            }}
          >
            {(proc) => (
              <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300 flex gap-4 items-start h-full">
                <div className="p-3 bg-brand-navy/5 rounded-2xl shrink-0 text-brand-teal">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-brand-navy mb-2">
                    <EditableText id={`lasik-corr-item-title-${proc.id}`}>{proc.title || 'Treatment Title'}</EditableText>
                  </h3>
                  <p className="text-xs text-brand-navy/70 leading-relaxed font-lora">
                    <EditableText id={`lasik-corr-item-desc-${proc.id}`}>{proc.desc || 'Treatment description details'}</EditableText>
                  </p>
                </div>
              </div>
            )}
          </EditableList>
        </EditableContainer>

        {/* Symptoms, Effects, and Cure Section */}
        <EditableContainer id="lasik-risks-sec" className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">
              <EditableText id="lasik-risks-eyebrow">Clinical Profile</EditableText>
            </p>
            <h2 className="section-text text-brand-navy mb-6">
              <EditableText id="lasik-risks-title">Symptoms, Risks & Treatments</EditableText>
            </h2>
            <p className="text-base text-brand-navy/60 font-lora">
              <EditableText id="lasik-risks-description">Understanding refractive errors, lifestyle impacts of visual dependence, and laser correction solutions.</EditableText>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Symptoms Card */}
            <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-brand-navy mb-4">
                <EditableText id="lasik-symp-card-title">Common Symptoms</EditableText>
              </h3>
              <ul className="space-y-3 text-xs leading-relaxed text-brand-navy/70 font-lora list-disc pl-4">
                <li><EditableText id="lasik-symp-item-1">Nearsightedness (difficulty seeing distant road signs or whiteboards clearly)</EditableText></li>
                <li><EditableText id="lasik-symp-item-2">Farsightedness (blurry vision when reading or looking at phone screens)</EditableText></li>
                <li><EditableText id="lasik-symp-item-3">Astigmatism (distorted or shadowed vision at all focal distances)</EditableText></li>
                <li><EditableText id="lasik-symp-item-4">Frequent eye strain, headaches, and squinting to focus</EditableText></li>
              </ul>
            </div>

            {/* Effects Card */}
            <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mb-6">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-brand-navy mb-4">
                <EditableText id="lasik-effects-card-title">Potential Effects</EditableText>
              </h3>
              <ul className="space-y-3 text-xs leading-relaxed text-brand-navy/70 font-lora list-disc pl-4">
                <li><EditableText id="lasik-effects-item-1">Heavy and restrictive dependency on heavy spectacles or contact lenses</EditableText></li>
                <li><EditableText id="lasik-effects-item-2">Limitations in participating in active sports, swimming, and professional careers (e.g., defense, aviation)</EditableText></li>
                <li><EditableText id="lasik-effects-item-3">Chronic dry eye and corneal hypoxia from long-term contact lens overwear</EditableText></li>
                <li><EditableText id="lasik-effects-item-4">Substandard peripheral visual tracking due to frame obstructions</EditableText></li>
              </ul>
            </div>

            {/* Cure Card */}
            <div className="bg-brand-navy text-cream rounded-[2.5rem] p-8 shadow-xl border border-cream/5 hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-brand-teal/10 text-brand-teal rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-cream mb-4">
                <EditableText id="lasik-cure-card-title">The Cure / Treatment</EditableText>
              </h3>
              <ul className="space-y-3 text-xs leading-relaxed text-cream/80 font-lora list-disc pl-4">
                <li><EditableText id="lasik-cure-item-1">Wavefront-guided Femto-LASIK (completely blade-free flap procedure)</EditableText></li>
                <li><EditableText id="lasik-cure-item-2">SMILE (Small Incision Lenticule Extraction) flapless keyhole correction</EditableText></li>
                <li><EditableText id="lasik-cure-item-3">Implantation of Implantable Collamer Lenses (ICL) for thin corneas or high refractive errors</EditableText></li>
                <li><EditableText id="lasik-cure-item-4">Topography-guided Contoura Vision custom corneal ablation for HD clarity</EditableText></li>
              </ul>
            </div>
          </div>
        </EditableContainer>

        {/* Tech Features Banner */}
        <EditableContainer id="lasik-tech-sec" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-brand-navy text-cream rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-xl">
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl pointer-events-none" />
          <div className="lg:col-span-12 flex flex-col justify-center">
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">
              <EditableText id="lasik-tech-eyebrow">Personalized Sight Correction</EditableText>
            </span>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
              <EditableText id="lasik-tech-title">Advanced Contoura Vision Corneal Mapping</EditableText>
            </h2>
            <p className="text-base text-cream/70 font-lora leading-relaxed mb-8 max-w-3xl">
              <EditableText id="lasik-tech-description">We employ advanced Contoura Vision mapping that analyzes 22,000 unique elevation points on your cornea. This maps optical imperfections in detail, enabling excimer lasers to create a highly personalized treatment profile for extremely sharp vision.</EditableText>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-cream">
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Sparkles className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">
                  <EditableText id="lasik-tech-badge-1-title">Bladeless Flaps</EditableText>
                </h3>
                <p className="text-[11px] text-cream/60 leading-normal">
                  <EditableText id="lasik-tech-badge-1-desc">Computer-guided femtosecond flap creations.</EditableText>
                </p>
              </div>
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Activity className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">
                  <EditableText id="lasik-tech-badge-2-title">Corneal Topography</EditableText>
                </h3>
                <p className="text-[11px] text-cream/60 leading-normal">
                  <EditableText id="lasik-tech-badge-2-desc">Safeguarding long-term corneal biomechanical strength.</EditableText>
                </p>
              </div>
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Award className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">
                  <EditableText id="lasik-tech-badge-3-title">Permanent Freedom</EditableText>
                </h3>
                <p className="text-[11px] text-cream/60 leading-normal">
                  <EditableText id="lasik-tech-badge-3-desc">No glasses or contacts needed after brief 15 min procedures.</EditableText>
                </p>
              </div>
            </div>
          </div>
        </EditableContainer>
      </div>

      {/* Shared Footer CTA */}
      <FooterCTA />
    </motion.div>
  );
};

export default LASIK;
