import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Sparkles, Award, ArrowUpRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EditableContainer, EditableText, EditableMedia, EditableList } from '../components/Editable';
import FooterCTA from '../components/FooterCTA';

// Assets
import heroElder from '../assets/cataract_awareness_banner.png';
import serviceCataract from '../assets/service-cataract.png';

const Cataract: React.FC = () => {
  const defaultCataractProcedures = [
    {
      id: 'proc-1',
      title: 'World-Class Microphaco (MICS)',
      desc: 'Advanced Micro-Incision Cataract Surgery performing 1.8mm self-sealing, sutureless incisions. Ensures rapid healing, minimal astigmatism, and painless recovery in under 24 hours.'
    },
    {
      id: 'proc-2',
      title: 'Premium Multifocal & Toric IOLs',
      desc: 'Implantation of state-of-the-art multifocal, trifocal, and EDOF (Extended Depth of Focus - Symphony) lenses to restore clear distance, intermediate, and near vision without spectacles.'
    },
    {
      id: 'proc-3',
      title: 'Toric IOL Astigmatism Correction',
      desc: 'Custom toric intraocular lens calculations and alignments to correct pre-existing corneal astigmatism, delivering sharp distance visual acuity.'
    },
    {
      id: 'proc-4',
      title: 'Paediatric Cataract Surgery',
      desc: 'Highly specialized cataract extractions and primary posterior capsulotomy with customized intraocular lens implants tailored for the unique anatomy of infants and children.'
    },
    {
      id: 'proc-5',
      title: 'Implantable Collamer Lenses (ICL)',
      desc: 'Phakic IOL placement designed to correct high degrees of myopia (-8.00D to -20.00D) and astigmatism for patients unsuitable for standard laser correction.'
    },
    {
      id: 'proc-6',
      title: 'Secondary IOL Implantation',
      desc: 'Advanced surgical placement of scleral-fixated (SF-IOL) or anterior chamber (AC-IOL) lenses in complicated cases lacking adequate capsular support.'
    },
    {
      id: 'proc-7',
      title: 'YAG Laser Capsulotomy',
      desc: 'Quick, non-invasive outpatient laser procedure used to treat posterior capsular opacification (PCO) or "after-cataract" to restore vision back to post-operative levels.'
    },
    {
      id: 'proc-8',
      title: 'Optical Biometry (ALADIN)',
      desc: 'High-precision diagnostic scan combining topography and interferometry for exact axial length and corneal curvature measurements to calculate lens power.'
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
        <EditableContainer id="cataract-header" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7">
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">
              <EditableText id="cataract-eyebrow">Robotic Ophthalmology</EditableText>
            </span>
            <h1 className="section-text text-brand-navy mb-6">
              <EditableText id="cataract-title">Robotic FLACS Cataract Surgery</EditableText>
            </h1>
            <p className="text-lg font-lora text-brand-navy/70 leading-relaxed mb-6">
              <EditableText id="cataract-subtitle">Say goodbye to cloudy vision. We specialize in Femtosecond Laser-Assisted Cataract Surgery (FLACS), the most advanced, blade-free laser cataract technology available today.</EditableText>
            </p>
            <p className="text-sm text-brand-navy/60 leading-relaxed mb-8">
              <EditableText id="cataract-description">Using precision computer-guided lasers, our AIIMS-trained surgeons create perfect self-sealing incisions and gently soften the cataract for easy removal, achieving quick, painless recoveries.</EditableText>
            </p>
            <Link to="/appointment" className="group bg-brand-navy text-cream hover:bg-brand-teal hover:text-brand-navy px-8 py-5 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all flex items-center justify-between max-w-xs shadow-md">
              <EditableText id="cataract-btn">Schedule Screening</EditableText>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
          
          {/* Full Bleed Image Placement */}
          <div className="lg:col-span-5 relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-brand-navy aspect-[4/3] border border-cream/10">
            <EditableMedia 
              id="cataract-image-hero"
              src={serviceCataract} 
              alt="Stop Living in a Haze" 
              className="w-full h-full object-cover opacity-90 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent p-8 flex items-end pointer-events-none">
              <div>
                <span className="text-[10px] text-brand-teal tracking-[0.3em] font-black uppercase">
                  <EditableText id="cataract-image-eyebrow">Stop Living in a Haze</EditableText>
                </span>
                <p className="text-cream text-lg font-merriweather font-bold mt-1">
                  <EditableText id="cataract-image-title">Restore your vibrant vision today.</EditableText>
                </p>
              </div>
            </div>
          </div>
        </EditableContainer>

        {/* Procedures Grid - Extended Content */}
        <EditableContainer id="cataract-procedures-sec" className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">
              <EditableText id="cataract-proc-eyebrow">Procedure Catalog</EditableText>
            </p>
            <h2 className="section-text text-brand-navy mb-6">
              <EditableText id="cataract-proc-title">Our Cataract Treatment Suite</EditableText>
            </h2>
            <p className="text-base text-brand-navy/60 font-lora">
              <EditableText id="cataract-proc-description">From advanced diagnostic biometry to premium multifocal and secondary lens implants, we offer the complete spectrum of cataract care.</EditableText>
            </p>
          </div>

          <EditableList
            id="cataract-procedures-list"
            defaultItems={defaultCataractProcedures}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            newItemTemplate={{
              title: 'New Procedure Service',
              desc: 'Describe procedure technique, benefits, and outcomes details here...'
            }}
          >
            {(proc) => (
              <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300 flex gap-4 items-start h-full">
                <div className="p-3 bg-brand-navy/5 rounded-2xl shrink-0 text-brand-teal">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-brand-navy mb-2">
                    <EditableText id={`cataract-proc-item-title-${proc.id}`}>{proc.title || 'Procedure Title'}</EditableText>
                  </h3>
                  <p className="text-xs text-brand-navy/70 leading-relaxed font-lora">
                    <EditableText id={`cataract-proc-item-desc-${proc.id}`}>{proc.desc || 'Procedure Description'}</EditableText>
                  </p>
                </div>
              </div>
            )}
          </EditableList>
        </EditableContainer>

        {/* Symptoms, Effects, and Cure Section */}
        <EditableContainer id="cataract-risks-sec" className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">
              <EditableText id="cataract-risks-eyebrow">Clinical Profile</EditableText>
            </p>
            <h2 className="section-text text-brand-navy mb-6">
              <EditableText id="cataract-risks-title">Symptoms, Risks & Treatments</EditableText>
            </h2>
            <p className="text-base text-brand-navy/60 font-lora">
              <EditableText id="cataract-risks-description">Understanding the clinical presentation, long-term visual risks, and corrective procedures for cataracts.</EditableText>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Symptoms Card */}
            <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-brand-navy mb-4">
                <EditableText id="cataract-symp-card-title">Common Symptoms</EditableText>
              </h3>
              <ul className="space-y-3 text-xs leading-relaxed text-brand-navy/70 font-lora list-disc pl-4">
                <li><EditableText id="cataract-symp-item-1">Cloudy, blurry, or foggy vision that worsens over time</EditableText></li>
                <li><EditableText id="cataract-symp-item-2">Increased sensitivity to light, glare, and night halos around headlights</EditableText></li>
                <li><EditableText id="cataract-symp-item-3">Colors appear faded, washed out, or tinted yellowish/brownish</EditableText></li>
                <li><EditableText id="cataract-symp-item-4">Difficulty reading, driving at night, or recognizing facial details</EditableText></li>
              </ul>
            </div>

            {/* Effects Card */}
            <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mb-6">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-brand-navy mb-4">
                <EditableText id="cataract-effects-card-title">Potential Effects</EditableText>
              </h3>
              <ul className="space-y-3 text-xs leading-relaxed text-brand-navy/70 font-lora list-disc pl-4">
                <li><EditableText id="cataract-effects-item-1">Progressive decrease in overall visual acuity leading to functional blindness</EditableText></li>
                <li><EditableText id="cataract-effects-item-2">Increased risk of physical injury or falls due to poor depth perception</EditableText></li>
                <li><EditableText id="cataract-effects-item-3">Development of hyper-mature cataracts which can cause secondary glaucoma</EditableText></li>
                <li><EditableText id="cataract-effects-item-4">Significant decline in active lifestyle, reading, and night driving safety</EditableText></li>
              </ul>
            </div>

            {/* Cure Card */}
            <div className="bg-brand-navy text-cream rounded-[2.5rem] p-8 shadow-xl border border-cream/5 hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-brand-teal/10 text-brand-teal rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-cream mb-4">
                <EditableText id="cataract-cure-card-title">The Cure / Treatment</EditableText>
              </h3>
              <ul className="space-y-3 text-xs leading-relaxed text-cream/80 font-lora list-disc pl-4">
                <li><EditableText id="cataract-cure-item-1">Micro-Incision Cataract Surgery (MICS) using advanced Phaco technology</EditableText></li>
                <li><EditableText id="cataract-cure-item-2">Implantation of premium intraocular lenses (IOLs) like Multifocal, Toric, or EDOF</EditableText></li>
                <li><EditableText id="cataract-cure-item-3">Blade-free robotic laser cataract surgery for maximum precision</EditableText></li>
                <li><EditableText id="cataract-cure-item-4">Quick 15-minute outpatient procedure under local anesthesia with rapid 24h recovery</EditableText></li>
              </ul>
            </div>
          </div>
        </EditableContainer>

        {/* Cataract Month Banner */}
        <EditableContainer id="cataract-awareness-sec" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-brand-navy text-cream rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-xl">
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl pointer-events-none" />
          <div className="lg:col-span-4 relative rounded-3xl overflow-hidden aspect-[3/4] border border-cream/10 bg-brand-navy shadow-inner">
            <EditableMedia 
              id="cataract-image-awareness"
              src={heroElder} 
              alt="Restore Clarity for a Lifetime" 
              className="w-full h-full object-cover opacity-95 pointer-events-none"
            />
          </div>
          <div className="lg:col-span-8 flex flex-col justify-center">
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">
              <EditableText id="cataract-month-eyebrow">Clear Vision for Life</EditableText>
            </span>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
              <EditableText id="cataract-month-title">Restore Clear Vision for a Lifetime</EditableText>
            </h2>
            <p className="text-base text-cream/70 font-lora leading-relaxed mb-8 max-w-xl">
              <EditableText id="cataract-month-description">See the world as clearly as mountain trails. We provide comprehensive screening programs with advanced diagnostics to identify cataracts early. Don't compromise on what you see.</EditableText>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-cream">
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Sparkles className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">
                  <EditableText id="cataract-month-badge-1-title">Blade-Free Precision</EditableText>
                </h3>
                <p className="text-[11px] text-cream/60 leading-normal">
                  <EditableText id="cataract-month-badge-1-desc">Computer-guided femtosecond lasers.</EditableText>
                </p>
              </div>
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <ShieldAlert className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">
                  <EditableText id="cataract-month-badge-2-title">24h Safe Recovery</EditableText>
                </h3>
                <p className="text-[11px] text-cream/60 leading-normal">
                  <EditableText id="cataract-month-badge-2-desc">Fast self-healing incisions.</EditableText>
                </p>
              </div>
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Award className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">
                  <EditableText id="cataract-month-badge-3-title">Premium Lenses</EditableText>
                </h3>
                <p className="text-[11px] text-cream/60 leading-normal">
                  <EditableText id="cataract-month-badge-3-desc">Multifocal & Toric implants.</EditableText>
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

export default Cataract;
