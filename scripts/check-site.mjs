import { createRequire } from "node:module";
import assert from "node:assert/strict";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright");
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ reducedMotion: "reduce" });
const page = await context.newPage();
const errors = [];
page.on("pageerror", error => errors.push(error.message));
const routes = ["/", "/hakkimizda", "/iletisim", "/hizmetler", "/projelerimiz", "/blog", "/privacy", "/kvkk", "/cookies"];
const links = new Set(routes);
try {
  for (const route of routes) {
    const response = await page.goto(base + route, { waitUntil: "networkidle" });
    assert.equal(response.status(), 200, route);
    assert.equal(await page.locator('main').count(), 1, route + " main landmark");
    assert.equal(await page.locator('h1').count(), 1, route + " heading");
    const title = await page.title();
    assert.equal((title.match(/AKCY/g) || []).length, 1, title);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    assert.equal(new URL(canonical).pathname.replace(/\/$/, ''), route.replace(/\/$/, ''), route + ' canonical');
    for (const href of await page.locator('a[href^="/"]').evaluateAll(nodes => nodes.map(n => n.getAttribute('href')))) links.add(href);
    for (const width of [390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route + ' overflow ' + width);
    }
    console.log('PASS page', route, title);
  }
  for (const href of links) {
    const response = await context.request.get(base + href);
    assert.equal(response.status(), 200, 'link ' + href);
  }
  console.log('PASS internal links', links.size);
  await page.setViewportSize({width: 390, height: 844});
  await page.goto(base + '/');
  await page.getByRole('button', {name:'Menüyü aç'}).click();
  await page.getByRole('navigation', {name:'Mobil navigasyon'}).getByRole('link', {name:'Hakkımızda'}).click();
  await page.waitForURL('**/hakkimizda');
  assert.equal(await page.getByRole('button', {name:'Menüyü aç'}).getAttribute('aria-expanded'), 'false');
  await page.getByRole('button', {name:'Menüyü aç'}).click();
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('button', {name:'Menüyü aç'}).getAttribute('aria-expanded'), 'false');
  await page.goto(base + '/iletisim');
  await page.getByRole('button', {name:'Mesaj Gönder'}).click();
  await page.getByText('Lütfen adınızı ve soyadınızı girin.').waitFor();
  const invalid = await context.request.post(base + '/api/contact', {data:{}});
  assert.equal(invalid.status(), 400);
  console.log('PASS mobile navigation, Escape and contact validation');
  assert.deepEqual(errors, []);
  console.log('PASS no browser runtime errors');
} finally { await browser.close(); }
