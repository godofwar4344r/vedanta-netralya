import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Gamepad2 } from 'lucide-react';

const FooterCTA: React.FC = () => {
  return (
    <div className="py-16 bg-cream-dark border-t border-brand-navy/10 relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-brand-teal/5 blur-2xl" />
      
      <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-brand-navy text-cream rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-cream/10 relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl" />
          
          <div className="lg:col-span-8 relative z-10">
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-3 block">Interactive Diagnostics</span>
            <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
              Curious About Your Vision Status?
            </h2>
            <p className="text-sm text-cream/70 font-lora max-w-xl leading-relaxed">
              Take our interactive digital eye test online in 2 minutes, or schedule a comprehensive in-person screening at our Haldwani super-specialty centre.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3 relative z-10 w-full">
            <Link 
              to="/test-eye" 
              className="group bg-brand-teal text-brand-navy hover:bg-cream hover:text-brand-navy py-4 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Gamepad2 className="w-4 h-4" />
              Test Eyes Digitally
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            
            <Link 
              to="/appointment" 
              className="group bg-cream/10 border border-cream/20 hover:bg-cream hover:text-brand-navy py-4 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-brand-teal" />
              Book Clinical Slot
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterCTA;
