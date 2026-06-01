import React, { useState } from 'react';
import { Sparkles, Eye } from 'lucide-react';

const VisionSimulator: React.FC = () => {
  const [filter, setFilter] = useState<'clear' | 'cataract' | 'myopia' | 'miosis' | 'mydriasis' | 'nightblindness'>('clear');

  // Denser starfield array (approx 50 stars) for a filled starry sky effect
  const stars = [
    { top: '5%', left: '8%', size: 'w-1 h-1' },
    { top: '8%', left: '28%', size: 'w-1.5 h-1.5' },
    { top: '4%', left: '48%', size: 'w-1 h-1' },
    { top: '6%', left: '68%', size: 'w-2 h-2' },
    { top: '7%', left: '88%', size: 'w-1 h-1' },
    
    { top: '12%', left: '18%', size: 'w-1.5 h-1.5' },
    { top: '14%', left: '38%', size: 'w-1 h-1' },
    { top: '11%', left: '58%', size: 'w-2 h-2' },
    { top: '13%', left: '78%', size: 'w-1 h-1' },
    { top: '15%', left: '95%', size: 'w-1.5 h-1.5' },

    { top: '22%', left: '5%', size: 'w-1 h-1' },
    { top: '20%', left: '25%', size: 'w-1.5 h-1.5' },
    { top: '24%', left: '45%', size: 'w-1 h-1' },
    { top: '21%', left: '65%', size: 'w-2 h-2' },
    { top: '23%', left: '85%', size: 'w-1 h-1' },

    { top: '32%', left: '12%', size: 'w-1.5 h-1.5' },
    { top: '30%', left: '32%', size: 'w-1 h-1' },
    { top: '34%', left: '52%', size: 'w-2 h-2' },
    { top: '31%', left: '72%', size: 'w-1 h-1' },
    { top: '33%', left: '92%', size: 'w-1.5 h-1.5' },

    { top: '42%', left: '8%', size: 'w-1 h-1' },
    { top: '45%', left: '28%', size: 'w-1.5 h-1.5' },
    { top: '41%', left: '48%', size: 'w-1 h-1' },
    { top: '44%', left: '68%', size: 'w-2.5 h-2.5' },
    { top: '43%', left: '88%', size: 'w-1 h-1' },

    { top: '52%', left: '18%', size: 'w-1.5 h-1.5' },
    { top: '54%', left: '38%', size: 'w-1 h-1' },
    { top: '51%', left: '58%', size: 'w-2 h-2' },
    { top: '53%', left: '78%', size: 'w-1 h-1' },
    { top: '55%', left: '95%', size: 'w-1.5 h-1.5' },

    { top: '62%', left: '5%', size: 'w-1 h-1' },
    { top: '60%', left: '25%', size: 'w-1.5 h-1.5' },
    { top: '64%', left: '45%', size: 'w-1 h-1' },
    { top: '61%', left: '65%', size: 'w-2 h-2' },
    { top: '63%', left: '85%', size: 'w-1 h-1' },

    { top: '72%', left: '12%', size: 'w-1.5 h-1.5' },
    { top: '70%', left: '32%', size: 'w-1 h-1' },
    { top: '74%', left: '52%', size: 'w-2 h-2' },
    { top: '71%', left: '72%', size: 'w-1 h-1' },
    { top: '73%', left: '92%', size: 'w-1.5 h-1.5' },

    { top: '82%', left: '8%', size: 'w-1 h-1' },
    { top: '85%', left: '28%', size: 'w-1.5 h-1.5' },
    { top: '81%', left: '48%', size: 'w-1 h-1' },
    { top: '84%', left: '68%', size: 'w-2.5 h-2.5' },
    { top: '83%', left: '88%', size: 'w-1 h-1' },

    { top: '92%', left: '18%', size: 'w-1.5 h-1.5' },
    { top: '94%', left: '38%', size: 'w-1 h-1' },
    { top: '91%', left: '58%', size: 'w-2 h-2' },
    { top: '93%', left: '78%', size: 'w-1 h-1' }
  ];

  return (
    <div className="bg-brand-navy text-cream rounded-[3rem] p-8 md:p-12 border border-cream/10 shadow-2xl relative overflow-hidden">
      {/* Decorative Blur Background */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-teal/5 blur-3xl" />
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: Controls and description */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          <div>
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-3 block">[ Interactive Simulation ]</span>
            <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight font-body">Sight Simulator</h2>
            <p className="text-sm text-cream/70 font-lora leading-relaxed mb-8">
              Select an eye condition below to visualize how it affects your sight in a dark sky. Experience the visual clarity our treatments restore.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { id: 'clear', label: 'Clear 20/20 Vision', desc: 'Sharp, focused stars and a crisp crescent moon.', icon: <Eye className="w-4 h-4" /> },
              { id: 'cataract', label: 'Cataract (Halos & Blur)', desc: 'Cloudy details and scattered halo glare around moon and stars.', icon: <Sparkles className="w-4 h-4" /> },
              { id: 'myopia', label: 'Myopia (Before LASIK)', desc: 'Heavy distant blur, typical refractive error.', icon: <Eye className="w-4 h-4 rotate-180" /> },
              { id: 'miosis', label: 'Miosis (Constricted Pupil)', desc: 'Dimmer night view but pinpoint sharp focus (pinhole effect).', icon: <Eye className="w-4 h-4 scale-75 opacity-70" /> },
              { id: 'mydriasis', label: 'Mydriasis (Dilated Pupil)', desc: 'Brighter view with extreme glare and halos around light sources.', icon: <Eye className="w-4 h-4 scale-125 text-brand-teal" /> },
              { id: 'nightblindness', label: 'Night Blindness (Nyctalopia)', desc: 'Severe low-light vision loss; most stars disappear completely.', icon: <Eye className="w-4 h-4 opacity-30" /> },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setFilter(opt.id as any)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                  filter === opt.id
                    ? 'bg-brand-teal text-brand-navy border-brand-teal'
                    : 'bg-cream/5 text-cream/80 border-cream/10 hover:border-brand-teal/40'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                  filter === opt.id ? 'bg-brand-navy/10 text-brand-navy' : 'bg-cream/10 text-brand-teal'
                }`}>
                  {opt.icon}
                </div>
                <div>
                  <h3 className="font-bold text-xs">{opt.label}</h3>
                  <p className={`text-[10px] mt-1 leading-normal ${
                    filter === opt.id ? 'text-brand-navy/70' : 'text-cream/50'
                  }`}>
                    {opt.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: The Simulator Viewport */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="relative w-full aspect-[16/10] bg-[#030712] rounded-3xl border border-cream/10 overflow-hidden shadow-2xl">
            
            {/* 1. Base Scene: Starry sky & crescent moon */}
            <div 
              className={`w-full h-full relative transition-all duration-500 select-none ${
                filter === 'cataract' ? 'blur-[2.5px] contrast-[0.8]' :
                filter === 'myopia' ? 'blur-[8px]' : 
                filter === 'miosis' ? 'brightness-[0.5]' :
                filter === 'mydriasis' ? 'brightness-[1.25] contrast-[1.1]' :
                filter === 'nightblindness' ? 'brightness-[0.2] contrast-[0.9]' : ''
              }`}
            >
              {/* Dark deep sky gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#01040f] via-[#050811] to-[#010206] pointer-events-none" />

              {/* Stars Field */}
              {stars.map((star, idx) => {
                // For nightblindness, hide most stars (only show a few bright ones)
                const isVisible = filter !== 'nightblindness' || idx % 15 === 0;
                if (!isVisible) return null;

                return (
                  <div 
                    key={idx} 
                    className={`absolute bg-white rounded-full transition-all duration-500 ${star.size} ${
                      filter === 'cataract' ? 'shadow-[0_0_10px_rgba(255,255,255,0.9)] opacity-95' :
                      filter === 'mydriasis' ? 'shadow-[0_0_15px_rgba(255,255,255,0.95)] opacity-100 scale-150' :
                      filter === 'miosis' ? 'opacity-70 scale-75' :
                      filter === 'nightblindness' ? 'opacity-40 scale-75' : 'opacity-90'
                    }`}
                    style={{ 
                      top: star.top, 
                      left: star.left,
                    }}
                  />
                );
              })}

              {/* Curved Crescent Moon */}
              <div className="absolute top-[20%] left-[45%] w-24 h-24 flex items-center justify-center">
                {/* Halos glare overlay for Cataract or Mydriasis */}
                {filter === 'cataract' && (
                  <div className="absolute w-32 h-32 bg-[#fefcbf]/25 rounded-full blur-[16px] animate-pulse" />
                )}
                {filter === 'mydriasis' && (
                  <div className="absolute w-48 h-48 bg-[#fefcbf]/35 rounded-full blur-[24px] animate-pulse" />
                )}
                
                <svg viewBox="0 0 100 100" className="w-16 h-16 relative z-10 transition-transform duration-500">
                  {/* Perfect crescent path */}
                  <path 
                    d="M 50 10 A 40 40 0 1 0 90 50 A 30 30 0 1 1 50 10 Z" 
                    fill="#fefcbf" 
                    className="transition-all duration-500"
                    style={{
                      filter: 
                        filter === 'cataract' ? 'drop-shadow(0 0 12px rgba(254,252,191,0.9))' : 
                        filter === 'mydriasis' ? 'drop-shadow(0 0 20px rgba(254,252,191,1)) drop-shadow(0 0 40px rgba(254,252,191,0.6))' : 
                        'none'
                    }}
                  />
                </svg>
              </div>
            </div>

            {/* Filter Info Tag */}
            <div className="absolute bottom-4 left-4 bg-brand-navy-deep/80 border border-cream/10 px-4 py-2 rounded-xl text-[10px] tracking-wider uppercase font-black z-30">
              Active Mode: {filter.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionSimulator;
