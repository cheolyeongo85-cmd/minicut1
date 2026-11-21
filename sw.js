const C='minicut-v2',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const u=new URL(e.request.url);
  if(u.origin===location.origin||u.host.includes('gstatic')||u.host.includes('googleapis')){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp))}
  return res}).catch(()=>caches.match('index.html'))))});
