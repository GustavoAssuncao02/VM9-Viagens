import { useState } from 'react';
import { X } from 'lucide-react';
import { navigation, site, whatsappUrl } from '../data/site';
import credits from '../data/image-credits.json';
import { Logo, WhatsAppIcon } from './Shared';

function Instagram({ size = 20 }: { size?: number }) {
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
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  const [showCredits, setShowCredits] = useState(false);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Logo footer />
            <p>
              O mundo está cheio de boas histórias.
              <br />
              Vamos viver a sua próxima?
            </p>
            <div className="social-links">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da VM9 Viagens"
              >
                <Instagram size={20} />
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da VM9 Viagens"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>
          <div>
            <h3>Explore</h3>
            <ul>
              {navigation.slice(1).map(([name, href]) => (
                <li key={href}>
                  <a href={href}>{name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Vamos conversar</h3>
            <ul>
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                  @vm9viagens
                </a>
              </li>
              {site.address && (
                <li>
                  <address>{site.address}</address>
                </li>
              )}
            </ul>
            <span className="footer-note">Sua próxima viagem começa aqui.</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} VM9 Viagens. Todos os direitos reservados.</p>
          <div>
            {site.privacyUrl && <a href={site.privacyUrl}>Política de Privacidade</a>}
            {site.termsUrl && <a href={site.termsUrl}>Termos de Uso</a>}
            <button
              onClick={() => setShowCredits(!showCredits)}
              aria-expanded={showCredits}
              aria-controls="image-credits"
            >
              Créditos das imagens {showCredits && <X size={12} />}
            </button>
          </div>
        </div>
        {showCredits && (
          <div id="image-credits" className="image-credits">
            <h3>Fotografias que inspiram a viagem</h3>
            <p>
              Fotografias de Pexels e Unsplash, redimensionadas e recortadas para o layout. Logo
              fornecida pela VM9 Viagens.
            </p>
            <ul>
              {credits.map((credit) => (
                <li key={credit.name}>
                  <a href={credit.source} target="_blank" rel="noopener noreferrer">
                    {credit.name} · {credit.provider}
                  </a>{' '}
                  —{' '}
                  <a href={credit.license} target="_blank" rel="noopener noreferrer">
                    Licença
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </footer>
  );
}
