'use strict';
const cacheName = 'counterPWA-v1';
const dataCacheName = 'counterData-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/styles/inline.css'
];

// self: (=! window) ServiceWorkerGlobalScope object
self.addEventListener('install', e => {
  console.log('[ServiceWorker] Install');
  // wait for ServiceWorker when calls are asynchronous
  e.waitUntil(
    // Chrome: ServiceWorker/CacheStorage
    // Firefox: default cache
    // returns a promise to thr opened cache object
    caches.open(cacheName).then(cache => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    }))
    })
  );
});

self.addEventListener('activate', e => {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(keyList => {
      // keyList.forEach(key => {}) // alternative
      return Promise.all(keyList.map(key => {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', e => {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
