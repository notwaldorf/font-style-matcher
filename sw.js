const APP_PREFIX = 'FontStyleMatcher_';   // Identifier for this app (this needs to be consistent across every cache update)
const VERSION = '0.0.15';                 // Version of the off-line cache (change this value everytime you want to update cache)
const CACHE_NAME = APP_PREFIX + VERSION;
const URLS = [                            // Add URL you want to cache in this list.
  '/font-style-matcher/',
  '/font-style-matcher/index.html',
  '/font-style-matcher/style.css',
  '/font-style-matcher/app.js',
  '/font-style-matcher/manifest.json',
  '/font-style-matcher/images/favicon.ico',
];

addEventListener('install', event => {
  skipWaiting();

  event.waitUntil(async function() {
    const cache = await caches.open(CACHE_NAME);
    return cache.addAll(URLS);
  }());
});

// Delete outdated caches
addEventListener('activate', event => {
  event.waitUntil(async function() {
    for (const key of await caches.keys()) {
      // Skip if the cache isn't part of this app:
      if (!key.startsWith(APP_PREFIX)) continue;
      // Otherwise, delete it if it isn't our cache name:
      if (key !== CACHE_NAME) await caches.delete(key);
    }

    // Refresh windows using the old version:
    for (const client of await clients.matchAll()) {
      client.navigate(client.url);
    }
  }());
});

addEventListener('fetch', event => {
  event.respondWith(async function() {
    // Try the cache first
    const response = await caches.match(event.request);
    if (response) return response;

    // Fall back to network
    return fetch(event.request);
  }());
});
