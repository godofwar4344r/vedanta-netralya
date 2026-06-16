import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { EditableContainer, EditableText } from './Editable';
import logoImg from '../assets/logo.png';

const Footer: React.FC = () => {
  return (
    <EditableContainer id="footer-section" className="bg-brand-navy-deep text-cream border-t border-cream/10 relative overflow-hidden">
      {/* Decorative ambient lights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-teal/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-brand-teal/5 blur-[80px] pointer-events-none" />

      {/* Main Footer Links & Info Grid */}
      <div className="max-w-[1800px] mx-auto px-6 lg:px-16 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-cream/10">
          
          {/* Column 1: Brand details (col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <Link to="/" className="inline-flex items-center self-start bg-white px-4 py-2 rounded-2xl shadow-md border border-white/20 hover:scale-[1.02] transition-transform duration-300">
              <img src={logoImg} alt="Vedanta Netralya" className="h-10 md:h-12 object-contain" />
            </Link>
            
            <p className="text-cream/75 text-sm font-lora leading-relaxed max-w-sm">
              <EditableText id="footer-brand-desc">
                Vedanta Netralya is Uttarakhand's leading eye care hospital group, delivering advanced diagnostic, surgical, and therapeutic services with global standards, state-of-the-art tech, and dedicated precision.
              </EditableText>
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { icon: <Facebook className="w-4 h-4" />, url: "https://facebook.com", label: "Facebook" },
                { icon: <Twitter className="w-4 h-4" />, url: "https://twitter.com", label: "Twitter" },
                { icon: <Instagram className="w-4 h-4" />, url: "https://instagram.com", label: "Instagram" },
                { icon: <Linkedin className="w-4 h-4" />, url: "https://linkedin.com", label: "LinkedIn" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-cream/5 border border-cream/10 flex items-center justify-center text-cream/70 hover:text-brand-teal-bright hover:border-brand-teal-bright hover:bg-brand-teal/10 transition-all duration-300 hover:-translate-y-1"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Specialties & Services (col-span-2) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h3 className="text-[10px] tracking-[0.25em] font-black uppercase text-brand-teal font-body">
              <EditableText id="footer-services-title">Eye Specialties</EditableText>
            </h3>
            <div className="flex flex-col gap-3 font-merriweather text-[10px] tracking-wider uppercase font-bold text-cream/70">
              <Link to="/cataract" className="hover:text-brand-teal-bright hover:translate-x-1 transition-all duration-300 flex items-center gap-1.5">
                Cataract Surgery <ArrowUpRight className="w-3 h-3 opacity-0 hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/refractive-surgery" className="hover:text-brand-teal-bright hover:translate-x-1 transition-all duration-300 flex items-center gap-1.5">
                Refractive Surgery <ArrowUpRight className="w-3 h-3 opacity-0 hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/retina-services" className="hover:text-brand-teal-bright hover:translate-x-1 transition-all duration-300 flex items-center gap-1.5">
                Retina Services <ArrowUpRight className="w-3 h-3 opacity-0 hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/glaucoma-services" className="hover:text-brand-teal-bright hover:translate-x-1 transition-all duration-300 flex items-center gap-1.5">
                Glaucoma Services <ArrowUpRight className="w-3 h-3 opacity-0 hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/oculoplasty-services" className="hover:text-brand-teal-bright hover:translate-x-1 transition-all duration-300 flex items-center gap-1.5">
                Oculoplasty <ArrowUpRight className="w-3 h-3 opacity-0 hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/paediatric-ophthalmology" className="hover:text-brand-teal-bright hover:translate-x-1 transition-all duration-300 flex items-center gap-1.5">
                Paediatric Care <ArrowUpRight className="w-3 h-3 opacity-0 hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/vr-surgery" className="hover:text-brand-teal-bright hover:translate-x-1 transition-all duration-300 flex items-center gap-1.5">
                VR Surgery <ArrowUpRight className="w-3 h-3 opacity-0 hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/optical-services" className="hover:text-brand-teal-bright hover:translate-x-1 transition-all duration-300 flex items-center gap-1.5">
                Optical Services <ArrowUpRight className="w-3 h-3 opacity-0 hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>

          {/* Column 3: Quick Navigation (col-span-2) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h3 className="text-[10px] tracking-[0.25em] font-black uppercase text-brand-teal font-body">
              <EditableText id="footer-nav-title">Quick Links</EditableText>
            </h3>
            <div className="flex flex-col gap-3 font-merriweather text-[10px] tracking-wider uppercase font-bold text-cream/70">
              <Link to="/about" className="hover:text-brand-teal-bright hover:translate-x-1 transition-all duration-300">About Hospital</Link>
              <Link to="/facilities" className="hover:text-brand-teal-bright hover:translate-x-1 transition-all duration-300">Facilities</Link>
              <Link to="/doctors" className="hover:text-brand-teal-bright hover:translate-x-1 transition-all duration-300">Our Doctors</Link>
              <Link to="/centres" className="hover:text-brand-teal-bright hover:translate-x-1 transition-all duration-300">Our Centres</Link>
              <Link to="/gallery" className="hover:text-brand-teal-bright hover:translate-x-1 transition-all duration-300">Media Gallery</Link>
              <Link to="/test-eye" className="hover:text-brand-teal-bright hover:translate-x-1 transition-all duration-300 font-extrabold text-brand-teal">Digital Eye Test</Link>
              <Link to="/contact" className="hover:text-brand-teal-bright hover:translate-x-1 transition-all duration-300">Contact Us</Link>
              <Link to="/appointment" className="hover:text-brand-teal-bright hover:translate-x-1 transition-all duration-300">Book Appointment</Link>
            </div>
          </div>

          {/* Column 4: Health Blog (col-span-2) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h3 className="text-[10px] tracking-[0.25em] font-black uppercase text-brand-teal font-body">
              <EditableText id="footer-blog-title">Health Blog</EditableText>
            </h3>
            <div className="flex flex-col gap-4 text-xs font-lora">
              {[
                {
                  title: "femto-cataract: robotic precision",
                  date: "Jun 12, 2026",
                  link: "/cataract"
                },
                {
                  title: "living with glaucoma: key tips",
                  date: "May 28, 2026",
                  link: "/glaucoma-services"
                },
                {
                  title: "implantable lenses (icl) guide",
                  date: "May 15, 2026",
                  link: "/refractive-surgery"
                }
              ].map((post, idx) => (
                <Link 
                  key={idx} 
                  to={post.link}
                  className="group flex flex-col gap-1 text-cream/70 hover:text-brand-teal-bright transition-colors duration-300"
                >
                  <span className="font-merriweather text-[10px] tracking-wider uppercase font-bold text-cream/90 group-hover:text-brand-teal-bright transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </span>
                  <span className="text-[8px] tracking-widest text-cream/40 uppercase font-bold font-body">
                    {post.date}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 5: Contact details (col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h3 className="text-[10px] tracking-[0.25em] font-black uppercase text-brand-teal font-body">
              <EditableText id="footer-contact-title">Contact & Help</EditableText>
            </h3>
            <div className="flex flex-col gap-5 text-sm font-lora text-cream/80">
              
              {/* Address */}
              <div className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 text-brand-teal shrink-0 mt-1" />
                <div>
                  <h4 className="font-body text-xs font-black uppercase text-cream tracking-wider mb-1">Haldwani Centre (Main)</h4>
                  <p className="text-xs leading-relaxed text-cream/75">
                    <EditableText id="footer-haldwani-address">Canal Rd, Tikonia Circle, Haldwani, Uttarakhand 263139</EditableText>
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-3 items-start">
                <Phone className="w-4 h-4 text-brand-teal shrink-0 mt-1" />
                <div>
                  <h4 className="font-body text-xs font-black uppercase text-cream tracking-wider mb-1">Phone Helpline</h4>
                  <p className="text-xs text-cream/75">
                    <EditableText id="footer-haldwani-phone">05946-223616, +91-9068561971</EditableText>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-3 items-start">
                <Mail className="w-4 h-4 text-brand-teal shrink-0 mt-1" />
                <div>
                  <h4 className="font-body text-xs font-black uppercase text-cream tracking-wider mb-1">Email Desk</h4>
                  <p className="text-xs text-cream/75 hover:text-brand-teal-bright transition-colors">
                    <EditableText id="footer-haldwani-email">info@vedantanetralya.com</EditableText>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Map */}
          <div className="pt-10 border-t border-cream/10 mt-12 pb-2 col-span-full">
            <h4 className="font-body text-[10px] font-black uppercase text-brand-teal tracking-wider mb-3 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Haldwani Centre Map
            </h4>
            <div className="rounded-2xl overflow-hidden h-48 border border-cream/10 relative">
              <iframe
                title="Haldwani Branch Map"
                src="https://maps.google.com/maps?q=Vedanta%20Netralya%20Haldwani%20Canal%20Road&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                allowFullScreen={false}
                loading="lazy"
              ></iframe>
            </div>
          </div>

        </div>

        {/* Bottom Copyright and Legal Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream/50">
          <div className="flex items-center gap-1.5 flex-wrap justify-center text-center">
            <span>© {new Date().getFullYear()}</span>
            <span className="font-body font-bold text-cream/70">Vedanta Netralya.</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex gap-6 items-center flex-wrap justify-center font-merriweather text-[9px] tracking-wider uppercase font-bold text-cream/50">
            <Link to="/privacy" className="hover:text-brand-teal-bright transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brand-teal-bright transition-colors">Terms of Use</Link>
            <Link to="/contact" className="hover:text-brand-teal-bright transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </EditableContainer>
  );
};

export default Footer;
