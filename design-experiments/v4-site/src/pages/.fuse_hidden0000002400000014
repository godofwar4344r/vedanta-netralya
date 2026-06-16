import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FooterCTA from '../components/FooterCTA';
import { EditableContainer, EditableText, EditableList } from '../components/Editable';

const Centres: React.FC = () => {
  const defaultCentres = [
    {
      id: 'haldwani-main',
      title: 'Haldwani Main Branch',
      tag: 'Super-Specialty Center',
      address: 'Canal Road, Tikonia Circle, Haldwani, Nainital, Uttarakhand - 263139',
      phones: ['05946-223616', '+91 9068561971'],
      email: 'info@vedantanetralya.com',
      hours: [
        { days: 'Monday — Saturday', time: '9:00 AM — 7:00 PM' },
        { days: 'Sunday', time: '9:00 AM — 2:00 PM' }
      ],
      mapUrl: 'https://www.google.com/maps/place/Vedanta+Netralya+Haldwani/@29.2266568,79.5255779,642m/data=!3m1!1e3!4m10!1m2!2m1!1svedanta+netralya+haldwani!3m6!1s0x39a09b1779d2b223:0xccc4371f2e361808!8m2!3d29.2266493!4d79.5281364!15sChl2ZWRhbnRhIG5ldHJhbHlhIGhhbGR3YW5pkgEPZXllX2NhcmVfY2VudGVy4AEA!16s%2Fg%2F11n422c3lg!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D',
      isMain: true
    },
    {
      id: 'kichha-clinic',
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
        <EditableContainer id="centres-header" className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">
            <EditableText id="centres-eyebrow">Location Network</EditableText>
          </p>
          <h1 className="section-text text-brand-navy mb-6">
            <EditableText id="centres-title">Our Superspecialty Centres</EditableText>
          </h1>
          <p className="text-base text-brand-navy/60 font-lora">
            <EditableText id="centres-description">Vedanta Netralya operates primary and consultation locations across Uttarakhand to deliver expert ophthalmic diagnostic scan and surgery suites.</EditableText>
          </p>
        </EditableContainer>

        <EditableList
          id="centres-list"
          defaultItems={defaultCentres}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 items-stretch"
          newItemTemplate={{
            title: 'New Branch Clinic',
            tag: 'Specialist Outreach Clinic',
            address: 'Clinic Address line here...',
            phones: ['+91 9999999999'],
            email: 'info@vedantanetralya.com',
            hours: [
              { days: 'Monday — Saturday', time: '9:00 AM — 6:00 PM' }
            ],
            mapUrl: 'https://maps.google.com',
            isMain: false
          }}
        >
          {(centre) => (
            <motion.div
              className="bg-brand-navy text-cream rounded-[2.5rem] p-10 md:p-12 shadow-xl border border-cream/10 flex flex-col justify-between relative overflow-hidden h-full"
            >
              {centre.isMain && (
                <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-teal/5 blur-3xl pointer-events-none" />
              )}
              
              <div>
                <span className="text-[10px] text-brand-teal tracking-widest font-black uppercase">
                  <EditableText id={`centre-tag-${centre.id}`}>{centre.tag || 'Specialty Centre'}</EditableText>
                </span>
                <h2 className="text-3xl font-black mt-2 mb-6 font-body">
                  <EditableText id={`centre-title-${centre.id}`}>{centre.title || 'Clinic Title'}</EditableText>
                </h2>
                
                <div className="space-y-6 text-sm">
                  <div className="flex gap-4">
                    <MapPin className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <p className="font-lora text-cream/80">
                      <EditableText id={`centre-address-${centre.id}`}>{centre.address || 'Address info'}</EditableText>
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Phone className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <p className="font-lora text-cream/80">
                      <EditableText id={`centre-phones-${centre.id}`}>{(centre.phones || []).join(' / ')}</EditableText>
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Mail className="w-5 h-5 text-brand-teal shrink-0" />
                    <p className="font-lora text-cream/80">
                      <EditableText id={`centre-email-${centre.id}`}>{centre.email || 'info@vedantanetralya.com'}</EditableText>
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Clock className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Working Hours:</p>
                      {(centre.hours || []).map((h: any, i: number) => (
                        <p key={i} className="text-xs text-cream/70 mt-1">
                          <strong><EditableText id={`centre-hours-days-${centre.id}-${i}`}>{h.days}</EditableText>:</strong> <EditableText id={`centre-hours-time-${centre.id}-${i}`}>{h.time}</EditableText>
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
          )}
        </EditableList>
      </div>

      {/* Shared Footer CTA */}
      <FooterCTA />
    </motion.div>
  );
};

export default Centres;
