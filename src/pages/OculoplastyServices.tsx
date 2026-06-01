import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Sparkles, ArrowUpRight, CheckCircle2, Shield, Award, AlertTriangle, ShieldAlert, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import FooterCTA from '../components/FooterCTA';

const OculoplastyServices: React.FC = () => {
  const reconstructiveProcedures = [
    {
      title: 'Ptosis Correction',
      desc: 'Surgical repair of the levator muscle to lift drooping upper eyelids, improving visual fields and natural facial symmetry for both adults and congenital pediatric cases.'
    },
    {
      title: 'Eyelid Tear & Graft Reconstruction',
      desc: 'Highly detailed reconstruction of eyelids following traumatic tears, tumor excisions, or burns, employing advanced skin grafts and local tissue flaps.'
    },
    {
      title: 'Entropion & Ectropion Correction',
      desc: 'Surgical correction of inward (entropion) or outward (ectropion) turning of the eyelid margins, protecting the cornea from severe friction and dryness.'
    },
    {
      title: 'Evisceration & Enucleation',
      desc: 'Surgical removal of diseased or non-functional eye tissue, with immediate implantation of orbital implants to maintain natural socket volume.'
    }
  ];

  const lacrimalProcedures = [
    {
      title: 'External DCR with Intubation',
      desc: 'Dacryocystorhinostomy (DCR) to create a new drainage pathway bypass for blocked tear ducts, utilizing silicone stent intubation to prevent re-obstruction.'
    },
    {
      title: 'Probing & Syringing',
      desc: 'Diagnostic syringing and therapeutic probing to evaluate and resolve blockages in the lacrimal passages, commonly performed for pediatric tearing.'
    },
    {
      title: 'Lacrimal Drainage System Repair',
      desc: 'Micro-surgical repair of lacerated canaliculi and primary rebuilding of the tear drainage network using micro-silicone intubations.'
    },
    {
      title: 'Prosthetic Eye Shell Fitting',
      desc: 'Custom medical fitting of high-aesthetic ocular prosthesis shells over eviscerated sockets, restoring normal appearance and motion.'
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
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">Reconstructive Eye Care</span>
            <h1 className="section-text text-brand-navy mb-6">Oculoplasty & Eyelid Services</h1>
            <p className="text-lg font-lora text-brand-navy/70 leading-relaxed mb-6">
              Restoring structure, function, and aesthetics. We specialize in delicate surgical procedures of the eyelids, orbit, and lacrimal tear drainage pathways.
            </p>
            <p className="text-sm text-brand-navy/60 leading-relaxed mb-8">
              Under the experienced guidance of Dr. Sameer Varma (M.S., Fellow SNC), who has successfully completed over 2,000 lacrimal surgeries and 4,000 lid reconstructions, we provide high-precision outpatient treatments for both congenital defects and traumatic injuries.
            </p>
            <Link to="/appointment" className="group bg-brand-navy text-cream hover:bg-brand-teal hover:text-brand-navy px-8 py-5 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all flex items-center justify-between max-w-xs shadow-md">
              Schedule Evaluation
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
          
          {/* Visual Accoutrement */}
          <div className="lg:col-span-5 relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-brand-navy aspect-[4/3] border border-cream/10 flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy via-brand-navy/95 to-brand-teal/20 opacity-90" />
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 rounded-full bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center text-brand-teal mx-auto mb-6">
                <Scissors className="w-10 h-10" />
              </div>
              <h2 className="text-cream text-2xl font-merriweather font-bold mb-2">Precision Oculoplasty</h2>
              <p className="text-cream/60 text-xs font-lora max-w-sm mx-auto">
                Advanced corrective surgery for drooping lids, tear duct blocks, and ocular prosthetics.
              </p>
            </div>
          </div>
        </div>

        {/* Reconstructive & Eyelid Section */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Eyelid Reconstructions</p>
            <h2 className="section-text text-brand-navy mb-6">Eyelid & Orbital Reconstructive Surgery</h2>
            <p className="text-base text-brand-navy/60 font-lora">
              Delicate micro-surgical repair of eyelid anomalies. We focus on restoring normal protection for the eyeball while optimizing cosmetic symmetry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reconstructiveProcedures.map((proc, idx) => (
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

        {/* Lacrimal & Tearing Section */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Lacrimal Drainage</p>
            <h2 className="section-text text-brand-navy mb-6">Lacrimal & Tear Duct Procedures</h2>
            <p className="text-base text-brand-navy/60 font-lora">
              Comprehensive clinical management for excessive tearing. From pediatric probing to external DCR intubations and custom aesthetic eye shells.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {lacrimalProcedures.map((proc, idx) => (
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
              Understanding eyelid and tear duct abnormalities, functional vision risks, and micro-reconstructive solutions.
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
                <li>Drooping eyelids (ptosis) that obstruct the upper field of vision</li>
                <li>Eyelids turning inwards (entropion) causing eyelashes to rub against the eyeball</li>
                <li>Eyelids turning outwards (ectropion) causing dry eyes and redness</li>
                <li>Blockage in tear ducts causing continuous tearing, watering, or discharge</li>
              </ul>
            </div>

            {/* Effects Card */}
            <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mb-6">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-brand-navy mb-4">Potential Effects</h3>
              <ul className="space-y-3 text-xs leading-relaxed text-brand-navy/70 font-lora list-disc pl-4">
                <li>Chronic friction on the cornea causing corneal ulcers, scarring, or perforation</li>
                <li>Persistent eye infections and chronic watering due to blocked drainage pathways</li>
                <li>Severe upper visual field deficits from ptosis (drooping eyelids)</li>
                <li>Aesthetic disfigurement affecting personal confidence and social interactions</li>
              </ul>
            </div>

            {/* Cure Card */}
            <div className="bg-brand-navy text-cream rounded-[2.5rem] p-8 shadow-xl border border-cream/5 hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-brand-teal/10 text-brand-teal rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-cream mb-4">The Cure / Treatment</h3>
              <ul className="space-y-3 text-xs leading-relaxed text-cream/80 font-lora list-disc pl-4">
                <li>Ptosis correction surgery (eyelid lift to clear the pupil axis)</li>
                <li>Eyelid reconstruction for structural correction of entropion or ectropion</li>
                <li>Dacryocystorhinostomy (DCR) surgery with intubation to bypass blocked tear ducts</li>
                <li>Custom fitting of ocular prosthesis (artificial eyes) and cosmetic blepharoplasty</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Professional Trust Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-brand-navy text-cream rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-xl">
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl" />
          <div className="lg:col-span-12 flex flex-col justify-center">
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">Unmatched Clinical Experience</span>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">4,000+ Lid Reconstruction Procedures Completed</h2>
            <p className="text-base text-cream/70 font-lora leading-relaxed mb-8 max-w-3xl">
              Our Oculoplasty team brings the highest level of specialty training and clinical volume in Uttarakhand. With specialized training from Sadguru Netra Chikitsalaya, Chitrakoot, we ensure premium, ethical, and customized reconstructive options.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Sparkles className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">Delicate Aesthetics</h3>
                <p className="text-[11px] text-cream/60 leading-normal">Cosmetic lid corrections and customized fits.</p>
              </div>
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Eye className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">Prosthetic Eye Shells</h3>
                <p className="text-[11px] text-cream/60 leading-normal">Aesthetic shells tailored to natural eye dynamics.</p>
              </div>
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Award className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">Elite Fellowship</h3>
                <p className="text-[11px] text-cream/60 leading-normal">SNC Chitrakoot fellowship trained supervision.</p>
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

export default OculoplastyServices;

