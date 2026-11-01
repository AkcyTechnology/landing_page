import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright");
const browser = await chromium.launch();
const base = "https://gokcekombi.com";
async function closePromotion(page) {
  await page.waitForTimeout(7000);
  const close = page.getByRole('button', {name:'Kapat', exact:true});
  try { await close.waitFor({state:'visible',timeout:5000}); await close.click(); } catch { /* Popup is not present on every page. */ }
  await page.waitForTimeout(2000);
}
try {
  const results = await Promise.allSettled([
    ["urun-detay", "/product/baymak-duotec-24-kw-tam-yogusmali-kombi/"],
  ].map(async ([name, route]) => {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    try {
      const response = await page.goto(base + route, {waitUntil: "networkidle", timeout: 45000});
      if (response.status() !== 200) throw new Error(`${route}: ${response.status()}`);
      await closePromotion(page);
      await page.screenshot({path: `public/images/projects/gokce-kombi/${name}.jpg`, type: "jpeg", quality: 90});
      console.log("Captured", route);
    } finally { await page.close(); }
  }));
  console.log(results.map(result => result.status === "fulfilled" ? "OK" : result.reason.message));
  const mobile = await browser.newPage({viewport:{width:390,height:844}});
  await mobile.goto(base, {waitUntil:"networkidle"});
  await closePromotion(mobile);
  await mobile.getByRole('button', {name:'Menu',exact:true}).click();
  await mobile.waitForTimeout(1000);
  await mobile.screenshot({path:'public/images/projects/gokce-kombi/mobil-navigasyon.jpg',type:'jpeg',quality:90});
  const page = await browser.newPage({viewport:{width:1440,height:1000}});
  await page.goto(base, {waitUntil:"networkidle"});
  await closePromotion(page);
  for (const name of ['homepage','cover']) await page.screenshot({path:`public/images/projects/gokce-kombi/${name}.jpg`,type:'jpeg',quality:90});
  const products = page.locator('.gk-product-next').first();
  await products.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({path:'public/images/projects/gokce-kombi/urun-listeleme.jpg',type:'jpeg',quality:90});
  const capacity = page.locator('#gk-calc-submit');
  if (await capacity.count()) {
    await capacity.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({path:'public/images/projects/gokce-kombi/kapasite-hesaplama.jpg',type:'jpeg',quality:90});
    console.log('Captured capacity section');
  } else { console.log('Capacity section not found; original asset retained.'); }
} finally { await browser.close(); }
