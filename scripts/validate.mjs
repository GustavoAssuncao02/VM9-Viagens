import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
await mkdir('artifacts', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text());
});
await page.goto('http://127.0.0.1:5175/', { waitUntil: 'networkidle' });
await page.screenshot({ path: 'artifacts/desktop.png', fullPage: true });
await page.screenshot({ path: 'artifacts/hero-desktop.png' });
assert.equal(await page.locator('h1').innerText(), 'Sua viagem\ndos sonhos\ncomeça aqui!');
await page.waitForFunction(
  () => document.querySelector('.current-place strong')?.textContent === 'Jalapão',
  null,
  { timeout: 11000 },
);
await page.getByRole('button', { name: 'Pausar carrossel' }).click();
await page.getByRole('button', { name: 'Mostrar Curitiba' }).click();
await page.waitForFunction(
  () => document.querySelector('.current-place strong')?.textContent === 'Curitiba',
);
await page.locator('#destinos').scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
assert(await page.locator('header').evaluate((e) => e.classList.contains('is-scrolled')));
await page.getByRole('button', { name: 'Brasil', exact: true }).click();
assert.equal(await page.locator('.destination-card').count(), 2);
await page.getByRole('button', { name: 'Todos os destinos' }).click();
assert.equal(await page.locator('.destination-card').count(), 10);
const trigger = page.getByRole('button', { name: 'Conhecer Santorini, Grécia' });
await trigger.click();
assert(await page.getByRole('dialog').isVisible());
assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden');
assert(
  (await page.getByRole('link', { name: 'Quero conhecer' }).getAttribute('href')).includes(
    'Santorini',
  ),
);
await page.keyboard.press('Shift+Tab');
assert.equal(await page.evaluate(() => document.activeElement?.textContent), 'Quero conhecer');
await page.keyboard.press('Tab');
assert.equal(
  await page.evaluate(() => document.activeElement?.getAttribute('aria-label')),
  'Fechar destino',
);
await page.screenshot({ path: 'artifacts/modal-desktop.png' });
const modalAxe = await new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
  .analyze();
await page.keyboard.press('Escape');
assert.equal(await page.getByRole('dialog').count(), 0);
assert(await trigger.evaluate((e) => e === document.activeElement));
await trigger.click();
await page.getByRole('button', { name: 'Fechar destino' }).click();
await trigger.click();
await page.mouse.click(10, 10);
assert.equal(await page.getByRole('dialog').count(), 0);
for (const link of await page.locator('a[href*="wa.me"]').all())
  assert((await link.getAttribute('href')).startsWith('https://wa.me/5511942651657?text='));
assert.equal(await page.locator('a[href="https://www.instagram.com/vm9viagens/"]').count(), 2);
const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
const overflow = [];
for (const width of [1440, 1024, 768, 390, 320]) {
  await page.setViewportSize({ width, height: 900 });
  await page.waitForTimeout(200);
  if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth))
    overflow.push(width);
}
assert.deepEqual(overflow, []);
await page.setViewportSize({ width: 390, height: 844 });
await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
await page.waitForTimeout(300);
await page.getByRole('button', { name: 'Abrir menu' }).click();
await page.locator('#navigation').getByRole('link', { name: 'Destinos', exact: true }).click();
assert.equal(
  await page.getByRole('button', { name: 'Abrir menu' }).getAttribute('aria-expanded'),
  'false',
);
await page.getByRole('button', { name: 'Conhecer Machu Picchu, Peru' }).click();
await page.screenshot({ path: 'artifacts/modal-mobile.png' });
await page.keyboard.press('Escape');
await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
await page.waitForTimeout(300);
await page.screenshot({ path: 'artifacts/mobile.png', fullPage: true });
await page.screenshot({ path: 'artifacts/hero-mobile.png' });
const before = await page.locator('.current-place strong').innerText();
await page.locator('.hero').evaluate((element) => {
  element.dispatchEvent(
    new TouchEvent('touchstart', {
      bubbles: true,
      touches: [new Touch({ identifier: 1, target: element, clientX: 300, clientY: 350 })],
    }),
  );
  element.dispatchEvent(
    new TouchEvent('touchend', {
      bubbles: true,
      changedTouches: [new Touch({ identifier: 1, target: element, clientX: 80, clientY: 355 })],
    }),
  );
});
await page.waitForFunction(
  (name) => document.querySelector('.current-place strong')?.textContent !== name,
  before,
);
const mobileAxe = await new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
  .analyze();
await page.emulateMedia({ reducedMotion: 'reduce' });
assert.equal(
  await page.locator('.airplane-float').evaluate((e) => getComputedStyle(e).animationName),
  'none',
);
assert.equal(
  await page
    .locator('.hero-image')
    .first()
    .evaluate((e) => getComputedStyle(e).transitionDuration),
  '0s',
);
const missing = await page
  .locator('img')
  .evaluateAll((imgs) => imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src));
assert.deepEqual(missing, []);
assert.deepEqual(errors, []);
const report = {
  consoleErrors: errors,
  overflow,
  missingImages: missing,
  accessibility: {
    desktop: axe.violations,
    modal: modalAxe.violations,
    mobile: mobileAxe.violations,
  },
  checks: [
    '8-second carousel',
    'manual navigation',
    'sticky navbar',
    'filters',
    'modal escape/button/backdrop',
    'focus trap and restoration',
    'scroll lock',
    'WhatsApp destination message',
    'Instagram',
    '320/390/768/1024/1440 widths',
    'mobile menu',
    'mobile swipe',
    'reduced motion',
  ],
};
await writeFile('artifacts/validation.json', JSON.stringify(report, null, 2));
console.log(
  JSON.stringify(
    {
      ...report,
      accessibility: Object.fromEntries(
        Object.entries(report.accessibility).map(([k, v]) => [
          k,
          v.map((x) => ({
            id: x.id,
            impact: x.impact,
            nodes: x.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
          })),
        ]),
      ),
    },
    null,
    2,
  ),
);
await browser.close();
assert.equal(
  axe.violations.length + modalAxe.violations.length + mobileAxe.violations.length,
  0,
  'Accessibility violations; inspect artifacts/validation.json',
);
