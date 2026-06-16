import React from 'react';
import { motion } from 'framer-motion';

const Terms: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-6 py-20 font-lora text-brand-navy/80 leading-relaxed text-sm"
    >
      <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black font-body mb-4 block">Legal Framework</span>
      <h1 className="section-text text-brand-navy font-body mb-10">Terms & Conditions</h1>
      
      <p className="mb-6 font-bold">Effective Date: June 1, 2026</p>

      <h2 className="text-xl font-bold text-brand-navy font-body mt-8 mb-4">1. Scope of Clinical Information</h2>
      <p className="mb-6">
        All contents of this website (including chatbot answers, service details, and treatment guides) are compiled for general educational purposes. They do not constitute formal medical diagnoses or bypass physical eye evaluations by certified surgeons.
      </p>

      <h2 className="text-xl font-bold text-brand-navy font-body mt-8 mb-4">2. Appointment Scheduling</h2>
      <p className="mb-6">
        The online appointment booking tool pre-registers preferred consultation slots. Clinical schedules remain subject to emergency surgeries and doctor availability. Our coordinators will contact patients to finalize slots.
      </p>

      <h2 className="text-xl font-bold text-brand-navy font-body mt-8 mb-4">3. Medical Consent</h2>
      <p className="mb-6">
        Definitive surgical procedures (such as FLACS laser cataract removal or Femto-LASIK correction) are only performed after in-person clinical consultations and obtaining written patient consent forms.
      </p>

      <h2 className="text-xl font-bold text-brand-navy font-body mt-8 mb-4">4. Dispute Resolution</h2>
      <p className="mb-6">
        All administrative and billing disputes fall under the jurisdiction of the courts of Haldwani, Nainital, Uttarakhand, India.
      </p>
    </motion.div>
  );
};

export default Terms;
