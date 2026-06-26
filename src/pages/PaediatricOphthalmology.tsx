import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowUpRight, Award, Sparkles, Shield, User, AlertTriangle, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EditableText, EditableMedia } from '../components/Editable';
import FooterCTA from '../components/FooterCTA';
import servicePaediatric from '../assets/service-paediatric.png';

const PaediatricOphthalmology: React.FC = () => {
  const visualAcuitySuite = [
    {
      title: 'Teller Acuity Cards',
      desc: 'Specialized preferential-looking test cards designed to measure visual acuity in infants and non-verbal toddlers without requiring active letter matching.'
    },
    {
      title: 'Gardiner & Snellen Matching Charts',
      desc: 'Pictorial and key-matching vision testing systems that make eye exams interactive and highly accurate for young pre-schoolers.'
    },
    {
      title: 'Cycloplegic Refraction',
      desc: 'Precision refractive examinations using child-safe dilating drops to temporarily relax focusing muscles, ensuring exact lens prescriptions.'
    },
    {
      title: 'Orthoptic Evaluation & Binocularity',
      desc: 'Detailed checks for ocular alignment, stereo acuity (depth perception), and binocular visual coordination to rule out subtle eye tracking issues.'
    }
  ];

  const surgicalPediatricSuite = [
    {
      title: 'Eye Care for Infants & Children',
      desc: 'Dedicated pediatric screening, objective acuity tests using Teller Cards, cycloplegic refraction checks, and early childhood vision diagnostics.'
    },
    {
      title: 'Squint (Strabismus) Correction',
      desc: 'Precision surgical re-alignment of ocular muscles (recession/resection) to treat misaligned eyes and restore healthy binocular tracking.'
    },
    {
      title: 'Congenital Anomalies of the Lid',
      desc: 'Specialized corrective surgery for drooping eyelids (ptosis), dermoid cysts, and congenital malformations of the eyelids.'
    },
    {
      title: 'Tear Duct (Nasolacrimal) Treatment',
      desc: 'Outpatient nasolacrimal probing, syringing, and dacryocystorhinostomy (DCR) to clear tear duct blockages and watery discharge in infants.'
    },
    {
      title: 'Pediatric Cataract Management',
      desc: 'Delicate microphaco cataract extraction with posterior capsulotomy and primary child-safe intraocular lens (IOL) implantation.'
    },
    {
      title: 'Structural Vision Therapy Programmes',
      desc: 'Orthoptics alignment training, customized binocular exercises, and lazy eye (amblyopia) patching therapy to build visual structure.'
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
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">Dedicated Child Care</span>
            <h1 className="section-text text-brand-navy mb-6">Paediatric Ophthalmology</h1>
            <p className="text-lg font-lora text-brand-navy/70 leading-relaxed mb-6">
              Nurturing clear sight for a bright future. We provide comprehensive, child-friendly eye examinations and specialized surgical therapies.
            </p>
            <p className="text-sm text-brand-navy/60 leading-relaxed mb-8">
              Children\'s visual systems develop rapidly, requiring early identification of issues. By utilizing Teller acuity cards, Gardiner charts, and pediatric-focused orthoptic tools, we catch refractions and squint anomalies early. Our specialized pediatric surgery suite operates under full pediatric anesthetist backup to ensure highest safety standards.
            </p>
            <Link to="/appointment" className="group bg-brand-navy text-cream hover:bg-brand-teal hover:text-brand-navy px-8 py-5 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all flex items-center justify-between max-w-xs shadow-md">
              Schedule Child Exam
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
          
          {/* Full Bleed Image Placement */}
          <div className="lg:col-span-5 relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-brand-navy aspect-[4/3] border border-cream/10">
            <EditableMedia
              id="paediatric-image-hero"
              src={servicePaediatric}
              alt="Paediatric Ophthalmology"
              className="w-full h-full object-cover opacity-90 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-transparent to-transparent p-8 flex items-end pointer-events-none">
              <div>
                <span className="text-[10px] text-brand-teal tracking-[0.3em] font-black uppercase">
                  <EditableText id="paediatric-visual-title">Child-Friendly Care</EditableText>
                </span>
                <p className="text-cream text-lg font-merriweather font-bold mt-1">
                  <EditableText id="paediatric-visual-desc">Specialized screening using Teller cards and Snellen matching.</EditableText>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Screening Section */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Vision Diagnostics</p>
            <h2 className="section-text text-brand-navy mb-6">Visual Acuity Screening Suite</h2>
            <p className="text-base text-brand-navy/60 font-lora">
              Testing children requires special techniques. We utilize objective visual screening tools that do not rely on standard reading ability, making exams fun and accurate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visualAcuitySuite.map((proc, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300 flex gap-4 items-start"
              >
                <div className="p-3 bg-brand-navy/5 rounded-2xl shrink-0 text-brand-teal">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-brand-navy mb-2">{proc.title}</h3>
                  <p className="text-xs text-brand-navy/70 leading-relaxed font-lora">{proc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Treatment & Surgery Section */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Clinical Interventions</p>
            <h2 className="section-text text-brand-navy mb-6">Pediatric Treatment & Surgery Suite</h2>
            <p className="text-base text-brand-navy/60 font-lora">
              From occlusion patching programs for amblyopia to corrective strabismus surgeries, we manage simple and complex pediatric ocular conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {surgicalPediatricSuite.map((proc, idx) => (
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
              Understanding pediatric eye warning signs, visual development risks, and child-safe clinical treatments.
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
                <li>Misaligned or crossed eyes (squint/strabismus)</li>
                <li>Child frequently rubs eyes, blinks excessively, or squeezes eyes to see</li>
                <li>Abnormal head tilting or posturing while watching television or reading</li>
                <li>White glow or reflex (leukocoria) in the pupil in photos or dim light</li>
              </ul>
            </div>

            {/* Effects Card */}
            <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mb-6">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-brand-navy mb-4">Potential Effects</h3>
              <ul className="space-y-3 text-xs leading-relaxed text-brand-navy/70 font-lora list-disc pl-4">
                <li>Development of lazy eye (amblyopia), causing permanent low vision if untreated</li>
                <li>Irreversible loss of 3D depth perception (stereopsis)</li>
                <li>Learning delays, reading difficulties, and poor school performance</li>
                <li>Progressive, permanent visual impairment from congenital cataract or glaucoma</li>
              </ul>
            </div>

            {/* Cure Card */}
            <div className="bg-brand-navy text-cream rounded-[2.5rem] p-8 shadow-xl border border-cream/5 hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-brand-teal/10 text-brand-teal rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-cream mb-4">The Cure / Treatment</h3>
              <ul className="space-y-3 text-xs leading-relaxed text-cream/80 font-lora list-disc pl-4">
                <li>Customized occlusion patching therapy and penalization for amblyopia (lazy eye)</li>
                <li>Precision surgical squint correction to realign ocular muscles and restore binocular vision</li>
                <li>Paediatric cataract removal using child-safe microphaco with custom IOL placement</li>
                <li>Surgical probing under brief sedation for congenital nasolacrimal duct blockages</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Anesthetic Backup Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-brand-navy text-cream rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-xl">
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl" />
          <div className="lg:col-span-12 flex flex-col justify-center">
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">Safety First Care</span>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Pediatric Surgical Backup & Security</h2>
            <p className="text-base text-cream/70 font-lora leading-relaxed mb-8 max-w-3xl">
              Surgical procedures for pediatric patients—including congenital cataract phacos and squint corrections—are performed in our advanced modular theatre under the direct oversight of a qualified anesthetist. We maintain child-safe sedation systems and dedicated recovery recliners to ensure maximum patient safety.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Sparkles className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">Pediatric Anesthesia</h3>
                <p className="text-[11px] text-cream/60 leading-normal">Constant monitoring by experienced pediatric anesthetists.</p>
              </div>
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Shield className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">Safe Recliners</h3>
                <p className="text-[11px] text-cream/60 leading-normal">Dedicated recovery lounge designed for parent comfort.</p>
              </div>
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Award className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">Expert Orthoptists</h3>
                <p className="text-[11px] text-cream/60 leading-normal">Clinically guided visual exercises and occlusion audits.</p>
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

export default PaediatricOphthalmology;

