import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, CheckCircle2, Search, Activity, Award, AlertTriangle, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EditableContainer, EditableText, EditableMedia, EditableList } from '../components/Editable';
import FooterCTA from '../components/FooterCTA';

// Assets
import serviceLasik from '../assets/service-lasik.png';

const RefractiveSurgery: React.FC = () => {
  const defaultDiagnosticChecks = [
    {
      id: 'diag-1',
      title: 'Corneal Topography & Elevation Mapping',
      desc: 'Highly detailed elevation scan maps plotting 22,000 distinct points on the cornea, critical for mapping astigmatism and checking structural safety parameters.'
    },
    {
      id: 'diag-2',
      title: 'Optical Biometry & Lens Sizing',
      desc: 'Advanced non-contact biometry scanning to measure exact axial length and anterior chamber depth, establishing sizing parameters before lens implantation.'
    },
    {
      id: 'diag-3',
      title: 'Dry Eye & Tear Film Assessment',
      desc: 'Thorough evaluation of the tear film and corneal surface to ensure post-operative healing comfort and optimize visual stability.'
    },
    {
      id: 'diag-4',
      title: 'Pachymetry (Corneal Thickness)',
      desc: 'Ultrasonic or optical measurements of corneal thickness to verify the structural suitability and safety parameters of the eye.'
    }
  ];

  const defaultCorrectiveProcedures = [
    {
      id: 'corr-lasik',
      title: 'Femto-LASIK (Bladeless Laser)',
      desc: 'Advanced bladeless laser vision correction using a high-precision femtosecond laser to create a corneal flap and an excimer laser to reshape the cornea with sub-micron accuracy.'
    },
    {
      id: 'corr-1',
      title: 'Implantable Collamer Lenses (ICL)',
      desc: 'Premium phakic lens implants for thin corneas or high prescriptions (up to -20.00D), providing permanent vision correction without altering or thinning the natural cornea.'
    },
    {
      id: 'corr-2',
      title: 'Refractive Lens Exchange (RLE)',
      desc: 'Replacing the eye\'s natural crystalline lens with a premium multifocal, trifocal, or toric intraocular lens, correcting high errors and providing presbyopia freedom.'
    },
    {
      id: 'corr-3',
      title: 'Toric IOLs & Astigmatism Correction',
      desc: 'Direct optical astigmatism correction through high-precision custom calculations and premium toric intraocular lens implantation.'
    },
    {
      id: 'corr-4',
      title: 'Phakic Intraocular Lenses',
      desc: 'Specialized micro-incision lens implants placed in front of the natural lens, offering an excellent alternative for patients unsuitable for traditional laser correction.'
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
        <EditableContainer id="refractive-header" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7">
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">
              <EditableText id="refractive-eyebrow">Refractive Independence</EditableText>
            </span>
            <h1 className="section-text text-brand-navy mb-6">
              <EditableText id="refractive-title">Refractive Surgery & Lens Implants</EditableText>
            </h1>
            <p className="text-lg font-lora text-brand-navy/70 leading-relaxed mb-6">
              <EditableText id="refractive-subtitle">Imagine waking up to crystal clear vision without glasses. We offer advanced lens-based refractive solutions tailored to the unique structure of your eyes.</EditableText>
            </p>
            <p className="text-sm text-brand-navy/60 leading-relaxed mb-8">
              <EditableText id="refractive-description">Under our NABH-certified surgical care protocols, experienced surgeons use high-precision diagnostic mapping and premium phakic intraocular lenses (ICL) to permanently correct myopia, hyperopia, and astigmatism.</EditableText>
            </p>
            <Link to="/appointment" className="group bg-brand-navy text-cream hover:bg-brand-teal hover:text-brand-navy px-8 py-5 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all flex items-center justify-between max-w-xs shadow-md">
              <EditableText id="refractive-btn">Check Suitability</EditableText>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
          
          {/* Full Bleed Image Placement */}
          <div className="lg:col-span-5 relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-brand-navy aspect-[4/3] border border-cream/10">
            <EditableMedia 
              id="refractive-image-hero"
              src={serviceLasik} 
              alt="Painless. Precise. Ethical." 
              className="w-full h-full object-cover opacity-90 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-transparent to-transparent p-8 flex items-end pointer-events-none">
              <div>
                <span className="text-[10px] text-brand-teal tracking-[0.3em] font-black uppercase">
                  <EditableText id="refractive-image-eyebrow">Painless. Precise. Ethical.</EditableText>
                </span>
                <p className="text-cream text-lg font-merriweather font-bold mt-1">
                  <EditableText id="refractive-image-title">NABH-certified surgical care wing.</EditableText>
                </p>
              </div>
            </div>
          </div>
        </EditableContainer>

        {/* Suitability Checks Section */}
        <EditableContainer id="refractive-suitability-sec" className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">
              <EditableText id="refractive-diag-eyebrow">Diagnostics Suite</EditableText>
            </p>
            <h2 className="section-text text-brand-navy mb-6">
              <EditableText id="refractive-diag-title">Pre-Surgical Screening & Safety Audits</EditableText>
            </h2>
            <p className="text-base text-brand-navy/60 font-lora">
              <EditableText id="refractive-diag-description">Safety is our absolute priority. We perform comprehensive structural suitability checks using advanced Corneal Topography and Optical Biometry before recommending any refractive procedure.</EditableText>
            </p>
          </div>

          <EditableList
            id="refractive-diagnostics-list"
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
                    <EditableText id={`refractive-diag-item-title-${proc.id}`}>{proc.title || 'Diagnostic Check Name'}</EditableText>
                  </h3>
                  <p className="text-xs text-brand-navy/70 leading-relaxed font-lora">
                    <EditableText id={`refractive-diag-item-desc-${proc.id}`}>{proc.desc || 'Diagnostic description details'}</EditableText>
                  </p>
                </div>
              </div>
            )}
          </EditableList>
        </EditableContainer>

        {/* Corrective Procedures Section */}
        <EditableContainer id="refractive-suite-sec" className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">
              <EditableText id="refractive-corr-eyebrow">Correction Spectrum</EditableText>
            </p>
            <h2 className="section-text text-brand-navy mb-6">
              <EditableText id="refractive-corr-title">Our Refractive Treatment Suite</EditableText>
            </h2>
            <p className="text-base text-brand-navy/60 font-lora">
              <EditableText id="refractive-corr-description">From advanced Implantable Collamer Lenses (ICL) to Refractive Lens Exchange (RLE), we offer safe, premium, non-laser refractive corrections.</EditableText>
            </p>
          </div>

          <EditableList
            id="refractive-corrective-list"
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
                    <EditableText id={`refractive-corr-item-title-${proc.id}`}>{proc.title || 'Treatment Title'}</EditableText>
                  </h3>
                  <p className="text-xs text-brand-navy/70 leading-relaxed font-lora">
                    <EditableText id={`refractive-corr-item-desc-${proc.id}`}>{proc.desc || 'Treatment description details'}</EditableText>
                  </p>
                </div>
              </div>
            )}
          </EditableList>
        </EditableContainer>

        {/* Symptoms, Effects, and Cure Section */}
        <EditableContainer id="refractive-risks-sec" className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">
              <EditableText id="refractive-risks-eyebrow">Clinical Profile</EditableText>
            </p>
            <h2 className="section-text text-brand-navy mb-6">
              <EditableText id="refractive-risks-title">Symptoms, Risks & Treatments</EditableText>
            </h2>
            <p className="text-base text-brand-navy/60 font-lora">
              <EditableText id="refractive-risks-description">Understanding refractive errors, lifestyle impacts of visual dependence, and advanced lens correction solutions.</EditableText>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Symptoms Card */}
            <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-brand-navy mb-4">
                <EditableText id="refractive-symp-card-title">Common Symptoms</EditableText>
              </h3>
              <ul className="space-y-3 text-xs leading-relaxed text-brand-navy/70 font-lora list-disc pl-4">
                <li><EditableText id="refractive-symp-item-1">Nearsightedness (difficulty seeing distant road signs or whiteboards clearly)</EditableText></li>
                <li><EditableText id="refractive-symp-item-2">Farsightedness (blurry vision when reading or looking at phone screens)</EditableText></li>
                <li><EditableText id="refractive-symp-item-3">Astigmatism (distorted or shadowed vision at all focal distances)</EditableText></li>
                <li><EditableText id="refractive-symp-item-4">Frequent eye strain, headaches, and squinting to focus</EditableText></li>
              </ul>
            </div>

            {/* Effects Card */}
            <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mb-6">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-brand-navy mb-4">
                <EditableText id="refractive-effects-card-title">Potential Effects</EditableText>
              </h3>
              <ul className="space-y-3 text-xs leading-relaxed text-brand-navy/70 font-lora list-disc pl-4">
                <li><EditableText id="refractive-effects-item-1">Heavy and restrictive dependency on spectacles or contact lenses</EditableText></li>
                <li><EditableText id="refractive-effects-item-2">Limitations in participating in active sports, swimming, and professional careers (e.g., defense, aviation)</EditableText></li>
                <li><EditableText id="refractive-effects-item-3">Chronic dry eye and corneal hypoxia from long-term contact lens overwear</EditableText></li>
                <li><EditableText id="refractive-effects-item-4">Substandard peripheral visual tracking due to frame obstructions</EditableText></li>
              </ul>
            </div>

            {/* Cure Card */}
            <div className="bg-brand-navy text-cream rounded-[2.5rem] p-8 shadow-xl border border-cream/5 hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-brand-teal/10 text-brand-teal rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-cream mb-4">
                <EditableText id="refractive-cure-card-title">The Cure / Treatment</EditableText>
              </h3>
              <ul className="space-y-3 text-xs leading-relaxed text-cream/80 font-lora list-disc pl-4">
                <li><EditableText id="refractive-cure-item-1">Implantation of premium Implantable Collamer Lenses (ICL) for thin corneas or high refractive errors</EditableText></li>
                <li><EditableText id="refractive-cure-item-2">Refractive Lens Exchange (RLE) to replace the natural lens with advanced multifocal/toric IOLs</EditableText></li>
                <li><EditableText id="refractive-cure-item-3">Topography-guided pre-surgical diagnostics for customized treatment planning</EditableText></li>
                <li><EditableText id="refractive-cure-item-4">Professional fitting and post-operative monitoring by board-certified specialists</EditableText></li>
              </ul>
            </div>
          </div>
        </EditableContainer>

        {/* Tech Features Banner */}
        <EditableContainer id="refractive-tech-sec" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-brand-navy text-cream rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-xl">
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl pointer-events-none" />
          <div className="lg:col-span-12 flex flex-col justify-center">
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">
              <EditableText id="refractive-tech-eyebrow">Personalized Sight Correction</EditableText>
            </span>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
              <EditableText id="refractive-tech-title">Advanced Phakic ICL Lens Implantation</EditableText>
            </h2>
            <p className="text-base text-cream/70 font-lora leading-relaxed mb-8 max-w-3xl">
              <EditableText id="refractive-tech-description">We employ advanced micro-incision techniques to insert premium Implantable Collamer Lenses (ICL). This technique corrects extreme refractive errors with outstanding HD clarity without changing your natural corneal shape, preserving corneal biomechanics for a lifetime.</EditableText>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-cream">
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Sparkles className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">
                  <EditableText id="refractive-tech-badge-1-title">Corneal Preserving</EditableText>
                </h3>
                <p className="text-[11px] text-cream/60 leading-normal">
                  <EditableText id="refractive-tech-badge-1-desc">Preserves natural corneal tissue completely.</EditableText>
                </p>
              </div>
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Activity className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">
                  <EditableText id="refractive-tech-badge-2-title">High Prescriptions</EditableText>
                </h3>
                <p className="text-[11px] text-cream/60 leading-normal">
                  <EditableText id="refractive-tech-badge-2-desc">Highly effective for extreme myopia, hyperopia, and astigmatism.</EditableText>
                </p>
              </div>
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Award className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">
                  <EditableText id="refractive-tech-badge-3-title">Reversible Option</EditableText>
                </h3>
                <p className="text-[11px] text-cream/60 leading-normal">
                  <EditableText id="refractive-tech-badge-3-desc">The collamer lens can be safely removed or replaced if required.</EditableText>
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

export default RefractiveSurgery;
