export const site = {
  whatsapp: '5511942651657',
  phoneDisplay: '+55 11 94265-1657',
  instagram: 'https://www.instagram.com/vm9viagens/',
  address: null as string | null,
  // Inserir URLs ou rotas quando os documentos aprovados forem fornecidos.
  privacyUrl: null as string | null,
  termsUrl: null as string | null,
};
export function whatsappUrl(destination?: string) {
  const message = destination
    ? `Olá! Vim pelo site da VM9 Viagens e gostaria de saber mais sobre uma viagem para ${destination}.`
    : 'Olá! Vim pelo site da VM9 Viagens e gostaria de planejar minha próxima viagem.';
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
export const navigation = [
  ['Início', '#inicio'],
  ['Serviços', '#servicos'],
  ['Destinos', '#destinos'],
  ['Sobre nós', '#sobre'],
  ['Contato', '#contato'],
] as const;
export const services = [
  {
    icon: 'plane',
    title: 'Passagens aéreas',
    text: 'O primeiro passo para a sua próxima grande história.',
  },
  {
    icon: 'bed',
    title: 'Hospedagens',
    text: 'Seu lugar para descansar e se sentir bem, onde estiver.',
  },
  { icon: 'bag', title: 'Pacotes', text: 'Experiências que combinam com você, do início ao fim.' },
  {
    icon: 'shield',
    title: 'Seguro viagem',
    text: 'Mais tranquilidade para aproveitar cada descoberta.',
  },
] as const;
export const benefits = [
  {
    title: 'Atendimento personalizado',
    text: 'Antes de pensar no roteiro, queremos conhecer você.',
  },
  {
    title: 'Planejamento pensado para você',
    text: 'Seus sonhos, seu ritmo e os detalhes que fazem diferença.',
  },
  {
    title: 'Suporte em cada etapa da viagem',
    text: 'Conte com a gente antes, durante e depois do embarque.',
  },
  {
    title: 'Experiências cuidadosamente selecionadas',
    text: 'Escolhas com carinho para uma viagem que faz sentido para você.',
  },
];
export const testimonials = [
  {
    name: 'Vinicius',
    initials: 'V',
    text: 'A viagem correu perfeitamente. Muito obrigado por toda a atenção e pelo cuidado do começo ao fim. Até a próxima!',
  },
  {
    name: 'Evandro Meato e Liz Neta',
    initials: 'EL',
    context: 'Lua de mel',
    text: 'Estamos curtindo nossa lua de mel e queríamos agradecer à VM9 Viagens por proporcionar, mais uma vez, um atendimento incrível e uma viagem tão especial para nós.',
  },
  {
    name: 'Luana',
    initials: 'L',
    text: 'Muito obrigada pelo atendimento VIP! Fui muito bem atendida e cuidada em cada etapa.',
  },
];
