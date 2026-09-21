import { chromium } from '@playwright/test';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto('http://127.0.0.1:5175/', { waitUntil: 'networkidle' });
for (const id of ['servicos', 'destinos', 'sobre', 'contato']) {
  await page.locator(`#${id}`).scrollIntoViewIfNeeded();
  await page.waitForTimeout(450);
}
await page.evaluate(() =>
  Promise.all([...document.images].map((img) => img.decode().catch(() => {}))),
);
await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
await page.screenshot({ path: 'artifacts/desktop.png', fullPage: true });
await page.locator('#destinos').scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await page.screenshot({ path: 'artifacts/destinations.png' });
console.log(
  await page
    .locator('img')
    .evaluateAll((imgs) =>
      imgs.map((i) => ({
        src: i.getAttribute('src'),
        width: i.naturalWidth,
        height: i.naturalHeight,
      })),
    ),
);
await page.setViewportSize({ width: 390, height: 844 });
await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
await page.waitForTimeout(300);
await page.screenshot({ path: 'artifacts/mobile.png', fullPage: true });
await browser.close();
