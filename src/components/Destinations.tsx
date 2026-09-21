import { useState } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { destinations, type Destination } from '../data/destinations';
import { Eyebrow } from './Shared';
import DestinationModal from './DestinationModal';

function DestinationCard({
  destination,
  onSelect,
}: {
  destination: Destination;
  onSelect: () => void;
}) {
  return (
    <button
      className={`destination-card destination-${destination.id}`}
      onClick={onSelect}
      aria-label={`Conhecer ${destination.name}, ${destination.region}`}
    >
      <img src={destination.image} alt={destination.alt} loading="lazy" width="1000" height="700" />
      <span className="destination-shade" />
      <span className="destination-info">
        <span className="destination-region">
          <MapPin size={13} />
          {destination.region}
        </span>
        <strong>{destination.name}</strong>
      </span>
      <span className="destination-arrow">
        <ArrowUpRight size={20} />
      </span>
    </button>
  );
}
export default function Destinations() {
  const [filter, setFilter] = useState('Todos os destinos');
  const [selected, setSelected] = useState<Destination | null>(null);
  const visible = destinations.filter(
    (d) => filter === 'Todos os destinos' || d.category === filter,
  );
  return (
    <section id="destinos" className="section destinations-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <Eyebrow>Sua próxima grande história</Eyebrow>
            <h2>
              Destinos mais escolhidos<span className="orange">.</span>
            </h2>
            <p>Um mundo de possibilidades. Qual delas tem a sua cara?</p>
          </div>
          <div className="destination-filters" aria-label="Filtrar destinos">
            {['Todos os destinos', 'Brasil', 'Pelo mundo'].map((item) => (
              <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className={`destinations-grid ${filter !== 'Todos os destinos' ? 'is-filtered' : ''}`}>
          {visible.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onSelect={() => setSelected(destination)}
            />
          ))}
        </div>
        <p className="destinations-note">
          Seu próximo destino pode estar aqui.{' '}
          <a href="#contato">
            Vamos planejar juntos? <ArrowUpRight size={15} />
          </a>
        </p>
      </div>
      {selected && <DestinationModal destination={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
