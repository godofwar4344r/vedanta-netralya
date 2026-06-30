import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Navigation } from 'lucide-react';
import { EditableContainer, EditableText, EditableList } from '../components/Editable';
import FooterCTA from '../components/FooterCTA';

const Facilities: React.FC = () => {
  const defaultFacilities = [
    { id: 'f1', text: 'Modular Operation Theater (OT) facility' },
    { id: 'f2', text: 'Indoor Ward facility with recovery beds and recliners' },
    { id: 'f3', text: 'Cardiac Monitoring & General Anesthesia (GA) facility for vulnerable patients' },
    { id: 'f4', text: 'Lid & Lacrimal surgery facility with ocular prosthesis support' },
    { id: 'f5', text: 'Dedicated paediatric clinic' },
    { id: 'f6', text: 'In-house Pharmacy & Medical store for convenient access' },
    { id: 'f7', text: 'In-house Optical store for customized lens fittings' },
    { id: 'f8', text: 'Separate Counselling Chamber with dedicated counselors' },
    { id: 'f9', text: 'Premium lens options: Foldable, Aspheric, Multifocal, EDOF (Symphony), SF IOL / AC IOL' },
    { id: 'f10', text: 'Equipped with Boyle\'s apparatus, suction machines, and complete monitoring systems' },
    { id: 'f11', text: 'Air-conditioned hospital ambience' },
    { id: 'f12', text: '24 Hours Power Backup (Generator)' },
    { id: 'f13', text: 'Well trained clinical and administrative staff' }
  ];

  const defaultAmbulanceCharges = [
    { id: 'a1', destination: 'Haldwani Local (up to 10 km one way)', charge: 'Rs 300' },
    { id: 'a2', destination: 'Kichha / Gadarpur / Pant Nagar', charge: 'Rs 900' },
    { id: 'a3', destination: 'Rudrapur', charge: 'Rs 900' },
    { id: 'a4', destination: 'Kashipur', charge: 'Rs 1,400' },
    { id: 'a5', destination: 'Moradabad', charge: 'Rs 1,800' },
    { id: 'a6', destination: 'Bareilly', charge: 'Rs 2,000' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-cream min-h-screen"
    >
      {/* Hero Section */}
      <EditableContainer id="facilities-hero">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 py-20 text-center">
          <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">
            <EditableText id="facilities-eyebrow">Infrastructure</EditableText>
          </p>
          <h1 className="section-text text-brand-navy mb-6">
            <EditableText id="facilities-title">Hospital Facilities</EditableText>
          </h1>
          <p className="text-base text-brand-navy/60 font-lora max-w-3xl mx-auto leading-relaxed">
            <EditableText id="facilities-description">Vedanta Netralya is a newly built, fully air-conditioned superspeciality eye care centre in the Kumaun region of Uttarakhand. Equipped with two modular OTs, state-of-the-art diagnostic equipment, and 24-hour power backup.</EditableText>
          </p>
        </div>
      </EditableContainer>

      {/* Facilities List Grid */}
      <EditableContainer id="facilities-list-sec">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 pb-20">
          <div className="bg-brand-navy text-cream rounded-[2.5rem] p-10 lg:p-12 border border-cream/5 shadow-xl">
            <h2 className="text-3xl font-black mb-8 text-center md:text-left">
              <EditableText id="facilities-list-title">Clinical Infrastructure</EditableText>
            </h2>
            <EditableList
              id="facilities-list-items"
              defaultItems={defaultFacilities}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              newItemTemplate={{
                text: 'New clinical facility details...'
              }}
            >
              {(facility) => (
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                  <span className="text-xs text-cream/90 font-merriweather leading-relaxed">
                    <EditableText id={`facility-text-${facility.id}`}>{facility.text || 'Facility Name'}</EditableText>
                  </span>
                </div>
              )}
            </EditableList>
          </div>
        </div>
      </EditableContainer>

      {/* Ambulance Charges Section */}
      <EditableContainer id="facilities-ambulance-sec">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <Navigation className="w-5 h-5 text-brand-teal" />
                <span className="text-brand-teal text-[10px] tracking-[0.3em] font-black uppercase">
                  <EditableText id="facilities-ambulance-eyebrow">Patient Transport</EditableText>
                </span>
              </div>
              <h2 className="section-text text-brand-navy">
                <EditableText id="facilities-ambulance-title">Ambulance Services &</EditableText><br />
                <span className="italic font-light text-brand-teal">
                  <EditableText id="facilities-ambulance-title-italic">Standard Charges.</EditableText>
                </span>
              </h2>
              <p className="text-base text-brand-navy/60 font-lora leading-relaxed">
                <EditableText id="facilities-ambulance-description">For the safety and convenience of our surgical patients, Vedanta Netralya operates a dedicated transport service. Below are the standard, transparent one-way travel charges based on location.</EditableText>
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
                  <EditableList
                    id="facilities-ambulance-charges"
                    defaultItems={defaultAmbulanceCharges}
                    as="tbody"
                    itemAs="tr"
                    className="divide-y divide-brand-navy/5 font-lora"
                    newItemTemplate={{
                      destination: 'New Destination Town',
                      charge: 'Rs 500'
                    }}
                  >
                    {(item) => (
                      <>
                        <td className="py-3.5 pr-4 font-semibold hover:bg-cream/40 transition-colors">
                          <EditableText id={`ambulance-dest-${item.id}`}>{item.destination || 'Town Name'}</EditableText>
                        </td>
                        <td className="py-3.5 text-right font-bold text-brand-teal hover:bg-cream/40 transition-colors">
                          <EditableText id={`ambulance-charge-${item.id}`}>{item.charge || 'Rs 0'}</EditableText>
                        </td>
                      </>
                    )}
                  </EditableList>
                </table>
              </div>
            </div>
          </div>
        </div>
      </EditableContainer>

      <FooterCTA />
    </motion.div>
  );
};

export default Facilities;
