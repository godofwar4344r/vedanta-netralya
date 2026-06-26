import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Droplet, Eye, AlertTriangle, ArrowUpRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import FooterCTA from '../components/FooterCTA';
import preventionHeroImg from '../assets/eye-prevention-hero.png';

const Prevention: React.FC = () => {
  // 20-20-20 Rule Timer states
  const [timerActive, setTimerActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(20);
  const [timerComplete, setTimerComplete] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (timerActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setTimerActive(false);
      setTimerComplete(true);
    }
    return () => clearInterval(interval);
  }, [timerActive, secondsLeft]);

  const startTimer = () => {
    setSecondsLeft(20);
    setTimerComplete(false);
    setTimerActive(true);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setSecondsLeft(20);
    setTimerComplete(false);
  };

  const cvsTips = [
    {
      title: 'Blink Frequently',
      desc: 'We naturally blink 66% less when looking at digital monitors. Make a conscious effort to blink fully and frequently to re-lubricate your cornea.',
      tip: 'Try the "blink squeeze" exercise: close eyes for 2 seconds, squeeze gently, open.'
    },
    {
      title: 'Ergonomic Display Setup',
      desc: 'Keep screen distance at an arm\'s length (20 to 28 inches). Center the monitor so the top edge sits slightly below eye level (15-20 degrees tilt).',
      tip: 'The center of your screen should be 4 to 5 inches below your direct horizontal eye line.'
    },
    {
      title: 'Optimized Lighting',
      desc: 'Eliminate screen glare by placing displays away from direct sunlight or using curtains. Use anti-glare screen filters or desk-side task lighting.',
      tip: 'Ensure room ambient light is roughly equal to your screen brightness.'
    },
    {
      title: 'Text Scale & Warmth',
      desc: 'Adjust monitor settings: scale up text so reading feels effortless. Enable night filters (warm color temp) to minimize blue-light fatigue.',
      tip: 'Use black text on a light grey or cream background rather than high-contrast stark white.'
    },
    {
      title: 'Photophobia & Light Sensitivity',
      desc: 'Photophobia is discomfort or pain in the eyes caused by light exposure. It can indicate dry eyes, cataracts, refractive errors, or corneal stress. Self-care routines are essential to manage and minimize light sensitivity.',
      tip: 'Self-Care: Wear high-quality polarized UV sunglasses outdoors. Adjust room lighting to soft, indirect sources, and avoid using screens in pitch-dark environments.'
    }
  ];

  const washingSteps = [
    { num: '01', title: 'Sanitize Hands', desc: 'Thoroughly wash your hands with antibacterial soap and warm water before touching or rinsing your eyes.' },
    { num: '02', title: 'Prepare Clean Water', desc: 'Use sterile saline solution or clean, lukewarm drinking water. Avoid tap water if you suspect chemical or micro-abrasions.' },
    { num: '03', title: 'Tilt and Flush Outward', desc: 'Tilt your head to the side. Pour the solution gently from the inner corner (near nose) to the outer corner. This prevents washing debris into the other eye.' },
    { num: '04', title: 'Blink Softly', desc: 'Blink repeatedly while flushing the eye to allow the liquid to flow under the eyelids and clear out contaminants.' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-transparent font-body"
    >
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-20">
        
        {/* Header Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7">
            <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">Ocular Wellness Hub</span>
            <h1 className="section-text text-brand-navy mb-6">Daily Prevention & Eye Care Guidelines</h1>
            <p className="text-lg font-lora text-brand-navy/70 leading-relaxed mb-6">
              Healthy habits prevent irreversible vision issues. Explore our guide on combatting digital screen fatigue, performing correct eye washing, and relaxing your focus.
            </p>
            <p className="text-sm text-brand-navy/60 leading-relaxed mb-8">
              In our highly digital era, our eyes undergo continuous strain that leads to dry eye syndrome, micro-stress, and computer vision syndrome. Simple daily routines can mitigate these risks and preserve your visual acuity for life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#rules-20-20-20" className="group bg-brand-navy text-cream hover:bg-brand-teal hover:text-brand-navy px-8 py-4.5 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all flex items-center justify-center gap-4 shadow-md">
                Try 20-20-20 Rule Timer
                <Clock className="w-4 h-4" />
              </a>
              <Link to="/appointment" className="group border border-brand-navy/20 text-brand-navy hover:bg-brand-navy hover:text-cream px-8 py-4.5 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all flex items-center justify-center gap-4">
                Schedule Eye Exam
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Hero Illustration image */}
          <div className="lg:col-span-5 relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-brand-navy aspect-[4/3] border border-cream/10">
            <img
              src={preventionHeroImg}
              alt="Ocular Wellness and Vision Prevention Illustration"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent p-8 flex items-end">
              <div>
                <span className="text-[10px] text-brand-teal tracking-[0.3em] font-black uppercase">Ocular Shield</span>
                <p className="text-cream text-lg font-merriweather font-bold mt-1">Preserve your sight every day.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: The Interactive 20-20-20 Rule Timer */}
        <section id="rules-20-20-20" className="mb-24 bg-brand-navy text-cream rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-xl border border-cream/10">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-teal/5 blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left explanation */}
            <div className="lg:col-span-6">
              <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-3 block">[ Ocular Muscle Relaxation ]</span>
              <h2 className="text-3xl font-black mb-6 leading-tight font-body">The 20-20-20 Focus Rule</h2>
              <p className="text-sm text-cream/70 font-lora leading-relaxed mb-6">
                Prolonged near-focus (screens) tires the ciliary muscles in your eyes. The 20-20-20 rule helps reset your focal depth:
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-teal/20 text-brand-teal flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">20</div>
                  <p className="text-xs text-cream/80 leading-normal">Every **20 minutes**, take a step away from all displays.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-teal/20 text-brand-teal flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">20</div>
                  <p className="text-xs text-cream/80 leading-normal">Look at an object at least **20 feet** away (out a window or down a hallway).</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-teal/20 text-brand-teal flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">20</div>
                  <p className="text-xs text-cream/80 leading-normal">Hold your gaze there for a minimum of **20 seconds** to relax ciliary fibers.</p>
                </li>
              </ul>
            </div>

            {/* Right Timer Widget */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="bg-brand-navy-deep/60 border border-cream/10 rounded-[2rem] p-8 w-full max-w-sm flex flex-col items-center shadow-inner relative overflow-hidden">
                
                {/* Timer Circle */}
                <div className="relative w-44 h-44 flex items-center justify-center mb-6">
                  {/* Outer SVG Track Ring */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="88"
                      cy="88"
                      r="76"
                      stroke="rgba(245, 241, 234, 0.05)"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <motion.circle
                      cx="88"
                      cy="88"
                      r="76"
                      stroke="#00abc0"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 76}
                      animate={{
                        strokeDashoffset: 2 * Math.PI * 76 * (1 - secondsLeft / 20)
                      }}
                      transition={{ duration: timerActive ? 1 : 0.3, ease: 'linear' }}
                    />
                  </svg>

                  {/* Inner Timer Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black font-body text-cream">
                      {secondsLeft}
                    </span>
                    <span className="text-[8px] tracking-widest text-cream/40 uppercase font-black mt-1">Seconds</span>
                  </div>
                </div>

                {/* Subtext info */}
                <div className="text-center min-h-[50px] mb-6">
                  <AnimatePresence mode="wait">
                    {!timerActive && !timerComplete && (
                      <motion.p key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-cream/60">
                        Ready to relax? Click below to start your 20-second eye muscle break.
                      </motion.p>
                    )}
                    {timerActive && (
                      <motion.p key="relax" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-brand-teal font-medium">
                        Look away! Focus on a distant tree, wall, or object. Breathe deeply.
                      </motion.p>
                    )}
                    {timerComplete && (
                      <motion.p key="complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-green-400 font-bold flex items-center gap-1 justify-center">
                        <CheckCircle2 className="w-4 h-4 shrink-0" /> Focus muscles relaxed! Great work.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 w-full">
                  {!timerActive ? (
                    <button
                      onClick={startTimer}
                      className="flex-1 bg-brand-teal text-brand-navy hover:bg-brand-teal-bright py-3 rounded-full text-[10px] tracking-widest uppercase font-black transition-colors"
                    >
                      {timerComplete ? 'Start Again' : 'Relax Eyes Now'}
                    </button>
                  ) : (
                    <button
                      onClick={resetTimer}
                      className="flex-1 bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white py-3 rounded-full text-[10px] tracking-widest uppercase font-black transition-all"
                    >
                      Reset Timer
                    </button>
                  )}
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Section 2: CVS Prevention Guidelines Grid */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Ergonomics Suite</p>
            <h2 className="section-text text-brand-navy mb-6">Combatting Digital Screen Fatigue</h2>
            <p className="text-base text-brand-navy/60 font-lora">
              Prevent Computer Vision Syndrome (CVS) by making minor adjustments to your daily computer workstation and reading patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cvsTips.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-sm hover:border-brand-teal/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-navy/5 flex items-center justify-center text-brand-teal">
                      <Eye className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-black text-brand-navy">{item.title}</h3>
                  </div>
                  <p className="text-xs text-brand-navy/70 leading-relaxed font-lora mb-6">{item.desc}</p>
                </div>
                <div className="bg-brand-navy/5 rounded-2xl p-4 border border-brand-navy/5">
                  <span className="text-[8px] tracking-wider uppercase font-black text-brand-teal block mb-1">Practical Tip:</span>
                  <p className="text-[10px] font-medium text-brand-navy/80 font-lora leading-relaxed">{item.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Community Eye Screening Camps & Outreach */}
        <section className="mb-24 bg-cream-dark/50 border border-brand-navy/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-72 h-72 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 flex flex-col justify-center">
              <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">[ Outreach Campaigns ]</span>
              <h2 className="text-3xl font-black text-brand-navy mb-6 font-body">Eye Screening Camps & Preventive Care</h2>
              <p className="text-sm font-lora text-brand-navy/70 leading-relaxed mb-8">
                Vedanta Netralya actively organizes community eye screening camps and preventive eye care campaigns to raise awareness and identify ocular issues early.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white border border-brand-navy/10 rounded-2xl p-5 shadow-sm hover:border-brand-teal/30 transition-all">
                  <h3 className="font-bold text-xs text-brand-navy mb-2">Child Vision & Congenital Anomalies</h3>
                  <p className="text-[10px] text-brand-navy/60 leading-normal font-lora">
                    Early screening for children to detect pediatric cataracts, squints, refractive errors, and congenital ocular anomalies.
                  </p>
                </div>
                <div className="bg-white border border-brand-navy/10 rounded-2xl p-5 shadow-sm hover:border-brand-teal/30 transition-all">
                  <h3 className="font-bold text-xs text-brand-navy mb-2">Blood Sugar & Hypertension</h3>
                  <p className="text-[10px] text-brand-navy/60 leading-normal font-lora">
                    Comprehensive diabetic and hypertensive retinopathy screenings to detect silent microvascular retinal damage.
                  </p>
                </div>
                <div className="bg-white border border-brand-navy/10 rounded-2xl p-5 shadow-sm hover:border-brand-teal/30 transition-all">
                  <h3 className="font-bold text-xs text-brand-navy mb-2">Senior Citizen Day</h3>
                  <p className="text-[10px] text-brand-navy/60 leading-normal font-lora">
                    Dedicated geriatric check-ups focused on cataracts, glaucoma, and age-related macular degeneration (AMD).
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center">
              <div className="bg-brand-navy text-cream rounded-3xl p-6 border border-cream/10 relative overflow-hidden shadow-xl">
                {/* 50% discount ribbon note */}
                <div className="absolute top-3 right-3 bg-brand-teal text-brand-navy text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-widest shadow-md">
                  50% Discount
                </div>
                <span className="text-[8px] tracking-widest uppercase text-brand-teal font-black block mb-3">Campaign Programs</span>
                <h3 className="text-base font-black text-cream mb-4 font-body">Upcoming Campaigns</h3>
                <ul className="space-y-3.5 text-xs text-cream/80 font-lora mb-6">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-teal shrink-0" />
                    School Child Screening Camp
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-teal shrink-0" />
                    Retina Screening Day
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-teal shrink-0" />
                    Senior Citizen Day
                  </li>
                </ul>
                <div className="border-t border-cream/10 pt-4 text-center">
                  <p className="text-[9px] text-brand-teal-bright font-black uppercase tracking-widest leading-none mb-1">Campaign Special</p>
                  <p className="text-[10px] text-cream/60 leading-normal font-lora">
                    Benefit from a 50% discount on initial diagnostic workups and eye test scans during our camp programs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Safe Eye Washing Guidelines */}
        <div className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Left: Steps list */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <span className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 block">Decontamination</span>
                <h2 className="section-text text-brand-navy mb-6">Correct & Safe Eye Washing</h2>
                <p className="text-base text-brand-navy/60 font-lora mb-8">
                  Your eyes are self-cleaning under normal conditions. However, if micro-debris, cosmetics, or mild irritants enter your eye, wash them safely using clean, non-forceful irrigation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {washingSteps.map((step, idx) => (
                  <div key={idx} className="bg-white border border-brand-navy/5 rounded-[2rem] p-6 shadow-sm flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black tracking-widest text-brand-teal">{step.num}</span>
                      <Droplet className="w-4 h-4 text-brand-teal/40" />
                    </div>
                    <h4 className="font-bold text-xs text-brand-navy">{step.title}</h4>
                    <p className="text-[10px] text-brand-navy/60 leading-relaxed font-lora">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Warnings Alert box */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="bg-red-500/5 border-2 border-red-500/20 rounded-[2.5rem] p-8 md:p-10 flex flex-col gap-6 h-full justify-between">
                <div>
                  <div className="flex items-center gap-3 text-red-500 mb-6">
                    <ShieldAlert className="w-7 h-7 shrink-0" />
                    <div>
                      <span className="text-[8px] tracking-widest uppercase font-black block">Safety Precaution</span>
                      <h3 className="text-sm font-black uppercase tracking-wider">Critical Avoidances</h3>
                    </div>
                  </div>
                  
                  <div className="space-y-4 font-lora text-xs text-brand-navy/80 leading-relaxed">
                    <p className="relative pl-5">
                      <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
                      **Do NOT use Rose Water or Milk**: Non-sterile liquids introduce highly infectious bacteria onto compromised corneal surfaces.
                    </p>
                    <p className="relative pl-5">
                      <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
                      **Never Rub Your Eyes**: Rubbing forces hard foreign objects (like metal filings or sand) across your cornea, causing irreversible scratches.
                    </p>
                    <p className="relative pl-5">
                      <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
                      **Remove Contact Lenses First**: Rinsing with contact lenses can trap dust/irritants underneath the lens material, exacerbating abrasions.
                    </p>
                  </div>
                </div>

                <div className="mt-8 bg-red-500/10 rounded-2xl p-4 border border-red-500/10 flex gap-3 items-start">
                  <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] font-black uppercase text-red-600 tracking-wider">When to Seek ER Help:</span>
                    <p className="text-[10px] font-lora text-brand-navy/80 leading-normal mt-1">
                      If you experience severe pain, persistent redness, blurry vision, or suspect a chemical/thermal burn, visit our emergency center immediately.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Shared Footer CTA Banner */}
      <FooterCTA />
    </motion.div>
  );
};

export default Prevention;
