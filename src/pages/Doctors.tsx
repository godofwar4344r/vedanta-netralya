import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Award, GraduationCap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EditableContainer, EditableText, EditableMedia, EditableCard } from '../components/Editable';
import FooterCTA from '../components/FooterCTA';

// Doctor Images
import drSameer from '../assets/dr-sameer-varma-opd.jpeg';
import drRjk from '../assets/dr-rjk-opd.jpeg';
import drAditya from '../assets/dr-aditya-bhardwaj.jpeg';

const Doctors: React.FC = () => {
  const doctors = [
    {
      name: 'Dr. Sameer Varma',
      image: drSameer,
      imageZoom: 1.2,
      objectPosition: '52% 20%',
      role: 'Founder & Senior Eye Specialist',
      specialty: 'Comprehensive Ophthalmology, Cataract, Oculoplasty, Glaucoma, Paediatric Cataract',
      edu: 'M.S., Fellow Sadguru Netra Chikitsalaya (SNC), Chitrakoot',
      exp: '50,000+',
      desc: 'Completed comprehensive ophthalmology fellowship at Chitrakoot. Working as a high volume surgeon, he has performed over fifty thousand cataract surgeries with significant exposure in pediatric cataract and glaucoma surgeries. He also performed approximately two thousand DCR/dacryocystectomy surgeries and four thousand eyelid reconstructions. After his fellowship, he joined Eye Q Superspeciality Eye Hospital and worked as Haldwani\'s In-charge of clinical operations from 2007 to 2017 before founding Vedanta Netralya.',
      fellowships: [
        'Fellowship in Sadguru Netra Chikitsalaya, Chitrakoot',
        '2,000+ Lacrimal (tear duct) surgeries performed',
        '4,000+ Eyelid reconstruction surgeries performed',
        '50,000+ Cataract surgeries performed'
      ]
    },
    {
      name: 'Dr. R.J.K. Singh',
      image: drRjk,
      imageZoom: 1.9,
      objectPosition: '85% 15%',
      role: 'Senior Consultant Ophthalmologist',
      specialty: 'Comprehensive Ophthalmology',
      edu: 'DOMS, Kanpur University (1972)',
      exp: '',
      desc: 'Completed his post-graduation from Kanpur University in the year 1972. Completed senior fellowship training at Sitapur Eye Hospital. He started his career as an ophthalmic surgeon at Sitapur Eye Hospital, Allahabad, and worked in different capacities across multiple branches of Sitapur Eye Hospital in Uttarakhand for 35 years. He subsequently served as senior consultant at Eye Q Eye Hospital for three years.',
      fellowships: [
        'Senior Fellowship at Sitapur Eye Hospital',
        '35+ years clinical career with Sitapur Eye Hospital branches',
        'Senior clinical consultant at Eye Q Eye Hospital'
      ]
    },
    {
      name: 'Dr. Maj Aditya Bhardwaj',
      image: drAditya,
      imageZoom: 1.6,
      objectPosition: 'center 35%',
      role: 'Vitreo-Retinal Surgeon | Medical Retina Specialist | Cataract Surgeon',
      specialty: 'Vitreoretinal (VR) Surgery, Medical Retina & Cataract',
      edu: 'MBBS, MS (Ophthalmology), Fellow Vitreo-Retina Surgery',
      exp: '10,000+',
      desc: 'Dedicated Vitreo-Retinal Surgeon with extensive training in complex retinal disorders. Completed MS in Ophthalmology from the prestigious Army Hospital (R&R), New Delhi, and a Fellowship in Vitreo-Retina Surgery at ASG Eye Hospital, Varanasi.',
      fellowships: [
        'MS Ophthalmology from Army Hospital (R&R), New Delhi',
        'Fellowship in Vitreo-Retina Surgery (ASG Eye Hospital, Varanasi)',
        'Former Vitreo-Retinal Surgeon & Deputy MS at KK Medical College & Hospital',
        'Unique background in Family Medicine (CMC Vellore) & Diabetology'
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-cream min-h-screen font-body"
    >
      <div className="max-w-[1800px] mx-auto px-6 lg:px-16 py-20">
        <EditableContainer id="doctors-header">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">
              <EditableText id="doctors-eyebrow">Expert Registry</EditableText>
            </p>
            <h1 className="section-text text-brand-navy mb-6">
              <EditableText id="doctors-title">Our Medical Experts</EditableText>
            </h1>
            <p className="text-base text-brand-navy/60 font-lora">
              <EditableText id="doctors-description">Vedanta Netralya operates under the surgical leadership of highly credentialed, board-certified, and fellowship-trained eye surgeons.</EditableText>
            </p>
          </div>
        </EditableContainer>

        <EditableContainer id="doctors-list">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
            {doctors.map((doc, idx) => (
              <EditableCard key={idx} id={`doctor-card-${idx}`} className="h-full">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.8 }}
                  whileHover={{ y: -8 }}
                  className="bg-brand-navy text-cream rounded-[2.5rem] overflow-hidden border border-cream/5 shadow-xl flex flex-col justify-between group h-full"
                >
                <div>
                  {/* Doctor Image Container */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-navy-deep border-b border-cream/10">
                    <EditableMedia 
                      id={`doctor-image-${idx}`}
                      src={doc.image} 
                      alt={doc.name} 
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                      style={{
                        objectPosition: doc.objectPosition || 'center top',
                        transform: `scale(${doc.imageZoom || 1})`
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent pointer-events-none" />
                    
                    {/* Floating Experience Badge */}
                    {doc.exp && (
                      <div className="absolute bottom-6 right-6 bg-brand-teal/90 backdrop-blur-sm text-brand-navy px-4 py-2 rounded-2xl shadow-lg flex flex-col items-center pointer-events-none">
                        <span className="text-xl font-black leading-none font-body">
                          <EditableText id={`doctor-exp-${idx}`}>{doc.exp}</EditableText>
                        </span>
                        <span className="text-[8px] tracking-wider uppercase font-black font-body">Surgeries</span>
                      </div>
                    )}
                  </div>

                  {/* Doctor Info Details */}
                  <div className="p-8 pb-4">
                    <span className="text-[10px] text-brand-teal tracking-widest font-black uppercase font-body">
                      <EditableText id={`doctor-role-${idx}`}>{doc.role}</EditableText>
                    </span>
                    <h2 className="text-xl font-black mt-1 font-body text-cream min-h-[3.5rem] flex items-center">
                      <EditableText id={`doctor-name-${idx}`}>{doc.name}</EditableText>
                    </h2>
                    <p className="text-xs text-brand-teal/80 italic mt-1 font-lora leading-normal min-h-[2.5rem]">
                      <EditableText id={`doctor-specialty-${idx}`}>{doc.specialty}</EditableText>
                    </p>

                    <hr className="border-cream/10 my-4" />

                    <p className="text-xs text-cream/70 font-lora leading-relaxed mb-6 min-h-[6.5rem]">
                      <EditableText id={`doctor-desc-${idx}`}>{doc.desc}</EditableText>
                    </p>

                    {/* Credentials */}
                    <div className="space-y-3 mb-4">
                      <div className="flex gap-2.5 items-start text-xs min-h-[2.5rem]">
                        <GraduationCap className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                        <span><strong>Education:</strong> <EditableText id={`doctor-edu-${idx}`}>{doc.edu}</EditableText></span>
                      </div>
                      <div className="flex gap-2.5 items-start text-xs">
                        <Award className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                        <div>
                          <strong>Key Milestones:</strong>
                          <ul className="list-disc pl-4 text-cream/60 text-[11px] mt-1 space-y-1">
                            {doc.fellowships.map((f, i) => (
                              <li key={i}>
                                <EditableText id={`doctor-fellowship-${idx}-${i}`}>{f}</EditableText>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 pt-0">
                  <Link
                    to="/appointment"
                    className="group/btn bg-brand-teal text-brand-navy hover:bg-cream hover:text-brand-navy px-6 py-4 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all flex items-center justify-between w-full shadow-md animate-pulse"
                  >
                    <EditableText id={`doctor-btn-${idx}`}>Schedule Consultation</EditableText>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:rotate-45 transition-transform" />
                  </Link>
                </div>
                </motion.div>
              </EditableCard>
            ))}
          </div>
        </EditableContainer>

        {/* Clinical Panel General Details */}
        <EditableContainer id="doctors-extra-team">
          <div className="max-w-4xl mx-auto bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 md:p-10 shadow-lg text-brand-navy mb-20">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-brand-teal" />
              <span className="text-[10px] text-brand-teal tracking-widest font-black uppercase">Ophthalmic Experts Panel</span>
            </div>
            <h3 className="text-2xl font-black mb-3">
              <EditableText id="doctors-extra-title">Consulting Surgeons & Clinical Support</EditableText>
            </h3>
            <p className="text-sm font-lora text-brand-navy/70 leading-relaxed">
              <EditableText id="doctors-extra-desc">Our clinical panel also includes consulting surgeons and specialists working in rotation. Together, our panel strives to deliver premium, ethical, and personal eye care using the highest level of diagnostic technology and surgical standards.</EditableText>
            </p>
          </div>
        </EditableContainer>
      </div>

      {/* Shared Footer CTA */}
      <FooterCTA />
    </motion.div>
  );
};

export default Doctors;
