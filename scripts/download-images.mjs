import { writeFile, mkdir } from 'node:fs/promises';
const photos = [
  ['curitiba', 30569101, 'curitiba', true],
  ['salvador', 14059766, 'the-historic-center-of-salvador-bahia-brazil', true],
  ['machu-picchu', 3521062, 'machu-picchu-peru'],
  ['bora-bora', 30422272, 'stunning-aerial-view-of-bora-bora-lagoon'],
  ['santorini', 3254754, 'santorini-greece'],
  ['aurora', 31556862, 'stunning-northern-lights-over-reykjavik-iceland'],
  ['uyuni', 30929501, 'reflective-solitude-at-salar-de-uyuni-bolivia'],
  ['chapada', 34748280, 'stunning-vista-of-chapada-diamantina-brazil'],
  ['mendoza', 21270887, 'coupe-walking-through-vineyard'],
  ['atacama', 30807403, 'scenic-view-of-atacama-desert-and-andes-mountains'],
  ['veneza', 2031764, 'venice-canal'],
];
await mkdir('public/images', { recursive: true });
const credits = [];
async function download(name, url, source, provider) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${name}: ${response.status}`);
  if (!response.headers.get('content-type')?.startsWith('image/'))
    throw new Error(`${name}: not image`);
  const image = new Uint8Array(await response.arrayBuffer());
  await writeFile(`public/images/${name}.webp`, image);
  credits.push({
    name,
    source,
    provider,
    license:
      provider === 'Pexels' ? 'https://www.pexels.com/license/' : 'https://unsplash.com/license',
  });
  console.log(name, image.length);
}
for (const [name, id, slug, hero] of photos) {
  await download(
    name,
    `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${hero ? 1920 : 1000}&fm=webp&q=82`,
    `https://www.pexels.com/photo/${slug}-${id}/`,
    'Pexels',
  );
}
for (const [name, slug, hero] of [
  ['buenos-aires', 'an-aerial-view-of-a-city-with-tall-buildings-pMigCXD_QJY', true],
  ['jalapao', 'photography-of-sunset-1jD31Ly9ojQ', true],
  ['gramado', 'uma-igreja-com-uma-cruz-no-topo-YEXZr0NrfPY', false],
]) {
  const source = `https://unsplash.com/photos/${slug}`;
  const html = await (await fetch(source)).text();
  const base = html.match(/https:\/\/images.unsplash.com\/photo-[^?\s"<>]+/)?.[0];
  if (!base) throw new Error(`Image not found: ${name}`);
  await download(
    name,
    `${base}?auto=format&fit=crop&w=${hero ? 1920 : 1000}&q=82&fm=webp`,
    source,
    'Unsplash',
  );
}
await writeFile('src/data/image-credits.json', JSON.stringify(credits, null, 2));
