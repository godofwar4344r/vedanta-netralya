import React from 'react';
import { motion } from 'framer-motion';
import { Layers, CheckCircle2, GraduationCap, ArrowUpRight, Search, Activity, ShieldCheck, Heart, AlertTriangle, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import FooterCTA from '../components/FooterCTA';

const RetinaServices: React.FC = () => {
  const diagnosticSuite = [
    {
      title: 'Optical Coherence Tomography (OCT)',
      desc: 'High-resolution, cross-sectional imaging of the retina and macula. Essential for early detection and tracking of macular edema, diabetic retinopathy, and macular degeneration.'
    },
    {
      title: 'USG - B Scan Ultrasonography',
      desc: 'High-frequency ultrasound imaging of the posterior segment. Vital for scanning eyes with opaque media, such as dense cataracts or vitreous hemorrhage.'
    },
    {
      title: 'Fundus Photography & FFA',
      desc: 'High-definition digital fundus imaging and Fluorescein Angiography (FFA) to map retinal blood flow and locate active microaneurysms or vascular leakage.'
    },
    {
      title: '78D / 90D Clinical Examination',
      desc: 'Advanced slit-lamp biomicroscopic evaluation of the central retina and optic nerve using high-power non-contact lenses and indirect ophthalmoscopy.'
    }
  ];

  const opdProcedures = [
    {
      title: 'Green Laser Photocoagulation',
      desc: 'Targeted laser treatment to seal leaking retinal vessels, treat retinal tears, and prevent the progression of proliferative diabetic retinopathy.'
    },
    {
      title: 'Laser Indirect Ophthalmoscopy (LIO)',
      desc: 'Specialized indirect laser delivery system that allows peripheral retinal photocoagulation for patients unable to sit at a standard slit-lamp.'
    },
    {
      title: 'Anti-VEGF & Corticosteroid Injections',
      desc: 'Direct intravitreal pharmacotherapy to reduce swelling, inhibit abnormal blood vessel growth, and treat wet AMD, DME, and retinal vein occlusions.'
    },
    {
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7">
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">Super-Specialty Care</span>
            <h1 className="section-text text-brand-navy mb-6">Retina & Vitreous Services</h1>
            <p className="text-lg font-lora text-brand-navy/70 leading-relaxed mb-6">
              Protect your vision from the inside out. Our specialized retina department delivers advanced diagnostics and targeted therapies for complex posterior segment conditions.
            </p>
            <p className="text-sm text-brand-navy/60 leading-relaxed mb-8">
              Under the expert care of our AIIMS-trained VR specialist, we manage diabetic eye disease, age-related macular degeneration (AMD), vascular occlusions, and peripheral retinal degenerations using state-of-the-art technologies.
            </p>
            <Link to="/appointment" className="group bg-brand-navy text-cream hover:bg-brand-teal hover:text-brand-navy px-8 py-5 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all flex items-center justify-between max-w-xs shadow-md">
              Schedule Retina Screening
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
          
          {/* Visual Accoutrement */}
          <div className="lg:col-span-5 relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-brand-navy aspect-[4/3] border border-cream/10 flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy via-brand-navy/95 to-brand-teal/20 opacity-90" />
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 rounded-full bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center text-brand-teal mx-auto mb-6">
                <Layers className="w-10 h-10" />
              </div>
              <h2 className="text-cream text-2xl font-merriweather font-bold mb-2">Advanced Retinal Care</h2>
              <p className="text-cream/60 text-xs font-lora max-w-sm mx-auto">
                Precision diagnosis using high-definition OCT, FFA, and high-frequency B-Scan ultrasonography.
              </p>
            </div>
          </div>
        </div>

        {/* Diagnostics & Clinical Exams */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Diagnostics Suite</p>
            <h2 className="section-text text-brand-navy mb-6">Retina Screening & Diagnostics</h2>
            <p className="text-base text-brand-navy/60 font-lora">
              Accurate imaging is the cornerstone of retinal care. We utilize cutting-edge technology to map and visualize the microscopic layers of your retina.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {diagnosticSuite.map((proc, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300 flex gap-4 items-start"
              >
                <div className="p-3 bg-brand-navy/5 rounded-2xl shrink-0 text-brand-teal">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-brand-navy mb-2">{proc.title}</h3>
                  <p className="text-xs text-brand-navy/70 leading-relaxed font-lora">{proc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OPD Procedures */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Treatment Suite</p>
            <h2 className="section-text text-brand-navy mb-6">Common OPD Procedures & Care</h2>
            <p className="text-base text-brand-navy/60 font-lora">
              From advanced green photocoagulation lasers to precise intravitreal therapies, we offer localized treatment options in a comfortable outpatient setting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {opdProcedures.map((proc, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300 flex gap-4 items-start"
              >
                <div className="p-3 bg-brand-navy/5 rounded-2xl shrink-0 text-brand-teal">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-brand-navy mb-2">{proc.title}</h3>
                  <p className="text-xs text-brand-navy/70 leading-relaxed font-lora">{proc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Symptoms, Effects, and Cure Section */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Clinical Profile</p>
            <h2 className="section-text text-brand-navy mb-6">Symptoms, Risks & Treatments</h2>
            <p className="text-base text-brand-navy/60 font-lora">
              Understanding retinal disease markers, potential for vision damage, and clinical options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Symptoms Card */}
            <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-brand-navy mb-4">Common Symptoms</h3>
              <ul className="space-y-3 text-xs leading-relaxed text-brand-navy/70 font-lora list-disc pl-4">
                <li>Sudden appearance of dark spots, floaters, or web-like structures in vision</li>
                <li>Flashes of light (photopsia) in one or both eyes</li>
                <li>Metamorphopsia (straight lines appearing wavy, distorted, or bent)</li>
                <li>A dark shadow or "curtain" coming down over your field of vision</li>
              </ul>
            </div>

            {/* Effects Card */}
            <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mb-6">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-brand-navy mb-4">Potential Effects</h3>
              <ul className="space-y-3 text-xs leading-relaxed text-brand-navy/70 font-lora list-disc pl-4">
                <li>Irreversible damage to the macula, causing loss of fine central vision</li>
                <li>Permanent blind spots or severe visual field constriction</li>
                <li>Tractional retinal detachment leading to sudden, total vision loss</li>
                <li>Proliferative diabetic retinopathy bleeding inside the vitreous cavity</li>
              </ul>
            </div>

            {/* Cure Card */}
            <div className="bg-brand-navy text-cream rounded-[2.5rem] p-8 shadow-xl border border-cream/5 hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-brand-teal/10 text-brand-teal rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-cream mb-4">The Cure / Treatment</h3>
              <ul className="space-y-3 text-xs leading-relaxed text-cream/80 font-lora list-disc pl-4">
                <li>High-definition OCT diagnostic mapping and Fluorescein Angiography (FFA)</li>
                <li>OPD multi-spot Green Laser Photocoagulation to seal leaky retinal blood vessels</li>
                <li>Intravitreal Anti-VEGF injections (e.g., Accentrix, Eylea) for macular edema</li>
                <li>Surgical Vitrectomy to clear hemorrhages and structurally repair retinal tears</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Doctor Spotlight: Dr. Kanhaiya Mittal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-brand-navy text-cream rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-xl">
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl" />
          <div className="lg:col-span-4 relative rounded-3xl overflow-hidden aspect-[3/4] bg-brand-navy/50 border border-cream/10 p-8 flex flex-col justify-between">
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black">VR Specialist</span>
            <div className="text-center my-auto">
              <GraduationCap className="w-16 h-16 text-brand-teal mx-auto mb-4" />
              <h3 className="text-2xl font-black">Dr. Kanhaiya Mittal</h3>
              <p className="text-xs text-cream/60 italic font-lora mt-1">MBBS, MD (AIIMS), DNB, FICO, MRCS</p>
            </div>
            <div className="border-t border-cream/10 pt-4 text-center">
              <span className="text-3xl font-black text-brand-teal block">10,000+</span>
              <span className="text-[8px] uppercase tracking-widest text-cream/40">Surgeries Performed</span>
            </div>
          </div>
          <div className="lg:col-span-8 flex flex-col justify-center">
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">Expert Profile</span>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Led by Elite Retina Surgeons</h2>
            <p className="text-base text-cream/70 font-lora leading-relaxed mb-8 max-w-xl">
              Our Vitreoretinal wing is headed by Dr. Kanhaiya Mittal, a highly experienced consultant with credentials from top-tier institutes including Maulana Azad Medical College and AIIMS New Delhi. With extensive training and international fellowships, he brings world-class medical and surgical retinal care directly to the Kumaun region.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Activity className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">Advanced Diagnostics</h3>
                <p className="text-[11px] text-cream/60 leading-normal">Precision high-definition OCT scan diagnostics.</p>
              </div>
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <ShieldCheck className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">NABH Accredited Care</h3>
                <p className="text-[11px] text-cream/60 leading-normal">Hospital facilities certified for top quality and safety standards.</p>
              </div>
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Heart className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">Diabetic & AMD Care</h3>
                <p className="text-[11px] text-cream/60 leading-normal">Expert medical therapy for long-term vision protection.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shared Footer CTA */}
      <FooterCTA />
    </motion.div>
  );
};

export default RetinaServices;

