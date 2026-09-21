import type { CSSProperties } from 'react';

// Tempos em segundos; amplitudes em pixels. Movimento coordenado pelo mesmo ciclo.
export const FLIGHT_CONFIG = {
  entryDuration: 3,
  turbulenceInterval: 10,
  amplitude: 9,
  navy: '#012265',
  orange: '#F58634',
  clouds: [
    { width: 118, top: 48, duration: 17, delay: -8 },
    { width: 74, top: 14, duration: 21, delay: -16 },
    { width: 160, top: 77, duration: 25, delay: -4 },
    { width: 92, top: 29, duration: 19, delay: -13 },
    { width: 135, top: 63, duration: 23, delay: -20 },
    { width: 68, top: 86, duration: 15, delay: -2 },
  ],
  windDuration: 8,
};
export function Airplane({ className = '' }: { className?: string }) {
  return (
    <img
      className={className}
      src="/images/airplane-reference.png"
      alt=""
      width="185"
      height="169"
      aria-hidden="true"
      decoding="async"
    />
  );
}
function Cloud() {
  return (
    <svg viewBox="0 0 180 85" fill="white" aria-hidden="true">
      <path
        d="M18 74C1 74 0 52 17 49c5-1 9 0 12 2-9-28 26-45 44-23C74-4 126-5 132 33c16-7 34 4 33 19 21 0 20 22 3 22Z"
        stroke="#012265"
        strokeWidth="1.3"
      />
    </svg>
  );
}
export default function FlightAnimation() {
  const config = FLIGHT_CONFIG;
  const style = {
    '--flight-entry': `${config.entryDuration}s`,
    '--flight-cycle': `${config.turbulenceInterval}s`,
    '--flight-amplitude': `${config.amplitude}px`,
    '--flight-navy': config.navy,
    '--flight-orange': config.orange,
    '--wind-duration': `${config.windDuration}s`,
  } as CSSProperties;
  return (
    <div className="flight-scene" style={style} aria-hidden="true">
      <div className="flight-track">
        {config.clouds.map((cloud, i) => (
          <div
            key={i}
            className={`flight-cloud cloud-${i}`}
            style={{
              width: cloud.width,
              top: `${cloud.top}%`,
              animationDuration: `${cloud.duration}s`,
              animationDelay: `${cloud.delay}s`,
            }}
          >
            <Cloud />
          </div>
        ))}
        <svg className="wind wind-one" viewBox="0 0 300 60" fill="none">
          <path d="M2 35c77-30 126 25 207 0 30-10 17-42-3-29-9 7 2 17 9 9M44 49c59-22 97 11 149-5M130 57c39-5 62 6 92-5 21-8 39-2 43-14 6-18-17-20-18-6" />
        </svg>
        <svg className="wind wind-two" viewBox="0 0 300 60" fill="none">
          <path d="M0 40c65-33 112-7 172-12 37-3 45-25 26-30-12-3-17 14-4 17M23 53c57-17 100 13 154-2 26-7 46-1 61-10" />
        </svg>
        <svg className="wind wind-three" viewBox="0 0 300 60" fill="none">
          <path d="M5 30c80-24 121 15 190 2 24-5 31-23 17-28-11-4-18 10-8 16M44 45c55-18 99 12 150-1 30-8 53 3 72-9" />
        </svg>
        <div className="airplane-entry">
          <div className="airplane-float">
            <Airplane />
          </div>
        </div>
      </div>
    </div>
  );
}
