import React from 'react';
import { motion } from 'framer-motion';
import FooterCTA from '../components/FooterCTA';

// Assets
import drSameerSlitlamp1 from '../assets/dr-sameer-slitlamp-1.jpeg';
import optometristRoom from '../assets/optometrist-room.jpeg';
import drRjkOpd from '../assets/dr-rjk-opd.jpeg';
import drSameerConsulting from '../assets/dr-sameer-consulting.jpeg';
import waitingLobby1 from '../assets/hospital-waiting-lobby-1.jpeg';
import hospitalFacade from '../assets/hospital-facade.jpeg';
import waitingLobby2 from '../assets/hospital-waiting-lobby-2.jpeg';
import drSameerSlitlamp2 from '../assets/dr-sameer-slitlamp-2.jpeg';
import opticalStore from '../assets/optical-pharmacy-store.jpeg';

const ImageGallery: React.FC = () => {
  const images = [
    { src: hospitalFacade, title: 'Vedanta Netralya Front Facade', category: 'Hospital Building', tagline: 'Our state-of-the-art super-specialty eye care facility.' },
    { src: drSameerSlitlamp1, title: 'Slit Lamp Examination (Dr. Sameer Varma)', category: 'Diagnostics', tagline: 'Real-time microscopic evaluation of eye structures.' },
    { src: optometristRoom, title: 'Optometry & Refraction Room', category: 'Vision Testing', tagline: 'Advanced visual acuity assessment and objective refraction.' },
    { src: drRjkOpd, title: 'OPD Consulting Chamber (Dr. R.J.K. Singh)', category: 'Consultation', tagline: 'Personal consultation chambers with senior specialists.' },
    { src: drSameerConsulting, title: 'OPD Consulting Chamber (Dr. Sameer Varma)', category: 'Consultation', tagline: 'Comprehensive patient counseling and clinical assessment.' },
    { src: waitingLobby1, title: 'Reception Desk & Main Lobby', category: 'Patient Care', tagline: 'Spacious, fully air-conditioned patient waiting lounge.' },
    { src: waitingLobby2, title: 'OPD Reception & Waiting Area', category: 'Patient Support', tagline: 'Dedicated helpdesks for cashless insurance check-ins.' },
    { src: drSameerSlitlamp2, title: 'Advanced Slit Lamp Diagnostics', category: 'Diagnostics', tagline: 'High-definition corneal mapping and pre-op screening.' },
    { src: opticalStore, title: 'In-house Optical & Pharmacy Store', category: 'Optical Dispensing', tagline: 'Premium spectacle lenses, designer frames, and medicines.' }
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
