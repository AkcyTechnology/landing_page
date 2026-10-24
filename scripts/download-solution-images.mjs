import fs from 'node:fs/promises';
const sources = [
 ['web','https://unsplash.com/photos/computer-screen-displaying-website-home-page-Ylk5n_nd9dA'],
 ['mobile','https://unsplash.com/photos/hand-holding-smartphone-with-app-icons-A6JxK37IlPo'],
 ['automation','https://unsplash.com/photos/workflow-diagram-product-brief-and-user-goals-are-shown-wdnpaTNwOEQ'],
 ['business','https://unsplash.com/photos/turned-on-monitoring-screen-qwtCeJ5cLYs','photo-1526628953301-3e589a6a8b74'],
 ['integration','https://unsplash.com/photos/turned-on-laptop-computer-dC6Pb2JdAqs','photo-1508830524289-0adcbe822b40'],
 ['analytics','https://unsplash.com/photos/a-computer-screen-with-a-bunch-of-data-on-it-bf9sZBcGQl4'],
];
for (const [name, page, known] of sources) {
 let path = known;
 if (!path) {
  const response = await fetch(page); if (!response.ok) throw Error(page + ': '+response.status);
  const html = await response.text();
  const match = html.match(/<meta property="og:image" content="([^"]+)"/);
  if (!match) throw Error('No image '+page);
  path = new URL(match[1].replaceAll('&amp;', '&')).pathname.slice(1);
 }
 const url = 'https://images.unsplash.com/'+path+'?auto=format&fit=crop&w=1200&q=85';
 const image = await fetch(url); if (!image.ok) throw Error(name+': '+image.status);
 await fs.writeFile('public/images/solutions/'+name+'.jpg', Buffer.from(await image.arrayBuffer()));
 console.log(name, path);
}
await fs.writeFile('public/images/solutions/SOURCES.md', '# Solution photography\n\nPhotos from Unsplash, available under the [Unsplash License](https://unsplash.com/license). These are illustrative stock visuals, not AKCY project screenshots.\n\n'+sources.map(([name,page])=>'- '+name+'.jpg: '+page).join('\n')+'\n');
