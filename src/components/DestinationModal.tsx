import { useEffect, useRef } from 'react';
import { MapPin, X } from 'lucide-react';
import type { Destination } from '../data/destinations';
import { ContactButton } from './Shared';

export default function DestinationModal({
  destination,
  onClose,
}: {
  destination: Destination;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    const element = dialog.current!;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      previous?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="destination-modal"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onKeyDown={(e) => {
        if (e.key !== 'Tab') return;
        const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('button, a[href]'));
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const r = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <button className="modal-close" onClick={onClose} aria-label="Fechar destino">
        <X size={22} />
      </button>
      <img className="modal-image" src={destination.image} alt={destination.alt} />
      <div className="modal-body">
        <span className="experience-tag">{destination.experience}</span>
        <h2 id="modal-title">{destination.name}</h2>
        <p className="modal-region">
          <MapPin size={17} />
          {destination.region}
        </p>
        <p id="modal-description">{destination.description}</p>
        <ContactButton destination={destination.name}>Quero conhecer</ContactButton>
      </div>
    </dialog>
  );
}
