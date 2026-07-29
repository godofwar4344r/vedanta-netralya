import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Award, GraduationCap, Users, Search, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EditableContainer, EditableText, EditableMedia, EditableCard } from '../components/Editable';
import FooterCTA from '../components/FooterCTA';

// Doctor Images
import drSameer from '../assets/dr-sameer-varma-opd.jpeg';
import drRjk from '../assets/dr-rjk-opd.jpeg';
import drAditya from '../assets/dr-aditya-bhardwaj.jpeg';

/** The ID-card scans leak neighbouring cards' personal details — see the portrait block below. */
const SHOW_ID_CARD_SCANS = false;

const initialsOf = (name: string) =>
  name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();

export interface StaffMember {
  code: string;
  name: string;
  designation: string;
  department: 'Administration & Management' | 'Optometry & Clinical' | 'Front Office & Billing' | 'Pharmacy & Optical' | 'Marketing' | 'Support Services';
  image: string;
}

export const staffMembers: StaffMember[] = [
  {
    code: '01',
    name: 'Vinod Kumar',
    designation: 'Counsellor Manager',
    department: 'Administration & Management',
    image: '/staff/card_01.jpg'
  },
  {
    code: '02',
    name: 'Ashutosh Asthana',
    designation: 'Optical Manager',
    department: 'Pharmacy & Optical',
    image: '/staff/card_02.jpg'
  },
  {
    code: '03',
    name: 'Suresh Nagila',
    designation: 'Account Manager',
    department: 'Administration & Management',
    image: '/staff/card_03.jpg'
  },
  {
    code: '04',
    name: 'Deepak Chandra Paneru',
    designation: 'Admin Incharge',
    department: 'Administration & Management',
    image: '/staff/card_04.jpg'
  },
  {
    code: '05',
    name: 'Bhagwan Ram',
    designation: 'OT Runner',
    department: 'Optometry & Clinical',
    image: '/staff/card_05.jpg'
  },
  {
    code: '06',
    name: 'Inder Rawat',
    designation: 'OT Assistant',
    department: 'Optometry & Clinical',
    image: '/staff/card_06.jpg'
  },
  {
    code: '07',
    name: 'Kavita Kargeti',
    designation: 'OT Technician',
    department: 'Optometry & Clinical',
    image: '/staff/card_07.jpg'
  },
  {
    code: '08',
    name: 'Krishna Chandra',
    designation: 'Maintenance Manager',
    department: 'Administration & Management',
    image: '/staff/card_08.jpg'
  },
  {
    code: '09',
    name: 'Prakash Sharma',
    designation: 'Clinical Manager',
    department: 'Administration & Management',
    image: '/staff/card_09.jpg'
  },
  {
    code: '10',
    name: 'Geeta Negi',
    designation: 'Billing Executive',
    department: 'Front Office & Billing',
    image: '/staff/card_10.jpg'
  },
  {
    code: '11',
    name: 'Mamta Mehra',
    designation: 'Nurse',
    department: 'Optometry & Clinical',
    image: '/staff/card_11.jpg'
  },
  {
    code: '12',
    name: 'Hemlata',
    designation: 'PRO',
    department: 'Front Office & Billing',
    image: '/staff/card_12.jpg'
  },
  {
    code: '13',
    name: 'Dinesh Chandra',
    designation: 'PRO',
    department: 'Front Office & Billing',
    image: '/staff/card_13.jpg'
  },
  {
    code: '14',
    name: 'Mahendra Kumar',
    designation: 'Billing Executive',
    department: 'Front Office & Billing',
    image: '/staff/card_14.jpg'
  },
  {
    code: '15',
    name: 'Kajal Sharma',
    designation: 'Receptionist',
    department: 'Front Office & Billing',
    image: '/staff/card_15.jpg'
  },
  {
    code: '16',
    name: 'Deepak Chandra',
    designation: 'Security Guard',
    department: 'Support Services',
    image: '/staff/card_16.jpg'
  },
  {
    code: '17',
    name: 'Rakesh Kumar',
    designation: 'Driver',
    department: 'Support Services',
    image: '/staff/card_17.jpg'
  },
  {
    code: '18',
    name: 'Alok Dwivedi',
    designation: 'Senior Optometrist',
    department: 'Optometry & Clinical',
    image: '/staff/card_18.jpg'
  },
  {
    code: '19',
    name: 'Noor Saba',
    designation: 'Pharmacy Executive',
    department: 'Pharmacy & Optical',
    image: '/staff/card_19.jpg'
  },
  {
    code: '20',
    name: 'Sumit Singh Rana',
    designation: 'Marketing Executive',
    department: 'Marketing',
    image: '/staff/card_20.jpg'
  },
  {
    code: '21',
    name: 'Kamlesh Mazila',
    designation: 'Senior Optometrist',
    department: 'Optometry & Clinical',
    image: '/staff/card_21.jpg'
  },
  {
    code: '22',
    name: 'Nikhil Nayal',
    designation: 'Optical Executive',
    department: 'Pharmacy & Optical',
    image: '/staff/card_22.jpg'
  },
  {
    code: '23',
    name: 'Divyam Arya',
    designation: 'Sales Executive',
    department: 'Pharmacy & Optical',
    image: '/staff/card_23.jpg'
  },
  {
    code: '24',
    name: 'Manisha Arya',
    designation: 'Fitter',
    department: 'Pharmacy & Optical',
    image: '/staff/card_24.jpg'
  },
  {
    code: '25',
    name: 'Dheeraj Tripathi',
    designation: 'Pharmacist',
    department: 'Pharmacy & Optical',
    image: '/staff/card_25.jpg'
  },
  {
    code: '26',
    name: 'Bhuvan Singh',
    designation: 'Guard',
    department: 'Support Services',
    image: '/staff/card_26.jpg'
  }
];

