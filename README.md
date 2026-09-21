# VM9 Viagens

Home institucional em React, TypeScript e Vite. Sem backend: os contatos são encaminhados diretamente ao WhatsApp. Fontes e fotografias são servidas localmente.

## Rodar

```sh
npm install
npm run dev
```

Abra **http://127.0.0.1:5175/**. Build de produção: `npm run build`. Prévia do build: `npm run preview`.

## Onde editar

| Conteúdo                                                  | Arquivo                                                      |
| --------------------------------------------------------- | ------------------------------------------------------------ |
| Estrutura da Home                                         | `src/App.tsx`                                                |
| Seções, serviços e apresentação institucional             | `src/components/Sections.tsx`                                |
| Destinos, descrições e fotos do carrossel                 | `src/data/destinations.ts`                                   |
| Depoimentos, serviços, diferenciais, WhatsApp e Instagram | `src/data/site.ts`                                           |
| Cores, layout e responsividade                            | `src/styles.css`                                             |
| Avião, nuvens, vento e constantes de velocidade/amplitude | `src/components/FlightAnimation.tsx`, objeto `FLIGHT_CONFIG` |
| Trajetórias da animação                                   | Keyframes em `src/styles.css`                                |
| Intervalo do carrossel (8.000 ms)                         | `src/components/HeroCarousel.tsx`, `CAROUSEL_INTERVAL`       |
| SEO e Open Graph                                          | `index.html`                                                 |
| Créditos e licenças das fotos                             | `src/data/image-credits.json` e link no rodapé               |

## Endereço e documentos pendentes

O endereço não foi fornecido. Quando definido, preencher `site.address` em `src/data/site.ts`; o rodapé o exibirá automaticamente. Uma futura seção de localização pode ser adicionada como componente entre `Contact` e `Footer` em `src/App.tsx`.

Política de Privacidade e Termos de Uso aguardam textos aprovados da agência. Os campos `privacyUrl` e `termsUrl` estão preparados e os links só aparecem quando forem preenchidos. Não há links falsos nem textos jurídicos inventados.

Antes de publicar em um domínio definitivo, transformar `og:image` em URL absoluta e adicionar `og:url` e canonical com o domínio real. Nenhum domínio foi presumido. A aplicação atual é uma Home; páginas futuras podem ser adicionadas com um roteador, mantendo os dados e componentes existentes.

## Imagens

Fotografias reais de Pexels e Unsplash, selecionadas pela localização descrita nas páginas de origem. As URLs individuais e licenças estão em `src/data/image-credits.json` e disponíveis no rodapé. Logo fornecida pelo usuário; SVGs de avião, nuvens e vento feitos para este projeto.

Licenças: https://www.pexels.com/license/ e https://unsplash.com/license.

Os arquivos WebP ficam em `public/images`. O script `node scripts/download-images.mjs` permite baixar novamente as fontes registradas. As fotos são recortadas pelo CSS; nenhum destino foi ilustrado por imagem gerada. A primeira foto tem prioridade; somente a próxima é pré-carregada após o primeiro paint, e imagens abaixo do Hero usam lazy loading.

## Comportamento e acessibilidade

- Carrossel de 8 segundos, fade, setas, indicadores, pausa e swipe horizontal. Pausa com foco nos controles, aba oculta e movimento reduzido.
- Modal nativo com foco contido, retorno ao cartão, scroll de fundo bloqueado e fechamento por X, ESC ou clique fora.
- WhatsApp com mensagem individual por destino; links externos com `noopener noreferrer`.
- Menu mobile, foco visível, link para pular navegação e alternativas textuais.
- `prefers-reduced-motion` remove animações e a troca automática; navegação manual continua disponível.
- Nenhum formulário, analytics, cookies de marketing ou backend foi adicionado.

## Validação

Com o servidor iniciado e Google Chrome instalado:

```sh
npm run build
node scripts/validate.mjs
node scripts/capture.mjs
```

O teste verifica navegação, carrossel, filtros, modais, foco, links, swipe, imagens, console e larguras de 320, 390, 768, 1024 e 1440 pixels. Usa axe para acessibilidade automatizada de página desktop/mobile e modal. Relatórios e capturas ficam em `artifacts/` (ignorados pelo Git). Isso complementa a inspeção visual; não equivale a uma auditoria completa com tecnologias assistivas.
