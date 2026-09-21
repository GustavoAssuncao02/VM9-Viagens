import { assetPath } from '../utils/assets';

export type Destination = {
  id: string;
  name: string;
  region: string;
  image: string;
  alt: string;
  category: 'Brasil' | 'Pelo mundo';
  experience: string;
  description: string;
};
export const heroDestinations = [
  {
    name: 'Buenos Aires',
    region: 'Argentina',
    image: assetPath('/images/buenos-aires.webp'),
    alt: 'Vista aérea do Obelisco e da Avenida 9 de Julho em Buenos Aires',
  },
  {
    name: 'Jalapão',
    region: 'Tocantins, Brasil',
    image: assetPath('/images/jalapao.webp'),
    alt: 'Pôr do sol sobre a paisagem do Jalapão',
  },
  {
    name: 'Curitiba',
    region: 'Paraná, Brasil',
    image: assetPath('/images/curitiba.webp'),
    alt: 'Vista aérea de Curitiba ao pôr do sol',
  },
  {
    name: 'Salvador',
    region: 'Bahia, Brasil',
    image: assetPath('/images/salvador.webp'),
    alt: 'Casarões coloridos do centro histórico de Salvador',
  },
];
export const destinations: Destination[] = [
  {
    id: 'machu-picchu',
    name: 'Machu Picchu',
    region: 'Peru',
    image: assetPath('/images/machu-picchu.webp'),
    alt: 'Ruínas de Machu Picchu entre as montanhas dos Andes',
    category: 'Pelo mundo',
    experience: 'História & aventura',
    description:
      'Montanhas que impressionam e uma história que se revela a cada passo. Uma experiência para descobrir novos caminhos e guardar memórias extraordinárias.',
  },
  {
    id: 'bora-bora',
    name: 'Bora Bora',
    region: 'Polinésia Francesa',
    image: assetPath('/images/bora-bora.webp'),
    alt: 'Águas turquesa e ilhas de Bora Bora vistas do alto',
    category: 'Pelo mundo',
    experience: 'Praia & descanso',
    description:
      'Águas em tons de azul, paisagens tropicais e tempo para desacelerar. Um convite para aproveitar os dias com calma e viver momentos especiais.',
  },
  {
    id: 'santorini',
    name: 'Santorini',
    region: 'Grécia',
    image: assetPath('/images/santorini.webp'),
    alt: 'Arquitetura branca de Santorini voltada para o mar Egeu',
    category: 'Pelo mundo',
    experience: 'Romance & paisagens',
    description:
      'Casas brancas, o azul do mar e passeios sem pressa. Descubra cenários que convidam a celebrar a vida e compartilhar boas histórias.',
  },
  {
    id: 'aurora',
    name: 'Aurora Boreal',
    region: 'Islândia',
    image: assetPath('/images/aurora.webp'),
    alt: 'Aurora boreal iluminando o céu da Islândia',
    category: 'Pelo mundo',
    experience: 'Natureza & descobertas',
    description:
      'Uma viagem em busca das luzes que transformam o céu em espetáculo. A observação da aurora depende das condições naturais; cada noite é uma nova possibilidade.',
  },
  {
    id: 'uyuni',
    name: 'Salar de Uyuni',
    region: 'Bolívia',
    image: assetPath('/images/uyuni.webp'),
    alt: 'Céu refletido sobre o Salar de Uyuni',
    category: 'Pelo mundo',
    experience: 'Natureza & aventura',
    description:
      'Horizontes que parecem não ter fim e paisagens que surpreendem. Planeje uma jornada para contemplar o salar, cujos cenários mudam conforme a época do ano.',
  },
  {
    id: 'chapada',
    name: 'Chapada Diamantina',
    region: 'Bahia, Brasil',
    image: assetPath('/images/chapada.webp'),
    alt: 'Montanhas e vales da Chapada Diamantina na Bahia',
    category: 'Brasil',
    experience: 'Trilhas & natureza',
    description:
      'Respire fundo, mude o ritmo e aproxime-se da natureza. Uma viagem para explorar paisagens marcantes e apreciar a beleza dos caminhos da Bahia.',
  },
  {
    id: 'mendoza',
    name: 'Mendoza',
    region: 'Argentina',
    image: assetPath('/images/mendoza.webp'),
    alt: 'Passeio por um vinhedo em Mendoza',
    category: 'Pelo mundo',
    experience: 'Sabores & paisagens',
    description:
      'Uma pausa para os bons sabores, as conversas e as paisagens. Descubra Mendoza em uma experiência pensada para o seu jeito de viajar.',
  },
  {
    id: 'atacama',
    name: 'San Pedro de Atacama',
    region: 'Chile',
    image: assetPath('/images/atacama.webp'),
    alt: 'Paisagem árida e montanhas no deserto do Atacama',
    category: 'Pelo mundo',
    experience: 'Deserto & aventura',
    description:
      'Cores, formas e horizontes que despertam a curiosidade. Viva uma jornada por paisagens do deserto com planejamento e cuidado em cada etapa.',
  },
  {
    id: 'gramado',
    name: 'Gramado',
    region: 'Rio Grande do Sul, Brasil',
    image: assetPath('/images/gramado.webp'),
    alt: 'Igreja de São Pedro em Gramado',
    category: 'Brasil',
    experience: 'Charme & gastronomia',
    description:
      'Dias aconchegantes, passeios tranquilos e momentos à mesa. Uma experiência para aproveitar a cidade no seu ritmo, com quem você gosta.',
  },
  {
    id: 'veneza',
    name: 'Veneza',
    region: 'Itália',
    image: assetPath('/images/veneza.webp'),
    alt: 'Canal entre edifícios históricos de Veneza',
    category: 'Pelo mundo',
    experience: 'Cultura & romance',
    description:
      'Caminhe entre canais, pontes e arquitetura cheia de personalidade. Deixe espaço no roteiro para se surpreender com os pequenos detalhes de Veneza.',
  },
];
