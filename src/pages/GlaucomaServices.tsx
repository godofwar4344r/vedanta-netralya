import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, CheckCircle2, Search, Award, AlertTriangle, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EditableText, EditableMedia } from '../components/Editable';
import FooterCTA from '../components/FooterCTA';
import drSameerSlitlamp2 from '../assets/dr-sameer-slitlamp-2.jpeg';
import waitingLobby1 from '../assets/hospital-waiting-lobby-1.jpeg';

const GlaucomaServices: React.FC = () => {
  const [isTunnelVision, setIsTunnelVision] = React.useState(false);
  const diagnosticTools = [
    {
      title: 'Tonometry (NCT & Applanation)',
      desc: 'Highly accurate intraocular pressure monitoring using both advanced Non-Contact Tonometry (NCT) and Goldmann Applanation Tonometry, the clinical gold standard.'
    },
    {
      title: 'Perimetry / Visual Field Analysis',
      desc: 'Computerized Humphrey Visual Field (HVF) analysis to map the peripheral vision and locate silent blind spots or patterns of early glaucomatous field loss.'
    },
    {
      title: 'Gonioscopy & Angle Assessment',
      desc: 'Direct examination of the eye\'s drainage angle using specialized gonioscopy lenses to differentiate between open-angle and narrow-angle glaucoma.'
    },
    {
      title: 'Optic Nerve Head OCT & Pachymetry',
      desc: 'High-definition RNFL analysis to track optic nerve fiber loss, combined with ultrasonic pachymetry to measure central corneal thickness for corrected IOP calculations.'
    }
  ];

  const glaucomaTreatments = [
    {
      title: 'YAG Laser Iridotomy',
      desc: 'A quick, non-invasive outpatient laser procedure that creates a tiny microscopic channel in the iris, resolving and preventing acute angle-closure attacks.'
    },
    {
      title: 'Selective Laser Trabeculoplasty (SLT)',
      desc: 'Advanced cold laser therapy targeted at the trabecular meshwork to improve natural fluid outflow and lower intraocular pressure, reducing eyedrop dependency.'
    },
    {
      title: 'Filtration Trabeculectomy Surgery',
      desc: 'Surgical creation of a new drainage pathway (a filtration bleb) to bypass blocked channels, achieving low, stable intraocular pressures for advanced cases.'
    },
    {
      title: 'Medical Therapy & Nerve Protection',
      desc: 'Customized prescription regimens utilizing modern prostaglandin analogs and beta-blockers, combined with regular diurnal variations monitoring.'
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
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">Silent Sight Safeguard</span>
            <h1 className="section-text text-brand-navy mb-6">Glaucoma Care & Diagnostics</h1>
            <p className="text-lg font-lora text-brand-navy/70 leading-relaxed mb-6">
              Elite care focused on managing intraocular pressure and protecting the optic nerve to safeguard your sight for life.
            </p>
            <p className="text-sm text-brand-navy/60 leading-relaxed mb-8">
              Our comprehensive Glaucoma clinic offers **Advanced Diagnostic Imaging** (visual fields, gonioscopy, and high-definition RNFL OCT scans), **Glaucoma Laser Management** (SLT & YAG iridotomy), and specialized **Glaucoma Surgeries** (trabeculectomies & micro-shunts) to control intraocular pressure.
            </p>
            <Link to="/appointment" className="group bg-brand-navy text-cream hover:bg-brand-teal hover:text-brand-navy px-8 py-5 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all flex items-center justify-between max-w-xs shadow-md">
              Book Glaucoma Screening
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
          
          {/* Full Bleed Image Placement */}
          <div className="lg:col-span-5 relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-brand-navy aspect-[4/3] border border-cream/10">
            <EditableMedia
              id="glaucoma-image-hero"
              src={drSameerSlitlamp2}
              alt="Glaucoma Early Detection"
              className="w-full h-full object-cover opacity-90 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-transparent to-transparent p-8 flex items-end pointer-events-none">
              <div>
                <span className="text-[10px] text-brand-teal tracking-[0.3em] font-black uppercase">
                  <EditableText id="glaucoma-visual-title">Early Detection</EditableText>
                </span>
                <p className="text-cream text-lg font-merriweather font-bold mt-1">
                  <EditableText id="glaucoma-visual-desc">Humphrey visual fields and RNFL OCT.</EditableText>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnostics & Clinical Exams */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Diagnostics Suite</p>
            <h2 className="section-text text-brand-navy mb-6">Screening & Diagnostics</h2>
            <p className="text-base text-brand-navy/60 font-lora">
              Glaucoma management relies on precision measurements. Our diagnostic suite tracks even the smallest changes in pressure, angles, and nerve thickness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {diagnosticTools.map((proc, idx) => (
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

        {/* Treatment Suite */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Therapy & Lasers</p>
            <h2 className="section-text text-brand-navy mb-6">Glaucoma Treatment Suite</h2>
            <p className="text-base text-brand-navy/60 font-lora">
              Our clinical experts employ targeted therapies—from cold laser SLT to filtration micro-surgeries—to successfully stabilize intraocular pressure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {glaucomaTreatments.map((proc, idx) => (
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

        {/* Interactive Tunnel Vision Simulator */}
        <div className="mb-24 bg-brand-navy text-cream rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-xl border border-cream/10">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-teal/5 blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Description */}
            <div className="lg:col-span-5">
              <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-3 block">[ Interactive Visualizer ]</span>
              <h2 className="text-3xl font-black mb-4 leading-tight">Glaucoma Tunnel Vision</h2>
              <p className="text-sm text-cream/70 font-lora leading-relaxed mb-6">
                Glaucoma is often called the "silent thief of sight" because it causes irreversible peripheral vision loss without pain or warnings. Toggle below to experience how advanced glaucoma restricts your visual field.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsTunnelVision(false)}
                  className={`px-6 py-3.5 rounded-full text-[10px] tracking-widest uppercase font-black transition-all ${
                    !isTunnelVision
                      ? 'bg-brand-teal text-brand-navy'
                      : 'bg-cream/10 text-cream/80 hover:bg-cream/20'
                  }`}
                >
                  Normal Vision
                </button>
                <button
                  onClick={() => setIsTunnelVision(true)}
                  className={`px-6 py-3.5 rounded-full text-[10px] tracking-widest uppercase font-black transition-all ${
                    isTunnelVision
                      ? 'bg-brand-teal text-brand-navy animate-pulse'
                      : 'bg-cream/10 text-cream/80 hover:bg-cream/20'
                  }`}
                >
                  Tunnel Vision
                </button>
              </div>
            </div>

            {/* Right Display */}
            <div className="lg:col-span-7">
              <div className="relative w-full aspect-[16/9] bg-[#030712] rounded-3xl border border-cream/10 overflow-hidden shadow-2xl">
                {/* Base Viewport Image */}
                <div 
                  className={`w-full h-full relative transition-all duration-700 select-none ${
                    isTunnelVision ? 'scale-[1.03]' : ''
                  }`}
                >
                  <img 
                    src={waitingLobby1} 
                    alt="Glaucoma Visual Simulator" 
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep/40 to-transparent pointer-events-none" />
                </div>

                {/* Glaucoma Tunnel Vision Vignette Overlay */}
                <div 
                  className={`absolute inset-0 pointer-events-none z-20 transition-opacity duration-700 ${
                    isTunnelVision ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, transparent 12%, rgba(3, 7, 18, 0.98) 45%)'
                  }}
                />

                {/* Active Mode Tag */}
                <div className="absolute bottom-4 left-4 bg-brand-navy-deep/80 border border-cream/10 px-4 py-2 rounded-xl text-[9px] tracking-wider uppercase font-black z-30">
                  Active Mode: {isTunnelVision ? 'GLAUCOMA TUNNEL VISION' : 'NORMAL CLEAR VISION'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Symptoms, Effects, and Cure Section */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Clinical Profile</p>
            <h2 className="section-text text-brand-navy mb-6">Symptoms, Risks & Treatments</h2>
            <p className="text-base text-brand-navy/60 font-lora">
              Understanding glaucoma symptoms, structural optic nerve damage risks, and target intraocular pressure-lowering therapies.
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
                <li>Often completely asymptomatic in early stages ("silent thief of sight")</li>
                <li>Gradual loss of peripheral vision, eventually leading to tunnel vision</li>
                <li>Severe eye pain, headache, blurred vision, nausea, and vomiting (during acute attacks)</li>
                <li>Seeing rainbow-colored halos or rings around light sources</li>
              </ul>
            </div>

            {/* Effects Card */}
            <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mb-6">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-brand-navy mb-4">Potential Effects</h3>
              <ul className="space-y-3 text-xs leading-relaxed text-brand-navy/70 font-lora list-disc pl-4">
                <li>Irreversible progressive atrophy of the optic nerve head</li>
                <li>Irretrievable loss of peripheral visual field, narrowing down to total blindness</li>
                <li>Permanent damage to the retinal nerve fiber layer (RNFL)</li>
                <li>Severe, chronic eye pressure surges causing optic disk cupping</li>
              </ul>
            </div>

            {/* Cure Card */}
            <div className="bg-brand-navy text-cream rounded-[2.5rem] p-8 shadow-xl border border-cream/5 hover:border-brand-teal/40 transition-all duration-300">
              <div className="w-12 h-12 bg-brand-teal/10 text-brand-teal rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-cream mb-4">The Cure / Treatment</h3>
              <ul className="space-y-3 text-xs leading-relaxed text-cream/80 font-lora list-disc pl-4">
                <li>Humphrey Visual Field (HVF) analysis and nerve fiber OCT scan diagnostics</li>
                <li>Non-invasive Selective Laser Trabeculoplasty (SLT) to stimulate natural fluid drain</li>
                <li>YAG Laser Peripheral Iridotomy for narrow-angle glaucoma</li>
                <li>Trabeculectomy surgical bypass or drainage valve implants for severe cases</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Clinical Care Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-brand-navy text-cream rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-xl">
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl" />
          <div className="lg:col-span-12 flex flex-col justify-center">
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">Dedicated Oversight</span>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Preserve Your Vision Fields</h2>
            <p className="text-base text-cream/70 font-lora leading-relaxed mb-8 max-w-3xl">
              By combining early detection diagnostics with customized medication and surgical interventions, our clinical team headed by Dr. Sameer Varma ensures that glaucoma patients in Haldwani maintain their visual health and active lifestyles.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Sparkles className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">Cold Laser SLT</h3>
                <p className="text-[11px] text-cream/60 leading-normal">Gentle outflow stimulation to lower pressure naturally.</p>
              </div>
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <ShieldCheck className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">HVF Computerized Fields</h3>
                <p className="text-[11px] text-cream/60 leading-normal">Regular perimetry audits to capture early changes.</p>
              </div>
              <div className="bg-cream/5 p-5 rounded-2xl border border-cream/10">
                <Award className="w-6 h-6 text-brand-teal mb-3" />
                <h3 className="font-bold text-xs mb-1">Micro-Incision Shunts</h3>
                <p className="text-[11px] text-cream/60 leading-normal">Precision surgical options for complicated situations.</p>
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

export default GlaucomaServices;

