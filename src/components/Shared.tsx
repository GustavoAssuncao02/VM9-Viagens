import { ArrowUpRight } from 'lucide-react';
import { whatsappUrl } from '../data/site';
import type { ReactNode } from 'react';

export function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M20.4 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.4-4.7a8.5 8.5 0 1 1 16-4.2Z" />
      <path d="M8.2 7.3c-.6.2-1 1-.8 1.9.5 2.6 3 5.1 5.5 5.8.9.2 1.9-.1 2.2-.7l.4-1.1-2.3-1.1-.9 1c-1.5-.6-2.6-1.7-3.2-3.1l.8-.9-.9-1.9Z" />
    </svg>
  );
}
export function ContactButton({
  children = 'Fale Conosco',
  destination,
  className = '',
}: {
  children?: ReactNode;
  destination?: string;
  className?: string;
}) {
  return (
    <a
      className={`button button-orange ${className}`}
      href={whatsappUrl(destination)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsAppIcon size={20} />
      {children}
      <ArrowUpRight size={18} />
    </a>
  );
}
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>
      <span />
      {children}
    </p>
  );
}
export function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <a
      href="#inicio"
      className={`brand ${footer ? 'brand-footer' : ''}`}
      aria-label="VM9 Viagens — início"
    >
      <img src="/images/vm9-logo.png" alt="VM9 Viagens" width="150" height="150" />
    </a>
  );
}
