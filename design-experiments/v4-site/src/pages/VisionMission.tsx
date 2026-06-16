import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Award } from 'lucide-react';
import { EditableContainer, EditableText } from '../components/Editable';
import FooterCTA from '../components/FooterCTA';

const VisionMission: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-cream min-h-screen"
    >
      {/* Hero Section */}
      <EditableContainer id="vision-hero">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 py-20 text-center">
          <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 font-body">
            <EditableText id="vision-eyebrow">Our Purpose</EditableText>
          </p>
          <h1 className="section-text text-brand-navy mb-6">
            <EditableText id="vision-title">Vision, Mission & Motto</EditableText>
          </h1>
          <p className="text-base text-brand-navy/60 font-lora max-w-3xl mx-auto leading-relaxed">
            <EditableText id="vision-description">Discover the foundational principles of medical ethics, technical excellence, and patient empathy that guide our healthcare services daily.</EditableText>
          </p>
        </div>
      </EditableContainer>

      {/* Pillars Section */}
      <EditableContainer id="vision-pillars">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Motto */}
            <div className="bg-brand-navy text-cream rounded-[2.5rem] p-8 hover:-translate-y-1 transition-all duration-300 shadow-xl border border-cream/5">
              <div className="w-12 h-12 rounded-xl bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center text-brand-teal mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-cream mb-4 font-body">
                <EditableText id="vision-motto-title">Our Motto</EditableText>
              </h3>
              <p className="text-sm text-cream/70 leading-relaxed font-lora">
                <EditableText id="vision-motto-desc">"Premium, Personal, Comprehensive and Ethical eye care through the best experts with highest level of quality and technology in eye care."</EditableText>
              </p>
            </div>

            {/* Mission */}
            <div className="bg-brand-navy text-cream rounded-[2.5rem] p-8 hover:-translate-y-1 transition-all duration-300 shadow-xl border border-cream/5">
              <div className="w-12 h-12 rounded-xl bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center text-brand-teal mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-cream mb-4 font-body">
                <EditableText id="vision-mission-title">Our Mission</EditableText>
              </h3>
              <p className="text-sm text-cream/70 leading-relaxed font-lora">
                <EditableText id="vision-mission-desc">To provide premium and comprehensive eye care from the best and most experienced experts in the field.</EditableText>
              </p>
            </div>

            {/* Vision */}
            <div className="bg-brand-navy text-cream rounded-[2.5rem] p-8 hover:-translate-y-1 transition-all duration-300 shadow-xl border border-cream/5">
              <div className="w-12 h-12 rounded-xl bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center text-brand-teal mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-cream mb-4 font-body">
                <EditableText id="vision-vision-title">Our Vision</EditableText>
              </h3>
              <p className="text-sm text-cream/70 leading-relaxed font-lora">
                <EditableText id="vision-vision-desc">To be a trusted regional healthcare leader, ensuring state-of-the-art diagnostic and surgical technologies are accessible and delivered with absolute ethical standards.</EditableText>
              </p>
            </div>
          </div>
        </div>
      </EditableContainer>

      <FooterCTA />
    </motion.div>
  );
};

export default VisionMission;
