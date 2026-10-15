/**
 * BeautySlot — Service Worker
 * PWA Caching & Offline Management
 * Compliant with Live Data Protection (Zero Stale Bookings / Zero Private Data Caching)
 */

const CACHE_VERSION = 'beautyslot-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const OFFLINE_URL = './offline.html';

// Core static assets required for offline shell
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.webmanifest',
  './offline.html',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/icon.svg',
  './icons/favicon.png'
];

// Patterns that MUST NEVER be cached under any circumstances
// (Booking APIs, live availability, user authentication, customer personal data)
const NETWORK_ONLY_PATTERNS = [
  /\/api\//i,
  /\/auth\//i,
  /\/login/i,
  /\/signup/i,
  /\/bookings?/i,
  /\/slots?/i,
  /\/availability/i,
  /\/user/i,
  /\/payment/i,
  /\/checkout/i,
  /[?&](action=(book|cancel|reserve|auth))/i
];

function isNetworkOnly(url, method) {
  if (method !== 'GET') return true;
  return NETWORK_ONLY_PATTERNS.some(pattern => pattern.test(url));
}

// --------------------------------------------------------------------------
// 1. INSTALL EVENT — Pre-cache static shell & offline fallback
// --------------------------------------------------------------------------
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      // Use individual promises with catch so one failing optional asset doesn't break installation
      return Promise.allSettled(
        PRECACHE_ASSETS.map(url =>
          fetch(url, { cache: 'no-cache' })
            .then(res => {
              if (res.ok) return cache.put(url, res);
            })
            .catch(err => {
              console.warn(`[SW] Pre-cache skipped for ${url}:`, err);
            })
        )
      );
    })
  );
});

// --------------------------------------------------------------------------
// 2. ACTIVATE EVENT — Clean up outdated caches & claim clients
// --------------------------------------------------------------------------
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          .map(key => {
            console.log(`[SW] Removing outdated cache: ${key}`);
            return caches.delete(key);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// --------------------------------------------------------------------------
// 3. FETCH EVENT — Intelligent Caching & Live Data Protection
// --------------------------------------------------------------------------
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Ignore non-HTTP(S) schemes (e.g. chrome-extension://)
  if (!url.protocol.startsWith('http')) return;

  // RULE A: Non-GET requests and Live Data / Booking / Auth endpoints -> Strictly NETWORK ONLY
  if (isNetworkOnly(url.href, request.method)) {
    event.respondWith(
      fetch(request).catch(() => {
        // Return structured offline JSON response for API endpoints if network fails
        if (request.headers.get('accept')?.includes('application/json')) {
          return new Response(
            JSON.stringify({
              error: 'offline',
              message: 'You are currently offline. Real-time booking and account updates require an active internet connection.'
            }),
            {
              status: 503,
              statusText: 'Service Unavailable (Offline)',
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }
        // Fallback generic network error
        return new Response('Network unavailable. Live booking requires an active internet connection.', {
          status: 503,
          statusText: 'Offline'
        });
      })
    );
    return;
  }

  // RULE B: HTML Navigation requests -> Network-First with Cache Fallback & Offline Page
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(networkResponse => {
          if (networkResponse && networkResponse.ok) {
            const clone = networkResponse.clone();
            caches.open(DYNAMIC_CACHE).then(cache => cache.put(request, clone));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedPage = await caches.match(request);
          if (cachedPage) return cachedPage;

          const cachedHome = await caches.match('./index.html');
          if (cachedHome) return cachedHome;

          const offlineFallback = await caches.match(OFFLINE_URL);
          return offlineFallback || new Response('Offline. Please reconnect.', { status: 503, headers: { 'Content-Type': 'text/plain' } });
        })
    );
    return;
  }

  // RULE C: Fonts (Google Fonts & Web Fonts) -> Stale-While-Revalidate
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(request).then(cached => {
        const fetchPromise = fetch(request).then(networkResponse => {
          if (networkResponse && networkResponse.ok) {
            const clone = networkResponse.clone();
            caches.open(DYNAMIC_CACHE).then(cache => cache.put(request, clone));
          }
          return networkResponse;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }

  // RULE D: Core Static Assets (JS, CSS, Icons, Images) -> Cache First, Falling Back to Network
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) {
        // Asynchronously revalidate cache in background
        fetch(request)
          .then(networkResponse => {
            if (networkResponse && networkResponse.ok) {
              caches.open(DYNAMIC_CACHE).then(cache => cache.put(request, networkResponse));
            }
          })
          .catch(() => {});
        return cached;
      }

      return fetch(request).then(networkResponse => {
        if (!networkResponse || !networkResponse.ok || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const clone = networkResponse.clone();
        caches.open(DYNAMIC_CACHE).then(cache => cache.put(request, clone));
        return networkResponse;
      });
    })
  );
});

// --------------------------------------------------------------------------
// 4. MESSAGE EVENT — Support manual cache clearing & skipWaiting triggers
// --------------------------------------------------------------------------
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
