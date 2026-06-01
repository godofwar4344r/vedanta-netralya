import { FormEvent, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  Check,
  Clock3,
  Eye,
  HeartPulse,
  Hospital,
  Mail,
  MapPin,
  Menu,
  Microscope,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRound,
  X,
  type LucideIcon,
} from 'lucide-react';

import VedantaLogo from './components/VedantaLogo.tsx';

const asset = (fileName: string) => `${import.meta.env.BASE_URL}assets/${fileName}`;

type Service = {
  title: string;
  summary: string;
  icon: LucideIcon;
  details: string[];
};

type Doctor = {
  name: string;
  title: string;
  image: string;
  bio: string;
  highlights: string[];
};

const services: Service[] = [
  {
    title: 'Retina Services',
    summary: 'Diagnostics and treatment for diabetic retinopathy, AMD, retinal tears and complex retinal disease.',
    icon: Eye,
    details: ['OCT and USG B-scan', 'Green laser, LIO, PDT and cryotherapy', 'Fundus photography and fluorescein angiography'],
  },
  {
    title: 'Cataract Services',
    summary: 'Micro-incision cataract surgery with premium foldable, aspheric, toric and multifocal lens options.',
    icon: Microscope,
    details: ['World class 1.8 mm MICS', 'Multifocal and toric IOL implantation', 'YAG laser and ALADIN optical biometry'],
  },
  {
    title: 'Glaucoma Services',
    summary: 'Screening, diagnosis and ongoing care for pressure-related optic nerve risk.',
    icon: ShieldCheck,
    details: ['NCT and applanation tonometry', 'Gonioscopy, pachymetry and perimetry', 'OCT and 78D/90D lens examination'],
  },
  {
    title: 'Oculoplasty Services',
    summary: 'Plastic and reconstructive procedures around the eye, lids, socket and lacrimal drainage system.',
    icon: Sparkles,
    details: ['Ptosis and entropion correction', 'External DCR with intubation', 'Ocular prosthesis support'],
  },
  {
    title: 'VR Surgery',
    summary: 'Vitreoretinal surgical care for retinal detachment, macular hole, vitreous haemorrhage and trauma.',
    icon: HeartPulse,
    details: ['23/25G micro-incision vitrectomy', 'Scleral buckling and pneumoretinopexy', 'SF IOL and subretinal surgery'],
  },
  {
    title: 'Refractive Error Treatment',
    summary: 'Custom vision correction support through contact lenses, optical correction and refractive procedures.',
    icon: Stethoscope,
    details: ['ICL and LASIK facility', 'Corneal topography', 'Vision rehabilitation with customized optical correction'],
  },
  {
    title: 'Paediatric Ophthalmology',
    summary: 'Child-friendly screening and surgical support backed by anaesthetist and OT readiness.',
    icon: UserRound,
    details: ['Teller and Gardiner acuity charts', 'Paediatric surgical facility', 'Simple and complicated paediatric retinal surgery'],
  },
  {
    title: 'Optical Services',
    summary: 'Corrective, cosmetic and therapeutic eyewear with a broad range of frames and lenses.',
    icon: Building2,
    details: ['Indian and imported frames', 'Branded and unbranded lenses', 'Open-display optical showroom'],
  },
];

const doctors: Doctor[] = [
  {
    name: 'Dr Sameer Varma',
    title: 'M.S., Fellow SNC',
    image: 'doctor-sameer-varma.jpg',
    bio: 'Completed ophthalmology post-graduation in 2003, followed by comprehensive ophthalmology and oculoplasty fellowships at Sadguru Netra Chikitsalaya, Chitrakoot.',
    highlights: ['Cataract, refractive, glaucoma and oculoplasty care', 'High-volume cataract and lid surgery experience', 'Former clinical in-charge at Eye Q, Haldwani'],
  },
  {
    name: 'Dr R.J.K. Singh',
    title: 'DOMS',
    image: 'doctor-rjk-singh.jpg',
    bio: 'Postgraduate from Kanpur University with fellowship experience at Sitapur Eye Hospital and decades of ophthalmic practice across Uttarakhand.',
    highlights: ['Senior ophthalmic surgeon', '35 years with Sitapur Eye Hospital branches', 'Former senior consultant at Eye Q Eye Hospital'],
  },
  {
    name: 'Dr Kanhaiya Mittal',
    title: 'MBBS, MD (AIIMS Delhi), DNB, FICO, MRCS',
    image: 'doctor-kanhaiya-mittal.jpeg',
    bio: 'Retina consultant and surgeon trained at Maulana Azad Medical College and AIIMS Delhi, with rigorous vitreo-retina training.',
    highlights: ['Retina consultant and surgeon', 'Vitreo-retina training from AIIMS Delhi', 'Academic, training and research involvement'],
  },
  {
    name: 'Dr Davinder Tyagi',
    title: 'M.D. (AIIMS)',
    image: 'doctor-davinder-tyagi.jpg',
    bio: 'Completed post-graduation and vitreo-retinal training at R.P. Centre, AIIMS, and helped start retina surgery in Kumaon at Haldwani in 2007.',
    highlights: ['Vitreoretinal consultant', 'Experience of more than 4000 VR surgeries', 'Clinical in-charge at Vedanta Netralya, Haldwani'],
  },
];

