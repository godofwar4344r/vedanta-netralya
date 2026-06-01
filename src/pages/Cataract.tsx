import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Sparkles, Award, ArrowUpRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import FooterCTA from '../components/FooterCTA';

// Assets
import heroElder from '../assets/hero-elder.png';
import heroMountains from '../assets/hero-mountains.png';

const Cataract: React.FC = () => {
  const cataractProcedures = [
    {
      title: 'World-Class Microphaco (MICS)',
      desc: 'Advanced Micro-Incision Cataract Surgery performing 1.8mm self-sealing, sutureless incisions. Ensures rapid healing, minimal astigmatism, and painless recovery in under 24 hours.'
    },
    {
      title: 'Premium Multifocal & Toric IOLs',
      desc: 'Implantation of state-of-the-art multifocal, trifocal, and EDOF (Extended Depth of Focus - Symphony) lenses to restore clear distance, intermediate, and near vision without spectacles.'
    },
    {
      title: 'Toric IOL Astigmatism Correction',
      desc: 'Custom toric intraocular lens calculations and alignments to correct pre-existing corneal astigmatism, delivering sharp distance visual acuity.'
    },
    {
      title: 'Paediatric Cataract Surgery',
      desc: 'Highly specialized cataract extractions and primary posterior capsulotomy with customized intraocular lens implants tailored for the unique anatomy of infants and children.'
    },
    {
      title: 'Implantable Collamer Lenses (ICL)',
      desc: 'Phakic IOL placement designed to correct high degrees of myopia (-8.00D to -20.00D) and astigmatism for patients unsuitable for standard laser correction.'
    },
    {
      title: 'Secondary IOL Implantation',
      desc: 'Advanced surgical placement of scleral-fixated (SF-IOL) or anterior chamber (AC-IOL) lenses in complicated cases lacking adequate capsular support.'
    },
    {
      title: 'YAG Laser Capsulotomy',
      desc: 'Quick, non-invasive outpatient laser procedure used to treat posterior capsular opacification (PCO) or "after-cataract" to restore vision back to post-operative levels.'
    },
    {
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7">
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">Robotic Ophthalmology</span>
            <h1 className="section-text text-brand-navy mb-6">Robotic FLACS Cataract Surgery</h1>
            <p className="text-lg font-lora text-brand-navy/70 leading-relaxed mb-6">
              Say goodbye to cloudy vision. We specialize in Femtosecond Laser-Assisted Cataract Surgery (FLACS), the most advanced, blade-free laser cataract technology available today.
            </p>
            <p className="text-sm text-brand-navy/60 leading-relaxed mb-8">
              Using precision computer-guided lasers, our AIIMS-trained surgeons create perfect self-sealing incisions and gently soften the cataract for easy removal, achieving quick, painless recoveries.
            </p>
            <Link to="/appointment" className="group bg-brand-navy text-cream hover:bg-brand-teal hover:text-brand-navy px-8 py-5 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all flex items-center justify-between max-w-xs shadow-md">
              Schedule Screening
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
          
          {/* Full Bleed Image Placement */}
          <div className="lg:col-span-5 relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-brand-navy aspect-[4/3] border border-cream/10">
            <img src={heroElder} alt="Stop Living in a Haze" className="w-full h-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent p-8 flex items-end">
              <div>
                <span className="text-[10px] text-brand-teal tracking-[0.3em] font-black uppercase">Stop Living in a Haze</span>
                <p className="text-cream text-lg font-merriweather font-bold mt-1">Restore your vibrant vision today.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Procedures Grid - Extended Content */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Procedure Catalog</p>
            <h2 className="section-text text-brand-navy mb-6">Our Cataract Treatment Suite</h2>
            <p className="text-base text-brand-navy/60 font-lora">
              From advanced diagnostic biometry to premium multifocal and secondary lens implants, we offer the complete spectrum of cataract care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cataractProcedures.map((proc, idx) => (
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
              Understanding the clinical presentation, long-term visual risks, and corrective procedures for cataracts.
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
                <li>Cloudy, blurry, or foggy vision that worsens over time</li>
                <li>Increased sensitivity to light, glare, and night halos around headlights</li>
                <li>Colors appear faded, washed out, or tinted yellowish/brownish</li>
                <li>Difficulty reading, driving at night, or recognizing facial details</li>
              </ul>
            </div>

            {/* Effects Card */}
            <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mb-6">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-brand-navy mb-4">Potential Effects</h3>
              <ul className="space-y-3 text-xs leading-relaxed text-brand-navy/70 font-lora list-disc pl-4">
                <li>Progressive decrease in overall visual acuity leading to functional blindness</li>
                <li>Increased risk of physical injury or falls due to poor depth perception</li>
                <li>Development of hyper-mature cataracts which can cause secondary glaucoma</li>
                <li>Significant decline in active lifestyle, reading, and night driving safety</li>
              </ul>
            </div>

            {/* Cure Card */}
            <div className="bg-brand-navy text-cream rounded-[2.5rem] p-8 shadow-xl border border-cream/5 hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-brand-teal/10 text-brand-teal rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-cream mb-4">The Cure / Treatment</h3>
              <ul className="space-y-3 text-xs leading-relaxed text-cream/80 font-lora list-disc pl-4">
                <li>Micro-Incision Cataract Surgery (MICS) using advanced Phaco technology</li>
                <li>Implantation of premium intraocular lenses (IOLs) like Multifocal, Toric, or EDOF</li>
                <li>Blade-free robotic laser cataract surgery for maximum precision</li>
                <li>Quick 15-minute outpatient procedure under local anesthesia with rapid 24h recovery</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cataract Month Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-brand-navy text-cream rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-xl">
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl" />
          <div className="lg:col-span-4 relative rounded-3xl overflow-hidden aspect-[3/4] border border-cream/10 bg-brand-navy shadow-inner">
            <img src={heroMountains} alt="Restore Clarity This June" className="w-full h-full object-cover opacity-95" />
          </div>
          <div className="lg:col-span-8 flex flex-col justify-center">
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">June Awareness Month</span>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">June is Cataract Awareness Month</h2>
            <p className="text-base text-cream/70 font-lora leading-relaxed mb-8 max-w-xl">
              See the world as clearly as mountain trails. We run screening programs throughout June with full diagnostics to identify cataract early. Don't compromise on what you see.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Sparkles className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">Blade-Free Precision</h3>
                <p className="text-[11px] text-cream/60 leading-normal">Computer-guided femtosecond lasers.</p>
              </div>
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <ShieldAlert className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">24h Safe Recovery</h3>
                <p className="text-[11px] text-cream/60 leading-normal">Fast self-healing incisions.</p>
              </div>
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Award className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">Premium Lenses</h3>
                <p className="text-[11px] text-cream/60 leading-normal">Multifocal & Toric implants.</p>
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

export default Cataract;
