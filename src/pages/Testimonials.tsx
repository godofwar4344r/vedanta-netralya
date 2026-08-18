import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Plus, Minus, Star } from 'lucide-react';
import VisionSimulator from '../components/VisionSimulator';

const Testimonials: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const reviews = [
    {
      name: 'Rajesh Singhal',
      location: 'Haldwani, Nainital',
      treatment: 'Micro-Incision Cataract Surgery (MICS)',
      quote: "My cataract surgery at Vedanta was completely painless. I was back home within hours, and the next morning my vision was perfectly clear. Dr. Sameer Varma explained the premium multifocal lens option beautifully.",
      rating: 5
    },
    {
      name: 'Priyanka Sharma',
      location: 'Kichha, Udham Singh Nagar',
      treatment: 'Femto-LASIK Vision Correction',
      quote: "Getting rid of my specs after 12 years feels like a miracle! The bladeless LASIK procedure took less than 15 minutes. Dr. Sameer Varma's expertise and the state-of-the-art Carl Zeiss laser made me feel extremely safe.",
      rating: 5
    },
    {
      name: 'Harbhajan Singh',
      location: 'Tallital, Nainital',
      treatment: 'Glaucoma Management & Laser',
      quote: "I was diagnosed with high intraocular pressure. The selective laser trabeculoplasty (SLT) therapy did not hurt at all and successfully reduced my pressure, preserving my vision. Extremely grateful to Dr. Sameer Varma.",
      rating: 5
    }
  ];

  const faqs = [
    {
      q: "What is Micro-Incision Cataract Surgery (MICS) and how does it compare to older methods?",
      a: "Micro-Incision Cataract Surgery (MICS) uses advanced ultrasound technology (Phacoemulsification) to gently dissolve the cataract through a tiny 1.8mm self-healing incision. It is entirely stitch-free and sutureless, ensuring a quick visual recovery in under 24 hours."
    },
    {
      q: "How long does a typical Femto-LASIK or SMILE procedure take, and is it painful?",
      a: "Both Femto-LASIK and SMILE are quick outpatient procedures taking about 10 to 15 minutes for both eyes. Anaesthetic eye drops are applied, making the process completely painless. You may feel slight pressure for a few seconds, but recovery starts immediately, and vision clarifies within 24 hours."
    },
    {
      q: "Does Vedanta Netralya support cashless billing and TPA insurance panels?",
      a: "Yes. Vedanta Netralya is an NABH-accredited facility supporting all major TPA insurance networks, corporate panels, and governmental cards (including CGHS and ECHS panels) for cashless hospitalization and diagnostic coverage."
    },
    {
      q: "When should I see a Vitreoretinal expert for retina evaluation?",
      a: "You should schedule a retinal screening immediately if you experience sudden onset of floaters, flashes of light, a dark shadow resembling a curtain falling over your field of vision, or if you are diabetic and need routine retinal mapping to check for diabetic retinopathy."
    },
    {
      q: "What are the outpatient consulting hours of the Haldwani centre?",
      a: "Our Haldwani super-speciality registry operates from Monday to Saturday, between 9:00 AM and 7:00 PM, and on Sunday from 9:00 AM to 2:00 PM. We advise scheduling an appointment online at `/appointment` or by calling our clinical helpline."
    }
  ];

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1800px] mx-auto px-6 lg:px-16 py-20"
    >
      <div className="text-center max-w-3xl mx-auto mb-20">
        <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Patient Chronicles</p>
        <h1 className="section-text text-brand-navy mb-6">Patient Stories & FAQ</h1>
        <p className="text-base text-brand-navy/60 font-lora">
          Hear from our satisfied patients and read answers to frequent questions about clinical operations, technologies, and pricing plans.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {reviews.map((rev, i) => (
          <div
            key={i}
            className="bg-brand-navy text-cream rounded-[2.5rem] p-8 border border-cream/5 shadow-xl flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-brand-teal/5 blur-xl" />
            
            <div>
              <Quote className="w-10 h-10 text-brand-teal/30 mb-6" />
              <div className="flex gap-1 mb-4">
                {[...Array(rev.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-brand-teal text-brand-teal" />
                ))}
              </div>
              <p className="text-sm text-cream/80 font-lora leading-relaxed mb-8">"{rev.quote}"</p>
            </div>

            <div className="border-t border-cream/10 pt-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm text-cream">{rev.name}</h3>
                <p className="text-[10px] text-cream/50 tracking-wider font-lora">{rev.location}</p>
              </div>
              <span className="text-[9px] tracking-wider uppercase text-brand-teal font-black bg-brand-teal/10 px-3 py-1 rounded-full border border-brand-teal/20">
                {rev.treatment.split(' ')[0]}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-4xl mx-auto mb-24">
        <h2 className="text-center font-merriweather text-xs tracking-[0.4em] uppercase font-black text-brand-navy/40 mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-cream-dark/35 border border-brand-navy/5 rounded-[2rem] overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-6 md:p-8 flex justify-between items-center focus:outline-none"
              >
                <span className="font-bold text-sm md:text-base text-brand-navy pr-4 leading-normal">{faq.q}</span>
                <div className="w-8 h-8 rounded-full bg-brand-navy text-brand-teal flex items-center justify-center shrink-0">
                  {openFaq === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-8 text-xs md:text-sm text-brand-navy/70 font-lora leading-relaxed border-t border-brand-navy/5 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded Vision Simulator */}
      <div className="border-t border-brand-navy/5 pt-16">
        <VisionSimulator />
      </div>
    </motion.div>
  );
};

export default Testimonials;
