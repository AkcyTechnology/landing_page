import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const base = process.env.TEST_BASE_URL || 'http://localhost:3000';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[]; page.on('pageerror', e=>errors.push(e.message));
try {
 await page.goto(base, {waitUntil:'networkidle'});
 const section=page.locator('#cozumler');
 await section.scrollIntoViewIfNeeded();
 await page.addStyleTag({content:'header, nextjs-portal { visibility: hidden !important; }'});
 await section.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode())));
 await section.screenshot({path:'solutions-desktop.png'});
 for(let i=0;i<6;i++){
  const nav=section.getByRole('navigation');
  await nav.getByRole('button').nth(i).click();
  assert.equal(await nav.getByRole('button').nth(i).getAttribute('aria-current'),'true');
  assert.equal(await section.locator('h3').count(),1);
  assert((await section.getByRole('group').getAttribute('aria-label')).startsWith((i+1)+' / 6:'));
  assert.equal(await section.locator('[aria-hidden=false] img').count(),1);
  assert.equal(await section.locator('ul li').count(),4);
  const href=await section.getByRole('link').getAttribute('href');
  assert.equal((await page.request.get(base+href)).status(),200);
 }
 await section.getByRole('button',{name:'Sonraki çözüm'}).click();
 assert.equal(await section.getByRole('navigation').getByRole('button').first().getAttribute('aria-current'),'true');
 await section.getByRole('region').focus(); await page.keyboard.press('ArrowLeft');
 assert.equal(await section.getByRole('navigation').getByRole('button').last().getAttribute('aria-current'),'true');
 for(const width of [320,390,768,1024,1440]){
  await page.setViewportSize({width,height:1000});
  const box=await section.boundingBox();
  const children=await section.locator('button, h3, img, p').evaluateAll(els=>els.map(e=>{const b=e.getBoundingClientRect();return {left:b.left,right:b.right}}));
  assert(children.every(b=>b.left>=-1&&b.right<=width+1),'section overflow at '+width);
  assert(box.width<=width);
 }
 await page.setViewportSize({width:390,height:1000});
 await section.getByRole('navigation').getByRole('button').first().click();
 await section.getByRole('region').evaluate(el => el.dispatchEvent(new TouchEvent('touchstart', {bubbles:true, touches:[new Touch({identifier:1,target:el,clientX:300,clientY:400})]})));
 await section.getByRole('region').evaluate(el => el.dispatchEvent(new TouchEvent('touchend', {bubbles:true, changedTouches:[new Touch({identifier:1,target:el,clientX:100,clientY:410})]})));
 assert.equal(await section.getByRole('navigation').getByRole('button').nth(1).getAttribute('aria-current'),'true');
 await section.getByRole('navigation').getByRole('button').first().click();
 await page.waitForTimeout(700);
 await section.screenshot({path:'solutions-mobile.png'});
 assert.deepEqual(errors,[]);
 console.log('PASS: six slides, images, links, pagination, wraparound, keyboard, mobile swipe, five responsive widths, no runtime errors');
} finally {await browser.close();}


