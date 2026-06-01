import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ShieldAlert, CheckCircle2, Building2, CalendarDays } from 'lucide-react';
import EditableSection from '../components/EditableSection';
import FooterCTA from '../components/FooterCTA';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', msg: '' });

  const handleSub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      alert("Name and Phone Number are required.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-transparent"
    >
      {/* Hero */}
      <EditableSection id="contact-hero">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 pt-20 pb-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Reach Out</p>
            <h1 className="section-text text-brand-navy mb-6">Contact & Support Desk</h1>
            <p className="text-base text-brand-navy/60 font-lora">
              Reach our administrative or medical coordinators for immediate queries, appointment scheduling, medical records, or corporate panel questions.
            </p>
          </div>
        </div>
      </EditableSection>

      {/* Centres & Contact Form */}
      <EditableSection id="contact-centres-form">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Info Column */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              {/* Haldwani Main Centre */}
              <div className="bg-brand-navy text-cream rounded-[2.5rem] p-10 shadow-xl border border-cream/10">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="w-4 h-4 text-brand-teal" />
                  <span className="text-[10px] text-brand-teal tracking-widest font-black uppercase font-body">Main Centre</span>
                </div>
                <h2 className="text-xl font-black mb-6 font-body">Haldwani Centre</h2>
                <div className="space-y-6 text-sm font-lora">
                  <div className="flex gap-4">
                    <MapPin className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <div>
                      <p className="text-cream/80">Canal Rd, Tikonia Circle, Haldwani, Uttarakhand 263139</p>
                      <p className="text-cream/50 text-xs mt-1 italic">Also: Nawabi Road, Near Mahila Degree College, Haldwani — Daily Retina Consultation</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Phone className="w-5 h-5 text-brand-teal shrink-0" />
                    <div className="text-cream/80">
                      <p>05946-223616</p>
                      <p>+91-9068561971</p>
                      <p>05946-335360</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Mail className="w-5 h-5 text-brand-teal shrink-0" />
                    <div className="text-cream/80">
                      <p>admin@vedantanetralya.com</p>
                      <p>info@vedantanetralya.com</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Clock className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold font-body text-cream">Consultation Hours:</p>
                      <p className="text-xs text-cream/60 mt-1">Mon — Sat: 9:00 AM — 7:00 PM</p>
                      <p className="text-xs text-cream/60">Sun: 9:00 AM — 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kichha Centre */}
              <div className="bg-brand-navy text-cream rounded-[2.5rem] p-10 shadow-xl border border-cream/10">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="w-4 h-4 text-brand-teal" />
                  <span className="text-[10px] text-brand-teal tracking-widest font-black uppercase font-body">Branch Centre</span>
                </div>
                <h2 className="text-xl font-black mb-6 font-body">Kichha Centre</h2>
                <div className="space-y-6 text-sm font-lora">
                  <div className="flex gap-4">
                    <MapPin className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <p className="text-cream/80">Hotel NeelKamal, Bareilly Road, Kichha</p>
                  </div>
                  <div className="flex gap-4">
                    <Phone className="w-5 h-5 text-brand-teal shrink-0" />
                    <p className="text-cream/80">7900777709</p>
                  </div>
                  <div className="flex gap-4">
                    <Clock className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold font-body text-cream">Consultation Hours:</p>
                      <p className="text-xs text-cream/60 mt-1">Mon — Sat: 9:00 AM — 6:00 PM</p>
                      <p className="text-xs text-cream/60">Sun: 9:00 AM — 1:00 PM</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CalendarDays className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold font-body text-brand-teal text-xs">Dr. Sameer Varma</p>
                      <p className="text-xs text-cream/60 mt-1">Available at Kichha centre for OPD and OT every Friday</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Alert Box */}
              <div className="bg-red-950/45 border border-red-500/20 text-cream rounded-[2.5rem] p-10 flex gap-4 items-start shadow-lg">
                <ShieldAlert className="w-8 h-8 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-bold mb-1 font-body">Emergency Ophthalmic Care</h3>
                  <p className="text-xs text-cream/70 leading-relaxed font-lora mb-4">
                    If you have experienced sudden trauma, severe chemical burns, or abrupt loss of vision, please head directly to our Haldwani centre at Canal Rd, Tikonia Circle.
                  </p>
                  <p className="text-sm font-black text-red-400">Emergency: +91-9068561971</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 bg-brand-navy text-cream rounded-[2.5rem] p-10 md:p-12 shadow-xl border border-cream/10 relative overflow-hidden self-start">
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl" />

              <h2 className="text-2xl font-black mb-6 relative z-10 font-body">Send Online Message</h2>

              {submitted ? (
                <div className="text-center py-12 flex flex-col items-center gap-6 relative z-10">
                  <div className="w-16 h-16 bg-brand-teal/20 text-brand-teal rounded-full flex items-center justify-center border border-brand-teal/30">
                    <CheckCircle2 className="w-8 h-8 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 font-body">Message Sent Successfully!</h3>
                    <p className="text-xs text-cream/70 font-lora max-w-sm mx-auto leading-relaxed">
                      Thank you for writing. Our desk coordinators will review your submission and contact you within 2-4 business hours.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSub} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] tracking-widest uppercase font-black text-brand-teal">Full Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="bg-cream/5 border border-cream/15 rounded-2xl px-5 py-4 text-sm text-cream focus:outline-none focus:border-brand-teal"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] tracking-widest uppercase font-black text-brand-teal">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="bg-cream/5 border border-cream/15 rounded-2xl px-5 py-4 text-sm text-cream focus:outline-none focus:border-brand-teal"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-widest uppercase font-black text-brand-teal">Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. name@example.com"
                      className="bg-cream/5 border border-cream/15 rounded-2xl px-5 py-4 text-sm text-cream focus:outline-none focus:border-brand-teal"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-widest uppercase font-black text-brand-teal">Query / Message</label>
                    <textarea
                      required
                      rows={4}
                      value={form.msg}
                      onChange={(e) => setForm({ ...form, msg: e.target.value })}
                      placeholder="How can we assist you?"
                      className="bg-cream/5 border border-cream/15 rounded-2xl px-5 py-4 text-sm text-cream focus:outline-none focus:border-brand-teal font-body"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-brand-teal text-brand-navy px-8 py-4 rounded-full text-[10px] tracking-widest uppercase font-black hover:bg-cream hover:text-brand-navy transition-all shadow-md"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </EditableSection>

      {/* Google Maps Embed */}
      <EditableSection id="contact-map">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 pb-20">
          <div className="text-center mb-8">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-3 font-body">Find Us</p>
            <h2 className="section-text text-brand-navy font-body">Haldwani Location</h2>
          </div>
          <div className="rounded-[2.5rem] overflow-hidden border border-brand-navy/10 shadow-xl">
            <iframe
              title="Vedanta Netralya - Haldwani Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3488.3!2d79.5215!3d29.2183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sVedanta+Netralya%2C+Canal+Rd%2C+Tikonia+Circle%2C+Haldwani%2C+Uttarakhand+263139!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
          <p className="text-center text-xs text-brand-navy/40 font-lora mt-4 italic">
            Canal Rd, Tikonia Circle, Haldwani, Uttarakhand 263139
          </p>
        </div>
      </EditableSection>

      {/* Footer CTA */}
      <FooterCTA />
    </motion.div>
  );
};

export default Contact;
