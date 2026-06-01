import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

const FAQ_DATABASE = [
  {
    keywords: ['hi', 'hello', 'hey', 'greetings'],
    answer: "Hello! Welcome to Vedanta Netralya. How can I assist you with your eye care needs today?"
  },
  {
    keywords: ['cataract', 'lens', 'flacs', 'cloudy', 'mics'],
    answer: "We specialize in advanced Robotic FLACS (Femtoseconds Laser-Assisted Cataract Surgery) with premium foldable IOL implants (multifocal, trifocal, toric). Recovery is painless and takes under 24 hours. Would you like to schedule a cataract screening?"
  },
  {
    keywords: ['lasik', 'smile', 'specs', 'glasses', 'refractive', 'contoura'],
    answer: "We offer advanced Bladeless Femto-LASIK, Contoura Vision, and SMILE procedures for permanent freedom from glasses. Most patients achieve 20/20 vision. Would you like to book a suitability check?"
  },
  {
    keywords: ['miosis', 'mydriasis', 'pupil', 'constriction', 'dilation'],
    answer: "Miosis is pupil constriction (making the pupil smaller to sharpen focus), while mydriasis is pupil dilation (making it larger, which can cause halos and glare). You can experience both in our Sight Simulator!"
  },
  {
    keywords: ['night blindness', 'nyctalopia', 'dark', 'night vision'],
    answer: "Night Blindness, or Nyctalopia, makes it difficult to see in relatively low light. Our specialists can diagnose and treat underlying causes like refractive errors, cataracts, or vitamin deficiencies. Try simulating it in our Sight Simulator!"
  },
  {
    keywords: ['appointment', 'book', 'consultation', 'schedule', 'doctor slot', 'fee'],
    answer: "You can book your appointment instantly via our online page at `/appointment`, or by calling our helpdesk at 05946-223616 or +91 9068561971. Consultation hours are Monday to Saturday, 9:00 AM to 7:00 PM, and Sunday, 9:00 AM to 2:00 PM."
  },
  {
    keywords: ['doctor', 'surgeon', 'sameer', 'singh', 'mittal', 'tyagi', 'varma', 'davinder', 'kanhaiya'],
    answer: "Our senior surgeons include Dr. Sameer Varma (Founder, Cataract & Glaucoma Specialist), Dr. R.J.K. Singh (Senior Consultant with 50+ years experience, Sitapur Eye Hospital Fellow), Dr. Kanhaiya Mittal (Chief Retina Consultant, MD AIIMS New Delhi), and clinical panel consultant Dr. Davinder Tyagi."
  },
  {
    keywords: ['location', 'address', 'branch', 'centres', 'haldwani', 'kichha', 'where'],
    answer: "Our main superspecialty center is located at Canal Road, Tikonia Circle, Haldwani, Uttarakhand. We also operate a specialist clinic on Bareilly Road, Kichha. Visit `/centres` for maps and full directions."
  },
  {
    keywords: ['cost', 'price', 'insurance', 'tpa', 'cashless', 'panel'],
    answer: "We offer transparent pricing and support all major TPA insurance networks for cashless hospitalization. We are also CGHS/ECHS panel friendly. Contact our billing desk at the hospital for details."
  },
  {
    keywords: ['test', 'check eye', 'digital test', 'snellen', 'tumbling', 'acuity', 'game'],
    answer: "You can test your visual acuity digitally on our brand new interactive testing page! Head over to `/test-eye` to take a 2-minute Tumbling E test right now."
  },
  {
    keywords: ['simulator', 'simulate', 'how cataracts look', 'miosis', 'mydriasis', 'night blindness', 'blurry', 'halos'],
    answer: "Curious how different eye conditions affect sight? Try our interactive first-person sight simulator at the bottom of the Home page (`/`), or check the bottom of our Services page to experience Cataract, Myopia, Miosis, Mydriasis, and Night Blindness filters firsthand!"
  }
];

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: "Hello! I am your Vedanta Netralya voice assistant. Ask me anything about cataract, LASIK, appointments, or our doctors.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const handleOpenBot = () => setIsOpen(true);
    window.addEventListener('open-chatbot', handleOpenBot);
    return () => window.removeEventListener('open-chatbot', handleOpenBot);
  }, []);
  const [isMuted, setIsMuted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Speech Recognition setup
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Scroll to bottom on new message
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Initialize Web Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-IN';

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      rec.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        if (text.trim()) {
          handleSendMessage(text);
        }
      };

      recognitionRef.current = rec;
    }
  }, []);

  const speakText = (text: string) => {
    if (isMuted) return;
    window.speechSynthesis.cancel(); // stop any current speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 1.0;
    
    // Choose a friendly female voice if available
    const voices = window.speechSynthesis.getVoices();
    const desiredVoice = voices.find(v => v.lang.includes('en') && (v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('natural')));
    if (desiredVoice) {
      utterance.voice = desiredVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  };

  const getBotResponse = (query: string): string => {
    const cleanQuery = query.toLowerCase().trim();
    
    for (const item of FAQ_DATABASE) {
      if (item.keywords.some(keyword => cleanQuery.includes(keyword))) {
        return item.answer;
      }
    }
    
    return "I'm the Vedanta Netralya assistant. I can guide you on LASIK, Cataract treatments, Pediatric eye care, doctor profiles, and booking details. Try asking: 'How do I book an appointment?' or 'What is FLACS Cataract?'";
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = {
      sender: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Simulate bot thinking and reply
    setTimeout(() => {
      const responseText = getBotResponse(text);
      const botMsg: Message = {
        sender: 'bot',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      speakText(responseText);
    }, 600);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Voice recognition is not supported in this browser. Please try Google Chrome or Microsoft Edge.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      window.speechSynthesis.cancel(); // mute any reading before listening
      recognitionRef.current.start();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <>
      {/* Floating Chat Bubble Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-[999] bg-brand-navy border border-brand-teal/40 text-cream p-5 rounded-full shadow-2xl hover:bg-brand-teal hover:text-brand-navy hover:shadow-brand-teal/30 transition-all flex items-center justify-center glow-teal"
        aria-label="Open AI Assistant"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Window Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-28 right-8 z-[999] w-[90vw] sm:w-[400px] h-[550px] max-h-[calc(100vh-140px)] bg-brand-navy-deep border border-brand-teal/20 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col glass-dark glow-navy"
          >
            {/* Header */}
            <div className="bg-brand-navy p-6 border-b border-cream/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-brand-teal rounded-full animate-pulse" />
                <div>
                  <h3 className="font-merriweather text-sm font-bold text-cream tracking-wider">AI Vision Assistant</h3>
                  <p className="text-[9px] tracking-widest text-brand-teal uppercase font-black">Vedanta Netralya</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Mute Toggle */}
                <button
                  onClick={toggleMute}
                  className="p-2 hover:bg-cream/15 text-cream/70 hover:text-cream rounded-full transition-colors"
                  title={isMuted ? 'Unmute voice replies' : 'Mute voice replies'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-cream/15 text-cream/70 hover:text-cream rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-3xl p-4 text-sm font-lora leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-brand-teal text-brand-navy rounded-br-none'
                        : 'bg-brand-navy text-cream/90 border border-cream/10 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Sound Wave Dictation Visualizer */}
            {isListening && (
              <div className="px-6 py-2 bg-brand-teal/10 flex items-center justify-between border-t border-cream/5">
                <span className="text-[10px] tracking-wider text-brand-teal font-black uppercase">Listening to voice...</span>
                <div className="flex items-center gap-1">
                  <div className="typing-dot bg-brand-teal w-1.5 h-1.5" />
                  <div className="typing-dot bg-brand-teal w-1.5 h-1.5" style={{ animationDelay: '0.15s' }} />
                  <div className="typing-dot bg-brand-teal w-1.5 h-1.5" style={{ animationDelay: '0.3s' }} />
                </div>
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-4 bg-brand-navy border-t border-cream/10 flex items-center gap-2"
            >
              <button
                type="button"
                onClick={toggleListening}
                className={`p-3 rounded-full flex items-center justify-center transition-all ${
                  isListening
                    ? 'bg-red-500 text-cream animate-pulse'
                    : 'bg-cream/10 hover:bg-cream/20 text-brand-teal hover:text-brand-teal-bright'
                }`}
                title="Voice Query"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about treatments, pricing, or booking..."
                className="flex-1 bg-cream/5 border border-cream/10 rounded-full px-5 py-3 text-sm text-cream placeholder-cream/40 focus:outline-none focus:border-brand-teal/50"
              />

              <button
                type="submit"
                className="bg-brand-teal hover:bg-brand-teal-bright text-brand-navy p-3 rounded-full flex items-center justify-center transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
