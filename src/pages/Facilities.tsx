import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Navigation } from 'lucide-react';
import EditableSection from '../components/EditableSection';
import FooterCTA from '../components/FooterCTA';

const Facilities: React.FC = () => {
  const hospitalFacilities = [
    'Modular Operation Theater (OT) facility',
    'Indoor Ward facility with recovery beds and recliners',
    'Cardiac Monitoring & General Anesthesia (GA) facility for vulnerable patients',
    'Lid & Lacrimal surgery facility with ocular prosthesis support',
    'Two refraction stations and two Doctor consultation chambers',
    'In-house Pharmacy & Medical store for convenient access',
    'In-house Optical store for customized lens fittings',
    'Separate Counselling Chamber with dedicated counselors',
    'Premium lens options: Foldable, Aspheric, Multifocal, EDOF (Symphony), SF IOL / AC IOL',
    'Equipped with Boyle\'s apparatus, suction machines, and complete monitoring systems',
    'Air-conditioned hospital ambience',
    '24 Hours Power Backup (Generator)',
    'Well trained clinical and administrative staff'
  ];

  const ambulanceCharges = [
    { destination: 'Haldwani Local (up to 10 km one way)', charge: 'Rs 300' },
    { destination: 'Kichha / Gadarpur / Pant Nagar', charge: 'Rs 900' },
    { destination: 'Rudrapur', charge: 'Rs 900' },
    { destination: 'Kashipur', charge: 'Rs 1,400' },
    { destination: 'Moradabad', charge: 'Rs 1,800' },
    { destination: 'Bareilly', charge: 'Rs 2,000' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-cream min-h-screen"
    >
      {/* Hero Section */}
      <EditableSection id="facilities-hero">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 py-20 text-center">
          <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Infrastructure</p>
          <h1 className="section-text text-brand-navy mb-6">Hospital Facilities</h1>
          <p className="text-base text-brand-navy/60 font-lora max-w-3xl mx-auto leading-relaxed">
            Vedanta Netralya is a newly built, fully air-conditioned super-specialty eye care center in the Kumaun region of Uttarakhand. Equipped with premium modular suites, diagnostic equipment, and 24-hour backup.
          </p>
        </div>
      </EditableSection>

      {/* Facilities List Grid */}
      <EditableSection id="facilities-list">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 pb-20">
          <div className="bg-brand-navy text-cream rounded-[2.5rem] p-10 lg:p-12 border border-cream/5 shadow-xl">
            <h2 className="text-3xl font-black mb-8 text-center md:text-left">Clinical Infrastructure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospitalFacilities.map((facility, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                  <span className="text-xs text-cream/90 font-merriweather leading-relaxed">{facility}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </EditableSection>

      {/* Ambulance Charges Section */}
      <EditableSection id="facilities-ambulance">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <Navigation className="w-5 h-5 text-brand-teal" />
                <span className="text-brand-teal text-[10px] tracking-[0.3em] font-black uppercase">Patient Transport</span>
              </div>
              <h2 className="section-text text-brand-navy">
                Ambulance Services &<br />
                <span className="italic font-light text-brand-teal" style={{ fontFamily: 'Lora, serif' }}>Standard Charges.</span>
              </h2>
              <p className="text-base text-brand-navy/60 font-lora leading-relaxed">
                For the safety and convenience of our surgical patients, Vedanta Netralya operates a dedicated transport service. Below are the standard, transparent one-way travel charges based on location.
              </p>
            </div>

            <div className="lg:col-span-7 bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 md:p-10 shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-merriweather text-xs text-brand-navy">
                  <thead>
                    <tr className="border-b border-brand-navy/10 pb-4 text-brand-teal text-[10px] tracking-wider uppercase font-black">
                      <th className="pb-3 font-bold">Destination Clinic / Town</th>
                      <th className="pb-3 text-right font-bold">One-way Charge</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-navy/5 font-lora">
                    {ambulanceCharges.map((item, idx) => (
                      <tr key={idx} className="hover:bg-cream/40 transition-colors">
                        <td className="py-3.5 pr-4 font-semibold">{item.destination}</td>
                        <td className="py-3.5 text-right font-bold text-brand-teal">{item.charge}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </EditableSection>

      <FooterCTA />
    </motion.div>
  );
};

export default Facilities;
