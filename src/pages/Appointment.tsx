import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight } from 'lucide-react';

const Appointment: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    specialty: '',
    doctor: '',
    date: '',
    timeSlot: '',
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  const doctors = [
    { name: 'Dr. Sameer Varma', specialty: 'Cataract & Glaucoma' },
    { name: 'Dr. Kanhaiya Mittal', specialty: 'Retina & VR Surgery' },
    { name: 'Dr. R.J.K. Singh', specialty: 'Comprehensive Ophthalmology' }
  ];

  const timeSlots = [
    '09:30 AM', '10:30 AM', '11:30 AM',
    '02:30 PM', '03:30 PM', '04:30 PM', '05:30 PM'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (step === 1 && (!formData.specialty || !formData.doctor)) {
      alert("Please select a Specialty and Doctor to proceed.");
      return;
    }
    if (step === 2 && (!formData.date || !formData.timeSlot)) {
      alert("Please select a Preferred Date and Time Slot to proceed.");
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please fill in your Name and Contact Phone Number.");
      return;
    }
    setStep(4);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1800px] mx-auto px-6 lg:px-16 py-20"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Consultation Booking</p>
        <h1 className="section-text text-brand-navy mb-6">Schedule Your Visit</h1>
        <p className="text-base text-brand-navy/60 font-lora">
          Book your slot with our board-certified ophthalmic specialists in just a few quick steps.
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-brand-navy text-cream rounded-[3.5rem] border border-cream/10 p-10 md:p-16 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl" />
        
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-12 relative z-10">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= num ? 'bg-brand-teal text-brand-navy' : 'bg-cream/10 text-cream/40'
              }`}>
                {num}
              </div>
              <span className={`text-[10px] tracking-wider uppercase font-black ${
                step >= num ? 'text-cream' : 'text-cream/40'
              }`}>
                {num === 1 ? 'Specialty' : num === 2 ? 'Date & Time' : 'Patient Info'}
              </span>
              {num < 3 && <ChevronRight className="w-4 h-4 text-cream/20" />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="relative z-10">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-widest uppercase font-black text-brand-teal">Select Specialty</label>
                  <select
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleInputChange}
                    className="bg-cream/5 border border-cream/15 rounded-2xl px-5 py-4 text-sm text-cream focus:outline-none focus:border-brand-teal"
                  >
                    <option value="" className="text-brand-navy">Choose Specialty...</option>
                    <option value="Cataract" className="text-brand-navy">Robotic FLACS Cataract</option>
                    <option value="LASIK" className="text-brand-navy">Bladeless Femto-LASIK / SMILE</option>
                    <option value="Pediatric" className="text-brand-navy">Pediatric Ophthalmology & Squint</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-widest uppercase font-black text-brand-teal">Select Doctor</label>
                  <select
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleInputChange}
                    className="bg-cream/5 border border-cream/15 rounded-2xl px-5 py-4 text-sm text-cream focus:outline-none focus:border-brand-teal"
                  >
                    <option value="" className="text-brand-navy">Choose Surgeon...</option>
                    {doctors
                      .filter(d => !formData.specialty || d.specialty === formData.specialty)
                      .map((d, i) => (
                        <option key={i} value={d.name} className="text-brand-navy">{d.name}</option>
                      ))
                    }
                  </select>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-brand-teal text-brand-navy px-8 py-4 rounded-full text-[10px] tracking-widest uppercase font-black hover:bg-cream hover:text-brand-navy transition-all flex items-center gap-2"
                  >
                    Select Slot <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-widest uppercase font-black text-brand-teal">Select Preferred Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="bg-cream/5 border border-cream/15 rounded-2xl px-5 py-4 text-sm text-cream focus:outline-none focus:border-brand-teal"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-widest uppercase font-black text-brand-teal font-bold mb-2">Available Time Slots</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {timeSlots.map((slot, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, timeSlot: slot }))}
                        className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                          formData.timeSlot === slot
                            ? 'bg-brand-teal text-brand-navy border-brand-teal'
                            : 'bg-cream/5 text-cream/70 border-cream/15 hover:border-brand-teal/55'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="border border-cream/20 text-cream px-8 py-4 rounded-full text-[10px] tracking-widest uppercase font-black hover:bg-cream hover:text-brand-navy transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-brand-teal text-brand-navy px-8 py-4 rounded-full text-[10px] tracking-widest uppercase font-black hover:bg-cream hover:text-brand-navy transition-all flex items-center gap-2"
                  >
                    Enter Details <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-widest uppercase font-black text-brand-teal">Patient Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className="bg-cream/5 border border-cream/15 rounded-2xl px-5 py-4 text-sm text-cream focus:outline-none focus:border-brand-teal"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-widest uppercase font-black text-brand-teal">Mobile Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 99999 99999"
                      className="bg-cream/5 border border-cream/15 rounded-2xl px-5 py-4 text-sm text-cream focus:outline-none focus:border-brand-teal"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-widest uppercase font-black text-brand-teal">Email Address (Optional)</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. care@example.com"
                    className="bg-cream/5 border border-cream/15 rounded-2xl px-5 py-4 text-sm text-cream focus:outline-none focus:border-brand-teal"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-widest uppercase font-black text-brand-teal">Brief Medical Notes (Optional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="List symptoms or previous procedures..."
                    className="bg-cream/5 border border-cream/15 rounded-2xl px-5 py-4 text-sm text-cream focus:outline-none focus:border-brand-teal font-body"
                  />
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="border border-cream/20 text-cream px-8 py-4 rounded-full text-[10px] tracking-widest uppercase font-black hover:bg-cream hover:text-brand-navy transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-brand-teal text-brand-navy px-8 py-4 rounded-full text-[10px] tracking-widest uppercase font-black hover:bg-cream hover:text-brand-navy transition-all shadow-md"
                  >
                    Confirm Booking
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 flex flex-col items-center gap-6"
              >
                <div className="w-20 h-20 bg-brand-teal/20 text-brand-teal border border-brand-teal/30 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-10 h-10 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-3xl font-black mb-2">Slot Pre-Booked!</h2>
                  <p className="text-sm text-cream/70 font-lora leading-relaxed max-w-md mx-auto">
                    Thank you, <strong>{formData.name}</strong>. Your consultation with <strong>{formData.doctor}</strong> on <strong>{formData.date} ({formData.timeSlot})</strong> has been logged.
                  </p>
                  <p className="text-[10px] tracking-widest text-brand-teal font-black uppercase mt-4">
                    Our team will call you at {formData.phone} shortly to confirm details.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setFormData({
                      specialty: '',
                      doctor: '',
                      date: '',
                      timeSlot: '',
                      name: '',
                      phone: '',
                      email: '',
                      notes: ''
                    });
                  }}
                  className="bg-cream/10 border border-cream/25 hover:bg-cream hover:text-brand-navy text-cream px-8 py-4 rounded-full text-[10px] tracking-widest uppercase font-black transition-all mt-6"
                >
                  Book Another Slot
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </motion.div>
  );
};

export default Appointment;
