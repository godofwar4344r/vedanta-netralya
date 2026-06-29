import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ShieldAlert, CheckCircle2, Building2 } from 'lucide-react';
import { EditableContainer, EditableText } from '../components/Editable';
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
      <EditableContainer id="contact-hero">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 pt-20 pb-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">
              <EditableText id="contact-eyebrow">Reach Out</EditableText>
            </p>
            <h1 className="section-text text-brand-navy mb-6">
              <EditableText id="contact-title">Contact & Support Desk</EditableText>
            </h1>
            <p className="text-base text-brand-navy/60 font-lora">
              <EditableText id="contact-description">Reach our administrative or medical coordinators for immediate queries, appointment scheduling, medical records, or corporate panel questions.</EditableText>
            </p>
          </div>
        </div>
      </EditableContainer>

      {/* Centres & Contact Form */}
      <EditableContainer id="contact-centres-form">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Info Column */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              {/* Haldwani Main Centre */}
              <div className="bg-brand-navy text-cream rounded-[2.5rem] p-10 shadow-xl border border-cream/10">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="w-4 h-4 text-brand-teal" />
                  <span className="text-[10px] text-brand-teal tracking-widest font-black uppercase font-body">
                    <EditableText id="contact-haldwani-tag">Main Centre</EditableText>
                  </span>
                </div>
                <h2 className="text-xl font-black mb-6 font-body">
                  <EditableText id="contact-haldwani-title">Haldwani Centre</EditableText>
                </h2>
                <div className="space-y-6 text-sm font-lora">
                  <div className="flex gap-4">
                    <MapPin className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <div>
                      <p className="text-cream/80">
                        <EditableText id="contact-haldwani-address">Nawabi Rd, near DPS Junior School, Subhash Nagar, Haldwani, Uttarakhand 263139</EditableText>
                      </p>
                      <p className="text-cream/50 text-xs mt-1 italic">
                        <EditableText id="contact-haldwani-address-note">Also: Nawabi Road, Near Mahila Degree College, Haldwani — Daily Retina Consultation</EditableText>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Phone className="w-5 h-5 text-brand-teal shrink-0" />
                    <div className="text-cream/80">
                      <p><EditableText id="contact-haldwani-phone-1">05946-223616</EditableText></p>
                      <p><EditableText id="contact-haldwani-phone-2">+91-9068561971</EditableText></p>
                      <p><EditableText id="contact-haldwani-phone-3">05946-335360</EditableText></p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Mail className="w-5 h-5 text-brand-teal shrink-0" />
                    <div className="text-cream/80">
                      <p><EditableText id="contact-haldwani-email-1">admin@vedantanetralya.com</EditableText></p>
                      <p><EditableText id="contact-haldwani-email-2">info@vedantanetralya.com</EditableText></p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Clock className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold font-body text-cream">
                        <EditableText id="contact-haldwani-hours-label">Consultation Hours:</EditableText>
                      </p>
                      <p className="text-xs text-cream/60 mt-1">
                        <EditableText id="contact-haldwani-hours-week">Mon — Sat: 9:00 AM — 7:00 PM</EditableText>
                      </p>
                      <p className="text-xs text-cream/60">
                        <EditableText id="contact-haldwani-hours-sun">Sun: 9:00 AM — 2:00 PM</EditableText>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-cream/10 mt-6">
                  <a
                    href="https://www.google.com/maps/place/Vedanta+Netralya+Haldwani/@29.2266568,79.5255779,642m/data=!3m1!1e3!4m10!1m2!2m1!1svedanta+netralya+haldwani!3m6!1s0x39a09b1779d2b223:0xccc4371f2e361808!8m2!3d29.2266493!4d79.5281364!15sChl2ZWRhbnRhIG5ldHJhbHlhIGhhbGR3YW5pkgEPZXllX2NhcmVfY2VudGVy4AEA!16s%2Fg%2F11n422c3lg!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noreferrer"
                    className="group w-full bg-cream/10 text-cream px-6 py-3.5 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all flex items-center justify-between hover:bg-cream hover:text-brand-navy"
                  >
                    <span>Get Directions</span>
                    <MapPin className="w-4 h-4 text-brand-teal shrink-0" />
                  </a>
                </div>
              </div>


            </div>

            {/* Contact Form & Emergency Column */}
            <div className="lg:col-span-7 flex flex-col gap-8 self-start">
              {/* Contact Form */}
              <div className="bg-brand-navy text-cream rounded-[2.5rem] p-10 md:p-12 shadow-xl border border-cream/10 relative overflow-hidden w-full">
                <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl" />

                <h2 className="text-2xl font-black mb-6 relative z-10 font-body">
                  <EditableText id="contact-form-title">Send Online Message</EditableText>
                </h2>

                {submitted ? (
                  <div className="text-center py-12 flex flex-col items-center gap-6 relative z-10">
                    <div className="w-16 h-16 bg-brand-teal/20 text-brand-teal rounded-full flex items-center justify-center border border-brand-teal/30">
                      <CheckCircle2 className="w-8 h-8 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 font-body">
                        <EditableText id="contact-submitted-title">Message Sent Successfully!</EditableText>
                      </h3>
                      <p className="text-xs text-cream/70 font-lora max-w-sm mx-auto leading-relaxed">
                        <EditableText id="contact-submitted-desc">Thank you for writing. Our desk coordinators will review your submission and contact you within 2-4 business hours.</EditableText>
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

              {/* Emergency Alert Box */}
              <div className="bg-red-950/45 border border-red-500/20 text-cream rounded-[2.5rem] p-10 flex gap-4 items-start shadow-lg w-full">
                <ShieldAlert className="w-8 h-8 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-bold mb-1 font-body">
                    <EditableText id="contact-emergency-title">Emergency Ophthalmic Care</EditableText>
                  </h3>
                  <p className="text-xs text-cream/70 leading-relaxed font-lora mb-4">
                    <EditableText id="contact-emergency-desc">If you have experienced sudden trauma, severe chemical burns, or abrupt loss of vision, please head directly to our Haldwani centre at Nawabi Rd, Subhash Nagar.</EditableText>
                  </p>
                  <p className="text-sm font-black text-red-400">
                    <EditableText id="contact-emergency-phone">Emergency: +91-9068561971</EditableText>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </EditableContainer>

      {/* Google Maps Embed */}
      <EditableContainer id="contact-map">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 pb-20">
          <div className="text-center mb-8">
            <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-3 font-body">
              <EditableText id="contact-map-eyebrow">Find Us</EditableText>
            </p>
            <h2 className="section-text text-brand-navy font-body">
              <EditableText id="contact-map-title">Haldwani Location</EditableText>
            </h2>
          </div>
          <div className="rounded-[2.5rem] overflow-hidden border border-brand-navy/10 shadow-xl">
            <iframe
              title="Vedanta Netralya - Haldwani Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3480.9996614136424!2d79.52594777610022!3d29.2266539753177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a09b1779d2b223%3A0xccc4371f2e361808!2sVedanta%20Netralya%20Haldwani!5e0!3m2!1sen!2sin!4v1717670000000!5m2!1sen!2sin"
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
            <EditableText id="contact-map-caption">Nawabi Rd, near DPS Junior School, Subhash Nagar, Haldwani, Uttarakhand 263139</EditableText>
          </p>
        </div>
      </EditableContainer>

      {/* Footer CTA */}
      <FooterCTA />
    </motion.div>
  );
};

export default Contact;
