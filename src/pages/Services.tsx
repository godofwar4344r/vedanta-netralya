import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Eye, HeartHandshake, Layers, Activity, Shield, Glasses, Scissors } from 'lucide-react';
import VisionSimulator from '../components/VisionSimulator';
import { EditableContainer, EditableText, EditableList, EditableMedia } from '../components/Editable';
import FooterCTA from '../components/FooterCTA';

// Service Images
import serviceCataract from '../assets/service-cataract.png';
import serviceRetina from '../assets/service-retina.png';
import serviceGlaucoma from '../assets/service-glaucoma.png';
import serviceOculoplasty from '../assets/service-oculoplasty.png';
import serviceLasik from '../assets/service-lasik.png';
import servicePaediatric from '../assets/service-paediatric.png';
import serviceVr from '../assets/service-vr.png';
import serviceOptical from '../assets/service-optical.png';

const renderIcon = (name: string) => {
  switch (name) {
    case 'Sparkles': return <Sparkles className="w-6 h-6 text-brand-teal" />;
    case 'Layers': return <Layers className="w-6 h-6 text-brand-teal" />;
    case 'Activity': return <Activity className="w-6 h-6 text-brand-teal" />;
    case 'Scissors': return <Scissors className="w-6 h-6 text-brand-teal" />;
    case 'Eye': return <Eye className="w-6 h-6 text-brand-teal" />;
    case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-brand-teal" />;
    case 'Shield': return <Shield className="w-6 h-6 text-brand-teal" />;
    case 'Glasses': return <Glasses className="w-6 h-6 text-brand-teal" />;
    default: return <Eye className="w-6 h-6 text-brand-teal" />;
  }
};

const getServiceImage = (id: string) => {
  switch (id) {
    case 's-cataract': return serviceCataract;
    case 's-retina': return serviceRetina;
    case 's-glaucoma': return serviceGlaucoma;
    case 's-oculoplasty': return serviceOculoplasty;
    case 's-lasik': return serviceLasik;
    case 's-paediatric': return servicePaediatric;
    case 's-vr': return serviceVr;
    case 's-optical': return serviceOptical;
    default: return serviceLasik;
  }
};

