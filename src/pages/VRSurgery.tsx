import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowUpRight, Award, Sparkles, ShieldAlert, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EditableText, EditableMedia } from '../components/Editable';
import FooterCTA from '../components/FooterCTA';
import serviceVr from '../assets/service-vr.png';

const VRSurgery: React.FC = () => {
  const surgicalOfferings = [
    {
      title: 'Sutureless Vitrectomy (MIVS)',
      desc: 'Performing ultra-thin 23G, 25G, or 27G micro-incision sutureless vitrectomies. Ensures rapid wound healing, no stiches, minimal post-op irritation, and significantly faster vision recovery.'
    },
    {
      title: 'Retinal Detachment Repair',
      desc: 'Complete surgical treatment including scleral buckling, pneumatic retinopexy, and advanced vitrectomy with gas or silicone oil tamponades to reattach the retina.'
    },
    {
      title: 'Macular Hole & ERM Peeling',
      desc: 'Precision surgical removal of the internal limiting membrane (ILM) and epiretinal membranes (ERM) under high magnification to restore central vision.'
    },
    {
      title: 'Diabetic Vitrectomy',
      desc: 'Surgical management of complex diabetic complications such as non-clearing vitreous hemorrhage, tractional retinal detachment, and severe fibrovascular proliferation.'
    },
    {
      title: 'Secondary & Scleral-Fixated IOL (SF-IOL)',
      desc: 'Advanced replacement or surgical anchoring of intraocular lenses in patients with absent or compromised capsular support, restoring distance focus.'
    },
    {
      title: 'Ocular Trauma & Subretinal Surgery',
      desc: 'Immediate emergency management of penetrative eye injuries, removal of intraocular foreign bodies (IOFB), and drainage of subretinal hemorrhages.'
    },
    {
      title: 'Vitreous Pathology & Parasitic Removal',
      desc: 'Clearance of vitreous opacities, inflammatory debris, vitreomacular traction, and removal of intraocular parasites or cysts.'
    },
    {
      title: 'Dislocated Lens & Nucleus Retrieval',
      desc: 'Surgical retrieval of cataracts, lens fragments, or dislocated intraocular lenses from the vitreous cavity back into a secure position.'
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
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">Surgical Excellence</span>
            <h1 className="section-text text-brand-navy mb-6">Vitreo-Retinal (VR) Surgery</h1>
            <p className="text-lg font-lora text-brand-navy/70 leading-relaxed mb-6">
              Restoring stability to the core of your vision. We perform high-complexity posterior segment micro-surgeries utilizing advanced vitrectomy platforms.
            </p>
            <p className="text-sm text-brand-navy/60 leading-relaxed mb-8">
              Led by our board-certified, fellowship-trained retina surgeon, our modular operating theater is fully configured with specialized gas/air/fluid exchange controls, Boyle's apparatus, and cardiac monitoring systems to ensure safe outcomes even for compromised patients.
            </p>
            <Link to="/appointment" className="group bg-brand-navy text-cream hover:bg-brand-teal hover:text-brand-navy px-8 py-5 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all flex items-center justify-between max-w-xs shadow-md">
              Request VR Consultation
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
          
          {/* Full Bleed Image Placement */}
          <div className="lg:col-span-5 relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-brand-navy aspect-[4/3] border border-cream/10">
            <EditableMedia
              id="vr-image-hero"
              src={serviceVr}
              alt="Micro-Incision MIVS"
              className="w-full h-full object-cover opacity-90 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-transparent to-transparent p-8 flex items-end pointer-events-none">
              <div>
                <span className="text-[10px] text-brand-teal tracking-[0.3em] font-black uppercase">
                  <EditableText id="vr-visual-title">Micro-Incision MIVS</EditableText>
                </span>
                <p className="text-cream text-lg font-merriweather font-bold mt-1">
                  <EditableText id="vr-visual-desc">Sutureless 23G, 25G, and 27G vitrectomy platforms for maximum safety and rapid recovery.</EditableText>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Procedures Grid - Extended Content */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Surgical Catalog</p>
            <h2 className="section-text text-brand-navy mb-6">Our VR Surgical Suite</h2>
            <p className="text-base text-brand-navy/60 font-lora">
              From advanced retinal detachment repair and gas/oil tamponades to complex diabetic vitrectomies and intraocular trauma management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {surgicalOfferings.map((proc, idx) => (
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
              Understanding severe vitreoretinal conditions, the high risk of permanent visual damage, and micro-incision surgical vitrectomy solutions.
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
                <li>Sudden shower of heavy black spots or "floaters" in your vision field</li>
                <li>Painless, rapid loss of vision (e.g. from vitreous hemorrhage or detachment)</li>
                <li>Straight lines appearing severely distorted, wavy, or bent</li>
                <li>A dark shadow or blind spot blocking part of your vision</li>
              </ul>
            </div>

            {/* Effects Card */}
            <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mb-6">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-brand-navy mb-4">Potential Effects</h3>
              <ul className="space-y-3 text-xs leading-relaxed text-brand-navy/70 font-lora list-disc pl-4">
                <li>Irreversible death of retinal tissue due to prolonged separation from its blood supply</li>
                <li>Total, permanent blindness in the affected eye due to macular holes or detachments</li>
                <li>Chronic high eye pressure or severe pain due to vitreoretinal complications</li>
                <li>Loss of central reading vision and facial recognition</li>
              </ul>
            </div>

            {/* Cure Card */}
            <div className="bg-brand-navy text-cream rounded-[2.5rem] p-8 shadow-xl border border-cream/5 hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-brand-teal/10 text-brand-teal rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-cream mb-4">The Cure / Treatment</h3>
              <ul className="space-y-3 text-xs leading-relaxed text-cream/80 font-lora list-disc pl-4">
                <li>Sutureless Micro-Incision Vitrectomy Surgery (MIVS) using 23G, 25G, or 27G micro-instruments</li>
                <li>Macular hole repair with internal limiting membrane (ILM) peeling and gas tamponade</li>
                <li>Pneumatic retinopexy or scleral buckling to structurally repair retinal detachments</li>
                <li>Vitreous hemorrhage removal to clear blood pathways and restore light projection</li>
              </ul>
            </div>
          </div>
        </div>

        {/* OT Features Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-brand-navy text-cream rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-xl">
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl" />
          <div className="lg:col-span-12 flex flex-col justify-center">
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">Advanced Operating Facilities</span>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Our Modular Vitreoretinal Theatre</h2>
            <p className="text-base text-cream/70 font-lora leading-relaxed mb-8 max-w-3xl">
              We operate in a fully sterilized, state-of-the-art modular theatre equipped with advanced vitrectomy consoles, Boyle's apparatus, cardiac monitors, and emergency backup power. This makes it possible to handle medically compromised and challenging cases under local, topical, or general anesthesia with highest safety standards.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Sparkles className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">State-of-Art Systems</h3>
                <p className="text-[11px] text-cream/60 leading-normal">High-performance cutter speeds and micro-precision fluidics.</p>
              </div>
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <ShieldAlert className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">Cardiac Safeguards</h3>
                <p className="text-[11px] text-cream/60 leading-normal">Continuous monitoring during surgical segments.</p>
              </div>
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Award className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">Fellowship-Trained Lead</h3>
                <p className="text-[11px] text-cream/60 leading-normal">Direct oversight from highly experienced VR consultants.</p>
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

export default VRSurgery;
