import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Eye, HeartHandshake, Layers, Activity, Shield, Glasses, Scissors } from 'lucide-react';
import VisionSimulator from '../components/VisionSimulator';
import EditableSection from '../components/EditableSection';
import FooterCTA from '../components/FooterCTA';

const Services: React.FC = () => {
  const departments = [
    {
      title: 'Cataract Surgery',
      desc: 'Sutureless micro-incision phacoemulsification with premium foldable IOL, aspheric, multifocal, and EDOF (Symphony) lenses. Over 16,000+ cataract surgeries performed.',
      icon: <Sparkles className="w-6 h-6 text-brand-teal" />,
      path: '/cataract'
    },
    {
      title: 'Retina Services',
      desc: 'Comprehensive medical and surgical retina care for diabetic retinopathy, macular degeneration, retinal detachment, and vitreoretinal surgery by Dr. Kanhaiya Mittal (MD, AIIMS Delhi).',
      icon: <Layers className="w-6 h-6 text-brand-teal" />,
      path: '/retina-services'
    },
    {
      title: 'Glaucoma Services',
      desc: 'Glaucoma screening, intraocular pressure monitoring, visual field testing, OCT analysis, selective laser trabeculoplasty (SLT), and surgical management.',
      icon: <Activity className="w-6 h-6 text-brand-teal" />,
      path: '/glaucoma-services'
    },
    {
      title: 'Oculoplasty Services',
      desc: 'Lid surgeries, lacrimal (tear duct) surgeries, orbital surgeries, ocular prosthesis, and cosmetic eye procedures. Over 2,000 lacrimal and 4,000 lid surgeries performed.',
      icon: <Scissors className="w-6 h-6 text-brand-teal" />,
      path: '/oculoplasty-services'
    },
    {
      title: 'Refractive Error Treatment (LASIK)',
      desc: 'Treatment for removal of high number glasses using topography and optical biometry for precise measurements and optimal outcomes.',
      icon: <Eye className="w-6 h-6 text-brand-teal" />,
      path: '/lasik'
    },
    {
      title: 'Paediatric Ophthalmology',
      desc: 'Specialized eye care for children including pediatric cataract, squint correction, lazy eye (amblyopia) treatment, vision screening, and pediatric glaucoma management.',
      icon: <HeartHandshake className="w-6 h-6 text-brand-teal" />,
      path: '/paediatric-ophthalmology'
    },
    {
      title: 'VR Surgery (Vitreoretinal)',
      desc: 'Complex posterior segment eye surgery for retinal detachment, vitreous hemorrhage, macular holes, epiretinal membranes, and complicated cataract cases.',
      icon: <Shield className="w-6 h-6 text-brand-teal" />,
      path: '/vr-surgery'
    },
    {
      title: 'Optical Services',
      desc: 'In-house optical store providing spectacles, contact lenses, and optical accessories with latest technology for accurate lens fitting and measurement.',
      icon: <Glasses className="w-6 h-6 text-brand-teal" />,
      path: '/optical-services'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1800px] mx-auto px-6 lg:px-16 py-20"
    >
      <EditableSection id="services-header">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Eye Services</p>
          <h1 className="section-text text-brand-navy mb-6">Our Super-Specialty Services</h1>
          <p className="text-base text-brand-navy/60 font-lora">
            Vedanta Netralya is a superspeciality eye hospital providing premium and comprehensive eye care including Retina, Glaucoma, Oculoplasty, Cataract, and Refractive care under the able leadership of Dr. R.J.K. Singh, Dr. Sameer Varma, and Dr. Kanhaiya Mittal.
          </p>
        </div>
      </EditableSection>

      <EditableSection id="services-grid">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24">
          {departments.map((dept, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="bg-brand-navy text-cream rounded-[2.5rem] p-8 border border-cream/5 flex flex-col justify-between min-h-[300px] shadow-lg relative overflow-hidden group"
            >
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-brand-teal/5 blur-2xl group-hover:bg-brand-teal/10 transition-colors" />
              
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cream/5 border border-cream/10 flex items-center justify-center mb-6">
                  {dept.icon}
                </div>
                <h2 className="text-xl font-black mb-3">{dept.title}</h2>
                <p className="text-xs text-cream/70 font-lora leading-relaxed mb-8">{dept.desc}</p>
              </div>

              <Link 
                to={dept.path} 
                className="text-[9px] tracking-[0.2em] font-black uppercase text-brand-teal hover:text-brand-teal-bright transition-colors flex items-center gap-2 group/btn border-t border-cream/10 pt-4"
              >
                Learn More
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </EditableSection>

      {/* Embedded Vision Simulator */}
      <EditableSection id="services-vision-simulator">
        <div className="border-t border-brand-navy/5 pt-16">
          <VisionSimulator />
        </div>
      </EditableSection>

      <FooterCTA />
    </motion.div>
  );
};

export default Services;