const Services: React.FC = () => {
  const defaultDepartments = [
    {
      id: 's-cataract',
      title: 'Cataract Surgery',
      desc: 'Sutureless micro-incision phacoemulsification with premium foldable IOL, aspheric, multifocal, and EDOF (Symphony) lenses. Over 50,000+ cataract surgeries performed.',
      iconName: 'Sparkles',
      path: '/cataract'
    },
    {
      id: 's-retina',
      title: 'Retina Services',
      desc: 'Comprehensive medical and surgical retina care for diabetic retinopathy, macular degeneration, retinal detachment, and vitreoretinal surgery by Dr. Maj Aditya Bhardwaj (MS, Fellow Vitreo-Retina Surgery).',
      iconName: 'Layers',
      path: '/retina-services'
    },
    {
      id: 's-glaucoma',
      title: 'Glaucoma Services',
      desc: 'Glaucoma screening, intraocular pressure monitoring, visual field testing, OCT analysis, selective laser trabeculoplasty (SLT), and surgical management.',
      iconName: 'Activity',
      path: '/glaucoma-services'
    },
    {
      id: 's-oculoplasty',
      title: 'Oculoplasty Services',
      desc: 'Lid surgeries, lacrimal (tear duct) surgeries, orbital surgeries, ocular prosthesis, and cosmetic eye procedures. Over 2,000 lacrimal and 4,000 lid surgeries performed.',
      iconName: 'Scissors',
      path: '/oculoplasty-services'
    },
    {
      id: 's-refractive',
      title: 'Refractive Surgery (Glass Removal)',
      desc: 'Bladeless Femto-LASIK, SMILE, and advanced lens-based correction solutions (ICL, RLE) to eliminate glasses and restore crisp 20/20 vision.',
      iconName: 'Eye',
      path: '/refractive-surgery'
    },
    {
      id: 's-paediatric',
      title: 'Paediatric Ophthalmology',
      desc: 'Specialized eye care for children including pediatric cataract, squint correction, lazy eye (amblyopia) treatment, vision screening, and pediatric glaucoma management.',
      iconName: 'HeartHandshake',
      path: '/paediatric-ophthalmology'
    },
    {
      id: 's-vr',
      title: 'VR Surgery (Vitreoretinal)',
      desc: 'Complex posterior segment eye surgery for retinal detachment, vitreous hemorrhage, macular holes, epiretinal membranes, and complicated cataract cases.',
      iconName: 'Shield',
      path: '/vr-surgery'
    },
    {
      id: 's-optical',
      title: 'Optical Services',
      desc: 'In-house optical store providing spectacles, contact lenses, and optical accessories with latest technology for accurate lens fitting and measurement.',
      iconName: 'Glasses',
      path: '/optical-services'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1800px] mx-auto px-6 lg:px-16 py-20"
    >
      <EditableContainer id="services-header">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">
            <EditableText id="services-eyebrow">Eye Services</EditableText>
          </p>
          <h1 className="section-text text-brand-navy mb-6">
            <EditableText id="services-title">Our Super-Speciality Services</EditableText>
          </h1>
          <p className="text-base text-brand-navy/60 font-lora">
            <EditableText id="services-description">Vedanta Netralya is a super-speciality eye hospital providing premium and comprehensive eye care including Retina, Glaucoma, Oculoplasty, Cataract, and Refractive care under the able leadership of Dr. R.J.K. Singh, Dr. Sameer Varma, and Dr. Maj Aditya Bhardwaj.</EditableText>
          </p>
        </div>
      </EditableContainer>

      <EditableContainer id="services-grid">
        <EditableList
          id="services-list"
          defaultItems={defaultDepartments}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24"
          newItemTemplate={{
            title: 'New Service Speciality',
            desc: 'Describe clinical focus, treatments, and technologies here...',
            iconName: 'Eye',
            path: '/services'
          }}
        >
          {(dept) => (
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-brand-navy text-cream rounded-[2.5rem] flex flex-col justify-between group transition-all duration-300 relative overflow-hidden shadow-lg h-full"
            >
              {/* Background glow on hover */}
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-brand-teal/5 blur-2xl group-hover:bg-brand-teal/10 transition-colors pointer-events-none" />
              
              {/* Top Image Container */}
              <div className="relative h-48 w-full overflow-hidden rounded-t-[2.5rem]">
                <EditableMedia
                  id={`service-image-${dept.id}`}
                  src={getServiceImage(dept.id)}
                  alt={dept.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent opacity-80 pointer-events-none" />
                <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-brand-navy/80 backdrop-blur-md border border-cream/10 flex items-center justify-center text-brand-teal pointer-events-none">
                  {renderIcon(dept.iconName)}
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6 lg:p-8 flex flex-col flex-grow justify-between">
                <div>
                  <h2 className="text-xl font-black mb-3">
                    <EditableText id={`service-card-title-${dept.id}`}>{dept.title || 'Service Title'}</EditableText>
                  </h2>
                  <p className="text-xs text-cream/70 font-lora leading-relaxed mb-6">
                    <EditableText id={`service-card-desc-${dept.id}`}>{dept.desc || 'Service Description'}</EditableText>
                  </p>
                </div>

                <Link 
                  to={dept.path || '/services'} 
                  className="text-[9px] tracking-[0.2em] font-black uppercase text-brand-teal hover:text-brand-teal-bright transition-colors flex items-center gap-2 group/btn border-t border-cream/10 pt-4 w-full"
                >
                  Learn More
                  <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </motion.div>
          )}
        </EditableList>
      </EditableContainer>

      {/* Embedded Vision Simulator */}
      <EditableContainer id="services-vision-simulator">
        <div className="border-t border-brand-navy/5 pt-16">
          <VisionSimulator />
        </div>
      </EditableContainer>

      <FooterCTA />
    </motion.div>
  );
};

export default Services;
