import {
  ArrowUpRight,
  BedDouble,
  Compass,
  Headphones,
  Heart,
  Luggage,
  Plane,
  Quote,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { benefits, services, testimonials } from '../data/site';
import { ContactButton, Eyebrow } from './Shared';
import { Airplane } from './FlightAnimation';

const icons = { plane: Plane, bed: BedDouble, bag: Luggage, shield: ShieldCheck };
export function Services() {
  return (
    <section id="servicos" className="section services-section">
      <div className="container">
        <div className="center-heading">
          <Eyebrow>Você sonha. A gente cuida.</Eyebrow>
          <h2>
            Tudo para a sua próxima viagem<span className="orange">.</span>
          </h2>
          <p>Do primeiro plano ao último dia, cada detalhe importa.</p>
        </div>
        <div className="services-grid">
          {services.map((service) => {
            const Icon = icons[service.icon];
            return (
              <article className="service-card" key={service.title}>
                <span className="service-icon">
                  <Icon size={28} strokeWidth={1.5} />
                </span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export function Benefits() {
  const benefitIcons = [Heart, Compass, Headphones, Sparkles];
  return (
    <section className="section benefits-section">
      <div className="container benefits-layout">
        <div className="benefits-visual">
          <div className="benefits-photo">
            <img
              src="/images/bora-bora.webp"
              alt="Ilhas verdes e mar turquesa em Bora Bora"
              width="1000"
              height="700"
              loading="lazy"
            />
          </div>
          <div className="travel-note">
            <Heart size={22} />
            <span>
              Mais que viagens,
              <br />
              <strong>boas histórias.</strong>
            </span>
          </div>
          <svg className="dotted-route" viewBox="0 0 400 160" fill="none" aria-hidden="true">
            <path
              d="M8 110c51-150 185-46 145 1-38 48-82-39 9-29 75 9 101 84 207-33"
              stroke="#F58634"
              strokeWidth="2"
              strokeDasharray="5 7"
            />
          </svg>
          <Airplane className="benefits-plane" />
          <span className="photo-caption">Bora Bora, Polinésia Francesa</span>
        </div>
        <div className="benefits-copy">
          <Eyebrow>Seu jeito de viajar, nosso cuidado</Eyebrow>
          <h2>
            Por que viajar
            <br />
            com a VM9<span className="orange">?</span>
          </h2>
          <p className="section-intro">
            Porque uma viagem especial começa com alguém que entende os seus sonhos.
          </p>
          <div className="benefits-list">
            {benefits.map((benefit, i) => {
              const Icon = benefitIcons[i];
              return (
                <div className="benefit" key={benefit.title}>
                  <span>
                    <Icon size={21} strokeWidth={1.6} />
                  </span>
                  <div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <a href="#sobre" className="text-link">
            Conheça a VM9 <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
export function Testimonials() {
  return (
    <section className="section testimonials-section">
      <div className="container">
        <div className="center-heading">
          <Eyebrow>Histórias que a gente guarda com carinho</Eyebrow>
          <h2>
            Quem viaja com a VM9, recomenda<span className="orange">.</span>
          </h2>
          <p>O melhor da nossa jornada é fazer parte da sua.</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <article className="testimonial-card" key={testimonial.name}>
              <Quote className="quote-icon" size={29} strokeWidth={1.3} />
              <blockquote>“{testimonial.text}”</blockquote>
              <div className="testimonial-person">
                <span className="avatar">{testimonial.initials}</span>
                <div>
                  <h3>{testimonial.name}</h3>
                  {testimonial.context && <p>{testimonial.context}</p>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function About() {
  return (
    <section id="sobre" className="section about-section">
      <div className="container about-layout">
        <div>
          <Eyebrow>Prazer, somos a VM9</Eyebrow>
          <h2>
            A viagem é sua.
            <br />O cuidado é nosso<span className="orange">.</span>
          </h2>
        </div>
        <div className="about-copy">
          <p>
            Na VM9 Viagens, acreditamos que cada viagem começa muito antes do embarque. Por isso,
            cuidamos dos detalhes para que você possa aproveitar aquilo que realmente importa:{' '}
            <strong>viver novas experiências e criar boas histórias.</strong>
          </p>
          <a className="text-link" href="#contato">
            Vamos conversar sobre seus planos? <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
export function Contact() {
  return (
    <section id="contato" className="contact-section">
      <div className="container contact-inner">
        <div>
          <Eyebrow light>Pronto para fazer as malas?</Eyebrow>
          <h2>
            Qual será o seu
            <br />
            próximo destino<span>?</span>
          </h2>
          <p>
            Conte seus planos para a VM9 Viagens e vamos começar a preparar sua próxima experiência.
          </p>
          <ContactButton />
        </div>
        <div className="contact-art" aria-hidden="true">
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
          <span className="orbit orbit-three" />
          <svg viewBox="0 0 500 360" fill="none">
            <path
              d="M22 305C32 57 424 89 266 227c-147 128-200-192 141-175"
              stroke="#F58634"
              strokeWidth="2"
              strokeDasharray="7 9"
            />
          </svg>
          <Airplane />
        </div>
      </div>
    </section>
  );
}
