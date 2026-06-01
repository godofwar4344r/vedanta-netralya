import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FooterCTA from '../components/FooterCTA';

const Centres: React.FC = () => {
  const centresData = [
    {
      title: 'Haldwani Main Branch',
      tag: 'Super-Specialty Center',
      address: 'Canal Road, Tikonia Circle, Haldwani, Nainital, Uttarakhand - 263139',
      phones: ['05946-223616', '+91 9068561971'],
      email: 'info@vedantanetralya.com',
      hours: [
        { days: 'Monday — Saturday', time: '9:00 AM — 7:00 PM' },
        { days: 'Sunday', time: '9:00 AM — 2:00 PM' }
      ],
      mapUrl: 'https://maps.google.com/?q=Vedanta+Netralya+Canal+Road+Haldwani',
      isMain: true
    },
    {
      title: 'Kichha Clinic',
      tag: 'Specialist Outreach OPD & OT',
      address: 'Hotel NeelKamal, Bareilly Road, Kichha, Udham Singh Nagar, Uttarakhand - 263148',
      phones: ['+91 7900777709'],
      email: 'info@vedantanetralya.com',
      hours: [
        { days: 'Monday — Saturday', time: '9:00 AM — 6:00 PM' },
        { days: 'Sunday', time: '9:00 AM — 1:00 PM' }
      ],
      mapUrl: 'https://maps.google.com/?q=Hotel+NeelKamal+Kichha',
      isMain: false
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-transparent font-body"
    >
      <div className="max-w-[1800px] mx-auto px-6 lg:px-16 py-20">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Location Network</p>
          <h1 className="section-text text-brand-navy mb-6">Our Superspecialty Centres</h1>
          <p className="text-base text-brand-navy/60 font-lora">
            Vedanta Netralya operates primary and consultation locations across Uttarakhand to deliver expert ophthalmic diagnostic scan and surgery suites.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 items-stretch">
          {centresData.map((centre, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="bg-brand-navy text-cream rounded-[2.5rem] p-10 md:p-12 shadow-xl border border-cream/10 flex flex-col justify-between relative overflow-hidden"
            >
              {centre.isMain && (
                <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-teal/5 blur-3xl" />
              )}
              
              <div>
                <span className="text-[10px] text-brand-teal tracking-widest font-black uppercase">
                  {centre.tag}
                </span>
                <h2 className="text-3xl font-black mt-2 mb-6 font-body">{centre.title}</h2>
                
                <div className="space-y-6 text-sm">
                  <div className="flex gap-4">
                    <MapPin className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <p className="font-lora text-cream/80">
                      {centre.address}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Phone className="w-5 h-5 text-brand-teal shrink-0" />
                    <p className="font-lora text-cream/80">{centre.phones.join(' / ')}</p>
                  </div>
                  <div className="flex gap-4">
                    <Mail className="w-5 h-5 text-brand-teal shrink-0" />
                    <p className="font-lora text-cream/80">{centre.email}</p>
                  </div>
                  <div className="flex gap-4">
                    <Clock className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Working Hours:</p>
                      {centre.hours.map((h, i) => (
                        <p key={i} className="text-xs text-cream/70 mt-1">
                          <strong>{h.days}:</strong> {h.time}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-cream/10 mt-8 flex flex-col sm:flex-row gap-4">
                <a 
                  href={centre.mapUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="group flex-1 bg-cream/10 text-cream px-6 py-4 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all flex items-center justify-between hover:bg-cream hover:text-brand-navy"
                >
                  Locate on Map
                  <MapPin className="w-4 h-4 text-brand-teal shrink-0" />
                </a>
                <Link 
                  to="/appointment" 
                  className="group flex-1 bg-brand-teal text-brand-navy px-6 py-4 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all flex items-center justify-between shadow-md hover:bg-cream hover:text-brand-navy"
                >
                  Book Slot
                  <ArrowUpRight className="w-4 h-4 shrink-0 transition-transform group-hover:rotate-45" />
                </Link>
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

export default Centres;
