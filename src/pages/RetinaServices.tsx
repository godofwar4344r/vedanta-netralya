import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, GraduationCap, ArrowUpRight, Search, Activity, ShieldCheck, Heart, AlertTriangle, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EditableContainer, EditableText, EditableList, EditableMedia } from '../components/Editable';
import FooterCTA from '../components/FooterCTA';
import drAdityaBhardwaj from '../assets/dr-aditya-bhardwaj.jpeg';

const RetinaServices: React.FC = () => {
  const defaultDiagnosticSuite = [
    {
      id: 'ret-diag-1',
      title: 'Optical Coherence Tomography (OCT)',
      desc: 'High-resolution, cross-sectional imaging of the retina and macula. Essential for early detection and tracking of macular edema, diabetic retinopathy, and macular degeneration.'
    },
    {
      id: 'ret-diag-2',
      title: 'USG - B Scan Ultrasonography',
      desc: 'High-frequency ultrasound imaging of the posterior segment. Vital for scanning eyes with opaque media, such as dense cataracts or vitreous hemorrhage.'
    },
    {
      id: 'ret-diag-3',
      title: 'Fundus Photography & FFA',
      desc: 'High-definition digital fundus imaging and Fluorescein Angiography (FFA) to map retinal blood flow and locate active microaneurysms or vascular leakage.'
    },
    {
      id: 'ret-diag-4',
      title: '78D / 90D Clinical Examination',
      desc: 'Advanced slit-lamp biomicroscopic evaluation of the central retina and optic nerve using high-power non-contact lenses and indirect ophthalmoscopy.'
    }
  ];

  const defaultOpdProcedures = [
    {
      id: 'ret-opd-1',
      title: 'Green Laser Photocoagulation',
      desc: 'Targeted laser treatment to seal leaking retinal vessels, treat retinal tears, and prevent the progression of proliferative diabetic retinopathy.'
    },
    {
      id: 'ret-opd-2',
      title: 'Laser Indirect Ophthalmoscopy (LIO)',
      desc: 'Specialized indirect laser delivery system that allows peripheral retinal photocoagulation for patients unable to sit at a standard slit-lamp.'
    },
    {
      id: 'ret-opd-3',
      title: 'Anti-VEGF & Corticosteroid Injections',
      desc: 'Direct intravitreal pharmacotherapy to reduce swelling, inhibit abnormal blood vessel growth, and treat wet AMD, DME, and retinal vein occlusions.'
    },
    {
      id: 'ret-opd-4',
      title: 'PDT & Cryotherapy',
      desc: 'Photodynamic Therapy and localized freezing (cryotherapy) procedures to treat complex vascular tumors, peripheral degenerations, and select tears.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-transparent font-body"
    >
      <div className="max-w-[1800px] mx-auto px-6 lg:px-16 py-16">
        {/* Header Banner */}
        <EditableContainer id="retina-header" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7">
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">
              <EditableText id="retina-eyebrow">Super-Specialty Care</EditableText>
            </span>
            <h1 className="section-text text-brand-navy mb-6">
              <EditableText id="retina-title">Retina & Vitreous Services</EditableText>
            </h1>
            <p className="text-lg font-lora text-brand-navy/70 leading-relaxed mb-6">
              <EditableText id="retina-subtitle">Protect your vision from the inside out. Our specialized retina department delivers advanced diagnostics and targeted therapies for complex posterior segment conditions.</EditableText>
            </p>
            <p className="text-sm text-brand-navy/60 leading-relaxed mb-8">
              <EditableText id="retina-description">Under the expert care of our fellowship-trained VR specialist, we manage diabetic eye disease, age-related macular degeneration (AMD), vascular occlusions, and peripheral retinal degenerations using state-of-the-art technologies.</EditableText>
            </p>
            <Link to="/appointment" className="group bg-brand-navy text-cream hover:bg-brand-teal hover:text-brand-navy px-8 py-5 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all flex items-center justify-between max-w-xs shadow-md">
              <EditableText id="retina-btn">Schedule Retina Screening</EditableText>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
          
          {/* Full Bleed Image Placement */}
          <div className="lg:col-span-5 relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-brand-navy aspect-[4/3] border border-cream/10">
            <EditableMedia
              id="retina-image-hero"
              src={drAdityaBhardwaj}
              alt="Advanced Retinal Care"
              className="w-full h-full object-cover opacity-90 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-transparent to-transparent p-8 flex items-end pointer-events-none">
              <div>
                <span className="text-[10px] text-brand-teal tracking-[0.3em] font-black uppercase">
                  <EditableText id="retina-visual-title">Advanced Retinal Care</EditableText>
                </span>
                <p className="text-cream text-lg font-merriweather font-bold mt-1">
                  <EditableText id="retina-visual-desc">Precision diagnosis using high-definition OCT, FFA, and B-Scan.</EditableText>
                </p>
              </div>
            </div>
          </div>
        </EditableContainer>

        {/* Diagnostics & Clinical Exams */}
        <EditableContainer id="retina-diagnostics-sec" className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">
              <EditableText id="retina-diag-eyebrow">Diagnostics Suite</EditableText>
            </p>
            <h2 className="section-text text-brand-navy mb-6">
              <EditableText id="retina-diag-title">Retina Screening & Diagnostics</EditableText>
            </h2>
            <p className="text-base text-brand-navy/60 font-lora">
              <EditableText id="retina-diag-description">Accurate imaging is the cornerstone of retinal care. We utilize cutting-edge technology to map and visualize the microscopic layers of your retina.</EditableText>
            </p>
          </div>

          <EditableList
            id="retina-diagnostics-list"
            defaultItems={defaultDiagnosticSuite}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            newItemTemplate={{
              title: 'New Retina Diagnostic Test',
              desc: 'Describe retinal imaging device, diagnostics targets, and capabilities details here...'
            }}
          >
            {(proc) => (
              <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300 flex gap-4 items-start h-full">
                <div className="p-3 bg-brand-navy/5 rounded-2xl shrink-0 text-brand-teal">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-brand-navy mb-2">
                    <EditableText id={`retina-diag-item-title-${proc.id}`}>{proc.title || 'Diagnostic Test Name'}</EditableText>
                  </h3>
                  <p className="text-xs text-brand-navy/70 leading-relaxed font-lora">
                    <EditableText id={`retina-diag-item-desc-${proc.id}`}>{proc.desc || 'Diagnostic scan details'}</EditableText>
                  </p>
                </div>
              </div>
            )}
          </EditableList>
        </EditableContainer>

        {/* OPD Procedures */}
        <EditableContainer id="retina-opd-sec" className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">
              <EditableText id="retina-opd-eyebrow">Treatment Suite</EditableText>
            </p>
            <h2 className="section-text text-brand-navy mb-6">
              <EditableText id="retina-opd-title">Common OPD Procedures & Care</EditableText>
            </h2>
            <p className="text-base text-brand-navy/60 font-lora">
              <EditableText id="retina-opd-description">From advanced green photocoagulation lasers to precise intravitreal therapies, we offer localized treatment options in a comfortable outpatient setting.</EditableText>
            </p>
          </div>

          <EditableList
            id="retina-opd-list"
            defaultItems={defaultOpdProcedures}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            newItemTemplate={{
              title: 'New Retinal OPD Treatment',
              desc: 'Describe laser treatments or intravitreal injection details here...'
            }}
          >
            {(proc) => (
              <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300 flex gap-4 items-start h-full">
                <div className="p-3 bg-brand-navy/5 rounded-2xl shrink-0 text-brand-teal">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-brand-navy mb-2">
                    <EditableText id={`retina-opd-item-title-${proc.id}`}>{proc.title || 'Treatment Title'}</EditableText>
                  </h3>
                  <p className="text-xs text-brand-navy/70 leading-relaxed font-lora">
                    <EditableText id={`retina-opd-item-desc-${proc.id}`}>{proc.desc || 'Treatment description details'}</EditableText>
                  </p>
                </div>
              </div>
            )}
          </EditableList>
        </EditableContainer>

        {/* Symptoms, Effects, and Cure Section */}
        <EditableContainer id="retina-risks-sec" className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">
              <EditableText id="retina-risks-eyebrow">Clinical Profile</EditableText>
            </p>
            <h2 className="section-text text-brand-navy mb-6">
              <EditableText id="retina-risks-title">Symptoms, Risks & Treatments</EditableText>
            </h2>
            <p className="text-base text-brand-navy/60 font-lora">
              <EditableText id="retina-risks-description">Understanding retinal disease markers, potential for vision damage, and clinical options.</EditableText>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Symptoms Card */}
            <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-brand-navy mb-4">
                <EditableText id="retina-symp-card-title">Common Symptoms</EditableText>
              </h3>
              <ul className="space-y-3 text-xs leading-relaxed text-brand-navy/70 font-lora list-disc pl-4">
                <li><EditableText id="retina-symp-item-1">Sudden appearance of dark spots, floaters, or web-like structures in vision</EditableText></li>
                <li><EditableText id="retina-symp-item-2">Flashes of light (photopsia) in one or both eyes</EditableText></li>
                <li><EditableText id="retina-symp-item-3">Metamorphopsia (straight lines appearing wavy, distorted, or bent)</EditableText></li>
                <li><EditableText id="retina-symp-item-4">A dark shadow or "curtain" coming down over your field of vision</EditableText></li>
              </ul>
            </div>

            {/* Effects Card */}
            <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mb-6">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-brand-navy mb-4">
                <EditableText id="retina-effects-card-title">Potential Effects</EditableText>
              </h3>
              <ul className="space-y-3 text-xs leading-relaxed text-brand-navy/70 font-lora list-disc pl-4">
                <li><EditableText id="retina-effects-item-1">Irreversible damage to the macula, causing loss of fine central vision</EditableText></li>
                <li><EditableText id="retina-effects-item-2">Permanent blind spots or severe visual field constriction</EditableText></li>
                <li><EditableText id="retina-effects-item-3">Tractional retinal detachment leading to sudden, total vision loss</EditableText></li>
                <li><EditableText id="retina-effects-item-4">Proliferative diabetic retinopathy bleeding inside the vitreous cavity</EditableText></li>
              </ul>
            </div>

            {/* Cure Card */}
            <div className="bg-brand-navy text-cream rounded-[2.5rem] p-8 shadow-xl border border-cream/5 hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-brand-teal/10 text-brand-teal rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-cream mb-4">
                <EditableText id="retina-cure-card-title">The Cure / Treatment</EditableText>
              </h3>
              <ul className="space-y-3 text-xs leading-relaxed text-cream/80 font-lora list-disc pl-4">
                <li><EditableText id="retina-cure-item-1">High-definition OCT diagnostic mapping and Fluorescein Angiography (FFA)</EditableText></li>
                <li><EditableText id="retina-cure-item-2">OPD multi-spot Green Laser Photocoagulation to seal leaky retinal blood vessels</EditableText></li>
                <li><EditableText id="retina-cure-item-3">Intravitreal Anti-VEGF injections (e.g., Accentrix, Eylea) for macular edema</EditableText></li>
                <li><EditableText id="retina-cure-item-4">Surgical Vitrectomy to clear hemorrhages and structurally repair retinal tears</EditableText></li>
              </ul>
            </div>
          </div>
        </EditableContainer>

        {/* Doctor Spotlight: Dr. Kanhaiya Mittal */}
        <EditableContainer id="retina-spotlight-sec" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-brand-navy text-cream rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-xl">
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl pointer-events-none" />
          <div className="lg:col-span-4 relative rounded-3xl overflow-hidden aspect-[3/4] bg-brand-navy/50 border border-cream/10 p-8 flex flex-col justify-between">
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black">
              <EditableText id="retina-spotlight-badge">VR Specialist</EditableText>
            </span>
            <div className="text-center my-auto">
              <GraduationCap className="w-16 h-16 text-brand-teal mx-auto mb-4" />
              <h3 className="text-2xl font-black">
                <EditableText id="retina-spotlight-doctor-name">Dr. Maj Aditya Bhardwaj</EditableText>
              </h3>
              <p className="text-xs text-cream/60 italic font-lora mt-1">
                <EditableText id="retina-spotlight-doctor-edu">MBBS, MS (Ophth), Fellow Vitreo-Retina Surgery</EditableText>
              </p>
            </div>
            <div className="border-t border-cream/10 pt-4 text-center">
              <span className="text-3xl font-black text-brand-teal block">
                <EditableText id="retina-spotlight-doctor-count">10,000+</EditableText>
              </span>
              <span className="text-[8px] uppercase tracking-widest text-cream/40">
                <EditableText id="retina-spotlight-doctor-label">Surgeries Performed</EditableText>
              </span>
            </div>
          </div>
          <div className="lg:col-span-8 flex flex-col justify-center">
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">
              <EditableText id="retina-spotlight-eyebrow">Expert Profile</EditableText>
            </span>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
              <EditableText id="retina-spotlight-title">Led by Elite Retina Surgeons</EditableText>
            </h2>
            <p className="text-base text-cream/70 font-lora leading-relaxed mb-8 max-w-xl">
              <EditableText id="retina-spotlight-description">Our Vitreoretinal wing is headed by Dr. Maj Aditya Bhardwaj, a highly experienced Vitreo-Retinal Surgeon with extensive postgraduate credentials from the prestigious Army Hospital (R&R), New Delhi, and a Fellowship in Vitreo-Retina Surgery from ASG Eye Hospital, Varanasi. With a unique background in family medicine, diabetology, and the Indian Armed Forces, he brings a disciplined, holistic, and compassionate approach to advanced retinal care.</EditableText>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-cream">
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Activity className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">
                  <EditableText id="retina-spotlight-bullet-1-title">Advanced Diagnostics</EditableText>
                </h3>
                <p className="text-[11px] text-cream/60 leading-normal">
                  <EditableText id="retina-spotlight-bullet-1-desc">Precision high-definition OCT scan diagnostics.</EditableText>
                </p>
              </div>
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <ShieldCheck className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">
                  <EditableText id="retina-spotlight-bullet-2-title">NABH Accredited Care</EditableText>
                </h3>
                <p className="text-[11px] text-cream/60 leading-normal">
                  <EditableText id="retina-spotlight-bullet-2-desc">Hospital facilities certified for top quality and safety standards.</EditableText>
                </p>
              </div>
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Heart className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">
                  <EditableText id="retina-spotlight-bullet-3-title">Diabetic & AMD Care</EditableText>
                </h3>
                <p className="text-[11px] text-cream/60 leading-normal">
                  <EditableText id="retina-spotlight-bullet-3-desc">Expert medical therapy for long-term vision protection.</EditableText>
                </p>
              </div>
            </div>
          </div>
        </EditableContainer>
      </div>

      {/* Shared Footer CTA */}
      <FooterCTA />
    </motion.div>
  );
};

export default RetinaServices;
