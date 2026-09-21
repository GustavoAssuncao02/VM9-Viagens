import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowDown, ChevronLeft, ChevronRight, MapPin, Pause, Play } from 'lucide-react';
import { heroDestinations } from '../data/destinations';
import { ContactButton, Eyebrow } from './Shared';
import FlightAnimation from './FlightAnimation';

export const CAROUSEL_INTERVAL = 8000;
export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState([0]);
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();
  const touch = useRef<{ x: number; y: number } | null>(null);
  const request = useRef(0);
  const goTo = useCallback((next: number) => {
    const ticket = ++request.current;
    const normalized = (next + heroDestinations.length) % heroDestinations.length;
    const image = new Image();
    image.src = heroDestinations[normalized].image;
    image
      .decode()
      .then(() => {
        if (ticket !== request.current) return;
        setLoaded((current) => [...new Set([...current, normalized])]);
        setIndex(normalized);
      })
      .catch(() => {
        /* Mantém a fotografia atual se a próxima falhar. */
      });
  }, []);
  useEffect(() => {
    const handler = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, []);
  useEffect(() => {
    if (paused || focused || reduceMotion || !visible) return;
    const timer = window.setTimeout(() => goTo(index + 1), CAROUSEL_INTERVAL);
    return () => clearTimeout(timer);
  }, [index, paused, focused, reduceMotion, visible, goTo]);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const next = new Image();
      next.src = heroDestinations[(index + 1) % heroDestinations.length].image;
    }, 1600);
    return () => clearTimeout(timer);
  }, [index]);
  return (
    <section
      id="inicio"
      className="hero"
      aria-label="Inspire-se para sua próxima viagem"
      aria-roledescription="carrossel"
      onTouchStart={(e) => {
        touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }}
      onTouchEnd={(e) => {
        if (!touch.current) return;
        const dx = touch.current.x - e.changedTouches[0].clientX;
        const dy = touch.current.y - e.changedTouches[0].clientY;
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) goTo(index + (dx > 0 ? 1 : -1));
        touch.current = null;
      }}
    >
      <div className="hero-images">
        {loaded.map((i) => (
          <img
            key={i}
            src={heroDestinations[i].image}
            alt={heroDestinations[i].alt}
            className={`hero-image ${index === i ? 'active' : ''}`}
            aria-hidden={index !== i}
            fetchPriority={i === 0 ? 'high' : 'auto'}
          />
        ))}
      </div>
      <div className="hero-shade" />
      <div className="container hero-content">
        <Eyebrow light>O mundo espera por você</Eyebrow>
        <h1>
          Sua viagem
          <br />
          dos sonhos
          <br />
          <span>começa aqui!</span>
        </h1>
        <p className="hero-description">
          Experiências inesquecíveis, planejamento personalizado e todo o cuidado para transformar
          seus próximos destinos em grandes histórias.
        </p>
        <ContactButton />
        <a href="#destinos" className="hero-explore">
          Encontre sua próxima inspiração <ArrowDown size={16} />
        </a>
      </div>
      <div className="container hero-bottom">
        <a href="#servicos" className="scroll-hint">
          <span>
            <ArrowDown size={18} />
          </span>
          Há um mundo para descobrir
        </a>
        <div
          className="carousel-controls"
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
          }}
        >
          <div
            className="current-place"
            aria-live={paused || focused || reduceMotion ? 'polite' : 'off'}
          >
            <MapPin size={18} />
            <div>
              <strong>{heroDestinations[index].name}</strong>
              <span>{heroDestinations[index].region}</span>
            </div>
          </div>
          <div className="carousel-navigation">
            <button aria-label="Destino anterior" onClick={() => goTo(index - 1)}>
              <ChevronLeft size={19} />
            </button>
            <div className="carousel-dots">
              {heroDestinations.map((destination, i) => (
                <button
                  key={destination.name}
                  aria-label={`Mostrar ${destination.name}`}
                  aria-pressed={index === i}
                  onClick={() => goTo(i)}
                >
                  <span className={index === i ? 'active' : ''} />
                </button>
              ))}
            </div>
            <button aria-label="Próximo destino" onClick={() => goTo(index + 1)}>
              <ChevronRight size={19} />
            </button>
            <button
              aria-label={paused ? 'Retomar carrossel' : 'Pausar carrossel'}
              onClick={() => setPaused(!paused)}
              disabled={!!reduceMotion}
            >
              {paused || reduceMotion ? <Play size={15} /> : <Pause size={15} />}
            </button>
          </div>
        </div>
      </div>
      <svg
        className="hero-wave"
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 70C280 150 380 25 735 66c335 39 465 42 705-41v85H0Z" fill="white" />
      </svg>
      <FlightAnimation />
    </section>
  );
}
