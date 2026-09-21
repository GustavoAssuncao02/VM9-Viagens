import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import Destinations from './components/Destinations';
import { Services, Benefits, Testimonials, About, Contact } from './components/Sections';
import Footer from './components/Footer';
import { WhatsAppIcon } from './components/Shared';
import { whatsappUrl } from './data/site';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo">
        <HeroCarousel />
        <Services />
        <Benefits />
        <Destinations />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
      <a
        className="floating-whatsapp"
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Converse com a VM9 Viagens pelo WhatsApp"
      >
        <WhatsAppIcon size={29} />
      </a>
    </>
  );
}
