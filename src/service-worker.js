import { build, files, version } from '$service-worker';

const CACHE = `cache-${version}`;
const ASSETS = [...build, ...files];

self.addEventListener('install', (event) => {
  async function addFilesToCache() {
    const cache = await caches.open(CACHE);
    await cache.addAll(ASSETS);
  }
  event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
  async function deleteOldCaches() {
    for (const key of await caches.keys()) {
      if (key !== CACHE) await caches.delete(key);
    }
  }
  event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  async function respond() {
    const cache = await caches.open(CACHE);
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) return cachedResponse;
    return fetch(event.request);
  }
  event.respondWith(respond());
});
