import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_PATH || 'playwright');
const base=process.env.TEST_BASE_URL || 'http://localhost:3000';
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const routes=['/','/hizmetler','/projelerimiz','/hakkimizda','/blog','/iletisim','/privacy','/kvkk','/cookies'];
try {
 for(const route of routes){
  const response=await page.goto(base+route,{waitUntil:'networkidle'});
  assert.equal(response.status(),200,route);
  assert.equal(await page.locator('main h1').count(),1,route+' h1');
  assert.equal(await page.getByRole('contentinfo').count(),1);
  for(const width of [320,390,768,1024,1440]){
   await page.setViewportSize({width,height:1000});
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route+' overflow '+width);
  }
  if(['/privacy','/kvkk','/cookies'].includes(route)){
   assert((await page.title()).endsWith('| AKCY Technologies'));
   assert.equal(await page.locator('time[datetime="2026-10-03"]').innerText(),'03.10.2026');
   const contents=page.getByRole('navigation',{name:'İçindekiler'});
   const target=await contents.getByRole('link').last().getAttribute('href');
   await contents.getByRole('link').last().click();
   const top=await page.locator(target).evaluate(el=>el.getBoundingClientRect().top);
   assert(top>=60 && top<210,route+' anchor scroll '+top);
  }
  console.log('PASS route',route);
 }
 for (const route of routes.slice(0,6)){
  await page.goto(base+'/',{waitUntil:'networkidle'});
  await page.getByRole('navigation',{name:'Ana navigasyon'}).locator(`a[href="${route}"]`).first().click();
  await page.waitForURL(base+route);
  await page.locator('main h1').waitFor();
  assert.equal(await page.getByText('Sayfa bulunamadı',{exact:true}).count(),0);
 }
 console.log('PASS desktop navigation clicks');
 await page.goto(base+'/',{waitUntil:'networkidle'});
 const featured=page.locator('#secili-projeler');
 for(const slug of ['cakiroglu-savunma','gokce-kombi']){
  await featured.locator(`a[href="/projelerimiz/${slug}"]`).first().click();
  await page.waitForURL('**/projelerimiz/'+slug);
  await page.locator('main h1').waitFor();
  const live=page.getByRole('link',{name:'Canlı Siteyi Ziyaret Et'}).first();
  assert.equal(await live.getAttribute('target'),'_blank');
  await page.goto(base+'/',{waitUntil:'networkidle'});
 }
 assert.equal(await featured.locator('a[target="_blank"]').count(),2);
 await featured.getByRole('link',{name:'Tüm Projeleri Gör'}).click(); await page.waitForURL('**/projelerimiz');
 console.log('PASS project thumbnails, details, live links, all projects');
 await page.setViewportSize({width:390,height:844});
 for(const route of routes.slice(0,6)){
  await page.goto(base+'/',{waitUntil:'networkidle'});
  await page.getByRole('button',{name:'Menüyü aç',exact:true}).click();
  await page.getByRole('navigation',{name:'Mobil navigasyon'}).locator(`a[href="${route}"]`).first().click();
  await page.waitForURL(base+route);
  assert.equal(await page.getByRole('button',{name:'Menüyü aç',exact:true}).getAttribute('aria-expanded'),'false');
 }
 await page.getByRole('button',{name:'Menüyü aç',exact:true}).click();
 await page.getByRole('button',{name:'Hizmet alt menüsünü aç'}).click();
 await page.locator('#mobile-service-links a').first().click();
 await page.waitForURL('**/hizmetler/**');
 console.log('PASS mobile links, service submenu, menu closure');
 let videoRequests=0;
 await page.route('https://www.youtube-nocookie.com/**',route=>{videoRequests++;return route.fulfill({status:200,body:'<html><body>video test</body></html>',contentType:'text/html'});});
 await page.goto(base+'/blog/yapay-zeka-ile-is-surecleri-otomasyonu',{waitUntil:'networkidle'});
 assert.equal(await page.locator('iframe').count(),0);
 assert.equal(videoRequests,0);
 const videoConsent=page.getByRole('button',{name:'İzin ver ve videoyu yükle'});
 if(await videoConsent.count()){
 await videoConsent.click();
 await page.locator('iframe').waitFor();
 await page.waitForTimeout(250);
 assert(videoRequests>0);
 console.log('PASS video stays unloaded until explicit consent');
 }else{console.log('PASS current published blog has no third-party video requests');}
 await page.setViewportSize({width:1440,height:1000});
 await page.goto(base+'/',{waitUntil:'networkidle'});
 await page.addStyleTag({content:'body > header, nextjs-portal {visibility:hidden!important}'});
 for(const [selector,file] of [['#secili-projeler','projects-updated.png'],['#calisma-sureci','process-updated.png'],['#yetkinlikler','capabilities-updated.png']]){
  const el=page.locator(selector);await el.scrollIntoViewIfNeeded();await el.screenshot({path:file});
 }
 await page.goto(base+'/privacy',{waitUntil:'networkidle'});
 await page.screenshot({path:'legal-updated.png'});
 assert.deepEqual(errors,[]);
 console.log('PASS no runtime errors');
}finally{await browser.close();}


