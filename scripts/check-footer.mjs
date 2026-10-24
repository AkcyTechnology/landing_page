import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_PATH || 'playwright');
const base=process.env.TEST_BASE_URL || 'http://localhost:3000';
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}, reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
try {
 await page.goto(base,{waitUntil:'networkidle'});
 const footer=page.getByRole('contentinfo');
 assert.equal(await footer.count(),1);
 assert((await footer.evaluate(el=>getComputedStyle(el).backgroundImage)).includes('/images/hero/footer.png'));
 assert.equal(await footer.getByRole('link',{name:'Bizimle İletişime Geçin'}).getAttribute('href'),'/iletisim');
 assert.equal(await footer.getByRole('navigation',{name:'Footer hizmetleri'}).getByRole('link').count(),6);
 const hrefs=await footer.locator('a[href^="/"]').evaluateAll(els=>[...new Set(els.map(el=>el.getAttribute('href')))]);
 for (const href of hrefs) assert.equal((await page.request.get(base+href)).status(),200,href);
 await page.addStyleTag({content:'header, nextjs-portal {visibility:hidden!important}'});
 for(const width of [320,390,768,1024,1440]){
  await page.setViewportSize({width,height:1000});
  await footer.scrollIntoViewIfNeeded();
  const bounds=await footer.locator('a,h2,h3,p,svg').evaluateAll(els=>els.map(el=>{const b=el.getBoundingClientRect();return {left:b.left,right:b.right}}));
  assert(bounds.every(b=>b.left>=-1&&b.right<=width+1),'overflow '+width);
  for (const element of await footer.locator('h2, h3, p, address').all()) await element.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  if(width===1440 || width===390) await footer.screenshot({path:width===1440?'footer-desktop.png':'footer-mobile.png'});
 }
 await page.goto(base+'/iletisim',{waitUntil:'networkidle'});
 assert.equal(await page.getByRole('contentinfo').count(),1);
 await page.getByRole('contentinfo').getByRole('heading',{name:'Fikirlerinizi Dijital Gerçekliğe Dönüştürelim.'}).waitFor();
 assert.deepEqual(errors,[]);
 console.log('PASS: one footer, correct background, CTA, six services, all internal links, five responsive widths, contact page, no runtime errors');
}finally{await browser.close();}


