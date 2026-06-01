import React from 'react';
import { motion } from 'framer-motion';
import { Glasses, CheckCircle2, ArrowUpRight, Search, Sparkles, Shield, User, AlertTriangle, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import FooterCTA from '../components/FooterCTA';

const OpticalServices: React.FC = () => {
  const eyewearOfferings = [
    {
      title: 'Premium Progressive & Bifocal Lenses',
      desc: 'Highly customized progressive lenses providing smooth transition across distance, intermediate, and near focus without visible lines or visual distortion.'
    },
    {
      title: 'Therapeutic Blue-Cut Computer Lenses',
      desc: 'Advanced light-filtering lenses designed to absorb harmful high-energy blue light emitted by digital screens, mitigating digital eye strain and fatigue.'
    },
    {
      title: 'Contact Lens Clinic',
      desc: 'Specialized diagnostic fitting for soft, disposable, toric, and rigid gas permeable (RGP) contact lenses, as well as cosmetic color lenses.'
    },
    {
      title: 'High-Index Thin Lenses',
      desc: 'Ultra-thin, lightweight high-index lenses recommended for high refractive prescriptions, improving aesthetic appearance and reducing frame weight.'
    }
  ];

  const showroomOfferings = [
    {
      title: 'Computerized Refraction Stations',
      desc: 'Equipped with computerized auto-refractometers for high-precision objective vision tests, ensuring exact matching of optical prescriptions.'
    },
    {
      title: 'Open Display Selection System',
      desc: 'A spacious, modern open showroom display featuring a wide selection of Indian and imported, branded and unbranded frames to match all budgets.'
    },
    {
      title: 'Personalized Frame Consultation',
      desc: 'Expert guidance from trained optical counselors to select frames that balance facial aesthetics, lens weights, and active lifestyles.'
    },
    {
      title: 'Ophthalmic Quality Assurance',
      desc: 'Rigorous manual and digital verification of lens power and alignment parameters before dispensing, ensuring absolute prescription accuracy.'
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
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">In-House Convenience</span>
            <h1 className="section-text text-brand-navy mb-6">Optical Services & Showroom</h1>
            <p className="text-lg font-lora text-brand-navy/70 leading-relaxed mb-6">
              Your one-stop destination for corrective, cosmetic, and therapeutic eyewear. We balance optical precision with aesthetic comfort.
            </p>
            <p className="text-sm text-brand-navy/60 leading-relaxed mb-8">
              At Vedanta Optical, we dispense premium quality lenses from global manufacturers alongside an extensive catalog of Indian and imported designer frames. Our state-of-the-art open display system allows you to explore choices comfortably, guided by certified optometric experts.
            </p>
            <Link to="/appointment" className="group bg-brand-navy text-cream hover:bg-brand-teal hover:text-brand-navy px-8 py-5 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all flex items-center justify-between max-w-xs shadow-md">
              Schedule Vision Test
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
          
          {/* Visual Accoutrement */}
          <div className="lg:col-span-5 relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-brand-navy aspect-[4/3] border border-cream/10 flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy via-brand-navy/95 to-brand-teal/20 opacity-90" />
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 rounded-full bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center text-brand-teal mx-auto mb-6">
                <Glasses className="w-10 h-10" />
              </div>
              <h2 className="text-cream text-2xl font-merriweather font-bold mb-2">Vedanta Optical</h2>
              <p className="text-cream/60 text-xs font-lora max-w-sm mx-auto">
                Comprehensive dispensing of premium lenses, digital blue-cut filters, and imported designer frames.
              </p>
            </div>
          </div>
        </div>

        {/* Eyewear Offerings Section */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Precision Lenses</p>
            <h2 className="section-text text-brand-navy mb-6">Advanced Lenses & Contact Lenses</h2>
            <p className="text-base text-brand-navy/60 font-lora">
              We focus heavily on optical quality. From customized bifocals and progressives to blue-light barriers and specialized contact lenses, we customize every lens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {eyewearOfferings.map((proc, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300 flex gap-4 items-start"
              >
                <div className="p-3 bg-brand-navy/5 rounded-2xl shrink-0 text-brand-teal">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-brand-navy mb-2">{proc.title}</h3>
                  <p className="text-xs text-brand-navy/70 leading-relaxed font-lora">{proc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Showroom & Service Section */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Showroom Services</p>
            <h2 className="section-text text-brand-navy mb-6">Optometric & Fitting Services</h2>
            <p className="text-base text-brand-navy/60 font-lora">
              Combining state-of-the-art computerized refraction with a premium frame selection experience in our open-display showroom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {showroomOfferings.map((proc, idx) => (
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
              Understanding refractive signs, risks of incorrect prescription alignments, and precision optical solutions.
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
                <li>Blurred or doubled text during reading or screen operations</li>
                <li>Squinting, visual fatigue, or brow ache after continuous visual work</li>
                <li>Night driving visual strain and sensitivity to headlight reflections</li>
                <li>Frequent changes in spectacle or reading glass power</li>
              </ul>
            </div>

            {/* Effects Card */}
            <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mb-6">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-brand-navy mb-4">Potential Effects</h3>
              <ul className="space-y-3 text-xs leading-relaxed text-brand-navy/70 font-lora list-disc pl-4">
                <li>Chronic eye strain, headaches, and physical visual fatigue</li>
                <li>Prismatic error from poorly centered or incorrectly fitted lens frames</li>
                <li>Reduced work efficiency, reading comfort, and mobile screen productivity</li>
                <li>Inability to track details, with progressive functional visual strain</li>
              </ul>
            </div>

            {/* Cure Card */}
            <div className="bg-brand-navy text-cream rounded-[2.5rem] p-8 shadow-xl border border-cream/5 hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-brand-teal/10 text-brand-teal rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-cream mb-4">The Cure / Treatment</h3>
              <ul className="space-y-3 text-xs leading-relaxed text-cream/80 font-lora list-disc pl-4">
                <li>Computerized optometric refraction combined with exact clinical trial lens sets</li>
                <li>Customized Blue-Cut, Anti-Reflective, and Progressive lenses fitted to individual pupillary centers</li>
                <li>Specialized contact lens clinic offering soft, toric, and rigid gas permeable (RGP) contact lenses</li>
                <li>Professional fitting and frame centering counseling with certified optical dispensers</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Showroom Trust Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-brand-navy text-cream rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-xl">
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl" />
          <div className="lg:col-span-12 flex flex-col justify-center">
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">Affordable Quality</span>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">State of the Art Eyewear Showroom</h2>
            <p className="text-base text-cream/70 font-lora leading-relaxed mb-8 max-w-3xl">
              Vedanta Netralya offers patients the convenience of picking up custom corrective spectacles immediately after consultation. We guarantee accurate lens alignments and offer a wide price spectrum to maintain quality while keeping eyewear affordable.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Sparkles className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">Open Showroom</h3>
                <p className="text-[11px] text-cream/60 leading-normal">Open selection cases displaying high-style designer frames.</p>
              </div>
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Search className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">Precise Measurements</h3>
                <p className="text-[11px] text-cream/60 leading-normal">Digital mapping for pupillary distance and segment heights.</p>
              </div>
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <User className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">Lens Counseling</h3>
                <p className="text-[11px] text-cream/60 leading-normal">Tailored suggestions for thickness optimization and coatings.</p>
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

export default OpticalServices;

