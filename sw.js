// ponytail: cache shell only; data selalu network (POST tidak di-cache oleh SW ini)
const CACHE = 'rumahbersih-v1';
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./', 'manifest.json', 'icon-192.png'])));
  self.skipWaiting();
});
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
