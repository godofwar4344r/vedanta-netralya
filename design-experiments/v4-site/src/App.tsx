import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Cataract from './pages/Cataract';
import LASIK from './pages/LASIK';
import Doctors from './pages/Doctors';
import Centres from './pages/Centres';
import Appointment from './pages/Appointment';
import Contact from './pages/Contact';
import Testimonials from './pages/Testimonials';
import VideoGallery from './pages/VideoGallery';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import TestEye from './pages/TestEye';

// New original content pages
import RetinaServices from './pages/RetinaServices';
import OpticalServices from './pages/OpticalServices';
import OculoplastyServices from './pages/OculoplastyServices';
import PaediatricOphthalmology from './pages/PaediatricOphthalmology';
import GlaucomaServices from './pages/GlaucomaServices';
import VRSurgery from './pages/VRSurgery';
import Facilities from './pages/Facilities';
import VisionMission from './pages/VisionMission';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="vision-mission" element={<VisionMission />} />
        <Route path="services" element={<Services />} />
        <Route path="cataract" element={<Cataract />} />
        <Route path="lasik" element={<LASIK />} />
        <Route path="retina-services" element={<RetinaServices />} />
        <Route path="optical-services" element={<OpticalServices />} />
        <Route path="oculoplasty-services" element={<OculoplastyServices />} />
        <Route path="paediatric-ophthalmology" element={<PaediatricOphthalmology />} />
        <Route path="glaucoma-services" element={<GlaucomaServices />} />
        <Route path="vr-surgery" element={<VRSurgery />} />
        <Route path="facilities" element={<Facilities />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="centres" element={<Centres />} />
        <Route path="appointment" element={<Appointment />} />
        <Route path="contact" element={<Contact />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="gallery" element={<VideoGallery />} />
        <Route path="gallery/images" element={<VideoGallery />} />
        <Route path="gallery/videos" element={<VideoGallery />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="test-eye" element={<TestEye />} />
      </Route>
    </Routes>
  );
}

export default App;