const facilities = [
  'Centrally located, air-conditioned hospital in Haldwani, Nainital',
  'Two refraction stations and two doctor consultation chambers',
  'Own pharmacy, optical store and 24-hour power backup',
  'Separate counselling chamber for patient guidance',
  'Recovery room with beds and recliners for OT patients',
  'Fully equipped OT with monitoring system, Boyle apparatus and suction machine',
  'Indoor ward, cardiac monitoring and GA support for vulnerable patients',
  'Premium foldable, aspheric, multifocal and EDOF lens options',
];

const gallery = [
  { image: 'gallery-1.jpg', caption: 'Vedanta Netralya Haldwani' },
  { image: 'gallery-2.jpg', caption: 'Refraction and OPD areas' },
  { image: 'gallery-3.jpg', caption: 'Counselling and patient care areas' },
  { image: 'gallery-4.jpg', caption: 'Modular OT and equipment' },
  { image: 'gallery-5.jpg', caption: 'Recovery and support areas' },
];

const navItems = [
  { label: 'About', target: 'about' },
  { label: 'Services', target: 'services' },
  { label: 'Doctors', target: 'doctors' },
  { label: 'Facilities', target: 'facilities' },
  { label: 'Contact', target: 'contact' },
];

const fadeUp = {
  initial: { opacity: 0.96, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

const staggerGroup = {
  initial: { opacity: 1 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.14 },
  transition: { staggerChildren: 0.08 },
};

const staggerItem = {
  initial: { opacity: 0.98, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.56, ease: [0.16, 1, 0.3, 1] },
};

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Cataract Services');
  const [toast, setToast] = useState('');

  const serviceOptions = useMemo(() => services.map((service) => service.title), []);

  const scrollTo = (target: string) => {
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  const requestAppointment = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setTimeout(() => scrollTo('appointment'), 20);
  };

  const handleAppointment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const patientName = String(formData.get('name') || 'Patient').trim();

    setToast(`Appointment request noted for ${patientName}. Please call 05946-223616 to confirm the slot.`);
    form.reset();
    setSelectedService('Cataract Services');
    window.setTimeout(() => setToast(''), 6500);
  };

  return (
    <div className="site-shell">
      <header className="top-contact" aria-label="Hospital quick contact">
        <div className="top-contact__inner">
          <span><Clock3 aria-hidden="true" /> Mon-Sat 9:00 AM-7:00 PM</span>
          <span>Sun 9:00 AM-2:00 PM</span>
          <a href="tel:+919068561971"><Phone aria-hidden="true" /> +91-9068561971</a>
          <a href="mailto:info@vedantanetralya.com"><Mail aria-hidden="true" /> info@vedantanetralya.com</a>
        </div>
      </header>

      <nav className="main-nav" aria-label="Main navigation">
        <button className="logo-button" onClick={() => scrollTo('home')} aria-label="Vedanta Netralya home">
          <VedantaLogo height={54} />
        </button>

        <div className="desktop-nav">
          {navItems.map((item) => (
            <button key={item.target} onClick={() => scrollTo(item.target)}>
              {item.label}
            </button>
          ))}
        </div>

        <div className="nav-actions">
          <a className="call-button" href="tel:+915946223616" aria-label="Call Vedanta Netralya">
            <Phone aria-hidden="true" />
          </a>
          <button className="primary-button primary-button--small" onClick={() => requestAppointment()}>
            <CalendarCheck aria-hidden="true" />
            Appointment
          </button>
          <button className="menu-button" onClick={() => setMobileOpen((open) => !open)} aria-label="Open menu">
            {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-panel">
          <VedantaLogo height={48} />
          {navItems.map((item) => (
            <button key={item.target} onClick={() => scrollTo(item.target)}>
              {item.label}
            </button>
          ))}
          <button className="primary-button" onClick={() => requestAppointment()}>
            <CalendarCheck aria-hidden="true" />
            Make an Appointment
          </button>
        </div>
      )}

      {toast && (
        <div className="toast" role="status">
          <Check aria-hidden="true" />
          {toast}
        </div>
      )}

      <main>
        <section id="home" className="hero" aria-label="Vedanta Netralya Haldwani">
          <div className="hero__image" style={{ backgroundImage: `url(${asset('gallery-1.jpg')})` }} />
          <div className="hero__overlay" />
          <div className="hero__motion" aria-hidden="true">
            <span className="scan-eye">
              <span className="scan-eye__iris" />
              <span className="scan-eye__shine" />
            </span>
            <span className="scan-line" />
            <span className="pulse-ring pulse-ring--one" />
            <span className="pulse-ring pulse-ring--two" />
            <span className="pulse-ring pulse-ring--three" />
          </div>
          <motion.div
            className="hero__panel hero__panel--scan"
            initial={{ opacity: 0, x: 28, y: 18 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>Retina scan</span>
            <strong>OCT / B-scan</strong>
          </motion.div>
          <motion.div
            className="hero__panel hero__panel--ot"
            initial={{ opacity: 0, x: -26, y: 22 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>OT ready</span>
            <strong>Monitoring + GA support</strong>
          </motion.div>
          <motion.div
            className="hero__content"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero__brand">
              <VedantaLogo height={62} />
            </div>
            <h1>Super-speciality eye care for Haldwani and Kumaun.</h1>
            <p>
              Vedanta Netralya is a centrally located, air-conditioned eye hospital in Haldwani, providing premium and comprehensive care across Retina, Glaucoma, Oculoplasty, Cataract and Refractive services.
            </p>
            <div className="hero__actions">
              <button className="primary-button" onClick={() => requestAppointment()}>
                <CalendarCheck aria-hidden="true" />
                Make an Appointment
              </button>
              <a className="secondary-button" href="tel:+915946223616">
                <Phone aria-hidden="true" />
                05946-223616
              </a>
            </div>
          </motion.div>
          <motion.div
            className="hero__stats"
            aria-label="Hospital highlights"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <strong>Haldwani</strong>
              <span>Canal Rd, Tikonia Circle</span>
            </div>
            <div>
              <strong>9 AM-7 PM</strong>
              <span>Monday to Saturday</span>
            </div>
            <div>
              <strong>Kichha</strong>
              <span>Hotel NeelKamal, Bareilly Road</span>
            </div>
          </motion.div>
        </section>

        <motion.section id="about" className="section section--white" {...fadeUp}>
          <div className="split-layout">
            <div className="section-copy">
              <span className="section-label">About Hospital</span>
              <h2>Built for comprehensive eye care in the heart of Haldwani.</h2>
              <p>
                The original Vedanta Netralya hospital page describes the centre as a leading eye hospital in the Kumaun region of Uttarakhand, with trained staff, a good ambience, optical store, medical store and 24-hour power backup.
              </p>
              <p>
                The hospital brings together superspeciality care for Retina, Glaucoma and Oculoplasty, alongside cataract and refractive care, under the leadership of ophthalmic experts including Dr R.J.K. Singh, Dr Sameer Varma and Dr Davinder Tyagi.
              </p>
            </div>
            <div className="belief-panel">
              <Hospital aria-hidden="true" />
              <h3>Vision</h3>
              <p>To establish technologically enabled and skilled eye care services by following internationally acclaimed preferred practice patterns with academic excellence.</p>
              <h3>Mission</h3>
              <p>To provide compassionate, comprehensive and cutting-edge super-speciality eye care at affordable cost to every section of society.</p>
            </div>
          </div>
        </motion.section>

        <motion.section id="services" className="section" {...fadeUp}>
          <div className="section-heading">
            <span className="section-label">Eye Services</span>
            <h2>Speciality care without losing the human touch.</h2>
            <p>Each service area below comes from the original Haldwani website content, rewritten cleanly for a premium modern patient experience.</p>
          </div>
          <motion.div className="service-grid" {...staggerGroup}>
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.article className="service-card" key={service.title} variants={staggerItem}>
                  <div className="service-card__icon">
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <ul>
                    {service.details.map((detail) => (
                      <li key={detail}><Check aria-hidden="true" /> {detail}</li>
                    ))}
                  </ul>
                  <button onClick={() => requestAppointment(service.title)}>
                    Discuss this service <ArrowRight aria-hidden="true" />
                  </button>
                </motion.article>
              );
            })}
          </motion.div>
        </motion.section>

        <motion.section id="doctors" className="section section--white" {...fadeUp}>
          <div className="section-heading">
            <span className="section-label">Our Doctors</span>
            <h2>Specialist doctors from the original Haldwani profile.</h2>
          </div>
          <motion.div className="doctor-grid" {...staggerGroup}>
            {doctors.map((doctor) => (
              <motion.article className="doctor-card" key={doctor.name} variants={staggerItem}>
                <img src={asset(doctor.image)} alt={doctor.name} />
                <div>
                  <span>{doctor.title}</span>
                  <h3>{doctor.name}</h3>
                  <p>{doctor.bio}</p>
                  <ul>
                    {doctor.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section id="facilities" className="section" {...fadeUp}>
          <div className="facility-layout">
            <div>
              <span className="section-label">Facilities</span>
              <h2>Clinical infrastructure designed around patient comfort.</h2>
              <div className="facility-list">
                {facilities.map((item) => (
                  <div key={item}>
                    <Check aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <motion.div className="gallery-rail" aria-label="Hospital gallery" {...staggerGroup}>
              {gallery.map((item) => (
                <motion.figure key={item.image} variants={staggerItem}>
                  <img src={asset(item.image)} alt={item.caption} />
                  <figcaption>{item.caption}</figcaption>
                </motion.figure>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section id="appointment" className="section section--appointment" {...fadeUp}>
          <div className="appointment-shell">
            <div className="appointment-copy">
              <VedantaLogo height={64} />
              <h2>Make an appointment at Vedanta Netralya.</h2>
              <p>
                Share your basic details and the care area you want to discuss. For urgent confirmation, call the hospital directly.
              </p>
              <div className="appointment-contact">
                <a href="tel:+915946223616"><Phone aria-hidden="true" /> 05946-223616</a>
                <a href="tel:+919068561971"><Phone aria-hidden="true" /> +91-9068561971</a>
              </div>
            </div>
            <form className="appointment-form" onSubmit={handleAppointment}>
              <label>
                Name
                <input name="name" type="text" placeholder="Patient name" required />
              </label>
              <label>
                Phone
                <input name="phone" type="tel" placeholder="+91" required />
              </label>
              <label>
                Service
                <select name="service" value={selectedService} onChange={(event) => setSelectedService(event.target.value)}>
                  {serviceOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label>
                Message
                <textarea name="message" rows={4} placeholder="Briefly describe the concern" />
              </label>
              <button className="primary-button" type="submit">
                <CalendarCheck aria-hidden="true" />
                Request Appointment
              </button>
            </form>
          </div>
        </motion.section>

        <motion.section id="contact" className="section section--white" {...fadeUp}>
          <div className="contact-layout">
            <div className="section-copy">
              <span className="section-label">Contact Us</span>
              <h2>Two centres listed on the original Haldwani website.</h2>
              <p>OPD working hours are listed as 9:00 AM to 7:00 PM from Monday to Saturday, and 9:00 AM to 2:00 PM on Sunday.</p>
            </div>
            <div className="location-grid">
              <article className="location-card">
                <MapPin aria-hidden="true" />
                <h3>Haldwani</h3>
                <p>Canal Rd, Tikonia Circle, Haldwani, Nainital (UK)</p>
                <a href="https://www.google.com/maps/search/?api=1&query=Vedanta%20Netralya%20Canal%20Rd%20Tikonia%20Circle%20Haldwani" target="_blank" rel="noreferrer">
                  Open map <ArrowRight aria-hidden="true" />
                </a>
              </article>
              <article className="location-card">
                <MapPin aria-hidden="true" />
                <h3>Kichha</h3>
                <p>Hotel NeelKamal, Bareilly Road, Kichha (UK)</p>
                <a href="tel:+917900777709">
                  +91-7900777709 <ArrowRight aria-hidden="true" />
                </a>
              </article>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="site-footer">
        <div>
          <VedantaLogo height={58} />
          <p>Superspeciality eye care for Retina, Glaucoma, Oculoplasty, Cataract and Refractive services in Haldwani.</p>
        </div>
        <div className="footer-links">
          <a href="tel:+915946223616">05946-223616</a>
          <a href="tel:+919068561971">+91-9068561971</a>
          <a href="mailto:info@vedantanetralya.com">info@vedantanetralya.com</a>
        </div>
      </footer>
    </div>
  );
}
