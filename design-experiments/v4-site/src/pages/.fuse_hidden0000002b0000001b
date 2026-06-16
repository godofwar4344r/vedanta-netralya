import React from 'react';
import { motion } from 'framer-motion';
import FooterCTA from '../components/FooterCTA';

// Assets
import gallery1 from '../assets/gallery-1.png';
import gallery2 from '../assets/gallery-2.png';
import gallery3 from '../assets/gallery-3.png';
import gallery4 from '../assets/gallery-4.png';
import gallery5 from '../assets/gallery-5.png';
import heroSurgery from '../assets/hero-surgery.png';
import gallery6 from '../assets/gallery-6.png';
import gallery7 from '../assets/gallery-7.png';
import gallery8 from '../assets/gallery-8.png';

const ImageGallery: React.FC = () => {
  const images = [
    { src: gallery1, title: 'Zeiss Diagnostic Suite', category: 'Ophthalmic Imaging', tagline: 'State-of-the-art optical coherence topography.' },
    { src: gallery2, title: 'Femto-LASIK Sterile Wing', category: 'Refractive Center', tagline: 'Bladeless laser correction with absolute precision.' },
    { src: gallery3, title: 'Pediatric Consult Room', category: 'Children Care', tagline: 'Specialized squint therapies and child screenings.' },
    { src: gallery4, title: 'Advanced Phaco Theater', category: 'Cataract Wing', tagline: 'Micro-incision sutureless cataract surgery.' },
    { src: gallery5, title: 'Patient Recovery Lounge', category: 'Post-Op Observation', tagline: 'Comfortable recovery environment under expert care.' },
    { src: heroSurgery, title: 'NABH Certified Surgical Block', category: 'Operation Wing', tagline: 'Highest level of infection control and sterile support.' },
    { src: gallery6, title: 'Premium OPD Consulting', category: 'Outpatient Care', tagline: 'Personal consultation chambers with specialist surgeons.' },
    { src: gallery7, title: 'Advanced Diagnostic Chamber', category: 'Pre-Op Testing', tagline: 'Comprehensive corneal mapping and vision diagnostics.' },
    { src: gallery8, title: 'Specialty Eye Care Store', category: 'Optical & Pharmacy', tagline: 'In-house dispensing of premium lenses and eye medicines.' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-transparent"
    >
      <div className="max-w-[1800px] mx-auto px-6 lg:px-16 py-20">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 font-body">Clinical Showcase</p>
          <h1 className="section-text text-brand-navy mb-6 font-body">Image Registry Gallery</h1>
          <p className="text-base text-brand-navy/60 font-lora">
            A comprehensive tour of our super-specialty diagnostic imaging labs, sterile operation theaters, and patient consultative facilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="group cursor-pointer bg-brand-navy rounded-[2.5rem] overflow-hidden border border-cream/10 shadow-xl relative aspect-[4/3]"
            >
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
              />
              
              {/* Hover details overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep via-brand-navy/40 to-transparent p-8 flex flex-col justify-end">
                <span className="text-[9px] tracking-widest uppercase text-brand-teal font-black mb-1">{img.category}</span>
                <h3 className="text-xl font-black text-cream leading-tight mb-2">{img.title}</h3>
                <p className="text-xs text-cream/70 italic font-lora group-hover:text-cream transition-colors">{img.tagline}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Shared Footer CTA */}
      <FooterCTA />
    </motion.div>
  );
};

export default ImageGallery;
