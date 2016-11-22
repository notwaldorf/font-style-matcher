var VERSION = '0.0.3';

this.addEventListener('install', function(e) {
  e.waitUntil(caches.open(VERSION).then(cache => {
    return cache.addAll([
      '/font-style-matcher/',
      '/font-style-matcher/index.html',
      '/font-style-matcher/style.css',
      '/font-style-matcher/app.js',
      '/font-style-matcher/manifest.json',
      '/font-style-matcher/images/favicon.ico',
    ]).then(_ => this.skipWaiting());
}))});

this.addEventListener('fetch', function(e) {
  e.respondWith(caches.match(e.request).then((res) => {
    // If there is no match in the cache, we get undefined back,
    // in that case go to the network!
    return res || fetch(e.request)
  }));
});

this.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then((keys) => {
    return Promise.all(keys.map(k => {
      if (k !== VERSION) {
        return caches.delete(k);
      }
    })).then(_ => {
      return this.clients.claim()
    });
}))});