const Doctors: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'specialists' | 'support'>('specialists');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');

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

  const departments = [
    'All',
    'Administration & Management',
    'Optometry & Clinical',
    'Front Office & Billing',
    'Pharmacy & Optical',
    'Marketing',
    'Support Services'
  ];

  const filteredStaff = staffMembers.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.designation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || staff.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-cream min-h-screen font-body"
    >
      <div className="max-w-[1800px] mx-auto px-6 lg:px-16 py-20">
        <EditableContainer id="doctors-header">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">
              <EditableText id="doctors-eyebrow">Expert Registry</EditableText>
            </p>
            <h1 className="section-text text-brand-navy mb-6">
              <EditableText id="doctors-title">Our Medical Experts & Staff</EditableText>
            </h1>
            <p className="text-base text-brand-navy/60 font-lora">
              <EditableText id="doctors-description">
                Meet our dedicated team of medical specialists, clinicians, support staff, and administrators committed to ethical, precise eye care.
              </EditableText>
            </p>
          </div>
        </EditableContainer>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-16">
          <button
            onClick={() => setActiveTab('specialists')}
            className={`px-8 py-3.5 rounded-full text-xs tracking-wider uppercase font-black transition-all duration-300 ${
              activeTab === 'specialists'
                ? 'bg-brand-navy text-cream shadow-lg border border-brand-navy'
                : 'bg-white border border-brand-navy/10 text-brand-navy/60 hover:text-brand-navy hover:border-brand-navy/30'
            }`}
          >
            Medical Specialists
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`px-8 py-3.5 rounded-full text-xs tracking-wider uppercase font-black transition-all duration-300 ${
              activeTab === 'support'
                ? 'bg-brand-navy text-cream shadow-lg border border-brand-navy'
                : 'bg-white border border-brand-navy/10 text-brand-navy/60 hover:text-brand-navy hover:border-brand-navy/30'
            }`}
          >
            Support & Administrative Team
          </button>
        </div>

        {activeTab === 'specialists' ? (
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
                            <span>
                              <strong>Education:</strong> <EditableText id={`doctor-edu-${idx}`}>{doc.edu}</EditableText>
                            </span>
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
        ) : (
          <div className="max-w-6xl mx-auto mb-20">
            {/* Search & Filter Bar */}
            <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-6 md:p-8 shadow-sm mb-8 flex flex-col md:flex-row gap-6 justify-between items-stretch md:items-center">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-navy/40" />
                <input
                  type="text"
                  placeholder="Search by name or designation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-cream/30 border border-brand-navy/10 rounded-2xl text-xs font-lora focus:outline-none focus:border-brand-teal transition-colors"
                />
              </div>

              {/* Department Dropdown / Chips */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-[10px] tracking-wider uppercase font-black text-brand-navy/40 mr-2">Dept:</span>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="md:hidden bg-cream/30 border border-brand-navy/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-teal font-lora"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>

                <div className="hidden md:flex flex-wrap gap-1.5">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setSelectedDept(dept)}
                      className={`px-3.5 py-2 rounded-full text-[9px] uppercase font-black tracking-wider transition-all duration-300 ${
                        selectedDept === dept
                          ? 'bg-brand-teal text-brand-navy shadow-sm'
                          : 'bg-cream/40 border border-brand-navy/5 text-brand-navy/60 hover:bg-cream/80 hover:text-brand-navy'
                      }`}
                    >
                      {dept === 'All' ? 'All' : dept.split(' & ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Count & Clear filter */}
            <div className="flex justify-between items-center mb-6 px-4">
              <p className="text-xs text-brand-navy/60 font-lora">
                Showing {filteredStaff.length} of {staffMembers.length} staff members
              </p>
              {(searchQuery || selectedDept !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDept('All');
                  }}
                  className="text-xs text-brand-teal hover:underline font-black uppercase tracking-wider"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Staff Grid - Exact Past Implementation Matching Screenshot 2 */}
            {filteredStaff.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredStaff.map((staff, idx) => (
                  <motion.div
                    key={staff.code}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (idx % 8) * 0.05, duration: 0.4 }}
                    whileHover={{ y: -4 }}
                    className="bg-brand-navy text-cream rounded-[2rem] p-6 border border-cream/5 shadow-xl flex flex-col justify-between hover:border-brand-teal/40 transition-all duration-300 group"
                  >
                    <div>
                      {/* Department badge & EMP Code */}
                      <div className="flex justify-between items-start gap-2 mb-4">
                        <span className="text-[8px] tracking-wider uppercase font-black text-brand-teal px-2.5 py-1 bg-brand-teal/15 rounded-full line-clamp-1">
                          {staff.department}
                        </span>
                        <span className="text-[9px] font-black text-cream/35 font-mono shrink-0 pt-0.5">
                          EMP-{staff.code}
                        </span>
                      </div>

                      {/* Staff portrait.
                          The ID-card scans in /public/staff are strips cut from a contact sheet, so each
                          one bleeds part of the neighbouring card into frame — including personal mobile
                          numbers and blood groups (see card_11, card_20). They are therefore not shown
                          publicly. Once properly cropped cards exist, flip SHOW_ID_CARD_SCANS back to true. */}
                      <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden mb-4 bg-white border border-cream/10 p-2 shadow-inner">
                        {SHOW_ID_CARD_SCANS ? (
                          <img
                            src={staff.image}
                            alt={`${staff.name} ID Card`}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="w-full h-full rounded-xl bg-brand-navy/5 flex flex-col items-center justify-center gap-3">
                            <div className="w-16 h-16 rounded-full bg-brand-teal/15 border border-brand-teal/30 flex items-center justify-center">
                              <span className="text-xl font-black text-brand-teal font-body">
                                {initialsOf(staff.name)}
                              </span>
                            </div>
                            <span className="text-[8px] tracking-[0.2em] uppercase font-black text-brand-navy/35">
                              EMP-{staff.code}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Info details */}
                      <h3 className="text-lg font-black text-cream leading-tight mb-1 font-body group-hover:text-brand-teal transition-colors">
                        {staff.name}
                      </h3>
                      <p className="text-[10px] text-brand-teal font-black uppercase tracking-wider mb-4 font-body">
                        {staff.designation}
                      </p>

                      <hr className="border-cream/10 my-4" />

                      <div className="space-y-2.5 text-xs font-lora text-cream/65 mb-6">
                        <div className="flex justify-between items-center">
                          <span>Department:</span>
                          <span className="text-cream/80 text-[11px] text-right">{staff.department}</span>
                        </div>
                      </div>
                    </div>

                    {/* Routed through the hospital helpdesk rather than staff personal numbers */}
                    <a
                      href="tel:05946223616"
                      className="bg-brand-teal hover:bg-cream text-brand-navy hover:text-brand-navy py-3 rounded-2xl text-[9px] tracking-widest uppercase font-black transition-all flex items-center justify-center gap-2 shadow-sm w-full font-body"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Contact Helpdesk
                    </a>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 md:p-12 shadow-sm text-brand-navy max-w-lg mx-auto">
                <Users className="w-12 h-12 text-brand-teal/40 mx-auto mb-4" />
                <h3 className="text-lg font-black mb-2">No Members Found</h3>
                <p className="text-xs text-brand-navy/60 font-lora leading-relaxed mb-6">
                  We couldn't find any team members matching "{searchQuery}" in the selected category.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDept('All');
                  }}
                  className="bg-brand-navy text-cream hover:bg-brand-teal hover:text-brand-navy px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all"
                >
                  Reset Search Filters
                </button>
              </div>
            )}
          </div>
        )}

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
              <EditableText id="doctors-extra-desc">
                Our clinical panel also includes consulting surgeons and specialists working in rotation. Together, our panel strives to deliver premium, ethical, and personal eye care using the highest level of diagnostic technology and surgical standards.
              </EditableText>
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
