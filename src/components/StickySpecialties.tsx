import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

import serviceCataract from '../assets/service-cataract.png';
import serviceLasik from '../assets/service-lasik.png';
import servicePaediatric from '../assets/service-paediatric.png';
import serviceGlaucoma from '../assets/service-glaucoma.png';
import serviceRetina from '../assets/service-retina.png';
import serviceOculoplasty from '../assets/service-oculoplasty.png';

interface Spec {
  num: string; tag: string; title: string; desc: string;
  stat: string; statLabel: string; stat2: string; stat2Label: string;
  img: string; path: string;
}

const SPECS: Spec[] = [
  { num: '01', tag: 'Advanced Micro-Incision', title: 'Cataract Surgery', desc: 'Premium micro-incision phacoemulsification with foldable multifocal and toric IOLs. Painless, with visual recovery inside 24 hours.', stat: '50k+', statLabel: 'Lens implants', stat2: '24 hrs', stat2Label: 'Recovery', img: serviceCataract, path: '/cataract' },
  { num: '02', tag: 'Vitreoretinal Speciality', title: 'Retina and Vitreous', desc: 'Sutureless micro-incision vitrectomy surgery for diabetic retinopathy, macular holes, and retinal detachment.', stat: '2000+', statLabel: 'Retina surgeries', stat2: '25G', stat2Label: 'Sutureless', img: serviceRetina, path: '/retina-services' },
  { num: '03', tag: 'Intraocular Pressure Control', title: 'Glaucoma Management', desc: 'Advanced imaging, micro-shunts, and selective laser trabeculoplasty to protect the optic nerve for life.', stat: '7000+', statLabel: 'Glaucoma patients', stat2: 'SLT', stat2Label: 'Laser therapy', img: serviceGlaucoma, path: '/glaucoma-services' },
  { num: '04', tag: 'Eyelid & Orbit Surgery', title: 'Oculoplasty Services', desc: 'Surgical correction of drooping eyelids, blocked tear ducts, and ocular reconstructive procedures.', stat: '8000+', statLabel: 'Procedures', stat2: 'DCR', stat2Label: 'Lacrimal', img: serviceOculoplasty, path: '/oculoplasty-services' },
  { num: '05', tag: 'Squint and Orthoptics', title: 'Pediatric Ophthalmology', desc: 'Gentle, specialised eye care for infants and children, squint correction and structured vision-therapy programs.', stat: '5,000+', statLabel: 'Children treated', stat2: '0-16', stat2Label: 'Age range', img: servicePaediatric, path: '/paediatric-ophthalmology' },
  { num: '06', tag: 'Lens Implants (ICL / RLE)', title: 'Refractive Surgery', desc: 'Advanced lens-based correction solutions including Implantable Collamer Lenses (ICL) and Refractive Lens Exchange to eliminate glasses.', stat: '20/20', statLabel: 'Vision quality', stat2: 'ICL', stat2Label: 'Premium', img: serviceLasik, path: '/refractive-surgery' },
];

const StickySpecialties: React.FC = () => {
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const passed = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? passed / total : 0;
      const idx = Math.min(SPECS.length - 1, Math.floor(p * SPECS.length * 0.999));
      setActive(idx);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isDesktop]);

  const spec = SPECS[active];

  const jumpTo = (i: number) => {
    const el = sectionRef.current;
    if (!el || !isDesktop) { setActive(i); return; }
    const total = el.offsetHeight - window.innerHeight;
    const top = el.offsetTop + (total * (i + 0.5)) / SPECS.length;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="wings" className="relative bg-cream-dark" style={{ height: isDesktop ? `${SPECS.length * 100}vh` : 'auto' }}>
      <div className="lg:sticky lg:top-0 lg:h-screen flex items-center py-20 lg:py-0">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 w-full">
          <div className="mb-10 lg:mb-12">
            <p className="text-brand-teal text-[10px] tracking-[0.3em] uppercase font-black mb-4">Our Specialities</p>
            <h2 className="text-4xl lg:text-6xl font-black text-brand-navy leading-[1.02] tracking-tight">
              Six wings of <span className="italic font-light text-brand-teal">ophthalmic excellence.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div className="hidden lg:flex flex-col">
              {SPECS.map((s, i) => (
                <button key={i} onClick={() => jumpTo(i)} className="group text-left py-4 border-b border-brand-navy/10 flex items-center gap-5 transition-all duration-300" style={{ paddingLeft: active === i ? 18 : 0 }}>
                  <span className="block rounded-full transition-all duration-300" style={{ width: 4, height: active === i ? 40 : 18, background: active === i ? 'var(--brand-teal)' : 'rgba(10,39,66,0.18)' }} />
                  <span className={`text-[11px] font-black tracking-widest transition-colors ${active === i ? 'text-brand-teal' : 'text-brand-navy/30'}`}>{s.num}</span>
                  <span className="font-black tracking-tight transition-all duration-300" style={{ fontSize: active === i ? '2.25rem' : '1.6rem', lineHeight: 1.05, color: active === i ? '#0a2742' : 'rgba(10,39,66,0.34)' }}>{s.title}</span>
                </button>
              ))}
              <div className="flex gap-2 mt-8">
                {SPECS.map((_, i) => (
                  <span key={i} className={`h-2 rounded-full transition-all duration-300 ${active === i ? 'w-8 bg-brand-teal' : 'w-2 bg-brand-navy/15'}`} />
                ))}
              </div>
            </div>

            <div className="relative">
              <div key={active} className="fade-up rounded-[2rem] overflow-hidden bg-white border border-brand-navy/10 shadow-[0_40px_80px_-50px_rgba(10,39,66,0.6)]">
                <div className="relative h-[260px] md:h-[340px] overflow-hidden">
                  <img src={spec.img} alt={spec.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-brand-navy/10 to-transparent" />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-brand-navy rounded-full px-4 py-2 text-[10px] tracking-[0.16em] uppercase font-black">{spec.num} - {spec.tag}</span>
                  <h3 className="absolute bottom-4 left-5 right-5 text-white text-3xl md:text-4xl font-black tracking-tight">{spec.title}</h3>
                </div>
                <div className="p-7 lg:p-8">
                  <p className="text-base text-brand-navy/65 font-lora leading-relaxed mb-7">{spec.desc}</p>
                  <div className="flex gap-10 border-t border-brand-navy/10 pt-6">
                    <div>
                      <p className="text-3xl font-black text-brand-teal">{spec.stat}</p>
                      <p className="text-[9px] tracking-[0.14em] uppercase text-brand-navy/50 font-black mt-1.5">{spec.statLabel}</p>
                    </div>
                    <div>
                      <p className="text-3xl font-black text-brand-teal">{spec.stat2}</p>
                      <p className="text-[9px] tracking-[0.14em] uppercase text-brand-navy/50 font-black mt-1.5">{spec.stat2Label}</p>
                    </div>
                    <Link to={spec.path} className="ml-auto self-center bg-brand-navy text-white hover:bg-brand-teal w-12 h-12 rounded-full flex items-center justify-center transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:hidden">
              {SPECS.map((s, i) => (
                <button key={i} onClick={() => setActive(i)} className={`text-left rounded-2xl border p-4 transition-all ${active === i ? 'bg-white border-brand-teal/40 shadow-lg' : 'bg-white/50 border-brand-navy/10'}`}>
                  <span className="text-[10px] font-black text-brand-teal tracking-widest">{s.num}</span>
                  <h4 className="text-lg font-black text-brand-navy">{s.title}</h4>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StickySpecialties;
