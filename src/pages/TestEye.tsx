import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, ArrowUpRight, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SnellenLine {
  label: string;      // E.g. "20/100"
  letters: string[];  // E.g. ["C", "B"]
  size: number;       // Font size in px
  distValue: string;  // E.g. "100 ft or 30.5 m"
}

const TestEye: React.FC = () => {
  const [gameState, setGameState] = useState<'intro' | 'testing' | 'result'>('intro');
  const [lineIdx, setLineIdx] = useState(0);     // Current Snellen line index
  const [groupStartIdx, setGroupStartIdx] = useState(0); // Start index of letters in current group of 3
  const [userAnswers, setUserAnswers] = useState<string[]>([]); // Current typed letters
  const [lives, setLives] = useState(3);
  const [lensUsedAt, setLensUsedAt] = useState<number | null>(null); // Index of line where lens was first used
  const [isLensActive, setIsLensActive] = useState(false);

  const snellenLines: SnellenLine[] = [
    { label: '20/100', letters: ['C', 'B'], size: 84, distValue: '100 ft. or 30.5 m.' },
    { label: '20/70', letters: ['D', 'L', 'F'], size: 62, distValue: '70 ft. or 21.75 m.' },
    { label: '20/50', letters: ['P', 'T', 'E', 'O'], size: 46, distValue: '50 ft. or 15.24 m.' },
    { label: '20/40', letters: ['F', 'Z', 'B', 'D', 'E'], size: 34, distValue: '40 ft. or 12.19 m.' },
    { label: '20/30', letters: ['O', 'F', 'L', 'C', 'T', 'B'], size: 26, distValue: '30 ft. or 9.14 m.' },
    { label: '20/20', letters: ['T', 'P', 'E', 'O', 'L', 'F', 'D', 'Z'], size: 18, distValue: '20 ft. or 6.10 m.' },
    { label: '20/15', letters: ['L', 'P', 'C', 'T', 'Z', 'B', 'D', 'F', 'E', 'O'], size: 15, distValue: '15.0 ft. or 4.75 m.' },
    { label: '20/10', letters: ['Z', 'O', 'C', 'E', 'F', 'L', 'D', 'P', 'B', 'T'], size: 10, distValue: '10.0 ft. or 3.05 m.' }
  ];

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Get letters in the current active group (up to 3 letters)
  const getCurrentGroupLetters = () => {
    const currentLine = snellenLines[lineIdx];
    return currentLine.letters.slice(groupStartIdx, groupStartIdx + 3);
  };

  const startTest = () => {
    setLineIdx(0);
    setGroupStartIdx(0);
    setUserAnswers([]);
    setLives(3);
    setLensUsedAt(null);
    setIsLensActive(false);
    setGameState('testing');
  };

  const handleLetterSelect = (selectedLetter: string) => {
    const currentGroup = getCurrentGroupLetters();
    const currentInputIdx = userAnswers.length;

    if (currentInputIdx < currentGroup.length) {
      const nextAnswers = [...userAnswers, selectedLetter];
      setUserAnswers(nextAnswers);

      // Check if this was the last input for the current group
      if (nextAnswers.length === currentGroup.length) {
        // Evaluate the whole group
        const allCorrect = currentGroup.every((letter, idx) => nextAnswers[idx] === letter);

        setTimeout(() => {
          if (allCorrect) {
            advanceTest();
          } else {
            const newLives = lives - 1;
            setLives(newLives);
            if (newLives === 0) {
              setGameState('result');
            } else {
              advanceTest();
            }
          }
        }, 300);
      }
    }
  };

  const advanceTest = () => {
    setIsLensActive(false);
    setUserAnswers([]);

    const currentLine = snellenLines[lineIdx];
    const nextGroupIdx = groupStartIdx + 3;

    if (nextGroupIdx < currentLine.letters.length) {
      // Move to next group in same line
      setGroupStartIdx(nextGroupIdx);
    } else {
      // Finished line, advance to next line
      if (lineIdx === snellenLines.length - 1) {
        setGameState('result');
      } else {
        setLineIdx(prev => prev + 1);
        setGroupStartIdx(0);
      }
    }
  };

  const activateLens = () => {
    setIsLensActive(true);
    if (lensUsedAt === null) {
      setLensUsedAt(lineIdx);
    }
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'testing') return;
      const key = e.key.toUpperCase();
      if (alphabet.includes(key)) {
        handleLetterSelect(key);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, lineIdx, groupStartIdx, userAnswers, lives, lensUsedAt]);

  const getUncorrectedAcuity = () => {
    if (lensUsedAt !== null) {
      if (lensUsedAt === 0) return 'Less than 20/100';
      return snellenLines[lensUsedAt - 1].label;
    }
    if (lineIdx === 0 && groupStartIdx === 0) return 'Less than 20/100';
    return snellenLines[lineIdx].label;
  };

  const currentGroup = getCurrentGroupLetters();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1800px] mx-auto px-6 lg:px-16 py-16"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Visual Diagnostics</p>
        <h1 className="section-text text-brand-navy mb-6">Snellen Eye Test (3 Letters Group)</h1>
        <p className="text-base text-brand-navy/60 font-lora">
          Identify groups of up to 3 letters from our Snellen chart. Type on your keyboard or select letters below in sequence.
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-brand-navy text-cream rounded-[3rem] border border-cream/10 p-8 md:p-12 shadow-2xl relative overflow-hidden min-h-[600px] flex flex-col justify-between">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl" />

        <AnimatePresence mode="wait">
          {gameState === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="text-center flex flex-col justify-between h-full flex-grow py-8"
            >
              <div>
                <h2 className="text-2xl font-black mb-6">Instructions for Test</h2>
                <div className="space-y-6 text-sm text-cream/70 font-lora max-w-md mx-auto text-left leading-relaxed">
                  <p>1. Cover one eye with your hand and sit **2 feet** away from your screen.</p>
                  <p>2. Groups of **up to 3 letters** from our Snellen chart will appear side-by-side in the off-white box below.</p>
                  <p>3. Input the letters in order by **typing them on your keyboard** or clicking the A-Z buttons.</p>
                  <p>4. **Corrective Lens Option**: If you cannot see the letters clearly, click the **"Use Lens"** button to clarify and magnify all letters in the current group.</p>
                </div>
              </div>

              <div className="mt-12">
                <button
                  onClick={startTest}
                  className="bg-brand-teal text-brand-navy px-10 py-5 rounded-full text-[10px] tracking-[0.3em] uppercase font-black hover:bg-cream hover:text-brand-navy transition-all shadow-md inline-flex items-center gap-2"
                >
                  Start Chart Test
                </button>
              </div>
            </motion.div>
          )}

          {gameState === 'testing' && (
            <motion.div
              key="testing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-grow flex flex-col justify-between"
            >
              {/* Header Status Bar */}
              <div className="flex justify-between items-center mb-6 relative z-10">
                <div>
                  <span className="text-[9px] tracking-widest text-brand-teal uppercase font-black">
                    Snellen Distance: {snellenLines[lineIdx].distValue}
                  </span>
                  <h3 className="text-lg font-bold">Line: {snellenLines[lineIdx].label}</h3>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div>
                    <span className="text-[10px] text-cream/40 block">Lives Left</span>
                    <div className="flex gap-1 justify-end mt-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2.5 h-2.5 rounded-full ${i < lives ? 'bg-red-500 animate-pulse' : 'bg-cream/10'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Acuity Box Rendering Snellen Letters */}
              <div className="bg-[#fcfaf4] rounded-3xl p-10 flex flex-col items-center justify-center min-h-[240px] shadow-inner relative select-none border border-cream/20 overflow-hidden">
                {/* Paper texture grain */}
                <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                {/* Letters Container side-by-side with Group Lens overlay */}
                <div className="relative flex items-center justify-center gap-8 px-8 py-4">
                  {currentGroup.map((letter, idx) => (
                    <motion.span
                      key={`${lineIdx}-${groupStartIdx}-${idx}-${isLensActive}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: isLensActive ? 1.8 : 1
                      }}
                      style={{
                        fontSize: snellenLines[lineIdx].size,
                        fontFamily: '"Merriweather", "Zilla Slab", serif',
                        fontWeight: 900
                      }}
                      className="text-brand-navy select-none"
                    >
                      {letter}
                    </motion.span>
                  ))}

                  {/* Wide Corrective Lens overlay representation */}
                  {isLensActive && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      className="absolute inset-x-0 h-32 border-4 border-brand-teal/80 bg-brand-teal/5 rounded-full pointer-events-none shadow-[0_0_25px_rgba(0,171,192,0.2)] flex items-center justify-center"
                    >
                      {/* Reflection shine lines */}
                      <div className="absolute top-4 left-1/4 w-16 h-1.5 bg-white/40 rounded-full rotate-[-15deg]" />
                    </motion.div>
                  )}
                </div>

                {/* Input Placeholder Slots */}
                <div className="flex gap-4 mt-6">
                  {currentGroup.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-10 h-12 rounded-xl flex items-center justify-center text-sm font-black border transition-all ${
                        userAnswers.length === idx
                          ? 'border-brand-teal bg-brand-teal/10 text-brand-navy'
                          : idx < userAnswers.length
                          ? 'border-brand-navy bg-brand-navy/5 text-brand-navy'
                          : 'border-brand-navy/10 text-brand-navy/30'
                      }`}
                    >
                      {userAnswers[idx] || '_'}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Corrective Lens & Alphabet Grid */}
              <div className="mt-8 space-y-6 relative z-10">
                <div className="flex justify-between items-center border-b border-cream/10 pb-4">
                  <span className="text-[10px] tracking-wider text-cream/40 font-black uppercase">
                    Select letters in sequence to fill slots
                  </span>
                  
                  {/* Corrective Lens Trigger */}
                  <button
                    type="button"
                    onClick={activateLens}
                    disabled={isLensActive}
                    className={`px-5 py-3 rounded-full text-[10px] tracking-widest uppercase font-black flex items-center gap-2 transition-all ${
                      isLensActive
                        ? 'bg-cream/10 text-cream/40 cursor-not-allowed border border-cream/5'
                        : 'bg-brand-teal text-brand-navy hover:bg-cream hover:text-brand-navy shadow-md'
                    }`}
                  >
                    <Search className="w-3.5 h-3.5" />
                    Use Corrective Lens
                  </button>
                </div>

                {/* Alphabet Keyboard Grid */}
                <div className="grid grid-cols-7 sm:grid-cols-13 gap-2">
                  {alphabet.map((letter) => (
                    <button
                      key={letter}
                      type="button"
                      onClick={() => handleLetterSelect(letter)}
                      className="py-3 rounded-xl text-xs font-bold bg-cream/5 border border-cream/15 text-cream hover:bg-brand-teal hover:text-brand-navy hover:border-brand-teal transition-all flex items-center justify-center"
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {gameState === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center flex flex-col justify-between h-full flex-grow py-8 relative z-10"
            >
              <div className="flex flex-col items-center gap-6">
                <div className="w-16 h-16 bg-brand-teal/20 text-brand-teal border border-brand-teal/30 rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.35em] text-brand-teal uppercase font-black">Test Completed</span>
                  <h2 className="text-4xl font-black mt-2">Uncorrected: {getUncorrectedAcuity()}</h2>
                  <p className="text-xs text-cream/60 tracking-wider font-bold mt-2 uppercase">Your Acuity Rating</p>
                </div>

                <div className="bg-cream/5 border border-cream/10 rounded-2xl p-6 max-w-md w-full space-y-3 text-left">
                  <div className="flex justify-between items-center text-xs border-b border-cream/10 pb-2">
                    <span>Uncorrected Sight:</span>
                    <strong className="text-red-400">{getUncorrectedAcuity()}</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span>Corrected Sight (With Lens):</span>
                    <strong className="text-brand-teal">20/20 (Restored)</strong>
                  </div>
                </div>

                <p className="text-sm text-cream/70 font-lora max-w-md leading-relaxed mt-4">
                  {lensUsedAt !== null ? (
                    <>
                      You required a corrective lens starting at line <strong>{snellenLines[lensUsedAt].label}</strong>. This indicates mild refractive error. A professional checkup will specify your exact glasses number.
                    </>
                  ) : lives < 3 ? (
                    <>
                      You missed some letters on smaller lines. A quick checkup is recommended to confirm your prescription.
                    </>
                  ) : (
                    <>
                      Congratulations! You read all rows without error. Your uncorrected vision is rated at 20/20.
                    </>
                  )}
                </p>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={startTest}
                  className="bg-cream/10 border border-cream/20 hover:bg-cream hover:text-brand-navy text-cream px-6 py-4 rounded-full text-[10px] tracking-widest uppercase font-black transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Retest Eyes
                </button>
                <Link
                  to="/appointment"
                  className="bg-brand-teal text-brand-navy hover:bg-cream px-6 py-4 rounded-full text-[10px] tracking-widest uppercase font-black transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  Book Refraction Test
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TestEye;
